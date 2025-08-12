var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Common/Store/Actions/ActionTypes/ReduxActionTypes.js
var REDUX_UPDATE_CURRENT_USER_ROLE, REDUX_LOGOUT_CURRENT_USER, REDUX_UPDATE_CURRENT_USER, REDUX_UPDATE_LOADING_STATE, REDUX_UPDATE_USER_DATA, REDUX_API_DOCUMENTATION;
var init_ReduxActionTypes = __esm({
  "src/Common/Store/Actions/ActionTypes/ReduxActionTypes.js"() {
    REDUX_UPDATE_CURRENT_USER_ROLE = "REDUX_UPDATE_CURRENT_USER_ROLE";
    REDUX_LOGOUT_CURRENT_USER = "REDUX_LOGOUT_CURRENT_USER";
    REDUX_UPDATE_CURRENT_USER = "REDUX_UPDATE_CURRENT_USER";
    REDUX_UPDATE_LOADING_STATE = "REDUX_UPDATE_LOADING_STATE";
    REDUX_UPDATE_USER_DATA = "REDUX_UPDATE_USER_DATA";
    REDUX_API_DOCUMENTATION = "REDUX_API_DOCUMENTATION";
  }
});

// src/Common/Store/Reducers/mainReducer.js
var initialState, mainReducer, mainReducer_default;
var init_mainReducer = __esm({
  "src/Common/Store/Reducers/mainReducer.js"() {
    init_ReduxActionTypes();
    initialState = {
      accesstoken: null,
      currentUser: null,
      currentUserDesignationsRoles: [],
      currentUserPermissions: [],
      userPermissions: [],
      userDepartments: [],
      userDesignation: [],
      userDevices: [],
      allUserPermissions: {},
      userSelectedRole: {},
      apiDocumentationData: [],
      userRoles: [],
      isLoading: false
    };
    mainReducer = (state = initialState, action) => {
      var _a, _b, _c, _d;
      switch (action == null ? void 0 : action.type) {
        case REDUX_UPDATE_CURRENT_USER:
          return __spreadProps(__spreadValues({}, state), {
            currentUser: action.payload.otpVerif.user,
            accesstoken: action.payload.otpVerif.access_token,
            currentUserDesignationsRoles: action.payload.otpVerif.user_roles_designations_departments,
            userSelectedRole: ((_b = (_a = action.payload.otpVerif) == null ? void 0 : _a.user_roles_designations_departments) == null ? void 0 : _b.length) > 0 ? action.payload.otpVerif.user_roles_designations_departments[0] : {},
            userPermissions: action.payload.otpVerif.collective_user_permissions,
            currentUserPermissions: ((_c = action.payload.otpVerif.user_roles_designations_departments) == null ? void 0 : _c.length) > 0 ? action.payload.otpVerif.user_permissions[action.payload.otpVerif.user_roles_designations_departments[0].user_role_designation_department_id] : [],
            allUserPermissions: action.payload.otpVerif.user_permissions,
            userDepartments: action.payload.otpVerif.user_departments,
            userDesignation: action.payload.otpVerif.user_designations,
            userRoles: action.payload.otpVerif.user_roles,
            userDevices: action.payload.otpVerif.user_devices
          });
        case REDUX_UPDATE_USER_DATA:
          const updatedUser = __spreadValues(__spreadValues({}, state.currentUser), action.requestParams);
          return __spreadProps(__spreadValues({}, state), {
            // Retain the rest of the state
            currentUser: updatedUser
            // Update the currentUser object
          });
        case REDUX_LOGOUT_CURRENT_USER:
          return initialState;
        case REDUX_UPDATE_CURRENT_USER_ROLE: {
          return __spreadProps(__spreadValues({}, state), {
            userSelectedRole: action.payload,
            currentUserPermissions: state.allUserPermissions[(_d = action.payload) == null ? void 0 : _d.user_role_designation_department_id]
          });
        }
        case REDUX_UPDATE_LOADING_STATE:
          return __spreadProps(__spreadValues({}, state), {
            isLoading: action.payload
          });
        case REDUX_API_DOCUMENTATION:
          return __spreadProps(__spreadValues({}, state), {
            isLoading: false,
            apiDocumentationData: action.payload.payload
          });
        default:
          return state;
      }
    };
    mainReducer_default = mainReducer;
  }
});

