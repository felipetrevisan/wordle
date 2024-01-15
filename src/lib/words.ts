import {
  addDays,
  differenceInDays,
  formatISO,
  startOfDay,
  startOfToday,
} from "date-fns";
import { default as GraphemeSplitter } from "grapheme-splitter";

import { validGuesses } from "@/config/validGuesses";
import { words } from "@/config/wordList";
import { getGuessStatuses } from "./statuses";

// 1 January 2024 Game Epoch
export const firstGameDate = new Date(2024, 0, 1);
export const periodInDays = 1;

export const isWordInWordList = (word: string) => {
  return (
    words.includes(localeAwareLowerCase(word)) ||
    validGuesses.includes(localeAwareLowerCase(word))
  );
};

export const isWinningWord = (guess: string, solution: string) => {
  return guess?.toLocaleLowerCase() === solution?.toLocaleLowerCase();
};

export const isWinningMultipleWord = (
  guesses: string[],
  solution: string[]
) => {
  return solution.every((s) => guesses.includes(localeAwareLowerCase(s)));
};

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false;
  }

  const lettersLeftArray = new Array<string>();
  const guess = guesses[guesses.length - 1];
  const statuses = getGuessStatuses(guess, "");

  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === "correct" || statuses[i] === "present") {
      lettersLeftArray.push(guess[i]);
    }

    if (statuses[i] === "correct" && word[i] !== guess[i]) {
      return `Must use ${guess[i]} in position ${i + 1}`;
    }
  }

  // check for the first unused letter, taking duplicate letters into account
  let n;

  for (const letter of word) {
    n = lettersLeftArray.indexOf(letter);
    
    if (n !== -1) {
      lettersLeftArray.splice(n, 1);
    }
  }

  if (lettersLeftArray.length > 0) {
    return `Guess must contain ${lettersLeftArray[0]}`;
  }

  return false;
};

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(localeAwareLowerCase(word));
};

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length;
};

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text?.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text?.toLowerCase();
};

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text?.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text?.toUpperCase();
};

export const getLastGameDate = (today: Date) => {
  const t = startOfDay(today);
  let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays;

  return addDays(t, -daysSinceLastGame);
};

export const getNextGameDate = (today: Date) => {
  return addDays(getLastGameDate(today), periodInDays);
};

export const isValidGameDate = (date: Date) => {
  if (date < firstGameDate || date > startOfToday()) {
    return false;
  }

  return differenceInDays(firstGameDate, date) % periodInDays === 0;
};

export const getIndex = (gameDate: Date) => {
  let start = firstGameDate;
  let index = -1;

  do {
    index++;
    start = addDays(start, periodInDays);
  } while (start <= gameDate);

  console.log(start, index);

  return index;
};

export const getWords = (index: number, boards: number): string[] => {
  if (index < 0) {
    throw new Error("Invalid index");
  }

  const e = boards === 1 ? index : index - 51;
  const r = (boards * e) % words.length;
  const solutions: string[] = [];

  for (
    let subWords: string[] = words.slice(r, r + boards), t = 0;
    t < boards;
    ++t
  ) {
    solutions.push(
      boards === 1
        ? localeAwareUpperCase(words[r])
        : localeAwareUpperCase(subWords[t])
    );
  }

  return solutions; //localeAwareUpperCase(words[(index * boards) % words.length]);
};

export const getSolution = (date: Date, boards: number = 1) => {
  const nextDate = getNextGameDate(date);
  const index = getIndex(date);
  const words = getWords(index, boards).map((w) => localeAwareLowerCase(w));

  return {
    solution: words,
    solutionDate: date,
    solutionIndex: index,
    tomorrow: nextDate.valueOf(),
  };
};

export const getGameDate = () => {
  if (getIsLatestGame()) {
    return startOfToday();
  }

  return startOfToday();
};

export const setGameDate = (d: Date) => {
  try {
    if (d < startOfToday()) {
      window.location.href = "/?d=" + formatISO(d, { representation: "date" });
      return;
    }
  } catch (e) {
    console.log(e);
  }
  window.location.href = "/";
};

export const getIsLatestGame = () => {
  return true;
};
