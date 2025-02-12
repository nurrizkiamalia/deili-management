"use client";

import { useState } from "react";
import { RiMenu2Line, RiCloseLine, RiDashboardHorizontalLine, RiNotification4Line } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";
import { GoProject } from "react-icons/go";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { signOut } from "next-auth/react";
import NotificationCount from "../NotificationCount";
import { boards } from "@/types/datatypes";
import { useBoardByUser } from "@/hooks/useBoard";

const projects = [
  { id: 1, name: "Project 1", link: "/board/1" },
  { id: 2, name: "Project 2", link: "/board/2" },
];

interface SideNavProps {
  boards?: boards[];
}

const ResponsiveSideNav: React.FC<SideNavProps> = ({boards = []}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, loading } = useUser();
  const { pendingInvitations } = useBoardByUser(user?.id);

  const getUserInitials = () => {
    if (!user) return "U";
    const initials = `${user.firstName[0] || ""}${user.lastName[0] || ""}`.toUpperCase();
    return initials;
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex w-full md:hidden flex-col shadow-md">
      {/* Navbar with Menu Button */}
      <div className="flex justify-end items-center p-5 border-b-2 border-dspLightGray">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {isDropdownOpen ? (
            <RiCloseLine className="text-dspOrange text-2xl" />
          ) : (
            <RiMenu2Line className="text-dspOrange text-2xl" />
          )}
        </button>
      </div>

      {/* Dropdown Sidebar */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isDropdownOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col w-full bg-dspLightPink p-5 border-t-2 border-dspLightGray text-dspBlack">
          {/* Main Menu */}
          <div className="py-3">
            <p className="font-dmsans flex items-center gap-3 font-semibold py-1 px-3 border-2 rounded-lg">
              <RiMenu2Line className="text-dspOrange text-xl" /> MAIN MENU
            </p>
            <div className="flex flex-col gap-3 ml-4 font-bold mt-3">
              <Link className="flex items-center gap-1 hover:text-dspOrange" href="/">
                <RiDashboardHorizontalLine /> Dashboard
              </Link>
              <Link className="flex items-center gap-1 hover:text-dspOrange relative" href="/notification">
                <RiNotification4Line /> Notification
                <NotificationCount boards={pendingInvitations}/>
              </Link>
            </div>
          </div>

          <hr className="border-dashed border-dspGray my-3" />

          {/* Projects */}
          <div className="py-3 text-dspBlack">
            <p className="font-dmsans flex items-center gap-3 font-semibold py-1 px-3 border-2 rounded-lg">
              <GoProject className="text-dspOrange text-xl" /> PROJECT
            </p>
            <div className="flex flex-col gap-3 ml-4 mt-3">
              {projects.map((project, index) => (
                <Link
                  href={project.link}
                  key={index}
                  className="flex items-center gap-1 font-semibold hover:text-dspOrange"
                >
                  <TbPointFilled /> {project.name}
                </Link>
              ))}
            </div>
          </div>

          <hr className="border-dashed border-dspGray my-3" />

          {/* User Info */}
          <div className="h-full w-full flex items-end gap-5 justify-center">
            {loading ? (
              <div>Loading...</div>
            ) : user ? (
              <div
                className="relative w-full"
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <div
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="w-full p-3 bg-dspLightPink border-2 border-dspLightGray flex items-center gap-2 rounded-xl cursor-pointer"
                >
                  <div className="w-12 h-12 bg-dspGray rounded-full flex items-center justify-center text-white font-bold">
                    {getUserInitials()}
                  </div>
                  <div className="text-sm font-semibold">
                    <h2 className="text-dspDarkGray font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
                  </div>
                </div>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    className="absolute z-50 left-0 -top-20 w-full mt-2 bg-white border-2 rounded-lg shadow-lg font-semibold"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-dspDarkGray hover:bg-dspLightGray"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-dspLightGray"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="flex gap-5 font-bold"
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveSideNav;
