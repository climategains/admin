<template>
  <div
    class="
      flex flex-col
      bg-white
      border
      shadow-sm
      rounded-xl
      dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]
    "
  >
    <img
      class="w-full h-auto rounded-t-xl"
      :src="image"
      alt="Image Description"
    />
    <div class="p-4 md:p-5">
      <h3 class="text-lg font-bold text-gray-800 dark:text-white">
        {{ props.title }}
      </h3>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        {{ props.text }}
      </p>
      <p class="mt-5 text-xs text-gray-500 dark:text-gray-500">
        {{ props.meta }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["title", "text", "image", "meta"]);
</script>
