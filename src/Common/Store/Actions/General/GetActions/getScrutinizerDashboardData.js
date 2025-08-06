import { GET_SCRUTINIZER_DASHBOARD_DATA } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
export const getScrutinizerDashboardData = (onSuccess, onFailure) => {
//   const email = "user@example.com"; // example
//   const deviceName = "iPhone"; // example

  return {
    type: GET_SCRUTINIZER_DASHBOARD_DATA,
    payload: {
      requestType: "GET",
      apiUrl: constants.get_scrutinizer_dashboard_data+constants.version,
      reduxActionType: "",
      metaData: true,
      body:{},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
