/**
 * sdadsadasdasda
 * @param a 2131231
 * @param b 31231213
 */
function fn(a: number, b: string) {
  return { a, b };
}

interface Rabbit {
  a: number;
  b: string;
}

/**
 * just a description
 * @param a a variable
 * @param b another variable
 */
function fn2(a: number, b: string) : Rabbit {
  return { a, b };
}


interface RabbitGeneric<T = string | number> {
  a: number;
  b: T;
}

/**
 * 3333333
 * @param a 222121
 * @param b 12211221212112
 */
function fn3(a: number, b: number) : RabbitGeneric<number> {
  return { a, b };
}