const { expect } = require("chai");
const { checkForShip } = require("../game_logic/ship_methods");

describe("check for ship", () => {
  it("should correctly report no ship at given player coordinate", () => {
    const player = {
      ships: [
        {
          locations: [[0, 0]],
        },
      ],
    };
    expect(checkForShip(player, [9, 9])).to.be.false;
  });
});
