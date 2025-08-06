import { GET_TASK_PERFORMANCE_GRAPH_DATA } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
export const getGraphData = (onSuccess, onFailure) => {
//   const email = "user@example.com"; // example
//   const deviceName = "iPhone"; // example

  return {
    type: GET_TASK_PERFORMANCE_GRAPH_DATA,
    payload: {
      requestType: "GET",
      apiUrl: constants.get_task_performance_graph_data,
      reduxActionType: "",
      metaData: true,
      body:{},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
