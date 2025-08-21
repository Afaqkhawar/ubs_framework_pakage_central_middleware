import React, { useState, useEffect } from "react";
import { data, config, appearance } from "./Report/reportConfig";
import AddReport from "./Report/addReport";
import { handleInputChange, initializeFieldValues, renderFields } from "./HelperFunctions";

export default function Report({
  field,
  formValues,
  isRequired,
  isReadOnly,
  setFormValues,
  allTagValues,
  setAllTagValues,
  currentStep
}) {

  const listField = {
    name: "tags",
    dynamicKey: "tags",
    type: "listOfFields",
    label: "Add Tags",
    childFields: [
      {
        name: "label",
        dynamicKey: "label",
        label: "Label",
        type: "textField",
      },
      {
        name: "value",
        dynamicKey: "value",
        label: "Value",
        type: "textField",
      },
    ],
  };

  const key = field.dynamicKey;

  const [tagValues, setTagValues] = useState(allTagValues[key] || []);
  const [tagKeys, setTagKeys] = useState([]);

  // console.log("tagValues: ", tagValues);
  // console.log("listField: ", listField);

  const [editorContent, setEditorContent] = useState("");

  initializeFieldValues (field, formValues[currentStep]);
  data.features.textCustomization.content = formValues[currentStep][key];

  // Callback function to receive content from AddReport
  const handleContentChange = (content) => {
    setEditorContent(content); // Update the state with the formatted content
    data.features.textCustomization.content = editorContent;
    formValues[currentStep][key] = editorContent;

  };

  useEffect(() => {

    setAllTagValues({[field.dynamicKey] : tagValues});
    //listField.value = tagValues[0]?.tags;

    if (tagValues[0]?.tags){
      // Transform the array by encapsulating each `value` in `{}` brackets
      const transformedTags = tagValues[0].tags.map(tag => ({
        ...tag,
        value: `{${tag.value}}`
      }));
  
      data.features.textCustomization.predefinedTags = transformedTags;
    }
  }, [tagValues]);


  return (
    <>
      {renderFields({
        field: listField,
        formValues: tagValues,
        inputFields: [],
        isReadOnly,
        isReadOnly,
        setFormValues: setTagValues,
        allTagValues,
        setAllTagValues,
        currentStep: 0,
        formKeys: tagKeys,
        setFormKeys: setTagKeys,
        fields: [listField],
      })}
      <AddReport data={data} config={config} appearance={appearance} onContentChange={handleContentChange} />
    </>
  );
}
