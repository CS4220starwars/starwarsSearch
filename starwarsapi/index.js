const
     config = require('./config'),
     superagent = require('superagent')


const _fetch = (command) => {
    return superagent.get(`${config.url}${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.search = (category,query) => {
        return _fetch(`${category}/?search=${query}`)
}

exports.getbyid = (category, id) => {
    return _fetch(`${category}/${id}`)
}

exports.getCategories = () =>{
    return _fetch()
}

