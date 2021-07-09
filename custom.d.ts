declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '@env' {
  export const URL_DEV: string;
  export const URL_PRODUCTION: string;
}
