const db = require('../db')

const getArticles = async () => {
    const connection = await db.getConnection()

    try {
        const collection = connection.db('blog').collection('articles')
        // TODO add projection
        const cursor = collection.find({deleted_at: null})

        const articles = []
        await cursor.forEach((doc) => {
            articles.push({
                id: doc._id,
                title: doc.title,
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
    const now = new Date()
    const articleData = {
        title: data.title,
        short_description: data.short_description,
        long_description: data.long_description,
        authors: data.authors,
        created_at: now,
        updated_at: now,
        deleted_at: null
    }
    
    const connection = await db.getConnection()
    try {
        const collection = connection.db('blog').collection('articles')
        
        const insert = await collection.insertOne(articleData)
        return insert.insertedId
    } finally {
        connection.close()
    }
}

const updateArticle = async (id, data) => {
    const now = new Date()
    const articleData = {
        title: data.title,
        short_description: data.short_description,
        long_description: data.long_description,
        authors: data.authors,
        updated_at: now
    }

    const connection = await db.getConnection()
    try {
        const collection = connection.db('blog').collection('articles')
        const objectID = db.getObjectId(id)

        const update = await collection.updateOne({_id: objectID, deleted_at: null}, {$set: articleData})

        return (update.result.nModified > 0)
    } finally {
        connection.close()
    }
}

const deleteArticle = async (id) => {
    const connection = await db.getConnection()
    try {
        const collection = connection.db('blog').collection('articles')
        const objectID = db.getObjectId(id)
        const now = new Date()

        const update = await collection.updateOne({_id: objectID, deleted_at: null}, {$set: {deleted_at: now}})

        return (update.result.nModified > 0)
    } finally {
        connection.close()
    }
}

module.exports = {
    getArticles: getArticles,
    getArticle: getArticle,
    addArticle: addArticle,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle
}
