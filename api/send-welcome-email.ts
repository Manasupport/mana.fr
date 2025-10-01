// api/send-welcome-email.ts (remplace uniquement welcomeEmailData)
const welcomeEmailData = {
  from: 'MANA <contact@mana.fr>',
  to: [email],
  subject: `${firstName}, votre Managuide de l'innovation est prêt`,
  html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>MANA • Managuide</title>
      <style>
        /* Reset email-safe minimal */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table { border-collapse: collapse !important; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        /* Dark mode friendly (optionnel) */
        @media (prefers-color-scheme: dark) {
          body, .bg-page { background-color: #0b1220 !important; }
          .card, .muted { background-color: #121a2b !important; }
          .text-body { color: #e6edf5 !important; }
          .text-muted { color: #9fb0c8 !important; }
          .divider { border-color: #223354 !important; }
        }
      </style>
    </head>
    <body style="background:#f6f8fb;" class="bg-page">
      <!-- Preheader (invisible) -->
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
        Votre Managuide de l'innovation est disponible. Accès et étapes clés à suivre.
      </div>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;">
        <tr>
          <td align="center" style="padding:40px 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden;" class="card">
              <!-- Header bandeau -->
              <tr>
                <td style="background:#0C3D5E;padding:28px 32px;">
                  <h1 style="margin:0;font-family:'Segoe UI', Arial, sans-serif;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">
                    Bienvenue ${firstName}
                  </h1>
                  <p style="margin:8px 0 0 0;font-family:'Segoe UI', Arial, sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.92);">
                    Votre Managuide de l'innovation est prêt.
                  </p>
                </td>
              </tr>

              <!-- Contenu principal -->
              <tr>
                <td style="padding:28px 32px;">
                  <p style="margin:0 0 16px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:15px;line-height:1.7;color:#0f2740;" class="text-body">
                    Merci pour votre confiance. Vous venez de télécharger le <strong>Managuide de l'innovation</strong>.
                  </p>

                  <!-- Bloc points clés -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;border:1px solid #e5e9f0;border-radius:12px;">
                    <tr>
                      <td style="padding:20px 20px 8px 20px;">
                        <h2 style="margin:0 0 8px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:16px;line-height:1.4;color:#0C3D5E;font-weight:700;">
                          Ce que vous allez retrouver
                        </h2>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 20px 20px 20px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.65;color:#3b516b;">
                          <tr>
                            <td valign="top" style="width:26px;padding:6px 0;"><span style="display:inline-block;background:#0C3D5E;color:#fff;width:22px;height:22px;border-radius:11px;font-size:12px;line-height:22px;text-align:center;font-weight:600;">1</span></td>
                            <td style="padding:6px 0;">12 méthodes essentielles d'innovation</td>
                          </tr>
                          <tr>
                            <td valign="top" style="width:26px;padding:6px 0;"><span style="display:inline-block;background:#dfaf2c;color:#fff;width:22px;height:22px;border-radius:11px;font-size:12px;line-height:22px;text-align:center;font-weight:600;">2</span></td>
                            <td style="padding:6px 0;">Fiches pratiques prêtes à l'emploi</td>
                          </tr>
                          <tr>
                            <td valign="top" style="width:26px;padding:6px 0;"><span style="display:inline-block;background:#0C3D5E;color:#fff;width:22px;height:22px;border-radius:11px;font-size:12px;line-height:22px;text-align:center;font-weight:600;">3</span></td>
                            <td style="padding:6px 0;">Cadres décisionnels pour prioriser et mesurer l'impact</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Lien d'accès discret (pas de gros bouton) -->
                  <p style="margin:18px 0 0 0;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.65;color:#3b516b;">
                    Accéder au guide : 
                    <a href="https://mana.fr/publications/managuide-innovation" style="color:#0C3D5E;text-decoration:underline;">https://mana.fr/publications/managuide-innovation</a>
                  </p>

                  <!-- Prochaines étapes -->
                  <hr class="divider" style="border:none;border-top:1px solid #e6edf3;margin:28px 0;" />
                  <h3 style="margin:0 0 8px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:16px;line-height:1.4;color:#0C3D5E;font-weight:700;">
                    Prochaines étapes
                  </h3>
                  <ul style="margin:8px 0 0 18px;padding:0;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.7;color:#3b516b;">
                    <li>Identifier les méthodes adaptées à vos enjeux</li>
                    <li>Lancer un test rapide sur un projet pilote</li>
                    <li>Mesurer l'impact et itérer</li>
                  </ul>

                  <!-- Ressources complémentaires -->
                  <div style="margin:24px 0 0 0;padding:16px 16px;border:1px solid #e5e9f0;border-radius:12px;background:#fafbfc;">
                    <p style="margin:0 0 6px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.6;color:#0C3D5E;font-weight:700;">
                      Ressources complémentaires
                    </p>
                    <p style="margin:0;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.65;color:#3b516b;">
                      Publications : <a href="https://mana.fr/publications" style="color:#0C3D5E;text-decoration:underline;">https://mana.fr/publications</a><br/>
                      Manacademy : <a href="https://mana.fr/manacademy" style="color:#0C3D5E;text-decoration:underline;">https://mana.fr/manacademy</a><br/>
                      Manadvise : <a href="https://mana.fr/manadvise" style="color:#0C3D5E;text-decoration:underline;">https://mana.fr/manadvise</a>
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#0f172a;padding:22px 32px;text-align:center;">
                  <p style="margin:0 0 8px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:14px;line-height:1.6;color:#ffffff;font-weight:600;">
                    MANA Innovation
                  </p>
                  <p style="margin:0 0 16px 0;font-family:'Segoe UI', Arial, sans-serif;font-size:12px;line-height:1.6;color:#94a3b8;">
                    Contact : <a href="mailto:contact@mana.fr" style="color:#c7d2fe;text-decoration:none;">hello@mana.fr</a> · Site : <a href="https://mana.fr" style="color:#c7d2fe;text-decoration:none;">mana.fr</a>
                  </p>
                  <p style="margin:0;font-family:'Segoe UI', Arial, sans-serif;font-size:11px;line-height:1.6;color:#64748b;">
                    Si vous ne souhaitez plus recevoir nos emails, 
                    <a href="#" style="color:#8fa3bf;text-decoration:underline;">cliquez ici</a>
                  </p>
                </td>
              </tr>
            </table>

            <!-- Micro note conformité -->
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

Contenu :
- 12 méthodes essentielles d'innovation
- Fiches pratiques prêtes à l'emploi
- Cadres décisionnels pour prioriser et mesurer l'impact

Accéder au guide :
https://mana.fr/publications/managuide-innovation

Prochaines étapes :
- Identifier les méthodes pertinentes
- Lancer un test sur un projet pilote
- Mesurer l'impact et itérer

Ressources complémentaires :
- Publications : https://mana.fr/publications
- Manacademy : https://mana.fr/manacademy
- Manadvise : https://mana.fr/manadvise

MANA — Contact : contact@mana.fr — https://mana.fr
Si vous ne souhaitez plus recevoir nos emails, cliquez ici.
  `
};
