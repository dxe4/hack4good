"""
Django settings for h4good project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'zaj7b3+-eq)d+%6-p(uev)b$36_7pe$#+t(k#s70wwsf&u)8cq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'theapp'
)


MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

TOP_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))


def here(*args):
    return os.path.realpath(os.path.join(TOP_DIR, *args))

TEMPLATE_DIRS = (
    here('theapp/templates'),
)

STATICFILES_DIRS = (
    here('theapp/static'),
)

DATA_FILES = {
    'data-per-capita': here('theapp/data/data-per-capita.csv'),
    'land-under-cereal-production': here(
        'theapp/data/land-under-cereal-production.csv'),
    'poverty-headcount-ratio-at-rural-poverty-line': here(
        'theapp/data/poverty-headcount-ratio-at-rural-poverty-line.csv'),
    'agricultural-land': here(
        'theapp/data/agricultural-land.csv'),
    'cereal-yield': here(
        'theapp/data/cereal-yield.csv'),
    'agriculture-value-added': here(
        'theapp/data/agriculture-value-added.csv'),
    'inflation-consumer-prices': here(
        'theapp/data/inflation-consumer-prices.csv'),
    'inflation-gdp-deflator': here(
        'theapp/data/inflation-gdp-deflator.csv'),
    'employees-agriculture-male': here(
        'theapp/data/employees-agriculture-male.csv'),
    'employees-agriculture-female': here(
        'theapp/data/employees-agriculture-female.csv'),
    'plant-species-threatened': here(
        'theapp/data/plant-species-threatened.csv'),

}

STATIC_ROOT = 'staticfiles'

ROOT_URLCONF = 'h4good.urls'

WSGI_APPLICATION = 'h4good.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'
