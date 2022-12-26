export const getAbsolutePath = (relativePath: string) => {
  return `${process.env.PWD}${relativePath}`;
}
  
