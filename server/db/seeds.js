use zeeyah;
db.dropDatabase();

db.scores.insertMany([
    {
        "playerName": "Michael",
        "highScore": 1502,
        "date": "2020-02-20"
    },
    {
        "playerName": "Mairi",
        "highScore": 1700,
        "date": "2020-02-20"
    },
    {
        "playerName": "Keith",
        "highScore": 1458,
        "date": "2020-02-20"
    }
])