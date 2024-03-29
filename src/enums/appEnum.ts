export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;

export enum ContentEnum {
  // 自动宽度
  FULL = 'full',
  // 固定宽度
  FIXED = 'fixed',
}

// app current theme
export enum ThemeModeEnum {
  LIGHT = 'light-mode',
  DARK = 'dark-mode',
  SEMI_DARK = 'semi-dark-mode',
}

// menu theme enum
export enum ThemeEnum {
  DARK = 'dark',

  LIGHT = 'light',
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // role
  ROLE = 'ROLE',
  // black
  BACK = 'BACK',
}

//  Route switching animation
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}
