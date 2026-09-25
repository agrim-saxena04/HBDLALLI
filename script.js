// ==========================================
// 🎀 CUSTOMIZE YOUR BIRTHDAY WEBSITE HERE
// ==========================================
// Edit the values below to personalize the website.
// Nothing else in this file needs to change!

const HER_NAME = "Lalli";

// Format: "YYYY-MM-DDTHH:MM:SS" (24-hour time, local timezone)
const BIRTHDAY_DATE = "2026-11-06T00:00:00";

const LETTER_TEXT = `Dear Bestie, 💗

Today is your special day...

But honestly, I think you're the kind of person who makes
ordinary days feel special too.

I hope this birthday brings you endless smiles,
beautiful memories, peaceful moments,
and everything your heart quietly wishes for.

Never forget how cute, beautiful and special you are.

Hain to bhut kuch likne ko but aur bhi surprises hai unke sath 🤗🦋

Happy Birthday, Lalli! 🎂💗

                                          — Dear Lalla 🧸`;

const WISH_MESSAGE = "May every beautiful wish in your heart come true. ✨";

// ==========================================
// 🎀 END OF CUSTOMIZATION SECTION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("heyName").textContent = `Hey, ${HER_NAME}... 💗`;
  document.getElementById("letterText").textContent = LETTER_TEXT;
  document.getElementById("wishMessageText").textContent = WISH_MESSAGE;

  startCountdown();
  setupNavigation();
  setupFloaters();
  setupSparkleClicks();
  setupCursorTrail();
  setupMusic();
  setupPageInteractions();
});

// ---------- PAGE NAVIGATION ----------
function showPage(n) {
  const pages = document.querySelectorAll(".page");
  const current = document.querySelector(".page.active");
  const next = document.getElementById(`page-${n}`);
  if (!next || next === current) return;

  if (current) {
    current.classList.add("leaving");
    setTimeout(() => {
      current.classList.remove("active", "leaving");
      next.classList.add("active");
    }, 400);
  } else {
    next.classList.add("active");
  }

  document.querySelectorAll("#progress-bar .dot").forEach((dot) => {
    dot.classList.toggle("on", Number(dot.dataset.page) <= n);
  });
}

function setupNavigation() {
  document
    .getElementById("startBtn")
    .addEventListener("click", () => showPage(2));
  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => showPage(Number(btn.dataset.next)));
  });
  document.querySelectorAll("#progress-bar .dot").forEach((dot) => {
    dot.addEventListener("click", () => showPage(Number(dot.dataset.page)));
  });
  showPage(1);

  // Page 2: animate meters once page becomes active
  const observer = new MutationObserver(() => {
    if (document.getElementById("page-2").classList.contains("active")) {
      animateMeters();
    }
  });
  observer.observe(document.getElementById("page-2"), {
    attributes: true,
    attributeFilter: ["class"],
  });
}

function animateMeters() {
  document.querySelectorAll(".meter-fill").forEach((fill) => {
    fill.style.width = "0%";
    requestAnimationFrame(() => {
      fill.style.width = "100%";
    });
  });
}

// ---------- COUNTDOWN ----------
function startCountdown() {
  const target = new Date(BIRTHDAY_DATE).getTime();

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById("timer").classList.add("hidden");
      document.getElementById("birthdayBanner").classList.remove("hidden");
      celebrateBirthday();
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    document.getElementById("t-days").textContent = String(days).padStart(
      2,
      "0",
    );
    document.getElementById("t-hours").textContent = String(hours).padStart(
      2,
      "0",
    );
    document.getElementById("t-mins").textContent = String(mins).padStart(
      2,
      "0",
    );
    document.getElementById("t-secs").textContent = String(secs).padStart(
      2,
      "0",
    );
  }

  tick();
  const intervalId = setInterval(tick, 1000);
}

let birthdayCelebrated = false;
function celebrateBirthday() {
  if (birthdayCelebrated) return;
  birthdayCelebrated = true;
  document.body.style.animation = "glowPulse 2s ease-in-out infinite";
  createConfetti(180);
  const heartBurst = setInterval(() => createHeart(true), 150);
  setTimeout(() => clearInterval(heartBurst), 4000);
}

// ---------- FLOATING DECOR ----------
const FLOAT_EMOJIS = ["💗", "🐰", "✨", "🌸", "🎀", "🦋", "⭐", "☁️"];

function setupFloaters() {
  setInterval(() => createFloater(), 900);
}

function createFloater() {
  const el = document.createElement("span");
  el.className = "floater";
  el.textContent =
    FLOAT_EMOJIS[Math.floor(Math.random() * FLOAT_EMOJIS.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.setProperty("--drift", Math.random() * 80 - 40 + "px");
  el.style.fontSize = 1 + Math.random() * 1.2 + "rem";
  el.style.animationDuration = 6 + Math.random() * 6 + "s";
  document.getElementById("floaters").appendChild(el);
  setTimeout(() => el.remove(), 13000);
}

function createHeart(fromRandom = false) {
  const el = document.createElement("span");
  el.className = "floater";
  el.textContent = ["💗", "🐰", "✨", "🌸"][Math.floor(Math.random() * 4)];
  el.style.left = (fromRandom ? Math.random() * 100 : 50) + "vw";
  el.style.bottom = "10vh";
  el.style.setProperty("--drift", Math.random() * 60 - 30 + "px");
  el.style.animationDuration = "3.5s";
  document.getElementById("floaters").appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

function createSparkle(x, y) {
  const el = document.createElement("span");
  el.className = "sparkle-pop";
  el.textContent = ["✨", "⭐", "🌟"][Math.floor(Math.random() * 3)];
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function setupSparkleClicks() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".btn") || e.target.closest("input")) return;
    createSparkle(e.clientX - 10, e.clientY - 10);
  });
}

