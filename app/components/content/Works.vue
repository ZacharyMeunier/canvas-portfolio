<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()
const localePath = useLocalePath()

const { data: projects } = await useAsyncData('projects', async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return await queryCollection(collection).all() as
    | Collections['projects_en'][]
    | Collections['projects_fr'][]
}, {
  watch: [locale],
})

const featuredProjects = computed(() => {
  if (!projects.value) return []

  const now = new Date()

  return projects.value
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
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <slot name="title" mdc-unwrap="p" />
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <slot name="subtitle" mdc-unwrap="p" />
    </h2>
    <Divider class="mb-8 mt-2" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <ProjectCard
        v-for="project in featuredProjects"
        :key="project.name"
        :project="project"
      />
    </div>
  </section>
</template>
