var interestedFoods = [];
var dietOptionsUsed = [];
var healthOptionsUsed = [];
var proteinDiv = $(".protein");
var dietDiv = $(".diet-preference");
var healthDiv = $(".health-preference");

// function to retrive data when user submits preferences
function retrieveData()
{
    var prefsChanged = false;

    //update proteins selected
    $('.protein input[type="checkbox"]').each(function()
    {
        var selected = $(this).attr("data-protein");
        //if it is selected, add it to the array
        if ($(this).is(":checked")) {

            if (interestedFoods.indexOf(selected) === -1){
                prefsChanged = true;
                interestedFoods.push(selected);
            }
        }
        //if it is not selected, check to see if should be removed from the array
        else {
            if (interestedFoods.indexOf(selected) !== -1){
                prefsChanged = true;
                interestedFoods.splice(interestedFoods.indexOf(selected), 1);
            }
        }
        
    });

    console.log("interestedFoods:" + interestedFoods);
    localStorage.setItem("interestedFoods", JSON.stringify(interestedFoods))

    //update diet preferences selected
    $('.diet-preference input[type="checkbox"]').each(function()
    {   
        var selected = $(this).attr("data-diet");
        //if it is selected, add it to the array
        if ($(this).is(":checked")) {
            
            if (dietOptionsUsed.indexOf(selected) === -1){
                prefsChanged = true;
                dietOptionsUsed.push(selected);
            }
        }
        //if it is not selected, check to see if should be removed from the array
        else {
            if (dietOptionsUsed.indexOf(selected) !== -1){
                prefsChanged = true;
                dietOptionsUsed.splice(dietOptionsUsed.indexOf(selected), 1);
            }
        }
        
    });
    console.log("dietOptions:" + dietOptionsUsed);
    localStorage.setItem("dietOptionsUsed", JSON.stringify(dietOptionsUsed));

    //update health preferences selected
    $('.health-preference input[type="checkbox"]').each(function()
    {
        var selected = $(this).attr("data-health");
        //if it is selected, add it to the array
        if ($(this).is(":checked")) {

            if (healthOptionsUsed.indexOf(selected) === -1){
                prefsChanged = true;
                healthOptionsUsed.push(selected);
            }
        }
        //if it is not selected, check to see if should be removed from the array
        else {
            if (healthOptionsUsed.indexOf(selected) !== -1){
                prefsChanged = true;
                healthOptionsUsed.splice(healthOptionsUsed.indexOf(selected), 1);
            }
        }
        
    });

    console.log("healthOptions: " + healthOptionsUsed);
    localStorage.setItem("healthOptionsUsed", JSON.stringify(healthOptionsUsed));
    if (prefsChanged){
        searchEdamam();
    }
    
} 