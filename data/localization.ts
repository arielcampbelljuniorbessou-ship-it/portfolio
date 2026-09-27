import type { Project, SkillCategory, SkillItem, TimelineEvent } from "@/data/portfolio";

export type Locale = "fr" | "en" | "es" | "ar";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "fr" || value === "en" || value === "es" || value === "ar";
}

const frenchMessages = {
  siteTitle: "Ariel - Portfolio développeur & cybersécurité",
  siteDescription: "Portfolio d'Ariel, étudiant en informatique orienté développement, cybersécurité et hacking éthique.",
  language: "Langue",
  nav: {
    story: "Histoire",
    projects: "Réalisations",
    skills: "Compétences",
    mission: "Mission",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu"
  },
  hero: {
    tagline: "Curiosité → Découverte → Ambition",
    title: "Salut, je m'appelle Ariel.",
    subtitle: "Es-tu prêt à découvrir mon monde ?",
    action: "LET'S GO !",
    floating: ["Code", "Terminal", "Réseau", "Sécurité", "Interface", "Données", "Agriculture"]
  },
  story: {
    eyebrow: "Histoire",
    title: "MON HISTOIRE",
    description: "Une progression en plusieurs étapes, de la curiosité technologique aux premiers projets et à l'objectif cybersécurité.",
    restart: "Recommencer",
    reveal: "Découvrir mon histoire",
    restartAria: "Recommencer l'animation",
    revealAria: "Afficher l'histoire"
  },
  projects: {
    eyebrow: "Réalisations",
    title: "DES PROJETS QUI RACONTENT L'ÉVOLUTION",
    description: "Trois projets, trois usages concrets : accessibilité, apprentissage et gestion agricole.",
    phoneTitle: "Projets",
    selected: "Projet sélectionné",
    view: "Voir le projet",
    turnOn: "Allumer le téléphone",
    turnOnPrompt: "Allumez pour voir les projets",
    previous: "Projet précédent",
    next: "Projet suivant",
    showDetails: "Afficher les détails de",
    preview: "Aperçu de",
    detailedPreview: "Aperçu détaillé de"
  },
  rating: {
    eyebrow: "Notation",
    title: "J'espère que tu as aimé mes projets. Si oui, note-les.",
    name: "Ton nom",
    namePlaceholder: "Ton nom (facultatif)",
    send: "ENVOYER",
    sending: "ENVOI...",
    sent: "Merci, ton avis a été envoyé.",
    error: "Erreur d'envoi. Réessaie dans un instant.",
    score: "Note sur 10",
    comment: "Commentaire",
    commentPlaceholder: "Ton avis..."
  },
  skills: {
    eyebrow: "Compétences",
    title: "COMPÉTENCES",
    description: "Langages, systèmes, réseaux et sécurité réunis autour des projets et de l'ambition cybersécurité.",
    selection: "Sélection",
    relatedProjects: "Projets associés",
    globeLabel: "Globe des compétences. Faites glisser pour le tourner, cliquez sur un nom pour afficher ses détails. Les flèches du clavier font tourner le globe.",
    keyboardSelection: "Sélection clavier des compétences"
  },
  mission: {
    eyebrow: "Mission",
    title: "MISSION",
    description: "L'ambition devient une direction claire : apprendre, construire, sécuriser.",
    quote: "Je projette de devenir un expert en cybersécurité, précisément en hacking éthique ; et un développeur hors pair.",
    ethics: "Éthique"
  },
  conclusion: {
    text: "Voilà ! C'est ici que se termine le voyage. J'espère que tu ne t'es pas ennuyé. Reviens souvent pour voir mes nouveaux projets et, si tu veux collaborer, n'hésite pas à me contacter.",
    goodbye: "AU REVOIR",
    thanks: "Merci pour ta visite"
  },
  footer: {
    role: "Portfolio — Développeur & Cybersécurité",
    tagline: "Toujours en train d'apprendre. Toujours en train de construire.",
    phone: "Téléphone",
    email: "Email",
    rights: "Tous droits réservés."
  },
  projectDetails: {
    close: "Fermer le détail du projet",
    label: "Projet",
    problem: "Le problème",
    solution: "La solution",
    technologies: "Technologies utilisées",
    difficulties: "Difficultés rencontrées",
    learning: "Ce que j'ai appris",
    status: "Statut",
    innovation: "Innovation"
  }
} as const;

