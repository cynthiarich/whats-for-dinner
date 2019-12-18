//https://api.edamam.com/search?q=chicken&app_id=3e6eb808&app_key=320b9c0c25d10bd3661f72afc26368db&to=2
var apiIdEdamam = "3e6eb808";
var apikeyEdamam = "320b9c0c25d10bd3661f72afc26368db";

function loopArray(url, data)
{
    console.log(data);
    for (var i = 0; i < data.length; i++)
    {
        url += data[i];
        if (i + 1 < data.length)
        {
            url += "+"
        }
    }
    
    return url;
}

function search()
{
    var queryURL = "https://api.edamam.com/search?";
    console.log(queryURL);
    retrieveData();
    console.log(interestedFoods);
    queryURL += "q=";

    queryURL = loopArray(queryURL, interestedFoods);
    queryURL += "&app_id=" + apiIdEdamam + "&app_key=" + apikeyEdamam;
    console.log(queryURL);
    

    if (dietOptionsUsed.length > 0)
    {
        queryURL += "&diet=";
        queryURL =loopArray(queryURL, dietOptionsUsed);
    }

    if (healthOptionsUsed.length > 0)
    {
        queryURL += "&health=";
        queryURL = loopArray(queryURL, healthOptionsUsed);
    }

    queryURL += "&to=2";

    $.ajax(
        {
            url: queryURL,
            method: "GET"
        }).then(function(response)
        {
            console.log(response);
            $("<div>").text("check console");
        });
}

search();