const { SlashCommandBuilder } = require("discord.js");
const { removeRole } = require("../role");
const { canUseCommand } = require("../checkPermission");

module.exports = {
  name: "removerole",
  slashData: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("➖ Xóa role khỏi danh sách random")
    .addRoleOption(opt => opt.setName("role").setDescription("Role cần xóa").setRequired(true)),

  async execute(interaction) {
    if (!canUseCommand(interaction.member))
      return interaction.reply("🚫 | Bạn không có quyền dùng lệnh này.");
    const role = interaction.options.getRole("role");
    removeRole(interaction.guild.id, role.id);
    await interaction.reply(`🗑️ | Đã xóa role **${role.name}** khỏi danh sách random.`);
  },

  async prefixExecute(msg) {
    if (!canUseCommand(msg.member))
      return msg.reply("🚫 | Bạn không có quyền dùng lệnh này.");
    const role = msg.mentions.roles.first();
    if (!role) return msg.reply("⚠️ | Hãy mention role hợp lệ.");
    removeRole(msg.guild.id, role.id);
    msg.reply(`🗑️ | Đã xóa role **${role.name}** khỏi danh sách random.`);
  }
};
