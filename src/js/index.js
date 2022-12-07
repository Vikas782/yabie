
// css file
import '../sass/style.scss';

import {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
} from 'bootstrap';


const bootstrap = window.bootstrap = require('bootstrap');

// init Swiper:
const swiper = new Swiper('.swiper', {

});


// trigger popover
/*var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl,{html:true})
});*/

// dropdown on hover
/*var dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
dropdownElementList.forEach(function (dropdownToggleEl) {
    var dropdown = new bootstrap.Dropdown(dropdownToggleEl);
    dropdownToggleEl.addEventListener('click', function (event) {
        window.location.href = dropdownToggleEl.getAttribute("href");
    });
    dropdownToggleEl.addEventListener('mouseenter', function () {
        dropdown.show();
    });
    dropdownToggleEl.offsetParent.addEventListener('mouseleave', function () {
        dropdown.hide();
    });
});*/

// open tabs on hover
/*var tabElementList = [].slice.call(document.querySelectorAll('.scrollDisplay [data-bs-toggle="tab"]'));
tabElementList.forEach(function (tabToggleEl) {
    var tab = new bootstrap.Tab(tabToggleEl);
    tabToggleEl.addEventListener('click', function (event) {

        setTimeout(function() {
            console.log("testing2");
            window.location.href = tabToggleEl.getAttribute("href");
        },300)
    });
    tabToggleEl.addEventListener('mouseenter', function () {
        tab.show();
    });
    tabToggleEl.offsetParent.addEventListener('mouseleave', function () {
        tab.hide();
    });
});*/


// open tabs with #link
/*var hash = window.location.hash;
if(hash){
    var triggerEl = document.querySelector('#pills-tab button[data-bs-target="'+hash+'"]');
    if(triggerEl != null){
        bootstrap.Tab.getInstance(triggerEl).show(); // Select tab by name
    }
}*/


//trigger Animatin on tab change
/*var tabEls = document.querySelectorAll('#pills-tab button[data-bs-toggle="pill"]');
tabEls.forEach(function (tabEl) {
    tabEl.addEventListener('shown.bs.tab', function (event) {
        // cf.triggerViewPort(event.target.getAttribute("data-bs-target"), {
        //     onLoad:animate.tabingTextSet,
        //     onTrigger:animate.tabingText,
        //     triggerPosition: 0.5,
        // });
    });
});*/

// scroll behavior smooth
/*document.querySelectorAll('a[href^="#"]').forEach(function(anchor,index){
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});*/


// html video play pause
/*var vButton = document.querySelector(".media-video--button");
if(vButton){
    vButton.addEventListener("click", function() {
        var video = vButton.getAttribute("data-id");
        video = document.getElementById(video);
        if (video.paused) {
            video.play();
            vButton.classList.add("pause");
        } else {
            video.pause();
            vButton.classList.remove("pause");
        }
    });
}*/


