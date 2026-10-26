# Nova Suite web — kế hoạch cập nhật theo design mới

Nguồn design: canvas "Nova Suite — Brand Brief" (board 03 Logo C, 04 Họ icon, 05 Màu, 06 Type, 07 App Center, 07b Detail, 07c Light, 07d About, 08 Logo novapizza).

## Hiện trạng repo (16/10/2026)

- TanStack Start + React 19 + Tailwind 4 + shadcn/ui, deploy Cloudflare Workers (`novasuite.coding4pizza.com`).
- Layout: sidebar trái (shadcn `Sidebar`) + header mỏng. `/` là trang NovaPad, `/$slug` là trang từng app (`/novapad` trả 404).
- Màu "Vapor Chrome" (gradient lilac → cyan, oklch), font DM Sans + Space Grotesk.
- Icon app dùng lucide (`FileText`, `Camera`, …) trên nền trắng, không phải icon thật của app.
- Logo là `Sparkles` lucide trên ô gradient; favicon là sao 4 cánh trên nền vapor.
- Dữ liệu app ở `src/lib/products.ts` (9 app). Version và link tải lấy từ manifest R2 lúc chạy (`fetchLatestReleaseManifest`), có nhận diện OS/arch. Phần này giữ nguyên.
- Baseline: `tsc` sạch, `vite build` chạy được, `eslint` có sẵn 13 lỗi (7 lỗi prettier có thể `--fix`, 6 warning).
- `package-lock.json` lệch với `package.json` (`npm ci` lỗi), `bun.lock` mới đúng. Cài bằng `npx bun install --frozen-lockfile`.

## Khác biệt chính so với design

| Hạng mục | Hiện tại | Design |
|---|---|---|
| Layout | Sidebar + trang app | Header ngang (logo C, Apps, About, GitHub, coding4pizza ↗, đổi theme), không sidebar |
| `/` | Trang NovaPad | Home: hero chòm sao + lưới card app theo nhóm + lọc nền tảng |
| `/$slug` | Hero + mockup + features + stack | Trang chi tiết kiểu Adobe: khung trái (icon, tên, tab nền tảng, version, nút tải), mô tả + View more, Main uses, More from Nova Suite |
| `/about` | Không có | Dải chữ ngẫu nhiên chạy ngang, tên contributor ẩn trong đó, dừng khi hover; danh sách Members/Contributors |
| Màu | Vapor Chrome | Night 950 #0B0A10, Night 900 #16131F, Ink #1C1830, Mist #F6F5FA, Flare #F5B84A, violet suite; hue riêng từng app |
| Font | DM Sans | Inter (UI), Space Grotesk (display), JetBrains Mono |
| Logo | Sparkles | Logo C "Chân trời" + chữ NOVA SUITE (Space Grotesk 700, tracking .2em) |
| Icon app | lucide | Họ icon N + sao + glyph theo hue (board 04); dùng icon thật cho app đã có |
| Nhãn nền tảng | "macOS" | "Mac", kèm icon Apple/Windows/Tux/globe |
| Footer | MIT · v2.0 | © Nova Suite · coding4pizza.com · Made by NOVAPIZZA (logo vector) |

## Các bước (mỗi bước một PR nhỏ, chạy được độc lập)

### 1. Nền: token, font, logo
- `src/styles.css`: thay khối màu Vapor bằng token Nova cho `:root` (light) và `.dark`, giữ tên biến shadcn (`--background`, `--card`, …) để component ui cũ không vỡ. Thêm token hue app (`--hue-novapad-300/500/700`, …).
- Đổi `--font-sans` sang Inter, bỏ DM Sans khỏi import Google Fonts.
- Thêm `src/components/brand/NovaLogo.tsx` (logo C, hai biến thể dark/light, có `title` khi đứng một mình) và `NovapizzaMark.tsx` (sao 8 cánh, từ `brand/novapizza/svg`).
- Thay `public/favicon.svg` bằng logo C; thêm `apple-touch-icon` 180px và `og-image` 1200×630.
- Xoá `.text-vapor`, `.bg-vapor`, `--bg-aurora` sau khi không còn chỗ dùng.

### 2. Dữ liệu app
- `products.ts`: thêm `group: "dev" | "everyday"`, `hue: { c300, c500, c700 }`, `short` (mô tả 1 câu trên card), `long` (đoạn mô tả trang chi tiết), `uses` (Main uses, có thể dựng từ `features` hiện có).
- Bỏ field `accent` (thay bằng `hue`), bỏ `icon: LucideIcon` ở cấp app (giữ lucide cho icon feature). Việc này cũng gỡ được ghi chú Seroval trong `$slug.tsx`.
- Đổi `platformLabels.mac` thành "Mac".
- Cirrus giữ `href: null` → hiển thị Coming soon.

### 3. Icon app
- `src/components/brand/AppIcon.tsx`: port component AppIcon từ canvas (SVG, nhận `slug` + `size`), glyph theo app, gradient theo hue.
- Ảnh icon thật (novapad, novaproxy, novagitx, lumia, NovaFinder, novakey, cirrus) để trong `public/icons/`; component ưu tiên ảnh thật, fallback SVG.

