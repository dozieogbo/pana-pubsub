export const isUrlValid = (text: string) => {
  if (!text) {
    return false;
  }

  if (!text.startsWith('http')) {
    text = 'http://' + text;
  }

  try {
    const url = new URL(text);

    return ['http:', 'https:'].includes(url.protocol);
  } catch (error) {
    return false;
  }
};
