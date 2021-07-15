function checkForShip(player, coordinates) {
    const shipPresent, ship
    player.ships.forEach(ship => {
        ship = player.ships[i];
        shipPresent = ship.locations.filter((actualCoordinate) => {
            return actualCoordinate[0] === coordinates[0]
        })
    });
}
module.exports = { checkForShip };
