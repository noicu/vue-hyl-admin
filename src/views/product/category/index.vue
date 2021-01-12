<template>
  <ScrollContainer v-loading="loadingRef" loading-tip="加载中...">
    <div class="product-category product-category-title">
      <div class="product-category-name">分类</div>
      <div class="product-category-add" @click.stop="addCategory">
        <Icon icon="ic:baseline-add" size="24" />
      </div>
    </div>
    <div
      class="product-category product-category-item"
      v-for="it in categorys"
      @click="onCategory(it)"
    >
      <div v-if="isUrl(it.icon)" class="product-category-icon"><img :src="it.icon" alt="" /></div>
      <div v-else class="product-category-icon">
        <Icon icon="mdi:image-off" size="24" />
      </div>
      <div class="product-category-name">{{ it.name }}</div>
      <div class="product-category-edit" @click.stop="onEditCategory(it)"
        ><Icon icon="mdi:square-edit-outline" size="24"
      /></div>
    </div>
  </ScrollContainer>
  <CategoryModal @register="register" @return="modalReturn" />
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { productCategoryList, Category } from '/@/api/yi/product';
  import Icon from '/@/components/Icon/index';
  import { ScrollContainer } from '/@/components/Container/index';
  import { isUrl } from '/@/utils/is';
  import { useModal } from '/@/components/Modal';
  import CategoryModal from './CategoryModal.vue';

  export default defineComponent({
    emits: ['clickItem'],
    components: { ScrollContainer, Icon, CategoryModal },
    setup({}, { emit }) {
      const categorys = ref<Category[]>([]);
      const [register, { openModal }] = useModal();
      const loadingRef = ref(false);

      getCategory();

      function getCategory() {
        loadingRef.value = true;
        productCategoryList()
          .then((res) => {
            categorys.value = res;
          })
          .finally(() => {
            loadingRef.value = false;
          });
      }

      function addCategory() {
        openModal(true, {});
      }

      function onCategory(e: Category) {
        emit('clickItem', unref(e));
      }

      function onEditCategory(e: Category) {
        openModal(true, e);
      }

      function modalReturn(e: Category) {
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
      };
    },
  });
</script>

<style lang="less" scoped>
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
        color: #03a9f4;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #9bdfff;
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
    }
  }
</style>
