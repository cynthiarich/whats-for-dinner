//https://api.edamam.com/search?q=chicken&app_id=3e6eb808&app_key=320b9c0c25d10bd3661f72afc26368db&to=2
var apiIdEdamam = "3e6eb808"; // api id for edamam
var apikeyEdamam = "320b9c0c25d10bd3661f72afc26368db"; // api key for edamam
var recipes = []; // array for the recipie info

// loops through the array information received from the user
function loopArray(data)
{
    var url = "";

    for (var i = 1; i < data.length; i++)
    {
        url += "&" + data[0] + "=" + data[i];
    }
    
    return url;
}

// search function calling edamam to get recipes
function search()
{
    for (var i = 0; i < interestedFoods.length; i++)
    {
        var queryURL = "https://api.edamam.com/search?q=";

        queryURL += interestedFoods[i];
        queryURL += "&app_id=" + apiIdEdamam + "&app_key=" + apikeyEdamam;

        /// adds data to url if there are element of dietOptionsUsed
        if (dietOptionsUsed.length > 1)
        {
            queryURL += loopArray(dietOptionsUsed);
        }

        /// adds health to url if there are element of healthOptionsUsed
        if (healthOptionsUsed.length > 1)
        {
            queryURL += loopArray(healthOptionsUsed);
        }

        // gets the first 10 results from edamam
        queryURL += "&to=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response)
        {
            var hits = response.hits;
            
            for (var j = 0; j < hits.length; j++)
            {
                recipes.push(hits[j]);
            }

            console.log(recipes);
        });
    }
}