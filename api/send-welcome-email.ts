// api/send-welcome-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface WelcomeEmailData {
  email: string;
  firstName: string;
  lastName: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName }: WelcomeEmailData = req.body;

    if (!email || !firstName) {
      return res.status(400).json({
        error: 'Missing required fields: email, firstName',
      });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // --- CONFIG expéditeur & routage ---
    const FROM_LABEL = 'MANA';
    const FROM_EMAIL = 'contact@mana.fr'; // demandé
    const BCC_SUPPORT = 'support_manamind@mana.fr'; // pour recevoir la copie
    const REPLY_TO = 'contact@mana.fr';

    const welcomeEmailData = {
      from: `${FROM_LABEL} <${FROM_EMAIL}>`,
      to: [email],
      // Ajoute une copie discrète côté support (tu peux passer en "cc" si tu préfères)
      bcc: [BCC_SUPPORT],
      reply_to: REPLY_TO,
      subject: `${firstName}, votre Managuide de l'innovation est prêt`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MANA • Managuide</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse !important; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
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
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Votre Managuide de l'innovation est prêt. Accès et prochaines étapes.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden;" class="card">
          <!-- Header -->
          <tr>
            <td style="background:#0C3D5E;padding:28px 32px;">
              <h1 style="margin:0;font-family:'Segoe UI', Arial, sans-serif;font-size:22px;line-height:1.35;color:#ffffff;font-weight:700;">
                Bienvenue ${firstName}
              </h1>
              <p style="margin:8px 0 0 0;font-family:'Segoe UI', Arial, sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.92);">
                Votre Managuide de l'innovation est prêt.
              </p>
            </td>
          </tr>

          <!-- Contenu -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:15px;line-height:1.75;color:#0f2740;" class="text-body">
                Merci pour votre confiance. Vous venez de télécharger le <strong>Managuide de l'innovation</strong>.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;border:1px solid #e5e9f0;border-radius:12px;">
                <tr>
                  <td style="padding:20px 20px 8px 20px;">
                    <h2 style="margin:0 0 8px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:16px;line-height:1.45;color:#0C3D5E;font-weight:700;">
                      Contenu clé
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 20px 20px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.65;color:#3b516b;">
                      <tr>
                        <td valign="top" style="width:26px;padding:6px 0;">
                          <span style="display:inline-block;background:#0C3D5E;color:#fff;width:22px;height:22px;border-radius:11px;font-size:12px;line-height:22px;text-align:center;font-weight:600;">1</span>
                        </td>
                        <td style="padding:6px 0;">12 méthodes essentielles d'innovation</td>
                      </tr>
                      <tr>
                        <td valign="top" style="width:26px;padding:6px 0;">
                          <span style="display:inline-block;background:#dfaf2c;color:#fff;width:22px;height:22px;border-radius:11px;font-size:12px;line-height:22px;text-align:center;font-weight:600;">2</span>
                        </td>
                        <td style="padding:6px 0;">Fiches pratiques prêtes à l'emploi</td>
                      </tr>
                      <tr>
                        <td valign="top" style="width:26px;padding:6px 0;">
                          <span style="display:inline-block;background:#0C3D5E;color:#fff;width:22px;height:22px;border-radius:11px;font-size:12px;line-height:22px;text-align:center;font-weight:600;">3</span>
                        </td>
                        <td style="padding:6px 0;">Cadres décisionnels pour prioriser et mesurer l'impact</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <hr class="divider" style="border:none;border-top:1px solid #e6edf3;margin:28px 0;" />
              <h3 style="margin:0 0 8px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:16px;line-height:1.45;color:#0C3D5E;font-weight:700;">
                Prochaines étapes
              </h3>
              <ul style="margin:8px 0 0 18px;padding:0;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.75;color:#3b516b;">
                <li>Identifier les méthodes adaptées à vos enjeux</li>
                <li>Lancer un test rapide sur un projet pilote</li>
                <li>Mesurer l'impact et itérer</li>
              </ul>

              <!-- Aucune redirection vers la page Managuide : volontairement omise -->
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f172a;padding:22px 32px;text-align:center;">
              <p style="margin:0 0 8px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.6;color:#ffffff;font-weight:600;">
                MANA
              </p>
              <p style="margin:0 0 16px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:12px;line-height:1.6;color:#94a3b8;">
                Contact : <a href="mailto:contact@mana.fr" style="color:#c7d2fe;text-decoration:none;">contact@mana.fr</a> · Site : <a href="https://mana.fr" style="color:#c7d2fe;text-decoration:none;">mana.fr</a>
              </p>
              <p style="margin:0;font-family:'Segoe UI', Arial, sans-serif;font-size:11px;line-height:1.6;color:#64748b;">
                Si vous ne souhaitez plus recevoir nos emails, 
                <a href="#" style="color:#8fa3bf;text-decoration:underline;">cliquez ici</a>
              </p>
            </td>
          </tr>
        </table>

        <div style="max-width:640px;margin-top:12px;color:#8aa0b8;font-family:'Segoe UI', Arial, sans-serif;font-size:11px;text-align:center;">
          Cet email a été envoyé à ${email}.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `
Bienvenue ${firstName}

Votre Managuide de l'innovation est prêt.

Contenu clé :
- 12 méthodes essentielles d'innovation
- Fiches pratiques prêtes à l'emploi
- Cadres décisionnels pour prioriser et mesurer l'impact

Prochaines étapes :
- Identifier les méthodes adaptées à vos enjeux
- Lancer un test rapide sur un projet pilote
- Mesurer l'impact et itérer

MANA — Contact : contact@mana.fr — https://mana.fr
Si vous ne souhaitez plus recevoir nos emails, cliquez ici.
      `,
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(welcomeEmailData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API welcome email error:', response.status, errorData);
      throw new Error(`Resend API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email de bienvenue envoyé:', result.id);

    return res.status(200).json({
      success: true,
      message: 'Email de bienvenue envoyé avec succès',
      emailId: result.id,
    });
  } catch (error) {
    console.error('Erreur email de bienvenue:', error);

    return res.status(500).json({
      success: false,
      error: "Erreur lors de l'envoi de l'email de bienvenue",
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
