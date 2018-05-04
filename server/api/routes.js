const
    starwars = require('starwarsapi'),
    express = require('express'),
    router = express.Router()

module.exports = () => {

    router.get('/search', (req, res) => {
        const { category = "people", query = "luke" } = req.query
        starwars.search(category, query).then((results) => {
            res.send(results);
        })
    })

    router.get('/categories', (req, res) => {
        starwars.getCategories().then((results) => {
            res.send(results);
        })
    })

    return router
}

