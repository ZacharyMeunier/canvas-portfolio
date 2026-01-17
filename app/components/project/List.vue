<script setup lang="ts">
import type { Collections } from '@nuxt/content'
const { locale } = useI18n()
const localePath = useLocalePath()

// Fetch projects dynamically, like home page
const { data: projects } = await useAsyncData('projects', async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return await queryCollection(collection).all() as
    | Collections['projects_en'][]
    | Collections['projects_fr'][]
}, {
  watch: [locale],
})

// Sort future projects first, then by newest date
const featuredProjects = computed(() => {
  if (!projects.value) return []

  const now = new Date()

  return projects.value
    .filter(p => p.featured)
    .sort((a, b) => {
      const dateA = new Date(a.release)
      const dateB = new Date(b.release)

      const isFutureA = dateA > now
      const isFutureB = dateB > now

      if (isFutureA && !isFutureB) return -1
      if (!isFutureA && isFutureB) return 1

      return dateB.getTime() - dateA.getTime()
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
