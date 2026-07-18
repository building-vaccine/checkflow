export const metadata = {
  title: "利用規約",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-8 text-3xl font-bold">利用規約</h1>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">1. サービスについて</h2>
          <p>
            CheckFlowは無料で利用できるオンラインチェックリストサービスです。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">2. 禁止事項</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>法令に違反する行為</li>
            <li>サービス運営を妨害する行為</li>
            <li>他者に迷惑をかける行為</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">3. 免責事項</h2>
          <p>
            当サービスの利用により生じた損害について、運営者は責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">4. 規約の変更</h2>
          <p>
            本規約は必要に応じて変更することがあります。
          </p>
        </section>
      </div>
    </main>
  );
}