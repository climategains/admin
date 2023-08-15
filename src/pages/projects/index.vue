<script async setup>
import { onMounted, ref } from "vue";

import Modal from "@/components/ui/modal.vue";
import Table from "@/components/ui/programmes/table.vue";

import useStore from "../../store";
const store = useStore();

store.breadcrumbs = [{ name: "All Projects", href: "projects" }];

const modal = ref({ isOpen: false, data: [] });

const options = {
  title: "All Projects",
  text: "A list of all the projects in the database.",
  button: {
    text: "Add Project",
  },
};
const filters = [
  { title: "name", id: "name" },
  { title: "created", id: "created" },
  { title: "location", id: "location_name" },
];

function createEntry(id, data, color) {
  const obj = {
    id: id,
    entry: data,
    color: color || null,
  };
  modal.value.data.push(obj);
}

function getResponses(id) {
  const responses = store.projects.responses.filter((x) => x.step_id == id);
  for (let i = 0; i < responses.length; i++) {
    createEntry("public.response", responses[i], "bg-green-600");
  }
}

function getSteps(id) {
  const steps = store.projects.steps.filter((x) => x.project_id == id);
  for (let i = 0; i < steps.length; i++) {
    createEntry("public.step", steps[i], "bg-yellow-500");
    getResponses(steps[i].id);
  }
}

function openModal(index) {
  const project = store.projects.all[index];
  createEntry("public.project", project);
  getSteps(project.id);

  modal.value.isOpen = true;
}

function closeModal() {
  modal.value.data = [];
  modal.value.isOpen = false;
}

onMounted(async () => {
  store.fetchProjects();
  store.fetchProjectSteps();
  store.fetchProjectResponses();
});

const projects = store.projects.all;
</script>

<template>
  <Table
    :filters="filters"
    :data="projects"
    :options="options"
    class="mt-8"
    @select="openModal"
  />

  <Modal v-if="modal.isOpen" :data="modal.data" @close="closeModal" />
</template>
