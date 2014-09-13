from django.conf.urls import patterns, include
from theapp import urls
# url

urlpatterns = patterns(
    '',
    (r'', include(urls, namespace='theapp', app_name='theapp')),
)
