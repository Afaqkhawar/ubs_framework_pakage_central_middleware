import { GET_ADMISSION_DASHBOARD_DATA } from "../../ActionTypes/ApiActionTypes";
 import constants from "../../../../Constants";
 export const getAdmissionDashboardData = (onSuccess, onFailure) => {
 //   const email = "user@example.com"; // example
 //   const deviceName = "iPhone"; // example
 
   return {
     type: GET_ADMISSION_DASHBOARD_DATA,
     payload: {
       requestType: "GET",
       apiUrl: constants.get_admission_dashboard_data+constants.version,
       reduxActionType: "",
       metaData: true,
       body:{},
       header: "application/json",
       onSuccess: onSuccess,
       onFailure: onFailure,
     },
   };
 };