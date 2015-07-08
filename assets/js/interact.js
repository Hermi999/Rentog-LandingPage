$(document).ready(function(){
	// Adapt the size of the HeaderWrapper to the screen
	adaptHeaderWrapper();
});
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	event.preventDefault();

	// Only show slide show if screen is big enough - on mobile the pics are 
	// already nearly as big as possible
	if($(window).width() > 991){
		$(this).ekkoLightbox();	
	}
	
}); 

$(window).resize(function(){
	// Dynamically adapt the size of the HeaderWrapper to the screen
	adaptHeaderWrapper();
});

$(window).load(function(){
	// Locals
	var i = -1;
	var bImage2Loaded = false;
	var bImage3Loaded = false;
	var slideInterval = 14000;
	var images = ['header_bg2.jpg','header_bg3.jpg','header_bg1.jpg'];
	var image = $('#headerwrap');
	var headerText = [$('#headerText2').html(), $('#headerText0').html(), $('#headerText1').html()];


	// Set headerText
	$('#headerText').html(headerText[2]);

	
	// Load image2 and image3 in background
	var curImg2 = new Image();
	var curImg3 = new Image();
	curImg2.src = "/assets/img/" + images[0];
	curImg3.src = "/assets/img/" + images[1];
	curImg2.onload = function(){
		bImage2Loaded = true;
		if (bImage3Loaded){
			showBubbles();
		}
	}
	curImg3.onload = function(){
		bImage3Loaded = true;
		if (bImage2Loaded){
			showBubbles();
		}
	}
	

	// Check every 500ms if images already loaded
	function showBubbles(){
		if (bImage3Loaded && bImage2Loaded){
			// Fade in the bubbles for switching content
			$('.bubbleWrapper').fadeIn(1000);
		}
	}


	// Change image at regular intervals - but only if all the images have already been loaded
	switchImagesFunc = function(){  
		if(bImage2Loaded && bImage3Loaded){
			image.fadeOut(400, function () {
				if(i == images.length-1)
					i = 0;
				else
					i++;
				
				image.css('background-image', 'url(/assets/img/' + images [i] +')');
				
				// Change Header
				$('#headerText').html(headerText[i]);
				
				// Change Header Text - SEO Optimized
				$('#headerDetails' + i).css('display', 'none');
				$('#headerDetails' + (((i+1)%3))).css('display', 'block');
				$('#headerDetails' + (((i+2)%3))).css('display', 'none');
				$('#bubble' + i).css('border','none');
				$('#bubble' + i).css('background-color','black');
				$('#bubble' + (((i+1)%3))).css('border','2px solid black');
				$('#bubble' + (((i+1)%3))).css('background','transparent');
				$('#bubble' + (((i+2)%3))).css('border','none');
				$('#bubble' + (((i+2)%3))).css('background-color','black');	
				image.fadeIn(1000);
			});
		}
	}
	var switchImages = setInterval(switchImagesFunc, slideInterval);




	$('#bubble0').bind('click', function(event){
		event.preventDefault();

		// Restart Slideshow
		clearInterval(switchImages);
		i = -1;
		switchImages = setInterval(switchImagesFunc, slideInterval);


		var image = $('#headerwrap');
		image.fadeOut(400, function () {
			image.css('background-image', 'url(/assets/img/header_bg1.jpg)');
			
			// Change Header
			$('#headerText').html(headerText[2]);
			
			// Change Header Text - SEO Optimized
			$('#headerDetails0').css('display', 'block');
			$('#headerDetails1').css('display', 'none');
			$('#headerDetails2').css('display', 'none');
			$('#bubble0').css('border','2px solid black');
			$('#bubble0').css('background','transparent');
			$('#bubble1').css('border','none');
			$('#bubble1').css('background-color','black');
			$('#bubble2').css('border','none');
			$('#bubble2').css('background-color','black');
			image.fadeIn(1000);
		});
	});

	$('#bubble1').bind('click', function(event){
		event.preventDefault();

		// Restart Slideshow
		clearInterval(switchImages);
		i = 0;
		switchImages = setInterval(switchImagesFunc, slideInterval);


		var image = $('#headerwrap');
		image.fadeOut(400, function () {
			image.css('background-image', 'url(/assets/img/header_bg2.jpg)');
			
			// Change Header
			$('#headerText').html(headerText[0]);
			
			// Change Header Text - SEO Optimized
			$('#headerDetails0').css('display', 'none');
			$('#headerDetails1').css('display', 'block');
			$('#headerDetails2').css('display', 'none');
			$('#bubble1').css('border','2px solid black');
			$('#bubble1').css('background','transparent');
			$('#bubble0').css('border','none');
			$('#bubble0').css('background-color','black');
			$('#bubble2').css('border','none');
			$('#bubble2').css('background-color','black');
			image.fadeIn(1000);
		});
	});

	$('#bubble2').bind('click', function(event){
		event.preventDefault();

		// Restart Slideshow
		clearInterval(switchImages);
		i = 1;
		switchImages = setInterval(switchImagesFunc, slideInterval);

		var image = $('#headerwrap');
		image.fadeOut(400, function () {
			image.css('background-image', 'url(/assets/img/header_bg3.jpg)');
			
			// Change Header
			$('#headerText').html(headerText[1]);
			
			// Change Header Text - SEO Optimized
			$('#headerDetails0').css('display', 'none');
			$('#headerDetails1').css('display', 'none');
			$('#headerDetails2').css('display', 'block');
			$('#bubble2').css('border','2px solid black');
			$('#bubble2').css('background','transparent');
			$('#bubble1').css('border','none');
			$('#bubble1').css('background-color','black');
			$('#bubble0').css('border','none');
			$('#bubble0').css('background-color','black');
			image.fadeIn(1000);
		});
	});


	var ownerFixed = false;
	var renterFixed = false;

	$('.howItWorksHeaderRenter').css('opacity','0.7');
	$('.howItWorksHeaderOwner').css('opacity','0.7');

	$('.howItWorksHeaderRenter').bind('mouseover', function(){
		$('.howItWorksHeaderRenter').css('opacity','1.0');
		$('.howItWorksHeaderOwner').css('opacity','0.4');
		$('.renter').fadeIn(300);
		$('.owner').fadeOut(300);
	});
	$('.howItWorksHeaderRenter').bind('mouseleave', function(){
		if(!renterFixed){
			$('.howItWorksHeaderRenter').css('opacity','0.7');
			$('.howItWorksHeaderOwner').css('opacity','0.7');
			$('.owner').fadeIn(300);
		}
		if(ownerFixed){
			$('.renter').fadeOut(300);
		}
	});
	$('.howItWorksHeaderOwner').bind('mouseover', function(){
		$('.howItWorksHeaderRenter').css('opacity','0.4');
		$('.howItWorksHeaderOwner').css('opacity','1.0');
		$('.owner').fadeIn(300);
		$('.renter').fadeOut(300);
	});
	$('.howItWorksHeaderOwner').bind('mouseleave', function(){
		console.log(ownerFixed);
		if(!ownerFixed){
			$('.howItWorksHeaderRenter').css('opacity','0.7');
			$('.howItWorksHeaderOwner').css('opacity','0.7');
			$('.renter').fadeIn(300);
		} 
		if(renterFixed){
			$('.owner').fadeOut(300);
		}
	});


	var setOwner = function(){
		// Check
		if ($('#ownerCheckbox').prop('checked') == false){
			$('#ownerCheckbox').prop('checked', true);
			$('#renterCheckbox').prop('checked', false);
			ownerFixed = true;
			renterFixed = false;
		}
		// Uncheck
		else{
			$('#ownerCheckbox').prop('checked', false);
			ownerFixed = false;
			$('.renter').fadeIn(300);
		}
	}
	$('.howItWorksHeaderOwner').click(setOwner);
	$('#ownerCheckbox').click(setOwner);



	var setRenter = function(){
		if ($('#renterCheckbox').prop('checked') == false){
			$('#renterCheckbox').prop('checked', true);
			$('#ownerCheckbox').prop('checked', false);
			renterFixed = true;
			ownerFixed = false;
		}
		else{
			$('#renterCheckbox').prop('checked', false);
			renterFixed = false;
			$('.owner').fadeIn(300);
		}
	}
	$('.howItWorksHeaderRenter').click(setRenter);
	$('#renterCheckbox').click(setRenter);

});



