"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoHomeOutline,
  IoPulseOutline,
  IoPersonOutline,
  IoChatbubbleEllipsesOutline,
  IoCardOutline,
} from "react-icons/io5";

const items = [
  { label: "Home", icon: IoHomeOutline, href: "/app" },
  { label: "Your Data", icon: IoPulseOutline, href: "/app/your-data" },
  { label: "Profile", icon: IoPersonOutline, href: "/app/profile" },
  { label: "Chat", icon: IoChatbubbleEllipsesOutline, href: "/app/chat" },
  { label: "Membership", icon: IoCardOutline, href: "/app/membership" },
];

export default function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-4 pb-safe pt-2 backdrop-blur sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-5 gap-1 pb-2">
        {items.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-xl py-2 text-[11px] font-semibold transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-muted hover:bg-gray-50 hover:text-ink"
              }`}
            >
              <Icon className="text-[20px] leading-none" />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
