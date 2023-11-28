from modeltranslation.translator import register, TranslationOptions
from .models import Season


@register(Season)
class CharacterTranslationOptions(TranslationOptions):
    fields = ('title','overview','poster_tmdb',)