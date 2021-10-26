import axios from "axios";
import { Component } from "react";
import "./VacationList.css";
import VacationModel from "../../../models/VacationModel";
import store from "../../../Redux/store";
import globals from "../../services/globals";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import { vacationsSortedDownloadedAction } from "../../../Redux/VacationsState";
import { followingsDownloadedAction } from "../../../Redux/FollowingsState";
import { followingIdsDownloadedAction } from "../../../Redux/FollowingIdState";
import PleaseWait from "../../SharedArea/PleaseWait/PleaseWait";
import VacationCard from "../VacationCard/VacationCard";
import { NavLink, Redirect } from "react-router-dom";
import { Add } from "@material-ui/icons";
import UserModel from "../../../models/UserModel";
import FollowModel from "../../../models/FollowModel";
import jwtAxios from "../../services/JwtAxios";
import SocketService from "../../services/socketService";

interface ProductListState {
  vacations: VacationModel[];
  vacationsFollowedBy: FollowModel[];
  vacationsSorted: VacationModel[];
  vacationFollowedIdArray: number[];
  connectedUser: UserModel | null;
}

class ProductList extends Component<{}, ProductListState> {
  private socketService: SocketService = new SocketService();
  public constructor(props: {}) {
    super(props);
    this.state = {
      vacations: store.getState().vacationsState.vacations,
      vacationsFollowedBy: store.getState().followingsState.followings,
      vacationsSorted: store.getState().vacationsState.vacations,
      vacationFollowedIdArray: store.getState().followingIdState.followingIds,
      connectedUser: store.getState().currentUserState.currentUser,
    };
  }

  private disconnect = () => {
    this.socketService.disconnect();
  };

  private connect = () => {
    this.socketService.connect();

    this.socketService.socket.on("data-from-server", (data) => {
      console.log(data);
      this.getCurrentUserAndThenSortData(data);
    });
  };

  public async getCurrentUserAndThenSortData(data) {
    const currentUserId = JSON.parse(globals.isUserLoggedIn()).user_id;
    await this.SortDataByUser(data, currentUserId);
  }

  public async SortDataByUser(data, user_id) {
    console.log("in sortDataByUser by socket ignite");
    const followedVacations = await axios.get<FollowModel[]>(
      globals.justUrl + `/api/user/vacations-followed-by-user-id/${user_id}`
    );
    const vacationsIdsFollowedByCurrentUser = followedVacations.data.map(
      (p) => p.vacation_id
    );
    this.setState({
      vacationFollowedIdArray: vacationsIdsFollowedByCurrentUser,
    });
    const dataWithFollowedVacations = data.filter((p) =>
      vacationsIdsFollowedByCurrentUser.includes(p.vacation_id)
    );
    const dataWithoutFollowedVacations = data.filter(
      (p) => !vacationsIdsFollowedByCurrentUser.includes(p.vacation_id)
    );
    const finalSortedData = dataWithFollowedVacations.concat(
      dataWithoutFollowedVacations
    );
    store.dispatch(vacationsSortedDownloadedAction(finalSortedData));
    this.setState({ vacationsSorted: finalSortedData });
    const currentUserId = JSON.parse(globals.isUserLoggedIn()).user_id;
    const followedResponse = await axios.get<FollowModel[]>(
      globals.justUrl +
        `/api/user/vacations-followed-by-user-id/${currentUserId}`
    );
    this.setState({ vacationsFollowedBy: followedResponse.data });
    store.dispatch(followingsDownloadedAction(followedResponse.data));
    const vacationIdsThatAreFollowedByThis = followedResponse.data.map(
      (p) => p.vacation_id
    );
    console.log(
      "vacationIdsThatAreFollowedByThis",
      vacationIdsThatAreFollowedByThis
    );

    this.setState({
      vacationFollowedIdArray: vacationIdsThatAreFollowedByThis,
    });
    store.dispatch(
      followingIdsDownloadedAction(vacationIdsThatAreFollowedByThis)
    );
  }

