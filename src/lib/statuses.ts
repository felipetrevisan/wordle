import { unicodeSplit } from "./words";

export type Status = "absent" | "present" | "correct";

export const getStatuses = (
  guesses: string[],
  solution: string
): { [key: string]: Status } => {
  const charObj: { [key: string]: Status } = {};

  const splitSolution = unicodeSplit(solution);

  guesses.forEach((word) => {
    unicodeSplit(word).forEach((letter, i) => {
      if (!splitSolution.includes(letter)) {
        return (charObj[letter] = "absent");
      }

      if (letter === splitSolution[i]) {
        return (charObj[letter] = "correct");
      }

      if (charObj[letter] !== "correct") {
        return (charObj[letter] = "present");
      }
    });
  });
  
  return charObj;
};

export const getGuessStatuses = (guess: string, solution: string): Status[] => {
  const splitSolution = unicodeSplit(solution);
  const splitGuess = unicodeSplit(guess);

  const solutionCharsTaken = splitSolution.map((_) => false);
  const statuses: Status[] = Array.from(Array(guess.length));

  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = "correct";
      solutionCharsTaken[i] = true;
      return;
    }
  });

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitSolution.includes(letter)) {
      statuses[i] = "absent";
      return;
    }

    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = "present";
      solutionCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[i] = "absent";
      return;
    }
  });

  return statuses;
};
