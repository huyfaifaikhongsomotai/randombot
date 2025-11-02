const { SlashCommandBuilder } = require("discord.js");
const { getRandomRole } = require("../role");
const { canUseCommand } = require("../checkPermission");

module.exports = {
  name: "random",
  slashData: new SlashCommandBuilder()
    .setName("random")
    .setDescription("🎲 Random role cho một thành viên")
    .addUserOption(opt => opt.setName("user").setDescription("Người cần random role").setRequired(true)),

  async execute(interaction) {
    if (!canUseCommand(interaction.member))
      return interaction.reply("🚫 | Bạn không có quyền dùng lệnh này.");
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id);
    const roleId = getRandomRole(interaction.guild.id);
    if (!roleId) return interaction.reply("⚠️ | Chưa có role nào được thêm để random!");
    const role = interaction.guild.roles.cache.get(roleId);
    if (!role) return interaction.reply("❌ | Role không tồn tại!");
    await member.roles.add(role);
    await interaction.reply(`🎉 | Đã random role **${role.name}** cho ${member.user}!`);
  },

  async prefixExecute(msg) {
    if (!canUseCommand(msg.member))
      return msg.reply("🚫 | Bạn không có quyền dùng lệnh này.");
    const member = msg.mentions.members.first();
    if (!member) return msg.reply("⚠️ | Hãy mention một user hợp lệ!");
    const roleId = getRandomRole(msg.guild.id);
    if (!roleId) return msg.reply("⚠️ | Chưa có role nào được thêm để random!");
    const role = msg.guild.roles.cache.get(roleId);
    if (!role) return msg.reply("❌ | Role không tồn tại!");
    await member.roles.add(role);
    msg.reply(`🎲 | Đã random role **${role.name}** cho ${member.user}!`);
  }
};
