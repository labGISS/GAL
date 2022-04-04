import json

from django.shortcuts import render
from django.http.response import JsonResponse
from django.templatetags.static import static
from django.conf import settings
import requests
from django.views.generic import TemplateView


class InfoView(TemplateView):
    template_name = "home/info.html"

    def get_context_data(self, **kwargs):
        context = super(InfoView, self).get_context_data(**kwargs)

        project_partners = [
            ("Università degli Studi di Salerno", static('home/images/logos/unisa.png')),
            ("Dipartimento di Informatica", static('home/images/logos/partners/di.png')),
            ("Dipartimento di Ingegneria Civile", static('home/images/logos/partners/diciv.png')),
            ("Dipartimento di Farmacia", static('home/images/logos/partners/difarma.png')),
            ("Confederazione Italiana Agricoltori – Salerno", static('home/images/logos/partners/cia.png')),
            ("Confcooperative Campania", static('home/images/logos/partners/confc.png')),
            ("Lega Regionale delle Cooperative e Mutue della Campania", static('home/images/logos/partners/lgc.png')),
            ("“Tonda Giffoni” – Società Cooperativa Agricola – Produttori Frutta in Guscio", static('home/images/logos/partners/tonda.png')),
            ("Consorzio di Tutela Nocciola di Giffoni IGP", static('home/images/logos/partners/nocc.png')),
            ("Federazione Provinciale Coldiretti Salerno", static('home/images/logos/partners/cold.png')),
            ("Confagricoltura Salerno", static('home/images/logos/partners/confagri.png')),
        ]

        context["project_partners"] = project_partners
        return context


class ExploreView(TemplateView):
    template_name = "home/explore.html"

    def get_collections(self):
        import requests
        server_url = settings.PYGEOAPI_URL

        collections = requests.get(f"{server_url}/collections").json()
        collections = collections["collections"]

        categories = {
            "Altro": []
        }

        themes = []
        # Split collections by keywords
        for collection in collections:
            collection_data = (collection["id"], collection["title"])
            if collection["keywords"] and "Mappe" in collection["keywords"]:
                category = [kw for kw in collection["keywords"] if kw != "Mappe"].pop()  # filter out "Mappe" keyword
                if category in categories:
                    categories[category].append(collection_data)
                else:
                    categories[category] = [collection_data]
            elif collection["keywords"] and "Temi" in collection["keywords"]:
                themes.append(collection_data)

        return {"maps": categories, "themes": themes}

    def get_context_data(self, **kwargs):
        context = super(ExploreView, self).get_context_data(**kwargs)
        collections = self.get_collections()
        context["collections"] = collections
        return context


def get_map_data(request):
    server_url = settings.PYGEOAPI_URL
    map_id = request.GET.get("m")
    collection_url = f"{server_url}/collections/{map_id}"

    map_metadata = requests.get(collection_url).json()
    if "itemType" in map_metadata and map_metadata["itemType"] == "feature":
        # features collection: retrieve and return
        data = requests.get(f"{collection_url}/items", params={"f": "json", "limit": 20000}).json()
    else:
        # coverage: need some manipulations
        rangetype = requests.get(f"http://localhost:5000/collections/{map_id}/coverage/rangetype?", params={"f": "json"}).json()
        nodata = rangetype["field"][0]["nodata"]
        data = requests.get(f"{collection_url}/coverage", params={"f": "json"}).json()

        # add map name as coverage observed property label
        data["parameters"]["null"]["observedProperty"]["label"]["en"] = map_metadata["title"]
        data["parameters"]["null"]["observedProperty"]["description"] = {"en": map_metadata["description"]}

        # data_without_nodata = list(filter(lambda a: a != nodata, data["ranges"]["null"]["values"]))
        # replaces nodata values with none
        data_without_nodata = [x if x != nodata else None for x in data["ranges"]["null"]["values"]]
        # min_val = min(list(filter(lambda a: a is not None, data_without_nodata)))
        # max_val = max(list(filter(lambda a: a is not None, data_without_nodata)))

        data["ranges"]["null"]["values"] = data_without_nodata
        # data["ranges"]["null"]["valuesrange"] = [min_val, max_val]
        if "symbol" in data["parameters"]["null"]["unit"] and not data["parameters"]["null"]["unit"]["symbol"]:
            del data["parameters"]["null"]["unit"]

    return JsonResponse(data=data)

