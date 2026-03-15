import Head from 'next/head';
import Story from '../components/Story/Story';
import Card from '../components/Card/Card';
import { videos } from '../data/videos';
import styles from '../styles/Home.module.css';

export default function Home() {
  const featuredVideo = videos.find((video) => video.isFeatured) ?? videos[0];
  const nonFeaturedVideos = videos.filter((video) => !video.isFeatured);
  const latestVideos = nonFeaturedVideos.slice(0, 3);
  const allEpisodes = nonFeaturedVideos.slice(3);

  return (
    <>
      <Head>
        <title>Hour of Justice</title>
        <meta name="description" content="Hour of Justice official video channel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        <Story
          title={featuredVideo.title}
          description={featuredVideo.description}
          thumbnailUrl={featuredVideo.thumbnailUrl}
          storyHref="/stories/casey-anthony"
        />

        <h2 className={styles.sectionTitle}>LATEST EPISODES</h2>

        <div className={styles.cardsGrid}>
          {latestVideos.map((video) => (
            <Card
              key={video.id}
              title={video.title}
              description={video.description}
              thumbnailUrl={video.thumbnailUrl}
              videoUrl={video.videoUrl}
              storyHref={video.storyHref}
            />
          ))}
        </div>

        <h2 className={styles.sectionTitle}>ALL EPISODES</h2>

        <div className={styles.cardsGrid}>
          {allEpisodes.map((video) => (
            <Card
              key={video.id}
              title={video.title}
              description={video.description}
              thumbnailUrl={video.thumbnailUrl}
              videoUrl={video.videoUrl}
              storyHref={video.storyHref}
            />
          ))}
        </div>
      </div>
    </>
  );
}
