var interestedFoods = [];
var dietOptionsUsed = [];
var healthOptionsUsed = [];
var proteinDiv = $(".protein");
var dietDiv = $(".diet-preference");
var healthDiv = $(".health-preference");

// function to retrive data when user submits preferences
function retrieveData()
{
    proteinDiv.children(":checked").each(function()
    {
        if (interestedFoods.indexOf($(this).attr("data-protein")) === -1){
            interestedFoods.push($(this).attr("data-protein"));
        }
        
    });
    console.log(interestedFoods);

    dietDiv.children(":checked").each(function()
    {
        if (dietOptionsUsed.indexOf($(this).attr("data-diet")) === -1){
            dietOptionsUsed.push($(this).attr("data-diet"));
        }
        
    });
    console.log(dietOptionsUsed);

    healthDiv.children(":checked").each(function()
    {
        if (healthOptionsUsed.indexOf($(this).attr("data-health")) === -1){
            healthOptionsUsed.push($(this).attr("data-health"));
        }
            
    });
    console.log(healthOptionsUsed);
} 