type WidenStrings<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly WidenStrings<Item>[]
    : T extends object
      ? { [Key in keyof T]: WidenStrings<T[Key]> }
      : T;

type Messages = WidenStrings<typeof frenchMessages>;

export const messages: Record<Locale, Messages> = {
  fr: frenchMessages,
  en: {
    siteTitle: "Ariel - Developer & Cybersecurity Portfolio",
    siteDescription: "Ariel's portfolio, focused on software development, cybersecurity, and ethical hacking.",
    language: "Language",
    nav: {
      story: "Story",
      projects: "Projects",
      skills: "Skills",
      mission: "Mission",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu"
    },
    hero: {
      tagline: "Curiosity → Discovery → Ambition",
      title: "Hi, I'm Ariel.",
      subtitle: "Ready to discover my world?",
      action: "LET'S GO!",
      floating: ["Code", "Terminal", "Network", "Security", "Interface", "Data", "Agriculture"]
    },
    story: {
      eyebrow: "Story",
      title: "MY STORY",
      description: "A journey in several stages, from technological curiosity to early projects and a goal in cybersecurity.",
      restart: "Start over",
      reveal: "Discover my story",
      restartAria: "Restart the animation",
      revealAria: "Reveal the story"
    },
    projects: {
      eyebrow: "Projects",
      title: "PROJECTS THAT TELL A STORY OF GROWTH",
      description: "Three projects with practical uses: accessibility, learning, and agricultural management.",
      phoneTitle: "Projects",
      selected: "Selected project",
      view: "View project",
      turnOn: "Turn on the phone",
      turnOnPrompt: "Turn it on to see the projects",
      previous: "Previous project",
      next: "Next project",
      showDetails: "Show details for",
      preview: "Preview of",
      detailedPreview: "Detailed preview of"
    },
    rating: {
      eyebrow: "Ratings",
      title: "Enjoyed my projects? Leave a rating.",
      name: "Your name",
      namePlaceholder: "Your name (optional)",
      send: "SEND",
      sending: "SENDING...",
      sent: "Thanks, your feedback has been sent.",
      error: "Could not send your feedback. Please try again shortly.",
      score: "Rating out of 10",
      comment: "Comment",
      commentPlaceholder: "Your feedback..."
    },
    skills: {
      eyebrow: "Skills",
      title: "SKILLS",
      description: "Languages, systems, networks, and security connected to my projects and cybersecurity goals.",
      selection: "Selected skill",
      relatedProjects: "Related projects",
      globeLabel: "Skills globe. Drag to rotate it and select a name to see its details. Use the arrow keys to rotate the globe.",
      keyboardSelection: "Keyboard skill selection"
    },
    mission: {
      eyebrow: "Mission",
      title: "MISSION",
      description: "Ambition becomes a clear direction: learn, build, and secure.",
      quote: "I aim to become a cybersecurity expert specializing in ethical hacking, and an outstanding developer.",
      ethics: "Ethics"
    },
    conclusion: {
      text: "That's the end of the journey. I hope you enjoyed it. Come back to see my latest projects, and get in touch if you'd like to work together.",
      goodbye: "GOODBYE",
      thanks: "Thanks for visiting"
    },
    footer: {
      role: "Portfolio — Developer & Cybersecurity",
      tagline: "Always learning. Always building.",
      phone: "Phone",
      email: "Email",
      rights: "All rights reserved."
    },
    projectDetails: {
      close: "Close project details",
      label: "Project",
      problem: "The problem",
      solution: "The solution",
      technologies: "Technologies used",
      difficulties: "Challenges",
      learning: "What I learned",
      status: "Status",
      innovation: "Innovation"
    }
  },
  es: {
    siteTitle: "Ariel - Portfolio de desarrollo y ciberseguridad",
    siteDescription: "Portfolio de Ariel, estudiante de informática enfocado en desarrollo, ciberseguridad y hacking ético.",
    language: "Idioma",
    nav: {
      story: "Historia",
      projects: "Proyectos",
      skills: "Competencias",
      mission: "Misión",
      contact: "Contacto",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú"
    },
    hero: {
      tagline: "Curiosidad → Descubrimiento → Ambición",
      title: "Hola, soy Ariel.",
      subtitle: "¿Listo para descubrir mi mundo?",
      action: "¡VAMOS!",
      floating: ["Código", "Terminal", "Red", "Seguridad", "Interfaz", "Datos", "Agricultura"]
    },
    story: {
      eyebrow: "Historia",
      title: "MI HISTORIA",
      description: "Un recorrido en varias etapas, desde la curiosidad tecnológica hasta los primeros proyectos y el objetivo de especializarme en ciberseguridad.",
      restart: "Reiniciar",
      reveal: "Descubre mi historia",
      restartAria: "Reiniciar la animación",
      revealAria: "Mostrar la historia"
    },
    projects: {
      eyebrow: "Proyectos",
      title: "PROYECTOS QUE CUENTAN UNA HISTORIA DE CRECIMIENTO",
      description: "Tres proyectos con usos concretos: accesibilidad, aprendizaje y gestión agrícola.",
      phoneTitle: "Proyectos",
      selected: "Proyecto seleccionado",
      view: "Ver proyecto",
      turnOn: "Encender el teléfono",
      turnOnPrompt: "Enciéndelo para ver los proyectos",
      previous: "Proyecto anterior",
      next: "Proyecto siguiente",
      showDetails: "Mostrar detalles de",
      preview: "Vista previa de",
      detailedPreview: "Vista detallada de"
    },
    rating: {
      eyebrow: "Valoraciones",
      title: "¿Te gustaron mis proyectos? Déjame tu valoración.",
      name: "Tu nombre",
      namePlaceholder: "Tu nombre (opcional)",
      send: "ENVIAR",
      sending: "ENVIANDO...",
      sent: "Gracias, tu opinión se ha enviado.",
      error: "No se pudo enviar tu opinión. Inténtalo de nuevo en un momento.",
      score: "Valoración sobre 10",
      comment: "Comentario",
      commentPlaceholder: "Tu opinión..."
    },
    skills: {
      eyebrow: "Competencias",
      title: "COMPETENCIAS",
      description: "Lenguajes, sistemas, redes y seguridad conectados con mis proyectos y mi objetivo en ciberseguridad.",
      selection: "Selección",
      relatedProjects: "Proyectos relacionados",
      globeLabel: "Globo de competencias. Arrastra para girarlo y selecciona un nombre para ver sus detalles. Usa las flechas del teclado para girar el globo.",
      keyboardSelection: "Selección de competencias con teclado"
    },
    mission: {
      eyebrow: "Misión",
      title: "MISIÓN",
      description: "La ambición se convierte en un rumbo claro: aprender, crear y proteger.",
      quote: "Aspiro a convertirme en especialista en ciberseguridad, concretamente en hacking ético, y en un desarrollador excepcional.",
      ethics: "Ética"
    },
    conclusion: {
      text: "¡Y así termina el recorrido! Espero que lo hayas disfrutado. Vuelve para descubrir mis nuevos proyectos y escríbeme si te gustaría colaborar.",
      goodbye: "HASTA PRONTO",
      thanks: "Gracias por tu visita"
    },
    footer: {
      role: "Portfolio — Desarrollo y ciberseguridad",
      tagline: "Siempre aprendiendo. Siempre creando.",
      phone: "Teléfono",
      email: "Correo",
      rights: "Todos los derechos reservados."
    },
    projectDetails: {
      close: "Cerrar los detalles del proyecto",
      label: "Proyecto",
      problem: "El problema",
      solution: "La solución",
      technologies: "Tecnologías utilizadas",
      difficulties: "Dificultades encontradas",
      learning: "Lo que aprendí",
      status: "Estado",
      innovation: "Innovación"
    }
  },
  ar: {
    siteTitle: "أرييل - ملف مطور وأمن سيبراني",
    siteDescription: "ملف أرييل، طالب في علوم الحاسوب مهتم بالتطوير والأمن السيبراني والاختراق الأخلاقي.",
    language: "اللغة",
    nav: {
      story: "قصتي",
      projects: "المشاريع",
      skills: "المهارات",
      mission: "الرسالة",
      contact: "تواصل",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة"
    },
    hero: {
      tagline: "فضول ← اكتشاف ← طموح",
      title: "مرحباً، أنا أرييل.",
      subtitle: "هل أنت مستعد لاكتشاف عالمي؟",
      action: "لننطلق!",
      floating: ["البرمجة", "الطرفية", "الشبكات", "الأمن", "الواجهات", "البيانات", "الزراعة"]
    },
    story: {
      eyebrow: "قصتي",
      title: "قصتي",
      description: "رحلة من مراحل متعددة، من الفضول التقني إلى المشاريع الأولى والطموح نحو الأمن السيبراني.",
      restart: "إعادة التشغيل",
      reveal: "اكتشف قصتي",
      restartAria: "إعادة تشغيل الحركة",
      revealAria: "إظهار القصة"
    },
    projects: {
      eyebrow: "المشاريع",
      title: "مشاريع تحكي قصة تطور",
      description: "ثلاثة مشاريع لاستخدامات عملية: تسهيل الوصول، والتعلم، وإدارة الزراعة.",
      phoneTitle: "المشاريع",
      selected: "المشروع المحدد",
      view: "عرض المشروع",
      turnOn: "تشغيل الهاتف",
      turnOnPrompt: "شغّل الهاتف لرؤية المشاريع",
      previous: "المشروع السابق",
      next: "المشروع التالي",
      showDetails: "عرض تفاصيل",
      preview: "معاينة",
      detailedPreview: "معاينة تفصيلية"
    },
    rating: {
      eyebrow: "التقييم",
      title: "هل أعجبتك مشاريعي؟ أضف تقييمك.",
      name: "اسمك",
      namePlaceholder: "اسمك (اختياري)",
      send: "إرسال",
      sending: "جارٍ الإرسال...",
      sent: "شكراً، تم إرسال رأيك.",
      error: "تعذر إرسال رأيك. حاول مرة أخرى بعد قليل.",
      score: "التقييم من 10",
      comment: "تعليق",
      commentPlaceholder: "رأيك..."
    },
    skills: {
      eyebrow: "المهارات",
      title: "المهارات",
      description: "لغات وأنظمة وشبكات وأمن مرتبطة بمشاريعي وطموحي في الأمن السيبراني.",
      selection: "المهارة المحددة",
      relatedProjects: "المشاريع المرتبطة",
      globeLabel: "كرة المهارات. اسحبها لتدويرها، واختر اسماً لعرض التفاصيل. استخدم مفاتيح الأسهم لتدوير الكرة.",
      keyboardSelection: "اختيار المهارات بلوحة المفاتيح"
    },
    mission: {
      eyebrow: "الرسالة",
      title: "الرسالة",
      description: "يتحول الطموح إلى مسار واضح: التعلم والبناء والحماية.",
      quote: "أطمح إلى أن أصبح خبيراً في الأمن السيبراني، متخصصاً في الاختراق الأخلاقي، ومطوراً متميزاً.",
      ethics: "الأخلاقيات"
    },
    conclusion: {
      text: "وهكذا تنتهي الرحلة. أتمنى أن تكون قد استمتعت بها. عُد قريباً لاكتشاف مشاريعي الجديدة، ولا تتردد في التواصل إذا رغبت في التعاون.",
      goodbye: "إلى اللقاء",
      thanks: "شكراً لزيارتك"
    },
    footer: {
      role: "ملف أعمال — تطوير وأمن سيبراني",
      tagline: "أتعلم باستمرار. وأبني باستمرار.",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      rights: "جميع الحقوق محفوظة."
    },
    projectDetails: {
      close: "إغلاق تفاصيل المشروع",
      label: "المشروع",
      problem: "المشكلة",
      solution: "الحل",
      technologies: "التقنيات المستخدمة",
      difficulties: "التحديات",
      learning: "ما تعلمته",
      status: "الحالة",
      innovation: "الابتكار"
    }
  }
};

