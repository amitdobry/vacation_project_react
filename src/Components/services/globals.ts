class Globals {
  public loginUrl = "http://localhost:3001/api/auth/login";
  public registerUrl = "http://localhost:3001/api/auth/register";
  public vacationsUrl = "http://localhost:3001/api/vacations";
  public vacationUrl = "http://localhost:3001/api/vacation";
  public justUrl = "http://localhost:3001";
  public isUserLoggedIn = function isUserLoggedIn() {
    const user = sessionStorage.getItem("user");
    if (user) {
      return user;
    } else return undefined;
  };
}

const globals = new Globals();

export default globals;
