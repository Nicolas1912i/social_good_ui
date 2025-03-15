import {getUploadStatus} from "@/services/api-service";
import {ActivityStatus} from "@/enums/activity-status-enum";
import {ProcessesEnum} from "@/enums/processes-enum";
import {Dispatch, SetStateAction} from "react";

export async function uploadStatus(accessToken: string,
                             activityId: string,
                             setShowAlert: Dispatch<SetStateAction<boolean>>,
                             setAlertTitle: Dispatch<SetStateAction<string>>,
                             setAlertMessage: Dispatch<SetStateAction<string>>,
                             setAlertProcess: Dispatch<SetStateAction<ProcessesEnum>>) {
  return await getUploadStatus(accessToken, activityId)
    .then((response) => response.json()
      .then((data) => {
        const activityStatus = data.status as ActivityStatus;
        switch (activityStatus) {
          case ActivityStatus.cancelled:
          case ActivityStatus.failed:
          case ActivityStatus.timed_out: {
            setShowAlert(true);
            setAlertTitle("Error while importing CSV data!");
            setAlertMessage("The server process found an error while importing CSV data, please try again later");
            setAlertProcess(ProcessesEnum.ImportErrorNotification);
            break;
          }
          case ActivityStatus.completed: {
            setShowAlert(true);
            setAlertTitle("Successfully imported CSV data!");
            setAlertMessage("Successfully imported CSV data into constant contact!");
            setAlertProcess(ProcessesEnum.ImportFinishedNotification);
            break;
          }
          default:
            break;
        }

        return activityStatus;
      }))
}