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

$(document).on("click", "#meal-prefs", function () {

})

//makes the preference options for the health key (Edmam API)
var protein = ["chicken", "turkey", "beef", "pork", "fish", "shellfish", "tofu/soy", "egg", "other beans"]
for (i=0; i<protein.length; i++) {
    $(".protein").append($("<input>").addClass("uk-checkbox").attr("type", "checkbox")).append($("<label></label>").text(protein[i]));
}  

//makes the preference options for the health key (Edmam API)
var preferences = ["vegan", "vegetarian", "paleo", "dairy-free", "gluten-free", "fat-free", "low-sugar", "egg-free", "peanut-free", "soy-free", "shellfish-free"]
for (i=0; i<preferences.length; i++) {
    $(".preference").append($("<input>").addClass("uk-checkbox").attr("type", "checkbox")).append($("<label></label>").text(preferences[i]));
}  

//makes the preference options for the activities from Bored API
var activities = ["Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"]
for (i=0; i<preferences.length; i++) {
    //create drop-down in body of daily menu div
} 

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