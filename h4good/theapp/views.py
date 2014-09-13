import json

from django.http import HttpResponse
from django.shortcuts import render

from theapp.util import get_data


def home(request):
    return render(request, "home_4.html", {})


def get_data_view(request, fname, year):
    data = get_data(fname, year)
    data = json.dumps(data)
    return HttpResponse(data, content_type="application/json")
