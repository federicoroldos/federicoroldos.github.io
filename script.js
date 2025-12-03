document.addEventListener('DOMContentLoaded', () => {
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');

    const translations = {
        es: {
            wip_banner: "Sitio en construcción. Versión final próximamente.",
            header_name: "Federico Roldós",
            name: "Federico Roldós",
            about_me_title: "Sobre mí",
            intro_text: "Mi nombre es Federico, tengo 22 años y vivo en Montevideo, Uruguay. Estoy cursando el semestre 8 de la Licenciatura en Tecnologías de la Información en la Universidad Tecnológica (UTEC) y la certificación en DevOps en la Universidad ORT, en Uruguay.\nSoy un estudiante dedicado a mi desarrollo continuo y a la mejora personal constante; destaco por mi puntualidad y responsabilidad, mi actitud positiva y discreta, mi voluntad permanente de aprendizaje y mi eficiencia en el trabajo, lo cual me permite realizar diversas tareas para seguir aprendiendo, ampliar mis habilidades y progresar en mi carrera profesional.",
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
            wip_banner: "Site under construction. Final version coming soon.",
            header_name: "Federico Roldós",
            name: "Federico Roldós",
            about_me_title: "About Me",
            intro_text: "My name is Federico, I am 22 years old, and I live in Montevideo, Uruguay. I am currently in my 8th semester of a Bachelor's in Information Technologies at Universidad Tecnológica (UTEC) and pursuing a DevOps certification at ORT University in Uruguay.\nI am committed to continuous development and personal improvement. I stand out for my punctuality and responsibility, my positive and discreet attitude, my willingness to learn, and my efficiency at work, which allows me to take on various tasks to keep learning, broaden my skills, and keep advancing in my professional career.",
            studies_title: "Studies",
            studies_text: [
                { date: "2025", title: "DevOps Certification", location: "ORT University Uruguay" },
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
                { name: "DevOps Certification", url: "#" },
                { name: "Learning Paths in Microsoft Learn - Power Platform", url: "#" },
                { name: "Learning Paths on Microsoft Learn - Microsoft Azure Fundamentals", url: "#" },
                { name: "Google Cloud Computing Fundamentals Certificate", url: "#" },
                { name: "AWS Academy Graduate - AWS Academy Cloud Foundations", url: "#" }
            ],
            personal_projects_title: "Personal Projects",
            personal_projects_text: [
                { date: "2024", title: "Personal site", location: "Montevideo, Uruguay (remote)", description: "This page as a short project to organize and showcase my skills, studies, and certifications in one place." }
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

    // WIP Toast Logic
    const wipToast = document.getElementById('wip-toast');
    const closeToastButton = document.querySelector('.close-toast-button');

    closeToastButton.addEventListener('click', () => {
        wipToast.classList.add('hidden');
    });


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
