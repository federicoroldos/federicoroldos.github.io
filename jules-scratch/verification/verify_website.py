import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path to the HTML file
        html_file_path = os.path.abspath('index.html')

        # Go to the local HTML file
        await page.goto(f'file://{html_file_path}')

        # Wait for the animations to finish
        await page.wait_for_timeout(1000)

        # Take a screenshot of the Spanish version
        await page.screenshot(path='jules-scratch/verification/screenshot-es-logo.png', full_page=True)

        # Click the English button
        await page.click('#lang-en')

        # Wait for the content to update
        await page.wait_for_timeout(1000)

        # Take a screenshot of the English version
        await page.screenshot(path='jules-scratch/verification/screenshot-en-logo.png', full_page=True)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
