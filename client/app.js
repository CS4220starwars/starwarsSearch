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
                    let dataLength = 10
                    if (response.data.results.length < 10) {
                        dataLength = response.data.results.length
                    }
                    for (let index = 1; index < dataLength + 1; index++) {
                        const result = response.data.results[index - 1]
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
                    this.searchResultsArray = response.data.results.slice(0, dataLength)
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
            const retrievedResults = this.searchResultsArray[number - 1]
            this.currentDetails =
                `Name: ${retrievedResults.title}<br/>
                Episode: ${retrievedResults.episode_id}<br/>
                Director: ${retrievedResults.director}<br/>
                Producer: ${retrievedResults.producer}<br/>
                Release Date: ${retrievedResults.release_date}<br/>
            `
        },
        printPeople: function (number) {
            const retrievedResults = this.searchResultsArray[number - 1]
            this.currentDetails =
                `Name: ${retrievedResults.name}<br/>
                        Birth Year: ${retrievedResults.birth_year}<br/>
                        Eye Color: ${retrievedResults.eye_color}<br/>
                        Hair Color: ${retrievedResults.hair_color}<br/>
                        Gender: ${retrievedResults.gender}<br/>
                        Height: ${retrievedResults.height}<br/>
                        Weight: ${retrievedResults.mass}<br/>
                        Skin Color: ${retrievedResults.skin_color}<br/>
                        Homeworld: ${retrievedResults.homeworld}<br/>
                `
        },
        printPlanets: function (number) {
            const retrievedResults = this.searchResultsArray[number - 1]
            this.currentDetails =
                `Name: ${retrievedResults.name}<br/>
                Diameter: ${retrievedResults.diameter}<br/>
                Rotation period: ${retrievedResults.rotation_period}<br/>
                Orbital period: ${retrievedResults.orbital_period}<br/>
                Gravity: ${retrievedResults.gravity}<br/>
                Population: ${retrievedResults.population}<br/>
                Climate: ${retrievedResults.climate}<br/>
                Terrain: ${retrievedResults.terrain}<br/>
                Surface water: ${retrievedResults.surface_water}<br/>
            `
        },
        printSpecies: function (number) {
            const retrievedResults = this.searchResultsArray[number - 1]
            this.currentDetails =
                `Name: ${retrievedResults.name}<br/>
                Average Height: ${retrievedResults.average_height}<br/>
                Average Lifespan: ${retrievedResults.average_lifespan}<br/>
                Classification: ${retrievedResults.classification} <br/>
                Designation: ${retrievedResults.designation}<br/>       
                Eye Colors: ${retrievedResults.eye_colors}<br/>
                Hair Colors: ${retrievedResults.hair_colors}<br/>
                Skin Colors: ${retrievedResults.skin_colors} <br/> 
                Homeworld: ${retrievedResults.homeworld}<br/>
                Language: ${retrievedResults.language}<br/>                        
             `
        },
        printStarships: function (number) {
            const retrievedResults = this.searchResultsArray[number - 1]
            this.currentDetails =
                `Name: ${retrievedResults.name}<br/>
                Model: ${retrievedResults.model}<br/>
                Class: ${retrievedResults.starship_class}<br/>
                Manufacturer: ${retrievedResults.manufacturer}<br/>
                Length: ${retrievedResults.length} feet<br/>
                Cost: ${retrievedResults.cost_in_credits} credits <br/>
                Passengers: ${retrievedResults.passengers}<br/>
                Crew: ${retrievedResults.crew}<br/>
                Cargo: ${retrievedResults.cargo_capacity}<br/>
                Max atmospheric Pressure: ${retrievedResults.max_atmosphering_speed} km/h<br/>
                `
        },
        printVehicles: function (number) {
            const retrievedResults = this.searchResultsArray[number - 1]
            this.currentDetails =
                `Name: ${retrievedResults.name}<br/>
                Model: ${retrievedResults.model}<br/>
                Class: ${retrievedResults.vehicle_class}<br/>
                Manufacturer: ${retrievedResults.manufacturer}<br/>
                Length: ${retrievedResults.length} feet<br/>
                Cost: ${retrievedResults.cost_in_credits} credits<br/>
                Length: ${retrievedResults.max_atmosphering_speed} km/h <br/>
                Passengers: ${retrievedResults.crew}<br/>
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
