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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS minimal (si tu postes depuis le front)
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

    // Import Resend dynamiquement (bon pour les fonctions serverless)
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // === TEMPLATES HTML (version “belle” que tu avais en local) ===
    let subject = '';
    let htmlContent = '';

    if (formType === 'contact-modal') {
      subject = `[MANA Contact] Nouveau message de ${formData.firstName} ${formData.lastName}`;
      htmlContent = `
        <!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Nouveau contact MANA</title></head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f5f5f5">
          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.1)">
            <div style="background:linear-gradient(135deg,#0c3d5e 0%,#dfaf2c 100%);padding:30px;text-align:center">
              <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700">📩 Nouveau Contact</h1>
              <p style="color:rgba(255,255,255,.9);margin:5px 0 0;font-size:14px">Formulaire de contact du site MANA</p>
            </div>
            <div style="padding:30px">
              <div style="background:#f8f9fa;border-left:4px solid #dfaf2c;padding:20px;margin-bottom:25px;border-radius:0 8px 8px 0">
                <h2 style="color:#0c3d5e;margin:0 0 15px;font-size:18px">Informations du contact</h2>
                <div style="margin-bottom:15px"><span style="display:inline-block;width:80px;font-weight:700;color:#0c3d5e">👤 Nom :</span>
                  <span style="color:#333">${formData.firstName} ${formData.lastName}</span></div>
                <div style="margin-bottom:15px"><span style="display:inline-block;width:80px;font-weight:700;color:#0c3d5e">💼 Fonction :</span>
                  <span style="color:#333">${formData.position ?? ''}</span></div>
                <div><span style="display:inline-block;width:80px;font-weight:700;color:#0c3d5e">📧 Email :</span>
                  <a href="mailto:${formData.email}" style="color:#dfaf2c;text-decoration:none">${formData.email}</a></div>
              </div>
              <div style="background:#fff;border:1px solid #e9ecef;border-radius:8px;padding:20px">
                <h3 style="color:#0c3d5e;margin:0 0 15px;font-size:16px">💬 Message</h3>
                <div style="color:#555;line-height:1.6;font-size:14px;white-space:pre-wrap">${formData.message ?? ''}</div>
              </div>
            </div>
            <div style="background:#0c3d5e;padding:20px;text-align:center">
              <p style="color:rgba(255,255,255,.8);margin:0;font-size:12px">📍 Source : Contact modal • ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            </div>
          </div>
        </body></html>`;
    } else if (formType === 'manacademy') {
      subject = `[MANA Academy] Nouvelle demande de formation`;
      htmlContent = `
        <!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Demande MANA Academy</title></head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f5f5f5">
          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.1)">
            <div style="background:linear-gradient(135deg,#dfaf2c 0%,#0c3d5e 100%);padding:30px;text-align:center">
              <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700">🎓 MANA Academy</h1>
              <p style="color:rgba(255,255,255,.9);margin:5px 0 0;font-size:14px">Nouvelle demande de formation</p>
            </div>
            <div style="padding:30px">
              <div style="background:#f8f9fa;border-left:4px solid #dfaf2c;padding:20px;margin-bottom:25px;border-radius:0 8px 8px 0">
                <h2 style="color:#0c3d5e;margin:0 0 20px;font-size:18px">👤 Informations du demandeur</h2>
                <div style="display:grid;gap:12px">
                  <div><span style="display:inline-block;width:100px;font-weight:700;color:#0c3d5e">Nom :</span><span style="color:#333">${formData.firstName} ${formData.lastName}</span></div>
                  <div><span style="display:inline-block;width:100px;font-weight:700;color:#0c3d5e">Email :</span><a href="mailto:${formData.email}" style="color:#dfaf2c;text-decoration:none">${formData.email}</a></div>
                  <div><span style="display:inline-block;width:100px;font-weight:700;color:#0c3d5e">Entreprise :</span><span style="color:#333">${formData.company ?? ''}</span></div>
                  ${formData.position ? `<div><span style="display:inline-block;width:100px;font-weight:700;color:#0c3d5e">Fonction :</span><span style="color:#333">${formData.position}</span></div>` : ''}
                  ${formData.phone ? `<div><span style="display:inline-block;width:100px;font-weight:700;color:#0c3d5e">Téléphone :</span><span style="color:#333">${formData.phone}</span></div>` : ''}
                </div>
              </div>
              ${formData.needType ? `<div style="background:#fff3cd;border:1px solid #dfaf2c;border-radius:8px;padding:15px;margin-bottom:20px">
                <h3 style="color:#0c3d5e;margin:0 0 10px;font-size:16px">🎯 Type de besoin</h3>
                <span style="background:#dfaf2c;color:#fff;padding:5px 12px;border-radius:15px;font-size:14px;font-weight:500">${formData.needType}</span>
              </div>` : ''}
              <div style="background:#fff;border:1px solid #e9ecef;border-radius:8px;padding:20px">
                <h3 style="color:#0c3d5e;margin:0 0 15px;font-size:16px">💬 Détails du projet</h3>
                <div style="color:#555;line-height:1.6;font-size:14px;white-space:pre-wrap">${formData.message ?? ''}</div>
              </div>
            </div>
            <div style="background:#0c3d5e;padding:20px;text-align:center">
              <p style="color:rgba(255,255,255,.8);margin:0;font-size:12px">📍 Source : Mana Academy • ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            </div>
          </div>
        </body></html>`;
    } else if (formType === 'nous-rejoindre') {
      subject = `[MANA RH] Nouvelle candidature de ${formData.firstName} ${formData.lastName}`;
      htmlContent = `
        <!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Candidature MANA</title></head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f5f5f5">
          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.1)">
            <div style="background:linear-gradient(135deg,#0c3d5e 0%,#dfaf2c 50%,#0c3d5e 100%);padding:30px;text-align:center">
              <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700">🚀 Nouvelle Candidature</h1>
              <p style="color:rgba(255,255,255,.9);margin:5px 0 0;font-size:14px">Quelqu'un veut rejoindre l'équipe MANA !</p>
            </div>
            <div style="padding:30px">
              <div style="background:linear-gradient(135deg,#f8f9fa 0%,#e9ecef 100%);border-left:4px solid #dfaf2c;padding:20px;margin-bottom:25px;border-radius:0 8px 8px 0">
                <h2 style="color:#0c3d5e;margin:0 0 20px;font-size:18px">👤 Profil du candidat</h2>
                <div style="display:grid;gap:12px">
                  <div><span style="display:inline-block;width:80px;font-weight:700;color:#0c3d5e">Nom :</span><span style="color:#333;font-size:16px;font-weight:500">${formData.firstName} ${formData.lastName}</span></div>
                  <div><span style="display:inline-block;width:80px;font-weight:700;color:#0c3d5e">Email :</span><a href="mailto:${formData.email}" style="color:#dfaf2c;text-decoration:none;font-weight:500">${formData.email}</a></div>
                </div>
              </div>
              ${formData.cvFileName ? `<div style="background:#d4edda;border:1px solid #c3e6cb;border-radius:8px;padding:15px;margin-bottom:20px;text-align:center">
                <h3 style="color:#155724;margin:0 0 10px;font-size:16px">📎 CV Joint</h3>
                <span style="background:#28a745;color:#fff;padding:8px 16px;border-radius:20px;font-size:14px;font-weight:500">📄 ${formData.cvFileName}</span>
              </div>` : ''}
              <div style="background:#fff;border:1px solid #e9ecef;border-radius:8px;padding:20px">
                <h3 style="color:#0c3d5e;margin:0 0 15px;font-size:16px">💭 Message de motivation</h3>
                <div style="color:#555;line-height:1.8;font-size:14px;white-space:pre-wrap;background:#f8f9fa;padding:15px;border-radius:6px;border-left:3px solid #dfaf2c">${formData.message ?? ''}</div>
              </div>
            </div>
            <div style="background:#0c3d5e;padding:20px;text-align:center">
              <p style="color:rgba(255,255,255,.8);margin:0;font-size:12px">📍 Source : Nous Rejoindre • ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            </div>
          </div>
        </body></html>`;
    } else {
      return res.status(400).json({ error: 'Invalid form type' });
    }

    // === Pièce jointe (base64) si envoyée depuis le front ===
    // Supporte base64 pur OU data URL base64
    const buf = decodeBase64MaybeDataUrl(formData.cvBase64);
    const attachments =
      buf && formData.cvFileName
        ? [{ filename: formData.cvFileName, content: buf }]
        : undefined;

    // Destinataire par défaut (tu peux router selon formType/page si besoin)
    const to = process.env.CONTACT_EMAIL || 'contact@mana.fr';

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // passe à "support_manamind@manadvise.fr" quand ton domaine est Verified
      to,
      subject,
      html: htmlContent,
      attachments,
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
