Tabs = function(tabs) 
{   
    //hide all but first tab
    tabs.find(".tabContent").not(":first").css("display", "none");
    
    //add selected to first tab control
    tabs.find(".tabControls a").eq(0).addClass("selected");
    
    //change tab when pressed
    tabs.find(".tabControls a").click(function(event)
    {
        event.preventDefault();
        
        var link = $(this);
        
        //remove selected class, hide tab content
        tabs.find(".tabControls a").removeClass("selected");
        tabs.find(".tabContent").css("display", "none");
        
        //added selected class, show tab content
        link.addClass("selected");
        $(link.attr("href")).css("display", "block");
    });
};

$(function() 
{
    $(".tabs").each(function()
    {
        new Tabs($(this));
    });
});