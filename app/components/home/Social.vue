<script setup lang="ts">
const socialMediaRegexMap = [
  { regex: /github\.com/, name: 'GitHub', icon: 'custom:github' },
  { regex: /itch\.io/, name: 'ItchIo', icon: 'custom:itch' },
  { regex: /linkedin\.com/, name: 'LinkedIn', icon: 'custom:linkedin' },
  { regex: /\/cv$/, name: 'CV', icon: 'custom:cv' },
]

const { socials } = useAppConfig()

const mappedSocials = Object.values(socials).map((link) => {
  const foundSocial = socialMediaRegexMap.find((social) => social.regex.test(link))
  if (!foundSocial) throw new Error(`No social media found for link: ${link}`)
  const { name, icon } = foundSocial
  return {
    name,
    icon,
    link,
    isDownload: link.endsWith('.pdf'),
  }
})
</script>

<template>
  <div class="my-7 flex items-center justify-center gap-6 sm:gap-10">
    <template v-for="social in mappedSocials" :key="social.name">

      <a
        v-if="social.isDownload"
        :href="social.link"
        download="ZacharyMeunier_CV.pdf"
        class="flex items-center justify-center cursor-pointer group"
        :aria-label="'Download ' + social.name"
      >
        <UIcon
          :name="social.icon"
          class="size-6 text-muted transition-colors duration-300 group-hover:text-neutral-300"
          :alt="social.name + ' logo'"
          :aria-label="social.name + ' logo'"
        />
      </a>
      
      <NuxtLink
        v-else
        :to="social.link"
        target="_blank"
        class="flex items-center justify-center group"
        :aria-label="'Go to ' + social.name + ' profile'"
      >
        <UIcon
          :name="social.icon"
          class="size-6 text-muted transition-colors duration-300 group-hover:text-neutral-300"
          :alt="social.name + ' logo'"
          :aria-label="social.name + ' logo'"
        />
      </NuxtLink>

    </template>
  </div>
</template>