export type MessagesByLocale = (typeof messages)[Locale];

const timelineCopy: Record<Exclude<Locale, "fr">, Record<string, Pick<TimelineEvent, "title" | "tone">>> = {
  en: {
    "2016": { title: "First interest in technology", tone: "Curiosity" },
    "2019": { title: "Discovering computing", tone: "Discovery" },
    "2024": { title: "First steps in programming", tone: "Learning" },
    "2025": { title: "First project", tone: "Creation" },
    "2026": { title: "Cybersecurity and new projects", tone: "Ambition" }
  },
  es: {
    "2016": { title: "Primer interés por la tecnología", tone: "Curiosidad" },
    "2019": { title: "Descubrimiento de la informática", tone: "Descubrimiento" },
    "2024": { title: "Primeros pasos en programación", tone: "Aprendizaje" },
    "2025": { title: "Primer proyecto", tone: "Creación" },
    "2026": { title: "Ciberseguridad y nuevos proyectos", tone: "Ambición" }
  },
  ar: {
    "2016": { title: "بداية الاهتمام بالتكنولوجيا", tone: "فضول" },
    "2019": { title: "اكتشاف عالم الحوسبة", tone: "اكتشاف" },
    "2024": { title: "الخطوات الأولى في البرمجة", tone: "تعلّم" },
    "2025": { title: "المشروع الأول", tone: "إنشاء" },
    "2026": { title: "الأمن السيبراني ومشاريع جديدة", tone: "طموح" }
  }
};

