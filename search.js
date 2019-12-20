//https://api.edamam.com/search?q=chicken&app_id=3e6eb808&app_key=320b9c0c25d10bd3661f72afc26368db&to=2
var apiIdEdamam = "3e6eb808"; // api id for edamam
var apikeyEdamam = "320b9c0c25d10bd3661f72afc26368db"; // api key for edamam
var recipes; // array for the recipie info

// loops through the array information received from the user
function loopArray(data)
{
    var url = "";

    for (var i = 0; i < data.length; i++)
    {
        url += data[i];

        // adds a + sign after each element of the array other than the final element
        if (i + 1 < data.length)
        {
            url += "+"
        }
    }
    
    return url;
}

// search function calling edamam to get recipes
function search()
{
    var queryURL = "https://api.edamam.com/search?";
    retrieveData(); // calls function to get user input

    queryURL += "q=";

    queryURL += loopArray(interestedFoods); 
    queryURL += "&app_id=" + apiIdEdamam + "&app_key=" + apikeyEdamam;

    /// adds data to url if there are element of dietOptionsUsed
    if (dietOptionsUsed.length > 0)
    {
        queryURL += "&diet=";
        queryURL += loopArray(dietOptionsUsed);
    }

    /// adds data to url if there are element of healthOptionsUsed
    if (healthOptionsUsed.length > 0)
    {
        queryURL += "&health=";
        queryURL += loopArray(healthOptionsUsed);
    }

    // gets the first 10 results from edamam
    queryURL += "&to=10";

    $.ajax(
        {
            url: queryURL,
            method: "GET"
        }).then(function(response)
        {

            hits = response.hits;
            console.log(hits);
        });
}

search();