// Bind to the window
window.cf = {
    getOffsetTop(elem){
        var offsetTop = 0;
        do {
            if ( !isNaN( elem.offsetTop ) )
            {
                offsetTop += elem.offsetTop;
            }
        } while( elem = elem.offsetParent );
        return offsetTop;
    },
    extend(a, b){
        for(var key in b)
            if(b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    },
    wrap(el, wrapper,classlist) {
        el.parentNode.insertBefore(wrapper, el);
        classlist.forEach(function(item){
            wrapper.classList.add(item);
        });
        wrapper.appendChild(el);
    },
    viewPort(eleSelector,opts){
        var defaults = {
            speed: 1,
            position: 0.85,
            onLoad: function(){},
            onViewPort: function(){},
            offViewPort: function(){}

        };
        var options = cf.extend(defaults, opts);
        var elems = document.querySelectorAll(eleSelector);

        elems.forEach(function(elem,index) {
            if(!elem){
                return;
            }
            options.onLoad(elem,index);
            document.addEventListener('scroll', function(e) {
                scrolledContent();
            }, false);

            window.addEventListener('load', function(e) {
                scrolledContent();
            });

            function scrolledContent(){
                let winHeight = window.innerHeight;
                let eleHeight = elem.offsetHeight;
                let scrollerPosition = window.pageYOffset || document.documentElement.scrollTop;
                let eleTopPosition = cf.getOffsetTop(elem);
                let topPosition;
                if (eleTopPosition + eleHeight < scrollerPosition || eleTopPosition > scrollerPosition + (winHeight * options.position)) {
                    options.offViewPort(elem,scrollerPosition,index);
                    return;
                }
                topPosition = window.scrollY-eleTopPosition+(winHeight * options.position) * options.speed;
                options.onViewPort(elem,scrollerPosition,topPosition,index);

            }
        });
    },
    triggerViewPort(eleSelector,opts) {
        var defaults = {
            triggerPosition: 0.85,
            onLoad: function(){},
            onTrigger: function(){}
        };
        var options = cf.extend(defaults, opts);
        var winHeight = window.innerHeight;
        var elems = document.querySelectorAll(eleSelector);
        elems.forEach(function(elem,index) {
            if(!elem){
                return;
            }
            options.onLoad(elem,index);
            let eleStatus = true;
            document.addEventListener('scroll', function(e) {
                scrolledContent();
            });

            window.addEventListener('load', function(e) {
                scrolledContent();
            });

            function scrolledContent(){
                let ScrollerPosition = window.scrollY;
                let eleTopPosition = cf.getOffsetTop(elem);
                if(!eleStatus){
                    return;
                }
                if (ScrollerPosition > (eleTopPosition - (winHeight * options.triggerPosition))) {
                    options.onTrigger(elem,index);
                    eleStatus = false;
                }
            }
        });
    },
    fixedHeader(eleSelector,opts) {
        var defaults = {};
        var options = cf.extend(defaults, opts);
        var header = document.querySelector(eleSelector);
        if(!header){ return;}
        let headerHt = header.clientHeight;
        let lastScrollTop = 0;

        let button = header.querySelector('[data-bs-toggle="collapse"]');
        let myCollapse;

        if(button){
            let buttonid = button.getAttribute("data-bs-target");
            myCollapse = header.querySelector(buttonid);
            myCollapse = bootstrap.Collapse.getOrCreateInstance(myCollapse,{
                toggle: false
            });
        }
        function handleScroll() {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop ){
                header.style.top = "-"+headerHt +"px";
                if(button){
                    myCollapse.hide();
                }

            } else {
                // upscroll code
                header.style.top = "0px";
                if(button){
                    myCollapse.hide();
                }
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }
        document.addEventListener('scroll', handleScroll, false);
    },
    pageLoader(eleSelector,opts){
        var defaults = {
            duration: 0.4,
            nextElement: null
        };
        var options = cf.extend(defaults, opts);

        var pL = document.querySelector(eleSelector);
        if(pL){
            var pLOverlay = document.querySelector('.pl-overlay');
            var pLLogo = document.querySelector('.pl-logo');

            function onPageLoad(){
                pL.style.visibility = "hidden";
                gsap.set(pLOverlay, {yPercent: 0});
            }

            pL.style.visibility = "visible";

            window.addEventListener("load", (e) => {
                setTimeout(function(){
                    var tl = gsap.timeline({onComplete: onPageLoad});
                    tl.to(pLLogo, {duration: options.duration, opacity: 0,});
                    tl.to(pLOverlay, {duration: options.duration,ease: "power1.in", yPercent: -100});
                    tl.from(options.nextElement, {duration: options.duration,ease: "power1.out", y: 100},"-="+options.duration/2);
                },800)
            });
        }
    },
    smoothScroller(eleSelector,opts){
        var defaults = {
            ease: 0.07, // <= scroll speed
            endY: 0,
            y: 0,
            resizeRequest: 1,
            scrollRequest: 0,
        };
        var scroller = cf.extend(defaults, opts);

        scroller.target =  document.querySelector(eleSelector);
        if(scroller.target){
            scroller.target.classList.add("scroller-content","overflow-hidden","position-absolute","w-100","zi-999");
            cf.wrap(scroller.target, document.createElement('div'),["scroller-waper","overflow-hidden","position-fixed","w-100","h-100","start-0","end-0","top-0","bottom-0"]);

            var html = document.documentElement;
            var body = document.body;
            var requestId = null;

            gsap.set(scroller.target, {
                force3D: true
            });

            window.addEventListener("load", onLoad);

            function onLoad() {
                updateScroller();
                window.focus();
                window.addEventListener("resize", onResize);
                document.addEventListener("scroll", onScroll);
            }

            function updateScroller() {

                var resized = scroller.resizeRequest > 0;

                if (resized) {
                    var height = scroller.target.clientHeight;
                    body.style.height = height + "px";
                    scroller.resizeRequest = 0;
                }

                var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
                scroller.endY = scrollY;
                scroller.y += (scrollY - scroller.y) * scroller.ease;
                if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
                    scroller.y = scrollY;
                    scroller.scrollRequest = 0;
                }

                gsap.set(scroller.target, {
                    y: -scroller.y
                });
                requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
            }

            function onScroll() {
                scroller.scrollRequest++;
                if (!requestId) {
                    requestId = requestAnimationFrame(updateScroller);
                }
            }

            function onResize() {
                scroller.resizeRequest++;
                if (!requestId) {
                    requestId = requestAnimationFrame(updateScroller);
                }
            }
        }
    }
};



