from django.contrib import admin
from django.db.models import F
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from django_mptt_admin.admin import DjangoMpttAdmin
from modeltranslation.admin import TranslationAdmin, TranslationStackedInline

from app.main.forms import RequireOneFormSet
from app.main.models import Season


# Register your models here.

admin.site.register(Season, TranslationAdmin)