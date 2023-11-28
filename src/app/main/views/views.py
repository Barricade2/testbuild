import datetime
import json
from datetime import date
from smtplib import SMTPAuthenticationError

import imdb
from django.contrib import messages
from django.contrib.auth import login, authenticate, get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView, PasswordResetView
from django.core.cache import cache
from django.core.mail import send_mail, BadHeaderError
from django.core.paginator import Paginator, InvalidPage, PageNotAnInteger
from django.db import IntegrityError
from django.db.models import Q, Value, Count, Prefetch
from django.db.models.functions import Concat
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render, redirect
from django.template import loader
from django.urls import reverse, reverse_lazy

# from .models import Movie
# from django.http import HttpResponse
# from django.template import Context
# from django.template.loader import get_template
from django.utils import translation
from django.utils.dateparse import parse_datetime, parse_date
from django.utils.text import slugify
from django.views import View
from django.views.decorators.cache import cache_page

from django.views.generic import ListView, DetailView, RedirectView, FormView, TemplateView
from django.shortcuts import render, get_object_or_404

from config import settings

# Create your views here.
# def home(request):
#	view = "Hello world"
#	if (not get_template('main/Home.html')):
#		html= "<html> %s </html>" %view
#	else:
#		html_2=get_template('main/Home.html').render(Context({'name': view}))
# 	return HttpResponse("Hello World")

from django.utils.translation import gettext_lazy as _

CACHE_TIMEOUT_WEEK = 60 * 60 * 24 * 7  # (60 * 60 * 24) is 24 hours; (60 * 60 * 24 * 7) is week;

#@cache_page(60*15)
def home(request):
    print("home")

    return paginatorFun(request)

def paginatorFun(request):
        return render(request, 'main/Home.html', {})
