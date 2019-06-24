const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const dbURI = process.env.DB_URI || ''

const getConnection = async () => {
    const client = new MongoClient(dbURI, {useNewUrlParser: true})
    try {
        return await client.connect()
    } catch (err) {
        client.close()
        throw err
    }
}

const getObjectId = (str) => {
    try {
        return new ObjectID(str)
    } catch (err) {
        // TODO improve
        return null
    }
}

module.exports = {
    getConnection: getConnection,
    getObjectId: getObjectId
}
