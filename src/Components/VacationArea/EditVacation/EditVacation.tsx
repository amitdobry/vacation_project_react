import axios from "axios";
import { useForm } from "react-hook-form";
import VacationModel from "../../../models/VacationModel";
import { useState, useEffect } from "react";
import "./EditVacation.css";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import store from "../../../Redux/store";
import globals from "../../services/globals";

interface RouteParams {
  id: string;
}

function EditVacation(props: RouteParams): JSX.Element {
  const { register, handleSubmit, errors } = useForm<VacationModel>();
  const [uploadFile, setUploadFile] = useState();
  const [fileName, setFileName] = useState("");
  const [uploadResponse, setUploadResponse] = useState("");
  const history = useHistory();
  const { id }: any = useParams();
  const [currentVacation, setCurrentVacation] = useState({
    vacation: {
      destination: "",
      description: "",
      date_time_from: "",
      date_time_until: "",
      imageName: "",
    },
  });

  useEffect(() => {
    setCurrentId();
  }, [id]);

  async function setCurrentId() {
    try {
      const vacation = store
        .getState()
        .vacationsState.vacations.find((p) => p.vacation_id == id);
      console.log(vacation);

      if (vacation) {
        setCurrentVacation({ vacation });
      } else {
        const response = await axios.get<VacationModel[]>(
          globals.justUrl + `/api/vacations/${id}`
        );
        console.log(response.data);
        const vacation = response.data[0];
        setCurrentVacation({ vacation });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function saveImgAndCreateImgName(vacation) {
    try {
      setUploadResponse(
        `File uploaded successfully POST // FILE - ${uploadFile}`
      );
      const response = await axios.post<VacationModel>(
        globals.justUrl + "/api/vacations/upload-image",
        VacationModel.convertToFormData(vacation)
      );
      console.log(response.data);
      let name = response.data;
      setFileName(`VIEW ON // ${globals.justUrl}/api/vacations/images/${name}`);
      return response.data;
    } catch (err) {
      console.log(err.message);
      setUploadResponse(`File upload failed // FILE - ${uploadFile}
      must end with .jpg/.png/.jpeg`);
    }
  }
  async function addVacation(vacation: VacationModel) {
    console.log(vacation);

    try {
      if (vacation.image.length === 0) {
        vacation.imageName = currentVacation.vacation.imageName;
      } else {
        const addImgToDBAndGetName: any = await saveImgAndCreateImgName(
          vacation
        );
        vacation.imageName = addImgToDBAndGetName;
      }
      console.log("id" + id);

      vacation.vacation_id = id;
      console.log("vacation To PUT", vacation);

      const response = await axios.put<VacationModel>(
        globals.justUrl + "/api/vacations/update",
        vacation
      );
      const addedVacation = response.data; // The added product in the backend.
      console.log("addedVacation", addedVacation);

      history.push("/vacations"); // Go to that route!
    } catch (err) {
      alert("Error: " + err);
    }
  }

  function handleChanges(event: any) {
    let newCurrentState = currentVacation;
    if (event.target.name === "destination") {
      newCurrentState.vacation.destination = event.target.value;
    }
    if (event.target.name === "description") {
      newCurrentState.vacation.description = event.target.value;
    }
    if (event.target.name === "date_time_from") {
      newCurrentState.vacation.date_time_from = event.target.value;
    }
    if (event.target.name === "date_time_until") {
      newCurrentState.vacation.date_time_until = event.target.value;
    }

    setCurrentVacation({ ...newCurrentState });
    console.log(currentVacation);
  }
  return (
    <div className="UploadFile box">
      <h2>Edit Existing Vacation</h2>

      <form
        onSubmit={handleSubmit(addVacation)}
        onChange={handleChanges}
        encType="multipart/form-data"
        action="http://localhost:3000/api/vacations/upload-iamge">
        <label>Destination: </label> <br />
        <input
          type="text"
          name="destination"
          value={currentVacation.vacation.destination}
          autoFocus
          ref={register({ required: true, minLength: 3 })}
        />
        {errors.destination?.type === "required" && <span>Destination.</span>}
        {errors.description?.type === "minLength" && (
          <span>Destination too short.</span>
        )}
        <br />
        <br />
        <label>Description: </label> <br />
        <textarea
          rows={6}
          cols={40}
          name="description"
          value={currentVacation.vacation.description}
          ref={register({ required: true, minLength: 10 })}
        />
        {errors.description?.type === "required" && (
          <span>Missing Description.</span>
        )}
        {errors.description?.type === "min" && (
          <span>Description too short.</span>
        )}
        <br />
        <br />
        <label>Dates: </label> <br />
        <br />
        <label>From:</label>
        <br />
        <input
          type="datetime-local"
          name="date_time_from"
          ref={register({ required: true })}
          value={currentVacation.vacation.date_time_from}
        />
        {errors.date_time_from?.type === "required" && (
          <span>Missing Date.</span>
        )}
        <br /> <br />
        <label>Until:</label>
        <br />
        <input
          type="datetime-local"
          name="date_time_until"
          value={currentVacation.vacation.date_time_until}
          ref={register({ required: true })}
        />
        {errors.date_time_until?.type === "required" && (
          <span>Missing Date.</span>
        )}
        <br /> <br />
        <input
          type="file"
          name="image"
          accept=".jpg,.png,.jpeg"
          autoFocus
          //   @ts-ignore
          ref={register({ required: false })}
          onChange={(e: any) => {
            setUploadFile(e.target.files[0].name);
          }}
        />
        <br /> <br />
        <label>.jpg .jpeg or .png only</label>
        {errors.image?.type === "required" && <span>Missing name.</span>}
        <br />
        <br />
        <button
          onClick={() => {
            history.push("/vacations");
          }}>
          Back
        </button>
        &nbsp;
        <button type="submit">Update</button>
      </form>
      <pre>{uploadResponse}</pre>
      <br />
      <pre>{fileName}</pre>
    </div>
  );
}

export default EditVacation;
