const pages = document.querySelectorAll(".page");
const backgroundMusic = document.getElementById("backgroundMusic");
const memoryVideo = document.getElementById("memoryVideo");
const musicToggle = document.getElementById("musicToggle");
const openLetter = document.getElementById("openLetter");

let currentPage = 1;

function showPage(pageNumber) {
  const targetPage = document.getElementById(`page${pageNumber}`);

  if (!targetPage) return;

  pages.forEach((page) => {
    page.classList.remove("active");
  });

  targetPage.classList.add("active");
  currentPage = pageNumber;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (pageNumber !== 3) {
    memoryVideo.pause();
  }
}

openLetter.addEventListener("click", async () => {
  try {
    await backgroundMusic.play();
    musicToggle.textContent = "♫ Musik aktif";
  } catch (error) {
    musicToggle.textContent = "♫ Putar musik";
  }

  showPage(2);
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    const destination = Number(button.dataset.go);
    showPage(destination);
  });
});

musicToggle.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      musicToggle.textContent = "♫ Musik aktif";
    } catch (error) {
      musicToggle.textContent = "♫ Musik gagal diputar";
    }
  } else {
    backgroundMusic.pause();
    musicToggle.textContent = "♫ Musik dijeda";
  }
});

backgroundMusic.addEventListener("play", () => {
  musicToggle.textContent = "♫ Musik aktif";
});

backgroundMusic.addEventListener("pause", () => {
  musicToggle.textContent = "♫ Musik dijeda";
});

memoryVideo.addEventListener("error", () => {
  console.warn("Video belum bisa diputar. Periksa video/kenangan.mp4.");
});

backgroundMusic.addEventListener("error", () => {
  console.warn("Musik belum bisa diputar. Periksa audio/lagu.mp3.");
});