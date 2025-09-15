document.addEventListener('DOMContentLoaded', () => {
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');

    const translations = {
        es: {
            name: "Federico Roldós Fregeiro",
            intro_text: "Mi nombre es Federico, tengo 22 años y vivo en Montevideo, Uruguay. Estoy estudiando la Licenciatura en Tecnologías de la Información en la Universidad Tecnológica (UTEC). Actualmente estoy en mi 8vo semestre. Soy un estudiante comprometido con el crecimiento continuo y la mejora constante, destacándome por mi puntualidad y responsabilidad, mi actitud positiva y abierta para aprender, mi enfoque discreto y respetuoso en el trabajo, y mis sólidos conocimientos y habilidades en el uso de herramientas informáticas, lo que me permite buscar activamente oportunidades para ampliar mi horizonte y ayudarme a evolucionar en mi carrera.",
            studies_title: "Estudios",
            studies_text: [
                { date: "2021 – Actualidad", title: "Licenciatura en Tecnologías de la Información", location: "Universidad Tecnológica - UTEC (Fray Bentos, Uruguay)" },
                { date: "2023", title: "Programa de Intercambio Estudiantil", location: "Karelia University of Applied Sciences (Joensuu, Finlandia)" },
                { date: "2018 – 2020", title: "Bachillerato Físico-Matemático", location: "Liceo N°1 José María Campos (Mercedes, Uruguay)" },
                { date: "2012 – 2020", title: "First Certificate of English - Nivel C1", location: "Instituto Anglo (Mercedes, Uruguay)" }
            ],
            experience_title: "Experiencia Laboral",
            experience_text: [
                { date: "2022 – 2023", title: "Pasante", location: "Emprende Tech SAS (Mercedes, Uruguay)", description: "Pasantía de 6 meses en Emprende Tech SAS, una empresa enfocada en la Transformación Digital de emprendedores y profesionales. Participé en un proyecto de Transformación Digital para la empresa El Abrojo utilizando soluciones de Microsoft Power Platform (Power Automate, Power Virtual Agents, Sharepoint, Microsoft Forms y Microsoft Dataverse)." }
            ],
            projects_title: "Certificaciones",
            projects_text: [
                { name: "Learning Paths in Microsoft Learn - Power Platform", url: "#" },
                { name: "Learning Paths on Microsoft Learn - Microsoft Azure Fundamentals", url: "#" },
                { name: "Google Cloud Computing Fundamentals Certificate", url: "#" },
                { name: "AWS Academy Graduate - AWS Academy Cloud Foundations", url: "#" }
            ],
            footer_text: "© 2025 Federico Roldos"
        },
        en: {
            name: "Federico Roldós Fregeiro",
            intro_text: "My name is Federico, I am 22 years old, and I live in Montevideo, Uruguay. I am studying Bachelor in Information Technology at Universidad Tecnologica (UTEC). I am currently in my 8th semester. I am a student committed to continuous growth and constant improvement, standing out for my punctuality and responsibility, my positive and open attitude to learn, my discreet and respectful approach to work, and my solid knowledge and skills in the use of computer tools, which allows me to actively seek opportunities to broaden my horizon and help me to evolve in my career.",
            studies_title: "Studies",
            studies_text: [
                { date: "2021 – Current", title: "Bachelor's Degree in Information Technology", location: "Universidad Tecnológica - UTEC (Fray Bentos, Uruguay)" },
                { date: "2023", title: "Student Exchange Program", location: "Karelia University of Applied Sciences (Joensuu, Finland)" },
                { date: "2018 – 2020", title: "Physics-Mathematics Baccalaureate", location: "High School N°1 José María Campos (Mercedes, Uruguay)" },
                { date: "2012 – 2020", title: "First Certificate of English - Level C1", location: "Anglo Institute (Mercedes, Uruguay)" }
            ],
            experience_title: "Work Experience",
            experience_text: [
                { date: "2022 – 2023", title: "Trainee", location: "Emprende Tech SAS (Mercedes, Uruguay)", description: "6-month internship at Emprende Tech SAS, a company focused on Digital Transformation of entrepreneurs and professionals. I participated in a Digital Transformation project for the company El Abrojo using Microsoft Power Platform solutions (Power Automate, Power Virtual Agents, Sharepoint, Microsoft Forms and Microsoft Dataverse)." }
            ],
            projects_title: "Certifications",
            projects_text: [
                { name: "Learning Paths in Microsoft Learn - Power Platform", url: "#" },
                { name: "Learning Paths on Microsoft Learn - Microsoft Azure Fundamentals", url: "#" },
                { name: "Google Cloud Computing Fundamentals Certificate", url: "#" },
                { name: "AWS Academy Graduate - AWS Academy Cloud Foundations", url: "#" }
            ],
            footer_text: "© 2025 Federico Roldos"
        }
    };

    function updateText(language) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (element.tagName === 'H2') {
                const icon = element.querySelector('i');
                element.innerHTML = '';
                element.appendChild(icon);
                element.innerHTML += ' ' + translations[language][key];
            } else if (key === 'projects_text') {
                element.innerHTML = '';
                translations[language][key].forEach(cert => {
                    const button = document.createElement('a');
                    button.href = cert.url;
                    button.target = '_blank';
                    button.className = 'certification-button';
                    button.textContent = cert.name;
                    element.appendChild(button);
                });
            } else if (key === 'studies_text' || key === 'experience_text') {
                element.innerHTML = '';
                translations[language][key].forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'timeline-item';
                    itemDiv.innerHTML = `
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-content">
                            <h3>${item.title}</h3>
                            <p class="timeline-location">${item.location}</p>
                            ${item.description ? `<p>${item.description}</p>` : ''}
                        </div>
                    `;
                    element.appendChild(itemDiv);
                });
            } else {
                element.textContent = translations[language][key];
            }
        });
        document.documentElement.lang = language;
    }

    langEsBtn.addEventListener('click', () => updateText('es'));
    langEnBtn.addEventListener('click', () => updateText('en'));

    // Set initial language
    updateText('es');

    // Scroll animations
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
