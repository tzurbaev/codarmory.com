<template>
  <div class="text-center py-10 sm:py-40">
    <h1 class="text-7xl font-extrabold text-primary-500">Page Not Found</h1>
    <p class="text-center mt-8">
      <router-link :to="{ name: 'home' }" class="text-primary-600 hover:text-primary-500 hover:underline">
        Back to Home Page
      </router-link>
    </p>
  </div>
</template>
