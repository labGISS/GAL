/**
 * Loads spinners
**/
function spinners() {
    let spinners = $(".spinner")

    for (let i=1; i<6; i++) {
        let rect = $("<div>").addClass(`rect${i}`);
        spinners.append(rect);
    }
}

$(window).on('load', function() {
    spinners();
});

/* Timeline js */
// let sheet = document.createElement('style'),
//     $rangeInput = $('.range input'),
//     prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
//
// document.body.appendChild(sheet);
//
// const getTrackStyle = function (el) {
//     const curVal = el.value,
//         val = (curVal - 1) * 16.666666667;
//     let style = '';
//
//     // Set active label
//     $('.range-labels li').removeClass('active selected');
//
//     const curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');
//
//     curLabel.addClass('active selected');
//     curLabel.prevAll().addClass('selected');
//
//     // Change background gradient
//     for (let i = 0; i < prefs.length; i++) {
//         style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #fff ' + val + '%, #fff 100%)}';
//         style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
//     }
//
//     return style;
// };
//
// $rangeInput.on('input', function () {
//     sheet.textContent = getTrackStyle(this);
// });
//
// // Change input value on label click
// $('.range-labels li').on('click', function () {
//     const index = $(this).index();
//
//     $rangeInput.val(index + 1).trigger('input');
//
// });
