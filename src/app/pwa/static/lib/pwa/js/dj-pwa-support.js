const isPwaStandaloneMode = () => (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
    }
};

const changeColorMobile = {
    changeThemeColorAndroid: function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const metaThemeColor = document.head.querySelector('meta[name=theme-color]');
        if(theme === "dark") {
            //metaThemeColor.setAttribute("content", "rgb(200,225,255)");
            metaThemeColor.setAttribute("content", "#212529");
        } else {
            metaThemeColor.setAttribute("content", "#e4e8ec");
        }
    },
    changeStatusBarColorApple: function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const appleThemeColor = document.head.querySelector('meta[name=apple-mobile-web-app-status-bar-style]');
        if(theme === "dark") {
            appleThemeColor.setAttribute("content", "#212529");
        } else {
            appleThemeColor.setAttribute("content", "#e4e8ec");
        }
    }
};

const deleteCachesMobile = {
    DYNAMIC_CACHE_PWA: function() {
        //*** caches.delete
            const DYNAMIC_CACHE_PWA = 'pwa-offline-dynamic'; // see -> pwa/serviceworker.js
            caches.delete(DYNAMIC_CACHE_PWA).then(r => {
                console.log(r);
            });
        //*** caches.delete -!
    },
    deletePerCache: function() {
        const DYNAMIC_CACHE_PWA = 'pwa-offline-dynamic';
        var request = window.location.pathname + window.location.search;
        caches.open(DYNAMIC_CACHE_PWA).then((cache) =>
            cache.delete(request).then((r) =>
                console.log(r)
            ));
    }
};

const screenOrientationMobile = {
    getOrientation: function() {
        //getOrientation == orientation == screen[orientKey] == screen.orientation

        var orientKey = 'orientation';
        if ('mozOrientation' in screen) {
          orientKey = 'mozOrientation';
        } else if ('msOrientation' in screen) {
          orientKey = 'msOrientation';
        }

        if (screen[orientKey]) {
          return screen[orientKey];
        } else {
            return null;
        }
    },
    detectOrientation: function() {
        var orientation = this.getOrientation();
        if (orientation) {
            var type = orientation.type || orientation;
            return type;
        } else {
            return null;
        }
    },
    onChangeOrientation: function(callback) {
        var orientation = this.getOrientation();
        var onOrientationChange = null;

        onOrientationChange = function () {
            console.log('Orientation changed to: ' + this.detectOrientation());
            //update();
        };

        if(callback) {
            onOrientationChange = callback
        }

        if ('onchange' in orientation) { // newer API
            //console.log('Orientation changed to: ' + orientation.type);
            orientation.addEventListener('change', onOrientationChange);
        } else if ('onorientationchange' in screen) { // older API
            //console.log('Orientation changed to: ' + orientation);
            screen.addEventListener('orientationchange', onOrientationChange);
        }
    },
    changeOrientation: function(type) {
        //need first call requireFullScreenMode
        var {goFullScreen, exitFullScreen} = this.requireFullScreenMode();
        document.documentElement[goFullScreen] && document.documentElement[goFullScreen]();

        var orientation = this.getOrientation();
        //const oppositeOrientation = screen.orientation.type.startsWith("portrait")
        let oppositeOrientation = orientation.type.startsWith("portrait")
        ? "landscape"
        : "portrait";

        if(type) {
            oppositeOrientation = type
        }

        screen.orientation
            .lock(oppositeOrientation)
            .then(() => {
                console.log(`Locked to ${oppositeOrientation}\n`);
            })
            .catch((error) => {
                console.log(`${error}\n`);
            });
    },
    requireFullScreenMode: function() {
          // browsers require full screen mode in order to obtain the orientation lock
          var goFullScreen = null;
          var exitFullScreen = null;
          if ('requestFullscreen' in document.documentElement) {
            goFullScreen = 'requestFullscreen';
            exitFullScreen = 'exitFullscreen';
          } else if ('mozRequestFullScreen' in document.documentElement) {
            goFullScreen = 'mozRequestFullScreen';
            exitFullScreen = 'mozCancelFullScreen';
          } else if ('webkitRequestFullscreen' in document.documentElement) {
            goFullScreen = 'webkitRequestFullscreen';
            exitFullScreen = 'webkitExitFullscreen';
          } else if ('msRequestFullscreen') {
            goFullScreen = 'msRequestFullscreen';
            exitFullScreen = 'msExitFullscreen';
          }
          return {goFullScreen: goFullScreen, exitFullScreen: exitFullScreen};
    },
    lockOrientation: function() {
        var orientation = this.getOrientation();
        var {goFullScreen, exitFullScreen} = this.requireFullScreenMode();
        document.documentElement[goFullScreen] && document.documentElement[goFullScreen]();
        var promise = null;
        if (orientation.lock) {
          promise = orientation.lock(orientation.type);
        } else {
          promise = screen.orientationLock(orientation);
        }

        promise
          .then(function () {
              console.log('Screen lock acquired');
              //$('unlock').style.display = 'block';
              //$('lock').style.display = 'none';
          })
          .catch(function (err) {
              console.log('Cannot acquire orientation lock: ' + err);
              document[exitFullScreen] && document[exitFullScreen]();
          });
        return promise;
    },
    unlockOrientation: function() {
        var orientation = this.getOrientation();
        var {goFullScreen, exitFullScreen} = this.requireFullScreenMode();

        document[exitFullScreen] && document[exitFullScreen]().catch(function (err) {
          console.log(err);
        });

        if (orientation.unlock) {
          orientation.unlock();
        } else {
          screen.orientationUnlock();
        }

        console.log('Screen lock removed');
    }

};