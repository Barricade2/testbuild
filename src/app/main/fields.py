from django import forms
from django.contrib.postgres.fields import ArrayField
from django.utils.text import slugify

from util.file_utils import overwrite_storage_media


class ChoiceArrayField(ArrayField):
    """
    A field that allows us to store an array of choices.

    Uses Django 1.9's postgres ArrayField
    and a MultipleChoiceField for its formfield.
    """

    def formfield(self, **kwargs):
        defaults = {
            'form_class': forms.MultipleChoiceField,
            'choices': self.base_field.choices,
        }
        defaults.update(kwargs)
        # Skip our parent's formfield implementation completely as we don't
        # care for it.
        # pylint:disable=bad-super-call
        return super(ArrayField, self).formfield(**defaults)


def upload_to_background_directory_path(instance, filename):
    try:
        return 'images/{0}/{1}/background/{2}'.format(instance.__class__.__name__, slugify(instance.title), filename)
    except AttributeError:
        return 'images/{0}/{1}/background/{2}'.format(instance.__class__.__name__, slugify(instance.name), filename)


def upload_to_poster_directory_path(instance, filename):
    try:
        return 'images/{0}/{1}/poster/{2}'.format(instance.__class__.__name__, slugify(instance.title), filename)
    except AttributeError:
        return 'images/{0}/{1}/poster/{2}'.format(instance.__class__.__name__, slugify(instance.name), filename) #actor, person, character, movie, season, OtherMovie, Franchise

def upload_to_movie_logo_directory_en_w500_path(instance, filename):
    if instance.tmbd_id and instance.logo_tmdb:
        file_path = 'images/{0}/{1}/logo/en/w500/{2}'.format(instance.__class__.__name__, slugify(instance.title) + '_' + instance.tmbd_id, instance.logo_tmdb)
        overwrite_storage_media(file_path)
        return file_path
    else:
        file_path = 'images/{0}/{1}/logo/en/w500/{2}'.format(instance.__class__.__name__, instance.slug, slugify(instance.title)+".png")
        overwrite_storage_media(file_path)
        return file_path

"""
    Only for model: Movie, Season
"""
def upload_to_movie_poster_directory_en_w780_path(instance, filename):
    try:
        if instance.tmbd_id and instance.poster_tmdb:
            file_path = 'images/{0}/{1}/poster/en/w780/{2}'.format(instance.__class__.__name__, slugify(instance.title) + '_' + instance.tmbd_id, instance.poster_tmdb_en)
            overwrite_storage_media(file_path)
            return file_path
        else:
            file_path = 'images/{0}/{1}/poster/en/w780/{2}'.format(instance.__class__.__name__, instance.slug, slugify(instance.title)+".jpg")
            overwrite_storage_media(file_path)
            return file_path
    except AttributeError:
        if instance.movie_to.tmbd_id and instance.poster_tmdb:
            file_path = 'images/Movie/{0}/season/poster/en/w780/{1}'.format(instance.__class__.__name__, slugify(instance.movie_to.title) + '_' + instance.movie_to.tmbd_id, instance.poster_tmdb_en)
            overwrite_storage_media(file_path)
            return file_path
        else:
            file_path = 'images/Movie/{0}/season/poster/en/w780/{1}'.format(instance.__class__.__name__, instance.movie_to.slug, slugify(instance.title)+".jpg")
            overwrite_storage_media(file_path)
            return file_path


"""
    Only for model: Movie, Season
"""
def upload_to_movie_poster_directory_ru_w780_path(instance, filename):
    try:
        if instance.tmbd_id and instance.poster_tmdb:
            file_path = 'images/{0}/{1}/poster/ru/w780/{2}'.format(instance.__class__.__name__, slugify(instance.title) + '_' + instance.tmbd_id, instance.poster_tmdb_ru)
            overwrite_storage_media(file_path)
            return file_path
        else:
            file_path = 'images/{0}/{1}/poster/ru/w780/{2}'.format(instance.__class__.__name__, instance.slug, slugify(instance.title) + ".jpg")
            overwrite_storage_media(file_path)
            return file_path
    except AttributeError:
        if instance.movie_to.tmbd_id and instance.poster_tmdb:
            file_path = 'images/Movie/{0}/season/poster/ru/w780/{1}'.format(slugify(instance.movie_to.title) + '_' + instance.movie_to.tmbd_id, instance.poster_tmdb_ru)
            overwrite_storage_media(file_path)
            return file_path
        else:
            file_path = 'images/Movie/{0}/season/poster/ru/w780/{1}'.format(instance.movie_to.slug, slugify(instance.title)+".jpg")
            overwrite_storage_media(file_path)
            return file_path
# return 'images/{0}/{1}/poster/ru/{2}'.format(instance.__class__.__name__, slugify(instance.title)+'_'+instance.tmbd_id, filename)

