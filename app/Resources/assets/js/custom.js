if( typeof $ == 'undefined' ){
	var $ = jQuery;
}

if (!("ontouchstart" in document.documentElement)){ 
    document.documentElement.className += " no-touch"; 
}

/*=============================================================================================
 Ajax Loader
===============================================================================================*/
var Loader = {
	config: {
		'small' :{
			lines: 8, // The number of lines to draw
			length : 2,  // The length of each line
			width: 2, // The line thickness
			radius: 3 // The radius of the inner circle
		},
		'large' :{
			lines: 10, // The number of lines to draw
			length: 7, // The length of each line
			width: 3, // The line thickness
			radius: 10  // The radius of the inner circle
		}, 
		'custom' : {
			lines : 10, // The number of lines to draw
			length: 7, // The length of each line
			width: 3, // The line thickness
			radius: 10,   // The radius of the inner circle
			corners: 1.0, // 
			rotate: 22, // The rotation offset
			color: '#fff', // #rgb or #rrggbb
			speed: 1, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false // Whether to use hardware acceleration
		}
	},
	init: function(){},
	// Show loader
	Show: function( opts, color ){
		if( Spinner ){
			if(opts !== false){
				if(typeof(opts) === 'string'){
					opts = ( opts in Loader.config ) ?  opts = Loader.config[opts] : opts = {};
				}
			}
			// Check if color exists
			if(color !== null){
				opts.color = color;
			}
			// Initailize Spinner
			var spinner = new Spinner( 
				$.extend({ 
					color: color 
				}, opts ) 	
			).spin();

			var target = $('#loading');
				target.append(spinner.el);
			
		}
	},
	// Hide loader
	Hide: function(){}
};

/*===============================================================================================
/*	Contact Form Placeholder Text 
/*  Form Validation
=================================================================================================*/
var contactForm = {
	init: function(){

		var triggerForm = this;
    	// Form Validation
    	triggerForm.formValidation();

	},
	formValidation: function()
	{
		// validate the contact form when it is submitted
		$('#contactForm').validate({
			rules: {
				name: {
	               minlength: 3,
	               required: true
                },
				email: {
				   required: true,
				   email: true
				},
				subject: {
		           minlength: 3,
		           required: true
		        },
		        message: {
		           minlength: 20,
		           required: true
		        }
			},
			submitHandler: function( response ) {
				
				Loader.Show('large', '#303030');
				contactForm.processForm();

			},
			errorPlacement: function(error, element) {
				error.insertBefore( element );
			}
		});
	},
	processForm: function(event){
		
		var contactForm  = $('#contactForm');
		var formMethod   = contactForm.attr('method');
		var formAction   = contactForm.attr('action');
		var nameVal      = $('#name').val();
		var	emailVal     = $('#email').val();
		var	subjectVal   = $('#subject').val();
		var messageVal   = $('#message').val();

		$.ajax({
			url: formAction,
			type: formMethod,
			data:{
				name: nameVal,
				email: emailVal,
				subject: subjectVal,
				message: messageVal
			},
			success:function(response, textStatus)
			{

				$('#notice').html(response);

				// if ok output success message
				if(response.match('success') !== null)
				$('#contactForm').slideUp('slow');
				$('html, body').animate({
					scrollTop: 0
				});
				
			}
		});
		return false;
	}
};

/*===============================================================================================
  Animate Header on Scroll
=================================================================================================*/
var animateHeader = {
	init: function(){
		var anim = this;
		anim.docElem = document.documentElement;
		anim.siteElem = $('.site-header');
    	anim.didScroll = false;
		anim.changeHeaderOn = 100;
		anim.triggerScroll(anim);
	},
	triggerScroll: function(anim){
		/*window.addEventListener('scroll', animateHeader.addEvent, false);*/
		
		if ( window.addEventListener ) {
		  window.addEventListener('scroll', animateHeader.addEvent, false); 
		} else if (window.attachEvent)  {
		  window.attachEvent('onscroll', animateHeader.addEvent, false);
		}
		
	},
	addEvent: function(){
		if(!animateHeader.didScroll)
		{
			animateHeader.didScroll = true;
			setTimeout( animateHeader.initScroll, 100 );
		}
	},
	initScroll: function(){
		var vertScroll = animateHeader.setScrollY();
		
		if( vertScroll >= animateHeader.changeHeaderOn && $(window).width() >= 899 )
		{
			animateHeader.siteElem.addClass('shrink');
		}else{
			animateHeader.siteElem.removeClass('shrink');
		}
		animateHeader.didScroll = false;
	},
	setScrollY: function(){
		return window.pageYOffset || animateHeader.docElem.scrollTop;
	}
};


/*===========================================================================================
 Scroll To Top Link
=============================================================================================*/
var scrollEvent ={
 	init: function(){
 		$('#scroll-top').on('click', scrollEvent.scrollUp);	
 	},
 	scrollUp: function(e){
    	e.preventDefault();

    	$('html, body').animate(
    		{ scrollTop: 0
    		}, 600);

    	return false;
    }
 };

