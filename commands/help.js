const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "help",
  slashData: new SlashCommandBuilder()
    .setName("help")
    .setDescription("📖 Hiển thị hướng dẫn sử dụng bot"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("📚 Danh sách Lệnh Random Role Bot")
      .setDescription(`
🎯 **Prefix:** \`r!\`

🧩 **Cơ bản**
📖 \`r!help\` — Hiển thị hướng dẫn
🎲 \`r!random @User\` — Random role cho user

📦 **Quản lý Role Random**
➕ \`r!addrole @Role\` — Thêm role random
➖ \`r!removerole @Role\` — Xóa role
📜 \`r!listrole\` — Danh sách role random

🛠️ **Quản trị**
🔧 \`r!adminmode on/off\` — Bật/tắt chế độ admin-only
👥 \`r!rolestaff add/remove/list\` — Quản lý role staff
`)
      .setColor("Blue");
    await interaction.reply({ embeds: [embed] });
  },

  async prefixExecute(msg) {
    const embed = new (require("discord.js").EmbedBuilder)()
      .setTitle("📚 Danh sách Lệnh Random Role Bot")
      .setDescription(`
🎯 **Prefix:** \`r!\`

🧩 **Cơ bản**
📖 \`r!help\` — Hiển thị hướng dẫn
🎲 \`r!random @User\` — Random role cho user

📦 **Quản lý Role Random**
➕ \`r!addrole @Role\` — Thêm role random
➖ \`r!removerole @Role\` — Xóa role
📜 \`r!listrole\` — Danh sách role random

🛠️ **Quản trị**
🔧 \`r!adminmode on/off\` — Bật/tắt chế độ admin-only
👥 \`r!rolestaff add/remove/list\` — Quản lý role staff
`)
      .setColor("Green");
    msg.reply({ embeds: [embed] });
  }
};
