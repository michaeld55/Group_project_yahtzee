use scores;
db.dropDatabase();

db.scores.insertMany([
    {
        userName: "Michael",
        scoreNumber: 1500,
        date: new Date('2020-02-20')
    },
    {
        userName: "Mairi",
        scoreNumber: 1700,
        date: new Date('2020-03-02')
    },
    {
        userName: "Keith",
        scoreNumber: 1458,
        date: new Date('2020-04-12')
    }
])