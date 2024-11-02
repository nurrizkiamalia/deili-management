"use client";

import { RiMenu2Line, RiDashboardHorizontalLine, RiNotification4Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import { GoProject } from "react-icons/go";
import Link from "next/link";

interface SideNavProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const projects = [
  { id: 1, name: "Project 1", link: "/board" },
  { id: 2, name: "Project 2", link: "/board" },
];

const SideNav: React.FC<SideNavProps> = ({ isOpen, setIsOpen }) => {
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
        {/* Closed Sidebar Content */}
        <div className="flex flex-col h-full items-center">
          <h1 className="p-5 text-center font-bold text-xl">D</h1>
          <hr className="border-dashed border-dspGray" />
          <div className="font-bold text-xl flex flex-col items-center p-5 gap-5">
            <RiMenu2Line className="text-dspOrange text-xl" />
            <GoProject className="text-dspOrange text-xl" />
          </div>
          <div className="h-full w-full flex items-end justify-center pb-5">
            <div className="w-12 h-12 bg-dspGray rounded-full" />
          </div>
        </div>
      </div>

      {/* Open Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-fit bg-white border-2 rounded-r-3xl border-dspLightGray transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Open Sidebar Content */}
        <div className="flex flex-col h-full">
          <Link className="px-10 py-5 text-xl font-bold" href="/">Deili Management.</Link>
          <hr className="border-dashed border-dspGray" />

          {/* Main Menu */}
          <div className="py-5 px-10 flex flex-col gap-3">
            <p className="font-dmsans flex items-center gap-3 font-semibold text-dspGray">
              <RiMenu2Line className="text-dspOrange text-xl" /> MAIN MENU
            </p>
            <div className="flex flex-col gap-3 ml-8 font-bold text-dspGray">
              <Link className="flex items-center gap-1" href="/">
                <RiDashboardHorizontalLine /> Dashboard
              </Link>
              <button className="flex items-center gap-1">
                <RiNotification4Line /> Notification
              </button>
            </div>
          </div>

          <hr className="border-dashed border-dspGray" />

          {/* Projects */}
          <div className="py-5 px-10 flex flex-col gap-3">
            <p className="font-dmsans flex items-center gap-3 font-semibold text-dspGray">
              <GoProject className="text-dspOrange text-xl" /> PROJECT
            </p>
            <div className="flex flex-col gap-3 ml-8">
              {projects.map((project, index) => (
                <Link
                  href={project.link}
                  key={index}
                  className="flex items-center gap-1 font-semibold text-dspGray"
                >
                  <TbPointFilled /> {project.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="h-full w-full flex items-end p-5">
            <div className="w-full p-3 bg-dspLightPink border-2 border-dspLightGray flex items-center gap-2 rounded-xl">
              <div className="w-12 h-12 bg-dspGray rounded-full" />
              <div className="text-sm font-semibold">
                <h2>Amalia</h2>
                <p className="text-dspGray text-xs">Software Engineer</p>
              </div>
              <button className="p-1 rounded-full border-2 border-dspOrange text-dspOrange">
                <IoIosArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