### 4. Layout gốc
- `__root.tsx`: bỏ `SidebarProvider`/`AppSidebar`, thêm `SiteHeader` (sticky; trong suốt trên hero của Home, đặc sau khi cuộn qua hero) và `SiteFooter`.
- Nav: Apps (về `/` và cuộn tới `#apps`), About, GitHub, coding4pizza ↗ (tab mới, có nhãn ẩn "opens in a new tab"), nút đổi theme.
- Giữ `themeInitScript` và `ThemeToggle`; thêm transition 700ms cho nền khi đổi theme.
- Menu gọn cho màn hình < 640px (sheet hoặc dropdown).

### 5. Home (`/`)
- `routes/index.tsx` render `HomePage` thay vì NovaPad.
- `components/home/Hero.tsx`:
  - Hai lớp nền crossfade theo theme: tối là trời sao (3 lớp sao, dải ngân hà, sao băng), sáng là giấy #FAF8F3 + lưới chấm.
  - Chòm sao 9 node: đường nối vẽ dần về ngôi sao Nova khi load, ngôi sao loé nhẹ ở 2.9s.
  - Hover node: chỉ phóng to node đó (1.22) + viền sáng theo hue, luồng sáng lan theo BFS.
  - Click node mở trang chi tiết.
  - Parallax bằng CSS var `--nv-sy`, cập nhật trong `requestAnimationFrame`, **không setState mỗi frame**. Chỉ setState khi header đổi trạng thái.
  - Tôn trọng `prefers-reduced-motion`.
- Sao sinh bằng seed cố định để SSR và client khớp nhau (tránh hydration mismatch).
- `components/home/AppGrid.tsx`: hai nhóm Developer tools / Everyday utilities, lọc All/Mac/Windows/Linux/Web, card có icon nền tảng và nút Get / Coming soon.
- Nút Apps: tự cuộn bằng easing (đã chỉnh ở canvas v40), nhường khi người dùng lăn chuột/chạm.

### 6. Trang chi tiết (`/$slug`)
- Bỏ chặn `/novapad` trong loader (hiện đang `notFound`).
- Thiết kế lại `ProductPage.tsx` theo board 07b. Giữ nguyên logic tải: manifest, nhận diện OS/arch, "Also available". Chuyển các nút tải vào tab nền tảng.
- Cân nhắc giữ `ProductMockup` làm hình minh hoạ cho Main uses (không có trong design, quyết khi review).
- "More from Nova Suite": 3 app, ưu tiên cùng nhóm.
- `product-head.ts`: giữ meta theo app.

### 7. About (`/about`)
- `scripts/contributors.mjs` (chạy tay hoặc CI): gọi `gh api` lấy members của org và contributors từng repo, ghi ra `src/data/contributors.json`. Không gọi GitHub API lúc người dùng xem trang (giới hạn 60 req/giờ khi chưa đăng nhập).
- Dải chữ: chữ cái sinh theo seed, tên chèn vào hàng.
  - Mỗi hàng nhân đôi nội dung, chạy `translateX(0 → -50%)` vô hạn, hàng chẵn/lẻ ngược chiều.
  - `:has(.name:hover)` thì `animation-play-state: paused`.
  - Mép trái/phải dùng mask mờ dần.
- Tên member in đậm màu accent; hover thì highlight và hiện avatar + số commit.
- Danh sách thẻ Members / Contributors có avatar (`avatars.githubusercontent.com`), fallback chữ cái đầu.
- Phần dải chữ `aria-hidden`; danh sách thẻ là nội dung truy cập được.

### 8. Dọn dẹp
- Xoá `AppSidebar.tsx` và `use-mobile.tsx` nếu không còn dùng. Có thể giữ `ui/sidebar.tsx` hoặc xoá nếu muốn gọn bundle.
- Cập nhật meta title/description ở `__root.tsx`, chữ "Tools that ship".
- `npx eslint . --fix` cho lỗi prettier có sẵn.
- Đồng bộ lại `package-lock.json` hoặc xoá nó, để chỉ còn một lock file (bun).

## Kiểm thử mỗi bước
- `npx bun install --frozen-lockfile`, rồi `npm run dev` và mở `http://localhost:5173`.
- `npx tsc --noEmit`, `npx eslint .`, `npm run build`.
- Chụp màn hình headless Chrome ở 1440 và 390px, cả hai theme, cho `/`, `/novapad`, `/cirrus`, `/about`, trang 404.
- Kiểm tra tay:
  - Hover/click chòm sao; lọc nền tảng.
  - Nút tải đúng OS/arch, link manifest R2 trả về version.
  - Đổi theme không nháy (FOUC).
  - Cuộn tới Apps mượt.
  - About: dải chữ chạy, dừng khi hover tên.
  - Bàn phím: Tab qua nav, node, card; focus nhìn thấy được.
- So với canvas từng board trước khi merge.

## Đã chốt (16/10/2026)
1. `/` thành Home, không giữ redirect về trang NovaPad cũ. `/novapad` là trang chi tiết như các app khác.
2. Bỏ `ProductMockup`. Trang chi tiết giữ khung ảnh theo design ("Screenshot coming soon"), sẽ thay bằng ảnh thật sau.
3. About dùng dữ liệu tĩnh `src/data/contributors.json`, tạo bằng `node scripts/contributors.mjs` (chỉ repo public).
4. Làm gộp trên branch `redesign/nova-design`, review xong mới merge để release.

Khác với kế hoạch ban đầu: icon app dùng họ icon N + glyph theo design (board 04/07), không dùng ảnh icon thật trong `public/icons/`.
