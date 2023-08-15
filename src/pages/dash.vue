<script setup>
import useAuthUser from "@/composables/UseAuthUser";
const { user } = useAuthUser();

import useStore from "../store";
const store = useStore();

import { useRouter } from "vue-router";
const router = useRouter();

store.breadcrumbs = [{ name: "Home", href: "dashboard" }];

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

function goTo(id) {
  router.push({ name: id });
}
</script>

<template>
  <div v-if="user">
    <div class="p-12">
      <h3 class="font-bold border-b pb-3 mb-3 text-xl">
        Hello {{ user.email }}
      </h3>
      <p class="italic">
        Last authenticated at {{ getTime(user.last_sign_in_at) }}
      </p>
      <div class="flex">
        <div
          class="
            p-3
            cursor-pointer
            px-12
            rounded-lg
            text-base
            font-bold
            border
            bg-blue-50
            inline-flex
            flex-col
            items-start
            justify-center
            inline-block
            mt-6
            h-60
          "
          @click="goTo('new_programme')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-20 h-20 mb-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>

          Create a programme
        </div>
        <div
          class="
            p-3
            cursor-pointer
            px-12
            rounded-lg
            text-base
            font-bold
            border
            bg-blue-50
            inline-flex
            flex-col
            items-start
            justify-center
            inline-block
            mt-6
            ml-8
            h-60
          "
          @click="goTo('new_organization')"
        >
          <svg
            class="w-20 h-20 mb-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            />
          </svg>

          Create an organization
        </div>
      </div>
    </div>
  </div>
</template>
