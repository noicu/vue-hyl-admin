<template>
  <div>{{ name }} </div>
  <div>{{ title }}</div>
  <div>{{ action.type }}</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      name: String,
      title: String,
    },
    emits: ['register'],
    setup({ name, title }, { emit }) {
      const action = {
        type: 123,
      };
      emit('register', action);

      return {
        name,
        title,
        action,
      };
    },
  });
</script>

<style></style>
