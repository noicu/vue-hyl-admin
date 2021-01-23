<template>
  <div :loading="loading">
    <a-page-header :title="data.name" class="high-desc">
      <!-- <template #extra>
        <a-button key="3"> 操作一 </a-button>
        <a-button key="2"> 操作二 </a-button>
        <a-button key="1" type="primary"> 主操作 </a-button>
      </template> -->
      <template #footer>
        <!-- <div :style="{ marginBottom: '16px' }">
          <a-button @click=""> 添加商品分类 </a-button>
        </div> -->
        <a-tabs v-model:active-key="active">
          <a-tab-pane key="user" tab="会员" />
          <a-tab-pane key="master" tab="大师" />
          <a-tab-pane key="mall" tab="商品" />
        </a-tabs>
      </template>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="拥有者"> {{ data.owner_nick }} </a-descriptions-item>
        <a-descriptions-item label="摘要"> {{ data.brief }} </a-descriptions-item>
        <a-descriptions-item label="创建时间"> {{ data.created_at }} </a-descriptions-item>
        <a-descriptions-item label="服务码">
          <a> {{ data.service_code }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="更新时间"> {{ data.update_at }} </a-descriptions-item>
        <a-descriptions-item label="状态">
          {{ data.enabled ? '正常' : '禁止' }}
        </a-descriptions-item>
        <a-descriptions-item label="模块状态">
          <a-checkbox-group
            v-model:value="models"
            disabled
            :options="[
              { label: '大师', value: 'enable_master' },
              { label: '商城', value: 'enable_mall' },
              { label: '悬赏贴', value: 'enable_prize' },
              { label: '闪断贴', value: 'enable_vie' },
            ]"
          />
        </a-descriptions-item>
      </a-descriptions>
    </a-page-header>

    <div class="m-2 desc-wrap">
      <Master v-if="active == 'master'" :broker-id="params.id" />
      <Product v-if="active == 'mall'" :broker-id="params.id" />
      <User v-if="active == 'user'" :broker-id="params.id" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref, onMounted, ref } from 'vue';
  import { Description } from '/@/components/Description/index';
  import Master from './Master.vue';
  import Product from './Product.vue';
  import { useRouter } from 'vue-router';
  import { brokerInfoGet } from '/@/api/user';
  import User from '/@/views/user/index.vue';

  export default defineComponent({
    components: { Description, Master, Product, User },
    setup() {
      const { currentRoute } = useRouter();

      const params = computed(() => {
        return unref(currentRoute).params;
      });

      const loading = ref(false);

      const data = ref<any>({});

      const active = ref('user');

      const models = computed(() => {
        let arr = [];
        if (unref(data).enable_mall) arr.push('enable_mall');
        if (unref(data).enable_master) arr.push('enable_master');
        if (unref(data).enable_prize) arr.push('enable_prize');
        if (unref(data).enable_vie) arr.push('enable_vie');
        return arr;
      });

      onMounted(() => {
        getData();
      });

      async function getData() {
        loading.value = true;
        try {
          data.value = await brokerInfoGet(Number(unref(params).id));
        } catch (error) {
          console.log(error);
        } finally {
          loading.value = false;
        }
      }

      return {
        params,
        loading,
        data,
        models,
        active,
      };
    },
  });
</script>
<style lang="less" scoped>
  .high-desc {
    background: #fff;
  }
</style>
