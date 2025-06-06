import {
  LayoutDashboard,
  Package,
  Calendar,
  Truck,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  TrendingUp,
  Users,
  ShoppingCart,
  BarChart3,
  CircleDollarSign,
  Factory,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "factory",
          url: "/dashboard/factory",
          icon: Factory,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Products",
          url: "/dashboard/products",
          icon: Package,
        },
        {
          title: "Orders",
          url: "/dashboard/orders",
          icon: ShoppingCart,
        },
        {
          title: "Suppliers",
          url: "/dashboard/suppliers",
          icon: Truck,
        },
        {
          title: "Marketing",
          url: "/dashboard/Marketing",
          icon: Users,
        },
      ],
    },
    {
      title: "Business",
      items: [
        {
          title: "Earnings",
          url: "/dashboard/earnings",
          icon: CircleDollarSign,
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
          icon: BarChart3,
        },
        
      ],
    },
  ],
  bottomItems: [
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      url: "/support",
      icon: HelpCircle,
    },
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props} className="border-r border-yellow-200">
      <SidebarHeader className="border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-yellow-100">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 text-white">
                <span className="font-bold text-sm">A</span>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold text-gray-900">Ajaika Business</span>
                <span className="text-xs text-gray-600">B2B Platform</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-yellow-50/50 to-white">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-yellow-800 font-semibold">{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      className="hover:bg-yellow-100 data-[active=true]:bg-yellow-200 data-[active=true]:text-yellow-900"
                    >
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
        <SidebarMenu>
          {data.bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="hover:bg-yellow-100">
                <a href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {item.title === "Notifications" && <div className="ml-auto w-2 h-2 bg-yellow-500 rounded-full"></div>}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* User Profile Section */}
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">H</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Harita Kanuri</p>
              <p className="text-xs text-gray-600 truncate">Store Administrator</p>
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
