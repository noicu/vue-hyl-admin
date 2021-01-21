import { ref, onUnmounted, unref } from 'vue';

import { isInSetup } from '/@/utils/helper/vueHelper';
import { isProdMode } from '/@/utils/env';

import type { FilterProps, FilterActionType, UseFilterReturnType } from '../types';
import type { NamePath } from 'ant-design-vue/lib/form/interface';

export declare type ValidateFields = (nameList?: NamePath[]) => Promise<any>;

export function useFilters(props?: Partial<FilterProps>): UseFilterReturnType {
  isInSetup();
  const filterRef = ref<FilterActionType | null>(null);
  const loadedRef = ref<boolean | null>(false);

  function getFilter() {
    const filter = unref(filterRef);
    if (!filter) {
      throw new Error('filterRef is Null');
    }
    return filter as FilterActionType;
  }

  function register(instance: FilterActionType) {
    isProdMode() &&
      onUnmounted(() => {
        filterRef.value = null;
        loadedRef.value = null;
      });
    if (unref(loadedRef) && isProdMode() && instance === unref(filterRef)) return;
    filterRef.value = instance;
    props && instance.setProps(props);
    loadedRef.value = true;
    console.log(filterRef);
  }

  const methods: FilterActionType = {
    setProps: (filterProps: Partial<FilterProps>) => {
      getFilter().setProps(filterProps);
    },
    getFilterValue: () => {
      return getFilter().getFilterValue();
    },
  } as FilterActionType;
  return [register, methods];
}
