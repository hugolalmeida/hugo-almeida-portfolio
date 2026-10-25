const cases = {
  "libby": {
    "number": "01 / AUTOMAÇÃO & PRODUTO",
    "title": "Libby",
    "deck": "Uma biblioteca de automações para simplificar a rotina de diferentes áreas.",
    "tags": [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Windows RPA"
    ],
    "challenge": "Concentrar rotinas que dependem de diferentes sistemas, documentos e ambientes de execução, oferecendo uma forma clara de iniciar trabalhos e acompanhar seus resultados.",
    "contribution": "Desenvolvo e mantenho a Libby de forma autônoma na Canella & Santos Contabilidade. O nome vem de biblioteca: ela reúne praticamente todas as automações que criei para o Departamento Pessoal, Fiscal e outras rotinas, incluindo Gestta e portal Onvio.",
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
    "note": "Aplicação interna em uso profissional. Os indicadores do dashboard são um registro do momento da captura. Contatos e identificadores pessoais foram ocultados nas telas de execução. A página pública de apresentação e a medição de tempo poupado estão em preparação. O código da central permanece privado.",
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
    "contribution": "Desenvolvimento da aplicação web para a Canella & Santos Contabilidade, integrando estante de conteúdo, acesso por evento, cadastro de leads e painel da equipe.",
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
    "contribution": "Desenvolvimento dos bots Gerson, Rebecca e Bip para rotinas de informação da Canella & Santos Contabilidade, com leitura, organização de dados e comunicação no Discord.",
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
const shots = {
 dashboard: ['assets/libby-dashboard-metrics.png', 'Dashboard da Libby com indicadores de execução', 'Uma visão da atividade e das falhas no momento da captura. Os números exibidos são históricos.'],
 executions: ['assets/libby-executions-redacted.png', 'Histórico de execuções da Libby com identificadores e contatos ocultados', 'O histórico reúne estados de execução e registros. Os contatos e identificadores desta captura foram ocultados.'],
 catalog: ['assets/libby-catalog-metrics.png', 'Catálogo da Libby organizado por área e com contagens de automações', 'Automações de diferentes áreas e ambientes reunidas no mesmo catálogo.']
};
document.querySelectorAll('[data-shot]').forEach(button=>button.addEventListener('click',()=>{
 const [src,alt,caption]=shots[button.dataset.shot];
 document.querySelectorAll('[data-shot]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 document.querySelector('#libby-shot').src=src;
 document.querySelector('#libby-shot').alt=window.portfolioTranslate(alt);
 document.querySelector('#shot-link').href=src;
 document.querySelector('#shot-caption').textContent=window.portfolioTranslate(caption);
}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(filter=>{const active=filter===button;filter.classList.toggle('selected',active);filter.setAttribute('aria-pressed',String(active));});
 let visible=0;document.querySelectorAll('.card').forEach(card=>{const show=button.dataset.filter==='all'||card.dataset.category.split(' ').includes(button.dataset.filter);card.hidden=!show;if(show)visible++;});
 document.querySelector('#filter-status').textContent=window.portfolioLanguage==='en'?visible+' project'+(visible===1?'':'s')+' in this selection.':visible+' projeto'+(visible===1?'':'s')+' na seleção.';
}));
const dialog=document.querySelector('#case-dialog');
const escapeHTML=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function renderProjectLink(link,project){
 const repository=link.url.startsWith('https://github.com/');
 const label=window.portfolioTranslate(repository?'Repositório no GitHub':'Abrir site do projeto');
 const accessible=label+' — '+window.portfolioTranslate(project);
 const icon=repository?"<img src=\"assets/link-icons/github.svg\" alt=\"\" width=\"21\" height=\"21\">":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"21\" height=\"21\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z\"/></svg>";
 return '<a class="project-icon" href="'+escapeHTML(link.url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+escapeHTML(accessible)+'" title="'+escapeHTML(accessible)+'">'+icon+'</a>';
}
let caseTrigger=null;
document.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>{
 caseTrigger=button;const item=cases[button.dataset.case];
 document.querySelector('#case-content').innerHTML=`<article class="case-inner"><span class="case-number">${escapeHTML(item.number)}</span><h2 id="case-title">${escapeHTML(item.title)}</h2><p class="deck">${escapeHTML(item.deck)}</p><div class="tags">${item.tags.map(tag=>'<span>'+escapeHTML(tag)+'</span>').join('')}</div><div class="case-detail-grid"><section><h3>O desafio</h3><p>${escapeHTML(item.challenge)}</p></section><section><h3>Minha contribuição</h3><p>${escapeHTML(item.contribution)}</p></section></div><section class="case-full"><h3>O que foi construído</h3><ul>${item.features.map(feature=>'<li>'+escapeHTML(feature)+'</li>').join('')}</ul></section><div class="case-flow" aria-label="Fluxo do projeto">${item.flow.map((step,i)=>(i?'<i aria-hidden="true">→</i>':'')+'<span>'+escapeHTML(step)+'</span>').join('')}</div><section class="case-full"><h3>Uma decisão de projeto</h3><p>${escapeHTML(item.decision)}</p></section><p class="case-note">${escapeHTML(item.note)}</p>${item.links.length?'<div class="case-links">'+item.links.map(link=>renderProjectLink(link,item.title)).join('')+'</div>':''}</article>`;
 window.translatePortfolio(document.querySelector('#case-content'));
 dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');
}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');caseTrigger?.focus();});
const menuButton=document.querySelector('.menu-button');
const navigation=document.querySelector('#nav');
function closeMenu(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label',window.portfolioTranslate('Abrir menu'));}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',window.portfolioTranslate(open?'Fechar menu':'Abrir menu'));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();

window.translatePortfolio(document);

const themeToggle=document.querySelector('#theme-toggle');
function renderThemeToggle(){
 const dark=document.documentElement.dataset.theme==='dark';
 const label=window.portfolioTranslate(dark?'Ativar tema claro':'Ativar tema escuro');
 themeToggle.setAttribute('aria-pressed',String(dark));
 themeToggle.setAttribute('aria-label',label);
 themeToggle.title=label;
}
themeToggle.addEventListener('click',()=>window.portfolioTheme.toggle());
window.addEventListener('portfolio-theme-change',renderThemeToggle);
renderThemeToggle();

// A compact stage keeps one certificate's details beside two upcoming previews.
const carousel=document.querySelector('.certificate-carousel');
const certificateTrack=document.querySelector('#certificate-track');
const certificateSlides=[...certificateTrack.querySelectorAll('.certificate-slide')];
const rotationButton=document.querySelector('#cert-toggle');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
let certificateIndex=0;
let rotationPaused=motionPreference.matches;
let carouselHovered=false;
let rotationTimer=null;
function updateCertificatePosition(index,announce=false){
 certificateIndex=(index+certificateSlides.length)%certificateSlides.length;
 document.querySelector('#certificate-position').textContent=String(certificateIndex+1).padStart(2,'0')+' / '+String(certificateSlides.length).padStart(2,'0');
 certificateSlides.forEach((slide,i)=>{
  const offset=(i-certificateIndex+certificateSlides.length)%certificateSlides.length;
  slide.hidden=offset>2;
  slide.inert=offset>2;
  slide.classList.toggle('is-active',offset===0);
  slide.classList.toggle('is-preview-one',offset===1);
  slide.classList.toggle('is-preview-two',offset===2);
 });
 const selected=certificateSlides[certificateIndex];
 certificateTrack.style.setProperty('--certificate-image','url("'+selected.querySelector('img').getAttribute('src')+'")');
 if(announce)document.querySelector('#certificate-announcement').textContent=window.portfolioTranslate('Certificado')+' '+(certificateIndex+1)+' / '+certificateSlides.length+': '+selected.querySelector('h3').textContent;
}
function moveCertificate(direction,announce=true){updateCertificatePosition(certificateIndex+direction,announce);}
function refreshCertificateRotation(){
 if(rotationTimer!==null){clearInterval(rotationTimer);rotationTimer=null;}
 rotationButton.textContent=window.portfolioTranslate(rotationPaused?'Reproduzir':'Pausar');
 rotationButton.setAttribute('aria-pressed',String(rotationPaused));
 if(!rotationPaused&&!carouselHovered&&!carousel.contains(document.activeElement)&&!document.hidden){rotationTimer=setInterval(()=>moveCertificate(1,false),6500);}
}
document.querySelector('#cert-prev').addEventListener('click',()=>moveCertificate(-1));
document.querySelector('#cert-next').addEventListener('click',()=>moveCertificate(1));
rotationButton.addEventListener('click',()=>{rotationPaused=!rotationPaused;refreshCertificateRotation();});
carousel.addEventListener('keydown',event=>{
 if(event.target.closest('a'))return;
 if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();moveCertificate(event.key==='ArrowRight'?1:-1);}
});
carousel.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){carouselHovered=true;refreshCertificateRotation();}});
carousel.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'){carouselHovered=false;refreshCertificateRotation();}});
carousel.addEventListener('focusin',refreshCertificateRotation);
carousel.addEventListener('focusout',()=>setTimeout(refreshCertificateRotation,0));
document.addEventListener('visibilitychange',refreshCertificateRotation);
motionPreference.addEventListener('change',()=>{if(motionPreference.matches)rotationPaused=true;refreshCertificateRotation();});
let swipeStart=null;
let suppressSwipeClick=false;
certificateTrack.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')swipeStart=event.clientX;});
certificateTrack.addEventListener('pointercancel',()=>{swipeStart=null;});
certificateTrack.addEventListener('pointerup',event=>{
 if(swipeStart===null)return;
 const distance=event.clientX-swipeStart;swipeStart=null;
 if(Math.abs(distance)>45){moveCertificate(distance<0?1:-1);suppressSwipeClick=true;setTimeout(()=>{suppressSwipeClick=false;},400);}
});
certificateTrack.addEventListener('click',event=>{if(suppressSwipeClick){event.preventDefault();event.stopPropagation();suppressSwipeClick=false;}},true);
updateCertificatePosition(0);
refreshCertificateRotation();

const toolBelt=document.querySelector('.tool-belt');
const toolsToggle=document.querySelector('#tools-toggle');
let toolsPaused=false;
function renderToolsPause(){
 toolBelt.classList.toggle('is-paused',toolsPaused);
 toolsToggle.setAttribute('aria-pressed',String(toolsPaused));
 toolsToggle.setAttribute('aria-label',window.portfolioTranslate(toolsPaused?'Reproduzir faixa de ferramentas':'Pausar faixa de ferramentas'));
 toolsToggle.textContent=toolsPaused?'▶':'Ⅱ';
}
toolsToggle.addEventListener('click',()=>{toolsPaused=!toolsPaused;renderToolsPause();});

renderToolsPause();
