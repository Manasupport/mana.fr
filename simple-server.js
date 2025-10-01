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
          <h2>Nouveau message depuis le formulaire de contact</h2>
          <p><strong>Prénom :</strong> ${formData.firstName}</p>
          <p><strong>Nom :</strong> ${formData.lastName}</p>
          <p><strong>Fonction :</strong> ${formData.position}</p>
          <p><strong>Email :</strong> ${formData.email}</p>
          <p><strong>Message :</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Source : Formulaire de contact modal</em></p>
        `;
        break;

      case 'manacademy':
        subject = `[MANA Academy] Nouvelle demande de formation`;
        htmlContent = `
          <h2>Nouvelle demande depuis Mana Academy</h2>
          <p><strong>Prénom :</strong> ${formData.firstName}</p>
          <p><strong>Nom :</strong> ${formData.lastName}</p>
          <p><strong>Email :</strong> ${formData.email}</p>
          <p><strong>Entreprise :</strong> ${formData.company}</p>
          <p><strong>Fonction :</strong> ${formData.position}</p>
          <p><strong>Téléphone :</strong> ${formData.phone}</p>
          <p><strong>Type de besoin :</strong> ${formData.needType}</p>
          <p><strong>Message :</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Source : Formulaire Mana Academy</em></p>
        `;
        break;

      case 'nous-rejoindre':
        subject = `[MANA RH] Nouvelle candidature de ${formData.firstName} ${formData.lastName}`;
        htmlContent = `
          <h2>Nouvelle candidature spontanée</h2>
          <p><strong>Prénom :</strong> ${formData.firstName}</p>
          <p><strong>Nom :</strong> ${formData.lastName}</p>
          <p><strong>Email :</strong> ${formData.email}</p>
          <p><strong>Message :</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
          ${formData.cvFileName ? `<p><strong>CV :</strong> ${formData.cvFileName} (fichier joint)</p>` : ''}
          <hr>
          <p><em>Source : Formulaire Nous Rejoindre</em></p>
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