const express = require("express");
const vacationLogic = require("../business-logics/vacation-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();
const uuid = require("uuid");
const verifyLoggedIn = require("../middleware/verify-logged-in");

router.post("/add", async (request, response) => {
  try {
    const addedVacation = await vacationLogic.addVacationAsync(request.body);
    response.status(201).json(addedVacation);
  } catch (err) {
    console.log(err.message);
    response.status(500).send(errorsHelper.getError(err.message));
  }
});

router.put("/update", async (request, response) => {
  try {
    const perviousTotalFollowers = await vacationLogic.getSingleVacationAsync(
      request.body.vacation_id
    );
    request.body.totalFollowers = perviousTotalFollowers[0].totalFollowers;
    const addedVacation = await vacationLogic.updateVacationAsync(request.body);
    response.status(201).json(addedVacation);
  } catch (err) {
    console.log(err.message);
    response.status(500).send(errorsHelper.getError(err.message));
  }
});

router.get("/", verifyLoggedIn, async (request, response) => {
  try {
    console.log("here - verify log in");
    const vacations = await vacationLogic.getVacationsAsync();
    response.status(201).json(vacations);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

router.get("/:id", async (request, response) => {
  const current_vacation_id = request.params;
  try {
    const vacation = await vacationLogic.getSingleVacationAsync(
      current_vacation_id.id
    );
    response.status(201).json(vacation);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
    console.log(err.message);
  }
});

router.delete("/delete/:id", async (request, response) => {
  const current_vacation_id = request.params.id;
  try {
    const vacation = await vacationLogic.deleteSingleVacationAsync(
      current_vacation_id
    );
    response.status(201).json(vacation);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
    console.log(err.message);
  }
});

router.post("/upload-image", async (request, response) => {
  response.header("Access-Control-Allow-Origin", "*");
  if (!request.files) return response.status(400).send("No image sent!");
  const image = request.files.image;
  if (!image) return response.status(400).send("No coolPicture sent!");
  const extension = image.name.substr(image.name.lastIndexOf(".")); // .jpg / .png / .gif
  const newFileName = uuid.v4() + extension;
  await image.mv("./controllers/images/" + newFileName); // mv = move
  response.send(newFileName);
});

router.get("/images/:name", (request, response) => {
  const name = request.params.name;
  response.sendFile(__dirname + "/images/" + name);
});

module.exports = router;
