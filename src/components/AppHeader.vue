<script setup>
import useAuthUser from "@/composables/UseAuthUser";
const { isLoggedIn } = useAuthUser();
</script>
<template>
  <div
    class="flex items-center pl-3 bg-white text-black border-b justify-between"
  >
    <ul class="flex hidden gap-5 p-5">
      <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'Admin' }">Admin</router-link></li>
    </ul>
    <img src="@/assets/logo_white.png" class="h-8" />
    <ul
      v-if="isLoggedIn()"
      class="flex gap-5 bg-gray-100 border-gray-300 border-l p-5"
    >
      <li>
        <router-link class="flex items-center" :to="{ name: 'Logout' }"
          >Logout
          <span
            class="iconify ml-2 w-5 h-5"
            data-icon="heroicons-outline:logout"
          ></span>
        </router-link>
      </li>
    </ul>
    <ul v-else class="flex gap-5 bg-gray-700 p-5">
      <li><router-link :to="{ name: 'Login' }">Login</router-link></li>
      <li><router-link :to="{ name: 'Register' }">Register</router-link></li>
    </ul>
  </div>
</template>
