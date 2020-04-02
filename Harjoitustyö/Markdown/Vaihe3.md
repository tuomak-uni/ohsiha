# Harjoitustyö: Vaihe 3
**Tuomas Mäkäräinen, 274351**
### Kehitysympäristö
Aikaisemmin palvelun datan hyödyntäminen toimi paikallisestitallennetun datan kautta, mutta päätin toteuttaa sen kunnolla API-rajapintaa hyödyntäen. Tähän käytän ajax-funktiona toteutettua jquery-kyselyä Tampereen avoimelle rajapinnalle. Innostuin tutustumaan paremmin myös HTML:n ja CSS:n toimintaan, ja laitoin sivuston ulkoasun uusiksi. Päätin myös ottaa paikannusominaisuuden pois, sillä ajattelin sen olevan tarpeeton.
Ensimmäisenä kuitenkin korjasin verkkosivun pikkukuvaan liittyvän 404-virheen, jota djangon loki näyttää jokakerta, kun sivustoa avaa:

![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/favicon_404.png?raw=true)

Pienen googlailun jälkeen ratkaisu osoittautui helpoksi yksiriviseksi HTML-määritteeksi:
````
<link rel="shortcut icon" type="image/png" href="{% static 'favicon.ico' %}"/>
````
Laittamalla tämän rivin base-nimiseen html-tiedoston head-osuuteen, ja lisäämällä tyhjän favicon-tiedoston static-kansiooni, muuttui pyynnön vastauskoodi onnistuneeksi (200):

![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/favicon_200.png?raw=true)

Seuraavaksi paneuduin täysin Tampereen avoimen datan rajapinnan käyttöön. Loin map.js-tiedostoon uuden getQueryData-funktion, joka siis tekee jquery-kyselyn API:lle. Riippuen kyselyn onnistumisesta funktio jatkaa joko datan käsittelyyn, tai virheviestiin. Datalähteen sivulla oli tarjolla valmis funktiopohja tälle kyselylle, mutta se ei toiminut suoraan sellaisenaan, sillä sen avulla tehdyt kyselyt olivat muodoltaan virheellisiä. Pitkähkön selvittelyn jälkeen eräästä GitHub-keskustelusta löytyi sattumalta ratkaisu tähän ongelmaan: lisäämällä lyhyen alustuskoodin ajaxille ennen kyselyn suorittamista teki funktiosta toimivan. Kyseinen koodipätkä on korostettuna kuvassa:

![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/ajax_cache.png?raw=true)

Nyt siis pääsin käsiksi dataan ilman paikallista kopiota siitä. Homma jatkui tästä datan selvittelyllä. Ensiksi päätin järjestellä puistot järjestykseen niiden nimien perusteella. Tähän käytin javascriptin perus sort-funktiota itsemääritellyllä vertailufunktiolla, joka siis haki datan tietorakenteesta puistojen nimiä ja vertaili niitä keskenään. Tähän toteutukseen löysin apua StackOverflowsta. Tämän jälkeen suoritetaan erilaisia string-datan jakamis- ja leikkausoperaatioita, joilla datasta saadaan karsittua turhia osia.
Seuraavaksi tein hämmentävän havainnon puistojen koordinaattien formaatista: koordinaatit ovat alkuperäisessä datassa EPSG:3878 koordinaattijärjestelmän muodossa, mikä ei ollutkaan suorilta yhteensopiva käyttämäni karttapohjasovelluksen kanssa. Tämän ansioista sain tutustua hieman enemmänkin koordinaattisysteemien toimintaan, ja niiden muuttamisesta toiseen systeemiin. Lopulta törmäsin proj4js-nimiseen javascript-kirjastoon, jonka avulla koordinaattien muuttaminen, eli projisointi onnistui. Vaikka alkuun vaikuttikin tämän olevan helppo ratkaisu kyseiseen ongelmaan, se ei loppupeleissä ollutkaan. Loppupeleissä toimiva kombinaatio oli ensin muuttaa koordinaatit formaatista toiseen, ja tämän jälkeen koordinaattiparien piti vielä vaihtaa paikkaa keskenään, eli pituuskoordinaatista tuli leveyskoordinaatti, ja toisin päin. Muutoin koordinaatit osoittivat vääriin sijainteihin. Kuva dataa käsittelevästä funktiosta:

