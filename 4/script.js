const pages = [...document.querySelectorAll('.page')];
const music = document.getElementById('backgroundMusic');
const openButton = document.getElementById('openLetter');
const musicToggle = document.getElementById('musicToggle');
const musicToggle2 = document.getElementById('musicToggle2');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');
const memoryVideo = document.getElementById('memoryVideo');
const videoPlaceholder = document.getElementById('videoPlaceholder');

function showPage(id) {
  pages.forEach(page => page.classList.toggle('active', page.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function startMusic() {
  try {
    await music.play();
    updateMusicUI(true);
  } catch (error) {
    updateMusicUI(false);
    // Sebagian browser menolak autoplay. Tombol musik tetap bisa dipakai.
  }
}

function updateMusicUI(isPlaying) {
  if (musicIcon) musicIcon.textContent = isPlaying ? '♫' : '♪';
  if (musicText) musicText.textContent = isPlaying ? 'Musik menyala' : 'Putar musik';
  [musicToggle, musicToggle2].filter(Boolean).forEach(button => {
    const label = button.querySelector('span:last-child');
    if (label) label.textContent = isPlaying ? 'Musik menyala' : 'Putar musik';
  });
}

async function toggleMusic() {
  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
    updateMusicUI(false);
  }
}

// Musik mulai setelah klik pertama, karena browser biasanya memblokir autoplay
// sebelum ada interaksi dari pengguna.
openButton.addEventListener('click', async () => {
  await startMusic();
  showPage('page2');
});

[musicToggle, musicToggle2].filter(Boolean).forEach(button => {
  button.addEventListener('click', toggleMusic);
});

document.querySelectorAll('[data-next]').forEach(button => {
  button.addEventListener('click', () => showPage(button.dataset.next));
});

document.getElementById('restart').addEventListener('click', () => {
  showPage('page1');
});

memoryVideo.addEventListener('loadeddata', () => {
  videoPlaceholder.style.display = 'none';
});
memoryVideo.addEventListener('error', () => {
  videoPlaceholder.style.display = 'flex';
});

// Musik berhenti sementara saat video diputar agar audio tidak bertumpuk.
memoryVideo.addEventListener('play', () => {
  music.pause();
  updateMusicUI(false);
});
memoryVideo.addEventListener('pause', () => {
  if (pages.find(page => page.classList.contains('active'))?.id === 'page3') startMusic();
});
memoryVideo.addEventListener('ended', () => startMusic());