  public async componentWillUnmount() {
    try {
      const currentUserId = JSON.parse(globals.isUserLoggedIn()).user_id;
      const followedResponse = await axios.get<FollowModel[]>(
        globals.justUrl +
          `/api/user/vacations-followed-by-user-id/${currentUserId}`
      );
      this.setState({ vacationsFollowedBy: followedResponse.data });
      store.dispatch(followingsDownloadedAction(followedResponse.data));
      const vacationIdsThatAreFollowedByThis = followedResponse.data.map(
        (p) => p.vacation_id
      );
      console.log(
        "vacationIdsThatAreFollowedByThis",
        vacationIdsThatAreFollowedByThis
      );
      this.setState({
        vacationFollowedIdArray: vacationIdsThatAreFollowedByThis,
      });
      store.dispatch(
        followingIdsDownloadedAction(vacationIdsThatAreFollowedByThis)
      );
      console.log("REACHED HERE");

      this.disconnect();
    } catch (err) {
      console.log(err.message);
    }
  }
  public async componentDidMount() {
    try {
      if (this.state.vacations.length === 0) {
        console.log("in the if didmount");

        const response = await jwtAxios.get<VacationModel[]>(
          globals.vacationsUrl
        );
        console.log("get vacations form db", response.data);
        const currentUserId = JSON.parse(globals.isUserLoggedIn()).user_id;
        const followedResponse = await axios.get<FollowModel[]>(
          globals.justUrl +
            `/api/user/vacations-followed-by-user-id/${currentUserId}`
        );
        console.log(followedResponse.data);

        this.setState({ vacationsFollowedBy: followedResponse.data });
        store.dispatch(vacationsDownloadedAction(response.data));
        // this.setState({ vacations: response.data });
        store.dispatch(followingsDownloadedAction(followedResponse.data));
        const vacationIdsThatAreFollowedByThis = followedResponse.data.map(
          (p) => p.vacation_id
        );
        console.log(
          "vacationIdsThatAreFollowedByThis",
          vacationIdsThatAreFollowedByThis
        );
        this.setState({
          vacationFollowedIdArray: vacationIdsThatAreFollowedByThis,
        });
        store.dispatch(
          followingIdsDownloadedAction(vacationIdsThatAreFollowedByThis)
        );

        //
        //
        const rearangedVacationList = [...response.data];
        console.log(rearangedVacationList);
        const newarrayInclude = rearangedVacationList.filter((p) =>
          vacationIdsThatAreFollowedByThis.includes(p.vacation_id)
        );
        const newarrayExclude = rearangedVacationList.filter(
          (p) => !vacationIdsThatAreFollowedByThis.includes(p.vacation_id)
        );
        console.log(newarrayInclude);
        console.log(newarrayExclude);
        const array3 = newarrayInclude.concat(newarrayExclude);
        console.log(array3);
        store.dispatch(vacationsSortedDownloadedAction(array3));
        this.setState({ vacationsSorted: array3 });

        this.connect();
      } else {
        const response = await jwtAxios.get<VacationModel[]>(
          globals.vacationsUrl
        );
        console.log("get vacations form db test", response.status);
        this.connect();
      }
    } catch (err) {
      sessionStorage.clear();
      alert("Session Expired - Please Login Again");
      console.log(err.message);
      this.setState({ connectedUser: undefined });
    }
  }
  public render(): JSX.Element {
    if (this.state.connectedUser === undefined) {
      console.log("redirecting to login");

      return <Redirect to="/login" />;
    }
    if (this.state.connectedUser.username === "Admin") {
      return (
        <div className="VacationList">
          {this.state.vacationsSorted.length === 0 && <PleaseWait />}

          <NavLink className="NewVacation" to="/vacations/add" exact>
            <Add />
          </NavLink>
          <h2>Welcome Admin</h2>
          {this.state.vacationsSorted.map((p) => (
            <VacationCard
              vacation={p}
              key={p.vacation_id}
              followed_ids={this.state.vacationFollowedIdArray}
              role={"Admin"}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="VacationList">
        {this.state.vacationsSorted.length === 0 && <PleaseWait />}

        {this.state.vacationsSorted.map((p) => (
          <VacationCard
            vacation={p}
            key={p.vacation_id}
            followed_ids={this.state.vacationFollowedIdArray}
            role={"Visitor"}
          />
        ))}
      </div>
    );
  }
}

export default ProductList;
