from django.db import models
import urllib.request
import json


# Database model for a park
class Park(models.Model):
    kaupungin_osa = models.CharField(max_length=30)
    alueen_nimi = models.CharField(max_length=30)
    x = models.FloatField()
    y = models.FloatField()
    pinta_ala = models.IntegerField()

    def __str__(self):
        return self.alueen_nimi

# Fix format of the API-coords
def clearCoord(row):
    clean_coords = []
    raw_coords = row['GEOLOC'][10:-2].split(', ')
    for coord_pair in raw_coords:
        x, y = coord_pair.split(' ')
        clean_coords.append([x, y])
    return clean_coords

# Parse the data from API and save it as Park models to database
def readLocalData():
    #fetchApiData()
    with open('./data/api_data.txt') as in_file:
        raw_data = json.load(in_file)
    data = raw_data

    for i in range(len(raw_data)):
        row = raw_data[i]
        #print(row['GEOLOC'][10:-2])
        if type(row['GEOLOC'][10:-2]) != list:
            data[data.index(row)]['GEOLOC'] = clearCoord(row)

    for row in data:
        p = Park(
            kaupungin_osa=row['KAUPUNGINOSA'],
            alueen_nimi=row['ALUE_NIMI'],
            x=row['GEOLOC'][0][0],
            y=row['GEOLOC'][0][1],
            pinta_ala=row['PINTA_ALA'])
        p.save()

# Fetch and dump the API data to json txt-file
def fetchApiData():
    url = 'https://data.tampere.fi/data/api/action/datastore_search?resource_id=8c710e26-6fcd-4078-928f-0e5572d84ce0'

    with urllib.request.urlopen(url) as fileobj:
        json_data = fileobj.read()
    data = json.loads(json_data)['result']['records']

    with open('./data/api_data.txt', 'w') as outfile:
        json.dump(data, outfile)
