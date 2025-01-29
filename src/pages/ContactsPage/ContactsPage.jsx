import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import Section from '../../components/Section/Section';

import {
  selectContactsError,
  selectContactsIsLoading,
} from '../../redux/contacts/selectors';
import { apiGetContacts } from '../../redux/contacts/operations';

const ContactsPage = () => {
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  return (
    <Section>
      <ContactForm />
      <SearchBox />
      {isLoading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ContactList />
    </Section>
  );
};

export default ContactsPage;
