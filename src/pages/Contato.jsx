import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ToTop from '../components/ToTop'
import { enviarContato, contatoLigado, ANEXO_MAX, ANEXO_TIPOS } from '../lib/contato'

const ASSUNTOS = {
  sugestao: 'Sugestão',
  problema: 'Encontrei um problema',
  caso: 'Quero contar como uso',
  beta: 'Quero entrar no beta',
  outro: 'Outro',
}

/** Contato: formulário próprio (o envio ainda vai ser ligado ao Supabase) */
export default function Contato({ release }) {
  const inicial = new URLSearchParams(location.search).get('assunto')
  const [assunto, setAssunto] = useState(ASSUNTOS[inicial] ? inicial : 'sugestao')
  const [sent, setSent] = useState('')
  const [estado, setEstado] = useState('pronto') // pronto | enviando | ok | erro
  const [anexo, setAnexo] = useState(null)
  const ligado = contatoLigado()
  useEffect(() => {
    const nav = document.getElementById('nav')
    const on = () => nav?.classList.toggle('solid', scrollY > 40)
    on(); addEventListener('scroll', on, { passive: true })
    document.title = 'Contato · G.W.E.N.'
    return () => removeEventListener('scroll', on)
  }, [])
  const escolherAnexo = (e) => {
    const f = e.target.files?.[0] || null
    if (f && f.size > ANEXO_MAX) { setSent('O anexo passa de 10 MB. Escolha um arquivo menor.'); e.target.value = ''; return setAnexo(null) }
    setSent(''); setAnexo(f)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!ligado) return setSent('O envio ainda não está ligado: a mensagem não foi enviada. Enquanto isso, use as Issues do GitHub.')
    const form = e.currentTarget
    const f = new FormData(form)
    setEstado('enviando'); setSent('')
    try {
      await enviarContato({ nome: f.get('nome'), email: f.get('email'), assunto, mensagem: f.get('mensagem'), publicar: f.get('publicar') === 'on', versao: release.tag, anexo })
      setEstado('ok'); setSent('Mensagem enviada. A resposta chega no e-mail que você deixou.'); form.reset(); setAnexo(null)
    } catch (err) {
      setEstado('erro'); setSent(err.message)
    }
  }
  return (
    <>
      <Nav release={release} />
      <main className="contact-page">
        <div className="contact-bg" aria-hidden="true"></div>
        <div className="blob b1" aria-hidden="true"></div>
        <div className="wrap contact">
          <div className="contact-l">
            <span className="label">$ gwen <b>--contato</b></span>
            <h1 className="h2">Fale com<br /><span className="out">quem faz.</span></h1>
            <p>Sugestão, problema, dúvida ou um relato de como você usa. Quem responde é quem faz a G.W.E.N.</p>
            <ul className="contact-ways">
              <li><i className="ph ph-envelope-simple"></i><span><b>Pelo formulário</b><small>resposta em até alguns dias, no e-mail que você deixar</small></span></li>
              <li><a href="https://github.com/gwen-org/gwen/issues" target="_blank" rel="noopener"><i className="ph ph-github-logo"></i><span><b>Issues no GitHub</b><small>para problemas que outras pessoas também podem ter</small></span><i className="ph ph-arrow-up-right go"></i></a></li>
              <li className="off"><i className="ph ph-discord-logo"></i><span><b>Discord</b><small>a comunidade abre junto com o lançamento público</small></span></li>
            </ul>
          </div>
          <form className="form" onSubmit={onSubmit}>
            <div className="row">
              <label>nome<input name="nome" type="text" placeholder="Como você se chama" maxLength={120} required /></label>
              <label>e-mail<input name="email" type="email" placeholder="voce@email.com" maxLength={200} required /></label>
            </div>
            <label>assunto
              <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                {Object.entries(ASSUNTOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label>mensagem<textarea name="mensagem" maxLength={5000} placeholder={assunto === 'caso' ? 'Conte como você usa a G.W.E.N. no seu dia' : 'Escreva aqui'} required></textarea></label>
            <label className="file">anexo <span className="opt">opcional · print, log ou PDF até 10 MB</span>
              <span className="file-box">
                <input type="file" accept={ANEXO_TIPOS} onChange={escolherAnexo} />
                <i className="ph ph-paperclip"></i>
                <span>{anexo ? anexo.name : 'Escolher arquivo'}</span>
                {anexo && <button type="button" className="file-x" onClick={(ev) => { ev.preventDefault(); setAnexo(null); ev.currentTarget.closest('.file-box').querySelector('input').value = '' }} aria-label="Tirar anexo"><i className="ph ph-x"></i></button>}
              </span>
            </label>
            {assunto === 'caso' && <label className="check"><input name="publicar" type="checkbox" /> pode publicar o meu relato no site, com nome e função</label>}
            <button className="btn btn-solid" type="submit" disabled={estado === 'enviando'}><i className={`ph ${estado === 'enviando' ? 'ph-circle-notch spin' : 'ph-paper-plane-tilt'}`}></i>{estado === 'enviando' ? 'Enviando…' : 'Enviar'}</button>
            <small className={`n${estado === 'ok' ? ' ok' : estado === 'erro' ? ' err' : ''}`}>{sent || `Versão atual: ${release.tag}. Se for um problema, diga o que fez antes de acontecer.`}</small>
          </form>
        </div>
      </main>
      <Footer release={release} />
      <ToTop />
    </>
  )
}
