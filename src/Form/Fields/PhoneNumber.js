import React from 'react';
import {
    Box,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './PhoneNumber.css';
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

// Install the package for phone number input
// npm i react-phone-input-2

const PhoneNumberFieldRender = ({
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
}) => {

    // ---------- Handle Hidden ----------
    if (field.hidden) {
        initializeFieldValues(field, formValues[currentStep]);
        return null;
    }

    // ---------- Handle Dependency ----------
    if (!checkDependancy(field, formValues, parentValues)) {
        return null;
    }

    // ---------- Handle Prefill ----------
    if (field.isPrefilled) {
        const toPrefill = field.prefillField;
        let fieldFound = undefined;

        const findField = (f, toPrefill) => {
            if (f.type === "section") {
                f.childFields.forEach((child) => {
                    const found = findField(child, toPrefill);
                    if (found) return found;
                });
            } else {
                if (f.dynamicKey === toPrefill) {
                    fieldFound = f;
                }
            }
        };

        fields.forEach((step) => {
            step[currentStep].forEach((f) => {
                findField(f, toPrefill);
            });
        });

        if (!fieldFound) {
            parentFields.forEach((step) => {
                step[currentStep].forEach((f) => {
                    findField(f, toPrefill);
                });
            });
        }

        let dependantFieldValue = null;

        const findDependantFieldValue = (values) => {
            for (let step in values) {
                if (values[step][field.prefillField] !== undefined) {
                    return values[step][field.prefillField];
                }
            }
            return null;
        };

        dependantFieldValue = findDependantFieldValue(formValues);

        if (dependantFieldValue === null && parentValues) {
            dependantFieldValue = findDependantFieldValue(parentValues);
        }

        if (fieldFound && field.type === fieldFound.type) {
            if (dependantFieldValue) {
                formValues[currentStep][field.dynamicKey] = dependantFieldValue;
            }
        }
    }

    // ---------- Initialize Values ----------
    initializeFieldValues(field, formValues[currentStep]);

    // ---------- On Change ----------
    const handleChange = (value) => {
        handleInputChange(
            { target: { name: field.name, value } },
            field,
            currentStep,
            formValues,
            setFormValues,
            errors,
            setErrors
        );
    };

    return (
        <Box
            sx={{
                marginY: 2.5,
                ...(inputFields && {
                    "& .react-tel-input": {
                        width: "100%",
                    },
                    "& .form-control": {
                        borderColor: inputFields?.color,
                        "&:focus": {
                            borderColor: inputFields?.color,
                            boxShadow: `0 0 0 2px ${inputFields?.color}33`,
                        },
                    },
                }),
            }}
        >
            <PhoneInput
                country={'us'}
                value={
                    Array.isArray(formValues)
                        ? formValues[currentStep]?.[field?.dynamicKey] || ""
                        : formValues[field?.dynamicKey] || ""
                }
                onChange={handleChange}
                inputProps={{
                    name: field.name,
                    required: isRequired && field.required,
                    disabled: field.disabled || isReadOnly,
                }}
                containerStyle={{
                    width: "100%",
                    borderRadius: "8px",
                }}
                inputStyle={{
                    width: "100%",
                    height: '56px',
                    borderRadius: "8px",
                }}
            />
            {errors[field?.dynamicKey] && (
                <Box sx={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
                    {errors[field?.dynamicKey]}
                </Box>
            )}
        </Box>
    )
}

export default PhoneNumberFieldRender;