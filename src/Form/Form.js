import React, { useEffect, useState, forwardRef, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Card,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import {
  renderFields,
  updateDemoFormDataWithDynamicKeys,
} from "./Fields/HelperFunctions";
import BasicTabs from "./FeatureTabs";
// import { getServerResponse } from "../Helpers/getServerResponse";
import {
  getServerResponse,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
} from "central-middleware";

import { getSectionValue } from "./Fields/HelperFunctions";
const Form = forwardRef(
  (
    {
      data,
      config,
      appearance,
      formKeysPass,
      setFormKeysPass,
      parentValues,
      parentFields,
      ancestorsInfo = null,
      demoView = false,
      isModalOpen,
      setIsModalOpen,
      queryParamsId = null,
      countries = null,
      localDataProp,
      setMyUpdatedData = null,
      isTableOfField,
      currentSteps,

      // multiColumn = 1,
    },
    ref
  ) => {
    const { main } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    // console.log(
    //   "i want to see here something",

    //   data?.features?.submission?.steps,
    //   localDataProp
    // );
    // if (currentSteps) {
    //   console.log("i am hit 1");
    //   queryParamsId = getSectionValue(
    //     data?.features?.submission?.steps,
    //     currentSteps,
    //     localDataProp
    //   );
    // } else {
    //   console.log("i am hit 2");
    //   queryParamsId = getSectionValue(
    //     data?.features?.submission?.steps,
    //     currentStep,
    //     localDataProp
    //   );
    // }

    // console.log("queryParamsId", queryParamsId);
    const [openModal, setOpenModal] = useState(isModalOpen);

    const { features: { submission } = {} } = data || {};

    const { viewMode: { presentation, mode } = {} } = config || {};
    const [previousStep, setPreviousStep] = useState(0);
    const [successResponse, setSuccessResponse] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const boxRef = useRef(null);
    const [boxWidth, setBoxWidth] = useState(0);
    const {
      features: {
        submission: {
          buttons = [],
          inputFields = {},
          background = {},
          multiColumn = 1,
        } = {},
      } = {},
    } = appearance;

    // Extract the onAction values into a new array
    const onAction = submission?.steps?.map(
      (submission) => submission?.onAction
    );

    // Get the `onClick` of the first `close` button if it exists
    const closeButton = submission?.steps?.find(
      (step) =>
        Array.isArray(step.buttons) &&
        step.buttons.some((btn) => btn.type === "close")
    );

    const [localCopyFormKeys, setLocalCopyFormKeys] = useState(formKeysPass);

    const closeButtonOnClick = closeButton?.buttons.find(
      (btn) => btn.type === "close"
    )?.onClick;

    const onlyClose = () => {
      if (setFormKeysPass && localCopyFormKeys) {
        setFormKeysPass(localCopyFormKeys);
      }
      setIsSubmitting(true);
      handleDialogClose();
    };

    const handleDialogClose = () => {
      console.log("Close dialog");
      if (setIsModalOpen) {
        setCurrentStep(0);
        setIsModalOpen(false);
      }
      if (closeButton) closeButtonOnClick();
      else setOpenModal(false);
    };

    const stepsData = submission?.steps?.map((step) => {
      return {
        title: step.title,
        parameters: {
          fields: step.parameters ? step.parameters.fields : [],
        },
      };
    });

    let isModal = presentation === "modalView" ? true : false;

    useEffect(() => {
      if (boxRef.current) {
        const Modalwidth = boxRef.current.offsetWidth;
        setBoxWidth(Modalwidth);
        console.log("boxWidthboxWidth -1", boxWidth);
      }

      const handleResize = () => {
        if (boxRef.current) {
          const Modalwidth = boxRef.current.offsetWidth;
          setBoxWidth(Modalwidth);
          console.log("Box width on resize:", Modalwidth);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [boxRef.current]);
    // Handle whether fields are disabled based on mode
    const isReadOnly = mode === "view";
    const variant = isReadOnly ? "standard" : "outlined";
    const isRequired = !isReadOnly;

    function generateDynamicKeys() {
      stepsData?.map((step) => {
        step?.parameters?.fields?.forEach((field) => {
          updateDemoFormDataWithDynamicKeys(field);
        });
      });
    }

    useEffect(() => {
      const updatedFields = stepsData?.map((step) => [
        step?.parameters?.fields,
      ]);
      setFields(updatedFields);
      generateDynamicKeys();
    }, [data]);

    const initialFormValues = stepsData?.map(() => {
      return {};
    });

    // async function getServerResponse(
    //   serverCommunication,
    //   qparam,
    //   queryParamsId
    // ) {
    //   const generator = fetchData(serverCommunication, qparam, queryParamsId);

    //   // Step through the generator
    //   let step = generator.next(); // Start the generator

    //   while (!step.done) {
    //     const response = await step.value; // Await the yielded value
    //     step = generator.next(response); // Pass the response back to the generator
    //   }

    //   // Final result
    //   const finalResult = step.value;
    // }
    // const getServerResponse = async (
    //   serverCommunication,
    //   queryParam = null,
    //   qparam = null
    // ) => {
    //   try {
    //     const response = await runSaga(
    //       {
    //         dispatch: () => {}, // We don't need to dispatch
    //         getState: () => store.getState(), // Provide access to Redux state
    //       },
    //       fetchData,
    //       serverCommunication,
    //       queryParam,
    //       qparam
    //     ).toPromise();

    //     return response;
    //   } catch (error) {
    //     console.error("Error in Server Response:", error);
    //   } finally {
    //     // setIsLoading(false);
    //   }
    // };

    function getFormData(serverCommunication, queryParamsId) {
      const onSuccess = serverCommunication?.onSuccess;
      const onFailure = serverCommunication?.onFailure;
      function updatedOnSuccess(res) {
        console.log("response is", res, serverCommunication);
        onSuccess(res);
        SuccessResponseOfServer(res);
        setSuccessResponse(true);
      }

      function updatedOnFailure(err) {
        onFailure(err);
        ErrorResponseOfServer(err);
        setSuccessResponse(false);
      }

      serverCommunication.onSuccess = updatedOnSuccess;
      serverCommunication.onFailure = updatedOnFailure;
      if (currentSteps) {
        getServerResponse(
          serverCommunication,
          `&step=${currentSteps + 1}`,
          queryParamsId
        );
        console.log("currentSteps is in if", serverCommunication);
      } else {
        console.log("currentSteps is", currentSteps);
        getServerResponse(
          serverCommunication,
          `&step=${currentStep + 1}`,
          queryParamsId
        );
      }
    }
    useEffect(() => {
      if (
        config?.features?.fetchData?.operationalMode === "server" &&
        config?.features?.fetchData?.enable &&
        config?.viewMode?.mode !== "create"
      ) {
        const sagaCommunication =
          data?.features?.fetchData?.serverCommunication;
        if (sagaCommunication) {
          getFormData(sagaCommunication, queryParamsId);
        }
      } else {
        setFormValues((prevFormValues) => {
          // Create a copy of the current form values
          const updatedFormValues = [...prevFormValues];

          // Assuming response.return[0] contains data you want to add
          updatedFormValues[currentStep] = {
            ...updatedFormValues[currentStep],
            ...localDataProp, // Merge response.return[0] into current step data
          };

          // Return the updated form values
          return updatedFormValues;
        });
      }
    }, [localDataProp]);
    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
      console.log("formValuess which 1", formValues);
    }, [formValues]);

    const steps = submission?.steps?.map((step) => `${step.title}`);

    const [errors, setErrors] = useState({}); // New state for errors

    const [formKeys, setFormKeys] = useState([]);

    const [fields, setFields] = useState([]);

    const validateCurrentStep = (
      currentFields = fields[currentStep][0],
      newErrors = {},
      valid = true
    ) => {
      // userRolesDesignationsDepartment_userRoleDesignationDepartmentId:
      //userRolesDesignationsDepartment_roleDesignationDepartmentId:
      if (!isReadOnly) {
        // Validate each field in the current step
        console.log("currentFields", currentFields);
        currentFields?.forEach((field) => {
          console.log("field: ", field);
          const { dynamicKey, type, required, min, max } = field;
          const value = formValues[0][dynamicKey] || "";
          if (type === "listOfSections") {
            if (field?.childFields) {
              valid = validateCurrentStep(field.childFields, newErrors, valid);
            }
          }
          if (type === "section") {
            if (field?.childFields) {
              valid = validateCurrentStep(field.childFields, newErrors, valid);
            }
          } else {
            if (type === "file" && required && (!value || value.length === 0)) {
              newErrors[dynamicKey] = "Please select at least one file";
              valid = false;
            }

            if (required && type === "checkbox" && !value) {
              newErrors[dynamicKey] = "This field is required";
              valid = false;
            }

            if (type === "email") {
              const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if (required && !value) {
                newErrors[dynamicKey] = "This field is required";
                valid = false;
              }
              if (!emailPattern.test(value) && value) {
                newErrors[dynamicKey] = "Invalid email format";
                valid = false;
              }
            }

            // Check required fields
            if (required && !value && field.hideInCreateForm !== true) {
              newErrors[dynamicKey] = "This field is required";
              valid = false;
            }

            // Check for specific field type validations
            if (type === "password") {
              // Validate password length
              if (min != "" && value.length < min) {
                newErrors[dynamicKey] = `Minimum length is ${min}`;
                valid = false;
              }
            }

            // Check min
            if (type == "textField" && min != "" && value.length < min) {
              newErrors[dynamicKey] = `Minimum length is ${min}`;
              valid = false;
            }

            // Check max
            if (type == "textField" && max != "" && value.length > max) {
              newErrors[dynamicKey] = `Maximum length is ${max}`;
              valid = false;
            }

            // Check min
            console.log("value", value);
            if (
              type == "number" &&
              min !== undefined &&
              min != "" &&
              Number(value) < min
            ) {
              newErrors[dynamicKey] = `Minimum value is ${min}`;
              valid = false;
            }

            // Check max
            if (
              type == "number" &&
              max !== undefined &&
              max != "" &&
              Number(value) > max
            ) {
              newErrors[dynamicKey] = `Maximum value is ${max}`;
              valid = false;
            }

            // Check word count
            if (type === "textarea") {
              const wordCount = value
                .trim()
                .split(/\s+/)
                .filter((word) => word).length; // Count words
              if (min !== undefined && min != "" && wordCount < min) {
                newErrors[dynamicKey] = `Minimum word count is ${min}`;
                valid = false;
              }
              if (max !== undefined && max != "" && wordCount > max) {
                newErrors[dynamicKey] = `Maximum word count is ${max}`;
                valid = false;
              }
            }

            // Additional validation for radio type
            if (
              type === "radio" &&
              required &&
              (!formValues[currentStep][dynamicKey] ||
                formValues[currentStep][dynamicKey] === "")
            ) {
              newErrors[dynamicKey] = "Please select an option";
              valid = false;
            }
          }
        });
        setErrors(newErrors);
        console.log("errors", errors, currentStep);
        return valid;
      }
    };

    const handleSubmit = async (event) => {
      console.log("i am here in 2nd step");
      console.log(
        "Submit triggered at step",
        currentStep,
        validateCurrentStep()
      ); // Good descriptive log
      event.preventDefault();
      event.stopPropagation();

      // WARNING: The second validateCurrentStep() check in original code was redundant
      if (mode === "View") {
        console.log("i am in view");
      }
      if (!validateCurrentStep()) {
        showWarningToast("Please fill all required fields.");
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);
      if (config?.features?.fetchData?.operationalMode === "local") {
        console.log("i am local");
        console.log("formValuesAre:", formValues);
        setMyUpdatedData && setMyUpdatedData(formValues[0]);
        handleDialogClose();
        setIsSubmitting(false);
        return;
      }

      // WARNING: Original code had console.logs here that were removed for cleanliness
      // They were: "currentStep in handle Submit" and formValues logging

      if (onAction[currentStep]) {
        try {
          await onAction[currentStep](formValues, ancestorsInfo, currentStep);
        } catch (error) {
          console.log("Submission failed:", error);
          setIsSubmitting(false);
          return;
        }
      }

      if (config?.features?.submission?.operationalMode === "server") {
        const stepConfig = data?.features?.submission.steps[currentStep];
        const sagaCommunication =
          data?.features?.submission.serverCommunication;
        const onSuccess = sagaCommunication?.onSuccess;
        const onFailure = sagaCommunication?.onFailure;

        // WARNING: Original had premature onSuccess call that was commented out:
        // data?.features?.submission.steps[currentStep].serverCommunication?.onSuccess(formValues);

        function updatedOnSuccess(res) {
          // WARNING: Original used == instead of === for type comparison
          if (typeof onSuccess === "function") {
            onSuccess(res);
            showSuccessToast("Data submitted successfully!");
          }
          SuccessResponseOfServer(res);
          setIsSubmitting(false);
          sagaCommunication.onSuccess = null;
          // WARNING: Original had modal close here too which could cause duplicate calls
          // if (isModal === true) {
          //   handleDialogClose();
          // }
        }

        function updatedOnFailure(err) {
          // WARNING: Original used == instead of ===
          if (typeof onFailure === "function") {
            showErrorToast(
              err?.payload || err?.message || "Error: Unable to submit data."
            );
            onFailure(err);
          }
          ErrorResponseOfServer(err);
          setIsSubmitting(false);
          sagaCommunication.onFailure = null;
        }

        if (sagaCommunication) {
          const { userSelectedRole } = main;
          if (formValues[currentStep]) {
            for (const key of Object.keys(formValues[currentStep])) {
              if (key.includes("updatedBy")) {
                formValues[currentStep][key] =
                  userSelectedRole.user_role_designation_department_id;
              }
            }
          }

          sagaCommunication.body = formValues[currentStep];
          console.log(
            "formValuess which 1",
            sagaCommunication.body,
            formValues
          );
          sagaCommunication.onSuccess = updatedOnSuccess;
          sagaCommunication.onFailure = updatedOnFailure;
          let id = getSectionValue(stepsData, currentStep, formValues);
          console.log(
            "id on this step to hit",
            id,
            stepsData,
            currentStep,
            formValues
          );
          // WARNING: Original had setIsSubmitting(true) here which was redundant
          if (currentSteps) {
            getServerResponse(
              sagaCommunication,
              `&step=${currentSteps + 1}`,
              id
            );
          } else {
            getServerResponse(
              sagaCommunication,
              currentStep > 0 ? `&step=${currentStep + 1}` : "",
              id
            );
          }

          console.log("i am here in from");
        }
      }

      if (currentStep === steps.length - 1) {
        fields.forEach((stepFields) => {
          stepFields.forEach((field) => {
            // WARNING: Original had typo "repeatDependancy" instead of "repeatDependency"
            if (field.repeatDependancy === true) {
              field.repeated = false;
            }
          });
        });

        if (!demoView) {
          // WARNING: Original had console.log("i am in not demo View") that was removed

          setFormValues(initialFormValues);
        }

        if (isModal) {
          // console.log("📌 Closing modal from final submit"); // Better log message
          handleDialogClose();
        }
      }
    };

    const handleNextStep = async () => {
      // Better log format

      // Validate current step before proceeding
      if (mode !== "view") {
        if (!validateCurrentStep()) {
          showWarningToast("Please fill all required fields.");

          return;
        }
      }

      // Check if this is NOT the final step
      if (currentStep < fields.length - 1) {
        // Execute step-specific action if defined
        if (onAction[currentStep]) {
          // WARNING: Should this be awaited? Potential race condition if async
          onAction[currentStep](formValues, ancestorsInfo, currentStep);
        }

        // Server-side submission handling
        if (config?.features?.submission?.operationalMode === "server") {
          // WARNING: This early success call might be premature - moved after validation
          if (
            data?.features?.submission.steps[currentStep].serverCommunication
              ?.onSuccess
          ) {
            data.features.submission.steps[
              currentStep
            ].serverCommunication.onSuccess(formValues);
          }

          const sagaCommunication =
            data?.features?.submission.serverCommunication;
          const { onSuccess, onFailure } = sagaCommunication || {};

          // Improved success handler with clearer logic
          function updatedOnSuccess(res) {
            // WARNING: Using == instead of === for type comparison
            if (typeof onSuccess == "function") {
              onSuccess(res);
              setIsSubmitting(false);
            }

            SuccessResponseOfServer(res);

            // WARNING: This complex condition needs simplification - preserved original logic
            console.log("insertedId is", res?.return);

            // const hasInsertId =
            //   res?.return?.insertId || res?.return?.[0]?.insertId;  //before
            const hasInsertId = res?.return?.insertId; //after
            console.log("has inserted Id IS", hasInsertId, queryParamsId);
            const isValidId =
              (!queryParamsId && hasInsertId) ||
              // (queryParamsId && hasInsertId !== 0);
              (queryParamsId && hasInsertId === 0) ||
              hasInsertId === 0;

            if (!isValidId && mode !== "view") {
              console.log("hasInsertId", hasInsertId);
              alert("Error: Data not added. Please try again.");
            } else {
              setCurrentStep(currentStep + 1);
            }
          }

          // Improved error handler
          function updatedOnFailure(err) {
            console.error("[NextStep] Server Error:", err);

            // WARNING: Using == instead of ===
            if (typeof onFailure == "function") {
              // WARNING: Generic error message "Error32:" - should be more descriptive
              showErrorToast("Error32: ");
              onFailure(err);
            }

            ErrorResponseOfServer(err);

            // Keep modal open on error if in modal mode
            if (isModal) {
              setIsModalOpen(true);
            }
          }

          if (sagaCommunication) {
            // Add updatedBy information if fields exist

            if (formValues[currentStep]) {
              const { userSelectedRole } = main;
              Object.keys(formValues[currentStep]).forEach((key) => {
                if (key.includes("updatedBy")) {
                  formValues[currentStep][key] =
                    userSelectedRole.user_role_designation_department_id;
                }
              });
            }

            // Configure saga communication
            sagaCommunication.body = formValues[currentStep];
            console.log(
              "saga communication.body",
              sagaCommunication.body,
              formValues
            );
            sagaCommunication.onSuccess = updatedOnSuccess;
            sagaCommunication.onFailure = updatedOnFailure;
            let sectionTitle;

            let id = getSectionValue(stepsData, currentStep, formValues);

            // Execute server request
            if (currentSteps) {
              getServerResponse(
                sagaCommunication,
                `&step=${currentSteps + 1}`,
                id
              );
            } else {
              getServerResponse(
                sagaCommunication,
                currentStep > 0 ? `&step=${currentStep + 1}` : "",
                id
              );
            }
          }
        } else {
          // Client-side step progression
          setCurrentStep(currentStep + 1);
        }
      } else {
        console.warn("[NextStep] Validation failed for current step");
      }
    };

    const handlePrevStep = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        setPreviousStep(previousStep + 1);
      }
    };

    const SuccessResponseOfServer = (response) => {
      console.log("FormValuesssss", response);
      // Make sure we have a valid response with insertedId
      /////////////old code///////////////////////////////////////////////////////
      // if (response?.return?.insertId) {
      //   // Retain formValues and add insertedId to the current step
      //   setFormValues((prevFormValues) => {
      //     // Create a copy of the current form values
      //     const updatedFormValues = [...prevFormValues];

      //     // Add the insertedId to the current step
      //     // updatedFormValues[currentStep] = {
      //     //   ...updatedFormValues[currentStep],
      //     //   insertedId: response.return.insertId,
      //     // };
      //     for (let stepIndex = 0; stepIndex < stepsData.length; stepIndex++) {
      //       updatedFormValues[stepIndex] = {
      //         ...updatedFormValues[stepIndex],
      //         insertedId: response.return.insertId,
      //       };
      //     }

      //     // Return the updated form values
      //     console.log("FormValuesssss", updatedFormValues);
      //     return updatedFormValues;
      //   });
      // } else if (Array.isArray(response?.return) && response.return[0]) {
      //   setFormValues((prevFormValues) => {
      //     // Create a copy of the current form values
      //     const updatedFormValues = [...prevFormValues];

      //     // Assuming response.return[0] contains data you want to add
      //     // updatedFormValues[currentStep] = {
      //     //   ...updatedFormValues[currentStep],
      //     //   ...response.return[0], // Merge response.return[0] into current step data
      //     // };
      //     console.log("FormValuesssss", updatedFormValues);
      //     console.log(
      //       "stepdata.length",
      //       stepsData,
      //       stepsData.length,
      //       response.return
      //     );
      //     for (let stepIndex = 0; stepIndex < stepsData.length; stepIndex++) {
      //       // Check if response.return has more than one item

      //       console.log("i am here brother");
      //       updatedFormValues[0] = {
      //         ...updatedFormValues[0],
      //         ...response.return[0], // Merge the first object in response.return if only one item exists
      //       };
      //     }

      //     // Return the updated form values
      //     console.log("form.js", updatedFormValues);
      //     return updatedFormValues;
      //   });
      // }

      if (response?.return?.insertId) {
        setFormValues((prevFormValues) => {
          const updatedFormValues = prevFormValues.map((item) => ({ ...item }));
          for (let stepIndex = 0; stepIndex < stepsData.length; stepIndex++) {
            updatedFormValues[stepIndex] = {
              ...updatedFormValues[stepIndex],
              insertedId: response.return.insertId,
            };
          }
          return updatedFormValues;
        });
      } else if (Array.isArray(response?.return) && response.return[0]) {
        setFormValues((prevFormValues) => {
          const updatedFormValues = prevFormValues.map((item) => ({ ...item }));
          const maxLength = Math.max(stepsData.length, response.return.length);

          for (let stepIndex = 0; stepIndex < maxLength; stepIndex++) {
            updatedFormValues[stepIndex] = {
              ...updatedFormValues[stepIndex],
              ...(response?.return[stepIndex] || response?.return[0]),
            };
          }
          console.log("Response iS 1", updatedFormValues);
          return updatedFormValues;
        });
      }

      return response;
    };

    const ErrorResponseOfServer = (response) => {
      // setIsSubmitting(response);
      setSuccessResponse(false);
      return response;
    };

    const [allTagValues, setAllTagValues] = useState({});

    useEffect(() => {
      //console.log("allTagValues: ", allTagValues);
    }, [allTagValues]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    console.log("theme2: ", theme.palette);

    // Set the number of columns based on screen size
    const columnCount = isSmallScreen ? 1 : multiColumn || 1;

    const form = (
      <form noValidate onSubmit={handleSubmit} ref={ref}>
        {Array.isArray(fields) &&
        Array.isArray(fields[currentStep]) &&
        fields[currentStep].length > 0 ? (
          <Grid container spacing={2}>
            {(() => {
              const stepFields = fields[currentStep].flat();
              const columns = Array.from({ length: columnCount }, () => []);

              stepFields.forEach((field, index) => {
                const isFullWidth =
                  field?.type === "section" ||
                  field?.type === "listOfSections" ||
                  stepFields.length === 1;
                console.log("boxWidthboxWidth 0", boxWidth);
                const fieldComponent = (
                  <Grid item xs={12} key={`field-${index}`}>
                    {renderFields({
                      field,
                      formValues,
                      inputFields,
                      isRequired,
                      isReadOnly,
                      setFormValues,
                      allTagValues,
                      setAllTagValues,
                      currentStep,
                      stepsData,
                      errors,
                      setErrors,
                      multiColumn,
                      variant,
                      formKeys: formKeysPass || formKeys,
                      setFormKeys: setFormKeysPass || setFormKeys,
                      parentValues,
                      parentFields,
                      ancestorsInfo,
                      fields,
                      config,
                      serverMode:
                        config?.features?.fetchData?.operationalMode ===
                        "server",
                      boxWidth: 200,
                    })}
                  </Grid>
                );

                if (isFullWidth) {
                  columns[0].push(fieldComponent);
                } else {
                  const colIndex = index % columnCount;
                  columns[colIndex].push(fieldComponent);
                }
              });

              if (stepFields.length === 1) {
                return columns[0];
              } else {
                return columns.map((col, colIdx) => (
                  <Grid item xs={12 / columnCount} key={`column-${colIdx}`}>
                    <Grid container spacing={2} direction="column">
                      {col}
                    </Grid>
                  </Grid>
                ));
              }
            })()}
          </Grid>
        ) : null}

        <Grid>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            {Array.isArray(steps) && steps.length > 1 && (
              <>
                <Button
                  variant="outlined"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => {
                    if (currentStep < fields.length - 1) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      handleDialogClose();
                    }
                  }}
                >
                  Skip
                </Button>

                {currentStep < (fields?.length || 0) - 1 && (
                  <Button
                    variant="contained"
                    onClick={
                      previousStep === 0
                        ? handleNextStep
                        : () => {
                            setPreviousStep(previousStep - 1);
                            setCurrentStep(previousStep);
                          }
                    }
                    disabled={
                      currentStep >= (fields?.length || 0) - 1 || isSubmitting
                    }
                  >
                    {isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : mode === "view" ? (
                      "Next"
                    ) : !queryParamsId ? (
                      "Next"
                    ) : (
                      "Update"
                    )}
                  </Button>
                )}
              </>
            )}

            {mode !== "view" &&
              submission?.steps?.[currentStep]?.buttons?.map((btn, index) =>
                btn.type === "submit" ? (
                  <Button
                    key={index}
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ width: steps?.length === 1 ? "100%" : "auto" }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : queryParamsId ? (
                      "Update"
                    ) : (
                      btn?.label
                    )}
                  </Button>
                ) : null
              )}

            {/* ///////Previous///////////////// */}
            {/* {submission?.steps?.[currentStep]?.buttons?.map((btn, index) =>
              btn.type === "submit" ? (
                <Button
                  key={index}
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ width: steps?.length === 1 ? "100%" : "auto" }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : !queryParamsId ? (
                    btn?.label
                  ) : (
                    "Update"
                  )}
                </Button>
              ) : null
            )} */}
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            marginTop={2}
            sx={{ justifyContent: "space-between" }}
          >
            {submission?.steps?.[currentStep]?.buttons?.map((btn, index) =>
              btn.type !== "submit" && btn.type !== "close" ? (
                <Button
                  key={index}
                  variant="contained"
                  sx={{
                    backgroundColor:
                      appearance?.features?.submission?.buttons?.find(
                        (bt) => bt.type === btn.type
                      )?.backgroundColor || " ",
                    color:
                      appearance?.features?.submission?.buttons?.find(
                        (bt) => bt.type === btn.type
                      )?.color || "white",
                    margin: "5px",
                  }}
                  onClick={(e) => {
                    if (btn.onClick) {
                      btn.onClick(e);
                    }
                  }}
                >
                  {btn?.label}
                </Button>
              ) : null
            )}
            {currentStep === submission?.steps?.length - 1 &&
              !submission?.steps?.[currentStep]?.buttons?.some(
                (btn) => btn.type === "submit"
              ) && (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: steps?.length === 1 ? "100%" : "auto" }}
                >
                  Submit
                </Button>
              )}
          </Box>
        </Grid>
      </form>
    );

    // const steperDirection = "horizontal";

    const renderStepperAndForm = () => (
      <>
        {/* {Array.isArray(steps) && steps.length > 1 && (
          <Stepper
            activeStep={currentStep}
            alternativeLabel={steperDirection === "horizontal"}
            orientation={
              steperDirection === "vertical" ? "vertical" : "horizontal"
            }
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )} */}
        {stepsData.length > 1 && (
          <BasicTabs tabs={stepsData} activeStep={currentStep} />
        )}
        {form}
      </>
    );

    if (isModal === true) {
      return (
        <>
          <Dialog
            open={closeButton ? true : openModal}
            onClose={isSubmitting ? undefined : onlyClose} // Disable close during submission            maxWidth="sm"
            fullWidth
          >
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                color: inputFields?.color,
                backgroundColor: background?.color,
              }}
            >
              <IconButton onClick={isSubmitting ? undefined : onlyClose}>
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent
              // dividers
              sx={{
                marginTop: "-30px",
                backgroundColor: background?.color,
              }}
            >
              <Box
                ref={boxRef}
                sx={{
                  color: inputFields?.color,
                  width: "100%",
                  marginTop: 2,
                }}
              >
                {renderStepperAndForm()}
              </Box>
            </DialogContent>
          </Dialog>

          {/* {!closeButton && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setOpenModal(true);
              }}
              sx={{
                ml: 0,
                mt: 2,
                px: 3,
                py: 1,
                color: "#fff",
                borderColor: "transparent",
                background: "linear-gradient(90deg, #2196f3 0%, #1e88e5 100%)",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                boxShadow: "0px 4px 12px rgba(33, 150, 243, 0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #64b5f6 0%, #42a5f5 100%)",
                  boxShadow: "0px 6px 16px rgba(33, 150, 243, 0.6)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  boxShadow: "0px 4px 8px rgba(33, 150, 243, 0.3)",
                  transform: "scale(1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Open Modal
            </Button>
          )} */}
        </>
      );
    } else {
      return console.log(" ia m here in form ");
      <Card
        sx={{
          padding: "24px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginTop: "50px",
          marginBottom: "50px",
          color: "red",
          backgroundColor: "red",
        }}
      >
        {renderStepperAndForm()}
      </Card>;
    }
  }
);
export default Form;
