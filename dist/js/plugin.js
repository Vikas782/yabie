

(function($) {

	//background image parallax effect

	//$("element").bgParallax();
	//<element data-image="imagefullpath">


	var parallax = function($this,options){
		var image = $this.attr("data-image");
		console.log(image);
		if(image != undefined){
			$this.css({
				position:'relative',
				overflow:'hidden',
				zIndex:'9'
			});
			$('<div class="bg-parallax"></div>').prependTo($this).css({
				backgroundImage:"url('"+image+"')",
				backgroundPosition:options.objectPosition,
				zIndex:'-1'
			});
		}

		function update(){
			var $elHeight = $this.outerHeight();
			var windowHeight = $(window).outerHeight();
			var $elTop = $this.offset().top;
			var pos = $(window).scrollTop();
			// Check if totally above or totally below viewport
			if ($elTop + $elHeight < pos || $elTop > pos + windowHeight) {
				return;
			}

			$this.children(".bg-parallax").css('height', Math.round($elHeight + (windowHeight - $elHeight) *  options.speedFactor) + "px");

			var topPosition = "translate3d(0px, "+Math.round(-($elTop - pos) * options.speedFactor)+"px, 0px)";


			if(options.grow){
				var scale = Math.round(-(($elTop - pos) * options.speedFactor));
				scale/=2;
				if(scale<10){
					scale = "00"+scale;
				}
				if(scale>9 && scale<100){
					scale = "0"+scale;
				}
				var scale = "scale(1."+scale+")";
				$this.children(".bg-parallax").css('transform',topPosition+" "+scale);
			}
			else{
				$this.children(".bg-parallax").css('transform',topPosition);
			}

			if(options.blur){
				$this.css('filter','blur('+ Math.round(-(($elTop - pos) * options.speedFactor/10)) +'px)');
			}

			// if(options.grow){
			// 	let scale = Math.round(-($elTop - pos) * options.speedFactor);
			//
			// 	scale/=2;
			// 	if(scale<10){
			// 		scale = "00"+scale;
			// 	}
			// 	if(scale>9 && scale<100){
			// 		scale = "0"+scale;
			// 	}
			//
			// 	gsap.to($this, {
			// 		duration: 0.2,
			// 		scale: 1+"."+scale,
			// 		y: transform,
			// 	});
			// }
		}

		$(window).on('resize', function() {
			update();

		});
		$(window).on('load', function() {
			update();
		});
		$(window).scroll(function() {
			update();
		});
		update();
	};


	$.fn.bgParallax = function(opts) {
		var defaults = {
			speedFactor: 0.4, //value less than one
			objectPosition: "center center", // "right top","left bottom"
			blur: false,
			grow: false,
		};
		var options = $.extend(defaults, opts);

		return this.each(function(){
			$this = $(this);
			parallax($this,options);
		});
	};


	//smoth scroller
	var scroller = function($this,body,options){
		$element = $this;
		if(!body.children("main").length){
			body.prepend("<main>");
			body.children().each(function(index, element){
				if(!($(element)[0].nodeName == "SCRIPT" || $(element)[0].nodeName == "LINK" || $(element)[0].nodeName == "MAIN")){
					$(element).appendTo(body.children("main"));
				}
			});
		}
		function updateResize(){
			
			if($(".footer").hasClass("fixed")){
				var fthight = $(".footer.fixed").outerHeight();
				body.css("padding-bottom",fthight+"px");
			}
			
			var height = $("body").outerHeight();
			body.css("height",height+"px");			
			
			body.children("main").css({
				position: 'fixed',
				left: 0,
				top: 0,
				width: '100%',
				height: '100vh'
			});

			$($element).css({
				position: "relative",
				zIndex:1,
				width: "100%",
				minHeight: "100vh",
				overflow: "hidden"
			});

			gsap.to($element, {
				duration: 0,
				y: - (window.pageYOffset * options.scrollSpeed)
			});
		}
		
		
		$(window).on('resize', function() {
			body.removeAttr("style");
			body.find("main").removeAttr("style");
			updateResize();
		});
		updateResize();

		$(window).on('scroll', function() {
			gsap.to($element, {
				duration: options.duration,
				y: - (window.pageYOffset * options.scrollSpeed)
			});
		});	
	};
	// $.fn.smothScrollerResize = function(opts) {
			// var defaults = {
			// duration: 0.6,
			// scrollSpeed: 1
		// };
		// var options = $.extend(defaults, opts);
			// var body = $("body");
			// body.removeAttr("style");
			// body.find("main").removeAttr("style");
			// scroller($this,body,options);
		// };
	
	$.fn.smothScroller = function(opts) {
		var defaults = {
			duration: 0.6,
			scrollSpeed: 1
		};
		var options = $.extend(defaults, opts);
		 $this = this;
		var body = $("body");
		$(window).on('load', function() {
			scroller($this,body,options);
		});
	};
	//sticky

	var stickybox = function($this,options){
		$element = $this;	
		             
		$elementClass = $element;	
		$winTop = $(window).scrollTop();
		
		$elementHeight = $element.outerHeight();
		$elementPTop = $element.parent().offset().top - options.top;
		$elementPHeight = $element.parent().outerHeight();
		$stopPosition = parseInt($elementPTop+$elementPHeight-$elementHeight);
		setTimeout(function(){
			$documentHeight = $("body").outerHeight();
		}, 100);
			
		
	
		function updateResize(){
			
			setTimeout(function(){
				$changeddocHeight =  $("body").outerHeight();
				$NewdocHeight = $documentHeight - $changeddocHeight;
				$elementPTop-= $NewdocHeight;
				$stopPosition = parseInt($elementPTop+$elementPHeight-$elementHeight);
				$documentHeight = $changeddocHeight;				
			}, 100);
			
			if($winTop>=$elementPTop && $winTop<=$stopPosition){
				gsap.to($elementClass, {
					duration: 0,
					y: parseInt($winTop-$elementPTop)
				});
			}		
		}
		$(window).on('resize', function() {
			updateResize();
		});
		
		$(window).on('scroll', function() {
			$winTop = $(this).scrollTop();
			if($winTop>=$elementPTop && $winTop<=$stopPosition){
				gsap.to($elementClass, {
					duration: options.duration,
					y: parseInt($winTop-$elementPTop)
				});
			}
		});
		updateResize();
		
	};
	
	$.fn.sticky = function(opts) {
		var defaults = {
			duration: 0.6,
			top: 90
		};
		var options = $.extend(defaults, opts);
		var $this = this;
		
		$(window).on('load', function() {
			stickybox($this,options);
		});

	};
	
	
	
	
	$.fn.stopNav = function(opt) {
		
		var element = $(this);
		element.wrap("<div class='min_hc'></div>").parent().css({
			float:'left',
			minHeight: element.height(),
			position:'relative',
			width:'100%',
		});
		
		var offst = element.offset();
		offst = Math.round(offst.top);
		var options = $.extend({
            offset:offst,
			onFixNav:function(){
				return;
			},
			onInheritNav:function(){
				return;
			},
        }, opt );
		
		$(window).scroll(function(){
			shownav(options);
		});
		shownav(options);
		
		function shownav(options){
			if ($(window).scrollTop() > options.offset ) {
				element.css('position','fixed');
				options.onFixNav.call(this);
				element.css('padding','3px 0');
				
			} else {
				element.css('position','inherit')
				options.onInheritNav.call(this);
				element.css('padding','0px 0');					
			}
		}
	};
	
	
	
	$.fn.goToTop = function(opt) {
		
		var element = $(this);
		var options = $.extend({
			offset:400,
			animatespeed:800,
		}, opt );
		

		$(window).scroll(function(){
			goTop(options);
		});
		goTop(options);
		
		
		function goTop(){
			if ($(window).scrollTop() > options.offset) {
				element.fadeIn(100);
			} else {
				element.fadeOut(100);
			}
		}
		//Click event to scroll to top
		element.click(function(){
			$('html, body').animate({scrollTop : 0},options.animatespeed);
			return false;
		});	
	};



	//css Animate on scroll
	//$("body").cssAnimate();
	//<element class="animate__animated" data-animate-class="animate__fadeInLeftBig" data-animate-delay="0.8s">


	$.fn.cssAnimate = function() {
        var $elems = $('.animate__animated');
		$elems.css("visibility","hidden");
        var winheight = $(window).height();
        $(window).on("load", function() {
            $(window).on("scroll", function() {
                animate_elems()
            });
            animate_elems()
        });

        function animate_elems() {
            wintop = $(window).scrollTop();
            $elems.each(function() {
                $elm = $(this);
                $elmClass = $elm.attr('data-animate-class');
                $elmDelay = $elm.attr('data-animate-delay');
                $elmDuration = $elm.attr('data-animate-duration');

                if ($elm.hasClass('animated')) {
                    return !0
                }
                topcoords = $elm.offset().top;
                if (wintop > (topcoords - (winheight * .85))) {
					$elm.css("visibility", "visible");
					$elm.addClass($elmClass + ' animated').css({
						"--animate-duration": $elmDuration,
						"--animate-delay": $elmDelay
                    });
                }
            })
        }
    }
	
})(jQuery);
