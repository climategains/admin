<script async setup>
import { onMounted, ref } from "vue";

import Modal from "@/components/ui/modal.vue";
import Table from "@/components/ui/programmes/table.vue";

import useStore from "../../store";
const store = useStore();

store.breadcrumbs = [{ name: "All Users", href: "users" }];

const modal = ref({ isOpen: false, data: [] });

const options = {
  title: "All Users",
  text: "A list of all the user profiles in the database.",
  button: {
    text: "Add User",
  },
};
const filters = [
  { title: "name", id: "fullname" },
  { title: "organization", id: "organization" },
  { title: "database_id", id: "id" },
  { title: "language", id: "ui_language" },
];

function openModal(index) {
  const obj = {
    id: "public.profile",
    entry: store.users[index],
  };
  modal.value.data.push(obj);
  modal.value.isOpen = true;
}

function closeModal() {
  modal.value.data = [];
  modal.value.isOpen = false;
}

onMounted(async () => {
  store.fetchUsers();
});

const users = store.users.filter((x) => x.fullname);
</script>

<template>
  <Table
    :filters="filters"
    :data="users"
    :options="options"
    class="mt-8"
    @select="openModal"
  />
  <Modal v-if="modal.isOpen" :data="modal.data" @close="closeModal" />
</template>
