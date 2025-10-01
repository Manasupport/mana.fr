import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formType, formData } = req.body;

    if (!formType || !formData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Import Resend here to avoid issues with serverless
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

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // Email de test RESEND
      to: process.env.CONTACT_EMAIL || 'contact@mana.fr',
      subject,
      html: htmlContent,
    });

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
}