class VacationModel {
  public vacation_id: number;
  public description: string;
  public destination: string;
  public date_time_from: string;
  public date_time_until: string;
  public imageName: string;
  public image: FileList;
  public totalFollowers: number;

  public static convertToFormData(vacation: VacationModel): FormData {
    const myFormData = new FormData();
    myFormData.append("image", vacation.image.item(0));
    return myFormData;
  }
}

export default VacationModel;
