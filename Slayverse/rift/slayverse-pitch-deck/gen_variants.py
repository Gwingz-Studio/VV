"""Generate director variant images for Slayverse pitch deck."""
import replicate, urllib.request, os, sys, time

os.environ['REPLICATE_API_TOKEN'] = 'r8_4WBpE2nBZv3d0keiGQIEyxrroSLW7db4NXeAD'

PROMPTS = [
    ("cover.png", "Cinematic ultra-wide shot of a lone cowboy figure seen from behind, standing at a barbed wire fence on a vast Wyoming prairie at twilight. The sky is fractured with hairline cracks of impossible crystalline light bleeding through, like reality itself is damaged. Dust particles suspended in golden hour light. Roger Deakins cinematography. Desaturated earth tones contaminated by cold blue-violet fracture light. Massive negative space in upper third for title placement. Photorealistic, film grain, anamorphic lens flare. 8K."),
    ("world-wyoming.png", "Aerial cinematic shot of a desolate ranch in the Powder River Basin, Wyoming. The land is cracked and dry. In the south pasture, a subtle geometric pattern is visible in the grass, a spiral sigil burned into the earth, glowing faintly with amber light from underground. Drone photography perspective, magic hour lighting. The ranch buildings are small against the enormous landscape. Terrence Malick visual style. Film grain, photorealistic. Composition with negative space on the left for text. 8K."),
    ("character-jake.png", "Cinematic medium close-up portrait of a weathered cowboy in his 40s, face half-lit by dying golden light, half in deep shadow. Dust on his hat brim. Expression is closed, guarded, carrying weight he will not name. Background is out-of-focus prairie at dusk. Roger Deakins single-source lighting. The quality of a still from a Coen Brothers film. Photorealistic, film grain, shallow depth of field. Negative space on the right for text overlay. 8K."),
    ("character-weaver.png", "Cinematic portrait of a mysterious figure in dark precise clothing standing in a Wyoming kitchen at 3AM. Single overhead light casting dramatic shadows. The figure is unnervingly still, looking at something the viewer cannot see. The composition suggests someone who does not belong to this century. David Lynch unsettling beauty. Cold blue ambient light mixing with warm tungsten. Photorealistic, film grain. Negative space on the left. 8K."),
    ("character-pop.png", "Cinematic close-up of elderly weathered hands cradling a translucent crystal that pulses with faint internal light, like a heartbeat made visible. The hands are gnarled, trembling. Background is a dark porch at night. The crystal casts prismatic light across the old mans fingers. Intimate, devastating. Emmanuel Lubezki natural light. Film grain, photorealistic. 8K."),
    ("character-vuorse.png", "Cinematic portrait of a luminous figure in an otherworldly mirrored caftan, standing in a liminal space between a star field and a dusty western landscape. The figure radiates warmth and ancient knowledge. Prismatic light refracts around them like a halo made of broken timelines. The expression is warm, sly, and carrying centuries of exhaustion and love. High fashion meets cosmic oracle. Photorealistic, editorial photography quality. Film grain. 8K."),
    ("braided-structure.png", "Split-screen cinematic composition. Left half: a lone cowboy at a fence in Wyoming, desaturated earth tones, dust and silence. Right half: a candlelit European castle interior with a figure in period dress performing a ritual with mirrors, warm gold and crimson tones. A single luminous thread of light connects the two halves, running through the center seam. The thread is thin, golden, and unmistakable. Photorealistic, film grain. Wes Anderson symmetry meets Terrence Malick naturalism. 8K."),
    ("tone-mood.png", "Cinematic wide shot of a Wyoming landscape at the precise moment between day and night. The sky is impossible, half golden prairie sunset, half deep cosmic void with faint crystalline fracture lines visible like scars in the atmosphere. A single fence line cuts across the frame. Dust suspended in the transitional light. Gregory Crewdson meets Roger Deakins. Photorealistic, film grain, anamorphic. 8K."),
    ("pilot-scene.png", "Cinematic night scene on a ranch porch. An old man in a rocking chair holds a faintly glowing crystal, singing to it. Ten feet away, a younger man stands with his back turned, hands gripping a fence post, refusing to look. The only light comes from the crystal and a bare porch bulb. Moths circle the bulb. The emotional distance between the two figures is the entire frame. Andrew Wyeth meets Cormac McCarthy. Photorealistic, film grain. 8K."),
    ("season-arc.png", "Abstract cinematic image of a crack in the earth seen from ground level, with faint light bleeding upward from the fissure. The crack runs from foreground to deep background across a dry prairie landscape. Wildflowers grow along its edges despite the arid ground. The light from within is warm amber shifting to cold blue-violet. Photorealistic, macro lens perspective transitioning to landscape. Film grain. 8K."),
    ("world-lattice.png", "Cinematic close-up of cracked dry earth with seven hairline fractures radiating from a central point, each fracture glowing with a different color of light bleeding up from beneath the surface. One fracture glows brightest amber-gold, the others sealed with dark crystalline residue. Extreme macro photography transitioning to landscape. Emmanuel Lubezki natural light. Film grain, photorealistic. 8K."),
    ("comp-titles.png", "Cinematic diptych composition. A man alone in a room lit by a single dangling bulb, dissolving into a vast cosmic nebula in deep violet and gold. The transition is seamless, the room light becomes a star. The image captures intimate human drama and cosmic scale as the same thing. Photorealistic, film grain. 8K."),
    ("roadmap-schloss.png", "Cinematic wide shot of a crumbling European castle estate at dusk, reflected in a still lake where black swans drift. The castle windows glow with warm amber light from within. One wing is partially destroyed, frozen mid-collapse. Mist rises from the water. Vittorio Storaro lighting. Film grain, photorealistic. 8K."),
    ("writers-room.png", "Cinematic shot of five empty chairs arranged in a rough circle in a dark room, each chair lit by a different quality of light: warm tungsten, cold blue, amber, violet, and a single bare bulb. Papers scattered on the floor. Coffee cups. The chairs suggest an argument that just ended. Theatrical staging meets documentary realism. Film grain, photorealistic. 8K."),
    ("emotional-spine.png", "Cinematic wide shot of a woman in a white prairie dress standing alone in a vast Wyoming grassland at golden hour, seen from far away, almost a silhouette. Wind moves through the tall grass around her. She faces away from the camera toward a horizon where the sky shows the faintest hairline fracture of light. Terrence Malick meets Andrew Wyeth. Film grain, photorealistic, anamorphic. 8K."),
    ("leave-behind.png", "Minimal cinematic image of a single fence post in a Wyoming field at dawn. First light catching barbed wire. A faint spiral sigil is carved into the wood of the post, barely visible. Extreme simplicity. Negative space everywhere. Photorealistic, film grain, soft focus. 8K."),
]

