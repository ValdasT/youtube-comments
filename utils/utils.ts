export const cutTooLongText = (text: string, textLenght: number) => {
  return text.length > textLenght ? `${text.substring(0, textLenght)}...` : text;
};

export const removeUnusedFields = (res: any, videos: any) => {
  const dataForDb: any[] = [];
  videos.forEach((video: any) => {
    res.forEach((e: any) => {
      if (e.config.params.videoId === video.id) {
        dataForDb.push({
          videoId: video.id,
          title: video.snippet.title,
          thumbnails: video.snippet.thumbnails.default.url,
          comments: e.data.items.length
            ? (e.data.items = e.data.items.map((comment: any) => {
                return {
                  id: comment.id,
                  text: comment.snippet.topLevelComment.snippet.textDisplay,
                  author: comment.snippet.topLevelComment.snippet.authorDisplayName,
                  authorImage: comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
                };
              }))
            : [],
        });
      }
    });
  });
  return dataForDb;
};
