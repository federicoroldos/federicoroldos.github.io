document.addEventListener('DOMContentLoaded', () => {
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');

    const translations = {
        es: {
            header_name: "Federico Roldós",
            name: "Federico Roldós",
            about_me_title: "Sobre mí",
            intro_text: "Soy Federico, tengo 22 años y vivo en Uruguay. Estoy cursando el semestre 8 de la carrera Licenciatura en Tecnologías de la Información en la Universidad Tecnológica (UTEC) y recientemente obtuve la certificación en DevOps de la Universidad ORT.\nSoy un estudiante comprometido con mi desarrollo continuo y la mejora personal. Me caracterizo por ser puntual, responsable y discreto, y estar siempre dispuesto a aprender y asumir nuevas tareas para seguir creciendo profesionalmente.",
            studies_title: "Estudios",
            studies_text: [
                { date: "2025", title: "Certificación en DevOps", location: "Universidad ORT Uruguay" },
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
                { name: "Certificación en DevOps", url: "#" },
                { name: "Learning Paths in Microsoft Learn - Power Platform", url: "#" },
                { name: "Learning Paths on Microsoft Learn - Microsoft Azure Fundamentals", url: "#" },
                { name: "Google Cloud Computing Fundamentals Certificate", url: "#" },
                { name: "AWS Academy Graduate - AWS Academy Cloud Foundations", url: "#" }
            ],
            personal_projects_title: "Proyectos Personales",
            personal_projects_text: [
                { date: "2025", title: "Web personal", location: "Montevideo, Uruguay (remoto)", description: "Esta página como un proyecto breve para organizar y mostrar mis habilidades, estudios y certificaciones en un solo lugar." }
            ],
            footer_text: "© 2025 Federico Roldós"
        },
        en: {
            header_name: "Federico Roldós",
            name: "Federico Roldós",
            about_me_title: "About Me",
            intro_text: "I am Federico, I am 22 years old, and I live in Uruguay. I am currently doing the 8th semester of the Bachelor's in Information Technologies carreer at Universidad Tecnológica (UTEC) and recently earned the DevOps certification from Universidad ORT.\nI am a student committed to my continuous development and personal improvement. I am known for being punctual, responsible, and discreet, and I am always willing to learn and take on new tasks to continue growing professionally.",
            studies_title: "Studies",
            studies_text: [
                { date: "2025", title: "DevOps Certification", location: "Universidad ORT Uruguay" },
                { date: "2021 – Present", title: "Bachelor's in Information Technologies", location: "Universidad Tecnológica - UTEC (Fray Bentos, Uruguay)" },
                { date: "2023", title: "Student Exchange Program", location: "Karelia University of Applied Sciences (Joensuu, Finland)" },
                { date: "2018 – 2020", title: "Physics-Mathematics Baccalaureate", location: "High School N°1 José María Campos (Mercedes, Uruguay)" },
                { date: "2012 – 2020", title: "First Certificate of English - Level C1", location: "Anglo Institute (Mercedes, Uruguay)" }
            ],
            experience_title: "Work Experience",
            experience_text: [
                { date: "2022 – 2023", title: "Intern", location: "Emprende Tech SAS (Mercedes, Uruguay)", description: "6-month internship at Emprende Tech SAS, a company focused on digital transformation for entrepreneurs and professionals. I participated in a digital transformation project for El Abrojo using Microsoft Power Platform solutions (Power Automate, Power Virtual Agents, SharePoint, Microsoft Forms, and Microsoft Dataverse)." }
            ],
            projects_title: "Certifications",
            projects_text: [
                { name: "DevOps Certification", url: "#" },
                { name: "Learning Paths in Microsoft Learn - Power Platform", url: "#" },
                { name: "Learning Paths on Microsoft Learn - Microsoft Azure Fundamentals", url: "#" },
                { name: "Google Cloud Computing Fundamentals Certificate", url: "#" },
                { name: "AWS Academy Graduate - AWS Academy Cloud Foundations", url: "#" }
            ],
            personal_projects_title: "Personal Projects",
            personal_projects_text: [
                { date: "2025", title: "Personal site", location: "Montevideo, Uruguay (remote)", description: "This page as a short project to organize and showcase my skills, studies, and certifications in one place." }
            ],
            footer_text: "© 2025 Federico Roldós"
        }
    };

    function updateText(language) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (element.tagName === 'H2' && element.querySelector('i')) {
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
            } else if (key === 'studies_text' || key === 'experience_text' || key === 'personal_projects_text') {
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
