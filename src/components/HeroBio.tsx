"use client";

import React from "react";
import { m } from "framer-motion";
import { revealItem } from "@/lib/motion";

export default function HeroBio() {
  const sentence1 =
    "Ajudo mulheres que lideram a construir uma imagem à altura do lugar que ocupam e do lugar aonde querem chegar.";
  const sentence2Part1 = "Quiet luxury, intenção em cada escolha e clareza para ";
  const sentence2Highlight = "vestir sua ambição.";

  const words1 = sentence1.split(" ");
  const words2Part1 = sentence2Part1.split(" ").filter(Boolean);
  const words2Highlight = sentence2Highlight.split(" ").filter(Boolean);

  const baseDelay = 200;
  const wordDelayStep = 32;

  let currentWordIndex = 0;

  return (
    <m.div
      data-reveal
      variants={revealItem}
      className="relative pl-4 sm:pl-5 my-4 sm:my-5 max-w-xl"
    >
      {/* Decorative luxury accent line with animated draw and jewel pip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-antique via-rose-antique/40 to-transparent hero-animated-line"
        aria-hidden="true"
      />
      <div
        className="absolute -left-[3px] top-1 w-2 h-2 rounded-full bg-rose-antique hero-animated-glow"
        aria-hidden="true"
      />

      {/* Sentence 1 */}
      <p className="text-sm sm:text-[15px] text-rose-light/90 font-light leading-relaxed">
        {words1.map((word, i) => {
          const delay = baseDelay + currentWordIndex++ * wordDelayStep;
          return (
            <span
              key={`s1-${i}`}
              className="hero-animated-word mr-[0.28em]"
              style={{ animationDelay: `${delay}ms` }}
            >
              {word}{" "}
            </span>
          );
        })}
      </p>

      {/* Sentence 2 - Strategic emphasis */}
      <p className="mt-2 text-sm sm:text-[15px] text-rose-light font-normal leading-relaxed">
        {words2Part1.map((word, i) => {
          const delay = baseDelay + currentWordIndex++ * wordDelayStep;
          const isQuietLuxury =
            word.toLowerCase().includes("quiet") ||
            word.toLowerCase().includes("luxury");
          return (
            <span
              key={`s2-p1-${i}`}
              className={`hero-animated-word mr-[0.28em] ${
                isQuietLuxury
                  ? "text-rose-antique font-medium tracking-wide"
                  : "text-rose-light/95"
              }`}
              style={{ animationDelay: `${delay}ms` }}
            >
              {word}{" "}
            </span>
          );
        })}
        {words2Highlight.map((word, i) => {
          const delay = baseDelay + currentWordIndex++ * wordDelayStep;
          return (
            <span
              key={`s2-hl-${i}`}
              className="hero-animated-word mr-[0.28em] text-rose-antique font-medium italic underline decoration-rose-antique/40 underline-offset-4"
              style={{ animationDelay: `${delay}ms` }}
            >
              {word}{" "}
            </span>
          );
        })}
      </p>
    </m.div>
  );
}
