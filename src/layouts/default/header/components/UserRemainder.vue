<template>
  <div class="remainder" @click="getR">
    <span class="ml-2 remainder-title">余额：</span>
    <span class="mr-2 remainder-content">{{ remainder }}</span>
    <a-spin class="mr-2" size="small" :spinning="loading" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, ref } from 'vue';
  import { userStore } from '/@/store/modules/user';
  export default defineComponent({
    name: 'UserRemainder',
    components: {},
    props: {},
    setup() {
      const remainder = computed(() => userStore.getRemainderState);
      const loading = ref(false);

      async function getR() {
        if (loading.value) return;
        try {
          loading.value = true;
          await userStore.getRemainder();
        } catch (error) {
        } finally {
          loading.value = false;
        }
      }
      return {
        remainder,
        getR,
        loading,
      };
    },
  });
</script>
<style lang="less">
  .remainder {
    &-title {
      color: rgb(165, 165, 165);
    }

    &-content {
      color: #03a9f4;
    }
  }
</style>
