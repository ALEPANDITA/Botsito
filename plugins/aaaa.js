// plugins/owner/checkjid.js
const handler = async (m, { conn }) => {
  const users = global.db.data.users
  const keys = Object.keys(users)
  
  // Mostrar todos los JIDs que tengan tu número
  const tuNumero = '573223090406'
  const relacionados = keys.filter(k => k.includes(tuNumero) || k.includes('@lid'))
  
  await conn.sendMessage(m.chat, {
    text: '🔍 JIDs en DB:\n\n' + 
      keys.map(k => `• ${k}\n  💎 ${users[k]?.diamantes || 0}`).join('\n\n') +
      '\n\n🎯 Tu número relacionado:\n' + 
      relacionados.map(k => `• ${k}`).join('\n') +
      '\n\n📨 Tu sender actual:\n• ' + m.sender
  }, { quoted: m })
}

handler.command = ['checkjid']
handler.tags = ['owner']
handler.owner = true
export default handler
