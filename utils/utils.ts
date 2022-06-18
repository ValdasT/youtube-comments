export const cutTooLongText = (text: string, textLenght: number) => {
  return text.length > textLenght ? `${text.substring(0, textLenght)}...` : text;
};

export const removeUnusedFields = (data: any) => {
  console.log(data);
  const dataForDb = { items: [] };
  dataForDb.items = data.items.map((e: any) => {
    return {
      id: e.id,
      snippet: {
        topLevelComment: {
          snippet: {
            textDisplay: e.snippet.topLevelComment.snippet.textDisplay,
            authorDisplayName: e.snippet.topLevelComment.snippet.authorDisplayName,
            authorProfileImageUrl: e.snippet.topLevelComment.snippet.authorProfileImageUrl,
          },
        },
      },
    };
  });
  return dataForDb;
};
