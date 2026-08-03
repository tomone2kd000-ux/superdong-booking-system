'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Type, Palette } from 'lucide-react';

type PaperTheme = 'cream' | 'warm' | 'parchment' | 'mint';
type FontFamily = 'serif' | 'sans';
type FontSize = 'normal' | 'medium' | 'large' | 'xlarge';

const THEMES: Record<PaperTheme, { bg: string; text: string; label: string }> = {
  cream: { bg: '#faf7f0', text: '#2b251e', label: 'Giấy Kem (Cream)' },
  warm: { bg: '#f4ecd8', text: '#332719', label: 'Ấm Áp (Warm)' },
  parchment: { bg: '#e8dfcf', text: '#2c2217', label: 'Cổ Tích (Parchment)' },
  mint: { bg: '#eef5ee', text: '#1b2a1b', label: 'Lá Bạc Hà (Mint)' },
};

const FONT_SIZES: Record<FontSize, { size: string; label: string }> = {
  normal: { size: '1rem', label: 'Vừa (16px)' },
  medium: { size: '1.125rem', label: 'Lớn (18px)' },
  large: { size: '1.25rem', label: 'Rất Lớn (20px)' },
  xlarge: { size: '1.375rem', label: 'Cực Lớn (22px)' },
};

export function KindleReaderControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<PaperTheme>('cream');
  const [fontFamily, setFontFamily] = useState<FontFamily>('serif');
  const [fontSize, setFontSize] = useState<FontSize>('normal');

  useEffect(() => {
    const saved = localStorage.getItem('kindle-reader-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.theme && THEMES[parsed.theme as PaperTheme]) setTheme(parsed.theme);
        if (parsed.fontFamily) setFontFamily(parsed.fontFamily);
        if (parsed.fontSize && FONT_SIZES[parsed.fontSize as FontSize]) setFontSize(parsed.fontSize);
      } catch (e) {
        // Ignore JSON error
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply Settings to Root CSS Variables
    root.style.setProperty('--kindle-bg', THEMES[theme].bg);
    root.style.setProperty('--kindle-text', THEMES[theme].text);
    root.style.setProperty('--kindle-font-size', FONT_SIZES[fontSize].size);
    
    if (fontFamily === 'serif') {
      root.classList.add('use-kindle-serif');
      root.classList.remove('use-kindle-sans');
    } else {
      root.classList.add('use-kindle-sans');
      root.classList.remove('use-kindle-serif');
    }

    localStorage.setItem(
      'kindle-reader-settings',
      JSON.stringify({ theme, fontFamily, fontSize })
    );
  }, [theme, fontFamily, fontSize]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-md shadow-xs bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-700 transition-colors"
        title="Tùy chỉnh chế độ đọc Kindle"
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span>Chế Độ Đọc</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 p-4 rounded-xl shadow-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 z-50 text-stone-900 dark:text-zinc-100">
          <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-zinc-800 mb-3">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" /> Tùy Chỉnh Đọc Kindle
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>

          {/* Theme selection */}
          <div className="mb-4">
            <label className="text-xs font-semibold flex items-center gap-1 mb-2 text-stone-600 dark:text-zinc-400">
              <Palette className="w-3.5 h-3.5" /> Màu Nền Giấy (Light Mode)
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(THEMES) as PaperTheme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`text-xs p-2 rounded-md border text-left flex items-center justify-between transition-all ${
                    theme === t
                      ? 'border-amber-600 ring-1 ring-amber-600 font-semibold'
                      : 'border-stone-200 dark:border-zinc-800 hover:border-amber-400'
                  }`}
                  style={{ backgroundColor: THEMES[t].bg, color: THEMES[t].text }}
                >
                  <span>{THEMES[t].label.split(' ')[0]}</span>
                  <span
                    className="w-3 h-3 rounded-full border border-stone-400"
                    style={{ backgroundColor: THEMES[t].bg }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Font Family selection */}
          <div className="mb-4">
            <label className="text-xs font-semibold flex items-center gap-1 mb-2 text-stone-600 dark:text-zinc-400">
              <Type className="w-3.5 h-3.5" /> Phông Chữ
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFontFamily('serif')}
                className={`py-1.5 px-3 text-xs rounded-md border font-serif transition-all ${
                  fontFamily === 'serif'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold'
                    : 'border-stone-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800'
                }`}
              >
                Lora (Serif)
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`py-1.5 px-3 text-xs rounded-md border font-sans transition-all ${
                  fontFamily === 'sans'
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold'
                    : 'border-stone-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800'
                }`}
              >
                Inter (Sans)
              </button>
            </div>
          </div>

          {/* Font Size selection */}
          <div>
            <label className="text-xs font-semibold flex items-center gap-1 mb-2 text-stone-600 dark:text-zinc-400">
              <Type className="w-3.5 h-3.5" /> Cỡ Chữ Nội Dung
            </label>
            <div className="grid grid-cols-4 gap-1">
              {(Object.keys(FONT_SIZES) as FontSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={`py-1.5 text-xs rounded-md border transition-all ${
                    fontSize === s
                      ? 'border-amber-600 bg-amber-600 text-white font-bold'
                      : 'border-stone-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {s === 'normal' ? '1x' : s === 'medium' ? '1.1x' : s === 'large' ? '1.2x' : '1.3x'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