![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/parse_data.png?raw=true)

Leafletjs:n dokumentaation ja äskettäin siistittyjen koordinaattien avulla sain karttapohjalleni näkyviin punaisella puistojen oikeat pinta-alan kuvaajat. JES! Dokumentaatiota apuna käyttäen lisäsin myös puistoille pienet popup-ikkunat, jotka tulevat näkyviin puiston alaa klikatessa. Ikkunassa näkyy puiston nimi, kaupunginosa, sekä puiston pinta-ala neliömetreissä:

![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/popup.png?raw=true)

Seuraavana osaprojektina oli datan esittäminen HTML-taulukossa, kuten aikaisemmin toteutettuna paikallisella datalla. Tällä kertaa päätin kuitenkin tehdä taulukon toteutuksen javascriptin avulla, sillä datan käsittely sillä oli mielestäni kätevintä. Perustoteutus olikin yllättävän helppo, joten päätin lisätä pari ominaisuutta taulukkoon: puiston merkkaus, ja kartan kohdennus. Lisäsin siis jokaisen puiston riville checkbox-objektin, jonka aktivointi lisää kartalle pienen nastamerkin (kuten aikaisemmin sijainnin paikannuksessa) kyseisen puiston kohdalle. Kartankohdennus toteutui parilla rivillä koodia. Se toimii taulukossa olevaa puiston nimeä klikkaamalla, jolloin kartta kohdistaa näkymänsä automaattisesti kyseisen puiston kohdalle.

![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/create_table.png?raw=true)

Tämän jälkeen aloin leikkimään sivuston ulkoasulla. Tässä vaiheessa vastaan tuli djangon templateihin ja bootstrapiin liittyvä ongelma, sillä esimerkiksi kotisivulla olevien objektien (kartta ja taulu) kokojen määrittely ei mennyt jostain syystä perille css:n kautta, sillä niiden päälle tuli uusia määrittelyjä muista lähteistä (bootstrap). Tämän takia loin kotisivua varten oman home.css-tiedoston, johon pystyin helpommin määrittelemään sivuston asettelua ilman, että muut näkymät räjähtävät. Hetken pyörittelyn jälkeen onnistuin saamaan asettelun kuntoon, ja korjailin vielä hieman värien määrittelyjä, minkä seurauksena kotisivu 2.0 näyttää tältä:

![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/home_2.0.png?raw=true)

Lisäsin myös projektini tiedostot omaan GitHubiin, joka löytyy täältä:
[https://github.com/tuomak-uni/ohsiha](https://github.com/tuomak-uni/ohsiha)

Seuraavana toteutusvuorossa on käyttödatan kerääminen, sekä visualisointi.
<br>


### Hyödyllisiä lähteitä
favicon
* [https://stackoverflow.com/questions/21938028/how-can-i-get-a-favicon-to-show-up-in-my-django-app](https://stackoverflow.com/questions/21938028/how-can-i-get-a-favicon-to-show-up-in-my-django-app)


Ajax-ongelma
* * [https://github.com/ckan/ckan/issues/2011](https://github.com/ckan/ckan/issues/2011)
 
Javascript ja ajax
* [https://devdocs.io/javascript/](https://devdocs.io/javascript/)
* [https://stackoverflow.com/questions/tagged/javascript](https://stackoverflow.com/questions/tagged/javascript)
* [https://www.pluralsight.com/guides/work-with-ajax-django](https://www.pluralsight.com/guides/work-with-ajax-django)

proj4js 
* [http://proj4js.org/](http://proj4js.org/)
 
leaflet
* [https://leafletjs.com/reference-1.6.0.html](https://leafletjs.com/reference-1.6.0.html)
 
Koirapuistodata
* [https://data.tampere.fi/data/fi/dataset/tampereen-koirapuistot](https://data.tampere.fi/data/fi/dataset/tampereen-koirapuistot)

### Helpot ja haastavat asiat
* HTML, CSS ja etenkin JavaScript ovat alkaneet kiinnostamaan enemmän ja enemmän
* Toteuttaessa tuli vastaan paljon pieniä etenemisen pysäyttäviä ongelmia, jotka selvisivät, kunhan jaksoi hetken etsiä lisätietoja.
