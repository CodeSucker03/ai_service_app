"use client";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../../constants/index";
import { usePathname } from "next/navigation";
import Button from "./Button";
import MenuSvg from "../../public/assets/svg/MenuSvg.jsx";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "@/lib/actions/auth.action";

const Header = ({ user }) => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const toggleNav = () => {
    if (openNav) {
      setOpenNav(false);
      enablePageScroll();
    } else {
      setOpenNav(true);
      disablePageScroll();
    }
  };
  const handleClick = async (title) => {
    if (title == "Sign Out") {
      await signOut();
    }
    if (!openNav) return;
    enablePageScroll();
    setOpenNav(false);
  };
  const handleOut = async () => {
    await signOut();
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full z-20 py-2
      lg:bg-n-8/90 lg:backdrop-blur-sm ${openNav ? "bg-n-7" : "bg-n-7"}`}
    >
      <div
        className="flex items-center max-md:py-1 px-4 lg:px-7 xl:px-10 
      max-lg:py-3 "
      >
        <Link href="/">
          <img
            src="/assets/brainwave.svg"
            width={190}
            height={40}
            alt="Brainwave"
          ></img>
        </Link>
        <nav
          className={` ${
            openNav ? "bg-black" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 
        lg:static lg:flex lg:mx-auto`} // hidden on mobile unless openNav is true,always flex on desktop
        >
          {pathname == "/" && (
            <div
              className="relative flex flex-col items-center 
            justify-center m-auto lg:flex-row  "
            >
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={() => handleClick(item.title)}
                  className={`block relative font-code text-2xl uppercase text-color-1
                  transition-colors px-6 py-6 md:py-8
                  lg:-mr-0.25 lg:text-sm lg:font-semibold
                lg:text-n-1/45 hover:text-color-1 lg:hover:text-color-1
                  ${item.onlyMobile ? "lg:hidden" : ""}
                  ${item.url === pathname.hash ? "z-2 text-n-1" : ""}
                  xl:px-10 `}
                >
                  {item.title != "Sign In" && user && item.title}
                </a>
              ))}
            </div>
          )}
          <HamburgerMenu></HamburgerMenu>
        </nav>
        {!user ? (
          <a
            href="/sign-up"
            className="button hidden mr-8 text-n-1/50
         transition-colors hover:text-n-1 lg:block"
          >
            New account
          </a>
        ) : (
          <a
            className="button hidden mr-8 text-n-1/50
         transition-colors hover:text-n-1 lg:block"
            onClick={handleOut}
          >
            Log Out
          </a>
        )}

        {!user ? (
          <div className="hidden lg:flex">
            <Button href="login">Sign In</Button>
          </div>
        ) : (
          <div className="hidden lg:flex">
            <img
              className="w-10 h-10 border-2 rounded-full overflow-hidden self-end"
              src={"/profile.svg"}
            />
          </div>
        )}
        {pathname == "/" && <Button className={"ml-auto lg:hidden"} px="px-3" onClick={toggleNav}>
          <MenuSvg openNavigation={openNav}></MenuSvg>
        </Button>}
      </div>
    </div>
  );
};

export default Header;
