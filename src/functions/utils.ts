import { languages } from '../data/languages';

const getLanguageName = (code: string) => {
  return languages.filter((language) => language.code === code)[0]
    ? languages.filter((language) => language.code === code)[0].name
    : '';
};

export { getLanguageName };
