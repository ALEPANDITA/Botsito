// lib/lidResolver.js
const lidCache = new Map()

export function registerParticipants(participants = []) {
  for (const p of participants) {
    if (p.lid && p.id && !p.id.includes('@lid')) {
      lidCache.set(p.lid, p.id)
    }
  }
}

export function resolveToReal(jid) {
  if (!jid) return jid
  if (!jid.includes('@lid')) return jid
  return lidCache.get(jid) || jid
}
