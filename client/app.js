const searchComponent = {
    template: ` <div @click="clickEvent">
                     <span v-html="content.name"></span>
                     <br/>
                </div>`,
    props: ['content'],
    methods: {
        clickEvent() {
            this.$emit('click')
        }
    }
}

let starwars = new Vue({
    el: '#starwars',
    data: {
        appName: 'Star Wars Search App',
        // TODO Searched Stack
        selectedCategory: '', // Category selected in the <select> tag
        searchQuery: '', // Search query the user inputs
        categories: [],
        searchResults: [],
        searchResultsArray: '',
        isViewingDetails: false,
        currentDetails: ''

    },
    methods: {
        searchApi: function () {
            axios.get(`http://localhost:8080/search?category=${this.selectedCategory}&query=${this.searchQuery}`)
                .then(response => {
                    let index = 1
                    response.data.results.forEach((result) => {
                        const newResultObj = {}
                        if (result.name != null) {
                            newResultObj.name = result.name
                            newResultObj.index = index
                            this.searchResults.push(newResultObj)
                        }
                        else { // To handle film titles instead of character names
                            newResultObj.name = result.title
                            newResultObj.index = index
                            this.searchResults.push(newResultObj)
                        }
                        index++;
                    })
                    this.searchResultsArray = response.data.results
                })
        },
        viewDetails: function (number) {
            this.currentDetails= this.searchResultsArray[number-1]
            this.isViewingDetails=true;
        },
        clear: function () {
            this.searchResults = []
        },
        reset: function (){
            this.isViewingDetails=false;
            this.searchResults= []
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
    },
    components: {
        'search-component': searchComponent
    }
})
