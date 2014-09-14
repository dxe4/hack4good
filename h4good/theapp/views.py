import json

from django.http import HttpResponse
from django.shortcuts import render

from theapp.util import get_data, get_data_by_country


def home(request):
    return render(request, "home_4.html", {})


def get_data_view(request, fname, year):
    data = get_data(fname, year)
    data = json.dumps(data)
    return HttpResponse(data, content_type="application/json")


def get_date_by_country_view(requset, country, year):
    data = get_data_by_country(country, year)
    data = json.dumps(data)
    return HttpResponse(data, content_type="application/json")
