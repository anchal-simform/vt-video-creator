import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Add } from '../../assets/icons/Add';
import { Archive } from '../../assets/icons/Archive';
import { Element } from '../../assets/icons/Element';
import { FAQ } from '../../assets/icons/FAQ';
import { Folder } from '../../assets/icons/Folder';
import { Home } from '../../assets/icons/Home';
import { InfoCircle } from '../../assets/icons/InfoCircle';
import { LikeTag } from '../../assets/icons/LikeTag';
import { Verify } from '../../assets/icons/Verify';

import './SidebarHome.scss';

function SidebarHome() {
  return (
    <div className="sidebarhome">
      <Link to="/editor">
        <Button
          type="primary"
          className="sidebarhome__button"
          icon={<Add color="#FFF" />}
        >
          New Video
        </Button>
      </Link>
      <ul className="sidebarhome__list">
        <li className="sidebarhome__list__item active">
          <Link>
            <Home />
            <span>Home</span>
          </Link>
        </li>
        <li className="sidebarhome__list__item">
          <Link>
            <Element />
            <span>Templates</span>
          </Link>
        </li>
        <li className="sidebarhome__list__item">
          <Link>
            <Folder />
            <span>Projects</span>
          </Link>
        </li>
        <li className="sidebarhome__list__item">
          <Link>
            <Archive />
            <span>Assets</span>
          </Link>
        </li>
        <li className="sidebarhome__list__item separator">
          <Link>
            <Verify />
            <span>Usage rights</span>
          </Link>
        </li>
        <li className="sidebarhome__list__item">
          <Link>
            <InfoCircle />
            <span>Privacy Policy</span>
          </Link>
        </li>
        <li className="sidebarhome__list__item">
          <Link>
            <FAQ />
            <span>FAQ</span>
          </Link>
        </li>
        <li className="sidebarhome__list__item">
          <Link>
            <LikeTag />
            <span>Help</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SidebarHome;
