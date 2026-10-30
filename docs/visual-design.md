# Camada visual

A implementação mantém HTML, CSS e JavaScript estáticos, Node >=20 e nenhuma dependência de produção. Textos, links, IDs, painéis, formulários, idiomas e rotas foram preservados. Não há SSR, canvas nem requisito de WebGL.

## Efeitos e ajustes

- `dist/horizontal/visual.css`: configurações centralizadas em `:root`, com paleta própria para `html[data-theme=light]`. Ajuste `--ambient-violet`, `--ambient-blue`, `--ambient-rose`, `--ambient-intensity` e `--ambient-duration` (duração maior = movimento mais lento). O gradiente ocupa apenas a abertura e deixa o lado do texto mais discreto.
- `.surface-glass`: superfície reutilizável na navegação e no bloco de links da Libby. Ajuste `--glass-blur`, `--glass-fill`, `--glass-edge`, `--glass-highlight` e `--surface-radius`. Usa desfoque, saturação e reflexos estáticos nas bordas; **não implementa refração óptica real**. Sem suporte a backdrop-filter, mantém fundo opaco e borda.
- `dist/horizontal/visual-effects.js`: inicia o movimento apenas com a abertura visível, aba ativa, efeitos habilitados e nenhum painel aberto. Desconecta o observer e remove listeners ao sair da página; reconecta ao restaurar pelo cache de navegação. Não cria loops JavaScript, contextos gráficos nem capturas de tela.
- `dist/horizontal/horizontal.js`: respeita a preferência do sistema por movimento reduzido por padrão, mas permite ativação explícita pelo botão ou `?motion=on`. Essa escolha é salva com `motionOverride`; registros antigos sem esse marcador continuam seguindo o padrão do sistema. O botão permanece utilizável. Sem escolha explícita, também reage a mudanças da preferência do sistema durante a sessão.
- A geometria SVG/CSS existente foi preservada, com menor opacidade na abertura. Sem WebGL, a composição permanece disponível integralmente. Em até 900 px ou altura até 600 px, o gradiente é estático e uma camada é removida. Não há efeito pesado para carregar sob demanda.
- Refinamentos de espaçamento, contraste dos controles, bordas das capturas e linha divisória da abertura complementam Manrope, DM Sans e o destaque serifado existentes. Fontes continuam usando a configuração Google Fonts anterior, com fallbacks locais.

## Referências conferidas em 29/10/2026

Foram consultados READMEs, exemplos e arquivos de implementação/configuração. Nenhum código de terceiros foi copiado para a camada visual.

