const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { adminControl } = require("../config");
const { isBotOwner } = require("../checkPermission");
const configPath = path.join(__dirname, "../config.js");

module.exports = {
  name: "adminmode",
  slashData: new SlashCommandBuilder()
    .setName("adminmode")
    .setDescription("🔧 Bật/tắt chế độ admin-only")
    .addStringOption(opt =>
      opt.setName("mode")
        .setDescription("Chọn on hoặc off")
        .setRequired(true)
        .addChoices({ name: "on", value: "on" }, { name: "off", value: "off" })
    ),

  async execute(interaction) {
    if (!isBotOwner(interaction.user.id))
      return interaction.reply("🚫 | Chỉ chủ bot mới được thay đổi chế độ adminmode!");
    const mode = interaction.options.getString("mode");
    adminControl.enabled = mode === "on";
    await interaction.reply(`🔧 | Đã **${mode === "on" ? "bật" : "tắt"}** chế độ admin-only!`);

    let content = fs.readFileSync(configPath, "utf8");
    content = content.replace(/enabled:\s*(true|false)/, `enabled: ${adminControl.enabled}`);
    fs.writeFileSync(configPath, content);
  },

  async prefixExecute(msg, args) {
    if (!isBotOwner(msg.author.id))
      return msg.reply("🚫 | Chỉ chủ bot mới được thay đổi chế độ adminmode!");
    const mode = args[0];
    if (!mode || !["on", "off"].includes(mode))
      return msg.reply("⚠️ | Cú pháp: `r!adminmode on/off`");
    adminControl.enabled = mode === "on";
    msg.reply(`🔧 | Đã **${mode === "on" ? "bật" : "tắt"}** chế độ admin-only!`);
    let content = fs.readFileSync(configPath, "utf8");
    content = content.replace(/enabled:\s*(true|false)/, `enabled: ${adminControl.enabled}`);
    fs.writeFileSync(configPath, content);
  }
};
