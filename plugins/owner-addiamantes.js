import { promises as fs } from 'fs'
import { resolveToReal } from '../lib/lidResolver.js'

let handler = async (m, { conn, args }) => {
  const DB_PATH = './database.json'
  const owners = ['5217732654942@s.whatsapp.net', '573223090406@s.whatsapp.net']

  if (!owners.includes(m.sender)) {
    return conn.sendMessage(m.chat, {
      text: '💎 「 HINATA DAR DIAMANTES 」 💎\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n\n💫 » Solo los creadores pueden usar esto\n\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦'
    }, { quoted: m })
  }

  const rawTarget = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
  const target = resolveToReal(rawTarget)

  // Si había datos en el LID, fusionarlos al JID real
  if (rawTarget !== target && global.db.data.users[rawTarget]) {
    const lidData = global.db.data.users[rawTarget]
    if (!global.db.data.users[target]) {
      global.db.data.users[target] = { diamantes: 0, bank: 0, exp: 0, level: 0 }
    }
    global.db.data.users[target].diamantes = (global.db.data.users[target].diamantes || 0) + (lidData.diamantes || 0)
    global.db.data.users[target].bank      = (global.db.data.users[target].bank || 0)      + (lidData.bank || 0)
    global.db.data.users[target].exp       = (global.db.data.users[target].exp || 0)       + (lidData.exp || 0)
    delete global.db.data.users[rawTarget]
  }

  const isSelf = !m.mentionedJid?.length && !m.quoted
  const cantidad = isSelf ? parseInt(args[0]) : parseInt(args[1])

  if (isNaN(cantidad) || cantidad <= 0) {
    return conn.sendMessage(m.chat, {
      text: '💎 「 HINATA DAR DIAMANTES 」 💎\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n\n💫 » Cantidad inválida\n\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n> #dardiamantes 100\n> #dardiamantes @usuario 100'
    }, { quoted: m })
  }

  if (!global.db.data.users[target]) {
    global.db.data.users[target] = { diamantes: 0, bank: 0, exp: 0, level: 0 }
  }

  global.db.data.users[target].diamantes = (global.db.data.users[target].diamantes || 0) + cantidad

  try {
    await fs.writeFile(DB_PATH, JSON.stringify(global.db.data, null, 2))
  } catch (e) {
    console.error('Error guardando DB:', e)
  }

  await conn.sendMessage(m.chat, {
    text: [
      '💎 「 HINATA DAR DIAMANTES 」 💎',
      '✦•┈๑⋅⋯ ⋯⋅๑┈•✦',
      '',
      '💫 » Diamantes entregados',
      '',
      `👤 » @${target.split('@')[0]}`,
      `💎 » +${cantidad} diamantes`,
      `💰 » Total: ${global.db.data.users[target].diamantes} 💎`,
      '',
      '✦•┈๑⋅⋯ ⋯⋅๑┈•✦'
    ].join('\n'),
    mentions: [target]
  }, { quoted: m })
}

handler.help = ['dardiamantes']
handler.tags = ['owner']
handler.command = /^(dardiamantes|dardinero|adddiamantes)$/i
handler.desc = 'Da diamantes a un usuario'
export default handler
