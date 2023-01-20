declare module 'lodash';

declare module '*.png';

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.css';

declare module '@m92/crypto';