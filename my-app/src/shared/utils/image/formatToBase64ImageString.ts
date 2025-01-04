export const formatToBase64ImageString = (image?: string) => {
  const base64Image = `data:image/png;base64,${image}`;

  return base64Image;
};
