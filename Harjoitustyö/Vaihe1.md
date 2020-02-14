Ohjelmallinen sisällönhallinta 2020
# Harjoitustyö: Vaihe 1
**Tuomas Mäkäräinen, 274351**

### Kehitysympäristö
Valitsin työni pohjaksi pythonilla toimivan django-kehyksen, sillä python ohjelmointikielenä, ja siinä toimivat virtuaaliympäristöt condan kanssa ovat tutut jo entuudestaan. Tietokantojen johdatuskurssia en ole vielä käynyt, joten päätin pysyä djangon oletustietokannassa, joka on SQLite. Käytän kehityksessä sekä kannettavaa (macOS), sekä pöytäkonetta (W10), joten päätin tehdä projektille oman git-sivun, jotta versionhallinta koneiden välillä olisi sujuvaa. Editorina toimii tuttu Visual Studio Code.

### Toteutus
Aloitin projektin luomalla uuden python-virtuaaliympäristön terminaalissa conda-työkalun avulla:
```sh
conda create --name ohsiha python
```
Virtuaaliympäristön nimi on siis 'ohsiha' ja lopussa oleva 'python' määrittää virtuaaliympäristön python tulkiksi uusimman version. Tämä jälkeen aktivoin tämän uuden ympäristön ja asensin siihen djangon pip-pakettityökalulla:
```sh
pip install django
```
