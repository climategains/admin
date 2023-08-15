<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Nav from "@/components/ui/nav.vue";
</script>

<template>
  <div>
    <Sidebar />
    <div class="pl-80 bg-gray-50 h-screen">
      <div class="p-12">
        <div class="mx-auto border bg-white rounded-lg overflow-hidden pb-10">
          <Nav current="New Organization" @select="goBack" />
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
