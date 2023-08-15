<script setup>
import { useRoute, useRouter } from "vue-router";
import useStore from "../../store";
import useAuthUser from "@/composables/UseAuthUser";
import Form from "@/components/ui/form.vue";
import Steps from "@/components/ui/steps.vue";
import { reactive, ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const { user } = useAuthUser();
const store = useStore();

const route = useRoute();
const id = route.params.id;

const router = useRouter();

const form = store.forms.programme[id];

store.breadcrumbs = [
  { name: "Programmes", href: "programmes" },
  { name: "New Programme", href: "new_programme" },
  { name: form.title, href: "new_programme" },
];

const rules = {
  firstName: { required }, // Matches state.firstName
  lastName: { required }, // Matches state.lastName
  contact: {
    email: { required, email }, // Matches state.contact.email
  },
};

const questions = form.questions;

const allAnswersCompleted = computed(() => {
  return questions && questions.every((question) => !!question.answer);
});

const allStepsCompleted = computed(() => {
  return (
    form.children &&
    form.children.every((child) => {
      return (
        child.name &&
        child.description &&
        child.funding_amount &&
        child.worktime &&
        child.questions.every(
          (question) => question.text !== null && question.text !== ""
        )
      );
    })
  );
});

function saveForm() {
  router.back();
}

function clearOne() {
  store.forms.programme[0].questions = [
    {
      text: "What is the name of the programme?",
      id: "name",
      helper: "",
      type: "text",
      answer: null,
    },
    {
      text: "What country is it operating in?",
      id: "country_code",
      type: "select_country",
      answer: null,
    },
    {
      text: "Where is the programme based?",
      id: "location_name",
      type: "text",
      answer: null,
    },
    {
      text: "What is your funding source?",
      id: "funding_source",
      type: "text",
      answer: null,
    },
    {
      text: "What sector is it operating in?",
      id: "default_sector",
      type: "sector_select",
      options: [
        { title: "Solar Energy", icon: "heroicons-outline:sun" },
        { title: "Wind Energy", icon: "mingcute:wind-line" },
        { title: "Biomass Energy", icon: "fluent:plant-grass-28-regular" },
        { title: "Other", icon: "fluent:earth-leaf-20-regular" },
      ],
      answer: null,
    },
    {
      text: "What is the organization?",
      id: "organisation",
      type: "select_organization",
      answer: null,
    },
  ];
}

function clearSteps() {
  store.forms.programme[1] = {
    id: 2,
    title: "Programme Steps",
    description:
      "Define the steps required by an activist to complete the programme",
    children: [
      {
        order: "100",
        name: "",
        description: "",
        funding_amount: "",
        worktime: "",
        risks: [],
        supplies: [],
        suppliers: [],
        active: true,
        funding_currency: "EUR",
        support: "",
        questions: [{ order: 100, text: null }],
      },
    ],
  };
}

function clearBacking() {
  store.forms.programme[2].questions = [
    {
      text: "What is the type of backing?",
      id: "backing_type",
      helper: "",
      type: "text",
      answer: null,
    },
    {
      text: "What is the amount of funding?",
      id: "funding_amount",
      type: "text",
      answer: null,
    },
    {
      text: "What is funding currency?",
      id: "funding_currency",
      type: "text",
      answer: null,
    },
    {
      text: "Describe the support you are providing.",
      id: "support_description",
      type: "text",
      answer: null,
    },
    {
      text: "What type of returns are you expecting?",
      id: "returns_type",
      type: "text",
      answer: null,
    },
    {
      text: "What number of returns are you expecting?",
      id: "returns_amount",
      type: "text",
      answer: null,
    },
    {
      text: "Describe the returns you are expecting",
      id: "returns_description",
      type: "text",
      answer: null,
    },
  ];
}
</script>

<template>
  <div class="pt-10 mb-5 flex justify-between px-12">
    <div class="w-2/3">
      <h3 class="text-2xl font-bold pb-4 border-b mr-10">
        {{ form.title }}
      </h3>
      <p class="mt-3">
        Your application will autosave as you fill it out. It will also save any
        parts you complete. So you can fill out the form in one go or over time.
        You can navigate between sections - you don't have to fill out the
        applicaton in the order shown.
      </p>
    </div>
    <div class="w-1/4 box bg-gray-50 border rounded-xl p-6">
      <button
        v-if="id == 2"
        class="bg-red-500 mb-3 border-none"
        @click="clearBacking()"
      >
        Clear Draft
      </button>
      <button
        v-if="id == 1"
        class="bg-red-500 mb-3 border-none"
        @click="clearSteps()"
      >
        Clear Draft
      </button>
      <button
        v-if="id == 0"
        class="bg-red-500 mb-3 border-none"
        @click="clearOne()"
      >
        Clear Draft
      </button>
      <button
        v-if="!allAnswersCompleted && !allStepsCompleted"
        class="
          bg-gray-300
          cursor-default
          border-none
          text-black
          border border-black
        "
      >
        Save
      </button>
      <button
        v-if="allAnswersCompleted || allStepsCompleted"
        class="bg-black border-none text-black border border-black"
        @click="saveForm()"
      >
        Save
      </button>
      <!-- <span class="underline mr-2 font-bold" @click="index = null"
              >back</span
            > -->
    </div>
  </div>
  <Form v-if="form.id !== 2" class="px-12" :form="form" />
  <Steps v-else />
</template>
