export interface Equatable {
  /**
   * Returns true if other value is determined as equal to this one.
   * @param rhs instance of same class
   * @example
   * network1.equals(network2); // 192.168.0.0/24 !== 192.168.1.0/24
   */
  equals: (rhs: any) => boolean;
}
