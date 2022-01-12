import React from 'react';
import {Formik,Form,Field} from 'formik';
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
            firstname: Yup.string()
            .min(5,'Should be 5 character long')
            .max(15,'should not exceed 15 characters')
            .required('Required'),

            lastname: Yup.string()
            .min(4,'Should be 4 character long')
            .max(15,'should not exceed 15 characters')
            .required('Required'),

            email:Yup.string()
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
            initialValues = {
                {
                firstname:'',
                lastname:'',
                email:'',
                password:''
                }
            }
            validationSchema = {SignUpSchema}
            onSubmit = {values => {
                alert(values);
            }}
            >
            { ({errors,touched}) => (
                <Form>
                 <Field name="firstname" placeholder="Enter Your First Name"/>
                 {
                     errors.firstname && touched.firstname ? (<div>{errors.firstname}</div>) : null
                 }<br></br><br></br>
                 <Field name="lastname"placeholder="Enter Your Last Name" />
                 {
                     errors.lastname && touched.lastname ? (<div>{errors.lastname}</div>) : null
                 }<br></br><br></br>
                 <Field name="email"placeholder='Email Address' validate={validateEmail} />
                 {
                     errors.email && touched.email ? (<div>{errors.email}</div>) : null
                 }<br></br><br></br>
                 <Field name="password"placeholder='Enter Any Password' />
                 {
                     errors.password && touched.password ?(<div>{errors.password}</div>) :null
                 }<br></br><br></br>
                 
                 <button type="submit" className="btn btn-success">Submit</button>
                 </Form>
            )}

            </Formik>
        </div>
    )
}

export default FormikYup;