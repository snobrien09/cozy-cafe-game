// --- DATA (later: move this into /data/cards.json) ---
const deck = [
  {
const 

  {
    id: "intro_owner",
    tag: "Resident",
    prompt: "The cat café owner slides you a warm mug and a warmer joke. Let them set the tone for the day?",
    yes: { cozy: +10, mischief: -5, result: "The café hums with easy laughter." },
    no:  { cozy: -6,  mischief: +6, result: "A few customers whisper. Was that… awkward?" }
  },

  {
    id: "blob_peek",
    tag: "Creature",
    prompt: "A tiny pastel blob peeks from behind the pastry case, mimicking your expression. Invite it closer?",
    yes: { cozy: +5, mischief: +4, result: "It wiggles happily. Several hearts melt." },
    no:  { cozy: +2, mischief: -2, result: "It stays shy. The vibe remains calm." }
  },

  {
    id: "truth_circle",
    tag: "Island",
    prompt: "Someone suggests starting a nightly ‘Truth Circle’ (with snacks). Approve it?",
    yes: { cozy: +6, mischief: +8, result: "Honesty rises… along with dramatic confessions." },
    no:  { cozy: -2, mischief: -6, result: "Quiet nights. Some feelings stay bottled." }
  },

  {
    id: "cat_hat",
    tag: "Resident",
    prompt: "A regular wants to put tiny hats on all the café cats for photos. Allow it?",
    yes: { cozy: +4, mischief: +10, result: "Adorable chaos erupts." },
    no:  { cozy: +3, mischief: -3, result: "The cats remain dignified." }
  },

  {
    id: "blob_copy",
    tag: "Creature",
    prompt: "The blob copies a customer’s sneeze perfectly. Encourage its mimicry?",
    yes: { cozy: +3, mischief: +8, result: "The blob learns quickly… perhaps too quickly." },
    no:  { cozy: +4, mischief: -4, result: "You gently redirect it. Growth can wait." }
  },

  {
    id: "storm_warning",
    tag: "Island",
    prompt: "A soft island storm is coming. Close the café early?",
    yes: { cozy: +8, mischief: -5, result: "Everyone huddles warmly at home." },
    no:  { cozy: -4, mischief: +7, result: "Wind howls. Tension simmers." }
  },

  {
    id: "mystery_pastry",
    tag: "Resident",
    prompt: "A new baker offers a glowing mystery pastry. Add it to the menu?",
    yes: { cozy: +2, mischief: +12, result: "It sparkles. The blob seems fascinated." },
    no:  { cozy: +5, mischief: -3, result: "Safety first. The vibe stays stable." }
  },

  {
    id: "blob_glow",
    tag: "Creature",
    prompt: "The blob begins to faintly glow after eating crumbs. Celebrate it?",
    yes: { cozy: +6, mischief: +6, result: "The café gasps in collective awe." },
    no:  { cozy: +3, mischief: -4, result: "You dim the lights. Calm over spectacle." }
  },

  {
    id: "gossip",
    tag: "Resident",
    prompt: "Two customers whisper heated gossip about the café. Confront them?",
    yes: { cozy: +4, mischief: -6, result: "Boundaries restore peace." },
    no:  { cozy: -6, mischief: +6, result: "The rumor mill spins." }
  },

  {
    id: "blob_hide",
    tag: "Creature",
    prompt: "The blob hides inside a teacup and refuses to come out. Coax it gently?",
    yes: { cozy: +7, mischief: +2, result: "It peeks out, trusting you." },
    no:  { cozy: -3, mischief: -2, result: "It sulks quietly." }
  },

  {
    id: "festival",
    tag: "Island",
    prompt: "The island hosts a lantern festival tonight. Keep the café open late?",
    yes: { cozy: +8, mischief: +5, result: "Lantern light dances through the windows." },
    no:  { cozy: -2, mischief: -4, result: "A quieter evening settles in." }
  },

  {
    id: "cat_argument",
    tag: "Resident",
    prompt: "Two café cats argue over a sunbeam. Intervene?",
    yes: { cozy: +5, mischief: -3, result: "Peace returns to the cushions." },
    no:  { cozy: -3, mischief: +5, result: "Tiny paw drama unfolds." }
  },

  {
    id: "blob_split",
    tag: "Creature",
    prompt: "The blob briefly splits into two smaller blobs. Encourage this?",
    yes: { cozy: +4, mischief: +12, result: "Double the wiggle. Double the chaos." },
    no:  { cozy: +6, mischief: -4, result: "It merges back, slightly embarrassed." }
  },

  {
    id: "review",
    tag: "Resident",
    prompt: "A critic visits the café anonymously. Treat them like any other guest?",
    yes: { cozy: +6, mischief: -2, result: "Authenticity shines." },
    no:  { cozy: -4, mischief: +5, result: "The tension feels… performative." }
  },

  {
    id: "blob_name",
    tag: "Creature",
    prompt: "The regulars want to name the blob ‘Pufflet.’ Approve the name?",
    yes: { cozy: +8, mischief: +3, result: "Pufflet wiggles proudly." },
    no:  { cozy: -2, mischief: +2, result: "The blob seems slightly offended." }
  },

  {
    id: "midnight_baking",
    tag: "Island",
    prompt: "Midnight baking session? The smell might attract… attention.",
    yes: { cozy: +5, mischief: +10, result: "The island lights flicker playfully." },
    no:  { cozy: +4, mischief: -3, result: "A peaceful sleep settles in." }
  },

  {
    id: "blob_taller",
    tag: "Creature",
    prompt: "The blob stretches taller than before. Encourage its growth?",
    yes: { cozy: +6, mischief: +8, result: "It looks almost majestic." },
    no:  { cozy: +5, mischief: -4, result: "It shrinks back into a comfy puff." }
  },

  {
    id: "cat_cuddle_event",
    tag: "Resident",
    prompt: "Host a public ‘Cuddle Hour’ with the cats?",
    yes: { cozy: +12, mischief: +4, result: "The café becomes a purring cloud." },
    no:  { cozy: -4, mischief: -3, result: "Order remains. Fewer furballs." }
  },

  {
    id: "blob_glitch",
    tag: "Creature",
    prompt: "The blob briefly flickers like a glitch. Investigate?",
    yes: { cozy: +3, mischief: +12, result: "Something ancient stirs…" },
    no:  { cozy: +6, mischief: -5, result: "You smooth it over gently." }
  },

  {
    id: "final_balance",
    tag: "Island",
    prompt: "The café feels different now. Trust your instincts for the future?",
    yes: { cozy: +10, mischief: +2, result: "The island feels like home." },
    no:  { cozy: -6, mischief: +6, result: "Uncertainty hums in the air." }
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
  if (s.idx >= deck.length) return "Ending: Cozy balance achieved.\nThe island feels like home.";
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
