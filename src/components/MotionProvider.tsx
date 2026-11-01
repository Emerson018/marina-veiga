"use client";

import React, { ReactNode } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
