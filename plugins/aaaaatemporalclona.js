import { promises as fs } from 'fs'

let handler = async (m, { conn }) => {
  const MAIN_ID = '5217732654942@s.whatsapp.net'
  const ALT_ID = '573223090406@s.whatsapp.net'
  const DB_PATH = './database.json'

  function norm(v) {
    return String(v || '').toLowerCase().trim()
  }

  try {
    const raw = await fs.readFile(DB_PATH, 'utf8')
    const data = JSON.parse(raw)
    const users = data.users || {}
    const entries = Object.entries(users)

    const matches = entries.filter(([jid, u]) => {
      const n = norm(u.name)
      return jid === MAIN_ID || jid === ALT_ID || n.includes('brayanrk') || n.includes('draven')
    })

    if (matches.length < 2) {
      return conn.sendMessage(m.chat, {
        text: '⚠️ No encontré duplicados de Brayan para limpiar.'
      }, { quoted: m })
    }

    const kept = matches.find(([jid]) => jid === MAIN_ID || jid === ALT_ID)?.[0] || matches[0][0]
    const base = users[kept] || (users[kept] = { diamantes: 0, bank: 0, exp: 0, level: 0 })
    const removed = []

    for (const [jid, u] of matches) {
      if (jid === kept) continue
      base.diamantes = (base.diamantes || 0) + (u.diamantes || 0)
      base.bank = (base.bank || 0) + (u.bank || 0)
      base.exp = (base.exp || 0) + (u.exp || 0)
      base.level = Math.max(base.level || 0, u.level || 0)
      delete users[jid]
      removed.push(jid)
    }

    data.users = users
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))

    await conn.sendMessage(m.chat, {
      text: '✅ Clon limpiado.\n\n🟢 Conservado: ' + kept + '\n🗑️ Eliminados: ' + removed.length + '\n\nAhora prueba .rank'
    }, { quoted: m })
  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: '❌ Error limpiando clon: ' + e.message
    }, { quoted: m })
  }
}

handler.help = ['limpiarclon']
handler.tags = ['owner']
handler.command = /^(limpiarclon|cleanclone|fusionarbrayan)$/i
export default handler
