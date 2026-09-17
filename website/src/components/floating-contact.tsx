"use client";

import { MessageCircle } from "lucide-react";
import { contact } from "@/lib/site-config";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 md:bottom-7 md:right-7">
      <a
        href={contact.line}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-[#06C755] px-4 text-sm font-medium text-white shadow-lg transition hover:brightness-110"
        aria-label="Chat on LINE"
      >
        <MessageCircle size={18} />
        LINE
      </a>
      <a
        href={contact.whatsapp}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-medium text-white shadow-lg transition hover:brightness-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
