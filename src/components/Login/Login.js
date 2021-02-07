import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { Formik } from "formik";

import { userActions } from '../../_redux/_actions';

//Validation schema for form

const loginSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Enter a valid email address"),
    password: Yup.string().required("Required"),
});


const Login = () => {

    const dispatch = useDispatch();
    const { loggedIn, loggingIn } = useSelector((state) => state.authentication);

    const renderLoginForm = () => {
        return (
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    // Call login API
                    dispatch(userActions.login(values.email, values.password));

                    setTimeout(() => {
                        setSubmitting(false);
                    }, 500);
                }}
                validationSchema={loginSchema}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>

                            {/************ Email  *************/}
                            <label htmlFor="email">Username:</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter your username"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${errors.email && touched.email && "error"}`}
                            />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}

                            {/************ Password  *************/}
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${errors.email && touched.email && "error"}`}
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-dark px-5 py-2 d-flex mt-4 login-button btn-rounded justify-content-center">
                                Login
                             </button>
                            {loggingIn &&
                                <img src="/images/Ellipsis-1s-200px.svg" alt="Loading...." className="loader" />
                            }

                        </form>
                    );
                }
                }
            </Formik>
        )
    };

    return (
        <div>
            {
                loggedIn ?
                    <Redirect to={{ pathname: '/users' }} />
                    :
                    <div className="my-5">
                        <div className="login-container bg-white shadow rounded">
                            <div className="container align-items-center py-4">
                                {renderLoginForm()}
                            </div>
                        </div>
                    </div>
            }
            <style jsx="true" global>
                {`
              body {
                font-family: Muli, sans-serif;
                background-image: url("/images/Fade-In-Background.svg");
                background-repeat: repeat-y;
                background-size: cover;
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
              }
            `}
            </style>
        </div >
    )
};

export default Login;