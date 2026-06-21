import { breaditScreenshot, jotionScreenshot } from '../images'

const SCREENSHOT = (url) =>
  `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=600&h=400`

const PROJECTS = [
  {
    title: 'Breadit',
    snapshot: SCREENSHOT('https://breadit-theta-liart.vercel.app/'),
    fallback: breaditScreenshot,
    description:
      'A full-stack social platform with 8+ core features — communities, posts, nested comments, and voting. Built with a normalized relational schema across 12+ tables, Prisma ORM, and session-based authentication.',
    techstack: ['Next.js', 'Prisma', 'PostgreSQL'],
    live: 'https://breadit-theta-liart.vercel.app/',
    github: 'https://github.com/purn1ma/Breadit',
  },
  {
    title: 'Jotion',
    snapshot: jotionScreenshot,
    fallback: null,
    description:
      'A collaborative note-taking app with nested document hierarchies and optimistic UI updates across 10+ reusable components. Relational schema across 8+ entities with NextAuth authentication and real-time updates.',
    techstack: ['Next.js', 'PostgreSQL', 'NextAuth'],
    live: 'https://jotionweb.vercel.app/',
    github: 'https://github.com/purn1ma/jotion',
  },
]

export { PROJECTS }
