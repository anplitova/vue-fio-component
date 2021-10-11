type ReturnPipeFn<T extends Array<any>> = (...args: T) => void
type CompareFn<T extends Array<any>> = (a: T, b: T) => boolean

export const debounce = <T extends Array<any>, Ctx = any>(fn: (...args: T) => void, ms = 300): ReturnPipeFn<T> => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: Ctx, ...args: T) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export const clearUniq = <T extends Array<any>, Ctx = any>(fn: (...args: T) => void, compare: CompareFn<T> = () => true) => {
  let _cacheValue: T

  return function (this: Ctx, ...args: T) {
    if (!_cacheValue || compare(args, _cacheValue)) {
      _cacheValue = args
      fn.apply(this, args)
    }
  }
}
