<template>
  <div class="mt-8 flex flex-col">
    <div v-for="item in forms.questions">
      {{ item }}
    </div>

    <VueMultiselect
      v-model="state.selected"
      :searchable="false"
      :options="state.options"
    >
    </VueMultiselect>
  </div>
</template>

<script setup>
import VueMultiselect from "vue-multiselect";
import { defineProps } from "vue";
import { reactive } from "vue";
import { SunIcon } from "@heroicons/vue/24/outline";

const props = defineProps(["form"]);

const state = reactive({
  selected: null,
  options: [
    { name: "Vue.js", language: "JavaScript", icon: SunIcon },
    { name: "Rails", language: "Ruby" },
    { name: "Sinatra", language: "Ruby" },
    { name: "Laravel", language: "PHP", $isDisabled: true },
    { name: "Phoenix", language: "Elixir" },
  ],
});
</script>

<style>
.iconify {
  font-size: 14px;
  line-height: 0.2em !important;
}
</style>
