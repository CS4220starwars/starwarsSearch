const
    starwars = require('starwarsapi'),
    express = require('express'),
    router = express.Router()

module.exports = () => {

    // localhost:8080/api/draw/?number=n&shuffle=true
    router.get('/search', (req, res) => {
        const { category = "people", query = "luke" } = req.query
        starwars.search(category, query).then((results)=>{
            res.json(results);
        })
    })


    return router
}

