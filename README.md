# 💍 Thiệp Cưới Online — Luxury Wedding Invitation

Trang web thiệp cưới online phong cách sang trọng, tinh tế (dựa trên thiết kế mẫu [ewedinvite.site/THIEPMAUCOBAN](https://www.ewedinvite.site/THIEPMAUCOBAN)), được phát triển bằng **Next.js 14**, **TypeScript**, **Tailwind CSS** và **Supabase**.

---

## ✨ Tính năng nổi bật

1. **Giao diện chuẩn Luxury & Mobile-first**:
   - Thiết kế khung chuẩn mobile (420px) căn giữa sang trọng trên desktop.
   - Bảng màu pastel ấm áp: Kem `#faf8f5`, Vàng gold `#c5a880`, Nâu gỗ `#7b6252`.
   - Typography cách điệu cao cấp:
     - `UTM-Azkia` & `Pinyon Script` cho tên Dâu Rể và tiêu đề lãng mạn.
     - `Alex Brush` & `Ephesis` cho lời mời và chữ ký.
     - `Cormorant Upright` (Serif cổ điển phong cách tạp chí đám cưới).
     - `Barlow` & `Montserrat` cho thông tin sự kiện sắc nét.

2. **Hiệu ứng & Animation mượt mà**:
   - Cánh hoa hồng rơi nhẹ nhàng (Canvas Petal Effect).
   - Trái tim phát sáng nhấp nháy trên ngày cưới trong lịch.
   - Đồng hồ đếm ngược thời gian thực (Ngày, Giờ, Phút, Giây).
   - Nút bật/tắt nhạc nền kèm hiệu ứng xoay đĩa nhạc / sóng âm thanh.

3. **Tương tác khách mời**:
   - **Cá nhân hóa thiệp**: Thêm `?to=Tên+Khách` trên URL (ví dụ: `/?to=Anh+Chị+Em`) để hiển thị thiệp mời gửi riêng đích danh.
   - **Xác nhận tham dự (RSVP)**: Popup điền tên, đi cùng ai, khách nhà trai/gái, lời chúc và gửi trực tiếp vào bảng `rsvp_responses` trên Supabase, kèm hiệu ứng pháo hoa giấy (confetti) chúc mừng.
   - **Gửi mừng cưới (Gift Modal)**: Hiển thị STK, mã QR thanh toán của cả Chú rể và Cô dâu, nút sao chép số tài khoản nhanh.
   - **Album hình cưới & Lightbox**: Xem ảnh cưới dạng lưới sang trọng, click xem ảnh full-screen, chuyển ảnh qua lại.
   - **Bản đồ chỉ đường**: Tích hợp Google Maps dẫn đường trực tiếp tới sảnh tiệc.

4. **SEO & Social Sharing**:
   - Tối ưu OpenGraph (OG Title, OG Image, OG Description) để khi gửi link qua Zalo, Messenger, Facebook, iMessage sẽ hiển thị ảnh bìa cưới và lời mời trang trọng.

---

## 🚀 Khởi chạy dự án

```bash
# Cài đặt thư viện (nếu chưa)
npm install

# Chạy môi trường phát triển (Development)
npm run dev

# Hoặc build và chạy Production
npm run build
npm run start
```
Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Cấu hình Supabase & Bucket BlockPass

Dự án đã kết nối với Supabase dự án `BlockPass`.

### 1. Bảng dữ liệu đã tạo sẵn trên Supabase:
- `wedding_cards`: Lưu thông tin các thiệp cưới (hỗ trợ nhiều cặp đôi thông qua `slug`).
- `rsvp_responses`: Lưu danh sách phản hồi và lời chúc của khách mời.

### 2. Tải ảnh lên Bucket `BlockPass`:
1. Mở Supabase Dashboard -> **Storage** -> chọn bucket **BlockPass**.
2. Upload ảnh cưới của bạn vào thư mục (ví dụ `wedding/hero.jpg`, `wedding/groom.jpg`, v.v.).
3. Trong bảng `wedding_cards`, bạn có thể điền đường dẫn ảnh tương đối (ví dụ `wedding/hero.jpg`) hoặc dán trực tiếp đường link ảnh đầy đủ:
   - Hệ thống tự động chuyển đổi đường dẫn thành URL công khai:
     `https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/BlockPass/wedding/hero.jpg`

---

## 💌 Chia sẻ link thiệp

- **Link mặc định**: `http://domain.com/` (tự load thiệp mẫu)
- **Link theo slug**: `http://domain.com/thiep-mau-co-ban`
- **Link kèm tên khách mời**: `http://domain.com/thiep-mau-co-ban?to=Anh+Hoàng`
