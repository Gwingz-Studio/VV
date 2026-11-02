"""
SLAYVERSE Pitch Deck — PDF Export via Playwright
==================================================
Requires: pip install playwright && python -m playwright install chromium

Run: python export_pdf.py

Alternative methods if Playwright is not available:
  1. Open index.html?print-pdf in Chrome > Ctrl+P > Save as PDF (landscape, background graphics ON)
  2. npx decktape reveal index.html SLAYVERSE_PITCH_DECK.pdf --size 1920x1080
"""

import os
import sys
import time

DECK_DIR = os.path.dirname(os.path.abspath(__file__))
HTML_PATH = os.path.join(DECK_DIR, "index.html")
PDF_PATH = os.path.join(DECK_DIR, "SLAYVERSE_PITCH_DECK.pdf")


def export():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Playwright not installed.")
        print("Install: pip install playwright && python -m playwright install chromium")
        print()
        print("Manual alternatives:")
        print(f"  1. Open in Chrome: file:///{HTML_PATH.replace(os.sep, '/')}?print-pdf")
        print("     Then Ctrl+P > Save as PDF (landscape, background graphics ON)")
        print(f"  2. npx decktape reveal {HTML_PATH} {PDF_PATH} --size 1920x1080")
        sys.exit(1)

    print(f"Exporting: {PDF_PATH}")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto(f"file:///{HTML_PATH.replace(os.sep, '/')}?print-pdf")
        time.sleep(5)
        page.pdf(
            path=PDF_PATH,
            width="1920px",
            height="1080px",
            print_background=True,
            landscape=True,
        )
        browser.close()
    print("PDF exported successfully.")


if __name__ == "__main__":
    export()
