<template>
  <div>
    <PageHeader>
      <template v-if="category">{{ category.name }}</template>
      <template v-else>All Weapons</template>
    </PageHeader>
    <div>
      <div class="grid grid-cols-1 sm:grid-cols-6 sm:gap-4">
        <div class="col-span-1">
          <VerticalMenu label="Select Weapons Category" :menu="menu" class="lg:sticky lg:top-[10%]" />
        </div>

        <div class="col-span-5">
          <div class="grid grid-cols-1 gap-4 py-8 weapons-grid"
               :class="{
                 'lg:grid-cols-1': weapons.length === 1,
                 'lg:grid-cols-2': weapons.length === 2,
                 'lg:grid-cols-3': weapons.length >= 3,
               }"
          >
            <div v-for="weapon in weapons"
                 :key="`WeaponGridCard-${weapon.id}`"
                 class="p-8 rounded-lg shadow-lg hover:shadow-xl bg-gray-900 flex flex-col"
            >
              <WeaponCard type="grid" :weapon="weapon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useWeaponCategoriesMenu, useWeaponCategory } from '@/weapons/composables/categories';
import { useWeaponsList } from '@/weapons/composables/weapons';
import PageHeader from '@/layout/components/PageHeader.vue';
import WeaponCard from '@/weapons/components/WeaponCard.vue';
import VerticalMenu from '@/layout/components/VerticalMenu.vue';

const props = defineProps<{
  categoryId?: string;
}>();

const id: ComputedRef<string | null> = computed(() => props.categoryId || null);
const { category } = useWeaponCategory(id);
const { menu } = useWeaponCategoriesMenu(id);
const { weapons } = useWeaponsList(id);
</script>
