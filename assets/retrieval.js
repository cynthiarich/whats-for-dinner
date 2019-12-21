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
        interestedFoods.push($(this).attr("data-protein"))
    });
    console.log(interestedFoods);
    dietDiv.children(":checked").each(function()
    {
        dietOptionsUsed.push($(this).attr("data-diet"))
    });
    console.log(dietOptionsUsed);
    healthOptionsUsed = healthDiv.children(":checked").each(function()
    {
        healthOptionsUsed.push($(this).attr("data-health"))
    });
    console.log(healthOptionsUsed);
} 