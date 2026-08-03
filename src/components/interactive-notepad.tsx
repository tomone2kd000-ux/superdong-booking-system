'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, CheckCircle2, Trash2, Copy, Sparkles, BookMarked } from 'lucide-react';

export function InteractiveNotepad() {
  const [notes, setNotes] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('saved');
  const [copied, setCopied] = useState<boolean>(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved notes from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('dozy_book_study_notepad');
    if (savedContent) {
      setNotes(savedContent);
    }
  }, []);

  // Handle typing & auto-save to localStorage
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
    setSaveStatus('saving');

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('dozy_book_study_notepad', value);
      setSaveStatus('saved');
    }, 500);
  };

  const handleClear = () => {
    if (confirm('Bạn có chắc chắn muốn xóa sạch toàn bộ nội dung trong sổ tay ghi chép này không?')) {
      setNotes('');
      localStorage.removeItem('dozy_book_study_notepad');
      setSaveStatus('saved');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 border border-stone-300 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-md overflow-hidden transition-all">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-stone-100/90 dark:bg-zinc-800/90 border-b border-stone-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-stone-800 dark:text-zinc-200 font-bold text-base">
          <BookMarked className="w-5 h-5 text-amber-600" />
          <span>Sổ Tay Ghi Chép Trực Tiếp (Auto-Save)</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {saveStatus === 'saving' ? (
              <span className="text-amber-600 animate-pulse flex items-center gap-1">
                <Save className="w-3.5 h-3.5 animate-spin" /> Đang tự động lưu...
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Đã tự động lưu vào trình duyệt
              </span>
            )}
          </div>

          <button
            onClick={handleCopy}
            disabled={!notes}
            className="p-2 text-xs font-medium text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
            title="Sao chép toàn bộ ghi chép"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleClear}
            disabled={!notes}
            className="p-2 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
            title="Xóa toàn bộ ghi chép"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Textarea */}
      <div className="p-4 bg-stone-50/40 dark:bg-zinc-950/40">
        <textarea
          value={notes}
          onChange={handleChange}
          placeholder="Nhập bất kỳ ghi chép, suy nghĩ, code snippet hoặc ý tưởng nào của bạn vào đây... Nội dung sẽ TỰ ĐỘNG LƯU liên tục vào trình duyệt khi bạn gõ!"
          rows={18}
          className="w-full p-4 text-base font-sans leading-relaxed text-stone-900 dark:text-zinc-100 bg-transparent border-0 resize-y focus:outline-hidden placeholder:text-stone-400 dark:placeholder:text-zinc-600 font-normal"
        />
      </div>

      {/* Footer Info */}
      <div className="px-5 py-2.5 bg-stone-100/60 dark:bg-zinc-900/60 border-t border-stone-200 dark:border-zinc-800/80 flex items-center justify-between text-xs text-stone-500 dark:text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Nội dung lưu tự động trong localStorage. Đóng trình duyệt hay F5 vẫn còn nguyên vẹn.</span>
        </div>
        <div className="font-mono">{notes.length} ký tự</div>
      </div>
    </div>
  );
}
