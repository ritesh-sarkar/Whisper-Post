"use client";

import { motion } from "framer-motion";

export default function AnimationWrapper({
  children,
  variants,
  once = false,
  className,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={variants}
      viewport={{ once }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