// src/Common/Store/Reducers/index.js
var import_redux, rootReducer, Reducers_default;
var init_Reducers = __esm({
  "src/Common/Store/Reducers/index.js"() {
    import_redux = require("redux");
    init_mainReducer();
    rootReducer = (0, import_redux.combineReducers)({
      main: mainReducer_default
    });
    Reducers_default = rootReducer;
  }
});

// src/Common/Store/Actions/ActionTypes/ApiActionTypes.js
var GET_OTP, VERIFY_OTP, UPDATE_CURRENT_USER_ROLE, UPDATE_LOADING_STATE, LOGOUT_CURRENT_USER, GET_ALL_USERS, GET_ALL_ROLES, DELETE_USER, ADD_USER, DELETE_ROLE, ADD_ROLE, GET_GROUPS, GET_ALL_PERMISSIONS, GET_ALL_PERMISSIONS_GROUPS, UPDATE_USER_DATA, GET_ALL_USER_ROLE_PERMISSIONS_GROUPS, GET_ADMIN_DASHBOARD_DATA, GET_USER_DEVICES, ADD_PERMISSION, PERMISSION_UPDATE, GET_PERMISSION_BY_ID, ADMIN_USER_VIEW, ADMIN_DESIGNATION_VIEW, ADMIN_DEPARTMENTS_VIEW, UPDATE_PERMISSION_BY_ID, ADMIN_ROLES_DESIGNATION_DEPARTMENT_VIEW, ADMIN_USER_ROLE_DESIGNATION_DEPARTMENT_VIEW, ADMIN_PERMISSION_GROUPS_VIEW, ADMIN_PERMISSION_GROUPS_PERMISSIONS_VIEW, ADMIN_USER_ROLE_DESIGNATION_PERMISSIONS_VIEW, GET_INDIVIDUAL_LEADERBOARD_DATA, GET_GROUP_LEADERBOARD_DATA, GET_USER_DEVICES_OTP, ADD_DEVICE, ADD_DEVICE_OTP, FETCH_CLASS_ACTIVITIES, API_DOCUMENTATION;
var init_ApiActionTypes = __esm({
  "src/Common/Store/Actions/ActionTypes/ApiActionTypes.js"() {
    GET_OTP = "GET_OTP";
    VERIFY_OTP = "VERIFY_OTP";
    UPDATE_CURRENT_USER_ROLE = "UPDATE_CURRENT_USER_ROLE";
    UPDATE_LOADING_STATE = "UPDATE_LOADING_STATE";
    LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
    GET_ALL_USERS = "GET_ALL_USERS";
    GET_ALL_ROLES = "GET_ALL_ROLES";
    DELETE_USER = "DELETE_USER";
    ADD_USER = "ADD_USER";
    DELETE_ROLE = "DELETE_ROLE";
    ADD_ROLE = "ADD_ROLE";
    GET_GROUPS = "GET_GROUPS";
    GET_ALL_PERMISSIONS = "GET_ALL_PERMISSIONS";
    GET_ALL_PERMISSIONS_GROUPS = "GET_ALL_PERMISSIONS_GROUPS";
    UPDATE_USER_DATA = "UPDATE_USER_DATA";
    GET_ALL_USER_ROLE_PERMISSIONS_GROUPS = "GET_ALL_USER_ROLE_PERMISSIONS_GROUPS";
    GET_ADMIN_DASHBOARD_DATA = "GET_ADMIN_DASHBOARD_DATA";
    GET_USER_DEVICES = "GET_USER_DEVICES";
    ADD_PERMISSION = "ADD_PERMISSION";
    PERMISSION_UPDATE = "PERMISSION_UPDATE";
    GET_PERMISSION_BY_ID = "GET_PERMISSION_BY_ID";
    ADMIN_USER_VIEW = "admin_user_view";
    ADMIN_DESIGNATION_VIEW = "admin_designation_view";
    ADMIN_DEPARTMENTS_VIEW = "admin_departments_view";
    UPDATE_PERMISSION_BY_ID = "UPDATE_PERMISSION_BY_ID";
    ADMIN_ROLES_DESIGNATION_DEPARTMENT_VIEW = "admin_rolesdesignationsdepartment_view";
    ADMIN_USER_ROLE_DESIGNATION_DEPARTMENT_VIEW = "admin_urdd_view";
    ADMIN_PERMISSION_GROUPS_VIEW = "admin_permission_groups_view";
    ADMIN_PERMISSION_GROUPS_PERMISSIONS_VIEW = "admin_pgp_view";
    ADMIN_USER_ROLE_DESIGNATION_PERMISSIONS_VIEW = "admin_user_role_designation_permissions_view";
    GET_INDIVIDUAL_LEADERBOARD_DATA = "GET_INDIVIDUAL_LEADERBOARD_DATA";
    GET_GROUP_LEADERBOARD_DATA = "GET_GROUP_LEADERBOARD_DATA";
    GET_USER_DEVICES_OTP = "GET_USER_DEVICES_OTP";
    ADD_DEVICE = "ADD_DEVICE";
    ADD_DEVICE_OTP = "ADD_DEVICE_OTP";
    FETCH_CLASS_ACTIVITIES = "FETCH_CLASS_ACTIVITIES";
    API_DOCUMENTATION = "API_DOCUMENTATION";
  }
});

