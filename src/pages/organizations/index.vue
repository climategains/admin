<script async setup>
import { onMounted, ref } from "vue";

import Modal from "@/components/ui/modal.vue";
import Table from "@/components/ui/programmes/table.vue";

import useStore from "../../store";
const store = useStore();

store.breadcrumbs = [
  { name: "Organizations", href: "organizations" },
  { name: "All Organizations", href: "new_organization" },
];

onMounted(async () => {
  store.fetchOrganizations();
});

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: false,
    timeZone: "UTC",
  });
};

function getTime(time) {
  return formatDate(time) + " at " + formatTime(time);
}

const organizations = store.organizations.map((obj) => ({
  ...obj,
  created_at: getTime(obj.created_at),
}));

const modal = ref({ isOpen: false, data: [] });

const options = {
  title: "All Organizations",
  text: "A list of all the organizations in the database.",
  button: {
    text: "Add Organization",
    href: "new_organization",
  },
};
const filters = [
  { title: "organization name", id: "name" },
  { title: "email", id: "email" },
  { title: "carbon registry id", id: "carbon_registry_id" },
  { title: "carbon registry link", id: "carbon_registry_link" },
  { title: "created", id: "created_at" },
];

function openModal(index) {
  const obj = {
    id: "public.organisation",
    entry: store.organizations[index],
  };
  modal.value.data.push(obj);
  modal.value.isOpen = true;
}

function closeModal() {
  modal.value.data = [];
  modal.value.isOpen = false;
}
</script>

<template>
  <Table
    :filters="filters"
    :data="organizations"
    :options="options"
    class="mt-8"
    @select="openModal"
  />
  <Modal v-if="modal.isOpen" :data="modal.data" @close="closeModal" />
</template>
