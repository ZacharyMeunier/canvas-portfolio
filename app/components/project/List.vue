<script setup lang="ts">
import projectsData from '~/data/projects'
import { computed } from 'vue'
const localePath = useLocalePath()

const sortedProjects = computed(() => {
  return projectsData
    .filter(p => p.featured)
    .sort((a, b) => {
      // '9999-12-31' first
      if (a.release === '9999-12-31') return -1
      if (b.release === '9999-12-31') return 1

      // sort by real date descending
      const dateA = new Date(a.release).getTime() || 0
      const dateB = new Date(b.release).getTime() || 0
      return dateB - dateA
    })
})
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <NuxtLink
      v-for="project in sortedProjects"
      :key="project.name"
      class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-secondary"
      :to="project.link"
      :aria-label="project.name + ' project link'"
      target="_blank"
    >
      <span class="whitespace-nowrap">{{ project.name }}</span>
      <div class="mx-2 h-[0.1px] w-full bg-muted" />
      <span class="whitespace-nowrap text-muted">
        {{ project.release === '9999-12-31' ? $t("global.soon") + "..." : project.release.slice(0, 4) }}
      </span>
    </NuxtLink>

    <div class="mt-4 flex justify-center">
      <button class="btn-primary" @click="useRouter().push('/works')">
        {{ $t("global.see_more") }}
      </button>
    </div>
  </div>
</template>
