import csv

from django.conf import settings
import pycountry
import pygal


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


def make_csv(fname=settings.CO2_FILE, year='2010'):
    result = read_file(fname=fname)
    worldmap_chart = pygal.Worldmap()
    worldmap_chart.title = 'C02'

    data = {i['country_code'].lower(): float(i[year])
            for i in result if i.get(year)}

    worldmap_chart.add('Year {}'.format(year), data)
    worldmap_chart.render_to_file("{}.svg".format(year))
