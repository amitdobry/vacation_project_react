import "./Home.css";
import { useState, useEffect } from "react";
import globals from "../../services/globals";
import { Redirect } from "react-router-dom";
import WelcomeCard from "./WelcomeCard";

function Home(): JSX.Element {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem("user")
  );

  useEffect(() => {
    if (!globals.isUserLoggedIn()) {
      console.log(globals.isUserLoggedIn());
      setRedirectToLogin(true);
    }
    console.log(currentUser);
  }, [globals.isUserLoggedIn()]);

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="Home">
        <br />
        <h2>Welcome</h2>
        <br />
        <h3 className="WelcomeText">
          this project by Amit Dobry, demonstrates a React - node.js - SQL end
          to end system, using Redux And Socket.Io to store and receive Data -
          Real-Time and a user Authentication and verification system with a
          control panel for an Administrator. you are welcome to log as Admin.
          username: Admin password: 12345. images are stored temporarily, edit
          to view them.
        </h3>
        <br />
        <WelcomeCard />
      </div>
    );
  }
}

export default Home;
