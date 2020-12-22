<template>
  <div style="margin-left: 10px">
    {{ title }}
  </div>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent, computed } from 'vue';

  interface TabExtra {
    id?: any;
    title?: any;
  }
  export default defineComponent({
    name: 'TabExtra',
    components: {},
    props: {
      data: {
        type: Object as PropType<TabExtra>,
        default: null,
      },
    },
    setup({ data }) {
      const title = computed(() => {
        if (data.title) return data.title;
        if (data.id) return data.id;
      });
      return {
        title,
      };
    },
  });
</script>
