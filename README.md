# Hugo L. Almeida — Portfólio

Portfólio de atuação profissional em desenvolvimento web, automação de processos e integrações.

Abertura com foco em aplicações e automações para simplificar rotinas contábeis. Cartões e estudos de caso usam ícones acessíveis para repositórios e sites disponíveis. O endereço público da PLID permanece `https://plid-platform.vercel.app/`; o autor confirmou que abriu após aguardar o carregamento.

## Exploração visual

`/horizontal/` contém a segunda exploração, independente do site principal e de `/conceito/`. A direção visual usa roxo profundo, azul e lavanda, com a cena de contato também escura. As oito seções incluem uma estrutura decorativa de conexões em SVG e CSS 3D, distribuída em três planos. A abertura tem mais destaque; as demais seções variam posição, rotação e contraste para preservar a leitura. O SVG é reaproveitado sem IDs duplicados. Em computadores com mouse, cada seção inclina sua estrutura suavemente conforme o cursor e retorna ao repouso quando ele sai. No celular ou com efeitos pausados, permanece estática. O ciclo de atualização termina quando o movimento se estabiliza e é cancelado com aba oculta, seção fora da tela ou painel aberto; não há WebGL nem dependências externas para o efeito. São oito cenas: abertura, catálogo da Libby, operação da Libby, outros projetos, autor, ferramentas e formação, trajetória e contato. O escuro é o tema inicial; o claro permanece como escolha opcional lembrada no navegador. O “Sobre” apresenta a história pessoal confirmada pelo autor: início em Direito, transição pelo BYU–Pathway, graduação em andamento, primeiro site de One Piece, jeito prático e bem-humorado e interesses fora do trabalho. O texto foi adaptado para PT/EN. O cabeçalho redundante “Um pouco sobre mim” foi removido; o título e os espaçamentos foram compactados para apresentar a biografia, o destaque do primeiro site e os links juntos, sem rolagem interna na coluna. “Onde tudo começou” abre uma apresentação do primeiro site, Build Character, com os aprendizados informados pelo autor: efeitos em CSS, carrossel automático, consulta de dados em JSON, seleção de itens em array e soma de poder, além do fluxo de criação em formulário. A apresentação tem uma galeria de seis capturas originais fornecidas pelo autor: início, formulário, raça, profissões, frutas e resultado. As duas capturas repetidas do envio foram descartadas por igualdade de conteúdo. As imagens foram copiadas sem cortes ou alterações e têm legendas PT/EN, miniaturas e ampliação em outra aba. O link externo abre o projeto original no Netlify; a experiência permanece acessível pelo Sobre, sem alterar a contagem dos quatro projetos profissionais. Os quatro estudos de caso abrem em painéis nativos com desafio, contribuição, funcionalidades, decisões técnicas e links, preservando a posição no percurso. O estudo da Libby inclui quatro exemplos em “Automações na prática”: AutoMessenger ONE, Aviso de Vencimento completo, FGTS × Resumo da Folha e Divisor ICMS/FECOEP. Cada exemplo tem problema, entrada, funcionamento, entrega e decisão de implementação, com detalhes expansíveis e tradução para inglês. A seleção foi fundamentada nos módulos locais, sem executá-los; a proveniência está em `docs/libby-automation-selection.md`. Os links de GitHub e site usam ícones acessíveis; a PLID oferece os dois destinos. A Libby tem uma galeria com três capturas ampliáveis dentro do estudo de caso. `dist/horizontal/project-media.js` aceita imagens e vídeos reais para cada projeto; listas vazias não geram espaços de preenchimento. O fluxo para acrescentar mídias está em `docs/horizontal-media.md`. A trajetória reproduz os seis marcos verificados no site principal e oferece um painel com a formação e os oito certificados originais. A seção de ferramentas e formação inclui uma faixa contínua com os dez ícones locais já licenciados e um carrossel dos oito certificados com imagem, dados e PDF juntos, setas, teclado, gesto de deslizar e pausa. A rotação de seis segundos pausa fora da seção, com foco em um link de certificado/PDF, com um painel aberto, com aba oculta ou com os efeitos gerais pausados. O mouse sobre o cartão e o foco nos botões de setas ou continuar não interrompem a rotação. O controle específico de certificados é um ícone discreto; a faixa de ferramentas usa o controle geral de efeitos. E-mail, LinkedIn e GitHub têm ícones junto aos textos de contato.

