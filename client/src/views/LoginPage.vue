<template>
  <div class="flex flex-col items-center justify-center">
    <TodoLogin button-name="Sign up" path="/signup" />
    <div
      class="relative mt-2 flex w-72 flex-col items-center justify-center bg-white sm:mt-10 sm:w-screen sm:flex-row"
    >
      <div
        class="w-64 rounded-xl border-2 bg-neutral-200 bg-opacity-60 p-7 shadow-lg sm:mb-10 sm:mr-60 sm:w-max sm:p-14"
      >
        <form name="login-form" class="sm:w-64">
          <div class="mb-3 flex flex-col justify-between">
            <label for="username" class="text-xs font-semibold sm:text-sm"
              >Username</label
            >
            <input
              type="text"
              id="username"
              placeholder="username"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
            />
          </div>
          <div class="mb-4 flex flex-col justify-between sm:mb-8">
            <label for="password" class="text-xs font-semibold sm:text-sm"
              >Password</label
            >
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
            />
          </div>
          <div class="flex flex-col">
            <router-link to="/dashboard">
              <button
                class="sm:text-md w-full rounded-lg bg-teal-400 px-6 py-1.5 text-sm font-semibold text-white sm:py-2"
                type="submit"
              >
                Log in
              </button>
            </router-link>
            <hr class="my-4 border-gray-400" />
            <div class="flex justify-between">
              <p class="text-xs sm:text-sm">Don't have an account yet?</p>
              <router-link
                to="/signup"
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
import TodoLogin from '../components/header/TodoLogin.vue';
</script>
