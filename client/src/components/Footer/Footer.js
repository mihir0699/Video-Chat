import React from "react";
import { HeartTwoTone } from "@ant-design/icons";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer">
        Made with <HeartTwoTone twoToneColor="#eb2f96" /> By{" "}
        <a
          href="https://github.com/mihir0699/Video-Chat"
          target="_blank"
          style={{ color: "white" }}
          rel="noreferrer"
        >
          Mihir Gupta
        </a>
        <br />
        Front-end Contribution By:{" "}
        <a
          href="https://linkedin.com/in/gautamtiwari003"
          target="_blank"
          style={{ color: "white" }}
          rel="noreferrer"
        >
          Gautam Tiwari
        </a>
      </div>
    </footer>
  );
};

export default Footer;
