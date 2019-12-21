
//bored API - need to pass in number of participants (from preferences), pull from the dropdown the activity type

var participants = 1; //get val from preferences, How Many People Eating
var activity = "Education"; //pull from activity dropdown

$("#activity").on("click", function () { //will have to change event to pull from drop-down?
    var queryURL = "http://www.boredapi.com/api/activity?participants=" + participants + "&type=" + activity.toLowerCase();
    console.log(queryURL);

    // Runs AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (!response.participants) {//enters if activity returns as undefined and re-evaluates for no particpant parameters
                var queryURL2 = "http://www.boredapi.com/api/activity?type=" + activity.toLowerCase();
                console.log(queryURL2);
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log("no participant parameter: ", response.activity);
                        console.log("Min # participants: " + response.participants);
                    })
            }
            else {
                console.log("particpant parameter: ", response.activity);
                console.log("Min # participants: " + response.participants);
            }
        })
});