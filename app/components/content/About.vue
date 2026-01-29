<script setup lang="ts">
const softwares = await queryCollection('softwares').first()
const languages = await queryCollection('languages').first()
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20 text-[var(--ui-text-toned)]">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-8 mt-2" />
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <AboutProfilePicture />
      <div class="relative flex flex-col gap-3 sm:ml-4">
        <h3 class="text-lg">
          Intro
        </h3>
        <div class="flex flex-col gap-4 text-primary">
          <slot
            name="intro"
            mdc-unwrap="p"
          />
        </div>
      </div>
    </div>
    <Divider class="my-8" />
    <slot
      name="experiences"
      mdc-unwrap="p"
    />
    <Divider class="my-8" />
    <!-- Softwares -->
    <div class="flex flex-col gap-3">
      <div class="mb-6 flex flex-col gap-1">
        <h3 class="text-white-shadow font-newsreader italic text-3xl">
          <slot name="softwares_title" mdc-unwrap="p" />
        </h3>
        <p>
          <slot name="softwares_description" mdc-unwrap="p" />
        </p>
      </div>

      <!-- GRID -->
      <div class="grid grid-cols-5 gap-4 items-stretch">
        <SpotlightCard
          v-for="item in softwares!.items"
          :key="item.name"
          white
          class="h-full"
        >
          <div
            class="flex flex-col items-center justify-center gap-2 p-6 h-full cursor-default"
            :aria-label="item.name"
          >
            <!-- ICON -->
            <UIcon
              :name="item.icon"
              class="w-16 h-16 shrink-0"
              :font-controlled="false"
              :alt="item.name + ' logo'"
              :aria-label="item.name + ' logo'"
            />

            <!-- NAME -->
            <span
              class="text-sm font-medium text-center leading-tight line-clamp-2 h-[2.5em]"
            >
          {{ item.name }}
        </span>
          </div>
        </SpotlightCard>
      </div>
    </div>

    <Divider class="my-8" />

    <!-- Languages -->
    <div class="flex flex-col gap-3">
      <div class="mb-6 flex flex-col gap-1">
        <h3 class="text-white-shadow font-newsreader italic text-3xl">
          <slot name="languages_title" mdc-unwrap="p" />
        </h3>
        <p>
          <slot name="languages_description" mdc-unwrap="p" />
        </p>
      </div>

      <!-- GRID -->
      <div class="grid grid-cols-5 gap-4 items-stretch">
        <SpotlightCard
          v-for="item in languages!.items"
          :key="item.name"
          white
          class="h-full"
        >
          <div
            class="flex flex-col items-center justify-center gap-2 p-6 h-full cursor-default"
            :aria-label="item.name"
          >
            <!-- ICON -->
            <UIcon
              :name="item.icon"
              class="w-16 h-16 shrink-0"
              :font-controlled="false"
              :alt="item.name + ' logo'"
              :aria-label="item.name + ' logo'"
            />

            <!-- NAME -->
            <span
              class="text-sm font-medium text-center leading-tight line-clamp-2 h-[2.5em]"
            >
          {{ item.name }}
        </span>
          </div>
        </SpotlightCard>
      </div>
    </div>
  </section>
</template>
