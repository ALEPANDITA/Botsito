import { promises as fs } from 'fs'

// Resuelve LID a JID real si existe en la DB
function resolveJid(jid) {
  if (!jid) return jid
  // Si ya es un número normal, retornar directo
  if (!jid.includes('@lid')) return jid
  // Buscar si este LID está mapeado a algún JID real en la DB
  const users = global.db.data.users
  for (const realJid of Object.keys(users)) {
    if (realJid.includes('@lid')) continue
    const userData = users[realJid]
    if (userData?.jid === jid || userData?.lid === jid) return realJid
  }
  // Buscar por número dentro de los JIDs existentes
  const num = jid.split('@')[0]
  const match = Object.keys(users).find(k => k.startsWith(num + '@'))
  return match || jid
}

let handler = async (m, { conn, args }) => {
  const DB_PATH = './database.json'
  const owners = ['5217732654942@s.whatsapp.net', '573223090406@s.whatsapp.net']

  // Resolver sender primero
  const senderResolved = resolveJid(m.sender)

  if (!owners.includes(senderResolved)) {
    return conn.sendMessage(m.chat, {
      text: '💎 「 HINATA DAR DIAMANTES 」 💎\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n\n💫 » Solo los creadores pueden usar esto\n\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦'
    }, { quoted: m })
  }

  const getJid = () => {
    const mentioned = m.mentionedJid?.[0]
    const quoted = m.quoted?.sender
    const raw = mentioned || quoted || m.sender
    return resolveJid(raw)
  }

  let target = getJid()
  let cantidad = (target === senderResolved || target === m.sender)
    ? parseInt(args[0])
    : parseInt(args[1])

  if (isNaN(cantidad) || cantidad <= 0) {
    return conn.sendMessage(m.chat, {
      text: '💎 「 HINATA DAR DIAMANTES 」 💎\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n\n💫 » Cantidad inválida\n\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n> #dardiamantes 100\n> #dardiamantes @usuario 100'
    }, { quoted: m })
  }

  // Inicializar si no existe
  if (!global.db.data.users[target]) {
    global.db.data.users[target] = {
      diamantes: 0,
      bank: 0,
      exp: 0,
      level: 0
    }
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
