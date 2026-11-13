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
  time: "17:00 – 19:00",
  time2: "",  // dòng giờ thứ hai (để trống "" nếu không cần)

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
  eventStart: "2026-11-17T17:00:00+07:00",

  // Lá thư dưới phần đếm ngược — mỗi phần tử là một đoạn
  letter: [
    "Bốn năm đại học đã khép lại, để lại trong mình biết bao kỷ niệm đáng nhớ. Đó là những ngày miệt mài bên trang sách, những mùa thi đầy áp lực và cả những niềm vui giản dị nhưng đáng quý trong suốt hành trình thanh xuân.",
    "Để có được ngày hôm nay, mình thật may mắn khi luôn có gia đình, thầy cô và bạn bè bên cạnh, yêu thương, động viên và đồng hành. Tấm bằng tốt nghiệp không chỉ là thành quả của những nỗ lực đã qua, mà còn là dấu mốc mở ra một hành trình mới với nhiều ước mơ và hy vọng.",
    "Mình rất mong được cùng bạn chia sẻ niềm vui và lưu giữ những khoảnh khắc ý nghĩa trong ngày đặc biệt này!"
  ],

  music: "",                    // vd "audio/music.mp3" — để trống nếu không dùng nhạc
};
