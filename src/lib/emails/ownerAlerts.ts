interface OrderItem {
  product: { name: string; price: number }
  size: string
  color?: string
  quantity: number
}

interface ShippingAddress {
  name: string
  city: string
  state: string
}

interface NewOrderData {
  orderNum: string
  customerEmail: string
  items: OrderItem[]
  total: number
  shipping_address: ShippingAddress
}

interface DigestOrder {
  id: string
  total: number
  email: string
}

interface LowStockProduct {
  name: string
  totalUnits: number
}

export function ownerNewOrderHtml(order: NewOrderData): string {
  const itemList = order.items
    .map((i) => `${i.product.name}${i.color ? ` - ${i.color}` : ''} (${i.size}) x${i.quantity}`)
    .join(', ')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f7f5f2;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e8e4df;">
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <div style="width:24px;height:2px;background:#c25b2a;margin-bottom:16px;"></div>
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">New Order</p>
            <h1 style="margin:0;font-size:32px;font-weight:400;color:#0e0e0e;">#${order.orderNum} &mdash; $${order.total.toFixed(2)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#9e9a94;width:120px;">Customer</td>
                <td style="padding:8px 0;font-size:14px;color:#0e0e0e;">${order.customerEmail}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#9e9a94;">Items</td>
                <td style="padding:8px 0;font-size:14px;color:#0e0e0e;">${itemList}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#9e9a94;">Ship To</td>
                <td style="padding:8px 0;font-size:14px;color:#0e0e0e;">${order.shipping_address.name} &mdash; ${order.shipping_address.city}, ${order.shipping_address.state}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#9e9a94;">Total</td>
                <td style="padding:8px 0;font-size:14px;font-weight:bold;color:#c25b2a;">$${order.total.toFixed(2)}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;text-align:center;">
            <a href="https://3rdapparelco.com/admin/orders"
               style="display:inline-block;padding:12px 32px;background:#c25b2a;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
              View in Admin
            </a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}

export function ownerDailyDigestHtml(
  orders: DigestOrder[],
  revenue: number,
  lowStock: LowStockProduct[],
  outOfStock: LowStockProduct[]
): string {
  const orderRows = orders.length
    ? orders.map((o) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e8e4df;font-size:13px;color:#0e0e0e;font-family:monospace;">#${o.id.slice(0, 8).toUpperCase()}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e8e4df;font-size:13px;color:#9e9a94;">${o.email}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e8e4df;font-size:13px;color:#c8a96e;text-align:right;">$${o.total.toFixed(2)}</td>
        </tr>`).join('')
    : `<tr><td colspan="3" style="padding:16px 0;font-size:13px;color:#9e9a94;">No orders in the last 24 hours.</td></tr>`

  const lowStockSection = lowStock.length || outOfStock.length ? `
    <tr>
      <td style="padding:24px 40px;border-top:1px solid #e8e4df;">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">Inventory Alerts</p>
        ${outOfStock.map((p) => `<p style="margin:0 0 6px;font-size:13px;color:#c25b2a;">&#9679; <strong>${p.name}</strong> — OUT OF STOCK</p>`).join('')}
        ${lowStock.map((p) => `<p style="margin:0 0 6px;font-size:13px;color:#c8a96e;">&#9679; <strong>${p.name}</strong> — ${p.totalUnits} unit${p.totalUnits !== 1 ? 's' : ''} left</p>`).join('')}
      </td>
    </tr>` : ''

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f7f5f2;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e8e4df;">
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <div style="width:24px;height:2px;background:#c25b2a;margin-bottom:16px;"></div>
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">3rd Apparel Co</p>
            <h1 style="margin:0;font-size:32px;font-weight:400;color:#0e0e0e;">Daily Summary</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-bottom:1px solid #e8e4df;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:center;padding:0 16px;">
                  <p style="margin:0 0 4px;font-size:28px;font-weight:bold;color:#c25b2a;">$${revenue.toFixed(2)}</p>
                  <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#9e9a94;">Revenue</p>
                </td>
                <td style="text-align:center;padding:0 16px;border-left:1px solid #e8e4df;">
                  <p style="margin:0 0 4px;font-size:28px;font-weight:bold;color:#c25b2a;">${orders.length}</p>
                  <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#9e9a94;">Orders</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-bottom:1px solid #e8e4df;">
            <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">Orders (Last 24h)</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${orderRows}
            </table>
          </td>
        </tr>
        ${lowStockSection}
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <a href="https://3rdapparelco.com/admin"
               style="display:inline-block;padding:12px 32px;background:#c25b2a;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
              Open Admin
            </a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}

export function ownerLowStockHtml(products: LowStockProduct[]): string {
  const rows = products.map((p) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e4df;font-size:14px;color:#0e0e0e;">${p.name}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e4df;font-size:14px;text-align:right;color:${p.totalUnits === 0 ? '#c25b2a' : '#c8a96e'};">
        ${p.totalUnits === 0 ? 'OUT OF STOCK' : `${p.totalUnits} unit${p.totalUnits !== 1 ? 's' : ''} left`}
      </td>
    </tr>`).join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f7f5f2;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e8e4df;">
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <div style="width:24px;height:2px;background:#c25b2a;margin-bottom:16px;"></div>
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a6510;">Inventory Alert</p>
            <h1 style="margin:0;font-size:32px;font-weight:400;color:#0e0e0e;">Stock Update</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #e8e4df;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${rows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <a href="https://3rdapparelco.com/admin/products"
               style="display:inline-block;padding:12px 32px;background:#c25b2a;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
              Update Inventory
            </a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}