| Referência | API, distribuição e licença observadas | Decisão |
| --- | --- | --- |
| [React Three Fiber](https://github.com/pmndrs/react-three-fiber) | README com exemplo `Canvas`/`useFrame`; `packages/fiber/package.json` declara `@react-three/fiber` 9.8.1, React >=19 <19.4 e Three >=0.156; `LICENSE` MIT. | Não instalar: o projeto não usa React; a geometria atual já atende à composição. |
| [ShaderGradient](https://github.com/ruucm/shadergradient) | README com `ShaderGradientCanvas`/`ShaderGradient`; código `packages/shadergradient/src/ShaderGradientCanvas.tsx`; pacote `@shadergradient/react` 2.4.24, peers React/React DOM 18.2 ou 19, R3F >=8 e Three >=0.150. O README recomenda combinações de versões mais específicas. README e manifesto declaram MIT; não existe arquivo `LICENSE` na raiz consultada (404). | Referência para campos suaves de cor; alternativa CSS para evitar migração e runtime 3D. Não é integração com ShaderGradient. |
| [Liquid Glass JS](https://github.com/dashersw/liquid-glass-js) | README, exemplo de navegação, `container.js` e `LICENSE` MIT. Classes globais `Container`/`Button`, shaders WebGL e captura por html2canvas. O README lista bundle npm como pendência; `package.json` na raiz retorna 404. | Referência para bordas e transparência. Não instalar como pacote npm nem importar a demo; superfície CSS sem capturar o documento. |
| [Liquid Logo](https://github.com/paper-design/liquid-logo) | README curto, `src/hero/canvas.tsx` (React e WebGL2), manifesto privado Next 15/React 19. O arquivo `LICENSE` usa termos com cláusula Noncompete; não é MIT. | É uma aplicação demonstrativa, não um pacote `liquid-logo` para instalar. Não incorporar. |

O símbolo da navegação é texto “ha”. O `favicon.svg` contém texto, fundo e seta, não uma máscara de silhueta pronta para processamento. Para uma futura integração de metal líquido, falta uma versão oficial do monograma com letras convertidas em paths ou PNG de máscara com fundo transparente. A identidade atual foi mantida.

## Executar e verificar

```sh
npm run dev
npm run build
npm test
```

Abra `http://localhost:4173/`. O build valida os arquivos estáticos e a sintaxe, incluindo o novo controlador. Os testes verificam pausa por visibilidade, painel e movimento, limpeza na navegação, restauração pelo cache e fallback sem IntersectionObserver. Para conferir manualmente, use desktop, tablet e celular, PT/EN, temas claro/escuro, Tab/Escape, `?motion=off` e a emulação de `prefers-reduced-motion: reduce`.

A inspeção visual no Chrome não pôde ser concluída nesta sessão: a ferramenta de controle do computador interrompeu a operação porque não conseguiu identificar a URL atual com segurança. Portanto, layout e contraste finais ainda precisam de conferência visual em dispositivos reais. Não foi feito push, publicação nem deploy.


## Estados de m?dia e transi??es (Motion Principles)

Aplica??o da [skill Design Motion Principles](https://github.com/kylezantos/design-motion-principles/blob/main/skills/design-motion-principles/SKILL.md), no modo Create. Dire??o confirmada: Jakub como refer?ncia principal de acabamento, Jhey na express?o do portf?lio e Emil nos controles frequentes. Foram lidos o workflow Create, cookbook, creation-gotchas, accessibility, performance e as tr?s refer?ncias de designers. A skill foi consultada diretamente no GitHub, sem instala??o global.

- `dist/horizontal/motion-ui.css`: configura??es centrais `--motion-enter` (320 ms, 260 ms em telas pequenas), `--motion-exit` (160 ms), `--motion-media` (240 ms), `--motion-feedback` (150 ms), `--motion-ease` e `--carousel-interval` (6000 ms). O JavaScript l? os mesmos tokens, evitando diverg?ncia entre tempos de CSS e JS.
- `dist/horizontal/motion-ui.js`: servi?o compartilhado de anima??o, skeleton, carregamento/decodifica??o de m?dia, erro, descarte de listeners e prote??o contra respostas atrasadas durante trocas r?pidas. Imagens em cache aparecem sem espera artificial. A falha de m?dia preserva o espa?o e mostra uma mensagem em PT/EN. ?cones pequenos e conte?do textual est?tico n?o recebem skeletons.
- Imagens de capturas, retrato, certificados e miniaturas usam `loading=lazy` e `decoding=async`. Galerias dos estudos de caso s? s?o criadas ao abrir o respectivo painel. V?deos, quando cadastrados, carregam metadados nesse momento, sem autoplay. O skeleton termina nos metadados para manter os controles acess?veis.
- O carrossel de certificados tem entrada e sa?da curtas; a c?pia visual de sa?da ? tempor?ria, inerte e oculta da ?rvore acess?vel. Sua barra acompanha o intervalo real de troca. Pausas, abertura de painel, aba oculta e sa?da da se??o cancelam a contagem; ao retomar, o intervalo reinicia, assim como j? ocorria com o timer.
- Pain?is entram em 320 ms e saem em 160 ms; fechamento pelo bot?o, fundo e Escape continua funcional. O foco volta ao acionador. Escape e navega??o pelo teclado dispensam movimento. A altern?ncia de tema/idioma permanece imediata.
- As entradas existentes de se??o agora usam deslocamento de 10 px e sequ?ncia limitada a 180 ms, em vez dos 28 px e at? 810 ms anteriores. As sa?das s?o menores e mais r?pidas. Gradiente, geometria SVG, navega??o horizontal e reprodu??o autom?tica foram preservados.
- O progresso de navega??o existente permanece ligado ? posi??o real de rolagem. N?o h? porcentagens simuladas para downloads de imagens nem carregamento inventado em bot?es e links. Nos recursos sem progresso mensur?vel, o estado ? indeterminado com `aria-busy`.
- Pausar os efeitos mant?m skeletons est?ticos e todos os controles utiliz?veis. A prefer?ncia do sistema continua sendo o padr?o, com ativa??o expl?cita permitida pelo bot?o de efeitos, conforme a corre??o anterior.

Valida??o: `npm run build`, `npm test` (12 testes sem depend?ncias) e simula??o tempor?ria de DOM com todos os scripts em quatro cen?rios de movimento. A simula??o verifica carregamento/erro, cria??o tardia da galeria, troca de miniaturas, fechamento de painel, tema, idioma e avan?o autom?tico. Isso verifica comportamento, n?o substitui inspe??o visual em desktop e celular; o acesso ao Chrome permaneceu indispon?vel nesta sess?o.


### Ajuste de ritmo e menu mobile

Entradas agora duram 700 ms no desktop e 620 ms no celular, com deslocamento de 18 px, intervalo de 80 ms entre elementos e atraso m?ximo de 320 ms. Sa?das: 240 ms; imagens: 420 ms. Os tokens ficam em `motion-ui.css` e tamb?m controlam o bot?o de repeti??o. O menu at? 700 px usa quatro colunas iguais e links flex com altura uniforme, corrigindo a regra antiga que deixava apenas Trajet?ria/Journey como `display:inline`.
