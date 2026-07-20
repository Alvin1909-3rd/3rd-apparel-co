export function welcomeEmailHtml(code: string): string {
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
            <h1 style="margin:0;font-size:36px;font-weight:400;color:#0e0e0e;letter-spacing:0.05em;text-transform:uppercase;">You&rsquo;re In</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <p style="margin:0 0 16px;font-size:14px;color:#5a5650;line-height:1.8;">
              Welcome to the list. You&rsquo;ll hear about new drops, restocks, and community content before anyone else.
            </p>
            <p style="margin:0;font-size:14px;color:#5a5650;line-height:1.8;">
              3rd Apparel Co isn&rsquo;t a brand that came out of a boardroom. It came out of a vision, a grind, and refusing to wait for permission. Every piece we make is intentional &mdash; private label, quality materials, built to last.
            </p>
          </td>
        </tr>

        <!-- Discount Code -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;background:#faf9f7;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">Here&rsquo;s something for joining early</p>
            <div style="margin:20px 0;padding:24px;border:1px dashed #c25b2a;">
              <p style="margin:0 0 8px;font-size:28px;font-weight:bold;letter-spacing:0.15em;color:#c25b2a;">${code}</p>
              <p style="margin:0;font-size:13px;color:#5a5650;">10% off your first order &mdash; apply at checkout.</p>
            </div>
            <a href="https://3rdapparelco.com/shop"
               style="display:inline-block;padding:14px 40px;background:#c25b2a;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
              Shop Now
            </a>
          </td>
        </tr>

        <!-- Social -->
        <tr>
          <td style="padding:24px 40px;border-bottom:1px solid #e8e4df;text-align:center;">
            <p style="margin:0;font-size:13px;color:#5a5650;line-height:1.6;">
              Follow the build at
              <a href="https://instagram.com/3rdapparelco" style="color:#c25b2a;text-decoration:none;">@3rdapparelco</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
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
