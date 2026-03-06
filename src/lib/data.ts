export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  category: 'web' | 'mobile' | 'design'
  position: [number, number, number] // x, y, z in 3D space
  link?: string
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'The Synaptic Galaxy',
    description: 'A 3D immersive portfolio exploring the developer mind.',
    tech: ['Next.js', 'Three.js', 'R3F', 'Tailwind'],
    category: 'web',
    position: [0, 0, -20]
  },
  {
    id: 'noctra',
    title: 'Noctra Systems',
    description: 'Enterprise dashboard for autonomous logistics.',
    tech: ['React', 'Supabase', 'Tremor'],
    category: 'web',
    position: [5, 2, -40]
  },
  {
    id: 'orbit',
    title: 'Orbit Mobile',
    description: 'Social discovery app for creators.',
    tech: ['React Native', 'Expo', 'GraphQL'],
    category: 'mobile',
    position: [-5, -2, -60]
  },
  {
    id: 'apex',
    title: 'Apex Design System',
    description: 'Comprehensive UI kit for fintech products.',
    tech: ['Figma', 'Storybook', 'Tokens'],
    category: 'design',
    position: [0, 4, -80]
  }
]
