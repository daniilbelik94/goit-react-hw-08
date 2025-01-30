import { useId } from 'react';

import { useDispatch } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Section from '../Section/Section';

import { apiRegisterUser } from '../../redux/auth/operations';

import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const initialValues = { name: '', email: '', password: '' };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalide email address')
      .required('Email is required'),
    password: Yup.string()
      .min(7, 'Password length must be at least 7 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values, actions) => {
    dispatch(apiRegisterUser(values));
    actions.resetForm();
  };

  return (
    <Section>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor={nameId}>
            Name
          </label>
          <Field
            className={css.input}
            type='text'
            name='name'
            id={nameId}
            placeholder='Name Lastname'
          />
          <ErrorMessage className={css.error} name='name' component='span' />
          <label className={`${css.label} ${css.labelItem}`} htmlFor={emailId}>
            Email
          </label>
          <Field
            className={css.input}
            type='text'
            name='email'
            id={emailId}
            placeholder='example.email@example.com'
          />
          <ErrorMessage className={css.error} name='email' component='span' />
          <label
            className={`${css.label} ${css.labelItem}`}
            htmlFor={passwordId}
          >
            Password
          </label>
          <Field
            className={css.input}
            type='password'
            name='password'
            id={passwordId}
            placeholder='Password'
          />
          <ErrorMessage
            className={css.error}
            name='password'
            component='span'
          />
          <button className={css.btn} type='submit'>
            Sing Up
          </button>
        </Form>
      </Formik>
    </Section>
  );
};

export default RegistrationForm;
