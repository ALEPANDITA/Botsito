// lib/lidResolver.js

// Cache LID → JID real
// Los hardcodeados resuelven desde el arranque sin esperar actividad en el grupo
const lidCache = new Map([
  ['204148502954022@lid', '573223090406@s.whatsapp.net'],
])

// Se llama automáticamente en handler.js cada vez que hay un mensaje en grupo
export function registerParticipants(participants = []) {
  for (const p of participants) {
    if (p.lid && p.id && !p.id.includes('@lid')) {
      lidCache.set(p.lid, p.id)
    }
  }
}

// Resuelve un LID a su JID real, si no está en cache devuelve el mismo JID
export function resolveToReal(jid) {
  if (!jid) return jid
  if (!jid.includes('@lid')) return jid
  return lidCache.get(jid) || jid
}
