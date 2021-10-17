// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {UserRole} from '../app/shared/auth.roles';

export let environment: {
  defaultMenuType: string;
  subHiddenBreakpoint: number; defaultRole: UserRole;
  production: boolean; buyUrl: string; defaultDirection: string;
  themeColorStorageKey: string;
  firebase: {
    storageBucket: string; apiKey: string; messagingSenderId: string; appId: string; projectId: string;
    measurementId: string; databaseURL: string; authDomain: string
  };
  menuHiddenBreakpoint: number;
  isDarkSwitchActive: boolean;
  themeRadiusStorageKey: string; defaultColor: string; apiUrl: string;
  isAuthGuardActive: boolean; adminRoot: string; isMultiColorActive: boolean;
  SCARF_ANALYTICS: boolean
};
environment = {
  production: true,
  buyUrl: 'https://1.envato.market/6NV1b',
  SCARF_ANALYTICS: false,
  adminRoot: '/app',
  apiUrl: ' ',
  defaultMenuType: 'menu-default',
  subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 768,
  themeColorStorageKey: 'vien-themecolor',
  isMultiColorActive: true,
  defaultColor: 'light.blueyale',
  isDarkSwitchActive: true,
  defaultDirection: 'ltr',
  themeRadiusStorageKey: 'vien-themeradius',
  isAuthGuardActive: true,
  defaultRole: UserRole.Admin,
  firebase: {
    apiKey: ' ',
    authDomain: ' ',
    databaseURL: ' ',
    projectId: ' ',
    storageBucket: ' ',
    messagingSenderId: ' ',
    appId: ' ',
    measurementId: ' '
  }
};
