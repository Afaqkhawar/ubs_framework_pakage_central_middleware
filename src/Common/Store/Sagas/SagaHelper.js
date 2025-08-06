import { select, put } from "redux-saga/effects";
import { encryptObject, decryptObject } from "./encryption"; // Assuming these are your encryption/decryption utils
import constants from "../../Constants";
const debug_log = (should_log, text, variable) => {
  if (should_log) {
    console.log(`*** text *** ${text} ************`);
    console.log(`*** variable *** ${variable} ************`);
  }
};
function* fetchData(action, queryParameter, queryParameterId) {
  console.log(
    "********* SAGHELPER ACTION: ********",
    action,
    `\n*******   [queryParameter: ${queryParameter} ]\n******** [queryParameterId:${queryParameterId} ]********\n`
  );
  const updated_action = action?.payload || action;

  try {
    console.log("ENV CHECK", process.env);

    const all_state = yield select((state) => state.main);
    if (
      !process.env?.REACT_APP_PLATFORM_KEY ||
      !process.env?.REACT_APP_SECRET_KEY
    ) {
      console.log("Encryption Failed");
      updated_action?.onFailure({
        status: 401,
        frameworkStatusCode: "E44",
        message: "Encryption Failed [ Env not found ].",
      });
      return;
    }
    const currentUser = yield select((state) => state); // Fetch the entire state
    const { userSelectedRole } = currentUser.main;
    console.log("currentUser", currentUser, userSelectedRole);
    const nextPart = updated_action?.apiUrl;
    const useBaseURL =
      updated_action?.useBaseURL == false ? false : true || true;
    const isFile = updated_action?.isFile == true ? true : false || false;
    console.log("isFile: ", isFile, updated_action?.isFile);
    const isEncrypted =
      updated_action?.isEncrypted == false ? false : true || true;
    console.log("isEncrypted: ", isEncrypted);
    let completeUrl = useBaseURL ? constants?.base_url + nextPart : nextPart;
    if (queryParameter && queryParameter !== "") {
      // completeUrl += queryParameter+'&actionPerformerURDD=1';
      completeUrl += queryParameter;
    }
    if (queryParameterId && queryParameterId !== "") {
      completeUrl += "&id=" + queryParameterId;
    }
    const hasMetaData = updated_action?.metaData;
    const isFormData = updated_action?.formData;
    const accessToken = all_state?.accesstoken || null;

    const request = {
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        accesstoken: accessToken,
      },
      method: updated_action?.requestType || "GET",
    };

    if (hasMetaData && accessToken === null) {
      console.warn(
        "metaData is true but access token is not present in header"
      );
      // Optionally handle unauthorized access
      // updated_action?.onFailure?.({
      //   status: 401,
      //   frameworkStatusCode: "E40",
      //   message: "Invalid or expired token.",
      // });
      // return;
    }

    if (updated_action?.body && updated_action?.requestType !== "GET") {
      if (updated_action?.requestType === "DELETE") {
        if (isEncrypted) {
          const deleteEncryption = encryptObject(
            {
              Id: `${updated_action?.body?.Id || null}`,
              actionPerformerURDD:
                userSelectedRole?.user_role_designation_department_id,
            },
            process.env?.REACT_APP_PLATFORM_KEY
          );
          const secondEncryption = {
            reqData: deleteEncryption,
            encryptionDetails: {
              PlatformName: process.env?.REACT_APP_PLATFORM_NAME,
              PlatformVersion: process.env?.REACT_APP_PLATFORM_VERSION,
            },
          };

          request.headers.encryptedrequest = encryptObject(
            secondEncryption,
            process.env?.REACT_APP_SECRET_KEY
          );
        } else {
          request.headers.reqData = {
            Id: `${action?.body?.Id || null}`,
            actionPerformerURDD:
              userSelectedRole?.user_role_designation_department_id,
          };
        }
      } else {
        if (isEncrypted) {
          request.body = {
            encryptedRequest: {},
          };
          const finalActionBody = !isFormData
            ? {
                ...(updated_action?.body || null), // Spread existing body or payload body
                actionPerformerURDD:
                  userSelectedRole?.user_role_designation_department_id, // Add actionPerformerURDD
              }
            : updated_action?.body;
          console.log(
            "***************** Final Updated Body ***************** ",
            finalActionBody
          );
          const firstEncryption = encryptObject(
            finalActionBody,
            process.env?.REACT_APP_PLATFORM_KEY
          );
          const secondEncryption = {
            reqData: firstEncryption,
            encryptionDetails: {
              PlatformName: process.env?.REACT_APP_PLATFORM_NAME,
              PlatformVersion: process.env?.REACT_APP_PLATFORM_VERSION,
            },
          };
          request.body.encryptedRequest = encryptObject(
            secondEncryption,
            process.env?.REACT_APP_SECRET_KEY
          );
          request.body = JSON.stringify(request?.body);
        } else {
          if (!isFormData) {
            request.body = JSON.stringify({
              ...(updated_action?.body || {}), // Ensure an empty object if undefined
              actionPerformerURDD:
                userSelectedRole?.user_role_designation_department_id,
            });
          } else {
            request.body = updated_action?.body;
          }
        }
      }
    } else {
      if (isEncrypted) {
        request.headers = {
          ...request?.headers,
          encryptedRequest: {},
        };
        const finalActionBody = !isFormData
          ? {
              ...(updated_action?.body || {}), // Ensure an empty object if undefined
              actionPerformerURDD:
                userSelectedRole?.user_role_designation_department_id,
            }
          : updated_action?.body;
        console.log(
          "***************** Final Updated Body ***************** ",
          finalActionBody
        );
        const firstEncryption = encryptObject(
          finalActionBody,
          process.env?.REACT_APP_PLATFORM_KEY
        );
        const secondEncryption = {
          reqData: firstEncryption,
          encryptionDetails: {
            PlatformName: process.env?.REACT_APP_PLATFORM_NAME,
            PlatformVersion: process.env?.REACT_APP_PLATFORM_VERSION,
          },
        };
        request.headers.encryptedRequest = encryptObject(
          secondEncryption,
          process.env?.REACT_APP_SECRET_KEY
        );
      } else {
        request.headers = !isFormData
          ? {
              ...request?.headers,
              reqData: {
                actionPerformerURDD:
                  userSelectedRole?.user_role_designation_department_id,
              },
            }
          : request?.headers;
      }
    }
    console.log("Complete URL", completeUrl);
    if (completeUrl !== "") {
      console.log(
        "***************** API_Request_After_Encryption *************\n",
        request
      );
      const response = yield fetch(completeUrl, request).catch((err) => {
        console.log(`Network error: ${err?.message}`);
        return;
      });

      let responseData = !isFile ? yield response.json() : response;
      console.log("responseData::::", responseData);
      if (responseData.status !== 200) {
        const frameworkErrorMessage = getFrameworkErrorMessage(
          responseData.status,
          responseData.scc
        );
        if (
          updated_action?.onFailure &&
          typeof updated_action?.onFailure === "function"
        ) {
          updated_action?.onFailure({
            status: responseData?.status,
            frameworkStatusCode: responseData?.scc,
            message: frameworkErrorMessage || responseData?.message,
          });
        }
        return; // Stop processing further
      } else {
        if (responseData?.payload && isEncrypted) {
          responseData = decryptObject(
            responseData?.payload,
            process.env?.REACT_APP_PLATFORM_KEY
          );
        } else {
          responseData = !isFile ? responseData?.payload : response;
        }
        if (updated_action?.reduxActionType) {
          yield put({
            type: updated_action?.reduxActionType,
            payload: responseData,
            requestParams: updated_action?.body,
          });
        }
        if (typeof updated_action?.onSuccess === "function") {
          console.log(
            "***************** API_Response *************\n ",
            completeUrl,
            responseData,
            isFile
          );
          updated_action?.onSuccess(responseData);
        }
      }
    }
  } catch (error) {
    console.error(`******** Error in fetchData ******* : ${error?.message}`);
    if (
      updated_action?.onFailure &&
      typeof updated_action?.onFailure === "function"
    ) {
      updated_action?.onFailure({ message: error.message });
    }
  }
}

// Helper to map framework error codes to messages
const getFrameworkErrorMessage = (statusCode, frameworkStatusCode) => {
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
    E52: "Mismatch request method.",
  };

  return (
    errorMessages[frameworkStatusCode] ||
    `Unexpected error (Code: ${frameworkStatusCode})`
  );
};
export default fetchData;
