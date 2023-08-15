<script setup>
import Steps from "@/components/Steps.vue";
import Table from "@/components/ui/application/table.vue";
import { ref, computed, watch } from "vue";
import Nav from "@/components/ui/nav.vue";
import useAuthUser from "@/composables/UseAuthUser";
const { user } = useAuthUser();

import useSupabase from "@/composables/UseSupabase";
const { supabase } = useSupabase();

const index = ref(null);
const result = ref({
  programme: null,
  steps: [],
  questions: [],
  backers: null,
});
const showModal = ref(false);

import useStore from "../../store";
const store = useStore();

store.breadcrumbs = [
  { name: "Programmes", href: "programmes" },
  { name: "New Programme", href: "new_programme" },
];

const forms = store.forms.programme;

const pages = [
  { name: "Programmes", href: "programmes", current: false },
  { name: "New Programme", href: "new_programme", current: false },
];

function select(value) {
  if (index.value == value) {
    index.value = false;
  } else {
    index.value = value;
  }
}

function checkValidStep(questions) {
  return questions.every((question) => !!question.answer);
}

function allStepsCompleted(form) {
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
}

async function createProgramme() {
  const obj = {
    name: forms[0].questions[0].answer,
    country_code: forms[0].questions[1].answer.code.toLowerCase(),
    location_name: forms[0].questions[2].answer,
    funding_source: forms[0].questions[3].answer,
    default_sector: forms[0].questions[4].answer.title,
    organisation: forms[0].questions[5].answer.id,
  };

  const { data, error } = await supabase
    .from("programme")
    .insert([obj])
    .select();

  console.log(error);
  console.log(data);
  return data;
}

async function createStep(id, item, index) {
  const order = (parseInt(index) + 1) * 100;
  const obj = {
    programme_id: id,
    name: item.name,
    funding_amount: item.funding_amount,
    active: true,
    funding_currency: "EUR",
    order: order,
    description: item.description,
    worktime: item.worktime,
    risks: item.risks.map((x) => x.name) || null,
    supplies: item.supplies.map((x) => x.name) || null,
    suppliers: item.suppliers,
    support: item.support,
  };

  const { data, error } = await supabase
    .from("programme_step")
    .insert([obj])
    .select();

  console.log(error);
  console.log(data);
  return data;
}

async function createQuestion(id, item) {
  const obj = {
    programme_step_id: id,
    order: item.order,
    prompt: item.text,
    active: true,
  };

  const { data, error } = await supabase
    .from("programme_response")
    .insert([obj])
    .select();

  console.log(error);
  console.log(data);
  return data;
}

async function createQuestions(id, index) {
  const questions = forms[1].children[index].questions;
  console.log(questions);
  for (let i = 0; i < questions.length; i++) {
    const question = await createQuestion(id, questions[i]);
    result.value.questions.push(question);
  }
}

async function createSteps(id) {
  for (let i = 0; i < forms[1].children.length; i++) {
    const step = await createStep(id, forms[1].children[i], index);
    result.value.steps.push(step);
    await createQuestions(step[0].id, i);
    showModal.value = true;
  }
}

// {
//         name: forms[0].questions[0].answer,
//         contact_address: forms[0].questions[5].answer.contact_address,
//         billing_address: forms[0].questions[5].answer.billing_address,
//         payment_accounts: forms[0].questions[5].answer.payment_accounts,
//         email: forms[0].questions[5].answer.email,
//         phone: forms[0].questions[5].answer.phone,
//         website: forms[0].questions[5].answer.website,
//         carbon_registry_id: forms[0].questions[5].answer.carbon_registry_id,
//         carbon_registry_link: forms[0].questions[5].answer.carbon_registry_link,
//       },

async function submitProgramme() {
  const programme = await createProgramme();
  result.value.programme = programme;
  await createSteps(programme[0].id);
}
</script>

<template>
  <div class="pt-10 mb-5 flex justify-between px-12">
    <div class="w-2/3">
      <h3 class="text-2xl font-bold pb-4 border-b mr-10">
        Create a new programme
      </h3>
      <p class="mt-3">
        Your application will autosave as you fill it out. It will also save any
        parts you complete. So you can fill out the form in one go or over time.
        You can navigate between sections - you don't have to fill out the
        applicaton in the order shown.
      </p>
    </div>
    <div class="w-1/4 box bg-gray-50 border rounded-xl p-6">
      <button class="bg-red-500 mb-3 border-none">Clear Draft</button>
      <button
        v-if="checkValidStep(forms[0].questions) && allStepsCompleted(forms[1])"
        class="bg-black border-none text-black border border-black"
        @click="submitProgramme()"
      >
        Submit
      </button>
      <button
        v-else
        class="
          bg-gray-200
          border-none
          text-black
          border
          cursor-default
          border-black
        "
      >
        Submit
      </button>
    </div>
    <div v-if="showModal" class="modal_container" @click="showModal = false">
      <div class="modal flex flex-col justify-start items-start">
        <h2 class="font-bold text-2xl border-b pb-2 w-full mb-3">Results</h2>
        <h3
          class="
            uppercase
            bg-gray-100
            rounded-lg
            px-3
            py-2
            border
            text-xs
            w-auto
            inline-block
          "
        >
          public.programme
        </h3>
        <code class="w-full my-4">{{ result.programme }}</code>
        <h3
          class="
            uppercase
            bg-gray-100
            rounded-lg
            px-3
            py-2
            border
            text-xs
            w-auto
            inline-block
          "
        >
          public.programme_response
        </h3>
        <code class="w-full my-4">{{ result.steps }}</code>
        <h3
          class="
            uppercase
            bg-gray-100
            rounded-lg
            px-3
            py-2
            border
            text-xs
            w-auto
            inline-block
          "
        >
          public.programme_step
        </h3>
        <code class="w-full my-4">{{ result.questions }}</code>
      </div>
    </div>
  </div>

  <Table :data="forms" />
</template>
<style scoped>
.modal_container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  justify-content: center;
}

code {
  @apply rounded-xl border bg-gray-100 text-xs p-6;
}

.modal {
  width: 60vw;
  height: 80vh;
  padding: 3rem;
  background: white;
  border-radius: 20px;
  overflow: scroll;
}
</style>
