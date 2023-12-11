import { filterCountries, getStringArrayCharCount } from "./reduce";

describe("filterCountries", () => {
  it("should correctly filter supported and unsupported countries", () => {
    const supportedCountry: string[] = ["BD", "USA", "UK"];
    const allCountry: string[] = ["INDIA", "BD", "PAKISTAN", "NEPAL", "USA"];
    const expectedResult = {
      supported: ["BD", "USA"],
      unsupported: ["INDIA", "PAKISTAN", "NEPAL"],
    };

    const result = filterCountries(supportedCountry, allCountry);

    expect(result[0]).toEqual(expectedResult.supported);
    expect(result[1]).toEqual(expectedResult.unsupported);
  });
  it("should handle when supported country is empty", () => {
    const supportedCountry: string[] = [];
    const allCountry: string[] = ["INDIA", "BD", "PAKISTAN", "NEPAL", "USA"];
    const expectedResult = {
      supported: [],
      unsupported: ["INDIA", "BD", "PAKISTAN", "NEPAL", "USA"],
    };

    const result = filterCountries(supportedCountry, allCountry);

    expect(result[0]).toEqual(expectedResult.supported);
    expect(result[1]).toEqual(expectedResult.unsupported);
  });
  it("should handle when allCountry country is empty", () => {
    const supportedCountry: string[] = ["INDIA", "BD"];
    const allCountry: string[] = [];
    const expectedResult = {
      supported: [],
      unsupported: [],
    };

    const result = filterCountries(supportedCountry, allCountry);

    expect(result[0]).toEqual(expectedResult.supported);
    expect(result[1]).toEqual(expectedResult.unsupported);
  });
});
describe("stringToLengthSum", () => {
  it("should return the sum of lengths of strings in an array", () => {
    const countries = ["USA", "Canada", "Australia"];
    const expectedResult = 18;
    const result = getStringArrayCharCount(countries);

    expect(result).toEqual(expectedResult);
  });

  it("should return 0 for an empty array", () => {
    const countries: string[] = [];
    const expectedResult = 0;
    const result = getStringArrayCharCount(countries);
    expect(result).toEqual(expectedResult);
  });
});
