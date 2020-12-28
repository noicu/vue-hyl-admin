<template>
  <div :class="prefixCls">
    <a-page-header title="闪断贴标准" :ghost="false" :class="`${prefixCls}__header`">
      <template #extra>
        <a-button type="primary" @click="opm()"> 新增标准 </a-button>
      </template>
    </a-page-header>

    <div :class="`${prefixCls}__container`">
      <a-list>
        <template v-for="item in list" :key="item.ID">
          <a-list-item>
            <a-list-item-meta>
              <template #description>
                <div :class="`${prefixCls}__content`">
                  <span>价格：</span>
                  <span>{{ item.price }}</span>
                </div>
                <div :class="`${prefixCls}__action`">
                  <div :class="`${prefixCls}__action-item`">
                    <a-button type="primary" size="small" @click="opm(item)"> 编辑 </a-button>
                  </div>
                  <div :class="`${prefixCls}__action-item`">
                    <Popconfirm :title="`确定要删除 ${item.title} 吗?`" @confirm="onDelete(item)">
                      <template #icon><Icon icon="mdi:alert" style="color: red" /></template>
                      <a-button type="danger" size="small" :loading="isLoading(item)">
                        删除
                      </a-button>
                    </Popconfirm>
                  </div>
                  <span :class="`${prefixCls}__time`">{{ item.update_at }}</span>
                </div>
              </template>
              <template #title>
                <p :class="`${prefixCls}__title`">
                  <span>
                    {{ item.title }}
                  </span>
                  <Tag class="mb-2" style="float: right">{{ item.sort_no }}</Tag></p
                >
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <BasicModal @register="register" title="新增标准" @ok="ok" width="300px">
      <a-form
        :model="form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        layout="horizontal"
      >
        <a-form-item label="名称">
          <a-input v-model:value="form.title" />
        </a-form-item>
        <a-form-item label="价格">
          <InputNumber v-model:value="form.price" :min="0" />
        </a-form-item>
        <a-form-item label="顺序">
          <InputNumber v-model:value="form.sort_no" />
        </a-form-item>
      </a-form>
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { Tag } from 'ant-design-vue';
  import { defineComponent, ref, reactive, onMounted, unref } from 'vue';
  import Icon from '/@/components/Icon/index';
  import { BasicForm } from '/@/components/Form/index';
  import {
    brokerPriceLevelPrizeList,
    brokerPriceLevelPrizeSetEnabled,
    brokerPriceLevelPrizeAdd,
    brokerPriceLevelPrizeCh,
  } from '/@/api/user';
  import { Popconfirm, InputNumber } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: { Icon, Tag, BasicForm, Popconfirm, BasicModal, InputNumber },
    setup() {
      const { createMessage } = useMessage();

      const list = ref<any[]>([]);

      const loading: any = reactive({});

      const isLoading = (e: any) => loading[e.ID];

      async function getData() {
        try {
          const dd = await brokerPriceLevelPrizeList({});
          dd.sort(function (a: any, b: any) {
            return a.sort_no - b.sort_no;
          });
          list.value = dd;
        } catch (error) {}
      }

      onMounted(() => {
        getData();
      });

      async function onDelete(e: any) {
        loading[e.ID] = true;
        try {
          await brokerPriceLevelPrizeSetEnabled({
            id: e.ID,
          });
          getData();
        } catch (error) {
        } finally {
          loading[e.ID] = false;
        }
      }

      const [register, { openModal }] = useModal();

      const form = reactive({
        id: 0,
        title: '',
        price: 0,
        sort_no: 0,
      });

      function opm(data: any = { ID: 0, title: '', price: 0, sort_no: 0 }) {
        form.id = data.ID;
        form.title = data.title;
        form.price = data.price;
        form.sort_no = data.sort_no;
        openModal();
      }

      async function ok() {
        try {
          if (form.id) {
            await brokerPriceLevelPrizeCh({
              id: unref(form).id,
              m: {
                title: unref(form).title,
                price: unref(form).price,
                sort_no: unref(form).sort_no,
              },
            });
          } else {
            await brokerPriceLevelPrizeAdd({
              title: unref(form).title,
              price: unref(form).price,
              sort_no: unref(form).sort_no,
            });
          }
          createMessage.success(form.id ? '修改成功！' : '添加成功！');
          getData();
          openModal(false);
        } catch (error) {
          console.log(error);
        }
      }

      return {
        prefixCls: 'list-search',
        list,
        isLoading,
        onDelete,
        register,
        opm,
        form,
        ok,
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
