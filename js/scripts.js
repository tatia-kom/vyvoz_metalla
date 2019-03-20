$(document).ready(function(){

    $('.open_agreement_modal').click(function (e) {
        e.preventDefault();
        $('#agreement-modal').modal('show');
    });

    $('.phone').inputmask({
        "mask": "+7 (999) 999-99-99"
        , "placeholder": "_"
        , showMaskOnHover: false
        , showMaskOnFocus: true
    });

    $('.metal-form__select').select2({
        width: '100%'
    });

    $('input[type=number]').iLightInputNumber({
        inBox: '.metal-form__number-wrap',
        newInput: '.metal-form__number',
        moreVal: '.metal-form__number-more',
        lessVal: '.metal-form__number-less',
    });

    $('.scroll-link').click(function () {
        if($(this).attr('href')){

            var offs = 69;

            if ($(window).width() < 768) {
                offs = 52;
            }

            $(".navbar-collapse").collapse('hide');

            var el = $(this).attr('href');
            $('body,html').animate({
                scrollTop: $(el).offset().top - offs
            }, 700);
            return false;
        }
    });

    var myMap;
    ymaps.ready(init);
});

function init() {


    var myMap = new ymaps.Map("map", {
        center: [55.751680, 37.566386]
        , zoom: 16
        , controls: ['zoomControl']
    });


    myMap.behaviors.disable('multiTouch');
    myMap.behaviors.disable('scrollZoom');
    var myGeoObjects = [];
    var flag_for_center = true;



    $(".address-for-map").each(function (e) {
        var latt = $(this).attr("data-lat");
        var longg = $(this).attr("data-lon");
        if (flag_for_center) {
            myMap.setCenter([latt, longg], 16, {
                checkZoomRange: false
            });
            flag_for_center = false;
        }
        myGeoObjects[e] = new ymaps.Placemark([latt, longg], {
            clusterCaption: 'Заголовок'
        }, {
            iconLayout: 'default#image'
            , iconImageHref: 'img/map_marker.png'
            , iconImageSize: [61, 61]
            , iconImageOffset: [-30.5, -30.5]
        });
    });


    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false
        , clusterOpenBalloonOnClick: false
        , clusterBalloonPanelMaxMapArea: 0
        , clusterBalloonContentLayoutWidth: 300
        , clusterBalloonContentLayoutHeight: 200
        , clusterBalloonPagerSize: 2
        , clusterBalloonPagerVisible: false
    });


    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);



}
