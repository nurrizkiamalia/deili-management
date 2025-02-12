"use client";
import React, { useState } from "react";
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { JobRole } from "@/types/datatypes";

const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  return (firstName[0] + (lastName ? lastName[0] : "")).toUpperCase();
};

export const BoardAssigneeTooltip = ({
  items,
}: {
  items: {
    userId: string | number;
    userName: string;
    role?: string;
    status?: string;
    jobRole?: JobRole;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); 
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`-mr-4 relative group ${item.status === "REJECTED" ? "hidden" : ""}`}
          onMouseEnter={() => setHoveredIndex(item.userId)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.userId && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX, rotate }}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
                <div className="font-bold text-white relative z-30 text-base whitespace-nowrap">{item.userName}</div>
                <div className="text-white text-xs whitespace-nowrap">{item.jobRole?.title}</div>
                <div className="text-white text-xs whitespace-nowrap">{item.role}{item.status === "PENDING" ? " - ON HOLD" : ""}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            onMouseMove={handleMouseMove}
            className="flex items-center justify-center bg-gray-500 text-white rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
          >
            {getInitials(item.userName)}
          </div>
        </div>
      ))}
    </>
  );
};
