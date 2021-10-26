import { NavLink } from "react-router-dom";
import VacationModel from "../../../models/VacationModel";
import globals from "../../services/globals";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useState, useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";
import FollowModel from "../../../models/FollowModel";
import { useHistory } from "react-router";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import jwtAxios from "../../services/JwtAxios";
import "./VacationCard.css";
import store from "../../../Redux/store";
interface VacationCardProps {
  vacation: VacationModel;
  followed_ids: any[];
  role: string;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const [followClicked, setFollowClick] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!globals.isUserLoggedIn()) {
      console.log(globals.isUserLoggedIn());
      history.push({
        pathname: "/login",
      });
    } else {
      setCurrentUser(JSON.parse(globals.isUserLoggedIn()));

      if (props.followed_ids.includes(props.vacation.vacation_id)) {
        setFollowClick(true);
      }
    }
    console.log(currentUser);
  }, [globals.isUserLoggedIn()]);

  useEffect(() => {
    if (followClicked === true) {
      addFollowClick();
    }
  });

  async function addFollowClick() {
    if (!props.followed_ids.includes(props.vacation.vacation_id)) {
      try {
        const request: any = {};
        // @ts-ignore
        request.user_id = currentUser.user_id;
        request.vacation_id = props.vacation.vacation_id;
        console.log(request);

        const response = await axios.post<FollowModel>(
          globals.justUrl + "/api/user/follow",
          request
        );
        const addedFollow = response.data; // The added product in the backend.
        console.log(addedFollow, addedFollow);

        getNewDataAndDispatchIt();
      } catch (err) {
        alert("Error: " + err);
      }
    } else {
      console.log("not added since allready followed");
    }
  }

  async function removeFollowClick() {
    try {
      const request: any = {};
      // @ts-ignore
      request.user_id = currentUser.user_id;
      request.vacation_id = props.vacation.vacation_id;
      console.log(request);

      const response = await axios.post<FollowModel>(
        globals.justUrl + "/api/user/unfollow",
        request
      );
      const addedFollow = response.data; // The added product in the backend.
      console.log(addedFollow);

      getNewDataAndDispatchIt();
    } catch (err) {
      alert("Error: " + err);
    }
  }

  function manageFollow(e) {
    if (followClicked === true) {
      removeFollowClick();
    }
    followClicked === false ? setFollowClick(true) : setFollowClick(false);
    console.log(followClicked);
  }

  function iconsRender() {
    if (followClicked) {
      return <FavoriteIcon />;
    } else {
      return <FavoriteBorderIcon />;
    }
  }
  async function getNewDataAndDispatchIt() {
    try {
      const response = await jwtAxios.get<VacationModel[]>(
        globals.vacationsUrl
      );
      store.dispatch(vacationsDownloadedAction(response.data));
    } catch (err) {
      console.log(err.message);
    }
  }
  const route = "/vacations/edit/" + props.vacation.vacation_id;

  if (props.role === "Admin") {
    return (
      <div className="VacationCard Box">
        <span>
          <NavLink className="editVacation" to={route} exact>
            <EditIcon />
          </NavLink>
          <button
            className="deleteVacation"
            onClick={(e) => {
              axios
                .delete<VacationModel>(
                  globals.justUrl +
                    "/api/vacations/delete/" +
                    props.vacation.vacation_id
                )
                .then((res) => {
                  alert("deleted");
                  history.push({
                    pathname: "/analytics",
                  });
                });
              console.log("e.target", e.target);
            }}>
            <CloseIcon />
          </button>
        </span>
        <div className="text">
          <span className="title">{props.vacation.destination}</span>
          <br />
          <br />
          Description: {props.vacation.description}.
          <br />
          {}
          <br />
          Dates:
          <br />
          From: {new Date(
            props.vacation.date_time_from
          ).toLocaleDateString()}{" "}
          {"Leaving "}
          {new Date(props.vacation.date_time_from).toLocaleTimeString()}
          <br />
          Until: {new Date(
            props.vacation.date_time_until
          ).toLocaleDateString()}{" "}
          {"Returning "}
          {new Date(props.vacation.date_time_until).toLocaleTimeString()}
          <br />
          <br />
          Loved this Vacation: {props.vacation.totalFollowers}
        </div>
        <NavLink to={"/vacations/details/" + props.vacation.vacation_id}>
          <img
            src={globals.vacationsUrl + "/images/" + props.vacation.imageName}
          />
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="VacationCard Box">
        <span className="centerButton">
          <button className="follow" onClick={manageFollow}>
            {iconsRender()}
          </button>
        </span>
        <div className="text">
          <span className="title">{props.vacation.destination}</span>
          <br />
          <br />
          Description: {props.vacation.description}.
          <br />
          {}
          <br />
          Dates:
          <br />
          From: {new Date(
            props.vacation.date_time_from
          ).toLocaleDateString()}{" "}
          {"Leaving "}
          {new Date(props.vacation.date_time_from).toLocaleTimeString()}
          <br />
          Until: {new Date(
            props.vacation.date_time_until
          ).toLocaleDateString()}{" "}
          {"Returning "}
          {new Date(props.vacation.date_time_until).toLocaleTimeString()}
          <br />
          <br />
          Loved this Vacation: {props.vacation.totalFollowers}
        </div>
        <NavLink to={"/vacations/details/" + props.vacation.vacation_id}>
          <img
            src={globals.vacationsUrl + "/images/" + props.vacation.imageName}
          />
        </NavLink>
      </div>
    );
  }
}

export default VacationCard;
