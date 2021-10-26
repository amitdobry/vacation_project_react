import { NavLink } from "react-router-dom";

import "./Menu.css";

function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <nav>
        <NavLink to="/home" exact>
          Home
        </NavLink>
        <NavLink to="/vacations" exact>
          Vacations
        </NavLink>
        <NavLink to="/analytics" exact>
          Analytics
        </NavLink>
      </nav>
    </div>
  );
}
export default Menu;
