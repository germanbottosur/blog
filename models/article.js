const db = require('../db')

const getArticles = async () => {
    const connection = await db.getConnection()

    try {
        const collection = connection.db('blog').collection('articles')
        const cursor = collection.find({deleted_at: null})

        const articles = []
        await cursor.forEach((doc) => {
            articles.push({
                id: doc._id,
                title: doc.title,
                short_description: doc.short_description,
                long_description: doc.long_description,
                authors: doc.authors,
                created_at: doc.created_at,
                updated_at: doc.updated_at
            })
        })

        return articles
    } finally {
        connection.close()
    }
}

const getArticle = async (id) => {
    const connection = await db.getConnection()

    try {
        const collection = connection.db('blog').collection('articles')
        const objectID = db.getObjectId(id)
        const doc = await collection.findOne({_id: objectID, deleted_at: null})

        if (doc != null) {
            return {
                id: doc._id,
                title: doc.title,
                short_description: doc.short_description,
                long_description: doc.long_description,
                authors: doc.authors,
                created_at: doc.created_at,
                updated_at: doc.updated_at
            }
        } else {
            return doc
        }
    } finally {
        connection.close()
    }
}

const addArticle = async (data) => {
    const now = utcNow()
    data["created_at"] = now
    data["updated_at"] = now
    data["deleted_at"] = null
    
    const connection = await db.getConnection()
    try {
        const collection = connection.db('blog').collection('articles')
        
        const result = await collection.insertOne(data)
        return result.insertedId
    } finally {
        connection.close()
    }
}

const deleteArticle = async (id) => {
    const connection = await db.getConnection()
    try {
        const collection = connection.db('blog').collection('articles')
        const objectID = db.getObjectId(id)
        const now = utcNow()

        const update = await collection.updateOne({_id: objectID, deleted_at: null}, {$set: {deleted_at: now}})

        return (update.result.nModified > 0)
    } finally {
        connection.close()
    }
}

const utcNow = () => {
    const utcNow = new Date().toUTCString()
    return new Date(utcNow)
}

module.exports = {
    getArticles: getArticles,
    getArticle: getArticle,
    addArticle: addArticle,
    deleteArticle: deleteArticle
}
