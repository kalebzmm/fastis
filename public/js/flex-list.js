/*! flex-list.js | Huro | Css Ninja 2020-2021 */
"use strict";

function disableSearchWhenTableEmpty() {
    $(".is-slider .tabs li").on("click", (function() {
        setTimeout((function() {
            0 === $(".page-content.tabs-wrapper .tab-content.is-active .flex-table-item").length ? $(".list-flex-toolbar input").addClass("is-disabled") : $(".list-flex-toolbar input").removeClass("is-disabled")
        }), 400)
    }))
}
if ($(".flex-list-v1").length && $(".infinite-scroll-loader").length) {
    var e = 0;
    $(window).scroll((function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 5) {
            var i = $(".flex-list-wrapper .flex-list-inner").html();
            $(".infinite-scroll-loader").addClass("is-active"), e < 2 ? setTimeout((function() {
                $(".infinite-scroll-loader").removeClass("is-active"), $(".flex-list-wrapper .flex-list-inner").append(i), e += 1
            }), 1200) : setTimeout((function() {
                $(".loader, .loader-end").toggleClass("is-hidden")
            }), 1200)
        }
    }))
}
if ($(".flex-list-v2").length && (disableSearchWhenTableEmpty(), $(".infinite-scroll-loader").length)) {
    e = 0;
    $(window).scroll((function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 5) {
            var i = $(".tab-content.is-active .flex-list-inner").html();
            $(".infinite-scroll-loader").addClass("is-active"), e < 2 ? setTimeout((function() {
                $(".infinite-scroll-loader").removeClass("is-active"), $(".tab-content.is-active .flex-list-inner").append(i), e += 1
            }), 1200) : setTimeout((function() {
                $(".loader, .loader-end").toggleClass("is-hidden")
            }), 1200)
        }
    }))
}
if ($(".flex-list-v3").length && (disableSearchWhenTableEmpty(), $(".infinite-scroll-loader").length)) {
    e = 0;
    $(window).scroll((function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 5) {
            var i = $(".tab-content.is-active .flex-list-inner").html();
            $(".infinite-scroll-loader").addClass("is-active"), e < 2 ? setTimeout((function() {
                $(".infinite-scroll-loader").removeClass("is-active"), $(".tab-content.is-active .flex-list-inner").append(i), e += 1
            }), 1200) : setTimeout((function() {
                $(".loader, .loader-end").toggleClass("is-hidden")
            }), 1200)
        }
    }))
}