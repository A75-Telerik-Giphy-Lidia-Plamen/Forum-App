import { headerStyles as s } from "./header.styles";
import { HeaderAuthSection } from "./HeaderAuthSection";

export default function Header() {
  return (
    <header className={s.wrapper}>
      <h1 className={s.brand}>Forgotten Knowledge</h1>
      <HeaderAuthSection />
    </header>
  );
}
