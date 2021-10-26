import FollowModel from "../models/FollowModel";

// Products State - המידע ברמת האפליקציה הקשור למוצרים
export class FollowingsState {
  public followings: FollowModel[] = []; // undefined חשוב לאתחל מערכים כך שלא יהיה בו
}

// Products Action Type:
export enum FollowingsActionType {
  FollowingsDownloaded = "followingsDownloaded",
  FollowingsSortedDownloaded = "followingsSortedDownloaded",
  FollowAdded = "FollowAdded",
  FollowUpdated = "FollowUpdated",
  FollowDeleted = "FollowDeleted",
}

// Products Action:
export interface FollowAction {
  type: FollowingsActionType;
  payload?: any; // מטען שילוח
}

// Products Action Creators:
export function followingsDownloadedAction(
  followings: FollowModel[]
): FollowAction {
  return {
    type: FollowingsActionType.FollowingsDownloaded,
    payload: followings,
  };
}
export function followingsSortedDownloadedAction(
  followingsSorted: FollowModel[]
): FollowAction {
  return {
    type: FollowingsActionType.FollowingsSortedDownloaded,
    payload: followingsSorted,
  };
}
export function followAddedAction(addedFollow: FollowModel): FollowAction {
  return { type: FollowingsActionType.FollowAdded, payload: addedFollow };
}
export function followUpdatedAction(updatedFollow: FollowModel): FollowAction {
  return {
    type: FollowingsActionType.FollowUpdated,
    payload: updatedFollow,
  };
}
export function FollowDeletedAction(id: number): FollowAction {
  return { type: FollowingsActionType.FollowDeleted, payload: id };
}

// Products Reducer:
export function followingsReducer(
  currentState: FollowingsState = new FollowingsState(),
  action: FollowAction
): FollowingsState {
  const newState = { ...currentState };

  switch (action.type) {
    case FollowingsActionType.FollowingsDownloaded: // payload = all products
      newState.followings = action.payload;
      break;

    case FollowingsActionType.FollowingsSortedDownloaded: // payload = all products
      newState.followings = action.payload;
      break;

    case FollowingsActionType.FollowAdded: // payload = added product
      newState.followings.push(action.payload);
      break;

    case FollowingsActionType.FollowUpdated: // payload = updated product
      const indexToUpdate = newState.followings.findIndex(
        (p) => p.follow_id === action.payload.id
      );
      newState.followings[indexToUpdate] = action.payload;
      break;

    case FollowingsActionType.FollowDeleted: // payload = product id to delete
      const indexToDelete = newState.followings.findIndex(
        (p) => p.follow_id === action.payload
      );
      newState.followings.splice(indexToDelete, 1);
      break;
  }

  return newState;
}
