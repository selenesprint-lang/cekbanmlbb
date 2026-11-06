# MLBB Fan — Cek Ban Website

Website fan-made berdasarkan alur API pada `cekbanviaid.py`.

## Isi
- `index.html`, `style.css`, `app.js`: tampilan website.
- `functions/api/cekban.js`: endpoint server-side untuk cek ban.
- `functions/api/balance.js`: endpoint server-side untuk cek saldo API.

## Deploy ke Cloudflare Pages
1. Buat project Cloudflare Pages dan upload/deploy folder project ini (atau hubungkan repository Git).
2. Framework preset: **None**. Build command: kosong / none. Build output directory: `/`.
3. Buka **Workers & Pages → project → Settings → Variables and Secrets**.
4. Tambahkan variable bertipe **Secret** dengan nama `JEBRAY_API_KEY` dan isi API key milikmu.
5. Redeploy project setelah Secret ditambahkan.
6. Buka domain Pages kamu dan uji cek ban dengan Player ID dan Zone ID.

## Penting
- Jangan menaruh API key di `app.js`, `index.html`, atau repository publik.
- API key yang ada di file Python yang kamu unggah sudah terekspos di percakapan/file. Demi keamanan, pertimbangkan meminta penyedia API mengganti/merotasi key tersebut, lalu simpan key baru sebagai Cloudflare Secret.
- Website ini hanya antarmuka fan-made. Status dan ketersediaan data bergantung pada API Jebray; bukan layanan resmi Moonton.
- Bila API penyedia berubah, sesuaikan URL atau format respons pada file `functions/api/`.
