import { promises as fs } from 'fs'

const DB_PATH = './database.json'
const TARGET_IDS = ['5217732654942@s.whatsapp.net', '573223090406@s.whatsapp.net']
const TARGET_NAME = 'brayanrk (draven)'

function norm(v) {
  return String(v || '').toLowerCase().trim()
}

async function mergeBrayan() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8')
    const data = JSON.parse(raw)
    const users = data.users || {}
    const entries = Object.entries(users)

    const matches = entries.filter(([jid, u]) => {
      const n = norm(u.name)
      return TARGET_IDS.includes(jid) || n === TARGET_NAME || n.includes('brayanrk') || n.includes('draven')
    })

    if (matches.length < 2) return false

    const canonical = matches.find(([jid]) => TARGET_IDS.includes(jid))?.[0] || matches[0][0]
    const base = users[canonical] || (users[canonical] = { diamantes: 0, bank: 0, exp: 0, level: 0 })

    for (const [jid, u] of matches) {
      if (jid === canonical) continue
      base.diamantes = (base.diamantes || 0) + (u.diamantes || 0)
      base.bank = (base.bank || 0) + (u.bank || 0)
      base.exp = (base.exp || 0) + (u.exp || 0)
      base.level = Math.max(base.level || 0, u.level || 0)
      delete users[jid]
    }

    data.users = users
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

let handler = async (m, { conn, args }) => {
  let who = m.sender
  let owners = TARGET_IDS

  if (!owners.includes(who)) {
    return conn.sendMessage(m.chat, {
      text: '💎 「 HINATA DAR DIAMANTES 」 💎\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n\n💫 » Solo los creadores pueden usar esto\n\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦'
    }, { quoted: m })
  }

  let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : who
  let cantidad = target === who ? parseInt(args[0]) : parseInt(args[1])

  if (isNaN(cantidad) || cantidad <= 0) {
    return conn.sendMessage(m.chat, {
      text: '💎 「 HINATA DAR DIAMANTES 」 💎\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n\n💫 » Cantidad inválida\n\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n> #dardiamantes 100\n> #dardiamantes @usuario 100'
    }, { quoted: m })
  }

  let user = global.db.data.users[target]
  if (!user) {
    global.db.data.users[target] = { diamantes: 0, bank: 0, exp: 0, level: 0 }
    user = global.db.data.users[target]
  }

  user.diamantes = (user.diamantes || 0) + cantidad
  await mergeBrayan()

  await fs.writeFile(DB_PATH, JSON.stringify(global.db.data, null, 2))

  await conn.sendMessage(m.chat, {
    text: '💎 「 HINATA DAR DIAMANTES 」 💎\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n\n💫 » Diamantes entregados\n\n👤 » @' + target.split('@')[0] + '\n💎 » +' + cantidad + ' diamantes\n💰 » Total: ' + user.diamantes + ' 💎\n\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦',
    mentions: [target]
  }, { quoted: m })
}

handler.help = ['dardiamantes']
handler.tags = ['owner']
handler.command = /^(dardiamantes|dardinero|adddiamantes)$/i
handler.desc = 'Da diamantes a un usuario'

export default handler
