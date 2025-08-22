var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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

// index.js
var test_graph_builder_exports = {};
__export(test_graph_builder_exports, {
  Form: () => Form_default
});
module.exports = __toCommonJS(test_graph_builder_exports);

// src/Form/Form.js
var import_react2 = __toESM(require("react"));
var import_material3 = require("@mui/material");
var import_react_redux = require("react-redux");
var import_icons_material = require("@mui/icons-material");
var import_material4 = require("@mui/material");

// src/Form/Fields/HelperFunctions.js
var import_form_fields_react = require("form-fields-react");

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
var import_material = require("@mui/material");
var import_createTransitions = require("@mui/material/styles/createTransitions.js");
var import_jsx_runtime = require("react/jsx-runtime");
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
  SectionField: import_form_fields_react.SectionField,
  TextFieldRender: import_form_fields_react.TextFieldRender,
  SelectFieldRender: import_form_fields_react.SelectFieldRender,
  MultiSelectFieldRender: import_form_fields_react.MultiSelectFieldRender,
  NumberFieldRender: import_form_fields_react.NumberFieldRender,
  TextAreaFieldRender: import_form_fields_react.TextAreaFieldRender,
  CheckboxFieldRender: import_form_fields_react.CheckboxFieldRender,
  ColorFieldRender: import_form_fields_react.ColorFieldRender,
  URLFieldRender: import_form_fields_react.URLFieldRender,
  RangeFieldRender: import_form_fields_react.RangeFieldRender,
  RadioFieldRender: import_form_fields_react.RadioFieldRender,
  PasswordFieldRender: import_form_fields_react.PasswordFieldRender,
  TimeFieldRender: import_form_fields_react.TimeFieldRender,
  DateFieldRender: import_form_fields_react.DateFieldRender,
  DateTimeFieldRender: import_form_fields_react.DateTimeFieldRender,
  FileFieldRender: import_form_fields_react.FileFieldRender,
  SelectDependant: import_form_fields_react.SelectDependant,
  SelectOnFieldsRender: import_form_fields_react.SelectOnFieldsRender,
  Report: import_form_fields_react.Report,
  // TableOfFields,
  EmailFieldRender: import_form_fields_react.EmailFieldRender,
  ListOfSections: import_form_fields_react.ListOfSections,
  PhoneNumberFieldRender: import_form_fields_react.PhoneNumberFieldRender
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...props });
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
var import_react = __toESM(require("react"));
var import_Card = __toESM(require("@mui/material/Card"));
var import_material2 = require("@mui/material");
var import_prop_types = __toESM(require("prop-types"));
var import_Tabs = __toESM(require("@mui/material/Tabs"));
var import_Tab = __toESM(require("@mui/material/Tab"));
var import_Box = __toESM(require("@mui/material/Box"));
var import_jsx_runtime2 = require("react/jsx-runtime");
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      role: "tabpanel",
      hidden: value !== index,
      id: `simple-tabpanel-${index}`,
      "aria-labelledby": `simple-tab-${index}`,
      ...other,
      children: value === index && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_Box.default, { sx: { p: 3 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.Typography, { children }) })
    }
  );
}
TabPanel.propTypes = {
  children: import_prop_types.default.node,
  index: import_prop_types.default.number.isRequired,
  value: import_prop_types.default.number.isRequired
};
function BasicTabs({ tabs, activeStep = 0 }) {
  const [currentStep, setCurrentStep] = import_react.default.useState(activeStep);
  (0, import_react.useEffect)(() => {
    console.log(activeStep);
    setCurrentStep(activeStep);
  }, [activeStep]);
  const a11yProps = (index) => ({
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-panel-${index}`
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_Box.default,
    {
      sx: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_Tabs.default,
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
          children: tabs.map((tab, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_Tab.default,
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
  tabs: import_prop_types.default.arrayOf(
    import_prop_types.default.shape({
      label: import_prop_types.default.string.isRequired,
      // Fixed prop name
      content: import_prop_types.default.node.isRequired
    })
  ).isRequired,
  activeStep: import_prop_types.default.number.isRequired
};

// src/Form/Form.js
var import_central_middleware = require("central-middleware");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Form = (0, import_react2.forwardRef)(
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
    const { main } = (0, import_react_redux.useSelector)((state) => state);
    const dispatch = (0, import_react_redux.useDispatch)();
    const [currentStep, setCurrentStep] = (0, import_react2.useState)(0);
    const [openModal, setOpenModal] = (0, import_react2.useState)(isModalOpen);
    const { features: { submission } = {} } = data || {};
    const { viewMode: { presentation, mode } = {} } = config || {};
    const [previousStep, setPreviousStep] = (0, import_react2.useState)(0);
    const [successResponse, setSuccessResponse] = (0, import_react2.useState)(false);
    const [submitError, setSubmitError] = (0, import_react2.useState)(null);
    const [isSubmitting, setIsSubmitting] = (0, import_react2.useState)(false);
    const [currentId, setCurrentId] = (0, import_react2.useState)("");
    const boxRef = (0, import_react2.useRef)(null);
    const [boxWidth, setBoxWidth] = (0, import_react2.useState)(0);
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
    const [localCopyFormKeys, setLocalCopyFormKeys] = (0, import_react2.useState)(formKeysPass);
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
    (0, import_react2.useEffect)(() => {
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
    (0, import_react2.useEffect)(() => {
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
        (0, import_central_middleware.getServerResponse)(
          serverCommunication,
          `&step=${currentSteps + 1}`,
          queryParamsId2
        );
        console.log("currentSteps is in if", serverCommunication);
      } else {
        console.log("currentSteps is", currentSteps);
        (0, import_central_middleware.getServerResponse)(
          serverCommunication,
          `&step=${currentStep + 1}`,
          queryParamsId2
        );
      }
    }
    (0, import_react2.useEffect)(() => {
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
    const [formValues, setFormValues] = (0, import_react2.useState)(initialFormValues);
    (0, import_react2.useEffect)(() => {
      console.log("formValuess which 1", formValues);
    }, [formValues]);
    const steps = submission?.steps?.map((step) => `${step.title}`);
    const [errors, setErrors] = (0, import_react2.useState)({});
    const [formKeys, setFormKeys] = (0, import_react2.useState)([]);
    const [fields, setFields] = (0, import_react2.useState)([]);
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
        (0, import_central_middleware.showWarningToast)("Please fill all required fields.");
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
            (0, import_central_middleware.showSuccessToast)("Data submitted successfully!");
          }
          SuccessResponseOfServer(res);
          setIsSubmitting(false);
          sagaCommunication.onSuccess = null;
        }, updatedOnFailure = function(err) {
          if (typeof onFailure === "function") {
            (0, import_central_middleware.showErrorToast)(
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
            (0, import_central_middleware.getServerResponse)(
              sagaCommunication,
              `&step=${currentSteps + 1}`,
              id
            );
          } else {
            (0, import_central_middleware.getServerResponse)(
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
          (0, import_central_middleware.showWarningToast)("Please fill all required fields.");
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
              (0, import_central_middleware.showErrorToast)("Error32: ");
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
              (0, import_central_middleware.getServerResponse)(
                sagaCommunication,
                `&step=${currentSteps + 1}`,
                id
              );
            } else {
              (0, import_central_middleware.getServerResponse)(
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
    const [allTagValues, setAllTagValues] = (0, import_react2.useState)({});
    (0, import_react2.useEffect)(() => {
    }, [allTagValues]);
    const theme = (0, import_material3.useTheme)();
    const isSmallScreen = (0, import_material3.useMediaQuery)(theme.breakpoints.down("sm"));
    console.log("theme2: ", theme.palette);
    const columnCount = isSmallScreen ? 1 : multiColumn || 1;
    const form = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("form", { noValidate: true, onSubmit: handleSubmit, ref, children: [
      Array.isArray(fields) && Array.isArray(fields[currentStep]) && fields[currentStep].length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.Grid, { container: true, spacing: 2, children: (() => {
        const stepFields = fields[currentStep].flat();
        const columns = Array.from({ length: columnCount }, () => []);
        stepFields.forEach((field, index) => {
          const isFullWidth = field?.type === "section" || field?.type === "listOfSections" || stepFields.length === 1;
          console.log("boxWidthboxWidth 0", boxWidth);
          const fieldComponent = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.Grid, { item: true, xs: 12, children: renderFields({
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
          return columns.map((col, colIdx) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.Grid, { item: true, xs: 12 / columnCount, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.Grid, { container: true, spacing: 2, direction: "column", children: col }) }, `column-${colIdx}`));
        }
      })() }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_material3.Grid, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_material3.Box, { display: "flex", justifyContent: "space-between", marginTop: 2, children: [
          Array.isArray(steps) && steps.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_material3.Button,
              {
                variant: "outlined",
                onClick: handlePrevStep,
                disabled: currentStep === 0,
                children: "Previous"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_material3.Button,
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
            currentStep < (fields?.length || 0) - 1 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_material3.Button,
              {
                variant: "contained",
                onClick: previousStep === 0 ? handleNextStep : () => {
                  setPreviousStep(previousStep - 1);
                  setCurrentStep(previousStep);
                },
                disabled: currentStep >= (fields?.length || 0) - 1 || isSubmitting,
                children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material4.CircularProgress, { size: 20, color: "inherit" }) : mode === "view" ? "Next" : !queryParamsId ? "Next" : "Update"
              }
            )
          ] }),
          mode !== "view" && submission?.steps?.[currentStep]?.buttons?.map(
            (btn, index) => btn.type === "submit" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_material3.Button,
              {
                variant: "contained",
                type: "submit",
                disabled: isSubmitting,
                sx: { width: steps?.length === 1 ? "100%" : "auto" },
                children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material4.CircularProgress, { size: 20, color: "inherit" }) : queryParamsId ? "Update" : btn?.label
              },
              index
            ) : null
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          import_material3.Box,
          {
            display: "flex",
            flexDirection: "row",
            gap: 2,
            marginTop: 2,
            sx: { justifyContent: "space-between" },
            children: [
              submission?.steps?.[currentStep]?.buttons?.map(
                (btn, index) => btn.type !== "submit" && btn.type !== "close" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  import_material3.Button,
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
              ) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                import_material3.Button,
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
    const renderStepperAndForm = () => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
      stepsData.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(BasicTabs, { tabs: stepsData, activeStep: currentStep }),
      form
    ] });
    if (isModal === true) {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        import_material3.Dialog,
        {
          open: closeButton ? true : openModal,
          onClose: isSubmitting ? void 0 : onlyClose,
          fullWidth: true,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_material3.DialogTitle,
              {
                sx: {
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  color: inputFields?.color,
                  backgroundColor: background?.color
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.IconButton, { onClick: isSubmitting ? void 0 : onlyClose, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons_material.Close, {}) })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_material3.DialogContent,
              {
                sx: {
                  marginTop: "-30px",
                  backgroundColor: background?.color
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  import_material3.Box,
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
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_material3.Card,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Form
});
//# sourceMappingURL=index.js.map