window.counter = {
    numberCountSet(elem) {
        let elements = elem.querySelectorAll("[data-counter]");
        elements.forEach(function(element,index) {
            element.innerHTML = 0;
        });
    },
    numberCount(elem) {
        let elements = elem.querySelectorAll("[data-counter]");
        elements.forEach(function(element,index) {
            let x = 0;
            let count = parseInt(element.getAttribute("data-counter"));
            const myInterval = setInterval(myCounter, 40);
            function myCounter() {
                x++;
                element.innerHTML = x;
                if (x >= count) {
                    clearInterval(myInterval);
                    element.innerHTML = count;
                }
            }
        });
    },
};

document.querySelectorAll('a[href^="#"]').forEach(function(anchor,index){
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




window.animate = {
    landingSet(elem,index) {
        gsap.set(elem.querySelector('.landing-img'), {
            y: 100,
            opacity:0
        });

        gsap.set(elem.querySelectorAll('.landing-title,.landing-wm,.landing-dec,.landing-btn,.scroll-down-circle,.made-with-love'), {
            y: 80,
            opacity:0
        });
    },
    landing(elem) {

        let tl = gsap.timeline({defaults: {duration: 1}});
        tl.to(elem.querySelector('.landing-img'), {
            y: 0,
            opacity:1,
        });
        tl.to(elem.querySelectorAll('.landing-title,.landing-wm,.landing-dec,.landing-btn,.scroll-down-circle,.made-with-love'), {
            y: 0,
            opacity:1,
            stagger: 0.4,
        },"-=0.3");
        tl.delay(2);
    },

    headingSet(elem) {
        gsap.set(elem.querySelectorAll('h3,p'), {
            x: 100,
            opacity:0,
        });
    },
    heading(elem) {
        gsap.to(elem.querySelectorAll('h3,p'), {
            x: 0,
            opacity:1,
            duration: 1,
            stagger: 0.2
        });
    },

    slideupSet(elem) {
        gsap.set(elem.querySelectorAll('.card'), {
            y: 100,
            opacity:0,
        });
    },
    slideup(elem) {
        gsap.to(elem.querySelectorAll('.card'), {
            y: 0,
            opacity:1,
            duration: 1,
            stagger: 0.20
        });
    },
    /*
    landingSet(elem,index) {
        gsap.set(elem.querySelector('.landing-img'), {
            y: 100,
            opacity:0
        });
    },
    landing(elem) {
        gsap.to(elem.querySelector('.landing-img'), {
            y: 100,
            opacity:1,
            duration: 1,
            stagger: 0.2
        });
    },

    zoomInSet(elem) {
        gsap.set(elem.querySelectorAll('.card'), {
            scale: 0,
            opacity:0,
            transformOrigin: "50% 50%",
        });
    },
    zoomIn(elem) {
        gsap.to(elem.querySelectorAll('.card'), {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.20,
            transformOrigin: "50% 50%",
        });

        let animateEle = elem.querySelector('.animate-lottie');
        if(animateEle){
            let dataId = animateEle.getAttribute("data-id");
            lottie[dataId].stop();
            lottie[dataId].play();
        }
    },
    textMediaSet(elem) {
        gsap.set(elem.querySelectorAll('.textMedia-img img'), {
            scale: 0,
            opacity:0,
            transformOrigin: "50% 50%",
        });
    },
    textMedia(elem) {
        gsap.to(elem.querySelectorAll('.textMedia-img img'), {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.20,
            transformOrigin: "50% 50%",
        });
        let animateEle = elem.querySelector('.animate-lottie');
        let dataId = animateEle.getAttribute("data-id");
        lottie[dataId].play();
    },
    illustrationDisplaySet(elem) {

    },
    illustrationDisplay(elem) {
        let animateEle = elem.querySelectorAll('.animate-lottie');
        animateEle.forEach(function(item,index){
            let dataId = item.getAttribute("data-id");
            lottie[dataId].play();
        });
    },
    illustrationTitleSet(elem) {
    },
    illustrationTitle(elem) {
        let animateEle = elem.querySelector('.animate-lottie');
        let dataId = animateEle.getAttribute("data-id");
        lottie[dataId].play();
    },*/
};

window.pAnimate = {
    sideNavFixedSet(elem) {
        gsap.set(".sidebar", {
            y: 0,
        });
    },
    sideNavFixed(elem,scroller,topPosition) {
        if(screen.width < 768){
            let sidebar = document.querySelector(".sideNav");
            let eleHeight = elem.offsetHeight;
            let eleTopPosition = cf.getOffsetTop(elem);
            if(topPosition>100 && eleHeight+eleTopPosition>(scroller+100)){
                console.log(scroller);
                sidebar.classList.add("fixed");
            }
            else{
                setTimeout(function () {
                    sidebar.classList.remove("fixed");
                },100);
            }
        }
    },
    landingSet(elem) {
        gsap.set(elem.querySelector(".scroll-down-circle"), {
            opacity: "0",
            x: 0,
        });
    },

    landing(elem,scroller,topPosition) {
        let opacity;
        let oVal;

        if((topPosition/3)>=99){
            opacity = 0;
        }
        else{
            opacity = Math.round(Math.abs((topPosition/3)-99));
        }
        if(opacity<10){
            oVal = "0.0"+ opacity;
        }
        else{
            oVal = "0."+ opacity;
        }

        if(topPosition>0){
            gsap.to(elem.querySelector(".scroll-down-circle"), {
                duration: 1,
                opacity: oVal,
                y: 0,
                x: -topPosition/2,
            });
        }
    },
};



cf.triggerViewPort(".slideup", {
    onLoad: animate.slideupSet,
    onTrigger: animate.slideup,
    triggerPosition: 0.65,
});


cf.triggerViewPort(".heading", {
    onLoad: animate.headingSet,
    onTrigger: animate.heading,
    triggerPosition: 0.65,
});
/*
cf.triggerViewPort(".landing", {
    onLoad:animate.landingSet,
    onTrigger:animate.landing,
    triggerPosition: 0.2,
});

cf.triggerViewPort(".zoomin", {
    onLoad: animate.zoomInSet,
    onTrigger: animate.zoomIn,
    triggerPosition: 0.65,
});

cf.triggerViewPort(".layout-wrap", {
    onLoad: animate.layoutwrapSet,
    onTrigger: animate.layoutwrap,
    triggerPosition: 0.7,
});

cf.triggerViewPort(".slideup", {
    onLoad: animate.slideupSet,
    onTrigger: animate.slideup,
    triggerPosition: 0.65,
});

cf.triggerViewPort(".textMedia", {
    onLoad: animate.textMediaSet,
    onTrigger: animate.textMedia,
    triggerPosition: 0.40,
});
cf.triggerViewPort(".scrollDisplay", {
    onLoad: animate.scrollDisplayLineSet,
    onViewPort: animate.scrollDisplayLine,
    triggerPosition: 0.40,
});

cf.triggerViewPort(".scrollDisplay", {
    onLoad:animate.scrollDisplayImgSet,
    onTrigger:animate.scrollDisplayImg,
    triggerPosition: 0.2,
});

cf.triggerViewPort(".illustrationDisplay", {
    onLoad:animate.illustrationDisplaySet,
    onTrigger:animate.illustrationDisplay,
    triggerPosition: 0.2,
});
cf.triggerViewPort(".illustrationTitle", {
    onLoad:animate.illustrationTitleSet,
    onTrigger:animate.illustrationTitle,
    triggerPosition: 0.2,
});
*/

cf.triggerViewPort(".counter", {
    onLoad: counter.numberCountSet,
    onTrigger: counter.numberCount,
    triggerPosition: 0.90,
});


/*
cf.viewPort(".landing", {
    onLoad: pAnimate.landingSet,
    onViewPort: pAnimate.landing,
    position: 0,
    speed: 1,
});

cf.viewPort(".location", {
    onLoad: pAnimate.sideNavFixedSet,
    onViewPort: pAnimate.sideNavFixed,
    position: 0,
});
*/



cf.pageLoader("#loader",{
    nextElement: ".scroller-waper"
});

cf.smoothScroller("#scroller",{
    //ease: 0.09,
});

//
// gsap.registerPlugin(ScrollTrigger);
//
//
// ScrollTrigger.create({
//     trigger: ".bg-warning",
//     start: "top top",
//     end: "+=300px",
//     pin:true,
//     pinSpacing:true,
// });



// jquery functions
/*$(document).ready(function(){
    //$("body").cssAnimate();

    if($('.marquee').length) {
        $('.marquee').marquee({
            duration: 18000,
            startVisible: true,
            duplicated: true,
        });
    }
});*/


















