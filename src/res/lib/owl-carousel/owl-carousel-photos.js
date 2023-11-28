export default class OwlCarouselPhotos {
  constructor(dialogId, dialogName) {
    this.dialogId = dialogId
    this.dialogName = dialogName
  }

    setupOwlCarousel() {
      var dialogId = this.dialogId
      var dialogName = '.'+this.dialogName

        $(dialogId).owlCarousel({
            loop: false,
            navRewind: false,
            dots: true,
            responsiveClass: true,
            autoplay: false,
            margin: 30,
            nav: false,
            responsive: {
                0: {
                    items: 3,
                },
                450: {
                    items: 4
                },
                768: {
                    items: 4
                },
                992: {
                    items: 4,
                },
                1200: {
                    items: 5,
                }
            },
            onInitialized: function (event) {
                console.log('!!!!!onInitialized!!!!!!!afterwards method ' + event.page.index + event.page.count + event.relatedTarget.items().length + event.page.size + event.item.count);
                if (event.item.count > event.page.size) {
                    //$('.cast-prev-movie').show();
                    $(dialogName + ' .cast-next-movie').show();
                    $(dialogName + ' .cast-prev-movie').addClass('disabled');
                } else {
                    $(dialogName + ' .cast-next-movie').hide();
                    $(dialogName + ' .cast-prev-movie').hide();
                }
            }
        });
        var owl = $(dialogId);
        owl.owlCarousel();
        $(dialogName + ' .cast-next-movie').on('click', function () {
            owl.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $(dialogName + ' .cast-prev-movie').on('click', function () {
            owl.trigger('prev.owl.carousel', [300]);
        })
        owl.on('changed.owl.carousel', function (event) {
            console.log("changed" + event.page.index + event.page.count);
            $(dialogName + ' .cast-next-movie').removeClass('disabled');
            $(dialogName + ' .cast-prev-movie').removeClass('disabled');
            if (event.item.index == 0) {
                $(dialogName + ' .cast-prev-movie').addClass('disabled');
            }
            if (event.page.index + 1 == event.page.count) {
                $(dialogName + ' .cast-next-movie').addClass('disabled');
            }
        });
    }
}