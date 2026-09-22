import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const HOST = '0.0.0.0';

async function startServer() {
  const app = express();

  // High payload limit for image data URLs
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Directories for persistent static uploads
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const distUploadsDir = path.join(process.cwd(), 'dist', 'uploads');

  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (err) {
    console.error('Error creating uploads directory:', err);
  }

  const manifestPath = path.join(uploadsDir, 'manifest.json');

  function readManifest(): Record<string, string> {
    try {
      if (fs.existsSync(manifestPath)) {
        const raw = fs.readFileSync(manifestPath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Could not read manifest.json', err);
    }
    return {};
  }

  function writeManifest(manifest: Record<string, string>) {
    try {
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
      // Also copy to dist if dist exists
      if (fs.existsSync(distUploadsDir)) {
        fs.writeFileSync(
          path.join(distUploadsDir, 'manifest.json'),
          JSON.stringify(manifest, null, 2),
          'utf-8'
        );
      }
    } catch (err) {
      console.error('Could not write manifest.json', err);
    }
  }

  // Serve uploads statically
  app.use('/uploads', express.static(uploadsDir));
  if (fs.existsSync(distUploadsDir)) {
    app.use('/uploads', express.static(distUploadsDir));
  }

  // ==========================================
  // API ROUTES
  // ==========================================

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 2. Get all uploaded static images
  app.get('/api/images', (req, res) => {
    try {
      const manifest = readManifest();
      res.json({ success: true, images: manifest });
    } catch (err) {
      console.error('Failed to get images', err);
      res.status(500).json({ success: false, error: 'Failed to retrieve images' });
    }
  });

  // 3. Upload/update an image slot statically
  app.post('/api/images/upload', (req, res) => {
    try {
      const { slotKey, dataUrl } = req.body;
      if (!slotKey || !dataUrl) {
        return res.status(400).json({ success: false, error: 'Missing slotKey or dataUrl' });
      }

      // Parse data URL: data:image/png;base64,...
      const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      let ext = 'png';
      let base64Data = dataUrl;

      if (match) {
        ext = match[1] === 'jpeg' ? 'jpg' : match[1];
        // clean extension if e.g. svg+xml
        if (ext.includes('+')) ext = ext.split('+')[0];
        base64Data = match[2];
      }

      const buffer = Buffer.from(base64Data, 'base64');
      const safeSlotName = slotKey.replace(/[^a-zA-Z0-9_-]/g, '_');
      const fileName = `${safeSlotName}.${ext}`;
      const filePath = path.join(uploadsDir, fileName);

      fs.writeFileSync(filePath, buffer);

      // Also sync to dist/uploads if dist exists (so it's immediately available in prod mode)
      if (fs.existsSync(distUploadsDir)) {
        try {
          fs.writeFileSync(path.join(distUploadsDir, fileName), buffer);
        } catch (copyErr) {
          console.warn('Could not copy to dist uploads', copyErr);
        }
      }

      const publicUrl = `/uploads/${fileName}?v=${Date.now()}`;
      const manifest = readManifest();
      manifest[slotKey] = publicUrl;
      writeManifest(manifest);

      console.log(`[API] Saved static image for slot "${slotKey}" -> ${publicUrl}`);
      res.json({ success: true, slotKey, url: publicUrl });
    } catch (err) {
      console.error('Failed to upload image', err);
      res.status(500).json({ success: false, error: 'Internal server error while saving image' });
    }
  });

  // 4. Delete an image slot
  app.post('/api/images/delete', (req, res) => {
    try {
      const { slotKey } = req.body;
      if (!slotKey) {
        return res.status(400).json({ success: false, error: 'Missing slotKey' });
      }

      const manifest = readManifest();
      if (manifest[slotKey]) {
        const urlPath = manifest[slotKey].split('?')[0];
        const fileName = path.basename(urlPath);
        const filePath = path.join(uploadsDir, fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        delete manifest[slotKey];
        writeManifest(manifest);
      }

      res.json({ success: true, slotKey });
    } catch (err) {
      console.error('Failed to delete image', err);
      res.status(500).json({ success: false, error: 'Failed to delete image' });
    }
  });

  // ==========================================
  // VITE OR STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
