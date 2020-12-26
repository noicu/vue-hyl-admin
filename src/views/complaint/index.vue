<template>
  <div>
    <Districts />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import { Districts } from '/@/components/Districts';

  export default defineComponent({
    components: { Districts },
    setUp() {
      return {};
    },
  });
</script>

<style></style>
