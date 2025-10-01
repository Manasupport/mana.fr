// api/send-managuide-notification.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ManaguideDownloadData {
  email: string;
  firstName: string;
  lastName: string;
  downloadedAt: string;
  userAgent: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, downloadedAt, userAgent }: ManaguideDownloadData = req.body;

    // Validation des données
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, firstName, lastName' 
      });
    }

    // Configuration Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Préparer le contenu de l'email
    const emailData = {
      from: 'MANA <noreply@mana.fr>',
      to: ['support@manadvise.fr'], // Remplacez par votre email de notification
      subject: `🎯 Nouveau téléchargement Managuide - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: 'Inter', 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0c3d5e 0%, #dfaf2c 100%); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">
              📚 Nouveau téléchargement Managuide
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">
              Un nouvel utilisateur a accédé au guide innovation
            </p>
          </div>
          
          <!-- Contenu -->
          <div style="padding: 32px;">
            <!-- Infos utilisateur -->
            <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h2 style="color: #0c3d5e; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                👤 Informations utilisateur
              </h2>
              <div style="display: grid; gap: 12px;">
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b;">Nom complet:</span>
                  <span style="color: #0f172a;">${firstName} ${lastName}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b;">Email:</span>
                  <a href="mailto:${email}" style="color: #0c3d5e; text-decoration: none;">${email}</a>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b;">Date & heure:</span>
                  <span style="color: #0f172a;">${new Date(downloadedAt).toLocaleString('fr-FR')}</span>
                </div>
              </div>
            </div>
            
            <!-- Actions suggérées -->
            <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h3 style="color: #0c3d5e; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">
                🚀 Actions suggérées
              </h3>
              <ul style="margin: 0; padding-left: 20px; color: #475569;">
                <li style="margin-bottom: 8px;">Ajouter à la liste de diffusion innovation</li>
                <li style="margin-bottom: 8px;">Envoyer un email de suivi personnalisé</li>
                <li style="margin-bottom: 8px;">Proposer un entretien découverte</li>
                <li>Inviter aux prochains webinaires MANA</li>
              </ul>
            </div>
            
            <!-- Métadonnées -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; font-size: 12px; color: #64748b;">
              <strong>Métadonnées techniques:</strong><br>
              User Agent: ${userAgent}<br>
              IP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Non disponible'}<br>
              Referer: ${req.headers.referer || 'Direct'}
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #0f172a; padding: 24px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">
              Notification automatique MANA • ${new Date().getFullYear()}
            </p>
          </div>
        </div>
      `,
      // Version texte alternative
      text: `
🎯 Nouveau téléchargement Managuide

👤 Utilisateur: ${firstName} ${lastName}
📧 Email: ${email}
📅 Date: ${new Date(downloadedAt).toLocaleString('fr-FR')}

Actions suggérées:
- Ajouter à la liste de diffusion innovation
- Envoyer un email de suivi personnalisé
- Proposer un entretien découverte
- Inviter aux prochains webinaires MANA

---
MANA • Notification automatique
      `
    };

    // Envoyer l'email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Erreur Resend API:', response.status, errorData);
      throw new Error(`Resend API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Email envoyé avec succès:', result.id);

    // Réponse de succès
    return res.status(200).json({
      success: true,
      message: 'Email de notification envoyé avec succès',
      emailId: result.id,
      userData: {
        email,
        firstName,
        lastName,
        downloadedAt
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi de l\'email de notification',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
