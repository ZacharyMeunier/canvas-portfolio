<script setup lang="ts">
import projects from '~/data/projects'
const localePath = useLocalePath()

// Sort projects: '9999-12-31' first, then by date descending
const sortedProjects = projects
  .filter(p => p.featured) // keep only featured
  .sort((a, b) => {
    if (a.release === '9999-12-31') return -1 // a goes first
    if (b.release === '9999-12-31') return 1  // b goes first
    return new Date(b.release).getTime() - new Date(a.release).getTime() // latest first
  })
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <NuxtLink
      v-for="project in sortedProjects"
      :key="project.name"
      class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-secondary"
      :to="project.release === '9999-12-31' ? localePath('/') : project.link"
      :aria-label="project.name + ' project link'"
      :target="project.release === '9999-12-31' ? '_self' : '_blank'"
    >
      <span class="whitespace-nowrap">
        {{ project.name }}
      </span>
      <div class="mx-2 h-[0.1px] w-full bg-muted" />
      <span class="whitespace-nowrap text-muted">
        {{ project.release === '9999-12-31' ? $t("global.soon") + "..." : project.release.slice(0, 4) }}
      </span>
    </NuxtLink>

    <div class="mt-4 flex justify-center">
      <button
        class="btn-primary"
        @click="useRouter().push('/works')"
      >
        {{ $t("global.see_more") }}
      </button>
    </div>
  </div>
</template>
