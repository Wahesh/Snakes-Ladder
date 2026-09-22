import React, { useState } from 'react';
import { Player } from '../types';
import { toNepaliNumber, LADDERS, SNAKES, SPECIAL_SQUARES } from '../data/pseaData';
import { Dices, RotateCcw, Users, Trophy, Sparkles, ArrowRight } from 'lucide-react';

interface GameControlsProps {
  players: Player[];
  currentPlayerIndex: number;
  onRollDice: (diceValue: number) => void;
  onResetGame: () => void;
  onPlayerCountChange: (count: number) => void;
  isRolling: boolean;
  lastDice: number | null;
  gameMessage: string;
}

export const GameControls: React.FC<GameControlsProps> = ({
  players,
  currentPlayerIndex,
  onRollDice,
  onResetGame,
  onPlayerCountChange,
  isRolling,
  lastDice,
  gameMessage,
}) => {
  const currentPlayer = players[currentPlayerIndex];

  // Visual dice face dots
  const renderDiceFace = (val: number | null) => {
    if (!val) {
      return (
        <span className="text-2xl font-black text-slate-400">?</span>
      );
    }

    const nepaliDice = toNepaliNumber(val);

    return (
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold text-indigo-700 leading-none">
          {nepaliDice}
        </span>
        <span className="text-[10px] text-slate-500 font-bold mt-0.5">({val})</span>
      </div>
    );
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <Dices className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 leading-tight">
              खेल नियन्त्रण (Game Controls)
            </h3>
            <p className="text-xs text-slate-500">पासा गुल्ट्याउनुहोस् र अघि बढ्नुहोस्</p>
          </div>
        </div>

        {/* Player Count Picker */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
          <Users className="w-3.5 h-3.5 text-slate-500 ml-1" />
          <span className="text-xs font-semibold text-slate-600">खेलाडी:</span>
          {[2, 3, 4].map((count) => (
            <button
              key={count}
              onClick={() => onPlayerCountChange(count)}
              className={`px-2 py-0.5 text-xs font-bold rounded ${
                players.length === count
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {toNepaliNumber(count)}
            </button>
          ))}
        </div>
      </div>

      {/* Current Turn & Dice Roll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        {/* Active Player Card */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold shadow-sm ${currentPlayer.bgColor}`}
          >
            {currentPlayer.id}
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">
              अहिलेको पालो
            </span>
            <h4 className="font-bold text-sm text-slate-900 truncate">
              {currentPlayer.name}
            </h4>
            <span className="text-xs font-medium text-slate-600">
              हालको घर: <strong className="text-indigo-700">{toNepaliNumber(currentPlayer.position)}</strong>
            </span>
          </div>
        </div>

        {/* Dice & Roll Button */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-indigo-50 border-2 border-indigo-300 rounded-2xl flex items-center justify-center shadow-xs">
            {renderDiceFace(lastDice)}
          </div>
          <button
            id="roll-dice-btn"
            disabled={isRolling || currentPlayer.hasWon}
            onClick={() => {
              const rolled = Math.floor(Math.random() * 6) + 1;
              onRollDice(rolled);
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
              currentPlayer.hasWon
                ? 'bg-amber-600 text-white'
                : isRolling
                ? 'bg-indigo-300 text-white cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white'
            }`}
          >
            <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
            <span>{isRolling ? 'पासा घुम्दैछ...' : 'पासा गुल्ट्याउनुहोस्'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Game Action Message */}
      {gameMessage && (
        <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs sm:text-sm font-medium text-indigo-950 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>{gameMessage}</span>
        </div>
      )}

      {/* Players Progress Summary */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          खेलाडीहरूको स्थिति (Players Progress):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {players.map((p, idx) => (
            <div
              key={p.id}
              className={`p-2 rounded-xl border text-xs flex flex-col justify-between ${
                idx === currentPlayerIndex
                  ? 'border-indigo-400 bg-indigo-50/70 ring-1 ring-indigo-300'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className={`w-3.5 h-3.5 rounded-full inline-block ${p.bgColor}`}
                ></span>
                <span className="font-semibold text-slate-800 truncate">
                  {p.name}
                </span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-500 text-[10px]">घर</span>
                <span className="text-slate-900 text-xs">
                  {toNepaliNumber(p.position)}
                  {p.position === 100 && ' 🏆'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Game Button */}
      <div className="pt-2 border-t border-slate-100 flex justify-end">
        <button
          onClick={onResetGame}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition-colors font-medium px-2 py-1 rounded hover:bg-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>खेल पुनः सुरु गर्नुहोस् (Reset)</span>
        </button>
      </div>
    </div>
  );
};
