import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = ({
  testing,
  subject,
  html,
  to,
  from = 'info@list.cafe',
}: {
  testing?: boolean
  subject: string
  html: string
  to: string
  from?: string
}) => {
  // Skipping emails on dev for now
  if (!testing && process.env.NODE_ENV === 'development') {
    return
  }

  return resend.emails.send({
    from,
    to:
      process.env.NODE_ENV === 'development' ? process.env.DEVELOPER_EMAIL : to,
    subject,
    html,
  })
}
