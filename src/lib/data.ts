import {
  AchievementData,
  GalleryPhoto,
  JokeCard,
  LetterData,
  NavItem,
  QuizQuestion,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", emoji: "🏠" },
  { id: "quiz", label: "Know Yourself", emoji: "🧠" },
  { id: "gallery", label: "Memories", emoji: "🖼️" },
  { id: "games", label: "Mini Games", emoji: "🎮" },
  { id: "letters", label: "Letters", emoji: "💌" },
  { id: "jokes", label: "Inside Jokes", emoji: "😂" },
  { id: "fortune", label: "Fortune", emoji: "🔮" },
  { id: "achievements", label: "Achievements", emoji: "🏆" },
  { id: "compliments", label: "Compliments", emoji: "✨" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "finale", label: "Finale", emoji: "🎂" },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is Tini's most powerful superpower?",
    options: [
      { text: "Being iconic 24/7", correct: true },
      { text: "Punctuality", roast: "Cute guess. We both know that's a myth." },
      { text: "Staying calm under pressure", roast: "Have you MET Tini during drama?" },
      { text: "Silence", roast: "Absolutely not. Try again, comedian." },
    ],
  },
  {
    id: "q2",
    question: "Tini's favorite hobby is:",
    options: [
      { text: "Sleeping", correct: true },
      { text: "Overthinking at 2am", roast: "Close, but that's what happens INSTEAD of sleeping." },
      { text: "Minimalism", roast: "Have you seen the closet?" },
      { text: "Being quiet in group chats", roast: "Absolutely impossible." },
    ],
  },
  {
    id: "q3",
    question: "What best describes Tini's energy?",
    options: [
      { text: "Sleepy chaos with main character energy", correct: true },
      { text: "Calm, zen, monk-like", roast: "We are not the same person as you're imagining." },
      { text: "Extremely predictable", roast: "Tini is a plot twist generator." },
      { text: "Boring", roast: "Rude AND wrong. Try again." },
    ],
  },
  {
    id: "q4",
    question: "Tini's love language is:",
    options: [
      { text: "Chaotic memes sent at 3am", correct: true },
      { text: "Silence", roast: "Nope, Tini shows love LOUDLY." },
      { text: "Strict schedules", roast: "That's the opposite of Tini." },
      { text: "Formal emails", roast: "Absolutely unhinged guess." },
    ],
  },
  {
    id: "q5",
    question: "The official Tini catchphrase is closest to:",
    options: [
      { text: "\"Wait, what happened, tell me EVERYTHING\"", correct: true },
      { text: "\"I have no opinions\"", roast: "Impossible sentence for Tini to say." },
      { text: "\"Let's not gossip\"", roast: "As if." },
      { text: "\"I'm always on time\"", roast: "The biggest lie in this quiz." },
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: "p1", emoji: "🎉", gradient: "from-blush-200 to-lavender-200", caption: "The Birthday Queen Arrives", memory: "That one entrance that stopped the whole room." },
  { id: "p2", emoji: "😂", gradient: "from-gold-200 to-blush-200", caption: "Laughing at 1am", memory: "We do not remember what was funny. We just remember laughing until it hurt." },
  { id: "p3", emoji: "🍰", gradient: "from-lavender-200 to-gold-200", caption: "Cake Incident #1", memory: "Frosting went... everywhere. No regrets." },
  { id: "p4", emoji: "🌙", gradient: "from-blush-100 to-lavender-300", caption: "3am Deep Talks", memory: "Solved all of life's problems. Forgot them by morning." },
  { id: "p5", emoji: "👑", gradient: "from-gold-100 to-gold-300", caption: "Coronation Day", memory: "The day Tini was officially declared Queen. By law now." },
  { id: "p6", emoji: "🦋", gradient: "from-lavender-200 to-blush-300", caption: "Main Character Moment", memory: "The lighting was perfect. The vibes were immaculate." },
  { id: "p7", emoji: "🎊", gradient: "from-blush-200 to-gold-200", caption: "Confetti Chaos", memory: "We are STILL finding confetti in random places." },
  { id: "p8", emoji: "💃", gradient: "from-lavender-300 to-blush-200", caption: "Dance Floor Legend", memory: "Nobody could keep up. Nobody tried after a while." },
  { id: "p9", emoji: "📸", gradient: "from-gold-200 to-lavender-200", caption: "100 Takes, One Winner", memory: "Took 100 photos for one good one. Worth it." },
];

