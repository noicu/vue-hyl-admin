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
  id?: string;
  field: string;
  label?: string;
  linq: string; //'>' | '<' | '>=' | '<=' | '='
  value: string;
  placeholder?: string;
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
  // 过滤项结构
  schemas?: FilterSchema[];
}

export interface FilterSchema {
  field: string;
  label: string;
  subLabel?: string;
  type?: FST;
  linq?: boolean;
  option?: FilterSchemaOption[];
}

export enum FST {
  number,
  string,
  boolean,
}

export interface FilterSchemaOption {
  label: string;
  subLabel?: string;
  value: number | string | boolean;
}

export interface FilterProps {
  filtersConfig?: any;
  dataSource?: any;
  placeholder?: any;
}

export interface FilterActionType {
  setProps: (formProps: Partial<FilterProps>) => void;
  getFilterValue: () => any;
}

export type RegisterFn = (filterInstance: FilterActionType) => void;
export type UseFilterReturnType = [RegisterFn, FilterActionType];
