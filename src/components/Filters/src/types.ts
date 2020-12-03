export interface Axis {
  x: number;
  y: number;
}

export interface ContextMenuItem {
  label: string;
  icon?: string;
  disabled?: boolean;
  handler?: Fn;
  divider?: boolean;
  children?: ContextMenuItem[];
}
export interface Options {
  event: MouseEvent;
  icon?: string;
  styles?: any;
  items?: ContextMenuItem[];
}

export type Props = {
  resolve?: (...arg: any) => void;
  event?: MouseEvent;
  styles?: any;
  items: ContextMenuItem[];
  customEvent?: MouseEvent;
  axis?: Axis;
  width?: number;
  showIcon?: boolean;
};

export interface FilterDataRT {
  key: string;
  key_show?: string;
  linq: string; //'>' | '<' | '>=' | '<=' | '='
  value: string;
  value_show?: string;
}

export enum FMIT {
  title,
  key,
  value,
  operator,
}

export interface FilterMenuItem {
  label: string;
  type: FMIT;
  pos?: Array<string | JSX.Element>;
}

export interface FiltersConfig {
  key: string;
  key_text: string;
  type: string;
  linq: boolean;
  option: FiltersConfigOption[];
}

export interface FiltersConfigOption {
  label: string;
  value: any;
}
