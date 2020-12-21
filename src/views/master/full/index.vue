<template>
  <div> 1 </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { masterInfoFull } from '/@/api/yi/master';

  export default defineComponent({
    setup() {
      console.log(masterInfoFull);
    },
  });
</script>

<style></style>