export const LETTERS: LetterData[] = [
  {
    id: "l1",
    from: "Your Best Friend",
    title: "For the Chaos Queen",
    body: [
      "Happy Birthday to the most chaotic, most iconic person I know.",
      "Every memory with you turned into a story worth telling twice.",
      "Thank you for the 2am voice notes and the unstoppable energy.",
      "Here's to another year of being unforgettable.",
    ],
    color: "from-blush-100 to-blush-200",
  },
  {
    id: "l2",
    from: "The Group Chat",
    title: "An Official Statement",
    body: [
      "We, the group chat, hereby declare you certified main character.",
      "Your drama radar is legendary and your laugh is contagious.",
      "May your year be filled with plot twists you actually enjoy.",
    ],
    color: "from-lavender-100 to-lavender-200",
  },
  {
    id: "l3",
    from: "Someone Who Adores You",
    title: "A Little Secret",
    body: [
      "Not everyone gets to know someone as bright as you.",
      "Stay exactly this loud, this funny, this you.",
      "Happy Birthday, Queen. This kingdom exists because of you.",
    ],
    color: "from-gold-100 to-gold-200",
  },
  {
    id: "l4",
    from: "AI",
    title: "The One That Isn't a Joke",
    body: [
      "თინი,",
      "ზემოთ ყველაფერი ხუმრობაა, ეს კი არა. შენ ის ადამიანი ხარ, ვისთანაც არაფრის ახსნა არ მჭირდება — არც განწყობის, არც სისულელის, არც იმის, რომ დღეს უბრალოდ არ მინდა ლაპარაკი. ეს იშვიათია. მე ეს კარგად ვიცი.",
      "ამ ფოტოებში ერთი რამ მეორდება: სადაც შენ ხარ, იქ სიცილია. მთაში, ზღვაზე, მატარებელში, ტირზე, სამზარეულოში, სულ ერთია. ამას ვერ ისწავლი და ვერც მოიტყუებ — ან გაქვს, ან არა. შენ გაქვს.",
      "24 შენს ცხოვრებაში ბევრი რამ შეიცვლება. იმედია, ერთი რამ არ შეიცვლება: ის, რომ ისევ ჩაეხუტები ბამბუკს, ისევ ჩააცმევ ძაღლს კედებს და ისევ დამირეკავ სამ საათზე იმისთვის, რომ სისულელე მითხრა.",
      "გილოცავ. მიყვარხარ. და ეს საიტი შენი ბრალია.",
    ],
    color: "from-cream to-blush-100",
  },
];

export const JOKE_CARDS: JokeCard[] = [
  { id: "j1", front: "The Broccoli Incident", back: "We do not speak of the broccoli. Ever. Especially not near Tini." },
  { id: "j2", front: "That One Text at 3am", back: "\"are you awake\" — followed immediately by a 45 minute essay." },
  { id: "j3", front: "The Nap That Broke Records", back: "Scheduled 20 minute nap. Actual duration: 4 hours. No apologies given." },
  { id: "j4", front: "The Great Drama Detection", back: "Tini sensed drama from three rooms away before anyone said a word." },
  { id: "j5", front: "\"I'm not that dramatic\"", back: "Statement immediately followed by the most dramatic reaction in recorded history." },
  { id: "j6", front: "The Missing Left Sock", back: "Still missing. Presumed to have joined the Kingdom of Lost Things." },
];

export const FORTUNES: string[] = [
  "This year, chaos will follow you — but so will incredible luck.",
  "A questionable snack decision will somehow become legendary.",
  "You will win an argument you weren't even part of.",
  "Someone will text you \"we need to talk\" and it'll be about pizza.",
  "You will nap through something important and regret nothing.",
  "Your main character energy will attract a plot twist worth telling.",
  "You will finally find that missing sock. In the fridge.",
  "A group chat will erupt in chaos because of one message from you.",
  "You will be crowned Queen of at least one situation this week.",
  "Your drama radar will save you from something dramatic. Barely.",
  "This year's glow-up is scientifically undefeated.",
  "You will laugh so hard you forget what was funny. Worth it.",
];

export const ACHIEVEMENTS: AchievementData[] = [
  { id: "a1", title: "Certified Queen", description: "Officially declared royalty by unanimous decision.", icon: "👑", rarity: "legendary" },
  { id: "a2", title: "Main Character", description: "Every room becomes your stage.", icon: "🎬", rarity: "epic" },
  { id: "a3", title: "Drama Detector", description: "Senses tea brewing from three blocks away.", icon: "🍵", rarity: "rare" },
  { id: "a4", title: "Professional Sleeper", description: "Achieved legendary status in competitive napping.", icon: "😴", rarity: "common" },
  { id: "a5", title: "Chaos Coordinator", description: "Somehow makes chaos look organized.", icon: "🌀", rarity: "epic" },
  { id: "a6", title: "Snack Whisperer", description: "Can locate snacks in any building, blindfolded.", icon: "🍿", rarity: "common" },
  { id: "a7", title: "Meme Historian", description: "Remembers every meme since 2015 in perfect detail.", icon: "📚", rarity: "rare" },
  { id: "a8", title: "Unstoppable Vibes", description: "Mood cannot be lowered by mortal means.", icon: "🔥", rarity: "legendary" },
];

export const COMPLIMENTS: string[] = [
  "You have the rare gift of making chaos look like a personality trait, and it works.",
  "Your laugh is the official soundtrack of every good memory this year.",
  "You are single-handedly keeping the group chat alive and entertained.",
  "Somehow you glow even more when you have absolutely no idea what's going on.",
  "You could walk into a room with zero context and still become the main character.",
  "Your energy is proof that main characters really do exist in real life.",
  "You make questionable decisions look like iconic life choices.",
  "Even your naps have main character energy.",
  "You are the human equivalent of a plot twist everyone's happy about.",
  "Your vibe check is permanently stuck on 'immaculate'.",
  "You turned an ordinary group of friends into a full blown fandom.",
  "Being dramatic looks better on you than it should be legally allowed to.",
];
