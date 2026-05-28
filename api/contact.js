import nodemailer from 'nodemailer';


const SERVICE_LABELS = {
  en: {
    'qa':             'QA Consulting & Automation',
    'ai-shield':      'AI Quality Shield',
    'web-app':        'Web / App Development',
    'fractional-cto': 'Fractional CTO + Dev Team',
    'edge-ai':        'Edge AI Vision Sprint',
    'otros':          'Other / Not sure',
  },
  es: {
    'qa':             'QA Consulting & Automation',
    'ai-shield':      'AI Quality Shield',
    'web-app':        'Desarrollo Web / App Móvil',
    'fractional-cto': 'Fractional CTO + Dev Team',
    'edge-ai':        'Edge AI Vision Sprint',
    'otros':          'Otro / No estoy seguro',
  },
};

const AUTO_REPLY = {
  en: {
    subject: 'We received your message — Tironech',
    greeting: (name) => `Hi ${name},`,
    line1: 'Thank you for reaching out. We received your message and will get back to you within <strong>24 business hours</strong>.',
    line2: 'On our first call we will deliver an initial diagnosis of your technical situation — no commitment, no sales pitch.',
    next: 'What happens next:',
    steps: [
      '<strong>01 —</strong> We review your case and match it to the right expert.',
      '<strong>02 —</strong> We schedule a free 30-minute discovery session.',
      '<strong>03 —</strong> You receive a free initial technical diagnosis.',
    ],
    closing: 'Looking forward to talking with you.',
    signature: 'The Tironech Team',
    footer: 'High-value engineering. Verifiable results.',
  },
  es: {
    subject: 'Recibimos tu mensaje — Tironech',
    greeting: (name) => `Hola ${name},`,
    line1: 'Gracias por escribirnos. Recibimos tu mensaje y te contactaremos en menos de <strong>24 horas hábiles</strong>.',
    line2: 'En la primera llamada te entregamos un diagnóstico inicial de tu situación técnica — sin compromiso, sin discurso de ventas.',
    next: '¿Qué sigue?',
    steps: [
      '<strong>01 —</strong> Revisamos tu caso y lo asignamos al experto correcto.',
      '<strong>02 —</strong> Agendamos una sesión de descubrimiento gratuita de 30 minutos.',
      '<strong>03 —</strong> Recibes un diagnóstico técnico inicial sin costo.',
    ],
    closing: 'Nos vemos pronto.',
    signature: 'El equipo de Tironech',
    footer: 'Ingeniería de alto valor. Resultados verificables.',
  },
};

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function buildInternalEmail({ safeName, safeCompany, safeEmail, safeMarket, safeService, safeProblem, timestamp }) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:#1a1a1a;padding:28px 32px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#995e31;text-transform:uppercase;font-family:monospace;">TIRONECH · NUEVA CONSULTA</p>
            <h1 style="margin:8px 0 0;font-size:20px;color:#ffffff;font-weight:700;">${safeName} — ${safeCompany}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:130px;vertical-align:top;">Nombre</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a1a;font-weight:600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Empresa</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a1a;font-weight:600;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;">
                  <a href="mailto:${safeEmail}" style="color:#995e31;font-weight:600;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">País</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a1a;">${safeMarket}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Solución</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a1a;">${safeService}</td>
              </tr>
            </table>
            <div style="margin-top:24px;">
              <p style="margin:0 0 10px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Problema técnico</p>
              <div style="background:#f9f9f9;border-radius:8px;padding:18px;color:#1a1a1a;line-height:1.7;font-size:15px;border-left:3px solid #995e31;">
                ${safeProblem}
              </div>
            </div>
            <div style="margin-top:28px;padding:18px 20px;background:#fff8f0;border-radius:8px;border:1px solid #f0d9c4;">
              <p style="margin:0;font-size:13px;color:#995e31;line-height:1.5;">
                Responde directamente a este email para contactar al prospecto:<br>
                <a href="mailto:${safeEmail}" style="font-weight:700;color:#995e31;">${safeEmail}</a>
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #eee;">
            <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">Enviado el ${timestamp} · tironech.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildAutoReply({ safeName, safeService, lang }) {
  const t = AUTO_REPLY[lang] ?? AUTO_REPLY.es;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:32px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.18em;color:#995e31;text-transform:uppercase;font-family:monospace;">TIRONECH</p>
            <p style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;letter-spacing:-0.02em;">High-value engineering.</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 32px 28px;">
            <p style="margin:0 0 20px;font-size:17px;color:#1a1a1a;font-weight:600;">${t.greeting(safeName)}</p>
            <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.7;">${t.line1}</p>
            <p style="margin:0 0 28px;font-size:15px;color:#444;line-height:1.7;">${t.line2}</p>

            <!-- Steps -->
            <div style="background:#f9f9f9;border-radius:10px;padding:22px 24px;margin-bottom:28px;">
              <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.12em;color:#995e31;text-transform:uppercase;font-family:monospace;">${t.next}</p>
              ${t.steps.map(s => `<p style="margin:0 0 12px;font-size:14px;color:#333;line-height:1.6;">${s}</p>`).join('')}
            </div>

            <!-- Service badge -->
            <div style="background:#fff8f0;border:1px solid #f0d9c4;border-radius:8px;padding:14px 18px;margin-bottom:28px;">
              <p style="margin:0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.08em;font-family:monospace;">
                Solución / Solution: <span style="color:#995e31;font-weight:700;">${safeService}</span>
              </p>
            </div>

            <p style="margin:0 0 4px;font-size:15px;color:#444;">${t.closing}</p>
            <p style="margin:0;font-size:15px;color:#1a1a1a;font-weight:600;">${t.signature}</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a1a1a;padding:20px 32px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;color:#995e31;text-transform:uppercase;font-family:monospace;">tironech.com</p>
            <p style="margin:0;font-size:12px;color:#888;">${t.footer}</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, market, service, problem, lang: rawLang } = req.body ?? {};

  if (!name || !company || !email || !service || !problem) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const lang = rawLang === 'es' ? 'es' : 'en';

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });

  const safeName    = escapeHtml(name);
  const safeCompany = escapeHtml(company);
  const safeEmail   = escapeHtml(email);
  const safeMarket  = escapeHtml(market || '—');
  const safeService = escapeHtml(SERVICE_LABELS[lang][service] || service);
  const safeProblem = escapeHtml(problem).replaceAll('\n', '<br>');

  const timestamp = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const internalSubject = `[Tironech] Nueva consulta de ${name} — ${company}`;
  const internalHtml    = buildInternalEmail({ safeName, safeCompany, safeEmail, safeMarket, safeService, safeProblem, timestamp });

  try {
    await Promise.all([
      // Notificación a raul
      transporter.sendMail({
        from:    `"Tironech Web" <${process.env.ZOHO_EMAIL}>`,
        to:      'raul.gomez@tironech.com',
        replyTo: email,
        subject: internalSubject,
        html:    internalHtml,
      }),
      // Notificación a amalfi (email separado para mejor entregabilidad)
      transporter.sendMail({
        from:    `"Tironech Web" <${process.env.ZOHO_EMAIL}>`,
        to:      'amalfi.aya@tironech.com',
        replyTo: email,
        subject: internalSubject,
        html:    internalHtml,
      }),
      // Auto-reply → prospecto
      transporter.sendMail({
        from:    `"Tironech" <${process.env.ZOHO_EMAIL}>`,
        to:      email,
        replyTo: 'amalfi.aya@tironech.com',
        subject: AUTO_REPLY[lang].subject,
        html:    buildAutoReply({ safeName, safeService, lang }),
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SMTP error:', err.message);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
