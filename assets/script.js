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
    proteinDiv.empty();
    healthDiv.empty();
    dietDiv.empty();
    //get previous responses from local storage
    if (localStorage.getItem("interestedFoods") !== null){
        interestedFoods = JSON.parse(localStorage.getItem("interestedFoods"));
    }
    if (localStorage.getItem("dietOptionsUsed") !== null){
        dietOptionsUsed = JSON.parse(localStorage.getItem("dietOptionsUsed"));
    }
    if (localStorage.getItem("healthOptionsUsed") !== null){
        healthOptionsUsed = JSON.parse(localStorage.getItem("healthOptionsUsed"));
    }
    if (localStorage.getItem("numServings") !== null){
        numServings = localStorage.getItem("numServings");
    }
    //add previously selected number of servings
    $('.servings').val(numServings);
    //display the preference options for the health key
    for (var i = 0; i < protein.length; i++) {
        var label = $("<label>");
        proteinDiv.append(label);
        var input = $("<input>");
        input.addClass("uk-checkbox");
        input.addClass("uk-checkbox modal-checkbox");
        input.attr("type", "checkbox");
        input.attr("data-protein", protein[i]);
        if (interestedFoods.indexOf(protein[i]) !== -1){
            input.attr("checked", "");
        }
        label.append(input);
        label.append(protein[i]);
        label.append($("<br>"));
    }

    for (var i = 0; i < healthOptions.length; i++) {
        var label = $("<label>");
        healthDiv.append(label);
        var input = $("<input>");
        input.addClass("uk-checkbox");
        input.addClass("uk-checkbox modal-checkbox");
        input.attr("type", "checkbox");
        input.attr("data-health", healthOptions[i]);
        if (healthOptionsUsed.indexOf(healthOptions[i]) !== -1){
            input.attr("checked", "");
        }
        label.append(input);
        label.append(healthOptions[i]);
        label.append($("<br>"));

    }

    for (var i = 0; i < dietOptions.length; i++) {
        var label = $("<label>");
        dietDiv.append(label);
        var input = $("<input>");
        input.addClass("uk-checkbox");
        input.addClass("uk-checkbox modal-checkbox");
        input.attr("type", "checkbox");
        input.attr("data-diet", dietOptions[i]);
        if (dietOptionsUsed.indexOf(dietOptions[i]) !== -1){
            input.attr("checked", "");
        }
        label.append(input);
        label.append(dietOptions[i]);
        label.append($("<br>"));
    }
});

function createMenu(){
    $("#weekdisplay").empty();
    $("#weekdisplay").append($("<button>").attr("class", "uk-button uk-button-default uk-width-1-2 menu-update").text("Create a new menu"));
    for (var i = 0; i < days.length; i++){
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
        //create drop-down in body of daily menu div
        cardBody.append($("<button>").attr("id", "activity").text("Hold For Activity Select"));
        
        $("#weekdisplay").append(newCard);
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

$(".save-prefs").on("click", retrieveData);

$(".menu-update").on("click", createMenu);