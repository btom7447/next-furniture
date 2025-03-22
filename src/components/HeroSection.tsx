"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      className="px-10 md:px-20 py-30 h-fit flex flex-col-reverse md:flex-row md:min-h-screen justify-center items-center gap-10"
      style={{ background: "#FFF9E5" }}
    >
      {/* Left Content (Heading & Button with staggered animation) */}
      <motion.div className="sm:w-auto">
        {/* Heading Animation */}
        <motion.h1
          className="text-5xl leading-12 text-black md:text-7xl md:leading-25"
          initial={{ x: -100, opacity: 0 }} // Start off-screen left
          animate={{ x: 0, opacity: 1 }} // Slide in
          transition={{ duration: 1, ease: "easeOut" }} // Smooth effect
        >
          Rocket single <br /> seater
        </motion.h1>

        {/* Button Animation with Stagger Delay */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} // Delayed by 1 second
        >
          <Link href="/shop" className="text-2xl mt-10 block">
            <button className="py-2 border-b border-black cursor-pointer">
              Shop Now
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Content (Image with Sway Effect) */}
      <motion.div
        animate={{
          y: ["0%", "-4%", "0%", "6%", "0%"], // Moves up & down
        }}
        transition={{
          duration: 3, // Full cycle duration
          repeat: Infinity, // Loop forever
          ease: "easeInOut", // Smooth easing
        }}
      >
        <Image
          src="/images/hero-section-image.png"
          alt="Image of Rocket single seater"
          width={400}
          height={300}
          className="w-80 h-70 md:w-180 md:h-150 object-contain"
          unoptimized
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
