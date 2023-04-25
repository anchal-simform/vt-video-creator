import { Bucket } from '../../assets/icons/Bucket';
import { Gallery } from '../../assets/icons/Gallery';
import { Text } from '../../assets/icons/Text';
import './Sidebar.scss';

function Sidebar({ activeItem, setActiveItem }) {
  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        <li
          className={
            activeItem === 'media'
              ? 'sidebar__list__item active media_nav'
              : 'sidebar__list__item media_nav'
          }
          onClick={() => setActiveItem('media')}
        >
          <Gallery />
          <span>Media</span>
        </li>
        <li
          className={
            activeItem === 'text'
              ? 'sidebar__list__item active text_nav'
              : 'sidebar__list__item text_nav'
          }
          onClick={() => setActiveItem('text')}
        >
          <Text />
          <span>Text</span>
        </li>

        {/* @TODO : Commenting the Graphics navbar since its not used currently  */}

        {/* <li
          className={
            activeItem === 'graphics'
              ? 'sidebar__list__item active'
              : 'sidebar__list__item'
          }
          onClick={() => setActiveItem('graphics')}
        >
          <Shapes />
          <span>Graphics</span>
        </li> */}
        <li
          className={
            activeItem === 'colors'
              ? 'sidebar__list__item active color_palette'
              : 'sidebar__list__item color_palette'
          }
          onClick={() => setActiveItem('colors')}
        >
          <Bucket />
          <span>Color Palette</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
