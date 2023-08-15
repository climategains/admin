<template>
  <div class="modal_container">
    <div v-on-click-outside="select" class="modal">
      <div class="flex items-center justify-between pb-2 border-b w-full mb-3">
        <h2 class="font-bold text-xl m-0 p-0">
          Database Entr<span v-if="data.length > 1">ies</span
          ><span v-else>y</span>
        </h2>
        <div class="close_modal" @click="select()">Close</div>
      </div>
      <div v-for="item in data" class="mb-6">
        <code>
          <div class="w-full">
            <h3
              class="
                uppercase
                text-white
                rounded
                px-3
                mb-4
                py-2
                text-xs
                w-auto
                inline-block
              "
              :class="[item.color ? item.color : 'bg-blue-600']"
            >
              {{ item.id }}
            </h3>
          </div>
          {{ item.entry }}</code
        >
        <div
          v-if="item.id == 'public.response' && item.entry && item.entry.url"
          class="border-2 w-auto mt-3 bg-gray-50 rounded-lg overflow-hidden"
        >
          <h4
            class="
              bg-gray-100
              py-3
              px-4
              text-xs
              leading-tight
              font-light
              border-b
              font-mono
              w-full
              flex
              justify-between
            "
          >
            <span class="font-bold">Video Upload</span>

            {{ item.entry.url }}
          </h4>
          <div class="w-full flex items-center justify-center">
            <video
              class="h-80 w-auto"
              controls
              :src="
                'https://uvjqnxkfzenbljxcutbx.supabase.co/storage/v1/object/public/responses/' +
                item.entry.url
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vOnClickOutside } from "@vueuse/components";

const props = defineProps({
  data: Array,
});

const emit = defineEmits(["select"]);

function select(params) {
  emit("close", params);
}
</script>
<style scoped>
.modal_container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999999999;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  justify-content: center;
}

code {
  @apply rounded border inline-block bg-gray-100 text-xs p-6;
}

.modal {
  width: 40vw;
  height: 80vh;
  z-index: 999999999;
  @apply rounded p-12 relative bg-white overflow-scroll;
  max-width: 800px;
  min-width: 500px;
}

.close_modal {
  @apply bg-black  inline-block px-3 py-2 text-xs rounded-lg text-white font-bold;
}
</style>
