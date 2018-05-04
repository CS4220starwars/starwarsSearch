let starwars = new Vue({
    el: '#starwars',
    data: {
        appName: 'Star Wars Search App',
        // TODO Searched Stack
        selectedCategory: '', // Category selected in the <select> tag
        searchQuery: '', // Search query the user inputs
        searchResults: ''
    },
    methods: {
        searchApi: function () {
            console.log("hello")
            axios.get(`http://localhost:8080/search?category=${this.selectedCategory}&query=${this.searchQuery}`)
                .then(response => {
                    console.log(response.data)
                    this.searchResults=response.data
                })
        },
        clear: function () {
            this.deck = {}
            this.numberOfCards = ''
            this.shuffle = ''
            this.selectedCards = []
        }
    }
})
