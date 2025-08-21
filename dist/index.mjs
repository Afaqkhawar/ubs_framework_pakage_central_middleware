// src/Form/Form.js
import React2, { useEffect as useEffect2, useState, forwardRef, useRef } from "react";
import {
  Box as Box2,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Card as Card2,
  useMediaQuery,
  useTheme,
  Grid as Grid2
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

// src/Form/Fields/HelperFunctions.js
import {
  SectionField,
  TextFieldRender,
  SelectDependant,
  SelectFieldRender,
  RadioFieldRender,
  MultiSelectFieldRender,
  NumberFieldRender,
  TextAreaFieldRender,
  CheckboxFieldRender,
  ColorFieldRender,
  URLFieldRender,
  RangeFieldRender,
  TimeFieldRender,
  DateFieldRender,
  DateTimeFieldRender,
  PasswordFieldRender,
  FileFieldRender,
  SelectOnFieldsRender,
  Report,
  EmailFieldRender,
  ListOfSections,
  PhoneNumberFieldRender
} from "form-fields-react";

// src/Form/fieldsMapper.js
var inlineProps = [
  "field",
  "inputFields",
  "formValues",
  "isRequired",
  "isReadOnly",
  "setFormValues",
  "allTagValues",
  "setAllTagValues",
  "currentStep",
  "errors",
  "setErrors",
  "variant",
  "formData",
  "formKeys",
  "setFormKeys",
  "parentValues",
  "ancestorsInfo",
  "fields",
  "parentFields",
  "serverMode",
  "config",
  "multiColumn",
  "isListOfSections",
  "boxWidth"
];
var mapper = [
  {
    type: "section",
    component: "SectionField",
    inlineProps
  },
  {
    type: "listOfFields",
    component: "ListOfFields",
    inlineProps
  },
  {
    type: "textField",
    component: "TextFieldRender",
    inlineProps
  },
  // {
  //   type: "select",
  //   component: "SelectFieldRender",
  //   inlineProps: inlineProps,
  // },
  {
    type: "tableOfFields",
    component: "TableOfFields",
    inlineProps
  },
  // {
  //   type: "multiSelect",
  //   component: "MultiSelectFieldRender",
  //   inlineProps: inlineProps,
  // },
  {
    type: "number",
    component: "NumberFieldRender",
    inlineProps
  },
  {
    type: "textArea",
    component: "TextAreaFieldRender",
    inlineProps
  },
  {
    type: "checkbox",
    component: "CheckboxFieldRender",
    inlineProps
  },
  {
    type: "color",
    component: "ColorFieldRender",
    inlineProps
  },
  {
    type: "url",
    component: "URLFieldRender",
    inlineProps
  },
  {
    type: "section",
    component: "Section",
    inlineProps
  },
  {
    type: "range",
    component: "RangeFieldRender",
    inlineProps
  },
  {
    type: "radio",
    component: "RadioFieldRender",
    inlineProps
  },
  {
    type: "password",
    component: "PasswordFieldRender",
    inlineProps
  },
  {
    type: "time",
    component: "TimeFieldRender",
    inlineProps
  },
  {
    type: "date",
    component: "DateFieldRender",
    inlineProps
  },
  {
    type: "dateTime",
    component: "DateTimeFieldRender",
    inlineProps
  },
  // {
  //   type: "file",
  //   component: "FileFieldRender",
  //   inlineProps: inlineProps,
  // },
  {
    type: "selectDependant",
    component: "SelectDependant",
    inlineProps
  },
  {
    type: "selectOnFields",
    component: "SelectOnFieldsRender",
    inlineProps
  },
  {
    type: "report",
    component: "Report",
    inlineProps
  },
  {
    type: "email",
    component: "EmailFieldRender",
    inlineProps
  }
];
var fieldsMapper_default = mapper;

// src/Form/Fields/HelperFunctions.js
import { Grid } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions.js";
import { jsx } from "react/jsx-runtime";
var getSectionValue = (stepsData, currentStep, formValues, fields) => {
  let sectionTitle = "";
  console.log("what i get", stepsData, currentStep, formValues);
  if (stepsData && stepsData[currentStep]?.parameters?.fields) {
    const sectionField = stepsData[currentStep]?.parameters?.fields.find(
      (field) => {
        console.log(
          "sectionField check:",
          field,
          stepsData,
          stepsData[currentStep]?.parameters?.fields
        );
        return field?.type === "section";
      }
    );
    if (sectionField) {
      sectionTitle = sectionField.name + "_id";
    } else {
      console.log("No section field found in the current step (stepsData).");
    }
  }
  if (fields && fields[currentStep]) {
    console.log("here i am in fields", currentStep);
    const currentFields = fields[currentStep];
    currentFields?.forEach((fieldGroup) => {
      if (Array.isArray(fieldGroup)) {
        fieldGroup.forEach((field) => {
          if (field?.type === "section") {
            sectionTitle = field.name + "_id";
            return;
          }
        });
      }
    });
  }
  let sectionValue = null;
  console.log("name is", sectionTitle);
  console.log("FormValues is fro updated Behind", formValues);
  if (Array.isArray(formValues) && formValues.every((item) => typeof item === "object" && item !== null)) {
    formValues.forEach((dataItem) => {
      for (const [key, value] of Object.entries(dataItem)) {
        if (key.includes(sectionTitle)) {
          sectionValue = value;
          return;
        }
      }
    });
  } else {
    sectionValue = formValues[sectionTitle];
  }
  console.log("Final sectionValue:", sectionTitle, sectionValue);
  return sectionValue;
};
var componentsMap = {
  SectionField,
  TextFieldRender,
  SelectFieldRender,
  MultiSelectFieldRender,
  NumberFieldRender,
  TextAreaFieldRender,
  CheckboxFieldRender,
  ColorFieldRender,
  URLFieldRender,
  RangeFieldRender,
  RadioFieldRender,
  PasswordFieldRender,
  TimeFieldRender,
  DateFieldRender,
  DateTimeFieldRender,
  FileFieldRender,
  SelectDependant,
  SelectOnFieldsRender,
  Report,
  // TableOfFields,
  EmailFieldRender,
  ListOfSections,
  PhoneNumberFieldRender
  // SignaturePadFieldRender,
  // RichTextFieldRender,
  // RatingFieldRender,
};
var renderComponent = (field, scopeVariables) => {
  const mapperItem = fieldsMapper_default.find((item) => item.type === field?.type);
  if (!mapperItem) {
    return null;
  }
  const { component: ComponentName, inlineProps: inlineProps2 } = mapperItem;
  console.log("boxWidthboxWidth 5", inlineProps2);
  const Component = componentsMap[ComponentName];
  if (!Component) {
    return null;
  }
  const props = {};
  inlineProps2.forEach((propName) => {
    if (scopeVariables.hasOwnProperty(propName)) {
      props[propName] = scopeVariables[propName];
      console.log("boxWidthboxWidth 456", propName, props[propName]);
    } else {
      console.warn(`Variable ${propName} is not defined in scope`);
      return null;
    }
  });
  return /* @__PURE__ */ jsx(Component, { ...props });
};
var renderFields = ({
  serverMode,
  field,
  inputFields,
  formValues,
  isRequired,
  isReadOnly,
  setFormValues,
  allTagValues,
  setAllTagValues,
  currentStep,
  errors,
  setErrors,
  variant,
  formKeys,
  setFormKeys,
  parentValues,
  ancestorsInfo,
  fields,
  parentFields,
  config,
  multiColumn,
  isListOfSections,
  boxWidth
}) => {
  console.log("boxWidthboxWidth 1", boxWidth);
  const scopeVariables = {
    field,
    inputFields,
    formValues,
    isRequired,
    isReadOnly,
    setFormValues,
    allTagValues,
    setAllTagValues,
    currentStep,
    errors,
    setErrors,
    variant,
    formKeys,
    setFormKeys,
    parentValues,
    ancestorsInfo,
    fields,
    parentFields,
    serverMode,
    config,
    multiColumn,
    isListOfSections,
    boxWidth
  };
  const viewMode = config?.viewMode?.mode;
  if (field.hideInCreateForm && (viewMode === "create" || viewMode === "edit")) {
    return null;
  }
  if (field?.hideInViewForm && field.hideInViewForm && viewMode === "view") {
    return null;
  }
  return renderComponent(field, scopeVariables);
};
function generateDynamicKeysForListOfFields(field, parentKey = "") {
  field?.childFields?.forEach((childField) => {
    const isUniqueName = parentKey.split("_").pop() !== field.name;
    const dynamicKey = parentKey ? isUniqueName ? `${parentKey}_${field.name}_${childField.name}` : `${parentKey}_${childField.name}` : `${childField.name}`;
    if (childField.type === "section" && childField.childFields) {
      updateDemoFormDataWithDynamicKeys(childField, dynamicKey);
    } else if (childField.type === "listOfFields") {
      generateDynamicKeysForListOfFields(childField, dynamicKey);
      childField.dynamicKey = dynamicKey;
    } else {
      childField.dynamicKey = dynamicKey;
    }
  });
}
function updateDemoFormDataWithDynamicKeys(field, parentKey = "") {
  if (field.type === "section" && field.childFields) {
    field.childFields.forEach((childField) => {
      const isUniqueName = parentKey.split("_").pop() !== field.name;
      const dynamicKey = parentKey ? isUniqueName ? `${parentKey}_${field.name}_${childField.name}` : `${parentKey}_${childField.name}` : `${field.name}_${childField.name}`;
      childField.dynamicKey = dynamicKey;
      if (childField.type === "section" && childField.childFields) {
        updateDemoFormDataWithDynamicKeys(childField, dynamicKey);
      } else if (childField.type === "listOfFields") {
        updateDemoFormDataWithDynamicKeys(childField, dynamicKey);
      }
    });
  } else if (field.type === "listOfFields" && field.childFields) {
    generateDynamicKeysForListOfFields(field);
    if (parentKey === "") {
      field.dynamicKey = parentKey ? `${parentKey}_${field?.name}` : field?.name;
    }
  } else {
    field.dynamicKey = parentKey ? `${parentKey}_${field?.name}` : field?.name;
  }
}

// src/Form/FeatureTabs.js
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { jsx as jsx2 } from "react/jsx-runtime";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return /* @__PURE__ */ jsx2(
    "div",
    {
      role: "tabpanel",
      hidden: value !== index,
      id: `simple-tabpanel-${index}`,
      "aria-labelledby": `simple-tab-${index}`,
      ...other,
      children: value === index && /* @__PURE__ */ jsx2(Box, { sx: { p: 3 }, children: /* @__PURE__ */ jsx2(Typography, { children }) })
    }
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};
function BasicTabs({ tabs, activeStep = 0 }) {
  const [currentStep, setCurrentStep] = React.useState(activeStep);
  useEffect(() => {
    console.log(activeStep);
    setCurrentStep(activeStep);
  }, [activeStep]);
  const a11yProps = (index) => ({
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-panel-${index}`
  });
  return /* @__PURE__ */ jsx2(
    Box,
    {
      sx: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ jsx2(
        Tabs,
        {
          value: currentStep,
          variant: "scrollable",
          scrollButtons: "auto",
          "aria-label": "scrollable controlled tabs example",
          sx: {
            "& .MuiTabs-flexContainer": {
              justifyContent: "flex-start"
              // Centers the tabs horizontally
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#1976D2"
            }
          },
          children: tabs.map((tab, index) => /* @__PURE__ */ jsx2(
            Tab,
            {
              label: tab.title.length > 20 ? tab.title.substring(0, 20) + "..." : tab.title,
              ...a11yProps(index),
              style: {
                fontSize: 17,
                marginRight: 5,
                color: currentStep === index ? "#1976D2" : index < activeStep ? "#1976D2" : "#D3D3D3",
                borderBottom: index <= activeStep ? "3px solid #1976D2" : "none"
                // Add underline for previous and active steps
              }
            },
            index
          ))
        }
      )
    }
  );
}
BasicTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      // Fixed prop name
      content: PropTypes.node.isRequired
    })
  ).isRequired,
  activeStep: PropTypes.number.isRequired
};

// src/Form/Form.js
import {
  getServerResponse,
  showSuccessToast,
  showErrorToast,
  showWarningToast
} from "central-middleware";
import { Fragment, jsx as jsx3, jsxs } from "react/jsx-runtime";
var Form = forwardRef(
  ({
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
    currentSteps
    // multiColumn = 1,
  }, ref) => {
    const { main } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
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
          multiColumn = 1
        } = {}
      } = {}
    } = appearance;
    const onAction = submission?.steps?.map(
      (submission2) => submission2?.onAction
    );
    const closeButton = submission?.steps?.find(
      (step) => Array.isArray(step.buttons) && step.buttons.some((btn) => btn.type === "close")
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
      if (closeButton)
        closeButtonOnClick();
      else
        setOpenModal(false);
    };
    const stepsData = submission?.steps?.map((step) => {
      return {
        title: step.title,
        parameters: {
          fields: step.parameters ? step.parameters.fields : []
        }
      };
    });
    let isModal = presentation === "modalView" ? true : false;
    useEffect2(() => {
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
    useEffect2(() => {
      const updatedFields = stepsData?.map((step) => [
        step?.parameters?.fields
      ]);
      setFields(updatedFields);
      generateDynamicKeys();
    }, [data]);
    const initialFormValues = stepsData?.map(() => {
      return {};
    });
    function getFormData(serverCommunication, queryParamsId2) {
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
          queryParamsId2
        );
        console.log("currentSteps is in if", serverCommunication);
      } else {
        console.log("currentSteps is", currentSteps);
        getServerResponse(
          serverCommunication,
          `&step=${currentStep + 1}`,
          queryParamsId2
        );
      }
    }
    useEffect2(() => {
      if (config?.features?.fetchData?.operationalMode === "server" && config?.features?.fetchData?.enable && config?.viewMode?.mode !== "create") {
        const sagaCommunication = data?.features?.fetchData?.serverCommunication;
        if (sagaCommunication) {
          getFormData(sagaCommunication, queryParamsId);
        }
      } else {
        setFormValues((prevFormValues) => {
          const updatedFormValues = [...prevFormValues];
          updatedFormValues[currentStep] = {
            ...updatedFormValues[currentStep],
            ...localDataProp
            // Merge response.return[0] into current step data
          };
          return updatedFormValues;
        });
      }
    }, [localDataProp]);
    const [formValues, setFormValues] = useState(initialFormValues);
    useEffect2(() => {
      console.log("formValuess which 1", formValues);
    }, [formValues]);
    const steps = submission?.steps?.map((step) => `${step.title}`);
    const [errors, setErrors] = useState({});
    const [formKeys, setFormKeys] = useState([]);
    const [fields, setFields] = useState([]);
    const validateCurrentStep = (currentFields = fields[currentStep][0], newErrors = {}, valid = true) => {
      if (!isReadOnly) {
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
              const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if (required && !value) {
                newErrors[dynamicKey] = "This field is required";
                valid = false;
              }
              if (!emailPattern.test(value) && value) {
                newErrors[dynamicKey] = "Invalid email format";
                valid = false;
              }
            }
            if (required && !value && field.hideInCreateForm !== true) {
              newErrors[dynamicKey] = "This field is required";
              valid = false;
            }
            if (type === "password") {
              if (min != "" && value.length < min) {
                newErrors[dynamicKey] = `Minimum length is ${min}`;
                valid = false;
              }
            }
            if (type == "textField" && min != "" && value.length < min) {
              newErrors[dynamicKey] = `Minimum length is ${min}`;
              valid = false;
            }
            if (type == "textField" && max != "" && value.length > max) {
              newErrors[dynamicKey] = `Maximum length is ${max}`;
              valid = false;
            }
            console.log("value", value);
            if (type == "number" && min !== void 0 && min != "" && Number(value) < min) {
              newErrors[dynamicKey] = `Minimum value is ${min}`;
              valid = false;
            }
            if (type == "number" && max !== void 0 && max != "" && Number(value) > max) {
              newErrors[dynamicKey] = `Maximum value is ${max}`;
              valid = false;
            }
            if (type === "textarea") {
              const wordCount = value.trim().split(/\s+/).filter((word) => word).length;
              if (min !== void 0 && min != "" && wordCount < min) {
                newErrors[dynamicKey] = `Minimum word count is ${min}`;
                valid = false;
              }
              if (max !== void 0 && max != "" && wordCount > max) {
                newErrors[dynamicKey] = `Maximum word count is ${max}`;
                valid = false;
              }
            }
            if (type === "radio" && required && (!formValues[currentStep][dynamicKey] || formValues[currentStep][dynamicKey] === "")) {
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
      );
      event.preventDefault();
      event.stopPropagation();
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
        let updatedOnSuccess = function(res) {
          if (typeof onSuccess === "function") {
            onSuccess(res);
            showSuccessToast("Data submitted successfully!");
          }
          SuccessResponseOfServer(res);
          setIsSubmitting(false);
          sagaCommunication.onSuccess = null;
        }, updatedOnFailure = function(err) {
          if (typeof onFailure === "function") {
            showErrorToast(
              err?.payload || err?.message || "Error: Unable to submit data."
            );
            onFailure(err);
          }
          ErrorResponseOfServer(err);
          setIsSubmitting(false);
          sagaCommunication.onFailure = null;
        };
        const stepConfig = data?.features?.submission.steps[currentStep];
        const sagaCommunication = data?.features?.submission.serverCommunication;
        const onSuccess = sagaCommunication?.onSuccess;
        const onFailure = sagaCommunication?.onFailure;
        if (sagaCommunication) {
          const { userSelectedRole } = main;
          if (formValues[currentStep]) {
            for (const key of Object.keys(formValues[currentStep])) {
              if (key.includes("updatedBy")) {
                formValues[currentStep][key] = userSelectedRole.user_role_designation_department_id;
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
            if (field.repeatDependancy === true) {
              field.repeated = false;
            }
          });
        });
        if (!demoView) {
          setFormValues(initialFormValues);
        }
        if (isModal) {
          handleDialogClose();
        }
      }
    };
    const handleNextStep = async () => {
      if (mode !== "view") {
        if (!validateCurrentStep()) {
          showWarningToast("Please fill all required fields.");
          return;
        }
      }
      if (currentStep < fields.length - 1) {
        if (onAction[currentStep]) {
          onAction[currentStep](formValues, ancestorsInfo, currentStep);
        }
        if (config?.features?.submission?.operationalMode === "server") {
          let updatedOnSuccess = function(res) {
            if (typeof onSuccess == "function") {
              onSuccess(res);
              setIsSubmitting(false);
            }
            SuccessResponseOfServer(res);
            console.log("insertedId is", res?.return);
            const hasInsertId = res?.return?.insertId;
            console.log("has inserted Id IS", hasInsertId, queryParamsId);
            const isValidId = !queryParamsId && hasInsertId || // (queryParamsId && hasInsertId !== 0);
            queryParamsId && hasInsertId === 0 || hasInsertId === 0;
            if (!isValidId && mode !== "view") {
              console.log("hasInsertId", hasInsertId);
              alert("Error: Data not added. Please try again.");
            } else {
              setCurrentStep(currentStep + 1);
            }
          }, updatedOnFailure = function(err) {
            console.error("[NextStep] Server Error:", err);
            if (typeof onFailure == "function") {
              showErrorToast("Error32: ");
              onFailure(err);
            }
            ErrorResponseOfServer(err);
            if (isModal) {
              setIsModalOpen(true);
            }
          };
          if (data?.features?.submission.steps[currentStep].serverCommunication?.onSuccess) {
            data.features.submission.steps[currentStep].serverCommunication.onSuccess(formValues);
          }
          const sagaCommunication = data?.features?.submission.serverCommunication;
          const { onSuccess, onFailure } = sagaCommunication || {};
          if (sagaCommunication) {
            if (formValues[currentStep]) {
              const { userSelectedRole } = main;
              Object.keys(formValues[currentStep]).forEach((key) => {
                if (key.includes("updatedBy")) {
                  formValues[currentStep][key] = userSelectedRole.user_role_designation_department_id;
                }
              });
            }
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
      if (response?.return?.insertId) {
        setFormValues((prevFormValues) => {
          const updatedFormValues = prevFormValues.map((item) => ({ ...item }));
          for (let stepIndex = 0; stepIndex < stepsData.length; stepIndex++) {
            updatedFormValues[stepIndex] = {
              ...updatedFormValues[stepIndex],
              insertedId: response.return.insertId
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
              ...response?.return[stepIndex] || response?.return[0]
            };
          }
          console.log("Response iS 1", updatedFormValues);
          return updatedFormValues;
        });
      }
      return response;
    };
    const ErrorResponseOfServer = (response) => {
      setSuccessResponse(false);
      return response;
    };
    const [allTagValues, setAllTagValues] = useState({});
    useEffect2(() => {
    }, [allTagValues]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    console.log("theme2: ", theme.palette);
    const columnCount = isSmallScreen ? 1 : multiColumn || 1;
    const form = /* @__PURE__ */ jsxs("form", { noValidate: true, onSubmit: handleSubmit, ref, children: [
      Array.isArray(fields) && Array.isArray(fields[currentStep]) && fields[currentStep].length > 0 ? /* @__PURE__ */ jsx3(Grid2, { container: true, spacing: 2, children: (() => {
        const stepFields = fields[currentStep].flat();
        const columns = Array.from({ length: columnCount }, () => []);
        stepFields.forEach((field, index) => {
          const isFullWidth = field?.type === "section" || field?.type === "listOfSections" || stepFields.length === 1;
          console.log("boxWidthboxWidth 0", boxWidth);
          const fieldComponent = /* @__PURE__ */ jsx3(Grid2, { item: true, xs: 12, children: renderFields({
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
            serverMode: config?.features?.fetchData?.operationalMode === "server",
            boxWidth: 200
          }) }, `field-${index}`);
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
          return columns.map((col, colIdx) => /* @__PURE__ */ jsx3(Grid2, { item: true, xs: 12 / columnCount, children: /* @__PURE__ */ jsx3(Grid2, { container: true, spacing: 2, direction: "column", children: col }) }, `column-${colIdx}`));
        }
      })() }) : null,
      /* @__PURE__ */ jsxs(Grid2, { children: [
        /* @__PURE__ */ jsxs(Box2, { display: "flex", justifyContent: "space-between", marginTop: 2, children: [
          Array.isArray(steps) && steps.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "outlined",
                onClick: handlePrevStep,
                disabled: currentStep === 0,
                children: "Previous"
              }
            ),
            /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "outlined",
                onClick: () => {
                  if (currentStep < fields.length - 1) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    handleDialogClose();
                  }
                },
                children: "Skip"
              }
            ),
            currentStep < (fields?.length || 0) - 1 && /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "contained",
                onClick: previousStep === 0 ? handleNextStep : () => {
                  setPreviousStep(previousStep - 1);
                  setCurrentStep(previousStep);
                },
                disabled: currentStep >= (fields?.length || 0) - 1 || isSubmitting,
                children: isSubmitting ? /* @__PURE__ */ jsx3(CircularProgress, { size: 20, color: "inherit" }) : mode === "view" ? "Next" : !queryParamsId ? "Next" : "Update"
              }
            )
          ] }),
          mode !== "view" && submission?.steps?.[currentStep]?.buttons?.map(
            (btn, index) => btn.type === "submit" ? /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "contained",
                type: "submit",
                disabled: isSubmitting,
                sx: { width: steps?.length === 1 ? "100%" : "auto" },
                children: isSubmitting ? /* @__PURE__ */ jsx3(CircularProgress, { size: 20, color: "inherit" }) : queryParamsId ? "Update" : btn?.label
              },
              index
            ) : null
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Box2,
          {
            display: "flex",
            flexDirection: "row",
            gap: 2,
            marginTop: 2,
            sx: { justifyContent: "space-between" },
            children: [
              submission?.steps?.[currentStep]?.buttons?.map(
                (btn, index) => btn.type !== "submit" && btn.type !== "close" ? /* @__PURE__ */ jsx3(
                  Button,
                  {
                    variant: "contained",
                    sx: {
                      backgroundColor: appearance?.features?.submission?.buttons?.find(
                        (bt) => bt.type === btn.type
                      )?.backgroundColor || " ",
                      color: appearance?.features?.submission?.buttons?.find(
                        (bt) => bt.type === btn.type
                      )?.color || "white",
                      margin: "5px"
                    },
                    onClick: (e) => {
                      if (btn.onClick) {
                        btn.onClick(e);
                      }
                    },
                    children: btn?.label
                  },
                  index
                ) : null
              ),
              currentStep === submission?.steps?.length - 1 && !submission?.steps?.[currentStep]?.buttons?.some(
                (btn) => btn.type === "submit"
              ) && /* @__PURE__ */ jsx3(
                Button,
                {
                  variant: "contained",
                  type: "submit",
                  sx: { width: steps?.length === 1 ? "100%" : "auto" },
                  children: "Submit"
                }
              )
            ]
          }
        )
      ] })
    ] });
    const renderStepperAndForm = () => /* @__PURE__ */ jsxs(Fragment, { children: [
      stepsData.length > 1 && /* @__PURE__ */ jsx3(BasicTabs, { tabs: stepsData, activeStep: currentStep }),
      form
    ] });
    if (isModal === true) {
      return /* @__PURE__ */ jsx3(Fragment, { children: /* @__PURE__ */ jsxs(
        Dialog,
        {
          open: closeButton ? true : openModal,
          onClose: isSubmitting ? void 0 : onlyClose,
          fullWidth: true,
          children: [
            /* @__PURE__ */ jsx3(
              DialogTitle,
              {
                sx: {
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  color: inputFields?.color,
                  backgroundColor: background?.color
                },
                children: /* @__PURE__ */ jsx3(IconButton, { onClick: isSubmitting ? void 0 : onlyClose, children: /* @__PURE__ */ jsx3(Close, {}) })
              }
            ),
            /* @__PURE__ */ jsx3(
              DialogContent,
              {
                sx: {
                  marginTop: "-30px",
                  backgroundColor: background?.color
                },
                children: /* @__PURE__ */ jsx3(
                  Box2,
                  {
                    ref: boxRef,
                    sx: {
                      color: inputFields?.color,
                      width: "100%",
                      marginTop: 2
                    },
                    children: renderStepperAndForm()
                  }
                )
              }
            )
          ]
        }
      ) });
    } else {
      return console.log(" ia m here in form ");
      /* @__PURE__ */ jsx3(
        Card2,
        {
          sx: {
            padding: "24px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginTop: "50px",
            marginBottom: "50px",
            color: "red",
            backgroundColor: "red"
          },
          children: renderStepperAndForm()
        }
      );
    }
  }
);
var Form_default = Form;
export {
  Form_default as Form
};
//# sourceMappingURL=index.mjs.map