<template>
  <BasicTable @register="registerTable">
    <template #stat="{ record, column }">
      <a-tag v-if="record.stat == 0"> 待处理 </a-tag>
      <a-tag color="green" v-if="record.stat == 1"> 已通过 </a-tag>
      <a-tag color="red" v-if="record.stat != 1 && record.stat != 0"> 已驳回 </a-tag>
    </template>
    <template #images="{ record, column }">
      <a-popover title="图片" trigger="hover" placement="right">
        <template #content>
          <ImageGroup>
            <Image v-for="image in record.images || []" :width="20" :src="image.image_path" />
          </ImageGroup>
        </template>
        <a-button type="primary" size="small">
          {{ record.images ? record.images.length : 0 }} 张图片...
        </a-button>
      </a-popover>
    </template>
    <template #item="{ record, column }">
      <a-popover title="服务项" trigger="hover" placement="left">
        <template #content>
          <div class="pcode" v-for="item in record.item || []">
            名称：{{ item.yi_cate_name }} 价格：{{ item.price }}
          </div>
        </template>
        <a-button type="primary" size="small">
          {{ record.item ? record.item.length : 0 }} 种规格...
        </a-button>
      </a-popover>
    </template>
    <template #action="{ record, column }">
      <div v-if="record.stat == 0">
        <a-button
          class="mr-2"
          type="primary"
          size="small"
          @click="setStat(record, 1)"
          :loading="isLoading(record)"
        >
          通过
        </a-button>
        <a-button
          type="danger"
          size="small"
          @click="setStat(record, 2)"
          :loading="isLoading(record)"
        >
          驳回
        </a-button>
      </div>
      <div v-else> - </div>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { masterInfoApplyPage, masterInfoApplyAudit } from '/@/api/user';
  import { MasterColumns } from './config';
  import { Image } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicTable, Image, ImageGroup: Image.PreviewGroup },
    props: {},
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '大师申请列表',
        api: masterInfoApplyPage,
        fetchSetting: FETCH_SETTING,
        columns: MasterColumns,
        showIndexColumn: false,
        searchInfo: {
          sort: {
            stat: 1,
          },
          // where: {
          //   stat: 0,
          // }
        },
      });

      const loading: any = reactive({});

      const isLoading = (e: any) => loading[e.id];

      async function setStat(data: any, stat: Number) {
        loading[data.id] = true;
        try {
          await masterInfoApplyAudit({
            id: data.id,
            stat,
          });
          await reload();
        } catch (error) {
          console.log(error);
        } finally {
          loading[data.id] = false;
        }
      }

      return {
        registerTable,
        setStat,
        isLoading,
      };
    },
  });
</script>
