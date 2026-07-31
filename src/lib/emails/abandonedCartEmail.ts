interface CartItem {
  product: { name: string; price: number }
  size: string
  color?: string
  quantity: number
}

export function abandonedCartEmailHtml(firstName: string, items: CartItem[]): string {
  const itemRows = items.map((item) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e4df;font-size:14px;color:#0e0e0e;">
        ${item.product.name} <span style="color:#8a6510;">(${[item.color, item.size].filter(Boolean).join(' / ')})</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e4df;font-size:14px;color:#0e0e0e;text-align:right;">
        $${(item.product.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('')

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
            <h1 style="margin:0;font-size:36px;font-weight:400;color:#0e0e0e;letter-spacing:0.05em;text-transform:uppercase;">Still Thinking?</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <p style="margin:0 0 16px;font-size:14px;color:#0e0e0e;line-height:1.8;">Hey ${firstName},</p>
            <p style="margin:0;font-size:14px;color:#5a5650;line-height:1.8;">
              You left something behind. These are still available &mdash; but inventory is limited.
            </p>
          </td>
        </tr>

        <!-- Cart Items -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">Your Cart</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${itemRows}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;text-align:center;">
            <a href="https://3rdapparelco.com/shop"
               style="display:inline-block;padding:14px 40px;background:#c25b2a;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
              Complete Your Order
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;color:#9e9a94;">Questions? We&rsquo;re here.</p>
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
