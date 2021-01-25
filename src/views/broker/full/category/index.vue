<template>
  <ScrollContainer v-loading="loadingRef" loading-tip="加载中...">
    <div class="product-category product-category-title">
      <div class="product-category-name">分类</div>
      <a-checkbox v-model:checked="allChecked" :indeterminate="indeterminate"> 全选 </a-checkbox>

      <Popconfirm
        v-if="allChecked || indeterminate"
        :title="`确定要删除吗?`"
        @confirm="delCategory()"
      >
        <template #icon><Icon icon="mdi:alert" style="color: red" /></template>
        <div class="product-category-del" @click.stop="() => {}">
          <Icon icon="ant-design:delete-twotone" size="24" />
        </div>
      </Popconfirm>
      <div class="product-category-add" @click.stop="addCategory">
        <Icon icon="ic:baseline-add" size="24" />
      </div>
    </div>
    <div
      class="product-category product-category-item"
      :class="{
        category__a: cateId == it.cate_id,
      }"
      v-for="it in categorys"
      @click="onCategory(it)"
    >
      <div class="product-category-icon" @click.stop="() => {}">
        <a-checkbox v-model:checked="checked[it.cate_id]"> </a-checkbox>
      </div>
      <div class="product-category-name">{{ it.cate_name }}</div>
      <Popconfirm
        v-if="!allChecked || indeterminate"
        :title="`确定要删除吗?`"
        @confirm="delCategory(it.cate_id)"
      >
        <template #icon><Icon icon="mdi:alert" style="color: red" /></template>
        <div class="product-category-edit" @click.stop="() => {}">
          <Icon icon="ant-design:delete-twotone" size="24" />
        </div>
      </Popconfirm>
    </div>
  </ScrollContainer>
  <CategoryModal @register="register" @return="modalReturn" />
</template>

<script lang="ts">
  import { defineComponent, ref, unref, watch, reactive } from 'vue';
  import Icon from '/@/components/Icon/index';
  import { ScrollContainer } from '/@/components/Container/index';
  import { isUrl } from '/@/utils/is';
  import { useModal } from '/@/components/Modal';
  import CategoryModal from './CategoryModal.vue';
  import { brokerCateList, brokerCateRm } from '/@/api/user';
  import { Popconfirm } from 'ant-design-vue';

  export default defineComponent({
    emits: ['clickItem', 'change'],
    components: { ScrollContainer, Icon, CategoryModal, Popconfirm },
    setup({}, { emit }) {
      const categorys = ref<any[]>([]);
      const [register, { openModal }] = useModal();
      const loadingRef = ref(false);
      const cateId = ref<Number>(0);
      const checked = reactive<any>({});
      const allChecked = ref(false);
      const indeterminate = ref(false);

      watch(allChecked, (val) => {
        indeterminate.value = false;
        for (let key in unref(checked)) {
          if (val) {
            if (!checked[key]) checked[key] = true;
          } else {
            if (checked[key]) checked[key] = false;
          }
        }
      });

      watch(checked, () => {
        let c = 0;
        for (let key in unref(checked)) {
          if (checked[key]) c++;
        }
        console.log(c);
        indeterminate.value = !!c && c < Object.keys(checked).length;

        allChecked.value = !!c && c == Object.keys(checked).length;
      });

      getCategory();

      function getCategory() {
        loadingRef.value = true;
        for (let key in unref(checked)) {
          delete checked[key];
        }
        brokerCateList({})
          .then((res) => {
            categorys.value = res;
            cateId.value = res[0].cate_id || 0;
            categorys.value.forEach((it: any) => {
              if (!checked[it.cate_id]) {
                checked[it.cate_id] = false;
              } else {
                checked[it.cate_id] = true;
              }
            });
          })
          .finally(() => {
            loadingRef.value = false;
          });
      }

      function addCategory() {
        openModal(true, {
          bp: unref(categorys),
        });
      }

      function onCategory(e: any) {
        cateId.value = e.cate_id || 0;
        emit('clickItem', unref(e));
      }

      async function delCategory(e: any = null) {
        let cat: any[] = [];
        try {
          if (e) {
            cat = [e];
          } else {
            Object.keys(checked).forEach((it) => {
              console.log(checked[it]);
              if (checked[it]) cat.push(it);
            });
          }
          await brokerCateRm({
            list_cate_id: cat.map((c) => Number(c)),
          });
          getCategory();
        } catch (error) {}
      }

      watch(cateId, (val) => {
        emit('change', val);
      });

      function onEditCategory(e: any) {
        openModal(true, e);
      }

      function modalReturn(e: any) {
        console.log(e);
        getCategory();
      }

      return {
        categorys,
        onCategory,
        onEditCategory,
        addCategory,
        register,
        isUrl,
        modalReturn,
        loadingRef,
        cateId,
        checked,
        allChecked,
        indeterminate,
        delCategory,
      };
    },
  });
</script>

<style lang="less" scoped>
  .category__a {
    color: #fff !important;
    background: #2196f3 !important;
  }

  .product {
    &-category {
      display: flex;
      height: 32px;
      padding-left: 8px;
      line-height: 32px;
      background: #fff;
      border-bottom: 1px solid #ededed;

      &-title {
        font-size: 18px;
        font-weight: 700;
      }

      &-item {
        font-size: 14px;

        &:hover {
          background-color: #fafafa;
        }
      }

      &:hover &-edit {
        display: block;
      }

      &-icon {
        width: 32px;
        height: 32px;
        padding: 3px;
        line-height: 24px;
        color: #eee;
        text-align: center;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &-name {
        flex: 1;
        padding-left: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-edit {
        display: none;
        width: 32px;
        color: #c01212;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #ff9b9b;
        }
      }

      &-add {
        width: 32px;
        color: #12c07d;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #9bdfff;
        }
      }

      &-del {
        width: 32px;
        color: #c01212;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #ff9b9b;
        }
      }
    }
  }
</style>
