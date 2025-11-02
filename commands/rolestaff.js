const { SlashCommandBuilder } = require("discord.js");
const { addStaffRole, removeStaffRole, listStaffRoles } = require("../role");
const { isBotOwner } = require("../checkPermission");

module.exports = {
  name: "rolestaff",
  slashData: new SlashCommandBuilder()
    .setName("rolestaff")
    .setDescription("👥 Quản lý role staff")
    .addSubcommand(sub =>
      sub.setName("add").setDescription("Thêm role staff").addRoleOption(o => o.setName("role").setDescription("Role").setRequired(true)))
    .addSubcommand(sub =>
      sub.setName("remove").setDescription("Xóa role staff").addRoleOption(o => o.setName("role").setDescription("Role").setRequired(true)))
    .addSubcommand(sub => sub.setName("list").setDescription("Xem danh sách role staff")),

  async execute(interaction) {
    if (!isBotOwner(interaction.user.id))
      return interaction.reply("🚫 | Chỉ chủ bot mới được dùng lệnh này.");
    const sub = interaction.options.getSubcommand();
    const guildId = interaction.guild.id;
    if (sub === "add") {
      const role = interaction.options.getRole("role");
      addStaffRole(guildId, role.id);
      return interaction.reply(`✅ | Đã thêm **${role.name}** làm role staff.`);
    }
    if (sub === "remove") {
      const role = interaction.options.getRole("role");
      removeStaffRole(guildId, role.id);
      return interaction.reply(`🗑️ | Đã xóa **${role.name}** khỏi role staff.`);
    }
    if (sub === "list") {
      const roles = listStaffRoles(guildId);
      if (!roles.length) return interaction.reply("📭 | Chưa có role staff nào.");
      return interaction.reply("👥 | Role Staff: " + roles.map(r => `<@&${r}>`).join(", "));
    }
  },

  async prefixExecute(msg, args) {
    if (!isBotOwner(msg.author.id))
      return msg.reply("🚫 | Chỉ chủ bot mới được dùng lệnh này.");
    const sub = args[0];
    const guildId = msg.guild.id;
    if (sub === "add") {
      const role = msg.mentions.roles.first();
      if (!role) return msg.reply("⚠️ | Mention role hợp lệ.");
      addStaffRole(guildId, role.id);
      return msg.reply(`✅ | Đã thêm **${role.name}** làm role staff.`);
    }
    if (sub === "remove") {
      const role = msg.mentions.roles.first();
      if (!role) return msg.reply("⚠️ | Mention role hợp lệ.");
      removeStaffRole(guildId, role.id);
      return msg.reply(`🗑️ | Đã xóa **${role.name}** khỏi role staff.`);
    }
    if (sub === "list") {
      const roles = listStaffRoles(guildId);
      if (!roles.length) return msg.reply("📭 | Chưa có role staff nào.");
      return msg.reply("👥 | Role Staff: " + roles.map(r => `<@&${r}>`).join(", "));
    }
    msg.reply("❓ | Dùng: `r!rolestaff add/remove/list @Role`");
  }
};
