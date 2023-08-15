<script async setup>
import useAuthUser from "@/composables/UseAuthUser";
const { user } = useAuthUser();

import useSupabase from "@/composables/UseSupabase";
const { supabase } = useSupabase();

import { onMounted, reactive } from "vue";

import Steps from "@/components/Steps.vue";
import Card from "@/components/Card.vue";

const state = reactive({
  data: null,
});

onMounted(async () => {
  let { data: programme, error } = await supabase.from("programme").select("*");

  state.data = await programme;
});
</script>

<template>
  <div class="relative w-full">
    <Steps />

    <Card
      v-for="(item, index) in state.data"
      :title="item.name"
      :text="item"
      :meta="item.created"
      image=""
    />
  </div>
</template>
