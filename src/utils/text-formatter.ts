const capitalizedWord = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export const capitalize = (words: string) => words.split('_').map(capitalizedWord).join(' ');

export const convertToCamelCase = (inputString: string) => {
  const words = inputString.split('_');
  const capitalizedWords = words.map((word, index) => (index === 0 ? word.toLowerCase() : capitalizedWord(word)));
  return capitalizedWords.join('');
};
