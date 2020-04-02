Ohjelmallinen sisällönhallinta 2020
# Harjoitustyö: Vaihe 2
**Tuomas Mäkäräinen, 274351**
### Kehitysympäristö
Päätin lähteä haastamaan itseäni webkehityksen suhteen ja pelkän djangon ja HTML:n lisäksi tutustua paremmin JavaScriptiin. Hyödynnän JavaScriptiin pohjautuvaa Leaflet -pakettia lisätäkseni web-sovellukseeni karttaselaimen. Tämän lisäksi päätin sisällyttää sivuun Bootstrap-kirjaston.
Löytämäni tutoriaalin innoittamana lähdin toteuttamaan kirjautumisominaisuutta hieman sovellettuna djangon sisäänrakennetusta kirjautumispalvelusta. Aloitin tämän projektin luomalla uuden django-sovelluksen nimeltään accounts. Päätin liittää djangon tunnistautumistoiminnallisuuden tähän äsken luotuun sovellukseen joten lisäsin djangon urls-tiedostoon pari uutta riviä:

![](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/urls.png?raw=true)

Tämän avulla päästään käsiksi djangon sisäänrakennettuihin kirjautumispohjiin.
Seuraavaksi loin uuden kansion projektin juurikansioon nimeltään 'templates'. Tähän lisään vielä toisen kansion nimeltään 'registration', johon lisään muokattuja sivupohjia kirjautumis ja rekisteröitymistoiminnolle. Tutoriaalista löysin oikein simppelit, mutta toimivat pohjat djangon valmiiden sijaan. Vastaan tuli kuitenkin ongelma, kun yritin testata niiden toimintaa, sillä django ei osannut löytää niitä uudesta kansiosta. Hetken etsiskelyn jälkeen löytyi netistä nopea korjaus. Djangolle voidaan kertoa, mistä sen kannattaa etsiä pohjia. Tämä onnistuu lisäämällä rivi settings-tiedostoon:

![](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/templates_path.png?raw=true)

Tämän jälkeen kirjautumissivun avaaminen onnistuikin:

![](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/login_raw.png?raw=true)
Kokeilin kirjautua aikaisemmin luodulla admin-käyttäjällä, ja itse kirjautuminen onnistuikin, mutta django ei tiennyt, mille sivulle sen tulisi uudelleen ohjata, joten näkymä oli tämä:

![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/login_404.png?raw=true)
Tässä 'signup' eli rekisteröitymisnäkymä:

![](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/signup.png?raw=true)
Sisäänkirjautumisen ja rekisteröitymisen lisäksi lisään kotinäyttöön linkin salasanan vaihtoon, joka näyttää tältä:

![](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/change_pw.png?raw=true)
Seuraavaksi loin templates-kansioon 'base'- ja 'home'-nimiset HTML-tiedostot. Base toimii muiden sivuston näkymien pohjana, ja home toimii nimensä mukaan kotisivuna, eli sillä on suurin osa käytännön tilpehööristä. Tässä vaiheessa sai olla tarkkana että djangon sisältö tagit olivat oikeissa kohdissa, sillä muutoin sivulle ei renderöitynyt mitään. Tämä oli helppo varmistaa tarkastelemalla sivuston lähdekoodia, ja varmistaa että sieltä löytyy kaikki mitä siellä piti ollakin. 

Nyt loin uuden kansion projektin juurikansioon nimeltään static, johon sijoitin erilaisia kiinteitä resursseja, kuten sivujen muotoilua muokkaavia css -tiedostoja, sekä sivuston toimintoja toteuttavia JavaScript -tiedostoja. Homma ei kuitenkaan toiminut suorilta, sillä kuten template -kansion kanssa, django ei taaskaan tiennyt mistä etsiä uusia tiedostoja. Tämänkin sai korjattua lisäämällä projektin settings -tiedostoon rivin, jossa kerrotaan djangolle, mistä etsiä kyseisiä resursseja. 

![](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/static_path.png?raw=true)

Tässä base -tiedoston sisältö:
![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/base_html.png?raw=true)
Kuten kuvasta voidaan nähdä, on siellä bootstrap-kirjaston tarvitsemat linkitykset, sekä djangon 'load static' kutsu, jolla päästään käsiksi äskettäin luotuihin staattisiin resurssitiedostoihin static-kansiosta. Linkitin jo valmiiksi myöhemmin toteutettavan css-tyylitiedoston.

Leafletjs:n quick-start ohjeessa on oikein suoraviivainen ohjeistus karttaelementin sivustolle lisäämiseksi. Löysin tämän lisäksi eräästä youtube -videosta kätevän tavan hyödyntää OpenStreetMap -karttaa leafletjs:n karttapohjana. Tämä on mukava tapa, koska tällöin ei tarvita yksilöllistä API-avainta. Tällä hetkellä kotisivu näytti tältä.

