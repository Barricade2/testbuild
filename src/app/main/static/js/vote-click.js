
import {notification} from "/static/lib/notification/notificationShow.js";

$(document).ready(function() {
const area = document.getElementById('video-area');
//const area = document.querySelector('#video-area .flaticon-hand');

function videovote(event) {
    const like = $(event.target.parentElement);
    const review_meta = $(event.target.parentElement.parentElement);
    var csrftoken = $("[name=csrfmiddlewaretoken]").val();
    var vote = "";
    if(like.hasClass('like')) { //e.target.classList.contains("like"), e.target.className
       vote = "up";
    } else if(like.hasClass('dislike')) {
       vote = "down";
    }
    var videoid = review_meta.data('id');
    var videourl = review_meta.data('url');
    if(vote !== "") {
        $.ajax({
        type: 'POST',
        url:  videourl,
        data: {
            csrfmiddlewaretoken: csrftoken,
            'videoid': videoid,
            'vote': vote,
        },
        success: function (data) {
            if (data.success) {
                notification('success', data.message, 0);
                if(like.hasClass('like')) {
                    like.children('span').text(data.like_count);
                    review_meta.children('.dislike').children('span').text(data.dislike_count);
                    if(like.hasClass('set')){
                        like.removeClass('set');
                    } else {
                        like.addClass('set');
                        review_meta.children('.dislike').removeClass('set');
                    }
                } else if(like.hasClass('dislike')) {
                    like.children('span').text(data.dislike_count);
                    review_meta.children('.like').children('span').text(data.like_count);
                    if(like.hasClass('set')){
                        like.removeClass('set');
                    } else {
                        like.addClass('set');
                        review_meta.children('.like').removeClass('set');
                    }
                    /*if(event.css('color') === 'rgb(241, 72, 31)'){
                        event.css({ color: "" });
                    } else if(event.css('color') !== 'rgb(241, 72, 31)'){
                        event.css({ color: 'rgb(241, 72, 31)' });
                        event.parent('.review-meta').children('.like').css({ color: "" });
                    }*/
                }
                deleteCachesMobile.deletePerCache();
            } else {
                notification('error', data.message || "Ошибка соединения. Попробуйте повторить попозже");
            }
        },
        error: function (data) {
            //alert('Ошибка соединения. Попробуйте повторить попытку через некоторое время.');
            notification('error', data.message || "Ошибка соединения. Попробуйте повторить попозже");
        }
    });
    }
}

area.addEventListener('click', videovote, true);
})