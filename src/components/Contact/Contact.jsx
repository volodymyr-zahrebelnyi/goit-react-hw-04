import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import css from "./Contact.module.css";

export default function Contact({ data: { name, number, id }, onDelete }) {
  return (
    <div className={css.contact}>
      <div className={css.contactWrap}>
        <div className={css.nameInfo}>
          <IoPerson className={css.icon} />
          <p>{name}</p>
        </div>
        <div className={css.numberInfo}>
          <FaPhone className={css.icon} />
          <p>{number}</p>
        </div>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
