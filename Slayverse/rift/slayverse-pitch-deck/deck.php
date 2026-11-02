<?php
/**
 * SLAYVERSE Pitch Deck — Dynamic Director Variant
 * Usage: deck.php?v=tarantino | deck.php?v=john-waters | deck.php (defaults to original)
 */
require_once __DIR__ . '/includes/config.php';

$variant = $_GET['v'] ?? 'original';
if (!isset($DIRECTORS[$variant])) { $variant = 'original'; }

$dir = $DIRECTORS[$variant];
$img = $dir['path'];
$label = $dir['label'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $SITE['title'] ?> [<?= $label ?>] — Pitch Deck</title>
    <link rel="stylesheet" href="vendor/fonts.css">
    <link rel="stylesheet" href="vendor/bootstrap.min.css">
    <link rel="stylesheet" href="vendor/reveal.css">
    <link rel="stylesheet" href="vendor/black.css">
    <link rel="stylesheet" href="css/slayverse.css">
</head>
<body>
    <!-- Director Switcher — live swap between variants -->
    <nav class="variant-switcher">
        <a href="site-index.php" title="Back to index">&larr;</a>
        <?php foreach ($DIRECTORS as $key => $d): ?>
        <a href="?v=<?= $key ?>" class="<?= $key === $variant ? 'active' : '' ?>"><?= $d['label'] ?></a>
        <?php endforeach; ?>
    </nav>

    <div class="reveal">
        <div class="slides">

            <section class="cover-slide" data-background-image="<?= $img ?>/cover.png" data-background-size="cover" data-background-position="center 30%">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content cover-content" style="max-width: 38%;">
                    <h1><?= $SITE['title'] ?></h1>
                    <p class="logline" style="margin-top: 10px;">A reclusive Wyoming rancher discovers his dying land conceals the last wound in fractured spacetime.</p>
                    <p class="meta">Created by <?= $SITE['creator'] ?> <span>|</span> <?= $SITE['genre'] ?></p>
                </div>
            </section>

            <section data-background-image="<?= $img ?>/world-wyoming.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 38%;"><p class="pull-quote" style="font-size: 1.2em;">"Not space cowboys. A cowboy on Earth — except Earth is wrong."</p><p class="logline" style="margin-top: 8px; font-size: 0.82em;">A ranch in the Powder River Basin. A man who measures his life in fence posts. Something catastrophically wrong under the land.</p></div>
            </section>

            <section data-background-image="<?= $img ?>/tone-mood.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 36%;"><p class="pull-quote amber" style="font-size: 1.1em;">"Shit's weird, man. It's kind of fucked up around here. But here's Carl Jung in drag doing a death drop in 1940s Berlin."</p><p class="pull-quote small" style="margin-top: 10px; font-size: 0.82em;">Post-truth is not merely a political condition. It is an ontological one.</p></div>
            </section>

            <section data-background-image="<?= $img ?>/comp-titles.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 35%;"><h2 style="font-size: 1.3em;">Comparable Titles</h2><div class="comp-grid"><div class="comp-item"><div class="comp-title">True Detective S1</div><div class="comp-desc">Regional mystery, hidden cosmic order</div></div><div class="comp-item"><div class="comp-title">Midnight Mass</div><div class="comp-desc">Inherited dread, sacred and profane</div></div><div class="comp-item"><div class="comp-title">The OA</div><div class="comp-desc">Earned mythology, body as instrument</div></div><div class="comp-item"><div class="comp-title">Deadwood</div><div class="comp-desc">Language as violence and philosophy</div></div><div class="comp-item"><div class="comp-title">Yellowstone</div><div class="comp-desc">Land, legacy, audience bridge</div></div><div class="comp-item"><div class="comp-title">Interstellar</div><div class="comp-desc">The personal is the cosmic</div></div></div></div>
            </section>

            <section data-background-image="<?= $img ?>/world-lattice.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 34%;"><h2 style="font-size: 1.4em;">The Federstahl Lattice</h2><p class="pull-quote small" style="margin-top: 6px; font-size: 0.82em;">A catastrophic experiment fractured spacetime into seven wounds.</p><p class="pull-quote small" style="font-size: 0.82em;">Six sealed. One remains: <span class="amber">Wyoming.</span></p><p class="pull-quote small" style="font-size: 0.82em;">Not bloodline — soul-line. Not DNA — vibration.</p></div>
            </section>

            <section data-background-image="<?= $img ?>/braided-structure.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 45%;"><h2 style="font-size: 1.4em;">Two Timelines. One Frequency.</h2><div class="braided-columns"><div class="braided-col"><div class="col-label">A-Story: Wyoming.</div><p>Silence as inheritance.</p></div><div class="braided-col"><div class="col-label">B-Story: The Past.</div><p>Each life solving what the present cannot face.</p></div></div><p class="key-line" style="margin-top: 8px; font-size: 0.82em;">"The past does not explain the present — it emotionally resolves it."</p></div>
            </section>

            <section data-background-image="<?= $img ?>/character-jake.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 35%;"><div class="char-name" style="font-size: 2em;">Jake McCullen</div><div class="char-title">The Dust-Born</div><p class="char-desc">Silence as survival strategy — now discovering silence is the thing that will kill him.</p><p class="key-line">"I keep the fence. That's what I do."</p></div>
            </section>

            <section data-background-image="<?= $img ?>/character-weaver.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 35%;"><div class="char-name" style="font-size: 2em;">The Weaver</div><div class="char-title">The Architect</div><p class="char-desc">Part prophet. Part provocateur. Part uninvited therapist.</p><p class="key-line">"You are not a descendant. You are the loom."</p></div>
            </section>

            <section data-background-color="#0d0d0d">
                <div class="slide-content" style="padding: 0; max-width: 100%;"><div class="split-chars"><div class="split-char-panel"><div class="panel-bg" style="background-image: url('<?= $img ?>/character-pop.png');"></div><div class="panel-content"><div class="char-name" style="font-size: 1.8em;">Pop</div><div class="char-title">The Last of the Veincallers</div><p class="char-desc" style="font-size: 0.78em;">He loved his grandson so much he chose madness over honesty.</p><p class="key-line" style="font-size: 0.82em;">"He sang. Low and broken."</p></div></div><div class="split-char-panel"><div class="panel-bg" style="background-image: url('<?= $img ?>/character-vuorse.png');"></div><div class="panel-content"><div class="char-name" style="font-size: 1.8em;">VUORSE</div><div class="char-title">First of the New Thread</div><p class="char-desc" style="font-size: 0.78em;">The narrator who is also a character who is also a cosmological event.</p><p class="key-line" style="font-size: 0.82em;">"Some of them are just gatekeepers with six-shooters."</p></div></div></div></div>
            </section>

            <section data-background-image="<?= $img ?>/pilot-scene.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 35%;"><h2 style="font-size: 1.3em;">Pilot: Wind Over Dry Grass</h2><ul class="beat-list"><li>Wind over dry grass. A ranch that should have been sold.</li><li>A brand that shifts in certain light.</li><li>A stranger who knows too much.</li><li>Twelve missing minutes.</li><li>"You are not its owner. You are its dressing."</li></ul></div>
            </section>

            <section data-background-image="<?= $img ?>/season-arc.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 35%;"><h2 style="font-size: 1.4em;">Season One: The Wound</h2><ul class="phase-list"><li><span class="phase-label">Denial</span><span class="phase-desc">Jake treats the fissure as geological.</span></li><li><span class="phase-label">Confrontation</span><span class="phase-desc">"You don't get to talk about my mother."</span></li><li><span class="phase-label">Revelation</span><span class="phase-desc">Her death was cosmological, not medical.</span></li><li><span class="phase-label">Grief Spoken</span><span class="phase-desc">He says her name.</span></li></ul></div>
            </section>

            <section data-background-image="<?= $img ?>/roadmap-schloss.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 35%;"><h2 style="font-size: 1.4em;">Season Roadmap</h2><div class="season-stack"><div class="season-item"><div class="season-label">S1: The Wound</div><div class="season-desc">Wyoming. Local mystery. Temporal horror.</div></div><div class="season-item"><div class="season-label">S2: The Institute</div><div class="season-desc">Federstahl. Vorst. Global expansion.</div></div><div class="season-item"><div class="season-label">S3+: The Recursion</div><div class="season-desc">Full soul-line. Deep time. Cosmic convergence.</div></div></div><p class="escalation">intimate &rarr; historical &rarr; cosmic</p></div>
            </section>

            <section data-background-image="<?= $img ?>/writers-room.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 38%;"><h2 style="font-size: 1.2em;">From the Writers Room</h2><div class="quote-stack"><div class="q">"Destiny is a repetitive stress injury."</div><div class="q">"Glamour is not decoration. It is how dangerous things become survivable."</div><div class="q">"The drama is a man standing next to the answer to everything and choosing the fence."</div><div class="q">"That's what we protect."</div></div></div>
            </section>

            <section data-background-image="<?= $img ?>/emotional-spine.png" data-background-size="cover">
                <div class="slide-overlay bottom-strip"></div>
                <div class="slide-content" style="max-width: 40%;"><p style="font-family: 'Playfair Display', serif; font-weight: 900; font-size: 2em; line-height: 1.2; margin: 0;">Save the prairie mother, save the universe.</p><p style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.85em; color: rgba(245,240,232,0.5); margin-top: 10px;">This is not a quest. This is a prayer from someone who doesn't know they're praying.</p></div>
            </section>

            <section data-background-image="<?= $img ?>/leave-behind.png" data-background-size="cover">
                <div class="slide-overlay vignette-light"></div>
                <div class="leave-behind"><div class="title"><?= $SITE['title'] ?></div><div class="creator">Created by <?= $SITE['creator'] ?></div><div class="format"><?= $SITE['format'] ?></div><div class="legal"><?= $SITE['legal'] ?></div></div>
            </section>

        </div>
    </div>

    <script src="vendor/reveal.js"></script>
    <script src="vendor/bootstrap.bundle.min.js"></script>
    <script>
        Reveal.initialize({ hash: true, transition: 'fade', transitionSpeed: 'slow', backgroundTransition: 'fade', center: false, width: 1920, height: 1080, margin: 0, minScale: 0.2, maxScale: 2.0, controls: true, progress: true, slideNumber: false, overview: true, touch: true });
        Reveal.on('slidechanged', e => { const c = document.querySelector('.cover-content'); if (!c) return; if (e.currentSlide.classList.contains('cover-slide')) { c.querySelectorAll('h1, .logline, .meta').forEach(el => { el.style.animation = 'none'; el.offsetHeight; el.style.animation = ''; }); } });
    </script>
</body>
</html>
