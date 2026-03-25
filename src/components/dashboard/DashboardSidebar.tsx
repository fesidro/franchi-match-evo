import { MessageCircle, CalendarCheck, Info, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Visão Geral", url: "/dashboard", icon: LayoutDashboard },
  { title: "Entre em contato", url: "#contato", icon: MessageCircle },
  { title: "Agende uma consultoria", url: "#agendar", icon: CalendarCheck, highlight: true },
  { title: "Saiba mais", url: "#saiba-mais", icon: Info },
];

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4 flex items-center justify-center">
        <img src={logo} alt="franchiMatch" className="h-8 group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      item.highlight
                        ? "text-secondary hover:bg-secondary/10 font-medium"
                        : ""
                    }
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <p className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden text-center">
          © 2026 franchiMatch
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
