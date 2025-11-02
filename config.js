module.exports = {
  defaultPrefix: "r!",
  databaseFolder: "./database",
  statusText: "🎲 Random Role Bot",
  statusType: "PLAYING",
  adminControl: {
    enabled: true, // nếu true: chỉ admin Discord (botOwners) được dùng lệnh quản trị
    botOwners: [
      "111111111111111111", // bạn
      "222222222222222222", // người thứ 2
      "333333333333333333"  // người thứ 3
    ],
    staffRoles: [
      "123456789012345678", // role staff 1
      "987654321098765432"  // role staff 2 (nếu có)
    ]
  }
};
