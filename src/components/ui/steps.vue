<template>
  <div class="mt-5 w-full">
    <p class="mx-12 font-bold">
      Specify the programme steps below. For each step specify the questions
      that need to be answered and verified in order for it to be validated.
    </p>

    <div class="mx-12 mt-5 rounded overflow-hidden flex flex-col border">
      <div class="flex justify-between border-b bg-gray-50">
        <ul class="flex font-bold">
          <li
            v-for="(a, b) in store.forms.programme[1].children"
            :key="b"
            class="border-r cursor-pointer px-10 py-4 pl-10"
            :class="{ ' bg-blue-600 text-white': stepIndex == b }"
            @click="stepIndex = b"
          >
            Step {{ b + 1 }}
          </li>
        </ul>
        <ul class="flex">
          <li
            class="
              border-l
              cursor-pointer
              px-6
              flex
              items-center
              font-bold
              bg-blue-600
              text-white
              py-4
            "
            @click="addStep()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clip-rule="evenodd"
              />
            </svg>
            Add Step
          </li>
          <li
            v-if="store.forms.programme[1].children.length > 1"
            class="
              cursor-pointer
              border-l
              px-6
              flex
              items-center
              font-bold
              bg-red-600
              text-white
              py-4
            "
            @click="removeStep()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Remove Step
          </li>
        </ul>
      </div>
      <div class="flex p-10">
        <div class="w-full mr-10">
          <div class="mb-4">
            <h3 class="font-bold mb-2 flex items-center justify-between">
              Step Name
              <span
                style="font-size: 0.5rem"
                class="
                  bg-gray-50
                  px-2
                  py-1
                  uppercase
                  rounded
                  ml-2
                  font-light
                  border
                "
              >
                programme_step.name</span
              >
            </h3>
            <input
              v-model="store.forms.programme[1].children[stepIndex].name"
              placeholder="programme_step.name"
            />
          </div>
          <div class="mb-4">
            <h3 class="font-bold mb-2 flex items-center justify-between">
              Step Description
              <span
                style="font-size: 0.5rem"
                class="
                  bg-gray-50
                  px-2
                  py-1
                  uppercase
                  rounded
                  ml-2
                  font-light
                  border
                "
              >
                programme_step.description</span
              >
            </h3>
            <textarea
              v-model="store.forms.programme[1].children[stepIndex].description"
              placeholder="programme_step.description"
              class="p-3"
            />
          </div>
          <div class="mb-4">
            <h3 class="font-bold mb-2 flex items-center justify-between">
              Funding Amount
              <span
                style="font-size: 0.5rem"
                class="
                  bg-gray-50
                  px-2
                  py-1
                  uppercase
                  rounded
                  ml-2
                  font-light
                  border
                "
              >
                programme_step.funding_amount</span
              >
            </h3>
            <input
              v-model="
                store.forms.programme[1].children[stepIndex].funding_amount
              "
              placeholder="programme_step.funding_amount"
            />
          </div>
          <div class="mb-4">
            <h3 class="font-bold mb-2 flex items-center justify-between">
              Worktime
              <span
                style="font-size: 0.5rem"
                class="
                  bg-gray-50
                  px-2
                  py-1
                  uppercase
                  rounded
                  ml-2
                  font-light
                  border
                "
              >
                programme_step.worktime</span
              >
            </h3>
            <input
              v-model="store.forms.programme[1].children[stepIndex].worktime"
              placeholder="programme_step.worktime"
            />
          </div>
          <div class="mb-4">
            <h3 class="font-bold mb-2 flex items-center justify-between">
              Risks
              <span
                style="font-size: 0.5rem"
                class="
                  bg-gray-50
                  px-2
                  py-1
                  uppercase
                  rounded
                  ml-2
                  font-light
                  border
                "
              >
                programme_step.risks</span
              >
            </h3>
            <VueMultiselect
              v-model="store.forms.programme[1].children[stepIndex].risks"
              tag-placeholder="Add risk"
              placeholder="Add risks"
              label="name"
              :options="[]"
              :multiple="true"
              track-by="code"
              :taggable="true"
              @tag="addRisk"
            ></VueMultiselect>
          </div>
          <div class="mb-4">
            <h3 class="font-bold mb-2 flex items-center justify-between">
              Supplies
              <span
                style="font-size: 0.5rem"
                class="
                  bg-gray-50
                  px-2
                  py-1
                  uppercase
                  rounded
                  ml-2
                  font-light
                  border
                "
              >
                programme_step.supplies</span
              >
            </h3>
            <VueMultiselect
              v-model="store.forms.programme[1].children[stepIndex].supplies"
              tag-placeholder="Add supply"
              placeholder="Add supplies"
              label="name"
              :options="[]"
              :multiple="true"
              track-by="code"
              :taggable="true"
              @tag="addSupply"
            ></VueMultiselect>
          </div>
          <div class="mb-4">
            <h3 class="font-bold mb-2 flex items-center justify-between">
              Suppliers
              <span
                style="font-size: 0.5rem"
                class="
                  bg-gray-50
                  px-2
                  py-1
                  uppercase
                  rounded
                  ml-2
                  font-light
                  border
                "
              >
                programme_step.suppliers</span
              >
            </h3>
            <VueMultiselect
              v-model="store.forms.programme[1].children[stepIndex].suppliers"
              tag-placeholder="Add supplier"
              placeholder="Add suppliers"
              label="name"
              :options="store.contacts.filter((x) => x.role == 'supplier')"
              :multiple="true"
              track-by="code"
              :taggable="false"
              @tag="addSupplier"
            >
              <template #noResult>
                <span>Add suppliers in the contacts section.</span>
              </template>
            </VueMultiselect>
          </div>
          <div class="mb-4">
            <h3 class="font-bold mb-2 flex items-center justify-between">
              Support
              <span
                style="font-size: 0.5rem"
                class="
                  bg-gray-50
                  px-2
                  py-1
                  uppercase
                  rounded
                  ml-2
                  font-light
                  border
                "
              >
                programme_step.support</span
              >
            </h3>
            <VueMultiselect
              v-model="store.forms.programme[1].children[stepIndex].support"
              tag-placeholder="Add support contact"
              placeholder="Add support contacts"
              label="name"
              :options="store.contacts.filter((x) => x.role == 'support')"
              :multiple="true"
              track-by="code"
              :taggable="false"
              @tag="addSupport"
            >
              <template #noResult>
                <span>Add support persons in the contacts section.</span>
              </template>
            </VueMultiselect>
          </div>
        </div>
        <div class="w-full">
          <div class="bg-gray-50 p-6 border rounded-lg">
            <h3 class="font-bold mb-2 flex items-center justify-between">
              Step Questions
              <span
                style="font-size: 0.5rem"
                class="
                  bg-white
                  px-2
                  py-1
                  uppercase
                  rounded
                  ml-2
                  font-light
                  border
                "
              >
                public.programme_response</span
              >
            </h3>
            <p class="mr-4 mb-3">
              These are the questions required to be answered and then verified
              in order to complete this step.
            </p>
            <div
              v-for="(q, i) in store.forms.programme[1].children[stepIndex]
                .questions"
              class="mt-3"
            >
              <h3 class="font-bold mb-2">Verification Question {{ i + 1 }}</h3>
              <textarea
                v-model="
                  store.forms.programme[1].children[stepIndex].questions[i].text
                "
                class="p-3"
                placeholder="programme_response.prompt"
              />
            </div>
            <div class="flex">
              <button
                class="
                  bg-blue-600
                  flex
                  items-center
                  text-white
                  px-4
                  font-bold
                  text-xs
                  py-3
                  mt-4
                  rounded-lg
                "
                @click="addQuestion()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clip-rule="evenodd"
                  />
                </svg>

                Add Question
              </button>
              <button
                class="
                  bg-red-600
                  ml-4
                  flex
                  items-center
                  text-white
                  px-4
                  font-bold
                  text-xs
                  py-3
                  mt-4
                  rounded-lg
                "
                @click="removeQuestion()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                Remove Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueMultiselect from "vue-multiselect";
