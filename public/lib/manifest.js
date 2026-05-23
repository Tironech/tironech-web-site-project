(function () {
  "use strict";
  window.__BRAND__ = {
    name: "Sabana Tech",
    tagline: "Ingeniería de alto valor. Resultados verificables.",
    description: "Boutique de ingeniería especializada en QA avanzado con IA, desarrollo a medida y soluciones de Inteligencia Artificial para startups y empresas en USA y Latam.",
    contact: {
      email: "contact@sabanatech.com",
      calendly: "#contact",
      markets: ["USA", "Latam Corporativo", "SaaS B2B", "Fintech"]
    },
    stats: [
      { value: 6,   suffix: "x",  label: "Menos bugs en producción"      },
      { value: 40,  suffix: "%",  label: "Reducción promedio de NPT técnico" },
      { value: 3,   suffix: "",   label: "Semanas promedio de onboarding" },
      { value: 100, suffix: "%",  label: "Proyectos entregados a tiempo"  }
    ],
    entry_services: [
      {
        id: "qa-automation",
        tag: "PUERTA DE ENTRADA",
        icon: "◈",
        title: "QA Consulting & Automation",
        target: "SaaS B2B, Fintech y Startups",
        pain: "¿Sus bugs llegan a producción antes de que pueda detectarlos? ¿Su equipo de QA manual no escala con la velocidad de los releases?",
        desc: "Auditamos su proceso de calidad actual, diseñamos el framework de QA Automation y eliminamos los bugs antes de que lleguen a sus usuarios.",
        features: [
          "Auditoría de QA y plan de acción en 5 días",
          "Framework de automatización con Playwright / Selenium / Cypress",
          "Integración CI/CD para calidad continua",
          "Reportes de cobertura y KPIs de calidad"
        ],
        price: "Desde $1.800 USD/mes",
        price_model: "Proyecto + Retainer",
        cta: "Agendar sesión de QA"
      },
      {
        id: "ai-quality",
        tag: "RECOMENDADO",
        icon: "⊕",
        title: "AI Quality Shield",
        target: "Empresas con UI compleja y releases frecuentes",
        pain: "Cada release es un riesgo. Cada bug visible para el cliente cuesta dinero y reputación.",
        desc: "QA potenciado con inteligencia artificial: pruebas visuales automatizadas, detección de regresiones y cobertura inteligente de casos críticos.",
        features: [
          "Visual AI testing y detección de regresiones",
          "Cobertura inteligente de user journeys críticos",
          "Análisis de impacto antes de cada release",
          "Dashboard de salud de producto en tiempo real"
        ],
        price: "Proyecto desde $4.500 USD",
        price_model: "+ Retainer $3.500/mes",
        cta: "Solicitar demo de AI Shield"
      },
      {
        id: "web-apps",
        tag: "DESARROLLO",
        icon: "◎",
        title: "Desarrollo Web & Apps Móviles",
        target: "Empresas que necesitan plataformas digitales sólidas",
        pain: "Su presencia digital no representa el nivel de su empresa. Necesita una plataforma que convierta y escale.",
        desc: "Diseñamos y desarrollamos sitios web corporativos y aplicaciones móviles con arquitectura limpia, optimizadas para conversión y rendimiento.",
        features: [
          "Diseño UX/UI estratégico y orientado a conversión",
          "Desarrollo frontend y backend con código limpio",
          "Apps nativas e híbridas iOS y Android",
          "Despliegue, CI/CD y soporte post-lanzamiento"
        ],
        price: "Desde $3.000 USD",
        price_model: "Proyecto cerrado",
        cta: "Cotizar mi proyecto"
      }
    ],
    enterprise_services: [
      {
        id: "fractional-cto",
        tag: "HIGH-TICKET",
        icon: "⬡",
        title: "Fractional CTO + Dev Team",
        target: "Startups en USA sin equipo técnico senior",
        value_prop: "El CTO senior que necesita, sin el costo de contratarlo full-time.",
        desc: "Liderazgo técnico estratégico + equipo de desarrollo llave en mano. Definimos arquitectura, establecemos estándares, entregamos código y escalamos su producto.",
        bullets: [
          "Arquitectura de producto y roadmap técnico",
          "Selección y liderazgo del equipo de desarrollo",
          "Definición de stack tecnológico y estándares de código",
          "Revisión de código, PR reviews y quality gates",
          "Comunicación directa con founders e inversores"
        ],
        price: "$5.000 – $12.000 USD/mes",
        price_model: "Retainer mensual"
      },
      {
        id: "edge-ai-vision",
        tag: "ENTERPRISE",
        icon: "⬘",
        title: "Edge AI Vision Sprint",
        target: "Industria, manufactura y logística",
        value_prop: "Visión artificial e IA en producción en semanas, no en meses.",
        desc: "Implementamos soluciones de Computer Vision y Edge AI directamente en su línea de producción, logística o control de calidad industrial.",
        bullets: [
          "Diagnóstico y diseño de solución Edge AI en 1 semana",
          "Desarrollo e integración de Computer Vision",
          "Despliegue en hardware edge (Nvidia Jetson, Raspberry Pi, etc.)",
          "Dashboard de monitoreo y alertas en tiempo real",
          "Licencia de uso + soporte técnico mensual"
        ],
        price: "$8.000 – $25.000 USD",
        price_model: "Proyecto + Licencia $2.000/mes"
      }
    ],
    why_us: [
      "Reducción de bugs en producción desde la primera semana de trabajo",
      "Releases más rápidos sin sacrificar estabilidad ni cobertura de pruebas",
      "CTO senior sin el costo ni el riesgo de una contratación full-time",
      "Arquitecturas diseñadas sin deuda técnica desde el primer sprint",
      "QA con IA: más cobertura de casos críticos en menos horas manuales",
      "Código limpio, documentado y mantenible — auditable en cualquier momento"
    ],
    team: [
      { role: "Co-Founder · PM & Business Development", area: "Estrategia Comercial y Gestión de Producto" },
      { role: "Co-Founder · UX Designer & Brand Lead",  area: "Diseño de Experiencia e Identidad Visual"   },
      { role: "Lead Developer & DevOps Engineer",        area: "Desarrollo Backend, Frontend e Infraestructura Cloud" },
      { role: "Technical Lead · QA & AI Architect",      area: "Arquitectura de IA, QA Lead y Dirección Técnica" }
    ]
  };
})();
