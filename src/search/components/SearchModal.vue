<template>
  <TransitionRoot :show="isOpen" as="template" @after-leave="reset" appear>
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-x-0 bottom-0 top-[25%] sm:top-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <DialogPanel class="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-20 overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-all">
            <Combobox @update:modelValue="onSelect">
              <div class="relative">
                <MagnifyingGlassIcon class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-500" aria-hidden="true" />
                <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
                               placeholder="Search anything..."
                               @change="query = $event.target.value"
                />
              </div>

              <template v-if="query">
                <ComboboxOptions v-if="results.length > 0" static class="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-20 overflow-y-auto">
                  <li v-for="group in results" :key="`Search-Group-${group.name}`" class="p-2">
                    <h2 class="mt-4 mb-2 px-3 text-sm text-gray-200">{{ group.name }}</h2>
                    <ul class="text-gray-400">
                      <ComboboxOption v-for="item in group.results"
                                      :key="`Search-Group-${group.name}-Result-${item.id}`"
                                      :value="item"
                                      as="template"
                                      v-slot="{ active }"
                      >
                        <li :class="['flex cursor-pointer select-none items-center rounded-md px-3 py-2', active && 'bg-gray-800 text-white']">
                          <span class="flex-auto truncate">
                            <GameIcon v-if="item.game_id" :game="item.game_id" compact class="mb-2" />
                            <span>{{ item.name }}</span>
                            <template v-if="item.description">
                              <br>
                              <span class="text-primary-500 text-sm">{{ item.description }}</span>
                            </template>
                          </span>
                          <span v-if="active" class="ml-3 flex-none text-gray-400">Jump to...</span>
                        </li>
                      </ComboboxOption>
                    </ul>
                  </li>
                </ComboboxOptions>
              </template>

              <div v-if="query !== '' && results.length === 0" class="py-14 px-6 text-center sm:px-14">
                <FolderIcon class="mx-auto h-6 w-6 text-gray-500" aria-hidden="true" />
                <p class="mt-4 text-sm text-gray-200">We couldn't find anything with that term. Please try again.</p>
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { FolderIcon } from '@heroicons/vue/24/outline';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { useSearch, useSearchControls } from '@/search/composables/search';
import { useRouter } from 'vue-router';
import { SearchResult } from '@/search/types';
import GameIcon from '@/games/components/GameIcon.vue';

const router = useRouter();

const { isOpen, close, toggle } = useSearchControls();
const { query, results, reset } = useSearch();

function onSelect(item: SearchResult) {
  close();
  reset();
  router.push(item.route);
}

const onKeydown = (event: any) => {
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
    toggle();
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>
