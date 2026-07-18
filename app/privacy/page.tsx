export const metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-300 bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-slate-900">
          プライバシーポリシー
        </h1>

        <p className="mb-8 leading-8 text-slate-700">
          CheckFlow（以下、「当サイト」といいます。）は、利用者のプライバシーを尊重し、
          個人情報の適切な取り扱いに努めます。
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            1. 取得する情報
          </h2>

          <p className="leading-8 text-slate-700">
            当サイトでは、以下の情報を取得する場合があります。
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>チェックリストの内容</li>
            <li>ブラウザを識別するためのランダムなID</li>
            <li>アクセス状況や利用状況に関する情報</li>
            <li>エラー発生時の技術情報</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            2. 利用目的
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>サービスの提供</li>
            <li>不具合の調査・修正</li>
            <li>サービス品質の向上</li>
            <li>利用状況の分析</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            3. アクセス解析
          </h2>

          <p className="leading-8 text-slate-700">
            当サイトではGoogle Analyticsを利用しています。
            Google AnalyticsはCookie等を利用して利用状況を収集します。
            詳細はGoogleのプライバシーポリシーをご確認ください。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            4. エラー解析
          </h2>

          <p className="leading-8 text-slate-700">
            当サイトではSentryを利用してエラー情報を収集しています。
            収集した情報は、不具合の調査および品質改善のために利用します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            5. 第三者提供
          </h2>

          <p className="leading-8 text-slate-700">
            法令に基づく場合を除き、取得した情報を第三者へ提供することはありません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            6. プライバシーポリシーの変更
          </h2>

          <p className="leading-8 text-slate-700">
            本ポリシーは、必要に応じて予告なく変更することがあります。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            7. お問い合わせ
          </h2>

          <p className="leading-8 text-slate-700">
            ご質問やお問い合わせは、お問い合わせページよりお願いいたします。
          </p>
        </section>

        <p className="mt-10 text-right text-sm text-slate-500">
          制定日：2026年7月15日
        </p>
      </div>
    </main>
  );
}