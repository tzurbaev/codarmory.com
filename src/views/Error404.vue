<template>
  <div class="text-center py-10 sm:py-40">
    <div>
      <h1 class="text-7xl font-extrabold text-primary-500 dark:text-primary-300">Page Not Found</h1>
      <p class="text-center mt-8">
        <router-link :to="{ name: 'home' }" class="text-primary-600 hover:text-primary-500 dark:text-primary-200 dark:hover:text-primary-100 hover:underline">
          Back to Home Page
        </router-link>
      </p>
    </div>
  </div>
</template>
