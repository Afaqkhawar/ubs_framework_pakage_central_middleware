import { GET_MAIN_ADMIN_DASHBOARD_DATA } from "../../ActionTypes/ApiActionTypes";
 import constants from "../../../../Constants";
 export const getMainAdminDashboardData = (onSuccess, onFailure) => {
 //   const email = "user@example.com"; // example
 //   const deviceName = "iPhone"; // example
 
   return {
     type: GET_MAIN_ADMIN_DASHBOARD_DATA,
     payload: {
       requestType: "GET",
       apiUrl: constants.get_main_admin_dashboard_data+constants.version,
       reduxActionType: "",
       metaData: true,
       body:{},
       header: "application/json",
       onSuccess: onSuccess,
       onFailure: onFailure,
     },
   };
 };