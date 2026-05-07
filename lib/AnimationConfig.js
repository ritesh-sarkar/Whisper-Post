//Header animation
const headerAnimationConfig = (delay) => ({
    hidden: {
        scale: 0,
        y: 20,
    },
    show: {
        scale: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: "anticipate",
            delay,
        },
    },
});

//hero animation
const heroAnimationConfig = (delay) => ({
    hidden: {
        opacity: 0,
        y: 200,
        filter: "blur(20px)",
        scale: 0,
    },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "anticipate",
            delay,
        },
    },
});

//Card animation
const cardAnimationConfig = (delay) => ({
    hidden: {
        opacity: 0,
        y: 24,
        filter: "blur(10px)",
        scale: 0.9,
    },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "anticipate",
            delay,
        },
    },
});

const accountAccessAnimationConfig = (delay) => ({
    hidden: {
        opacity: 0,
        y: 24,
        filter: "blur(10px)",
        scale: 0.9,
    },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "anticipate",
            delay,
        },
    },
});

//Funtion export
export {
    headerAnimationConfig,
    heroAnimationConfig,
    cardAnimationConfig,
    accountAccessAnimationConfig,
};
