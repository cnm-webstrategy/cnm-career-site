//Grabs the name of the page the user is on.
	var path = window.location.pathname;
	var page = path.split("/").pop();
	var url = window.location.href;
	var ReqID = url.substring(url.lastIndexOf("?") + 4).split("&")[0];//get requisition id, for relay state url

//Only executes the following code if the user is on the job details page.
if (page == "JobDetails.aspx" || page == "jobdetails.aspx"){

	//load jquery and bootstrap js
	$.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js', function() {
		$.getScript('https://netdna.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js', function() {
			$("#content").html('');
			console.log("get script");
		});
		 $("#content").html('');
	  });

	//load job ad css
	$("#ctl00_careerSiteHeader_htmlContainer").append('<link rel="stylesheet" type="text/css" href="https://cnm.edu/ext/cornerstone_resources/style.css">');


	$( document ).ready(function() {	
		//Hide the CSOD left nav since the user is not using it.
		//The csod login script requires the button to be present in the dom so it can trigger a click.
		$(".cs-atscs-jobdet-ltpane").hide();

		//insert the apply button and modal html (empty div should exist in the footer; #apply-to-cnm in this case)
		$("#apply-to-cnm").append('<div id="apply-now-button-placeholder">\
		<div id="apply-now-container">\
			<div class="row">\
			  <div class="col-md-12">\
				<a class="btn btn-primary btn-lg text-center w-100" href="#apply-now-form" id="apply-now" data-toggle="modal" data-target="#apply-now-modal">Apply Now&nbsp;<i class="fa fa-fw fa-angle-right"></i></a>\
			  </div>\
			</div>\
		</div>\
		<div class="cnm-modal fade" tabindex="-1" role="dialog" aria-labelledby="apply-now-modal" id="apply-now-modal" style="display: none;" aria-hidden="true">\
			<div class="cnm-modal-dialog" role="document">\
			  <div class="cnm-modal-content">\
				<div class="cnm-modal-header">\
				  <h5 class="cnm-modal-title" id="apply-now-modal">Select one: </h5>\
				  <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>\
				</div>\
				<div class="cnm-modal-body">\
				<ul class="list-group">\
				  <li class="list-group-item d-flex justify-content-between align-items-center">\
					<label id="cnm-student"><input type="radio"  name="applicant-type" value="cnm-student" data-login="sso"> I am a current CNM Student</label>\
				  </li>\
				  <li class="list-group-item d-flex justify-content-between align-items-center">\
					<label><input type="radio" name="applicant-type" value="never-worked-at-cnm" data-login="csod"> I have never worked at CNM</label>\
				  </li>\
				  <li class="list-group-item d-flex justify-content-between align-items-center">\
					<label id="cnm-staff"><input type="radio" name="applicant-type" value="cnm-staff" data-login="sso"> I am a current CNM Faculty or Staff, or a Retiree</label>\
				  </li>\
				  <li class="list-group-item d-flex justify-content-between align-items-center">\
					<label><input type="radio" name="applicant-type" value="former-staff-faculty-student-emp" data-login="csod"> I am a former CNM Faculty or Staff</label>\
				  </li>\
				</ul>\
				</div>\
				<div class="cnm-modal-footer">\
				  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
				  <button type="button" class="btn btn-primary" id="modal-continue-btn">Continue</button>\
				</div>\
			  </div>\
			</div>\
		</div>\
		</div>');

		//object used to hold relay functions
		var apply_now_form = {
			
			get ENV () {
				return window.location.host.split(".")[0]; //cnm-pilot is pilot, cnm-stg is staging, cnm is production
			},

			get relayStateURL () {
			   return 'https%253A%252F%252F'+this.ENV+'.csod.com%252FEPM%252FCareerCenter%252FCareerCenter.aspx%253FreqID%253D'+ ReqID;
			},

			get CNMSSOIDP () {
				// return 'https://loboauth.cnm.edu/adfs/ls/idpinitiatedsignon.aspx?RelayState=RPID%3Dhttps%253A%252F%252F'+this.ENV+'.csod.com%26RelayState%3D'+this.relayStateURL;
				return 'https://<portalname>.csod.com/samldefault.aspx?ouid=4&returnUrl= ';
			},

			//uses above functions to send user to Single Sign On page with the appropriate relay state URL to apply for this position in the Career Center
			sso : function() {
				console.log('go to CNMSSO: ' + this.CNMSSOIDP);
				window.location.href = this.CNMSSOIDP;
			},

			//clicks on the apply/continue application button to send user to external application
			csod : function() {
				console.log('go to CSOD login via apply now form.')
				//Trigger the appply button click which will submit the page
				if($("#ctl00_siteContent_csApplyNow")[0] != null){
					$("#ctl00_siteContent_csApplyNow")[0].click();
				}
				else{
					$("#ctl00_siteContent_btnContinue")[0].click();
				}
			}
		};

		//Listener the continue button in the modal
		$("#modal-continue-btn").click(function() {
			console.log('continue button clicked');
			var el = $("input[name='applicant-type']:checked");//get selected option in modal
			var login_page = el.data('login');//get login data from selected option (csod or sso)

			apply_now_form[login_page]();//execute appropriate function from the apply_now_form object

		});

		//Display apply button AFTER the content and event listers have loaded (hidden in css by default)
		$("#apply-to-cnm").css("display", "block");

	});
} 
//on search pages, only load the bootstrap js
else if (page == "search.aspx"){
	$.getScript('https://netdna.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js', function() {
		$("#content").html('');
	});
}