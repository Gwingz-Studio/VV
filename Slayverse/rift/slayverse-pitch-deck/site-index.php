<?php require_once __DIR__ . '/includes/config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= $SITE['title'] ?> — Pitch Deck</title>
    <link rel="stylesheet" href="vendor/fonts.css">
    <link rel="stylesheet" href="vendor/bootstrap.min.css">
    <link rel="stylesheet" href="css/site-index.css">
</head>
<body>
    <div class="container d-flex flex-column align-items-center min-vh-100 py-5">
        <h1 class="mb-1"><?= $SITE['title'] ?></h1>
        <p class="tagline mb-5">Pitch Deck — Director Variants</p>

        <div class="row g-4 mb-4" style="max-width: 1000px;">
            <?php foreach ($DIRECTORS as $key => $dir): ?>
            <div class="col-md-4">
                <div class="deck-card">
                    <img src="<?= $dir['path'] ?>/cover.png" alt="<?= $dir['label'] ?>">
                    <div class="card-overlay">
                        <div class="card-title"><?= $dir['label'] ?></div>
                        <div class="card-sub"><?= $dir['vibe'] ?></div>
                    </div>
                    <a href="deck.php?v=<?= $key ?>"></a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

        <div class="d-flex gap-3 mt-3">
            <a href="contact-sheet.php" class="btn btn-outline-secondary btn-slayverse">Contact Sheet</a>
            <a href="IMAGE_BRIEF.md" class="btn btn-outline-secondary btn-slayverse">Image Brief</a>
        </div>

        <p class="footer mt-5"><?= $SITE['legal'] ?></p>
    </div>
    <script src="vendor/bootstrap.bundle.min.js"></script>
</body>
</html>
