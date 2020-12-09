import { Slots } from 'vue';
import TableTitle from './TableTitle.vue';
import { getSlot } from '/@/utils/helper/tsxHelper';
import TableSettingComp from './TableSetting.vue';
import { Divider } from 'ant-design-vue';
import Filter from './TableFilter.vue';

import type { TableSetting } from '../types/table';

export default (
  title: any,
  titleHelpMessage: string | string[],
  slots: Slots,
  showTableSetting: boolean,
  showFilter: boolean,
  tableSetting: TableSetting
) => {
  return (
    <>
      {getSlot(slots, 'tableTitle') ||
        (title && <TableTitle helpMessage={titleHelpMessage} title={title} />) || (
          <span>&nbsp;</span>
        )}
      <Divider type="vertical" />
      {showFilter && <Filter />}
      {
        <div class="basic-table-toolbar">
          {slots.toolbar && getSlot(slots, 'toolbar')}
          {showTableSetting && <TableSettingComp setting={tableSetting} />}
        </div>
      }
    </>
  );
};
