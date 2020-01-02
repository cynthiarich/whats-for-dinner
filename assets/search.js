//https://api.edamam.com/search?q=chicken&app_id=3e6eb808&app_key=320b9c0c25d10bd3661f72afc26368db&to=2
var apiIdEdamam = "3e6eb808"; // api id for edamam
var apikeyEdamam = "320b9c0c25d10bd3661f72afc26368db"; // api key for edamam
var recipeMax = 20;
var recipes = []; // array for the recipie info

// loops through the array information received from the user
function loopArray(str, data)
{
    var url = "";

    for (var i = 0; i < data.length; i++)
    {
        url += "&" + str + "=" + data[i];
    }
    
    return url;
}

// search function calling edamam to get recipes
function searchEdamam()
{
    for (var i = 0; i < interestedFoods.length; i++)
    {
        var queryURL = "https://api.edamam.com/search?q=";

        queryURL += interestedFoods[i];
        queryURL += "&app_id=" + apiIdEdamam + "&app_key=" + apikeyEdamam;

        /// adds data to url if there are element of dietOptionsUsed
        if (dietOptionsUsed.length > 0)
        {
            queryURL += loopArray("diet", dietOptionsUsed);
        }

        /// adds health to url if there are element of healthOptionsUsed
        if (healthOptionsUsed.length > 0)
        {
            queryURL += loopArray("health", healthOptionsUsed);
        }

        // gets the first 20 results from edamam
        queryURL += "&to=" + recipeMax;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response)
        {
            for (var i = 0; i < response.hits.length; i++){
                recipesAvail.push(i);
            }
            console.log(response);
            createMenu(response);
        });
    }
}