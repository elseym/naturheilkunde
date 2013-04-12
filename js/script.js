$(function() {
    var scrollspeed = 400;
    
    // init carousel
    var carousel = $('#carousel').carousel();
    
    $.scrollTo(0);
    
    $('a[href^="#"], #logo').on("click", function(e) {
        e.preventDefault();
        var target = '' + ($(this).attr('href') || "");
        if ('#footerinfo' === target) {
            $.scrollTo('100%', scrollspeed);
        } else if (target.length > 1) {
            $.scrollTo(target, scrollspeed, { offset: { top: -100 } });
        } else if ('#' !== target) {
            $.scrollTo(0, scrollspeed);
        }
        // document.location.hash = target;
    });
    
    $(window).scroll(function() {
        // parallax ftw
        carousel.css("top", Math.max(-220, Math.min(140 - ($(window).scrollTop() / 2.3), 140)) + "px");
    })
    
    var address = 'Am Ziegelanger 1, 86899 Landsberg';
    
    $('#routeplanner').on("click", function(e) {
        if (!$(this).text().match(/anzeigen/i)) {
            return true;
        }
        e.preventDefault();
        var icon = $(this).find("i").removeClass('icon-road').addClass("icon-spinner icon-spin");
        $(this).text(" Routenplaner öffnen").prepend(icon);
        $('#map').gmap3({
            getgeoloc: {
                callback: function(latLng) {
                    if (!latLng) icon.addClass('icon-road').removeClass("icon-spinner icon-spin");
                    $('#map').gmap3({
                        getroute: {
                            options: { origin: latLng, destination: address, travelMode: "DRIVING" },
                            callback: function(results){
                                if (results) $(this).gmap3( { directionsrenderer: { options: { directions: results } } } );
                                icon.addClass('icon-road').removeClass("icon-spinner icon-spin");
                            }
                        } 
                    });
                }
            }
        });
    });
    
    $('#map').gmap3({
        map: {
            address: address,
            options: {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                navigationControl: false,
                scrollwheel: false,
                streetViewControl: false
            }
        },
        marker: {
            address: address
        },
        infowindow: {
            address: address,
            options:{
                maxWidth: 700,
                content: $('#kontakt-outer').html(),
            }
        }
    });
});