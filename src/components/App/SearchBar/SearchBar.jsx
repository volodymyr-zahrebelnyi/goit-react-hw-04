import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <div className={css.container}>
        <Formik
          initialValues={{ topic: "" }}
          onSubmit={(values, actions) => {
            if (!values.topic.trim()) {
              toast.error("Please enter topic to search images.", {
                position: "top-right",
              });
              return;
            }
            onSearch(values.topic);
            actions.resetForm();
          }}
        >
          <Form className={css.form}>
            <div className={css.fieldWrap}>
              <Field
                className={css.field}
                type="text"
                name="topic"
                autoComplete="off"
                autoFocus={true}
                placeholder="Search images and photos"
              />
              <button className={css.btn} type="submit">
                <IoIosSearch className={css.icon} />
              </button>
            </div>
          </Form>
        </Formik>
        <Toaster />
      </div>
    </header>
  );
}
