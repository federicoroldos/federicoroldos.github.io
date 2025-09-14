document.addEventListener('DOMContentLoaded', () => {
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');

    const translations = {
        es: {
            name: "Federico Roldós Fregeiro",
            intro_text: "Mi nombre es Federico, tengo 22 años y vivo en Montevideo, Uruguay. Estoy estudiando la Licenciatura en Tecnologías de la Información en la Universidad Tecnológica (UTEC). Actualmente estoy en mi 8vo semestre. Soy un estudiante comprometido con el crecimiento continuo y la mejora constante, destacándome por mi puntualidad y responsabilidad, mi actitud positiva y abierta para aprender, mi enfoque discreto y respetuoso en el trabajo, y mis sólidos conocimientos y habilidades en el uso de herramientas informáticas, lo que me permite buscar activamente oportunidades para ampliar mi horizonte y ayudarme a evolucionar en mi carrera.",
            studies_title: "Estudios",
            studies_text: "[ 2021 – Actualidad ] Licenciatura en Tecnologías de la Información - Universidad Tecnológica - UTEC (Fray Bentos, Uruguay)\n[ 01/08/2023 – 31/12/2023 ] Programa de Intercambio Estudiantil - Karelia University of Applied Sciences (Joensuu, Finlandia)\n[ 2012 – 2020 ] First Certificate of English - Nivel C1 - Instituto Anglo (Mercedes, Uruguay)\n[ 2018 – 2020 ] Bachillerato Físico-Matemático - Liceo N°1 José María Campos (Mercedes, Uruguay)",
            experience_title: "Experiencia Laboral",
            experience_text: "[ 2022 – 2023 ] Pasante - Emprende Tech SAS (Mercedes, Uruguay). Pasantía de 6 meses en Emprende Tech SAS, una empresa enfocada en la Transformación Digital de emprendedores y profesionales. Participé en un proyecto de Transformación Digital para la empresa El Abrojo utilizando soluciones de Microsoft Power Platform (Power Automate, Power Virtual Agents, Sharepoint, Microsoft Forms y Microsoft Dataverse).",
            projects_title: "Certificaciones",
            projects_text: "[ 2022 – 2023 ] Rutas de aprendizaje en Microsoft Learn - Power Platform (Power Automate, Power Virtual Agents, Sharepoint, Microsoft Forms y Microsoft Dataverse) - Microsoft\n[ 11/2024 ] Rutas de aprendizaje en Microsoft Learn - Microsoft Azure Fundamentals - Microsoft\n[ 10/2024 ] Certificado de Fundamentos de Computación en la Nube de Google - Google Cloud\n[ 10/2024 ] Graduado de AWS Academy - Fundamentos de la Nube de AWS Academy - Amazon Web Services Training and Certification",
            footer_text: "© 2024 Federico Roldos"
        },
        en: {
            name: "Federico Roldós Fregeiro",
            intro_text: "My name is Federico, I am 22 years old, and I live in Montevideo, Uruguay. I am studying Bachelor in Information Technology at Universidad Tecnologica (UTEC). I am currently in my 8th semester. I am a student committed to continuous growth and constant improvement, standing out for my punctuality and responsibility, my positive and open attitude to learn, my discreet and respectful approach to work, and my solid knowledge and skills in the use of computer tools, which allows me to actively seek opportunities to broaden my horizon and help me to evolve in my career.",
            studies_title: "Studies",
            studies_text: "[ 2021 – Current ] Bachelor's Degree in Information Technology - Universidad Tecnológica - UTEC (Fray Bentos, Uruguay)\n[ 01/08/2023 – 31/12/2023 ] Student Exchange Program - Karelia University of Applied Sciences (Joensuu, Finland)\n[ 2012 – 2020 ] First Certificate of English - Level C1 - Anglo Institute (Mercedes, Uruguay)\n[ 2018 – 2020 ] Physics-Mathematics Baccalaureate - High School N°1 José María Campos (Mercedes, Uruguay)",
            experience_title: "Work Experience",
            experience_text: "[ 2022 – 2023 ] Trainee - Emprende Tech SAS (Mercedes, Uruguay). 6-month internship at Emprende Tech SAS, a company focused on Digital Transformation of entrepreneurs and professionals. I participated in a Digital Transformation project for the company El Abrojo using Microsoft Power Platform solutions (Power Automate, Power Virtual Agents, Sharepoint, Microsoft Forms and Microsoft Dataverse).",
            projects_title: "Certifications",
            projects_text: "[ 2022 – 2023 ] Learning Paths in Microsoft Learn - Power Platform (Power Automate, Power Virtual Agents, Sharepoint, Microsoft Forms and Microsoft Dataverse) - Microsoft\n[ 11/2024 ] Learning Paths on Microsoft Learn - Microsoft Azure Fundamentals - Microsoft\n[ 10/2024 ] Google Cloud Computing Fundamentals Certificate - Google Cloud\n[ 10/2024 ] AWS Academy Graduate - AWS Academy Cloud Foundations - Amazon Web Services Training and Certification",
            footer_text: "© 2024 Federico Roldos"
        }
    };

    function updateText(language) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            element.textContent = translations[language][key];
        });
        document.documentElement.lang = language;
    }

    langEsBtn.addEventListener('click', () => updateText('es'));
    langEnBtn.addEventListener('click', () => updateText('en'));

    // Set initial language
    updateText('es');
});
