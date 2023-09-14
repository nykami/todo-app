<template>
  <div class="flex flex-col items-center justify-center font-custom">
    <TodoLogin button-name="Log in" path="/login" />
    <div
      class="relative mt-2 flex w-72 flex-col items-center justify-center bg-white sm:mt-10 sm:w-screen sm:flex-row"
    >
      <div
        class="w-64 rounded-xl border-2 bg-neutral-200 bg-opacity-60 p-7 shadow-lg sm:mb-10 sm:mr-60 sm:w-max sm:p-14"
      >
        <form name="signup-form" class="sm:w-64" @submit.prevent="handleSubmit">
          <div class="mb-3 flex flex-col justify-between">
            <label for="first-name" class="text-xs font-semibold sm:text-sm"
              >First name</label
            >
            <InputField
              inputType="text"
              inputPlaceholder="Ana"
              v-model="formData.firstName"
              autocomplete="firstName"
              required
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="last-name" class="text-xs font-semibold sm:text-sm"
              >Last name</label
            >
            <InputField
              inputType="text"
              inputPlaceholder="Banana"
              v-model="formData.lastName"
              autocomplete="lastName"
              required
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="username" class="text-xs font-semibold sm:text-sm"
              >Username</label
            >
            <InputField
              inputType="text"
              inputPlaceholder="anabanana"
              v-model="formData.username"
              autocomplete="username"
              required
              @blur="handleBlur('username')"
            />
            <span
              v-if="errorMessages.username"
              class="text-xs text-red-700 sm:text-sm"
            >
              {{ errorMessages.username }}
            </span>
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="email" class="text-xs font-semibold sm:text-sm"
              >Email</label
            >
            <InputField
              inputType="email"
              inputPlaceholder="ana@gmail.com"
              v-model="formData.email"
              autocomplete="email"
              required
              @blur="handleBlur('email')"
            />
            <span
              v-if="errorMessages.email"
              class="text-xs text-red-700 sm:text-sm"
            >
              {{ errorMessages.email }}
            </span>
          </div>
          <div class="mb-4 flex flex-col justify-between sm:mb-8">
            <label for="password" class="text-xs font-semibold sm:text-sm"
              >Password</label
            >
            <InputField
              inputType="password"
              inputPlaceholder="••••••••"
              v-model="formData.password"
              autocomplete="password"
              required
              @blur="handleBlur('password')"
            />
            <span
              v-if="errorMessages.password"
              class="text-xs text-red-700 sm:text-sm"
            >
              {{ errorMessages.password }}
            </span>
          </div>
          <div class="flex flex-col">
            <AuthButton buttonText="Sign up" />
          </div>
        </form>
      </div>
      <PlaceholderIcon class="w-48 sm:absolute sm:ml-80 sm:mt-0 sm:w-64" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderIcon from '../components/icons/PlaceholderIcon.vue';
import TodoLogin from '../components/header/TodoLogin.vue';
import InputField from '../components/base-components/InputField.vue';
import AuthButton from '../components/base-components/AuthButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '../service/UserService';

const router = useRouter();
const userService = new UserService();

const formData = ref({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
});

const validation = {
  email: validateEmail,
  username: validateUsername,
  password: validatePassword,
};

const errorMessages = ref({
  email: '',
  password: '',
  username: '',
});

async function handleSubmit() {
  try {
    if (
      errorMessages.value.email ||
      errorMessages.value.username ||
      errorMessages.value.password
    ) {
      return;
    }
    const user = await userService.signup(formData.value);

    if (user) {
      router.push(`/login`);
    }
  } catch (error) {
    console.log(error);
  }
}

function handleBlur(fieldName: string) {
  validation[fieldName as keyof typeof validation]();
}

function validateUsername() {
  if (formData.value.username.includes(' ')) {
    errorMessages.value.username = 'Username cannot contain spaces';
  } else {
    errorMessages.value.username = '';
  }
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    errorMessages.value.email = 'Invalid email address';
  } else {
    errorMessages.value.email = '';
  }
}

function validatePassword() {
  if (formData.value.password.length < 8) {
    errorMessages.value.password = 'Password must be at least 8 characters';
  } else {
    errorMessages.value.password = '';
  }
}
</script>
