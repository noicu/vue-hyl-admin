<template>
  <div>
    <Filters></Filters>
    <CM v-bind="pp" @register="handleTest"></CM>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Filters } from '/@/components/Filters';
  import CM from './cm1.vue';
  export default defineComponent({
    components: { Filters, CM },
    setup() {
      const pp = {
        name: '123',
        title: '12333',
      };
      function handleTest(e:any) {
        console.log(e);
        e.type = 321;
      }
      return { pp, handleTest };
    },
  });
</script>

<style></style>
