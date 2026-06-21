import { getLemonSqueezyOrders } from "@/lib/lemonsqueezy";
import { getPaypalTransactions } from "@/lib/paypal";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [lemonSqueezy, paypal] = await Promise.all([
    getLemonSqueezyOrders(),
    getPaypalTransactions(),
  ]);

  const totalRevenue = lemonSqueezy.totalRevenue + paypal.totalRevenue;
  const totalOrders = lemonSqueezy.orders.length + paypal.transactions.length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Sales dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Live order data pulled from Lemon Squeezy and PayPal. This page is protected
        by the ADMIN_USER / ADMIN_PASSWORD env vars and is not linked from the site.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Total revenue (visible orders)
          </div>
          <div className="mt-2 text-3xl font-extrabold">${totalRevenue.toFixed(2)}</div>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Orders shown
          </div>
          <div className="mt-2 text-3xl font-extrabold">{totalOrders}</div>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Providers connected
          </div>
          <div className="mt-2 text-3xl font-extrabold">
            {[lemonSqueezy.configured, paypal.configured].filter(Boolean).length} / 2
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold">Lemon Squeezy</h2>
        {!lemonSqueezy.configured ? (
          <p className="mt-2 text-sm text-muted">
            Not connected yet — set LEMONSQUEEZY_API_KEY to show real orders here.
          </p>
        ) : lemonSqueezy.error ? (
          <p className="mt-2 text-sm text-accent">{lemonSqueezy.error}</p>
        ) : lemonSqueezy.orders.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No orders yet.</p>
        ) : (
          <OrdersTable
            rows={lemonSqueezy.orders.map((o) => ({
              id: o.id,
              email: o.email,
              amount: `${o.total.toFixed(2)} ${o.currency}`,
              status: o.status,
              date: o.createdAt,
            }))}
          />
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold">PayPal (last 31 days)</h2>
        {!paypal.configured ? (
          <p className="mt-2 text-sm text-muted">
            Not connected yet — set PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET to show
            real transactions here. Requires &quot;Transaction Search&quot; enabled on
            the PayPal app.
          </p>
        ) : paypal.error ? (
          <p className="mt-2 text-sm text-accent">{paypal.error}</p>
        ) : paypal.transactions.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No transactions yet.</p>
        ) : (
          <OrdersTable
            rows={paypal.transactions.map((t) => ({
              id: t.id,
              email: t.payerEmail,
              amount: `${t.amount.toFixed(2)} ${t.currency}`,
              status: t.status,
              date: t.date,
            }))}
          />
        )}
      </section>
    </div>
  );
}

function OrdersTable({
  rows,
}: {
  rows: { id: string; email: string; amount: string; status: string; date: string }[];
}) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-muted">
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
              <td className="px-4 py-3">{row.email}</td>
              <td className="px-4 py-3">{row.amount}</td>
              <td className="px-4 py-3">{row.status}</td>
              <td className="px-4 py-3">{new Date(row.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