DIRECTORS = {
    "john-waters": " As directed by John Waters.",
    "almodovar": " As directed by Pedro Almodovar.",
    "tarantino": " As directed by Quentin Tarantino.",
    "romero": " As directed by George Romero.",
}

# Allow running a single director: python gen_variants.py john-waters
target = sys.argv[1] if len(sys.argv) > 1 else None

for director, suffix in DIRECTORS.items():
    if target and director != target:
        continue

    outdir = os.path.join("images", director)
    os.makedirs(outdir, exist_ok=True)
    print(f"\n{'='*50}")
    print(f"  {director.upper()}")
    print(f"{'='*50}")

    for i, (fname, prompt) in enumerate(PROMPTS, 1):
        path = os.path.join(outdir, fname)
        if os.path.exists(path):
            print(f"  [{i}/{len(PROMPTS)}] SKIP: {fname}")
            continue
        print(f"  [{i}/{len(PROMPTS)}] {fname}...")
        try:
            output = replicate.run(
                "black-forest-labs/flux-1.1-pro",
                input={
                    "prompt": prompt + suffix,
                    "aspect_ratio": "16:9",
                    "output_format": "png",
                    "safety_tolerance": 3,
                },
            )
            urllib.request.urlretrieve(str(output), path)
            print(f"           OK ({os.path.getsize(path) // 1024} KB)")
            time.sleep(1)
        except Exception as e:
            print(f"           ERROR: {e}")
            time.sleep(8)

    count = len([f for f in os.listdir(outdir) if f.endswith(".png")])
    print(f"  {director}: {count}/{len(PROMPTS)} images\n")