![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/raw_map.png?raw=true)
Tein JavaScriptillä pienen funktion, joka hyödyntää HTML5:n geolocation ominaisuutta käyttäjän paikantamiseksi, ja lisää karttaan sinisen nastan käyttäjän sijaintiin. Lisäsin myös toisen pienen funktion, millä käyttäjä voi karttaa klikkaamalla lisätä vihreän nastan klikattuun sijaintiin. Lisäsin myös napin, jolla saa poistettua nämä klikkaamalla lisätyt nastat.

![](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/pin_map.png?raw=true)
Karttaa ja nastojen toimintoja lisäillessä törmäsin hassuun ongelmaan: javascripteihin tekemät muutokseni eivät päivittynytkään itsestään sivustoa normaalisti päivittäessä. Hetken etsiskelyn jälkeen löytyivät ohjeet ns. 'force refresh':n tekemiseen, mikä toteutuu siis ainakin Google Chromessa painamalla perinteisen päivitysnäppäimen F5 lisäksi CTRL-nappia pohjassa sivua päivittäessä. Tämä pakottaa sivuston ja sen resurssien uudelleen lataamisen, mikä päivittää myös selaimen välimuistissa olevien tiedostojen päivittymisen. Syynä ongelmaan oli juurikin tämä selainten ominaisuus tallettaa sivun resursseja välimuistiin.

Tässä vaiheessa päätin hakea hyödynnettävän datan paikalliseen tiedostoon , ja lisätä sen kartan alapuolelle HTML:n taulukkomuodossa aakkosjärjestyksessä. Datan hakemisen ja tallentamisen tietokantaan toteutin Python-skriptillä:
![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/data_python.png?raw=true)
Jotta datan saisi näkymään kotisivulle, piti ensin luoda sille konteksti views-tiedostoon:
![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/data_context.png?raw=true)
Tämän avulla HTML-taulukon toteuttaminen onnistuikin helposti yksinkertaisella for-loopilla "home.html"-tiedostoon:
![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/html_table.png?raw=true)
Tämän lisäksi pyörittelin hieman sivuston ulkoasua css-tiedoston avulla, joten nyt kotisivu näytti tältä:
![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/map_with_table.png?raw=true)
Taulukossa näkyvä data on siis peräisin Tampereen kaupungin ylläpitämästä datapalvelusta.

### Hyödyllisiä lähteitä
Kirjautumistoimintoon
[https://docs.djangoproject.com/en/3.0/topics/auth/default/#module-django.contrib.auth.views](https://docs.djangoproject.com/en/3.0/topics/auth/default/#module-django.contrib.auth.views)
[https://learndjango.com/tutorials/django-login-and-logout-tutorial](https://learndjango.com/tutorials/django-login-and-logout-tutorial)

Karttatoimintoon
[https://www.w3schools.com/html/html5_geolocation.asp](https://www.w3schools.com/html/html5_geolocation.asp)
[https://www.youtube.com/watch?v=nZaZ2dB6pow](https://www.youtube.com/watch?v=nZaZ2dB6pow)
[https://leafletjs.com/examples/quick-start/](https://leafletjs.com/examples/quick-start/)

HTML, JS, ja CSS
[https://www.w3schools.com/](https://www.w3schools.com/default.asp)
[https://www.bestcssbuttongenerator.com/](https://www.bestcssbuttongenerator.com/)

Template-muuttujat ja näkymät
[https://docs.djangoproject.com/en/3.0/ref/templates/](https://docs.djangoproject.com/en/3.0/ref/templates/)
[https://www.youtube.com/watch?v=0hIMiq0YZSc&list=PLgCYzUzKIBE_dil025VAJnDjNZHHHR9mW&index=7](https://www.youtube.com/watch?v=0hIMiq0YZSc&list=PLgCYzUzKIBE_dil025VAJnDjNZHHHR9mW&index=7)

Data
[https://data.tampere.fi/data/fi/dataset/ba68a4f0-1843-432d-955b-15173262627f](https://data.tampere.fi/data/fi/dataset/ba68a4f0-1843-432d-955b-15173262627f)

### Helpot ja haastavat asiat
* Tämmöinen varsinainen web-devaaminen (html, js, css) ei ollut entuudestaan tuttua ja tuntui alkuun aika isolta kokonaisuulta lähteä tutustumaan.
* Homma lähti sujumaan kuitenkin ihmeen mukavasti, vaikka  työnjälki ei toki missään nimessä ole mitään tähtitieteellistä.
* Djangon tietokantajärjestely hieman sekoitti pakkaa, mutta tarkasti tutoriaalia seuraamalla, ja turhat kikkailut pois jättämällä homma toimii
* Ongelmallisimpia ovat eri kielien väliset rajapinnat, kuten esimerkiksi datan siirtäminen Pythonista JavaScriptin käytettäväksi, tai toisin päin.
