<template>
  <div class="p-4">
    <a-row :gutter="[16, 16]">
      <a-col :md="24" :lg="12">
        <Area />
      </a-col>
      <a-col :md="24" :lg="12"> </a-col>
    </a-row>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import Line from './Line.vue';
  import Bar from './Bar.vue';
  import Area from './Area.vue';
  import Mixed from './Mixed.vue';

  export default defineComponent({
    components: { Line, Bar, Area, Mixed },
    setup() {
      return {};
    },
  });
</script>
<style lang="less" scoped></style>
