<template>
  <div>
    <Cascader :options="options" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
  import { Cascader } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import options from './options';

  export default defineComponent({
    components: { Cascader },
    setup() {
      return {
        options,
      };
    },
  });
</script>

<style></style>
