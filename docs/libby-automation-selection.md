# Seleção de automações para o portfólio experimental

Seleção feita por leitura do projeto `canella_libby`, no diretório indicado pelo autor. Nenhuma automação foi executada, nenhum sistema externo foi acessado e nenhum arquivo da Libby foi modificado. O portfólio contém descrições editoriais, não cópias do código, dos dados de clientes ou dos logs.

## Critério

Quatro exemplos mostram tipos diferentes de trabalho: comunicação via API, orquestração de desktop e serviços web, conferência documental e transformação de planilhas. O cadastro marca os quatro como prontos e `get_runner` os encaminha a módulos implementados. Isso fundamenta a descrição como rotinas implementadas; não é uma verificação de funcionamento em produção nem uma medição de impacto.

O README inicial e a introdução de `registry.py` descrevem uma fase antiga com poucos runners reais. Para esta seleção, prevalecem os registros específicos, a resolução dos runners e seus módulos atuais.

## Evidência e limites

| Exemplo | Fontes relativas ao projeto Libby | Evidência usada |
| --- | --- | --- |
| AutoMessenger ONE | `server/app/registry.py`, `server/app/automations/automessenger_one.py` | Etapas de atualização opcional de contatos, preparação, validação e envio. O runner impede o envio sem validação e aplica o limite configurado para falhas. Possui simulação. |
| Aviso de Vencimento completo | `server/app/registry.py`, `server/app/automations/avisos_dombot.py`, `avisos_vencimento/dombot_headless.py` | Emissão e download no Domínio; publicação no Onvio e tarefas no Gestta são configuráveis. Se a publicação ativada tiver erros e nenhum documento estiver publicado ou já disponível, a conclusão no Gestta é bloqueada. |
| FGTS × Resumo da Folha | `server/app/registry.py`, `server/app/automations/conferir_valores_fgts.py`, `conferencia_valores/conferir_fgts.py` | Leitura de guias e resumo, agrupamento por raiz do CNPJ do empregador, comparação do total com FGTS e consignado, classificação de divergências e relatório XLSX. Os originais não são alterados. |
| Divisor ICMS / FECOEP | `server/app/registry.py`, `server/app/automations/divisor_icms_fecoep.py`, `vendor/divisor_icms/divisor_icms_core.py` | Processamento de várias planilhas, identificação de cabeçalhos pelo nome, rejeição de arquivos já processados, novas colunas e totais, relatórios para download. A regra numérica implementada não foi apresentada como orientação tributária geral. |

## Apresentação

O bloco “Automações na prática” fica no estudo de caso da Libby, após desafio e contribuição, antes das funcionalidades e decisões de arquitetura da biblioteca. Quatro detalhes expansíveis apresentam problema, entrada, funcionamento, entrega e uma decisão de implementação. O primeiro começa aberto. Há tradução completa para inglês e estilos para os dois temas e celular.

Não foram incluídos nomes de clientes, identificadores, contatos, caminhos operacionais, credenciais, valores de produção ou métricas de tempo poupado. Capturas específicas dessas rotinas podem ser acrescentadas posteriormente com material selecionado pelo autor.
