module.exports = {
  logStatus(client) {
    console.log(`✅ Đã đăng nhập dưới tên: ${client.user.tag}`);
    console.log(`📊 Prefix mặc định: r!`);
    console.log(`📡 Slash commands đã sẵn sàng.`);
  }
};
