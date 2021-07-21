import React, { useState} from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { useHistory } from "react-router-dom";
import "./NavBar.css";


export const NavBar = (props) => {

  const history = useHistory()

  let [isActive, setIsActive] = useState("home");
  
  const checkNavState = (navLocation) => {
      let activeClass = "";
      if (isActive === navLocation) {
        activeClass = "active"
      };

      return activeClass;
  };

  const handleLogout = (clickEvent) => {
      clickEvent.preventDefault()
      sessionStorage.removeItem("nutshell_user")
      history.push("/login")
  };

  return (
    <nav className="navbar">
      <ul className="navbar">
          <img className="logo navbar__item" src="./images/logo.PNG"/>
          <li className={`navbar__item ${checkNavState("home")}`}
              onClick={() => setIsActive("home")}>
              <Link className="navbar__link" to="/">Articles</Link>
          </li>
          <li className={`navbar__item ${checkNavState("friends")}`}
              onClick={() => setIsActive("friends")}>
              <Link className="navbar__link" to="/friends">Friends</Link>
          </li>
          <li className={`navbar__item ${checkNavState("messages")}`}
              onClick={() => setIsActive("messages")}>
              <Link className="navbar__link" to="/messages">Messages</Link>
          </li>
          <li className={`navbar__item ${checkNavState("tasks")}`}
            onClick={() => setIsActive("tasks")}>
              <Link className="navbar__link" to="/tasks">Tasks</Link>
          </li>
          <li className={`navbar__item ${checkNavState("events")}`}
            onClick={() => setIsActive("events")}>
              <Link className="navbar__link" to="/events">Events</Link>
          </li>
          <li className="navbar__item" 
            onClick={(clickEvent) => {handleLogout(clickEvent)}}>
              <Link className="navbar__link" to="/login">Logout</Link>
          </li>
      </ul>
    </nav>
  )
};