// ---------- CURSOR TRAIL (desktop only) ----------
function setupCursorTrail() {
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) return;
  let lastTime = 0;
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < 90) return;
    lastTime = now;
    const el = document.createElement("span");
    el.className = "cursor-trail";
    el.textContent = Math.random() > 0.5 ? "💗" : "✨";
    el.style.left = e.clientX + "px";
    el.style.top = e.clientY + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 700);
  });
}

// ---------- MUSIC ----------
function setupMusic() {
  const btn = document.getElementById("musicBtn");
  const audio = document.getElementById("birthdayMusic");
  let playing = false;
  btn.addEventListener("click", () => {
    if (!playing) {
      audio.play().catch(() => {
        /* file missing or blocked, fail silently */
      });
      btn.classList.add("playing");
    } else {
      audio.pause();
      btn.classList.remove("playing");
    }
    playing = !playing;
  });
}

// ---------- CONFETTI (canvas) ----------
function createConfetti(count = 100) {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = [
    "#FF8FB8",
    "#E85D8E",
    "#FFD6E7",
    "#E8D9FF",
    "#CDB4DB",
    "#FFFFFF",
  ];
  const pieces = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.5,
    size: 5 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: 2 + Math.random() * 3,
    speedX: Math.random() * 2 - 1,
    rotation: Math.random() * 360,
    rotSpeed: Math.random() * 8 - 4,
  }));

  let frame = 0;
  const maxFrames = 260;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("confettiCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ---------- PAGE-SPECIFIC INTERACTIONS ----------
function setupPageInteractions() {
  // Bunny click (page 2)
  const bunny = document.getElementById("bunny");
  bunny.addEventListener("click", (e) => {
    e.stopPropagation();
    const msg = bunny.querySelector(".bunny-msg");
    msg.classList.remove("hidden");
    bunny.style.transform = "scale(1.2) rotate(-8deg)";
    setTimeout(() => {
      bunny.style.transform = "";
    }, 300);
    setTimeout(() => msg.classList.add("hidden"), 1800);
  });

  // Blow candles (page 3)
  document.getElementById("blowBtn").addEventListener("click", blowCandles);

  // Open letter (page 4)
  document
    .getElementById("openLetterBtn")
    .addEventListener("click", openLetter);

  // Make wish (page 5)
  document.getElementById("wishBtn").addEventListener("click", makeWish);

  // Open gift (page 6)
  document.getElementById("openGiftBtn").addEventListener("click", openGift);

  // Small easter-egg hints on hover of hearts in the progress bar / title areas
  document.querySelectorAll("h1, h2").forEach((el) => {
    el.addEventListener("click", () => showMiniHint(el));
  });
}

const MINI_MESSAGES = [
  "psst... you're cute 💗",
  "hehe 🎀",
  "stop being this adorable 🥺",
  "one more surprise... 👀",
  "you're still here? cute. 💗",
];

function showMiniHint(anchorEl) {
  const rect = anchorEl.getBoundingClientRect();
  const hint = document.createElement("div");
  hint.className = "mini-hint";
  hint.textContent =
    MINI_MESSAGES[Math.floor(Math.random() * MINI_MESSAGES.length)];
  hint.style.left = rect.left + rect.width / 2 - 60 + "px";
  hint.style.top = rect.top - 10 + "px";
  document.body.appendChild(hint);
  setTimeout(() => hint.remove(), 1600);
}

function blowCandles() {
  const cake = document.getElementById("cake");
  cake.classList.add("blown", "sparkling");
  document.querySelectorAll(".flame").forEach((f) => f.classList.add("out"));
  createConfetti(90);
  for (let i = 0; i < 14; i++) {
    setTimeout(() => createHeart(true), i * 100);
  }
  document.getElementById("blowBtn").classList.add("hidden");
  document.getElementById("afterBlow").classList.remove("hidden");
}

function openLetter() {
  const envelope = document.getElementById("envelope");
  envelope.classList.add("open");
  setTimeout(() => {
    document.getElementById("openLetterBtn").classList.add("hidden");
    document.getElementById("letterPaper").classList.remove("hidden");
  }, 500);
}

function makeWish() {
  const input = document.getElementById("wishInput");
  const moon = document.getElementById("moon");
  moon.classList.add("glow");
  document.getElementById("wishForm").classList.add("hidden");
  document.getElementById("wishResult").classList.remove("hidden");
  createConfetti(70);
  for (let i = 0; i < 10; i++) {
    setTimeout(() => createHeart(true), i * 120);
  }
  input.blur();
}

function openGift() {
  const box = document.getElementById("giftBox");
  box.classList.add("opening");
  setTimeout(() => {
    document.getElementById("giftClosed").classList.add("hidden");
    document.getElementById("giftOpen").classList.remove("hidden");
    createConfetti(220);
    let n = 0;
    const heartInterval = setInterval(() => {
      createHeart(true);
      n++;
      if (n > 20) clearInterval(heartInterval);
    }, 100);
  }, 550);
}
