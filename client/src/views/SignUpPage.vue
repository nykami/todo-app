<template>
  <div class="flex flex-col items-center justify-center font-custom">
    <TodoLogin button-name="Log in" path="/login" />
    <div
      class="relative mt-2 flex w-72 flex-col items-center justify-center bg-white sm:mt-10 sm:w-screen sm:flex-row"
    >
      <div
        class="w-64 rounded-xl border-2 bg-neutral-200 bg-opacity-60 p-7 shadow-lg sm:mb-10 sm:mr-60 sm:w-max sm:p-14"
      >
        <form name="login-form" class="sm:w-[16rem]">
          <div class="mb-3 flex flex-col justify-between">
            <label for="first-name" class="text-xs font-semibold sm:text-sm"
              >First name</label
            >
            <input
              type="text"
              id="first-name"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
              placeholder="Ana"
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="last-name" class="text-xs font-semibold sm:text-sm"
              >Last name</label
            >
            <input
              type="text"
              id="last-name"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
              placeholder="Banana"
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="username" class="text-xs font-semibold sm:text-sm"
              >Username</label
            >
            <input
              type="text"
              id="email"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
              placeholder="anabanana"
            />
          </div>
          <div class="mb-3 flex flex-col justify-between">
            <label for="email" class="text-xs font-semibold sm:text-sm"
              >Email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
              placeholder="name@company.com"
            />
          </div>
          <div class="mb-4 flex flex-col justify-between sm:mb-8">
            <label for="password" class="text-xs font-semibold sm:text-sm"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:p-2.5 sm:text-sm"
            />
          </div>
          <div class="flex flex-col">
            <router-link to="/login">
              <button
                class="sm:text-md w-full rounded-lg bg-teal-400 px-6 py-1.5 text-sm font-semibold text-white sm:py-2"
                type="submit"
              >
                Sign up
              </button>
            </router-link>
          </div>
        </form>
      </div>
      <PlaceholderIcon class="w-48 sm:absolute sm:ml-[20rem] sm:mt-0 sm:w-64" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceholderIcon from '../components/icons/PlaceholderIcon.vue';
import TodoLogin from '../components/header/TodoLogin.vue';
</script>
