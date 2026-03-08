# 💐 trunguye2n — Thiệp 8/3

<div align="center">

![trunguye2n](https://img.shields.io/badge/trunguye2n-Thiệp_8/3-FF6B81?style=for-the-badge&logo=heart&logoColor=white)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Anime.js](https://img.shields.io/badge/Anime.js-4-FF6B6B?style=for-the-badge)](https://animejs.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge)](./LICENSE)

**Tạo thiệp chúc mừng Ngày Phụ nữ 8/3 với hiệu ứng đẹp mắt** 🌹

Hoa rơi · Phong bì bay · Nhạc nền · Mã QR trái tim · Typewriter text
Developed by **[trunguye2n](https://github.com/trunguye2n)**.

[Tính năng](#-tính-năng) • [Cài đặt](#-cài-đặt) • [Cấu trúc](#-cấu-trúc-project) • [Đóng góp](#-đóng-góp) • [English](./README_EN.md)

</div>

---

## ✨ Tính Năng

### 🌸 2 Theme Thiệp
* **Catch Me**: Nút "Không" chạy trốn → hoa hồng nở → tin nhắn + confetti
* **Thư Tình**: Hoa hồng vẽ SVG → phong bì trái tim → thư tay typewriter

### 🎨 Hiệu Ứng
* Cánh hoa rơi (PetalRain) bằng Anime.js
* Phong bì bay lên xuống với trái tim CSS `::before/::after`
* SVG heart text path vẽ dần + quay
* Hoa hồng SVG stroke-draw animation
* Confetti celebration

### 📱 Tính Năng Khác
* **Nhạc nền**: Auto-play + nút bật/tắt luôn hiển thị
* **Upload ảnh**: Ảnh người nhận hiển thị trong thư (max 5MB)
* **QR trái tim**: Canvas heart-shaped với mã QR bên trong, tải về gửi
* **Tên người gửi**: URL dạng `/card/ten-nguoi-gui-randomId`
* **Link hết hạn**: Tự động xoá sau 10 ngày
* **Watermark**: "Điều bất ngờ bởi trunguye2n" → github.com/trunguye2n
* **Mobile responsive**: Hiển thị đẹp trên mọi thiết bị

---

## 🚀 Cài Đặt

1. **Clone** repository:
   ```bash
   git clone https://github.com/trunguye2n/women-day-bloom-card.git
   cd women-day-bloom-card
   ```

2. **Cài dependencies**:
   ```bash
   npm install
   ```

3. **Chạy dev server**:
   ```bash
   npm run dev
   ```

4. **Mở trình duyệt**: [http://localhost:3000](http://localhost:3000)

### Build Production

```bash
npm run build
npm start
```

### Thêm nhạc nền

Copy file `.mp3` vào `public/music.mp3`.

### Deploy lên Vercel

1. **Đẩy code lên GitHub** (nếu chưa có):
   ```bash
   git remote add origin https://github.com/trunguye2n/women-day-bloom-card.git
   git push -u origin main
   ```

2. **Vào [vercel.com](https://vercel.com)** → Sign in (GitHub) → **Add New** → **Project** → Import repo `women-day-bloom-card`.

3. **Tạo Redis để lưu thiệp** (bắt buộc):
   - Trong project Vercel: **Storage** → **Create Database** → chọn **Upstash Redis** (hoặc KV).
   - Tạo xong → **Connect to Project** → chọn project. Vercel sẽ tự thêm `UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN` (hoặc `KV_REST_API_*` nếu dùng KV).

4. **Tuỳ chọn**: Trong **Settings** → **Environment Variables** thêm `ADMIN_PASSCODE` nếu muốn đổi mật khẩu trang `/manager-cards` (mặc định: `08032026`).

5. **Deploy**: Bấm **Deploy**. Xong.

---

## 📁 Cấu Trúc Project

```
women-day-bloom-card/
├── src/                        # Source code (Next.js src/)
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout + fonts
│   │   ├── page.tsx            # Trang tạo thiệp
│   │   ├── globals.css         # Design tokens + CSS
│   │   └── card/[id]/page.tsx  # Trang xem thiệp
│   │
│   ├── components/             # React Components
│   │   ├── BrandWatermark.tsx   # Badge thương hiệu
│   │   ├── card/
│   │   │   ├── CardView.tsx     # State machine 2 themes
│   │   │   ├── CreatorForm.tsx  # Form tạo thiệp + QR
│   │   │   ├── MemeOpening.tsx  # Mở đầu meme (chung)
│   │   │   ├── EnvelopeLetter.tsx # Theme A: phong bì mở
│   │   │   ├── DodgeButton.tsx  # Theme A: nút chạy trốn
│   │   │   ├── MessageReveal.tsx # Theme A: tin nhắn reveal
│   │   │   ├── RoseDrawing.tsx  # Theme B: SVG hoa hồng
│   │   │   ├── EnvelopeScene.tsx # Theme B: phong bì + hearts
│   │   │   ├── LetterModal.tsx  # Theme B: thư tay modal
│   │   │   ├── HeartQR.tsx      # Canvas QR trái tim
│   │   │   └── MusicToggle.tsx  # Nút nhạc
│   │   └── effects/
│   │       ├── PetalRain.tsx    # Hiệu ứng hoa rơi
│   │       └── RoseGift.tsx     # Hiệu ứng hoa nở
│   │
│   └── lib/                    # Business Logic
│       ├── store.ts            # In-memory store + expiry
│       └── actions.ts          # Server actions
│
├── public/                     # Static assets
│   ├── ref/                    # Ảnh giftbox, mewmew, hearts
│   ├── cute.jpeg               # Ảnh meme opening
│   └── music.mp3               # Nhạc nền (tự thêm)
```

---

## 🧱 Nguyên Tắc Thiết Kế

| Nguyên tắc | Mô tả |
|------------|-------|
| **SRP** | Mỗi component chịu 1 trách nhiệm duy nhất |
| **OCP** | Dễ thêm theme mới qua CardView state machine |
| **DRY** | Components dùng chung: PetalRain, BrandWatermark |
| **Type Safety** | TypeScript strict, interface cho tất cả props |

---

## 🛠️ Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animations | Anime.js 4 |
| Icons | react-icons (Phosphor) |
| QR | qrcode |
| Fonts | Dancing Script, Inter, Playfair Display |

---

## 🤝 Đóng Góp

1. Fork repository
2. Tạo branch: `git checkout -b feature/ten-tinh-nang`
3. Commit: `git commit -m "feat: mô tả"`
4. Push: `git push origin feature/ten-tinh-nang`
5. Mở Pull Request

---

## 📄 License

Distributed under the GNU General Public License v3.0. See `LICENSE` for more information.

Copyright © 2026 **[trunguye2n](https://github.com/trunguye2n)**.
