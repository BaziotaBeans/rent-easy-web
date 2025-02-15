import TermsLayout from "@/components/layouts/terms-layout";

export default function Page() {
  return (
    <TermsLayout>
      <h2 className="text-3xl font-bold text-primary">Política de Privacidade</h2>
      <p className="mt-4 text-zinc-700">
        A proteção da sua privacidade é importante para nós. Este documento descreve como coletamos, utilizamos e protegemos suas informações pessoais ao usar nosso sistema de aluguel de imóveis.
      </p>

      <h3 className="text-2xl font-semibold mt-6 text-primary">1. Coleta de Informações</h3>
      <p className="mt-4 text-zinc-700">
        Podemos coletar os seguintes dados pessoais:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-700">
        <li>Nome completo;</li>
        <li>Endereço de e-mail;</li>
        <li>Telefone de contato;</li>
        <li>Detalhes do imóvel para locação;</li>
        <li>Dados de pagamento (nunca armazenados diretamente em nossos servidores).</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 text-primary">2. Uso das Informações</h3>
      <p className="mt-4 text-zinc-700">
        As informações coletadas são utilizadas para:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-700">
        <li>Facilitar transações de aluguel entre locadores e locatários;</li>
        <li>Oferecer suporte ao cliente e solucionar problemas;</li>
        <li>Personalizar sua experiência na plataforma;</li>
        <li>Enviar notificações relacionadas aos seus imóveis e contratos.</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 text-primary">3. Compartilhamento de Informações</h3>
      <p className="mt-4 text-zinc-700">
        Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-700">
        <li>Realizar transações financeiras seguras;</li>
        <li>Cumprir obrigações legais;</li>
        <li>Proteger nossos direitos e prevenir fraudes.</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 text-primary">4. Direitos do Usuário</h3>
      <p className="mt-4 text-zinc-700">
        Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para solicitar alterações, entre em contato pelo e-mail <a href="mailto:privacidade@sistemaaluguel.com" className="text-primary underline">privacidade@sistemaaluguel.com</a>.
      </p>
    </TermsLayout>
  );
}
