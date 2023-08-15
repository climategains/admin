<script async setup>
import { onMounted, ref } from "vue";

import Modal from "@/components/ui/modal.vue";
import Table from "@/components/ui/programmes/table.vue";

import useStore from "../../store";
const store = useStore();

store.breadcrumbs = [
  { name: "Programmes", href: "programmes" },
  { name: "All Programmes", href: "programmes" },
];

const modal = ref({ isOpen: false, data: [] });

const options = {
  title: "All Programmes",
  text: "A list of all the programmes in the database.",
  button: {
    text: "Add Programme",
    href: "new_programme",
  },
};
const filters = [
  { title: "name", id: "name" },
  { title: "organisation", id: "organisation" },
  { title: "location", id: "location_name" },
  { title: "funding source", id: "funding_source" },
  { title: "energy sector", id: "default_sector" },
];

function createEntry(id, data, color) {
  const obj = {
    id: id,
    entry: data,
    color: color || null,
  };
  modal.value.data.push(obj);
}

function getQuestions(id) {
  const questions = store.questions.filter((x) => x.programme_step_id == id);
  for (let i = 0; i < questions.length; i++) {
    createEntry("public.programme_response", questions[i], "bg-green-600");
  }
}

function getSteps(id) {
  const steps = store.steps.filter((x) => x.programme_id == id);
  for (let i = 0; i < steps.length; i++) {
    createEntry("public.programme_step", steps[i], "bg-yellow-500");
    getQuestions(steps[i].id);
  }
}

function openModal(index) {
  const programme = store.programmes[index];
  createEntry("public.programme", programme);
  getSteps(programme.id);

  modal.value.isOpen = true;
}

function closeModal() {
  modal.value.data = [];
  modal.value.isOpen = false;
}

onMounted(async () => {
  store.fetchProgrammes();
  store.fetchSteps();
  store.fetchQuestions();
});

function getOrg(id) {
  return store.organizations.filter((x) => x.id == id)[0];
}

const programmes = store.programmes.map((obj) => ({
  ...obj,
  organisation: getOrg(obj.organisation).name,
}));
</script>

<template>
  <Table
    :filters="filters"
    :data="programmes"
    :options="options"
    class="mt-8"
    @select="openModal"
  />
  <Modal v-if="modal.isOpen" :data="modal.data" @close="closeModal" />
</template>
