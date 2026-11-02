"""
SLAYVERSE Pitch Deck — Image Generation via Replicate API
==========================================================
Run: python generate_images.py

Requires:
  - REPLICATE_API_TOKEN env var set

Uses the Replicate HTTP API directly (avoids SDK version format issues).
Generates all 12 images for the pitch deck into ./images/
"""

import urllib.request
import urllib.error
import json
import os
import sys
import time

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")
API_TOKEN = os.environ.get("REPLICATE_API_TOKEN", "")
MODEL_OWNER = "black-forest-labs"
MODEL_NAME = "flux-1.1-pro"

IMAGES = [
    {
        "filename": "cover.png",
        "prompt": (
            "Cinematic ultra-wide shot of a lone cowboy figure seen from behind, "
            "standing at a barbed wire fence on a vast Wyoming prairie at twilight. "
            "The sky is fractured with hairline cracks of impossible crystalline light "
            "bleeding through, like reality itself is damaged. Dust particles suspended "
            "in golden hour light. Roger Deakins cinematography. Desaturated earth tones "
            "contaminated by cold blue-violet fracture light. Massive negative space in "
            "upper third for title placement. Photorealistic, film grain, anamorphic lens "
            "flare. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "world-wyoming.png",
        "prompt": (
            "Aerial cinematic shot of a desolate ranch in the Powder River Basin, Wyoming. "
            "The land is cracked and dry. In the south pasture, a subtle geometric pattern "
            "is visible in the grass, a spiral sigil burned into the earth, glowing faintly "
            "with amber light from underground. Drone photography perspective, magic hour "
            "lighting. The ranch buildings are small against the enormous landscape. Terrence "
            "Malick visual style. Film grain, photorealistic. Composition with negative space "
            "on the left for text. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "character-jake.png",
        "prompt": (
            "Cinematic medium close-up portrait of a weathered cowboy in his 40s, face "
            "half-lit by dying golden light, half in deep shadow. Dust on his hat brim. "
            "Expression is closed, guarded, carrying weight he will not name. Background "
            "is out-of-focus prairie at dusk. Roger Deakins single-source lighting. The "
            "quality of a still from a Coen Brothers film. Photorealistic, film grain, "
            "shallow depth of field. Negative space on the right for text overlay. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "character-weaver.png",
        "prompt": (
            "Cinematic portrait of a mysterious figure in dark precise clothing standing "
            "in a Wyoming kitchen at 3AM. Single overhead light casting dramatic shadows. "
            "The figure is unnervingly still, looking at something the viewer cannot see. "
            "The composition suggests someone who does not belong to this century. David "
            "Lynch unsettling beauty. Cold blue ambient light mixing with warm tungsten. "
            "Photorealistic, film grain. Negative space on the left. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "character-pop.png",
        "prompt": (
            "Cinematic close-up of elderly weathered hands cradling a translucent crystal "
            "that pulses with faint internal light, like a heartbeat made visible. The hands "
            "are gnarled, trembling. Background is a dark porch at night. The crystal casts "
            "prismatic light across the old mans fingers. Intimate, devastating. Emmanuel "
            "Lubezki natural light. Film grain, photorealistic. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "character-vuorse.png",
        "prompt": (
            "Cinematic portrait of a luminous figure in an otherworldly mirrored caftan, "
            "standing in a liminal space between a star field and a dusty western landscape. "
            "The figure radiates warmth and ancient knowledge. Prismatic light refracts "
            "around them like a halo made of broken timelines. The expression is warm, sly, "
            "and carrying centuries of exhaustion and love. High fashion meets cosmic oracle. "
            "Photorealistic, editorial photography quality. Film grain. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "braided-structure.png",
        "prompt": (
            "Split-screen cinematic composition. Left half: a lone cowboy at a fence in "
            "Wyoming, desaturated earth tones, dust and silence. Right half: a candlelit "
            "European castle interior with a figure in period dress performing a ritual "
            "with mirrors, warm gold and crimson tones. A single luminous thread of light "
            "connects the two halves, running through the center seam. The thread is thin, "
            "golden, and unmistakable. Photorealistic, film grain. Wes Anderson symmetry "
            "meets Terrence Malick naturalism. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "tone-mood.png",
        "prompt": (
            "Cinematic wide shot of a Wyoming landscape at the precise moment between day "
            "and night. The sky is impossible, half golden prairie sunset, half deep cosmic "
            "void with faint crystalline fracture lines visible like scars in the atmosphere. "
            "A single fence line cuts across the frame. Dust suspended in the transitional "
            "light. The image should feel like the exact boundary between the natural and "
            "the supernatural. Gregory Crewdson meets Roger Deakins. Photorealistic, film "
            "grain, anamorphic. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "pilot-scene.png",
        "prompt": (
            "Cinematic night scene on a ranch porch. An old man in a rocking chair holds a "
            "faintly glowing crystal, singing to it. Ten feet away, a younger man stands with "
            "his back turned, hands gripping a fence post, refusing to look. The only light "
            "comes from the crystal and a bare porch bulb. Moths circle the bulb. The "
            "emotional distance between the two figures is the entire frame. Intimate, "
            "devastating, Andrew Wyeth meets Cormac McCarthy. Photorealistic, film grain. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "season-arc.png",
        "prompt": (
            "Abstract cinematic image of a crack in the earth seen from ground level, with "
            "faint light bleeding upward from the fissure. The crack runs from foreground to "
            "deep background across a dry prairie landscape. Wildflowers grow along its edges "
            "despite the arid ground. The light from within is warm amber shifting to cold "
            "blue-violet. It feels like the land is remembering something. Photorealistic, "
            "macro lens perspective transitioning to landscape. Film grain. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "comp-titles.png",
        "prompt": (
            "Cinematic diptych composition. A man alone in a room lit by a single dangling "
            "bulb, dissolving into a vast cosmic nebula in deep violet and gold. The "
            "transition is seamless, the room light becomes a star. The image captures "
            "intimate human drama and cosmic scale as the same thing. Photorealistic, "
            "film grain. 8K."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "filename": "leave-behind.png",
        "prompt": (
            "Minimal cinematic image of a single fence post in a Wyoming field at dawn. "
            "First light catching barbed wire. A faint spiral sigil is carved into the wood "
            "of the post, barely visible. Extreme simplicity. Negative space everywhere. "
            "The image should feel like the last frame of a pilot episode. Photorealistic, "
            "film grain, soft focus. 8K."
        ),
        "aspect_ratio": "16:9",
    },
]


def api_request(method, url, data=None):
    """Make a Replicate API request."""
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Authorization": f"Bearer {API_TOKEN}",
            "Content-Type": "application/json",
        },
        method=method,
    )
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())


def get_latest_version():
    """Get the latest version of the model."""
    data = api_request("GET", f"https://api.replicate.com/v1/models/{MODEL_OWNER}/{MODEL_NAME}")
    return data.get("latest_version", {}).get("id")


def create_prediction(prompt, aspect_ratio="16:9"):
    """Create a prediction and wait for it to complete."""
    data = api_request(
        "POST",
        "https://api.replicate.com/v1/predictions",
        {
            "model": f"{MODEL_OWNER}/{MODEL_NAME}",
            "input": {
                "prompt": prompt,
                "aspect_ratio": aspect_ratio,
                "output_format": "png",
                "safety_tolerance": 3,
            },
        },
    )

    prediction_url = data["urls"]["get"]
    prediction_id = data["id"]

    # Poll until complete
    while True:
        result = api_request("GET", prediction_url)
        status = result["status"]

        if status == "succeeded":
            output = result["output"]
            if isinstance(output, list):
                return output[0]
            return str(output)
        elif status in ("failed", "canceled"):
            error = result.get("error", "Unknown error")
            raise Exception(f"Prediction {prediction_id} {status}: {error}")

        time.sleep(2)


def generate_image(spec):
    """Generate a single image via Replicate HTTP API and save to disk."""
    filepath = os.path.join(OUTPUT_DIR, spec["filename"])

    if os.path.exists(filepath):
        print(f"  SKIP (exists): {spec['filename']}")
        return "skip"

    print(f"  Generating: {spec['filename']}...")
    try:
        url = create_prediction(spec["prompt"], spec.get("aspect_ratio", "16:9"))
        urllib.request.urlretrieve(url, filepath)
        size_kb = os.path.getsize(filepath) // 1024
        print(f"  SAVED: {spec['filename']} ({size_kb} KB)")
        return "ok"
    except Exception as e:
        print(f"  ERROR: {spec['filename']} -- {e}")
        return "fail"


def main():
    if not API_TOKEN:
        print("ERROR: REPLICATE_API_TOKEN env var not set.")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"\nSLAYVERSE Pitch Deck -- Image Generation")
    print(f"Model: {MODEL_OWNER}/{MODEL_NAME}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Images: {len(IMAGES)}\n")

    results = {"ok": 0, "skip": 0, "fail": 0}

    for i, spec in enumerate(IMAGES, 1):
        print(f"[{i}/{len(IMAGES)}]")
        status = generate_image(spec)
        results[status] += 1
        # Brief pause between API calls
        if status == "ok" and i < len(IMAGES):
            time.sleep(1)

    print(f"\nDone. Generated: {results['ok']}  Skipped: {results['skip']}  Failed: {results['fail']}")

    if results["fail"] > 0:
        print("\nSome images failed. Re-run the script to retry (existing images are skipped).")
        sys.exit(1)
    else:
        print("\nAll images ready. Open index.html to view the deck.")


if __name__ == "__main__":
    main()
