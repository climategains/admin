<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">{{ options.title }}</h1>
        <p class="mt-2 text-sm text-gray-700">
          {{ options.text }}
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          v-if="options.button && options.button.href"
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            rounded-md
            border border-transparent
            bg-indigo-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            shadow-sm
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
            sm:w-auto
          "
          @click="goTo(options.button.href)"
        >
          {{ options.button.text }}
        </button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="shadow-sm ring-1 ring-black ring-opacity-5">
            <table class="min-w-full border-separate" style="border-spacing: 0">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    v-for="(item, index) in filters"
                    scope="col"
                    class="
                      sticky
                      top-0
                      z-10
                      hidden
                      border-b border-gray-300
                      bg-gray-50 bg-opacity-75
                      px-3
                      py-3.5
                      text-left text-sm
                      font-semibold
                      text-gray-900
                      capitalize
                      backdrop-blur backdrop-filter
                      sm:table-cell
                    "
                    :class="[index == 0 ? 'pl-4 sm:pl-6 lg:pl-8' : '']"
                  >
                    {{ item.title }}
                  </th>

                  <th
                    scope="col"
                    class="
                      sticky
                      top-0
                      z-10
                      border-b border-gray-300
                      bg-gray-50 bg-opacity-75
                      py-3.5
                      pr-4
                      pl-3
                      backdrop-blur backdrop-filter
                      sm:pr-6
                      lg:pr-8
                    "
                  >
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  v-for="(item, index) in data"
                  :key="index"
                  class="hover:bg-blue-50 cursor-pointer"
                  @click="select(index)"
                >
                  <td
                    v-for="(filter, x) in filters"
                    :class="[
                      x == 0
                        ? ' font-medium sm:pl-6 lg:pl-8 py-4 pl-4 pr-3 '
                        : 'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                      index == data.length - 1
                        ? 'border-none'
                        : 'border-b border-gray-200',
                      'whitespace-nowrap  text-sm  text-gray-900 ',
                    ]"
                  >
                    {{ item[filter.id] }}
                  </td>

                  <td
                    :class="[
                      index !== data.length - 1
                        ? 'border-b border-gray-200'
                        : '',
                      'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                    ]"
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >View
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const emit = defineEmits(["select"]);

const props = defineProps({
  filters: Array,
  data: Array,
  options: Object,
});

function select(params) {
  emit("select", params);
}

const router = useRouter();
function goTo(id) {
  router.push({ name: id });
}
</script>
