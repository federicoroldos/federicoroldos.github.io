# federicoroldos.github.io

My personal website and portfolio: who I am, my experience, projects, education, certifications and skills, plus a way to get in touch.

**Live:** https://federicoroldos.github.io/

## What's on it

- **Sections:** About, Experience, Projects, Education, Certifications, Skills and Contact.
- **English / Spanish** toggle, remembered between visits.
- **Dark / light theme**, also remembered.
- **Interactive terminal** section. Type `help` to see the commands (`whoami`, `ls`, `cat`, `open`, `theme`, and a few hidden ones).
- **3D spinning skills carousel**, with a plain grid fallback for browsers that can't render it.
- **Contact form** that sends straight to my inbox through [FormSubmit](https://formsubmit.co/), so no backend is needed.

## How it's built

Plain HTML, CSS and JavaScript, with no framework and no build step.

```
index.html   Page structure and all the text, in both languages (data-i18n-en / data-i18n-es)
style.css    Styles, both themes, and the responsive layout
script.js    Language and theme toggles, terminal, skills carousel, contact form
favicon.svg  Site icon
```

Fonts come from Google Fonts (Inter, JetBrains Mono) and icons from Font Awesome.

## Run it locally

Open `index.html` in a browser, or serve the folder so the contact form behaves like it does online:

```bash
npx serve .
```

## Deploy

GitHub Pages publishes the `main` branch automatically. Push to `main` and the site updates in a minute or two.