/*=================================================================================================
  Headroom Sticky Navigation
===================================================================================================*/
var stickyNavigation = {
	init: function(){
		var opts = {
			// vertical offset in px before element is first unpinned
		    offset : 50,
		    // scroll tolerance in px before state changes
		    tolerance : 0,
		    // css classes to apply
		    classes: {
		    	// when element is initialised
		        initial : "site-header",
		        // when scrolling up
		        pinned : "site-header--pinned",
		        // when scrolling down
		        unpinned : "site-header--unpinned"
		    }
		};
		var element = document.querySelector("#masthead");
		
		if(typeof Headroom !== 'undefined'){
			var header  = new Headroom(element, opts);
			header.init();
		}
	}
};

/*=============================================================================================
	Superfish Dropdown Menu
===============================================================================================*/
var subMenu = {
	init: function(){
		this.navigation = $('.primary-menu');
		this.navigation.supersubs({
			minWidth: 14,
			maxWidth: 14,
			extraWidth: 1
		}).superfish({
			delay: 100,
			animation: {opacity:'show'},
			speed: 'fast',
			autoArrows: false,
			dropShadows: false
		});
	}
};

/*=============================================================================================
  Mobile Menu
===============================================================================================*/
var mobileMenu = {
	init: function(){
		var navigation = responsiveNav('.primary-menu', 
		{   
			animate: true,        // Boolean: Use CSS3 transitions, true or false
		    transition: 280,      // Integer: Speed of the transition, in milliseconds
		    label: "",        // String: Label for the navigation toggle
		    insert: "after",      // String: Insert the toggle before or after the navigation
		    customToggle: ".nav-toggle", // Selector: Specify the ID of a custom toggle
		    openPos: "relative",  // String: Position of the opened nav, relative or static
		    navClass: "nav-collapse", // String: Default CSS class. If changed, you need to edit the CSS too!
		    navActiveClass: "js-nav-active", // String: Class that is added to  element when nav is active
		    jsClass: "js",        // String: 'JS enabled' class which is added to <html> el
		    init: function(){},   // Function: Init callback
		    open: function(){},   // Function: Open callback
		    close: function(){}   // Function: Close callback);
		});
	}
};

/*===============================================================================================
	Initialise scripts on Screen Width
=================================================================================================*/
function customImage( el, opacity){

		var customHeader = $(el),
			dataImage 	 = customHeader.data('image'),
			dataOpacity  = customHeader.data('opacity'),
			dataColor 	 = customHeader.data('color');
			
			// Path to image banner directory
			var imgBg        = ""+ dataImage;
			$(el).backstretch(imgBg);	
			
			$(el+' .backstretch').css({
				'opacity': dataOpacity
			});
			$(el).css('background-color', "#"+dataColor);
			
	}

/*==========================================================================================
	Initialize Plugins and Scripts
============================================================================================*/
$(document).ready( function(){
	"use strict";

	/*=========================================
	Define Our Variables
	===========================================*/
	var body = $('body'),
	    lastScreenWidth = window.innerWidth;

	screenSize();
	$(window).resize( function(){
		if( lastScreenWidth <= 899 && window.innerWidth > 899 ){

			if ( $('#primary').length ) {
				var nav = responsiveNav('#primary');
				nav.destroy();
		
				$('#primary').each(function(){
            		this.className = this.className.split(' ')[0];
        		});
			}else{
			    subMenu.init();
			}

			animateHeader.init();
			subMenu.init();

		}
		if(lastScreenWidth > 899 && window.innerWidth <= 899 ){
			$('#primary').superfish('destroy');				
			mobileMenu.init();
		}
		lastScreenWidth = window.innerWidth;
    });
    
    function screenSize(){
    	if( window.innerWidth >= 899 ){
			animateHeader.init();
			subMenu.init();	
		}else{
			mobileMenu.init();
			$('#primary').superfish('destroy');
		}
    }

	if(body.hasClass('home') )
	{
		customImage( '#custom-header', 0.15 );

	}else if(body.hasClass('blog') ){
		
		customImage( '#custom-header');
		blogSlider.init();
		responsiveVideo.init();

	}else if(body.hasClass('vertical-blog') ){

		customImage('#custom-header');
		blogSlider.init();
		responsiveVideo.init();
		loadMorePosts.init();

	}else if( body.hasClass('portfolio-3-columns') ){

		portfolioFilter.init();
		customImage( '#custom-header', '');

	}else if(body.hasClass( 'portfolio-2-columns' ) || body.hasClass( 'portfolio-4-columns' ) ){

		portfolioFilter.init();		
		customImage('#custom-header');

	}else if( body.hasClass('contact') ){

		customImage('#custom-header');		

	}else if( body.hasClass('single-portfolio') ){

		customImage('#custom-header');
		portfolioSlider.init();

	}else if(body.hasClass('single-blog')){
		customImage('#custom-header');
	}
	else if(body.hasClass('sample-page'))
	{
		customImage('#custom-header');			
	}

	// Initailize Scripts
    // GraySkull supports.init();
    scrollEvent.init();
	contactForm.init();
	stickyNavigation.init();
});
