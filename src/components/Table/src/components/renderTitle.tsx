import { Slots } from 'vue';
import TableTitle from './TableTitle.vue';
import { getSlot } from '/@/utils/helper/tsxHelper';
import TableSettingComp from './TableSetting.vue';
import { Divider } from 'ant-design-vue';
import Filter from './TableFilter.vue';

import type { TableSetting } from '../types/table';
import { FiltersConfig } from '/@/components/Filters';

export default (
  title: any,
  titleHelpMessage: string | string[],
  slots: Slots,
  showTableSetting: boolean,
  filtersConfig: FiltersConfig,
  tableSetting: TableSetting,
  register: any
) => {
  return (
    <>
      {getSlot(slots, 'tableTitle') ||
        (title && <TableTitle helpMessage={titleHelpMessage} title={title} />) || (
          <span>&nbsp;</span>
        )}
      <Divider type="vertical" />
      {filtersConfig && <Filter filters-config={filtersConfig} register={register} />}
      {
        <div class="basic-table-toolbar">
          {slots.toolbar && <Divider type="vertical" />}
          {slots.toolbar && getSlot(slots, 'toolbar')}
          {showTableSetting && <TableSettingComp setting={tableSetting} />}
        </div>
      }
    </>
  );
};
