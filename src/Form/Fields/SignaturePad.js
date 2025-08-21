import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Button,
} from '@mui/material';
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";
import SignatureCanvas from 'react-signature-canvas';

// Note: Ensure you have the react-signature-canvas package installed
// npm install react-signature-canvas@1.0.6

const SignaturePadFieldRender = ({
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
    const [signature, setSignature] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(500);
    const canvasHeight = 200;
    const containerRef = useRef();
    const sigCanvasRef = useRef();

    useEffect(() => {
        if (containerRef.current) {
            const updateSize = () => {
                setCanvasWidth(containerRef.current.offsetWidth);
            };
            updateSize();
            window.addEventListener('resize', updateSize);
            return () => window.removeEventListener('resize', updateSize);
        }
    }, []);

    const clearSignature = () => {
        sigCanvasRef.current.clear();
        setSignature(null);
    };

    const handleSignatureEnd = () => {
        const signatureData = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
        setSignature(signatureData);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', gap: 1 }}>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '17px' }}>
                    Signature
                </Typography>
            </Box>
            <Box
                ref={containerRef}
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                <SignatureCanvas
                    ref={sigCanvasRef}
                    penColor='green'
                    minWidth={1}
                    maxWidth={3} // pen thickness
                    clearOnResize={false}
                    onEnd={handleSignatureEnd}
                    canvasProps={{
                        width: canvasWidth,
                        height: canvasHeight,
                        className: 'sigCanvas',
                        style: { display: 'block', userSelect: 'none', backgroundColor: "#fff" }
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: 'flex-end' }}>
                <Button variant="contained" size="small" onClick={clearSignature}>
                    Clear Signature
                </Button>
            </Box>

            {/* ---------- Uncomment below to check the signature preview if needed ---------- */}
            {/* {signature && (
                <Box>
                    <img src={signature} alt="Signature Preview" style={{ maxWidth: '100%' }} />
                </Box>
            )} */}
        </Box>
    )
}

export default SignaturePadFieldRender;