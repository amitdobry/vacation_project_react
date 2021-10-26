import "./Login.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../models/UserModel";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router";
import globals from "../../services/globals";
import store from "../../../Redux/store";
import { currentUsersDownloadedAction } from "../../../Redux/currentUserState";
import { useState } from "react";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

function Login(): JSX.Element {
  const history = useHistory();
  const [userConnected, setUserConnected] = useState(globals.isUserLoggedIn());
  const { register, handleSubmit, errors } = useForm<UserModel>();
  const classes = useStyles();

  async function manageLogin(user: UserModel) {
    try {
      const response = await axios.post<UserModel>(globals.loginUrl, user);
      const loggedInUser = response.data; // The added product in the backend.
      console.log(response);
      console.log(response.data);
      console.log(loggedInUser.token);
      sessionStorage.setItem("user", JSON.stringify(loggedInUser));
      store.dispatch(currentUsersDownloadedAction(loggedInUser));
      history.push("/vacations"); // Go to that route!
    } catch (err) {
      alert("Error: " + err);
    }
  }

  if (userConnected) {
    console.log("redirect to home from login");

    return <Redirect to="/Home" />;
  } else {
    console.log("login page");

    return (
      <div className="Login">
        <Container className={classes.container} maxWidth="xs">
          <form onSubmit={handleSubmit(manageLogin)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      inputRef={register({ required: true, minLength: 2 })}
                      label="user name"
                      name="username"
                      size="small"
                      variant="outlined"
                    />
                    {errors.username?.type === "required" && (
                      <span>Missing user name</span>
                    )}
                    {errors.username?.type === "minLength" && (
                      <span>User Name too short.</span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      inputRef={register({ required: true, minLength: 2 })}
                      label="Password"
                      name="password"
                      size="small"
                      type="password"
                      variant="outlined"
                    />

                    {errors.password?.type === "required" && (
                      <span>Missing password</span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span>Password too short.</span>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="secondary"
                  fullWidth
                  type="submit"
                  variant="contained">
                  Log in
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
        <Container
          className={classes.container}
          maxWidth="xs"
          onClick={() => {
            history.push("/register");
          }}>
          <Button color="secondary" fullWidth type="submit" variant="contained">
            Register
          </Button>
        </Container>
      </div>
    );
  }
}

export default Login;
