//Grabs the name of the page the user is on.
	var path = window.location.pathname;
	var page = path.split("/").pop();

	

//Only executes the following code if the user is on the job details, search, or profile(ds) page.
if (page == "JobDetails.aspx" || page == "jobdetails.aspx" || page == "search.aspx" || page == "ds.aspx"){
	
	//append UNM Brand fonts css link
	$("#ctl00_careerSiteHeader_htmlContainer").append('<link rel="stylesheet" type="text/css" href="https://cloud.typography.com/7254094/6839152/css/fonts.css" />');
	//We are only using the branded fonts on these pages because UCAM requires their google analytics on
	
	
	//GOOGLE TAG MANAGER INSERTION FOR ANALYTICS
	//USING THE TAG MANAGER ON APPLICATION PAGES WILL BREAK SOME CSOD FUNTIONALITY E.G. editing job history entries
	
	//the html tags referenced below should be placed in the page header for this script to modify
	//set inner html of script tag with id: googletag1
	var s1 = document.getElementById('googletag1');
	s1.innerHTML = 'dataLayer = [{\'site-analytics\': \'UA-12990591-5\'}];';
	//set innner html of noscript tag with id: googletag2
	var s2 = document.getElementById('googletag2');
	s2.innerHTML = '<iframe src="//www.googletagmanager.com/ns.html?id=GTM-WQT2MB" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
	//set inner html of script tag with id: googletag3
	var s3 = document.getElementById('googletag3');
	s3.innerHTML = '(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\'//www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);})(window,document,\'script\',\'dataLayer\',\'GTM-WQT2MB\');';

}


$( document ).ready(function() {
	//adds UNM brand css class to the job ad section on all jobdetails pages
	if (page == "JobDetails.aspx" || page == "jobdetails.aspx"){
		if(document.getElementsByClassName("cs-atscs-jobdet-rtpane")[0] != null){
			
			var container = document.getElementsByClassName("cs-atscs-jobdet-rtpane")[0];
			
			container.className += " unm-brand";
		}
	}
	
	//adds UNM brand css class to the entire visible page on search pages
	if (page == "search.aspx"){
		if(document.getElementById("mainContainer") != null){
			
			var container = document.getElementById("mainContainer");
			
			container.className += " unm-brand";
		}
	}
	
	//sets the myProfile and Log Out links to visible if they exist (allows users to log out from anywhere easily EXCEPT the middle of an application)
	if (page == "JobDetails.aspx" || page == "jobdetails.aspx" || page == "search.aspx" || page == "ds.aspx"){
		if(document.getElementById("ctl00_careerSiteHeader_lnkLogOut") != null){
			document.getElementsByClassName("userBar")[0].style.display = "block";
		}
	}
});