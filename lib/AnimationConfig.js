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


//account related animation
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


//Anonymous message profile image animation
const anonymousMessageProfileImageAnimationConfig = (delay) => ({
    hidden: {
        opacity: 0,
        y: 20,
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


//Anonymous message heading animation
const anonymousMessageHeadingAnimationConfig = (delay) => ({
    hidden: {
        opacity: 0,
        y: 30,
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



//Anonymous message Sub-Header animation
const anonymousMessageSubHeadingAnimationConfig = (delay) => ({
    hidden: {
        opacity: 0,
        y: 40,
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


//Anonymous message form animation
const anonymousMessageFormAnimationConfig = (delay) => ({
    hidden: {
        opacity: 0,
        y: 50,
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
    anonymousMessageProfileImageAnimationConfig,
    anonymousMessageHeadingAnimationConfig,
    anonymousMessageSubHeadingAnimationConfig,
    anonymousMessageFormAnimationConfig
};
