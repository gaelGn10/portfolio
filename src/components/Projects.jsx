import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const projects = [
  {
    name: "Stock Management — AIGLE D'OR",
    description:
      "A professional web application for stock and inventory management built for AIGLE D'OR. Features real-time item tracking, low-stock alerts, and detailed reporting dashboards.",
    tags: [
      { name: "React",      bg: "#20232a", color: "#61dafb", border: "#61dafb" },
      { name: "PostgreSQL", bg: "#1a2744", color: "#4fc3f7", border: "#336791" },
    ],
  },
  {
    name: "E-commerce — React + Bagisto API",
    description:
      "A modern, high-performance online store using React for the frontend, connected to the headless Bagisto (Laravel) API for catalog management, shopping cart, and order processing.",
    tags: [
      { name: "React",      bg: "#20232a", color: "#61dafb", border: "#61dafb" },
      { name: "Laravel",    bg: "#2d0a0a", color: "#ff6b6b", border: "#ff2d20" },
      { name: "PostgreSQL", bg: "#1a2744", color: "#4fc3f7", border: "#336791" },
    ],
  },
];

const tagColors = {
  React:      { bg: "#20232a", text: "#61dafb", border: "#61dafb", glow: "#61dafb55" },
  PostgreSQL: { bg: "#0d1f3c", text: "#7ec8e3", border: "#336791", glow: "#33679155" },
  Laravel:    { bg: "#2d0808", text: "#ff7a7a", border: "#ff2d20", glow: "#ff2d2055" },
};

const TechTag = ({ name, bg, color, border }) => (
  <motion.span
    whileHover={{ scale: 1.1, y: -2 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide cursor-default select-none"
    style={{
      background: bg,
      color: color,
      border: `1.5px solid ${border}`,
      boxShadow: `0 0 12px ${border}55, inset 0 0 8px ${border}11`,
      textShadow: `0 0 8px ${color}99`,
    }}
  >
    <span
      className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
    />
    {name}
  </motion.span>
);

const ProjectCard = ({ name, description, tags, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.35, 0.85)}
    className="relative group flex flex-col"
  >
    {/* Animated gradient border */}
    <div
      className="absolute -inset-[1px] rounded-2xl opacity-60 group-hover:opacity-100 transition-all duration-500"
      style={{
        background: "linear-gradient(135deg, #7c3aed, #4f46e5, #0891b2, #7c3aed)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 4s ease infinite",
      }}
    />

    <div
      className="relative rounded-2xl p-7 flex flex-col gap-5 h-full"
      style={{
        background: "linear-gradient(145deg, #0f0f1a, #111827)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Index */}
      <div className="flex items-center">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            color: "#fff",
            boxShadow: "0 4px 16px #7c3aed66",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-extrabold text-[20px] leading-snug tracking-tight">
        {name}
      </h3>

      {/* Divider */}
      <div
        className="h-[1.5px] rounded-full"
        style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5, transparent)" }}
      />

      {/* Description */}
      <p className="text-[#a8b2c8] text-[14px] leading-[27px] flex-1">
        {description}
      </p>

      {/* Tech Stack label + tags */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6b7280] mb-3">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TechTag key={tag.name} {...tag} />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>What I've built</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Real-world projects that showcase my ability to design and deliver
        complete applications — from robust backends to polished user interfaces.
      </motion.p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "projects");
