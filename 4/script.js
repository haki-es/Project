
const pages = document.querySelectorAll(".page");
const openButton = document.getElementById("openButton");
const restartButton = document.getElementById("restartButton");
const music = document.getElementById("backgroundMusic");
const video = document.getElementById("memoryVideo");
const videoPlaceholder = document.getElementById("videoPlaceholder");

let currentPage = "page1";
let musicStarted = false;

function showPage(pageId) {
  const target = document.getElementById(pageId);
  if (!target) return;

  pages.forEach((page) => {
    page.classList.remove("active");
    page.setAttribute("aria-hidden", "true");
  });

  target.classList.add("active");
  target.setAttribute("aria-hidden", "false");
  currentPage = pageId;

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (pageId !== "page3" && video && !video.paused) {
    video.pause();
  }
}

async function startMusic() {
  if (!music || musicStarted) return;

  try {
    await music.play();
    musicStarted = true;
    updateMusicLabels();
  } catch (error) {
    console.log("Musik belum bisa diputar. Coba tekan tombol musik.");
    updateMusicLabels();
  }
}

function updateMusicLabels() {
  const playing = music && !music.paused;

  document.querySelectorAll("#musicIcon").forEach((el) => {
    el.textContent = playing ? "♫" : "♪";
  });

  document.querySelectorAll("#musicLabel").forEach((el) => {
    el.textContent = playing ? "Musik menyala" : "Putar musik";
  });

  document.querySelectorAll("#musicToggle, #musicToggle2").forEach((button) => {
    button.setAttribute("aria-pressed", String(Boolean(playing)));
  });
}

async function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    try {
      await music.play();
      musicStarted = true;
    } catch (error) {
      console.log("Musik gagal diputar:", error);
    }
  } else {
    music.pause();
  }

  updateMusicLabels();
}

if (openButton) {
  openButton.addEventListener("click", async () => {
    openButton.disabled = true;
    openButton.style.opacity = "0.7";

    await startMusic();

    showPage("page2");

    openButton.disabled = false;
    openButton.style.opacity = "1";
  });
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.next);
  });
});

document.querySelectorAll("#musicToggle, #musicToggle2").forEach((button) => {
  button.addEventListener("click", toggleMusic);
});

if (restartButton) {
  restartButton.addEventListener("click", () => {
    if (video) video.pause();
    showPage("page1");
  });
}

// Sembunyikan placeholder video jika file video berhasil dimuat.
if (video && videoPlaceholder) {
  video.addEventListener("loadeddata", () => {
    videoPlaceholder.style.display = "none";
  });

  video.addEventListener("error", () => {
    videoPlaceholder.style.display = "flex";
  });
}

// Hiasan hati yang muncul saat layar diklik.
document.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button, video")) return;

  const heart = document.createElement("span");
  heart.className = "heart-particle";
  heart.textContent = Math.random() > 0.3 ? "♡" : "✦";
  heart.style.left = event.clientX + "px";
  heart.style.top = event.clientY + "px";
  heart.style.setProperty("--drift", `${Math.random() * 80 - 40}px`);

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1800);
});

// Animasi bintang kecil di halaman pembuka.
const landing = document.getElementById("page1");

if (landing) {
  const stars = landing.querySelectorAll(".floating-stars i");

  stars.forEach((star, index) => {
    star.style.animationDelay = `${index * 0.35}s`;
  });
}

showPage("page1");
updateMusicLabels();
