import { NavLink } from "react-router-dom";
import { headerStyles as s } from "./header.styles";
import { HeaderAuthSection } from "./HeaderAuthSection";

export default function Header() {
  return (
    <header className={s.wrapper}>
      <NavLink to="/"><h1 className={s.brand}>Forgotten Knowledge</h1></NavLink>
      <HeaderAuthSection />
    </header>
  );
}
