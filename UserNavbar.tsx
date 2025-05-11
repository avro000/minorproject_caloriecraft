import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GraduationCapIcon, Menu } from "lucide-react";
import { ModeToggle } from "../Sidebar/mode-toggle";
import { UserAvatarDropdown } from "./UserAvatarDropdown";

export const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="fixed border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <div className="bg-[oklch(0.488_0.243_264.376)] text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GraduationCapIcon className="size-4" />
              </div>
              <span className="text-primary pl-2 truncate font-medium">IntelliQuest.</span>
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                />
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="flex flex-row items-center">
                    <div className="bg-[oklch(0.488_0.243_264.376)] text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <GraduationCapIcon className="size-4" />
                    </div>
                    <span className="text-primary pl-2 truncate font-medium">IntelliQuest.</span>
                  </SheetTitle>
                </SheetHeader>
                          </SheetContent>
                      </Sheet>
                  </span>

                  <div className="hidden md:flex gap-5">
                      <ModeToggle />
                      <UserAvatarDropdown />
                  </div>                 
              </NavigationMenuList>
          </NavigationMenu>
      </header>
  );
};