def upload_to_character_poster_directory_path(instance, filename): #w780, W350, w808, w246=82:117 w108xh225
    file_path = 'images/{0}/{1}/{2}/poster/ver/{3}'.format(instance.__class__.__name__, slugify(instance.franchise.title), slugify(instance.name), slugify(instance.name)+".png")
    overwrite_storage_media(file_path)
    return file_path
    #images/character/{franchise}/{name}/poster/ver/{filename}

def upload_to_person_poster_directory_path(instance, filename): #w200xh200 or ver for imdb, tmdb
    file_path = 'images/{0}/{1}/poster/sq/{2}'.format(instance.__class__.__name__, slugify(instance.name)+"_"+instance.id_imdb, slugify(instance.name)+".png")
    overwrite_storage_media(file_path)
    return file_path
    #images/actor/{name}/poster/sq/{filename} / images/person/{name}/poster/sq/{filename}

def upload_to_studio_logo_directory_path(instance, filename): #w200xh200
    file_path = 'images/{0}/{1}/logo/w300/{2}'.format(instance.__class__.__name__, slugify(instance.title), slugify(instance.title)+".png")
    overwrite_storage_media(file_path)
    return file_path
    #images/licensor/{name}/poster/sq/{filename} / images/studio/{name}/poster/sq/{filename}

def upload_to_franchise_poster_directory_path(instance, filename): #w460xh215
    file_path = 'images/{0}/{1}/poster/hor/{2}'.format(instance.__class__.__name__, slugify(instance.title), slugify(instance.title)+".png")
    overwrite_storage_media(file_path)
    return file_path
    #images/franchise/{title}/poster/hor/{filename}

def upload_to_game_poster_directory_path(instance, filename): #w460xh215
    file_path = 'images/{0}/{1}/poster/hor/{2}'.format(instance.__class__.__name__, slugify(instance.title)+"_"+instance.id_igdb, slugify(instance.title)+".png")
    overwrite_storage_media(file_path)
    return file_path
    #images/game/{title}/poster/hor/{filename}


def upload_to_othermovie_poster_directory_en_w780_path(instance, filename):
    file_path = 'images/{0}/{1}/poster/en/w780/{2}'.format(instance.__class__.__name__, slugify(instance.title) + '_' + instance.tmbd_id, slugify(instance.title)+".png")
    overwrite_storage_media(file_path)
    return 'images/{0}/{1}/poster/en/w780/{2}'.format(instance.__class__.__name__, slugify(instance.title) + '_' + instance.tmbd_id, slugify(instance.title)+".png")


def type_rated(value: str):
    from app.main.models import Movie
    match value:
        case "N/A":
            return Movie.RatedChoices.NOT_RATED.label
        case "G":
            return Movie.RatedChoices.G.label
        case "PG":
            return Movie.RatedChoices.PG.label
        case "PG-13":
            return Movie.RatedChoices.PG13.label
        case "R":
            return Movie.RatedChoices.R.label
        case "NC-17":
            return Movie.RatedChoices.NC17.label
        case "TV-Y":
            return Movie.RatedChoices.TV_Y.label
        case "TV-Y7":
            return Movie.RatedChoices.TV_Y7.label
        case "TV-G":
            return Movie.RatedChoices.TV_G.label
        case "TV-PG":
            return Movie.RatedChoices.TV_PG.label
        case "TV-14":
            return Movie.RatedChoices.TV_14.label
        case "TV-MA":
            return Movie.RatedChoices.TV_MA.label

def type_rated_rev(value: str):
    from app.main.models import Movie
    match value:
        case "N/A":
            return Movie.RatedChoices.NOT_RATED.value
        case "G":
            return Movie.RatedChoices.G.value
        case "PG":
            return Movie.RatedChoices.PG.value
        case "PG-13":
            return Movie.RatedChoices.PG13.value
        case "R":
            return Movie.RatedChoices.R.value
        case "NC-17":
            return Movie.RatedChoices.NC17.value
        case "TV-Y":
            return Movie.RatedChoices.TV_Y.value
        case "TV-Y7":
            return Movie.RatedChoices.TV_Y7.value
        case "TV-G":
            return Movie.RatedChoices.TV_G.value
        case "TV-PG":
            return Movie.RatedChoices.TV_PG.value
        case "TV-14":
            return Movie.RatedChoices.TV_14.value
        case "TV-MA":
            return Movie.RatedChoices.TV_MA.value

