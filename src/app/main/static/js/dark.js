(function ($) {

function getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
function setCookie(theme, month) {
        var cookie_date = new Date();
        cookie_date.setMonth(cookie_date.getMonth() + month);
        document.cookie = "theme=" + theme +"; expires=" + cookie_date.toUTCString() + "; path=/";
    }
function delCookie(theme, all) {
    if(all) {
        var cookies = document.cookie.split(/;/);
        for (var i = 0, len = cookies.length; i < len; i++) {
            var cookie = cookies[i].split(/=/);
            document.cookie = cookie[0] + "=;max-age=-1";
        }
    } else {
        var cookie_date = new Date();
        cookie_date.setMonth(cookie_date.getMonth() - 1);
        document.cookie = "theme=" + theme +"; expires=" + cookie_date.toUTCString() + "; path=/";
        }
    }
$(document).ready(function () {
    const toggleSwitch = document.querySelector('.menu li.theme-switch i');

    let cookieNote = document.getElementById('cookie_note');

    function switchTheme(e) {
        if (navigator.cookieEnabled === false){
	        alert("Извините, Cookies отключены!");
        } else {
            if (!getCookie('cookies_policy')) {
                cookieNote.classList.add('show');
            }
            else {
                if ($(this).hasClass("far fa-moon")) {
                    document.documentElement.setAttribute('data-theme', 'light');
                    $(this).removeClass("far fa-moon");
                    $(this).addClass("fa fa-sun");
                    var theme = 'light'
                }
                else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    $(this).removeClass("fa fa-sun");
                    $(this).addClass("far fa-moon");
                    var theme = 'dark'
                }
                setCookie(theme, 24);
            }
            changeColorMobile.changeThemeColorAndroid();
            changeColorMobile.changeStatusBarColorApple();
            deleteCachesMobile.DYNAMIC_CACHE_PWA();
        }
    }

    toggleSwitch.addEventListener('click', switchTheme, false);

});
})(jQuery);