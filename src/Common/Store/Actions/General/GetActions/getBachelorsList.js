import { GET_BACHELORS_LIST } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
export const getBachelorsList = (onSuccess, onFailure) => {
//   const email = "user@example.com"; // example
//   const deviceName = "iPhone"; // example

  return {
    type: GET_BACHELORS_LIST,
    payload: {
      requestType: "GET",
      apiUrl: constants.get_bachelors_list + constants.version + "&step=2",
      reduxActionType: "",
      metaData: true,
      body:{},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
