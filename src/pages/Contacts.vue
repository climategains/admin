<script async setup>
import useSupabase from "@/composables/UseSupabase";
import Table from "@/components/ui/contacts/table.vue";

const { supabase } = useSupabase();

import { onMounted, reactive } from "vue";

import useStore from "@/store";
const store = useStore();

const state = reactive({
  data: null,
});

store.breadcrumbs = [{ name: "All Contacts", href: "contacts_page" }];

onMounted(async () => {
  await store.fetchContacts();
});
</script>

<template>
  <Table class="p-12" :data="store.contacts" />
</template>
