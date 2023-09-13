<template>
  <div class="flex flex-col items-center justify-center font-custom">
    <TodoLogin button-name="Sign up" path="/register" />
    <div
      class="relative mt-2 flex w-72 flex-col items-center justify-center bg-white sm:mt-10 sm:w-screen sm:flex-row"
    >
      <div
        class="w-64 rounded-xl border-2 bg-neutral-200 bg-opacity-60 p-7 shadow-lg sm:mb-10 sm:mr-60 sm:w-max sm:p-14"
      >
        <form name="login-form" class="sm:w-64" @submit.prevent="handleSubmit">
          <div class="mb-3 flex flex-col justify-between">
            <label for="email" class="text-xs font-semibold sm:text-sm"
              >Email</label
            >
            <InputField
              inputType="text"
              inputPlaceholder="ana@gmail.com"
              v-model="email"
              autocomplete="email"
            />
          </div>
          <div class="mb-4 flex flex-col justify-between sm:mb-8">
            <label for="password" class="text-xs font-semibold sm:text-sm"
              >Password</label
            >
            <InputField
              inputType="password"
              inputPlaceholder="••••••••"
              v-model="password"
              autocomplete="current-password"
            />
          </div>
          <div class="flex flex-col">
            <AuthButton buttonText="Log in" />
            <hr class="my-4 border-gray-400" />
            <div class="flex justify-between">
              <p class="text-xs sm:text-sm">Don't have an account yet?</p>
              <router-link
                to="/register"
                class="text-xs text-blue-700 underline hover:text-blue-900 sm:text-sm"
              >
                Sign up
              </router-link>
            </div>
          </div>
        </form>
      </div>
      <PlaceholderIcon class="w-48 sm:absolute sm:ml-80 sm:mt-0 sm:w-64" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderIcon from '../components/icons/PlaceholderIcon.vue';
import { useRouter } from 'vue-router';
import TodoLogin from '../components/header/TodoLogin.vue';
import InputField from '../components/base-components/InputField.vue';
import AuthButton from '../components/base-components/AuthButton.vue';
import UserService from '../service/UserService';
import { ref } from 'vue';
const router = useRouter();
const userService = new UserService();

const email = ref<string>('');
const password = ref<string>('');

async function handleSubmit() {
  try {
    const user = await userService.login(email.value, password.value);
    
    if (user) {
      router.push(`/dashboard/${user.user._id}`);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
