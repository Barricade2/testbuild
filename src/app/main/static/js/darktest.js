(function ($) {

 function localStorageTheme()  {
    const toggleSwitch = document.querySelector('.menu li.theme-switch i');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            $(toggleSwitch).removeClass("far fa-sun");
            $(toggleSwitch).addClass("fa fa-moon");
        } else {
            $(toggleSwitch).removeClass("fa fa-moon");
            $(toggleSwitch).addClass("far fa-sun");
        }
    }
 };

 function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
};

$(document).ready(function () {
    const toggleSwitch = document.querySelector('.menu li.theme-switch i');
    /*const currentTheme = getCookie('theme')
    if (currentTheme) {
        if (currentTheme == 'dark') {
            $(toggleSwitch).removeClass("far fa-moon");
            $(toggleSwitch).addClass("fa fa-sun");
        } else {
            $(toggleSwitch).removeClass("fa fa-sun");
            $(toggleSwitch).addClass("far fa-moon");
        }
    }*/

    function switchTheme(e) {
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
        document.cookie = "theme=" + theme +"; max_age=2592000";
    }

    toggleSwitch.addEventListener('click', switchTheme, false);

});
})(jQuery);