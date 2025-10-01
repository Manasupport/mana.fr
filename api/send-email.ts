// api/send-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

function decodeBase64MaybeDataUrl(input?: string): Buffer | null {
  if (!input) return null;
  try {
    const base64 = input.includes(',')
      ? input.split(',').pop()! // data:<mime>;base64,XXXXX
      : input;
    return Buffer.from(base64, 'base64');
  } catch {
    return null;
  }
}

function formatParisDateTime(d: Date = new Date()) {
  const fmt = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  });
  return fmt.format(d);
}

function shellHTML({ title, subtitle, body, source }: { title: string; subtitle: string; body: string; source: string }) {
  // Gabarit commun, typographie Segoe UI, style sobre, accessible
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
<style>
  /* Reset email-safe minimal */
  body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100% }
  table { border-collapse:collapse !important }
  img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic }
  body { margin:0 !important; padding:0 !important; width:100% !important; background:#f6f8fb }
  a { color:#0C3D5E; text-decoration:none }
  .container { max-width:640px; margin:0 auto; background:#fff; border-radius:14px; overflow:hidden; box-shadow:0 6px 18px rgba(12,61,94,0.08) }
  .header { background:#0C3D5E; padding:28px 32px; text-align:center }
  .header h1 { margin:0; font:700 22px/1.35 'Segoe UI', Arial, sans-serif; color:#fff }
  .header p { margin:8px 0 0; font:400 14px/1.6 'Segoe UI', Arial, sans-serif; color:rgba(255,255,255,.9) }
  .body { padding:28px 32px }
  .section { background:#ffffff; border:1px solid #e7ecf3; border-radius:12px; padding:20px }
  .section + .section { margin-top:18px }
  .section h2 { margin:0 0 12px; font:700 16px/1.4 'Segoe UI', Arial, sans-serif; color:#0C3D5E }
  .kv { display:flex; justify-content:space-between; gap:12px; padding:10px 0; border-top:1px solid #eef2f7 }
  .kv:first-of-type { border-top:none }
  .kv .k { font:600 13px 'Segoe UI', Arial, sans-serif; color:#5b708b }
  .kv .v { font:400 14px 'Segoe UI', Arial, sans-serif; color:#0f2740; text-align:right }
  .message { font:400 14px/1.75 'Segoe UI', Arial, sans-serif; color:#3b516b; white-space:pre-wrap }
  .pill { display:inline-block; padding:6px 12px; border-radius:999px; font:600 13px 'Segoe UI', Arial, sans-serif; background:#f6f0de; color:#654d0a; border:1px solid #dfaf2c }
  .meta { background:#f4f6f9; border:1px dashed #d9e1ec; border-radius:8px; padding:12px; font:400 12px/1.6 'Segoe UI', Arial, sans-serif; color:#64748b }
  .footer { background:#0f172a; padding:22px 32px; text-align:center }
  .footer p { margin:0; color:#94a3b8; font:400 12px/1.6 'Segoe UI', Arial, sans-serif }
  .brand { color:#ffffff; font:600 14px 'Segoe UI', Arial, sans-serif; margin-bottom:6px }
  .divider { border:none; border-top:1px solid #e6edf3; margin:24px 0 }
  @media (prefers-color-scheme: dark) {
    body { background:#0b1220 }
    .container { background:#101826; box-shadow:0 6px 18px rgba(0,0,0,0.25) }
    .section { background:#111b2b; border-color:#1e2a3f }
    .kv { border-color:#223354 }
    .message { color:#cdd8e6 }
    .meta { background:#101826; border-color:#223354; color:#9fb0c8 }
    .footer { background:#0a0f1b }
    .header { background:#0C3D5E }
  }
</style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px">
        <table role="presentation" width="100%" class="container">
          <tr><td class="header">
            <h1>${title}</h1>
            <p>${subtitle}</p>
          </td></tr>
          <tr><td class="body">
            ${body}
          </td></tr>
          <tr><td class="footer">
            <div class="brand">MANA</div>
            <p>Notification automatique • ${source}</p>
          </td></tr>
        </table>
        <div style="max-width:640px;margin-top:10px;color:#8aa0b8;font:400 11px 'Segoe UI', Arial, sans-serif;text-align:center">
          Cet email est généré automatiquement par le site mana.fr.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* Sections spécifiques */

function contactModalHTML(fd: any) {
  const now = formatParisDateTime(new Date());
  const body = `
  <div class="section">
    <h2>Coordonnées</h2>
    <div class="kv"><div class="k">Nom</div><div class="v">${fd.firstName ?? ''} ${fd.lastName ?? ''}</div></div>
    ${fd.position ? `<div class="kv"><div class="k">Fonction</div><div class="v">${fd.position}</div></div>` : ''}
    <div class="kv"><div class="k">Email</div><div class="v"><a href="mailto:${fd.email}">${fd.email}</a></div></div>
  </div>
  <div class="section">
    <h2>Message</h2>
    <div class="message">${fd.message ?? ''}</div>
  </div>
  <div class="meta" style="margin-top:18px">
    Source : Contact (modal) • ${now}
  </div>`;
  return shellHTML({
    title: 'Nouveau message de contact',
    subtitle: 'Formulaire de contact – Site MANA',
    body,
    source: 'Contact',
  });
}

function manacademyHTML(fd: any) {
  const now = formatParisDateTime(new Date());
  const body = `
  <div class="section">
    <h2>Demandeur</h2>
    <div class="kv"><div class="k">Nom</div><div class="v">${fd.firstName ?? ''} ${fd.lastName ?? ''}</div></div>
    <div class="kv"><div class="k">Email</div><div class="v"><a href="mailto:${fd.email}">${fd.email}</a></div></div>
    ${fd.company ? `<div class="kv"><div class="k">Organisation</div><div class="v">${fd.company}</div></div>` : ''}
    ${fd.position ? `<div class="kv"><div class="k">Fonction</div><div class="v">${fd.position}</div></div>` : ''}
    ${fd.phone ? `<div class="kv"><div class="k">Téléphone</div><div class="v">${fd.phone}</div></div>` : ''}
  </div>
  ${fd.needType ? `
  <div class="section">
    <h2>Type de besoin</h2>
    <span class="pill">${fd.needType}</span>
  </div>` : ''}

  <div class="section">
    <h2>Détails du projet</h2>
    <div class="message">${fd.message ?? ''}</div>
  </div>

  <div class="meta" style="margin-top:18px">
    Source : Manacademy • ${now}
  </div>`;
  return shellHTML({
    title: 'Nouvelle demande de formation',
    subtitle: 'Manacademy – Demande entrante',
    body,
    source: 'Manacademy',
  });
}

function nousRejoindreHTML(fd: any) {
  const now = formatParisDateTime(new Date());
  const body = `
  <div class="section">
    <h2>Candidat</h2>
    <div class="kv"><div class="k">Nom</div><div class="v">${fd.firstName ?? ''} ${fd.lastName ?? ''}</div></div>
    <div class="kv"><div class="k">Email</div><div class="v"><a href="mailto:${fd.email}">${fd.email}</a></div></div>
    ${fd.phone ? `<div class="kv"><div class="k">Téléphone</div><div class="v">${fd.phone}</div></div>` : ''}
  </div>

  ${fd.cvFileName ? `
  <div class="section">
    <h2>Pièce jointe</h2>
    <div class="pill">${fd.cvFileName}</div>
  </div>` : ''}

  <div class="section">
    <h2>Message</h2>
    <div class="message">${fd.message ?? ''}</div>
  </div>

  <div class="meta" style="margin-top:18px">
    Source : Nous Rejoindre • ${now}
  </div>`;
  return shellHTML({
    title: 'Nouvelle candidature',
    subtitle: 'Ressources humaines – Candidature entrante',
    body,
    source: 'Nous Rejoindre',
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS minimal si posté depuis le front
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { formType, formData } = req.body || {};
    if (!formType || !formData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Import Resend dynamiquement
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    let subject = '';
    let htmlContent = '';

    if (formType === 'contact-modal') {
      subject = `[MANA Contact] Nouveau message de ${formData.firstName} ${formData.lastName}`;
      htmlContent = contactModalHTML(formData);
    } else if (formType === 'manacademy') {
      subject = `[MANA Academy] Nouvelle demande de formation`;
      htmlContent = manacademyHTML(formData);
    } else if (formType === 'nous-rejoindre') {
      subject = `[MANA RH] Nouvelle candidature de ${formData.firstName} ${formData.lastName}`;
      htmlContent = nousRejoindreHTML(formData);
    } else {
      return res.status(400).json({ error: 'Invalid form type' });
    }

    // Pièce jointe éventuelle
    const buf = decodeBase64MaybeDataUrl(formData.cvBase64);
    const attachments =
      buf && formData.cvFileName
        ? [{ filename: formData.cvFileName, content: buf }]
        : undefined;

    // Destinataire interne (peut être configuré par ENV)
    const to = process.env.CONTACT_EMAIL || 'contact@mana.fr';

    const result = await resend.emails.send({
      from: 'MANA <contact@mana.fr>',
      to,
      subject,
      html: htmlContent,
      attachments,
      // Permet de répondre directement à l'expéditeur côté messagerie
      reply_to: formData.email || undefined,
    });

    return res.status(200).json({
      success: true,
      messageId: result.data?.id,
      message: 'Email envoyé avec succès',
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: "Erreur lors de l'envoi de l'email",
      details: error?.message ?? 'Unknown error',
    });
  }
}
