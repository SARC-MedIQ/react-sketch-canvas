export default class UniqueId {
  random: string

  constructor(length?: number) {
    this.random = this.getUniqueString(length ?? 6)
  }

  get(name: string) {
    return `${name}-${this.random}`
  }

  private getUniqueString(n: number) {
    return Array(n)
      .fill("")
      .map(() =>
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
          Math.random() * 62
        )
      )
      .join("")
  }
}
