<?php require_once __DIR__ . '/includes/config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= $SITE['title'] ?> — Contact Sheet</title>
    <link rel="stylesheet" href="vendor/fonts.css">
    <link rel="stylesheet" href="vendor/bootstrap.min.css">
    <link rel="stylesheet" href="css/contact-sheet.css">
</head>
<body>
    <div class="container-fluid py-4">
        <h1><?= $SITE['title'] ?> — Contact Sheet</h1>
        <p class="text-muted mb-3"><?= count($SLIDES) * count($DIRECTORS) ?> images across <?= count($DIRECTORS) ?> director variants. Click to enlarge.</p>

        <div class="d-flex gap-2 mb-4 flex-wrap">
            <a href="site-index.php" class="btn btn-outline-secondary btn-sv">&larr; Index</a>
            <?php foreach ($DIRECTORS as $key => $dir): ?>
            <a href="deck.php?v=<?= $key ?>" class="btn btn-outline-secondary btn-sv"><?= $dir['label'] ?></a>
            <?php endforeach; ?>
        </div>

        <?php foreach ($SLIDES as $i => $slide): ?>
        <div class="mb-4 pb-3 border-bottom border-dark">
            <h5 class="text-uppercase" style="color: #c4944a; font-size: 0.85em; letter-spacing: 0.1em;"><?= ($i + 1) ?>. <?= $slide['label'] ?></h5>
            <div class="row g-2">
                <?php foreach ($DIRECTORS as $key => $dir): ?>
                <div class="col">
                    <div class="image-cell">
                        <img src="<?= $dir['path'] ?>/<?= $slide['file'] ?>" alt="<?= $dir['label'] ?> — <?= $slide['label'] ?>" loading="lazy" onclick="document.getElementById('lb-img').src=this.src; document.getElementById('lightbox').classList.add('active');">
                        <div class="label"><?= $dir['label'] ?></div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endforeach; ?>
    </div>

    <div class="lightbox" id="lightbox" onclick="this.classList.remove('active')">
        <img id="lb-img" src="" alt="">
    </div>
    <script src="vendor/bootstrap.bundle.min.js"></script>
</body>
</html>
