import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().required("Phone number is required").matches(/^\d+$/, "Phone number must be numeric"),
});

const MyForm = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleOpenDialog = (values) => {
        setFormData(values);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <Formik
            initialValues={{ name: "", email: "", phone: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                handleOpenDialog(values);
            }}
        >
            {({ resetForm }) => (
                <div className="w-full max-w-lg mx-auto mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-center">Personal Details Form</h2>
                    <Form className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <Field name="name" type="text" className="mt-1 p-2 border border-gray-300 rounded w-full" />
                            <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <Field name="email" type="email" className="mt-1 p-2 border border-gray-300 rounded w-full" />
                            <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <Field name="phone" type="text" className="mt-1 p-2 border border-gray-300 rounded w-full" />
                            <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />
                        </div>

                        <div className="flex justify-between">
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => resetForm()}>
                                Reset
                            </Button>
                        </div>
                    </Form>

                    {/* Dialog for showing submitted data */}
                    <Dialog open={open} onClose={handleCloseDialog}>
                        <DialogTitle>Confirm Submission</DialogTitle>
                        <DialogContent>
                            <p><strong>Name:</strong> {formData?.name}</p>
                            <p><strong>Email:</strong> {formData?.email}</p>
                            <p><strong>Phone:</strong> {formData?.phone}</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Confirm
                            </Button>
                            <Button
                                onClick={() => {
                                    handleCloseDialog();
                                }}
                                color="secondary"
                            >
                                Edit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </Formik>
    );
};

export default MyForm;
