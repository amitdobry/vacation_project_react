import { Component, SyntheticEvent } from "react";
import SocketService from "../../services/socketService";
import { Bar } from "react-chartjs-2";
import "./Chart.css";
import store from "../../../Redux/store";

interface ChatState {
  data: any[];
}

class ChartComponent extends Component<{}, ChatState> {
  private socketService: SocketService = new SocketService();

  public constructor(props: {}) {
    super(props);
    this.state = {
      data: store.getState().vacationsState.vacations,
    };
  }

  private connect = () => {
    this.socketService.connect();

    this.socketService.socket.on("data-from-server", (data) => {
      this.setState({ data: data });
      console.log(data);
    });
  };

  private disconnect = () => {
    this.socketService.disconnect();
  };

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    this.disconnect();
  }
  getVacationNames() {
    const vacations = this.state.data;
    let newArray = [];
    for (let vacation of vacations) {
      newArray.push(vacation.destination);
    }
    return newArray;
  }

  getVacationTotalFollowers() {
    const vacations = this.state.data;
    let newArray = [];
    for (let vacation of vacations) {
      newArray.push(vacation.totalFollowers);
    }
    return newArray;
  }

  public render(): JSX.Element {
    const vacationDestination = this.getVacationNames();
    const followersNumberForEachDestination = this.getVacationTotalFollowers();
    const data = {
      labels: vacationDestination,
      datasets: [
        {
          label: "# of Followers",
          data: followersNumberForEachDestination,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <div>
        <div className="App"></div>

        <div className="Chat">
          <br />
          <br />
          <span className="placements">
            <Bar className="size" data={data} options={options} />
          </span>
          <br />
        </div>
      </div>
    );
  }
}

export default ChartComponent;
