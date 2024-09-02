import { FaAngleUp } from "react-icons/fa";
import css from "./BtnToTop.module.css";

export default function BtnToTop({ onClick }) {
  return (
    <button className={css.btnToTop} onClick={onClick}>
      <FaAngleUp className={css.iconUp} />
    </button>
  );
}
