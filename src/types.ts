export interface TimelineMilestone {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  placeholderText: string;
}

export interface Compliment {
  id: number;
  title: string;
  description: string;
  emoji: string;
  glowColor: string;
}

export interface DynamicWish {
  id: number;
  text: string;
  tag: string;
}

export const MILESTONES: TimelineMilestone[] = [
  {
    id: 1,
    year: "Early Chapters",
    title: "The Birth of Brotherhood",
    subtitle: "From Swat to Peshawar",
    description: "Two different worlds—the serene mountains of Swat and the majestic, historic city of Peshawar—aligned. We started as friends but quickly realized this bond is built on absolute trust and respect, becoming brothers.",
    emoji: "🤝",
    placeholderText: "Remember the first time we realized we had the exact same humor? Unstoppable since."
  },
  {
    id: 2,
    year: "Memorable Trails",
    title: "Chasing Tea & Late-Night Echoes",
    subtitle: "Traditional Peshawari Kehva & Warm Swati Welcomes",
    description: "Endless hours of laughter, sipping tea at local spots, debating life, sharing secrets, and driving through scenic roads. No matter the heavy struggles of life, those sessions washed away all worries.",
    emoji: "☕",
    placeholderText: "Distance only made our tea conversations longer and the bond infinitely stronger."
  },
  {
    id: 3,
    year: "Turning 30 & Growth",
    title: "Navigating Life's Pivotal Milestones",
    subtitle: "Supporting Each Other's Dreams",
    description: "Supporting each other through the twenties and stepping into the thirties. We celebrated career wins, survived setbacks, and held each other steady when life got complicated. True definition of a rock-solid companion.",
    emoji: "🚀",
    placeholderText: "They say friendships fade in your 30s. Ours only became the blueprint for absolute reliability."
  },
  {
    id: 4,
    year: "Today & Beyond",
    title: "The 31st Golden Chapter",
    subtitle: "An Everlasting Connection",
    description: "Turning 31, Ihtisham Khan! This chapter represents maturity, success, health, and a bond that remains completely untouched by the kilometers between Swat and Peshawar.",
    emoji: "👑",
    placeholderText: "Late as I am, this website is a living testament: some connections are timeless."
  }
];

export const COMPLIMENTS: Compliment[] = [
  {
    id: 1,
    title: "Your Loyalty",
    description: "In a world of temporary promises, your loyalty stands as absolute as the mountains of Swat. You are a brother who stands tall behind me under any sky.",
    emoji: "🛡️",
    glowColor: "rgba(234, 179, 8, 0.4)"
  },
  {
    id: 2,
    title: "Your Kindness",
    description: "You possess a heart that is profoundly generous. The way you care for people around you, often in ways that go completely unnoticed, is truly noble.",
    emoji: "❤️",
    glowColor: "rgba(239, 68, 68, 0.4)"
  },
  {
    id: 3,
    title: "Your Sense of Humor",
    description: "No matter how dark or stressful the days get, one phone call with you and a single inside joke brings back all the laughter and lighting-fast answers.",
    emoji: "⚡",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  {
    id: 4,
    title: "Your Resilience",
    description: "I have seen you face difficult storms and navigate personal challenges, but you always emerge stronger, wiser, and with your dignity fully intact.",
    emoji: "🏔️",
    glowColor: "rgba(59, 130, 246, 0.4)"
  },
  {
    id: 5,
    title: "Your Honesty",
    description: "You never sugarcoat the truth. You tell me what I need to hear, not what I want to hear. Having someone this truthful in life is the greatest asset.",
    emoji: "💎",
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
  {
    id: 6,
    title: "Showing Up",
    description: "Unconditional and prompt. When it matters, you're always there, bridging the gap between Swat and Peshawar instantly. That's the hallmark of a true brother.",
    emoji: "🤝",
    glowColor: "rgba(236, 72, 153, 0.4)"
  }
];

export const HEARTFELT_WISHES: DynamicWish[] = [
  {
    id: 1,
    text: "May your 31st year bring you unprecedented peace of mind, towering success in every venture, and a heart overflowing with pure satisfaction. Happy Birthday, Ihtisham!",
    tag: "Blessed"
  },
  {
    id: 2,
    text: "Ihtisham, you carry a rare soul of honor and sincerity. I pray that Almighty eases every path for you and crowns all your silent fights with shiny success.",
    tag: "Brotherhood"
  },
  {
    id: 3,
    text: "Even if my words reach you a bit late, they come with a depth of prayers that exceed all standard timelines. Shine bright, rise high, and stay as amazing as you are, my friend!",
    tag: "Timeless"
  },
  {
    id: 4,
    text: "Here’s to the countless memories behind us, and the magnificent chapters ahead. May God grant you health, prosperity, and joy that knows no distance boundaries. Happy 31st, brother!",
    tag: "Success"
  },
  {
    id: 5,
    text: "To my best friend Ihtisham Khan: You’re not just a year older; you're a year wiser, stronger, and more spectacular. Swat sends its warmest prayers to Peshawar for you today!",
    tag: "Distance-Defying"
  },
  {
    id: 6,
    text: "May you always walk with confidence and head held high. You deserve every ounce of laughter, success, and beautiful turns that life is preparing to unfold for you. Love you, brother!",
    tag: "Infinite Love"
  }
];
