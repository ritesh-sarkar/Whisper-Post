"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { toJpeg } from "html-to-image";

import QRCode from "react-qr-code";

import { useSession } from "next-auth/react";

import toast from "react-hot-toast";

// icons
import {
  FaDownload,
  FaCopy,
  FaShareAlt,
  FaUndo,
  FaQrcode,
  FaEye,
  FaEyeSlash,
  FaChevronDown,
} from "react-icons/fa";

/* =========================
    FONT OPTIONS
========================= */

const FONT_OPTIONS = [
  {
    name: "Bebas Neue",
    value: "'Bebas Neue', sans-serif",
  },
  {
    name: "Playfair Display",
    value: "'Playfair Display', serif",
  },
  {
    name: "Space Grotesk",
    value: "'Space Grotesk', sans-serif",
  },
  {
    name: "Audiowide",
    value: "'Audiowide', cursive",
  },
];

/* =========================
    COLOR PALETTES
========================= */

const PRESET_PALETTES = [
  {
    name: "Cyber Purple",
    primary: "#7c3aed",
    secondary: "#06b6d4",
    accent: "#ec4899",
  },
  {
    name: "Sunset Fire",
    primary: "#ff6b6b",
    secondary: "#ffb703",
    accent: "#fb5607",
  },
  {
    name: "Ocean Night",
    primary: "#0f172a",
    secondary: "#2563eb",
    accent: "#38bdf8",
  },
  {
    name: "Luxury Gold",
    primary: "#111827",
    secondary: "#1f2937",
    accent: "#facc15",
  },
];

