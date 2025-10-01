import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Test endpoint simple
app.post('/api/send-email', async (req, res) => {
  console.log('=== REQUETE RECUE ===');
  console.log('FormType:', req.body.formType);
  console.log('FormData keys:', Object.keys(req.body.formData || {}));
  console.log('Has CV file:', !!req.body.formData?.cvBase64);
  console.log('CV filename:', req.body.formData?.cvFileName);
  
  try {
    const { formType, formData } = req.body;

    if (!formType || !formData) {
      console.log('ERROR: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Import Resend dynamiquement
    const { Resend } = await import('resend');
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    let subject = '';
    let htmlContent = '';

    // Configure email content based on form type
    switch (formType) {
      case 'contact-modal':
        subject = `[MANA Contact] Nouveau message de ${formData.firstName} ${formData.lastName}`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau contact MANA</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #0c3d5e 0%, #dfaf2c 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">📩 Nouveau Contact</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">Formulaire de contact du site MANA</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 30px;">
                <div style="background-color: #f8f9fa; border-left: 4px solid #dfaf2c; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                  <h2 style="color: #0c3d5e; margin: 0 0 15px 0; font-size: 18px;">Informations du contact</h2>
                  
                  <div style="margin-bottom: 15px;">
                    <span style="display: inline-block; width: 80px; font-weight: bold; color: #0c3d5e;">👤 Nom :</span>
                    <span style="color: #333;">${formData.firstName} ${formData.lastName}</span>
                  </div>
                  
                  <div style="margin-bottom: 15px;">
                    <span style="display: inline-block; width: 80px; font-weight: bold; color: #0c3d5e;">💼 Fonction :</span>
                    <span style="color: #333;">${formData.position}</span>
                  </div>
                  
                  <div style="margin-bottom: 0;">
                    <span style="display: inline-block; width: 80px; font-weight: bold; color: #0c3d5e;">📧 Email :</span>
                    <a href="mailto:${formData.email}" style="color: #dfaf2c; text-decoration: none;">${formData.email}</a>
                  </div>
                </div>
                
                <div style="background-color: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
                  <h3 style="color: #0c3d5e; margin: 0 0 15px 0; font-size: 16px;">💬 Message</h3>
                  <div style="color: #555; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${formData.message}</div>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #0c3d5e; padding: 20px; text-align: center;">
                <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 12px;">
                  📍 Source : Formulaire de contact modal • ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
                </p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      case 'manacademy':
        subject = `[MANA Academy] Nouvelle demande de formation`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demande MANA Academy</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #dfaf2c 0%, #0c3d5e 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">🎓 MANA Academy</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">Nouvelle demande de formation</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 30px;">
                <div style="background-color: #f8f9fa; border-left: 4px solid #dfaf2c; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                  <h2 style="color: #0c3d5e; margin: 0 0 20px 0; font-size: 18px;">👤 Informations du demandeur</h2>
                  
                  <div style="display: grid; gap: 12px;">
                    <div>
                      <span style="display: inline-block; width: 100px; font-weight: bold; color: #0c3d5e;">Nom :</span>
                      <span style="color: #333;">${formData.firstName} ${formData.lastName}</span>
                    </div>
                    <div>
                      <span style="display: inline-block; width: 100px; font-weight: bold; color: #0c3d5e;">Email :</span>
                      <a href="mailto:${formData.email}" style="color: #dfaf2c; text-decoration: none;">${formData.email}</a>
                    </div>
                    <div>
                      <span style="display: inline-block; width: 100px; font-weight: bold; color: #0c3d5e;">Entreprise :</span>
                      <span style="color: #333;">${formData.company}</span>
                    </div>
                    ${formData.position ? `<div>
                      <span style="display: inline-block; width: 100px; font-weight: bold; color: #0c3d5e;">Fonction :</span>
                      <span style="color: #333;">${formData.position}</span>
                    </div>` : ''}
                    ${formData.phone ? `<div>
                      <span style="display: inline-block; width: 100px; font-weight: bold; color: #0c3d5e;">Téléphone :</span>
                      <span style="color: #333;">${formData.phone}</span>
                    </div>` : ''}
                  </div>
                </div>
                
                ${formData.needType ? `<div style="background-color: #fff3cd; border: 1px solid #dfaf2c; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                  <h3 style="color: #0c3d5e; margin: 0 0 10px 0; font-size: 16px;">🎯 Type de besoin</h3>
                  <span style="background-color: #dfaf2c; color: white; padding: 5px 12px; border-radius: 15px; font-size: 14px; font-weight: 500;">${formData.needType}</span>
                </div>` : ''}
                
                <div style="background-color: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
                  <h3 style="color: #0c3d5e; margin: 0 0 15px 0; font-size: 16px;">💬 Détails du projet</h3>
                  <div style="color: #555; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${formData.message}</div>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #0c3d5e; padding: 20px; text-align: center;">
                <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 12px;">
                  📍 Source : Mana Academy • ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
                </p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      case 'nous-rejoindre':
        subject = `[MANA RH] Nouvelle candidature de ${formData.firstName} ${formData.lastName}`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Candidature MANA</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #0c3d5e 0%, #dfaf2c 50%, #0c3d5e 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">🚀 Nouvelle Candidature</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">Quelqu'un veut rejoindre l'équipe MANA !</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 30px;">
                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid #dfaf2c; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                  <h2 style="color: #0c3d5e; margin: 0 0 20px 0; font-size: 18px;">👤 Profil du candidat</h2>
                  
                  <div style="display: grid; gap: 12px;">
                    <div>
                      <span style="display: inline-block; width: 80px; font-weight: bold; color: #0c3d5e;">Nom :</span>
                      <span style="color: #333; font-size: 16px; font-weight: 500;">${formData.firstName} ${formData.lastName}</span>
                    </div>
                    <div>
                      <span style="display: inline-block; width: 80px; font-weight: bold; color: #0c3d5e;">Email :</span>
                      <a href="mailto:${formData.email}" style="color: #dfaf2c; text-decoration: none; font-weight: 500;">${formData.email}</a>
                    </div>
                  </div>
                </div>
                
                ${formData.cvFileName ? `<div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center;">
                  <h3 style="color: #155724; margin: 0 0 10px 0; font-size: 16px;">📎 CV Joint</h3>
                  <span style="background-color: #28a745; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                    📄 ${formData.cvFileName}
                  </span>
                </div>` : ''}
                
                <div style="background-color: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
                  <h3 style="color: #0c3d5e; margin: 0 0 15px 0; font-size: 16px;">💭 Message de motivation</h3>
                  <div style="color: #555; line-height: 1.8; font-size: 14px; white-space: pre-wrap; background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 3px solid #dfaf2c;">${formData.message}</div>
                </div>
                
                <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); border-radius: 8px; padding: 20px; margin-top: 25px; text-align: center;">
                  <p style="color: #856404; margin: 0; font-size: 14px; font-style: italic;">
                    ⭐ "Si tu penses que tu as le Mana, on a forcément un truc à construire ensemble !"
                  </p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #0c3d5e; padding: 20px; text-align: center;">
                <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 12px;">
                  📍 Source : Formulaire Nous Rejoindre • ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
                </p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      default:
        return res.status(400).json({ error: 'Invalid form type' });
    }

    console.log('About to send email with attachments:', !!formData.cvBase64);
    
    const emailConfig = {
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'contact@mana.fr',
      subject,
      html: htmlContent,
    };

    // Ajouter les pièces jointes si le fichier est présent
    if (formData.cvBase64 && formData.cvFileName) {
      console.log('Adding attachment:', formData.cvFileName);
      emailConfig.attachments = [{
        filename: formData.cvFileName,
        content: Buffer.from(formData.cvBase64.split(',')[1], 'base64'),
      }];
    }

    const result = await resend.emails.send(emailConfig);

    console.log('Email sent successfully:', result);

    return res.status(200).json({ 
      success: true, 
      messageId: result.data?.id,
      message: 'Email envoyé avec succès' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
});