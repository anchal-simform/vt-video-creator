import { Button } from "antd";
import { Link } from "react-router-dom";
import { Add } from "../../assets/icons/Add";
import { Home } from "../../assets/icons/Home";
import { Element } from "../../assets/icons/Element";
import { Folder } from "../../assets/icons/Folder";
import { Archive } from "../../assets/icons/Archive";
import { Verify } from "../../assets/icons/Verify";
import { InfoCircle } from "../../assets/icons/InfoCircle";
import { FAQ } from "../../assets/icons/FAQ";
import { LikeTag } from "../../assets/icons/LikeTag";

import "./SidebarHome.scss";

function SidebarHome() {
  return (
    <div className="sidebarhome">
      <Button type="primary" className="sidebarhome__button" icon={<Add color="#FFF" />}>
        New Video
      </Button>
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
