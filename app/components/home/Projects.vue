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
    .filter((work) => work.featured)
    .sort((a, b) => {
      const dateA = new Date(a.release)
      const dateB = new Date(b.release)

      const isFutureA = dateA > now
      const isFutureB = dateB > now

      // Future projects first
      if (isFutureA && !isFutureB) return -1
      if (!isFutureA && isFutureB) return 1

      // If both are future OR both are past → newest first
      return dateB.getTime() - dateA.getTime()
    })
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <h3 class="font-newsreader italic text-white-shadow text-xl">
      {{ $t('navigation.works') }}
    </h3>

    <div class="flex w-full flex-col gap-4">
      <NuxtLink
        v-for="project in featuredProjects"
        :key="project.name"
        role="link"
        class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-neutral-900"
        :to="project.release === '9999-12-31' ? localePath('/') : project.link"
        :aria-label="'go to ' + project.name + ' project website'"
        :target="project.release === '9999-12-31' ? '_self' : '_blank'"
      >
        <span class="whitespace-nowrap font-medium">
          {{ project.name }}
        </span>

        <div class="mx-2 h-[0.1px] w-full bg-muted" />

        <span class="whitespace-nowrap">
          {{
            project.release === '9999-12-31'
              ? $t('global.soon') + '...'
              : project.release.slice(0, 4)
          }}
        </span>
      </NuxtLink>
    </div>

    <NuxtLinkLocale to="/works">
      <span class="cursor-pointer font-newsreader italic text-white-shadow">
        {{ $t('global.see_more') }}
      </span>
    </NuxtLinkLocale>
  </div>
</template>
