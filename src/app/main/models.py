from django.contrib.postgres.fields import ArrayField
from django.contrib.staticfiles.storage import staticfiles_storage
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.storage import default_storage, FileSystemStorage
from django.core.validators import MaxValueValidator, MinValueValidator, validate_slug
from django.db import models, connection
from django.conf import settings
from django.db.models import Sum, Count, Avg
from django.db.models.functions import Coalesce
from django.templatetags.static import static
from django.urls import reverse
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
import uuid
from django.utils import timezone
from imagekit.models import ImageSpecField
from mptt.fields import TreeForeignKey, TreeManyToManyField
from mptt.managers import TreeManager
from mptt.models import MPTTModel
from pilkit.processors import Thumbnail

from app.main.fields import upload_to_background_directory_path, upload_to_poster_directory_path, \
    upload_to_movie_poster_directory_en_w780_path, upload_to_movie_poster_directory_ru_w780_path, \
    upload_to_character_poster_directory_path, upload_to_person_poster_directory_path, \
    upload_to_movie_logo_directory_en_w500_path, ChoiceArrayField, \
    upload_to_studio_logo_directory_path, type_related

# Create your models here.
# db_table = 'main_{class}'
from util.file_utils import PosterNotFound

class Season(models.Model):
    class Meta:
        unique_together = ('season_number',)
    title = models.CharField(_("Title"), max_length=128)
    season_number = models.PositiveIntegerField(_("Season Number"))
    episode_count = models.PositiveIntegerField(_("Episode Count"))
    air_date = models.DateField(_("Air date"), blank=False, null=True)
    poster_tmdb = models.CharField(_("poster tmdb"), max_length=128, blank=True, help_text="need for poster path") # "/nFtqronCmKbHxB1VJgO8LcqQhc7.jpg"
    #poster = models.OneToOneField('PosterMovie', on_delete=models.SET_NULL, blank=False, null=True, default=None)

    #Poster_Movie
    poster_en = models.ImageField(_("Poster En"), upload_to=upload_to_movie_poster_directory_en_w780_path, blank=True, max_length=200) # pipenv install Pillow #780x1170 or #780x1112
    poster_en_big = ImageSpecField(
        source='poster_en',
        processors=[Thumbnail(780, 1112)], # h1170 or h1112
        format='JPEG',
        options={'quality': 90})
    poster_en_medium = ImageSpecField(
        source='poster_en',
        processors=[Thumbnail(500, 713)], # h750 or h713
        format='JPEG',
        options={'quality': 90})
    poster_en_small = ImageSpecField(
        source='poster_en',
        processors=[Thumbnail(185, 264)], # h278 or h264
        format='JPEG',
        options={'quality': 90})
    poster_en_small_extra = ImageSpecField(
        source='poster_en',
        processors=[Thumbnail(92, 131)], # h138 or h131
        format='JPEG',
        options={'quality': 90})

    poster_ru = models.ImageField(_("Poster Ru"), upload_to=upload_to_movie_poster_directory_ru_w780_path, blank=True, max_length=200) # pipenv install Pillow #780x1170 or #780x1112
    poster_ru_big = ImageSpecField(
        source='poster_ru',
        processors=[Thumbnail(780, 1112)],
        format='JPEG',
        options={'quality': 90})
    poster_ru_medium = ImageSpecField(
        source='poster_ru',
        processors=[Thumbnail(500, 713)],
        format='JPEG',
        options={'quality': 90})
    poster_ru_small = ImageSpecField(
        source='poster_ru',
        processors=[Thumbnail(185, 264)],
        format='JPEG',
        options={'quality': 90})
    poster_ru_small_extra = ImageSpecField(
        source='poster_ru',
        processors=[Thumbnail(92, 131)],
        format='JPEG',
        options={'quality': 90})

    overview = models.TextField(_("Overview"), blank=True)
    #toactortocharacter_to = models.ForeignKey('ToActorToCharacter', verbose_name=_("ToActorToCharacter"), on_delete=models.CASCADE)
    #studio = models.ManyToManyField(Studio,verbose_name=_("Production"),related_name='movies', blank=True)
    #distributor = models.ManyToManyField(Studio,verbose_name=_("Distributor"),related_name='movies_distributor', blank=True)
    #director = models.ManyToManyField(to=Person, verbose_name=_("Director"), related_name='moviesbydirector',blank=True, null=True)
    #writer = models.ManyToManyField(to=Person, verbose_name=_("Writer"), related_name='moviesbywriter', blank=True,null=True)
    #showrunner = models.ManyToManyField(to=Person, verbose_name=_("Creator/Showrunner"),related_name='moviesbyshowrunner', blank=True, null=True)

    @property
    def get_photo_url_en(self):
        if self.poster_en and hasattr(self.poster_en, 'url'):
            if not default_storage.exists(self.poster_en.name):
                return "/static/images/poster-not-found.png"
            return self.poster_en.url
        else:
            return "/static/images/poster-not-found.png"

    @property
    def get_photo_url_ru(self):
        if self.poster_ru and hasattr(self.poster_ru, 'url'):
            if not default_storage.exists(self.poster_ru.name):
                return "/static/images/poster-not-found.png"
            return self.poster_ru.url
        else:
            return "/static/images/poster-not-found.png"