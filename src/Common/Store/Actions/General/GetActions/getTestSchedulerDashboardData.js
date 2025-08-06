import { GET_TEST_SCHEDULER_DASHBOARD_DATA } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
export const getTestSchedulerDashboardData = (onSuccess, onFailure) => {
//   const email = "user@example.com"; // example
//   const deviceName = "iPhone"; // example

  return {
    type: GET_TEST_SCHEDULER_DASHBOARD_DATA,
    payload: {
      requestType: "GET",
      apiUrl: constants.get_test_scheduler_dashboard_data+constants.version,
      reduxActionType: "",
      metaData: true,
      body:{},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
