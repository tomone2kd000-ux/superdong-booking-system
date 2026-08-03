import Link from "next/link";
import Image from "next/image";
import { BookOpen, ChevronRight, Layers, ShieldCheck, Cpu, Code2, Sparkles, Anchor } from "lucide-react";
import { appName } from "@/lib/shared";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50/50 dark:bg-zinc-950 text-stone-900 dark:text-zinc-100 flex flex-col justify-between">
      <header className="border-b border-stone-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-lg tracking-tight">{appName}</span>
          </div>
          <Link
            href="/docs/chuong-00-tong-quan-nghiep-vu-kien-truc/01-strategic-domain-va-bounded-contexts"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Đọc Sách Ngay
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex-1 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-amber-800 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-900">
            <Anchor className="w-3.5 h-3.5" /> Superdong Ferries Booking Architecture & 36-Step Workflow
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-stone-900 dark:text-white font-serif">
            Superdong Booking System: Master Architectural & Practice Book
          </h1>

          <p className="text-lg text-stone-600 dark:text-zinc-400 leading-relaxed">
            Cuốn sách chuyên sâu phân tích toàn bộ 33 Thực thể ERD, 41 Decisions, 34 Invariants, 6 State Machines và Quy trình triển khai 36 bước Topo hệ thống đặt vé tàu cao tốc Superdong.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/docs/chuong-00-tong-quan-nghiep-vu-kien-truc/01-strategic-domain-va-bounded-contexts"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-base font-bold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-5 h-5" /> Vào Đọc Sách Ngay <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Link
              href="/docs/chuong-00-tong-quan-nghiep-vu-kien-truc/01-strategic-domain-va-bounded-contexts"
              className="p-4 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-500 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 text-amber-600 font-bold text-sm mb-1">
                <Layers className="w-4 h-4" /> Chương 0: Tổng Quan Kiến Trúc
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Strategic Domain, Porto Containers, Single Task Transaction & 33 Thực thể ERD.
              </p>
            </Link>

            <Link
              href="/docs/chuong-01-ha-tang-nhat-ky-baom-mat/01-buoc-00-01-preflight-va-architecture-contract"
              className="p-4 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-500 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 text-amber-600 font-bold text-sm mb-1">
                <ShieldCheck className="w-4 h-4" /> Chương 1: Hạ Tầng & Bảo Mật
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Bước 0 - Bước 5: Preflight, Architecture Contract, RBAC, Settings, Audit & Outbox.
              </p>
            </Link>

            <Link
              href="/docs/chuong-03-dat-ve-va-quan-ly-ghe/01-buoc-11-13-booking-aggregate-guest-access-va-seat-registry"
              className="p-4 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-500 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 text-amber-600 font-bold text-sm mb-1">
                <Cpu className="w-4 h-4" /> Chương 3: Đặt Vé & Khóa Ghế
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Bước 11 - Bước 18: Booking Aggregate, Canonical Seat Inventory & Finalize Hold.
              </p>
            </Link>

            <Link
              href="/docs/chuong-04-thanh-toan-va-qr-checkin/01-buoc-19-22-ticket-foundation-payment-adapter-va-counter-cashier"
              className="p-4 rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-500 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3 text-amber-600 font-bold text-sm mb-1">
                <BookOpen className="w-4 h-4" /> Chương 4: Thanh Toán & Soát Vé
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Bước 19 - Bước 26: Ticket QR, Payment Adapters, Reconcile & Check-in Reversal.
              </p>
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="relative group max-w-xs w-full block">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 blur-lg opacity-25"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-zinc-800 bg-stone-900">
              <img
                src="/cover.jpeg"
                alt="Superdong Booking System Book Cover"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-stone-200 dark:border-zinc-800 py-6 text-center text-xs text-stone-500 dark:text-zinc-400">
        © 2026 {appName}. Được biên soạn chuẩn theo Fumadocs Web Docs & Kindle Reader Mode.
      </footer>
    </main>
  );
}
