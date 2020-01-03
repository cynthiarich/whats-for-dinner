
//bored API - need to pass in number of participants (from preferences), pull from the dropdown the activity type

function searchActivity() {
    activitySearchResults = [];

    //update this to push to the activity array for 7 days of activities
    for (var i = 0; i < 7; i++) {

        var h = Math.floor(Math.random() * activitiesUsed.length); //gives us a random number within array
        var queryURL = "http://www.boredapi.com/api/activity?type=" + activitiesUsed[h].toLowerCase();

        // Runs AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log("activity: ", response.activity);
            activitySearchResults.push(response.activity);
        });
    }
    console.log(activitySearchResults);
}


