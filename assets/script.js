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

var proteinDiv = $(".protein");
var dietDiv = $(".diet-preference");
var healthDiv = $(".health-preference");

$(document).on("click", "#meal-prefs", function () {

})

//makes the preference options for the health key
// var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
// for (i=0; i<days.length; i++) {
//     $(".daily").append($("<div></div>").addClass(".uk-card uk-card-primary").text(days[i]));
// }  

//makes the preference options for the health key
var protein = ["chicken", "turkey", "beef", "pork", "fish", "shellfish", "tofu/soy", "egg", "other beans"]
for (var i = 0; i < protein.length; i++)
{
    var input = $("<input>");
    input.addClass("uk-checkbox");
    input.attr("type", "checkbox");
    
    input.attr("data-protein", protein[i]);

    proteinDiv.append(input);
    proteinDiv.append($("<label>").text(protein[i]));
}  

//makes the preference options for the health key
// options permitted for the diet search parameter
var dietOptions = ["balanced", "high-protein", "low-fat", "low-carb"]; 
// options permitted for the health search parameter
var healthOptions = ["vegan", "vegetarian", "sugar-conscious", "peanut-free", "tree-nut-free", "alcohol-free"]; 

for (var i = 0; i < healthOptions.length; i++)
{
    var input = $("<input>");
    input.addClass("uk-checkbox");
    input.attr("type", "checkbox");
    input.attr("data-health", healthOptions[i]);
    healthDiv.append(input);
    healthDiv.append($("<label>").text(healthOptions[i]));
    
}  
for (var i = 0; i < dietOptions.length; i++)
{
    var input = $("<input>");
    input.addClass("uk-checkbox");
    input.attr("type", "checkbox");
    input.attr("data-diet", dietOptions[i]);
    dietDiv.append(input);
    dietDiv.append($("<label>").text(dietOptions[i]));
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$("#open").on("click", function () {
    UIkit.modal("#sign-in").show();
    console.log(UIkit.modal("#sign-in"));
});