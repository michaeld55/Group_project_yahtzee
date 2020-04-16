use zeeyah;
db.dropDatabase();

db.scores.insertMany([
    {
        "playerName": "Michael",
        "highScore": 225,
        "date": "2020-02-20"
    },
    {
        "playerName": "Mairi",
        "highScore": 90,
        "date": "2020-02-20"
    },
    {
        "playerName": "David",
        "highScore": 150,
        "date": "2020-02-20"
    }
])