export type RequireOnly<T, U = {[K in keyof T]: Pick<T, K>}> = Partial<T> & U[keyof U]
