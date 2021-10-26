const express = require("express");
const userLogic = require("../business-logics/user-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

router.post("/follow", async (request, response) => {
  try {
    const addedFollow = await userLogic.addFollowAsync(request.body);
    response.status(201).json(addedFollow);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err.message));
  }
});

router.post("/unfollow", async (request, response) => {
  try {
    const removedFollow = await userLogic.removeFollowAsync(request.body);
    response.status(201).json(removedFollow);
  } catch (err) {
    console.log(err.message);
    response.status(500).send(errorsHelper.getError(err.message));
  }
});

router.put("/update", async (request, response) => {
  try {
    const addedVacation = await vacationLogic.updateVacationAsync(request.body);
    response.status(201).json(addedVacation);
  } catch (err) {
    console.log(err.message);
    response.status(500).send(errorsHelper.getError(err.message));
  }
});

router.get("/vacations-followed-by-user-id/:id", async (request, response) => {
  const current_user_params = request.params;
  try {
    const vacations = await userLogic.getVacationFollowedByUserAsync(
      current_user_params.id
    );
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

module.exports = router;
