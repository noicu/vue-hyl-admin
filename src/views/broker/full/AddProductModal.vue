<template>
  <BasicModal
    class="pmodal"
    v-bind="$attrs"
    @register="register"
    title="添加商品"
    :width="1000"
    @ok="ok"
  >
    <BasicTable
      @register="registerTable"
      rowKey="id_of_es"
      :rowSelection="rowSelection()"
      ref="tableRef"
    >
      <template #images="{ record, column }">
        <a-popover title="图片" trigger="hover" placement="right">
          <template #content>
            <ImageGroup>
              <Image
                v-for="image in record.images || []"
                :width="100"
                :height="100"
                :src="image.path"
                style="height: 100%"
              />
            </ImageGroup>
          </template>
          <a-button type="primary" size="small"> {{ record.images.length }} 张图片... </a-button>
        </a-popover>
      </template>
      <template #colors="{ record, column }">
        <a-popover :title="record.name + ' - 规格'" trigger="hover" placement="left">
          <template #content>
            <div class="pcode" v-for="color in record.colors">
              <span> 名称：{{ color.code }} </span>
              <span> 价格：{{ color.price }} </span>
            </div>
          </template>
          <a-button type="primary" size="small"> {{ record.colors.length }} 种规格... </a-button>
        </a-popover>
      </template>
      <template #enabled="{ record, column }">
        {{ record.enabled ? '正常' : '禁止' }}
      </template>
    </BasicTable>
  </BasicModal>
  <BasicModal @register="registerE" title="商品加价" :width="400" @ok="okE">
    <Form layout="vertical" :model="form">
      <FormItem label="加价" style="margin-bottom: 0">
        <InputNumber v-model:value="form.offset" :min="0" />
      </FormItem>
    </Form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, reactive } from 'vue';
  import { BasicModal, useModalInner, useModal } from '/@/components/Modal';
  import { Form, Row, Col, InputNumber } from 'ant-design-vue';
  import { productInfoList } from '/@/api/yi/product';
  import { Columns } from './config';
  import { FETCH_SETTING } from '/@/api/const';
  import { BasicTable, useTable } from '/@/components/Table';
  import type { TableActionType } from '/@/components/Table';
  import { brokerProductAdd } from '/@/api/user';

  export default defineComponent({
    emits: ['okl'],
    components: { BasicModal, Form, FormItem: Form.Item, Row, Col, BasicTable, InputNumber },
    setup({}, { emit }) {
      const tableRef = ref<Nullable<TableActionType>>(null);
      const cateId = ref<Number>(0);
      const bp = ref<any>([]);
      const [registerE, { openModal: openEModal }] = useModal();
      const form = reactive({
        offset: 1,
      });

      const [registerTable, { reload }] = useTable({
        api: productInfoList,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showTableSetting: false,
        showIndexColumn: false,
        immediate: false,
        searchInfo: () => ({
          cate_id: cateId.value,
        }),
      });

      const [register, { closeModal }] = useModalInner((data: any) => {
        cateId.value = data.id;
        bp.value = data.bp.map((it: any) => it.id_of_es);
        reload();
        getTableAction().clearSelectedRowKeys();
        console.log(data);
      });

      function rowSelection() {
        return {
          type: 'checkbox',
          getCheckboxProps: (record: any) => {
            return {
              disabled: bp.value.indexOf(record.id_of_es) != -1,
              name: record.id_of_es,
            };
          },
        };
      }

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }

      function ok() {
        console.log(getTableAction().getSelectRowKeys());
        openEModal();
      }

      async function okE() {
        try {
          const p = getTableAction()
            .getSelectRowKeys()
            .map((it) => ({
              product_id: it,
              price_offset: form.offset,
            }));
          await brokerProductAdd({
            list: p,
          });
          emit('okl', p);
        } catch (error) {
        } finally {
          openEModal(false);
          closeModal();
        }
      }

      return {
        register,
        closeModal,
        registerTable,
        rowSelection,
        tableRef,
        ok,
        registerE,
        form,
        okE,
      };
    },
  });
</script>
<style lang="less" scoped>
  .pmodal {
    .ant-spin-nested-loading {
      padding: 0 !important;
    }
  }
</style>
