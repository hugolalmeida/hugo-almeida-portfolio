# Imagens e vídeos da exploração horizontal

A galeria de cada estudo de caso é configurada em `dist/horizontal/project-media.js`. A Libby usa uma captura direta da demo pública de execuções e duas telas internas editadas para apresentação. A Biblioteca de Ebooks usa uma captura direta de sua página pública. DisBot e PLID têm listas vazias até que as capturas sejam fornecidas; nenhum espaço vazio ou imagem fictícia é mostrado na página.

O Build Character usa a chave `first-site`, que abre a galeria no painel “Onde tudo começou”, acessível pelo Sobre. Foram fornecidas oito imagens pelo autor; seis têm conteúdo único. Elas estão em `dist/assets/projects/build-character/`, na ordem início, formulário, raça, profissões, frutas e resultado. Os arquivos PNG originais foram preservados sem cortes ou alterações. As capturas duplicadas de raça e profissões foram omitidas. As legendas e descrições alternativas são traduzidas para inglês, mantendo o conteúdo original das telas.

Para cada projeto, vale selecionar uma visão geral, uma tarefa importante em andamento e o resultado dessa tarefa. Uma legenda curta deve explicar o que a tela demonstra e qual foi a contribuição do autor. A tela de execuções identifica os dados fictícios da demo. As telas internas da Libby mantêm a indicação de que os números são históricos.

Coloque os arquivos reais em `dist/assets/projects/` e adicione registros à lista do projeto correspondente. Este é apenas um exemplo de formato; o arquivo precisa existir antes de incluir o registro:

```js
{
  type: 'image',
  src: 'assets/projects/plid-organizacao.png',
  label: 'Organização',
  alt: 'Descrição concreta da tela fornecida',
  caption: 'O que esta tela mostra e por que ela importa.'
}
```

Vídeos usam `type: 'video'`, um arquivo MP4 ou WebM em `src` e uma imagem de capa opcional em `poster`. Use `label`, `alt` e `caption` como nas imagens. Eles têm controles, não iniciam automaticamente e são pausados ao trocar a mídia, fechar o estudo de caso ou ocultar a aba. As capturas podem ser ampliadas em outra aba.

Adicione as traduções de `label`, `alt` e `caption` a `dist/horizontal/english.js`. Execute `npm run check`: a verificação confirma que todas as mídias e capas configuradas existem e que cada entrada tem descrição e legenda.

Para revisar, abra `/`, navegue até os projetos e abra o estudo de caso. Confira a galeria em PT/EN e nos temas claro/escuro. A versão horizontal agora é a página principal; `/horizontal/` redireciona para ela e a anterior permanece em `/anterior/`.

## Demo pública da Libby

`dist/assets/libby-demo-executions.png`: captura direta de https://hugolalmeida.github.io/libby-demo/execucoes.html, em 26/10/2026, com viewport de 1852 × 1000. Gerada em Chrome headless com perfil temporário separado, sem edição da imagem. A captura aparece em “Por dentro” e na galeria do estudo de caso; os links da Libby abrem a demo pública.

## Biblioteca de Ebooks

`dist/assets/projects/canella-ebooks-home.png`: captura direta de https://ebook.canellahub.com.br/, em 26/10/2026, com viewport de 1440 × 1000, gerada em Chrome headless com perfil separado. A página exibia “Estante em montagem”. Nenhuma informação foi preenchida e nenhuma área autenticada foi acessada. Os links do portfólio direcionam ao site público; o repositório foi tornado privado pelo autor.
