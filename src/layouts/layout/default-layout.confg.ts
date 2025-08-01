import {LayoutConfig} from './layout.type';

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  id: 'leftRight',
  mode: 'sidebarTop',
  header: {
    fixed: true,
    firHeader: {
      height: 60
    },
    secHeader: {
      hidden: true
    },
    hidden: false,
  },
  sidebar: {
    fixed: true,
    firSidebar: {
      width: 240
    },
    secSidebar: {
      hidden: true
    },
    hidden: false,
  },
  footer: {
    hidden: false
  },
  hideLogo: false
}
