# Hugo L. Almeida — Portfólio

Portfólio de atuação profissional em desenvolvimento web, automação de processos e integrações.

Abertura com foco em aplicações e automações para simplificar rotinas contábeis. Cartões e estudos de caso usam ícones acessíveis para repositórios e sites disponíveis. O endereço público da PLID permanece `https://plid-platform.vercel.app/`; o autor confirmou que abriu após aguardar o carregamento.

## Conteúdo

- Libby: biblioteca de automações para DP, Fiscal e outras áreas, incluindo rotinas no Domínio, Gestta e portal Onvio. Código privado.
- Biblioteca de Ebooks, DisBot Canella e PLID: estudos de caso.
- Foto, história do AutoMessenger, trajetória profissional e formação em andamento, com conclusão prevista para janeiro–fevereiro de 2027.
- Oito certificados em uma vitrine compacta: imagem, dados e PDF do certificado ativo no mesmo cartão, e duas prévias identificadas como próximos certificados. A área principal tem 330 px no desktop e se reorganiza no celular. Inclui PDFs originais, avanço automático, setas, gesto de deslizar e pausa. A rotação pausa com foco, mouse sobre o carrossel ou aba oculta e respeita movimento reduzido.
- Ferramentas em faixa horizontal contínua com logotipos locais. A faixa inicia automaticamente por solicitação do autor, inclusive quando o sistema prefere movimento reduzido; pode ser pausada pelo botão. A cópia usada para continuidade visual é ocultada de leitores de tela.
- Nove logotipos do projeto Devicon, com licença em `dist/assets/tool-logos/LICENSE.devicon.txt` e proveniência em `docs/tool-logo-sources.json`. O ícone de APIs e integrações é um diagrama genérico local.
- O ícone do GitHub nos links de projetos usa a mesma versão do Devicon; o ícone de site é um globo SVG local.
- Linha do tempo horizontal da trajetória, com rolagem lateral em telas menores: voluntariado, processos administrativos, graduação, estágio de TI e Desenvolvimento e Operações.
- Currículos originais para download em português e inglês na seção Sobre.
- Contato por LinkedIn e e-mail.

## Idiomas

O seletor PT/EN traduz a página, metadados, textos acessíveis e estudos de caso. `?lang=pt` e `?lang=en` permitem compartilhar cada idioma. A preferência é lembrada no navegador, com português como padrão. As capturas do produto continuam em português.

## Imagens e dados

As imagens da Libby foram editadas com a ferramenta integrada de imagens. O dashboard exibe os valores históricos da captura fornecida pelo autor; a linha de log com contato permanece ocultada na imagem de execuções. Não são arquivos originais sem edição. Os prompts estão em `docs/image-redactions.md`. O retrato foi fornecido pelo autor. O PDF do LinkedIn não foi publicado.

As artes de Ebooks, DisBot e PLID são ilustrativas. O portfólio não se conecta a sistemas da empresa. Não há métricas fictícias de economia de tempo. A página pública da Libby e a medição de tempo poupado aguardam implementação pelo autor.

## Rodar e verificar

Node.js 20 ou superior. Sem dependências npm de produção.

```sh
npm run dev
npm run check
```

Abra http://localhost:4173. O código estático fica em `dist/`; `npm run build` valida os arquivos.

## Estrutura

- `dist/index.html`: conteúdo e estrutura em português.
- `dist/i18n.js`: tradução para inglês e escolha do idioma.
- `dist/styles.css`: estilos responsivos.
- `dist/app.js`: galeria, filtros, menu e estudos de caso.
- `dist/assets/`: retrato e imagens editadas da Libby.
- `dist/assets/certificates/`: PDFs originais fornecidos pelo autor e miniaturas para navegação.
- `dist/assets/resume/`: currículos originais em português e inglês.
- `scripts/`: servidor local e verificações.

Hospedagem configurada para Vercel. Esta revisão foi feita no checkout local, sem implantação.
