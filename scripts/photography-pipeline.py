#!/usr/bin/env python3
"""Organize audited photography, create mapping/manifest, and optimize WebP assets."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
INBOX = ROOT / "assets-source/website-photography/_inbox"
SOURCE_ROOT = ROOT / "assets-source/website-photography"
PUBLIC_ROOT = ROOT / "public/images/photography"

# Globally resolved one-to-one mapping (HIGH + selected MEDIUM)
ASSIGNMENTS: list[dict] = [
    {
        "originalFile": "car.png",
        "visualDescription": "Dark gray SUV on a suburban residential street",
        "matchedPlacement": "auto-insurance",
        "targetFilename": "auto-insurance.png",
        "targetFolder": "personal",
        "route": "/auto-insurance/",
        "confidence": "HIGH",
        "reason": "Clear personal auto hero — named source file matches placement",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_44_05 PM (61).png",
        "visualDescription": "Family carrying groceries from SUV toward brick suburban home",
        "matchedPlacement": "home-insurance",
        "targetFilename": "home-insurance.png",
        "targetFolder": "personal",
        "route": "/home-insurance/",
        "confidence": "HIGH",
        "reason": "Strong home + family lifestyle hero; chosen over duplicate driveway scenes",
    },
    {
        "originalFile": "apartment buidling.png",
        "visualDescription": "Modern multi-story brick condo/apartment building",
        "matchedPlacement": "condo",
        "targetFilename": "condo.png",
        "targetFolder": "personal",
        "route": "/get-a-quote?type=home&homeType=condo",
        "confidence": "HIGH",
        "reason": "Named apartment building — best fit for condo quote placement",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_42 PM (7).png",
        "visualDescription": "Rustic lakeside wooden cabin with dock",
        "matchedPlacement": "cottage",
        "targetFilename": "cottage.png",
        "targetFolder": "personal",
        "route": "/get-a-quote?type=home&homeType=cottage",
        "confidence": "HIGH",
        "reason": "Distinct cottage/recreational property scene",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_43 PM (12).png",
        "visualDescription": "Motorcyclist on rural road past fields and farmhouse",
        "matchedPlacement": "motorcycle",
        "targetFilename": "motorcycle.png",
        "targetFolder": "personal",
        "route": "/get-a-quote?type=vehicle&vehicleType=motorcycle",
        "confidence": "HIGH",
        "reason": "Only clear motorcycle scene in library",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_44 PM (13).png",
        "visualDescription": "Traveller with suitcase in airport terminal",
        "matchedPlacement": "travel-insurance",
        "targetFilename": "travel-insurance.png",
        "targetFolder": "personal",
        "route": "/get-a-quote?type=travel",
        "confidence": "HIGH",
        "reason": "Only airport/travel scene in library",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_44 PM (14).png",
        "visualDescription": "Powerboat cruising on calm water with passengers",
        "matchedPlacement": "boat",
        "targetFilename": "boat.png",
        "targetFolder": "personal",
        "route": "/get-a-quote?type=vehicle&vehicleType=boat",
        "confidence": "HIGH",
        "reason": "Only watercraft scene in library",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_42 PM (9).png",
        "visualDescription": "Manufactured home in residential community",
        "matchedPlacement": "landlord",
        "targetFilename": "landlord.png",
        "targetFolder": "personal",
        "route": "/get-a-quote?type=home&homeType=landlord",
        "confidence": "MEDIUM",
        "reason": "Rental-property feel; no dedicated landlord page — quote placement only",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_44_02 PM (57).png",
        "visualDescription": "Home office with built-in shelves and laptop",
        "matchedPlacement": "tenant",
        "targetFilename": "tenant.png",
        "targetFolder": "personal",
        "route": "/get-a-quote?type=home&homeType=tenant",
        "confidence": "MEDIUM",
        "reason": "Renter/home-office lifestyle; quote placement only",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_46 PM (19).png",
        "visualDescription": "Commercial building with fleet of white vans",
        "matchedPlacement": "commercial-auto-insurance",
        "targetFilename": "commercial-auto-insurance.png",
        "targetFolder": "commercial",
        "route": "/commercial-auto-insurance/",
        "confidence": "HIGH",
        "reason": "Fleet/commercial vehicle yard — chosen over duplicate van rows",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_56 PM (43).png",
        "visualDescription": "White semi-trailer on rural highway",
        "matchedPlacement": "trucking-insurance",
        "targetFilename": "trucking-insurance.png",
        "targetFolder": "commercial",
        "route": "/trucking-insurance/",
        "confidence": "HIGH",
        "reason": "Only long-haul semi scene",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_56 PM (44).png",
        "visualDescription": "White dump truck at gravel/construction site",
        "matchedPlacement": "dump-truck-insurance",
        "targetFilename": "dump-truck-insurance.png",
        "targetFolder": "commercial",
        "route": "/dump-truck-insurance/",
        "confidence": "HIGH",
        "reason": "Only dump truck scene",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_50 PM (29).png",
        "visualDescription": "Construction worker framing wall studs",
        "matchedPlacement": "contractors-insurance",
        "targetFilename": "contractors-insurance.png",
        "targetFolder": "commercial",
        "route": "/contractors-insurance/",
        "confidence": "HIGH",
        "reason": "Classic trades/framing hero; chosen over landscaping duplicate",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_44_00 PM (51).png",
        "visualDescription": "Supervisors at multi-story concrete building construction",
        "matchedPlacement": "builders-developers-insurance",
        "targetFilename": "builders-developers-insurance.png",
        "targetFolder": "commercial",
        "route": "/builders-developers-insurance/",
        "confidence": "HIGH",
        "reason": "Large-scale development — distinct from single-trade framing",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_50 PM (28).png",
        "visualDescription": "Machinist inspecting parts beside CNC machine",
        "matchedPlacement": "manufacturing-insurance",
        "targetFilename": "manufacturing-insurance.png",
        "targetFolder": "commercial",
        "route": "/manufacturing-insurance/",
        "confidence": "HIGH",
        "reason": "Industrial CNC floor — chosen over woodworking shop duplicate",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_48 PM (23).png",
        "visualDescription": "Commercial warehouse with office front and pallets",
        "matchedPlacement": "commercial-property-insurance",
        "targetFilename": "commercial-property-insurance.png",
        "targetFolder": "commercial",
        "route": "/commercial-property-insurance/",
        "confidence": "HIGH",
        "reason": "Only clear commercial property/warehouse hero",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_52 PM (32).png",
        "visualDescription": "Chefs cooking in busy commercial kitchen",
        "matchedPlacement": "restaurant-insurance",
        "targetFilename": "restaurant-insurance.png",
        "targetFolder": "commercial",
        "route": "/restaurant-insurance/",
        "confidence": "HIGH",
        "reason": "Full commercial kitchen — chosen over bakery counter duplicate",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_59 PM (47).png",
        "visualDescription": "Food truck serving customers with outdoor seating",
        "matchedPlacement": "food-truck-insurance",
        "targetFilename": "food-truck-insurance.png",
        "targetFolder": "commercial",
        "route": "/food-truck-insurance/",
        "confidence": "HIGH",
        "reason": "Primary food truck scene — chosen over trailer duplicate",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_46 PM (18).png",
        "visualDescription": "Downtown main-street retail storefronts",
        "matchedPlacement": "retail-insurance",
        "targetFilename": "retail-insurance.png",
        "targetFolder": "commercial",
        "route": "/retail-insurance/",
        "confidence": "HIGH",
        "reason": "Streetscape retail hero — chosen over interior boutique duplicates",
    },
    {
        "originalFile": "board room meeting.png",
        "visualDescription": "Business professionals in modern conference room",
        "matchedPlacement": "professional-offices-insurance",
        "targetFilename": "professional-offices-insurance.png",
        "targetFolder": "commercial",
        "route": "/professional-offices-insurance/",
        "confidence": "HIGH",
        "reason": "Named boardroom scene — best professional offices hero",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_49 PM (26).png",
        "visualDescription": "Professionals reviewing architectural blueprints",
        "matchedPlacement": "real-estate-insurance",
        "targetFilename": "real-estate-insurance.png",
        "targetFolder": "commercial",
        "route": "/real-estate-insurance/",
        "confidence": "MEDIUM",
        "reason": "Blueprint/planning scene fits property professionals; no dedicated real-estate lifestyle shot",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_59 PM (48).png",
        "visualDescription": "Tractor cultivating field with farm buildings and silos",
        "matchedPlacement": "farm-insurance",
        "targetFilename": "farm-insurance.png",
        "targetFolder": "commercial",
        "route": "/farm-insurance/",
        "confidence": "HIGH",
        "reason": "Broad farm operations hero — chosen over grain-elevator close-ups",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_44_00 PM (50).png",
        "visualDescription": "Commercial greenhouse with hydroponic herb rows",
        "matchedPlacement": "greenhouse",
        "targetFilename": "greenhouse.png",
        "targetFolder": "commercial",
        "route": "/get-a-quote?type=business&industry=greenhouse",
        "confidence": "HIGH",
        "reason": "Only greenhouse scene — quote/agriculture placement",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_44_05 PM (60).png",
        "visualDescription": "Construction supervisors at concrete building site",
        "matchedPlacement": "bonding-insurance",
        "targetFilename": "bonding-insurance.png",
        "targetFolder": "commercial",
        "route": "/bonding-insurance/",
        "confidence": "MEDIUM",
        "reason": "Construction project oversight — reasonable bonding/surety visual",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_44_02 PM (56).png",
        "visualDescription": "Modern office reception and open workspace",
        "matchedPlacement": "commercial-insurance",
        "targetFilename": "commercial-insurance.png",
        "targetFolder": "commercial",
        "route": "/commercial-insurance/",
        "confidence": "MEDIUM",
        "reason": "Generic commercial workplace for hub page",
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_44_01 PM (53).png",
        "visualDescription": "Broker meeting with client at round table",
        "matchedPlacement": "about",
        "targetFilename": "about.png",
        "targetFolder": "special",
        "route": "/about/",
        "confidence": "HIGH",
        "reason": "Client-advisory scene fits About page; temporary AI image",
        "isTemporary": True,
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_43_50 PM (27).png",
        "visualDescription": "Team meeting around conference table",
        "matchedPlacement": "team",
        "targetFilename": "team.png",
        "targetFolder": "special",
        "route": "/team/",
        "confidence": "HIGH",
        "reason": "Collaborative team scene; temporary AI image",
        "isTemporary": True,
    },
    {
        "originalFile": "ChatGPT Image Sep 1, 2026, 09_44_06 PM (62).png",
        "visualDescription": "Professional consultation at office table",
        "matchedPlacement": "contact",
        "targetFilename": "contact.png",
        "targetFolder": "special",
        "route": "/contact/",
        "confidence": "HIGH",
        "reason": "Consultation/contact scene",
    },
]

MANIFEST_PLACEMENTS = [
    {"slug": "auto-insurance", "category": "personal", "route": "/auto-insurance/", "hasPage": True},
    {"slug": "home-insurance", "category": "personal", "route": "/home-insurance/", "hasPage": True},
    {"slug": "condo", "category": "personal", "route": "/get-a-quote?type=home&homeType=condo", "hasPage": False},
    {"slug": "tenant", "category": "personal", "route": "/get-a-quote?type=home&homeType=tenant", "hasPage": False},
    {"slug": "landlord", "category": "personal", "route": "/get-a-quote?type=home&homeType=landlord", "hasPage": False},
    {"slug": "cottage", "category": "personal", "route": "/get-a-quote?type=home&homeType=cottage", "hasPage": False},
    {"slug": "motorcycle", "category": "personal", "route": "/get-a-quote?type=vehicle&vehicleType=motorcycle", "hasPage": False},
    {"slug": "boat", "category": "personal", "route": "/get-a-quote?type=vehicle&vehicleType=boat", "hasPage": False},
    {"slug": "travel-insurance", "category": "personal", "route": "/get-a-quote?type=travel", "hasPage": False},
    {"slug": "commercial-insurance", "category": "commercial", "route": "/commercial-insurance/", "hasPage": True},
    {"slug": "commercial-auto-insurance", "category": "commercial", "route": "/commercial-auto-insurance/", "hasPage": True},
    {"slug": "trucking-insurance", "category": "commercial", "route": "/trucking-insurance/", "hasPage": True},
    {"slug": "contractors-insurance", "category": "commercial", "route": "/contractors-insurance/", "hasPage": True},
    {"slug": "builders-developers-insurance", "category": "commercial", "route": "/builders-developers-insurance/", "hasPage": True},
    {"slug": "manufacturing-insurance", "category": "commercial", "route": "/manufacturing-insurance/", "hasPage": True},
    {"slug": "commercial-property-insurance", "category": "commercial", "route": "/commercial-property-insurance/", "hasPage": True},
    {"slug": "restaurant-insurance", "category": "commercial", "route": "/restaurant-insurance/", "hasPage": True},
    {"slug": "food-truck-insurance", "category": "commercial", "route": "/food-truck-insurance/", "hasPage": True},
    {"slug": "retail-insurance", "category": "commercial", "route": "/retail-insurance/", "hasPage": True},
    {"slug": "professional-offices-insurance", "category": "commercial", "route": "/professional-offices-insurance/", "hasPage": True},
    {"slug": "real-estate-insurance", "category": "commercial", "route": "/real-estate-insurance/", "hasPage": True},
    {"slug": "farm-insurance", "category": "commercial", "route": "/farm-insurance/", "hasPage": True},
    {"slug": "dump-truck-insurance", "category": "commercial", "route": "/dump-truck-insurance/", "hasPage": True},
    {"slug": "bonding-insurance", "category": "commercial", "route": "/bonding-insurance/", "hasPage": True},
    {"slug": "greenhouse", "category": "commercial", "route": "/get-a-quote?type=business&industry=greenhouse", "hasPage": False},
    {"slug": "about", "category": "special", "route": "/about/", "hasPage": True, "temporary": True},
    {"slug": "team", "category": "special", "route": "/team/", "hasPage": True, "temporary": True},
    {"slug": "contact", "category": "special", "route": "/contact/", "hasPage": True},
]


def optimize_webp(src: Path, dest: Path, max_width: int = 1920) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as img:
        img = img.convert("RGB")
        if img.width > max_width:
            ratio = max_width / img.width
            img = img.resize((max_width, int(img.height * ratio)), Image.Resampling.LANCZOS)
        img.save(dest, "WEBP", quality=85, method=6)


def main() -> None:
    inbox_files = {p.name for p in INBOX.iterdir() if p.is_file()}
    assigned_files = {a["originalFile"] for a in ASSIGNMENTS}

    extras = sorted(inbox_files - assigned_files)
    mapping_records = []

    for item in ASSIGNMENTS:
        src = INBOX / item["originalFile"]
        if not src.exists():
            raise FileNotFoundError(f"Missing inbox file: {item['originalFile']}")

        category = item["targetFolder"]
        source_dest = SOURCE_ROOT / category / item["targetFilename"]
        source_dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, source_dest)

        webp_name = item["targetFilename"].replace(".png", ".webp")
        public_dest = PUBLIC_ROOT / category / webp_name
        optimize_webp(source_dest, public_dest)

        record = {**item, "productionPath": f"/images/photography/{category}/{webp_name}"}
        mapping_records.append(record)

    manifest = {
        "version": 1,
        "description": "Website photography manifest — expected placements and routes",
        "placements": MANIFEST_PLACEMENTS,
    }

    completeness = {
        "matched": [a["matchedPlacement"] for a in ASSIGNMENTS],
        "missing": [
            p["slug"]
            for p in MANIFEST_PLACEMENTS
            if p["slug"] not in {a["matchedPlacement"] for a in ASSIGNMENTS}
        ],
        "extra": extras,
        "duplicatePlacements": [],
        "ambiguous": [],
    }

    for extra in extras:
        completeness["ambiguous"].append(
            {
                "originalFile": extra,
                "confidence": "LOW",
                "reason": "Not assigned after global one-to-one resolution — likely duplicate or alternate angle",
            }
        )

    SOURCE_ROOT.mkdir(parents=True, exist_ok=True)
    (SOURCE_ROOT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    (SOURCE_ROOT / "image-mapping.json").write_text(
        json.dumps({"assignments": mapping_records, "completeness": completeness}, indent=2)
        + "\n"
    )

    print(json.dumps({"assigned": len(mapping_records), "extra": len(extras)}, indent=2))


if __name__ == "__main__":
    main()
