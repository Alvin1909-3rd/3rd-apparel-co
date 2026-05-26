interface OrderItem {
  product: { name: string; price: number }
  size: string
  quantity: number
}

interface Order {
  id: string
  email: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  shipping_address: {
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    zip: string
  }
}

export function orderConfirmationHtml(order: Order): string {
  const orderNum = order.id.slice(0, 8).toUpperCase()
  const itemRows = order.items.map((item) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e8e4df;font-size:14px;color:#0e0e0e;">
        ${item.product.name} <span style="color:#8a6510;">(${item.size})</span>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #e8e4df;font-size:14px;color:#0e0e0e;text-align:right;">
        x${item.quantity}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #e8e4df;font-size:14px;color:#0e0e0e;text-align:right;">
        $${(item.product.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('')

  const addr = order.shipping_address

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
            <h1 style="margin:0;font-size:36px;font-weight:400;color:#0e0e0e;letter-spacing:0.05em;text-transform:uppercase;">Order Confirmed</h1>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <p style="margin:0 0 12px;font-size:14px;color:#5a5650;line-height:1.6;">
              Thank you for your order. We&rsquo;ve received your purchase and will begin processing it within 2&ndash;3 business days.
            </p>
            <p style="margin:0;font-size:13px;color:#9e9a94;">Order #${orderNum}</p>
          </td>
        </tr>

        <!-- Items -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">Your Items</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${itemRows}
              <tr>
                <td colspan="2" style="padding:12px 0;font-size:13px;color:#5a5650;">Shipping</td>
                <td style="padding:12px 0;font-size:13px;color:#5a5650;text-align:right;">
                  ${order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:12px 0;font-size:15px;font-weight:bold;color:#0e0e0e;">Total</td>
                <td style="padding:12px 0;font-size:15px;font-weight:bold;color:#0e0e0e;text-align:right;">$${order.total.toFixed(2)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Shipping Address -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">Shipping To</p>
            <p style="margin:0;font-size:14px;color:#0e0e0e;line-height:1.8;">
              ${addr.name}<br/>
              ${addr.line1}${addr.line2 ? '<br/>' + addr.line2 : ''}<br/>
              ${addr.city}, ${addr.state} ${addr.zip}
            </p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;text-align:center;">
            <a href="https://3rdapparelco.com/shop"
               style="display:inline-block;padding:14px 40px;background:#c25b2a;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
              Continue Shopping
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;color:#9e9a94;">Questions? Reply to this email or contact us at</p>
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
