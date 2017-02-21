function BackgroundManager() {
    this.backgroundFileNames = [
        "antiquities_02.jpg",
        "antiquities_03.jpg",
        "arena.jpg",
        "battlefield_01.jpg",
        "battlefield_02.png",
        "beach_01.jpg",
        "beach_02.jpg",
        "beach_03.jpg",
        "cape.jpg",
        "cave_01.jpg",
        "cave_02.jpg",
        "cave_03.jpg",
        "classroom.jpg",
        "dark_elf_village.jpg",
        "desert.jpg",
        "elf_village.jpg",
        "farm_road.jpg",
        "festival_01.png",
        "forest_01.jpg",
        "forest_02.jpg",
        "forest_03.jpg",
        "graveyard.jpg",
        "hot_spring_01.jpg",
        "hot_spring_02.jpg",
        "hot_spring_03.jpg",
        "hot_spring_04.jpg",
        "institution.jpg",
        "kemomin_forest.jpg",
        "kimon.jpg",
        "labyrinth_01.jpg",
        "labyrinth_02.jpg",
        "labyrinth_03.jpg",
        "labyrinth_04.jpg",
        "main_street.jpg",
        "office.jpg",
        "open_deck.jpg",
        "orphanage.jpg",
        "rogue_base.jpg",
        "ruins.jpg",
        "ship.jpg",
        "shrine.jpg",
        "theater.jpg",
        "town_road_01.jpg",
        "town_road_02.jpg",
        "town_road_03.jpg",
        "training_place.jpg",
        "volcano.jpg",
        "waroquier_house.jpg",
        "winter_highway_01.jpg",
        "winter_highway_02.jpg",
        "winter_highway_03.jpg"
    ];
}

BackgroundManager.prototype.getChristmasBackgrounds = function() {
    return [
        "winter_highway_01.jpg",
        "winter_highway_02.jpg",
        "winter_highway_03.jpg"
    ];
}

module.exports = BackgroundManager;