import { TextField, Box } from "@mui/material";
import {
  handleInputChange,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";

export default function DateTimeField({
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
  parentFields,
}) {
  console.log("formValues[currentStep]:", formValues[currentStep]);
  console.log("field.dynamicKey:", field.dynamicKey);
  console.log(
    "Value at formValues[currentStep][field.dynamicKey]:",
    formValues[currentStep]?.[field?.dynamicKey]
  );

  const rawValue = formValues[currentStep]?.[field.dynamicKey];

  const parsedValue = rawValue
    ? new Date(rawValue).toISOString().slice(0, 16)
    : "";

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  if (!checkDependancy(field, formValues, parentValues)) {
    return null; // Skip rendering if field is not dependent on any other field
  } else {
    if (field.isPrefilled) {
      // Now use it to get the dateValue safely

      const toPrefill = field.prefillField;
      let fieldFound = undefined;
      const findField = (field, toPrefill) => {
        if (field.type === "section") {
          field.childFields.map((child) => {
            const found = findField(child, toPrefill);
            if (found) return found;
          });
        } else {
          if (field.dynamicKey === toPrefill) {
            fieldFound = field;
          }
        }
      };

      fields.map((step) => {
        step[0].map((field) => {
          findField(field, toPrefill);
        });
      });

      if (!fieldFound) {
        parentFields.map((step) => {
          step[0].map((field) => {
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
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 2,
        mb: 2,
      }}
    >
      <TextField
        key={field.name}
        name={field.name}
        label={field.label}
        InputLabelProps={{
          shrink: true,
        }}
        type="datetime-local"
        inputProps={{}}
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
        value={parsedValue}
        variant={variant}
        required={isRequired && field.required}
        disabled={field?.disabled || isReadOnly}
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey]}
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
                color: inputFields?.color,
              },
            },
            "& .MuiInputLabel-root": {
              color: inputFields?.color,
              "&.Mui-focused": {
                color: inputFields?.color,
              },
            },
            "& .MuiInputLabel-shrink": {
              color: inputFields?.color,
            },
          }),
        }}
      />
    </Box>
  );
}