def type_genres(value: str):
    from app.main.models import Movie
    match value:
        case "Action":
            return Movie.GenresChoices.ACTION.label
        case "Adventure":
            return Movie.GenresChoices.ADVENTURE.label
        case "Comedy":
            return Movie.GenresChoices.COMEDY.label
        case "Crime":
            return Movie.GenresChoices.CRIME.label
        case "Drama":
            return Movie.GenresChoices.DRAMA.label
        case "Fantasy":
            return Movie.GenresChoices.FANTASY.label
        case "Historical":
            return Movie.GenresChoices.HISTORICAL.label
        case "Horror":
            return Movie.GenresChoices.HORROR.label
        case "Romance":
            return Movie.GenresChoices.ROMANCE.label
        case "Sci-fi":
            return Movie.GenresChoices.SCIFI.label
        case "Thriller":
            return Movie.GenresChoices.THRILLER.label
        case "FAMILY":
            return Movie.GenresChoices.FAMILY.label
        case "DETECTIVE":
            return Movie.GenresChoices.DETECTIVE.label


def type_status(value: int):
    from app.main.models import Movie
    match value:
        case Movie.StatusChoices.RELEASED.value:
            return Movie.StatusChoices.RELEASED.label
        case Movie.StatusChoices.UPCOMING.value:
            return Movie.StatusChoices.UPCOMING.label
        case Movie.StatusChoices.PLANNED.value:
            return Movie.StatusChoices.PLANNED.label
        case Movie.StatusChoices.CANCELED.value:
            return Movie.StatusChoices.CANCELED.label
        case Movie.StatusChoices.RELEASING.value:
            return Movie.StatusChoices.RELEASING.label

def type_status_rev(value: int):
    from app.main.models import Movie
    match value:
        case Movie.StatusChoices.RELEASED.label:
            return Movie.StatusChoices.RELEASED.value
        case Movie.StatusChoices.UPCOMING.label:
            return Movie.StatusChoices.UPCOMING.value
        case Movie.StatusChoices.PLANNED.label:
            return Movie.StatusChoices.PLANNED.value
        case Movie.StatusChoices.CANCELED.label:
            return Movie.StatusChoices.CANCELED.value
        case Movie.StatusChoices.RELEASING.label:
            return Movie.StatusChoices.RELEASING.value

def type_types(value: int):
    from app.main.models import Movie
    match value:
        case Movie.TypesChoices.FILM.value:
            return Movie.TypesChoices.FILM.label
        case Movie.TypesChoices.ANIMATED.value:
            return Movie.TypesChoices.ANIMATED.label
        case Movie.TypesChoices.SERIES.value:
            return Movie.TypesChoices.SERIES.label
        case Movie.TypesChoices.SHORT.value:
            return Movie.TypesChoices.SHORT.label
        case Movie.TypesChoices.FAN.value:
            return Movie.TypesChoices.FAN.label
        case Movie.TypesChoices.OTHER.value:
            return Movie.TypesChoices.OTHER.label

def type_type(value: int):
    match value:
        case "Film":
            return "Film"
        case "Film Series":
            return "Film Series"
        case "Short Film":
            return "Short Film"
        case "Fan Film":
            return "Fan Film"
        case "Animated":
            return "Animated"
        case "Animated Series":
            return "Animated Series"
        case "Short Animated":
            return "Short Animated"
        case "Fan Animated":
            return "Fan Animated"
        case "Stage":
            return "Stage"
        case "Documentary":
            return "Documentary"
        case "Other":
            return "Other"
        case "Parody":
            return "Parody"
        case "Story":
            return "Story"

def type_formats(value: int):
    from app.main.models import Movie
    match value:
        case Movie.FormatsChoices.THEATER.value:
            return Movie.FormatsChoices.THEATER.label
        case Movie.FormatsChoices.NETWORK.value:
            return Movie.FormatsChoices.NETWORK.label
        case Movie.FormatsChoices.STREAM.value:
            return Movie.FormatsChoices.STREAM.label
        case Movie.FormatsChoices.STAGE.value:
            return Movie.FormatsChoices.STAGE.label
        case Movie.FormatsChoices.WEB.value:
            return Movie.FormatsChoices.WEB.label
        case Movie.FormatsChoices.DISC.value:
            return Movie.FormatsChoices.DISC.label

def type_formats_rev(label: str):
    from app.main.models import Movie
    match label:
        case Movie.FormatsChoices.THEATER.label:
            return Movie.FormatsChoices.THEATER.value
        case Movie.FormatsChoices.NETWORK.label:
            return Movie.FormatsChoices.NETWORK.value
        case Movie.FormatsChoices.STREAM.label:
            return Movie.FormatsChoices.STREAM.value
        case Movie.FormatsChoices.STAGE.label:
            return Movie.FormatsChoices.STAGE.value
        case Movie.FormatsChoices.WEB.label:
            return Movie.FormatsChoices.WEB.value
        case Movie.FormatsChoices.DISC.label:
            return Movie.FormatsChoices.DISC.value


