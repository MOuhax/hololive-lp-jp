
var isTest = false;

var pos = { w: 0, h: 0, y: 0 }

var root = document.documentElement;

var readyAnimationFinished = false;

var currentWatch = 1;
var temp_currentWatch = 1;

var overlay_front_text = [["タレントカラー","サインのプリント","<br />オリジナルロゴマーク","モチーフマーク"],
                         ["タレントカラー","サインのプリント","<br />オリジナルロゴマーク","モチーフマーク"],
                         ["タレントカラー","<br />サインのプリント","<br /><br />オリジナルロゴマーク","<br />モチーフマーク"],
                         ["タレントカラー","<br />サインのプリント","<br /><br />オリジナルロゴマーク","<br />モチーフマーク"],
                         ["タレントカラー","サインのプリント","<br />オリジナルロゴマーク","モチーフマーク"]];

var overlay_back_text = [["タレントカラー","<br /><br />オリジナルロゴマーク","<br />Party2Gether限定<br />描き下ろしイラスト"],
                         ["タレントカラー","<br />オリジナルロゴマーク","<br />Party2Gether限定<br />描き下ろしイラスト"],
                         ["タレントカラー","<br /><br />オリジナルロゴマーク","<br />Party2Gether限定<br />描き下ろしイラスト"],
                         ["タレントカラー","<br /><br />オリジナルロゴマーク","<br />Party2Gether限定<br />描き下ろしイラスト"],
                         ["タレントカラー","<br /><br />オリジナルロゴマーク","<br />Party2Gether限定<br />描き下ろしイラスト"]];


function openWatchOverlay(){
    $('#watch_over_container').attr('class', 'water_over_page'+currentWatch);
        
    $('.watch_over_back_container').hide();
    $('.watch_over_front_container').show();
    
    if (currentWatch == 4){
        temp_currentWatch = 3;
    }else{
        temp_currentWatch = currentWatch;
    }
    
    var temp_currentWatch2 = currentWatch;
    if (currentWatch == 5){
        temp_currentWatch2 = 4;
    }else if (currentWatch == 4){
        temp_currentWatch2 = 3;
    }
    
    $('.watch_over_right').html('<img src="images_m/watch'+currentWatch+'_3.png" />');
    $('.watch_over_left').html('<img src="images_m/watch'+currentWatch+'_2.png" />');
    $('#watch_over_container .watch_name_left').html('<img src="images_m/watch_name'+temp_currentWatch+'.svg" />');
    $('.watch_over_front_container .watch_over_line').html('<img src="images_m/watch_over_line_'+currentWatch+'_1.svg" />');
    $('.watch_over_back_container .watch_over_line').html('<img src="images_m/watch_over_line_'+currentWatch+'_2.svg" />');
    $('.watch_over2_logo').html('<img src="images_m/home_logo'+temp_currentWatch2+'.png" />');
    
    var _html = '';
    var i = 0;
    
    for (i=0;i<overlay_front_text[currentWatch-1].length;i++){
        _html += '<div class="watch_over_line_text watch_over_line_text1_'+i+'">'+overlay_front_text[currentWatch-1][i]+'</div>';
    }
    
    $('#watch_over_front_line_text_container').html(_html);
    
    _html = '';
    
    for (i=0;i<overlay_back_text[currentWatch-1].length;i++){
        _html += '<div class="watch_over_line_text watch_over_line_text2_'+i+'">'+overlay_back_text[currentWatch-1][i]+'</div>';
    }
    
    $('#watch_over_back_line_text_container').html(_html);
        
    $('#watch_over_container').fadeIn();
}

function getCounter(){
    $.post({
        url : 'https://uatdigital.com/Undone/php/getCounter.php'
		}).done(function( data ) {
            //console.log(data);
			var result = jQuery.parseJSON(data);
			//console.log(result);
            //console.log(result.data.attributes.profile_count);
            
            if (result.data.attributes.profile_count){
                //console.log(result.data.attributes.profile_count);
                
                var percentage = Math.min(Math.floor(result.data.attributes.profile_count/5000 * 10000)/100, 100);
                
                //console.log(percentage);
                
                $('#counter_bar_text_percent').html(percentage);
                
                $('.counter_bar').css('width', percentage+'%');
            }
    }).fail(function() {
        
    });
}


