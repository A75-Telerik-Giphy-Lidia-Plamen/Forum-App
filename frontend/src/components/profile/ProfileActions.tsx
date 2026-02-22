import { NavLink } from "react-router-dom";
import { profileAboutStyles as s } from "./profileAbout.styles";

type Props = {
  id: string;
};

export function ProfileActions({ id }: Props) {
  return (
    <NavLink 
      to={`/profile/${id}/edit`}
      className={s.editButton}
    >
      Edit Profile
    </NavLink>
  );
}
