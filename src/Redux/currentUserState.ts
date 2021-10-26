// import CurrentUserModel from "../models/CurrentUserModel";

import UserModel from "../models/UserModel";

// Products State - המידע ברמת האפליקציה הקשור למוצרים
export class CurrentUserState {
  public currentUser: UserModel; // undefined חשוב לאתחל מערכים כך שלא יהיה בו
}

// Products Action Type:
export enum CurrentUserActionType {
  CurrentUserDownloaded = "currentUsersDownloaded",
}

// Products Action:
export interface CurrentUserAction {
  type: CurrentUserActionType;
  payload?: any; // מטען שילוח
}

// Products Action Creators:
export function currentUsersDownloadedAction(
  currentUser: UserModel
): CurrentUserAction {
  return {
    type: CurrentUserActionType.CurrentUserDownloaded,
    payload: currentUser,
  };
}

// Products Reducer:
export function currentUsersReducer(
  currentState: CurrentUserState = new CurrentUserState(),
  action: CurrentUserAction
): CurrentUserState {
  const newState = { ...currentState };

  switch (action.type) {
    case CurrentUserActionType.CurrentUserDownloaded: // payload = all products
      newState.currentUser = action.payload;
      break;
  }

  return newState;
}
