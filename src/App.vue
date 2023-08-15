<script setup>
import AppHeaderVue from "@/components/AppHeader.vue";

import { onMounted } from "vue";
import useStore from "@/store";

const store = useStore();

onMounted(async () => {
  store.fetchUsers();
  store.fetchOrganizations();
  store.fetchContacts();
  store.fetchProjects();
  store.fetchProjectSteps();
  store.fetchProjectResponses();
  store.fetchProgrammes();
  store.fetchSteps();
  store.fetchQuestions();
});
</script>

<template>
  <router-view />
</template>
