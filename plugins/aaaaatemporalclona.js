// plugins/owner/fixdb.js
const handler = async (m, { conn }) => {
  const users = global.db.data.users
  const { resolveToReal } = await import('../../lib/lidResolver.js')
  
  let fusionados = 0
  let log = []

  for (const lidJid of Object.keys(users)) {
    if (!lidJid.includes('@lid')) continue
    
    const realJid = resolveToReal(lidJid)
    if (realJid === lidJid) continue // no se pudo resolver
    
    // Fusionar al JID real
    if (!users[realJid]) users[realJid] = { diamantes: 0, bank: 0, exp: 0, level: 0 }
    
    users[realJid].diamantes = (users[realJid].diamantes || 0) + (users[lidJid].diamantes || 0)
    users[realJid].bank      = (users[realJid].bank || 0)      + (users[lidJid].bank || 0)
    users[realJid].exp       = (users[realJid].exp || 0)       + (users[lidJid].exp || 0)
    if ((users[lidJid].level || 0) > (users[realJid].level || 0)) {
      users[realJid].level = users[lidJid].level
    }
    
    log.push(`${lidJid} → ${realJid} (💎 +${users[lidJid].diamantes || 0})`)
    delete users[lidJid]
    fusionados++
  }

  const { promises: fs } = await import('fs')
  await fs.writeFile('./database.json', JSON.stringify(global.db.data, null, 2))

  await conn.sendMessage(m.chat, {
    text: fusionados
      ? `✅ *${fusionados} LID(s) fusionados:*\n\n${log.join('\n')}`
      : '✅ No hay LIDs que limpiar'
  }, { quoted: m })
}

handler.command = ['fixdb']
handler.tags = ['owner']
handler.owner = true
export default handler
