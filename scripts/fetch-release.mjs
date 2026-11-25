/**
 * Puxa da release mais recente do gwen (repositório público de Releases) o que o site mostra:
 * versão, link e tamanho do instalador, a lista de versões com as notas,
 * quantas vezes cada instalador foi baixado e as estrelas do repositório.
 *
 * Roda antes de cada build (prebuild). O resultado vai para
 * src/generated/releases.json, que entra no bundle. Assim o site já nasce
 * com a versão certa, mesmo se a API do GitHub estiver fora no navegador.
 * Se a rede falhar aqui, o arquivo anterior continua valendo.
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises'

const REPO = 'gwen-org/gwen'
const OUT = new URL('../src/generated/releases.json', import.meta.url)
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'gwen-site' }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

try {
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, { headers })
  if (!res.ok) throw new Error(`GitHub respondeu ${res.status}`)
  const list = (await res.json()).filter((r) => !r.draft && !r.prerelease)
  const releases = list.map((r) => {
    const exe = (r.assets || []).find((a) => a.name.endsWith('-setup.exe'))
    return {
      tag: r.tag_name,
      name: r.name,
      date: r.published_at,
      url: r.html_url,
      notes: r.body || '',
      exe: exe ? { name: exe.name, size: exe.size, url: exe.browser_download_url } : null,
      downloads: exe?.download_count ?? 0,
    }
  })
  // estrelas do repositório: entram nos números da landing
  const repo = await fetch(`https://api.github.com/repos/${REPO}`, { headers }).then((r) => (r.ok ? r.json() : {})).catch(() => ({}))
  const stars = repo.stargazers_count ?? 0
  await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true })
  await writeFile(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), stars, releases }, null, 2))
  console.log(`[releases] ${releases.length} versões, última ${releases[0]?.tag ?? 'nenhuma'}`)
} catch (err) {
  try {
    await readFile(OUT)
    console.warn(`[releases] sem rede (${err.message}); mantendo o arquivo anterior`)
  } catch {
    await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true })
    await writeFile(OUT, JSON.stringify({ fetchedAt: null, releases: [] }, null, 2))
    console.warn(`[releases] sem rede e sem arquivo anterior (${err.message}); usando o padrão`)
  }
}
