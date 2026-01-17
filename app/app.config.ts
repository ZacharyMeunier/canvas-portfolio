export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/hugorcd/15min',
    available: true,
  },
  profile: {
    name: 'Zachary Meunier',
    job: 'Student',
    email: 'zacmeu04@gmail.com',
    phone: '(+1) 418-564-2877',
    picture: 'https://avatars.githubusercontent.com/u/71938701?v=4',
  },
  socials: {
    github: 'https://github.com/HugoRCD',
    itchio: 'https://backderiz.itch.io',
    linkedin: 'https://www.linkedin.com/in/zachary-meunier-b26538250',
  },
  seo: {
    title: 'Portfolio',
    description: 'Portfolio Zachary Meunier',
    url: 'https://zacharymeunier.com/en',
  },
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'neutral',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        color: 'neutral',
      },
    },
    input: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    icons: {
      loading: 'lucide:loader',
    },
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/Zach.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/Zach.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/Zach.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/Zach.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