const StoryCard = () => {
  const [profileLink, setProfileLink] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.username) {
      const dynamicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/message/${session.user.username}`;

      const dynamicImage = session?.user?.profilePicture || "";

      setProfileLink(dynamicLink);
      setProfileImage("/profile.png"); //TODO: Add dynamic image link here
      setUsername(session.user.username);
    }
  }, [session]);

  const exportRef = useRef(null);

  const [fontDropdown, setFontDropdown] = useState(false);

  const [config, setConfig] = useState({
    title: "Drop me anonymous messages 👀",
    subtitle: "Add IG link sticker here.",
    gradientType: "linear",
    gradientDirection: "135deg",
    primaryColor: "#7c3aed",
    secondaryColor: "#06b6d4",
    accentColor: "#ec4899",
    textColor: "#ffffff",
    cardGlass: true,
    glowIntensity: 50,
    fontFamily: "'Space Grotesk', sans-serif",
    titleSize: 50,
    titleWeight: 700,
    textAlign: "center",
    showQR: true,
    qrColor: "#000000",
    qrSize: 100,
    showProfile: true,
    profileGlow: true,
  });

  /* =========================
      GRADIENT STYLE
  ========================= */

  const gradientStyle = useMemo(() => {
    if (config.gradientType === "radial") {
      return `radial-gradient(circle at top, ${config.primaryColor}, ${config.secondaryColor})`;
    }

    return `linear-gradient(${config.gradientDirection}, ${config.primaryColor}, ${config.secondaryColor})`;
  }, [
    config.gradientType,
    config.gradientDirection,
    config.primaryColor,
    config.secondaryColor,
  ]);

  const updateConfig = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyPalette = (palette) => {
    setConfig((prev) => ({
      ...prev,
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      accentColor: palette.accent,
    }));
  };

  /* =========================
      ULTRA QUALITY FIXED
  ========================= */

  const downloadImage = async () => {
    if (!exportRef.current) return;

    const loadingToast = toast.loading("Generating ultra quality story...");

    try {
      await document.fonts.ready;

      const dataUrl = await toJpeg(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        quality: 1,
        filter: (node) =>
          node.tagName !== "SCRIPT" && node.tagName !== "NOSCRIPT",
      });

      const link = document.createElement("a");

      link.download = `whisperpost-story.jpg`;

      link.href = dataUrl;

      link.click();

      toast.success("Downloading image...", {
        id: loadingToast,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate image", {
        id: loadingToast,
      });
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileLink);
      toast.success("Profile link copied");
    } catch (error) {
      console.error(error);
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) {
      toast.error("Sharing not supported on this device");
      return;
    }

    try {
      await navigator.share({
        title: "WhisperPost",
        text: "Send me anonymous messages 👀",
        url: profileLink,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const resetCustomization = () => {
    setConfig({
      title: "Drop me anonymous messages 👀",
      subtitle: "Set the IG Link sticker here",
      gradientType: "linear",
      gradientDirection: "135deg",
      primaryColor: "#7c3aed",
      secondaryColor: "#06b6d4",
      accentColor: "#ec4899",
      textColor: "#ffffff",
      cardGlass: true,
      glowIntensity: 50,
      fontFamily: "'Space Grotesk', sans-serif",
      titleSize: 50,
      titleWeight: 700,
      textAlign: "center",
      showQR: true,
      qrColor: "#000000",
      qrSize: 100,
      showProfile: true,
      profileGlow: true,
    });
  };

  return (
    <div
      className="
        w-full
        bg-bg
        text-text
        font-secondary
        px-4
        py-6
        flex
        gap-6
        flex-col
        justify-center
        md:flex-row
        md:px-6    
      "
    >
      <div
        className="
          w-full
          md:w-1/2
          max-w-450
          mx-auto
          gap-8
          flex
          items-start
        "
      >
        {/* =========================
            PREVIEW SECTION
        ========================= */}

        <div
          className="     
            w-full
            h-auto
            flex
            flex-col
            items-center
            gap-6
            relative
            "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              w-full
              flex
              justify-center
            "
          >
            <div
              className="
                relative
                w-full
                max-w-125
                rounded-3xl
                overflow-hidden 
              "
            >
              <div
                className="
                  relative
                  aspect-9/16
                  overflow-y-scroll
                  disabled-scrollbar
                "
                style={{
                  background: gradientStyle,
                }}
              >
                <div
                  className="
                    absolute
                    -top-24
                    -left-24
                    w-72
                    h-72
                    rounded-full
                    blur-[120px]
                    opacity-50
                  "
                  style={{
                    background: config.accentColor,
                  }}
                />

                <div
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-72
                    h-72
                    rounded-full
                    blur-[120px]
                    opacity-40
                  "
                  style={{
                    background: config.secondaryColor,
                  }}
                />

                <div
                  className="
                    relative
                    z-10
                    h-full
                    flex
                    flex-col
                    justify-between
                    items-center
                    p-6
                    md:p-10
                  "
                >
                  <div
                    className="
                      w-full
                      flex
                      justify-end
                    "
                  >
                    <div
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-bg/20
                        border
                        border-border
                        backdrop-blur-xl
                        text-xs
                        tracking-[0.3em]
                        uppercase
                        mb-4
                      "
                    >
                      WhisperPost
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      gap-8
                      w-full
                    "
                  >
                    {config.showProfile && profileImage && (
                      <motion.div
                        animate={{
                          boxShadow: config.profileGlow
                            ? `0 0 ${config.glowIntensity}px ${config.accentColor}`
                            : "none",
                        }}
                        className="
                            rounded-full
                            p-1
                          "
                      >
                        <img
                          src={profileImage}
                          alt="Profile"
                          crossOrigin="anonymous"
                          className="
                              w-28
                              h-28
                              md:w-32
                              md:h-32
                              rounded-full
                              object-cover
                              border-4
                              border-border
                            "
                        />
                      </motion.div>
                    )}

                    <div
                      className="
                        text-lg
                        tracking-wide
                        text-text/80
                      "
                    >
                      @{username}
                    </div>

                    <h1
                      style={{
                        color: config.textColor,
                        fontFamily: config.fontFamily,
                        fontSize: `${config.titleSize}px`,
                        fontWeight: config.titleWeight,
                        textAlign: config.textAlign,
                        textShadow: `0 0 ${config.glowIntensity}px ${config.accentColor}`,
                      }}
                      className="
                        leading-tight
                        whitespace-pre-wrap
                        wrap-break-word 
                        max-w-[90%]
                      "
                    >
                      {config.title}
                    </h1>

                    <p
                      className="
                        text-text/70
                        text-center
                        max-w-[80%]
                        text-sm
                        md:text-base
                      "
                    >
                      {config.subtitle}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      gap-5
                    "
                  >
                    {config.showQR && (
                      <div
                        className="
                          p-3
                          rounded-xl
                          bg-text
                        "
                      >
                        <QRCode
                          value={
                            profileLink || "https://whisperpost.vercel.app"
                          }
                          size={config.qrSize}
                          fgColor={config.qrColor}
                        />
                      </div>
                    )}

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-text/80
                        text-sm
                      "
                    >
                      <FaQrcode />

                      <span>Scan or tap the link sticker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================
            CONTROL PANEL
        ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          x: -30,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        className="
            w-full
            md:w-7/10
            bg-bg
            backdrop-blur-2xl
            border
            border-border
            rounded-3xl
            p-6
            md:sticky
            md:top-6
            space-y-8
            md:flex
            md:justify-between
            md:gap-8
          "
      >
        <div
          className="
            w-full
            space-y-6 
            md:w-1/2
            "
        >
          {/* TITLE */}
          <div
            className="
              space-y-3
            "
          >
            <label
              className="
                text-sm
                text-text-alt
                font-bold
                uppercase
                tracking-widest
                pl-2
              "
            >
              Title
            </label>

            <input
              value={config.title}
              onChange={(e) => updateConfig("title", e.target.value)}
              className="
                w-full
                bg-bg-alt
                border
                border-border
                rounded-2xl
                p-4
                outline-none
                resize-none
                backdrop-blur-xl
                mt-2
              "
            />
          </div>

          {/* SUBTITLE */}
          <div
            className="
              space-y-3
            "
          >
            <label
              className="
                text-sm
                text-text-alt
                font-bold
                uppercase
                tracking-widest
                pl-2
              "
            >
              Subtitle
            </label>

            <input
              type="text"
              value={config.subtitle}
              onChange={(e) => updateConfig("subtitle", e.target.value)}
              className="
                w-full
                bg-bg-alt
                border
                border-border
                rounded-2xl
                p-4
                outline-none
                backdrop-blur-xl
                mt-2
              "
            />
          </div>

          {/* COLORS */}
          <div
            className="
              space-y-4
            "
          >
            <h2
              className="
                text-lg
                font-semibold
                font-primary
              "
            >
              Colors
            </h2>

            <div
              className="
                grid
                grid-cols-2
                gap-4
              "
            >
              <ColorInput
                label="Primary"
                value={config.primaryColor}
                onChange={(val) => updateConfig("primaryColor", val)}
              />

              <ColorInput
                label="Secondary"
                value={config.secondaryColor}
                onChange={(val) => updateConfig("secondaryColor", val)}
              />

              <ColorInput
                label="Accent"
                value={config.accentColor}
                onChange={(val) => updateConfig("accentColor", val)}
              />

              <ColorInput
                label="Text"
                value={config.textColor}
                onChange={(val) => updateConfig("textColor", val)}
              />
            </div>
          </div>

          {/* QUICK PALETTE */}
          <div
            className="
              space-y-4
            "
          >
            <h2
              className="
                text-lg
                font-semibold
                font-primary
              "
            >
              Quick Palettes
            </h2>

            <div
              className="
                grid
                grid-cols-2
                gap-4
              "
            >
              {PRESET_PALETTES.map((palette) => (
                <button
                  key={palette.name}
                  onClick={() => applyPalette(palette)}
                  className="
                      relative
                      overflow-hidden
                      rounded-2xl
                      h-14
                      transition-all
                      duration-300
                      hover:scale-[1.03]
                      cursor-pointer
                    "
                  style={{
                    background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                  }}
                >
                  <div
                    className="
                        absolute
                        inset-0
                        bg-bg/20
                        w-full
                        h-full
                      "
                  />

                  <span
                    className="
                        relative
                        z-10
                        text-sm
                        font-semibold
                      "
                  >
                    {palette.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FONT DROPDOWN */}
        <div
          className="
            space-y-6 
            md:w-1/2
            "
        >
          <div
            className="
              space-y-4
            "
          >
            <h2
              className="
                text-lg
                font-semibold
                font-primary
                md:text-sm
                md:font-bold
                md:uppercase
                md:text-text-alt
                md:tracking-widest
                md:font-secondary
              "
            >
              Typography
            </h2>

            <div
              className="
                relative
              "
            >
              <button
                onClick={() => setFontDropdown(!fontDropdown)}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-border
                  bg-bg-alt
                  backdrop-blur-2xl
                  px-5
                  py-4
                "
              >
                <span
                  style={{
                    fontFamily: config.fontFamily,
                  }}
                >
                  {
                    FONT_OPTIONS.find((f) => f.value === config.fontFamily)
                      ?.name
                  }
                </span>

                <FaChevronDown />
              </button>

              <AnimatePresence>
                {fontDropdown && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    className="
                      absolute
                      top-[110%]
                      left-0
                      w-full
                      rounded-3xl
                      border
                      border-border
                      bg-bg-glass
                      backdrop-blur-3xl
                      overflow-hidden
                      z-50
                    "
                  >
                    {FONT_OPTIONS.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => {
                          updateConfig("fontFamily", font.value);

                          setFontDropdown(false);
                        }}
                        style={{
                          fontFamily: font.value,
                        }}
                        className="
                            w-full
                            text-left
                            px-5
                            py-4
                            transition-all
                            duration-300
                            hover:bg-border
                            cursor-pointer
                          "
                      >
                        {font.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="
                space-y-2
              "
            >
              <label
                className="
                  text-sm
                  text-text-alt
                "
              >
                Title Size
              </label>

              <input
                type="range"
                min={32}
                max={80}
                value={config.titleSize}
                onChange={(e) =>
                  updateConfig("titleSize", Number(e.target.value))
                }
                className="
                  w-full
                  cursor-pointer
                "
              />
            </div>

            <div
              className="
                space-y-2
              "
            >
              <label
                className="
                  text-sm
                  text-text-alt
                "
              >
                Glow Intensity
              </label>

              <input
                type="range"
                min={0}
                max={100}
                value={config.glowIntensity}
                onChange={(e) =>
                  updateConfig("glowIntensity", Number(e.target.value))
                }
                className="
                  w-full
                  cursor-pointer
                "
              />
            </div>
          </div>

          {/* TOGGLES */}
          <div
            className="
              space-y-4
            "
          >
            <h2
              className="
                font-primary
                text-lg
                font-semibold
              "
            >
              Controls
            </h2>

            <ToggleButton
              active={config.showQR}
              onClick={() => updateConfig("showQR", !config.showQR)}
              label="QR Code"
              icon={config.showQR ? <FaEye /> : <FaEyeSlash />}
            />

            <ToggleButton
              active={config.showProfile}
              onClick={() => updateConfig("showProfile", !config.showProfile)}
              label="Profile Picture"
              icon={config.showProfile ? <FaEye /> : <FaEyeSlash />}
            />
          </div>

          {/* ACTIONS */}
          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >
            <ActionButton
              onClick={downloadImage}
              icon={<FaDownload />}
              label="Download"
            />

            <ActionButton
              onClick={copyLink}
              icon={<FaCopy />}
              label="Copy Link"
            />

            <ActionButton
              onClick={nativeShare}
              icon={<FaShareAlt />}
              label="Share"
            />

            <ActionButton
              onClick={resetCustomization}
              icon={<FaUndo />}
              label="Reset"
            />
          </div>
        </div>
      </motion.div>

      {/* =========================
          HIDDEN EXPORT NODE
      ========================= */}

      <div
        className="
          fixed
          -top-2499.75
          -left-2499.75
          pointer-events-none
        "
      >
        <div
          ref={exportRef}
          style={{
            width: "1080px",
            height: "1920px",
            background: gradientStyle,
          }}
          className="
            relative
            overflow-hidden
            flex
            flex-col
            items-center
            justify-between
            p-20
          "
        >
          <div
            className="
              absolute
              -top-40
              -left-40
              w-125
              h-125
              rounded-full
              blur-[120px]
              opacity-50
            "
            style={{
              background: config.accentColor,
            }}
          />

          <div
            className="
              absolute
              bottom-0
              right-0
              w-125
              h-125
              rounded-full
              blur-[120px]
              opacity-40
            "
            style={{
              background: config.secondaryColor,
            }}
          />

          <div
            className="
              w-full
              flex
              justify-end
              z-10
            "
          >
            <div
              className="
                px-8
                py-4
                rounded-full
                bg-bg/20
                border
                border-border
                text-3xl
                text-text
              "
            >
              WhisperPost
            </div>
          </div>

          <div
            className="
              flex
              flex-col
              items-center
              gap-14
              text-center
              z-10
            "
          >
            {config.showProfile && profileImage && (
              <div
                style={{
                  boxShadow: config.profileGlow
                    ? `0 0 ${config.glowIntensity}px ${config.accentColor}`
                    : "none",
                }}
                className="
                    rounded-full
                    p-2
                  "
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  crossOrigin="anonymous"
                  className="
                      w-72
                      h-72
                      rounded-full
                      object-cover
                      border-10
                      border-border
                    "
                />
              </div>
            )}

            <div
              className="
                text-5xl
                text-text/80
              "
            >
              @{username}
            </div>

            <h1
              style={{
                color: config.textColor,
                fontFamily: config.fontFamily,
                fontSize: `${config.titleSize * 2}px`,
                fontWeight: config.titleWeight,
                textAlign: config.textAlign,
                textShadow: `0 0 ${config.glowIntensity}px ${config.accentColor}`,
              }}
              className="
                leading-tight
                whitespace-pre-wrap
                wrap-break-word
                max-w-[85%]
              "
            >
              {config.title}
            </h1>

            <p
              className="
                text-text/70
                text-4xl
                max-w-[70%]
              "
            >
              {config.subtitle}
            </p>
          </div>

          <div
            className="
              flex
              flex-col
              items-center
              gap-10
              z-10
            "
          >
            {config.showQR && (
              <div
                className="
                  p-8
                  rounded-[40px]
                  bg-text
                "
              >
                <QRCode
                  value={profileLink || "https://whisperpost.vercel.app"}
                  size={300}
                  fgColor={config.qrColor}
                />
              </div>
            )}

            <div
              className="
                flex
                items-center
                gap-2
                text-text/80
                text-4xl
              "
            >
              <FaQrcode />
              <span>Scan or tap the link sticker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
    SUB COMPONENTS
========================= */

const ColorInput = ({ label, value, onChange }) => (
  <div
    className="
      space-y-2
    "
  >
    <label
      className="
        text-sm
        text-text-alt
      "
    >
      {label}
    </label>

    <div
      className="
        flex
        items-center
        gap-3
        bg-bg-alt
        border
        border-border
        rounded-3xl
        p-2
        backdrop-blur-xl
      "
    >
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-12
          h-12
          rounded-xl
          border-none
          bg-transparent
          cursor-pointer
        "
      />

      <span
        className="
          text-sm
        "
      >
        {value}
      </span>
    </div>
  </div>
);

const ToggleButton = ({ active, onClick, label, icon }) => (
  <button
    onClick={onClick}
    className={`
      w-full
      flex
      items-center
      justify-between
      rounded-2xl
      border
      px-4
      py-4
      transition-all
      duration-300
      backdrop-blur-xl
      cursor-pointer
      ${active ? "border-accent bg-accent/10" : "border-border bg-bg-alt"}
    `}
  >
    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      {icon}

      <span>{label}</span>
    </div>

    <div
      className={`
        w-3
        h-3
        rounded-full
        ${active ? "bg-accent" : "bg-text-alt"}
      `}
    />
  </button>
);

const ActionButton = ({ onClick, icon, label }) => (
  <button
    onClick={onClick}
    className="
      flex
      items-center
      justify-center
      gap-2
      rounded-2xl
      border
      border-border
      bg-bg-alt
      backdrop-blur-xl
      py-4
      cursor-pointer
      transition-all
      duration-300
      hover:border-accent
      hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]
    "
  >
    {icon}

    <span
      className="
        text-sm
      "
    >
      {label}
    </span>
  </button>
);

export default StoryCard;
