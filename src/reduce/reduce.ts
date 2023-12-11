import { pipe } from "fp-ts/lib/function";

export function filterCountries(
  supportedCountry: string[],
  allCountry: string[]
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
    [[], []] as [string[], string[]]
  );

  return [supported, unsupported];
}

function sumNumbers(allNumbers: number[]) {
  const sumValue = allNumbers.reduce((acc, item) => (acc += item), 0);
  return sumValue;
}

function getlength(str: string[]) {
  return str.map((c) => c.length);
}

export function getStringArrayCharCount(countries: string[]) {
  const sumValue = pipe(countries, getlength, sumNumbers);
  return sumValue;
}
