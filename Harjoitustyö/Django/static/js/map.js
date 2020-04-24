// init map
let baseMap = L.map('mapCol').setView([61.475,23.75], 11);
let attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>';
let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(baseMap);

// define coversion
proj4.defs("EPSG:3878","+proj=tmerc +lat_0=0 +lon_0=24 +k=1 +x_0=24500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

function getQueryData()
{
    $.ajaxSetup({ cache: true });
    $.ajax({
        url: 'https://data.tampere.fi/data/api/action/datastore_search',
        data: {
            resource_id: '8c710e26-6fcd-4078-928f-0e5572d84ce0'
        },
        dataType: 'jsonp',
        success: function(data) {
            result = data.result.records;
            return addParks(result)
        },
        error: function(code) {
            alert('Error '+code+' has occurred.')
        }
    })
}

// General capitalization function
function capitalizeStr(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); 
}

// Parse map data and add park area polygons to map
function addParks(data)
{
    let polyGroup = L.layerGroup();

    data.sort(function(a,b)
    {
        return a['ALUE_NIMI'] < b['ALUE_NIMI'] ? -1:1;
    });
    for (let i in data)
    {
        data[i]['ALUE_NIMI'] = capitalizeStr(data[i]['ALUE_NIMI']);
        data[i]['KAUPUNGINOSA'] = capitalizeStr(data[i]['KAUPUNGINOSA'].split(' ')[0]);
        let coords = data[i]['GEOLOC'].slice(10,-2);
        coords = coords.split(', ');
        for (let coord in coords)
        {
            let pair = coords[coord].split(' ');
            pair[0] = parseFloat(pair[0]);
            pair[1] = parseFloat(pair[1]);
            pair = proj4('EPSG:3878', 'WGS84', pair);
            [pair[0], pair[1]] = [pair[1], pair[0]];
            coords[coord] = pair;
        }
        data[i]['GEOLOC'] = coords;
        let poly = L.polygon(coords,{
            color: 'teal',
            fillOpacity: 0.75
        });
        data[i]['POLY'] = poly;
        poly.bindPopup('<b>'+data[i]['ALUE_NIMI']+'</b><br>'+data[i]['KAUPUNGINOSA']+'<br>'+data[i]['PINTA_ALA']+'m<sup>2</sup>');
        poly.addTo(polyGroup);
        let c = 'c';
    }
    polyGroup.addTo(baseMap);

    createTable(data);
}


// Create table of the park data
function createTable(data)
{
    let tbl = document.getElementById('parkTable');

    let headers = ['<b>Highlight</b>', '<b>Park</b>', '<b>District</b>'];
    let dataRows = ['checkbox', 'ALUE_NIMI', 'KAUPUNGINOSA'];

    let row = tbl.insertRow(-1);
    for (let i in headers)
    {
        let cell = row.insertCell(parseInt(i));
        cell.innerHTML = headers[i];
    }

    for (let i = 0; i<data.length;i++)
    {
        row = tbl.insertRow(-1);

        for(let j=0;j<dataRows.length;j++)
        {
            cell = row.insertCell(j);

            if(j == 0)
            {
                let checkBox = document.createElement('input');
                checkBox.type = 'checkbox';
                checkBox.id = 'checkbox'+i;
                let mark = L.marker();
                checkBox.onchange = function()
                {
                    if(this.checked)
                    {
                       mark = L.marker(data[i]['POLY'].getBounds().getCenter()).addTo(baseMap);
                    }
                    else
                    {
                        baseMap.removeLayer(mark);
                    }
                };
                cell.appendChild(checkBox);
            }
            else
            {
                cell.innerHTML = data[i][dataRows[j]];
                if( j==1 )
                {
                    cell.onclick = function()
                    {
                        baseMap.fitBounds(data[i]['POLY'].getBounds())
                    }
                    cell.style.color = 'teal';
                }
            }
            
        }
    }
    initChart(data);
}

let chart = null;

// Create the visualizations of the data
function initChart(data)
{
    let park_area = [];
    let dist_park_area = [];
    for(let i in data)
    {
        let not_in_dict = true;
        for(let j in dist_park_area)
        {
            if(data[i]['KAUPUNGINOSA'] == dist_park_area[j]['name'] && data[i]['KAUPUNGINOSA'] != dist_park_area[j]['data'][0]['name'])
            {
                not_in_dict = false;
                dist_park_area[j]['data'].push(
                    {
                        'name': data[i]['ALUE_NIMI'],
                        'value': data[i]['PINTA_ALA']
                    }
                )
            }
        }

        if(not_in_dict)
        {    
            dist_park_area.push(
                {
                    'name': data[i]['KAUPUNGINOSA'],
                    'data': [
                        {
                            'name': data[i]['ALUE_NIMI'],
                            'value': data[i]['PINTA_ALA']
                        }
                    ]
                }
            );
        }
    }

    for (let i in data)
    {
        park_area.push({
            'name': data[i]['ALUE_NIMI'],
            'data': [parseFloat(data[i]['PINTA_ALA'])]
        })
    }

    chart = Highcharts.chart('bubbleChart', {
        chart: {
            type: 'packedbubble',
            //height: '110%',
            backgroundColor: '#191919'
        },
        title: {
            text: ''
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value}m<sup>2</sup>'
        },
        legend: {
            itemStyle: {
                color: 'whitesmoke'
            }
        },
        plotOptions: {
            packedbubble: {
                minSize: '10%',
                maxSize: '50%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: false,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: dist_park_area
    });

    Highcharts.chart('colChart', {
        chart: {
            type: 'column',
            //height: '110%',
            backgroundColor: '#191919',
            style: {
                color: 'whitesmoke'
            }
        },
        title: {
            text: 'Areas of all dog parks in Tampere',
            style: {
                color: 'whitesmoke'
            }
        },
        xAxis: {
            categories: ['Parks'],
            labels: {
                enabled: false
            }
        },
        yAxis: {
            min: 0,
            max: 37500,
            title: {
                useHTML: true,
                text: 'Total dog park area (m<sup>2</sup>)',
                style: {
                    color: 'whitesmoke'
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'black'
                }
            }
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            useHTML: true,
            headerFormat: '',
            pointFormat: '<b>{series.name}</b>: {point.y}m<sup>2</sup><br/>'//Total: {point.stackTotal}m<sup>2</sup>'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    format: '{series.name}'
                }
            }
        },
        series: park_area
    });
}

let views = {
    'info': '.info',
    'table': '#parkTable',
    'bubble': '#bubbleChart',
    'column': '#colChart'
};

$('select').change(function(){
    for(let i in views)
    {
        if(i != this.value)
        {
            $(views[i]).css('display', 'none');
        }
    }
    $(views[this.value]).css('display', 'block');
});

getQueryData();