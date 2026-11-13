# 🎓 Graduation Invitation — Thùy Linh

Thiệp mời tốt nghiệp dạng trang web tĩnh, xem tốt trên điện thoại, chạy trên GitHub Pages.

**Trang chính thức:** https://thuylinh.tech

## Nội dung trang

1. **Bìa:** dòng chữ "Graduation Invitation" viết tay, phong bì ren hồng với dấu sáp trái tim. Chạm vào để mở thư "Thương mời [tên người nhận] tham dự lễ tốt nghiệp của Thùy Linh", kèm ảnh polaroid.
2. **Thiệp chính:** tờ giấy mép xé có kẹp, ngày tháng trong khung nơ, thời gian, địa điểm.
3. **Location Guide:** bản đồ Google Maps và nút "Chỉ đường".
4. **Contact me:** số điện thoại, Facebook, Zalo.
5. **Countdown:** đếm ngược tới giờ làm lễ, kèm lá thư.
6. **Album:** khối "20 Graduate 26 Album" và lưới ảnh, chạm vào ảnh để xem phóng to.

## Cấu trúc thư mục

```
index.html          Khung trang
CNAME               Tên miền riêng (thuylinh.tech) cho GitHub Pages
assets/
  config.js         ⭐ Toàn bộ nội dung thiệp — thường chỉ cần sửa file này
  script.js         Hiệu ứng, đếm ngược, album, đọc tên người nhận từ link
  style.css         Giao diện
images/             Ảnh nền, ảnh trang trí, ảnh cá nhân
  album/            Ảnh cho phần album (cover.jpg, 1.jpg, 2.jpg, ...)
```

Các file chỉ nằm trên máy, không đưa lên GitHub (khai báo trong `.gitignore`):

- `taolink.html`: công cụ tạo link mời cho từng người.
- `videos/`: video mẫu tham khảo.
- `images/img1.jpg`: ảnh gốc độ phân giải cao.

## Sửa nội dung

Mở `assets/config.js` và sửa trực tiếp:

| Mục | Ý nghĩa |
|---|---|
| `name`, `initials` | Tên người tốt nghiệp, chữ trên dấu sáp |
| `day`, `month`, `year`, `dateShort` | Ngày làm lễ |
| `time`, `time2` | Khung giờ (để `time2: ""` nếu chỉ có một khung giờ) |
| `venue`, `address` | Địa điểm và địa chỉ |
| `mapCoords`, `mapLink` | Toạ độ ghim trên bản đồ và link mở khi bấm "Chỉ đường" |
| `phones`, `facebookUrl`, `zaloUrl` | Thông tin liên hệ |
| `eventStart` | Mốc đếm ngược (giờ Việt Nam, `+07:00`) |
| `letter` | Các đoạn của lá thư dưới phần đếm ngược |
| `photoSmall`, `albumCover`, `album` | Đường dẫn ảnh |
| `music` | File nhạc nền (để trống nếu không dùng) |

### Thêm ảnh album

Bỏ ảnh vào `images/album/` với tên `cover.jpg` (ảnh lớn cạnh chữ "20 26"), `1.jpg`, `2.jpg`, ... rồi liệt kê trong mục `album` của `config.js`. Lưới ảnh lặp lại theo nhóm 6, ảnh dọc luôn hiển thị **2:3**, ảnh ngang luôn **3:2**:

| Ảnh số | Vị trí | Khổ | Cắt sẵn ví dụ |
|---|---|---|---|
| 1, 7, 13… | Cột trái, ô cao | Dọc 2:3 | 800×1200 |
| 2, 3, 8, 9… | Cột phải, hai ô xếp chồng | Ngang 3:2 | 1200×800 |
| 4, 5, 10, 11… | Hai ô cạnh nhau | Dọc 2:3 | 800×1200 |
| 6, 12… | Rộng hết hàng | Ngang 3:2 | 1200×800 |

Ảnh bìa `cover.jpg` (cạnh chữ "20 26") là dọc 2:3.

Nên nén ảnh xuống chiều rộng khoảng 1000–1200px để trang tải nhanh trên điện thoại.

## Gửi link có tên người nhận

Mỗi người nhận có một link riêng. Tên được mã hoá (base64url) trong tham số `?i=`:

```
https://thuylinh.tech/?i=VGjDuXkgVHJpbmg   →  "THƯƠNG MỜI Thùy Trinh"
```

Cách tạo: mở `taolink.html` trên máy, dán danh sách tên (mỗi dòng một tên), bấm **Tạo link** rồi chép từng link.

- Link không có `?i=` (link chung) sẽ hiện "THƯƠNG MỜI cả nhà iu" và **ẩn số điện thoại, Zalo**. Chỉ link có tên người nhận mới hiện số điện thoại và Zalo.
- Mã hoá chỉ để tên không lộ ra khi nhìn link, không phải để bảo mật.

## Xem thử trên máy

```bash
python -m http.server 8000
```

Sau đó mở http://localhost:8000. Thêm `?open` vào cuối link để phong bì tự mở, tiện khi kiểm tra.

## Đưa lên mạng

GitHub Pages tự dựng lại trang từ nhánh `main` sau mỗi lần push, khoảng 1 phút:

```bash
git add -A
git commit -m "Cập nhật nội dung thiệp"
git push
```

## Tên miền

Repo dùng tên miền riêng `thuylinh.tech` (file `CNAME`), đã bật bắt buộc HTTPS. DNS cần trỏ:

| Loại | Tên | Giá trị |
|---|---|---|
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| CNAME | `www` | `vantien06.github.io` |

Link cũ `about.vantien.tech/graduate_invitation/...` tự chuyển sang `thuylinh.tech`.
