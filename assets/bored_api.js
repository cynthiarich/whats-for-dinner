
//bored API - need to pass in number of participants (from preferences), pull from the dropdown the activity type

function searchActivity() {
    activitySearchResults = [];
    if (activitiesUsed.length == 0){
        console.log("giving them all the activities")
        for (var p = 0; p < activities.length; p++){
            //if they didn't pick any activities then show activities from all categories
            activitiesUsed.push(activities[p]);
        }
    }

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
            localStorage.setItem("lastActivities", JSON.stringify(activitySearchResults));
            console.log("=====show search result array======")
            console.log(activitySearchResults);
        });
    }
}


