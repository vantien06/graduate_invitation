// ===== NỘI DUNG THIỆP — chỉ cần sửa file này =====
window.INVITE = {
  name: "Tên Của Bạn",          // tên hiển thị (chữ viết tay)
  initials: "T",                // chữ trên con dấu sáp
  quote: "I hope you can be a part of my beautiful youth",

  day: "31",
  month: "Tháng 10",
  year: "2026",
  dateShort: "31.10.2026",
  time: "10:30 – 11:00",

  venue: "TÊN TRƯỜNG / ĐỊA ĐIỂM",
  address: "Địa chỉ chi tiết, Quận/Phường, Thành phố",
  mapQuery: "Hanoi, Vietnam",   // từ khoá Google Maps để hiện bản đồ & chỉ đường

  phone: "0900 000 000",
  facebookName: "Facebook của bạn",
  facebookUrl: "https://facebook.com/",
  zaloName: "Zalo của bạn",
  zaloPhone: "0900000000",      // dùng cho link zalo.me/<số>

  // Ảnh: đặt file vào thư mục images/ rồi ghi đường dẫn ở đây
  photoSmall: "images/polaroid.jpg",
  photoPortrait: "images/portrait.png",

  music: "",                    // vd "audio/music.mp3" — để trống nếu không dùng nhạc

  // Gửi phản hồi về Google Form (để trống thì chỉ hiện lời cảm ơn)
  rsvp: {
    formAction: "",             // vd "https://docs.google.com/forms/d/e/XXXX/formResponse"
    fields: { name: "", attend: "", message: "" } // vd "entry.123456"
  }
};
