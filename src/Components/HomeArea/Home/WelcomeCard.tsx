import "./WelcomeCard.css";
import globals from "../../services/globals";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import store from "../../../Redux/store";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";

function WelcomeCard(): JSX.Element {
  const [currentUser, setCurrentUser] = useState({});

  function handleClick() {
    sessionStorage.clear();
    store.dispatch(vacationsDownloadedAction([]));
    setCurrentUser({});
  }

  useEffect(() => {
    if (globals.isUserLoggedIn()) {
      setCurrentUser(JSON.parse(globals.isUserLoggedIn()));
      console.log(JSON.parse(globals.isUserLoggedIn()));
    }
    console.log(currentUser);
  }, [globals.isUserLoggedIn()]);

  if (globals.isUserLoggedIn()) {
    return (
      <span className="welcomecard">
        {/* @ts-ignore */}
        logged as: {currentUser.firstName},
        <br />
        <Button size="small" onClick={handleClick}>
          Log out
        </Button>
      </span>
    );
  } else {
    return <Redirect to="/login" />;
  }
}
export default WelcomeCard;
