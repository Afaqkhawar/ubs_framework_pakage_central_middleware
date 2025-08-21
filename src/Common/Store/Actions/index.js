// Auto-generated actions barrel file. Re-exports all action creators and action types.

// Action Types
export * from './ActionTypes/ApiActionTypes.js';
export * from './ActionTypes/ReduxActionTypes.js';

// General Actions
export * from './General/sagaCommunicationAction.js';

// Auth Actions
export * from './General/AuthActions/facebookLogin.js';
export * from './General/AuthActions/getOtp.js';
export * from './General/AuthActions/googleLogin.js';
export * from './General/AuthActions/verifyOtp.js';

// GET Actions
export * from './General/GetActions/clearLeaderboard.js';
export * from './General/GetActions/fetchClassActivitiesByDate.js';
export * from './General/GetActions/getAdminDashboardData.js';
export * from './General/GetActions/getApiDocumentation.js';
export * from './General/GetActions/getApiResponse.js';
export * from './General/GetActions/getGroupLeaderboardData.js';
export * from './General/GetActions/getIndividualLeaderboardData.js';
export * from './General/GetActions/getUserDevices.js';
export * from './General/GetActions/getUserDevicesOTP.js';

// POST Actions
export * from './General/PostActions/addUserDevice.js';
export * from './General/PostActions/addUserDevicesOTP.js';

// UPDATE (Redux-only and API) Actions
export * from './General/UpdateActions/reduxUpdateUserData.js';
export * from './General/UpdateActions/updateCurrentRole.js';
export * from './General/UpdateActions/updateLoading.js';
export * from './General/UpdateActions/updateLoginState.js';
export * from './General/UpdateActions/updateUserData.js';

// Misc
export * from './sampleHitApi.js';