export function localizeTimelineEvent(event: TimelineEvent, locale: Locale) {
  return locale === "fr" ? event : { ...event, ...timelineCopy[locale][event.year] };
}

const skillCopy: Record<Exclude<Locale, "fr">, Record<string, Pick<SkillItem, "name" | "description" | "projects">>> = {
  en: {
    C: { name: "C", description: "A low-level foundation for understanding memory, operating systems, and the fundamentals of security.", projects: ["To connect to a future project"] },
    Python: { name: "Python", description: "A core language for scripting, Django, and computer vision or automation prototypes.", projects: ["HandControl", "PythonLearning"] },
    JavaScript: { name: "JavaScript", description: "A web language for building interactive interfaces and connecting front ends to services.", projects: ["AgriHub225"] },
    "HTML/CSS": { name: "HTML/CSS", description: "The foundation of web interfaces, semantic structure, and responsive experiences.", projects: ["PythonLearning", "AgriHub225"] },
    Linux: { name: "Linux", description: "An essential environment for development, networking, and learning cybersecurity.", projects: ["To be specified"] },
    Windows: { name: "Windows", description: "A system used for PC tools and application experiments.", projects: ["HandControl"] },
    "TCP/IP": { name: "TCP/IP", description: "The foundation for understanding network communication in development and security.", projects: ["To be specified"] },
    VLAN: { name: "VLAN", description: "Network segmentation and isolation for better-structured environments.", projects: ["To be specified"] },
    Cisco: { name: "Cisco", description: "Networking technologies for practicing configuration and infrastructure concepts.", projects: ["To be specified"] },
    CTF: { name: "CTF", description: "A gradual, hands-on way to learn through security challenges.", projects: ["To connect to a future project"] },
    "Web Security": { name: "Web Security", description: "Understanding web risks and the practices needed to build safer interfaces.", projects: ["PythonLearning", "AgriHub225"] },
    Cryptographie: { name: "Cryptography", description: "Studying the mechanisms that protect communications and data.", projects: ["To be specified"] }
  },
  es: {
    C: { name: "C", description: "Una base de bajo nivel para comprender la memoria, los sistemas operativos y los fundamentos de la seguridad.", projects: ["Por vincular a un proyecto futuro"] },
    Python: { name: "Python", description: "Lenguaje central para scripts, Django y prototipos de visión artificial o automatización.", projects: ["HandControl", "PythonLearning"] },
    JavaScript: { name: "JavaScript", description: "Lenguaje web para crear interfaces interactivas y conectar el frontend con servicios.", projects: ["AgriHub225"] },
    "HTML/CSS": { name: "HTML/CSS", description: "La base de las interfaces web, la estructura semántica y las experiencias adaptables.", projects: ["PythonLearning", "AgriHub225"] },
    Linux: { name: "Linux", description: "Un entorno esencial para el desarrollo, las redes y el aprendizaje de ciberseguridad.", projects: ["Por concretar"] },
    Windows: { name: "Windows", description: "Sistema utilizado para herramientas de PC y experimentos con aplicaciones.", projects: ["HandControl"] },
    "TCP/IP": { name: "TCP/IP", description: "Base para comprender las comunicaciones de red en desarrollo y seguridad.", projects: ["Por concretar"] },
    VLAN: { name: "VLAN", description: "Segmentación de red y aislamiento para estructurar mejor los entornos.", projects: ["Por concretar"] },
    Cisco: { name: "Cisco", description: "Tecnologías de red para practicar configuraciones y conceptos de infraestructura.", projects: ["Por concretar"] },
    CTF: { name: "CTF", description: "Práctica progresiva para aprender mediante retos de seguridad.", projects: ["Por vincular a un proyecto futuro"] },
    "Web Security": { name: "Seguridad web", description: "Comprensión de los riesgos web y de las prácticas necesarias para crear interfaces más seguras.", projects: ["PythonLearning", "AgriHub225"] },
    Cryptographie: { name: "Criptografía", description: "Estudio de los mecanismos que protegen las comunicaciones y los datos.", projects: ["Por concretar"] }
  },
  ar: {
    C: { name: "C", description: "أساس منخفض المستوى لفهم الذاكرة وأنظمة التشغيل ومبادئ الأمن.", projects: ["يُضاف إلى مشروع مستقبلي"] },
    Python: { name: "بايثون", description: "لغة أساسية للبرمجة النصية وDjango والنماذج الأولية للرؤية الحاسوبية والأتمتة.", projects: ["HandControl", "PythonLearning"] },
    JavaScript: { name: "جافاسكريبت", description: "لغة ويب لبناء واجهات تفاعلية وربط الواجهة الأمامية بالخدمات.", projects: ["AgriHub225"] },
    "HTML/CSS": { name: "HTML/CSS", description: "أساس واجهات الويب والبنية الدلالية والتجارب المتجاوبة.", projects: ["PythonLearning", "AgriHub225"] },
    Linux: { name: "لينكس", description: "بيئة أساسية للتطوير والشبكات وتعلّم الأمن السيبراني.", projects: ["قيد التحديد"] },
    Windows: { name: "ويندوز", description: "نظام أستخدمه لأدوات الحاسوب وتجارب التطبيقات.", projects: ["HandControl"] },
    "TCP/IP": { name: "TCP/IP", description: "أساس فهم اتصالات الشبكة في التطوير والأمن.", projects: ["قيد التحديد"] },
    VLAN: { name: "VLAN", description: "تقسيم الشبكات وعزلها لتنظيم البيئات بشكل أفضل.", projects: ["قيد التحديد"] },
    Cisco: { name: "سيسكو", description: "تقنيات شبكات للتدرب على الإعداد ومفاهيم البنية التحتية.", projects: ["قيد التحديد"] },
    CTF: { name: "CTF", description: "تدريب تدريجي للتعلم من خلال تحديات الأمن السيبراني.", projects: ["يُضاف إلى مشروع مستقبلي"] },
    "Web Security": { name: "أمن الويب", description: "فهم مخاطر الويب والممارسات اللازمة لبناء واجهات أكثر أماناً.", projects: ["PythonLearning", "AgriHub225"] },
    Cryptographie: { name: "التشفير", description: "دراسة الآليات التي تحمي الاتصالات والبيانات.", projects: ["قيد التحديد"] }
  }
};

