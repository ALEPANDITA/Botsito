import { promises as fs } from 'fs'

let handler = async (m, { conn }) => {
  const DB_PATH = './database.json'
  const MAIN = '573223090406@s.whatsapp.net'
  const LIDS = ['204148502954022@lid']

  try {
    const raw = await fs.readFile(DB_PATH, 'utf8')
    const data = JSON.parse(raw)
    const users = data.users || {}

    const mainUser = users[MAIN] || (users[MAIN] = { diamantes: 0, bank: 0, exp: 0, level: 0 })
    const removed = []

    for (const lid of LIDS) {
      const u = users[lid]
      if (!u) continue
      mainUser.diamantes = (mainUser.diamantes || 0) + (u.diamantes || 0)
      mainUser.bank = (mainUser.bank || 0) + (u.bank || 0)
      mainUser.exp = (mainUser.exp || 0) + (u.exp || 0)
      mainUser.level = Math.max(mainUser.level || 0, u.level || 0)
      delete users[lid]
      removed.push(lid)
    }

    data.users = users
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))

    await conn.sendMessage(m.chat, {
      text: '✅ LID fusionado.\n\n🟢 Principal: ' + MAIN + '\n🗑️ Eliminados: ' + removed.length + '\n\nAhora prueba .rank y .banco'
    }, { quoted: m })
  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: '❌ Error fusionando LID: ' + e.message
    }, { quoted: m })
  }
}

handler.help = ['fusionarlid']
handler.tags = ['owner']
handler.command = /^(fusionarlid|mergelid|cleanlid)$/i
export default handler
