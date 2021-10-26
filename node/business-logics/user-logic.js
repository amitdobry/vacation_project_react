const dal = require("../data-layers/user-dal");

async function addFollowAsync(follow) {
  const info = await dal.addFollowAsync(follow);
  console.log(info);
  return info;
}

async function removeFollowAsync(follow) {
  const info = await dal.removeFollowAsync(follow);
  console.log(info);
  return info;
}

async function getVacationFollowedByUserAsync(id) {
  const info = await dal.getVacationFollowedByUserAsync(id);
  return info;
}

async function getAllfollowingAndArrangetotals() {
  const info = await dal.getAllFollowingList();
  console.log(info);
  return info;
}
module.exports = {
  addFollowAsync,
  removeFollowAsync,
  getVacationFollowedByUserAsync,
  getAllfollowingAndArrangetotals,
};
