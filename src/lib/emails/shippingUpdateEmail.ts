export function shippingUpdateHtml(firstName: string, orderNum: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f5f2;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e8e4df;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <div style="width:24px;height:2px;background:#c25b2a;margin-bottom:16px;"></div>
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">3rd Apparel Co</p>
            <h1 style="margin:0;font-size:36px;font-weight:400;color:#0e0e0e;letter-spacing:0.05em;text-transform:uppercase;">On the Move</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <p style="margin:0 0 16px;font-size:14px;color:#0e0e0e;line-height:1.8;">Hey ${firstName},</p>
            <p style="margin:0 0 16px;font-size:14px;color:#5a5650;line-height:1.8;">
              Your Black Cap is on its way. Should be with you in the next few days.
            </p>
            <p style="margin:0;font-size:13px;color:#9e9a94;">Order #${orderNum}</p>
          </td>
        </tr>

        <!-- Social Ask -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;background:#faf9f7;">
            <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">When It Arrives</p>
            <p style="margin:0 0 16px;font-size:14px;color:#0e0e0e;line-height:1.8;">
              Wear it somewhere. Tag us. Seriously.
            </p>
            <p style="margin:0;font-size:14px;color:#5a5650;line-height:1.8;">
              We&rsquo;re a small brand building something real, and every photo, every tag, every story you share is how this thing grows. We see every one of them.
            </p>
          </td>
        </tr>

        <!-- Tag CTA -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;text-align:center;">
            <p style="margin:0 0 20px;font-size:13px;color:#5a5650;line-height:1.6;">
              Tag <strong style="color:#0e0e0e;">@3rdapparelco</strong> on Instagram or TikTok when your cap arrives.<br/>
              We repost our community and we want to see you in it.
            </p>
            <a href="https://instagram.com/3rdapparelco"
               style="display:inline-block;padding:14px 40px;background:#c25b2a;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
              Find Us on Instagram
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;color:#9e9a94;">More drops coming soon. You&rsquo;ll hear about them first.</p>
            <a href="mailto:orders@3rdapparelco.com" style="font-size:11px;color:#8a6510;">orders@3rdapparelco.com</a>
            <p style="margin:16px 0 0;font-size:10px;color:#b0aca6;letter-spacing:0.2em;text-transform:uppercase;">
              &copy; ${new Date().getFullYear()} 3rd Apparel Co &mdash; Baltimore, MD
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}
