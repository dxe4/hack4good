from django.conf.urls import patterns, url
from theapp.views import home, get_data_view

# Maybe this design is better http://www.reddit.com/dev/api#GET_api_me.json

urlpatterns = patterns(
    '',
    url(r'^home$', home, {}, name='home'),
    url(r'^get_data$', get_data_view, {}, name='get_data'),
)
