import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../models/UserModel";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import globals from "../../services/globals";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

function Register(): JSX.Element {
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm<UserModel>();
  const classes = useStyles();

  async function manageSignUp(user: UserModel) {
    try {
      const response = await axios.post<UserModel>(globals.registerUrl, user);
      const addedUser = response.data; // The added product in the backend.
      console.log("addedUser", addedUser);
      history.push("/Home"); // Go to that route!
    } catch (err) {
      alert("Error: " + err);
    }
  }

  return (
    <div className="Login">
      <Container className={classes.container} maxWidth="xs">
        <form onSubmit={handleSubmit(manageSignUp)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    inputRef={register({ required: true, minLength: 2 })}
                    label="first name"
                    name="firstName"
                    size="small"
                    variant="outlined"
                  />
                  {errors.firstName?.type === "required" && (
                    <span>Missing first name</span>
                  )}
                  {errors.firstName?.type === "minLength" && (
                    <span>Name too short.</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    inputRef={register({ required: true, minLength: 3 })}
                    label="last name"
                    name="lastName"
                    size="small"
                    variant="outlined"
                  />
                  {errors.lastName?.type === "required" && (
                    <span>Missing last name</span>
                  )}
                  {errors.lastName?.type === "minLength" && (
                    <span>Name too short.</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    inputRef={register({ required: true, minLength: 3 })}
                    label="user name"
                    name="username"
                    size="small"
                    variant="outlined"
                  />
                  {errors.username?.type === "required" && (
                    <span>Missing user name</span>
                  )}
                  {errors.username?.type === "minLength" && (
                    <span>user name too short.</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    inputRef={register({ required: true, minLength: 3 })}
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
                sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Container
        className={classes.container}
        maxWidth="xs"
        onClick={() => {
          history.push("/login");
        }}>
        <Button color="secondary" fullWidth type="submit" variant="contained">
          Back to Login
        </Button>
      </Container>
    </div>
  );
}

export default Register;
