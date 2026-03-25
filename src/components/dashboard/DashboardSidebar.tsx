import { Home, MessageCircle, CalendarCheck, Heart, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const navItems = [
  { title: "Página Inicial", url: "/", icon: Home },
  { title: "Entre em Contato", url: "#contato", icon: MessageCircle },
  { title: "Agende sua Consultoria", url: "#agendar", icon: CalendarCheck },
  { title: "Meus Matches", url: "/dashboard", icon: Heart },
];

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-4 top-4 bottom-4 z-50 w-56 flex flex-col
          rounded-2xl border border-border
          bg-background/70 backdrop-blur-xl
          shadow-[0_8px_32px_hsl(217_91%_35%_/_0.08)]
          transition-transform duration-300 ease-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-[calc(100%+2rem)]"}
        `}
      >
        {/* Blue top accent */}
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center px-6 pt-8 pb-6">
          <img src={logo} alt="franchiMatch" className="h-8" />
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 pt-6">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/80 transition-smooth hover:bg-primary/5 hover:text-foreground"
            >
              <item.icon className="h-4 w-4 text-primary transition-smooth group-hover:text-primary-light" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4">
          <div className="mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
          <p className="text-center text-[10px] text-muted-foreground/60">
            © 2026 franchiMatch
          </p>
        </div>
      </aside>
    </>
  );
}
