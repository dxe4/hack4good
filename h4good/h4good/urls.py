from django.conf.urls import patterns, include
# url

urlpatterns = patterns(
    '',
    (r'', include('h4good.theapp.urls', namespace='theapp', app_name='theapp')),
)
