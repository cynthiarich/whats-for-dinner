//https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_685bdc43a429d5f4886e9c26d6b72e6b&app_id=3e6eb808&app_key=320b9c0c25d10bd3661f72afc26368db
var apiIdEdamam = "3e6eb808"; // api id for edamam
var apikeyEdamam = "320b9c0c25d10bd3661f72afc26368db"; // api key for edamam
var recipeMax = 20;

// loops through the array information received from the user
function loopArray(str, data) {
    var url = "";

    for (var i = 0; i < data.length; i++) {
        url += "&" + str + "=" + data[i];
    }

    return url;
}

// search function calling edamam to get a list of recipes
function searchEdamam() {
    searchResults = [];
    for (var i = 0; i < interestedFoods.length; i++) {
        var queryURL = "https://api.edamam.com/search?q=";
        var fromRand = Math.floor(Math.random() * 10);
        var toRand = fromRand + recipeMax
        queryURL += interestedFoods[i];
        queryURL += "&app_id=" + apiIdEdamam + "&app_key=" + apikeyEdamam;

        /// adds data to url if there are element of dietOptionsUsed
        if (dietOptionsUsed.length > 0) {
            queryURL += loopArray("diet", dietOptionsUsed);
        }

        /// adds health to url if there are element of healthOptionsUsed
        if (healthOptionsUsed.length > 0) {
            queryURL += loopArray("health", healthOptionsUsed);
        }

        // gets the first x results from edamam
        queryURL += "&from=" + fromRand;
        queryURL += "&to=" + toRand;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < response.hits.length; i++) {
                searchResults.push(response.hits[i].recipe);
            }
            console.log(searchResults);
            lastSearch = moment();
            localStorage.setItem("lastSearch", lastSearch);
            lastRecipes = [];
            createNewMenu();
        });
    }
}