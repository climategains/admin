<script setup>
import useAuthUser from "@/composables/UseAuthUser";
const { user } = useAuthUser();
</script>

<template>
  <div v-if="user">
    <div>Hello {{ user }}</div>
  </div>
</template>
