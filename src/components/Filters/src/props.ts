import type { PropType } from 'vue';
import type { Axis, ContextMenuItem, FilterMenuItem, FiltersConfig } from './types';
export const filterProps = {
  filtersConfig: {
    // 列表
    type: Array as PropType<FiltersConfig[]>,
    default() {
      return [];
    },
  },
  dataSource: {
    type: Array as PropType<any[]>,
    default() {
      return [];
    },
  },
  placeholder: {
    type: String,
    default() {
      return '请输入查询条件';
    },
  },
};

export const fmenuProps = {
  show: {
    type: Boolean,
    default: false,
  },
  axis: {
    // 位置
    type: Object as PropType<Axis>,
    default() {
      return { x: 0, y: 0 };
    },
  },
  schemas: {
    // 列表
    type: Array as PropType<FiltersConfig[]>,
    default() {
      return [];
    },
  },
  val: {
    type: Object as PropType<RegExpMatchArray>,
    default: () => [],
  },
  data: {
    // 列表
    type: Array as PropType<Array<any>>,
    default() {
      return [];
    },
  },
};
