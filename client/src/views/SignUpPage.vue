<template>
  <div class="flex flex-col items-center justify-center font-custom">
    <TodoLogin button-name="Log in" path="/login" />
    <div
      class="relative mt-2 flex w-72 flex-col items-center justify-center bg-white sm:mt-10 sm:w-screen sm:flex-row"
    >
      <div
        class="w-64 rounded-xl border-2 bg-neutral-200 bg-opacity-60 p-7 shadow-lg sm:mb-10 sm:mr-60 sm:w-max sm:p-14"
      >
        <form name="login-form" class="sm:w-64">
          <div class="mb-3 flex flex-col justify-between">
            <label for="first-name" class="text-xs font-semibold sm:text-sm"
              >First name</label
            >
            <InputField
              inputType="text"
              id="first-name"
              inputPlaceholder="Ana"
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="last-name" class="text-xs font-semibold sm:text-sm"
              >Last name</label
            >
            <InputField
              inputType="text"
              id="last-name"
              inputPlaceholder="Banana"
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="username" class="text-xs font-semibold sm:text-sm"
              >Username</label
            >
            <InputField
              inputType="text"
              id="email"
              inputPlaceholder="anabanana"
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="email" class="text-xs font-semibold sm:text-sm"
              >Email</label
            >
            <InputField
              inputType="email"
              id="email"
              inputPlaceholder="name@company.com"
            />
          </div>
          <div class="mb-4 flex flex-col justify-between sm:mb-8">
            <label for="password" class="text-xs font-semibold sm:text-sm"
              >Password</label
            >
            <InputField
              inputType="password"
              id="password"
              inputPlaceholder="••••••••"
            />
          </div>
          <div class="flex flex-col">
            <router-link to="/login">
              <AuthButton buttonText="Sign up" />
            </router-link>
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
</script>
