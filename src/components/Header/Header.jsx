import { Button } from "antd";
import logo from "../../assets/img/logo.png";
import { ArrowLeft } from "../../assets/icons/ArrowLeft";
import { Clock } from "../../assets/icons/Clock";
import { Redo } from "../../assets/icons/Redo";
import { Undo } from "../../assets/icons/Undo";
import { Play } from "../../assets/icons/Play";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header__action">
        <div className="header__action__back">
          <ArrowLeft />
          Go back
        </div>
        <div className="header__action__buttons">
          <div className="buttons__history">
            <Undo />
            <Redo />
          </div>
          <div className="buttons__divider" />
          <div className="buttons__time">
            <Clock /> 30 Sec
          </div>
          <Button icon={<Play />}>Preview</Button>
          <Button type="primary">Save</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
