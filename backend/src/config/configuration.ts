export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
  database: {
    url: process.env.DATABASE_URL,
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  mail: {
    adminEmail: process.env.ADMIN_EMAIL || 'admin@bounceup.de',
    fromName: process.env.MAIL_FROM_NAME || 'BounceUp',
  },
});
