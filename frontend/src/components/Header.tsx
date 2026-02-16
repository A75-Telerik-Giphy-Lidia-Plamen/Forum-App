import { NavLink } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Header() {
    const {user} = useUser();
    return (
        <header>
            <h1>Forum App</h1>
            <nav>
                {!user ?  (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                ) : null}
            </nav>
           
        </header>
    )
}