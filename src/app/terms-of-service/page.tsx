import TermsLayout from "@/components/layouts/terms-layout";

export default function TermosDeUso() {
  return (
    <TermsLayout>
      <h2 className="text-3xl font-bold text-primary">Termos de Uso</h2>
      <p className="mt-4 text-zinc-700">
        Bem-vindo ao sistema de aluguel de imóveis. Ao utilizar este site, você concorda com os Termos de Uso estabelecidos abaixo. Estes termos regem o uso de nossa plataforma e os serviços oferecidos. Leia atentamente antes de continuar.
      </p>

      <h3 className="text-2xl font-semibold mt-6 text-primary">1. Aceitação dos Termos</h3>
      <p className="mt-4 text-zinc-700">
        Ao acessar ou utilizar nossos serviços, você concorda em estar legalmente vinculado aos Termos de Uso e à nossa Política de Privacidade. Caso não concorde com quaisquer termos, recomendamos não utilizar o sistema.
      </p>

      <h3 className="text-2xl font-semibold mt-6 text-primary">2. Elegibilidade</h3>
      <p className="mt-4 text-zinc-700">
        Para utilizar nossa plataforma, você deve:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-700">
        <li>Ter pelo menos 18 anos de idade;</li>
        <li>Fornecer informações verdadeiras, completas e atualizadas;</li>
        <li>Não utilizar os serviços para fins ilegais ou prejudiciais.</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 text-primary">3. Uso Permitido</h3>
      <p className="mt-4 text-zinc-700">
        O uso deste sistema deve ser exclusivamente para o aluguel de imóveis e gestão de transações associadas. Qualquer outro uso está estritamente proibido.
      </p>

      <h3 className="text-2xl font-semibold mt-6 text-primary">4. Limitações de Responsabilidade</h3>
      <p className="mt-4 text-zinc-700">
        A plataforma não se responsabiliza por:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-700">
        <li>Informações incorretas fornecidas pelos usuários;</li>
        <li>Falhas de comunicação entre locadores e locatários;</li>
        <li>Qualquer dano ou prejuízo decorrente de uso indevido do sistema.</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 text-primary">5. Alterações nos Termos</h3>
      <p className="mt-4 text-zinc-700">
        Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento, com ou sem aviso prévio. Recomendamos revisar esta página periodicamente.
      </p>

      <p className="mt-6 text-zinc-700">
        Para dúvidas ou informações adicionais, entre em contato com nosso suporte pelo e-mail <a href="mailto:suporte@sistemaaluguel.com" className="text-primary underline">suporte@sistemaaluguel.com</a>.
      </p>
    </TermsLayout>
  );
}
