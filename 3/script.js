/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {
    partnerName: "someone special",

    music: "audio/lagu.mp3",

    memories: [
        {
            image: "images/foto1.jpg",
            number: "01",
            title: "Ada siapa di MPP?",
            caption: "semuanya memang berawal jauh dimulai, dari sini, sebenernya kita juga ga saling kenal, dan kita masih saling fokus kepentingan kita masing masing, aku masih redflag, kamu masih dengan kehidupan kamu, semuanya ga saling kenal tapi disini kita mulai semuanya."
        },

        {
            image: "images/foto2.jpg",
            number: "02",
            title: "bagi takjil penuh makna",
            caption: "jauh sebelum ini kita memulai semuanya dari menwa, disini kita mulai daket banget, jujur suka banget ngusilin sambil pat pat kepala kamu, boncengan sambil peluk, berdua dan masih banyak lagi."
        },

        {
            image: "images/foto3.jpg",
            number: "03",
            title: "Little things",
            caption: "Hal-hal kecil yang mungkin sederhana, tapi selalu berhasil bikin senyum."
        },

        {
            image: "images/foto4.jpg",
            number: "04",
            title: "Another memory",
            caption: "Satu frame, satu cerita, satu bagian kecil dari perjalanan kita."
        },

        {
            image: "images/foto5.jpg",
            number: "05",
            title: "Good days",
            caption: "Beberapa hari memang terasa lebih ringan saat dijalani bersama."
        },

        {
            image: "images/foto6.jpg",
            number: "06",
            title: "Somewhere between",
            caption: "Di antara banyak hal yang terjadi, momen ini tetap berhasil tersimpan."
        },

        {
            image: "images/foto7.jpg",
            number: "07",
            title: "A quiet moment",
            caption: "Tidak semua kenangan harus ramai untuk menjadi berarti."
        },

        {
            image: "images/foto8.jpg",
            number: "08",
            title: "Still smiling",
            caption: "Foto ini mungkin cuma satu frame, tapi rasanya lebih panjang dari itu."
        },

        {
            image: "images/foto9.jpg",
            number: "09",
            title: "Almost there",
            caption: "Semakin banyak cerita, semakin banyak hal yang bisa dikenang."
        },

        {
            image: "images/foto10.jpg",
            number: "10",
            title: "For later",
            caption: "Satu frame lagi untuk disimpan sebelum kita lanjut ke cerita berikutnya."
        },

        {
            image: "images/foto11.jpg",
            number: "11",
            title: "Another chapter",
            caption: "Satu kenangan lagi yang layak disimpan."
        },

        {
            image: "images/foto12.jpg",
            number: "12",
            title: "A little moment",
            caption: "Momen sederhana yang tetap punya cerita."
        },

        {
            image: "images/foto13.jpg",
            number: "13",
            title: "Good memory",
            caption: "Satu frame kecil dari perjalanan yang panjang."
        },

        {
            image: "images/foto14.jpg",
            number: "14",
            title: "That smile",
            caption: "Ada beberapa momen yang selalu enak untuk diingat."
        },

        {
            image: "images/foto15.jpg",
            number: "15",
            title: "Another day",
            caption: "Hari lain, cerita lain, kenangan yang sama berharganya."
        },

        {
            image: "images/foto16.jpg",
            number: "16",
            title: "Still here",
            caption: "Semakin banyak cerita yang akhirnya tersimpan."
        },

        {
            image: "images/foto17.jpg",
            number: "17",
            title: "One more",
            caption: "Satu foto lagi untuk melengkapi perjalanan ini."
        },

        {
            image: "images/foto18.jpg",
            number: "18",
            title: "Little happiness",
            caption: "Hal kecil yang ternyata berhasil jadi kenangan besar."
        },

        {
            image: "images/foto19.jpg",
            number: "19",
            title: "Almost twenty",
            caption: "Tinggal satu frame lagi sebelum koleksi ini lengkap."
        },

        {
            image: "images/foto20.jpg",
            number: "20",
            title: "For the memories",
            caption: "Dua puluh frame, dan masih banyak cerita setelahnya."
        }
    ]
};


/* =========================================================
   DOM ELEMENTS
========================================================= */

const chapterIndicator =
    document.getElementById("chapterIndicator");

