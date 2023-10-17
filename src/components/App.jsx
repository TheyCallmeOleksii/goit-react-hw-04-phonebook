import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';

import { Filter } from './Filter/Filter';
import { FormPhone } from './FormPhone/FormPhone';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { name: 'Rosie Simpson', number: '459-12-56', id: 'id-1' },
        { name: 'Hermione Kline', number: '443-89-12', id: 'id-2' },
        { name: 'Eden Clements', number: '645-17-79', id: 'id-3' },
        { name: 'Annie Copelan', number: '227-91-26', id: 'id-4' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(stringifiedContacts) ?? [];
    setContacts(parseContacts);
  }, []);

  useEffect(() => {
    const stringifiedContact = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContact);
  }, [contacts]);

  const handleContact = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newOneContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([...contacts, newOneContact]);
  };

  const handleDelete = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onhandleChangeFilter = event => {
    const { value } = event.target;
    if (value !== undefined) {
      setFilter(value);
    }
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <FormPhone handleContact={handleContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={onhandleChangeFilter} />
      <ContactList listContact={filteredContacts} handleDelete={handleDelete} />
    </div>
  );
};
