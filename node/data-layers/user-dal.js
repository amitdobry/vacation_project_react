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

async function addFollowAsync(follow) {
  const sqlTestIfExists = `SELECT * from follow_click_list WHERE user_id=${follow.user_id} and vacation_id=${follow.vacation_id}`;
  let testExist = await executeAsync(sqlTestIfExists);
  const result = Object.values(JSON.parse(JSON.stringify(testExist)));
  if (result[0] === undefined) {
    const sql = `INSERT INTO follow_click_list VALUES(DEFAULT, '${follow.user_id}', '${follow.vacation_id}')`;
    const info = await executeAsync(sql);
    const sql2 = `UPDATE vacations SET totalFollowers = totalFollowers + 1 WHERE vacations.vacation_id = ${follow.vacation_id};`;
    const info2 = await executeAsync(sql2);
    return info;
  } else {
    console.log("allReadyExists!!!");
  }
}

async function removeFollowAsync(follow) {
  const sqlTestIfExists = `SELECT * from follow_click_list WHERE user_id=${follow.user_id} and vacation_id=${follow.vacation_id}`;
  let testExist = await executeAsync(sqlTestIfExists);
  const result = Object.values(JSON.parse(JSON.stringify(testExist)));
  if (result[0] !== undefined) {
    const sql = `DELETE FROM follow_click_list WHERE(follow_click_list.user_id = '${follow.user_id}' AND follow_click_list.vacation_id= '${follow.vacation_id}')`;
    const info = await executeAsync(sql);
    const sql2 = `UPDATE vacations SET totalFollowers = totalFollowers - 1 WHERE vacations.vacation_id = ${follow.vacation_id};`;
    const info2 = await executeAsync(sql2);
    return info;
  } else {
    console.log("allReadyExists!!!");
  }
}

async function getVacationFollowedByUserAsync(id) {
  const sql = `SELECT * FROM follow_click_list WHERE user_id = ${id}`;
  const info = await executeAsync(sql);
  return info;
}

async function getAllFollowingList() {
  const sql = `SELECT * FROM follow_click_list`;
  const info = await executeAsync(sql);

  const result = Object.values(JSON.parse(JSON.stringify(info)));

  for (i = 0; i <= result.length; i++) {}
  return info;
}

module.exports = {
  executeAsync,
  addFollowAsync,
  removeFollowAsync,
  getVacationFollowedByUserAsync,
  getAllFollowingList,
};
