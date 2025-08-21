import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
  
import { selectDependantField, handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function SelectOnFields({
  field,
  errors,
  setErrors,
  isRequired,
  isReadOnly,
  inputFields,
  formValues,
  setFormValues,
  currentStep,
  variant,
  formKeys,
  parentValues,
  fields,
  parentFields
}) {

  if (field.hidden){
    initializeFieldValues (field, formValues[currentStep])
    return null;
  }

  if (!checkDependancy (field, formValues, parentValues)) {
    return null; // Skip rendering if field is not dependent on any other field
  }
  else{
    if (field.isPrefilled) {
      const toPrefill = field.prefillField;
      let fieldFound = undefined;
      const findField = (field, toPrefill) => {
        if (field.type === "section"){
          field.childFields.map(child => {
            const found = findField(child, toPrefill)
            if (found) return found
          })
        }
        else {
          if (field.dynamicKey === toPrefill) {
            fieldFound = field
          }
        }
      }

      fields.map(step => {
        step[0].map(field => {
          findField(field, toPrefill)
        })
      }) 

      if (!fieldFound) {
        parentFields.map(step => {
          step[0].map(field => {
            findField(field, toPrefill)
          })
        }) 
      }

      let dependantFieldValue = null;

      // Function to search for dependantField in provided values object
      const findDependantFieldValue = (values) => {
        for (let step in values) {
          if (values[step][field.prefillField] !== undefined) {
            return values[step][field.prefillField];
          }
        }
        return null;
      };

      // First, try to find the value in formValues
      dependantFieldValue = findDependantFieldValue(formValues);

      // If not found, try to find the value in parentValues
      if (dependantFieldValue === null && parentValues) {
        dependantFieldValue = findDependantFieldValue(parentValues);
      }

      if (fieldFound) {
        if (field.type === fieldFound.type) {
          if (dependantFieldValue) {
            formValues[currentStep][field.dynamicKey] = dependantFieldValue
          }
        }
      }
    }
    initializeFieldValues (field, formValues[currentStep])
  }
  const optionsAdded = [];
  formKeys.map(key => {
    const keyToAdd = { 
      value: key,
      label: key
    };

    optionsAdded.push(keyToAdd)
  })

  field.options = optionsAdded

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flexStart",
        gap: 2,
        mb: 2,
      }}
    >
      <FormControl fullWidth margin="normal">
        <InputLabel
          sx={{
            color: inputFields?.color, // Default color for label
            "&.Mui-focused": {
              color: inputFields?.color, // Color when focused
            },
            "&.MuiInputLabel-shrink": {
              color: inputFields?.color, // Color when label shrinks
            },
            backgroundColor: "white",
            padding: "0 4px",
          }}
        >
          {field.label}
        </InputLabel>
        <Select
          key={field.name}
          name={field.name}
          defaultValue={field.defaultValue}
          value={
        Array.isArray(formValues)
          ? formValues[currentStep]?.[field?.dynamicKey] || ""
          : formValues[field?.dynamicKey] || ""
      }
          onChange={(e) =>
            handleInputChange(
              e,
              field,
              currentStep,
              formValues,
              setFormValues,
              errors,
              setErrors
            )
          }
          margin="normal"
          variant={variant}
          required={isRequired && field.required}
          disabled={field.disabled || isReadOnly}
          error={Boolean(errors[field?.dynamicKey])} // Show error if exists
          helperText={errors[field?.dynamicKey]} // Show error message
          sx={{
            ...(inputFields && {
              color: inputFields?.color,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: inputFields?.color,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: inputFields?.color,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: inputFields?.color,
              },
              "& .MuiSelect-icon": {
                color: inputFields?.color, // Dropdown arrow icon color
              },
            }),
          }}
        >
          {field.options &&
            field.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
