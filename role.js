const fs = require("fs");
const path = require("path");
const { databaseFolder } = require("./config");

if (!fs.existsSync(databaseFolder)) fs.mkdirSync(databaseFolder);

function getGuildPath(guildId) {
  const file = path.join(databaseFolder, `${guildId}.json`);
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ roles: [], staffRoles: [] }, null, 2));
  return file;
}

function loadGuildData(guildId) {
  return JSON.parse(fs.readFileSync(getGuildPath(guildId), "utf8"));
}

function saveGuildData(guildId, data) {
  fs.writeFileSync(getGuildPath(guildId), JSON.stringify(data, null, 2));
}

function addRole(guildId, roleId) {
  const data = loadGuildData(guildId);
  if (!data.roles.includes(roleId)) data.roles.push(roleId);
  saveGuildData(guildId, data);
}

function removeRole(guildId, roleId) {
  const data = loadGuildData(guildId);
  data.roles = data.roles.filter(r => r !== roleId);
  saveGuildData(guildId, data);
}

function listRoles(guildId) {
  return loadGuildData(guildId).roles;
}

function getRandomRole(guildId) {
  const roles = listRoles(guildId);
  if (!roles.length) return null;
  return roles[Math.floor(Math.random() * roles.length)];
}

function addStaffRole(guildId, roleId) {
  const data = loadGuildData(guildId);
  if (!data.staffRoles.includes(roleId)) data.staffRoles.push(roleId);
  saveGuildData(guildId, data);
}

function removeStaffRole(guildId, roleId) {
  const data = loadGuildData(guildId);
  data.staffRoles = data.staffRoles.filter(r => r !== roleId);
  saveGuildData(guildId, data);
}

function listStaffRoles(guildId) {
  return loadGuildData(guildId).staffRoles;
}

module.exports = { addRole, removeRole, listRoles, getRandomRole, addStaffRole, removeStaffRole, listStaffRoles };