function openAnimationStart(){
    $('.openning_container').addClass('page_loaded');
    
    $('#openning_logo').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
         setTimeout(function(){ $('#openning_logo').css('display', 'none'); }, 500);
    });
    
    $('#openning_text2').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
        initSlider();
        
        $('.openning_container').slideUp();
    });
}

$(document).ready(function () {
    
    setTimeout(function(){ readyAnimationFinished = true; }, 1000);

	//$(window).resize(onResize);
	//onResize();
    
    $('.bubble_open_overlay2').on('click tap', function () {
		$('.watch_over_back_container').fadeIn();
        $('.watch_over_front_container').fadeOut();
	});
    $('.bubble_open_overlay1').on('click tap', function () {
		$('.watch_over_back_container').fadeOut();
        $('.watch_over_front_container').fadeIn();
	});
    
    $('.watch_over_close').on('click tap', function () {
		$('#watch_over_container').fadeOut();
        
        swiper4.autoplay.start();
	});
    
    $('.bubble_open_overlay').on('click tap', function () {
        currentWatch = $(this).data('no');
        
        openWatchOverlay();
        
        swiper4.autoplay.stop();
	});
    
    $('.signup_btn').on('click tap', function () {
        window._klOnsite = window._klOnsite || [];
        window._klOnsite.push(['openForm', 'XEgnSK']);
	});
    
    
    
    $('.openning_container').addClass('ani_start');
    
    getCounter();
})

var openningIsStart = false;

function imgOnLoad(){
    //console.log("A");
    //console.log($('.first_load_item')[0].complete);
    
    var j = 0;
    
    for (var i=0;i<$('.first_load_item').length;i++){
        if ($('.first_load_item')[i].complete){ j++ }
        
        //console.log(i + " : "+$('.first_load_item')[i].complete)
    }
    
    if (j == $('.first_load_item').length){
        openningImageLoaded();
    }
}

function openningImageLoaded(){
    //console.log("openningImageLoaded : "+openningIsStart);
    
    if (openningIsStart) return;
    
    if (isTest){
        if ($('.openning_container').length > 0){
            $('.openning_container').slideUp();

            initSlider();

            openningIsStart = true;

            return;
        }else{
            return;
        }
    }
        
    if (readyAnimationFinished){
        openAnimationStart();
    }else{
        setTimeout(openAnimationStart, 1000);
    }
        
    openningIsStart = true;
}

$(window).on('load', function () {
    openningImageLoaded();
}) 

var swiper4;

function initSlider(){
    var swiper2 = new Swiper(".gallery_photo_container", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".gallery_photo_dot_container",
            clickable: true,
        }
    });
    
    var swiper3 = new Swiper(".banner_container", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        }
    });
    
    swiper4 = new Swiper(".watch_slide_container", {
        loop: true,
        slidesPerView: 1.0001,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".watch_arrow_right",
            prevEl: ".watch_arrow_left",
        }
    });
    
    swiper4.on('slideChange', function (e) {
        //console.log('*** mySwiper.realIndex', swiper4.realIndex);
        
        $('#watch_bottom_box').attr('class', 'page'+ (swiper4.realIndex+1));
    });
    
    var swiper5 = new Swiper(".surprise_tab_container", {
        loop: true,
        slidesPerView: 1.0001,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".suprise_arrow_right",
            prevEl: ".suprise_arrow_left",
        }
    });
    
    
    
}

function openLoading(){
	$('.loading').fadeIn();
}

function closeLoading(){
	$('.loading').fadeOut();
}


//=============



function initPreloadBg() {
	
}


window.mobilecheck = function () {
	var check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

var docEl = $('html, body'),
	wrap = $('.content-wrapper'),
	bodyScrollTop;

var bodyLocked = false;

lockBody = function () {
	if (window.pageYOffset) {
		bodyScrollTop = window.pageYOffset;

		wrap.css({
			top: - (bodyScrollTop)
		});
	}

	docEl.css({
		height: "100%",
		overflow: "hidden"
	});
	
	bodyLocked = true;
}

unlockBody = function () {
	docEl.css({
		height: "",
		overflow: ""
	});

	wrap.css({
		top: ''
	});

	window.scrollTo(0, bodyScrollTop);
	window.setTimeout(function () {
		bodyScrollTop = null;
	}, 0);
	
	bodyLocked = false;
}
