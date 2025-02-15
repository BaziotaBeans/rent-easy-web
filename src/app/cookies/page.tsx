import TermsLayout from "@/components/layouts/terms-layout";

export default function Page() {
  return (
    <TermsLayout>
      <h2 className="text-3xl font-bold text-primary">Política de Cookies</h2>
      <p className="mt-4 text-zinc-700">
        O uso de cookies em nossa plataforma é essencial para melhorar sua
        experiência de navegação, garantir funcionalidades básicas e otimizar
        nossos serviços. Esta Política de Cookies explica o que são cookies,
        como os utilizamos e como você pode gerenciá-los.
      </p>

      <h3 className="text-2xl font-semibold mt-6 text-primary">
        1. O que são cookies?
      </h3>
      <p className="mt-4 text-zinc-700">
        Cookies são pequenos arquivos de texto enviados para o navegador ou
        dispositivo do usuário durante a navegação em um site. Eles são
        amplamente utilizados para garantir o funcionamento correto do site,
        lembrar preferências do usuário e fornecer informações para otimização
        de serviços.
      </p>

      <h3 className="text-2xl font-semibold mt-6 text-primary">
        2. Por que utilizamos cookies?
      </h3>
      <p className="mt-4 text-zinc-700">
        Utilizamos cookies por vários motivos, incluindo:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-700">
        <li>Garantir que o site funcione de maneira eficiente e segura;</li>
        <li>
          Fornecer uma experiência personalizada, lembrando suas preferências
          (como idioma ou configurações regionais);
        </li>
        <li>
          Coletar dados analíticos para entender como os usuários interagem com
          nosso site;
        </li>
        <li>
          Oferecer anúncios direcionados com base nos interesses do usuário.
        </li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 text-primary">
        3. Tipos de Cookies que Utilizamos
      </h3>
      <p className="mt-4 text-zinc-700">
        Utilizamos diferentes categorias de cookies, conforme descrito abaixo:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-4 text-zinc-700">
        <li>
          <strong>Cookies Essenciais:</strong> Necessários para o funcionamento
          básico do site. Eles permitem, por exemplo, realizar login, acessar
          áreas seguras e navegar entre páginas sem problemas.
          <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-600">
            <li>
              Exemplo: `<em>session_id</em>` - identifica a sessão do usuário e
              expira ao encerrar o navegador.
            </li>
          </ul>
        </li>
        <li>
          <strong>Cookies de Desempenho:</strong> Coletam informações sobre como
          os usuários utilizam o site, como páginas acessadas e possíveis erros.
          Esses dados são usados para melhorar a experiência do usuário.
          <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-600">
            <li>
              Exemplo: `<em>analytics_user_id</em>` - rastreia comportamentos
              anônimos para análise de desempenho, expirando após 30 dias.
            </li>
          </ul>
        </li>
        <li>
          <strong>Cookies de Funcionalidade:</strong> Permitem que o site lembre
          preferências do usuário, como idioma, localidade ou informações de
          preenchimento de formulário.
          <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-600">
            <li>
              Exemplo: `<em>language_preference</em>` - armazena a preferência
              de idioma e expira após 7 dias.
            </li>
          </ul>
        </li>
        <li>
          <strong>Cookies de Publicidade:</strong> Usados para oferecer anúncios
          personalizados e limitar a frequência de exibição de determinados
          anúncios.
          <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-600">
            <li>
              Exemplo: `<em>ad_targeting_id</em>` - identifica interesses do
              usuário para anúncios personalizados, expira após 90 dias.
            </li>
          </ul>
        </li>
        <li>
          <strong>Cookies de Terceiros:</strong> Cookies configurados por
          provedores externos, como Google Analytics, Facebook Pixel ou outros
          serviços integrados.
          <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-600">
            <li>
              Exemplo: `<em>_ga</em>` - usado pelo Google Analytics para
              rastrear visitantes do site.
            </li>
          </ul>
        </li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 text-primary">
        4. Duração dos Cookies
      </h3>
      <p className="mt-4 text-zinc-700">
        A duração dos cookies depende do tipo:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-700">
        <li>
          <strong>Cookies de Sessão:</strong> Expiram quando você fecha o
          navegador.
        </li>
        <li>
          <strong>Cookies Persistentes:</strong> Permanecem no dispositivo do
          usuário por um período específico ou até serem excluídos manualmente.
        </li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 text-primary">
        5. Como Gerenciar e Desativar Cookies
      </h3>
      <p className="mt-4 text-zinc-700">
        Você pode gerenciar ou desativar cookies diretamente nas configurações
        do seu navegador. No entanto, a desativação de alguns cookies pode
        impactar negativamente a funcionalidade do site. Aqui estão links para
        guias de configuração dos navegadores mais populares:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-2 text-zinc-700">
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647?hl=pt"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gerenciar cookies no Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gerenciar cookies no Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/pt-br/help/4027947/microsoft-edge-delete-cookies"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gerenciar cookies no Microsoft Edge
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gerenciar cookies no Safari
          </a>
        </li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 text-primary">
        6. Consentimento e Revogação
      </h3>
      <p className="mt-4 text-zinc-700">
        Ao utilizar nosso site, você concorda com o uso de cookies conforme
        descrito nesta política. Você pode revogar seu consentimento a qualquer
        momento, alterando as configurações do navegador ou entrando em contato
        conosco pelo e-mail{" "}
        <a
          href="mailto:cookies@sistemaaluguel.com"
          className="text-primary underline"
        >
          cookies@sistemaaluguel.com
        </a>
        .
      </p>

      <h3 className="text-2xl font-semibold mt-6 text-primary">
        7. Atualizações na Política de Cookies
      </h3>
      <p className="mt-4 text-zinc-700">
        Esta política pode ser atualizada periodicamente para refletir mudanças
        em nossas práticas ou requisitos legais. Recomendamos revisar esta
        página regularmente.
      </p>

      <p className="mt-6 text-zinc-700">
        Para dúvidas ou mais informações sobre como utilizamos cookies, entre em
        contato pelo e-mail{" "}
        <a
          href="mailto:cookies@sistemaaluguel.com"
          className="text-primary underline"
        >
          cookies@sistemaaluguel.com
        </a>
        .
      </p>
    </TermsLayout>
  );
}
