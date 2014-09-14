from django.conf.urls import patterns, url
from theapp.views import (
    home, get_data_view, get_date_by_country_view
)

# Maybe this design is better http://www.reddit.com/dev/api#GET_api_me.json

urlpatterns = patterns(
    '',
    url(r'^home$', home, {}, name='home'),
    url(r'^get-data/(?P<country>[a-zA-Z]{2})/(?P<year>[0-9]*)$',
        get_date_by_country_view, {},
        name='get_date_by_country_view'),
    url(r'^get-data/(?P<fname>[\w-]*)/(?P<year>[0-9]*)$',
        get_data_view, {}, name='get_data'),
)
