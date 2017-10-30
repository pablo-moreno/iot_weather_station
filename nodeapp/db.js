const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/weatherdb';

class DB {
    get(limit=50, skip=0) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoUrl, (err, db) => {
                if (err) {
                    reject('Cannot connect to the database.');
                }
                var collection = db.collection('measures');
                collection.find({}).sort({date: -1}).skip(skip).limit(limit).toArray((err, data) => {
                    if (err) {
                        reject('Error fetching the documents.');
                    }
                    resolve(data.reverse());
                });
            });
        })
    }

    post(data) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoUrl, (err, db) => {
                if (err) {
                    reject('Cannot connect to the database.');
                }
                var collection = db.collection('measures');
                collection.insertOne(data, (err, result) => {
                    if (err) {
                        reject('Error inserting data')
                    }
                    resolve(200)
                })
            });
        })
    };
}

module.exports = DB
