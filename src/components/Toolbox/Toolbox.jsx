import { useState } from "react";
import { Select } from "antd";
import { Underline } from "./../../assets/icons/Underline";
import { AlignCenter } from "./../../assets/icons/AlignCenter";
import { Outline } from "./../../assets/icons/Outline";
import "./Toolbox.scss";
import { HorizontalOutline } from "../../assets/icons/HorizontalOutline";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

function Toolbox() {
  const [toolbox, setToolbox] = useState("text");
  return (
    <div className="toolbox">
      {toolbox === "text" && (
        <>
          <div className="toolbox_title">Text Properties</div>
          <div>
            <textarea className="textbox">Welcome to Simform...</textarea>
          </div>
          <div className="stylebox">
            <div className="stylebox_title">Textstyles</div>
            <div className="stylebox_actions">
              <div className="dropdown-wrapper">
                <Select
                  className="dropdown-wrapper_fontfamily"
                  defaultValue="lucy"
                  onChange={handleChange}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled" },
                  ]}
                />
                <Select
                  className="dropdown-wrapper_fontsize"
                  defaultValue="30"
                  onChange={handleChange}
                  options={[
                    { value: "10", label: "10" },
                    { value: "20", label: "20" },
                    { value: "30", label: "30" },
                    { value: "40", label: "40" },
                  ]}
                />
              </div>
              <div className="stylebox_actions_btngrp">
                <div className="btn-actions">
                  <span className="btn">
                    <Underline />
                  </span>
                  <span className="btn">
                    <Underline />
                  </span>
                  <span className="btn">
                    <Underline />
                  </span>
                </div>
                <div className="btn-actions">
                  <span className="btn">
                    <AlignCenter />
                  </span>
                  <span className="btn">
                    <AlignCenter />
                  </span>
                  <span className="btn">
                    <AlignCenter />
                  </span>
                </div>
              </div>
              <div className="stylebox_actions_btngrp">
                <div className="btn-actions">
                  <span className="text">Auto</span>
                  <span className="icon">
                    <Outline />
                  </span>
                </div>
                <div className="btn-actions">
                  <span className="text">Auto</span>
                  <span className="Icon">
                    <HorizontalOutline />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {toolbox === "media" && (
        <>
          <div className="toolbox_title">Add Media</div>
          <input type="file" name="" id="" />
        </>
      )}
      {toolbox === "graphics" && (
        <>
          <div className="toolbox_title">Add Shapes</div>
        </>
      )}
      {toolbox === "colors" && (
        <>
          <div className="toolbox_title">Pick a Color</div>
          <input type="color" name="" id="" />
        </>
      )}
    </div>
  );
}

export default Toolbox;
