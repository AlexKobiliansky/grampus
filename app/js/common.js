$(document).ready(function(){

    <!-- javascript -->
    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
    <!-- /javascript -->


    function casesMeta (item){
        var metaImg = item.data('adimg'),
            metaPreview = item.data('previewname'),
            metaClickBefore = item.data('clickbefore'),
            metaClickAfter = item.data('clickafter'),
            metaClaimBefore = item.data('claimbefore'),
            metaClaimAfter = item.data('claimafter');

        $('#advert-img').attr('src', metaImg);
        $('#click-before').text(metaClickBefore);
        $('#click-after').text(metaClickAfter);
        $('#claim-before').text(metaClaimBefore);
        $('#claim-after').text(metaClaimAfter);

    }


    /** CASES FUNCTIONALITY start **/
    $('.cases-slider').on('initialized.owl.carousel', function (e) {
        var firstSlide = $('.cases-slider .owl-item.active');

        var currentSlideIndex = e.item.index + 1;
        var currentSlide = $(".cases-slider .owl-item:nth-child("+currentSlideIndex+")");
        var currentItem = currentSlide.find('.case-slide');

        var prevSlide = $(".cases-slider .owl-item:nth-child("+(currentSlideIndex-1)+")");
        var prevItem = prevSlide.find('.case-slide');
        var prevItemPreview = prevItem.data('previewname');

        var nextSlide = $(".cases-slider .owl-item:nth-child("+(currentSlideIndex+1)+")");
        var nextItem = nextSlide.find('.case-slide');
        var nextItemPreview = nextItem.data('previewname');



        casesMeta(currentItem);
        $("#cases-prev-name").text(prevItemPreview);
        $("#cases-next-name").text(nextItemPreview);

        currentSlide.addClass('explice');
    });

    var $casesSlider = $('.cases-slider').owlCarousel({
        loop: true,
        nav: false,

        margin: 70,
        dots: false,
        autoHeight: false,
        navText: ["",""],
        responsive : {
            // breakpoint from 0 up
            0 : {
                items: 1,
            },
            // breakpoint from 992 up
            992 : {
                items: 2
            }
        }
    });

    $('.cases-prev').click(function() {
        $casesSlider.trigger('prev.owl.carousel');
    });

    $('.cases-next').click(function() {
        $casesSlider.trigger('next.owl.carousel');
    });

    $casesSlider.on('changed.owl.carousel', function (e) {
        $('.cases-slider .owl-item').removeClass('explice');
        var currentSlideIndex = e.item.index + 1;
        console.log(currentSlideIndex);
        var currentSlide = $(".cases-slider .owl-item:nth-child("+currentSlideIndex+")");
        var nextSlide = $(".cases-slider .owl-item:nth-child("+(currentSlideIndex+1)+")");
        var prevSlide = $(".cases-slider .owl-item:nth-child("+(currentSlideIndex-1)+")");
        var currentItem = currentSlide.find('.case-slide');
        var nextItem = nextSlide.find('.case-slide');
        var prevItem = prevSlide.find('.case-slide');
        var nextItemPreview = nextItem.data('previewname');
        var prevItemPreview = prevItem.data('previewname');

        currentSlide.addClass('explice');

        casesMeta(currentItem);

        $("#cases-next-name").text(nextItemPreview);
        $("#cases-prev-name").text(prevItemPreview);

    });
    /** CASES FUNCTIONALITY end **/

    function heightses() {
        if ($(window).width()>=992) {
            $('.price-item-top').matchHeight();
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    /** FORMS start */
    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });


    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
    /** FORMS end */
});