// src/Common/Store/Sagas/encryption.js
var require_encryption = __commonJS({
  "src/Common/Store/Sagas/encryption.js"(exports2, module2) {
    var CryptoJS = require("crypto-js");
    var adjustKeyLength = (key, targetLength = 32) => {
      if (key.length > targetLength) {
        return key.slice(0, targetLength);
      } else if (key.length < targetLength) {
        return key.padEnd(targetLength, "0");
      }
      return key;
    };
    var encryptObject2 = (object, key) => {
      const adjustedKey = adjustKeyLength(key);
      const encryptionKey = CryptoJS.enc.Utf8.parse(adjustedKey);
      const stringifiedObject = JSON.stringify(object);
      const encrypted = CryptoJS.AES.encrypt(stringifiedObject, encryptionKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
      return encrypted;
    };
    var decryptObject2 = (encryptedObject, key) => {
      const adjustedKey = adjustKeyLength(key);
      const encryptionKey = CryptoJS.enc.Utf8.parse(adjustedKey);
      const decrypted = CryptoJS.AES.decrypt(encryptedObject, encryptionKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      const decryptedObject = JSON.parse(decryptedString);
      return decryptedObject;
    };
    module2.exports = { encryptObject: encryptObject2, decryptObject: decryptObject2 };
  }
});

// src/Common/Constants.js
var constants, Constants_default;
var init_Constants = __esm({
  "src/Common/Constants.js"() {
    constants = {
      // base_url: 'http://10.0.0.68:3000/api',            //self
      base_url: "http://localhost:3000/api",
      //local
      // base_url: 'http://10.0.0.14:3000/api',      //Aashir
      // base_url: "http://10.0.1.20:3000/api",     //Noor
      // base_url:"http://10.0.0.14:3000/api", //Hamad
      step1: "&step=1",
      step2: "&step=2",
      version: "?version=1.0",
      all: "/all",
      list: "/list",
      update: "/update",
      add: "/add",
      delete: "/delete",
      dropDown: "/dropdown",
      groups: "/groups",
      errors: "/errors",
      get: "/get",
      email: "/email",
      log: "/log",
      api_documentation: "/documentation",
      get_otp: "/login?version=1.0&step=1",
      verify_otp: "/login?version=1.0&step=2",
      users_role_info: "/users_role_info",
      //login
      login: "/login",
      info: "/info",
      crud: "/crud",
      // Users
      users: "/users",
      groups: "/groups",
      // Admin Dashboard
      get_admin_dashboard_data: "/admin/dashboard",
      // User Devices
      user_devices: "devices",
      // Attachments
      attachments: "/attachments",
      // Chatting Group Members
      chatting_group_members: "/chatting_group_members",
      // Chatting Groups
      chatting_groups: "/chatting_groups",
      // Departments
      departments: "/departments",
      // Designations
      designations: "/designations",
      // Messages
      messages: "/messages",
      // Notifications
      notifications: "/notifications",
      // Permission Groups
      permission_groups: "/permission_groups",
      // Permission Groups Permissions
      permission_groups_permissions: "/permission_groups_permissions",
      // Permissions
      permissions: "/permissions",
      // Platform Versions
      platform_versions: "/platform_versions",
      // Platforms
      platforms: "/platforms",
      // Roles
      roles: "/roles",
      // Roles Designations Department
      roles_designations_department: "/roles_designations_department",
      // Task Flow Steps
      task_flow_steps: "/task_flow_steps",
      // Task Flows
      task_flows: "/task_flows",
      // Task History
      task_history: "/task_history",
      // Tasks
      tasks: "/tasks",
      // Templates
      templates: "/templates",
      // User Device Notifications
      user_device_notifications: "/user_device_notifications",
      // User Devices
      luser_devices: "/user_devices",
      // User Role Designation Permissions
      user_role_designation_permissions: "/user_role_designation_permissions",
      // User Roles Designations Department
      user_roles_designations_department: "/user_roles_designations_department"
    };
    Constants_default = constants;
  }
});

// src/Common/Store/Sagas/SagaHelper.js
function* fetchData(action, queryParameter, queryParameterId) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
  console.log(
    "********* SAGHELPER ACTION: ********",
    action,
    `
*******   [queryParameter: ${queryParameter} ]
******** [queryParameterId:${queryParameterId} ]********
`
  );
  const updated_action = (action == null ? void 0 : action.payload) || action;
  try {
    console.log("ENV CHECK", process.env);
    const all_state = yield (0, import_effects.select)((state) => state.main);
    if (!((_a = process.env) == null ? void 0 : _a.REACT_APP_PLATFORM_KEY) || !((_b = process.env) == null ? void 0 : _b.REACT_APP_SECRET_KEY)) {
      console.log("Encryption Failed");
      updated_action == null ? void 0 : updated_action.onFailure({
        status: 401,
        frameworkStatusCode: "E44",
        message: "Encryption Failed [ Env not found ]."
      });
      return;
    }
    const currentUser = yield (0, import_effects.select)((state) => state);
    const { userSelectedRole } = currentUser.main;
    console.log("currentUser", currentUser, userSelectedRole);
    const nextPart = updated_action == null ? void 0 : updated_action.apiUrl;
    const useBaseURL = (updated_action == null ? void 0 : updated_action.useBaseURL) == false ? false : true;
    const isFile = (updated_action == null ? void 0 : updated_action.isFile) == true ? true : false;
    console.log("isFile: ", isFile, updated_action == null ? void 0 : updated_action.isFile);
    const isEncrypted = (updated_action == null ? void 0 : updated_action.isEncrypted) == false ? false : true;
    console.log("isEncrypted: ", isEncrypted);
    let completeUrl = useBaseURL ? ((_c = Constants_default) == null ? void 0 : _c.base_url) + nextPart : nextPart;
    if (queryParameter && queryParameter !== "") {
      completeUrl += queryParameter;
    }
    if (queryParameterId && queryParameterId !== "") {
      completeUrl += "&id=" + queryParameterId;
    }
    const hasMetaData = updated_action == null ? void 0 : updated_action.metaData;
    const isFormData = updated_action == null ? void 0 : updated_action.formData;
    const accessToken = (all_state == null ? void 0 : all_state.accesstoken) || null;
    const request = {
      headers: __spreadProps(__spreadValues({}, isFormData ? {} : { "Content-Type": "application/json" }), {
        accesstoken: accessToken
      }),
      method: (updated_action == null ? void 0 : updated_action.requestType) || "GET"
    };
    if (hasMetaData && accessToken === null) {
      console.warn(
        "metaData is true but access token is not present in header"
      );
    }
    if ((updated_action == null ? void 0 : updated_action.body) && (updated_action == null ? void 0 : updated_action.requestType) !== "GET") {
      if ((updated_action == null ? void 0 : updated_action.requestType) === "DELETE") {
        if (isEncrypted) {
          const deleteEncryption = (0, import_encryption.encryptObject)(
            {
              Id: `${((_d = updated_action == null ? void 0 : updated_action.body) == null ? void 0 : _d.Id) || null}`,
              actionPerformerURDD: userSelectedRole == null ? void 0 : userSelectedRole.user_role_designation_department_id
            },
            (_e = process.env) == null ? void 0 : _e.REACT_APP_PLATFORM_KEY
          );
          const secondEncryption = {
            reqData: deleteEncryption,
            encryptionDetails: {
              PlatformName: (_f = process.env) == null ? void 0 : _f.REACT_APP_PLATFORM_NAME,
              PlatformVersion: (_g = process.env) == null ? void 0 : _g.REACT_APP_PLATFORM_VERSION
            }
          };
          request.headers.encryptedrequest = (0, import_encryption.encryptObject)(
            secondEncryption,
            (_h = process.env) == null ? void 0 : _h.REACT_APP_SECRET_KEY
          );
        } else {
          request.headers.reqData = {
            Id: `${((_i = action == null ? void 0 : action.body) == null ? void 0 : _i.Id) || null}`,
            actionPerformerURDD: userSelectedRole == null ? void 0 : userSelectedRole.user_role_designation_department_id
          };
        }
      } else {
        if (isEncrypted) {
          request.body = {
            encryptedRequest: {}
          };
          const finalActionBody = !isFormData ? __spreadProps(__spreadValues({}, (updated_action == null ? void 0 : updated_action.body) || null), {
            // Spread existing body or payload body
            actionPerformerURDD: userSelectedRole == null ? void 0 : userSelectedRole.user_role_designation_department_id
            // Add actionPerformerURDD
          }) : updated_action == null ? void 0 : updated_action.body;
          console.log(
            "***************** Final Updated Body ***************** ",
            finalActionBody
          );
          const firstEncryption = (0, import_encryption.encryptObject)(
            finalActionBody,
            (_j = process.env) == null ? void 0 : _j.REACT_APP_PLATFORM_KEY
          );
          const secondEncryption = {
            reqData: firstEncryption,
            encryptionDetails: {
              PlatformName: (_k = process.env) == null ? void 0 : _k.REACT_APP_PLATFORM_NAME,
              PlatformVersion: (_l = process.env) == null ? void 0 : _l.REACT_APP_PLATFORM_VERSION
            }
          };
          request.body.encryptedRequest = (0, import_encryption.encryptObject)(
            secondEncryption,
            (_m = process.env) == null ? void 0 : _m.REACT_APP_SECRET_KEY
          );
          request.body = JSON.stringify(request == null ? void 0 : request.body);
        } else {
          if (!isFormData) {
            request.body = JSON.stringify(__spreadProps(__spreadValues({}, (updated_action == null ? void 0 : updated_action.body) || {}), {
              // Ensure an empty object if undefined
              actionPerformerURDD: userSelectedRole == null ? void 0 : userSelectedRole.user_role_designation_department_id
            }));
          } else {
            request.body = updated_action == null ? void 0 : updated_action.body;
          }
        }
      }
    } else {
      if (isEncrypted) {
        request.headers = __spreadProps(__spreadValues({}, request == null ? void 0 : request.headers), {
          encryptedRequest: {}
        });
        const finalActionBody = !isFormData ? __spreadProps(__spreadValues({}, (updated_action == null ? void 0 : updated_action.body) || {}), {
          // Ensure an empty object if undefined
          actionPerformerURDD: userSelectedRole == null ? void 0 : userSelectedRole.user_role_designation_department_id
        }) : updated_action == null ? void 0 : updated_action.body;
        console.log(
          "***************** Final Updated Body ***************** ",
          finalActionBody
        );
        const firstEncryption = (0, import_encryption.encryptObject)(
          finalActionBody,
          (_n = process.env) == null ? void 0 : _n.REACT_APP_PLATFORM_KEY
        );
        const secondEncryption = {
          reqData: firstEncryption,
          encryptionDetails: {
            PlatformName: (_o = process.env) == null ? void 0 : _o.REACT_APP_PLATFORM_NAME,
            PlatformVersion: (_p = process.env) == null ? void 0 : _p.REACT_APP_PLATFORM_VERSION
          }
        };
        request.headers.encryptedRequest = (0, import_encryption.encryptObject)(
          secondEncryption,
          (_q = process.env) == null ? void 0 : _q.REACT_APP_SECRET_KEY
        );
      } else {
        request.headers = !isFormData ? __spreadProps(__spreadValues({}, request == null ? void 0 : request.headers), {
          reqData: {
            actionPerformerURDD: userSelectedRole == null ? void 0 : userSelectedRole.user_role_designation_department_id
          }
        }) : request == null ? void 0 : request.headers;
      }
    }
    console.log("Complete URL", completeUrl);
    if (completeUrl !== "") {
      console.log(
        "***************** API_Request_After_Encryption *************\n",
        request
      );
      const response = yield fetch(completeUrl, request).catch((err) => {
        console.log(`Network error: ${err == null ? void 0 : err.message}`);
        return;
      });
      let responseData = !isFile ? yield response.json() : response;
      console.log("responseData::::", responseData);
      if (responseData.status !== 200) {
        const frameworkErrorMessage = getFrameworkErrorMessage(
          responseData.status,
          responseData.scc
        );
        if ((updated_action == null ? void 0 : updated_action.onFailure) && typeof (updated_action == null ? void 0 : updated_action.onFailure) === "function") {
          updated_action == null ? void 0 : updated_action.onFailure({
            status: responseData == null ? void 0 : responseData.status,
            frameworkStatusCode: responseData == null ? void 0 : responseData.scc,
            message: frameworkErrorMessage || (responseData == null ? void 0 : responseData.message)
          });
        }
        return;
      } else {
        if ((responseData == null ? void 0 : responseData.payload) && isEncrypted) {
          responseData = (0, import_encryption.decryptObject)(
            responseData == null ? void 0 : responseData.payload,
            (_r = process.env) == null ? void 0 : _r.REACT_APP_PLATFORM_KEY
          );
        } else {
          responseData = !isFile ? responseData == null ? void 0 : responseData.payload : response;
        }
        if (updated_action == null ? void 0 : updated_action.reduxActionType) {
          yield (0, import_effects.put)({
            type: updated_action == null ? void 0 : updated_action.reduxActionType,
            payload: responseData,
            requestParams: updated_action == null ? void 0 : updated_action.body
          });
        }
        if (typeof (updated_action == null ? void 0 : updated_action.onSuccess) === "function") {
          console.log(
            "***************** API_Response *************\n ",
            completeUrl,
            responseData,
            isFile
          );
          updated_action == null ? void 0 : updated_action.onSuccess(responseData);
        }
      }
    }
  } catch (error) {
    console.error(`******** Error in fetchData ******* : ${error == null ? void 0 : error.message}`);
    if ((updated_action == null ? void 0 : updated_action.onFailure) && typeof (updated_action == null ? void 0 : updated_action.onFailure) === "function") {
      updated_action == null ? void 0 : updated_action.onFailure({ message: error.message });
    }
  }
}
var import_effects, import_encryption, getFrameworkErrorMessage, SagaHelper_default;
var init_SagaHelper = __esm({
  "src/Common/Store/Sagas/SagaHelper.js"() {
    import_effects = require("redux-saga/effects");
    import_encryption = __toESM(require_encryption());
    init_Constants();
    getFrameworkErrorMessage = (statusCode, frameworkStatusCode) => {
      const errorMessages = {
        // Parameter Errors
        E10: "Parameter name does not exist.",
        E11: "Parameter validation failure.",
        E12: "Parameter missing in source.",
        E13: "Required parameter missing.",
        E14: "No request body found.",
        // API Info Errors
        E20: "Invalid or missing query nature.",
        E21: "Invalid or missing query payload.",
        E22: "Callback function error.",
        E23: "Callback function missing.",
        E24: "Payload function error.",
        E25: "Payload function missing.",
        // Request Metadata Errors
        E30: "Invalid or missing request method.",
        E31: "Invalid or missing permission.",
        E32: "Invalid page size value.",
        // Middleware Errors
        E40: "Invalid or expired token.",
        E41: "Permission validation failure.",
        E42: "OTP verification failure.",
        E43: "Object resolver failure.",
        E44: "Database connection failed.",
        // API Errors
        E50: "API version does not exist.",
        E51: "API object does not exist.",
        E52: "Mismatch request method."
      };
      return errorMessages[frameworkStatusCode] || `Unexpected error (Code: ${frameworkStatusCode})`;
    };
    SagaHelper_default = fetchData;
  }
});

// src/Common/Store/Sagas/ReduxOnlySagaHelper.js
function* fetchData2(action) {
  yield (0, import_effects2.put)({ type: action.payload.reduxActionType, payload: action.payload.data });
}
var import_effects2, ReduxOnlySagaHelper_default;
var init_ReduxOnlySagaHelper = __esm({
  "src/Common/Store/Sagas/ReduxOnlySagaHelper.js"() {
    import_effects2 = require("redux-saga/effects");
    ReduxOnlySagaHelper_default = fetchData2;
  }
});

// src/Common/Store/Sagas/general/generalSagas.js
function* dataSaga() {
  yield (0, import_effects3.takeEvery)(GET_OTP, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(VERIFY_OTP, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_ALL_USERS, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_ALL_ROLES, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(DELETE_USER, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADD_USER, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(DELETE_ROLE, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADD_ROLE, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_GROUPS, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_ALL_PERMISSIONS, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_ALL_PERMISSIONS_GROUPS, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(UPDATE_USER_DATA, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_ALL_USER_ROLE_PERMISSIONS_GROUPS, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_ADMIN_DASHBOARD_DATA, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_USER_DEVICES, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADD_PERMISSION, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(PERMISSION_UPDATE, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_PERMISSION_BY_ID, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(UPDATE_PERMISSION_BY_ID, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADMIN_USER_VIEW, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADMIN_DESIGNATION_VIEW, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADMIN_DEPARTMENTS_VIEW, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADMIN_ROLES_DESIGNATION_DEPARTMENT_VIEW, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADMIN_USER_ROLE_DESIGNATION_DEPARTMENT_VIEW, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADMIN_PERMISSION_GROUPS_VIEW, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADMIN_PERMISSION_GROUPS_PERMISSIONS_VIEW, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADMIN_USER_ROLE_DESIGNATION_PERMISSIONS_VIEW, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADMIN_USER_VIEW, SagaHelper_default);
  yield (0, import_effects3.takeEvery)("admin_user_update", SagaHelper_default);
  yield (0, import_effects3.takeEvery)("admin_urdd_list", SagaHelper_default);
  yield (0, import_effects3.takeEvery)("admin_urdd_add", SagaHelper_default);
  yield (0, import_effects3.takeEvery)(UPDATE_CURRENT_USER_ROLE, ReduxOnlySagaHelper_default);
  yield (0, import_effects3.takeEvery)(UPDATE_LOADING_STATE, ReduxOnlySagaHelper_default);
  yield (0, import_effects3.takeEvery)(LOGOUT_CURRENT_USER, ReduxOnlySagaHelper_default);
  yield (0, import_effects3.takeEvery)(API_DOCUMENTATION, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_INDIVIDUAL_LEADERBOARD_DATA, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_GROUP_LEADERBOARD_DATA, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(GET_USER_DEVICES_OTP, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADD_DEVICE, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(ADD_DEVICE_OTP, SagaHelper_default);
  yield (0, import_effects3.takeEvery)(FETCH_CLASS_ACTIVITIES, SagaHelper_default);
}
var import_effects3, generalSagas_default;
var init_generalSagas = __esm({
  "src/Common/Store/Sagas/general/generalSagas.js"() {
    init_ApiActionTypes();
    import_effects3 = require("redux-saga/effects");
    init_SagaHelper();
    init_ReduxOnlySagaHelper();
    generalSagas_default = dataSaga;
  }
});

// src/Common/Store/Sagas/rootSaga.js
function* rootSaga() {
  yield (0, import_effects4.all)([
    generalSagas_default()
  ]);
}
var import_effects4, rootSaga_default;
var init_rootSaga = __esm({
  "src/Common/Store/Sagas/rootSaga.js"() {
    import_effects4 = require("redux-saga/effects");
    init_generalSagas();
    rootSaga_default = rootSaga;
  }
});

// src/Common/Store/configureStore.js
var import_redux2, import_redux_persist, import_storage, import_redux_saga, persistConfig, persistedReducer, sagaMiddleware, composeEnhancers, store, persistor;
var init_configureStore = __esm({
  "src/Common/Store/configureStore.js"() {
    import_redux2 = require("redux");
    import_redux_persist = require("redux-persist");
    import_storage = __toESM(require("redux-persist/lib/storage/index"));
    import_redux_saga = __toESM(require("redux-saga"));
    init_Reducers();
    init_rootSaga();
    persistConfig = {
      key: "root",
      storage: import_storage.default
    };
    persistedReducer = (0, import_redux_persist.persistReducer)(persistConfig, Reducers_default);
    sagaMiddleware = (0, import_redux_saga.default)();
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || import_redux2.compose;
    store = (0, import_redux2.createStore)(
      persistedReducer,
      composeEnhancers((0, import_redux2.applyMiddleware)(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga_default);
    persistor = (0, import_redux_persist.persistStore)(store);
  }
});

// src/Common/getServerResponse.js
var getServerResponse_exports = {};
__export(getServerResponse_exports, {
  getServerResponse: () => getServerResponse
});
var import_redux_saga2, getServerResponse;
var init_getServerResponse = __esm({
  "src/Common/getServerResponse.js"() {
    init_configureStore();
    import_redux_saga2 = require("redux-saga");
    init_SagaHelper();
    getServerResponse = async (serverCommunication, queryParam = null, qparam = null, setIsLoading = null) => {
      if (!(serverCommunication == null ? void 0 : serverCommunication.apiUrl)) {
        console.error("Error", "No API URL provided");
        return;
      }
      try {
        const response = await (0, import_redux_saga2.runSaga)(
          {
            dispatch: () => {
            },
            // We don't need to dispatch
            getState: () => store.getState()
            // Provide access to Redux state
          },
          SagaHelper_default,
          serverCommunication,
          queryParam,
          qparam
        ).toPromise();
        return response;
      } catch (error) {
        console.error("Error in Server Response:", error);
      } finally {
        setIsLoading && setIsLoading(false);
      }
    };
  }
});

// src/Common/serverCommunicationHelper.js
var serverCommunicationHelper_exports = {};
__export(serverCommunicationHelper_exports, {
  default: () => serverCommunicationHelper
});
function serverCommunicationHelper({
  apiActionType = "",
  permission = false,
  requestType = "GET",
  apiUrl,
  isEncrypted = true,
  metaData = true,
  useBaseURL = true,
  formData = false,
  body = {},
  reduxActionType = "",
  isFile = false,
  onSuccess = (res) => console.log("Success:", res),
  onFailure = (err) => console.log("Error:", err.message)
}) {
  return {
    apiActionType,
    permission,
    requestType,
    apiUrl,
    metaData,
    body,
    formData,
    useBaseURL,
    isEncrypted,
    reduxActionType,
    isFile,
    onSuccess,
    onFailure
  };
}
var init_serverCommunicationHelper = __esm({
  "src/Common/serverCommunicationHelper.js"() {
  }
});

// src/Common/ToastUtils.js
var ToastUtils_exports = {};
__export(ToastUtils_exports, {
  showErrorToast: () => showErrorToast,
  showInfoToast: () => showInfoToast,
  showSuccessToast: () => showSuccessToast,
  showToast: () => showToast,
  showWarningToast: () => showWarningToast
});
var import_react_toastify, import_ReactToastify, toastConfig, showSuccessToast, showErrorToast, showInfoToast, showWarningToast, showToast;
var init_ToastUtils = __esm({
  "src/Common/ToastUtils.js"() {
    import_react_toastify = require("react-toastify");
    import_ReactToastify = require("react-toastify/dist/ReactToastify.css");
    toastConfig = {
      position: "top-right",
      autoClose: 3e3,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    };
    showSuccessToast = (message) => {
      import_react_toastify.toast.success(message, toastConfig);
    };
    showErrorToast = (message) => {
      import_react_toastify.toast.error(message, toastConfig);
    };
    showInfoToast = (message) => {
      import_react_toastify.toast.info(message, toastConfig);
    };
    showWarningToast = (message) => {
      import_react_toastify.toast.warning(message, toastConfig);
    };
    showToast = (message, type = "default") => {
      switch (type == null ? void 0 : type.toLowerCase()) {
        case "success":
          showSuccessToast(message);
          break;
        case "error":
          showErrorToast(message);
          break;
        case "info":
          showInfoToast(message);
          break;
        case "warning":
          showWarningToast(message);
          break;
        default:
          (0, import_react_toastify.toast)(message, toastConfig);
      }
    };
  }
});

// index.js
var { getServerResponse: getServerResponse2 } = (init_getServerResponse(), __toCommonJS(getServerResponse_exports));
var serverCommunicationHelper2 = (init_serverCommunicationHelper(), __toCommonJS(serverCommunicationHelper_exports));
var { showSuccessToast: showSuccessToast2, showErrorToast: showErrorToast2, showInfoToast: showInfoToast2 } = (init_ToastUtils(), __toCommonJS(ToastUtils_exports));
module.exports = {
  getServerResponse: getServerResponse2,
  serverCommunicationHelper: serverCommunicationHelper2,
  showSuccessToast: showSuccessToast2,
  showErrorToast: showErrorToast2,
  showInfoToast: showInfoToast2
};
