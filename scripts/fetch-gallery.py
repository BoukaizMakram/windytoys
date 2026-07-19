"""Fetch 2 extra product photos per article from retailer sources.

Shopify stores expose /search/suggest.json and /products/<handle>.js which
return product image lists as JSON. Downloads land in .gallery-src/ and are
background-removed separately with rembg.
"""

import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

OUT = Path(".gallery-src")
OUT.mkdir(exist_ok=True)

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0 Safari/537.36"}


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def shopify_images(store: str, query: str) -> list[str]:
    q = urllib.parse.quote(query)
    url = (
        f"https://{store}/search/suggest.json?q={q}"
        "&resources[type]=product&resources[limit]=4"
    )
    data = json.loads(get(url))
    products = data["resources"]["results"]["products"]
    if not products:
        return []
    handle = products[0]["handle"]
    pjs = json.loads(get(f"https://{store}/products/{handle}.js"))
    imgs = []
    for img in pjs.get("images", []):
        if img.startswith("//"):
            img = "https:" + img
        imgs.append(img)
    return imgs


# id -> ("shopify", store, query) or ("direct", [url, url])
SOURCES = {
    "sport-cub-s2": ("shopify", "exhobby.com", "sport cub s2"),
    "p40-warhawk": ("shopify", "exhobby.com", "P40 Warhawk"),
    "t28-trojan": ("shopify", "exhobby.com", "T28 Trojan"),
    "spitfire-400": ("shopify", "exhobby.com", "Spitfire"),
    "bf109-400": ("shopify", "exhobby.com", "BF109"),
    "ranger-600s": ("shopify", "exhobby.com", "Ranger 600S"),
    "ranger-2000": ("shopify", "exhobby.com", "Ranger 2000"),
    "asw28-sailplane": ("shopify", "exhobby.com", "ASW28"),
    "p51-mustang-500": ("shopify", "exhobby.com", "Mustang 500"),
    "f16-falcon": ("shopify", "exhobby.com", "F16"),
    "p51d-mustang": (
        "direct",
        [
            "https://cdn.shopify.com/s/files/1/0262/4746/2998/files/rc-airplane-warbird-76105-01.jpg",
            "https://www.buddyrc.com/cdn/shop/products/1000p51d.jpg?width=1000",
        ],
    ),
    "f4u-corsair": (
        "direct",
        [
            "https://www.stirlingkit.com/cdn/shop/products/stirlingkit-volantexrc-f4u-corsair-airplane-400mm-wingspan-airplane-with-xpilot-gyro-rtf_2_6629c8f2-2c98-45ae-8167-ce13b83bb273_800x.jpg",
            "https://www.stirlingkit.com/cdn/shop/products/stirlingkit-volantexrc-f4u-corsair-airplane-400mm-wingspan-airplane-with-xpilot-gyro-rtf_4_679fd887-7122-4980-a115-1575f5093ec1_800x.jpg",
        ],
    ),
    "syma-v22-osprey": (
        "direct",
        [
            "https://www.symatoys.com/upload/V22/V22_02.jpg",
            "https://www.symatoys.com/upload/V22/V22_04.jpg",
        ],
    ),
    "malaysia-b777": (
        "direct",
        [
            "https://www.kyaratoys.com/cdn/shop/files/61HebEfNwSL._SL1500.jpg",
            "https://www.kyaratoys.com/cdn/shop/files/41w96gh1gLL._SL1080.jpg",
        ],
    ),
}


def main() -> None:
    failures = []
    for pid, source in SOURCES.items():
        try:
            if source[0] == "shopify":
                _, store, query = source
                imgs = shopify_images(store, query)
                # image [0] is usually the main shot we already have
                picks = imgs[1:3] if len(imgs) > 2 else imgs[:2]
            else:
                picks = source[1]

            for i, url in enumerate(picks, start=2):
                dest = OUT / f"{pid}-{i}.jpg"
                dest.write_bytes(get(url))
                print(f"ok  {dest.name}  <-  {url[:90]}")
        except Exception as exc:  # noqa: BLE001
            failures.append(pid)
            print(f"FAIL {pid}: {exc}", file=sys.stderr)

    if failures:
        print("failed:", ", ".join(failures), file=sys.stderr)


if __name__ == "__main__":
    main()
