export default function ChatbotLandingPage() {
  const features = [
    {
      title: "Akıllı Yanıtlar",
      desc: "Kullanıcı mesajlarını anlayan, hızlı ve doğal cevaplar üreten sohbet deneyimi.",
      icon: "🤖",
    },
    {
      title: "Canlı Sohbet Arayüzü",
      desc: "Mesaj balonları, yazıyor göstergesi ve modern panel düzeni ile şık görünüm.",
      icon: "💬",
    },
    {
      title: "Kolay Entegrasyon",
      desc: "API bağlantıları, kullanıcı yönetimi ve gelecekteki geliştirmeler için uygun yapı.",
      icon: "⚡",
    },
  ];

  const messages = [
    { role: "bot", text: "Merhaba! Ben sana nasıl yardımcı olabilirim?" },
    { role: "user", text: "Bir chatbot web sitesi tasarlamak istiyorum." },
    {
      role: "bot",
      text: "Harika. Sana modern ve responsive bir tasarım hazırlayabilirim.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.2),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <div>
            <h1 className="text-xl font-bold tracking-tight">ChatBot UI</h1>
            <p className="text-sm text-slate-300">
              React tabanlı modern sohbet arayüzü
            </p>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">
              Özellikler
            </a>
            <a href="#preview" className="transition hover:text-white">
              Önizleme
            </a>
            <a href="#contact" className="transition hover:text-white">
              Başla
            </a>
          </nav>
        </header>

        <main className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <section>
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-sm text-sky-300">
              Yeni nesil sohbet deneyimi
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Kendi <span className="text-sky-400">AI Chatbot</span> web sayfanı
              oluştur.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              Kullanıcı dostu, mobil uyumlu ve profesyonel bir chatbot arayüzü
              ile ürününü hızlıca sun. Bu tasarım; landing page, sohbet ekranı
              ve aksiyon butonlarını tek yapıda birleştirir.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-2xl bg-sky-500 px-6 py-3 font-medium text-white shadow-lg shadow-sky-500/25 transition hover:scale-[1.02] hover:bg-sky-400">
                Demo Başlat
              </button>
              <button className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10">
                Tasarımı İncele
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-sm text-slate-400">Kesintisiz destek</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">Fast</p>
                <p className="mt-1 text-sm text-slate-400">
                  Hızlı cevap süresi
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">UI/UX</p>
                <p className="mt-1 text-sm text-slate-400">Modern görünüm</p>
              </div>
            </div>
          </section>

          <section id="preview" className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 shadow-2xl shadow-sky-950/50 backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="font-semibold">Sohbet Asistanı</p>
                  <p className="text-sm text-emerald-400">● Aktif</p>
                </div>
                <div className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-300">
                  v1.0
                </div>
              </div>

              <div className="space-y-4 p-5">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 shadow ${
                        message.role === "user"
                          ? "bg-sky-500 text-white"
                          : "bg-white/8 text-slate-100 border border-white/10"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    Yazıyor...
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                  <button className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium transition hover:bg-sky-400">
                    Gönder
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <section id="features" className="py-8 lg:py-12">
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold tracking-tight">
              Öne Çıkan Özellikler
            </h3>
            <p className="mt-3 text-slate-400">
              Chatbot projen için temel vitrin ve sohbet deneyimi bir arada.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:bg-white/7"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h4 className="mt-4 text-xl font-semibold">{feature.title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-10">
          <div className="rounded-[32px] border border-sky-400/20 bg-gradient-to-r from-sky-500/15 to-violet-500/15 p-8 text-center backdrop-blur">
            <h3 className="text-3xl font-bold">
              Chatbot projen için başlangıç ekranın hazır
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Bu yapıyı giriş ekranı, gerçek zamanlı mesajlaşma, API bağlantısı
              ve kullanıcı oturumu ile daha da geliştirebiliriz.
            </p>
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-[1.02]">
                Projeye Başla
              </button>
              <button className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Kaynak Kodunu Geliştir
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