function adaptHeaderWrapper(){
	function setHeight(){
		// Returns height of browser viewport
		var height = $( window ).height();

		// Add 50px, because of negative margin
		height = height + 50;


		// get the minimum height, depending on the button
		var top = $('#seeHowItWorks_btn').position().top;
		var elementHeight = $('#seeHowItWorks_btn').outerHeight(true);
		var minHeight = elementHeight + top;

		// Add 50px, because of negative margin
		minHeight = minHeight + 50;

		// Check if height is beneath the lowest allowed value
		if (height < minHeight){
			height = minHeight + 30;
		}	

		return height;
	}


	$('#headerwrap').css({
		'max-height': setHeight(),
		'min-height': setHeight(),
		'height': setHeight()
	});
}
adaptHeaderWrapper();



$('#sendData').click(function(event){
	event.preventDefault();
	var data = {
		name: $('#contact #name').val(),
		email: $('#contact #email').val(),
		message: $('#contact #message').val()
	};
	
	
	if(data.name === ''){
		$('#contactError').html('Please enter a valid name!');
		$('#contactError').css('color','red');
		return;
	}
	if(!validateEmail(data.email)){
		$('#contactError').html('Please enter a valid email address!');
		$('#contactError').css('color','red');
		return;
	}
	if(data.message === ''){
		$('#contactError').html('Please enter a message!');
		$('#contactError').css('color','red');
		return;
	}

	$('#contactError').html('-');
	$('#contactError').css('color','white');

	$.post('contact.php', data, function(result){
		//if(result === 'success'){
			$('#sendingDone').html('<h4>Messages successfully send!</h4>');
			$('#sendingDone').css('background-color','#7BB984');
			$('#sendingDone').fadeIn(300);
		/*}else{
			$('#sendingDone').html('<h4>Messages could not be send!</h4>');
			$('#sendingDone').css('background-color','red');
			$('#sendingDone').fadeIn(300);

		}*/

		setInterval(function(){ $('#sendingDone').fadeOut(300); }, 2500);
	});
});


