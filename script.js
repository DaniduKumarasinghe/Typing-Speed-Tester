const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests help improve your speed and accuracy.",
  "JavaScript powers the interactivity of the web.",
  "Practice makes perfect when learning to code.",
  "Frontend development includes HTML, CSS, and JS."
];

let selectedSentence = "";
let startTime, timerInterval;

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const resultsEl = document.getElementById("results");

function startTest() {
  selectedSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.textContent = selectedSentence;
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  resultsEl.innerHTML = "";
  startTime = new Date();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  timerEl.textContent = `Time: ${elapsed}s`;
}

function finishTest() {
  clearInterval(timerInterval);
  inputEl.disabled = true;
  const endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000;

  const typed = inputEl.value.trim();
  const wordCount = typed.split(/\s+/).filter(w => w).length;
  const wpm = Math.round((wordCount / timeTaken) * 60);

  // Accuracy
  const originalWords = selectedSentence.split(" ");
  const typedWords = typed.split(" ");
  let correct = 0;
  for (let i = 0; i < originalWords.length; i++) {
    if (typedWords[i] === originalWords[i]) correct++;
  }
  const accuracy = Math.round((correct / originalWords.length) * 100);

  resultsEl.innerHTML = `
    <p><strong>Time Taken:</strong> ${timeTaken.toFixed(2)} seconds</p>
    <p><strong>Words Per Minute (WPM):</strong> ${wpm}</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
  `;

  highlightErrors();
}

function highlightErrors() {
  const typed = inputEl.value.trim().split(" ");
  const original = selectedSentence.split(" ");
  let resultHTML = "";
  for (let i = 0; i < original.length; i++) {
    if (typed[i] === original[i]) {
      resultHTML += `<span>${original[i]} </span>`;
    } else {
      resultHTML += `<span class="incorrect">${original[i]} </span>`;
    }
  }
  sentenceEl.innerHTML = resultHTML;
}

function resetTest() {
  clearInterval(timerInterval);
  sentenceEl.textContent = "";
  inputEl.value = "";
  inputEl.disabled = true;
  timerEl.textContent = "Time: 0s";
  resultsEl.innerHTML = "";
}
