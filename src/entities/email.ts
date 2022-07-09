export class Email {
  static validade (email: string): boolean {
    if (!email) return false
    if (email.length > 320) return false
    const [local, domain] = email.split('@')
    if (domain.length > 255 || domain.length === 0) return false
    if (local.length > 64 || local.length === 0) return false
    const domailParts = domain.split('.')
    if (domailParts.some(function (part) {
      return part.length > 63
    })) return false
    return true
  }
}
