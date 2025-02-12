"use client";

import { useState } from "react";
import { RiMenu2Line, RiDashboardHorizontalLine, RiNotification4Line } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";
import { GoProject } from "react-icons/go";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { boards } from "@/types/datatypes";
import NotificationCount from "../NotificationCount";
import { useBoardByUser } from "@/hooks/useBoard";

interface SideNavProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  boards?: boards[];
}

const projects = [
  { id: 1, name: "Project 1", link: "/board/1" },
  { id: 2, name: "Project 2", link: "/board/2" },
];

const SideNav: React.FC<SideNavProps> = ({ isOpen, setIsOpen, boards = []  }) => {
  const { user, loading } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { pendingInvitations } = useBoardByUser(user?.id);

  const getUserInitials = () => {
    if (!user) return "U";
    const initials = `${user.firstName[0] || ""}${
      user.lastName[0] || ""
    }`.toUpperCase();
    return initials;
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div
      className="relative h-screen w-fit hidden md:flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Closed Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-20 bg-white border-2 rounded-r-3xl border-dspLightGray transition-transform duration-500 ease-in-out ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full items-center">
          <h1 className="p-5 text-center font-bold text-xl">D</h1>
          <hr className="border-dashed border-dspGray" />
          <div className="font-bold text-xl flex flex-col items-center p-5 gap-5">
            <div className="relative items-center">
              <RiMenu2Line className="text-dspOrange text-xl" />
                <NotificationCount boards={pendingInvitations}/>
            </div>
            <GoProject className="text-dspOrange text-xl" />
          </div>
          <div className="h-full w-full flex items-end justify-center pb-5">
            <div className="w-12 h-12 bg-dspGray rounded-full flex items-center justify-center text-white font-bold">
              {getUserInitials()}
            </div>
          </div>
        </div>
      </div>

      {/* Open Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-fit bg-white border-2 rounded-r-3xl border-dspLightGray transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <Link className="p-5 text-xl font-black text-center" href="/">
            Deili.
          </Link>
          <hr className="border-dashed border-dspGray" />

          {/* Main Menu */}
          <div className="p-5 flex flex-col gap-3 text-dspBlack">
            <p className="font-dmsans flex items-center gap-3 font-semibold py-1 px-3 border-2 rounded-lg">
              <RiMenu2Line className="text-dspOrange text-xl" /> MAIN MENU
            </p>
            <div className="flex flex-col gap-3 ml-8 font-semibold">
              <Link
                className="flex items-center gap-1 hover:text-dspOrange "
                href="/"
              >
                <RiDashboardHorizontalLine /> Dashboard
              </Link>
              <Link
                className="flex items-center gap-1 hover:text-dspOrange relative"
                href="/notification"
              >
                <RiNotification4Line /> Notification
                <NotificationCount boards={pendingInvitations}/>
              </Link>
            </div>
          </div>

          <hr className="border-dashed border-dspGray" />

          {/* Projects */}
          <div className="p-5 flex flex-col gap-3 text-dspBlack">
            <p className="font-dmsans flex items-center gap-3 font-semibold py-1 px-3 border-2 rounded-lg">
              <GoProject className="text-dspOrange text-xl" /> PROJECT
            </p>
            <div className="flex flex-col gap-3 ml-8">
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

          <hr className="border-dashed border-dspGray" />

          {/* User Info */}
          <div className="h-full w-full flex items-end p-5">
            {loading ? (
              <div>Loading...</div>
            ) : user ? (
              <div
                className="relative w-full"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
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
                {isDropdownOpen && (
                  <div className="absolute z-50 left-[90%] -top-4 w-full mt-2 bg-white rounded-lg shadow-lg border-2 font-semibold">
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
                className="h-full w-full flex items-end p-5 gap-5 justify-center font-bold"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link href="/login" className="hover:text-dspOrange">
                  Login
                </Link>{" "}
                |{" "}
                <Link href="/register" className="hover:text-dspOrange">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
