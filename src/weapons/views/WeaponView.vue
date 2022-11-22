<template>
  <div v-if="weapon" class="p-8 rounded-lg shadow-lg hover:shadow-xl bg-gray-900">
    <p v-if="weapon.category" class="font-medium">
      <router-link :to="{ name: 'weapons.index', params: { categoryId: weapon.category.id } }"
                   class="text-purple-600 hover:text-purple-500 hover:underline"
      >
        {{ weapon.category.name }}
      </router-link>
    </p>
    <h1 class="text-5xl font-extrabold text-white">{{ weapon.name }}</h1>
    <p v-if="weapon.attachments.length > 0" class="text-gray-400">
      {{ weapon.attachments.length }} Attachments
    </p>

    <WeaponUnlockDescription :weapon="weapon" class="mt-4 text-purple-500/80" />

    <div v-if="groups.length > 0" class="mt-8">
      <div>
        <div class="lg:hidden mt-4">
          <label for="attachment-category-selector" class="sr-only">Select a category</label>
          <select id="attachment-category-selector"
                  name="tabs"
                  class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  v-model="category"
          >
            <option v-for="group in groups"
                    :key="group.category.id"
                    :value="group.category.id"
            >
              {{ group.category.name }}
            </option>
          </select>
        </div>
        <div class="hidden lg:block">
          <div class="border-b border-gray-400">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
              <a v-for="group in groups"
                 :key="group.category.id"
                 href="javascript:;"
                 :class="[category === group.category.id ? 'border-purple-500 text-purple-600' : 'border-transparent text-white hover:text-purple-600 hover:border-purple-500', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']"
                 :aria-current="category === group.category.id ? 'page' : undefined"
                 @click="setCategory(group.category.id)"
              >
                {{ group.category.name }}
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div v-if="group" class="mt-4">
        <h3 class="font-extrabold text-3xl text-white">{{ group.category.name }}</h3>
        <p class="text-gray-400 text-sm">
          <template v-if="group.attachments.length !== attachments.length">
            Displaying {{ attachments.length }} attachments
            out of {{ group.attachments.length }}
          </template>
          <template v-else>{{ attachments.length }} attachments</template>
        </p>

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="col-span-1 sticky top-0">
            <div class="sticky top-[10%] space-y-4">
              <div>
                <TextInputGroup v-model="filters.search">
                  <TextInput type="search" placeholder="Filter attachments" />
                </TextInputGroup>
              </div>
              <div class="flex items-center gap-4">
                <div>
                  <ResourceCombobox label="Pros" :items="pros" :multiple="true" v-model="filters.pros" />
                </div>
                <div>
                  And / Or
                </div>
              </div>
              <div>
                <ResourceCombobox label="Cons" :items="cons" :multiple="true" v-model="filters.cons" />
              </div>
              <div>
                <button v-if="hasFilters" type="button" @click="reset()" class="text-white text-sm">Reset Filters</button>
              </div>
            </div>
          </div>
          <div class="col-span-1 sm:col-span-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div v-for="attachment in attachments"
                   :key="`attachment-${attachment.id}`"
                   class="border border-gray-700 rounded-md p-3"
              >
                <h4 class="font-bold text-lg text-white">{{ attachment.name }}</h4>
                <div class="space-y-2">
                  <p v-if="attachment.description" class="text-sm text-gray-400">{{ attachment.description }}</p>
                  <AttachmentUnlockDescription :attachment="attachment" class="text-purple-500/60 text-sm" />
                </div>
                <div v-if="attachment.stats && attachment.stats.pros.length > 0 || attachment.stats.cons.length > 0" class="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <p class="font-bold text-sm text-green-500">Pros</p>
                    <ul class="list-inside">
                      <li v-for="stat in attachment.stats.pros"
                          :key="`attachment-${attachment.id}-pros-${stat.id}`"
                          class="text-green-500 text-xs"
                      >
                        + {{ stat.name }}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-red-500">Cons</p>
                    <ul class="list-inside">
                      <li v-for="stat in attachment.stats.cons"
                          :key="`attachment-${attachment.id}-cons-${stat.id}`"
                          class="text-red-500 text-xs"
                      >
                        - {{ stat.name }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeapon } from '@/weapons/composables/weapons';
import WeaponUnlockDescription from '@/unlocks/components/WeaponUnlockDescription.vue';
import AttachmentUnlockDescription from '@/unlocks/components/AttachmentUnlockDescription.vue';
import { TextInputGroup, TextInput } from '@zenky/forms-vue';
import { useCategoryAttachments, useFilteredAttachments } from '@/attachments/composables/attachments';
import ResourceCombobox from '@/forms/components/ResourceCombobox.vue';

const props = defineProps<{
  weaponId: string;
}>();

const id = computed(() => props.weaponId);
const { weapon, groups } = useWeapon(id);
const {
  category, group, setCategory, watchForCategory,
} = useCategoryAttachments(groups);
const {
  filters, reset, hasFilters, pros, cons, attachments,
} = useFilteredAttachments(group);
watchForCategory((): void => reset());
</script>
