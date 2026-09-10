"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/layout/Logo";

const NAV_ITEMS = [{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard }];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-secondary-800 text-white">
      <div className="p-6">
        <Logo variant="dark" />
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary-600 text-white"
                  : "text-secondary-200 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-secondary-200 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
