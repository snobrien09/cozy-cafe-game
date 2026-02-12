document.addEventListener("DOMContentLoaded", () => {
  // Debug badge (optional—delete later)
  const dbg = document.createElement("div");
  dbg.textContent = "script.js loaded ✅";
  dbg.style.cssText =
    "position:fixed;top:8px;left:8px;z-index:99999;padding:8px 10px;background:#fff;border:2px solid #000;border-radius:10px;font-weight:800";
  document.body.appendChild(dbg);
});

// --- DATA (later: move this into /data/cards.json) ---
const deck = [
  {
    id: "intro_owner",
    tag: "Resident",
    prompt: "The cat cafe owner slides you a warm mug and a warmer joke. Let them set the tone for the day?",
    yes: { cozy: +10, mischief: -5, result: "The cafe hums with easy laughter." },
    no:  { cozy: -6,  mischief: +6, result: "A few customers whisper. Was that... awkward?" }
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
    prompt: "Someone suggests starting a nightly 'Truth Circle' (with snacks). Approve it?",
    yes: { cozy: +6, mischief: +8, result: "Honesty rises... along with dramatic confessions." },
    no:  { cozy: -2, mischief: -6, result: "Quiet nights. Some feelings stay bottled." }
  },
  {
    id: "cat_hat",
    tag: "Resident",
    prompt: "A regular wants to put tiny hats on all the cafe cats for photos. Allow it?",
    yes: { cozy: +4, mischief: +10, result: "Adorable chaos erupts." },
    no:  { cozy: +3, mischief: -3, result: "The cats remain dignified." }
  },
  {
    id: "blob_copy",
    tag: "Creature",
    prompt: "The blob copies a customer's sneeze perfectly. Encourage its mimicry?",
    yes: { cozy: +3, mischief: +8, result: "The blob learns quickly... perhaps too quickly." },
    no:  { cozy: +4, mischief: -4, result: "You gently redirect it. Growth can wait." }
  },
  {
    id: "storm_warning",
    tag: "Island",
    prompt: "A soft island storm is coming. Close the cafe early?",
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
    yes: { cozy: +6, mischief: +6, result: "The cafe gasps in collective awe." },
    no:  { cozy: +3, mischief: -4, result: "You dim the lights. Calm over spectacle." }
  }
];

// --- STATE ---
const initialState = () => ({
  turn: 1,
  idx: 0,
  cozy: 50,
  mischief: 50
});

let state = initialState();

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

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
  const cozy = Number(s.cozy);
  const mischief = Number(s.mischief);

  if (cozy <= 0) return "Ending: The cafe loses its warmth.\nEveryone politely drifts away.";
  if (mischief <= 0) return "Ending: Perfect Order.\nEverything is calm... perhaps too calm.";

  if (cozy >= 100) return "Ending: Peak Cozy Achieved.\nThe cafe becomes a sanctuary of soft light and purring harmony.";
  if (mischief >= 100) return "Ending: Mischief Overload!\nThe cafe becomes a chaos cuddle-pile.";

  if (deck.length > 0 && s.idx >= deck.length)
    return "Ending: Cozy Balance Achieved.\nThe island feels like home.";

  return null;
}

// --- UI refs ---
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
endingEl.classList.add("hidden");
endingText.textContent = "";
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
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.add("hidden"), 1200);
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
    endingText.textContent = "";
    yesBtn.disabled = false;
    noBtn.disabled = false;
  }
}

function choose(choice) {
  if (!endingEl.classList.contains("hidden")) return;
  const card = getCard(state);
  state = applyChoice(card, choice, state);

  // Pufflet reaction hop
  pufflet.vy -= (choice === "yes" ? 1.2 : 0.7);

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

// --- PIXEL SCENE (greenhouse + Pufflet) ---
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

const LOGICAL_W = 160;
const LOGICAL_H = 90;

// Draw at low-res on an offscreen buffer (pixel look)
const off = document.createElement("canvas");
off.width = LOGICAL_W;
off.height = LOGICAL_H;

const octx = off.getContext("2d");
octx.imageSmoothingEnabled = false;

// Background
const bg = new Image();
bg.src = "assets/greenhouse_bg.png";

// Dust
const dust = Array.from({ length: 12 }, () => ({
  x: Math.random() * LOGICAL_W,
  y: Math.random() * LOGICAL_H,
  s: 0.2 + Math.random() * 0.6
}));

let pufflet = {
  x: 60,
  y: 55,
  vx: 0.6,
  vy: 0,
  r: 8
};

function resizeCanvasToCSS() {
  // Make the visible canvas match its CSS size (so it actually fills cardWrap)
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width));
  const h = Math.max(1, Math.floor(rect.height));

  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
    ctx.imageSmoothingEnabled = false;
  }
}
window.addEventListener("resize", resizeCanvasToCSS);
setTimeout(resizeCanvasToCSS, 0);

function drawScene() {
  resizeCanvasToCSS();

  // Clear offscreen
  octx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

  // Background
  if (bg.complete && bg.naturalWidth) {
    octx.drawImage(bg, 0, 0, LOGICAL_W, LOGICAL_H);
  } else {
    octx.fillStyle = "#f7e6d6";
    octx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
  }

  // Cozy / Mischief tint
  octx.globalAlpha = 0.18 * (state.cozy / 100);
  octx.fillStyle = "#ffd9a8";
  octx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

  octx.globalAlpha = 0.14 * (state.mischief / 100);
  octx.fillStyle = "#d6b3ff";
  octx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

  octx.globalAlpha = 1;

  // Dust
  octx.fillStyle = "#ffffff";
  octx.globalAlpha = 0.20;
  for (const p of dust) {
    p.x = (p.x + p.s * 0.20) % LOGICAL_W;
    p.y = (p.y + p.s * 0.10) % LOGICAL_H;
    octx.fillRect(p.x | 0, p.y | 0, 1, 1);
  }
  octx.globalAlpha = 1;

  // Pufflet physics
  pufflet.vy += 0.07;        // gravity
  pufflet.x += pufflet.vx;
  pufflet.y += pufflet.vy;

  // Bounce X
  if (pufflet.x < pufflet.r || pufflet.x > LOGICAL_W - pufflet.r) pufflet.vx *= -1;

  // Floor
  const floorY = LOGICAL_H * 0.75;
  if (pufflet.y > floorY) {
    pufflet.y = floorY;
    pufflet.vy *= -0.25;
    if (Math.abs(pufflet.vy) < 0.05) pufflet.vy = 0;
  }

  // Size reacts to Cozy
  const grow = 1 + (state.cozy / 100) * 0.4;
  const R = pufflet.r * grow;

  // Shadow
  octx.globalAlpha = 0.25;
  octx.fillStyle = "#2b241f";
  octx.fillRect((pufflet.x - 6) | 0, (pufflet.y + R - 1) | 0, 12, 2);
  octx.globalAlpha = 1;

  // Body
  octx.fillStyle = "#ff9fbb";
  octx.beginPath();
  octx.arc(pufflet.x, pufflet.y, R, 0, Math.PI * 2);
  octx.fill();

  // Outline
  octx.strokeStyle = "#2b241f";
  octx.lineWidth = 2;
  octx.stroke();

  // Eyes
  octx.fillStyle = "#2b241f";
  octx.fillRect((pufflet.x - 3) | 0, (pufflet.y - 2) | 0, 2, 2);
  octx.fillRect((pufflet.x + 1) | 0, (pufflet.y - 2) | 0, 2, 2);

  // Blit scaled to visible canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(off, 0, 0, canvas.width, canvas.height);

  requestAnimationFrame(drawScene);
}

drawScene();
render(state);
