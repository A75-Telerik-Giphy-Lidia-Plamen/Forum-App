import { NavLink } from "react-router-dom";
import { headerStyles as s } from "./header.styles";
import { HeaderAuthSection } from "./HeaderAuthSection";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <NavLink to="/">
          <h1 className={s.brand}>Forgotten Knowledge</h1>
        </NavLink>

        {/* Desktop */}
        <div className={s.desktopNav}>
          <HeaderAuthSection />
        </div>

        {/* Mobile */}
        <div className={s.mobileTrigger}>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}