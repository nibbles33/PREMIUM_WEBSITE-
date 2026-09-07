#!/usr/bin/env python3
"""
Validate Contractors Tools state PNG alignment vs General (fence/platform bounds).
Fails if Tools scene framing deviates beyond tolerance.
"""
from PIL import Image
import json
import os
import sys

IMAGE_DIR = os.path.join(os.path.dirname(__file__), "../public/images")
REF = "contractors-insurance-state-liability.png"
TOOLS = "contractors-insurance-state-tools-equipment.png"
# Tolerances from manual/visual + fence-scan investigation
MAX_LEFT_DRIFT_PX = 4
MAX_RIGHT_MARGIN_LOSS_PX = 20


def fence_bounds(path, lum_thresh=205):
    arr = __import__("numpy").array(Image.open(path).convert("L"))
    h, w = arr.shape
    lefts, rights = [], []
    for y in range(int(h * 0.72), int(h * 0.88)):
        row = arr[y]
        xs = __import__("numpy").where(row < lum_thresh)[0]
        if len(xs) > w * 0.15:
            lefts.append(int(xs[0]))
            rights.append(int(xs[-1]))
    if not lefts:
        return None
    import numpy as np

    left = int(np.median(lefts))
    right = int(np.median(rights))
    return {
        "left": left,
        "right": right,
        "marginL": left,
        "marginR": w - right - 1,
        "width": right - left,
    }


def main():
    ref_path = os.path.join(IMAGE_DIR, REF)
    tools_path = os.path.join(IMAGE_DIR, TOOLS)
    ref = fence_bounds(ref_path)
    tools = fence_bounds(tools_path)

    print("=== Contractors Tools alignment validation ===\n")
    if not ref or not tools:
        print("ERROR: Could not detect fence bounds")
        sys.exit(2)

    d_left = tools["left"] - ref["left"]
    d_margin_r = tools["marginR"] - ref["marginR"]

    print(f"Reference (General): marginL={ref['marginL']} marginR={ref['marginR']} width={ref['width']}")
    print(f"Tools:               marginL={tools['marginL']} marginR={tools['marginR']} width={tools['width']}")
    print(f"Delta:               dLeft={d_left:+d}px  dMarginR={d_margin_r:+d}px\n")

    left_fail = d_left < -MAX_LEFT_DRIFT_PX
    right_fail = d_margin_r < -MAX_RIGHT_MARGIN_LOSS_PX
    ok = not left_fail and not right_fail

    result = {
        "reference": ref,
        "tools": tools,
        "delta": {"left": d_left, "marginR": d_margin_r},
        "thresholds": {
            "maxLeftDriftPx": MAX_LEFT_DRIFT_PX,
            "maxRightMarginLossPx": MAX_RIGHT_MARGIN_LOSS_PX,
        },
        "ok": ok,
    }

    out_dir = os.path.join(
        os.path.dirname(__file__), "../docs/qa-screenshots/contractors-centering-fix"
    )
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "alignment-validation.json"), "w") as f:
        json.dump(result, f, indent=2)

    if ok:
        print("PASS — Tools framing matches General within tolerance.")
        return

    print("FAIL — SOURCE IMAGE PROBLEM")
    print("  contractors-insurance-state-tools-equipment.png is misaligned vs General.")
    print("  Regenerate Tools state PNG with identical locked camera/crop as state-liability.png.")
    sys.exit(1)


if __name__ == "__main__":
    main()
