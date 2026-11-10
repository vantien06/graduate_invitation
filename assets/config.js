// ===== NỘI DUNG THIỆP — chỉ cần sửa file này =====
window.INVITE = {
  name: "Thùy Linh",            // tên hiển thị (chữ viết tay)
  initials: "TL",               // chữ trên con dấu sáp
  defaultGuest: "bạn",          // hiện khi link không có ?to=Tên
  quote: "I hope you can be a part of my beautiful youth",

  day: "17",
  month: "Tháng 11",
  year: "2026",
  dateShort: "17.11.2026",
  time: "11:30 – 12:30",
  time2: "hoặc 17:00 – 19:00",   // dòng giờ thứ hai (để trống "" nếu không cần)

  venue: "Nhà hát Hòa Bình",
  address: "240 Đường 3/2, Phường Hòa Hưng, TP.HCM",
  mapQuery: "Nhà hát Hòa Bình, 240 Đường 3 Tháng 2, TP. Hồ Chí Minh",
  mapCoords: "10.7722951,106.6739215",   // toạ độ ghim trên bản đồ (Hoa Binh Theater)
  mapLink: "https://maps.app.goo.gl/AWktXtncftAWQhmM9",  // link mở khi bấm "Chỉ đường"

  phones: [                     // các số điện thoại (bấm để gọi) + tên trong ngoặc
    { number: "0916331124", name: "Thùy Linh" },
    { number: "0908467574", name: "Văn Tiến" }
  ],
  facebookName: "Thùy Linh",
  facebookUrl: "https://www.facebook.com/ltlinhh0906",
  zaloName: "0916 331 124",
  zaloUrl: "https://zalo.me/0916331124",

  // Ảnh: đặt file vào thư mục images/ rồi ghi đường dẫn ở đây
  photoSmall: "images/img1_small.jpg",
  photoPortrait: "images/portrait.png",

  // Album ảnh: ảnh lớn cạnh chữ "20 Graduate 26 Album" + danh sách ảnh trong lưới
  albumCover: "images/album/cover.jpg",
  album: [
    "images/album/1.jpg", "images/album/2.jpg", "images/album/3.jpg",
    "images/album/4.jpg", "images/album/5.jpg", "images/album/6.jpg"
  ],

  // Đếm ngược tới lúc bắt đầu lễ (giờ Việt Nam)
  eventStart: "2026-11-17T11:30:00+07:00",

  // Lá thư dưới phần đếm ngược — mỗi phần tử là một đoạn
  letter: [
    "Bốn năm đại học đã khép lại bằng những ngày tháng thật đáng nhớ: những buổi học dài, những mùa thi căng thẳng và cả những niềm vui nhỏ bé mỗi ngày.",
    "Để đi đến được hôm nay, mình đã có gia đình, thầy cô và các bạn luôn ở bên cạnh. Tấm bằng này không chỉ là kết quả của những cố gắng, mà còn là khởi đầu cho một chặng đường mới. Mình rất mong có bạn cùng chia vui trong ngày đặc biệt này!"
  ],

  music: "",                    // vd "audio/music.mp3" — để trống nếu không dùng nhạc
};
