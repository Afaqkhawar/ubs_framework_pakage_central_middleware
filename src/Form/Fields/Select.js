import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  handleInputChange,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";
import { getServerResponse } from "central-middleware";

export default function SelectField({
  serverMode,
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
  parentValues,
  config,
}) {
  // console.log("formValuesIinSelect",formValues)
  const [options, setOptions] = useState(field?.options || []);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown open/close
  useEffect(() => {
    if (config?.viewMode?.mode === "edit") {
      handleFetchData();
    }
  }, [config?.viewMode?.mode]);
  const handleFetchData = async () => {
    console.log("handleFetchData", isFetching, options.length, options);
    if ((!isFetching && options.length === 0) || !options[0].label) {
      let apiUrl = field.selectServerUrl;
      console.log("apiUrl", apiUrl, field, formValues, formValues[currentStep]);

      // Check if field has dependencies and append their values to the API call
      if (Array.isArray(field.dependentOn) && field.dependentOn.length > 0) {
        field.dependentOn.forEach((dependency) => {
          const dependentValue = formValues[currentStep][dependency];
          if (dependentValue) {
            apiUrl += `&${dependency}=${dependentValue}`;
          }
        });
      } else {
        if (field.dependentOn && formValues[currentStep][field.dependentOn]) {
          apiUrl += `&${field.dependentOn}=${
            formValues[currentStep][field.dependentOn]
          }`;
        }
      }

      const sagaCommunication = {
        apiActionType: "",
        permission: true,
        requestType: "GET",
        apiUrl: apiUrl,
        metaData: true,
        body: {},
        reduxActionType: "",
        onSuccess: (res) => {
          setOptions(res.return);
        },
        onFailure: (err) => {
          console.error("Error from Server:", err);
        },
      };
      setIsFetching(true);
      await getServerResponse(sagaCommunication, "", "", setIsFetching);
    }
  };
  const handleChange = (e) => {
    console.log("handleChangeValues", e);
    const selectedOption = options.find((opt) => opt.value === e.target.value);

    const customEvent = {
      target: {
        name: field.dynamicKey,
        value: {
          value: selectedOption?.value || "",
          label: selectedOption?.label || "",
        },
      },
    };

    handleInputChange(
      customEvent,
      field,
      currentStep,
      formValues,
      setFormValues,
      errors,
      setErrors
    );

    // Clear dependent fields dynamically if the current field is changed
    if (Array.isArray(field.hasDependents)) {
      field.hasDependents.forEach((dependentKey) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          [dependentKey]: "", // Clear dependent values
        }));
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(field.dependentOn)) {
      // Check if any dependency field changes, then reset options
      field.dependentOn.forEach((dependency) => {
        if (formValues[currentStep][dependency]) {
          console.log(
            "Resetting options for",
            field.name,
            field.name != formValues[currentStep][dependency],
            formValues[currentStep]
          );
          // setOptions( field.name != formValues[currentStep][dependency] ?[]: options); // Clear previous options when dependency changes
        }
      });
    }
  }, [formValues, field.dependentOn, currentStep]);

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  if (!checkDependancy(field, formValues, parentValues)) {
    return null;
  } else {
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
      <FormControl fullWidth margin="normal">
        <InputLabel
          sx={{
            color: inputFields?.color,
            "&.Mui-focused": {
              color: inputFields?.color,
            },
            "&.MuiInputLabel-shrink": {
              color: inputFields?.color,
            },
            backgroundColor: "white",
            padding: "0 4px",
          }}
        >
          {field?.label}
        </InputLabel>
        <Select
          key={field?.name}
          name={field?.name}
          value={
            formValues &&
            formValues[currentStep] &&
            formValues[currentStep][field?.dynamicKey]?.value !== undefined
              ? formValues[currentStep][field?.dynamicKey]?.value
              : formValues[currentStep][field?.dynamicKey] || ""
          }
          onChange={handleChange}
          onOpen={() => {
            setIsDropdownOpen(true); // Open dropdown
            formValues &&
              formValues[currentStep] &&
              field?.selectServer &&
              handleFetchData();
          }} // Fetch data on open
          onClose={() => setIsDropdownOpen(false)} // Close dropdown
          variant={variant}
          required={isRequired && field.required}
          disabled={field?.disabled || isReadOnly}
          error={Boolean(errors[field?.dynamicKey])}
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
                color: inputFields?.color,
              },
            }),
          }}
        >
          <Box sx={{ p: 1 }} onClick={(e) => e.stopPropagation()}>
            {/* Stop event propagation */}
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                paddingLeft: "6px", // Add space from the left (adjust as needed)
                mb: 1,
              }}
              onClick={(e) => e.stopPropagation()} // Stop event propagation
              onKeyDown={(e) => e.stopPropagation()} // Stop event propagation
            />
          </Box>
          {Array.isArray(options) &&
          options.length > 0 &&
          options.every((opt) => typeof opt === "object" && opt !== null) ? (
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option?.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>
              {isFetching ? "Loading..." : "No options available"}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
