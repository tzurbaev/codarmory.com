<template>
  <div class="pb-8 sm:pb-12 lg:pb-12">
    <div class="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
      <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div class="sm:max-w-xl">
          <div class="flex mb-6">
            <div class="bg-primary-500 relative rounded-full py-1 px-3 text-sm leading-6 text-primary-100">
              Season 05
            </div>
          </div>
          <h1 class="text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl">
            COD Armory
          </h1>
          <p class="mt-6 text-xl text-white/90 leading-relaxed">
            Browse all weapons and attachments for
            <span class="text-white font-extrabold">Call of Duty: Modern Warfare II</span>
            and <span class="text-white font-extrabold">Call of Duty: Warzone 2.0</span>.
          </p>
          <div class="flex items-center mt-8 gap-8">
            <router-link :to="{ name: 'weapons.index' }" class="text-white text-lg hover:text-primary-500">
              <span class="hidden sm:inline">&gt;</span> Browse Weapons
            </router-link>
            <router-link :to="{ name: 'attachments.index' }" class="text-white text-lg hover:text-primary-500">
              <span class="hidden sm:inline">&gt;</span> Browse Attachments
            </router-link>
          </div>
          <p class="mt-8 text-white/60 text-sm">
            This is a fan-made website. We're not affiliated with Activision or Infinity Ward in any way.
          </p>
        </div>
      </div>

      <div class="sm:mx-auto sm:max-w-3xl sm:px-6">
        <div class="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div class="hidden sm:block">
            <div class="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-primary-500/40 lg:left-80 lg:right-0 lg:w-full" />
            <svg class="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0" width="404" height="392" fill="none" viewBox="0 0 404 392">
              <defs>
                <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
            </svg>
          </div>
          <div class="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
            <img class="border border-gray-300/30 w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                 src="/images/hero-screenshot.png"
                 alt="Weapons UI Screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: '' });
</script>
