$( document ).ready(function() {

$( ".cross" ).hide();

//small window: display as hamburger menu
if ($( window ).width() < 784 ){
		$(".hamburger").show();
		$(".coverNav").hide();
		$(".hamburger-menu").show();
		$(".coverHeading").hide();
	}

	//large window: display as menu box
if ($( window ).width() > 784 ){
		$(".hamburger").hide();
		$(".hamburger-menu").hide();
		$( ".cross" ).hide();
		$(".coverNav").show();
		$(".coverHeading").show();
	}

//expand menu button event listener
$( ".hamburger" ).click(function(e) {
e.preventDefault()
$( ".coverNav" ).slideToggle( "slow", function() {
$( ".hamburger" ).hide();
$( ".cross" ).show();
});
});

//close menu button event listener
$( ".cross" ).click(function(e) {
e.preventDefault();	
$( ".coverNav" ).slideToggle( "slow", function() {
$( ".cross" ).hide();
$( ".hamburger" ).show();
});
});

});

//adjust between hamburger menu and menu box on window resize
$(window).resize(
	function(){
		if ($( window ).width() < 784 ){
		$(".hamburger").show();
		$(".hamburger-menu").show();
		$(".coverNav").hide();		
		$(".coverHeading").hide();
	}

		if ($( window ).width() > 784 ){
		$(".hamburger").hide();
		$(".hamburger-menu").hide();
		$( ".cross" ).hide();
		$(".coverNav").show();
		$(".coverHeading").show();

	}
	});