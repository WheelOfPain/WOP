 
 //Don't change, global variables for functions
 var wheel_counter_finish = 0;			//don't change, used for calculating spin
 var wheel_interval = null;				//don't change, used for storing delegate
 var wheel_counter = 0;					//don't change, used for calculating spin
	
 //Wheel rotation
 var wheel_slot_rotation = 360/8;		//each result rotation, should be 360/options
 var wheel_full_rotation = 4;			//how many rotations before stopping, including slowdown
	
 var wheel_spin_rate = 4;				//how quickly to spin, linear scaling
 var wheel_slow_down_offset = 200;		//how much rotation to reserve for slowing down
 var wheel_slow_down_length = 1000;		//used to calculate linear decrease in slow down
 var wheel_slow_minimum_speed = .01;	//if the wheel slows down less than this speed, use this speed
 var execution_rate = 10;				//used for how often the spin is called and scale accordingly
  
 //Wheel positioning
 var wheel_center_offset = -5;			//for adjustment from centering wheel image and center of outer wheel
 var wheel_arrow_offset = -30;			//for adjustment from outer wheel top to place arrow
		
 //Results Overlay		
 var overlaysize = 9/10;				//in percentage of screen size
 var fadeInDelay = 300;					//for delay before fade in
 var fadeInSpeed = 1500;				//for fade in call
 var fadeOutSpeed = 300;				//for fade out call
 
 //New Data
 var isSpinning = false;
 var spinTime = 3200;
 var spinClassNamePrefix = "aniSpin";
 var spinClassName = "";
 var fadeClassName = "aniFadeIn";
 var canSpin = true;
 var CanSpinAgain = false;
  
 //Function to handle Wheel Spinning
function SpinWheel(){
	if(canSpin)
	{
		isSpinning = true;
		canSpin = false;
		OnResize();
		//Find result
		var length = SpinResults.length;
		var item = Math.floor((Math.random() * length));
		spinClassName = spinClassNamePrefix + item;
		startSpinning(item);
	}
}

//Called When Spinning is started
function startSpinning(selectedIndex)
{		

	$("#Wheel").addClass(spinClassName);
		
	setTimeout(
		function() 
		{
			finishedSpinning(selectedIndex);
		}, 4500);
	  
	$("#resultsRepText1").text("");
	$("#resultsRepText2").text("");
	$("#resultsRepText3").text("");
}

//Called when Spinning is complete
function finishedSpinning(selectedIndex)
{
	SelectNewIndex(selectedIndex);
	
	//Fade out and do fancy stuff
	OnResize();
	showOverlay();
	setTimeout(
		function() 
		{
			isSpinning = false;
			$("#Wheel").removeClass(spinClassName);
			CanSpinAgain = true;
		}, fadeInSpeed + fadeInDelay);
}

//Show Result Page Overlay
function showOverlay()
{
	// get the screen height and width  
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	
	// calculate the values for center alignment
	$('#resultsPage').css({height:(maskHeight), width:(maskWidth)});
	
	$('#dialog-overlay').show().addClass(fadeClassName);
	$('#resultsPage').show().addClass(fadeClassName);
}

//Perform Changes When New Result Selected
function SelectNewIndex(selectedIndex){

	$("#resultsRepText1").text(EasyResults[selectedIndex]);
	$("#resultsRepText2").text(MediumResults[selectedIndex]);
	$("#resultsRepText3").text(HardResults[selectedIndex]);
	
	$("#RSpinResultIcon").attr('src', IconResults[selectedIndex]);
	$("#RSpinResult").text(SpinResults[selectedIndex]);
	
}

//Initialize the Page
function Initialize(){
	$("#dialog-overlay").hide();
	$("#spincontainer").click(function() {OnSpin();});
	$("#btnSpinAgain").click( function() {OnSpinAgain();});
	
	OnResize();
	setTimeout(
		function() 
		{
			OnResize();
		}, 1000);
}

//OnButtonClick of Spin Again
function OnSpin()
{
	SpinWheel();
}

//OnButtonClick of Spin Again
function OnSpinAgain()
{
	if(CanSpinAgain)
	{
		canSpin = true;
		CanSpinAgain = false;
		$("#resultsPage").hide().removeClass(fadeClassName);
		$("#dialog-overlay").hide().removeClass(fadeClassName); 
	}
}

//Called on Init and on window.Resize
function OnResize()
{
	//position wheel parts
	var WheelWidth = $('#Wheel-Outer').width();
	var WheelLeft = $('#Wheel-Outer').position().left;
		
	var WheelHeight = $('#Wheel-Outer').height();
	var WheelTop = $('#Wheel-Outer').position().top;
	
	//center outer wheel on wheel
	$('#Wheel').css({left: WheelLeft + (WheelWidth/2) - ($('#Wheel').width()/2)});
}


$(function() {
	$( window ).resize(function() {
		  OnResize();
		});
	Initialize();
});