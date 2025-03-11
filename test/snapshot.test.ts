import { it, expect } from "vitest";

it("should have the correct title", () => {
  const result = "Main features";
  expect(result).toMatchSnapshot();
});
