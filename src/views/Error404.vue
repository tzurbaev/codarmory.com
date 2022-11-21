<template>
  <div class="h-full flex items-center justify-center">
    <div>
      <h1 class="text-7xl font-extrabold text-teal-500 dark:text-teal-300">Page Not Found</h1>
      <p class="text-center mt-8">
        <router-link :to="{ name: 'home' }" class="text-teal-600 hover:text-teal-500 dark:text-teal-200 dark:hover:text-teal-100 hover:underline">
          Back to Home Page
        </router-link>
      </p>
    </div>
  </div>
</template>
