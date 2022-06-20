import { createContext, FC, useState } from 'react';
import { VideoContextState, Video } from '../types/types';

export const VideoContext = createContext<VideoContextState>({
  allVideos: [],
  addVideos: () => undefined,
  removeVideo: () => undefined,
  loading: false,
  setLoading: () => undefined,
});

type Props = {
  children?: React.ReactNode;
};

const VideoProvider: FC<Props> = ({ children }) => {
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const addVideos = (newVideos: Video[]) => setAllVideos(newVideos);
  const removeVideo = (id: string) => setAllVideos(allVideos.filter((video) => video.videoId !== id));

  return (
    <VideoContext.Provider
      value={{
        allVideos,
        addVideos,
        removeVideo,
        loading,
        setLoading,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
