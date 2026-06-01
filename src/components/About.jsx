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
    </>
  );
};

export default SectionWrapper(About, "about");
