// import FollowingIdModel from "../models/FollowingIdModel";

// Products State - המידע ברמת האפליקציה הקשור למוצרים
export class FollowingIdsState {
  public followingIds: number[]; // undefined חשוב לאתחל מערכים כך שלא יהיה בו
}

// Products Action Type:
export enum FollowingIdsActionType {
  FollowingIdsDownloaded = "followingIdsDownloaded",
}

// Products Action:
export interface FollowingIdAction {
  type: FollowingIdsActionType;
  payload?: any; // מטען שילוח
}

// Products Action Creators:
export function followingIdsDownloadedAction(
  followingIds: number[]
): FollowingIdAction {
  return {
    type: FollowingIdsActionType.FollowingIdsDownloaded,
    payload: followingIds,
  };
}

// Products Reducer:
export function followingIdsReducer(
  currentState: FollowingIdsState = new FollowingIdsState(),
  action: FollowingIdAction
): FollowingIdsState {
  const newState = { ...currentState };

  switch (action.type) {
    case FollowingIdsActionType.FollowingIdsDownloaded: // payload = all products
      newState.followingIds = action.payload;
      break;
  }

  return newState;
}
