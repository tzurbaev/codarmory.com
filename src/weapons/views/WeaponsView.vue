<template>
  <div>
    <PageHeader>
      <template v-if="category">{{ category.name }}</template>
      <template v-else>All Weapons</template>
    </PageHeader>
    <div>
      <div class="grid grid-cols-1 sm:grid-cols-6 sm:gap-4">
        <div class="col-span-1">
          <nav class="sticky top-[10%] space-y-1 py-8" aria-label="Select Weapons Category">
            <router-link v-for="item in menu"
                         :key="item.name"
                         :to="item.route"
                         :class="[item.active ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-900 hover:text-white', 'flex items-center px-3 py-2 text-sm font-medium rounded-md']"
                         :aria-current="item.active ? 'page' : undefined"
            >
              <span class="truncate">{{ item.name }}</span>
            </router-link>
          </nav>
        </div>

        <div class="col-span-5 grid grid-cols-1 lg:grid-cols-3 gap-4 py-8">
          <div v-for="weapon in weapons"
               :key="`weapon-${weapon.id}`"
               class="p-8 rounded-lg shadow-lg hover:shadow-xl bg-gray-900"
          >
            <p v-if="weapon.category" class="font-medium text-gray-400">{{ weapon.category.name }}</p>
            <h2 class="text-5xl font-extrabold">
              <router-link :to="{ name: 'weapons.show', params: { categoryId: weapon.category_id, weaponId: weapon.id } }"
                           class="text-white hover:text-purple-500"
              >
                {{ weapon.name }}
              </router-link>
            </h2>
            <p v-if="weapon.attachments.length > 0" class="text-gray-400">
              {{ weapon.attachments.length }} Attachments
            </p>
            <WeaponUnlockDescription :weapon="weapon" class="mt-4 text-purple-500/80" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useWeaponCategoriesMenu, useWeaponCategory } from '@/weapons/composables/categories';
import PageHeader from '@/layout/components/PageHeader.vue';
import { useWeaponsList } from '@/weapons/composables/weapons';
import WeaponUnlockDescription from '@/unlocks/components/WeaponUnlockDescription.vue';

const props = defineProps<{
  categoryId?: string;
}>();

const categoryId: ComputedRef<string | null> = computed(() => props.categoryId || null);
const { category } = useWeaponCategory(categoryId);
const { menu } = useWeaponCategoriesMenu(categoryId);
const { weapons } = useWeaponsList(categoryId);
</script>