function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}



var x = doCrypt(true,'0664/4576808');
$('#fdas').html(x);

var y = doCrypt(true, "yjjf@zylvlw.ysd");
$('#adsf').html(y);


function doCrypt(isDecrypt, textElem) {
  var Orikey = "qweriuycx";
	if (Orikey.length == 0) {
		alert("Key is empty");
		return;
	}
	var key = filterKey(Orikey);
	if (key.length == 0) {
		alert("Key has no letters");
		return;
	}
	if (isDecrypt) {
		for (var i = 0; i < key.length; i++)
			key[i] = (26 - key[i]) % 26;
	}
	textElem = crypt(textElem, key);
	return textElem;
}


/* 
 * Returns the result the Vigenère encryption on the given text with the given key.
 */
function crypt(input, key) {
	var output = "";
	for (var i = 0, j = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isUppercase(c)) {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			j++;
		} else if (isLowercase(c)) {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		} else {
			output += input.charAt(i);
		}
	}
	return output;
}

/* 
 * Returns an array of numbers, each in the range [0, 26), representing the given key. 
 * The key is case-insensitive, and non-letters are ignored.
 * Examples:
 *   filterKey("AAA") = [0, 0, 0]
 *   filterKey("abc") = [0, 1, 2]
 *   filterKey("the $123# EHT") = [19, 7, 4, 4, 7, 19]
 */
function filterKey(key) {
	var result = [];
	for (var i = 0; i < key.length; i++) {
		var c = key.charCodeAt(i);
		if (isLetter(c))
			result.push((c - 65) % 32);
	}
	return result;
}


// Tests whether the specified character code is a letter.
function isLetter(c) {
	return isUppercase(c) || isLowercase(c);
}

// Tests whether the specified character code is an uppercase letter.
function isUppercase(c) {
	return c >= 65 && c <= 90;  // 65 is the character code for 'A'. 90 is for 'Z'.
}

// Tests whether the specified character code is a lowercase letter.
function isLowercase(c) {
	return c >= 97 && c <= 122;  // 97 is the character code for 'a'. 122 is for 'z'.
}
