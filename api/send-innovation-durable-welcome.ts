// api/send-innovation-durable-welcome.ts
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
    const FROM_EMAIL = 'contact@mana.fr';
    const REPLY_TO = 'contact@mana.fr';

    const welcomeEmailData = {
      from: `${FROM_LABEL} <${FROM_EMAIL}>`,
      to: [email],
      reply_to: REPLY_TO,
      subject: `${firstName}, votre guide "Innovation Durable" est prêt`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MANA • Innovation Durable</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse !important; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    @media (prefers-color-scheme: dark) {
      .light-mode-only { display: none !important; }
      .dark-mode-only { display: block !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Segoe UI', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.1);">
          
          <!-- Header avec dégradé premium -->
          <tr>
            <td style="background:linear-gradient(135deg, #0c3d5e 0%, #22c55e 50%, #0c3d5e 100%);padding:40px 30px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:700;text-shadow:0 2px 4px rgba(0,0,0,0.3);">
                🌱 Innovation Durable
              </h1>
              <p style="color:rgba(255,255,255,0.9);margin:8px 0 0 0;font-size:16px;font-weight:400;">
                Du concept à l'action
              </p>
            </td>
          </tr>

          <!-- Message principal -->
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="color:#0c3d5e;margin:0 0 20px 0;font-size:20px;font-weight:600;">
                Bonjour ${firstName} ! 👋
              </h2>
              
              <p style="color:#475569;margin:0 0 20px 0;font-size:16px;line-height:1.6;">
                Votre guide <strong>"Innovation Durable : du concept à l'action"</strong> est prêt à télécharger.
              </p>

              <!-- Contenu clé avec icônes -->
              <div style="background:linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);border:1px solid #bbf7d0;border-radius:12px;padding:24px;margin:24px 0;">
                <h3 style="color:#166534;margin:0 0 16px 0;font-size:18px;font-weight:600;">
                  📋 Ce que vous allez découvrir :
                </h3>
                <ul style="color:#166534;margin:0;padding-left:20px;font-size:15px;line-height:1.7;">
                  <li><strong>Innovation frugale</strong> — Faire mieux avec moins</li>
                  <li><strong>Éco-conception</strong> — Intégrer l'environnement dès la conception</li>
                  <li><strong>Éco-innovation</strong> — Réorienter vers les usages</li>
                  <li><strong>Business Models circulaires</strong> — Quitter la logique linéaire</li>
                </ul>
              </div>

              <!-- Prochaines étapes -->
              <div style="background:linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);border:1px solid #bfdbfe;border-radius:12px;padding:24px;margin:24px 0;">
                <h3 style="color:#1e40af;margin:0 0 16px 0;font-size:18px;font-weight:600;">
                  🚀 Prochaines étapes :
                </h3>
                <ul style="color:#1e40af;margin:0;padding-left:20px;font-size:15px;line-height:1.7;">
                  <li>Identifier les approches adaptées à vos enjeux</li>
                  <li>Lancer un projet pilote d'innovation durable</li>
                  <li>Mesurer l'impact et itérer</li>
                </ul>
              </div>

              <div style="margin:32px 0 24px 0;">
                <p style="color:#475569;margin:0;font-size:15px;line-height:1.6;">
                  Besoin d'accompagnement pour mettre en œuvre ces approches ? Notre équipe est là pour vous aider.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f1f5f9;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 16px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.6;color:#475569;">
                <strong style="color:#0c3d5e;">MANA</strong> — 
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
Bonjour ${firstName}

Votre guide "Innovation Durable : du concept à l'action" est prêt.

Contenu clé :
- Innovation frugale — Faire mieux avec moins
- Éco-conception — Intégrer l'environnement dès la conception
- Éco-innovation — Réorienter vers les usages
- Business Models circulaires — Quitter la logique linéaire

Prochaines étapes :
- Identifier les approches adaptées à vos enjeux
- Lancer un projet pilote d'innovation durable
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

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    return res.status(200).json({
      success: true,
      message: 'Email de bienvenue envoyé avec succès',
      data: result,
    });
  } catch (error) {
    console.error('❌ Erreur send-innovation-durable-welcome:', error);
    return res.status(500).json({
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}