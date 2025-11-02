const { SlashCommandBuilder } = require("discord.js");
const { addRole } = require("../role");
const { canUseCommand } = require("../checkPermission");

module.exports = {
  name: "addrole",
  slashData: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("➕ Thêm role vào danh sách random")
    .addRoleOption(opt => opt.setName("role").setDescription("Role cần thêm").setRequired(true)),

  async execute(interaction) {
    if (!canUseCommand(interaction.member))
      return interaction.reply("🚫 | Bạn không có quyền dùng lệnh này.");
    const role = interaction.options.getRole("role");
    addRole(interaction.guild.id, role.id);
    await interaction.reply(`✅ | Đã thêm role **${role.name}** vào danh sách random!`);
  },

  async prefixExecute(msg) {
    if (!canUseCommand(msg.member))
      return msg.reply("🚫 | Bạn không có quyền dùng lệnh này.");
    const role = msg.mentions.roles.first();
    if (!role) return msg.reply("⚠️ | Hãy mention role hợp lệ.");
    addRole(msg.guild.id, role.id);
    msg.reply(`✅ | Đã thêm role **${role.name}** vào danh sách random!`);
  }
};
