const search=document.querySelector("#search");
const sections=[...document.querySelectorAll("main section")];
const empty=document.querySelector("#empty");
const menu=document.querySelector("#menu");
const sidebar=document.querySelector("aside");
const links=[...document.querySelectorAll("nav a")];
function activate(){const current=sections.filter(section=>!section.hidden).findLast(section=>section.getBoundingClientRect().top<=130);links.forEach(link=>link.classList.toggle("active",current&&link.hash===`#${current.id}`))}
function filter(){const query=search.value.trim().toLowerCase();let matches=0;sections.forEach(section=>{const content=`${section.dataset.search||""} ${section.textContent}`.toLowerCase();const visible=!query||content.includes(query);section.hidden=!visible;if(visible)matches+=1});empty.hidden=matches>0;activate()}
document.querySelectorAll(".tabs").forEach(tabs=>{const buttons=[...tabs.querySelectorAll("[data-tab]")];const panels=[...tabs.querySelectorAll("[data-panel]")];buttons.forEach(button=>button.addEventListener("click",()=>{buttons.forEach(item=>item.classList.toggle("active",item===button));panels.forEach(panel=>panel.classList.toggle("active",panel.dataset.panel===button.dataset.tab))}))});
search.addEventListener("input",filter);
document.addEventListener("keydown",event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();search.focus()}if(event.key==="Escape"){search.value="";filter();search.blur();sidebar.classList.remove("open");menu.setAttribute("aria-expanded","false")}});
menu.addEventListener("click",()=>{const open=sidebar.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
links.forEach(link=>link.addEventListener("click",()=>{sidebar.classList.remove("open");menu.setAttribute("aria-expanded","false")}));
window.addEventListener("scroll",activate,{passive:true});
activate();
