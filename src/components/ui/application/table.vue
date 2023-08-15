<template>
  <div class="w-full px-10">
    <div
      class="
        overflow-hidden
        shadow
        ring-1 ring-black ring-opacity-5
        md:rounded-lg
      "
    >
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="
                py-3.5
                pl-4
                pr-3
                text-left text-sm
                font-semibold
                text-gray-900
                sm:pl-6
              "
            >
              Application Step
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Description
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Status
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(item, index) in data"
            :key="index"
            class="cursor-pointer hover:bg-gray-50"
            @click="goTo(index)"
          >
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
              <div class="flex items-center">
                <div
                  class="
                    flex
                    items-center
                    justify-center
                    rounded-full
                    flex-shrink-0
                    text-white
                    bg-purple-600
                    w-8
                    h-8
                    font-regular
                  "
                >
                  {{ index + 1 }}
                </div>
                <div class="ml-4">
                  <div class="font-medium text-gray-900">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ item.description }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span v-if="index !== 1">
                <span
                  v-if="checkValidStep(data[index].questions)"
                  class="
                    inline-flex
                    rounded-full
                    bg-green-100
                    px-2
                    text-xs
                    font-semibold
                    leading-5
                    text-green-800
                  "
                >
                  Completed
                </span>
                <span
                  v-else
                  class="
                    inline-flex
                    rounded-full
                    bg-red-100
                    px-2
                    text-xs
                    font-semibold
                    leading-5
                    text-red-800
                  "
                >
                  Incomplete
                </span>
              </span>
              <span v-if="index == 1">
                <span
                  v-if="allStepsCompleted(data[index])"
                  class="
                    inline-flex
                    rounded-full
                    bg-green-100
                    px-2
                    text-xs
                    font-semibold
                    leading-5
                    text-green-800
                  "
                >
                  Completed
                </span>
                <span
                  v-else
                  class="
                    inline-flex
                    rounded-full
                    bg-red-100
                    px-2
                    text-xs
                    font-semibold
                    leading-5
                    text-red-800
                  "
                >
                  Incomplete
                </span>
              </span>
              <span v-if="index == 3">
                <span
                  class="
                    inline-flex
                    rounded-full
                    bg-red-100
                    px-2
                    text-xs
                    font-semibold
                    leading-5
                    text-red-800
                  "
                >
                  Incomplete
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps(["data"]);

const emit = defineEmits(["select"]);
const router = useRouter();
function goTo(id) {
  router.push("/admin/programmes/new/" + id);
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
</script>

<style>
.iconify {
  font-size: 14px;
  line-height: 0.2em !important;
}
</style>
