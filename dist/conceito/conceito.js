const screens={
 catalog:{file:'../assets/libby-catalog-metrics.png',name:'CATÁLOGO',alt:'Catálogo da Libby, organizado em DomBots e VM, Web e Ferramentas',caption:'Automações de diferentes áreas e ambientes reunidas no mesmo catálogo.'},
 executions:{file:'../assets/libby-executions-redacted.png',name:'EXECUÇÕES',alt:'Histórico de execuções da Libby com contatos e identificadores ocultados',caption:'O histórico reúne estados de execução e registros. Os contatos e identificadores desta captura foram ocultados.'},
 dashboard:{file:'../assets/libby-dashboard-metrics.png',name:'DASHBOARD',alt:'Dashboard da Libby com indicadores históricos de atividade e falhas',caption:'Uma visão da atividade e das falhas no momento da captura. Os números exibidos são históricos.'}
};
document.querySelectorAll('[data-screen]').forEach(button=>button.addEventListener('click',()=>{
 const screen=screens[button.dataset.screen];
 document.querySelectorAll('[data-screen]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 document.querySelector('#screen-image').src=screen.file;
 document.querySelector('#screen-image').alt=screen.alt;
 document.querySelector('#screen-full').href=screen.file;
 document.querySelector('#screen-image-link').href=screen.file;
 document.querySelector('#screen-name').textContent=screen.name;
 document.querySelector('#screen-caption').textContent=screen.caption;
}));
