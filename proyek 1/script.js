/* =========================================================
   ROMANTIC INTERACTIVE STORY
   Edit the CONFIG section below first.
   ========================================================= */

const CONFIG = {
  // ===== BASIC INFO =====
  partnerName: "someone special",

  // ===== TEKS TOMBOL =====
  buttons: {
    begin: "Begin our story",
    memories: "See our memories",
    ending: "Continue to the ending"
  },

  // ===== DATA FOTO =====
  // Ganti image, caption, dan date. Tidak perlu mengubah struktur.
  memories: [
    {
      image: "images/foto1.jpg",
      caption: "Tulis cerita singkat tentang foto pertama di sini.",
      date: "Tanggal / momen"
    },
    {
      image: "images/foto2.jpg",
      caption: "Tulis cerita singkat tentang foto kedua di sini.",
      date: "Tanggal / momen"
    },
    {
      image: "images/foto3.jpg",
      caption: "Tulis cerita singkat tentang foto ketiga di sini.",
      date: "Tanggal / momen"
    },
    {
      image: "images/foto4.jpg",
      caption: "Tulis cerita singkat tentang foto keempat di sini.",
      date: "Tanggal / momen"
    },
    {
      image: "images/foto5.jpg",
      caption: "Tulis cerita singkat tentang foto kelima di sini.",
      date: "Tanggal / momen"
    },
    {
      image: "images/foto6.jpg",
      caption: "Tulis cerita singkat tentang foto keenam di sini.",
      date: "Tanggal / momen"
    },
    {
      image: "images/foto7.jpg",
      caption: "Tulis cerita singkat tentang foto ketujuh di sini.",
      date: "Tanggal / momen"
    },
    {
      image: "images/foto8.jpg",
      caption: "Tulis cerita singkat tentang foto kedelapan di sini.",
      date: "Tanggal / momen"
    },
    {
      image: "images/foto9.jpg",
      caption: "Tulis cerita singkat tentang foto kesembilan di sini.",
      date: "Tanggal / momen"
    },
    {
      image: "images/foto10.jpg",
      caption: "Tulis cerita singkat tentang foto kesepuluh di sini.",
      date: "Tanggal / momen"
    }
  ],

  // ===== AUDIO =====
  audioFile: "audio/lagu.mp3"
};


/* =========================================================
   ELEMENTS
   ========================================================= */

const pages = [...document.querySelectorAll(".page")];
const giftScene = document.getElementById("giftScene");
const openingCopy = document.getElementById("openingCopy");
const surpriseMessage = document.getElementById("surpriseMessage");
const memoriesList = document.getElementById("memoriesList");
const letterNext = document.getElementById("letterNext");
const memoryNext = document.getElementById("memoryNext");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicControl = document.getElementById("musicControl");
const musicLabel = document.getElementById("musicLabel");
const restartBtn = document.getElementById("restartBtn");


/* =========================================================
   INIT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderMemories();
  createParticles();
  setupNavigation();
  setupRevealObserver();
  setupCompletionObservers();
  setupAudio();
});


/* =========================================================
   CONFIG → HTML
   ========================================================= */

function applyConfig() {
  document.querySelectorAll("[data-partner-name]").forEach(el => {
    el.textContent = CONFIG.partnerName;
  });

  const beginBtn = document.querySelector('[data-next="page2"]');
  if (beginBtn) beginBtn.querySelector("span").textContent = CONFIG.buttons.begin;

  const memoriesBtn = document.querySelector('[data-next="page3"]');
  if (memoriesBtn) memoriesBtn.querySelector("span").textContent = CONFIG.buttons.memories;

  const endingBtn = document.querySelector('[data-next="page4"]');
  if (endingBtn) endingBtn.querySelector("span").textContent = CONFIG.buttons.ending;

  bgMusic.src = CONFIG.audioFile;
}


/* =========================================================
   DATA FOTO
   ========================================================= */

function renderMemories() {
  memoriesList.innerHTML = "";

  CONFIG.memories.forEach((memory, index) => {
    const card = document.createElement("article");
    card.className = "memory-card";

    card.innerHTML = `
      <span class="tape"></span>
      <span class="memory-sticker">${index % 2 === 0 ? "♡" : "✦"}</span>

      <div class="memory-photo-wrap">
        <img class="memory-photo"
             src="${escapeAttribute(memory.image)}"
             alt="Memory ${index + 1}"
             loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.hidden=false;">
        <div class="memory-placeholder" hidden>
          <div>
            <strong>Foto ${index + 1}</strong><br>
            <small>Masukkan file foto ke folder images/</small>
          </div>
        </div>
      </div>

      <div class="memory-info">
        <span class="memory-date">${escapeHTML(memory.date)}</span>
        <p class="memory-caption">${escapeHTML(memory.caption)}</p>
        <span class="memory-number">${String(index + 1).padStart(2, "0")}</span>
      </div>
    `;

    memoriesList.appendChild(card);
  });
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {
  document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => {
      goToPage(button.dataset.next);
    });
  });

  restartBtn.addEventListener("click", () => {
    goToPage("page1");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 150);
  });
}

