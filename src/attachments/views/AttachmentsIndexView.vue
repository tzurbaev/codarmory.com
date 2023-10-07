<template>
  <SidebarMenuPage>
    <template #sidebar>
      <VerticalMenu label="Select Attachments Category" :menu="menu" />
    </template>

    <template #default>
      <Panel label="Attachments">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          <router-link v-for="category in menu"
                       :key="`AttachmentCategory-${category.id}`"
                       :to="category.route"
                       class="group"
          >
            <Panel class="text-center border border-gray-700 flex flex-col relative">
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white/90 group-hover:text-primary-500">{{ category.name }}</h2>
            </Panel>
          </router-link>
        </div>
      </Panel>
    </template>
  </SidebarMenuPage>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useAttachmentCategoriesMenu } from '@/attachments/composables/categories';
import Panel from '@/layout/components/Panel.vue';
import VerticalMenu from '@/layout/components/VerticalMenu.vue';
import SidebarMenuPage from '@/layout/components/SidebarMenuPage.vue';

const { menu } = useAttachmentCategoriesMenu();

useHead({ title: 'Attachments' });
</script>
