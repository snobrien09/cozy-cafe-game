// --- DATA (later: move this into /data/cards.json) ---
const deck = [
  {
    id: "intro_1",
    tag: "Resident",
    prompt: "The cat café owner slides you a warm mug and a warmer joke. Let them set the tone?",
    yes: { cozy: +10, mischief: -5, result: "The room purrs with relief." },
    no:  { cozy: -6,  mischief: +6, result: "A few whiskers twitch. Suspicious vibes." }
  },
  {
    id: "blob_1",
    tag: "Creature",
    prompt: "A tiny blob peeks out, copying your smile. Invite it closer?",
    yes: { cozy: +4,  mischief: +5, result: "Cute… and maybe slightly contagious." },
    no:  { cozy: +2,  mischief: -2, result: "Calm stays. The blob watches quietly." }
  },
  {
    id: "truth_circle",
    tag: "Island",
    prompt: "Someone suggests a nightly ‘Truth Circle’ (with snacks). Approve it?",
    yes: { cozy: +6,  mischief: +8, result: "Honesty rises… and so do plot twists." },
    no:  { cozy: -2,  mischief: -6, result: "Quiet nights. Some feelings remain unsaid." }
  }
];

// --- STATE (this shape ports nicely to Unity later) ---
const initialState = () => ({
  turn: 1,
  idx: 0,
  cozy: 50,
  mischief: 50
});

let state = initialState();

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

// Pure function: apply a choice to state (no DOM here)
function applyChoice(card, choice, s) {
  const d = choice === "yes" ? card.yes : card.no;
  return {
    ...s,
    turn: s.turn + 1,
    idx: s.idx + 1,
    cozy: clamp(s.cozy + d.cozy, 0, 100),
    mischief: clamp(s.mischief + d.mischief, 0, 100),
    _lastResult: d.result
  };
}

function checkEnding(s) {
  if (s.cozy <= 0) return "Ending: The café loses its warmth.\nEveryone politely… stops lingering.";
  if (s.mischief >= 100) return "Ending: Mischief overload!\nThe café becomes a chaos cuddle-pile.";
  if (s.turn > 15) return "Ending: Cozy balance achieved.\nThe island feels like home.";
  return null;
}

// --- UI rendering ---
const cozyFill = document.getElementById("cozyFill");
const mischiefFill = document.getElementById("mischiefFill");
const cozyNum = document.getElementById("cozyNum");
const mischiefNum = document.getElementById("mischiefNum");
const tagEl = document.getElementById("tag");
const turnEl = document.getElementById("turn");
const promptEl = document.getElementById("prompt");

const toastEl = document.getElementById("toast");
const endingEl = document.getElementById("ending");
const endingText = document.getElementById("endingText");
const restartBtn = document.getElementById("restart");

const cardEl = document.getElementById("card");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function getCard(s) {
  return deck[s.idx % deck.length];
}

function showToast(text) {
  toastEl.textContent = text;
  toastEl.classList.remove("hidden");
  setTimeout(() => toastEl.classList.add("hidden"), 700);
}

function render(s) {
  cozyFill.style.width = `${s.cozy}%`;
  mischiefFill.style.width = `${s.mischief}%`;
  cozyNum.textContent = s.cozy;
  mischiefNum.textContent = s.mischief;

  turnEl.textContent = `Turn ${s.turn}`;
  const card = getCard(s);
  tagEl.textContent = card.tag;
  promptEl.textContent = card.prompt;

  const ending = checkEnding(s);
  if (ending) {
    endingText.textContent = ending;
    endingEl.classList.remove("hidden");
    yesBtn.disabled = true;
    noBtn.disabled = true;
  } else {
    endingEl.classList.add("hidden");
    yesBtn.disabled = false;
    noBtn.disabled = false;
  }
}

function choose(choice) {
  if (!endingEl.classList.contains("hidden")) return;
  const card = getCard(state);
  state = applyChoice(card, choice, state);
  showToast(state._lastResult);
  render(state);
}

// Buttons
yesBtn.addEventListener("click", () => choose("yes"));
noBtn.addEventListener("click", () => choose("no"));
restartBtn.addEventListener("click", () => {
  state = initialState();
  render(state);
});

// Swipe
let startX = 0, currentX = 0, dragging = false;

cardEl.addEventListener("touchstart", (e) => {
  if (!endingEl.classList.contains("hidden")) return;
  dragging = true;
  startX = e.touches[0].clientX;
  currentX = startX;
  cardEl.style.transition = "none";
}, { passive: true });

cardEl.addEventListener("touchmove", (e) => {
  if (!dragging) return;
  currentX = e.touches[0].clientX;
  const dx = currentX - startX;
  const rot = dx * 0.03;
  cardEl.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;
}, { passive: true });

cardEl.addEventListener("touchend", () => {
  if (!dragging) return;
  dragging = false;
  const dx = currentX - startX;

  cardEl.style.transition = "transform 180ms ease";
  cardEl.style.transform = "translateX(0) rotate(0deg)";

  const threshold = 90;
  if (dx > threshold) choose("yes");
  else if (dx < -threshold) choose("no");
});

// Init
render(state);
