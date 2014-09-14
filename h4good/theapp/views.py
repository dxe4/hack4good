import json

from django.http import HttpResponse
from django.shortcuts import render

from theapp.util import get_data, get_data_by_country

# because the data comes from csv files...
bad_cache = {}


def home(request):
    return render(request, "home_4.html", {})


def get_data_view(request, fname, year):
    key = '{}_{}'.format(fname, year)
    try:
        data = bad_cache[key]
    except KeyError:
        data = get_data(fname, year)
        data = json.dumps(data)
        bad_cache[key] = data
    return HttpResponse(data, content_type="application/json")


def get_date_by_country_view(requset, fname, country):
    key = 'country_{}_{}'.format(fname, country)
    try:
        data = bad_cache[key]
    except KeyError:
        data = get_data_by_country(fname, country)
        data = json.dumps(data)
        bad_cache[key] = data
    return HttpResponse(data, content_type="application/json")
