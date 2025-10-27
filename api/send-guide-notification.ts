// api/send-guide-notification.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GuideDownloadData {
  email: string;
  firstName: string;
  lastName: string;
  guideName: string;
  downloadedAt: string;
  userAgent: string;
}

function formatParisDateTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, guideName, downloadedAt, userAgent }: GuideDownloadData = req.body;

    if (!email || !firstName || !lastName || !guideName) {
      return res.status(400).json({
        error: 'Missing required fields: email, firstName, lastName, guideName',
      });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Formater la date en heure de Paris
    const downloadDate = downloadedAt ? new Date(downloadedAt) : new Date();
    const parisDateTime = formatParisDateTime(downloadDate);

    // Récupérer l'IP et le référent depuis les headers
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Non disponible';
    const referer = req.headers.referer || req.headers.referrer || 'Direct';

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau téléchargement — ${guideName}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #0C3D5E 0%, #dfaf2c 100%); padding: 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px; }
    .content { padding: 30px; }
    .section { margin-bottom: 24px; }
    .section h2 { color: #0C3D5E; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #dfaf2c; padding-bottom: 8px; }
    .kv-table { width: 100%; border-collapse: collapse; }
    .kv-table td { padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
    .kv-table .key { color: #64748b; width: 35%; font-weight: 500; }
    .kv-table .value { color: #0f2740; font-weight: 600; }
    .kv-table .value a { color: #0C3D5E; text-decoration: none; }
    .highlight { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; border-radius: 8px; padding: 16px; }
    .footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>📄 Nouveau téléchargement</h1>
      <p>Guide premium — ${guideName}</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Utilisateur -->
      <div class="section">
        <h2>👤 Utilisateur</h2>
        <table class="kv-table">
          <tr>
            <td class="key">Nom complet</td>
            <td class="value">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td class="key">Email</td>
            <td class="value">
              <a href="mailto:${email}">${email}</a>
            </td>
          </tr>
          <tr>
            <td class="key">Date & heure (Europe/Paris)</td>
            <td class="value">${parisDateTime}</td>
          </tr>
        </table>
      </div>

      <!-- Guide téléchargé -->
      <div class="section">
        <h2>📋 Guide téléchargé</h2>
        <div class="highlight">
          <strong>${guideName}</strong>
        </div>
      </div>

      <!-- Métadonnées techniques -->
      <div class="section">
        <h2>🔧 Métadonnées techniques</h2>
        <table class="kv-table">
          <tr>
            <td class="key">User Agent</td>
            <td class="value" style="font-size: 11px; word-break: break-word;">${userAgent || 'Non disponible'}</td>
          </tr>
          <tr>
            <td class="key">Adresse IP</td>
            <td class="value">${ip}</td>
          </tr>
          <tr>
            <td class="key">Référent</td>
            <td class="value" style="word-break: break-word;">${referer}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>MANA</strong> • Notification automatique ${new Date().getFullYear()}</p>
    </div>
  </div>
</body>
</html>
    `;

    const text = `
Nouveau téléchargement — ${guideName}

Utilisateur : ${firstName} ${lastName}
Email      : ${email}
Horodatage : ${parisDateTime} (Europe/Paris)

Guide téléchargé : ${guideName}

Métadonnées techniques
- User Agent : ${userAgent || 'Non disponible'}
- IP         : ${ip}
- Référent   : ${referer}

MANA • Notification automatique ${new Date().getFullYear()}
    `.trim();

    const emailData = {
      from: 'MANA <noreply@mana.fr>',
      to: ['contact@mana.fr'], // destinataires équipe
      subject: `Nouveau téléchargement Guide — ${firstName} ${lastName} — ${guideName}`,
      html,
      text,
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send notification email');
    }

    return res.status(200).json({
      success: true,
      message: 'Email de notification envoyé avec succès',
      data: result,
    });
  } catch (error) {
    console.error('❌ Erreur send-guide-notification:', error);
    return res.status(500).json({
      error: 'Erreur lors de l\'envoi de l\'email de notification',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}