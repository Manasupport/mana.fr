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
    const { email, firstName, lastName }: WelcomeEmailData = req.body;

    if (!email || !firstName) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, firstName' 
      });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const welcomeEmailData = {
      from: 'MANA Innovation <hello@mana.fr>',
      to: [email],
      subject: `🚀 ${firstName}, votre Managuide de l'innovation est prêt !`,
      html: `
        <div style="font-family: 'Inter', 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: white;">
          <!-- Header avec dégradé MANA -->
          <div style="background: linear-gradient(135deg, #0c3d5e 0%, #dfaf2c 100%); padding: 40px 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
              🎯 Bienvenue ${firstName} !
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 18px; font-weight: 400;">
              Votre guide innovation vous attend
            </p>
          </div>
          
          <!-- Contenu principal -->
          <div style="padding: 40px 32px;">
            <!-- Message de bienvenue -->
            <div style="margin-bottom: 32px; text-align: center;">
              <h2 style="color: #0c3d5e; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">
                Merci pour votre confiance ! 🙏
              </h2>
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0;">
                Vous venez de télécharger notre <strong>Managuide de l'innovation</strong> — 
                12 méthodes éprouvées pour transformer vos idées en impact concret.
              </p>
            </div>
            
            <!-- Ce qui vous attend -->
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
              <h3 style="color: #0c3d5e; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
                📚 Ce que vous allez découvrir
              </h3>
              <div style="display: grid; gap: 12px;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <span style="background: #0c3d5e; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0;">1</span>
                  <span style="color: #475569; font-size: 15px; line-height: 1.5;">
                    <strong>12 méthodes essentielles</strong> d'innovation testées et approuvées
                  </span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <span style="background: #dfaf2c; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0;">2</span>
                  <span style="color: #475569; font-size: 15px; line-height: 1.5;">
                    <strong>Fiches pratiques</strong> prêtes à l'emploi pour vos projets
                  </span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <span style="background: #0c3d5e; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0;">3</span>
                  <span style="color: #475569; font-size: 15px; line-height: 1.5;">
                    <strong>Cadres décisionnels</strong> pour prioriser et mesurer l'impact
                  </span>
                </div>
              </div>
            </div>
            
            <!-- CTA Principal -->
            <div style="text-align: center; margin-bottom: 32px;">
              <a href="https://mana.fr/publications/managuide-innovation" 
                 style="display: inline-block; background: linear-gradient(135deg, #0c3d5e 0%, #dfaf2c 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(12, 61, 94, 0.3); transition: all 0.3s ease;">
                📖 Accéder au guide complet
              </a>
            </div>
            
            <!-- Prochaines étapes -->
            <div style="background: white; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
              <h3 style="color: #0c3d5e; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
                🚀 Et maintenant ?
              </h3>
              <div style="display: grid; gap: 16px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="color: #dfaf2c; font-size: 20px;">💡</span>
                  <span style="color: #475569; font-size: 15px;">
                    <strong>Explorez les 12 méthodes</strong> et identifiez celles qui correspondent à vos défis
                  </span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="color: #dfaf2c; font-size: 20px;">🎯</span>
                  <span style="color: #475569; font-size: 15px;">
                    <strong>Testez sur un projet pilote</strong> pour mesurer l'impact rapidement
                  </span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="color: #dfaf2c; font-size: 20px;">📞</span>
                  <span style="color: #475569; font-size: 15px;">
                    <strong>Besoin d'accompagnement ?</strong> Nos experts sont là pour vous guider
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Ressources complémentaires -->
            <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 12px; padding: 20px; margin-bottom: 32px;">
              <h4 style="color: #0c3d5e; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">
                📌 Ressources complémentaires
              </h4>
              <div style="display: grid; gap: 8px; font-size: 14px;">
                <a href="https://mana.fr/publications" style="color: #0c3d5e; text-decoration: none;">
                  → Découvrir toutes nos publications
                </a>
                <a href="https://mana.fr/manacademy" style="color: #0c3d5e; text-decoration: none;">
                  → Explorer Manacademy (formations)
                </a>
                <a href="https://mana.fr/manadvise" style="color: #0c3d5e; text-decoration: none;">
                  → En savoir plus sur Manadvise (conseil)
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #0f172a; padding: 32px; text-align: center;">
            <h4 style="color: white; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">
              L'équipe MANA 🚀
            </h4>
            <p style="color: #94a3b8; margin: 0 0 20px 0; font-size: 14px; line-height: 1.5;">
              Nous sommes ravis de vous accompagner dans votre démarche d'innovation.<br>
              N'hésitez pas à nous contacter pour toute question !
            </p>
            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
              <a href="https://linkedin.com/company/manasupport" style="color: #94a3b8; text-decoration: none; font-size: 14px;">
                LinkedIn
              </a>
              <a href="https://mana.fr" style="color: #94a3b8; text-decoration: none; font-size: 14px;">
                Site web
              </a>
              <a href="mailto:hello@mana.fr" style="color: #94a3b8; text-decoration: none; font-size: 14px;">
                Contact
              </a>
            </div>
            <p style="color: #64748b; margin: 0; font-size: 12px;">
              MANA • Révéler le potentiel d'innovation<br>
              Si vous ne souhaitez plus recevoir nos emails, 
              <a href="#" style="color: #64748b; text-decoration: underline;">cliquez ici</a>
            </p>
          </div>
        </div>
      `,
      text: `
🎯 Bienvenue ${firstName} !

Merci pour votre confiance ! Vous venez de télécharger notre Managuide de l'innovation.

📚 Ce que vous allez découvrir :
• 12 méthodes essentielles d'innovation testées et approuvées
• Fiches pratiques prêtes à l'emploi pour vos projets
• Cadres décisionnels pour prioriser et mesurer l'impact

🚀 Et maintenant ?
💡 Explorez les 12 méthodes et identifiez celles qui correspondent à vos défis
🎯 Testez sur un projet pilote pour mesurer l'impact rapidement
📞 Besoin d'accompagnement ? Nos experts sont là pour vous guider

📌 Ressources complémentaires :
→ Découvrir toutes nos publications : https://mana.fr/publications
→ Explorer Manacademy : https://mana.fr/manacademy
→ En savoir plus sur Manadvise : https://mana.fr/manadvise

L'équipe MANA 🚀
Contact : hello@mana.fr
Site : https://mana.fr
      `
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(welcomeEmailData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Erreur Resend API welcome email:', response.status, errorData);
      throw new Error(`Resend API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Email de bienvenue envoyé:', result.id);

    return res.status(200).json({
      success: true,
      message: 'Email de bienvenue envoyé avec succès',
      emailId: result.id
    });

  } catch (error) {
    console.error('❌ Erreur email de bienvenue:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi de l\'email de bienvenue',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
