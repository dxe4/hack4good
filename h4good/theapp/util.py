import csv

from django.conf import settings
import pycountry


def convert_country_code(alpha3):
    country = pycountry.countries.get(alpha3=alpha3)
    return country.alpha2

cols_to_replace = {
    'Country Name,Country'
}


def get_columns(reader):
    next(reader)
    next(reader)
    return [i.lower().replace(" ", "_") for i in next(reader)]


def read_file(fname=settings.CO2_FILE):
    items = []
    with open(fname, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        header = get_columns(reader)

        for count, row in enumerate(reader):
            item = dict(zip(header, row))

            try:
                country_code = item['country_code']
                item['country_code'] = convert_country_code(country_code)
            except KeyError:
                print("not found {}".format(country_code))

            items.append(item)

    return items
