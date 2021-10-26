const dal = require("../data-layers/vacation-dal");

async function getVacationsAsync() {
  const info = await dal.getVacationsAsync();
  return info;
}

async function getSingleVacationAsync(id) {
  const info = await dal.getSingleVacationAsync(id);
  return info;
}

async function addVacationAsync(vacation) {
  const info = await dal.addVacationAsync(vacation);
  console.log(info);
  return vacation;
}

async function updateVacationAsync(vacation) {
  const info = await dal.updateVacationAsync(vacation);
  console.log(info);
  return vacation;
}

async function deleteSingleVacationAsync(id) {
  const info_1 = await dal.deleteSingleVacationAsync(id);
  console.log(info_1);
  return info_1;
}

module.exports = {
  addVacationAsync,
  getVacationsAsync,
  updateVacationAsync,
  getSingleVacationAsync,
  deleteSingleVacationAsync,
};
