const MongoClient = require('mongodb').MongoClient
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

module.exports = {
    getConnection: getConnection
}
