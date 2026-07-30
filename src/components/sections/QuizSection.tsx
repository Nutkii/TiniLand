"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { QUIZ_QUESTIONS } from "@/lib/data";
import { fireBigConfetti, fireConfetti } from "@/lib/confetti";

export function QuizSection() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = QUIZ_QUESTIONS[step];
  const progress = (step / QUIZ_QUESTIONS.length) * 100;

  function handleAnswer(optionIndex: number) {
    if (locked) return;
    setLocked(true);
    const option = question.options[optionIndex];

    if (option.correct) {
      setScore((s) => s + 1);
      setFeedback("Correct! Obviously.");
      fireConfetti();
    } else {
      setFeedback(option.roast ?? "Nope! Try again next time.");
    }

    window.setTimeout(() => {
      setFeedback(null);
      setLocked(false);
      if (step + 1 < QUIZ_QUESTIONS.length) {
        setStep((s) => s + 1);
      } else {
        setFinished(true);
        if (option.correct && score + 1 === QUIZ_QUESTIONS.length) {
          fireBigConfetti();
        }
      }
    }, 1400);
  }

  function restart() {
    setStep(0);
    setScore(0);
    setFinished(false);
    setFeedback(null);
    setLocked(false);
  }

  return (
    <SectionShell className="flex flex-col items-center">
      <h2 className="section-title mb-2 text-center">How Well Do You Know Yourself?</h2>
      <p className="mb-8 text-center text-lavender-600 dark:text-lavender-100">
        A completely unbiased, extremely accurate quiz about Tini.
      </p>

      <div className="glass-card w-full max-w-xl p-6 sm:p-8">
        {!finished ? (
          <>
            <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/60 dark:bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blush-400 to-lavender-400"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="mb-4 text-sm text-lavender-500 dark:text-lavender-200">
              Question {step + 1} of {QUIZ_QUESTIONS.length}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="mb-5 font-display text-xl text-lavender-700 dark:text-lavender-50">
                  {question.question}
                </h3>
                <div className="grid gap-3">
                  {question.options.map((opt, i) => (
                    <button
                      key={i}
                      disabled={locked}
                      onClick={() => handleAnswer(i)}
                      className="rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-left transition-colors hover:bg-blush-100 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {feedback && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 rounded-xl bg-gold-100/80 px-4 py-3 font-medium text-lavender-700 dark:bg-white/10 dark:text-gold-100"
                >
                  {feedback}
                </motion.p>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-3 text-6xl">
              {score === QUIZ_QUESTIONS.length ? "👑" : score >= QUIZ_QUESTIONS.length / 2 ? "✨" : "😅"}
            </div>
            <h3 className="mb-2 font-display text-2xl text-lavender-700 dark:text-lavender-50">
              You scored {score} / {QUIZ_QUESTIONS.length}
            </h3>
            <p className="mb-6 text-lavender-600 dark:text-lavender-100">
              {score === QUIZ_QUESTIONS.length
                ? "Perfect score! You truly do know yourself. Iconic."
                : score >= QUIZ_QUESTIONS.length / 2
                ? "Pretty solid self-awareness. A little chaotic, very accurate."
                : "Bold of you to be this unpredictable, even to yourself."}
            </p>
            <button onClick={restart} className="glow-btn">
              Retake the Quiz
            </button>
          </motion.div>
        )}
      </div>
    </SectionShell>
  );
}
