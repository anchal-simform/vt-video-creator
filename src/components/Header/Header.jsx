import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { Clock } from '../../assets/icons/Clock';
import { Play } from '../../assets/icons/Play';
import { Redo } from '../../assets/icons/Redo';
import { Undo } from '../../assets/icons/Undo';
import logo from '../../assets/img/logo.png';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header__action">
        <Link to="/">
          <div className="header__action__back">
            <ArrowLeft />
            Go back
          </div>
        </Link>
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
