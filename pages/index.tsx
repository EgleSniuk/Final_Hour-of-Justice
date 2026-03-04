import Head from 'next/head';
import FeaturedVideo from '../components/FeaturedVideo/FeaturedVideo';
import VideoCard from '../components/VideoCard/VideoCard';
import { videos } from '../data/videos';
import styles from '../styles/Home.module.css';

export default function Home() {
  const featuredVideo = videos.find((video) => video.isFeatured) ?? videos[0];
  const regularVideos = videos.filter((video) => !video.isFeatured).slice(0, 3);

  return (
    <>
      <Head>
        <title>Hour of Justice</title>
        <meta name="description" content="Hour of Justice official video channel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        <FeaturedVideo
          title={featuredVideo.title}
          description={featuredVideo.description}
          thumbnailUrl={featuredVideo.thumbnailUrl}
          videoUrl={featuredVideo.videoUrl}
        />

        <h2 className={styles.sectionTitle}>Latest Episodes</h2>

        <div className={styles.cardsGrid}>
          {regularVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              thumbnailUrl={video.thumbnailUrl}
              videoUrl={video.videoUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}
