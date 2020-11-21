<template>
  <div class="high-form">
    <a-page-header title="商品详情" sub-title="ID：BXT5aHUBUEDNcUc8voXi" :ghost="false">

    </a-page-header>

    <div class="m-5">
      <a-card title="基本信息" :bordered="false">
        <BasicForm @register="register" layout="vertical" />
      </a-card>
      <a-card title="颜色管理" :bordered="false" class="mt-5">
        <PersonTable ref="tableRef" />
      </a-card>
      <a-card title="图片管理" :bordered="false" class="mt-5">
        <PersonTable ref="tableRef" />
      </a-card>
    </div>

    <app-footer>
      <template #left>
        最近更新时间：2020-10-27 15:34:31
      </template>
      <template #right>
        <a-button type="primary" @click="submitAll">提交</a-button>
      </template>
    </app-footer>
  </div>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { computed, defineComponent, ref, unref } from 'vue';
  import PersonTable from './PersonTable.vue';
  import { schemas } from './data';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: { BasicForm, PersonTable },
    setup() {
      const { currentRoute } = useRouter();
      const tableRef = ref<{ getDataSource: () => any } | null>(null);

      const [register, { validate }] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: schemas,
        showActionButtonGroup: false,
      });

      // async function getProduct(){
      //   try {

      //   } catch (error) {}
      // }

      async function submitAll() {
        try {
          if (tableRef.value) {
            console.log('table data:', tableRef.value.getDataSource());
          }

          const [values, taskValues] = await Promise.all([validate()]);
          console.log('form data:', values, taskValues);
        } catch (error) {}
      }

      return {
        register,
        submitAll,
        tableRef,
        params: computed(() => {
          return unref(currentRoute).params;
        }),
      };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
