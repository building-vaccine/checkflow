export const metadata = {
  title: "お問い合わせ",
  description: "CheckFlowへのお問い合わせページです。",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">
          お問い合わせ
        </h1>

        <p className="mt-6 leading-8 text-slate-700">
          CheckFlowをご利用いただきありがとうございます。
        </p>

        <p className="mt-4 leading-8 text-slate-700">
          サービスに関するご質問、ご要望、不具合のご報告などがございましたら、
          下記メールアドレスまでお気軽にお問い合わせください。
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            お問い合わせ先
          </h2>

          <a
            href="mailto:building.vaccine@gmail.com"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            building.vaccine@gmail.com
          </a>
        </div>

        <p className="mt-8 text-sm leading-7 text-slate-500">
          内容を確認後、可能な範囲で順次対応いたします。
          お問い合わせの内容によっては、返信までお時間をいただく場合や、
          返信できない場合がありますので、あらかじめご了承ください。
        </p>
      </div>
    </main>
  );
}