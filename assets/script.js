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
var shoppingList = [];
var lastActivities = [];
var activitySearchResults = [];

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
    if (localStorage.getItem("activitiesUsed") !== null) {
        activitiesUsed = JSON.parse(localStorage.getItem("activitiesUsed"));
    }
    if (localStorage.getItem("lastSearch") !== null) {
        console.log("last search was: " + localStorage.getItem("lastSearch"));
        lastSearch = localStorage.getItem("lastSearch");
        if (moment(lastSearch).isBefore(moment().subtract(7, 'days'))) {
            console.log("let's search again");
            searchEdamam();
            searchActivity();
        }
        else {
            lastRecipes = JSON.parse(localStorage.getItem("lastRecipes"));
            lastActivities = JSON.parse(localeStorage.getItmes("lastActivities")) ;
            console.log("let's use our previous " + lastRecipes.length + " search results: " + lastRecipes);
            createPrevMenu();
        }
    }
    if (localStorage.getItem("shoppingList") !== null) {
        shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    }
}

$(document).on("click", ".pref-btn", function () {
    proteinDiv.empty();
    healthDiv.empty();
    dietDiv.empty();
    activityDiv.empty();

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

    for (var i = 0; i < activities.length; i++) {
        var label = $("<label>");
        activityDiv.append(label);
        var input = $("<input>");
        input.addClass("uk-checkbox");
        input.addClass("uk-checkbox modal-checkbox");
        input.attr("type", "checkbox");
        input.attr("data-activity", activities[i]);
        if (activitiesUsed.indexOf(activities[i]) !== -1) { //need to add activitiesUsed
            input.attr("checked", "");
        }
        label.append(input);
        label.append(activities[i]);
        label.append($("<br>"));
    }
});


function createMenuFramework() {
    //clear previous display
    $("#weekdisplay").empty();
    //add the button to refresh the menu
    $("#weekdisplay").append($("<button>").attr("class", "uk-button uk-button-default uk-align-center uk-width-1-2 menu-update").text("Refresh my menu"));

}

function makeCard(data, activity, day) {

    var newCard = $("<div>").attr("class", "uk-card uk-card-default uk-width-1-1@m uk-margin-medium").attr("uk-scrollspy", "cls: uk-animation-slide-right");

    //make the card header
    var cardHead = $("<div>").attr("class", "uk-card-header card-topper uk-light");
    var headGrid = $("<div>").attr("class", "uk-grid-small uk-flex-middle").attr("uk-grid", "");
    var imgCont = $("<div>").attr("class", "uk-width-auto");
    imgCont.append($("<img>").attr("class", "uk-border-circle").attr("width", "100").attr("height", "100").attr("src", data.image).attr("alt", data.label));
    var headerTextDiv = $("<div>").attr("class", "uk-width-expand");
    var headerTitle = $("<h3>").attr("class", "uk-card-title uk-margin-remove-bottom").text(day + ": " + data.label);
    headerTitle.append($("<button>").attr("class", "uk-icon-button uk-margin-small-left favorite-btn").attr("recipe-data", data.uri).attr("uk-tooltip", "title: Save to favorites; pos: top").attr("uk-icon", "heart"));
    headerTitle.append($("<button>").attr("class", "uk-icon-button uk-margin-small-left swap-btn").attr("recipe-data", data.uri).attr("uk-tooltip", "title: Swap this recipe; pos: top").attr("uk-icon", "refresh"));
    headerTextDiv.append(headerTitle);
    headerTextDiv.append($("<p>").attr("class", "uk-text-meta uk-margin-remove-top").html("See the full recipe at: <a href=" + data.url + ">" + data.source + "</a>"));
    headGrid.append(imgCont);
    headGrid.append(headerTextDiv);
    cardHead.append(headGrid);
    newCard.append(cardHead);

    //add body of card
    var cardBody = $("<div>").attr("class", "uk-card-body");
    //set up the ul for the ingredient list
    var ul = $("<ul>").attr("class", "uk-list uk-list-divider");
    //add ingredients
    for (var j = 0; j < data.ingredientLines.length; j++) {
        var li = $("<li>").text(data.ingredientLines[j]);
        ul.append(li);
        li.prepend($("<button>").attr("data-ingred", data.ingredientLines[j]).attr("class", "uk-icon-button uk-margin-small-left shopping-btn").attr("uk-tooltip", "title: Add to shopping list; pos: top").attr("uk-icon", "cart"));
    }
    cardBody.append(ul);
    newCard.append(cardBody);

    //add footer of card
    var cardFooter = $("<div>").attr("class", "uk-card-footer card-footer");
    cardFooter.append($("<p>").text("Dinner Activity: " + activity));

    newCard.append(cardFooter);
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
        makeCard(searchResults[recipeNum], activitySearchResults[i], days[i]);
        lastRecipes.push(searchResults[recipeNum]);
    }
    localStorage.setItem("lastRecipes", JSON.stringify(lastRecipes));
};

function createPrevMenu(){
    createMenuFramework();
    for (var i = 0; i < days.length; i++) {
        makeCard(lastRecipes[i], lastActivities[i], days[i]);
    }
}

function saveFavorites(){
    console.log("Save this to favorites: ", $(this).attr("recipe-data"));
}

function swapRecipe() {
    console.log("Swap this recipe: ", $(this).attr("recipe-data"));
}

function createList(){
    console.log("Add this ingredient to the shopping list: ", $(this).attr("data-ingred"));
    shoppingList.push($(this).attr("data-ingred"));
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

function emptyList(){
    $("#my-shopping-list").empty();
    shoppingList = [];
    localStorage.removeItem("shoppingList");
}


$(document).on("click", ".shop-list-btn", function() {
    //empty the shopping list div
    $("#my-shopping-list").empty();
    console.log(shoppingList);
    //loop through to create li's
    if (shoppingList.length >= 1){
        for (var i = 0; i < shoppingList.length; i++){
            $("#my-shopping-list").append($("<li>").text(shoppingList[i]));
        }
    }
    else {
        $("#my-shopping-list").append($("<li>").text("Your shopping list is currently empty. Select items from the weekly menu to add to your shopping list."));
    }

});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
initApp();

$("#open").on("click", function () {
    UIkit.modal("#sign-in").show();
    console.log(UIkit.modal("#sign-in"));
});

$(".save-prefs").on("click", retrieveData);

$(".menu-update").on("click", searchEdamam);

$(".favorite-btn").on("click", saveFavorites);

$(".swap-btn").on("click", swapRecipe);

$(document).on("click", ".shopping-btn", createList);

$(".empty-list").on("click", emptyList);
