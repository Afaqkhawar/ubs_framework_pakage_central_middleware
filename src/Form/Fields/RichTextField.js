import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextField.css';
import {
    Box,
} from '@mui/material';
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

// Note: Ensure you have the react-quill package installed
// npm i react-quill

// Toolbar configuration
const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ 'align': [] }],
    ['clean']
];

// Formats allowed in the editor
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image', 'video',
    'align',
    'clean'
];

const RichTextFieldRender = ({
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
    const [value, setValue] = useState('');

    useEffect(() => {
        console.log("Rich TextField Value", value);
    }, [value]);

    const handleChange = (content, delta, source, editor) => {
        setValue(content);
        // const html = editor.getHTML();
    };

    return (
        <Box className="ql-container ql-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                modules={{ toolbar: toolbarOptions }}
                formats={formats}
            />
        </Box>
    )
}

export default RichTextFieldRender