import { useId } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './ContactForm.module.css';

const ContactForm = () => {
  const initialValues = { name: '', number: '' };
  const nameId = useId();
  const numberId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const contactData = { ...values, id: nanoid() };
    dispatch(addContact(contactData));
    actions.resetForm();
  };

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    number: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
      <Form className={styles.form}>
        <label className={styles.label} htmlFor={nameId}>
          Name
        </label>
        <Field className={styles.input} type="text" name="name" id={nameId} />
        <ErrorMessage className={styles.error} name="name" component="span" />
        <label className={`${styles.label} ${styles.labelNumber}`} htmlFor={numberId}>
          Number
        </label>
        <Field className={styles.input} type="text" name="number" id={numberId} />
        <ErrorMessage className={styles.error} name="number" component="span" />
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
