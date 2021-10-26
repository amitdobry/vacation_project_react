const io = require("socket.io");
const dal = require("../data-layers/vacation-dal");
let socketsManager;
function start(listener) {
  socketsManager = io(listener, { cors: { origin: "*" } });

  let connectionCount = 0;

  socketsManager.sockets.on("connection", async (socket) => {
    const currentVacationData = await dal.getVacationsAsync();
    let currentVacationDataOrgenized = Object.values(
      JSON.parse(JSON.stringify(currentVacationData))
    );

    connectionCount = connectionCount + 1;

    var getDataPlease = async function () {
      const data = await dal.getVacationsAsync();
      socketsManager.sockets.emit("data-from-server", data);
      return data;
    };
    getDataPlease();

    var getDataPleaseDontEmitYet = async function () {
      const data = await dal.getVacationsAsync();
      return data;
    };

    let runOnce; // makes sure to run once even if count === 1 more then 1 time
    if (connectionCount === 1 && runOnce !== false) {
      console.log(
        "interval running every 2 second - emmiting only when data changes"
      );
      runOnce = false;
      var testData = setInterval(async () => {
        const perhapsNewVacationData = await getDataPleaseDontEmitYet();
        function arraysEqual(a, b) {
          const result = Object.values(JSON.parse(JSON.stringify(b)));
          for (i = 0; i < result.length; i++) {
            for (let params in a[i]) {
              if (a[i][params] != b[i][params]) {
                return false;
              }
            }

            if (a[i] !== b[i]) {
              false;
            }
          }

          return true;
        }
        if (
          arraysEqual(currentVacationDataOrgenized, perhapsNewVacationData) ===
          true
        ) {
        } else if (
          arraysEqual(currentVacationDataOrgenized, perhapsNewVacationData) ===
          false
        ) {
          console.log("Data Updated. Emitted new Data");
          socketsManager.sockets.emit(
            "data-from-server",
            perhapsNewVacationData
          );
          currentVacationDataOrgenized = perhapsNewVacationData;
        }
        if (connectionCount === 0 && runOnce === false) {
          clearInterval(testData);
          runOnce = true;
          console.log("no users are logged to socket - cleared interval");
        }
      }, 2000);
    }
    socket.on("disconnect", () => {
      connectionCount = connectionCount - 1;
      console.log("user count updated:", connectionCount);
    });
    console.log("user count updated:", connectionCount);
  });
}
module.exports = {
  start,
};
