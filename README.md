# Hugo L. Almeida — Portfólio

Portfólio profissional de desenvolvimento web, automação de processos e integrações. A versão horizontal é a página principal, publicada em https://hugolalmeida.github.io/hugo-almeida-portfolio/.

## Navegação

No desktop, um gesto da roda do mouse ou do trackpad avança ou volta uma cena inteira. A continuação do gesto não pula várias seções. Menu, indicadores, setas e teclado também permitem navegar. Em telas de até 900 px ou altura de até 600 px, o conteúdo usa rolagem vertical, com cabeçalho fixo e atalhos que descontam a altura do menu.

As oito cenas apresentam abertura, Libby, operação da Libby, outros projetos, autor, ferramentas e formação, trajetória e contato. Os estudos de caso abrem em painéis que preservam a posição da página e devolvem o foco ao botão de origem. Podem ser fechados pelo botão, por Escape ou pelo fundo.

As entradas em sequência combinam esmaecimento e pequeno deslocamento vertical. O fundo de conexões em SVG e CSS 3D reage ao mouse nas oito seções, com contraste ajustado ao conteúdo. Ele permanece estático no celular e para de atualizar quando fica fora de vista, a aba é ocultada ou um painel é aberto.

## Preferências

O tema escuro é o padrão inicial; o tema claro usa lavanda, branco e azul. PT/EN traduzem conteúdo, rótulos acessíveis e metadados. O currículo acompanha o idioma escolhido. Capturas e certificados mantêm o idioma original.

Por escolha do autor, os efeitos iniciam ativados na primeira visita, independentemente da preferência de movimento reduzido do sistema. O botão “Pausar efeitos” interrompe animações, profundidade, suavização e carrosséis automáticos; a escolha de pausar é lembrada. O botão ↻ repete a entrada da seção.

Idioma, tema e movimento são salvos na chave `horizontal-preferences`, preservada na promoção para a página principal. `?lang=en&theme=light&motion=off` permite compartilhar preferências, com prioridade sobre as salvas.

## Conteúdo e imagens

- Libby: biblioteca de automações para DP, Fiscal e outras áreas, incluindo Domínio, Gestta e Onvio. Código privado. Quatro exemplos em “Automações na prática” mostram problema, entrada, funcionamento, entrega e decisão de implementação. A seleção foi fundamentada na leitura dos módulos locais, sem executá-los; veja `docs/libby-automation-selection.md`.
- Biblioteca de Ebooks: estudo de caso com captura da página pública e link para https://ebook.canellahub.com.br/; repositório privado. DisBot Canella e PLID: estudos de caso com links de GitHub e site disponíveis. A PLID está em evolução; seu endereço é `https://plid-platform.vercel.app/`.
- Sobre: transição de Direito para tecnologia pelo BYU–Pathway, graduação em andamento, primeiro site de One Piece, interesses pessoais e objetivo profissional confirmados pelo autor.
- Build Character: apresentação do primeiro site com aprendizados em CSS, JSON, arrays e criação de personagens. Seis capturas originais fornecidas pelo autor estão em `dist/assets/projects/build-character/`; as duas imagens repetidas do envio foram omitidas.
- Ferramentas: faixa contínua com dez ícones locais, sob o controle geral de efeitos. Nove logotipos são do Devicon, com licença em `dist/assets/tool-logos/LICENSE.devicon.txt` e proveniência em `docs/tool-logo-sources.json`. O ícone de APIs e integrações é um diagrama genérico local. O GitHub usa a mesma versão do Devicon.
- Certificados: oito documentos originais com imagem, dados e PDF juntos. Carrossel com setas, teclado, gesto de deslizar e pausa discreta. A rotação de seis segundos pausa fora da seção, com foco em um link de documento, painel aberto, aba oculta ou efeitos gerais pausados.
- Trajetória e formação: seis marcos e bacharelado em Desenvolvimento de Software na BYU–Idaho, com conclusão prevista para janeiro–fevereiro de 2027. Currículos originais em português e inglês e contato por LinkedIn e e-mail.

As imagens da Libby foram editadas para apresentação com a ferramenta integrada de imagens. Indicadores do dashboard são históricos; contatos e identificadores foram ocultados nas telas de execução. Os prompts estão em `docs/image-redactions.md`. A foto e os documentos foram fornecidos pelo autor. O PDF do LinkedIn não foi publicado. Não há métricas fictícias de economia de tempo nem conexão com sistemas da empresa.

As galerias são configuradas em `dist/horizontal/project-media.js`, com caminhos relativos à página principal. Libby e Build Character já têm imagens. Os outros projetos aguardam capturas reais. A estrutura aceita vídeos com controles, sem reprodução automática. Veja `docs/horizontal-media.md` para adicionar arquivos, legendas e traduções.

## Endereços preservados

- `/`: portfólio principal horizontal, indexável e com URL canônica na raiz.
- `/horizontal/`: redireciona para a raiz, preservando idioma, tema, movimento e seção.
- `/anterior/`: versão vertical anterior, preservada com seus scripts e estilos, sem indexação.
- `/conceito/`: primeira exploração visual, também sem indexação.

## Rodar e verificar

Node.js 20 ou superior, sem dependências npm de produção.

```sh
npm run dev
npm run check
```

Abra http://localhost:4173/. `npm run build` executa as verificações de arquivos, mídias, âncoras, painéis e sintaxe JavaScript.

## Estrutura

- `dist/index.html`: conteúdo e estrutura da página principal.
- `dist/horizontal/`: estilos, scripts, traduções, preferências e configuração das galerias. O `index.html` desse diretório serve apenas como redirecionamento dos links antigos.
- `dist/assets/`: imagens, ícones, certificados e currículos compartilhados.
- `dist/anterior/`: HTML, CSS e JavaScript da versão vertical preservada.
- `dist/conceito/`: primeira exploração visual.
- `scripts/`: servidor local e verificações de arquivos e publicação.

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` valida os arquivos e publica `dist/` a cada push em `main`. Não há dependências npm para instalar nem credenciais adicionais para configurar. Ele verifica o conteúdo publicado da nova página principal, scripts e estilos, redirecionamento e versão anterior contra os arquivos da revisão enviada, tolerando apenas diferenças de final de linha entre Windows e Linux.

No repositório, **Settings → Pages → Build and deployment → Source** deve estar em **GitHub Actions**. Acompanhe o workflow **Publicar portfolio no GitHub Pages** na aba **Actions**.

Os caminhos relativos funcionam na subpasta do repositório. A configuração `vercel.json` permanece como alternativa de hospedagem.
