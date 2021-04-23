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
        >
          Mihir Gupta
        </a>
      </div>
    </footer>
  );
};

export default Footer;
