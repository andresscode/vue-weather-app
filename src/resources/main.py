import json
import unicodedata

with open("cities.json", "r", encoding="utf-8") as f:
    cities = json.load(f)

citiesDict = {}

for city in cities:
    normalized_name = (
        unicodedata.normalize("NFKD", city["name"])
        .encode("ASCII", "ignore")
        .decode("utf-8")
    )
    lower_name = normalized_name.lower()
    citiesDict[lower_name] = {
        "name": city["name"],
        "lat": city["lat"],
        "lon": city["lon"],
    }

with open("cities-dict.json", "w", encoding="utf-8") as f:
    json.dump(citiesDict, f, ensure_ascii=False, indent=4)
