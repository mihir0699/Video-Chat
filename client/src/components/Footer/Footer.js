import React from "react";
import { HeartTwoTone } from "@ant-design/icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      Made with <HeartTwoTone twoToneColor="#eb2f96" /> By{" "}
      <a
        className="footer__link"
        href="https://github.com/mihir0699/Video-Chat"
        target="_blank"
        style={{ color: "#fdfdfd" }}
        rel="noreferrer"
      >
        Mihir Gupta
      </a>
      <br />

      Contributed/Improved By{" "}

      <a
        className="footer__link"
        href="https://linkedin.com/in/gautamtiwari003"
        target="_blank"
        style={{ color: "#fdfdfd" }}
        rel="noreferrer"
      >
        Gautam Tiwari
      </a>
    </footer>
  );
};

export default Footer;
