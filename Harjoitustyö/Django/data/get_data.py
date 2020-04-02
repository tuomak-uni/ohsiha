import urllib.request
import json


""" def fetchApiData():
    url = 'https://data.tampere.fi/data/api/action/datastore_search?resource_id=8c710e26-6fcd-4078-928f-0e5572d84ce0'
    #try:
    with urllib.request.urlopen(url) as fileobj:
        json_data = fileobj.read()
    data = json.loads(json_data)['result']['records']
    #return data
    #print(data)
    with open('./data/api_data.txt', 'w') as outfile:
        json.dump(data, outfile)
 """

def clearCoord(row):
    clean_coords = []
    raw_coords = row['GEOLOC'][10:-2].split(', ')
    for coord_pair in raw_coords:
        x, y = coord_pair.split(' ')
        clean_coords.append([x, y])
    return clean_coords
    

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
    pass

#readLocalData()