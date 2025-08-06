import { GET_TASK_MANAGEMENT_DASHBOARD_DATA } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
export const getTaskManagementDashBoardData= (onSuccess, onFailure) => {
//   const email = "user@example.com"; // example
//   const deviceName = "iPhone"; // example
console.log("Hello",constants.get_task_management_dashboard_data+constants.version)
  return {
    type: GET_TASK_MANAGEMENT_DASHBOARD_DATA,
    payload: {
      requestType: "GET",
      apiUrl: constants.get_task_management_dashboard_data+constants.version,
      reduxActionType: "",
      metaData: true,
      body:{},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
