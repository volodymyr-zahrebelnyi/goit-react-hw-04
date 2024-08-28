import { Formik, Form, Field } from "formik";
import { IoIosSearch } from "react-icons/io";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <div className={css.container}>
        <Formik
          initialValues={{ topic: "" }}
          onSubmit={(values, actions) => {
            onSearch(values.topic);
            actions.resetForm();
          }}
        >
          <Form className={css.form}>
            <Field
              className={css.field}
              type="text"
              name="topic"
              autoComplete="off"
              autoFocus={true}
              placeholder="Search images and photos"
            />
            <button className={css.btn} type="submit">
              <IoIosSearch />
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
