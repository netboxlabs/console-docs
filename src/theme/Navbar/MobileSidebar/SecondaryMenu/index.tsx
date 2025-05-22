import React, {type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';

// The secondary menu slides from the right and shows contextual information
// such as the docs sidebar
export default function NavbarMobileSidebarSecondaryMenu(): ReactNode {
  const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0;
  const docusaurusSecondaryMenu = useNavbarSecondaryMenu();

  return (
    <>
      {/* The back button was conditionally rendered here, now removed. */}
      {/* The original condition was: !isPrimaryMenuEmpty */}
      {docusaurusSecondaryMenu.content}
    </>
  );
}
