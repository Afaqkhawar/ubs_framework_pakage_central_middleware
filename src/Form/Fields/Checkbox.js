import { Box, FormControl, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function CheckboxField({
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
  parentValues,
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
    initializeFieldValues (field, formValues[currentStep]);

    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: 2,
          mb: "-30px",
          mt: "-10px",
        }}
      >
        <FormControl key={field.name} fullWidth margin="normal">
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={
                  !!formValues[currentStep][field.dynamicKey] || false
                }
                value={formValues[currentStep][field.dynamicKey] || false}
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
                name={field.name}
                required={isRequired && field.required}
                disabled={field.disabled || isReadOnly}
                sx={{
                  color:
                    field.required && !formValues[currentStep][field.dynamicKey]
                      ? "#ca3238"
                      : inputFields?.color,
                  ...(inputFields && {
                    "&.Mui-checked": {
                      color:
                        field.required &&
                        !formValues[currentStep][field.dynamicKey]
                          ? "#ca3238"
                          : inputFields?.color,
                    },
                  }),
                }}
              />
            }
            label={field.label}
          />
          {errors[field?.dynamicKey] && (
            <Typography color="#ca3238" variant="caption">
              {errors[field?.dynamicKey]}
            </Typography>
          )}
        </FormControl>
      </Box>
    );
  }
}
