/* Eenvoudige toegangscontrole (client-side). Wachtwoord is niet hoofdlettergevoelig. */
(function(){
  var H='1da9b489c94f2a36bd7f9742924c471a706e52351187d8c4a3e1806c029d6988', K='ho_toegang';
  var d=document.documentElement;
  if(location.protocol==='http:' && !/^(localhost|127\.)/.test(location.hostname)){ location.replace('https://'+location.host+location.pathname+location.search+location.hash); return; }
  var ok=false; try{ ok=sessionStorage.getItem(K)===H; }catch(e){}
  if(ok) return;
  d.classList.add('locked');
  function hex(buf){ return Array.prototype.map.call(new Uint8Array(buf),function(b){return ('0'+b.toString(16)).slice(-2)}).join(''); }
  var EN=(document.documentElement.lang||'').slice(0,2)==='en';
  var T=EN?{h:'This site is restricted',p:'Enter the password to continue.',l:'Password',b:'Enter',e:'Incorrect password.',s:'Open the site via https to sign in.'}:{h:'Deze site is afgeschermd',p:'Voer het wachtwoord in om verder te gaan.',l:'Wachtwoord',b:'Toegang',e:'Onjuist wachtwoord.',s:'Open de site via https om in te loggen.'};
  function build(){
    var g=document.createElement('div'); g.id='gate';
    g.innerHTML='<form id="gateform" autocomplete="off"><div class="gl"><svg width="34" height="36" viewBox="0 0 26 28" aria-hidden="true"><path d="M13 0l13 7v14l-13 7L0 21V7z" fill="#ffcc00"/><path d="M11 12l6 9h-3.4l-6-9z" fill="#1e2533"/></svg><b>Hypotheek<span>onderzoek</span>.nl<sup class="tm">™</sup></b></div><h1>'+T.h+'</h1><p>'+T.p+'</p><label for="gatepw">'+T.l+'</label><input id="gatepw" type="password" autofocus required><button type="submit">'+T.b+'</button><p id="gateerr" role="alert"></p></form>';
    document.body.appendChild(g);
    var f=document.getElementById('gateform'), i=document.getElementById('gatepw'), er=document.getElementById('gateerr');
    i.focus();
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var v=(i.value||'').trim().toLowerCase();
      if(!window.crypto||!crypto.subtle){ er.textContent=T.s; return; }
      crypto.subtle.digest('SHA-256',new TextEncoder().encode(v)).then(function(b){
        if(hex(b)===H){ try{sessionStorage.setItem(K,H);}catch(e){} d.classList.remove('locked'); g.remove(); }
        else { er.textContent=T.e; i.select(); }
      });
    });
  }
  if(document.body) build(); else document.addEventListener('DOMContentLoaded',build);
})();
