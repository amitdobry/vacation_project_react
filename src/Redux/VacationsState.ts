import VacationModel from "../models/VacationModel";

// Products State - המידע ברמת האפליקציה הקשור למוצרים
export class VacationsState {
  public vacations: VacationModel[] = []; // undefined חשוב לאתחל מערכים כך שלא יהיה בו
}

// Products Action Type:
export enum VacationsActionType {
  VacationsDownloaded = "vacationsDownloaded",
  VacationsSortedDownloaded = "vacationsSortedDownloaded",
  VacationAdded = "VacationAdded",
  VacationUpdated = "VacationUpdated",
  VacationDeleted = "VacationDeleted",
}

// Products Action:
export interface VacationAction {
  type: VacationsActionType;
  payload?: any; // מטען שילוח
}

// Products Action Creators:
export function vacationsDownloadedAction(
  vacations: VacationModel[]
): VacationAction {
  return { type: VacationsActionType.VacationsDownloaded, payload: vacations };
}
export function vacationsSortedDownloadedAction(
  vacationsSorted: VacationModel[]
): VacationAction {
  return {
    type: VacationsActionType.VacationsSortedDownloaded,
    payload: vacationsSorted,
  };
}
export function vacationAddedAction(
  addedVacation: VacationModel
): VacationAction {
  return { type: VacationsActionType.VacationAdded, payload: addedVacation };
}
export function vacationUpdatedAction(
  updatedVacation: VacationModel
): VacationAction {
  return {
    type: VacationsActionType.VacationUpdated,
    payload: updatedVacation,
  };
}
export function VacationDeletedAction(id: number): VacationAction {
  return { type: VacationsActionType.VacationDeleted, payload: id };
}

// Products Reducer:
export function vacationsReducer(
  currentState: VacationsState = new VacationsState(),
  action: VacationAction
): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationsActionType.VacationsDownloaded: // payload = all products
      newState.vacations = action.payload;
      break;

    case VacationsActionType.VacationsSortedDownloaded: // payload = all products
      newState.vacations = action.payload;
      break;

    case VacationsActionType.VacationAdded: // payload = added product
      newState.vacations.push(action.payload);
      break;

    case VacationsActionType.VacationUpdated: // payload = updated product
      const indexToUpdate = newState.vacations.findIndex(
        (p) => p.vacation_id === action.payload.id
      );
      newState.vacations[indexToUpdate] = action.payload;
      break;

    case VacationsActionType.VacationDeleted: // payload = product id to delete
      const indexToDelete = newState.vacations.findIndex(
        (p) => p.vacation_id === action.payload
      );
      newState.vacations.splice(indexToDelete, 1);
      break;
  }

  return newState;
}
