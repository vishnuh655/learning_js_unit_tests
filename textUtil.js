import { expect } from "chai";

function titleCase(title) {
  const titleCasedWord = title.split(" ").map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  });
  return titleCasedWord.join(" ");
}

expect(titleCase("the great mouse detetctive")).to.be.a("string");
expect(titleCase("a")).to.equal("A");
expect(titleCase("vertigo")).to.equal("Vertigo");
expect(titleCase("the great mouse detetctive")).to.equal(
  "The Great Mouse Detetctive"
);
