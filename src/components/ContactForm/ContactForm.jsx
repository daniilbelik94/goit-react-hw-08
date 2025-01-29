import { useId } from 'react';
import { useDispatch } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import { apiAddContacts } from '../../redux/contacts/operations';

import styles from './ContactForm.module.css';

const notifyAddContact = () =>
  toast.success('Contact was added ', {
    duration: 3000,
    position: 'top-right',
  });

const ContactForm = () => {
  const initialValues = { name: '', number: '' };
  const nameId = useId();
  const numberId = useId();

  const dispath = useDispatch();

  const handleSubmit = (values, actions) => {
    dispath(apiAddContacts(values));
    notifyAddContact();
    actions.resetForm();
  };

  const ContactsSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactsSchema}
    >
      <Form className={styles.form}>
        <label className={styles.label} htmlFor={nameId}>
          Name
        </label>
        <Field
          className={styles.input}
          type='text'
          name='name'
          id={nameId}
          placeholder='Name Lastname'
        />
        <ErrorMessage className={styles.error} name='name' component='span' />
        <label
          className={`${styles.label} ${styles.labelNumber}`}
          htmlFor={numberId}
        >
          Number
        </label>
        <Field
          className={styles.input}
          type='number'
          name='number'
          id={numberId}
          placeholder='Phone Number'
        />
        <ErrorMessage className={styles.error} name='number' component='span' />
        <button className={styles.btn} type='submit'>
          Add contact
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
};

export default ContactForm;
