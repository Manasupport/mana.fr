// api/send-managuide-notification.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ManaguideDownloadData {
  email: string;
  firstName: string;
  lastName: string;
  downloadedAt: string; // ISO string attendu
  userAgent: string;
}

const formatParisDateTime = (iso?: string) => {
  const date = iso ? new Date(iso) : new Date();
  // Format robuste en Europe/Paris (gère automatiquement l'heure d'été/hiver)
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, downloadedAt, userAgent }: ManaguideDownloadData = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).json({
        error: 'Missing required fields: email, firstName, lastName',
      });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const parisDateTime = formatParisDateTime(downloadedAt);
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'Non disponible';
    const referer = (req.headers.referer as string) || 'Direct';

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MANA • Notification Managuide</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse !important; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background:#f6f8fb; }
    @media (prefers-color-scheme: dark) {
      body, .bg-page { background-color: #0b1220 !important; }
      .card { background-color: #121a2b !important; }
      .text-body { color: #e6edf5 !important; }
      .text-muted { color: #9fb0c8 !important; }
      .divider { border-color: #223354 !important; }
    }
  </style>
</head>
<body style="background:#f6f8fb;" class="bg-page">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border-radius:14px;overflow:hidden;" class="card">
          <!-- Header -->
          <tr>
            <td style="background:#0C3D5E;padding:24px 28px;">
              <h1 style="margin:0;font-family:'Segoe UI', Arial, sans-serif;font-size:18px;line-height:1.4;color:#ffffff;font-weight:700;">
                Nouveau téléchargement — Managuide
              </h1>
              <p style="margin:6px 0 0 0;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.6;color:rgba(255,255,255,0.92);">
                Détails de l'utilisateur et horodatage (Europe/Paris)
              </p>
            </td>
          </tr>

          <!-- Contenu -->
          <tr>
            <td style="padding:24px 28px;">
              <!-- Bloc infos -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6edf3;border-radius:12px;">
                <tr>
                  <td style="padding:16px 18px;border-bottom:1px solid #e6edf3;background:#fafbfc;">
                    <h2 style="margin:0;font-family:'Segoe UI', Arial, sans-serif;font-size:15px;line-height:1.4;color:#0C3D5E;font-weight:700;">
                      Informations utilisateur
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.7;color:#0f2740;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:'Segoe UI', Arial, sans-serif;font-size:14px;color:#0f2740;">
                      <tr>
                        <td style="padding:8px 0;color:#64748b;width:38%;">Nom complet</td>
                        <td style="padding:8px 0;color:#0f2740;font-weight:600;">${firstName} ${lastName}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#64748b;">Email</td>
                        <td style="padding:8px 0;">
                          <a href="mailto:${email}" style="color:#0C3D5E;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#64748b;">Date & heure (Europe/Paris)</td>
                        <td style="padding:8px 0;">${parisDateTime}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Métadonnées -->
              <div style="margin-top:16px;padding:14px 16px;border:1px solid #e6edf3;border-radius:12px;background:#ffffff;">
                <p style="margin:0 0 8px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:13px;line-height:1.6;color:#0C3D5E;font-weight:700;">
                  Métadonnées techniques
                </p>
                <p style="margin:0;font-family:'Segoe UI', Arial, sans-serif;font-size:12px;line-height:1.7;color:#3b516b;">
                  User Agent : ${userAgent || 'Non disponible'}<br/>
                  IP : ${ip}<br/>
                  Référent : ${referer}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f172a;padding:18px 28px;text-align:center;">
              <p style="margin:0;font-family:'Segoe UI', Arial, sans-serif;font-size:12px;line-height:1.6;color:#94a3b8;">
                Notification automatique MANA · ${new Date().getFullYear()}
              </p>
            </td>
          </tr>
        </table>

        <!-- Micro note -->
        <div style="max-width:680px;margin-top:10px;color:#8aa0b8;font-family:'Segoe UI', Arial, sans-serif;font-size:11px;text-align:center;">
          Europe/Paris — l'heure affichée tient compte du fuseau et des changements saisonniers.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const text = `
Nouveau téléchargement — Managuide

Utilisateur : ${firstName} ${lastName}
Email      : ${email}
Horodatage : ${parisDateTime} (Europe/Paris)

Métadonnées techniques
- User Agent : ${userAgent || 'Non disponible'}
- IP         : ${ip}
- Référent   : ${referer}

MANA • Notification automatique ${new Date().getFullYear()}
    `.trim();

    const emailData = {
      from: 'MANA <noreply@mana.fr>',
      to: ['contact@mana.fr'], // destinataires équipe
      subject: `Nouveau téléchargement Managuide — ${firstName} ${lastName}`,
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

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', response.status, errorData);
      throw new Error(`Resend API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Notification envoyée:', result.id);

    return res.status(200).json({
      success: true,
      message: 'Email de notification envoyé avec succès',
      emailId: result.id,
      userData: { email, firstName, lastName, downloadedAt },
    });
  } catch (error) {
    console.error('Erreur lors de l’envoi de la notification:', error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de l'envoi de l'email de notification",
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
