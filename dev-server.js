import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

// Configuration multer pour l'upload de fichiers
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Endpoint pour les formulaires avec fichiers
app.post('/api/send-email', upload.single('cv'), async (req, res) => {
  console.log('=== DEBUT REQUETE ===');
  console.log('Has file:', !!req.file);
  console.log('Body:', req.body);
  
  try {
    let formType, formData;

    // Si c'est un FormData (avec fichier)
    if (req.file) {
      console.log('Processing FormData with file');
      formType = req.body.formType;
      formData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        message: req.body.message,
      };
    } else {
      console.log('Processing JSON without file');
      // Si c'est du JSON (sans fichier)
      const body = req.body;
      formType = body.formType;
      formData = body.formData;
    }

    console.log('FormType:', formType);
    console.log('FormData:', formData);

    if (!formType || !formData) {
      console.log('ERROR: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Import Resend dynamiquement
    const { Resend } = await import('resend');
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    let subject = '';
    let htmlContent = '';
    let attachments = [];

    // Préparer la pièce jointe si un fichier est présent
    if (req.file) {
      const fileContent = fs.readFileSync(req.file.path);
      attachments = [{
        filename: req.file.originalname,
        content: fileContent,
      }];
    }

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
          ${req.file ? `<p><strong>CV :</strong> ${req.file.originalname} (fichier joint)</p>` : ''}
          <hr>
          <p><em>Source : Formulaire Nous Rejoindre</em></p>
        `;
        break;

      default:
        return res.status(400).json({ error: 'Invalid form type' });
    }

    const emailData = {
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'contact@mana.fr',
      subject,
      html: htmlContent,
    };

    // Ajouter les pièces jointes si présentes
    if (attachments.length > 0) {
      emailData.attachments = attachments;
    }

    const result = await resend.emails.send(emailData);

    // Nettoyer le fichier temporaire
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    console.log('Email sent successfully:', result);

    return res.status(200).json({ 
      success: true, 
      messageId: result.data?.id,
      message: 'Email envoyé avec succès' 
    });

  } catch (error) {
    // Nettoyer le fichier temporaire en cas d'erreur
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up file:', cleanupError);
      }
    }

    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});