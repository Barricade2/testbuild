""" Settings required by django-app. """
from django.conf import settings
from django.shortcuts import resolve_url
from django.urls import get_script_prefix
from django.utils.functional import lazy
import os

# Lazy-evaluate URLs so including pwa.urls in root urlconf works
resolve_url = lazy(resolve_url, str)

# Get script prefix for apps not mounted under /
_PWA_SCRIPT_PREFIX = get_script_prefix()

# Path to the service worker implementation.  Default implementation is empty.
PWA_SERVICE_WORKER_PATH = getattr(settings, 'PWA_SERVICE_WORKER_PATH',
                                  os.path.join(os.path.abspath(os.path.dirname(__file__)), 'templates', 'pwa',
                                               'serviceworker.js'))
# App parameters to include in manifest.json and appropriate meta tags
PWA_APP_NAME = getattr(settings, 'PWA_APP_NAME', 'GAMOVIBASED')
PWA_APP_DESCRIPTION = getattr(settings, 'PWA_APP_DESCRIPTION', 'GAMOVIBASED: movies based on video games')
PWA_APP_ROOT_URL = resolve_url(getattr(settings, 'PWA_APP_ROOT_URL', _PWA_SCRIPT_PREFIX))
PWA_APP_THEME_COLOR = getattr(settings, 'PWA_APP_THEME_COLOR', '#212529') # dark = #212529, light = #e4e8ec
PWA_APP_BACKGROUND_COLOR = getattr(settings, 'PWA_APP_BACKGROUND_COLOR', '#fff')
PWA_APP_DISPLAY = getattr(settings, 'PWA_APP_DISPLAY', 'standalone')
PWA_APP_SCOPE = resolve_url(getattr(settings, 'PWA_APP_SCOPE', _PWA_SCRIPT_PREFIX))
PWA_APP_DEBUG_MODE = getattr(settings, 'PWA_APP_DEBUG_MODE', True)
PWA_APP_ORIENTATION = getattr(settings, 'PWA_APP_ORIENTATION', 'any')
PWA_APP_START_URL = resolve_url(getattr(settings, 'PWA_APP_START_URL', _PWA_SCRIPT_PREFIX))
PWA_APP_FETCH_URL = resolve_url(getattr(settings, 'PWA_APP_FETCH_URL', _PWA_SCRIPT_PREFIX))
PWA_APP_STATUS_BAR_COLOR = getattr(settings, 'PWA_APP_STATUS_BAR_COLOR', 'default')
PWA_APP_ICONS = getattr(settings, 'PWA_APP_ICONS', [
    {
        'src': '/static/lib/pwa/images/launchers/launcher-72x72.png',
        'sizes': '72x72'
    },
    {
        'src': '/static/lib/pwa/images/launchers/launcher-96x96.png',
        'sizes': '96x96'
    },
    {
        'src': '/static/lib/pwa/images/launchers/launcher-144x144.png',
        'sizes': '144x144'
    },
    {
        'src': '/static/lib/pwa/images/launchers/launcher-192x192.png',
        'sizes': '192x192'
    },
    {
        'src': '/static/lib/pwa/images/launchers/launcher-512x512.png',
        'sizes': '512x512'
    }
])
PWA_APP_SPLASH_SCREEN = getattr(settings, 'PWA_APP_SPLASH_SCREEN', [
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-1170x2532.png',# iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_
        'media': 'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-1179x2556.png',  # iPhone_14_Pro
        'media': 'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-1125x2436.png', # iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X
        'media': '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-828x1792.png',  # iPhone_11__iPhone_XR
        'media': '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-1242x2688.png',# iPhone_11_Pro_Max__iPhone_XS_Max
        'media': '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-1242x2208.png', # iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus
        'media': '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-750x1334.png', # iPhone_8__iPhone_7__iPhone_6s
        'media': '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-640x1136.png',  # iPhone_SE__iPod_5th
        'media': '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-2048x2732.png',  # 12.9__iPad
        'media': '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-1668x2388.png',  # 11__iPad_Pro__10.5__iPad_Pro
        'media': '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-1668x2224.png',  # 10.5__iPad_Air
        'media': '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/portrait/splash-portrait-1536x2048.png', # 9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad
        'media': '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-2532x1170.png',# iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_
        'media': 'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-2556x1179.png',# iPhone_14_Pro
        'media': 'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-2436x1125.png', # iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X
        'media': '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-2688x1242.png',# iPhone_11_Pro_Max__iPhone_XS_Max
        'media': '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-1792x828.png',  # iPhone_11__iPhone_XR
        'media': '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-2208x1242.png',# iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus
        'media': '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-1334x750.png', # iPhone_8__iPhone_7__iPhone_6s
        'media': '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-1136x640.png',  # iPhone_SE__iPod_5th
        'media': '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-2732x2048.png',  # 12.9__iPad
        'media': '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-2388x1668.png',  # 11__iPad_Pro__10.5__iPad_Pro
        'media': '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-2224x1668.png',  # 10.5__iPad_Air
        'media': '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    },
    {
        'src': '/static/lib/pwa/images/splash/landscape/splash-landscape-2048x1536.png', # 9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad
        'media': '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    }

])
PWA_APP_DIR = getattr(settings, 'PWA_APP_DIR', 'auto')
PWA_APP_LANG = getattr(settings, 'PWA_APP_LANG', 'en-US')