const categoryTitles: Record<Exclude<Locale, "fr">, Record<string, string>> = {
  en: { LANGAGES: "LANGUAGES", SYSTÈMES: "SYSTEMS", RÉSEAUX: "NETWORKS", SÉCURITÉ: "SECURITY" },
  es: { LANGAGES: "LENGUAJES", SYSTÈMES: "SISTEMAS", RÉSEAUX: "REDES", SÉCURITÉ: "SEGURIDAD" },
  ar: { LANGAGES: "اللغات", SYSTÈMES: "الأنظمة", RÉSEAUX: "الشبكات", SÉCURITÉ: "الأمن" }
};

export function localizeSkill(skill: SkillItem, locale: Locale): SkillItem {
  return locale === "fr" ? skill : { ...skill, ...skillCopy[locale][skill.name] };
}

export function localizeSkillCategory(category: SkillCategory, locale: Locale): SkillCategory {
  if (locale === "fr") return category;
  return {
    ...category,
    title: categoryTitles[locale][category.title] ?? category.title,
    items: category.items.map((skill) => localizeSkill(skill, locale))
  };
}

type ProjectTranslation = Omit<Project, "slug" | "name" | "visual" | "technologies" | "link"> & {
  linkLabel?: string;
};

const projectCopy: Record<Exclude<Locale, "fr">, Record<string, ProjectTranslation>> = {
  en: {
    handcontrol: {
      description: "PC software that lets you control the mouse cursor with your hand.",
      status: "In progress",
      problem: "Make cursor control more natural without requiring contact with a traditional mouse.",
      solution: "Use computer vision to interpret hand movements and translate them into mouse actions.",
      difficulties: ["Python environment issues", "MediaPipe API unavailable", "Missing dependencies"],
      learning: "This project taught me to connect a practical need to specialized libraries, manage Python environments, and understand the importance of project dependencies in computer vision.",
      innovation: "Control the cursor without touching a mouse, offering a more comfortable alternative to traditional input."
    },
    pythonlearning: {
      description: "A website designed to help people learn and master the Python programming language.",
      status: "Completed",
      problem: "Structure a clear web-based learning path for Python.",
      solution: "Create an educational site with Django and an accessible interface for browsing lessons.",
      difficulties: ["Configuration and structure issues at the start"],
      learning: "I learned to structure a Django application, organize an educational website, and plan the configuration required before deployment.",
      innovation: "Make Python learning more accessible through a dedicated web space.",
      linkLabel: "Visit PythonLearning"
    },
    agrihub225: {
      description: "An agricultural management platform for plots, crops, inventory, and monitoring.",
      status: "In progress",
      problem: "Centralize agricultural monitoring and clarify production data management.",
      solution: "Build a platform combining a Django backend, PostgreSQL database, React frontend, and Power BI visualizations.",
      difficulties: ["Incomplete data model at the start"],
      learning: "This project is helping me improve at data modeling, separating backend and frontend concerns, and turning data into useful monitoring insights.",
      innovation: "Make agricultural work easier through digital tools."
    }
  },
  es: {
    handcontrol: {
      description: "Software para PC que permite controlar el cursor del ratón con la mano.",
      status: "En curso",
      problem: "Hacer que el control del cursor sea más natural sin tener que tocar un ratón tradicional.",
      solution: "Usar visión artificial para interpretar los movimientos de la mano y convertirlos en acciones del ratón.",
      difficulties: ["Problemas con el entorno de Python", "API de MediaPipe no disponible", "Dependencias ausentes"],
      learning: "Este proyecto me enseñó a relacionar una necesidad concreta con bibliotecas especializadas, gestionar entornos de Python y comprender la importancia de las dependencias en visión artificial.",
      innovation: "Controlar el cursor sin tocar el ratón y ofrecer una alternativa más cómoda al control tradicional."
    },
    pythonlearning: {
      description: "Sitio web diseñado para aprender y dominar el lenguaje de programación Python.",
      status: "Completado",
      problem: "Estructurar un recorrido web claro para aprender Python.",
      solution: "Crear un sitio educativo con Django y una interfaz accesible para consultar los contenidos.",
      difficulties: ["Problemas de configuración y estructura al inicio"],
      learning: "Aprendí a estructurar una aplicación Django, organizar las páginas de un sitio educativo y anticipar la configuración necesaria antes de publicarlo.",
      innovation: "Facilitar el aprendizaje de Python mediante un espacio web dedicado.",
      linkLabel: "Visitar PythonLearning"
    },
    agrihub225: {
      description: "Plataforma de gestión agrícola para parcelas, cultivos, inventario y seguimiento.",
      status: "En curso",
      problem: "Centralizar el seguimiento agrícola y aclarar la gestión de los datos de producción.",
      solution: "Desarrollar una plataforma que combina backend Django, base de datos PostgreSQL, frontend React y visualización con Power BI.",
      difficulties: ["Modelo de datos incompleto al inicio"],
      learning: "Este proyecto me ayuda a mejorar en el diseño de modelos de datos, la separación entre backend y frontend y la transformación de datos en información útil.",
      innovation: "Facilitar el trabajo agrícola mediante herramientas digitales."
    }
  },
  ar: {
    handcontrol: {
      description: "برنامج للحاسوب يتيح التحكم بمؤشر الفأرة باستخدام اليد.",
      status: "قيد التطوير",
      problem: "جعل التحكم بالمؤشر أكثر سهولة دون الحاجة إلى لمس فأرة تقليدية.",
      solution: "استخدام الرؤية الحاسوبية لفهم حركات اليد وتحويلها إلى أوامر للفأرة.",
      difficulties: ["مشكلات في بيئة Python", "عدم توفر واجهة MediaPipe البرمجية", "مكتبات مطلوبة غير متوفرة"],
      learning: "علّمني هذا المشروع ربط الاحتياجات العملية بالمكتبات المتخصصة، وإدارة بيئات Python، وفهم أهمية الاعتماديات في مشاريع الرؤية الحاسوبية.",
      innovation: "التحكم بالمؤشر دون لمس الفأرة لتوفير بديل أكثر راحة لطرق التحكم التقليدية."
    },
    pythonlearning: {
      description: "موقع إلكتروني لتعلّم لغة البرمجة Python وإتقانها.",
      status: "مكتمل",
      problem: "تنظيم مسار تعلّم واضح عبر الويب لمرافقة تعلّم Python.",
      solution: "إنشاء موقع تعليمي باستخدام Django وواجهة سهلة لتصفح المحتوى.",
      difficulties: ["مشكلات في الإعداد والبنية في البداية"],
      learning: "تعلّمت تنظيم تطبيق Django وصفحات موقع تعليمي والتخطيط للإعدادات اللازمة قبل النشر.",
      innovation: "جعل تعلّم Python أسهل عبر مساحة ويب مخصصة.",
      linkLabel: "زيارة PythonLearning"
    },
    agrihub225: {
      description: "منصة لإدارة الزراعة والقطع والمحاصيل والمخزون والمتابعة.",
      status: "قيد التطوير",
      problem: "توحيد المتابعة الزراعية وتوضيح إدارة بيانات الإنتاج.",
      solution: "تطوير منصة تجمع بين Django وPostgreSQL وReact وPower BI.",
      difficulties: ["نموذج بيانات غير مكتمل في البداية"],
      learning: "يساعدني هذا المشروع على تطوير مهارات تصميم البيانات وفصل الواجهة الأمامية عن الخلفية وتحويل البيانات إلى معلومات مفيدة للمتابعة.",
      innovation: "تسهيل العمل الزراعي باستخدام الأدوات الرقمية."
    }
  }
};

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "fr") return project;
  const { linkLabel, ...translated } = projectCopy[locale][project.slug];
  return {
    ...project,
    ...translated,
    link: project.link
      ? { ...project.link, label: linkLabel ?? project.link.label }
      : undefined
  };
}