import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Import PNG icons
import javaIcon       from "../assets/icon/java.png";
import phpIcon        from "../assets/icon/php.png";
import jsIcon         from "../assets/icon/javascript.png";
import tsIcon         from "../assets/icon/typescript.png";
import postgresIcon   from "../assets/icon/postgresSQL.png";
import mysqlIcon      from "../assets/icon/mysql.png";
import reactIcon      from "../assets/icon/react.png";
import tailwindIcon   from "../assets/icon/tailwindcss.png";
import bootstrapIcon  from "../assets/icon/bootstrap.png";
import springIcon     from "../assets/icon/spring-boot.png";
import laravelIcon    from "../assets/icon/laravel.png";
import figmaIcon      from "../assets/icon/figma.png";
import illustratorIcon from "../assets/icon/adobe illustrator.png";
import indesignIcon   from "../assets/icon/adobe inDesign.png";
import photoshopIcon  from "../assets/icon/adobe photshop.png";
import firebaseIcon   from "../assets/icon/firebase.svg";

const stackCategories = [
  {
    category: "Languages",
    color: "from-violet-500 to-purple-700",
    accent: "#7c3aed",
    icon: "💻",
    items: [
      { name: "Java",       img: javaIcon },
      { name: "PHP",        img: phpIcon },
      { name: "JavaScript", img: jsIcon },
      { name: "TypeScript", img: tsIcon },
    ],
  },
  {
    category: "Databases",
    color: "from-cyan-500 to-blue-700",
    accent: "#0891b2",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL", img: postgresIcon },
      { name: "MySQL",      img: mysqlIcon },
      { name: "Firebase",   img: firebaseIcon },
    ],
  },
  {
    category: "Frontend",
    color: "from-sky-400 to-indigo-600",
    accent: "#4f46e5",
    icon: "🎨",
    items: [
      { name: "React",        img: reactIcon },
      { name: "Tailwind CSS", img: tailwindIcon },
      { name: "Bootstrap",    img: bootstrapIcon },
    ],
  },
  {
    category: "Backend",
    color: "from-emerald-500 to-green-700",
    accent: "#059669",
    icon: "🔧",
    items: [
      { name: "Spring", img: springIcon },
      { name: "Laravel", img: laravelIcon },
    ],
  },
  {
    category: "Design",
    color: "from-pink-500 to-rose-700",
    accent: "#e11d48",
    icon: "✏️",
    items: [
      { name: "Figma",        img: figmaIcon },
      { name: "Illustrator",  img: illustratorIcon },
      { name: "InDesign",     img: indesignIcon },
      { name: "Photoshop",    img: photoshopIcon },
    ],
  },
];

const TechBadge = ({ name, img }) => (
  <div
    className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium
                transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default"
    style={{
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.15)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
    }}
  >
    <img src={img} alt={name} className="w-5 h-5 object-contain" />
    <span>{name}</span>
  </div>
);

const CategoryCard = ({ category, color, accent, icon, items, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="relative rounded-2xl p-[1px] overflow-hidden"
    style={{
      background: `linear-gradient(135deg, ${accent}66, transparent)`,
    }}
  >
    <div
      className="rounded-2xl p-6 h-full"
      style={{
        background: "rgba(15, 15, 25, 0.85)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${color} shadow-lg`}
        >
          {icon}
        </div>
        <h3 className="text-white font-bold text-[20px] tracking-wide">
          {category}
        </h3>
      </div>

      {/* Divider */}
      <div
        className="h-[1px] w-full mb-5 rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}88, transparent)` }}
      />

      {/* Tech Badges */}
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <TechBadge key={item.name} {...item} />
        ))}
      </div>
    </div>
  </motion.div>
);

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>What I work with</p>
        <h2 className={`${styles.sectionHeadText}`}>My Stack.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          A curated set of technologies and tools I use daily to build robust,
          scalable, and beautifully designed applications — from backend systems
          to pixel-perfect interfaces.
        </motion.p>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stackCategories.map((cat, index) => (
          <CategoryCard key={cat.category} index={index} {...cat} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");
