export const menuVariant = {
  initial: {
    height: 0,
    width: 0,
    right: 0,
  },
  animate: {
    height: "150%",
    width: "150%",
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    height: 0,
    width: 0,
    right: 0,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
};

export const navListContainer = {
  initial: {
    transition: {
      staggerChildren: 0.3,
    },
  },
  animate: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: -0.1,
    },
  },
};

export const navlistAnimate = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const FadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        ease: [0.6, 0.01, 0.05, 0.95],
        duration: 1,
        delay: delay,
      },
    },
  };
};

export const DownBounce = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      bounce: 1,
    },
  },
};

export const ScaleAnimation = {
  hidden: {
    scale: 0,
    opacity: 1,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
};
