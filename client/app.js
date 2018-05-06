const searchComponent = {
    template: ` <div @click="clickEvent">
                     <span v-html="data.name"></span>
                     <br/>
                </div>`,
    props: ['data'],
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
                    let resultLengthLimit = 10
                    if (response.data.results.length < 10) {
                        resultLengthLimit = response.data.results.length
                    }
                    for (let index = 0; index < resultLengthLimit; index++) {
                        const result = response.data.results[index]
                        const newResultObj = {}
                        if (result.name != null) {
                            newResultObj.name = result.name
                        }
                        else { // To handle film titles instead of character names
                            newResultObj.name = result.title
                        }
                        newResultObj.index = index
                        newResultObj.category = this.selectedCategory
                        this.searchResults.push(newResultObj)
                    }
                    this.searchResultsArray = response.data.results.slice(0, resultLengthLimit)
                })
        },
        viewDetails: function (number, category) {
            this.isViewingDetails = true;
            switch (category) {
                case "films":  // FILMS ------------------
                    this.printFilms(number)
                    break;
                case "people": // PEOPLE --------------------------------
                    this.printPeople(number)
                    break;
                case "planets": //PLANETS
                    this.printPlanets(number)
                    break;
                case "species":   //SPECIES -----------------------------------
                    this.printSpecies(number)
                    break;
                case "starships":  // STARSHIPS     ---------------------
                    this.printStarships(number)
                    break;
                case "vehicles": // VEHICLES ---------
                    this.printVehicles(number)
                    break;
                default:
                    console.log(object);
                    break;
            }
        },
        printFilms: function (number) {
            const retrievedResults = this.searchResultsArray[number]
            this.currentDetails =
                `&nbsp;&nbsp;Name: ${retrievedResults.title}<br/>
                &nbsp;&nbsp;Episode: ${retrievedResults.episode_id}<br/>
                &nbsp;&nbsp;Director: ${retrievedResults.director}<br/>
                &nbsp;&nbsp;Producer: ${retrievedResults.producer}<br/>
                &nbsp;&nbsp;Release Date: ${retrievedResults.release_date}<br/>
            `
        },
        printPeople: function (number) {
            const retrievedResults = this.searchResultsArray[number]
            this.currentDetails =
                `&nbsp;&nbsp;Name: ${retrievedResults.name}<br/>
                &nbsp;&nbsp;Birth Year: ${retrievedResults.birth_year}<br/>
                &nbsp;&nbsp;Eye Color: ${retrievedResults.eye_color}<br/>
                &nbsp;&nbsp;Hair Color: ${retrievedResults.hair_color}<br/>
                &nbsp;&nbsp;Gender: ${retrievedResults.gender}<br/>
                &nbsp;&nbsp;Height: ${retrievedResults.height}<br/>
                &nbsp;&nbsp;Weight: ${retrievedResults.mass}<br/>
                &nbsp;&nbsp;Skin Color: ${retrievedResults.skin_color}<br/>
                &nbsp;&nbsp;Homeworld: ${retrievedResults.homeworld}<br/>
                `
        },
        printPlanets: function (number) {
            const retrievedResults = this.searchResultsArray[number]
            this.currentDetails =
                `&nbsp;&nbsp;Name: ${retrievedResults.name}<br/>
                &nbsp;&nbsp;Diameter: ${retrievedResults.diameter}<br/>
                &nbsp;&nbsp;Rotation period: ${retrievedResults.rotation_period}<br/>
                &nbsp;&nbsp;Orbital period: ${retrievedResults.orbital_period}<br/>
                &nbsp;&nbsp;Gravity: ${retrievedResults.gravity}<br/>
                &nbsp;&nbsp;Population: ${retrievedResults.population}<br/>
                &nbsp;&nbsp;Climate: ${retrievedResults.climate}<br/>
                &nbsp;&nbsp;Terrain: ${retrievedResults.terrain}<br/>
                &nbsp;&nbsp;Surface water: ${retrievedResults.surface_water}<br/>
            `
        },
        printSpecies: function (number) {
            const retrievedResults = this.searchResultsArray[number]
            this.currentDetails =
                `&nbsp;&nbsp;Name: ${retrievedResults.name}<br/>
                &nbsp;&nbsp;Average Height: ${retrievedResults.average_height}<br/>
                &nbsp;&nbsp;Average Lifespan: ${retrievedResults.average_lifespan}<br/>
                &nbsp;&nbsp;Classification: ${retrievedResults.classification} <br/>
                &nbsp;&nbsp;Designation: ${retrievedResults.designation}<br/>       
                &nbsp;&nbsp;Eye Colors: ${retrievedResults.eye_colors}<br/>
                &nbsp;&nbsp;Hair Colors: ${retrievedResults.hair_colors}<br/>
                &nbsp;&nbsp;Skin Colors: ${retrievedResults.skin_colors} <br/> 
                &nbsp;&nbsp;Homeworld: ${retrievedResults.homeworld}<br/>
                &nbsp;&nbsp;Language: ${retrievedResults.language}<br/>                        
             `
        },
        printStarships: function (number) {
            const retrievedResults = this.searchResultsArray[number]
            this.currentDetails =
                `&nbsp;&nbsp;Name: ${retrievedResults.name}<br/>
                &nbsp;&nbsp;Model: ${retrievedResults.model}<br/>
                &nbsp;&nbsp;Class: ${retrievedResults.starship_class}<br/>
                &nbsp;&nbsp;Manufacturer: ${retrievedResults.manufacturer}<br/>
                &nbsp;&nbsp;Length: ${retrievedResults.length} feet<br/>
                &nbsp;&nbsp;Cost: ${retrievedResults.cost_in_credits} credits <br/>
                &nbsp;&nbsp;Passengers: ${retrievedResults.passengers}<br/>
                &nbsp;&nbsp;Crew: ${retrievedResults.crew}<br/>
                &nbsp;&nbsp;Cargo: ${retrievedResults.cargo_capacity}<br/>
                &nbsp;&nbsp;Max atmospheric Pressure: ${retrievedResults.max_atmosphering_speed} km/h<br/>
                `
        },
        printVehicles: function (number) {
            const retrievedResults = this.searchResultsArray[number]
            this.currentDetails =
                `&nbsp;&nbsp;Name: ${retrievedResults.name}<br/>
                &nbsp;&nbsp;Model: ${retrievedResults.model}<br/>
                &nbsp;&nbsp;Class: ${retrievedResults.vehicle_class}<br/>
                &nbsp;&nbsp;Manufacturer: ${retrievedResults.manufacturer}<br/>
                &nbsp;&nbsp;Length: ${retrievedResults.length} feet<br/>
                &nbsp;&nbsp;Cost: ${retrievedResults.cost_in_credits} credits<br/>
                &nbsp;&nbsp;Length: ${retrievedResults.max_atmosphering_speed} km/h <br/>
                &nbsp;&nbsp;Passengers: ${retrievedResults.crew}<br/>
                 `
        },
        clear: function () {
            this.searchResults = []
        },
        reset: function () {
            this.isViewingDetails = false;
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
    },
    components: {
        'search-component': searchComponent
    }
})
