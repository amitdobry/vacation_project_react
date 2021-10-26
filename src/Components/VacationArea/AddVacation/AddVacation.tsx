import axios from "axios";
import { useForm } from "react-hook-form";
import VacationModel from "../../../models/VacationModel";
import { useState } from "react";
import "./AddVacation.css";
import { useHistory } from "react-router";
import store from "../../../Redux/store";
import jwtAxios from "../../services/JwtAxios";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import { followingsDownloadedAction } from "../../../Redux/FollowingsState";
import { followingIdsDownloadedAction } from "../../../Redux/FollowingIdState";
import globals from "../../services/globals";
import FollowModel from "../../../models/FollowModel";
import { vacationsSortedDownloadedAction } from "../../../Redux/VacationsState";

function UploadVacation(): JSX.Element {
  const { register, handleSubmit, errors } = useForm<VacationModel>();
  const [uploadFile, setUploadFile] = useState();
  const [fileName, setFileName] = useState("");
  const [uploadResponse, setUploadResponse] = useState("");
  const history = useHistory();

  async function saveImgAndCreateImgName(vacation) {
    try {
      setUploadResponse(
        `File uploaded successfully POST // FILE - ${uploadFile}`
      );
      const response = await axios.post<VacationModel>(
        globals.justUrl + "/api/vacations/upload-image",
        VacationModel.convertToFormData(vacation)
      );
      let name = response.data;
      setFileName(`VIEW ON // ${globals.justUrl}/api/vacations/images/${name}`);

      history.push("/vacations");
      return response.data;
    } catch (err) {
      console.log(err.message);
      setUploadResponse(`File upload failed // FILE - ${uploadFile}
      must end with .doc/.docx/.pdf`);
    }
  }
  async function addVacation(vacation: VacationModel) {
    try {
      const addImgToDBAndGetName: any = await saveImgAndCreateImgName(vacation);
      vacation.imageName = addImgToDBAndGetName;
      const response = await axios.post<VacationModel>(
        globals.justUrl + "/api/vacations/add",
        vacation
      );
      const addedVacation = response.data; // The added product in the backend.
      const response2 = await jwtAxios.get<VacationModel[]>(
        globals.vacationsUrl
      );
      const currentUserId = JSON.parse(globals.isUserLoggedIn()).user_id;
      const followedResponse = await axios.get<FollowModel[]>(
        globals.justUrl +
          `/api/user/vacations-followed-by-user-id/${currentUserId}`
      );
      store.dispatch(vacationsDownloadedAction(response2.data));
      store.dispatch(followingsDownloadedAction(followedResponse.data));
      const test = followedResponse.data.map((p) => p.vacation_id);
      console.log("test", test);
      store.dispatch(followingIdsDownloadedAction(test));
      const rearangedVacationList = [...response2.data];
      console.log(rearangedVacationList);
      const newarrayInclude = rearangedVacationList.filter((p) =>
        test.includes(p.vacation_id)
      );
      const newarrayExclude = rearangedVacationList.filter(
        (p) => !test.includes(p.vacation_id)
      );
      const array3 = newarrayInclude.concat(newarrayExclude);
      store.dispatch(vacationsSortedDownloadedAction(array3));
    } catch (err) {
      alert("Error: " + err);
    }
  }
  return (
    <div className="UploadFile box">
      <h2>Add New Vacation</h2>

      <form
        className="Form"
        onSubmit={handleSubmit(addVacation)}
        encType="multipart/form-data"
        action="http://localhost:3001/api/vacations/upload-iamge">
        <label>Destination: </label> <br />
        <input
          type="text"
          name="destination"
          autoFocus
          ref={register({ required: true, minLength: 2 })}
        />
        {errors.destination?.type === "required" && (
          <span>Missing Destination.</span>
        )}
        {errors.description?.type === "minLength" && (
          <span>Name too short.</span>
        )}
        <br />
        <br />
        <label>Description: </label> <br />
        <textarea
          rows={6}
          cols={40}
          name="description"
          ref={register({ required: true })}
        />
        {errors.description?.type === "required" && (
          <span>Missing Description.</span>
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
          ref={register({ required: true })}
          onChange={(e: any) => {
            setUploadFile(e.target.files[0].name);
          }}
        />
        <br /> <br />
        <label>.jpg .jpeg or .png only</label>
        {errors.image?.type === "required" && <span>Missing File.</span>}
        <br />
        <br />
        <button
          onClick={() => {
            history.push("/vacations");
          }}>
          Back
        </button>
        &nbsp;
        <button type="submit">Add</button>
      </form>
      <pre>{uploadResponse}</pre>
      <br />
      <pre>{fileName}</pre>
    </div>
  );
}

export default UploadVacation;
