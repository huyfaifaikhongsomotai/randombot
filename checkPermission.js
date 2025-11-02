const { adminControl } = require("./config");

function canUseCommand(member) {
  if (!member || !member.guild) return false;
  if (adminControl.enabled) {
    return member.permissions.has("Administrator");
  } else {
    if (!adminControl.staffRoles.length) return false;
    return member.roles.cache.some(role => adminControl.staffRoles.includes(role.id));
  }
}

function isBotOwner(userId) {
  return adminControl.botOwners.includes(userId);
}

module.exports = { canUseCommand, isBotOwner };
