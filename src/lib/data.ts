import {
  AchievementData,
  GalleryPhoto,
  LetterData,
  NavItem,
  QuizQuestion,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", emoji: "🏠" },
  { id: "quiz", label: "Know Yourself", emoji: "🧠" },
  { id: "gallery", label: "Memories", emoji: "🖼️" },
  { id: "games", label: "Mini Games", emoji: "🎮" },
  { id: "fortune", label: "Fortune", emoji: "🔮" },
  { id: "achievements", label: "Achievements", emoji: "🏆" },
  { id: "compliments", label: "Compliments", emoji: "✨" },
  { id: "letters", label: "Letters", emoji: "💌" },
  { id: "finale", label: "Finale", emoji: "🎂" },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is Tini's most powerful superpower?",
    options: [
      { text: "Punctuality", roast: "Cute guess. We both know that's a myth." },
      { text: "Staying calm under pressure", roast: "Have you MET Tini during drama?" },
      { text: "Being iconic 24/7", correct: true },
      { text: "Silence", roast: "Absolutely not. Try again, comedian." },
    ],
  },
  {
    id: "q2",
    question: "Tini's favorite hobby is:",
    options: [
      { text: "Overthinking at 2am", roast: "Close, but that's what happens INSTEAD of sleeping." },
      { text: "Minimalism", roast: "Have you seen the closet?" },
      { text: "Being quiet in group chats", roast: "Absolutely impossible." },
      { text: "Sleeping", correct: true },
    ],
  },
  {
    id: "q3",
    question: "What best describes Tini's energy?",
    options: [
      { text: "Calm, zen, monk-like", roast: "We are not the same person as you're imagining." },
      { text: "Sleepy chaos with main character energy", correct: true },
      { text: "Boring", roast: "Rude AND wrong. Try again." },
      { text: "Extremely predictable", roast: "Tini is a plot twist generator." },
    ],
  },
  {
    id: "q4",
    question: "Tini's love language is:",
    options: [
      { text: "Strict schedules", roast: "That's the opposite of Tini." },
      { text: "Formal emails", roast: "Absolutely unhinged guess." },
      { text: "Chaotic memes sent at 3am", correct: true },
      { text: "Silence", roast: "Nope, Tini shows love LOUDLY." },
    ],
  },
  {
    id: "q5",
    question: "The official Tini catchphrase is closest to:",
    options: [
      { text: "\"I have no opinions\"", roast: "Impossible sentence for Tini to say." },
      { text: "\"I'm always on time\"", roast: "The biggest lie in this quiz." },
      { text: "\"Let's not gossip\"", roast: "As if." },
      { text: "\"Wait, what happened, tell me EVERYTHING\"", correct: true },
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: "p1", src: "/photos/ski-lights.jpg", alt: "Group photo by a glowing light-up reindeer", gradient: "from-blush-200 to-lavender-200", caption: "ვაიი?", memory: "ეს რა ხალხში მოვხვდი" },
  { id: "p2", src: "/photos/black-cat.jpg", gradient: "from-gold-200 to-blush-200", alt: "Black cat curled up on a chair", caption: "მშვენება <33", memory: "მაგრამ თან ლეპტოპების კბეჩა უყვარს" },
  { id: "p3", src: "/photos/yorkie-pajamas.jpg", gradient: "from-lavender-200 to-gold-200", alt: "Yorkie wearing pajamas", caption: "Best Dressed", memory: "ამისი გარდერობი გვინდა ყველას" },
  { id: "p4", src: "/photos/panda-hug.jpg", gradient: "from-blush-100 to-lavender-300", alt: "Hugging a giant panda plush in a toy store", caption: "Emotional Support Panda", memory: "უბრალოდ ამ ემოციური საფორთს მერე ფიზიკური მჭირდებაა" },
  { id: "p5", src: "/photos/baby-yoda-ears.jpg", gradient: "from-gold-100 to-gold-300", alt: "Wearing Baby Yoda ears headband at a desk", caption: "May the ბეისდ be with you", memory: "ბრძენი თინი" },
  { id: "p6", src: "/photos/bamboo-forest.jpg", gradient: "from-lavender-200 to-blush-300", alt: "Hugging a bamboo stalk in a bamboo forest", caption: "Bamboo Bestie", memory: "ყველგან შემიძლია ბესთის პოვნა" },
  { id: "p7", src: "/photos/fitting-room.jpg", gradient: "from-blush-200 to-gold-200", alt: "Trying on a sparkly outfit in a fitting room mirror", caption: "მოდის აიქონი", memory: "მე როცა მარსიკმა არ მათხოვა თავისი ტანსაცმელი" },
  { id: "p8", src: "/photos/misty-mountain.jpg", gradient: "from-lavender-300 to-blush-200", alt: "Standing on a foggy mountain ridge", caption: "ევერესტამდე გავხურდი", memory: "(ამ ნისლს ეგონა დამჩრდილავდა?)" },
  { id: "p9", src: "/photos/graduation.jpg", gradient: "from-gold-200 to-lavender-200", alt: "Holding a graduation award in cap and gown", caption: "მაინც დავაწერე ჩემი სახელი...", memory: "(ძაან ლამაზად ვარ პროსტა, არ იყო გასამაზი)" },
  { id: "p10", src: "/photos/boat-friends.jpg", gradient: "from-blush-200 to-lavender-300", alt: "Four friends sitting on the bow of a boat", caption: "Tini's BDay ოღონდ სხვანაირად", memory: "ა ასე უნდა ვყოფილიყავით დღეს, რო ვერ დაიქოქა ეგ ვერტმფრენი" },
  { id: "p11", src: "/photos/christmas-photobooth.jpg", gradient: "from-gold-100 to-blush-200", alt: "Friends laughing together wearing a Santa hat", caption: "გვშია", memory: "არა ისე, კარგი ხალხია მგონი ხოო???" },
];

