from django.conf.urls import patterns, url
from h4good.theapp.views import home

# Maybe this design is better http://www.reddit.com/dev/api#GET_api_me.json

urlpatterns = patterns(
    '',
    url(r'^home$', home, {}, name='home'),
)
