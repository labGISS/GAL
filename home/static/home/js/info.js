function setListeners() {
// listen for clicks on the navbar, we need to change the active navbar item and scroll to selected section
    $('.navbar').on('click', (e) => {
        // ignore it if the click isn't on an anchor element
        if (e.target.tagName.toLowerCase() === 'a') {
            let $this = e.target;
            console.log($this);
            // remove the 'active' class from all of the nav anchors
            // document.querySelectorAll('.navbar a')
            //     .forEach(e => e.classList.remove('active'));

            $('.navbar a').removeClass('active');
            // add the 'active' class to the clicked element
            $($this).addClass('active');

            // scroll
            if (
                location.pathname.replace(/^\//, '') === $this.pathname.replace(/^\//, '')
                &&
                location.hostname === $this.hostname
            ) {

                // Figure out element to scroll to
                let target = $($($this).attr('href'));
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    e.preventDefault();
                    scrollSectionsToTarget(target, function () {
                        // Callback after animation
                        // Must change focus!
                        const $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    });
                }
            }
        }
    });
}

function scrollSectionsToTarget(target, callback=undefined) {
    let currentScrollPosition = $('.sections').scrollTop();
    let targetOffsetPosition = target.offset().top - 64 // target.offset returns the target distance from the current scroll position
    // since animate() requires the position to scroll STARTING FROM TOP (position 0) we have to sum both distances
    $(".sections").animate({
        scrollTop: currentScrollPosition + targetOffsetPosition
    }, 700, callback);
}


function initPage() {
    setListeners()

    // on load actions
    $(window).on('load', function () {
        $('#navigation-button-info').addClass("selected");
        // scrollSectionsToTarget($('#home'))
    });
}
