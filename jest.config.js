module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      // Add ts-jest configuration directly under "ts-jest"
      // For example:
      // ts-jest configuration goes here
      // For instance, setting some configurations like `useESM: true`, etc.
    },
  },
  testMatch: ["**/*.test.ts"],
};
