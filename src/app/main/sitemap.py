from django.contrib.sitemaps import Sitemap, GenericSitemap
from django.urls import reverse



class StaticPriorityPageSitemap(Sitemap):
    changefreq = 'daily'
    priority = 1.0

    def items(self):
        return ['movie:home',
                ]

    def location(self, item):
        return reverse(item)

class StaticPageSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.4

    def items(self):
        return ['movie:movie-list',
                'movie:game-list',
                'movie:franchise-list',
                'movie:movie-search-list',
                #'movie:sign-up',
                #'movie:sign-in',
                #'movie:pass-reset',
                #'movie:password_reset_confirm',
                #'movie:password_reset_complete,
                #'movie:search-results'
                ]

    def location(self, item):
        return reverse(item)