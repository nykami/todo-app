<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-[640px]">
      <TodoLogin button-name="Log in" path="/login" />
    </div>
    <div
      class="relative mt-20 flex w-screen items-center justify-center bg-white"
    >
      <div
        class="mb-10 mr-60 rounded-xl border-2 bg-neutral-200 bg-opacity-60 p-14 shadow-lg"
      >
        <form name="login-form" class="w-[16rem]">
          <div class="mb-3 flex flex-col justify-between">
            <label for="first-name" class="text-sm font-semibold"
              >First name</label
            >
            <input
              type="text"
              id="first-name"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              placeholder="Ana"
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="last-name" class="text-sm font-semibold"
              >Last name</label
            >
            <input
              type="text"
              id="last-name"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              placeholder="Banana"
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="username" class="text-sm font-semibold">Username</label>
            <input
              type="text"
              id="email"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              placeholder="anabanana"
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="email" class="text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              placeholder="name@company.com"
            />
          </div>
          <div class="mb-8 flex flex-col justify-between">
            <label for="password" class="text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div class="flex justify-end">
            <router-link to="/login">
              <button
                class="rounded-lg bg-teal-400 px-6 py-2 font-semibold text-white"
                type="submit"
              >
                Sign up
              </button>
            </router-link>
          </div>
        </form>
      </div>
      <PlaceholderIcon class="absolute ml-[20rem]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderIcon from '../components/icons/PlaceholderIcon.vue';
import TodoLogin from '../components/header/TodoLogin.vue';
</script>
