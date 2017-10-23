class Official {
  constructor(name, party, urls, photo) {
    this.name = name,
    this.party = party,
    this.url = urls,
    this.photo = photo
  }
}

const officials = [
  new God("Baldur", "Beauty", "Innocence", "Peace"),
  new God("Bragi", "Poetry", "Music", "Harp"),
  new God("Dagr", "Daytime", "Talkshows"),
  new God("Freyja", "Love", "Fertility", "Battle"),
  new God("Loki", "Trickery", "Mischief"),
  new God("Mimir", "Object Oriented Programming", "Agile", "Scrum"),
  new God("Odin", "War", "Wisdow", "Magic"),
  new God("Thor", "Thunder", "Battle")
];

module.exports = {
  Official,
  officials
};
