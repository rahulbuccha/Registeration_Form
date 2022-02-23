import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'


function FormikYup() {
    function validateEmail(value) {
        let error;
        if (!value) {
            error = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error;
    }


    const SignUpSchema = Yup.object().shape(
        {
            name: Yup.string()
                .max(10, 'should not exceed 10 characters')
                .required('Required'),
            number: Yup.string()
                .min(10, 'perfect')
                .max(10, 'should not exceed 10 characters')
                .required('Required'),

            email: Yup.string()
                .email('invalid email address')
                .required('Required'),

            password: Yup.string()
                .required('Please Enter your password')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
        }
    );
    return (
        <div className='center'>
            <p><ins>Registration Form</ins></p>
            <Formik
                initialValues={
                    {
                        name: '',
                        number: '',
                        email: '',
                        password: ''
                    }
                }
                validationSchema={SignUpSchema}
                onSubmit={values => {
                    alert(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="name" placeholder="Enter Your Name" />
                        {
                            errors.name && touched.name ? (<div>{errors.name}</div>) : null
                        }<br></br><br></br>
                        <Field name="number" placeholder="Enter Your Number" />
                        {
                            errors.number && touched.number ? (<div>{errors.number}</div>) : null
                        }<br></br><br></br>

                        <Field name="email" placeholder='Email Address' validate={validateEmail} />
                        {
                            errors.email && touched.email ? (<div>{errors.email}</div>) : null
                        }<br></br><br></br>
                        <Field name="password" placeholder='Enter Any Password' minlength='10' />
                        {
                            errors.password && touched.password ? (<div>{errors.password}</div>) : null
                        }<br></br><br></br>

                        <button type="submit" className="btn btn-success">Register</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FormikYup;