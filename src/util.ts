import Color from 'color';

export const baseUrl = 'https://app.resubscribe.ai';
export const apiUrl = 'https://api.resubscribe.ai';
export const domain = 'app.resubscribe.ai';

export const getNavigatorLanguage = (): string | null => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return (navigator as any).userLanguage || navigator.language || (navigator as any).browserLanguage || null;
  }
};

export const reduceOpacity = (color: string, opacity: number) => {
  return Color(color).alpha(opacity).string();
}

export const isDarkColor = (color: string) => {
  return Color(color).isDark();
};

export const cx = (...classes: Array<string | null | undefined>) => classes.filter(Boolean).join(' ');