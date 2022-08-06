import React from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";

function Header(props) {
  return (
    <>
      <Navbar loggedIn={props.loggedIn} />
      <div
        className={`${styles.headerBackground} flex items-center justify-center text-white2`}
      >
        <h1 className="text-5xl p-2">{props.content}</h1>
      </div>
    </>
  );
}

export default Header;
