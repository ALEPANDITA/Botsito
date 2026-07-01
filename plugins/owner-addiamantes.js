import { promises as fs } from 'fs'

function resolveToReal(jid, conn) {
  if (!jid) return jid
  // Si ya es JID real, retornar directo
  if (!jid.includes('@lid')) return jid
  // Buscar en contacts de Baileys el JID real mapeado a este LID
  const contacts = conn.contacts || {}
  for (const [realJid, contact] of Object.entries(contacts)) {
    if (realJid.includes('@lid')) continue
    if (contact?.lid === jid || contact?.id === jid) return realJid
  }
  // Buscar en la DB si algún JID real tiene este LID guardado
  const users = global.db.data.users
  for (const realJid of Object.keys(users)) {
    if (realJid.includes('@lid')) continue
    if (users[realJid]?.lid === jid) return realJid
  }
  return jid
}

// Fusiona LID en JID real dentro de la DB
function mergeLidToReal(lidJid, realJid) {
  const users = global.db.data.users
  if (!users[lidJid] || lidJid === realJid) return
  // Sumar los campos al JID real
  if (!users[realJid]) users[realJid] = { diamantes: 0, bank: 0, exp: 0, level: 0 }
  users[realJid].diamantes = (users[realJid].diamantes || 0) + (users[lidJid].diamantes || 0)
  users[realJid].bank      = (users[realJid].bank || 0)      + (users[lidJid].bank || 0)
  users[realJid].exp       = (users[realJid].exp || 0)       + (users[lidJid].exp || 0)
  if ((users[lidJid].level || 0) > (users[realJid].level || 0)) {
    users[realJid].level = users[lidJid].level
  }
  // Eliminar la entrada LID
  delete users[lidJid]
  console.log(`[DB] LID fusionado: ${lidJid} → ${realJid}`)
}

let handler = async (m, { conn, args }) => {
  const DB_PATH = './database.json'
  const owners = ['5217732654942@s.whatsapp.net', '573223090406@s.whatsapp.net']

  // Resolver sender
  const senderReal = resolveToReal(m.sender, conn)

  if (!owners.includes(senderReal) && !owners.includes(m.sender)) {
    return conn.sendMessage(m.chat, {
      text: '💎 「 HINATA DAR DIAMANTES 」 💎\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦\n\n💫 » Solo los creadores pueden usar esto\n\n✦•┈๑⋅⋯ ⋯⋅๑┈•✦'
    }, { quoted: m })
  }

  // Resolver target
  const getRawTarget = () => {
    const mentioned = m.mentionedJid?.[0]
    const quoted = m.quoted?.sender
    return mentioned || quoted || m.sender
  }

  const rawTarget = getRawTarget()
  const target = resolveToReal(rawTarget, conn)

  // Si el target era un LID y tenemos el JID real, fusionar en DB
  if (rawTarget !== target && rawTarget.includes('@lid')) {
    mergeLidToReal(rawTarget, target)
  }

  // También fusionar el LID conocido tuyo (204148502954022@lid → 573223090406)
  // Esto limpia la DB de una vez
  const myKnownLid = '204148502954022@lid'
  if (global.db.data.users[myKnownLid]) {
    mergeLidToReal(myKnownLid, '573223090406@s.whatsapp.net')
  }

  // Detectar si es auto-dar (sin mención)
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
