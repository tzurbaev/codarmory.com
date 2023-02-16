<template>
  <Disclosure as="nav" class="fixed top-0 inset-x-0 bg-gray-900 z-30" v-slot="{ open }">
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <router-link :to="{ name: 'home' }">
              <img class="block h-8 w-auto lg:hidden" src="/images/logo.png" alt="Your Company" />
              <img class="hidden h-8 w-auto lg:block" src="/images/logo.png" alt="Your Company" />
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link v-for="item in routes"
                           :key="item.name"
                           :to="{ name: item.route }"
                           :class="[item.active ? 'bg-gray-900 text-primary-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md font-medium']"
                           :aria-current="item.active ? 'page' : undefined"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button"
                  class="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  @click="openSearchModal"
          >
            <span class="sr-only">Search anything</span>
            <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden" v-slot=" { close }">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton v-for="item in routes"
                          :key="item.name"
                          as="a"
                          :class="[item.active ? 'bg-gray-900 text-primary-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md font-medium']"
                          :aria-current="item.active ? 'page' : undefined"
        >
          <router-link :to="{ name: item.route }" @click="close()">{{ item.name }}</router-link>
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import {
  Disclosure, DisclosureButton, DisclosurePanel,
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSearchControls } from '@/search/composables/search';

const navigation = [
  { name: 'Weapons', route: 'weapons.index', path: 'weapons.' },
  { name: 'Attachments', route: 'attachments.index', path: 'attachments.' },
  { name: 'Changelog', route: 'changelog', path: 'changelog' },
];

const route = useRoute();
const routes = computed(() => navigation.map((item) => ({
  ...item,
  active: route.name && route.name.toString().startsWith(item.path),
})));

const { open: openSearchModal } = useSearchControls();
</script>
