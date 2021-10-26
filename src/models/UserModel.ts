class UserModel {
  public user_id: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public token: string;

  public static convertToFormData(user: UserModel): FormData {
    const myFormData = new FormData();
    myFormData.append("username", user.username);
    myFormData.append("password", user.password);
    return myFormData;
  }
}

export default UserModel;
