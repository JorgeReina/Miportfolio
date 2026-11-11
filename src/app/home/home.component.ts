import { Component, HostListener, OnInit } from '@angular/core';

type Language = 'es' | 'en';
type Theme = 'light' | 'dark';

const translations = {
  "es": {
    "t0": "Proyectos",
    "t1": "Experiencia",
    "t2": "Formación",
    "t3": "Contacto",
    "t4": "DESARROLLADOR FULL STACK · MÁLAGA",
    "t5": "Desarrollo software que conecta",
    "t6": "ideas y soluciones.",
    "t7": "Soy Jorge Reina Romero, desarrollador full stack. Creo aplicaciones web y soluciones de software con atención a las personas que las utilizan.",
    "t8": "Ver proyectos",
    "t9": "Hablemos",
    "t10": "Descargar CV ↓",
    "t11": "LO QUE HAGO",
    "t12": "Desarrollo web",
    "t13": "APIs e integraciones",
    "t14": "Software de gestión",
    "t15": "01 / TRABAJO SELECCIONADO",
    "t16": "Ideas que toman forma",
    "t17": "Una selección de proyectos personales donde diseño, desarrollo y tecnología trabajan juntos.",
    "t18": "01 / APLICACIÓN WEB",
    "t19": "Aplicación para facilitar la gestión de citas en una peluquería.",
    "t20": "02 / PROYECTO PERSONAL",
    "t21": "Una aplicación que consulta y muestra información de Pokémon a través de una API externa.",
    "t22": "02 / SOBRE MÍ",
    "t23": "Tecnología con",
    "t24": "propósito.",
    "t25": "Me gusta transformar necesidades reales en herramientas útiles, claras y funcionales.",
    "t26": "Trabajo en desarrollo de aplicaciones web, software de gestión y conexiones entre servicios. Disfruto aprendiendo, colaborando y cuidando tanto la lógica como la experiencia de uso.",
    "t27": "EXPERIENCIA",
    "t28": "Desarrollo de software",
    "t29": "Actualidad",
    "t30": "Desarrollo y mantenimiento web",
    "t31": "Desde 2025",
    "t32": "Desarrollo backend y APIs",
    "t33": "Soporte técnico informático",
    "t34": "03 / FORMACIÓN",
    "t35": "Siempre",
    "t36": "aprendiendo.",
    "t37": "Desarrollo de Aplicaciones Multiplataforma",
    "t38": "Sistemas Microinformáticos y Redes",
    "t39": "04 / CONTACTO",
    "t40": "¿Hacemos algo",
    "t41": "juntos?",
    "t42": "Si tienes una idea, una oportunidad o simplemente quieres saludar, estaré encantado de leerte.",
    "t43": "Nombre",
    "t44": "Correo electrónico",
    "t45": "Mensaje",
    "t46": "Enviar mensaje",
    "t47": "© Jorge Reina Romero · Hecho con dedicación en Málaga."
  },
  "en": {
    "t0": "Projects",
    "t1": "Experience",
    "t2": "Education",
    "t3": "Contact",
    "t4": "FULL STACK DEVELOPER · MÁLAGA",
    "t5": "I develop software that connects",
    "t6": "ideas and solutions.",
    "t7": "I'm Jorge Reina Romero, a full-stack developer. I build web applications and software solutions with the people who use them in mind.",
    "t8": "View projects",
    "t9": "Let's talk",
    "t10": "Download CV (Spanish) ↓",
    "t11": "WHAT I DO",
    "t12": "Web development",
    "t13": "APIs & integrations",
    "t14": "Business software",
    "t15": "01 / SELECTED WORK",
    "t16": "Ideas brought to life",
    "t17": "A selection of personal projects where design, development and technology come together.",
    "t18": "01 / WEB APPLICATION",
    "t19": "An application that simplifies appointment management for a hair salon.",
    "t20": "02 / PERSONAL PROJECT",
    "t21": "An application that retrieves and displays Pokémon data from an external API.",
    "t22": "02 / ABOUT ME",
    "t23": "Technology with",
    "t24": "purpose.",
    "t25": "I enjoy turning real needs into useful, clear and functional tools.",
    "t26": "I work on web applications, business software and integrations between services. I enjoy learning, collaborating and paying attention to both logic and user experience.",
    "t27": "EXPERIENCE",
    "t28": "Software development",
    "t29": "Present",
    "t30": "Web development and maintenance",
    "t31": "Since 2025",
    "t32": "Backend and API development",
    "t33": "IT support",
    "t34": "03 / EDUCATION",
    "t35": "Always",
    "t36": "learning.",
    "t37": "Cross-platform Application Development",
    "t38": "Computer Systems and Networks",
    "t39": "04 / CONTACT",
    "t40": "Shall we build",
    "t41": "something together?",
    "t42": "Have an idea, an opportunity or just want to say hello? I'd love to hear from you.",
    "t43": "Name",
    "t44": "Email",
    "t45": "Message",
    "t46": "Send message",
    "t47": "© Jorge Reina Romero · Made with care in Málaga."
  }
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showBackToTop = false;
  language: Language = 'es';
  theme: Theme = 'light';

  get text() { return translations[this.language]; }
  get themeLabel(): string {
    if (this.language === 'es') return this.theme === 'light' ? 'Activar tema oscuro' : 'Activar tema claro';
    return this.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
  }

  ngOnInit(): void {
    try {
      const language = localStorage.getItem('portfolio-language');
      const theme = localStorage.getItem('portfolio-theme');
      if (language === 'es' || language === 'en') this.language = language;
      if (theme === 'light' || theme === 'dark') this.theme = theme;
    } catch { /* Preferences are optional when storage is unavailable. */ }
    this.updateDocumentLanguage();
    this.onWindowScroll();
  }

  toggleLanguage(): void {
    this.language = this.language === 'es' ? 'en' : 'es';
    this.savePreference('portfolio-language', this.language);
    this.updateDocumentLanguage();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.savePreference('portfolio-theme', this.theme);
  }

  private savePreference(key: string, value: string): void {
    try { localStorage.setItem(key, value); } catch { /* The controls still work for this visit. */ }
  }

  private updateDocumentLanguage(): void {
    document.documentElement.lang = this.language;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 300;
  }
}
