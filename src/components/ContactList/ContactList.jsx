import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList({ contacts, onDelete }) {
  return (
    <ul className={css.contactList}>
      {contacts.map(contact => {
        return (
          <li className={css.contactItem} key={contact.id}>
            <Contact data={contact} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}
