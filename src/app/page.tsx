"use client";

import { AnimatePresence } from "framer-motion";
import { useSite } from "@/components/providers/SiteProvider";
import { EntryGate } from "@/components/gate/EntryGate";
import { NavBar } from "@/components/nav/NavBar";
import { Starfield } from "@/components/effects/Starfield";
import { FloatingAmbience } from "@/components/effects/FloatingAmbience";
import { HomeSection } from "@/components/sections/HomeSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { GamesSection } from "@/components/sections/GamesSection";
import { LettersSection } from "@/components/sections/LettersSection";
import { JokesSection } from "@/components/sections/JokesSection";
import { FortuneSection } from "@/components/sections/FortuneSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ComplimentSection } from "@/components/sections/ComplimentSection";
import { MusicSection } from "@/components/sections/MusicSection";
import { FinalSurpriseSection } from "@/components/sections/FinalSurpriseSection";

export default function Home() {
  const { entered, section, darkMode, nightMode } = useSite();

  return (
    <>
      <AnimatePresence>{!entered && <EntryGate key="gate" />}</AnimatePresence>

      {entered && (
        <div className="relative min-h-screen">
          {(darkMode || nightMode) && <Starfield dense={nightMode} />}
          <FloatingAmbience count={10} />

          <div className="relative z-10">
            <NavBar />
            <main>
              <AnimatePresence mode="wait">
                {section === "home" && <HomeSection key="home" />}
                {section === "quiz" && <QuizSection key="quiz" />}
                {section === "gallery" && <GallerySection key="gallery" />}
                {section === "games" && <GamesSection key="games" />}
                {section === "letters" && <LettersSection key="letters" />}
                {section === "jokes" && <JokesSection key="jokes" />}
                {section === "fortune" && <FortuneSection key="fortune" />}
                {section === "achievements" && <AchievementsSection key="achievements" />}
                {section === "compliments" && <ComplimentSection key="compliments" />}
                {section === "music" && <MusicSection key="music" />}
                {section === "finale" && <FinalSurpriseSection key="finale" />}
              </AnimatePresence>
            </main>
            <footer className="py-8 text-center text-sm text-lavender-500 dark:text-lavender-200">
              Made with 💖 for TiniLand&apos;s Queen.
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
