import { useState } from 'react';
import { Gallery } from '../../assets/icons/Gallery';
import { Text } from '../../assets/icons/Text';
import { Shapes } from '../../assets/icons/Shapes';
import { Bucket } from '../../assets/icons/Bucket';
import './Sidebar.scss';

function Sidebar({ activeItem, setActiveItem }) {
  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        <li
          className={
            activeItem === 'media'
              ? 'sidebar__list__item active'
              : 'sidebar__list__item'
          }
          onClick={() => setActiveItem('media')}
        >
          <Gallery />
          <span>Media</span>
        </li>
        <li
          className={
            activeItem === 'text'
              ? 'sidebar__list__item active'
              : 'sidebar__list__item'
          }
          onClick={() => setActiveItem('text')}
        >
          <Text />
          <span>Text</span>
        </li>
        <li
          className={
            activeItem === 'graphics'
              ? 'sidebar__list__item active'
              : 'sidebar__list__item'
          }
          onClick={() => setActiveItem('graphics')}
        >
          <Shapes />
          <span>Graphics</span>
        </li>
        <li
          className={
            activeItem === 'colors'
              ? 'sidebar__list__item active'
              : 'sidebar__list__item'
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
