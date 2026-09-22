import React, { useState, useEffect, useRef } from 'react';
import { Board } from './components/Board';
import { PosterBoard } from './components/PosterBoard';
import { Flex8x8Board } from './components/Flex8x8Board';
import { GameControls } from './components/GameControls';
import { PrintControls } from './components/PrintControls';
import { FacilitatorGuide } from './components/FacilitatorGuide';
import { KeyMessagesBanner } from './components/KeyMessagesBanner';
import { SquareDetailModal } from './components/SquareDetailModal';
import { ImageManagerModal } from './components/ImageManagerModal';
import { TargetSizeCanvasWrapper } from './components/TargetSizeCanvasWrapper';
import { usePosterImages } from './context/PosterImageContext';
import { Player, PrintSettings } from './types';
import { DEFAULT_TARGET_SIZE, convertToInches } from './utils/targetSizes';
import {
  LADDERS,
  SNAKES,
  SPECIAL_SQUARES,
  CORE_PSEA_MESSAGES,
  VICTORY_MESSAGE_100,
  toNepaliNumber,
} from './data/pseaData';
import {
  ShieldCheck,
  Printer,
  Dices,
  BookOpen,
  ListOrdered,
  Sparkles,
  Info,
  HelpCircle,
  Image as ImageIcon,
} from 'lucide-react';

const INITIAL_PLAYERS: Player[] = [
  {
    id: 1,
    name: 'खेलाडी १ (रातो)',
    color: '#dc2626',
    borderColor: 'border-red-600',
    bgColor: 'bg-red-600',
    position: 1,
    hasWon: false,
  },
  {
    id: 2,
    name: 'खेलाडी २ (नीलो)',
    color: '#2563eb',
    borderColor: 'border-blue-600',
    bgColor: 'bg-blue-600',
    position: 1,
    hasWon: false,
  },
  {
    id: 3,
    name: 'खेलाडी ३ (हरियो)',
    color: '#16a34a',
    borderColor: 'border-emerald-600',
    bgColor: 'bg-emerald-600',
    position: 1,
    hasWon: false,
  },
  {
    id: 4,
    name: 'खेलाडी ४ (पहेँलो)',
    color: '#ca8a04',
    borderColor: 'border-yellow-600',
    bgColor: 'bg-yellow-600',
    position: 1,
    hasWon: false,
  },
];

