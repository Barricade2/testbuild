"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import path, include
from django.views.generic import TemplateView, RedirectView
from django.views.i18n import JavaScriptCatalog


from config import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('robots.txt', TemplateView.as_view(
        template_name='txt/robots.txt',
        content_type='text/plain',
    )),
    path('humans.txt', TemplateView.as_view(
        template_name='txt/humans.txt',
        content_type='text/plain',
    )),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('img/favicons/favicon.ico'))),
] + i18n_patterns(
    path('i18n/', include('django.conf.urls.i18n')),
    path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),
    path('', include('app.main.urls')),
    #path('api/graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    prefix_default_language=False,
)

if settings.DEBUG: # type: ignore[attr-defined] # pylint: disable=no-member # noqa: no-member
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) # type: ignore[attr-defined] # pylint: disable=no-member # noqa: no-member
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # type: ignore[attr-defined] # pylint: disable=no-member # noqa: no-member
    urlpatterns += [path('__debug__/', include('debug_toolbar.urls'))]