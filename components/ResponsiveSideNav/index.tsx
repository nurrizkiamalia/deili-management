"use client";

import { useState } from "react";
import { RiMenu2Line, RiCloseLine, RiDashboardHorizontalLine, RiNotification4Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import { GoProject } from "react-icons/go";
import Link from "next/link";

const projects = [
  { id: 1, name: "Project 1", link: "/project" },
  { id: 2, name: "Project 2", link: "/project" },
];

const ResponsiveSideNav: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex w-full md:hidden flex-col">
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
        <div className="flex flex-col w-full bg-dspLightPink p-5 border-t-2 border-dspLightGray">
          {/* Main Menu */}
          <div className="py-3">
            <p className="font-dmsans flex items-center gap-3 font-semibold text-dspGray">
              <RiMenu2Line className="text-dspOrange text-xl" /> MAIN MENU
            </p>
            <div className="flex flex-col gap-3 ml-4 font-bold text-dspGray mt-3">
              <Link className="flex items-center gap-1" href="/">
                <RiDashboardHorizontalLine /> Dashboard
              </Link>
              <button className="flex items-center gap-1">
                <RiNotification4Line /> Notification
              </button>
            </div>
          </div>

          <hr className="border-dashed border-dspGray my-3" />

          {/* Projects */}
          <div className="py-3">
            <p className="font-dmsans flex items-center gap-3 font-semibold text-dspGray">
              <GoProject className="text-dspOrange text-xl" /> PROJECT
            </p>
            <div className="flex flex-col gap-3 ml-4 mt-3">
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

          <hr className="border-dashed border-dspGray my-3" />

          {/* User Info */}
          <div className="flex items-center gap-3 p-3 bg-dspLightPink border-2 border-dspLightGray rounded-xl">
            <div className="w-12 h-12 bg-dspGray rounded-full" />
            <div className="text-sm font-semibold">
              <h2>Amalia</h2>
              <p className="text-dspGray">Software Engineer</p>
            </div>
            <button className="ml-auto p-1 rounded-full border-2 border-dspOrange text-dspOrange">
              <IoIosArrowDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveSideNav;