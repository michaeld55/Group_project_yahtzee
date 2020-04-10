use scores;
db.dropDatabase();

db.scores.insertMany([
    {
        userName: "Michael",
        scoreNumber: 1500,
        date: null //march 12, 2020
    },
    {
        userName: "Mairi",
        scoreNumber: 1700,
        date: null //fix date later
    },
    {
        userName: "Keith",
        scoreNumber: 1458,
        date: null //fix date later
    }
])