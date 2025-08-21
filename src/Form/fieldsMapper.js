const inlineProps = [
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
  "boxWidth",
];

const mapper = [
  {
    type: "section",
    component: "SectionField",
    inlineProps: inlineProps,
  },
  {
    type: "listOfFields",
    component: "ListOfFields",
    inlineProps: inlineProps,
  },
  {
    type: "textField",
    component: "TextFieldRender",
    inlineProps: inlineProps,
  },
  // {
  //   type: "select",
  //   component: "SelectFieldRender",
  //   inlineProps: inlineProps,
  // },
  {
    type: "tableOfFields",
    component: "TableOfFields",
    inlineProps: inlineProps,
  },
  // {
  //   type: "multiSelect",
  //   component: "MultiSelectFieldRender",
  //   inlineProps: inlineProps,
  // },
  {
    type: "number",
    component: "NumberFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "textArea",
    component: "TextAreaFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "checkbox",
    component: "CheckboxFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "color",
    component: "ColorFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "url",
    component: "URLFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "section",
    component: "Section",
    inlineProps: inlineProps,
  },
  {
    type: "range",
    component: "RangeFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "radio",
    component: "RadioFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "password",
    component: "PasswordFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "time",
    component: "TimeFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "date",
    component: "DateFieldRender",
    inlineProps: inlineProps,
  },
  {
    type: "dateTime",
    component: "DateTimeFieldRender",
    inlineProps: inlineProps,
  },
  // {
  //   type: "file",
  //   component: "FileFieldRender",
  //   inlineProps: inlineProps,
  // },
  {
    type: "selectDependant",
    component: "SelectDependant",
    inlineProps: inlineProps,
  },
  {
    type: "selectOnFields",
    component: "SelectOnFieldsRender",
    inlineProps: inlineProps,
  },
  {
    type: "report",
    component: "Report",
    inlineProps: inlineProps,
  },
  {
    type: "email",
    component: "EmailFieldRender",
    inlineProps: inlineProps,
  },
];

export default mapper;
