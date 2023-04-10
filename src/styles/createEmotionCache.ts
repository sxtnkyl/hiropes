import createCache from '@emotion/cache';

/**
 * This createEmotionCache function ensures that Emotion’s default settings
 * will be replaced with our custom styles and that this information will be
 * configured both on the client and server sides. The prepend option is set
 * to be true, which will cause our custom styles to load first.
 */
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
