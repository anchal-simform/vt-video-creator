import { Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import avatar from '../../assets/img/avatar.png'
import { UserCircle } from "../../assets/icons/UserCircle";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import "./HeaderHome.scss";

function HeaderHome() {
  return (
    <header className="headerhome">
      <div className="headerhome__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="headerhome__action">
        <Button icon={<UserCircle />}>Invite People</Button>
        <Link>FAQ</Link>
        <Link>Help</Link>
        <Link>Upgrade</Link>
        <Link>Support</Link>
        <div className="headerhome__action__account">
          <img src={avatar} alt="" />
          <ArrowDown />
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
