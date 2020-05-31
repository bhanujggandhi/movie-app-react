import React from "react";
import { Icon } from "antd";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
        background: "olive",
        color: "white",
      }}
    >
      <p>
        Made with <Icon type="heart" /> by bhanujggandhi
      </p>
    </div>
  );
}

export default Footer;
