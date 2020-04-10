use zeeyah;
db.dropDatabase();

db.scores.insertMany([
    {
        "userName": "Michael",
        "scoreNumber": 1502,
        "date": "2020-02-20"
    },
    {
        "userName": "Mairi",
        "scoreNumber": 1700,
        "date": "2020-02-20"
    },
    {
        "userName": "Keith",
        "scoreNumber": 1458,
        "date": "2020-02-20"
    }
])