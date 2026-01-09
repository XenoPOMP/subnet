export interface CIDR {
  /**
   * Converts entity to CIDR notation.
   *
   * @example
   * (new Address(192, 168, 0, 0)).cidr(24) // 192.168.0.0/24
   */
  cidr: (...args: any[]) => string;
}
