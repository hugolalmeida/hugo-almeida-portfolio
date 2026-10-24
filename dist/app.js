const cases = {
  "libby": {
    "number": "01 / AUTOMAÇÃO & PRODUTO",
    "title": "Libby",
    "deck": "Da rotina contábil a uma operação conectada e acompanhada.",
    "tags": [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Windows RPA"
    ],
    "challenge": "Concentrar rotinas que dependem de diferentes sistemas, documentos e ambientes de execução, oferecendo uma forma clara de iniciar trabalhos e acompanhar seus resultados.",
    "contribution": "Desenvolvimento da central web e de automações utilizadas no trabalho diário na Canella & Santos: integrações, organização dos fluxos e acompanhamento das execuções.",
    "features": [
      "Catálogo de automações e ferramentas organizado por área e recurso.",
      "Filas por recurso e agentes em VMs Windows para tarefas de desktop.",
      "Histórico, logs, cancelamento e identificação de conclusões parciais.",
      "Conferência de documentos e valores com classificação de divergências.",
      "Integrações com Domínio, Onvio, Gestta e planilhas."
    ],
    "decision": "Separar o servidor web dos agentes Windows permite que cada etapa rode no ambiente de que precisa. O histórico dá visibilidade às entregas e às exceções que exigem intervenção.",
    "flow": [
      "Configurar a rotina",
      "Entrar na fila",
      "Executar no ambiente adequado",
      "Revisar o resultado"
    ],
    "note": "Aplicação interna em uso profissional. A demonstração deste portfólio é ilustrativa, usa dados fictícios e não se conecta aos sistemas da empresa. O código da central permanece privado.",
    "links": []
  },
  "ebooks": {
    "number": "02 / APLICAÇÃO WEB",
    "title": "Biblioteca de Ebooks",
    "deck": "Uma ponte entre conteúdo, eventos e novos contatos.",
    "tags": [
      "FastAPI",
      "Jinja2",
      "PostgreSQL",
      "Docker",
      "PDF"
    ],
    "challenge": "Distribuir materiais digitais em eventos e campanhas, organizar o acesso dos leitores e dar à equipe uma forma de administrar ebooks e acompanhar a origem dos leads.",
    "contribution": "Desenvolvimento da aplicação web para a Canella & Santos, integrando estante de conteúdo, acesso por evento, cadastro de leads e painel da equipe.",
    "features": [
      "Acesso a um ebook pelo QR code de um evento.",
      "Biblioteca com regras de visibilidade e arquivamento de materiais.",
      "Leitor no navegador e download com identificação do leitor.",
      "Gestão de leads e identificação de canais de campanha.",
      "Contas da equipe, verificação em duas etapas e rotina de backup."
    ],
    "decision": "Separar os caminhos do visitante, do participante de evento e da equipe atende necessidades diferentes sem obrigar todos a passar pela mesma jornada.",
    "flow": [
      "Evento ou campanha",
      "Cadastro",
      "Acesso ao material",
      "Acompanhamento pela equipe"
    ],
    "note": "A arte apresentada no portfólio é ilustrativa. Não contém dados de leads nem reproduz materiais internos.",
    "links": [
      {
        "label": "Conhecer o repositório",
        "url": "https://github.com/Tsug07/canella_ebook_libby"
      }
    ]
  },
  "disbot": {
    "number": "03 / AUTOMAÇÃO & INTEGRAÇÕES",
    "title": "DisBot Canella",
    "deck": "A informação chega à equipe com contexto para agir.",
    "tags": [
      "Python",
      "discord.py",
      "Google Sheets",
      "E-mail",
      "PDF"
    ],
    "challenge": "Reunir avisos e alterações de fontes diferentes e encaminhá-los aos responsáveis, reduzindo a necessidade de procurar cada informação manualmente.",
    "contribution": "Desenvolvimento dos bots Gerson, Rebecca e Bip para rotinas de informação da Canella & Santos, com leitura, organização de dados e comunicação no Discord.",
    "features": [
      "Gerson: monitoramento de cadastros, histórico de alterações e relatórios.",
      "Rebecca: leitura de avisos DEC, agrupamento por empresa e identificação de responsáveis.",
      "Bip: processamento de avisos do e-CAC/Bip SERPRO.",
      "Integração com planilhas para direcionamento das notificações.",
      "Ferramentas de gerenciamento e logs para acompanhar os bots."
    ],
    "decision": "As regras de encaminhamento consideram o contexto da empresa e do aviso. O Discord funciona como ponto de encontro da informação para a equipe.",
    "flow": [
      "Ler a fonte",
      "Identificar o contexto",
      "Localizar o responsável",
      "Notificar no Discord"
    ],
    "note": "A mensagem exibida neste portfólio é fictícia. A demonstração não envia mensagens nem contém informações de clientes.",
    "links": [
      {
        "label": "Conhecer o repositório",
        "url": "https://github.com/Tsug07/DisBot_Canella"
      }
    ]
  },
  "plid": {
    "number": "04 / DESENVOLVIMENTO WEB",
    "title": "PLID",
    "deck": "Estrutura e acompanhamento para o trabalho da liderança.",
    "tags": [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL"
    ],
    "challenge": "Conectar estrutura organizacional, pessoas e atividades em uma visão que ajude a liderança a acompanhar responsabilidades e metas.",
    "contribution": "Desenvolvimento de uma plataforma web com módulos de organização, cadastros e acompanhamento, usando Next.js e Supabase.",
    "features": [
      "Estrutura organizacional, cargos, pessoas e organograma.",
      "Tarefas, reuniões e metas com histórico.",
      "Workspaces e controle de acesso.",
      "Notificações e registros de auditoria.",
      "Exportação de informações para acompanhamento."
    ],
    "decision": "Uma base relacional conecta os módulos, enquanto o controle por workspace organiza o contexto de trabalho. O projeto continua evoluindo em funcionalidades e validação.",
    "flow": [
      "Organizar a estrutura",
      "Definir responsabilidades",
      "Acompanhar atividades",
      "Revisar metas"
    ],
    "note": "Projeto em evolução. A representação visual deste portfólio é ilustrativa e não demonstra todas as funcionalidades do sistema.",
    "links": [
      {
        "label": "Conhecer o repositório",
        "url": "https://github.com/hugolalmeida/PLID"
      },
      {
        "label": "Visitar o projeto",
        "url": "https://plid-platform.vercel.app/"
      }
    ]
  }
};
const demoViews = {
overview:{title:'Visão geral',html:`<div class="demo-stats"><div class="demo-stat"><strong>12</strong><span>Rotinas no catálogo</span></div><div class="demo-stat"><strong class="green">8</strong><span>Entregas concluídas</span></div><div class="demo-stat"><strong>2</strong><span>Aguardando na fila</span></div></div><p class="demo-list-title">Atividade recente</p><div class="demo-row"><span>Emissão de documentos</span><span class="badge">Concluída</span></div><div class="demo-row"><span>Conferência de valores</span><span class="badge">Concluída</span></div><div class="demo-row"><span>Publicação de arquivos</span><span class="badge wait">Na fila</span></div>`},
execution:{title:'Execução acompanhada',html:`<div class="progress-head"><strong>Emissão de documentos</strong><span class="badge">Concluída</span></div><div class="progress-track"><span></span></div><div class="demo-log"><div><span>✓</span> Parâmetros validados</div><div><span>✓</span> Agente Windows conectado</div><div><span>✓</span> Documentos gerados</div><div><span>✓</span> Resultado disponível para revisão</div></div>`},
check:{title:'Conferência de resultados',html:`<div class="check-summary">✓ &nbsp; Resultado organizado para revisão humana</div><div class="demo-stats"><div class="demo-stat"><strong>20</strong><span>Itens analisados</span></div><div class="demo-stat"><strong class="green">18</strong><span>Correspondências</span></div><div class="demo-stat"><strong>2</strong><span>Para conferir</span></div></div><div class="demo-row"><span>Empresa de exemplo A</span><span class="badge">Confere</span></div><div class="demo-row"><span>Empresa de exemplo B</span><span class="badge wait">Revisar valor</span></div>`}
};
const panel=document.querySelector('#demo-panel');
const tabs=[...document.querySelectorAll('[data-view]')];
function showView(button){
 const view=demoViews[button.dataset.view];
 tabs.forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
 document.querySelector('#demo-title').textContent=view.title;
 panel.setAttribute('aria-labelledby',button.id);panel.innerHTML=view.html;
}
tabs.forEach((button,index)=>{
 button.addEventListener('click',()=>showView(button));
 button.addEventListener('keydown',event=>{
 const actions={ArrowRight:(index+1)%tabs.length,ArrowLeft:(index+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1};
 if(!(event.key in actions))return;event.preventDefault();const next=tabs[actions[event.key]];showView(next);next.focus();
 });
});
showView(tabs[0]);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(filter=>{const active=filter===button;filter.classList.toggle('selected',active);filter.setAttribute('aria-pressed',String(active));});
 let visible=0;document.querySelectorAll('.card').forEach(card=>{const show=button.dataset.filter==='all'||card.dataset.category.split(' ').includes(button.dataset.filter);card.hidden=!show;if(show)visible++;});
 document.querySelector('#filter-status').textContent=visible+' projeto'+(visible===1?'':'s')+' na seleção.';
}));
const dialog=document.querySelector('#case-dialog');
const escapeHTML=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let caseTrigger=null;
document.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>{
 caseTrigger=button;const item=cases[button.dataset.case];
 document.querySelector('#case-content').innerHTML=`<article class="case-inner"><span class="case-number">${escapeHTML(item.number)}</span><h2 id="case-title">${escapeHTML(item.title)}</h2><p class="deck">${escapeHTML(item.deck)}</p><div class="tags">${item.tags.map(tag=>'<span>'+escapeHTML(tag)+'</span>').join('')}</div><div class="case-detail-grid"><section><h3>O desafio</h3><p>${escapeHTML(item.challenge)}</p></section><section><h3>Minha contribuição</h3><p>${escapeHTML(item.contribution)}</p></section></div><section class="case-full"><h3>O que foi construído</h3><ul>${item.features.map(feature=>'<li>'+escapeHTML(feature)+'</li>').join('')}</ul></section><div class="case-flow" aria-label="Fluxo do projeto">${item.flow.map((step,i)=>(i?'<i aria-hidden="true">→</i>':'')+'<span>'+escapeHTML(step)+'</span>').join('')}</div><section class="case-full"><h3>Uma decisão de projeto</h3><p>${escapeHTML(item.decision)}</p></section><p class="case-note">${escapeHTML(item.note)}</p>${item.links.length?'<div class="case-links">'+item.links.map(link=>'<a href="'+escapeHTML(link.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHTML(link.label)+' ↗</a>').join('')+'</div>':''}</article>`;
 dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');
}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');caseTrigger?.focus();});
const menuButton=document.querySelector('.menu-button');
const navigation=document.querySelector('#nav');
function closeMenu(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
