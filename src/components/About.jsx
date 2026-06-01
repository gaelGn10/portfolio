import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>More about me</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I am RAMBELOSON Gaël Nico from Madagascar, I'm 20 years old, passionate about web development, UI/UX design, and visual design. I enjoy creating simple, modern, and user-friendly web applications using both front-end and back-end technologies.
        <br /><br />
        I also enjoy designing interfaces and visual elements to improve user experience. I speak Malagasy (native), French (second language), and English (basic), and I am always eager to learn, improve my skills, and explore new technologies.
      </motion.p>

      <motion.div
        variants={fadeIn("", "", 0.2, 1)}
        className='mt-8'
      >
        <a
          href='/cv.pdf'
          target='_blank'
          rel='noopener noreferrer'
          download='CV_RAMBELOSON_Gael_Nico.pdf'
          className='bg-tertiary py-3 px-6 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 border border-transparent hover:border-[#915EFF]/20'
          title='Télécharger mon CV'
        >
          <svg className='w-5 h-5 fill-current text-white' viewBox='0 0 24 24'>
            <path d='M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.23 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z'/>
          </svg>
          Télécharger mon CV
        </a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");
