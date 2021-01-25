<template>
  <div :class="prefixCls">
    <a-page-header v-if="isShow" title="悬赏贴标准" :ghost="false" :class="`${prefixCls}__header`">
      <template #extra>
        <a-button type="primary" @click="opm()"> 新增标准 </a-button>
      </template>
    </a-page-header>

    <div
      :class="{
        [`${prefixCls}__container`]: true,
        is_component: !isShow,
      }"
    >
      <a-list :loading="loadingRef">
        <template v-for="item in list" :key="item.ID">
          <a-list-item>
            <a-list-item-meta>
              <template #description>
                <div :class="`${prefixCls}__content`">
                  <span>价格：</span>
                  <span>{{ item.price }}</span>
                </div>
                <div v-if="isShow" :class="`${prefixCls}__action`">
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
                  <Tag v-if="isShow" class="mb-2" style="float: right">{{ item.sort_no }}</Tag>
                  <a-button
                    v-if="!isShow"
                    style="float: right"
                    type="primary"
                    size="small"
                    @click="addBrokerPrize(item)"
                    :disabled="prizelist.map((it) => it.price_level_id).indexOf(item.ID) != -1"
                  >
                    添加
                  </a-button>
                </p>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <BasicModal @register="register" title="设置标准" @ok="ok" width="300px">
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
  import { defineComponent, ref, reactive, onMounted, unref, computed, toRaw } from 'vue';
  import type { PropType } from 'vue';
  import Icon from '/@/components/Icon/index';
  import { BasicForm } from '/@/components/Form/index';
  import {
    priceLevelPrizeList,
    priceLevelPrizeRm,
    priceLevelPrizeAdd,
    priceLevelPrizeCh,
  } from '/@/api/user';
  import { Popconfirm, InputNumber } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';

  export default defineComponent({
    components: { Icon, Tag, BasicForm, Popconfirm, BasicModal, InputNumber },
    emits: ['addBrokerPrize'],
    props: {
      prizelist: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    setup({ prizelist }, { emit }) {
      const { createMessage } = useMessage();

      const list = ref<any[]>([]);

      const loading: any = reactive({});

      const isLoading = (e: any) => loading[e.ID];

      const loadingRef = ref(false);

      const role = ref({
        broker: userStore.getRoleListState.includes(RoleEnum.BROKER),
        super: userStore.getRoleListState.includes(RoleEnum.SUPER),
      });

      async function getData() {
        loadingRef.value = true;
        try {
          const dd = await priceLevelPrizeList({});
          dd.sort(function (a: any, b: any) {
            return a.sort_no - b.sort_no;
          });
          list.value = dd;
        } catch (error) {
        } finally {
          loadingRef.value = false;
        }
      }

      onMounted(() => {
        getData();
      });

      async function onDelete(e: any) {
        loading[e.ID] = true;
        try {
          await priceLevelPrizeRm({
            id: e.ID,
          });
          getData();
        } catch (error) {
        } finally {
          loading[e.ID] = false;
        }
      }

      const [register, { openModal }] = useModal();

      const isShow = computed(() => unref(role).super);

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
            await priceLevelPrizeCh({
              id: unref(form).id,
              m: {
                title: unref(form).title,
                price: unref(form).price,
                sort_no: unref(form).sort_no,
              },
            });
          } else {
            await priceLevelPrizeAdd({
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

      function addBrokerPrize(it: any) {
        emit('addBrokerPrize', toRaw(it));
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
        loadingRef,
        isShow,
        prizelist,
        addBrokerPrize,
      };
    },
  });
</script>
<style lang="less" scoped>
  .is_component {
    padding: 0 !important;
    margin: 0 !important;
  }

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
