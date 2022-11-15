"use strict";

// Dom7
var $ = Dom7;


// Init App
var app = new Framework7({
  root: '#app',
  theme: 'md',
  routes: routes,
  view: {
    pushState: false
  },
  on: {
    pageInit: function(page) {
      feather.replace();

      if (document.getElementById("masonry") !== null) {
        var masonry = new Macy({
          container: '#masonry',
          mobileFirst: true,
          columns: 1,
          margin: {
            y: 10,
            x: 10,
          },
          breakAt: {
            320: 2,
            360: 2,
            576: 3,
            600: 3,
            768: 3,
            1024: 4,
          },
        });
      }

      let swiper = new Swiper('.list-posts-full-bg-swipper', {
        loop: true,
        spaceBetween: 20,
        breakpoints: {
          320: {
            "slidesPerView": "1.1"
          },
          400: {
            "slidesPerView": "1.4"
          },
          768: {
            "slidesPerView": "2.5"
          },
          1024: {
            "slidesPerView": "3.5"
          },
          600: {
            "slidesPerView": "2.2"
          },
          240: {
            "slidesPerView": "1.1"
          },
          834: {
            "slidesPerView": "3.2"
          },
          1920: {
            "slidesPerView": "6.3"
          },
          360: {
            "slidesPerView": "1.2"
          },
          576: {
            "slidesPerView": "2.2"
          }
        },
        on: {
          transitionEnd: function() {
            let rgba = $(".swiper-slide-active").attr("data-color");
            $(".newsman-page-gradient").css("background-color", rgba);
            console.log(rgba);
          },
        },
      });
      // Authors list
      let swiperAuthors = new Swiper('.authors-card .swiper-container', {
        loop: true,
        spaceBetween: 10,
        breakpoints: {
          320: {
            "slidesPerView": "2.1"
          },
          400: {
            "slidesPerView": "2.5"
          },
          768: {
            "slidesPerView": "4.5"
          },
          1024: {
            "slidesPerView": "5.5"
          },
          600: {
            "slidesPerView": "3.2"
          },
          240: {
            "slidesPerView": "1.1"
          },
          834: {
            "slidesPerView": "4.5"
          },
          1920: {
            "slidesPerView": "6.3"
          },
          360: {
            "slidesPerView": "2.1"
          },
          576: {
            "slidesPerView": "3.2"
          }
        },
      });
      // Card posts
      let swiperCard = new Swiper('.list-posts-card .swiper-container', {
        loop: true,
        spaceBetween: 20,
        breakpoints: {
          320: {
            "slidesPerView": "1.1"
          },
          400: {
            "slidesPerView": "1.4"
          },
          768: {
            "slidesPerView": "2.5"
          },
          1024: {
            "slidesPerView": "3.5"
          },
          600: {
            "slidesPerView": "2.2"
          },
          240: {
            "slidesPerView": "1.1"
          },
          834: {
            "slidesPerView": "3.2"
          },
          1920: {
            "slidesPerView": "6.3"
          },
          360: {
            "slidesPerView": "1.2"
          },
          576: {
            "slidesPerView": "2.2"
          }
        }
      });
    },
  }
});

// Menu
$("body").on("click", ".toolbar .link", function(e) {
  $(".link.tab-link-active").removeClass("tab-link-active");
  $(this).addClass("tab-link-active");
});


$(document).on('page:init', '.page[data-name="page-blog-four"]', function(e) {
  let masonry2 = new Macy({
    container: '#masonry-two',
    mobileFirst: true,
    columns: 1,
    margin: {
      y: 10,
      x: 10,
    },
    breakAt: {
      320: 2,
      360: 2,
      576: 3,
      600: 3,
      768: 3,
      1024: 4,
    },
  });
})