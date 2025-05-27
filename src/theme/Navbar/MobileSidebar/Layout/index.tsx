import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/Navbar/MobileSidebar/Layout';
import SearchBar from '@theme/SearchBar';

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}: Props): ReactNode {
  const {shown: secondaryMenuShown} = useNavbarSecondaryMenu();
  return (
    <div className="navbar-sidebar">
      {header}
      <div style={{padding: '0.5rem 1rem', borderBottom: '1px solid var(--ifm-hr-border-color)'}}>
        <SearchBar />
      </div>
      <div
        className={clsx('navbar-sidebar__items', {
          'navbar-sidebar__items--show-secondary': secondaryMenuShown,
        })}>
        <div className="navbar-sidebar__item menu">{primaryMenu}</div>
        <div className="navbar-sidebar__item menu">{secondaryMenu}</div>
      </div>
    </div>
  );
}
