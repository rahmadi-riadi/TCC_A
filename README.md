# TCC_TUGAS2

# Aplikasi Catatan (Notes App)

Aplikasi catatan sederhana dengan fitur CRUD (Create, Read, Update, Delete).

## Teknologi yang Digunakan

- **Back-end**: Node.js, Express.js, MySQL.
- **Front-end**: HTML, CSS, JavaScript.

## Cara Menjalankan

1. **Back-end**:

   - Buka folder `backend`.
   - Jalankan perintah:
     ```bash
     npm install
     node server.js
     ```
   - Server akan berjalan di `http://localhost:3000`.

2. **Front-end**:
   - Buka file `index.html` di browser.

## Endpoint API

- `GET /api/notes`: Ambil semua catatan.
- `POST /api/notes`: Tambah catatan baru.
- `PUT /api/notes/:id`: Update catatan.
- `DELETE /api/notes/:id`: Hapus catatan.
