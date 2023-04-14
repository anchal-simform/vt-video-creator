import logo from "../../assets/img/logo.png";
import { ArrowLeft } from "../../assets/icons/ArrowLeft";
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
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
