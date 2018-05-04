let starwars = new Vue({
    el: '#starwars',
    data: {
        appName: 'Star Wars Search App',
        // TODO Searched Stack
        selectedCategory: '', // Category selected in the <select> tag
        searchQuery: '', // Search query the user inputs
        categories: [],
        searchResults: []
    },
    methods: {
        searchApi: function () {
            axios.get(`http://localhost:8080/search?category=${this.selectedCategory}&query=${this.searchQuery}`)
                .then(response => {
                    response.data.results.forEach((result) => {
                        if (result.name != null)
                            this.searchResults.push(result.name)
                        else
                            this.searchResults.push(result.title)
                    })
                })
        },
        clear: function () {
            this.searchResults = []
        }
    },
    mounted() {
        axios.get('http://localhost:8080/categories', {
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => {
            for (const key in response.data) {
                this.categories.push(key)
            }
        }).catch((err) => {
            alert(err)
        })

    }
})
