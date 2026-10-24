# Hugo Almeida — Portfólio

Primeira versão do portfólio de desenvolvimento web e automação de Hugo Almeida.

## Projetos selecionados

- **Libby:** central de automações para rotinas contábeis. Código privado.
- **Biblioteca de Ebooks:** aplicação web para distribuição de conteúdo, eventos e leads.
- **DisBot Canella:** bots de informação e integrações com Discord.
- **PLID:** plataforma de apoio à liderança.

O site apresenta estudos de caso, filtros, navegação responsiva e uma demonstração interativa da Libby. As ilustrações e os dados de demonstração são fictícios. Não há conexão com sistemas de trabalho, credenciais, dados de clientes ou automações reais.

## Rodar e verificar

Requisito: Node.js 20 ou superior. Não há dependências npm para instalar.

```sh
npm run dev
```

Abra http://localhost:4173.

```sh
npm run check
```

O código estático pronto para hospedagem fica em `dist/`. `npm run build` valida os arquivos; nenhum processo de compilação é necessário.

## Estrutura

- `dist/index.html`: conteúdo e estrutura.
- `dist/styles.css`: design e layouts responsivos.
- `dist/app.js`: demonstração, filtros e estudos de caso.
- `dist/favicon.svg`: marca do site.
- `scripts/`: servidor local e verificações.
- `.openai/hosting.json`: configuração da hospedagem Sites.

## Próximas revisões

- Revisar textos e design com Hugo.
- Acrescentar resultados profissionais medidos e autorizados para divulgação.
- Incluir canal de contato profissional escolhido pelo autor.
- Se necessário, substituir ilustrações por capturas com dados fictícios.

Fontes DM Sans e Manrope via Google Fonts, com fallback local. Construído com HTML, CSS e JavaScript.