import { reactive, ref } from "vue";
import useStore from "../../store";
const store = useStore();

const stepIndex = ref(0);

function addSupply(tagname) {
  addTag(tagname, "supplies");
}

function addSupplier(tagname) {
  addTag(tagname, "suppliers");
}

function addSupport(tagname) {
  addTag(tagname, "support");
}

function addRisk(tagname) {
  addTag(tagname, "risks");
}

function addTag(tagname, array) {
  const tag = {
    name: tagname,
    code: tagname.substring(0, 2) + Math.floor(Math.random() * 10000000),
  };
  store.forms.programme[1].children[stepIndex.value][array].push(tag);
}
function addQuestion(index) {
  const order =
    (parseInt(
      store.forms.programme[1].children[stepIndex.value].questions.length
    ) +
      1) *
    100;
  const question = {
    order: order,
    text: null,
  };
  store.forms.programme[1].children[stepIndex.value].questions.push(question);
}
function removeQuestion() {
  store.forms.programme[1].children[stepIndex.value].questions.pop();
}

function removeStep() {
  if (stepIndex.value !== 0) {
    stepIndex.value = stepIndex.value - 1;
  }

  store.forms.programme[1].children.pop();
}

function addStep() {
  const nextOrder =
    (parseInt(store.forms.programme[1].children.length) + 1) * 100;
  const step = {
    order: nextOrder,
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
  };
  store.forms.programme[1].children.push(step);
  stepIndex.value = stepIndex.value + 1;
}
</script>

<style>
.form_container {
  @apply w-full;
}
.iconify {
  font-size: 14px;
  line-height: 0.2em !important;
}
input {
  @apply pl-3 py-2;
}
.multiselect {
  color: black !important;
}
.multiselect__tags {
  border-color: rgba(0, 0, 0, 0.4) !important;
}
.form_entry {
  width: 47%;
  margin-right: 1.5%;
  float: left;
  margin-bottom: 1rem;
}

.form_container .form_entry:nth-child(2n) {
  margin-left: 1.5%;
  margin-right: 0;
}
</style>