function goToPage(pageId) {
  pages.forEach(page => {
    page.classList.toggle("active", page.id === pageId);
    if (page.id === pageId) page.scrollTop = 0;
  });

  if (pageId === "page2" || pageId === "page3" || pageId === "page4") {
    playMusicAfterInteraction();
  }

  window.setTimeout(() => {
    document.querySelectorAll(`#${pageId} .reveal`).forEach(el => {
      if (isNearViewport(el)) el.classList.add("revealed");
    });
  }, 120);
}


/* =========================================================
   PAGE 1 — OPENING GIFT
   ========================================================= */

let giftOpened = false;

giftScene.addEventListener("click", openGift);

giftScene.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openGift();
  }
});

function openGift() {
  if (giftOpened) return;
  giftOpened = true;

  giftScene.classList.add("opening");

  window.setTimeout(() => {
    giftScene.classList.add("exploding");
    createExplosion();
    playMusicAfterInteraction();
  }, 650);

  window.setTimeout(() => {
    openingCopy.classList.add("hide");
    surpriseMessage.classList.add("show");
  }, 1050);
}

function createExplosion() {
  const symbols = ["♡", "♥", "✦", "✧", "·", "✿", "❀"];
  const colors = ["#d96f92", "#e99ab5", "#f0b8c9", "#ffffff", "#c96383"];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("span");
    piece.className = "explosion-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 260;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 80;

    piece.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 90;
      pointer-events: none;
      color: ${colors[Math.floor(Math.random() * colors.length)]};
      font-size: ${10 + Math.random() * 22}px;
      --x: ${x}px;
      --y: ${y}px;
      --r: ${-240 + Math.random() * 480}deg;
      animation: explodePiece ${.8 + Math.random() * .9}s cubic-bezier(.15,.75,.25,1) forwards;
      animation-delay: ${Math.random() * .15}s;
    `;

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2200);
  }
}

const explosionStyle = document.createElement("style");
explosionStyle.textContent = `
@keyframes explodePiece {
  0% { transform: translate(-50%,-50%) scale(.2) rotate(0); opacity: 0; }
  12% { opacity: 1; }
  100% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1) rotate(var(--r)); opacity: 0; }
}`;
document.head.appendChild(explosionStyle);


/* =========================================================
   REVEAL — INTERSECTION OBSERVER
   ========================================================= */

let revealObserver;

function setupRevealObserver() {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: .12,
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  document.querySelectorAll(".memory-card").forEach(card => {
    revealObserver.observe(card);
  });
}

function isNearViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * .9;
}


/* =========================================================
   PAGE COMPLETION
   ========================================================= */

function setupCompletionObservers() {
  const letterPage = document.getElementById("page2");
  const memoryPage = document.getElementById("page3");

  let letterTriggered = false;
  let memoryTriggered = false;

  letterPage.addEventListener("scroll", () => {
    if (letterTriggered) return;

    const distanceFromBottom =
      letterPage.scrollHeight - letterPage.scrollTop - letterPage.clientHeight;

    if (distanceFromBottom < 120) {
      letterTriggered = true;
      letterNext.classList.add("visible");
    }
  });

  memoryPage.addEventListener("scroll", () => {
    if (memoryTriggered) return;

    const distanceFromBottom =
      memoryPage.scrollHeight - memoryPage.scrollTop - memoryPage.clientHeight;

    if (distanceFromBottom < 140) {
      memoryTriggered = true;
      memoryNext.classList.add("visible");
    }
  });
}


/* =========================================================
   AUDIO
   ========================================================= */

function setupAudio() {
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play()
        .then(() => setMusicUI(true))
        .catch(() => setMusicUI(false));
    } else {
      bgMusic.pause();
      setMusicUI(false);
    }
  });

  bgMusic.addEventListener("play", () => setMusicUI(true));
  bgMusic.addEventListener("pause", () => setMusicUI(false));
}

function playMusicAfterInteraction() {
  if (!bgMusic.src) return;

  bgMusic.play()
    .then(() => setMusicUI(true))
    .catch(() => {
      setMusicUI(false);
    });
}

function setMusicUI(isPlaying) {
  musicControl.classList.toggle("playing", isPlaying);
  musicLabel.textContent = isPlaying ? "Music on" : "Music off";
}


/* =========================================================
   BACKGROUND PARTICLES
   ========================================================= */

function createParticles() {
  const container = document.getElementById("particles");
  const symbols = ["·", "✦", "♡", "✧"];

  for (let i = 0; i < 32; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty("--size", `${7 + Math.random() * 13}px`);
    particle.style.setProperty("--duration", `${9 + Math.random() * 10}s`);
    particle.style.setProperty("--delay", `${-Math.random() * 15}s`);
    particle.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);

    container.appendChild(particle);
  }
}


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return String(value).replaceAll('"', "&quot;");
}
