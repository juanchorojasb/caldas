import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, firstName: string, lastName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Academia Caldas <onboarding@resend.dev>',
      to: [email],
      subject: '🎉 ¡Bienvenido a Academia Mercado Local Caldas!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Bienvenido a Academia Caldas</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">🎓 ¡Bienvenido a Academia Caldas!</h1>
              <p style="color: white; margin: 10px 0 0 0;">Tu plataforma de herramientas IA para emprendedores</p>
            </div>
            
            <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4a5568; margin-bottom: 20px;">¡Hola ${name}! 👋</h2>
              
              <p>¡Tu cuenta ha sido creada exitosamente! Te damos la bienvenida a la <strong>Academia Mercado Local Caldas</strong>, la plataforma especializada en emprendedores del Norte de Caldas.</p>
              
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2d3748; margin-top: 0;">🚀 ¿Qué puedes hacer ahora?</h3>
                <ul style="color: #4a5568; padding-left: 20px;">
                  <li><strong>🤖 Herramientas IA:</strong> Generador de contenido, branding y estrategias</li>
                  <li><strong>👤 Completar perfil:</strong> Añade información de tu emprendimiento</li>
                  <li><strong>📚 Cursos:</strong> Formación especializada para emprendedores</li>
                  <li><strong>🌐 Networking:</strong> Conecta con otros emprendedores de la región</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://caldas.mercadolocal.co/dashboard" 
                   style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 25px; 
                          display: inline-block;
                          font-weight: bold;
                          box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);">
                  🎯 Ir al Dashboard
                </a>
              </div>
              
              <div style="background: #edf2f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #2d3748; margin-top: 0;">🏔️ Norte de Caldas</h4>
                <p style="margin: 0; color: #4a5568;">Estamos orgullosos de apoyar emprendedores de:</p>
                <p style="margin: 5px 0 0 0; color: #48bb78; font-weight: bold;">Neira • Aranzazu • Pácora • Salamina • Aguadas</p>
              </div>
              
              <p><strong>¿Necesitas ayuda?</strong> Contáctanos en <a href="mailto:soporte@mercadolocal.co" style="color: #48bb78;">soporte@mercadolocal.co</a></p>
              
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
              
              <div style="text-align: center; color: #718096; font-size: 14px;">
                <p><strong>Academia Mercado Local Caldas</strong></p>
                <p>Impulsando el emprendimiento en el Norte de Caldas con tecnología IA</p>
                <p style="margin-top: 20px;">
                  <a href="https://caldas.mercadolocal.co" style="color: #48bb78; text-decoration: none;">🌐 caldas.mercadolocal.co</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `
    })

    if (error) {
      console.error('❌ Error sending welcome email:', error)
      return { success: false, error }
    }

    console.log('✅ Welcome email sent successfully to:', email)
    console.log('📧 Email ID:', data?.id)
    return { success: true, data }

  } catch (error) {
    console.error('❌ Error in sendWelcomeEmail:', error)
    return { success: false, error }
  }
}