const progressBar =
    document.getElementById("progressBar");

const partnerElements =
    document.querySelectorAll("[data-partner-name]");

const galleryGrid =
    document.getElementById("galleryGrid");

const musicButton =
    document.getElementById("musicButton");

const musicLabel =
    document.getElementById("musicLabel");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const enterButton =
    document.getElementById("enterButton");

const restartButton =
    document.getElementById("restartButton");

const memoryVideo =
    document.getElementById("memoryVideo");

const videoStatus =
    document.getElementById("videoStatus");


/* =========================================================
   STATE
========================================================= */

let currentPage = "page1";

let musicWanted = false;

const MUSIC_VOLUME = 0.45;


/* =========================================================
   INITIALIZATION
========================================================= */

function init() {

    setupConfiguration();

    renderGallery();

    setupNavigation();

    setupMusic();

    setupVideo();

    createParticles();

    setupRevealAnimation();

    setupPageScroll();

    updateInterface("page1");

}


/* =========================================================
   CONFIGURATION
========================================================= */

function setupConfiguration() {

    partnerElements.forEach(element => {
        element.textContent = CONFIG.partnerName;
    });

    backgroundMusic.src = CONFIG.music;

    backgroundMusic.volume = MUSIC_VOLUME;

}


/* =========================================================
   GALLERY
========================================================= */

function renderGallery() {

    if (!galleryGrid) {
        return;
    }

    galleryGrid.innerHTML = "";

    CONFIG.memories.forEach((memory, index) => {

        const card = document.createElement("article");

        card.className =
            `gallery-item gallery-item-${index + 1} reveal`;

        card.innerHTML = `

            <div class="gallery-image">

                <img
                    src="${memory.image}"
                    alt="${escapeHTML(memory.title)}"
                    loading="lazy"
                >

                <div class="image-overlay"></div>

                <div class="image-number">
                    ${memory.number}
                </div>

            </div>

            <div class="gallery-info">

                <div class="gallery-title">
                    ${escapeHTML(memory.title)}
                </div>

                <div class="gallery-caption">
                    ${escapeHTML(memory.caption)}
                </div>

            </div>

        `;

        galleryGrid.appendChild(card);

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    if (enterButton) {

        enterButton.addEventListener("click", () => {

            goToPage("page2");

            attemptMusicStart();

        });

    }


    document
        .querySelectorAll("[data-next]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const target =
                    button.dataset.next;

                goToPage(target);

            });

        });


    if (restartButton) {

        restartButton.addEventListener("click", () => {

            goToPage("page1");

        });

    }

}


/* =========================================================
   PAGE TRANSITION
========================================================= */

function goToPage(targetId) {

    if (targetId === currentPage) {
        return;
    }


    const oldPage =
        document.getElementById(currentPage);

    const newPage =
        document.getElementById(targetId);


    if (!oldPage || !newPage) {
        return;
    }


    oldPage.classList.remove("active");

    oldPage.classList.add("leaving");


    setTimeout(() => {

        oldPage.classList.remove("leaving");

    }, 900);


    newPage.classList.add("active");


    currentPage = targetId;


    updateInterface(targetId);


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    if (
        targetId !== "page4" &&
        memoryVideo &&
        !memoryVideo.paused
    ) {

        memoryVideo.pause();

    }


    revealPage(newPage);

}


/* =========================================================
   INTERFACE
========================================================= */

function updateInterface(pageId) {

    const number =
        Number(pageId.replace("page", ""));


    if (chapterIndicator) {

        chapterIndicator.textContent =
            `${String(number).padStart(2, "0")} / 05`;

    }


    if (progressBar) {

        const percentage =
            ((number - 1) / 4) * 100;

        progressBar.style.width =
            `${percentage}%`;

    }

}


/* =========================================================
   MUSIC
========================================================= */

function setupMusic() {

    if (!musicButton) {
        return;
    }

    musicButton.addEventListener(
        "click",
        toggleMusic
    );

}


/* =========================================================
   MUSIC TOGGLE
========================================================= */

async function toggleMusic() {

    if (backgroundMusic.paused) {

        await playMusic();

    } else {

        pauseMusic();

    }

}


/* =========================================================
   PLAY MUSIC
========================================================= */

