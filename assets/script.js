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
var activities = ["Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"];
var lastSearch;
var recipesAvail = [];
var lastRecipes = [];
var searchResults = [];

function initApp() {
    //get previous responses from local storage
    if (localStorage.getItem("interestedFoods") !== null) {
        interestedFoods = JSON.parse(localStorage.getItem("interestedFoods"));
    }
    if (localStorage.getItem("dietOptionsUsed") !== null) {
        dietOptionsUsed = JSON.parse(localStorage.getItem("dietOptionsUsed"));
    }
    if (localStorage.getItem("healthOptionsUsed") !== null) {
        healthOptionsUsed = JSON.parse(localStorage.getItem("healthOptionsUsed"));
    }
    if (localStorage.getItem("lastSearch") !== null) {
        console.log("last search was: " + localStorage.getItem("lastSearch"));
        lastSearch = localStorage.getItem("lastSearch");
        if (moment(lastSearch).isBefore(moment().subtract(7, 'days'))) {
            console.log("let's search again");
            searchEdamam();
        }
        else {
            lastRecipes = JSON.parse(localStorage.getItem("lastRecipes"));
            console.log("let's use our previous " + lastRecipes.length + " search results: " + lastRecipes);
            createPrevMenu();
        }
    }
}

$(document).on("click", ".pref-btn", function () {
    proteinDiv.empty();
    healthDiv.empty();
    dietDiv.empty();

    //display the preference options for the health key
    for (var i = 0; i < protein.length; i++) {
        var label = $("<label>");
        proteinDiv.append(label);
        var input = $("<input>");
        input.addClass("uk-checkbox");
        input.addClass("uk-checkbox modal-checkbox");
        input.attr("type", "checkbox");
        input.attr("data-protein", protein[i]);
        if (interestedFoods.indexOf(protein[i]) !== -1) {
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
        if (healthOptionsUsed.indexOf(healthOptions[i]) !== -1) {
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
        if (dietOptionsUsed.indexOf(dietOptions[i]) !== -1) {
            input.attr("checked", "");
        }
        label.append(input);
        label.append(dietOptions[i]);
        label.append($("<br>"));
    }
});

function createMenuFramework() {
    //clear previous display
    $("#weekdisplay").empty();
    //add the button to refresh the menu
    $("#weekdisplay").append($("<button>").attr("class", "uk-button uk-button-default uk-align-center uk-width-1-2 menu-update").text("Refresh my menu"));

}

function makeCard(data, day) {
    var newCard = $("<div>").attr("class", "uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin").attr("uk-grid", "").attr("uk-scrollspy", "cls: uk-animation-slide-right; repeat: true");
    
    //add image of recipe
    var picDiv = $("<div>").attr("class", "uk-card-media-left uk-cover-container");
    picDiv.append($("<img>").attr("src", data.image).attr("alt", data.label).attr("uk-cover", ""));
    picDiv.append($("<canvas>").attr("width", "600").attr("height", "400"));
    newCard.append(picDiv);
    
    //add body of card
    var simpDiv = $("<div>");
    var cardBody = $("<div>").attr("class", "uk-card-body");
    
    //add card title
    var cardTitle = $("<h3>").attr("class", "uk-card-title").text(day + ": " + data.label);
    var recipeSrc = $("<p>").attr("class", "uk-text-meta uk-margin-remove-top").html("See the full recipe at: <a href=" + data.url + ">" + data.source + "</a>");
    
    //set up the ul for the ingredient list
    var ul = $("<ul>").attr("class", "uk-list uk-list-divider");
    //add ingredients
    for (var j = 0; j < data.ingredientLines.length; j++) {
        ul.append($("<li>").text(data.ingredientLines[j]));
    }

    cardBody.append(cardTitle);
    cardBody.append(recipeSrc);
    cardBody.append(ul);
    simpDiv.append(cardBody);
    newCard.append(simpDiv);
    $("#weekdisplay").append(newCard);
}

function createNewMenu(response) {

    createMenuFramework();
    for (var h = 0; h < searchResults.length; h++) {
        recipesAvail.push(h);
    }
    //loop through the response JSON and add the recipes
    for (var i = 0; i < days.length; i++) {
        
        //get random recipe from available options
        var arrPos = Math.floor(Math.random() * recipesAvail.length);
        var recipeNum = recipesAvail[arrPos];
        recipesAvail.splice(arrPos, 1);

        //create card div
        makeCard(searchResults[recipeNum], days[i]);
        lastRecipes.push(searchResults[recipeNum]);
    }
    localStorage.setItem("lastRecipes", JSON.stringify(lastRecipes));
};

function createPrevMenu(){
    createMenuFramework();
    for (var i = 0; i < days.length; i++) {
        makeCard(lastRecipes[i], days[i]);

    }
}


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
initApp();

$("#open").on("click", function () {
    UIkit.modal("#sign-in").show();
    console.log(UIkit.modal("#sign-in"));
});

$(".save-prefs").on("click", retrieveData);

$(".menu-update").on("click", searchEdamam);