export const LETTERS: LetterData[] = [
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
  { id: "a8", title: "Unstoppable Vibes", description: "Mood cannot be lowered by mortal means.", icon: "🔥", rarity: "legendary" },
  { id: "a9", title: "Fact Supplier", description: "Keeps everyone informed whether they asked or not.", icon: "📌", rarity: "common" },
];

export const COMPLIMENTS: string[] = [
  "მგონი მაკარენას ცეკვის შენი ვერსია ბევრად უკეთესია, ვიდრე ორიგინალი — უბრალოდ შეუძლებელია შენს ცეკვას უყურო და არ გაგეღიმოს.",
  "შენთან კამათი საშიშია — ჯერ დამარწმუნებ, მერე კი დამრჩება შენი აზრი.",
  "ყველაფერზე საკუთარი აზრი რომ გაქვს, ეგ ცალკე ხელოვნებაა, მაგრამ ასე სწრაფად რომ აფიქსირებ — უკვე ტალანტია.",
  "მაკარენას შენი ვერსია იუნესკოს არამატერიალურ კულტურულ მემკვიდრეობაშია შესატანი.",
  "მსოფლიოში ორი ტიპის მაკარენა არსებობს: არასწორი და შენი.",
  "შენს მწვანე თვალებს საგზაო ნიშანივით სჭირდება გაფრთხილება: 'დიდხანს ყურება იწვევს ყურადღების გაფანტვას.'",
  "აღმართზე ისეთი ტრანსფორმაცია გემართება, ევოლუციის თეორიას უკუღმა ატრიალებ — ეგრევე პირველყოფილის რეჟიმზე გადადიხარ.",
  "კიბეებზე რომ ადიხარ, 100 წლით ბერდები და წელში ისე იხრები, თითქოს ზურგით მთელი მსოფლიოს დარდს ეზიდებოდე.",
  "შენი აღმართზე ასვლა ცალკე პერფორმანსია — ერთდროულად 80 წლის ბებოს და პრეისტორიულ ადამიანს მახსენებ.",
  "ქუჩაში რომ მიდიხარ, პრინცესა ხარ და აღმართი რომ იწყება — ეგრევე 'ბებიაშენის ბებიის' რეჟიმი ირთვება.",
  "შენთან საუბარი ისეთია, ჯერ დაფიქრებასაც ვერ ვასწრებ, რომ შენი მოსწრებული პასუხი უკვე თავში მხვდება.",
  "ხალხს შეიძლება საერთოდ დაავიწყდეს, რაზე ელაპარაკებოდი, მაგრამ შენი თვალების ფერი სამუდამოდ ემახსოვრებათ.",
  "შენი სიცილი ისეთი რამეა, აპოკალიფსიც რომ დაიწყოს, ხალხი იფიქრებს 'არაუშავს, მაინც ყველაფერი კარგად იქნებაო'.",
];
