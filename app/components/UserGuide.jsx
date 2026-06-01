"use client";

import React, { useMemo, useState } from "react";


//Custom libs and components
import AnimationWrapper from "@/app/components/Animation/AnimationWrapper";
import { howToUseAnimationConfig } from "@/lib/AnimationConfig";


//icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const onboardingData = [
    {
        id: 1,
        title: "Copy Your Link",
        subtitle: "Copy your personal link and share it anywhere.",
        image: "/linkpart.png",
    },
    {
        id: 2,
        title: "Create a Story Card",
        subtitle: "Generate a custom story card for your profile.",
        image: "/storycard.png",
    },
    {
        id: 3,
        title: "Download the Card",
        subtitle: "Download the story card to your device and use it to IG story.",
        image: "/typography.png",
    },

    {
        id: 4,
        title: "Add a Sticker",
        subtitle: "Open Instagram story and tap the sticker icon to view available stickers.",
        image: "/igstory.png",
    },
    {
        id: 5,
        title: "Choose Link Sticker",
        subtitle: "Select the Link sticker from the sticker menu.",
        image: "/stickeroption.png",
    },
    {
        id: 6,
        titl: "Paste Your Link",
        subtitle: "Paste your WhisperPost link and tap Finished.",
        image: "/linkselect.png",
    },
    {
        id: 7,
        title: "Share Your Story",
        subtitle: "Position the sticker and publish your story.",
        image: "/link-sticker-positioning.png",
    },
];

const UserGuide = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === onboardingData.length - 1 ? 0 : prev + 1,
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? onboardingData.length - 1 : prev - 1,
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEndHandler = () => {
        if (touchStart == null || touchEnd == null) return;

        const distance = touchStart - touchEnd;

        if (distance > minSwipeDistance) nextSlide();
        if (distance < -minSwipeDistance) prevSlide();
    };

    // Helpful for readability + avoids repeated indexing
    const currentStep = useMemo(
        () => onboardingData[currentIndex],
        [currentIndex],
    );

    return (
        <AnimationWrapper
            variants={howToUseAnimationConfig(0.2)}
            once={false}
            className="
                w-full
                min-h-[90vh]
                flex
                flex-col
                items-center
                justify-center
                px-4
                py-12
                bg-transparent
            "
        >
            {/* Section Header */}
            <div
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    mb-10
                "
            >
                <span
                    className="
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        text-primary
                        font-semibold
                        mb-2
                    "
                >
                    User Guide
                </span>

                <h2
                    className="
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        font-bold
                        text-primary
                    "
                >
                    How to Use?
                </h2>

                <p
                    className="
                        mt-4
                        max-w-md
                        text-sm
                        sm:text-base
                        leading-relaxed
                        text-secondary
                    "
                >
                    Follow these simple steps to share your profile through Instagram
                    Stories and start receiving anonymous messages.
                </p>
            </div>

            {/* Main Card */}
            <div
                className="
                    relative
                    w-full
                    max-w-95
                    sm:max-w-md
                    lg:max-w-5xl
                    bg-bg-alt
                    border
                    border-border
                    rounded-3xl
                    overflow-hidden
                    shadow-2xl
                "
            >
                {/* Slider */}
                <div
                    className="
                        overflow-hidden
                    "
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEndHandler}
                >
                    <div
                        className="
                            flex
                            transition-transform
                            duration-500
                            ease-in-out
                        "
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {onboardingData.map((slide) => (
                            <div
                                key={slide.id}
                                className="
                                    w-full
                                    shrink-0
                                "
                            >
                                <div
                                    className="
                                        flex
                                        flex-col
                                        lg:flex-row
                                    "
                                >
                                    {/* Image Section */}
                                    <div
                                        className="
                                            relative
                                            h-70
                                            sm:h-85
                                            md:h-95
                                            lg:h-105
                                            lg:w-1/2
                                            bg-[bg
                                            flex
                                            items-center
                                            justify-center
                                            p-6
                                        "
                                    >
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            draggable={false}
                                            className="
                                                max-w-full
                                                max-h-full
                                                object-contain
                                                select-none
                                                pointer-events-none
                                            "
                                        />

                                        <div
                                            className="
                                                absolute
                                                inset-0
                                                bg-linear-to-t
                                                from-bg-alt/80
                                                via-transparent
                                                to-transparent
                                                pointer-events-none
                                                lg:bg-linear-to-r
                                                lg:from-bg-alt/40
                                                lg:via-transparent
                                                lg:to-transparent
                                            "
                                        />
                                    </div>

                                    {/* Content */}
                                    <div
                                        className="
                                            px-6
                                            py-6
                                            min-h-38
                                            lg:min-h-105
                                            lg:w-1/2
                                            flex
                                            flex-col
                                            justify-center
                                            items-center
                                            lg:items-start
                                            text-center
                                            lg:text-left
                                        "
                                    >
                                        <span
                                            className="
                                                text-xs
                                                uppercase
                                                tracking-widest
                                                text-accent
                                                font-semibold
                                                mb-2
                                            "
                                        >
                                            Step {slide.id}
                                        </span>

                                        <h3
                                            className="
                                                text-xl
                                                sm:text-2xl
                                                lg:text-3xl
                                                font-bold
                                                text-primary
                                                mb-3
                                            "
                                        >
                                            {slide.title}
                                        </h3>

                                        <p
                                            className="
                                                text-sm
                                                sm:text-base
                                                lg:text-lg
                                                leading-relaxed
                                                text-secondary
                                                max-w-xl
                                            "
                                        >
                                            {slide.subtitle}
                                        </p>

                                        <div
                                            className="
                                                mt-6
                                                hidden
                                                lg:flex
                                                items-center
                                                gap-2
                                                text-xs
                                                text-secondary
                                                opacity-70
                                            "
                                        >
                                            <span>
                                                Slide {currentIndex + 1} / {onboardingData.length}
                                            </span>

                                            <span>•</span>

                                            <span>Use arrows or swipe</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    className="
                        absolute
                        left-3
                        top-45
                        sm:top-52
                        md:top-58
                        lg:top-1/2
                        -translate-y-1/2
                        z-20
                        p-3
                        rounded-full
                        bg-bg-glass
                        backdrop-blur-md
                        border
                        border-border
                        text-primary
                        hover:bg-accent
                        hover:border-transparent
                        transition-all
                        duration-300
                        cursor-pointer
                    "
                >
                    <FiChevronLeft size={20} />
                </button>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    className="
                        absolute
                        right-3
                        top-45
                        sm:top-52
                        md:top-58
                        lg:top-1/2
                        -translate-y-1/2
                        z-20
                        p-3
                        rounded-full
                        bg-bg-glass
                        backdrop-blur-md
                        border
                        border-border
                        text-primary
                        hover:bg-accent
                        hover:border-transparent
                        transition-all
                        duration-300
                        cursor-pointer
                    "
                >
                    <FiChevronRight size={20} />
                </button>

                {/* Progress Dots */}
                <div
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-6
                        pb-6
                        lg:pb-7
                    "
                >
                    {onboardingData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`
                                rounded-full
                                transition-all
                                duration-300
                                ${currentIndex === index
                                    ? "w-8 h-2 bg-accent"
                                    : "w-2 h-2 bg-secondary opacity-40 hover:opacity-100"
                                }
                            `}
                        />
                    ))}
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default UserGuide;
