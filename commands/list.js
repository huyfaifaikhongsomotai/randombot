const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { listRoles } = require("../role");
const { canUseCommand } = require("../checkPermission");

module.exports = {
  name: "listrole",
  slashData: new SlashCommandBuilder()
    .setName("listrole")
    .setDescription("📜 Hiển thị danh sách role đang được random"),

  async execute(interaction) {
    if (!canUseCommand(interaction.member))
      return interaction.reply("🚫 | Bạn không có quyền dùng lệnh này.");
    const roles = listRoles(interaction.guild.id);
    if (!roles.length) return interaction.reply("📭 | Chưa có role nào trong danh sách random!");
    const embed = new EmbedBuilder()
      .setTitle("📋 Danh sách Role Random")
      .setDescription(roles.map(r => `<@&${r}>`).join("\n"))
      .setColor("Gold");
    await interaction.reply({ embeds: [embed] });
  },

  async prefixExecute(msg) {
    if (!canUseCommand(msg.member))
      return msg.reply("🚫 | Bạn không có quyền dùng lệnh này.");
    const roles = listRoles(msg.guild.id);
    if (!roles.length) return msg.reply("📭 | Chưa có role nào trong danh sách random!");
    const embed = new (require("discord.js").EmbedBuilder)()
      .setTitle("📋 Danh sách Role Random")
      .setDescription(roles.map(r => `<@&${r}>`).join("\n"))
      .setColor("Yellow");
    msg.reply({ embeds: [embed] });
  }
};
