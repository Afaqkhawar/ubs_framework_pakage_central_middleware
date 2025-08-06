import {
  GET_OTP,
  VERIFY_OTP,
  UPDATE_LOADING_STATE,
  UPDATE_CURRENT_USER_ROLE,
  LOGOUT_CURRENT_USER,
  GET_ALL_USERS,
  GET_ALL_ROLES,
  DELETE_USER,
  ADD_USER,
  DELETE_ROLE,
  ADD_ROLE,
  GET_GROUPS,
  GET_ALL_PERMISSIONS,
  GET_ALL_PERMISSIONS_GROUPS,
  UPDATE_USER_DATA,
  GET_ALL_USER_ROLE_PERMISSIONS_GROUPS,
  GET_ADMIN_DASHBOARD_DATA,
  GET_USER_DEVICES,
  ADD_PERMISSION,
  PERMISSION_UPDATE,
  GET_PERMISSION_BY_ID,
  UPDATE_PERMISSION_BY_ID,
  ADMIN_USER_VIEW,
  ADMIN_DESIGNATION_VIEW,
  ADMIN_DEPARTMENTS_VIEW,
  ADMIN_ROLES_DESIGNATION_DEPARTMENT_VIEW,
  ADMIN_USER_ROLE_DESIGNATION_DEPARTMENT_VIEW,
  ADMIN_PERMISSION_GROUPS_VIEW,
  ADMIN_PERMISSION_GROUPS_PERMISSIONS_VIEW,
  ADMIN_USER_ROLE_DESIGNATION_PERMISSIONS_VIEW,
  ADMIN_VIEW_USER,
  GET_INDIVIDUAL_LEADERBOARD_DATA,
  GET_GROUP_LEADERBOARD_DATA,
  GET_USER_DEVICES_OTP,
  ADD_DEVICE,
  ADD_DEVICE_OTP,
  FETCH_CLASS_ACTIVITIES,
  API_DOCUMENTATION,
  GET_TASK_MANAGEMENT_DASHBOARD_DATA,
  GET_GRAPH_DATA,
  GET_TASK_PERFORMANCE_GRAPH_DATA,
  GET_COMMENTS_DATA,
  GET_ADMISSION_DASHBOARD_DATA,
    GET_SCRUTINIZER_DASHBOARD_DATA,
    GET_TEST_SCHEDULER_DASHBOARD_DATA,
    GET_MAIN_ADMIN_DASHBOARD_DATA
    
} from "../../Actions/ActionTypes/ApiActionTypes";
import { takeEvery, takeLatest } from "redux-saga/effects";
import fetchData from "../SagaHelper";
import reduxOnlySagaHelper from "../ReduxOnlySagaHelper";

function* dataSaga() {
  // API Sagas
  yield takeLatest(GET_OTP, fetchData);
  yield takeEvery(VERIFY_OTP, fetchData);
  yield takeEvery(GET_ALL_USERS, fetchData);
  yield takeEvery(GET_ALL_ROLES, fetchData);
  yield takeEvery(DELETE_USER, fetchData);
  yield takeEvery(ADD_USER, fetchData);
  yield takeEvery(DELETE_ROLE, fetchData);
  yield takeEvery(ADD_ROLE, fetchData);
  yield takeEvery(GET_GROUPS, fetchData);
  yield takeEvery(GET_ALL_PERMISSIONS, fetchData);
  yield takeEvery(GET_ALL_PERMISSIONS_GROUPS, fetchData);
  yield takeEvery(UPDATE_USER_DATA, fetchData);
  yield takeEvery(GET_ALL_USER_ROLE_PERMISSIONS_GROUPS, fetchData);
  yield takeEvery(GET_ADMIN_DASHBOARD_DATA, fetchData);
  yield takeEvery(GET_USER_DEVICES, fetchData);
  yield takeEvery(ADD_PERMISSION, fetchData);
  yield takeEvery(PERMISSION_UPDATE, fetchData);
  yield takeEvery(GET_PERMISSION_BY_ID, fetchData);
  yield takeEvery(UPDATE_PERMISSION_BY_ID, fetchData);
  yield takeEvery(ADMIN_USER_VIEW, fetchData);
  yield takeEvery(ADMIN_DESIGNATION_VIEW, fetchData);
  yield takeEvery(ADMIN_DEPARTMENTS_VIEW, fetchData);
  yield takeEvery(ADMIN_ROLES_DESIGNATION_DEPARTMENT_VIEW, fetchData);
  yield takeEvery(ADMIN_USER_ROLE_DESIGNATION_DEPARTMENT_VIEW, fetchData);
  yield takeEvery(ADMIN_PERMISSION_GROUPS_VIEW, fetchData);
  yield takeEvery(ADMIN_PERMISSION_GROUPS_PERMISSIONS_VIEW, fetchData);
  yield takeEvery(ADMIN_USER_ROLE_DESIGNATION_PERMISSIONS_VIEW, fetchData);
  yield takeEvery(ADMIN_USER_VIEW, fetchData);
  yield takeEvery(GET_USER_DEVICES_OTP, fetchData);
  yield takeEvery(ADD_DEVICE, fetchData);
  yield takeEvery(ADD_DEVICE_OTP, fetchData);
  yield takeEvery(FETCH_CLASS_ACTIVITIES, fetchData);
  // yield takeEvery("admin_user_view", fetchData);
  yield takeEvery("admin_user_update", fetchData);
  yield takeEvery("admin_urdd_list", fetchData);
  yield takeEvery("admin_urdd_add", fetchData);
  // Redux Only Sagas
  yield takeEvery(UPDATE_CURRENT_USER_ROLE, reduxOnlySagaHelper);
  yield takeEvery(UPDATE_LOADING_STATE, reduxOnlySagaHelper);
  yield takeEvery(LOGOUT_CURRENT_USER, reduxOnlySagaHelper);
 yield takeEvery(GET_TASK_MANAGEMENT_DASHBOARD_DATA, fetchData);
  yield takeEvery(GET_GRAPH_DATA, fetchData);
  yield takeEvery(  GET_TASK_PERFORMANCE_GRAPH_DATA, fetchData);
  yield takeEvery(GET_INDIVIDUAL_LEADERBOARD_DATA, fetchData);
  yield takeEvery(GET_GROUP_LEADERBOARD_DATA, fetchData);
  yield takeEvery(API_DOCUMENTATION, fetchData);
  yield takeEvery(GET_ADMISSION_DASHBOARD_DATA, fetchData);
  yield takeEvery(GET_SCRUTINIZER_DASHBOARD_DATA, fetchData);
  yield takeEvery(GET_TEST_SCHEDULER_DASHBOARD_DATA, fetchData);
  yield takeEvery(GET_MAIN_ADMIN_DASHBOARD_DATA, fetchData);
}

export default dataSaga;
