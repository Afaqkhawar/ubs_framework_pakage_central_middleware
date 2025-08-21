import {
    TextField,
    Typography
  } from "@mui/material";
  
  import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";
  
  export default function email({
    field,
    inputFields,
    formValues,
    isRequired,
    isReadOnly,
    setFormValues,
    currentStep,
    errors,
    setErrors,
    variant,
    parentValues,
    ancestorsInfo,
    formKeys,
    setFormKeys,
    fields,
    parentFields
  }) {
  
    if (field.hidden) {
      initializeFieldValues(field, formValues[currentStep]);
      return null;
    }
  
    if (!checkDependancy(field, formValues, parentValues)) {
      return null; // Skip rendering if field is not dependent on any other field
    } 
    else {
      if (field.isPrefilled) {
        const toPrefill = field.prefillField;
        let fieldFound = undefined;
        const findField = (field, toPrefill) => {
          if (field.type === "section") {
            field.childFields.map(child => {
              const found = findField(child, toPrefill);
              if (found) return found;
            });
          } else {
            if (field.dynamicKey === toPrefill) {
              fieldFound = field;
            }
          }
        };
  
        fields.map(step => {
          step[0].map(field => {
            findField(field, toPrefill);
          });
        });
  
        if (!fieldFound) {
          parentFields.map(step => {
            step[0].map(field => {
              findField(field, toPrefill);
            });
          });
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
              formValues[currentStep][field.dynamicKey] = dependantFieldValue;
            }
          }
        }
      }
      initializeFieldValues(field, formValues[currentStep]);
    }
  
    return (
      <>
      <TextField
        key={field?.name}
        type="email"
        fullWidth
        name={field?.name}
        label={field?.label}
        //value={formValues[currentStep][field?.dynamicKey] || ""}
        value={
          Array.isArray(formValues)
            ? formValues[currentStep]?.[field?.dynamicKey] || ""
            : formValues[field?.dynamicKey] || ""
        }
        margin="normal"
        onChange={(e) =>
          handleInputChange(
            e,
            field,
            currentStep,
            formValues,
            setFormValues,
            errors,
            setErrors,
            ancestorsInfo,
            formKeys,
            setFormKeys
          )
        }
        variant={variant}
        required={isRequired && field.required}
        disabled={field?.disabled || isReadOnly}
        error={Boolean(errors[field?.name])} // Show error if exists
        helperText={errors[field?.name]} // Show error message
        InputProps={{
          inputProps: {
            minLength: field?.min,
            maxLength: field?.max,
            pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", // Email pattern
          },
        }}
        sx={{
          ...(inputFields && {
            color: inputFields?.color,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: inputFields?.color,
              },
              "&:hover fieldset": {
                borderColor: inputFields?.color,
              },
              "&.Mui-focused fieldset": {
                borderColor: inputFields?.color,
              },
              "& input": {
                color: inputFields?.color, // Text color of the input
              },
            },
            "& .MuiInputLabel-root": {
              color: inputFields?.color, // Default label color
              "&.Mui-focused": {
                color: inputFields?.color, // Keep label color when focused
              },
            },
            "& .MuiInputLabel-shrink": {
              color: inputFields?.color, // Label color when it shrinks
            },
          }),
        }}
      />
      <Typography color="error" variant="caption">
        {errors[field.dynamicKey]}
      </Typography>
      </>
    );
  }
  