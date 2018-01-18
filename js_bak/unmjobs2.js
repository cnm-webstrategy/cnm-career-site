$(document).ready(function() {
  //On the search page (only include this script on the page with the actual search widgets)
var page = path.split("/").pop();
if (page == "search.aspx"){

//DEFAULT PAGE LOAD
//hide all but the first (staff) widget
  console.log('search script loaded');
  $(".widgetDropped:nth-child(2)").hide();
  $(".widgetDropped:nth-child(3)").hide();
  $(".widgetDropped:nth-child(4)").hide();
  //click the search button on the staff widget to auto-load all positions
  var temp = document.getElementById('ctl00_siteContent_widgetLayout_rptWidgets_ctl00_widgetContainer_ctl00_btnSearch');
	temp.click(); 

	
	//BUTTON LISTENERS
	
	//event listener for the  Staff Careers header button
  $('#search-staff').click(
    function() {   
	//hide all but the first (staff) widget
    $(".widgetDropped:nth-child(1)").show();
    $(".widgetDropped:nth-child(2)").hide();
    $(".widgetDropped:nth-child(3)").hide();
    $(".widgetDropped:nth-child(4)").hide();
	//click the search button on the staff widget to auto-load all staff positions
	var temp = document.getElementById('ctl00_siteContent_widgetLayout_rptWidgets_ctl00_widgetContainer_ctl00_btnSearch');
	temp.click(); 

    }
  );

	//event listener for the  Faculty Careers header button
  $('#search-faculty').click(function() {
    $(".widgetDropped:nth-child(1)").hide();
    $(".widgetDropped:nth-child(2)").show();
    $(".widgetDropped:nth-child(3)").hide();
    $(".widgetDropped:nth-child(4)").hide();
	//click the search button on the faculty widget to auto-load all faculty positions
	var temp = document.getElementById('ctl00_siteContent_widgetLayout_rptWidgets_ctl01_widgetContainer_ctl00_btnSearch');
	temp.click(); 

    
  });

  //event listener for the  Student Jobs header button
  $('#search-student').click(function() {
    $(".widgetDropped:nth-child(1)").hide();
    $(".widgetDropped:nth-child(2)").hide();
    $(".widgetDropped:nth-child(3)").show();
    $(".widgetDropped:nth-child(4)").hide();
	//click the search button on the student widget to auto-load all student positions
	var temp = document.getElementById('ctl00_siteContent_widgetLayout_rptWidgets_ctl02_widgetContainer_ctl00_btnSearch');
	temp.click(); 
    
  });

	//event listener for the  Temporary Assignments header button
  $('#search-temp').click(function() {
    $(".widgetDropped:nth-child(1)").hide();
    $(".widgetDropped:nth-child(2)").hide();
    $(".widgetDropped:nth-child(3)").hide();
    $(".widgetDropped:nth-child(4)").show();
	//click the search button on the temp widget to auto-load all temp positions
	var temp = document.getElementById('ctl00_siteContent_widgetLayout_rptWidgets_ctl03_widgetContainer_ctl00_btnSearch');
	temp.click(); 
    
  });

  
  
  //if the window initially loads with a relevant hash, make the appropriate widget visible and load those positions
  if(window.location.hash == "#staff") {
    $('#search-staff').trigger('click');

  } else if(window.location.hash == "#faculty") {
    $('#search-faculty').trigger('click');

  } else if(window.location.hash == "#student") {
    $('#search-student').trigger('click');

  } else if(window.location.hash == "#temps") {
    $('#search-temp').trigger('click');
  } else {
    console.log(' ');//default case to prevent errors from empty or irrelevant hash identifiers
  }
 }
});