import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';

import styles from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector((state) => state.contactsData.items);
  const searchValue = useSelector((state) => state.filterValue.filter);

  const foundContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <ul className={styles.list}>
      {foundContacts.length > 0 &&
        foundContacts.map((contact) => (
          <Contact key={contact.id} userName={contact.name} userPhone={contact.number} userId={contact.id} />
        ))}
    </ul>
  );
};

export default ContactList;
