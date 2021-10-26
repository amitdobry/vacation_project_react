const mysql = require("mysql");

const connection = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
});

function executeAsync(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

async function getVacationsAsync() {
  const sql = `select * from vacations`;
  const info = await executeAsync(sql);
  return info;
}

async function getSingleVacationAsync(id) {
  const sql = `select * from vacations WHERE vacation_id = ${id}`;
  const info = await executeAsync(sql);
  return info;
}

async function addVacationAsync(vacation) {
  const sql = `INSERT INTO vacations VALUES(DEFAULT, '${vacation.description}', '${vacation.destination}', '${vacation.imageName}', '${vacation.date_time_from}', '${vacation.date_time_until}', '${vacation.totalFollowers}')`;
  const info = await executeAsync(sql);
  return info;
}

async function updateVacationAsync(vacation) {
  const sql = `UPDATE vacations SET
                 description = '${vacation.description}',
                 destination = '${vacation.destination}',
                 imageName = '${vacation.imageName}',
                 date_time_from = '${vacation.date_time_from}',
                 date_time_until = '${vacation.date_time_until}',
                 totalFollowers = '${vacation.totalFollowers}'
                 WHERE vacation_id = ${vacation.vacation_id}`;
  const info = await executeAsync(sql);
  return info;
}

async function deleteSingleVacationAsync(id) {
  //deleting foreign key first
  const sql_1 = `DELETE FROM follow_click_list WHERE 
follow_click_list.vacation_id = ${id}`;
  const info_1 = await executeAsync(sql_1);
  console.log(info_1);
  const sql_2 = `DELETE FROM vacations WHERE 
vacations.vacation_id = ${id}`;
  const info_2 = await executeAsync(sql_2);
  console.log(info_2);
  return info_2;
}

module.exports = {
  executeAsync,
  getVacationsAsync,
  getSingleVacationAsync,
  addVacationAsync,
  updateVacationAsync,
  deleteSingleVacationAsync,
};
