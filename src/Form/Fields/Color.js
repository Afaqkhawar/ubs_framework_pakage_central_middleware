import { 
    Box, 
    FormControl, 
    InputLabel, 
    TextField } from "@mui/material";
    
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function ColorField({
serverMode,
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

    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: 2,
          mt: "-35px",
          marginBottom: "-20px",
        }}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel
            sx={{
              color: inputFields?.color,
              "&.Mui-focused": { color: inputFields?.color },
              "&.MuiInputLabel-shrink": { color: inputFields?.color },
              backgroundColor: "white",
              padding: "0 3px",
              top: "-8px",
              fontSize: "11px",
            }}
          >
            {field.label}
          </InputLabel>
          <TextField
            key={field.name}
            name={field.name}
            type="color"
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
            fullWidth
            margin="normal"
            defaultValue={field.defaultValue}
            value={
              Array.isArray(formValues)
                ? formValues[currentStep]?.[field?.dynamicKey] || ""
                : formValues[field?.dynamicKey] || ""
            }
            variant={variant}
            required={isRequired && field.required}
            disabled={field.disabled || isReadOnly}
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
                "& .MuiSelect-icon": { color: inputFields?.color },
              }),
            }}
          />
        </FormControl>
      </Box>
    );
  }
}
