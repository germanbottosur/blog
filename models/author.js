const db = require('../db')

const getAuthors = async () => {
    const connection = await db.getConnection()

    try {
        const cursor = connection.db('blog').collection('authors').find()

        const authors = []
        await cursor.forEach((doc) => {
            authors.push({
                id: doc._id,
                name: doc.name
            })
        })

        return authors
    } finally {
        connection.close()
    }
}

module.exports = {
    getAuthors: getAuthors
}
