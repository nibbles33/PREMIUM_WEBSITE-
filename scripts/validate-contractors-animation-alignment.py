#!/usr/bin/env python3
"""Compare composite-proof vs stacked assets and vs final state PNGs."""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public/images/premium-contractors-animation-assets"

SCENES = [
    {
        "id": "tools",
        "compositeProof": "contractors-tools-composite-proof.png",
        "cleanBg": "contractors-tools-clean-background.png",
        "objects": [
            "contractors-tools-worklight-transparent.png",
            "contractors-tools-toolbox-transparent.png",
            "contractors-tools-power-tools-transparent.png",
            "contractors-tools-saw-transparent.png",
            "contractors-tools-generator-transparent.png",
        ],
        "finalState": ROOT / "public/images/contractors-insurance-state-tools-equipment.png",
    },
    {
        "id": "builders",
        "compositeProof": "contractors-builders-composite-proof.png",
        "cleanBg": "contractors-builders-clean-background.png",
        "objects": [
            "contractors-builders-lumber-stack-1-transparent.png",
            "contractors-builders-lumber-stack-2-transparent.png",
            "contractors-builders-material-stack-transparent.png",
            "contractors-builders-wrapped-materials-transparent.png",
        ],
        "finalState": ROOT / "public/images/contractors-insurance-state-property.png",
    },
]


def composite_over(base: Image.Image, overlay: Image.Image) -> Image.Image:
    out = base.convert("RGBA").copy()
    layer = overlay.convert("RGBA")
    out.alpha_composite(layer)
    return out


def diff_metrics(a: Image.Image, b: Image.Image) -> dict:
    a_rgb = a.convert("RGB")
    b_rgb = b.convert("RGB")
    if a_rgb.size != b_rgb.size:
        raise ValueError(f"Size mismatch: {a_rgb.size} vs {b_rgb.size}")
    total = 0.0
    max_diff = 0.0
    pixels = a_rgb.width * a_rgb.height
    apx = a_rgb.load()
    bpx = b_rgb.load()
    for y in range(a_rgb.height):
        for x in range(a_rgb.width):
            ar, ag, ab = apx[x, y]
            br, bg, bb = bpx[x, y]
            d = (abs(ar - br) + abs(ag - bg) + abs(ab - bb)) / 3
            total += d
            max_diff = max(max_diff, d)
    mean = total / pixels
    return {"mean": round(mean, 3), "max": round(max_diff, 3), "pixels": pixels}


def assess(mean: float, max_diff: float) -> str:
    if mean < 2 and max_diff < 24:
        return "high"
    if mean < 6 and max_diff < 48:
        return "medium"
    return "low"


def main() -> None:
    results = {}
    for scene in SCENES:
        proof = Image.open(ASSETS / scene["compositeProof"])
        clean = Image.open(ASSETS / scene["cleanBg"])
        stacked = clean
        for obj in scene["objects"]:
            stacked = composite_over(stacked, Image.open(ASSETS / obj))
        final_state = Image.open(scene["finalState"])

        vs_proof = diff_metrics(stacked, proof)
        vs_final = diff_metrics(stacked, final_state)
        proof_vs_final = diff_metrics(proof, final_state)

        results[scene["id"]] = {
            "stackedVsCompositeProof": {
                **vs_proof,
                "confidence": assess(vs_proof["mean"], vs_proof["max"]),
            },
            "stackedVsFinalState": {
                **vs_final,
                "confidence": assess(vs_final["mean"], vs_final["max"]),
            },
            "compositeProofVsFinalState": {
                **proof_vs_final,
                "confidence": assess(proof_vs_final["mean"], proof_vs_final["max"]),
            },
        }

    out_path = (
        ROOT
        / "docs/qa-screenshots/contractors-motion-prototype/alignment-metrics.json"
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(results, indent=2) + "\n")
    print(json.dumps(results, indent=2))
    for scene_id, metrics in results.items():
        handoff = metrics["stackedVsFinalState"]
        print(
            f"{scene_id}: stacked→final confidence={handoff['confidence']} "
            f"(mean={handoff['mean']})"
        )


if __name__ == "__main__":
    main()
