<template>
  <div>
    <a-page-header title="单号：234231029431" class="high-desc">
      <!-- <template #extra>
        <a-button key="3"> 操作一 </a-button>
        <a-button key="2"> 操作二 </a-button>
        <a-button key="1" type="primary"> 主操作 </a-button>
      </template> -->
      <template #footer>
        <div :style="{ marginBottom: '16px' }">
          <a-button @click=""> 添加商品分类 </a-button>
        </div>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="详情" />
          <a-tab-pane key="2" tab="规则" />
        </a-tabs>
      </template>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="创建人"> 曲丽丽 </a-descriptions-item>
        <a-descriptions-item label="订购产品"> XX 服务 </a-descriptions-item>
        <a-descriptions-item label="创建时间"> 2017-01-10 </a-descriptions-item>
        <a-descriptions-item label="关联单据"> <a>12421</a> </a-descriptions-item>
        <a-descriptions-item label="生效日期"> 2017-07-07 ~ 2017-08-08 </a-descriptions-item>
        <a-descriptions-item label="备注"> 请于两个工作日内确认 </a-descriptions-item>
      </a-descriptions>
    </a-page-header>

    <div class="m-5 desc-wrap">
      <Master :broker-id="params.id" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { Description } from '/@/components/Description/index';
  import Master from './Master.vue';
  import Product from './Product.vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: { Description, Master, Product },
    setup() {
      const { currentRoute } = useRouter();

      const params = computed(() => {
        return unref(currentRoute).params;
      });

      return {
        params,
      };
    },
  });
</script>
<style lang="less" scoped>
  .high-desc {
    background: #fff;
  }
</style>