No desktop, um gesto da roda do mouse ou do trackpad avança ou volta uma cena inteira, com transição suave. Eventos de inércia do mesmo gesto são ignorados até terminar a transição e haver uma pausa de 180 ms; assim, um gesto não pula várias cenas. Com efeitos pausados, o avanço é imediato. No celular, nos painéis de detalhes e durante o zoom do navegador, a rolagem continua nativa. Menu, indicadores, setas e teclado permitem navegar diretamente. Em telas de até 900 px ou altura de até 600 px, o conteúdo volta ao fluxo vertical. A apresentação dos elementos começa quando 72% da cena está visível no desktop: título, textos, imagens e ações entram em sequência, com esmaecimento de um segundo, deslocamento vertical de 28 px e intervalos de 135 ms. O foco na seção não antecipa a sequência; controles focados pelo teclado permanecem visíveis. A sequência se repete após sair e voltar à cena, sem reiniciar em pequenas inversões do scroll. No celular, o limiar é menor para manter seções longas acessíveis. Fundos e geometria das seções permanecem estáveis, sem zoom no conjunto. O botão “Pausar efeitos” desativa animações, profundidade e suavização. Os painéis permitem fechar com Escape, botão ou clique no fundo, mantêm o foco dentro deles e devolvem o foco ao botão de origem. As telas da Libby alternam entre execuções e dashboard, com indicadores históricos identificados. A proposta tem seletores PT/EN e claro/escuro no cabeçalho e não é indexável. O inglês cobre a página, os quatro estudos de caso, a trajetória, os certificados, metadados e rótulos acessíveis; capturas e certificados originais conservam seu idioma. O currículo acompanha o idioma selecionado. O tema claro usa lavanda, branco e azul, preservando as cores originais das capturas e documentos. Idioma, tema e movimento são lembrados na chave local `horizontal-preferences`, separada das preferências do site principal. A troca ocorre sem recarregar, preservando seção e painéis abertos; `?lang=en&theme=light` permite compartilhar as escolhas, com prioridade sobre as salvas. Para testar localmente, execute `npm run dev` e abra `http://localhost:4173/horizontal/`. A publicação pelo workflow existente inclui esta exploração em `https://hugolalmeida.github.io/hugo-almeida-portfolio/horizontal/`, preservando a página principal na raiz. A checagem pós-deploy verifica o HTML e os oito arquivos de CSS/JavaScript da exploração contra a revisão enviada. Por solicitação do autor, os efeitos desta versão experimental iniciam ativados também na URL normal na primeira visita, independentemente da preferência de movimento reduzido do sistema; uma escolha posterior de pausar é lembrada. O visitante pode pausá-los no botão “Pausar efeitos” e repetir a entrada pelo botão ↻. `?motion=off` abre sem movimento e `?motion=on` mantém os efeitos ativados. Essa escolha abrange o JavaScript e as regras CSS, sem alterar configurações do sistema nem o portfólio principal.

`/conceito/` contém uma proposta separada para a abertura e o caso da Libby, sem substituir o portfólio principal. A direção editorial usa a foto do autor, sua história com o AutoMessenger e telas editadas da Libby. A proposta é em português e não é indexável. O botão de comparação retorna à versão completa atual; os botões da Libby alternam entre catálogo, execuções e dashboard. Nenhuma automação real é executada pela página.

O autor preferiu manter o visual do portfólio principal e aproveitar a apresentação da Libby: contribuição explícita e navegação por encontrar a rotina, acompanhar a execução e olhar a operação. Essa adaptação está no bloco `#libby` do site principal, com legendas específicas por tela e tradução para inglês.

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

## Tema

O botão de sol/lua no cabeçalho alterna entre claro e escuro. A preferência é salva no navegador e continua ao trocar de idioma. Sem uma escolha salva, o site acompanha o tema do sistema. O tema é aplicado antes dos estilos para evitar um clarão ao carregar. As capturas e os documentos mantêm suas cores originais. A proposta separada em `/conceito/` conserva sua direção visual própria.

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

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` valida os arquivos e publica a pasta `dist/` a cada push na branch `main`. Não há dependências npm para instalar nem credenciais adicionais para configurar.

Depois do deploy, o workflow verifica a página inicial e os arquivos de CSS e JavaScript. Ele identifica uma eventual publicação antiga do README na raiz e só termina com sucesso quando o portfólio esperado estiver acessível.

No repositório, abra **Settings → Pages → Build and deployment → Source** e selecione **GitHub Actions**. Depois acompanhe o workflow **Publicar portfolio no GitHub Pages** na aba **Actions**. Se o primeiro workflow tiver sido executado antes de ativar o Pages, use **Re-run all jobs** ou **Run workflow** após ativar.

Endereço esperado após uma publicação bem-sucedida: https://hugolalmeida.github.io/hugo-almeida-portfolio/

Os links de arquivos usam caminhos relativos para funcionar na subpasta do repositório. O tema, os idiomas, os certificados e os currículos não dependem de servidor de aplicação. A configuração anterior `vercel.json` permanece disponível como alternativa de hospedagem.
