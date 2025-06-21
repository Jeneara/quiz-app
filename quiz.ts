// This is a enum of the results possible in the quiz
type Results = "Cottagecore" | "Witchcore" | "Fantasycore";

// This is the interface for the details of each result
interface ResultDetails {
    name: Results;
    image: string;
    description: string;
}

// This is the interface for the answers in the quiz
interface Answer {
    text: string;
    results: Results;
}

// This is the interface for the questions in the quiz
interface Question {
    question: string;
    answers: Answer[];
}

// This is a mapping of results to their details
const resultDetails: Record<Results, ResultDetails> = {
    Cottagecore: {
        name: "Cottagecore",
        image: "images/results/cottagecore.jpg",
        description: "You're drawn to simple living, cozy spaces, and nature-inspired aesthetics!"
    },
    Witchcore: {
        name: "Witchcore",
        image: "images/results/witchcore.jpg",
        description: "You embrace the mystical and magical with your affinity for crystals, herbs, and moonlight!"
    },
    Fantasycore: {
        name: "Fantasycore",
        image: "images/results/fantasycore.jpg",
        description: "You're enchanted by medieval aesthetics, mythical creatures, and epic adventures!"
    }
};

// TODO - randomize the questions
// TODO - add images to questions
// TODO - add a timer to the quiz
const questions: Question[] = [
    {
        question: "Pick a drink:",
        answers: [
            { text: "Herbal tea", results: "Cottagecore" },
            { text: "Potion brew", results: "Witchcore" },
            { text: "Mead", results: "Fantasycore" },
        ],
    },
    {
        question: "Choose a landscape:",
        answers: [
            { text: "Wildflower meadow", results: "Cottagecore" },
            { text: "Moonlit forest", results: "Witchcore" },
            { text: "Castle courtyard", results: "Fantasycore" },
        ],
    },
    {
        question: "What accessory suits you?",
        answers: [
            { text: "Floral crown", results: "Cottagecore" },
            { text: "Crystal necklace", results: "Witchcore" },
            { text: "Dragon pendant", results: "Fantasycore" },
        ],
    },
];

let results: Record<Results, number> = {
    Cottagecore: 0,
    Witchcore: 0,
    Fantasycore: 0,
};

let currentQuestion = 0;

function answer(result: Results) {
    results[result]++;
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        showResult();
    } else {
        renderQuestion();
    }
}

// TODO - Add button to restart the quiz
//TODO - Add a share button for social media
// TODO - Add Images for results
function showResult() {
    // Turn into an array of tuples and sort by score
    const array = (Object.entries(results) as [Results, number][])
        .sort((a, b) => b[1] - a[1]);
    // Get the maximum score
    const maxScore = array[0][1];
    // Filter results to find all winners with the maximum score
    const winners = array.filter(([_, score]) => score === maxScore)
        .map(([result]) => result);
    // If there is only one winner, use that directly else randomly select one
    let winnerStyle: Results = winners.length !== 1
        ? winners[Math.floor(Math.random() * winners.length)]
        : winners[0];

    // Get the winner details
    const winner = resultDetails[winnerStyle];

    const container = document.getElementById("quiz")!;
    container.innerHTML = `
    <div class="text-center">
      <h2 class="text-3xl font-bold">You are <span class="text-pink-500">${winner.name}</span>!</h2>
      <img src="${winner.image}" alt="${winner.name}" class="mt-4 mx-auto rounded-lg shadow-md" style="max-width: 100%; height: auto;">
      <p class="mt-4 text-lg">${winner.description}</p>
      <div class="mt-6 space-x-2">
        <button onclick="restartQuiz()" class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
          Restart Quiz
        </button>
        <button onclick="shareResult('${winner.name}')" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Share Result
        </button>
      </div>
    </div>
  `;
}

function renderQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById("quiz")!;
    container.innerHTML = `
    <h2 class="text-2xl font-semibold mb-4">${q.question}</h2>
    <div class="space-y-2">
      ${q.answers.map(
        a => `<button onclick="answer('${a.results}')" class="block w-full bg-gray-100 hover:bg-gray-200 p-4 rounded">${a.text}</button>`
    ).join("")}
    </div>
  `;
}
function restartQuiz() {
    results = {
        Cottagecore: 0,
        Witchcore: 0,
        Fantasycore: 0,
    };
    currentQuestion = 0;
    renderQuestion();
}

function shareResult(result: string) {
    const text = `I am ${result} according to this style quiz!`;
    const url = window.location.href;

    // Open a new window with Twitter share URL
    window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        '_blank'
    );
}

// Export these functions to the window object for use in HTML
(window as any).answer = answer;
(window as any).restartQuiz = restartQuiz;
(window as any).shareResult = shareResult;


document.addEventListener("DOMContentLoaded", () => {
    renderQuestion();
});
