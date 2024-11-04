import { pipe } from 'fp-ts/lib/function';

export function filterCountries(
  supportedCountry: string[],
  allCountry: string[],
) {
  const [supported, unsupported] = allCountry.reduce(
    (acc, country) => {
      if (supportedCountry.includes(country)) {
        acc[0].push(country);
      } else {
        acc[1].push(country);
      }
      return acc;
    },
    [[], []] as [string[], string[]],
  );

  return [supported, unsupported];
}

function sumNumbers(allNumbers: number[]): number {
  return allNumbers.reduce((acc, numberItem) => (acc += numberItem), 0);
}
const getlength = (str: string[]) => str.map((c) => c.length);

export function getStringArrayCharCount(countries: string[]): number {
  return pipe(countries, getlength, sumNumbers);
}