async function playMusic() {

    try {

        await backgroundMusic.play();

        musicWanted = true;

        setMusicUI(true);

    } catch (error) {

        console.log(
            "Browser menunggu interaksi pengguna sebelum memutar musik."
        );

    }

}


/* =========================================================
   PAUSE MUSIC
========================================================= */

function pauseMusic() {

    backgroundMusic.pause();

    musicWanted = false;

    setMusicUI(false);

}


/* =========================================================
   MUSIC UI
========================================================= */

function setMusicUI(isPlaying) {

    if (!musicLabel || !musicButton) {
        return;
    }


    if (isPlaying) {

        musicLabel.textContent =
            "MUSIC ON";

        musicButton.classList.add(
            "playing"
        );

    } else {

        musicLabel.textContent =
            "MUSIC OFF";

        musicButton.classList.remove(
            "playing"
        );

    }

}


/* =========================================================
   AUTO MUSIC
========================================================= */

function attemptMusicStart() {

    if (!musicWanted) {

        playMusic();

    }

}


/* =========================================================
   VIDEO
========================================================= */

function setupVideo() {

    if (!memoryVideo) {
        return;
    }


    memoryVideo.addEventListener(
        "play",
        handleVideoPlay
    );


    memoryVideo.addEventListener(
        "pause",
        handleVideoPause
    );


    memoryVideo.addEventListener(
        "ended",
        handleVideoEnded
    );


    memoryVideo.addEventListener(
        "error",
        handleVideoError
    );

}


/* =========================================================
   VIDEO PLAY
========================================================= */

function handleVideoPlay() {

    if (!backgroundMusic.paused) {

        musicWanted = true;

        backgroundMusic.pause();

        setMusicUI(false);

    }


    if (videoStatus) {

        videoStatus.textContent =
            "PLAYING";

        videoStatus.classList.add(
            "active"
        );

    }

}


/* =========================================================
   VIDEO PAUSE
========================================================= */

function handleVideoPause() {

    if (videoStatus) {

        videoStatus.textContent =
            "PAUSED";

        videoStatus.classList.remove(
            "active"
        );

    }


    resumeMusicAfterVideo();

}


/* =========================================================
   VIDEO ENDED
========================================================= */

function handleVideoEnded() {

    if (videoStatus) {

        videoStatus.textContent =
            "FINISHED";

        videoStatus.classList.remove(
            "active"
        );

    }


    resumeMusicAfterVideo();

}


/* =========================================================
   RESUME MUSIC
========================================================= */

function resumeMusicAfterVideo() {

    if (
        musicWanted &&
        currentPage === "page4"
    ) {

        playMusic();

    }

}


/* =========================================================
   VIDEO ERROR
========================================================= */

function handleVideoError() {

    if (!videoStatus) {
        return;
    }

    videoStatus.textContent =
        "ADD VIDEO";

    videoStatus.classList.remove(
        "active"
    );

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function setupRevealAnimation() {

    const elements =
        document.querySelectorAll(".reveal");


    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   PAGE REVEAL
========================================================= */

function revealPage(page) {

    if (!page) {
        return;
    }


    const elements =
        page.querySelectorAll(".reveal");


    elements.forEach(
        (element, index) => {

            setTimeout(() => {

                element.classList.add(
                    "visible"
                );

            }, 100 + index * 70);

        }
    );

}


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    const container =
        document.getElementById("particles");


    if (!container) {
        return;
    }


    const amount =
        window.innerWidth < 700
            ? 25
            : 55;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.className =
            "particle";


        const size =
            Math.random() * 3 + 1;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.animationDelay =
            `${Math.random() * 8}s`;


        particle.style.animationDuration =
            `${5 + Math.random() * 8}s`;


        container.appendChild(
            particle
        );

    }

}


/* =========================================================
   PAGE SCROLL EFFECT
========================================================= */

function setupPageScroll() {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.addEventListener(
                "scroll",
                () => {

                    const scroll =
                        page.scrollTop;


                    const height =
                        page.scrollHeight -
                        page.clientHeight;


                    const percentage =
                        height > 0
                            ? scroll / height
                            : 0;


                    page.style.setProperty(
                        "--scroll",
                        percentage
                    );

                }
            );

        });

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   START APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);