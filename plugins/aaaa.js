// plugins/owner/fixdb.js — ejecutar una vez con .fixdb y luego borrar
const handler = async (m, { conn }) => {
  const users = global.db.data.users
  const LID  = '204148502954022@lid'
  const REAL = '573223090406@s.whatsapp.net'

  if (!users[LID]) return m.reply('✅ No hay LID que limpiar')

  if (!users[REAL]) users[REAL] = { diamantes: 0, bank: 0, exp: 0, level: 0 }

  const antes = users[REAL].diamantes || 0
  users[REAL].diamantes += users[LID].diamantes || 0
  users[REAL].bank      += users[LID].bank || 0
  users[REAL].exp       += users[LID].exp || 0
  delete users[LID]

  const { promises: fs } = await import('fs')
  await fs.writeFile('./database.json', JSON.stringify(global.db.data, null, 2))

  m.reply(`✅ DB limpia\n💎 ${REAL}\nAntes: ${antes} → Ahora: ${users[REAL].diamantes}`)
}
handler.command = ['fixdb']
handler.tags = ['owner']
handler.owner = true
export default handler
