<script setup>
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

// keep up with form data
const form = ref({
  email: "",
  password: "",
});

// call the proper login method from the AuthUser composable
// on the submit of the form
const handleLogin = async (provider) => {
  try {
    provider
      ? await loginWithSocialProvider(provider)
      : await login(form.value);
    router.push({ name: "dashboard" });
  } catch (error) {
    alert(error.message);
  }
};
</script>
<template>
  <div class="w-full h-screen bg-blue-50 flex items-center justify-center">
    <div class="w-1/3 bg-white rounded-lg p-10 m-auto">
      <img src="@/assets/logo_white.png" class="h-8 mb-6" />

      <form @submit.prevent="handleLogin()">
        <label class="font-bold mb-3"
          >Email <input v-model="form.email" class="mt-2" type="email"
        /></label>
        <label class="font-bold"
          >Password <input v-model="form.password" class="mt-2" type="password"
        /></label>
        <button
          class="bg-black p-2 text-base font-bold rounded-lg px-10 text-white"
        >
          Login
        </button>
        <!-- <router-link to="/forgotPassword">Forgot Password?</router-link> -->
      </form>
    </div>
  </div>
</template>
