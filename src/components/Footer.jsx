export default function Footer({ release }) {
  return (
    <>
<footer>
  <div className="wrap z90">
    <div className="foot">
      <div>
        <a href="/#topo" className="logo"><svg viewBox="14 14 36 36"><use href="#g" color="#EDEBE7"/><rect className="charge" x="30" y="30" width="20" height="8" fill="#5E5E66"/></svg><span>G.W.E.N.</span></a>
        <p>Gestão de Wellness, Eficiência e Navegação. Um produto de Samara Silvia Sabino, feito em Recife.</p>
      </div>
      <div><h6>produto</h6><ul><li><a href="/#como-usar">Como usar</a></li><li><a href="/#recursos">Recursos</a></li><li><a href="/#planos">Planos</a></li><li><a href="/#duvidas">Dúvidas</a></li></ul></div>
      <div><h6>versões</h6><ul><li><a href="https://github.com/gwen-org/gwen/releases" target="_blank" rel="noopener">Releases</a></li><li><a href="/novidades">Novidades</a></li></ul></div>
      <div><h6>sobre</h6><ul><li><a href="/historia">História</a></li><li><a href="/#" title="Página em breve">Privacidade e termos</a></li><li><a href="/contato">Contato</a></li><li><a href="/#" aria-disabled="true">Discord (em breve)</a></li></ul></div>
    </div>
    <div className="giant" aria-hidden="true">G.W.E.N.</div>
    <div className="foot-b"><span>© 2026 Samara Silvia Sabino · todos os direitos reservados</span><span>{release.tag}</span></div>
  </div>
</footer>
    </>
  )
}
