# Harjoitustyö: Vaihe 4
**Tuomas Mäkäräinen, 274351**
### Kehitysympäristö
Harjotustyöni kanssa meinasi käydä hieman hassusti kun käytin valmista pohjaa gitignore-tiedostolla, mikä johti pienimuotoisen katastrofiin js-tiedostojen häviämisen muodossa. Onneksi olin vastikään tehnyt suurimmat ponnistelut js-tiedostojen suhteen, ja koodirivit oli vielä jossain määrin tuoreessa muistissa, joten muutaman tovin kuluttua olin taas samassa vaiheessa kuin ennen töppäystä.
Sivun nykyisen layoutin myötä halusin käyttää tilaa säästeliäästi, joten päätin lähteä väkertämään jonkinlaista menu-ratkaisua karttanäkymän viereen, josta voisi valita esimerkiksi info-näkymän, taulukkonäkymän, ja muita mahdollisia vipstaakkeleita. Hetken kikkailun, ja parin epäonnistuneen yrityksen jälkeen päätin tyytyä perinteiseen drop down-valikkoon, eli HTML:n ```<select>```-tagilla ilmenevä laatikko, jota toki hieman css-tiedostossa tuunasin. Sivu näyttää nyt siis tältä:
![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/home_3.0_raw.png?raw=true)
Pientä css-hienosäätöä on siis tapahtunut muutenkin viime vaiheesta.

Uudessa pudotusvalikossa ei ole siis tässä vaiheessa vielä kuin oletusarvo, sekä värit paikallaan. Seuraavaksi toteutaan sille toimivuuksia. Stack Overflow tarjoili taas viisauksiaa tähän ongelmaan, ja pienellä paikkailulla sainkin koodin toimimaan:
![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/dropdown_func.png?raw=true)
Koodi tähän näyttää tältä:
![# SELECT_VIEWS](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/select_views.png?raw=true)
Uusia vaihdettavia näkymiä saa siis lisäämällä sen views -tietorakenteeseen siten, että avain vastaa select-tagin arvoa, ja arvo vastaa näytettävän HTML-elementin nimeä. Hieman kotikutoinen ratkaisu, mutta toimii mukavasti.

Seuraavana työnkohteena oli itse datan visualisointi. Käytön analytiikan ja API-rajapinnan toteuttaminen olisivat olleet mielenkiintoisia, mutta en kiireiltäni kerennyt alkaa niitä väkertämään. Päätin käyttää visualisaatioon Highcharts-kirjastoa, sillä sen kuvaajat ovat suhteellisen simppeleitä, eikä datassani ollut paljoakaan numeerisia muuttujia. Loin uuden initCharts-nimisen funktion, joka ottaa parametrikseen API-rajapinnasta haetun datan. Tämä tarkoitti siis osaltaan taas datan jäsentämistä. Jonku tovin Highchartsin docsiin tutustumisen, ja jsfiddlessä esimerkin pyörittelemisen jälkeen, päätin alkaa toteuttaa Highchartsin packed bubble kuvaajaa. Tälle syötettävän datan tietorakenne oli alkuun hieman hämmentävä, mutta ei siihen loppupeleissä tarvittukaan kuin pari for-looppia. Koodi tässä:
![# initChart](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/initChart.png?raw=true)
Tämän jälkeen kopsasin Highchartsin docista packed bubble -esimerkin pohjaksi, ja aloin sorvaamaan sitä sivuston tyyliin sopivaksi. Tässäkin em. docsista oli paljon hyötyä! Lopputulos päätyi näyttämään tältä:
![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/bubble_chart.png?raw=true)
Oikeasti hommassa meni tovi, sillä oikeiden asetusten, ja niiden oikeiden kohtien löytämisessä meni hetki.

Päätin lisätä myös toisen visualisaation. Tästä tulisi kasattu pylväskuvaaja, josta voisi suoraan nähdä puistojen kokoerot, sekä koirapuistojen kokonaispinta-alan. Tähänkin lainasin pohjaksi esimerkin Highchartsin docsista. Tätä varten piti myös jäsentää taas oma tietorakenne. Tällä kertaa riitti yksi for-looppi:
![# yksi_for](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/yksi_for.png?raw=true)
<br>
Kopsasin ensimmäisestä kuvaajasta ulkoasuasetukset, jotka syötin datan kanssa em. koodipohjaan, ja pienellä asetusten hienosäädöllä kuvaaja näytti tältä:
![enter image description here](https://github.com/tuomak-uni/ohsiha/blob/master/Harjoitusty%C3%B6/kuvat/col_chart.png?raw=true)
Puistojen nimien fonttien värit vaihtelevat palikoitten taustojen mukaan, mikä itselläni hieman pistää silmään, mutta ajattelin sen olevan vain pieni epäkohta, sillä tämähän on itse Highchartsin ominaisuus.

Homma alkaa olla kasassa, joten eiköhän tämä ollut tässä. Harjoitustyötä oli oikein mukava tehdä, ja oli erittäin mielenkiintoista tutustua web-devaamiseen paremmin. Tulen varmasti jatkossa kokeilemaan enemmän js-pohjaisia kirjastoja, ja toteuttamaan niiden avulla erilaisia visualisaatioita.

Projektin git: https://github.com/tuomak-uni/ohsiha

<br>
<br>
<br>

### Hyödyllisiä lähteitä
* Git-käyttöohje: git-scm.com/doc
* Select-tägi ja onchange: [https://stackoverflow.com/questions/5024056/how-to-pass-parameters-on-onchange-of-html-select](https://stackoverflow.com/questions/5024056/how-to-pass-parameters-on-onchange-of-html-select)
* Highcharts doc: https://api.highcharts.com/highcharts
### Helpot ja haastavat asiat
* Highchartsiin tutustuminen vei hetken, mutta kun sen asetuksiin tottui, niitä oli helppo käyttää.
* Kannattaa varmistaa että tiedot menevät gittiin perille, jos kovalevy jää toisaalle.
