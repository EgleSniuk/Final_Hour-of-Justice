import { Video } from '../types/video';

export const videos: Video[] = [
  {
    id: '1',
    title: 'The Web of Lies: Casey Anthony',
    description: 'A young mother stays silent for 31 days after her daughter disappears, leaving behind a trail of contradictions and unanswered questions.',
    thumbnailUrl: '/assets/casey_anthony.png',
    videoUrl: 'https://youtube.com',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Jodi Arias: When Love Became Obsession',
    description: 'What began as a passionate relationship slowly turned into an obsession that neither of them could escape.',
    thumbnailUrl: '/assets/jodi_arias.png',
    videoUrl: 'https://youtube.com',
    storyHref: '/stories/jodi-arias',
  },
  {
    id: '3',
    title: 'Community Policing Initiatives',
    description: 'How local departments are engaging with neighborhoods.',
    thumbnailUrl: '/assets/title.png',
    videoUrl: 'https://youtube.com',
  },
  {
    id: '4',
    title: 'Legal Precedents Explained',
    description: 'Breaking down complex court decisions for the average citizen.',
    thumbnailUrl: '/assets/title.png',
    videoUrl: 'https://youtube.com',
  },
];