def type_format(value: int):
    from app.main.models import Movie
    match value:
        case "THEATRICAL":
            return "THEATRICAL"
        case "TELEVISION":
            return "TELEVISION"
        case "DIRECT":
            return "DIRECT"
        case "THEATER":
            return "THEATER"
        case "STAGE":
            return "STAGE"
        case "NETWORK":
            return "NETWORK"
        case "STREAM":
            return "STREAM"
        case "DISC":
            return "DISC"
        case "WEB":
            return "WEB"

def type_rating_source(value: int):
    from app.main.models import RatingSource
    match value:
        case RatingSource.SourceChoices.IMDB.value:                     # return 0
            return RatingSource.SourceChoices.IMDB.label                # return IMDb
        case RatingSource.SourceChoices.METACRITIC.value:
            return RatingSource.SourceChoices.METACRITIC.label
        case RatingSource.SourceChoices.METACRITIC_USER.value:
            return RatingSource.SourceChoices.METACRITIC_USER.label
        case RatingSource.SourceChoices.TOMATOMETER.value:
            return RatingSource.SourceChoices.TOMATOMETER.label
        case RatingSource.SourceChoices.TOMATOES_AUDIENCE.value:
            return RatingSource.SourceChoices.TOMATOES_AUDIENCE.label
        case RatingSource.SourceChoices.TMDB.value:
            return RatingSource.SourceChoices.TMDB.label
        case RatingSource.SourceChoices.KINOPOISK.value:
            return RatingSource.SourceChoices.KINOPOISK.label
        case RatingSource.SourceChoices.MYANIMELIST.value:
            return RatingSource.SourceChoices.MYANIMELIST.label

def type_rating_source_rev(label: str):
    from app.main.models import RatingSource
    match label:
        case RatingSource.SourceChoices.IMDB.label | "imdb":            # return IMDb
            return RatingSource.SourceChoices.IMDB.value                # return 0
        case RatingSource.SourceChoices.METACRITIC.label | "metacritic":
            return RatingSource.SourceChoices.METACRITIC.value
        case RatingSource.SourceChoices.METACRITIC_USER.label | "metacriticuser":
            return RatingSource.SourceChoices.METACRITIC_USER.value
        case RatingSource.SourceChoices.TOMATOMETER.label | "tomatoes":
            return RatingSource.SourceChoices.TOMATOMETER.value
        case RatingSource.SourceChoices.TOMATOES_AUDIENCE.label | "tomatoesaudience":
            return RatingSource.SourceChoices.TOMATOES_AUDIENCE.value
        case RatingSource.SourceChoices.TMDB.label | "tmdb":
            return RatingSource.SourceChoices.TMDB.value
        case RatingSource.SourceChoices.KINOPOISK.label | "kinopoisk":
            return RatingSource.SourceChoices.KINOPOISK.value
        case RatingSource.SourceChoices.LETTERBOXD.label | "letterboxd":
            return RatingSource.SourceChoices.LETTERBOXD.value
        case RatingSource.SourceChoices.MYANIMELIST.label:
            return RatingSource.SourceChoices.MYANIMELIST.value

def type_country_source(value: str):
    match value.lower():
        case "jp" | "jpn" | "япония":
            return "jpn"
        case "us" | "usa" | "сша":
            return "usa"
        case "ru" | "rus" | "россия":
            return "RUS"
        case "de" | "ger" | "германия":
            return "ger"
        case "gb" | "gbr" | "великобритания":
            return "gbr"
        case "at" | "aut" | "австрия":
            return "aut"
        case "fr" | "fra" | "франция":
            return "fra"
        case "tw" | "twn" | "тайвань":
            return "twn"
        case "no" | "nor" | "норвегия":
            return "nor"
        case "fi" | "fin" | "финляндия":
            return "fin"
        case "kr" | "kor" | "корея":
            return "kor"

def type_related(value: int):
    from app.main.models import Related
    match value:
        case Related.RelatedChoices.DIRECT_SEQUELS.value:                     # return 0
            return Related.RelatedChoices.DIRECT_SEQUELS.label                # return direct sequels
        case Related.RelatedChoices.DIRECT_PREQUELS.value:
            return Related.RelatedChoices.DIRECT_PREQUELS.label
        case Related.RelatedChoices.INDIRECT_SEQUELS.value:
            return Related.RelatedChoices.INDIRECT_SEQUELS.label
        case Related.RelatedChoices.INDIRECT_PREQUELS.value:
            return Related.RelatedChoices.INDIRECT_PREQUELS.label
        case Related.RelatedChoices.RELATED.value:
            return Related.RelatedChoices.RELATED.label
        case Related.RelatedChoices.REMAKE.value:
            return Related.RelatedChoices.REMAKE.label
        case Related.RelatedChoices.CROSSOVER.value:
            return Related.RelatedChoices.CROSSOVER.label