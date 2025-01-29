import { useId } from 'react';

import { useDispatch } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Section from '../Section/Section';

import { apiLoginUser } from '../../redux/auth/operations';

import css from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const emailId = useId();
  const passwordId = useId();
  const initialValues = { email: '', password: '' };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalide email address')
      .required('Email is required'),
    password: Yup.string()
      .min(7, 'Password length must be at least 7 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values, actions) => {
    dispatch(apiLoginUser(values));
    actions.resetForm();
  };

  return (
    <Section>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        <Form className={css.form}>
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
            Sing In
          </button>
        </Form>
      </Formik>
    </Section>
  );
};

export default LoginForm;
