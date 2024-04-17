export const removeExtension = (filename: string) => {
  return filename.split('.').shift();
};
