const names = [
    "Angry Goat",
    "Lazy Dog",
    "Magic Cow",
    "Curly Fox",
    "Pirate Jack",
    "Explosive Cat",
    "Retard Joe",
    "Fat Mike",
    "Fansy Fish",
    "Mountain Lexy",
    "Mister Green",
];

exports.getName = () => {
    return names[Math.floor(Math.random() * names.length)];
}