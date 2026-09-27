# Romantic Interactive Story

## Struktur folder

romantic-website/
├── index.html
├── style.css
├── script.js
├── images/
│   ├── foto1.jpg
│   ├── foto2.jpg
│   ├── foto3.jpg
│   ├── foto4.jpg
│   ├── foto5.jpg
│   ├── foto6.jpg
│   ├── foto7.jpg
│   ├── foto8.jpg
│   ├── foto9.jpg
│   └── foto10.jpg
└── audio/
    └── lagu.mp3

## Cara menjalankan

1. Extract folder.
2. Masukkan 10 foto ke folder `images`.
3. Pastikan nama file sesuai dengan `foto1.jpg` sampai `foto10.jpg`.
4. Masukkan lagu ke `audio/lagu.mp3`.
5. Buka `index.html` di browser.

Kalau foto atau lagu tidak muncul, cek nama file dan ekstensi:
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.mp3`

## Bagian yang paling sering diedit

Buka `script.js`, lalu cari:

### 1. Nama pasangan
```js
partnerName: "someone special",
```

### 2. Tombol
```js
buttons: {
  begin: "Begin our story",
  memories: "See our memories",
  ending: "Continue to the ending"
},
```

### 3. Foto dan caption
Semua data 10 foto ada di:
```js
memories: [
  {
    image: "images/foto1.jpg",
    caption: "Tulis caption...",
    date: "Tanggal / momen"
  },
  ...
]
```

### 4. Lagu
```js
audioFile: "audio/lagu.mp3"
```

### 5. Teks halaman 2
Edit langsung paragraf `<p>` di `index.html` pada bagian:
```html
<!-- ===== TEKS HALAMAN 2 ===== -->
```

### 6. Teks halaman 4
Edit paragraf pada:
```html
<!-- ===== TEKS PENUTUP ===== -->
```

Website sengaja tidak menggunakan framework sehingga cukup HTML + CSS + JavaScript vanilla.