export default function App() {
  const { openImageManager } = usePosterImages();
  const posterElementRef = useRef<HTMLDivElement>(null);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'board' | 'play' | 'facilitator' | 'rules'>('board');

  // Players & Game state
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS.slice(0, 2));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [lastDice, setLastDice] = useState<number | null>(null);
  const [gameMessage, setGameMessage] = useState(
    'खेल सुरु गर्न खेलाडी १ ले पासा गुल्ट्याउनुहोस्।'
  );

  // Selected square for modal
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  // Print & Target Size settings - Defaults to full 8x8 flex awareness poster
  const [printSettings, setPrintSettings] = useState<PrintSettings>({
    paperSize: '8x8-flex',
    targetSize: DEFAULT_TARGET_SIZE,
    previewScale: 1,
    fitToScreen: false,
    layoutMode: 'poster-3col',
    showFacilitatorCorner: false,
    showKeyMessages: true,
    showSnakeLadderLines: true,
    textSize: 'large',
    highContrastPrint: false,
    numberFormat: 'english',
  });

  // Dynamic CSS page size for print based on targetSize
  useEffect(() => {
    let styleTag = document.getElementById('dynamic-print-page-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-print-page-style';
      document.head.appendChild(styleTag);
    }

    const currentTarget = printSettings.targetSize || DEFAULT_TARGET_SIZE;
    const wIn = Math.round(convertToInches(currentTarget.width, currentTarget.unit) * 100) / 100;
    const hIn = Math.round(convertToInches(currentTarget.height, currentTarget.unit) * 100) / 100;
    const sizeRule = `${wIn}in ${hIn}in`;

    styleTag.textContent = `@media print { 
      @page { size: ${sizeRule}; margin: 0; } 
      body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .poster-board-canvas,
      .flex-8x8-board-wrapper,
      #target-size-export-canvas {
        width: 100vw !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
      }
    }`;
  }, [printSettings.targetSize]);

  // Handle dice roll in interactive game
  const handleRollDice = (diceValue: number) => {
    if (isRolling) return;
    setIsRolling(true);
    setLastDice(diceValue);

    const player = players[currentPlayerIndex];
    let newPos = player.position + diceValue;

    if (newPos > 100) {
      // Must land exactly on 100
      newPos = player.position;
      setGameMessage(
        `${player.name} ले ${toNepaliNumber(diceValue)} पाउनुभयो, तर १०० पुग्न ठ्याक्कै अङ्क आवश्यक पर्छ!`
      );
      setIsRolling(false);
      // Next player
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      return;
    }

    // Step 1: Move to target square
    setTimeout(() => {
      let finalPos = newPos;
      let actionMsg = `${player.name} घर ${toNepaliNumber(player.position)} बाट ${toNepaliNumber(
        newPos
      )} मा पुग्नुभयो।`;

      // Check ladder
      const ladder = LADDERS.find((l) => l.start === newPos);
      // Check snake
      const snake = SNAKES.find((s) => s.head === newPos);
      // Check special
      const special = SPECIAL_SQUARES.find((sq) => sq.square === newPos);

      if (ladder) {
        finalPos = ladder.end;
        actionMsg = `🪜 सिँढी! ${player.name} ले राम्रो आचरण देखाउनुभयो: "${ladder.message}" र घर ${toNepaliNumber(
          finalPos
        )} मा उक्लिनुभयो!`;
        setSelectedSquare(newPos);
      } else if (snake) {
        finalPos = snake.tail;
        actionMsg = `🐍 सर्प! ${player.name} ले जोखिमपूर्ण अवस्था सामना गर्नुभयो: "${snake.message}" र घर ${toNepaliNumber(
          finalPos
        )} मा झर्नुभयो!`;
        setSelectedSquare(newPos);
      } else if (special) {
        actionMsg = `💡 विशेष सिकाइ घर! ${special.question}`;
        setSelectedSquare(newPos);
      } else if (finalPos === 100) {
        actionMsg = `🏆 बधाई छ! ${player.name} सुरक्षित समुदायको गन्तव्य १०० मा पुग्नुभयो!`;
        setSelectedSquare(100);
      }

      setGameMessage(actionMsg);

      // Update player position
      setPlayers((prev) =>
        prev.map((p, idx) =>
          idx === currentPlayerIndex
            ? { ...p, position: finalPos, hasWon: finalPos === 100 }
            : p
        )
      );

      setIsRolling(false);

      // Advance turn if not won
      if (finalPos !== 100) {
        setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      }
    }, 450);
  };

  const handleResetGame = () => {
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, position: 1, hasWon: false }))
    );
    setCurrentPlayerIndex(0);
    setLastDice(null);
    setGameMessage('खेल पुनः सुरु गरियो। खेलाडी १ को पालो!');
  };

  const handlePlayerCountChange = (count: number) => {
    setPlayers(INITIAL_PLAYERS.slice(0, count).map((p) => ({ ...p, position: 1, hasWon: false })));
    setCurrentPlayerIndex(0);
    setLastDice(null);
    setGameMessage(`${toNepaliNumber(count)} जना खेलाडीको खेल सुरु भयो।`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased">
      {/* Top Application Header (Hidden in Print) */}
      <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* Brand & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-xs">
              🐍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                  PSEA सर्प र सिँढी खेल
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  नेपाली संस्करण
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                सुरक्षित बालबालिका, सुरक्षित समुदाय • सहायता निःशुल्क हो (HELP IS FREE)
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'board'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" />
              <span>बोर्ड तथा PDF प्रिन्ट</span>
            </button>

            <button
              onClick={() => setActiveTab('play')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'play'
                  ? 'bg-white text-indigo-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Dices className="w-3.5 h-3.5 text-indigo-600" />
              <span>अन्तरक्रियात्मक खेल</span>
            </button>

            <button
              onClick={() => setActiveTab('facilitator')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'facilitator'
                  ? 'bg-white text-rose-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-600" />
              <span>सहजकर्ता कुना</span>
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'rules'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5 text-slate-600" />
              <span>सिँढी/सर्प सूची</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Manage Images Button */}
            <button
              onClick={() => openImageManager()}
              className="px-3 sm:px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              title="प्रत्येक तस्बिर (शीर्ष, तल्लो ब्यानर, सन्देश र कार्डहरू) छुट्टाछुट्टै बदल्नुहोस्"
            >
              <ImageIcon className="w-3.5 h-3.5 text-blue-200" />
              <span className="hidden sm:inline">तस्बिर बदल्नुहोस्</span>
              <span className="sm:hidden">तस्बिर</span>
            </button>

            {/* Direct Print Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF डाउनलोड / प्रिन्ट</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-5">
        {/* VIEW: BOARD & PRINT (Primary Mode - Exact Poster Match) */}
        {activeTab === 'board' && (
          <div className="space-y-4">
            {/* Target Size & Printable Controls Header (No-print) */}
            <PrintControls
              settings={printSettings}
              onUpdateSettings={(newSettings) =>
                setPrintSettings((prev) => ({ ...prev, ...newSettings }))
              }
              onPrint={handlePrint}
              posterElementRef={posterElementRef}
            />

            {/* The Master Board Framed in the User's Chosen Target Dimensions */}
            <TargetSizeCanvasWrapper
              ref={posterElementRef}
              targetSize={printSettings.targetSize || DEFAULT_TARGET_SIZE}
              fitToScreen={printSettings.fitToScreen}
            >
              <PosterBoard
                players={[]}
                onSquareClick={(sq) => setSelectedSquare(sq)}
                showLadders={printSettings.showSnakeLadderLines}
                showSnakes={printSettings.showSnakeLadderLines}
                numberFormat={printSettings.numberFormat}
                textSize={printSettings.textSize}
                highContrast={printSettings.highContrastPrint}
                leftMessageColumns={printSettings.leftMessageColumns || 1}
              />
            </TargetSizeCanvasWrapper>

            {/* Facilitator Corner Guide (Optional Add-on Page) */}
            {printSettings.showFacilitatorCorner && (
              <div className="max-w-5xl mx-auto page-break-before pt-6">
                <FacilitatorGuide />
              </div>
            )}
          </div>
        )}

        {/* VIEW: PLAY MODE (Interactive Game on Poster) */}
        {activeTab === 'play' && (
          <div className="space-y-4">
            {/* Game Controls Bar */}
            <div className="max-w-4xl mx-auto">
              <GameControls
                players={players}
                currentPlayerIndex={currentPlayerIndex}
                onRollDice={handleRollDice}
                onResetGame={handleResetGame}
                onPlayerCountChange={handlePlayerCountChange}
                isRolling={isRolling}
                lastDice={lastDice}
                gameMessage={gameMessage}
              />
            </div>

            {/* Board with Live Tokens */}
            <div className="w-full">
              {printSettings.layoutMode === 'poster-3col' ? (
                <PosterBoard
                  players={players}
                  onSquareClick={(sq) => setSelectedSquare(sq)}
                  showLadders={true}
                  showSnakes={true}
                  numberFormat={printSettings.numberFormat}
                  textSize="medium"
                  leftMessageColumns={printSettings.leftMessageColumns || 1}
                />
              ) : (
                <Flex8x8Board
                  players={players}
                  onSquareClick={(sq) => setSelectedSquare(sq)}
                  showLadders={true}
                  showSnakes={true}
                  numberFormat={printSettings.numberFormat}
                  textSize="large"
                />
              )}
            </div>

            {/* Quick Rules Card */}
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600" />
                <span>खेलका नियमहरू:</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>• सबै खेलाडी १ नं. घरबाट खेल सुरु गर्छन्।</li>
                <li>• सिँढीको फेदमा पुग्दा सुरक्षित सन्देश पढी सिँढीको टुप्पोमा उक्लिन पाइन्छ।</li>
                <li>• सर्पको मुखमा पुग्दा जोखिम सन्देश बुझी पुच्छरमा झर्नुपर्छ।</li>
                <li>• प्रश्न घरमा पुगेपछि सोधिएको प्रश्नको उत्तर सबैले छलफल गर्नुपर्छ।</li>
                <li>• ठ्याक्कै १०० नं. घरमा पुग्ने पहिलो खेलाडी विजेता हुनेछन्!</li>
              </ul>
            </div>
          </div>
        )}

        {/* VIEW: FACILITATOR CORNER (Deep Reference) */}
        {activeTab === 'facilitator' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <FacilitatorGuide />
          </div>
        )}

        {/* VIEW: RULES & STRUCTURED LISTS */}
        {activeTab === 'rules' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-900 mb-1">
                PSEA सर्प र सिँढी खेल: सम्पूर्ण सन्दर्भ तालिका
              </h2>
              <p className="text-xs text-slate-600 mb-4">
                सबै १२ सिँढीहरू, ११ सर्पहरू, ६ विशेष सिकाइ घरहरू र विजय सन्देश
              </p>

              {/* Ladders Table */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-emerald-200">
                  <span className="text-lg">🪜</span>
                  <h3 className="font-bold text-emerald-900 text-base">
                    सिँढीहरू (Ladders) - सुरक्षित आचरण र ज्ञान
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-emerald-50 text-emerald-950 font-bold border-b border-emerald-200">
                      <tr>
                        <th className="p-2 w-16">सुरु</th>
                        <th className="p-2 w-16">अन्त्य</th>
                        <th className="p-2">सुरक्षा सन्देश</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {LADDERS.map((lad, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50/40">
                          <td className="p-2 font-bold text-emerald-700">
                            घर {toNepaliNumber(lad.start)}
                          </td>
                          <td className="p-2 font-bold text-emerald-800">
                            घर {toNepaliNumber(lad.end)}
                          </td>
                          <td className="p-2 text-slate-800 font-medium">
                            {lad.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Snakes Table */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-rose-200">
                  <span className="text-lg">🐍</span>
                  <h3 className="font-bold text-rose-900 text-base">
                    सर्पहरू (Snakes) - जोखिमपूर्ण र असुरक्षित अवस्था
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-rose-50 text-rose-950 font-bold border-b border-rose-200">
                      <tr>
                        <th className="p-2 w-16">टाउको</th>
                        <th className="p-2 w-16">पुच्छर</th>
                        <th className="p-2">जोखिम सन्देश</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {SNAKES.map((snk, idx) => (
                        <tr key={idx} className="hover:bg-rose-50/40">
                          <td className="p-2 font-bold text-rose-700">
                            घर {toNepaliNumber(snk.head)}
                          </td>
                          <td className="p-2 font-bold text-rose-800">
                            घर {toNepaliNumber(snk.tail)}
                          </td>
                          <td className="p-2 text-slate-800 font-medium">
                            {snk.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Special Squares */}
              <div>
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-indigo-200">
                  <span className="text-lg">💡</span>
                  <h3 className="font-bold text-indigo-900 text-base">
                    विशेष सिकाइ घरहरू (Special Learning Squares)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SPECIAL_SQUARES.map((sq) => (
                    <div
                      key={sq.square}
                      className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-1"
                    >
                      <div className="font-bold text-indigo-900">
                        घर नं. {toNepaliNumber(sq.square)} {sq.icon}
                      </div>
                      <p className="font-semibold text-slate-900">{sq.question}</p>
                      {sq.answer && (
                        <p className="text-emerald-800 font-bold">
                          ✅ उत्तर: {sq.answer}
                        </p>
                      )}
                      {sq.hint && (
                        <p className="text-slate-600">
                          💡 संकेत: {sq.hint}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal for Square Details */}
      <SquareDetailModal
        squareNumber={selectedSquare}
        onClose={() => setSelectedSquare(null)}
      />

      {/* Modal for Managing & Browsing Images Separately */}
      <ImageManagerModal />

      {/* Footer (No print) */}
      <footer className="no-print bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500">
        <p>
          © PSEA सर्प र सिँढी खेल • "सुरक्षित बालबालिका, सुरक्षित समुदाय" • सहायता निःशुल्क हो (HELP IS FREE)
        </p>
      </footer>
    </div>
  );
}
