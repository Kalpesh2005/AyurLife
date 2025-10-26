export interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    dosha: "vata" | "pitta" | "kapha";
  }[];
}

export const prakritiQuestions: Question[] = [
  {
    id: "body-frame",
    text: "How would you describe your body frame?",
    options: [
      { text: "Thin, light, difficult to gain weight", dosha: "vata" },
      { text: "Medium, muscular, moderate weight", dosha: "pitta" },
      { text: "Large, heavy, easy to gain weight", dosha: "kapha" },
    ],
  },
  {
    id: "skin-type",
    text: "What is your skin type?",
    options: [
      { text: "Dry, rough, cool to touch", dosha: "vata" },
      { text: "Warm, oily, prone to rashes", dosha: "pitta" },
      { text: "Thick, moist, smooth", dosha: "kapha" },
    ],
  },
  {
    id: "appetite",
    text: "How is your appetite?",
    options: [
      { text: "Irregular, varies day to day", dosha: "vata" },
      { text: "Strong, cannot skip meals", dosha: "pitta" },
      { text: "Steady but can easily skip meals", dosha: "kapha" },
    ],
  },
  {
    id: "digestion",
    text: "How is your digestion?",
    options: [
      { text: "Irregular, gas, bloating", dosha: "vata" },
      { text: "Fast, strong, acidic", dosha: "pitta" },
      { text: "Slow, heavy feeling after meals", dosha: "kapha" },
    ],
  },
  {
    id: "energy",
    text: "How would you describe your energy levels?",
    options: [
      { text: "Comes in bursts, fluctuates", dosha: "vata" },
      { text: "High, intense, motivated", dosha: "pitta" },
      { text: "Steady, enduring, but slow to start", dosha: "kapha" },
    ],
  },
  {
    id: "sleep",
    text: "How is your sleep pattern?",
    options: [
      { text: "Light, interrupted, difficulty falling asleep", dosha: "vata" },
      { text: "Sound but short, wake up easily", dosha: "pitta" },
      { text: "Deep, long, hard to wake up", dosha: "kapha" },
    ],
  },
  {
    id: "temperament",
    text: "How would you describe your temperament?",
    options: [
      { text: "Quick, creative, anxious", dosha: "vata" },
      { text: "Focused, intense, irritable", dosha: "pitta" },
      { text: "Calm, steady, resistant to change", dosha: "kapha" },
    ],
  },
  {
    id: "weather",
    text: "Which weather do you prefer?",
    options: [
      { text: "Warm, humid weather", dosha: "vata" },
      { text: "Cool, well-ventilated spaces", dosha: "pitta" },
      { text: "Warm, dry weather", dosha: "kapha" },
    ],
  },
];

export interface PrakritiResult {
  primary: "vata" | "pitta" | "kapha";
  secondary?: "vata" | "pitta" | "kapha";
  scores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

export const calculatePrakriti = (answers: Record<string, "vata" | "pitta" | "kapha">): PrakritiResult => {
  const scores = { vata: 0, pitta: 0, kapha: 0 };
  
  Object.values(answers).forEach(dosha => {
    scores[dosha]++;
  });
  
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0] as "vata" | "pitta" | "kapha";
  const secondary = sorted[1][1] > 0 && sorted[0][1] - sorted[1][1] <= 2 
    ? sorted[1][0] as "vata" | "pitta" | "kapha"
    : undefined;
  
  return { primary, secondary, scores };
};

export const getDietRecommendations = (prakriti: string) => {
  const diets = {
    vata: {
      favor: ["Warm, cooked foods", "Sweet, sour, salty tastes", "Healthy fats and oils", "Root vegetables", "Warm milk and ghee", "Cooked grains like rice and oats"],
      avoid: ["Cold, raw foods", "Dry, crispy foods", "Bitter, astringent tastes", "Excessive caffeine", "Carbonated drinks"],
      tips: ["Eat at regular times", "Stay hydrated with warm fluids", "Add warming spices like ginger and cinnamon"],
    },
    pitta: {
      favor: ["Cool, refreshing foods", "Sweet, bitter, astringent tastes", "Fresh fruits and vegetables", "Coconut, mint, cilantro", "Whole grains", "Cooling spices like coriander"],
      avoid: ["Spicy, hot foods", "Sour, salty tastes", "Fried and oily foods", "Red meat", "Alcohol", "Excessive caffeine"],
      tips: ["Avoid skipping meals", "Eat in a calm environment", "Choose cooling foods in summer"],
    },
    kapha: {
      favor: ["Light, dry, warm foods", "Pungent, bitter, astringent tastes", "Vegetables, especially leafy greens", "Legumes and beans", "Warming spices like ginger and pepper", "Light grains like quinoa"],
      avoid: ["Heavy, oily foods", "Sweet, sour, salty tastes", "Dairy products", "Cold drinks", "Wheat and rice in excess"],
      tips: ["Eat smaller, lighter meals", "Avoid eating late at night", "Stay active after meals"],
    },
  };
  
  return diets[prakriti as keyof typeof diets] || diets.vata;
};

export const getDailySchedule = (prakriti: string) => {
  const schedules = {
    vata: {
      morning: "6:00 AM - Wake up, oil massage (Abhyanga), warm shower, meditation (15 min)",
      breakfast: "7:30 AM - Warm, nourishing breakfast with cooked grains",
      midday: "12:00 PM - Main meal with warm, grounding foods",
      afternoon: "3:00 PM - Gentle walk or light yoga (20 min)",
      evening: "6:30 PM - Light dinner, herbal tea",
      night: "9:30 PM - Relaxing activities, warm milk, sleep by 10 PM",
      exercise: "Gentle yoga, walking, tai chi - 30 minutes daily",
      notes: "Maintain regular routine, avoid excessive travel and stress",
    },
    pitta: {
      morning: "6:00 AM - Wake up, cool shower, meditation (20 min)",
      breakfast: "7:30 AM - Cooling breakfast with fresh fruits",
      midday: "12:30 PM - Main meal, avoid spicy foods",
      afternoon: "4:00 PM - Moderate exercise in cool environment",
      evening: "7:00 PM - Light dinner, cooling herbs",
      night: "10:00 PM - Relaxation, reading, sleep by 10:30 PM",
      exercise: "Swimming, moderate yoga, evening walks - 45 minutes daily",
      notes: "Avoid overworking, competitive activities, and midday sun",
    },
    kapha: {
      morning: "5:30 AM - Early wake up, dry brushing, warm shower, vigorous exercise",
      breakfast: "8:00 AM - Light breakfast or skip if not hungry",
      midday: "12:00 PM - Main meal with warming spices",
      afternoon: "2:00 PM - Active work, avoid napping",
      evening: "6:00 PM - Very light dinner, herbal tea",
      night: "10:00 PM - Stimulating activities, sleep by 11 PM",
      exercise: "Vigorous exercise, jogging, dancing - 60 minutes daily",
      notes: "Stay active, avoid oversleeping and excessive rest",
    },
  };
  
  return schedules[prakriti as keyof typeof schedules] || schedules.vata;
};

export interface FollowUp {
  id: string;
  userId: string;
  date: string;
  notes: string;
  improvements: string[];
  concerns: string[];
  nextFollowUp: string;
}

export const getFollowUps = (userId: string): FollowUp[] => {
  const stored = localStorage.getItem(`followups-${userId}`);
  return stored ? JSON.parse(stored) : [];
};

export const addFollowUp = (followUp: FollowUp) => {
  const followUps = getFollowUps(followUp.userId);
  followUps.push(followUp);
  localStorage.setItem(`followups-${followUp.userId}`, JSON.stringify(followUps));
};
