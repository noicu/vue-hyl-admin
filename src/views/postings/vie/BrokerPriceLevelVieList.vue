<template>
  <div :class="prefixCls">
    <a-page-header title="闪断贴标准" :ghost="false" :class="`${prefixCls}__header`">
      <template #extra>
        <a-button type="primary" @click="opaddm()"> 新增标准 </a-button>
      </template>
    </a-page-header>

    <div :class="`${prefixCls}__container`">
      <a-list :loading="loadingRef">
        <template v-for="item in list" :key="item.ID">
          <a-list-item>
            <a-list-item-meta>
              <template #description>
                <div :class="`${prefixCls}__content`">
                  <span>加价：</span>
                  <span>{{ item.offset_price }}</span>
                </div>
                <div :class="`${prefixCls}__content`">
                  <span>平台报价：</span>
                  <span>{{ item.old_price }}</span>
                </div>
                <div :class="`${prefixCls}__action`">
                  <div :class="`${prefixCls}__action-item`">
                    <a-button type="primary" size="small" @click="opm(item)"> 编辑 </a-button>
                  </div>
                  <div :class="`${prefixCls}__action-item`">
                    <a-switch
                      checked-children="开"
                      un-checked-children="关"
                      v-model:checked="item.enabled"
                      :loading="isLoading(item)"
                      @change="onEnabled(item)"
                    />
                  </div>
                  <span :class="`${prefixCls}__time`">{{ item.update_at }}</span>
                </div>
              </template>
              <template #title>
                <p :class="`${prefixCls}__title`">
                  <span>
                    {{ item.level_name }}
                  </span>
                  <!-- <Tag class="mb-2" style="float: right">{{ item.price_level_id }}</Tag> -->
                </p>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <BasicModal @register="register" title="修改收费标准" @ok="ok" width="300px">
      <a-form
        :model="form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        layout="horizontal"
      >
        <a-form-item label="加价">
          <InputNumber v-model:value="form.offset_price" :min="0" />
        </a-form-item>
      </a-form>
    </BasicModal>

    <BasicModal @register="registerAddForm" title="添加收费标准" @ok="addOk" width="300px">
      <a-form
        :model="addForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        layout="horizontal"
      >
        <a-form-item label="加价">
          <InputNumber v-model:value="addForm.offset_price" :min="0" />
        </a-form-item>
      </a-form>
    </BasicModal>

    <BasicModal @register="addRegister" title="添加收费标准" width="600px">
      <PriceLevelVieList v-model:vielist="list" @add-broker-vie="addBrokerVie" />
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { Tag } from 'ant-design-vue';
  import { defineComponent, ref, reactive, onMounted, unref } from 'vue';
  import Icon from '/@/components/Icon/index';
  import { BasicForm } from '/@/components/Form/index';
  import {
    brokerPriceLevelVieList,
    brokerPriceLevelVieSetEnabled,
    brokerPriceLevelVieAdd,
    brokerPriceLevelVieCh,
  } from '/@/api/user';
  import { Popconfirm, InputNumber } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { nToB, bToN } from '/@/utils/conversion';
  import PriceLevelVieList from './PriceLevelVieList.vue';

  export default defineComponent({
    components: { Icon, Tag, BasicForm, Popconfirm, BasicModal, InputNumber, PriceLevelVieList },
    setup() {
      const { createMessage } = useMessage();

      const list = ref<any[]>([]);

      const loading: any = reactive({});

      const isLoading = (e: any) => loading[e.ID];

      const loadingRef = ref(false);

      async function getData() {
        loadingRef.value = true;
        try {
          const dd = await brokerPriceLevelVieList({});
          dd.sort(function (a: any, b: any) {
            return a.sort_no - b.sort_no;
          });
          dd.map((it: any) => ({
            ...it,
            enabled: nToB(it.enabled),
          }));
          list.value = dd;
        } catch (error) {
        } finally {
          loadingRef.value = false;
        }
      }

      onMounted(() => {
        getData();
      });

      async function onEnabled(e: any) {
        loading[e.ID] = true;
        try {
          await brokerPriceLevelVieSetEnabled({
            id: e.ID,
            enabled: bToN(!e.enabled),
          });
        } catch (error) {
          e.enabled = !e.enabled;
        } finally {
          loading[e.ID] = false;
        }
      }

      const [register, { openModal }] = useModal();
      const [addRegister, { openModal: openAddModal }] = useModal();
      const [registerAddForm, { openModal: openAddFormModal }] = useModal();

      const form = reactive({
        id: 0,
        offset_price: 0,
      });

      const load = ref(true);

      const addForm = reactive({
        offset_price: 0,
        price_level_id: 0,
        broker_id: 0,
      });

      function opm(data: any = { ID: 0, offset_price: 0 }) {
        form.id = data.ID;
        form.offset_price = data.offset_price;
        openModal();
      }

      function opaddm() {
        openAddModal();
      }

      async function ok() {
        try {
          await brokerPriceLevelVieCh(unref(form));
          createMessage.success('修改成功！');
          getData();
          openModal(false);
        } catch (error) {
          console.log(error);
        }
      }

      async function addOk() {
        try {
          await brokerPriceLevelVieAdd(unref(addForm));
          createMessage.success('添加成功！');
          getData();
          load.value = false;
          openAddFormModal(false);
        } catch (error) {
          console.log(error);
        } finally {
          load.value = true;
        }
      }

      function addBrokerVie(item: any) {
        console.log(item);
        addForm.price_level_id = item.ID;
        addForm.offset_price = 0;
        openAddFormModal();
      }

      return {
        prefixCls: 'list-search',
        list,
        isLoading,
        onEnabled,
        register,
        addRegister,
        opm,
        form,
        addForm,
        ok,
        addOk,
        opaddm,
        loadingRef,
        addBrokerVie,
        registerAddForm,
      };
    },
  });
</script>
<style lang="less" scoped>
  .list-search {
    &__header {
      &-form {
        margin-bottom: -16px;
      }
    }

    &__container {
      padding: 12px;
      margin: 24px;
      background: #fff;
    }

    &__title {
      margin-bottom: 12px;
      font-size: 18px;
    }

    &__content {
      color: rgba(0, 0, 0, 0.65);
    }

    &__action {
      margin-top: 10px;

      &-item {
        display: inline-block;
        padding: 0 16px;
        color: rgba(0, 0, 0, 0.45);

        &:nth-child(1) {
          padding-left: 0;
        }

        &:nth-child(1),
        &:nth-child(2) {
          border-right: 1px solid rgba(206, 206, 206, 0.4);
        }
      }

      &-icon {
        margin-right: 3px;
      }
    }

    &__time {
      position: absolute;
      right: 20px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
</style>
