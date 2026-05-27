import nodemailer from 'nodemailer';

const RECIPIENTS = ['raul.gomez@tironech.com', 'amalfi.aya@tironech.com'];

const SERVICE_LABELS = {
  'qa':             'QA Consulting & Automation',
  'ai-shield':      'AI Quality Shield',
  'web-app':        'Web / App Development',
  'fractional-cto': 'Fractional CTO + Dev Team',
  'edge-ai':        'Edge AI Vision Sprint',
  'otros':          'Other / Not sure',
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, market, service, problem } = req.body ?? {};

  if (!name || !company || !email || !service || !problem) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

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
  const safeService = escapeHtml(SERVICE_LABELS[service] || service);
  const safeProblem = escapeHtml(problem).replace(/\n/g, '<br>');

  const timestamp = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:28px 32px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#995e31;text-transform:uppercase;font-family:monospace;">TIRONECH · NUEVA CONSULTA</p>
            <h1 style="margin:8px 0 0;font-size:20px;color:#ffffff;font-weight:700;">${safeName} — ${safeCompany}</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:130px;vertical-align:top;">Nombre</td>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#1a1a1a;font-weight:600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Empresa</td>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#1a1a1a;font-weight:600;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
                  <a href="mailto:${safeEmail}" style="color:#995e31;font-weight:600;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">País / Mercado</td>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#1a1a1a;">${safeMarket}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Solución</td>
                <td style="padding:10px 0;border-bottom:1px solid #eeeeee;color:#1a1a1a;">${safeService}</td>
              </tr>
            </table>

            <div style="margin-top:24px;">
              <p style="margin:0 0 10px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Problema técnico</p>
              <div style="background:#f9f9f9;border-radius:8px;padding:18px;color:#1a1a1a;line-height:1.7;font-size:15px;border-left:3px solid #995e31;">
                ${safeProblem}
              </div>
            </div>

            <!-- Reply CTA -->
            <div style="margin-top:28px;padding:18px 20px;background:#fff8f0;border-radius:8px;border:1px solid #f0d9c4;">
              <p style="margin:0;font-size:13px;color:#995e31;line-height:1.5;">
                Responde directamente a este email para contactar al prospecto:<br>
                <a href="mailto:${safeEmail}" style="font-weight:700;color:#995e31;">${safeEmail}</a>
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #eee;">
            <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
              Enviado el ${timestamp} · tironech.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Tironech Web" <${process.env.ZOHO_EMAIL}>`,
      to: RECIPIENTS,
      replyTo: email,
      subject: `[Tironech] Nueva consulta de ${name} — ${company}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SMTP error:', err.message);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
