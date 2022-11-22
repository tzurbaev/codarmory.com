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

    <div v-if="attachments.length > 0" class="mt-8">
      <div>
        <div class="lg:hidden mt-4">
          <label for="attachment-category-selector" class="sr-only">Select a category</label>
          <select id="attachment-category-selector"
                  name="tabs"
                  class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  v-model="currentAttachmentsCategory"
          >
            <option v-for="group in attachments"
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
              <a v-for="group in attachments"
                 :key="group.category.id"
                 href="javascript:;"
                 :class="[currentAttachmentsCategory === group.category.id ? 'border-purple-500 text-purple-600' : 'border-transparent text-white hover:text-purple-600 hover:border-purple-500', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']"
                 :aria-current="currentAttachmentsCategory === group.category.id ? 'page' : undefined"
                 @click="selectAttachmentsCategory(group.category.id)"
              >
                {{ group.category.name }}
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div v-if="currentGroup" class="mt-4 space-y-4">
        <div>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-extrabold text-3xl text-white">{{ currentGroup.category.name }}</h3>
              <p class="text-gray-400">{{ currentGroup.attachments.length }} Attachments Available</p>
            </div>
            <div class="w-56">
              <TextInputGroup v-model="attachmentsSearch">
                <TextInput type="search" placeholder="Filter attachments" />
              </TextInputGroup>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            <div v-for="attachment in groupAttachments"
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
</template>

<script setup lang="ts">
import {
  computed, Ref, ref,
} from 'vue';
import { useWeapon } from '@/weapons/composables/weapons';
import WeaponUnlockDescription from '@/unlocks/components/WeaponUnlockDescription.vue';
import AttachmentUnlockDescription from '@/unlocks/components/AttachmentUnlockDescription.vue';
import { TextInputGroup, TextInput } from '@zenky/forms-vue';
import { Attachment, AttachmentStat } from '@/attachments/types';

const props = defineProps<{
  weaponId: string;
}>();

const id = computed(() => props.weaponId);
const { weapon, attachments } = useWeapon(id);
const attachmentsSearch: Ref<string> = ref('');
const currentAttachmentsCategory = ref(attachments.value.length > 0 ? attachments.value[0].category.id : null);
const selectAttachmentsCategory = (categoryId: string) => {
  currentAttachmentsCategory.value = categoryId;
  attachmentsSearch.value = '';
};
const currentGroup = computed(() => {
  if (!currentAttachmentsCategory.value) {
    return attachments.value.length > 0 ? attachments.value[0] : null;
  }

  const index = attachments.value.findIndex((group) => group.category.id === currentAttachmentsCategory.value);

  if (index === -1) {
    return null;
  }

  return attachments.value[index];
});
const groupAttachments = computed(() => {
  if (!currentGroup.value || !currentGroup.value?.attachments || !currentGroup.value?.attachments.length) {
    return [];
  } else if (!attachmentsSearch.value) {
    return currentGroup.value.attachments;
  }

  const query = attachmentsSearch.value.toString().toLowerCase();

  return currentGroup.value.attachments.filter((attachment: Attachment) => {
    if (attachment.name.toLowerCase().includes(query)) {
      return true;
    }

    const statIndex = (attachment.stats?.pros || [])
      .concat(attachment.stats?.cons || [])
      .findIndex((stat: AttachmentStat) => stat.id.includes(query) || stat.name.toLowerCase().includes(query));

    return statIndex !== -1;
  });
});
</script>
