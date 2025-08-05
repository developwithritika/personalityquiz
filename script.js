
const questions = [
  {
    question: "When things go wrong, your first instinct is to...",
    options: [
      "Take control and fix it",
      "Blame yourself quietly",
      "Laugh it off or distract others",
      "Retreat to be alone and reflect"
    ],
    mapping: ["hero", "echo", "masker", "depth"]
  },
  {
    question: "You’re most alive when...",
    options: [
      "You're building something only you understand",
      "You’re around people who truly see you",
      "You’re exploring something mysterious or forbidden",
      "You're protecting or defending someone"
    ],
    mapping: ["thinker", "storm", "depth", "hero"]
  },
  {
    question: "Your mind is most like...",
    options: [
      "A maze",
      "A river",
      "A battlefield",
      "A mirror"
    ],
    mapping: ["thinker", "storm", "hero", "echo"]
  },
  {
    question: "What do you secretly crave the most?",
    options: [
      "Peace",
      "Recognition",
      "Power",
      "Escape"
    ],
    mapping: ["storm", "hero", "thinker", "depth"]
  },
  {
    question: "What kind of people drain you the most?",
    options: [
      "Fake deep people",
      "Emotion dumpers",
      "Loud chaotic ones",
      "Approval seekers"
    ],
    mapping: ["thinker", "storm", "depth", "echo"]
  },
  {
    question: "How do you respond to intense emotions?",
    options: [
      "Shut down",
      "Confide in one person",
      "Overanalyze",
      "Mask it"
    ],
    mapping: ["echo", "storm", "thinker", "masker"]
  },
  {
    question: "What scares you about being seen?",
    options: [
      "They’ll think you’re too much",
      "They’ll see you're broken",
      "They’ll misread your silence",
      "They’ll feel how much you feel"
    ],
    mapping: ["storm", "hero", "echo", "depth"]
  },
  {
    question: "Pick a word that feels like home:",
    options: [
      "Solitude",
      "Loyalty",
      "Depth",
      "Control"
    ],
    mapping: ["depth", "storm", "depth", "hero"]
  },
  {
    question: "What do you do when no one’s watching?",
    options: [
      "Replay things in your head",
      "Daydream",
      "Plan your next move",
      "Go still"
    ],
    mapping: ["echo", "depth", "thinker", "storm"]
  },
  {
    question: "Choose a symbol:",
    options: [
      "🔮 Crystal ball",
      "🕸️ Spiderweb",
      "🔥 Flame",
      "🧩 Puzzle piece"
    ],
    mapping: ["depth", "echo", "storm", "thinker"]
  },
  {
    question: "What’s your coping strategy?",
    options: [
      "Distraction",
      "Isolation",
      "Talking it out",
      "Numbing"
    ],
    mapping: ["masker", "depth", "storm", "echo"]
  },
  {
    question: "How do you self-sabotage?",
    options: [
      "Shrink to fit",
      "Burnout from waiting",
      "Trust wrong people",
      "Over-control"
    ],
    mapping: ["echo", "storm", "hero", "thinker"]
  },
  {
    question: "What do people misunderstand about you?",
    options: [
      "Think you're emotionless",
      "Think you're arrogant",
      "Assume you're fine",
      "Think you're shallow"
    ],
    mapping: ["echo", "thinker", "storm", "masker"]
  },
  {
    question: "What do you know but pretend not to?",
    options: [
      "That people envy you",
      "That you're meant for more",
      "That you're tired",
      "That you've outgrown your life"
    ],
    mapping: ["hero", "thinker", "echo", "depth"]
  },
  {
    question: "What do you wish someone would say?",
    options: [
      "You're not too much",
      "I see your effort",
      "You're not alone",
      "I trust you"
    ],
    mapping: ["storm", "hero", "echo", "thinker"]
  }
];

const results = {
  "storm": "🌪️ The Gentle Storm – You're soft-spoken but powerful. People mistake your calm for weakness. You’re here to move people, not just support them.",
  "thinker": "🧠 The Fractal Thinker – You see what others can’t. Patterns, meanings, possibilities. You don’t think linearly — you think *deeply*.",
  "hero": "🦸 The Accidental Hero – You don’t try to lead. But you do. Even when unsure, your presence inspires others to act.",
  "echo": "🔁 The Echo Walker – You feel everything, sometimes too much. You reflect others’ pain before they know it's there. You’re healing — even if no one sees it.",
  "depth": "🌊 The Untouched Depth – You carry oceans inside. Few get to see it. You crave space to express your inner world without shrinking.",
  "masker": "🎭 The Quiet Storm – You hide your chaos behind control. But inside, there's fire. It's time to stop hiding and let people feel it."
};

let current = 0;
let scoreMap = {
  storm: 0,
  thinker: 0,
  hero: 0,
  echo: 0,
  depth: 0,
  masker: 0
};

const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");

function showQuestion() {
  const q = questions[current];
  quiz.innerHTML = `
    <h2>${q.question}</h2>
    ${q.options.map((opt, i) => `
      <label>
        <input type="radio" name="answer" value="${q.mapping[i]}" />
        ${opt}
      </label><br/>
    `).join("")}
  `;
}

function getSelected() {
  const radios = document.querySelectorAll("input[name='answer']");
  for (let radio of radios) {
    if (radio.checked) return radio.value;
  }
  return null;
}

function calculateResult() {
  const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
  return results[sorted[0][0]];
}

function showResult() {
  resultBox.classList.remove("hidden");
  const finalResult = calculateResult();
  resultBox.innerHTML = `
    <h2>Your Result</h2>
    <p>${finalResult}</p>
  `;
  quiz.classList.add("hidden");
  nextBtn.classList.add("hidden");
}

nextBtn.addEventListener("click", () => {
  const selected = getSelected();
  if (!selected) return alert("Pick an answer 🐒");

  scoreMap[selected] += 1;
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

showQuestion();
