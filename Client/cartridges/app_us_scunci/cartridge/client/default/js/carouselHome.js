console.log('Home.js File');
const { divide } = require("lodash");

var winWidth = $(window).width();
try {

    var ig = $('.owl-carousel.instagramFeed'),
        ige = $('.instagramFeed')
    count = 12,
    token=$('#token').val();
       //token ='IGQVJVY0pEcVBCMUMxNFFSNHVRUEkxNXJ6VUwwcG9TOXBEdXRPVUc1UldHTEt1VlkzN3NUelBKNGxxTVRxTTc5TXB3dWRJLXM4UFBwMlMtTzFEelFMcE9JcXYwSEtQUjdhaEtnRDhWUTZAjS0xhajJieQZDZD',
        igURL =
        "https://graph.instagram.com/me/media?fields=username,caption,media_type,media_url,thumbnail_url,permalink&access_token=" +
        token + "&limit=" + count;
console.log(igURL);

    $.ajax({
        url: igURL,
        type: 'GET',
        dataType: "jsonp",
        success: function(result) {
            var post = result.data,
                html;
            var counter = 0;
            $.each(post, function(i) {
                var postLink = post[i].permalink,
                    postType = post[i].media_type,
                    postImage = post[i].media_url,
                    postCaption = post[i].caption,
                    postUser = post[i].username;
                if (postType === 'VIDEO') {
                    postImage = post[i].thumbnail_url;
                }
                html = '<div class="item">' +
                    '<a href="' + postLink + '" target="_blank" title="View on Instagram">' +
                    '<img class="img-fluid img-sizes mx-auto d-block" src="' + postImage + '" alt="@' + postUser + '"/>'
                '</a>' +
                    '</div>';


                $(ig).append(html);
                $(ig).innerHTML += html;
                if (counter == 0) {
                    counter++;
                }
            });
            $(ig).owlCarousel({
                autoplayTimeout: 5000, //Set AutoPlay to 3 seconds
                items: 5,
                dots: false,
                nav: false,
                margin: 14,
                // navText: ["<span class='carousel-control-prev-icon' aria-hidden='true'></span>", "<span class='carousel-control-next-icon' aria-hidden='true'></span>"],
                autoplay: true,
                loop: true,
                // itemsMobile : [0,1.2],
                // itemsTablet : [768,3],
                responsive: {
                    0: {
                        items: 1.2
                    },
                    768: {
                        items: 3
                    },
                    1000: {
                        items: 5
                    }
                }
            });
        },
        error: function() {
            html =
                "<p>An unknown error has occurred. Please refresh the page and try again.</p>";
            $(ige).append(html)
        }
    });

    //instagram feeds end //

    $('.owl-carousel.BeautyBar-ProductSlider').owlCarousel({
        items: 3,
        loop: true,
        dots: false,
        margin: 38,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1.3
            },
            767: {
                items: 3
            }
        }
    });

    $('.owl-carousel.homeTrendProductSlots').owlCarousel({
        items: 3,
        loop: true,
        dots: false,
        margin: 38,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1.3
            },
            767: {
                items: 3
            }
        }
    });

    $('.owl-carousel.alsoLikeProductSlider').owlCarousel({
        items: 3,
        loop: true,
        dots: true,
        nav: true,
        navText: ["<span class='carousel-control-prev-icon' aria-hidden='true'></span>", "<span class='carousel-control-next-icon' aria-hidden='true'></span>"],
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1.3,
                margin: 10,
            },
            767: {
                items: 3,
                margin: 15
            },
            1000: {
                items: 3,
                margin: 33
            }
        }
    });

    $('.owl-carousel.recentlyViwedProductSlots').owlCarousel({
        items: 3,
        loop: true,
        dots: true,
        nav: true,
        navText: ["<span class='carousel-control-prev-icon' aria-hidden='true'></span>", "<span class='carousel-control-next-icon' aria-hidden='true'></span>"],
        margin: 33,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1.3,
                margin: 10,
            },
            767: {
                items: 3,
                margin: 15
            },
            1000: {
                items: 3,
                margin: 33
            }
        }
    });

    $('.owl-carousel.product-image-carousel').owlCarousel({
        items: 3,
        loop: false,
        dots: false,
        nav: true,
        margin: 15,
        navText: ["<span class='carousel-control-prev-icon' aria-hidden='true'></span>", "<span class='carousel-control-next-icon' aria-hidden='true'></span>"],
        autoplay: false,
    });

} catch (Error) {
    console.log(Error);
}