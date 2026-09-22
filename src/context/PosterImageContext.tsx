import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllImagesFromDb, saveImageToDb, deleteImageFromDb, clearAllImagesFromDb } from '../utils/storageDb';
import { autoCropAll, loadImage } from '../utils/imageCropper';

interface PosterImagesContextType {
  headerBanner: string | null;
  leftMessages: Record<number, string>;
  rightPanels: Record<string, string>;
  footerBanner: string | null;
  boardImage: string | null;
  sourceImage: string | null;
  hasAnyCrops: boolean;
  isCropperOpen: boolean;
  openCropper: () => void;
  closeCropper: () => void;
  isImageManagerOpen: boolean;
  selectedSlotKey: string | null;
  openImageManager: (slotKey?: string) => void;
  closeImageManager: () => void;
  updateImage: (slotKey: string, fileOrDataUrl: File | string) => Promise<void>;
  removeImage: (slotKey: string) => Promise<void>;
  setCrop: (slotKey: string, dataUrl: string) => Promise<void>;
  setHeaderBannerDirectly: (fileOrUrl: File | string) => Promise<void>;
  setMultipleCrops: (crops: Record<string, string>, rawSource?: string) => Promise<void>;
  clearAllCrops: () => Promise<void>;
  loadFromMasterImage: (source: string | File) => Promise<void>;
}

const PosterImagesContext = createContext<PosterImagesContextType | undefined>(undefined);

