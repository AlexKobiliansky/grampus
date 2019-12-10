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








    /** YA-MAPS */
        //Переменная для включения/отключения индикатора загрузки
    var spinner = $('.loader');
    //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
    var check_if_load = false;
    //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
    //var myMapTemp, myPlacemarkTemp;


    //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
    function init () {
        var mapId = $('#map'),
            attitude = mapId.data("att"),
            longtitude = mapId.data("long"),
            zoom = mapId.data("zoom"),
            marker = mapId.data("marker"),
            map = new ymaps.Map("map", {
                center: [attitude, longtitude],
                controls: ['geolocationControl'],
                zoom: zoom
            }),

            myPlacemark = new ymaps.Placemark(map.getCenter(), {  iconContent: '12'}, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: marker,
                // Размеры метки.
                iconImageSize: [50, 66],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-40, -70],
            });

        map.geoObjects.add(myPlacemark);
        // map.behaviors.disable('scrollZoom');


        //Если нужно сместить центр карты на странице:
        var position = map.getGlobalPixelCenter();
        map.setGlobalPixelCenter([ position[0] - 250, position[1] ]);

        if ($(window).width() < 768) {
            map.setGlobalPixelCenter([ position[0], position[1]]);
        }

        // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        var layer = map.layers.get(0).get(0);

        // Решение по callback-у для определения полной загрузки карты
        waitForTilesLoad(layer).then(function() {
            // Скрываем индикатор загрузки после полной загрузки карты
            spinner.removeClass('is-active');
        });
    }


    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            var tc = getTileContainer(layer), readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }


    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
    var ymap = function() {
        $('.map-wrapper').on( "mouseenter", function(){
            if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                    ymaps.load(init);
                });
            }
        });
    };

    ymap();
});
