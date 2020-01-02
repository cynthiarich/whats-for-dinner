var firebaseConfig = {
    apiKey: "AIzaSyBufhI3DF63sZuqtKWhmNMBBeDXDFhq5bU",
    authDomain: "whats-for-dinner-e745a.firebaseapp.com",
    databaseURL: "https://whats-for-dinner-e745a.firebaseio.com",
    projectId: "whats-for-dinner-e745a",
    storageBucket: "whats-for-dinner-e745a.appspot.com",
    messagingSenderId: "290069514662",
    appId: "1:290069514662:web:e28fcfe875a8334c542767",
    measurementId: "G-F50Y95R11R"
};


// vars to hold search options
var protein = ["chicken", "turkey", "beef", "pork", "fish", "shellfish", "tofu/soy", "egg", "other beans"]
var dietOptions = ["balanced", "high-protein", "low-fat", "low-carb"];
var healthOptions = ["vegan", "vegetarian", "sugar-conscious", "peanut-free", "tree-nut-free", "alcohol-free"];
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var activities = ["Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"]

$(document).on("click", ".pref-btn", function () {
    //display the preference options for the health key
    for (var i = 0; i < protein.length; i++) {
        var input = $("<input>");
        input.addClass("uk-checkbox");
        input.attr("type", "checkbox");
        input.attr("data-protein", protein[i]);
        proteinDiv.append(input);
        proteinDiv.append($("<label>").text(protein[i]));
    }

    for (var i = 0; i < healthOptions.length; i++) {
        var input = $("<input>");
        input.addClass("uk-checkbox");
        input.attr("type", "checkbox");
        input.attr("data-health", healthOptions[i]);
        healthDiv.append(input);
        healthDiv.append($("<label>").text(healthOptions[i]));

    }

    for (var i = 0; i < dietOptions.length; i++) {
        var input = $("<input>");
        input.addClass("uk-checkbox");
        input.attr("type", "checkbox");
        input.attr("data-diet", dietOptions[i]);
        dietDiv.append(input);
        dietDiv.append($("<label>").text(dietOptions[i]));
    }
});
// var li2 = ($("<li>").text("test")); //cant do it here cause it keeps appending to this one
function createActivityList() { //only appends on first div card regardless, need to add class to button maybe and append uniquely
    // var li2 = ($("<li>")); 
    console.log("start");
    for (i = 0; i < activities.length; i++) {
        var atag = $("<a>").attr("href", "#").attr("id", "choiceDrop").text(activities[i]); //replace href later with a class to register click event?
        li2.append(atag);
    }
    console.log("end");

}

function createMenu() {
    $("#weekdisplay").empty();
    $("#weekdisplay").append($("<button>").attr("class", "uk-button uk-button-default uk-width-1-2 menu-update").text("Create a new menu"));
    for (var i = 0; i < days.length; i++) {
        var newCard = $("<div>").attr("class", "uk-card uk-card-default uk-width-1-1");
        var cardHead = $("<div>").attr("class", "uk-card-header");
        newCard.append(cardHead);
        var cardTitle = $("<h3>").attr("class", "uk-card-title").text(days[i]);
        cardHead.append(cardTitle);

        var cardBody = $("<div>").attr("class", "uk-card-body");
        newCard.append(cardBody);

        var ul = ($("<ul>").attr("uk-accordian", ""));
        var li = ($("<li>"));
        ul.append(li);

        var recipeTitle = $("<a>").attr("class", "uk-accordion-title").attr("href", "#").text("Recipe Title");
        li.append(recipeTitle);

        var recipe = $("<div>").attr("class", "uk-accordion-content");
        recipe.append($("<p>").text("This is the recipe for " + days[i]));
        li.append(recipe);
        cardBody.append(ul);
        console.log("one");
        //it would be nice to add another line/separator between the menu and activity? like put the dropdown in the footer?

        //create drop-down in body of daily menu div
        //creates button
        var activeSelect = $("<button>").attr("id", "activity").attr("class", "uk-button uk-button-primary").text("Choose Activity");
        var selections = $("<div>").attr("uk-dropdown", "");
        //iterates through activities array to create dropdown
        var ul2 = ($("<ul>").attr("class", "uk-nav uk-dropdown-nav"));
        // ul2.append(createActivityList());
        var li2 = ($("<li>"));
        var atag = $("<a>").attr("href", "#").attr("id", "choiceDrop").text(activities[i]); //replace href later with a class to register click event?
        var btag = $("<a>").attr("href", "#").attr("id", "choiceDrop").text(activities[i + 1]);
        li2.append(atag).append(btag);;
        ul2.append(li2);
        selections.append(ul2);

        //appends the button within the div
        cardBody.append(activeSelect).append(selections); //could append to cardBody OR newCard

        $("#weekdisplay").append(newCard);
        //needs to store the value from click to pass to API
        //pulls from bored api to return an activity from the dropdown selection
    }
};


//values need to pull from Edmam response
//recipe name: hits[0].recipe.label returns a string
//image: hits[0].recipe.image returns a jpg link
//ingredients: hits[0].recipe.ingredientLines returns an array of strings


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$("#open").on("click", function () {
    UIkit.modal("#sign-in").show();
    console.log(UIkit.modal("#sign-in"));
});

// $(".save-prefs").on("click", retrieveData);
$(".save-prefs").on("click", createMenu());

// $(".menu-update").on("click", Menu);