<template>
  <div class="sm:flex sm:gap-4 w-full">
    <div class="sm:w-[220px] sm:overflow-y-scroll sm:fixed sm:bottom-0 sm:top-[64px] sm:py-8 mb-8 sm:mb-0">
      <slot name="sidebar" />
    </div>

    <div class="w-full sm:pl-[236px]">
      <slot />
    </div>
  </div>
</template>
