# GAL
Piattaforma per la visualizzazione delle mappe del progetto GAL.

I dati delle mappe (sia vettoriali che raster) sono pubblicate su un server pygeoapi tramite [OGC API - Features](https://ogcapi.ogc.org/features/) 
e [OGC API - Coverages](https://ogcapi.ogc.org/coverages/).

Per configurare il server, vedere cartella `server`.

Per eseguire il client, dopo aver creato un virtual environment (`venv`):

```
   pip install -r requirements
   python manage.py runserver
```

All'indirizzo [http://127.0.0.1:8000/home/explore/](http://127.0.0.1:8000/home/explore/) dovrebbe essere visualizzata la 
piattaforma di esplorazione delle mappe.


## Implementazione
Il collegamento al server pygeoapi è implementato dal metodo `get_map_data` in `home/views.py`

## Librerie utilizzate
- [jQuery](https://jquery.com/)
- [Pure Css](https://github.com/pure-css/pure)
- [jquery-multi-select](https://github.com/mysociety/jquery-multi-select) (con modifiche)
- [Leaflet](https://leafletjs.com/)
- [leaflet-coverage](https://github.com/Reading-eScience-Centre/leaflet-coverage)
- [Leaflet Control Search](https://github.com/stefanocudini/leaflet-search)