export const PosterImagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headerBanner, setHeaderBanner] = useState<string | null>(null);
  const [leftMessages, setLeftMessages] = useState<Record<number, string>>({});
  const [rightPanels, setRightPanels] = useState<Record<string, string>>({});
  const [footerBanner, setFooterBanner] = useState<string | null>(null);
  const [boardImage, setBoardImage] = useState<string | null>(null);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState<boolean>(false);
  const [selectedSlotKey, setSelectedSlotKey] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Load from static server API (/api/images) first, then fall back to IndexedDB
  useEffect(() => {
    async function loadSavedCrops() {
      try {
        let serverImages: Record<string, string> = {};
        try {
          const res = await fetch('/api/images');
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.images) {
              serverImages = data.images;
            }
          }
        } catch (apiErr) {
          console.warn('API /api/images not reachable, checking local storage', apiErr);
        }

        const stored = await getAllImagesFromDb();
        const merged = { ...stored, ...serverImages };

        if (Object.keys(merged).length > 0) {
          applyCropsToState(merged);
        } else {
          // Probe for public images (e.g. /poster.png, /poster.jpg, /snake-ladder.png)
          probeForPublicPoster();
        }
      } catch (err) {
        console.warn('Error loading crops from storage', err);
      } finally {
        setInitialized(true);
      }
    }
    loadSavedCrops();
  }, []);

  // Probe public assets in case user placed a file in public/
  const probeForPublicPoster = async () => {
    // 1. First probe for dedicated header banner candidates
    const headerCandidates = [
      '/Gemini_Generated_Image_k9kldvk9kldvk9kl.jpg',
      '/header_village_kids.png',
      '/header_village_kids.jpg',
      '/top_banner.png',
      '/top_banner.jpg',
      '/banner.png',
      '/banner.jpg',
    ];
    for (const url of headerCandidates) {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok && res.headers.get('content-type')?.includes('image')) {
          await setHeaderBannerDirectly(url);
          break;
        }
      } catch {
        // Not found, continue
      }
    }

    // 2. Probe for full composite poster
    const candidates = ['/poster.png', '/poster.jpg', '/poster.jpeg', '/snake-ladder.png', '/assets/poster.png'];
    for (const url of candidates) {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok && res.headers.get('content-type')?.includes('image')) {
          await loadFromMasterImage(url);
          break;
        }
      } catch {
        // Not found, continue
      }
    }
  };

  const applyCropsToState = (crops: Record<string, string>) => {
    const newLeft: Record<number, string> = {};
    const newRight: Record<string, string> = {};

    for (const [key, value] of Object.entries(crops)) {
      if (key === 'headerBanner') {
        setHeaderBanner(value);
      } else if (key === 'footerBanner') {
        setFooterBanner(value);
      } else if (key === 'boardImage') {
        setBoardImage(value);
      } else if (key === '__sourceImage') {
        setSourceImage(value);
      } else if (key.startsWith('leftMessage_')) {
        const num = parseInt(key.replace('leftMessage_', ''), 10);
        if (!isNaN(num)) {
          newLeft[num] = value;
        }
      } else if (key.startsWith('rightPanel_')) {
        const type = key.replace('rightPanel_', '');
        newRight[type] = value;
      }
    }

    if (Object.keys(newLeft).length > 0) setLeftMessages(newLeft);
    if (Object.keys(newRight).length > 0) setRightPanels(newRight);
  };

  const setCrop = async (slotKey: string, dataUrl: string) => {
    await saveImageToDb(slotKey, dataUrl);
    applyCropsToState({ [slotKey]: dataUrl });
  };

  const setHeaderBannerDirectly = async (fileOrUrl: File | string) => {
    await updateImage('headerBanner', fileOrUrl);
  };

  const setMultipleCrops = async (crops: Record<string, string>, rawSource?: string) => {
    const payload = { ...crops };
    if (rawSource) {
      payload['__sourceImage'] = rawSource;
    }
    for (const [k, v] of Object.entries(payload)) {
      await saveImageToDb(k, v);
    }
    applyCropsToState(payload);
  };

  const clearAllCrops = async () => {
    await clearAllImagesFromDb();
    setHeaderBanner(null);
    setLeftMessages({});
    setRightPanels({});
    setFooterBanner(null);
    setBoardImage(null);
    setSourceImage(null);
  };

  const loadFromMasterImage = async (source: string | File) => {
    try {
      const img = await loadImage(source);
      const crops = autoCropAll(img);
      const rawSrc = typeof source === 'string' ? source : img.src;
      await setMultipleCrops(crops, rawSrc);
    } catch (err) {
      console.error('Failed to load and auto-crop master image', err);
      throw err;
    }
  };

  const updateImage = async (slotKey: string, fileOrDataUrl: File | string): Promise<void> => {
    try {
      let dataUrl: string;
      if (typeof fileOrDataUrl === 'string') {
        dataUrl = fileOrDataUrl;
      } else {
        dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(fileOrDataUrl);
        });
      }

      // 1. Send to server API to save statically into public/uploads so everyone sees it
      let finalUrl = dataUrl;
      try {
        const res = await fetch('/api/images/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slotKey, dataUrl }),
        });
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.url) {
            finalUrl = result.url;
          }
        }
      } catch (uploadErr) {
        console.warn('Could not sync image to static server directory', uploadErr);
      }

      // 2. Also save to local IndexedDB
      await saveImageToDb(slotKey, finalUrl);

      // 3. Update React state
      if (slotKey === 'headerBanner') {
        setHeaderBanner(finalUrl);
      } else if (slotKey === 'footerBanner') {
        setFooterBanner(finalUrl);
      } else if (slotKey === 'boardImage') {
        setBoardImage(finalUrl);
      } else if (slotKey.startsWith('leftMessage_')) {
        const num = parseInt(slotKey.replace('leftMessage_', ''), 10);
        setLeftMessages((prev) => ({ ...prev, [num]: finalUrl }));
      } else if (slotKey.startsWith('rightPanel_')) {
        const type = slotKey.replace('rightPanel_', '');
        setRightPanels((prev) => ({ ...prev, [type]: finalUrl }));
      }
    } catch (err) {
      console.error('Failed to update image for slot', slotKey, err);
      throw err;
    }
  };

  const removeImage = async (slotKey: string): Promise<void> => {
    try {
      // 1. Delete on server
      try {
        await fetch('/api/images/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slotKey }),
        });
      } catch (delErr) {
        console.warn('Could not delete image from server', delErr);
      }

      // 2. Delete in local DB
      await deleteImageFromDb(slotKey);

      // 3. Update state
      if (slotKey === 'headerBanner') {
        setHeaderBanner(null);
      } else if (slotKey === 'footerBanner') {
        setFooterBanner(null);
      } else if (slotKey === 'boardImage') {
        setBoardImage(null);
      } else if (slotKey.startsWith('leftMessage_')) {
        const num = parseInt(slotKey.replace('leftMessage_', ''), 10);
        setLeftMessages((prev) => {
          const copy = { ...prev };
          delete copy[num];
          return copy;
        });
      } else if (slotKey.startsWith('rightPanel_')) {
        const type = slotKey.replace('rightPanel_', '');
        setRightPanels((prev) => {
          const copy = { ...prev };
          delete copy[type];
          return copy;
        });
      }
    } catch (err) {
      console.error('Failed to remove image for slot', slotKey, err);
      throw err;
    }
  };

  const hasAnyCrops =
    Boolean(headerBanner) ||
    Object.keys(leftMessages).length > 0 ||
    Object.keys(rightPanels).length > 0 ||
    Boolean(footerBanner) ||
    Boolean(boardImage);

  return (
    <PosterImagesContext.Provider
      value={{
        headerBanner,
        leftMessages,
        rightPanels,
        footerBanner,
        boardImage,
        sourceImage,
        hasAnyCrops,
        isCropperOpen,
        openCropper: () => setIsCropperOpen(true),
        closeCropper: () => setIsCropperOpen(false),
        isImageManagerOpen,
        selectedSlotKey,
        openImageManager: (slotKey?: string) => {
          setSelectedSlotKey(slotKey || null);
          setIsImageManagerOpen(true);
        },
        closeImageManager: () => {
          setIsImageManagerOpen(false);
          setSelectedSlotKey(null);
        },
        updateImage,
        removeImage,
        setCrop,
        setHeaderBannerDirectly,
        setMultipleCrops,
        clearAllCrops,
        loadFromMasterImage,
      }}
    >
      {children}
    </PosterImagesContext.Provider>
  );
};

export const usePosterImages = (): PosterImagesContextType => {
  const context = useContext(PosterImagesContext);
  if (!context) {
    throw new Error('usePosterImages must be used within a PosterImagesProvider');
  }
  return context;
};
