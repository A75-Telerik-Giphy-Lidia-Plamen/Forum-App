import { NavLink } from "react-router-dom";
import { homeBannerStyles as s } from "./HeroBanner.styles";

export default function HomeBanner() {
  return (
    <section className={s.section}>
      <img
        src="/HomeBanner.png"
        alt="Home Banner"
        className={s.image}
      />

      <div className={s.overlay} />

      <div className={s.contentWrapper}>
        <div className={s.container}>
          <div className={s.content}>
            <h1 className={s.title}>
              Forgotten Knowledge
            </h1>

            <p className={s.description}>
              A community dedicated to sharing traditional skills and essential knowledge being lost in our AI-driven world. Learn to cook without recipes, navigate without GPS, and fix things with your own hands.
            </p>

            <div className={s.actions}>
              <NavLink to="/register" className={s.primaryButton}>
                Join The Community
              </NavLink>

              <NavLink to="/login" className={s.secondaryButton}>
                Sign In
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}