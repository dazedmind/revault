
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model faculty
 * 
 */
export type faculty = $Result.DefaultSelection<Prisma.$facultyPayload>
/**
 * Model students
 * 
 */
export type students = $Result.DefaultSelection<Prisma.$studentsPayload>
/**
 * Model librarian
 * 
 */
export type librarian = $Result.DefaultSelection<Prisma.$librarianPayload>
/**
 * Model papers
 * 
 */
export type papers = $Result.DefaultSelection<Prisma.$papersPayload>
/**
 * Model paper_metadata
 * 
 */
export type paper_metadata = $Result.DefaultSelection<Prisma.$paper_metadataPayload>
/**
 * Model user_bookmarks
 * 
 */
export type user_bookmarks = $Result.DefaultSelection<Prisma.$user_bookmarksPayload>
/**
 * Model Otp
 * 
 */
export type Otp = $Result.DefaultSelection<Prisma.$OtpPayload>
/**
 * Model paper_bm25_index
 * 
 */
export type paper_bm25_index = $Result.DefaultSelection<Prisma.$paper_bm25_indexPayload>
/**
 * Model term_score
 * 
 */
export type term_score = $Result.DefaultSelection<Prisma.$term_scorePayload>
/**
 * Model activity_logs
 * 
 */
export type activity_logs = $Result.DefaultSelection<Prisma.$activity_logsPayload>
/**
 * Model global_stats
 * 
 */
export type global_stats = $Result.DefaultSelection<Prisma.$global_statsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const activity_type: {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  VIEW_DOCUMENT: 'VIEW_DOCUMENT',
  DOWNLOAD_DOCUMENT: 'DOWNLOAD_DOCUMENT',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  ADD_USER: 'ADD_USER',
  DELETE_USER: 'DELETE_USER',
  MODIFY_USER: 'MODIFY_USER',
  DELETE_DOCUMENT: 'DELETE_DOCUMENT',
  UPDATE_DOCUMENT: 'UPDATE_DOCUMENT',
  UPLOAD_DOCUMENT: 'UPLOAD_DOCUMENT'
};

export type activity_type = (typeof activity_type)[keyof typeof activity_type]

}

export type activity_type = $Enums.activity_type

export const activity_type: typeof $Enums.activity_type

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.faculty`: Exposes CRUD operations for the **faculty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Faculties
    * const faculties = await prisma.faculty.findMany()
    * ```
    */
  get faculty(): Prisma.facultyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.students`: Exposes CRUD operations for the **students** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.students.findMany()
    * ```
    */
  get students(): Prisma.studentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.librarian`: Exposes CRUD operations for the **librarian** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Librarians
    * const librarians = await prisma.librarian.findMany()
    * ```
    */
  get librarian(): Prisma.librarianDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.papers`: Exposes CRUD operations for the **papers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Papers
    * const papers = await prisma.papers.findMany()
    * ```
    */
  get papers(): Prisma.papersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paper_metadata`: Exposes CRUD operations for the **paper_metadata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Paper_metadata
    * const paper_metadata = await prisma.paper_metadata.findMany()
    * ```
    */
  get paper_metadata(): Prisma.paper_metadataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_bookmarks`: Exposes CRUD operations for the **user_bookmarks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_bookmarks
    * const user_bookmarks = await prisma.user_bookmarks.findMany()
    * ```
    */
  get user_bookmarks(): Prisma.user_bookmarksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otp`: Exposes CRUD operations for the **Otp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Otps
    * const otps = await prisma.otp.findMany()
    * ```
    */
  get otp(): Prisma.OtpDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paper_bm25_index`: Exposes CRUD operations for the **paper_bm25_index** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Paper_bm25_indices
    * const paper_bm25_indices = await prisma.paper_bm25_index.findMany()
    * ```
    */
  get paper_bm25_index(): Prisma.paper_bm25_indexDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.term_score`: Exposes CRUD operations for the **term_score** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Term_scores
    * const term_scores = await prisma.term_score.findMany()
    * ```
    */
  get term_score(): Prisma.term_scoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity_logs`: Exposes CRUD operations for the **activity_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activity_logs
    * const activity_logs = await prisma.activity_logs.findMany()
    * ```
    */
  get activity_logs(): Prisma.activity_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.global_stats`: Exposes CRUD operations for the **global_stats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Global_stats
    * const global_stats = await prisma.global_stats.findMany()
    * ```
    */
  get global_stats(): Prisma.global_statsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    faculty: 'faculty',
    students: 'students',
    librarian: 'librarian',
    papers: 'papers',
    paper_metadata: 'paper_metadata',
    user_bookmarks: 'user_bookmarks',
    Otp: 'Otp',
    paper_bm25_index: 'paper_bm25_index',
    term_score: 'term_score',
    activity_logs: 'activity_logs',
    global_stats: 'global_stats'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "faculty" | "students" | "librarian" | "papers" | "paper_metadata" | "user_bookmarks" | "otp" | "paper_bm25_index" | "term_score" | "activity_logs" | "global_stats"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      faculty: {
        payload: Prisma.$facultyPayload<ExtArgs>
        fields: Prisma.facultyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.facultyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.facultyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload>
          }
          findFirst: {
            args: Prisma.facultyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.facultyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload>
          }
          findMany: {
            args: Prisma.facultyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload>[]
          }
          create: {
            args: Prisma.facultyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload>
          }
          createMany: {
            args: Prisma.facultyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.facultyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload>[]
          }
          delete: {
            args: Prisma.facultyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload>
          }
          update: {
            args: Prisma.facultyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload>
          }
          deleteMany: {
            args: Prisma.facultyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.facultyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.facultyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload>[]
          }
          upsert: {
            args: Prisma.facultyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$facultyPayload>
          }
          aggregate: {
            args: Prisma.FacultyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFaculty>
          }
          groupBy: {
            args: Prisma.facultyGroupByArgs<ExtArgs>
            result: $Utils.Optional<FacultyGroupByOutputType>[]
          }
          count: {
            args: Prisma.facultyCountArgs<ExtArgs>
            result: $Utils.Optional<FacultyCountAggregateOutputType> | number
          }
        }
      }
      students: {
        payload: Prisma.$studentsPayload<ExtArgs>
        fields: Prisma.studentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.studentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.studentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload>
          }
          findFirst: {
            args: Prisma.studentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.studentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload>
          }
          findMany: {
            args: Prisma.studentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload>[]
          }
          create: {
            args: Prisma.studentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload>
          }
          createMany: {
            args: Prisma.studentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.studentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload>[]
          }
          delete: {
            args: Prisma.studentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload>
          }
          update: {
            args: Prisma.studentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload>
          }
          deleteMany: {
            args: Prisma.studentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.studentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.studentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload>[]
          }
          upsert: {
            args: Prisma.studentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$studentsPayload>
          }
          aggregate: {
            args: Prisma.StudentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudents>
          }
          groupBy: {
            args: Prisma.studentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.studentsCountArgs<ExtArgs>
            result: $Utils.Optional<StudentsCountAggregateOutputType> | number
          }
        }
      }
      librarian: {
        payload: Prisma.$librarianPayload<ExtArgs>
        fields: Prisma.librarianFieldRefs
        operations: {
          findUnique: {
            args: Prisma.librarianFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.librarianFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload>
          }
          findFirst: {
            args: Prisma.librarianFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.librarianFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload>
          }
          findMany: {
            args: Prisma.librarianFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload>[]
          }
          create: {
            args: Prisma.librarianCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload>
          }
          createMany: {
            args: Prisma.librarianCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.librarianCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload>[]
          }
          delete: {
            args: Prisma.librarianDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload>
          }
          update: {
            args: Prisma.librarianUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload>
          }
          deleteMany: {
            args: Prisma.librarianDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.librarianUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.librarianUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload>[]
          }
          upsert: {
            args: Prisma.librarianUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$librarianPayload>
          }
          aggregate: {
            args: Prisma.LibrarianAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLibrarian>
          }
          groupBy: {
            args: Prisma.librarianGroupByArgs<ExtArgs>
            result: $Utils.Optional<LibrarianGroupByOutputType>[]
          }
          count: {
            args: Prisma.librarianCountArgs<ExtArgs>
            result: $Utils.Optional<LibrarianCountAggregateOutputType> | number
          }
        }
      }
      papers: {
        payload: Prisma.$papersPayload<ExtArgs>
        fields: Prisma.papersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.papersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.papersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload>
          }
          findFirst: {
            args: Prisma.papersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.papersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload>
          }
          findMany: {
            args: Prisma.papersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload>[]
          }
          create: {
            args: Prisma.papersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload>
          }
          createMany: {
            args: Prisma.papersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.papersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload>[]
          }
          delete: {
            args: Prisma.papersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload>
          }
          update: {
            args: Prisma.papersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload>
          }
          deleteMany: {
            args: Prisma.papersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.papersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.papersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload>[]
          }
          upsert: {
            args: Prisma.papersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$papersPayload>
          }
          aggregate: {
            args: Prisma.PapersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePapers>
          }
          groupBy: {
            args: Prisma.papersGroupByArgs<ExtArgs>
            result: $Utils.Optional<PapersGroupByOutputType>[]
          }
          count: {
            args: Prisma.papersCountArgs<ExtArgs>
            result: $Utils.Optional<PapersCountAggregateOutputType> | number
          }
        }
      }
      paper_metadata: {
        payload: Prisma.$paper_metadataPayload<ExtArgs>
        fields: Prisma.paper_metadataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.paper_metadataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.paper_metadataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload>
          }
          findFirst: {
            args: Prisma.paper_metadataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.paper_metadataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload>
          }
          findMany: {
            args: Prisma.paper_metadataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload>[]
          }
          create: {
            args: Prisma.paper_metadataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload>
          }
          createMany: {
            args: Prisma.paper_metadataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.paper_metadataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload>[]
          }
          delete: {
            args: Prisma.paper_metadataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload>
          }
          update: {
            args: Prisma.paper_metadataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload>
          }
          deleteMany: {
            args: Prisma.paper_metadataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.paper_metadataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.paper_metadataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload>[]
          }
          upsert: {
            args: Prisma.paper_metadataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_metadataPayload>
          }
          aggregate: {
            args: Prisma.Paper_metadataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaper_metadata>
          }
          groupBy: {
            args: Prisma.paper_metadataGroupByArgs<ExtArgs>
            result: $Utils.Optional<Paper_metadataGroupByOutputType>[]
          }
          count: {
            args: Prisma.paper_metadataCountArgs<ExtArgs>
            result: $Utils.Optional<Paper_metadataCountAggregateOutputType> | number
          }
        }
      }
      user_bookmarks: {
        payload: Prisma.$user_bookmarksPayload<ExtArgs>
        fields: Prisma.user_bookmarksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_bookmarksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_bookmarksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload>
          }
          findFirst: {
            args: Prisma.user_bookmarksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_bookmarksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload>
          }
          findMany: {
            args: Prisma.user_bookmarksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload>[]
          }
          create: {
            args: Prisma.user_bookmarksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload>
          }
          createMany: {
            args: Prisma.user_bookmarksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_bookmarksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload>[]
          }
          delete: {
            args: Prisma.user_bookmarksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload>
          }
          update: {
            args: Prisma.user_bookmarksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload>
          }
          deleteMany: {
            args: Prisma.user_bookmarksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_bookmarksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_bookmarksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload>[]
          }
          upsert: {
            args: Prisma.user_bookmarksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_bookmarksPayload>
          }
          aggregate: {
            args: Prisma.User_bookmarksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_bookmarks>
          }
          groupBy: {
            args: Prisma.user_bookmarksGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_bookmarksGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_bookmarksCountArgs<ExtArgs>
            result: $Utils.Optional<User_bookmarksCountAggregateOutputType> | number
          }
        }
      }
      Otp: {
        payload: Prisma.$OtpPayload<ExtArgs>
        fields: Prisma.OtpFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          findFirst: {
            args: Prisma.OtpFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          findMany: {
            args: Prisma.OtpFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>[]
          }
          create: {
            args: Prisma.OtpCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          createMany: {
            args: Prisma.OtpCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>[]
          }
          delete: {
            args: Prisma.OtpDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          update: {
            args: Prisma.OtpUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          deleteMany: {
            args: Prisma.OtpDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>[]
          }
          upsert: {
            args: Prisma.OtpUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpPayload>
          }
          aggregate: {
            args: Prisma.OtpAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtp>
          }
          groupBy: {
            args: Prisma.OtpGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpCountArgs<ExtArgs>
            result: $Utils.Optional<OtpCountAggregateOutputType> | number
          }
        }
      }
      paper_bm25_index: {
        payload: Prisma.$paper_bm25_indexPayload<ExtArgs>
        fields: Prisma.paper_bm25_indexFieldRefs
        operations: {
          findUnique: {
            args: Prisma.paper_bm25_indexFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.paper_bm25_indexFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload>
          }
          findFirst: {
            args: Prisma.paper_bm25_indexFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.paper_bm25_indexFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload>
          }
          findMany: {
            args: Prisma.paper_bm25_indexFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload>[]
          }
          create: {
            args: Prisma.paper_bm25_indexCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload>
          }
          createMany: {
            args: Prisma.paper_bm25_indexCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.paper_bm25_indexCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload>[]
          }
          delete: {
            args: Prisma.paper_bm25_indexDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload>
          }
          update: {
            args: Prisma.paper_bm25_indexUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload>
          }
          deleteMany: {
            args: Prisma.paper_bm25_indexDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.paper_bm25_indexUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.paper_bm25_indexUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload>[]
          }
          upsert: {
            args: Prisma.paper_bm25_indexUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$paper_bm25_indexPayload>
          }
          aggregate: {
            args: Prisma.Paper_bm25_indexAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaper_bm25_index>
          }
          groupBy: {
            args: Prisma.paper_bm25_indexGroupByArgs<ExtArgs>
            result: $Utils.Optional<Paper_bm25_indexGroupByOutputType>[]
          }
          count: {
            args: Prisma.paper_bm25_indexCountArgs<ExtArgs>
            result: $Utils.Optional<Paper_bm25_indexCountAggregateOutputType> | number
          }
        }
      }
      term_score: {
        payload: Prisma.$term_scorePayload<ExtArgs>
        fields: Prisma.term_scoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.term_scoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.term_scoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload>
          }
          findFirst: {
            args: Prisma.term_scoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.term_scoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload>
          }
          findMany: {
            args: Prisma.term_scoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload>[]
          }
          create: {
            args: Prisma.term_scoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload>
          }
          createMany: {
            args: Prisma.term_scoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.term_scoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload>[]
          }
          delete: {
            args: Prisma.term_scoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload>
          }
          update: {
            args: Prisma.term_scoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload>
          }
          deleteMany: {
            args: Prisma.term_scoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.term_scoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.term_scoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload>[]
          }
          upsert: {
            args: Prisma.term_scoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$term_scorePayload>
          }
          aggregate: {
            args: Prisma.Term_scoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTerm_score>
          }
          groupBy: {
            args: Prisma.term_scoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<Term_scoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.term_scoreCountArgs<ExtArgs>
            result: $Utils.Optional<Term_scoreCountAggregateOutputType> | number
          }
        }
      }
      activity_logs: {
        payload: Prisma.$activity_logsPayload<ExtArgs>
        fields: Prisma.activity_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.activity_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.activity_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload>
          }
          findFirst: {
            args: Prisma.activity_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.activity_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload>
          }
          findMany: {
            args: Prisma.activity_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload>[]
          }
          create: {
            args: Prisma.activity_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload>
          }
          createMany: {
            args: Prisma.activity_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.activity_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload>[]
          }
          delete: {
            args: Prisma.activity_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload>
          }
          update: {
            args: Prisma.activity_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload>
          }
          deleteMany: {
            args: Prisma.activity_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.activity_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.activity_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload>[]
          }
          upsert: {
            args: Prisma.activity_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$activity_logsPayload>
          }
          aggregate: {
            args: Prisma.Activity_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity_logs>
          }
          groupBy: {
            args: Prisma.activity_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Activity_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.activity_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Activity_logsCountAggregateOutputType> | number
          }
        }
      }
      global_stats: {
        payload: Prisma.$global_statsPayload<ExtArgs>
        fields: Prisma.global_statsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.global_statsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.global_statsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload>
          }
          findFirst: {
            args: Prisma.global_statsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.global_statsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload>
          }
          findMany: {
            args: Prisma.global_statsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload>[]
          }
          create: {
            args: Prisma.global_statsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload>
          }
          createMany: {
            args: Prisma.global_statsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.global_statsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload>[]
          }
          delete: {
            args: Prisma.global_statsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload>
          }
          update: {
            args: Prisma.global_statsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload>
          }
          deleteMany: {
            args: Prisma.global_statsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.global_statsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.global_statsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload>[]
          }
          upsert: {
            args: Prisma.global_statsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$global_statsPayload>
          }
          aggregate: {
            args: Prisma.Global_statsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobal_stats>
          }
          groupBy: {
            args: Prisma.global_statsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Global_statsGroupByOutputType>[]
          }
          count: {
            args: Prisma.global_statsCountArgs<ExtArgs>
            result: $Utils.Optional<Global_statsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    faculty?: facultyOmit
    students?: studentsOmit
    librarian?: librarianOmit
    papers?: papersOmit
    paper_metadata?: paper_metadataOmit
    user_bookmarks?: user_bookmarksOmit
    otp?: OtpOmit
    paper_bm25_index?: paper_bm25_indexOmit
    term_score?: term_scoreOmit
    activity_logs?: activity_logsOmit
    global_stats?: global_statsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    user_bookmarks: number
    activity_logs: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_bookmarks?: boolean | UsersCountOutputTypeCountUser_bookmarksArgs
    activity_logs?: boolean | UsersCountOutputTypeCountActivity_logsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountUser_bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_bookmarksWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountActivity_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: activity_logsWhereInput
  }


  /**
   * Count Type LibrarianCountOutputType
   */

  export type LibrarianCountOutputType = {
    activity_logs: number
  }

  export type LibrarianCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activity_logs?: boolean | LibrarianCountOutputTypeCountActivity_logsArgs
  }

  // Custom InputTypes
  /**
   * LibrarianCountOutputType without action
   */
  export type LibrarianCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LibrarianCountOutputType
     */
    select?: LibrarianCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LibrarianCountOutputType without action
   */
  export type LibrarianCountOutputTypeCountActivity_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: activity_logsWhereInput
  }


  /**
   * Count Type PapersCountOutputType
   */

  export type PapersCountOutputType = {
    paper_metadata: number
    user_bookmarks: number
    paper_bm25_index: number
    term_score: number
  }

  export type PapersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper_metadata?: boolean | PapersCountOutputTypeCountPaper_metadataArgs
    user_bookmarks?: boolean | PapersCountOutputTypeCountUser_bookmarksArgs
    paper_bm25_index?: boolean | PapersCountOutputTypeCountPaper_bm25_indexArgs
    term_score?: boolean | PapersCountOutputTypeCountTerm_scoreArgs
  }

  // Custom InputTypes
  /**
   * PapersCountOutputType without action
   */
  export type PapersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PapersCountOutputType
     */
    select?: PapersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PapersCountOutputType without action
   */
  export type PapersCountOutputTypeCountPaper_metadataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: paper_metadataWhereInput
  }

  /**
   * PapersCountOutputType without action
   */
  export type PapersCountOutputTypeCountUser_bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_bookmarksWhereInput
  }

  /**
   * PapersCountOutputType without action
   */
  export type PapersCountOutputTypeCountPaper_bm25_indexArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: paper_bm25_indexWhereInput
  }

  /**
   * PapersCountOutputType without action
   */
  export type PapersCountOutputTypeCountTerm_scoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: term_scoreWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    user_id: number | null
  }

  export type UsersSumAggregateOutputType = {
    user_id: number | null
  }

  export type UsersMinAggregateOutputType = {
    user_id: number | null
    first_name: string | null
    mid_name: string | null
    last_name: string | null
    ext_name: string | null
    email: string | null
    profile_picture: string | null
    role: string | null
    password: string | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    user_id: number | null
    first_name: string | null
    mid_name: string | null
    last_name: string | null
    ext_name: string | null
    email: string | null
    profile_picture: string | null
    role: string | null
    password: string | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    user_id: number
    first_name: number
    mid_name: number
    last_name: number
    ext_name: number
    email: number
    profile_picture: number
    role: number
    password: number
    created_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    user_id?: true
  }

  export type UsersSumAggregateInputType = {
    user_id?: true
  }

  export type UsersMinAggregateInputType = {
    user_id?: true
    first_name?: true
    mid_name?: true
    last_name?: true
    ext_name?: true
    email?: true
    profile_picture?: true
    role?: true
    password?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    user_id?: true
    first_name?: true
    mid_name?: true
    last_name?: true
    ext_name?: true
    email?: true
    profile_picture?: true
    role?: true
    password?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    user_id?: true
    first_name?: true
    mid_name?: true
    last_name?: true
    ext_name?: true
    email?: true
    profile_picture?: true
    role?: true
    password?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    user_id: number
    first_name: string | null
    mid_name: string | null
    last_name: string | null
    ext_name: string | null
    email: string
    profile_picture: string | null
    role: string | null
    password: string
    created_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    first_name?: boolean
    mid_name?: boolean
    last_name?: boolean
    ext_name?: boolean
    email?: boolean
    profile_picture?: boolean
    role?: boolean
    password?: boolean
    created_at?: boolean
    faculty?: boolean | users$facultyArgs<ExtArgs>
    students?: boolean | users$studentsArgs<ExtArgs>
    librarian?: boolean | users$librarianArgs<ExtArgs>
    user_bookmarks?: boolean | users$user_bookmarksArgs<ExtArgs>
    activity_logs?: boolean | users$activity_logsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    first_name?: boolean
    mid_name?: boolean
    last_name?: boolean
    ext_name?: boolean
    email?: boolean
    profile_picture?: boolean
    role?: boolean
    password?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    first_name?: boolean
    mid_name?: boolean
    last_name?: boolean
    ext_name?: boolean
    email?: boolean
    profile_picture?: boolean
    role?: boolean
    password?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    user_id?: boolean
    first_name?: boolean
    mid_name?: boolean
    last_name?: boolean
    ext_name?: boolean
    email?: boolean
    profile_picture?: boolean
    role?: boolean
    password?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "first_name" | "mid_name" | "last_name" | "ext_name" | "email" | "profile_picture" | "role" | "password" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faculty?: boolean | users$facultyArgs<ExtArgs>
    students?: boolean | users$studentsArgs<ExtArgs>
    librarian?: boolean | users$librarianArgs<ExtArgs>
    user_bookmarks?: boolean | users$user_bookmarksArgs<ExtArgs>
    activity_logs?: boolean | users$activity_logsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      faculty: Prisma.$facultyPayload<ExtArgs> | null
      students: Prisma.$studentsPayload<ExtArgs> | null
      librarian: Prisma.$librarianPayload<ExtArgs> | null
      user_bookmarks: Prisma.$user_bookmarksPayload<ExtArgs>[]
      activity_logs: Prisma.$activity_logsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      first_name: string | null
      mid_name: string | null
      last_name: string | null
      ext_name: string | null
      email: string
      profile_picture: string | null
      role: string | null
      password: string
      created_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const usersWithUser_idOnly = await prisma.users.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const usersWithUser_idOnly = await prisma.users.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const usersWithUser_idOnly = await prisma.users.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    faculty<T extends users$facultyArgs<ExtArgs> = {}>(args?: Subset<T, users$facultyArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    students<T extends users$studentsArgs<ExtArgs> = {}>(args?: Subset<T, users$studentsArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    librarian<T extends users$librarianArgs<ExtArgs> = {}>(args?: Subset<T, users$librarianArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user_bookmarks<T extends users$user_bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, users$user_bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activity_logs<T extends users$activity_logsArgs<ExtArgs> = {}>(args?: Subset<T, users$activity_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly user_id: FieldRef<"users", 'Int'>
    readonly first_name: FieldRef<"users", 'String'>
    readonly mid_name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly ext_name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly profile_picture: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.faculty
   */
  export type users$facultyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    where?: facultyWhereInput
  }

  /**
   * users.students
   */
  export type users$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    where?: studentsWhereInput
  }

  /**
   * users.librarian
   */
  export type users$librarianArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    where?: librarianWhereInput
  }

  /**
   * users.user_bookmarks
   */
  export type users$user_bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    where?: user_bookmarksWhereInput
    orderBy?: user_bookmarksOrderByWithRelationInput | user_bookmarksOrderByWithRelationInput[]
    cursor?: user_bookmarksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_bookmarksScalarFieldEnum | User_bookmarksScalarFieldEnum[]
  }

  /**
   * users.activity_logs
   */
  export type users$activity_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    where?: activity_logsWhereInput
    orderBy?: activity_logsOrderByWithRelationInput | activity_logsOrderByWithRelationInput[]
    cursor?: activity_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Activity_logsScalarFieldEnum | Activity_logsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model faculty
   */

  export type AggregateFaculty = {
    _count: FacultyCountAggregateOutputType | null
    _avg: FacultyAvgAggregateOutputType | null
    _sum: FacultySumAggregateOutputType | null
    _min: FacultyMinAggregateOutputType | null
    _max: FacultyMaxAggregateOutputType | null
  }

  export type FacultyAvgAggregateOutputType = {
    employee_id: number | null
    user_id: number | null
  }

  export type FacultySumAggregateOutputType = {
    employee_id: number | null
    user_id: number | null
  }

  export type FacultyMinAggregateOutputType = {
    employee_id: number | null
    position: string | null
    department: string | null
    user_id: number | null
  }

  export type FacultyMaxAggregateOutputType = {
    employee_id: number | null
    position: string | null
    department: string | null
    user_id: number | null
  }

  export type FacultyCountAggregateOutputType = {
    employee_id: number
    position: number
    department: number
    user_id: number
    _all: number
  }


  export type FacultyAvgAggregateInputType = {
    employee_id?: true
    user_id?: true
  }

  export type FacultySumAggregateInputType = {
    employee_id?: true
    user_id?: true
  }

  export type FacultyMinAggregateInputType = {
    employee_id?: true
    position?: true
    department?: true
    user_id?: true
  }

  export type FacultyMaxAggregateInputType = {
    employee_id?: true
    position?: true
    department?: true
    user_id?: true
  }

  export type FacultyCountAggregateInputType = {
    employee_id?: true
    position?: true
    department?: true
    user_id?: true
    _all?: true
  }

  export type FacultyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which faculty to aggregate.
     */
    where?: facultyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of faculties to fetch.
     */
    orderBy?: facultyOrderByWithRelationInput | facultyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: facultyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` faculties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` faculties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned faculties
    **/
    _count?: true | FacultyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FacultyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FacultySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacultyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacultyMaxAggregateInputType
  }

  export type GetFacultyAggregateType<T extends FacultyAggregateArgs> = {
        [P in keyof T & keyof AggregateFaculty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFaculty[P]>
      : GetScalarType<T[P], AggregateFaculty[P]>
  }




  export type facultyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: facultyWhereInput
    orderBy?: facultyOrderByWithAggregationInput | facultyOrderByWithAggregationInput[]
    by: FacultyScalarFieldEnum[] | FacultyScalarFieldEnum
    having?: facultyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacultyCountAggregateInputType | true
    _avg?: FacultyAvgAggregateInputType
    _sum?: FacultySumAggregateInputType
    _min?: FacultyMinAggregateInputType
    _max?: FacultyMaxAggregateInputType
  }

  export type FacultyGroupByOutputType = {
    employee_id: number
    position: string | null
    department: string | null
    user_id: number
    _count: FacultyCountAggregateOutputType | null
    _avg: FacultyAvgAggregateOutputType | null
    _sum: FacultySumAggregateOutputType | null
    _min: FacultyMinAggregateOutputType | null
    _max: FacultyMaxAggregateOutputType | null
  }

  type GetFacultyGroupByPayload<T extends facultyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FacultyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacultyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacultyGroupByOutputType[P]>
            : GetScalarType<T[P], FacultyGroupByOutputType[P]>
        }
      >
    >


  export type facultySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employee_id?: boolean
    position?: boolean
    department?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faculty"]>

  export type facultySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employee_id?: boolean
    position?: boolean
    department?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faculty"]>

  export type facultySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employee_id?: boolean
    position?: boolean
    department?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["faculty"]>

  export type facultySelectScalar = {
    employee_id?: boolean
    position?: boolean
    department?: boolean
    user_id?: boolean
  }

  export type facultyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"employee_id" | "position" | "department" | "user_id", ExtArgs["result"]["faculty"]>
  export type facultyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type facultyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type facultyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $facultyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "faculty"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      employee_id: number
      position: string | null
      department: string | null
      user_id: number
    }, ExtArgs["result"]["faculty"]>
    composites: {}
  }

  type facultyGetPayload<S extends boolean | null | undefined | facultyDefaultArgs> = $Result.GetResult<Prisma.$facultyPayload, S>

  type facultyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<facultyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FacultyCountAggregateInputType | true
    }

  export interface facultyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['faculty'], meta: { name: 'faculty' } }
    /**
     * Find zero or one Faculty that matches the filter.
     * @param {facultyFindUniqueArgs} args - Arguments to find a Faculty
     * @example
     * // Get one Faculty
     * const faculty = await prisma.faculty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends facultyFindUniqueArgs>(args: SelectSubset<T, facultyFindUniqueArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Faculty that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {facultyFindUniqueOrThrowArgs} args - Arguments to find a Faculty
     * @example
     * // Get one Faculty
     * const faculty = await prisma.faculty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends facultyFindUniqueOrThrowArgs>(args: SelectSubset<T, facultyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Faculty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {facultyFindFirstArgs} args - Arguments to find a Faculty
     * @example
     * // Get one Faculty
     * const faculty = await prisma.faculty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends facultyFindFirstArgs>(args?: SelectSubset<T, facultyFindFirstArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Faculty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {facultyFindFirstOrThrowArgs} args - Arguments to find a Faculty
     * @example
     * // Get one Faculty
     * const faculty = await prisma.faculty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends facultyFindFirstOrThrowArgs>(args?: SelectSubset<T, facultyFindFirstOrThrowArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Faculties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {facultyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Faculties
     * const faculties = await prisma.faculty.findMany()
     * 
     * // Get first 10 Faculties
     * const faculties = await prisma.faculty.findMany({ take: 10 })
     * 
     * // Only select the `employee_id`
     * const facultyWithEmployee_idOnly = await prisma.faculty.findMany({ select: { employee_id: true } })
     * 
     */
    findMany<T extends facultyFindManyArgs>(args?: SelectSubset<T, facultyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Faculty.
     * @param {facultyCreateArgs} args - Arguments to create a Faculty.
     * @example
     * // Create one Faculty
     * const Faculty = await prisma.faculty.create({
     *   data: {
     *     // ... data to create a Faculty
     *   }
     * })
     * 
     */
    create<T extends facultyCreateArgs>(args: SelectSubset<T, facultyCreateArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Faculties.
     * @param {facultyCreateManyArgs} args - Arguments to create many Faculties.
     * @example
     * // Create many Faculties
     * const faculty = await prisma.faculty.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends facultyCreateManyArgs>(args?: SelectSubset<T, facultyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Faculties and returns the data saved in the database.
     * @param {facultyCreateManyAndReturnArgs} args - Arguments to create many Faculties.
     * @example
     * // Create many Faculties
     * const faculty = await prisma.faculty.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Faculties and only return the `employee_id`
     * const facultyWithEmployee_idOnly = await prisma.faculty.createManyAndReturn({
     *   select: { employee_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends facultyCreateManyAndReturnArgs>(args?: SelectSubset<T, facultyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Faculty.
     * @param {facultyDeleteArgs} args - Arguments to delete one Faculty.
     * @example
     * // Delete one Faculty
     * const Faculty = await prisma.faculty.delete({
     *   where: {
     *     // ... filter to delete one Faculty
     *   }
     * })
     * 
     */
    delete<T extends facultyDeleteArgs>(args: SelectSubset<T, facultyDeleteArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Faculty.
     * @param {facultyUpdateArgs} args - Arguments to update one Faculty.
     * @example
     * // Update one Faculty
     * const faculty = await prisma.faculty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends facultyUpdateArgs>(args: SelectSubset<T, facultyUpdateArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Faculties.
     * @param {facultyDeleteManyArgs} args - Arguments to filter Faculties to delete.
     * @example
     * // Delete a few Faculties
     * const { count } = await prisma.faculty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends facultyDeleteManyArgs>(args?: SelectSubset<T, facultyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Faculties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {facultyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Faculties
     * const faculty = await prisma.faculty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends facultyUpdateManyArgs>(args: SelectSubset<T, facultyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Faculties and returns the data updated in the database.
     * @param {facultyUpdateManyAndReturnArgs} args - Arguments to update many Faculties.
     * @example
     * // Update many Faculties
     * const faculty = await prisma.faculty.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Faculties and only return the `employee_id`
     * const facultyWithEmployee_idOnly = await prisma.faculty.updateManyAndReturn({
     *   select: { employee_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends facultyUpdateManyAndReturnArgs>(args: SelectSubset<T, facultyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Faculty.
     * @param {facultyUpsertArgs} args - Arguments to update or create a Faculty.
     * @example
     * // Update or create a Faculty
     * const faculty = await prisma.faculty.upsert({
     *   create: {
     *     // ... data to create a Faculty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Faculty we want to update
     *   }
     * })
     */
    upsert<T extends facultyUpsertArgs>(args: SelectSubset<T, facultyUpsertArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Faculties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {facultyCountArgs} args - Arguments to filter Faculties to count.
     * @example
     * // Count the number of Faculties
     * const count = await prisma.faculty.count({
     *   where: {
     *     // ... the filter for the Faculties we want to count
     *   }
     * })
    **/
    count<T extends facultyCountArgs>(
      args?: Subset<T, facultyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacultyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Faculty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FacultyAggregateArgs>(args: Subset<T, FacultyAggregateArgs>): Prisma.PrismaPromise<GetFacultyAggregateType<T>>

    /**
     * Group by Faculty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {facultyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends facultyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: facultyGroupByArgs['orderBy'] }
        : { orderBy?: facultyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, facultyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacultyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the faculty model
   */
  readonly fields: facultyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for faculty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__facultyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the faculty model
   */
  interface facultyFieldRefs {
    readonly employee_id: FieldRef<"faculty", 'Int'>
    readonly position: FieldRef<"faculty", 'String'>
    readonly department: FieldRef<"faculty", 'String'>
    readonly user_id: FieldRef<"faculty", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * faculty findUnique
   */
  export type facultyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    /**
     * Filter, which faculty to fetch.
     */
    where: facultyWhereUniqueInput
  }

  /**
   * faculty findUniqueOrThrow
   */
  export type facultyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    /**
     * Filter, which faculty to fetch.
     */
    where: facultyWhereUniqueInput
  }

  /**
   * faculty findFirst
   */
  export type facultyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    /**
     * Filter, which faculty to fetch.
     */
    where?: facultyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of faculties to fetch.
     */
    orderBy?: facultyOrderByWithRelationInput | facultyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for faculties.
     */
    cursor?: facultyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` faculties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` faculties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of faculties.
     */
    distinct?: FacultyScalarFieldEnum | FacultyScalarFieldEnum[]
  }

  /**
   * faculty findFirstOrThrow
   */
  export type facultyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    /**
     * Filter, which faculty to fetch.
     */
    where?: facultyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of faculties to fetch.
     */
    orderBy?: facultyOrderByWithRelationInput | facultyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for faculties.
     */
    cursor?: facultyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` faculties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` faculties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of faculties.
     */
    distinct?: FacultyScalarFieldEnum | FacultyScalarFieldEnum[]
  }

  /**
   * faculty findMany
   */
  export type facultyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    /**
     * Filter, which faculties to fetch.
     */
    where?: facultyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of faculties to fetch.
     */
    orderBy?: facultyOrderByWithRelationInput | facultyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing faculties.
     */
    cursor?: facultyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` faculties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` faculties.
     */
    skip?: number
    distinct?: FacultyScalarFieldEnum | FacultyScalarFieldEnum[]
  }

  /**
   * faculty create
   */
  export type facultyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    /**
     * The data needed to create a faculty.
     */
    data: XOR<facultyCreateInput, facultyUncheckedCreateInput>
  }

  /**
   * faculty createMany
   */
  export type facultyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many faculties.
     */
    data: facultyCreateManyInput | facultyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * faculty createManyAndReturn
   */
  export type facultyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * The data used to create many faculties.
     */
    data: facultyCreateManyInput | facultyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * faculty update
   */
  export type facultyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    /**
     * The data needed to update a faculty.
     */
    data: XOR<facultyUpdateInput, facultyUncheckedUpdateInput>
    /**
     * Choose, which faculty to update.
     */
    where: facultyWhereUniqueInput
  }

  /**
   * faculty updateMany
   */
  export type facultyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update faculties.
     */
    data: XOR<facultyUpdateManyMutationInput, facultyUncheckedUpdateManyInput>
    /**
     * Filter which faculties to update
     */
    where?: facultyWhereInput
    /**
     * Limit how many faculties to update.
     */
    limit?: number
  }

  /**
   * faculty updateManyAndReturn
   */
  export type facultyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * The data used to update faculties.
     */
    data: XOR<facultyUpdateManyMutationInput, facultyUncheckedUpdateManyInput>
    /**
     * Filter which faculties to update
     */
    where?: facultyWhereInput
    /**
     * Limit how many faculties to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * faculty upsert
   */
  export type facultyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    /**
     * The filter to search for the faculty to update in case it exists.
     */
    where: facultyWhereUniqueInput
    /**
     * In case the faculty found by the `where` argument doesn't exist, create a new faculty with this data.
     */
    create: XOR<facultyCreateInput, facultyUncheckedCreateInput>
    /**
     * In case the faculty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<facultyUpdateInput, facultyUncheckedUpdateInput>
  }

  /**
   * faculty delete
   */
  export type facultyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
    /**
     * Filter which faculty to delete.
     */
    where: facultyWhereUniqueInput
  }

  /**
   * faculty deleteMany
   */
  export type facultyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which faculties to delete
     */
    where?: facultyWhereInput
    /**
     * Limit how many faculties to delete.
     */
    limit?: number
  }

  /**
   * faculty without action
   */
  export type facultyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the faculty
     */
    select?: facultySelect<ExtArgs> | null
    /**
     * Omit specific fields from the faculty
     */
    omit?: facultyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: facultyInclude<ExtArgs> | null
  }


  /**
   * Model students
   */

  export type AggregateStudents = {
    _count: StudentsCountAggregateOutputType | null
    _avg: StudentsAvgAggregateOutputType | null
    _sum: StudentsSumAggregateOutputType | null
    _min: StudentsMinAggregateOutputType | null
    _max: StudentsMaxAggregateOutputType | null
  }

  export type StudentsAvgAggregateOutputType = {
    student_num: number | null
    year_level: number | null
    user_id: number | null
  }

  export type StudentsSumAggregateOutputType = {
    student_num: bigint | null
    year_level: number | null
    user_id: number | null
  }

  export type StudentsMinAggregateOutputType = {
    student_num: bigint | null
    program: string | null
    college: string | null
    year_level: number | null
    user_id: number | null
  }

  export type StudentsMaxAggregateOutputType = {
    student_num: bigint | null
    program: string | null
    college: string | null
    year_level: number | null
    user_id: number | null
  }

  export type StudentsCountAggregateOutputType = {
    student_num: number
    program: number
    college: number
    year_level: number
    user_id: number
    _all: number
  }


  export type StudentsAvgAggregateInputType = {
    student_num?: true
    year_level?: true
    user_id?: true
  }

  export type StudentsSumAggregateInputType = {
    student_num?: true
    year_level?: true
    user_id?: true
  }

  export type StudentsMinAggregateInputType = {
    student_num?: true
    program?: true
    college?: true
    year_level?: true
    user_id?: true
  }

  export type StudentsMaxAggregateInputType = {
    student_num?: true
    program?: true
    college?: true
    year_level?: true
    user_id?: true
  }

  export type StudentsCountAggregateInputType = {
    student_num?: true
    program?: true
    college?: true
    year_level?: true
    user_id?: true
    _all?: true
  }

  export type StudentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which students to aggregate.
     */
    where?: studentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of students to fetch.
     */
    orderBy?: studentsOrderByWithRelationInput | studentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: studentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned students
    **/
    _count?: true | StudentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentsMaxAggregateInputType
  }

  export type GetStudentsAggregateType<T extends StudentsAggregateArgs> = {
        [P in keyof T & keyof AggregateStudents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudents[P]>
      : GetScalarType<T[P], AggregateStudents[P]>
  }




  export type studentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: studentsWhereInput
    orderBy?: studentsOrderByWithAggregationInput | studentsOrderByWithAggregationInput[]
    by: StudentsScalarFieldEnum[] | StudentsScalarFieldEnum
    having?: studentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentsCountAggregateInputType | true
    _avg?: StudentsAvgAggregateInputType
    _sum?: StudentsSumAggregateInputType
    _min?: StudentsMinAggregateInputType
    _max?: StudentsMaxAggregateInputType
  }

  export type StudentsGroupByOutputType = {
    student_num: bigint
    program: string | null
    college: string | null
    year_level: number | null
    user_id: number
    _count: StudentsCountAggregateOutputType | null
    _avg: StudentsAvgAggregateOutputType | null
    _sum: StudentsSumAggregateOutputType | null
    _min: StudentsMinAggregateOutputType | null
    _max: StudentsMaxAggregateOutputType | null
  }

  type GetStudentsGroupByPayload<T extends studentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentsGroupByOutputType[P]>
            : GetScalarType<T[P], StudentsGroupByOutputType[P]>
        }
      >
    >


  export type studentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    student_num?: boolean
    program?: boolean
    college?: boolean
    year_level?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["students"]>

  export type studentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    student_num?: boolean
    program?: boolean
    college?: boolean
    year_level?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["students"]>

  export type studentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    student_num?: boolean
    program?: boolean
    college?: boolean
    year_level?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["students"]>

  export type studentsSelectScalar = {
    student_num?: boolean
    program?: boolean
    college?: boolean
    year_level?: boolean
    user_id?: boolean
  }

  export type studentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"student_num" | "program" | "college" | "year_level" | "user_id", ExtArgs["result"]["students"]>
  export type studentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type studentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type studentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $studentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "students"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      student_num: bigint
      program: string | null
      college: string | null
      year_level: number | null
      user_id: number
    }, ExtArgs["result"]["students"]>
    composites: {}
  }

  type studentsGetPayload<S extends boolean | null | undefined | studentsDefaultArgs> = $Result.GetResult<Prisma.$studentsPayload, S>

  type studentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<studentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentsCountAggregateInputType | true
    }

  export interface studentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['students'], meta: { name: 'students' } }
    /**
     * Find zero or one Students that matches the filter.
     * @param {studentsFindUniqueArgs} args - Arguments to find a Students
     * @example
     * // Get one Students
     * const students = await prisma.students.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends studentsFindUniqueArgs>(args: SelectSubset<T, studentsFindUniqueArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Students that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {studentsFindUniqueOrThrowArgs} args - Arguments to find a Students
     * @example
     * // Get one Students
     * const students = await prisma.students.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends studentsFindUniqueOrThrowArgs>(args: SelectSubset<T, studentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {studentsFindFirstArgs} args - Arguments to find a Students
     * @example
     * // Get one Students
     * const students = await prisma.students.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends studentsFindFirstArgs>(args?: SelectSubset<T, studentsFindFirstArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Students that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {studentsFindFirstOrThrowArgs} args - Arguments to find a Students
     * @example
     * // Get one Students
     * const students = await prisma.students.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends studentsFindFirstOrThrowArgs>(args?: SelectSubset<T, studentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {studentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.students.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.students.findMany({ take: 10 })
     * 
     * // Only select the `student_num`
     * const studentsWithStudent_numOnly = await prisma.students.findMany({ select: { student_num: true } })
     * 
     */
    findMany<T extends studentsFindManyArgs>(args?: SelectSubset<T, studentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Students.
     * @param {studentsCreateArgs} args - Arguments to create a Students.
     * @example
     * // Create one Students
     * const Students = await prisma.students.create({
     *   data: {
     *     // ... data to create a Students
     *   }
     * })
     * 
     */
    create<T extends studentsCreateArgs>(args: SelectSubset<T, studentsCreateArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {studentsCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const students = await prisma.students.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends studentsCreateManyArgs>(args?: SelectSubset<T, studentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {studentsCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const students = await prisma.students.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `student_num`
     * const studentsWithStudent_numOnly = await prisma.students.createManyAndReturn({
     *   select: { student_num: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends studentsCreateManyAndReturnArgs>(args?: SelectSubset<T, studentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Students.
     * @param {studentsDeleteArgs} args - Arguments to delete one Students.
     * @example
     * // Delete one Students
     * const Students = await prisma.students.delete({
     *   where: {
     *     // ... filter to delete one Students
     *   }
     * })
     * 
     */
    delete<T extends studentsDeleteArgs>(args: SelectSubset<T, studentsDeleteArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Students.
     * @param {studentsUpdateArgs} args - Arguments to update one Students.
     * @example
     * // Update one Students
     * const students = await prisma.students.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends studentsUpdateArgs>(args: SelectSubset<T, studentsUpdateArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {studentsDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.students.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends studentsDeleteManyArgs>(args?: SelectSubset<T, studentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {studentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const students = await prisma.students.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends studentsUpdateManyArgs>(args: SelectSubset<T, studentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {studentsUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const students = await prisma.students.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `student_num`
     * const studentsWithStudent_numOnly = await prisma.students.updateManyAndReturn({
     *   select: { student_num: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends studentsUpdateManyAndReturnArgs>(args: SelectSubset<T, studentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Students.
     * @param {studentsUpsertArgs} args - Arguments to update or create a Students.
     * @example
     * // Update or create a Students
     * const students = await prisma.students.upsert({
     *   create: {
     *     // ... data to create a Students
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Students we want to update
     *   }
     * })
     */
    upsert<T extends studentsUpsertArgs>(args: SelectSubset<T, studentsUpsertArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {studentsCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.students.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends studentsCountArgs>(
      args?: Subset<T, studentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentsAggregateArgs>(args: Subset<T, StudentsAggregateArgs>): Prisma.PrismaPromise<GetStudentsAggregateType<T>>

    /**
     * Group by Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {studentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends studentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: studentsGroupByArgs['orderBy'] }
        : { orderBy?: studentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, studentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the students model
   */
  readonly fields: studentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for students.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__studentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the students model
   */
  interface studentsFieldRefs {
    readonly student_num: FieldRef<"students", 'BigInt'>
    readonly program: FieldRef<"students", 'String'>
    readonly college: FieldRef<"students", 'String'>
    readonly year_level: FieldRef<"students", 'Int'>
    readonly user_id: FieldRef<"students", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * students findUnique
   */
  export type studentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    /**
     * Filter, which students to fetch.
     */
    where: studentsWhereUniqueInput
  }

  /**
   * students findUniqueOrThrow
   */
  export type studentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    /**
     * Filter, which students to fetch.
     */
    where: studentsWhereUniqueInput
  }

  /**
   * students findFirst
   */
  export type studentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    /**
     * Filter, which students to fetch.
     */
    where?: studentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of students to fetch.
     */
    orderBy?: studentsOrderByWithRelationInput | studentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for students.
     */
    cursor?: studentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of students.
     */
    distinct?: StudentsScalarFieldEnum | StudentsScalarFieldEnum[]
  }

  /**
   * students findFirstOrThrow
   */
  export type studentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    /**
     * Filter, which students to fetch.
     */
    where?: studentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of students to fetch.
     */
    orderBy?: studentsOrderByWithRelationInput | studentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for students.
     */
    cursor?: studentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of students.
     */
    distinct?: StudentsScalarFieldEnum | StudentsScalarFieldEnum[]
  }

  /**
   * students findMany
   */
  export type studentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    /**
     * Filter, which students to fetch.
     */
    where?: studentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of students to fetch.
     */
    orderBy?: studentsOrderByWithRelationInput | studentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing students.
     */
    cursor?: studentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` students.
     */
    skip?: number
    distinct?: StudentsScalarFieldEnum | StudentsScalarFieldEnum[]
  }

  /**
   * students create
   */
  export type studentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    /**
     * The data needed to create a students.
     */
    data: XOR<studentsCreateInput, studentsUncheckedCreateInput>
  }

  /**
   * students createMany
   */
  export type studentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many students.
     */
    data: studentsCreateManyInput | studentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * students createManyAndReturn
   */
  export type studentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * The data used to create many students.
     */
    data: studentsCreateManyInput | studentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * students update
   */
  export type studentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    /**
     * The data needed to update a students.
     */
    data: XOR<studentsUpdateInput, studentsUncheckedUpdateInput>
    /**
     * Choose, which students to update.
     */
    where: studentsWhereUniqueInput
  }

  /**
   * students updateMany
   */
  export type studentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update students.
     */
    data: XOR<studentsUpdateManyMutationInput, studentsUncheckedUpdateManyInput>
    /**
     * Filter which students to update
     */
    where?: studentsWhereInput
    /**
     * Limit how many students to update.
     */
    limit?: number
  }

  /**
   * students updateManyAndReturn
   */
  export type studentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * The data used to update students.
     */
    data: XOR<studentsUpdateManyMutationInput, studentsUncheckedUpdateManyInput>
    /**
     * Filter which students to update
     */
    where?: studentsWhereInput
    /**
     * Limit how many students to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * students upsert
   */
  export type studentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    /**
     * The filter to search for the students to update in case it exists.
     */
    where: studentsWhereUniqueInput
    /**
     * In case the students found by the `where` argument doesn't exist, create a new students with this data.
     */
    create: XOR<studentsCreateInput, studentsUncheckedCreateInput>
    /**
     * In case the students was found with the provided `where` argument, update it with this data.
     */
    update: XOR<studentsUpdateInput, studentsUncheckedUpdateInput>
  }

  /**
   * students delete
   */
  export type studentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
    /**
     * Filter which students to delete.
     */
    where: studentsWhereUniqueInput
  }

  /**
   * students deleteMany
   */
  export type studentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which students to delete
     */
    where?: studentsWhereInput
    /**
     * Limit how many students to delete.
     */
    limit?: number
  }

  /**
   * students without action
   */
  export type studentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the students
     */
    select?: studentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the students
     */
    omit?: studentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: studentsInclude<ExtArgs> | null
  }


  /**
   * Model librarian
   */

  export type AggregateLibrarian = {
    _count: LibrarianCountAggregateOutputType | null
    _avg: LibrarianAvgAggregateOutputType | null
    _sum: LibrarianSumAggregateOutputType | null
    _min: LibrarianMinAggregateOutputType | null
    _max: LibrarianMaxAggregateOutputType | null
  }

  export type LibrarianAvgAggregateOutputType = {
    employee_id: number | null
    contact_num: number | null
    user_id: number | null
  }

  export type LibrarianSumAggregateOutputType = {
    employee_id: number | null
    contact_num: number | null
    user_id: number | null
  }

  export type LibrarianMinAggregateOutputType = {
    employee_id: number | null
    position: string | null
    contact_num: number | null
    user_id: number | null
  }

  export type LibrarianMaxAggregateOutputType = {
    employee_id: number | null
    position: string | null
    contact_num: number | null
    user_id: number | null
  }

  export type LibrarianCountAggregateOutputType = {
    employee_id: number
    position: number
    contact_num: number
    user_id: number
    _all: number
  }


  export type LibrarianAvgAggregateInputType = {
    employee_id?: true
    contact_num?: true
    user_id?: true
  }

  export type LibrarianSumAggregateInputType = {
    employee_id?: true
    contact_num?: true
    user_id?: true
  }

  export type LibrarianMinAggregateInputType = {
    employee_id?: true
    position?: true
    contact_num?: true
    user_id?: true
  }

  export type LibrarianMaxAggregateInputType = {
    employee_id?: true
    position?: true
    contact_num?: true
    user_id?: true
  }

  export type LibrarianCountAggregateInputType = {
    employee_id?: true
    position?: true
    contact_num?: true
    user_id?: true
    _all?: true
  }

  export type LibrarianAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which librarian to aggregate.
     */
    where?: librarianWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of librarians to fetch.
     */
    orderBy?: librarianOrderByWithRelationInput | librarianOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: librarianWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` librarians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` librarians.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned librarians
    **/
    _count?: true | LibrarianCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LibrarianAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LibrarianSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LibrarianMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LibrarianMaxAggregateInputType
  }

  export type GetLibrarianAggregateType<T extends LibrarianAggregateArgs> = {
        [P in keyof T & keyof AggregateLibrarian]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLibrarian[P]>
      : GetScalarType<T[P], AggregateLibrarian[P]>
  }




  export type librarianGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: librarianWhereInput
    orderBy?: librarianOrderByWithAggregationInput | librarianOrderByWithAggregationInput[]
    by: LibrarianScalarFieldEnum[] | LibrarianScalarFieldEnum
    having?: librarianScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LibrarianCountAggregateInputType | true
    _avg?: LibrarianAvgAggregateInputType
    _sum?: LibrarianSumAggregateInputType
    _min?: LibrarianMinAggregateInputType
    _max?: LibrarianMaxAggregateInputType
  }

  export type LibrarianGroupByOutputType = {
    employee_id: number
    position: string | null
    contact_num: number
    user_id: number
    _count: LibrarianCountAggregateOutputType | null
    _avg: LibrarianAvgAggregateOutputType | null
    _sum: LibrarianSumAggregateOutputType | null
    _min: LibrarianMinAggregateOutputType | null
    _max: LibrarianMaxAggregateOutputType | null
  }

  type GetLibrarianGroupByPayload<T extends librarianGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LibrarianGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LibrarianGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LibrarianGroupByOutputType[P]>
            : GetScalarType<T[P], LibrarianGroupByOutputType[P]>
        }
      >
    >


  export type librarianSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employee_id?: boolean
    position?: boolean
    contact_num?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    activity_logs?: boolean | librarian$activity_logsArgs<ExtArgs>
    _count?: boolean | LibrarianCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["librarian"]>

  export type librarianSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employee_id?: boolean
    position?: boolean
    contact_num?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["librarian"]>

  export type librarianSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employee_id?: boolean
    position?: boolean
    contact_num?: boolean
    user_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["librarian"]>

  export type librarianSelectScalar = {
    employee_id?: boolean
    position?: boolean
    contact_num?: boolean
    user_id?: boolean
  }

  export type librarianOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"employee_id" | "position" | "contact_num" | "user_id", ExtArgs["result"]["librarian"]>
  export type librarianInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    activity_logs?: boolean | librarian$activity_logsArgs<ExtArgs>
    _count?: boolean | LibrarianCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type librarianIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type librarianIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $librarianPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "librarian"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      activity_logs: Prisma.$activity_logsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      employee_id: number
      position: string | null
      contact_num: number
      user_id: number
    }, ExtArgs["result"]["librarian"]>
    composites: {}
  }

  type librarianGetPayload<S extends boolean | null | undefined | librarianDefaultArgs> = $Result.GetResult<Prisma.$librarianPayload, S>

  type librarianCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<librarianFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LibrarianCountAggregateInputType | true
    }

  export interface librarianDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['librarian'], meta: { name: 'librarian' } }
    /**
     * Find zero or one Librarian that matches the filter.
     * @param {librarianFindUniqueArgs} args - Arguments to find a Librarian
     * @example
     * // Get one Librarian
     * const librarian = await prisma.librarian.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends librarianFindUniqueArgs>(args: SelectSubset<T, librarianFindUniqueArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Librarian that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {librarianFindUniqueOrThrowArgs} args - Arguments to find a Librarian
     * @example
     * // Get one Librarian
     * const librarian = await prisma.librarian.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends librarianFindUniqueOrThrowArgs>(args: SelectSubset<T, librarianFindUniqueOrThrowArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Librarian that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {librarianFindFirstArgs} args - Arguments to find a Librarian
     * @example
     * // Get one Librarian
     * const librarian = await prisma.librarian.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends librarianFindFirstArgs>(args?: SelectSubset<T, librarianFindFirstArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Librarian that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {librarianFindFirstOrThrowArgs} args - Arguments to find a Librarian
     * @example
     * // Get one Librarian
     * const librarian = await prisma.librarian.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends librarianFindFirstOrThrowArgs>(args?: SelectSubset<T, librarianFindFirstOrThrowArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Librarians that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {librarianFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Librarians
     * const librarians = await prisma.librarian.findMany()
     * 
     * // Get first 10 Librarians
     * const librarians = await prisma.librarian.findMany({ take: 10 })
     * 
     * // Only select the `employee_id`
     * const librarianWithEmployee_idOnly = await prisma.librarian.findMany({ select: { employee_id: true } })
     * 
     */
    findMany<T extends librarianFindManyArgs>(args?: SelectSubset<T, librarianFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Librarian.
     * @param {librarianCreateArgs} args - Arguments to create a Librarian.
     * @example
     * // Create one Librarian
     * const Librarian = await prisma.librarian.create({
     *   data: {
     *     // ... data to create a Librarian
     *   }
     * })
     * 
     */
    create<T extends librarianCreateArgs>(args: SelectSubset<T, librarianCreateArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Librarians.
     * @param {librarianCreateManyArgs} args - Arguments to create many Librarians.
     * @example
     * // Create many Librarians
     * const librarian = await prisma.librarian.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends librarianCreateManyArgs>(args?: SelectSubset<T, librarianCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Librarians and returns the data saved in the database.
     * @param {librarianCreateManyAndReturnArgs} args - Arguments to create many Librarians.
     * @example
     * // Create many Librarians
     * const librarian = await prisma.librarian.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Librarians and only return the `employee_id`
     * const librarianWithEmployee_idOnly = await prisma.librarian.createManyAndReturn({
     *   select: { employee_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends librarianCreateManyAndReturnArgs>(args?: SelectSubset<T, librarianCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Librarian.
     * @param {librarianDeleteArgs} args - Arguments to delete one Librarian.
     * @example
     * // Delete one Librarian
     * const Librarian = await prisma.librarian.delete({
     *   where: {
     *     // ... filter to delete one Librarian
     *   }
     * })
     * 
     */
    delete<T extends librarianDeleteArgs>(args: SelectSubset<T, librarianDeleteArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Librarian.
     * @param {librarianUpdateArgs} args - Arguments to update one Librarian.
     * @example
     * // Update one Librarian
     * const librarian = await prisma.librarian.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends librarianUpdateArgs>(args: SelectSubset<T, librarianUpdateArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Librarians.
     * @param {librarianDeleteManyArgs} args - Arguments to filter Librarians to delete.
     * @example
     * // Delete a few Librarians
     * const { count } = await prisma.librarian.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends librarianDeleteManyArgs>(args?: SelectSubset<T, librarianDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Librarians.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {librarianUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Librarians
     * const librarian = await prisma.librarian.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends librarianUpdateManyArgs>(args: SelectSubset<T, librarianUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Librarians and returns the data updated in the database.
     * @param {librarianUpdateManyAndReturnArgs} args - Arguments to update many Librarians.
     * @example
     * // Update many Librarians
     * const librarian = await prisma.librarian.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Librarians and only return the `employee_id`
     * const librarianWithEmployee_idOnly = await prisma.librarian.updateManyAndReturn({
     *   select: { employee_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends librarianUpdateManyAndReturnArgs>(args: SelectSubset<T, librarianUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Librarian.
     * @param {librarianUpsertArgs} args - Arguments to update or create a Librarian.
     * @example
     * // Update or create a Librarian
     * const librarian = await prisma.librarian.upsert({
     *   create: {
     *     // ... data to create a Librarian
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Librarian we want to update
     *   }
     * })
     */
    upsert<T extends librarianUpsertArgs>(args: SelectSubset<T, librarianUpsertArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Librarians.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {librarianCountArgs} args - Arguments to filter Librarians to count.
     * @example
     * // Count the number of Librarians
     * const count = await prisma.librarian.count({
     *   where: {
     *     // ... the filter for the Librarians we want to count
     *   }
     * })
    **/
    count<T extends librarianCountArgs>(
      args?: Subset<T, librarianCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LibrarianCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Librarian.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LibrarianAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LibrarianAggregateArgs>(args: Subset<T, LibrarianAggregateArgs>): Prisma.PrismaPromise<GetLibrarianAggregateType<T>>

    /**
     * Group by Librarian.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {librarianGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends librarianGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: librarianGroupByArgs['orderBy'] }
        : { orderBy?: librarianGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, librarianGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLibrarianGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the librarian model
   */
  readonly fields: librarianFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for librarian.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__librarianClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    activity_logs<T extends librarian$activity_logsArgs<ExtArgs> = {}>(args?: Subset<T, librarian$activity_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the librarian model
   */
  interface librarianFieldRefs {
    readonly employee_id: FieldRef<"librarian", 'Int'>
    readonly position: FieldRef<"librarian", 'String'>
    readonly contact_num: FieldRef<"librarian", 'Int'>
    readonly user_id: FieldRef<"librarian", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * librarian findUnique
   */
  export type librarianFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    /**
     * Filter, which librarian to fetch.
     */
    where: librarianWhereUniqueInput
  }

  /**
   * librarian findUniqueOrThrow
   */
  export type librarianFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    /**
     * Filter, which librarian to fetch.
     */
    where: librarianWhereUniqueInput
  }

  /**
   * librarian findFirst
   */
  export type librarianFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    /**
     * Filter, which librarian to fetch.
     */
    where?: librarianWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of librarians to fetch.
     */
    orderBy?: librarianOrderByWithRelationInput | librarianOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for librarians.
     */
    cursor?: librarianWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` librarians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` librarians.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of librarians.
     */
    distinct?: LibrarianScalarFieldEnum | LibrarianScalarFieldEnum[]
  }

  /**
   * librarian findFirstOrThrow
   */
  export type librarianFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    /**
     * Filter, which librarian to fetch.
     */
    where?: librarianWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of librarians to fetch.
     */
    orderBy?: librarianOrderByWithRelationInput | librarianOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for librarians.
     */
    cursor?: librarianWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` librarians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` librarians.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of librarians.
     */
    distinct?: LibrarianScalarFieldEnum | LibrarianScalarFieldEnum[]
  }

  /**
   * librarian findMany
   */
  export type librarianFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    /**
     * Filter, which librarians to fetch.
     */
    where?: librarianWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of librarians to fetch.
     */
    orderBy?: librarianOrderByWithRelationInput | librarianOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing librarians.
     */
    cursor?: librarianWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` librarians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` librarians.
     */
    skip?: number
    distinct?: LibrarianScalarFieldEnum | LibrarianScalarFieldEnum[]
  }

  /**
   * librarian create
   */
  export type librarianCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    /**
     * The data needed to create a librarian.
     */
    data: XOR<librarianCreateInput, librarianUncheckedCreateInput>
  }

  /**
   * librarian createMany
   */
  export type librarianCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many librarians.
     */
    data: librarianCreateManyInput | librarianCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * librarian createManyAndReturn
   */
  export type librarianCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * The data used to create many librarians.
     */
    data: librarianCreateManyInput | librarianCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * librarian update
   */
  export type librarianUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    /**
     * The data needed to update a librarian.
     */
    data: XOR<librarianUpdateInput, librarianUncheckedUpdateInput>
    /**
     * Choose, which librarian to update.
     */
    where: librarianWhereUniqueInput
  }

  /**
   * librarian updateMany
   */
  export type librarianUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update librarians.
     */
    data: XOR<librarianUpdateManyMutationInput, librarianUncheckedUpdateManyInput>
    /**
     * Filter which librarians to update
     */
    where?: librarianWhereInput
    /**
     * Limit how many librarians to update.
     */
    limit?: number
  }

  /**
   * librarian updateManyAndReturn
   */
  export type librarianUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * The data used to update librarians.
     */
    data: XOR<librarianUpdateManyMutationInput, librarianUncheckedUpdateManyInput>
    /**
     * Filter which librarians to update
     */
    where?: librarianWhereInput
    /**
     * Limit how many librarians to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * librarian upsert
   */
  export type librarianUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    /**
     * The filter to search for the librarian to update in case it exists.
     */
    where: librarianWhereUniqueInput
    /**
     * In case the librarian found by the `where` argument doesn't exist, create a new librarian with this data.
     */
    create: XOR<librarianCreateInput, librarianUncheckedCreateInput>
    /**
     * In case the librarian was found with the provided `where` argument, update it with this data.
     */
    update: XOR<librarianUpdateInput, librarianUncheckedUpdateInput>
  }

  /**
   * librarian delete
   */
  export type librarianDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
    /**
     * Filter which librarian to delete.
     */
    where: librarianWhereUniqueInput
  }

  /**
   * librarian deleteMany
   */
  export type librarianDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which librarians to delete
     */
    where?: librarianWhereInput
    /**
     * Limit how many librarians to delete.
     */
    limit?: number
  }

  /**
   * librarian.activity_logs
   */
  export type librarian$activity_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    where?: activity_logsWhereInput
    orderBy?: activity_logsOrderByWithRelationInput | activity_logsOrderByWithRelationInput[]
    cursor?: activity_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Activity_logsScalarFieldEnum | Activity_logsScalarFieldEnum[]
  }

  /**
   * librarian without action
   */
  export type librarianDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the librarian
     */
    select?: librarianSelect<ExtArgs> | null
    /**
     * Omit specific fields from the librarian
     */
    omit?: librarianOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: librarianInclude<ExtArgs> | null
  }


  /**
   * Model papers
   */

  export type AggregatePapers = {
    _count: PapersCountAggregateOutputType | null
    _avg: PapersAvgAggregateOutputType | null
    _sum: PapersSumAggregateOutputType | null
    _min: PapersMinAggregateOutputType | null
    _max: PapersMaxAggregateOutputType | null
  }

  export type PapersAvgAggregateOutputType = {
    paper_id: number | null
    year: number | null
  }

  export type PapersSumAggregateOutputType = {
    paper_id: number | null
    year: number | null
  }

  export type PapersMinAggregateOutputType = {
    paper_id: number | null
    title: string | null
    author: string | null
    year: number | null
    department: string | null
    course: string | null
    abstract: string | null
    created_at: Date | null
    updated_at: Date | null
    paper_url: string | null
  }

  export type PapersMaxAggregateOutputType = {
    paper_id: number | null
    title: string | null
    author: string | null
    year: number | null
    department: string | null
    course: string | null
    abstract: string | null
    created_at: Date | null
    updated_at: Date | null
    paper_url: string | null
  }

  export type PapersCountAggregateOutputType = {
    paper_id: number
    title: number
    author: number
    year: number
    department: number
    keywords: number
    course: number
    abstract: number
    created_at: number
    updated_at: number
    paper_url: number
    _all: number
  }


  export type PapersAvgAggregateInputType = {
    paper_id?: true
    year?: true
  }

  export type PapersSumAggregateInputType = {
    paper_id?: true
    year?: true
  }

  export type PapersMinAggregateInputType = {
    paper_id?: true
    title?: true
    author?: true
    year?: true
    department?: true
    course?: true
    abstract?: true
    created_at?: true
    updated_at?: true
    paper_url?: true
  }

  export type PapersMaxAggregateInputType = {
    paper_id?: true
    title?: true
    author?: true
    year?: true
    department?: true
    course?: true
    abstract?: true
    created_at?: true
    updated_at?: true
    paper_url?: true
  }

  export type PapersCountAggregateInputType = {
    paper_id?: true
    title?: true
    author?: true
    year?: true
    department?: true
    keywords?: true
    course?: true
    abstract?: true
    created_at?: true
    updated_at?: true
    paper_url?: true
    _all?: true
  }

  export type PapersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which papers to aggregate.
     */
    where?: papersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of papers to fetch.
     */
    orderBy?: papersOrderByWithRelationInput | papersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: papersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` papers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned papers
    **/
    _count?: true | PapersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PapersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PapersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PapersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PapersMaxAggregateInputType
  }

  export type GetPapersAggregateType<T extends PapersAggregateArgs> = {
        [P in keyof T & keyof AggregatePapers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePapers[P]>
      : GetScalarType<T[P], AggregatePapers[P]>
  }




  export type papersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: papersWhereInput
    orderBy?: papersOrderByWithAggregationInput | papersOrderByWithAggregationInput[]
    by: PapersScalarFieldEnum[] | PapersScalarFieldEnum
    having?: papersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PapersCountAggregateInputType | true
    _avg?: PapersAvgAggregateInputType
    _sum?: PapersSumAggregateInputType
    _min?: PapersMinAggregateInputType
    _max?: PapersMaxAggregateInputType
  }

  export type PapersGroupByOutputType = {
    paper_id: number
    title: string | null
    author: string | null
    year: number | null
    department: string | null
    keywords: string[]
    course: string | null
    abstract: string | null
    created_at: Date | null
    updated_at: Date | null
    paper_url: string | null
    _count: PapersCountAggregateOutputType | null
    _avg: PapersAvgAggregateOutputType | null
    _sum: PapersSumAggregateOutputType | null
    _min: PapersMinAggregateOutputType | null
    _max: PapersMaxAggregateOutputType | null
  }

  type GetPapersGroupByPayload<T extends papersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PapersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PapersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PapersGroupByOutputType[P]>
            : GetScalarType<T[P], PapersGroupByOutputType[P]>
        }
      >
    >


  export type papersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paper_id?: boolean
    title?: boolean
    author?: boolean
    year?: boolean
    department?: boolean
    keywords?: boolean
    course?: boolean
    abstract?: boolean
    created_at?: boolean
    updated_at?: boolean
    paper_url?: boolean
    paper_metadata?: boolean | papers$paper_metadataArgs<ExtArgs>
    user_bookmarks?: boolean | papers$user_bookmarksArgs<ExtArgs>
    paper_bm25_index?: boolean | papers$paper_bm25_indexArgs<ExtArgs>
    term_score?: boolean | papers$term_scoreArgs<ExtArgs>
    _count?: boolean | PapersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["papers"]>

  export type papersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paper_id?: boolean
    title?: boolean
    author?: boolean
    year?: boolean
    department?: boolean
    keywords?: boolean
    course?: boolean
    abstract?: boolean
    created_at?: boolean
    updated_at?: boolean
    paper_url?: boolean
  }, ExtArgs["result"]["papers"]>

  export type papersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paper_id?: boolean
    title?: boolean
    author?: boolean
    year?: boolean
    department?: boolean
    keywords?: boolean
    course?: boolean
    abstract?: boolean
    created_at?: boolean
    updated_at?: boolean
    paper_url?: boolean
  }, ExtArgs["result"]["papers"]>

  export type papersSelectScalar = {
    paper_id?: boolean
    title?: boolean
    author?: boolean
    year?: boolean
    department?: boolean
    keywords?: boolean
    course?: boolean
    abstract?: boolean
    created_at?: boolean
    updated_at?: boolean
    paper_url?: boolean
  }

  export type papersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"paper_id" | "title" | "author" | "year" | "department" | "keywords" | "course" | "abstract" | "created_at" | "updated_at" | "paper_url", ExtArgs["result"]["papers"]>
  export type papersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper_metadata?: boolean | papers$paper_metadataArgs<ExtArgs>
    user_bookmarks?: boolean | papers$user_bookmarksArgs<ExtArgs>
    paper_bm25_index?: boolean | papers$paper_bm25_indexArgs<ExtArgs>
    term_score?: boolean | papers$term_scoreArgs<ExtArgs>
    _count?: boolean | PapersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type papersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type papersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $papersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "papers"
    objects: {
      paper_metadata: Prisma.$paper_metadataPayload<ExtArgs>[]
      user_bookmarks: Prisma.$user_bookmarksPayload<ExtArgs>[]
      paper_bm25_index: Prisma.$paper_bm25_indexPayload<ExtArgs>[]
      term_score: Prisma.$term_scorePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      paper_id: number
      title: string | null
      author: string | null
      year: number | null
      department: string | null
      keywords: string[]
      course: string | null
      abstract: string | null
      created_at: Date | null
      updated_at: Date | null
      paper_url: string | null
    }, ExtArgs["result"]["papers"]>
    composites: {}
  }

  type papersGetPayload<S extends boolean | null | undefined | papersDefaultArgs> = $Result.GetResult<Prisma.$papersPayload, S>

  type papersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<papersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PapersCountAggregateInputType | true
    }

  export interface papersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['papers'], meta: { name: 'papers' } }
    /**
     * Find zero or one Papers that matches the filter.
     * @param {papersFindUniqueArgs} args - Arguments to find a Papers
     * @example
     * // Get one Papers
     * const papers = await prisma.papers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends papersFindUniqueArgs>(args: SelectSubset<T, papersFindUniqueArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Papers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {papersFindUniqueOrThrowArgs} args - Arguments to find a Papers
     * @example
     * // Get one Papers
     * const papers = await prisma.papers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends papersFindUniqueOrThrowArgs>(args: SelectSubset<T, papersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Papers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {papersFindFirstArgs} args - Arguments to find a Papers
     * @example
     * // Get one Papers
     * const papers = await prisma.papers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends papersFindFirstArgs>(args?: SelectSubset<T, papersFindFirstArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Papers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {papersFindFirstOrThrowArgs} args - Arguments to find a Papers
     * @example
     * // Get one Papers
     * const papers = await prisma.papers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends papersFindFirstOrThrowArgs>(args?: SelectSubset<T, papersFindFirstOrThrowArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Papers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {papersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Papers
     * const papers = await prisma.papers.findMany()
     * 
     * // Get first 10 Papers
     * const papers = await prisma.papers.findMany({ take: 10 })
     * 
     * // Only select the `paper_id`
     * const papersWithPaper_idOnly = await prisma.papers.findMany({ select: { paper_id: true } })
     * 
     */
    findMany<T extends papersFindManyArgs>(args?: SelectSubset<T, papersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Papers.
     * @param {papersCreateArgs} args - Arguments to create a Papers.
     * @example
     * // Create one Papers
     * const Papers = await prisma.papers.create({
     *   data: {
     *     // ... data to create a Papers
     *   }
     * })
     * 
     */
    create<T extends papersCreateArgs>(args: SelectSubset<T, papersCreateArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Papers.
     * @param {papersCreateManyArgs} args - Arguments to create many Papers.
     * @example
     * // Create many Papers
     * const papers = await prisma.papers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends papersCreateManyArgs>(args?: SelectSubset<T, papersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Papers and returns the data saved in the database.
     * @param {papersCreateManyAndReturnArgs} args - Arguments to create many Papers.
     * @example
     * // Create many Papers
     * const papers = await prisma.papers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Papers and only return the `paper_id`
     * const papersWithPaper_idOnly = await prisma.papers.createManyAndReturn({
     *   select: { paper_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends papersCreateManyAndReturnArgs>(args?: SelectSubset<T, papersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Papers.
     * @param {papersDeleteArgs} args - Arguments to delete one Papers.
     * @example
     * // Delete one Papers
     * const Papers = await prisma.papers.delete({
     *   where: {
     *     // ... filter to delete one Papers
     *   }
     * })
     * 
     */
    delete<T extends papersDeleteArgs>(args: SelectSubset<T, papersDeleteArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Papers.
     * @param {papersUpdateArgs} args - Arguments to update one Papers.
     * @example
     * // Update one Papers
     * const papers = await prisma.papers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends papersUpdateArgs>(args: SelectSubset<T, papersUpdateArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Papers.
     * @param {papersDeleteManyArgs} args - Arguments to filter Papers to delete.
     * @example
     * // Delete a few Papers
     * const { count } = await prisma.papers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends papersDeleteManyArgs>(args?: SelectSubset<T, papersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Papers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {papersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Papers
     * const papers = await prisma.papers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends papersUpdateManyArgs>(args: SelectSubset<T, papersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Papers and returns the data updated in the database.
     * @param {papersUpdateManyAndReturnArgs} args - Arguments to update many Papers.
     * @example
     * // Update many Papers
     * const papers = await prisma.papers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Papers and only return the `paper_id`
     * const papersWithPaper_idOnly = await prisma.papers.updateManyAndReturn({
     *   select: { paper_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends papersUpdateManyAndReturnArgs>(args: SelectSubset<T, papersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Papers.
     * @param {papersUpsertArgs} args - Arguments to update or create a Papers.
     * @example
     * // Update or create a Papers
     * const papers = await prisma.papers.upsert({
     *   create: {
     *     // ... data to create a Papers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Papers we want to update
     *   }
     * })
     */
    upsert<T extends papersUpsertArgs>(args: SelectSubset<T, papersUpsertArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Papers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {papersCountArgs} args - Arguments to filter Papers to count.
     * @example
     * // Count the number of Papers
     * const count = await prisma.papers.count({
     *   where: {
     *     // ... the filter for the Papers we want to count
     *   }
     * })
    **/
    count<T extends papersCountArgs>(
      args?: Subset<T, papersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PapersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Papers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PapersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PapersAggregateArgs>(args: Subset<T, PapersAggregateArgs>): Prisma.PrismaPromise<GetPapersAggregateType<T>>

    /**
     * Group by Papers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {papersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends papersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: papersGroupByArgs['orderBy'] }
        : { orderBy?: papersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, papersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPapersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the papers model
   */
  readonly fields: papersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for papers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__papersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paper_metadata<T extends papers$paper_metadataArgs<ExtArgs> = {}>(args?: Subset<T, papers$paper_metadataArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_bookmarks<T extends papers$user_bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, papers$user_bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    paper_bm25_index<T extends papers$paper_bm25_indexArgs<ExtArgs> = {}>(args?: Subset<T, papers$paper_bm25_indexArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    term_score<T extends papers$term_scoreArgs<ExtArgs> = {}>(args?: Subset<T, papers$term_scoreArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the papers model
   */
  interface papersFieldRefs {
    readonly paper_id: FieldRef<"papers", 'Int'>
    readonly title: FieldRef<"papers", 'String'>
    readonly author: FieldRef<"papers", 'String'>
    readonly year: FieldRef<"papers", 'Int'>
    readonly department: FieldRef<"papers", 'String'>
    readonly keywords: FieldRef<"papers", 'String[]'>
    readonly course: FieldRef<"papers", 'String'>
    readonly abstract: FieldRef<"papers", 'String'>
    readonly created_at: FieldRef<"papers", 'DateTime'>
    readonly updated_at: FieldRef<"papers", 'DateTime'>
    readonly paper_url: FieldRef<"papers", 'String'>
  }
    

  // Custom InputTypes
  /**
   * papers findUnique
   */
  export type papersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
    /**
     * Filter, which papers to fetch.
     */
    where: papersWhereUniqueInput
  }

  /**
   * papers findUniqueOrThrow
   */
  export type papersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
    /**
     * Filter, which papers to fetch.
     */
    where: papersWhereUniqueInput
  }

  /**
   * papers findFirst
   */
  export type papersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
    /**
     * Filter, which papers to fetch.
     */
    where?: papersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of papers to fetch.
     */
    orderBy?: papersOrderByWithRelationInput | papersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for papers.
     */
    cursor?: papersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` papers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of papers.
     */
    distinct?: PapersScalarFieldEnum | PapersScalarFieldEnum[]
  }

  /**
   * papers findFirstOrThrow
   */
  export type papersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
    /**
     * Filter, which papers to fetch.
     */
    where?: papersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of papers to fetch.
     */
    orderBy?: papersOrderByWithRelationInput | papersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for papers.
     */
    cursor?: papersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` papers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of papers.
     */
    distinct?: PapersScalarFieldEnum | PapersScalarFieldEnum[]
  }

  /**
   * papers findMany
   */
  export type papersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
    /**
     * Filter, which papers to fetch.
     */
    where?: papersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of papers to fetch.
     */
    orderBy?: papersOrderByWithRelationInput | papersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing papers.
     */
    cursor?: papersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` papers.
     */
    skip?: number
    distinct?: PapersScalarFieldEnum | PapersScalarFieldEnum[]
  }

  /**
   * papers create
   */
  export type papersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
    /**
     * The data needed to create a papers.
     */
    data?: XOR<papersCreateInput, papersUncheckedCreateInput>
  }

  /**
   * papers createMany
   */
  export type papersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many papers.
     */
    data: papersCreateManyInput | papersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * papers createManyAndReturn
   */
  export type papersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * The data used to create many papers.
     */
    data: papersCreateManyInput | papersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * papers update
   */
  export type papersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
    /**
     * The data needed to update a papers.
     */
    data: XOR<papersUpdateInput, papersUncheckedUpdateInput>
    /**
     * Choose, which papers to update.
     */
    where: papersWhereUniqueInput
  }

  /**
   * papers updateMany
   */
  export type papersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update papers.
     */
    data: XOR<papersUpdateManyMutationInput, papersUncheckedUpdateManyInput>
    /**
     * Filter which papers to update
     */
    where?: papersWhereInput
    /**
     * Limit how many papers to update.
     */
    limit?: number
  }

  /**
   * papers updateManyAndReturn
   */
  export type papersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * The data used to update papers.
     */
    data: XOR<papersUpdateManyMutationInput, papersUncheckedUpdateManyInput>
    /**
     * Filter which papers to update
     */
    where?: papersWhereInput
    /**
     * Limit how many papers to update.
     */
    limit?: number
  }

  /**
   * papers upsert
   */
  export type papersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
    /**
     * The filter to search for the papers to update in case it exists.
     */
    where: papersWhereUniqueInput
    /**
     * In case the papers found by the `where` argument doesn't exist, create a new papers with this data.
     */
    create: XOR<papersCreateInput, papersUncheckedCreateInput>
    /**
     * In case the papers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<papersUpdateInput, papersUncheckedUpdateInput>
  }

  /**
   * papers delete
   */
  export type papersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
    /**
     * Filter which papers to delete.
     */
    where: papersWhereUniqueInput
  }

  /**
   * papers deleteMany
   */
  export type papersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which papers to delete
     */
    where?: papersWhereInput
    /**
     * Limit how many papers to delete.
     */
    limit?: number
  }

  /**
   * papers.paper_metadata
   */
  export type papers$paper_metadataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    where?: paper_metadataWhereInput
    orderBy?: paper_metadataOrderByWithRelationInput | paper_metadataOrderByWithRelationInput[]
    cursor?: paper_metadataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Paper_metadataScalarFieldEnum | Paper_metadataScalarFieldEnum[]
  }

  /**
   * papers.user_bookmarks
   */
  export type papers$user_bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    where?: user_bookmarksWhereInput
    orderBy?: user_bookmarksOrderByWithRelationInput | user_bookmarksOrderByWithRelationInput[]
    cursor?: user_bookmarksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_bookmarksScalarFieldEnum | User_bookmarksScalarFieldEnum[]
  }

  /**
   * papers.paper_bm25_index
   */
  export type papers$paper_bm25_indexArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    where?: paper_bm25_indexWhereInput
    orderBy?: paper_bm25_indexOrderByWithRelationInput | paper_bm25_indexOrderByWithRelationInput[]
    cursor?: paper_bm25_indexWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Paper_bm25_indexScalarFieldEnum | Paper_bm25_indexScalarFieldEnum[]
  }

  /**
   * papers.term_score
   */
  export type papers$term_scoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    where?: term_scoreWhereInput
    orderBy?: term_scoreOrderByWithRelationInput | term_scoreOrderByWithRelationInput[]
    cursor?: term_scoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Term_scoreScalarFieldEnum | Term_scoreScalarFieldEnum[]
  }

  /**
   * papers without action
   */
  export type papersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the papers
     */
    select?: papersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the papers
     */
    omit?: papersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: papersInclude<ExtArgs> | null
  }


  /**
   * Model paper_metadata
   */

  export type AggregatePaper_metadata = {
    _count: Paper_metadataCountAggregateOutputType | null
    _avg: Paper_metadataAvgAggregateOutputType | null
    _sum: Paper_metadataSumAggregateOutputType | null
    _min: Paper_metadataMinAggregateOutputType | null
    _max: Paper_metadataMaxAggregateOutputType | null
  }

  export type Paper_metadataAvgAggregateOutputType = {
    metadata_id: number | null
    paper_id: number | null
  }

  export type Paper_metadataSumAggregateOutputType = {
    metadata_id: number | null
    paper_id: number | null
  }

  export type Paper_metadataMinAggregateOutputType = {
    metadata_id: number | null
    paper_id: number | null
    type: string | null
    format: string | null
    language: string | null
    source: string | null
    rights: string | null
  }

  export type Paper_metadataMaxAggregateOutputType = {
    metadata_id: number | null
    paper_id: number | null
    type: string | null
    format: string | null
    language: string | null
    source: string | null
    rights: string | null
  }

  export type Paper_metadataCountAggregateOutputType = {
    metadata_id: number
    paper_id: number
    type: number
    format: number
    language: number
    source: number
    rights: number
    _all: number
  }


  export type Paper_metadataAvgAggregateInputType = {
    metadata_id?: true
    paper_id?: true
  }

  export type Paper_metadataSumAggregateInputType = {
    metadata_id?: true
    paper_id?: true
  }

  export type Paper_metadataMinAggregateInputType = {
    metadata_id?: true
    paper_id?: true
    type?: true
    format?: true
    language?: true
    source?: true
    rights?: true
  }

  export type Paper_metadataMaxAggregateInputType = {
    metadata_id?: true
    paper_id?: true
    type?: true
    format?: true
    language?: true
    source?: true
    rights?: true
  }

  export type Paper_metadataCountAggregateInputType = {
    metadata_id?: true
    paper_id?: true
    type?: true
    format?: true
    language?: true
    source?: true
    rights?: true
    _all?: true
  }

  export type Paper_metadataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which paper_metadata to aggregate.
     */
    where?: paper_metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of paper_metadata to fetch.
     */
    orderBy?: paper_metadataOrderByWithRelationInput | paper_metadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: paper_metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` paper_metadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` paper_metadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned paper_metadata
    **/
    _count?: true | Paper_metadataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Paper_metadataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Paper_metadataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Paper_metadataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Paper_metadataMaxAggregateInputType
  }

  export type GetPaper_metadataAggregateType<T extends Paper_metadataAggregateArgs> = {
        [P in keyof T & keyof AggregatePaper_metadata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaper_metadata[P]>
      : GetScalarType<T[P], AggregatePaper_metadata[P]>
  }




  export type paper_metadataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: paper_metadataWhereInput
    orderBy?: paper_metadataOrderByWithAggregationInput | paper_metadataOrderByWithAggregationInput[]
    by: Paper_metadataScalarFieldEnum[] | Paper_metadataScalarFieldEnum
    having?: paper_metadataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Paper_metadataCountAggregateInputType | true
    _avg?: Paper_metadataAvgAggregateInputType
    _sum?: Paper_metadataSumAggregateInputType
    _min?: Paper_metadataMinAggregateInputType
    _max?: Paper_metadataMaxAggregateInputType
  }

  export type Paper_metadataGroupByOutputType = {
    metadata_id: number
    paper_id: number
    type: string | null
    format: string | null
    language: string | null
    source: string | null
    rights: string | null
    _count: Paper_metadataCountAggregateOutputType | null
    _avg: Paper_metadataAvgAggregateOutputType | null
    _sum: Paper_metadataSumAggregateOutputType | null
    _min: Paper_metadataMinAggregateOutputType | null
    _max: Paper_metadataMaxAggregateOutputType | null
  }

  type GetPaper_metadataGroupByPayload<T extends paper_metadataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Paper_metadataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Paper_metadataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Paper_metadataGroupByOutputType[P]>
            : GetScalarType<T[P], Paper_metadataGroupByOutputType[P]>
        }
      >
    >


  export type paper_metadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    metadata_id?: boolean
    paper_id?: boolean
    type?: boolean
    format?: boolean
    language?: boolean
    source?: boolean
    rights?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paper_metadata"]>

  export type paper_metadataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    metadata_id?: boolean
    paper_id?: boolean
    type?: boolean
    format?: boolean
    language?: boolean
    source?: boolean
    rights?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paper_metadata"]>

  export type paper_metadataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    metadata_id?: boolean
    paper_id?: boolean
    type?: boolean
    format?: boolean
    language?: boolean
    source?: boolean
    rights?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paper_metadata"]>

  export type paper_metadataSelectScalar = {
    metadata_id?: boolean
    paper_id?: boolean
    type?: boolean
    format?: boolean
    language?: boolean
    source?: boolean
    rights?: boolean
  }

  export type paper_metadataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"metadata_id" | "paper_id" | "type" | "format" | "language" | "source" | "rights", ExtArgs["result"]["paper_metadata"]>
  export type paper_metadataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }
  export type paper_metadataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }
  export type paper_metadataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }

  export type $paper_metadataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "paper_metadata"
    objects: {
      papers: Prisma.$papersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      metadata_id: number
      paper_id: number
      type: string | null
      format: string | null
      language: string | null
      source: string | null
      rights: string | null
    }, ExtArgs["result"]["paper_metadata"]>
    composites: {}
  }

  type paper_metadataGetPayload<S extends boolean | null | undefined | paper_metadataDefaultArgs> = $Result.GetResult<Prisma.$paper_metadataPayload, S>

  type paper_metadataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<paper_metadataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Paper_metadataCountAggregateInputType | true
    }

  export interface paper_metadataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['paper_metadata'], meta: { name: 'paper_metadata' } }
    /**
     * Find zero or one Paper_metadata that matches the filter.
     * @param {paper_metadataFindUniqueArgs} args - Arguments to find a Paper_metadata
     * @example
     * // Get one Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends paper_metadataFindUniqueArgs>(args: SelectSubset<T, paper_metadataFindUniqueArgs<ExtArgs>>): Prisma__paper_metadataClient<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Paper_metadata that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {paper_metadataFindUniqueOrThrowArgs} args - Arguments to find a Paper_metadata
     * @example
     * // Get one Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends paper_metadataFindUniqueOrThrowArgs>(args: SelectSubset<T, paper_metadataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__paper_metadataClient<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paper_metadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_metadataFindFirstArgs} args - Arguments to find a Paper_metadata
     * @example
     * // Get one Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends paper_metadataFindFirstArgs>(args?: SelectSubset<T, paper_metadataFindFirstArgs<ExtArgs>>): Prisma__paper_metadataClient<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paper_metadata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_metadataFindFirstOrThrowArgs} args - Arguments to find a Paper_metadata
     * @example
     * // Get one Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends paper_metadataFindFirstOrThrowArgs>(args?: SelectSubset<T, paper_metadataFindFirstOrThrowArgs<ExtArgs>>): Prisma__paper_metadataClient<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Paper_metadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_metadataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.findMany()
     * 
     * // Get first 10 Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.findMany({ take: 10 })
     * 
     * // Only select the `metadata_id`
     * const paper_metadataWithMetadata_idOnly = await prisma.paper_metadata.findMany({ select: { metadata_id: true } })
     * 
     */
    findMany<T extends paper_metadataFindManyArgs>(args?: SelectSubset<T, paper_metadataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Paper_metadata.
     * @param {paper_metadataCreateArgs} args - Arguments to create a Paper_metadata.
     * @example
     * // Create one Paper_metadata
     * const Paper_metadata = await prisma.paper_metadata.create({
     *   data: {
     *     // ... data to create a Paper_metadata
     *   }
     * })
     * 
     */
    create<T extends paper_metadataCreateArgs>(args: SelectSubset<T, paper_metadataCreateArgs<ExtArgs>>): Prisma__paper_metadataClient<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Paper_metadata.
     * @param {paper_metadataCreateManyArgs} args - Arguments to create many Paper_metadata.
     * @example
     * // Create many Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends paper_metadataCreateManyArgs>(args?: SelectSubset<T, paper_metadataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Paper_metadata and returns the data saved in the database.
     * @param {paper_metadataCreateManyAndReturnArgs} args - Arguments to create many Paper_metadata.
     * @example
     * // Create many Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Paper_metadata and only return the `metadata_id`
     * const paper_metadataWithMetadata_idOnly = await prisma.paper_metadata.createManyAndReturn({
     *   select: { metadata_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends paper_metadataCreateManyAndReturnArgs>(args?: SelectSubset<T, paper_metadataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Paper_metadata.
     * @param {paper_metadataDeleteArgs} args - Arguments to delete one Paper_metadata.
     * @example
     * // Delete one Paper_metadata
     * const Paper_metadata = await prisma.paper_metadata.delete({
     *   where: {
     *     // ... filter to delete one Paper_metadata
     *   }
     * })
     * 
     */
    delete<T extends paper_metadataDeleteArgs>(args: SelectSubset<T, paper_metadataDeleteArgs<ExtArgs>>): Prisma__paper_metadataClient<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Paper_metadata.
     * @param {paper_metadataUpdateArgs} args - Arguments to update one Paper_metadata.
     * @example
     * // Update one Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends paper_metadataUpdateArgs>(args: SelectSubset<T, paper_metadataUpdateArgs<ExtArgs>>): Prisma__paper_metadataClient<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Paper_metadata.
     * @param {paper_metadataDeleteManyArgs} args - Arguments to filter Paper_metadata to delete.
     * @example
     * // Delete a few Paper_metadata
     * const { count } = await prisma.paper_metadata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends paper_metadataDeleteManyArgs>(args?: SelectSubset<T, paper_metadataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Paper_metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_metadataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends paper_metadataUpdateManyArgs>(args: SelectSubset<T, paper_metadataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Paper_metadata and returns the data updated in the database.
     * @param {paper_metadataUpdateManyAndReturnArgs} args - Arguments to update many Paper_metadata.
     * @example
     * // Update many Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Paper_metadata and only return the `metadata_id`
     * const paper_metadataWithMetadata_idOnly = await prisma.paper_metadata.updateManyAndReturn({
     *   select: { metadata_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends paper_metadataUpdateManyAndReturnArgs>(args: SelectSubset<T, paper_metadataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Paper_metadata.
     * @param {paper_metadataUpsertArgs} args - Arguments to update or create a Paper_metadata.
     * @example
     * // Update or create a Paper_metadata
     * const paper_metadata = await prisma.paper_metadata.upsert({
     *   create: {
     *     // ... data to create a Paper_metadata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Paper_metadata we want to update
     *   }
     * })
     */
    upsert<T extends paper_metadataUpsertArgs>(args: SelectSubset<T, paper_metadataUpsertArgs<ExtArgs>>): Prisma__paper_metadataClient<$Result.GetResult<Prisma.$paper_metadataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Paper_metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_metadataCountArgs} args - Arguments to filter Paper_metadata to count.
     * @example
     * // Count the number of Paper_metadata
     * const count = await prisma.paper_metadata.count({
     *   where: {
     *     // ... the filter for the Paper_metadata we want to count
     *   }
     * })
    **/
    count<T extends paper_metadataCountArgs>(
      args?: Subset<T, paper_metadataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Paper_metadataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Paper_metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Paper_metadataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Paper_metadataAggregateArgs>(args: Subset<T, Paper_metadataAggregateArgs>): Prisma.PrismaPromise<GetPaper_metadataAggregateType<T>>

    /**
     * Group by Paper_metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_metadataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends paper_metadataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: paper_metadataGroupByArgs['orderBy'] }
        : { orderBy?: paper_metadataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, paper_metadataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaper_metadataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the paper_metadata model
   */
  readonly fields: paper_metadataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for paper_metadata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__paper_metadataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    papers<T extends papersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, papersDefaultArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the paper_metadata model
   */
  interface paper_metadataFieldRefs {
    readonly metadata_id: FieldRef<"paper_metadata", 'Int'>
    readonly paper_id: FieldRef<"paper_metadata", 'Int'>
    readonly type: FieldRef<"paper_metadata", 'String'>
    readonly format: FieldRef<"paper_metadata", 'String'>
    readonly language: FieldRef<"paper_metadata", 'String'>
    readonly source: FieldRef<"paper_metadata", 'String'>
    readonly rights: FieldRef<"paper_metadata", 'String'>
  }
    

  // Custom InputTypes
  /**
   * paper_metadata findUnique
   */
  export type paper_metadataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    /**
     * Filter, which paper_metadata to fetch.
     */
    where: paper_metadataWhereUniqueInput
  }

  /**
   * paper_metadata findUniqueOrThrow
   */
  export type paper_metadataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    /**
     * Filter, which paper_metadata to fetch.
     */
    where: paper_metadataWhereUniqueInput
  }

  /**
   * paper_metadata findFirst
   */
  export type paper_metadataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    /**
     * Filter, which paper_metadata to fetch.
     */
    where?: paper_metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of paper_metadata to fetch.
     */
    orderBy?: paper_metadataOrderByWithRelationInput | paper_metadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for paper_metadata.
     */
    cursor?: paper_metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` paper_metadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` paper_metadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of paper_metadata.
     */
    distinct?: Paper_metadataScalarFieldEnum | Paper_metadataScalarFieldEnum[]
  }

  /**
   * paper_metadata findFirstOrThrow
   */
  export type paper_metadataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    /**
     * Filter, which paper_metadata to fetch.
     */
    where?: paper_metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of paper_metadata to fetch.
     */
    orderBy?: paper_metadataOrderByWithRelationInput | paper_metadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for paper_metadata.
     */
    cursor?: paper_metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` paper_metadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` paper_metadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of paper_metadata.
     */
    distinct?: Paper_metadataScalarFieldEnum | Paper_metadataScalarFieldEnum[]
  }

  /**
   * paper_metadata findMany
   */
  export type paper_metadataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    /**
     * Filter, which paper_metadata to fetch.
     */
    where?: paper_metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of paper_metadata to fetch.
     */
    orderBy?: paper_metadataOrderByWithRelationInput | paper_metadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing paper_metadata.
     */
    cursor?: paper_metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` paper_metadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` paper_metadata.
     */
    skip?: number
    distinct?: Paper_metadataScalarFieldEnum | Paper_metadataScalarFieldEnum[]
  }

  /**
   * paper_metadata create
   */
  export type paper_metadataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    /**
     * The data needed to create a paper_metadata.
     */
    data: XOR<paper_metadataCreateInput, paper_metadataUncheckedCreateInput>
  }

  /**
   * paper_metadata createMany
   */
  export type paper_metadataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many paper_metadata.
     */
    data: paper_metadataCreateManyInput | paper_metadataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * paper_metadata createManyAndReturn
   */
  export type paper_metadataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * The data used to create many paper_metadata.
     */
    data: paper_metadataCreateManyInput | paper_metadataCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * paper_metadata update
   */
  export type paper_metadataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    /**
     * The data needed to update a paper_metadata.
     */
    data: XOR<paper_metadataUpdateInput, paper_metadataUncheckedUpdateInput>
    /**
     * Choose, which paper_metadata to update.
     */
    where: paper_metadataWhereUniqueInput
  }

  /**
   * paper_metadata updateMany
   */
  export type paper_metadataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update paper_metadata.
     */
    data: XOR<paper_metadataUpdateManyMutationInput, paper_metadataUncheckedUpdateManyInput>
    /**
     * Filter which paper_metadata to update
     */
    where?: paper_metadataWhereInput
    /**
     * Limit how many paper_metadata to update.
     */
    limit?: number
  }

  /**
   * paper_metadata updateManyAndReturn
   */
  export type paper_metadataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * The data used to update paper_metadata.
     */
    data: XOR<paper_metadataUpdateManyMutationInput, paper_metadataUncheckedUpdateManyInput>
    /**
     * Filter which paper_metadata to update
     */
    where?: paper_metadataWhereInput
    /**
     * Limit how many paper_metadata to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * paper_metadata upsert
   */
  export type paper_metadataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    /**
     * The filter to search for the paper_metadata to update in case it exists.
     */
    where: paper_metadataWhereUniqueInput
    /**
     * In case the paper_metadata found by the `where` argument doesn't exist, create a new paper_metadata with this data.
     */
    create: XOR<paper_metadataCreateInput, paper_metadataUncheckedCreateInput>
    /**
     * In case the paper_metadata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<paper_metadataUpdateInput, paper_metadataUncheckedUpdateInput>
  }

  /**
   * paper_metadata delete
   */
  export type paper_metadataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
    /**
     * Filter which paper_metadata to delete.
     */
    where: paper_metadataWhereUniqueInput
  }

  /**
   * paper_metadata deleteMany
   */
  export type paper_metadataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which paper_metadata to delete
     */
    where?: paper_metadataWhereInput
    /**
     * Limit how many paper_metadata to delete.
     */
    limit?: number
  }

  /**
   * paper_metadata without action
   */
  export type paper_metadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_metadata
     */
    select?: paper_metadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_metadata
     */
    omit?: paper_metadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_metadataInclude<ExtArgs> | null
  }


  /**
   * Model user_bookmarks
   */

  export type AggregateUser_bookmarks = {
    _count: User_bookmarksCountAggregateOutputType | null
    _avg: User_bookmarksAvgAggregateOutputType | null
    _sum: User_bookmarksSumAggregateOutputType | null
    _min: User_bookmarksMinAggregateOutputType | null
    _max: User_bookmarksMaxAggregateOutputType | null
  }

  export type User_bookmarksAvgAggregateOutputType = {
    bookmark_id: number | null
    user_id: number | null
    paper_id: number | null
  }

  export type User_bookmarksSumAggregateOutputType = {
    bookmark_id: number | null
    user_id: number | null
    paper_id: number | null
  }

  export type User_bookmarksMinAggregateOutputType = {
    bookmark_id: number | null
    user_id: number | null
    paper_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type User_bookmarksMaxAggregateOutputType = {
    bookmark_id: number | null
    user_id: number | null
    paper_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type User_bookmarksCountAggregateOutputType = {
    bookmark_id: number
    user_id: number
    paper_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type User_bookmarksAvgAggregateInputType = {
    bookmark_id?: true
    user_id?: true
    paper_id?: true
  }

  export type User_bookmarksSumAggregateInputType = {
    bookmark_id?: true
    user_id?: true
    paper_id?: true
  }

  export type User_bookmarksMinAggregateInputType = {
    bookmark_id?: true
    user_id?: true
    paper_id?: true
    created_at?: true
    updated_at?: true
  }

  export type User_bookmarksMaxAggregateInputType = {
    bookmark_id?: true
    user_id?: true
    paper_id?: true
    created_at?: true
    updated_at?: true
  }

  export type User_bookmarksCountAggregateInputType = {
    bookmark_id?: true
    user_id?: true
    paper_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type User_bookmarksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_bookmarks to aggregate.
     */
    where?: user_bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_bookmarks to fetch.
     */
    orderBy?: user_bookmarksOrderByWithRelationInput | user_bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_bookmarks
    **/
    _count?: true | User_bookmarksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_bookmarksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_bookmarksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_bookmarksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_bookmarksMaxAggregateInputType
  }

  export type GetUser_bookmarksAggregateType<T extends User_bookmarksAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_bookmarks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_bookmarks[P]>
      : GetScalarType<T[P], AggregateUser_bookmarks[P]>
  }




  export type user_bookmarksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_bookmarksWhereInput
    orderBy?: user_bookmarksOrderByWithAggregationInput | user_bookmarksOrderByWithAggregationInput[]
    by: User_bookmarksScalarFieldEnum[] | User_bookmarksScalarFieldEnum
    having?: user_bookmarksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_bookmarksCountAggregateInputType | true
    _avg?: User_bookmarksAvgAggregateInputType
    _sum?: User_bookmarksSumAggregateInputType
    _min?: User_bookmarksMinAggregateInputType
    _max?: User_bookmarksMaxAggregateInputType
  }

  export type User_bookmarksGroupByOutputType = {
    bookmark_id: number
    user_id: number
    paper_id: number
    created_at: Date | null
    updated_at: Date | null
    _count: User_bookmarksCountAggregateOutputType | null
    _avg: User_bookmarksAvgAggregateOutputType | null
    _sum: User_bookmarksSumAggregateOutputType | null
    _min: User_bookmarksMinAggregateOutputType | null
    _max: User_bookmarksMaxAggregateOutputType | null
  }

  type GetUser_bookmarksGroupByPayload<T extends user_bookmarksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_bookmarksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_bookmarksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_bookmarksGroupByOutputType[P]>
            : GetScalarType<T[P], User_bookmarksGroupByOutputType[P]>
        }
      >
    >


  export type user_bookmarksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookmark_id?: boolean
    user_id?: boolean
    paper_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_bookmarks"]>

  export type user_bookmarksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookmark_id?: boolean
    user_id?: boolean
    paper_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_bookmarks"]>

  export type user_bookmarksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookmark_id?: boolean
    user_id?: boolean
    paper_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_bookmarks"]>

  export type user_bookmarksSelectScalar = {
    bookmark_id?: boolean
    user_id?: boolean
    paper_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type user_bookmarksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"bookmark_id" | "user_id" | "paper_id" | "created_at" | "updated_at", ExtArgs["result"]["user_bookmarks"]>
  export type user_bookmarksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type user_bookmarksIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type user_bookmarksIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $user_bookmarksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_bookmarks"
    objects: {
      papers: Prisma.$papersPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      bookmark_id: number
      user_id: number
      paper_id: number
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["user_bookmarks"]>
    composites: {}
  }

  type user_bookmarksGetPayload<S extends boolean | null | undefined | user_bookmarksDefaultArgs> = $Result.GetResult<Prisma.$user_bookmarksPayload, S>

  type user_bookmarksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_bookmarksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_bookmarksCountAggregateInputType | true
    }

  export interface user_bookmarksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_bookmarks'], meta: { name: 'user_bookmarks' } }
    /**
     * Find zero or one User_bookmarks that matches the filter.
     * @param {user_bookmarksFindUniqueArgs} args - Arguments to find a User_bookmarks
     * @example
     * // Get one User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_bookmarksFindUniqueArgs>(args: SelectSubset<T, user_bookmarksFindUniqueArgs<ExtArgs>>): Prisma__user_bookmarksClient<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_bookmarks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_bookmarksFindUniqueOrThrowArgs} args - Arguments to find a User_bookmarks
     * @example
     * // Get one User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_bookmarksFindUniqueOrThrowArgs>(args: SelectSubset<T, user_bookmarksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_bookmarksClient<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_bookmarksFindFirstArgs} args - Arguments to find a User_bookmarks
     * @example
     * // Get one User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_bookmarksFindFirstArgs>(args?: SelectSubset<T, user_bookmarksFindFirstArgs<ExtArgs>>): Prisma__user_bookmarksClient<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_bookmarks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_bookmarksFindFirstOrThrowArgs} args - Arguments to find a User_bookmarks
     * @example
     * // Get one User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_bookmarksFindFirstOrThrowArgs>(args?: SelectSubset<T, user_bookmarksFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_bookmarksClient<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_bookmarksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.findMany()
     * 
     * // Get first 10 User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.findMany({ take: 10 })
     * 
     * // Only select the `bookmark_id`
     * const user_bookmarksWithBookmark_idOnly = await prisma.user_bookmarks.findMany({ select: { bookmark_id: true } })
     * 
     */
    findMany<T extends user_bookmarksFindManyArgs>(args?: SelectSubset<T, user_bookmarksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_bookmarks.
     * @param {user_bookmarksCreateArgs} args - Arguments to create a User_bookmarks.
     * @example
     * // Create one User_bookmarks
     * const User_bookmarks = await prisma.user_bookmarks.create({
     *   data: {
     *     // ... data to create a User_bookmarks
     *   }
     * })
     * 
     */
    create<T extends user_bookmarksCreateArgs>(args: SelectSubset<T, user_bookmarksCreateArgs<ExtArgs>>): Prisma__user_bookmarksClient<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_bookmarks.
     * @param {user_bookmarksCreateManyArgs} args - Arguments to create many User_bookmarks.
     * @example
     * // Create many User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_bookmarksCreateManyArgs>(args?: SelectSubset<T, user_bookmarksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_bookmarks and returns the data saved in the database.
     * @param {user_bookmarksCreateManyAndReturnArgs} args - Arguments to create many User_bookmarks.
     * @example
     * // Create many User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_bookmarks and only return the `bookmark_id`
     * const user_bookmarksWithBookmark_idOnly = await prisma.user_bookmarks.createManyAndReturn({
     *   select: { bookmark_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_bookmarksCreateManyAndReturnArgs>(args?: SelectSubset<T, user_bookmarksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_bookmarks.
     * @param {user_bookmarksDeleteArgs} args - Arguments to delete one User_bookmarks.
     * @example
     * // Delete one User_bookmarks
     * const User_bookmarks = await prisma.user_bookmarks.delete({
     *   where: {
     *     // ... filter to delete one User_bookmarks
     *   }
     * })
     * 
     */
    delete<T extends user_bookmarksDeleteArgs>(args: SelectSubset<T, user_bookmarksDeleteArgs<ExtArgs>>): Prisma__user_bookmarksClient<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_bookmarks.
     * @param {user_bookmarksUpdateArgs} args - Arguments to update one User_bookmarks.
     * @example
     * // Update one User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_bookmarksUpdateArgs>(args: SelectSubset<T, user_bookmarksUpdateArgs<ExtArgs>>): Prisma__user_bookmarksClient<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_bookmarks.
     * @param {user_bookmarksDeleteManyArgs} args - Arguments to filter User_bookmarks to delete.
     * @example
     * // Delete a few User_bookmarks
     * const { count } = await prisma.user_bookmarks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_bookmarksDeleteManyArgs>(args?: SelectSubset<T, user_bookmarksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_bookmarksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_bookmarksUpdateManyArgs>(args: SelectSubset<T, user_bookmarksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_bookmarks and returns the data updated in the database.
     * @param {user_bookmarksUpdateManyAndReturnArgs} args - Arguments to update many User_bookmarks.
     * @example
     * // Update many User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_bookmarks and only return the `bookmark_id`
     * const user_bookmarksWithBookmark_idOnly = await prisma.user_bookmarks.updateManyAndReturn({
     *   select: { bookmark_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_bookmarksUpdateManyAndReturnArgs>(args: SelectSubset<T, user_bookmarksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_bookmarks.
     * @param {user_bookmarksUpsertArgs} args - Arguments to update or create a User_bookmarks.
     * @example
     * // Update or create a User_bookmarks
     * const user_bookmarks = await prisma.user_bookmarks.upsert({
     *   create: {
     *     // ... data to create a User_bookmarks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_bookmarks we want to update
     *   }
     * })
     */
    upsert<T extends user_bookmarksUpsertArgs>(args: SelectSubset<T, user_bookmarksUpsertArgs<ExtArgs>>): Prisma__user_bookmarksClient<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_bookmarksCountArgs} args - Arguments to filter User_bookmarks to count.
     * @example
     * // Count the number of User_bookmarks
     * const count = await prisma.user_bookmarks.count({
     *   where: {
     *     // ... the filter for the User_bookmarks we want to count
     *   }
     * })
    **/
    count<T extends user_bookmarksCountArgs>(
      args?: Subset<T, user_bookmarksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_bookmarksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_bookmarksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_bookmarksAggregateArgs>(args: Subset<T, User_bookmarksAggregateArgs>): Prisma.PrismaPromise<GetUser_bookmarksAggregateType<T>>

    /**
     * Group by User_bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_bookmarksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_bookmarksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_bookmarksGroupByArgs['orderBy'] }
        : { orderBy?: user_bookmarksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_bookmarksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_bookmarksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_bookmarks model
   */
  readonly fields: user_bookmarksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_bookmarks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_bookmarksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    papers<T extends papersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, papersDefaultArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_bookmarks model
   */
  interface user_bookmarksFieldRefs {
    readonly bookmark_id: FieldRef<"user_bookmarks", 'Int'>
    readonly user_id: FieldRef<"user_bookmarks", 'Int'>
    readonly paper_id: FieldRef<"user_bookmarks", 'Int'>
    readonly created_at: FieldRef<"user_bookmarks", 'DateTime'>
    readonly updated_at: FieldRef<"user_bookmarks", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_bookmarks findUnique
   */
  export type user_bookmarksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which user_bookmarks to fetch.
     */
    where: user_bookmarksWhereUniqueInput
  }

  /**
   * user_bookmarks findUniqueOrThrow
   */
  export type user_bookmarksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which user_bookmarks to fetch.
     */
    where: user_bookmarksWhereUniqueInput
  }

  /**
   * user_bookmarks findFirst
   */
  export type user_bookmarksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which user_bookmarks to fetch.
     */
    where?: user_bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_bookmarks to fetch.
     */
    orderBy?: user_bookmarksOrderByWithRelationInput | user_bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_bookmarks.
     */
    cursor?: user_bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_bookmarks.
     */
    distinct?: User_bookmarksScalarFieldEnum | User_bookmarksScalarFieldEnum[]
  }

  /**
   * user_bookmarks findFirstOrThrow
   */
  export type user_bookmarksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which user_bookmarks to fetch.
     */
    where?: user_bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_bookmarks to fetch.
     */
    orderBy?: user_bookmarksOrderByWithRelationInput | user_bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_bookmarks.
     */
    cursor?: user_bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_bookmarks.
     */
    distinct?: User_bookmarksScalarFieldEnum | User_bookmarksScalarFieldEnum[]
  }

  /**
   * user_bookmarks findMany
   */
  export type user_bookmarksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which user_bookmarks to fetch.
     */
    where?: user_bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_bookmarks to fetch.
     */
    orderBy?: user_bookmarksOrderByWithRelationInput | user_bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_bookmarks.
     */
    cursor?: user_bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_bookmarks.
     */
    skip?: number
    distinct?: User_bookmarksScalarFieldEnum | User_bookmarksScalarFieldEnum[]
  }

  /**
   * user_bookmarks create
   */
  export type user_bookmarksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    /**
     * The data needed to create a user_bookmarks.
     */
    data: XOR<user_bookmarksCreateInput, user_bookmarksUncheckedCreateInput>
  }

  /**
   * user_bookmarks createMany
   */
  export type user_bookmarksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_bookmarks.
     */
    data: user_bookmarksCreateManyInput | user_bookmarksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_bookmarks createManyAndReturn
   */
  export type user_bookmarksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * The data used to create many user_bookmarks.
     */
    data: user_bookmarksCreateManyInput | user_bookmarksCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_bookmarks update
   */
  export type user_bookmarksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    /**
     * The data needed to update a user_bookmarks.
     */
    data: XOR<user_bookmarksUpdateInput, user_bookmarksUncheckedUpdateInput>
    /**
     * Choose, which user_bookmarks to update.
     */
    where: user_bookmarksWhereUniqueInput
  }

  /**
   * user_bookmarks updateMany
   */
  export type user_bookmarksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_bookmarks.
     */
    data: XOR<user_bookmarksUpdateManyMutationInput, user_bookmarksUncheckedUpdateManyInput>
    /**
     * Filter which user_bookmarks to update
     */
    where?: user_bookmarksWhereInput
    /**
     * Limit how many user_bookmarks to update.
     */
    limit?: number
  }

  /**
   * user_bookmarks updateManyAndReturn
   */
  export type user_bookmarksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * The data used to update user_bookmarks.
     */
    data: XOR<user_bookmarksUpdateManyMutationInput, user_bookmarksUncheckedUpdateManyInput>
    /**
     * Filter which user_bookmarks to update
     */
    where?: user_bookmarksWhereInput
    /**
     * Limit how many user_bookmarks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_bookmarks upsert
   */
  export type user_bookmarksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    /**
     * The filter to search for the user_bookmarks to update in case it exists.
     */
    where: user_bookmarksWhereUniqueInput
    /**
     * In case the user_bookmarks found by the `where` argument doesn't exist, create a new user_bookmarks with this data.
     */
    create: XOR<user_bookmarksCreateInput, user_bookmarksUncheckedCreateInput>
    /**
     * In case the user_bookmarks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_bookmarksUpdateInput, user_bookmarksUncheckedUpdateInput>
  }

  /**
   * user_bookmarks delete
   */
  export type user_bookmarksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
    /**
     * Filter which user_bookmarks to delete.
     */
    where: user_bookmarksWhereUniqueInput
  }

  /**
   * user_bookmarks deleteMany
   */
  export type user_bookmarksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_bookmarks to delete
     */
    where?: user_bookmarksWhereInput
    /**
     * Limit how many user_bookmarks to delete.
     */
    limit?: number
  }

  /**
   * user_bookmarks without action
   */
  export type user_bookmarksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_bookmarks
     */
    select?: user_bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_bookmarks
     */
    omit?: user_bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_bookmarksInclude<ExtArgs> | null
  }


  /**
   * Model Otp
   */

  export type AggregateOtp = {
    _count: OtpCountAggregateOutputType | null
    _min: OtpMinAggregateOutputType | null
    _max: OtpMaxAggregateOutputType | null
  }

  export type OtpMinAggregateOutputType = {
    id: string | null
    email: string | null
    code: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type OtpMaxAggregateOutputType = {
    id: string | null
    email: string | null
    code: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type OtpCountAggregateOutputType = {
    id: number
    email: number
    code: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type OtpMinAggregateInputType = {
    id?: true
    email?: true
    code?: true
    createdAt?: true
    expiresAt?: true
  }

  export type OtpMaxAggregateInputType = {
    id?: true
    email?: true
    code?: true
    createdAt?: true
    expiresAt?: true
  }

  export type OtpCountAggregateInputType = {
    id?: true
    email?: true
    code?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type OtpAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Otp to aggregate.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Otps
    **/
    _count?: true | OtpCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpMaxAggregateInputType
  }

  export type GetOtpAggregateType<T extends OtpAggregateArgs> = {
        [P in keyof T & keyof AggregateOtp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtp[P]>
      : GetScalarType<T[P], AggregateOtp[P]>
  }




  export type OtpGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpWhereInput
    orderBy?: OtpOrderByWithAggregationInput | OtpOrderByWithAggregationInput[]
    by: OtpScalarFieldEnum[] | OtpScalarFieldEnum
    having?: OtpScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpCountAggregateInputType | true
    _min?: OtpMinAggregateInputType
    _max?: OtpMaxAggregateInputType
  }

  export type OtpGroupByOutputType = {
    id: string
    email: string
    code: string
    createdAt: Date
    expiresAt: Date
    _count: OtpCountAggregateOutputType | null
    _min: OtpMinAggregateOutputType | null
    _max: OtpMaxAggregateOutputType | null
  }

  type GetOtpGroupByPayload<T extends OtpGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpGroupByOutputType[P]>
            : GetScalarType<T[P], OtpGroupByOutputType[P]>
        }
      >
    >


  export type OtpSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["otp"]>

  export type OtpSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["otp"]>

  export type OtpSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["otp"]>

  export type OtpSelectScalar = {
    id?: boolean
    email?: boolean
    code?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type OtpOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "code" | "createdAt" | "expiresAt", ExtArgs["result"]["otp"]>

  export type $OtpPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Otp"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      code: string
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["otp"]>
    composites: {}
  }

  type OtpGetPayload<S extends boolean | null | undefined | OtpDefaultArgs> = $Result.GetResult<Prisma.$OtpPayload, S>

  type OtpCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpCountAggregateInputType | true
    }

  export interface OtpDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Otp'], meta: { name: 'Otp' } }
    /**
     * Find zero or one Otp that matches the filter.
     * @param {OtpFindUniqueArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpFindUniqueArgs>(args: SelectSubset<T, OtpFindUniqueArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Otp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpFindUniqueOrThrowArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpFindFirstArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpFindFirstArgs>(args?: SelectSubset<T, OtpFindFirstArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Otp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpFindFirstOrThrowArgs} args - Arguments to find a Otp
     * @example
     * // Get one Otp
     * const otp = await prisma.otp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Otps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Otps
     * const otps = await prisma.otp.findMany()
     * 
     * // Get first 10 Otps
     * const otps = await prisma.otp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpWithIdOnly = await prisma.otp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpFindManyArgs>(args?: SelectSubset<T, OtpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Otp.
     * @param {OtpCreateArgs} args - Arguments to create a Otp.
     * @example
     * // Create one Otp
     * const Otp = await prisma.otp.create({
     *   data: {
     *     // ... data to create a Otp
     *   }
     * })
     * 
     */
    create<T extends OtpCreateArgs>(args: SelectSubset<T, OtpCreateArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Otps.
     * @param {OtpCreateManyArgs} args - Arguments to create many Otps.
     * @example
     * // Create many Otps
     * const otp = await prisma.otp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpCreateManyArgs>(args?: SelectSubset<T, OtpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Otps and returns the data saved in the database.
     * @param {OtpCreateManyAndReturnArgs} args - Arguments to create many Otps.
     * @example
     * // Create many Otps
     * const otp = await prisma.otp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Otps and only return the `id`
     * const otpWithIdOnly = await prisma.otp.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Otp.
     * @param {OtpDeleteArgs} args - Arguments to delete one Otp.
     * @example
     * // Delete one Otp
     * const Otp = await prisma.otp.delete({
     *   where: {
     *     // ... filter to delete one Otp
     *   }
     * })
     * 
     */
    delete<T extends OtpDeleteArgs>(args: SelectSubset<T, OtpDeleteArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Otp.
     * @param {OtpUpdateArgs} args - Arguments to update one Otp.
     * @example
     * // Update one Otp
     * const otp = await prisma.otp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpUpdateArgs>(args: SelectSubset<T, OtpUpdateArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Otps.
     * @param {OtpDeleteManyArgs} args - Arguments to filter Otps to delete.
     * @example
     * // Delete a few Otps
     * const { count } = await prisma.otp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpDeleteManyArgs>(args?: SelectSubset<T, OtpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Otps
     * const otp = await prisma.otp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpUpdateManyArgs>(args: SelectSubset<T, OtpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Otps and returns the data updated in the database.
     * @param {OtpUpdateManyAndReturnArgs} args - Arguments to update many Otps.
     * @example
     * // Update many Otps
     * const otp = await prisma.otp.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Otps and only return the `id`
     * const otpWithIdOnly = await prisma.otp.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Otp.
     * @param {OtpUpsertArgs} args - Arguments to update or create a Otp.
     * @example
     * // Update or create a Otp
     * const otp = await prisma.otp.upsert({
     *   create: {
     *     // ... data to create a Otp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Otp we want to update
     *   }
     * })
     */
    upsert<T extends OtpUpsertArgs>(args: SelectSubset<T, OtpUpsertArgs<ExtArgs>>): Prisma__OtpClient<$Result.GetResult<Prisma.$OtpPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Otps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCountArgs} args - Arguments to filter Otps to count.
     * @example
     * // Count the number of Otps
     * const count = await prisma.otp.count({
     *   where: {
     *     // ... the filter for the Otps we want to count
     *   }
     * })
    **/
    count<T extends OtpCountArgs>(
      args?: Subset<T, OtpCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Otp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpAggregateArgs>(args: Subset<T, OtpAggregateArgs>): Prisma.PrismaPromise<GetOtpAggregateType<T>>

    /**
     * Group by Otp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpGroupByArgs['orderBy'] }
        : { orderBy?: OtpGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Otp model
   */
  readonly fields: OtpFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Otp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Otp model
   */
  interface OtpFieldRefs {
    readonly id: FieldRef<"Otp", 'String'>
    readonly email: FieldRef<"Otp", 'String'>
    readonly code: FieldRef<"Otp", 'String'>
    readonly createdAt: FieldRef<"Otp", 'DateTime'>
    readonly expiresAt: FieldRef<"Otp", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Otp findUnique
   */
  export type OtpFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp findUniqueOrThrow
   */
  export type OtpFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp findFirst
   */
  export type OtpFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Otps.
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Otps.
     */
    distinct?: OtpScalarFieldEnum | OtpScalarFieldEnum[]
  }

  /**
   * Otp findFirstOrThrow
   */
  export type OtpFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otp to fetch.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Otps.
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Otps.
     */
    distinct?: OtpScalarFieldEnum | OtpScalarFieldEnum[]
  }

  /**
   * Otp findMany
   */
  export type OtpFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter, which Otps to fetch.
     */
    where?: OtpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Otps to fetch.
     */
    orderBy?: OtpOrderByWithRelationInput | OtpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Otps.
     */
    cursor?: OtpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Otps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Otps.
     */
    skip?: number
    distinct?: OtpScalarFieldEnum | OtpScalarFieldEnum[]
  }

  /**
   * Otp create
   */
  export type OtpCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data needed to create a Otp.
     */
    data: XOR<OtpCreateInput, OtpUncheckedCreateInput>
  }

  /**
   * Otp createMany
   */
  export type OtpCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Otps.
     */
    data: OtpCreateManyInput | OtpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Otp createManyAndReturn
   */
  export type OtpCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data used to create many Otps.
     */
    data: OtpCreateManyInput | OtpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Otp update
   */
  export type OtpUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data needed to update a Otp.
     */
    data: XOR<OtpUpdateInput, OtpUncheckedUpdateInput>
    /**
     * Choose, which Otp to update.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp updateMany
   */
  export type OtpUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Otps.
     */
    data: XOR<OtpUpdateManyMutationInput, OtpUncheckedUpdateManyInput>
    /**
     * Filter which Otps to update
     */
    where?: OtpWhereInput
    /**
     * Limit how many Otps to update.
     */
    limit?: number
  }

  /**
   * Otp updateManyAndReturn
   */
  export type OtpUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The data used to update Otps.
     */
    data: XOR<OtpUpdateManyMutationInput, OtpUncheckedUpdateManyInput>
    /**
     * Filter which Otps to update
     */
    where?: OtpWhereInput
    /**
     * Limit how many Otps to update.
     */
    limit?: number
  }

  /**
   * Otp upsert
   */
  export type OtpUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * The filter to search for the Otp to update in case it exists.
     */
    where: OtpWhereUniqueInput
    /**
     * In case the Otp found by the `where` argument doesn't exist, create a new Otp with this data.
     */
    create: XOR<OtpCreateInput, OtpUncheckedCreateInput>
    /**
     * In case the Otp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpUpdateInput, OtpUncheckedUpdateInput>
  }

  /**
   * Otp delete
   */
  export type OtpDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
    /**
     * Filter which Otp to delete.
     */
    where: OtpWhereUniqueInput
  }

  /**
   * Otp deleteMany
   */
  export type OtpDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Otps to delete
     */
    where?: OtpWhereInput
    /**
     * Limit how many Otps to delete.
     */
    limit?: number
  }

  /**
   * Otp without action
   */
  export type OtpDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Otp
     */
    select?: OtpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Otp
     */
    omit?: OtpOmit<ExtArgs> | null
  }


  /**
   * Model paper_bm25_index
   */

  export type AggregatePaper_bm25_index = {
    _count: Paper_bm25_indexCountAggregateOutputType | null
    _avg: Paper_bm25_indexAvgAggregateOutputType | null
    _sum: Paper_bm25_indexSumAggregateOutputType | null
    _min: Paper_bm25_indexMinAggregateOutputType | null
    _max: Paper_bm25_indexMaxAggregateOutputType | null
  }

  export type Paper_bm25_indexAvgAggregateOutputType = {
    index_id: number | null
    paper_id: number | null
    document_length: number | null
  }

  export type Paper_bm25_indexSumAggregateOutputType = {
    index_id: number | null
    paper_id: number | null
    document_length: number | null
  }

  export type Paper_bm25_indexMinAggregateOutputType = {
    index_id: number | null
    paper_id: number | null
    document_length: number | null
  }

  export type Paper_bm25_indexMaxAggregateOutputType = {
    index_id: number | null
    paper_id: number | null
    document_length: number | null
  }

  export type Paper_bm25_indexCountAggregateOutputType = {
    index_id: number
    paper_id: number
    token_frequencies: number
    document_length: number
    _all: number
  }


  export type Paper_bm25_indexAvgAggregateInputType = {
    index_id?: true
    paper_id?: true
    document_length?: true
  }

  export type Paper_bm25_indexSumAggregateInputType = {
    index_id?: true
    paper_id?: true
    document_length?: true
  }

  export type Paper_bm25_indexMinAggregateInputType = {
    index_id?: true
    paper_id?: true
    document_length?: true
  }

  export type Paper_bm25_indexMaxAggregateInputType = {
    index_id?: true
    paper_id?: true
    document_length?: true
  }

  export type Paper_bm25_indexCountAggregateInputType = {
    index_id?: true
    paper_id?: true
    token_frequencies?: true
    document_length?: true
    _all?: true
  }

  export type Paper_bm25_indexAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which paper_bm25_index to aggregate.
     */
    where?: paper_bm25_indexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of paper_bm25_indices to fetch.
     */
    orderBy?: paper_bm25_indexOrderByWithRelationInput | paper_bm25_indexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: paper_bm25_indexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` paper_bm25_indices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` paper_bm25_indices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned paper_bm25_indices
    **/
    _count?: true | Paper_bm25_indexCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Paper_bm25_indexAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Paper_bm25_indexSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Paper_bm25_indexMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Paper_bm25_indexMaxAggregateInputType
  }

  export type GetPaper_bm25_indexAggregateType<T extends Paper_bm25_indexAggregateArgs> = {
        [P in keyof T & keyof AggregatePaper_bm25_index]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaper_bm25_index[P]>
      : GetScalarType<T[P], AggregatePaper_bm25_index[P]>
  }




  export type paper_bm25_indexGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: paper_bm25_indexWhereInput
    orderBy?: paper_bm25_indexOrderByWithAggregationInput | paper_bm25_indexOrderByWithAggregationInput[]
    by: Paper_bm25_indexScalarFieldEnum[] | Paper_bm25_indexScalarFieldEnum
    having?: paper_bm25_indexScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Paper_bm25_indexCountAggregateInputType | true
    _avg?: Paper_bm25_indexAvgAggregateInputType
    _sum?: Paper_bm25_indexSumAggregateInputType
    _min?: Paper_bm25_indexMinAggregateInputType
    _max?: Paper_bm25_indexMaxAggregateInputType
  }

  export type Paper_bm25_indexGroupByOutputType = {
    index_id: number
    paper_id: number
    token_frequencies: JsonValue
    document_length: number
    _count: Paper_bm25_indexCountAggregateOutputType | null
    _avg: Paper_bm25_indexAvgAggregateOutputType | null
    _sum: Paper_bm25_indexSumAggregateOutputType | null
    _min: Paper_bm25_indexMinAggregateOutputType | null
    _max: Paper_bm25_indexMaxAggregateOutputType | null
  }

  type GetPaper_bm25_indexGroupByPayload<T extends paper_bm25_indexGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Paper_bm25_indexGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Paper_bm25_indexGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Paper_bm25_indexGroupByOutputType[P]>
            : GetScalarType<T[P], Paper_bm25_indexGroupByOutputType[P]>
        }
      >
    >


  export type paper_bm25_indexSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    index_id?: boolean
    paper_id?: boolean
    token_frequencies?: boolean
    document_length?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paper_bm25_index"]>

  export type paper_bm25_indexSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    index_id?: boolean
    paper_id?: boolean
    token_frequencies?: boolean
    document_length?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paper_bm25_index"]>

  export type paper_bm25_indexSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    index_id?: boolean
    paper_id?: boolean
    token_frequencies?: boolean
    document_length?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paper_bm25_index"]>

  export type paper_bm25_indexSelectScalar = {
    index_id?: boolean
    paper_id?: boolean
    token_frequencies?: boolean
    document_length?: boolean
  }

  export type paper_bm25_indexOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"index_id" | "paper_id" | "token_frequencies" | "document_length", ExtArgs["result"]["paper_bm25_index"]>
  export type paper_bm25_indexInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }
  export type paper_bm25_indexIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }
  export type paper_bm25_indexIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }

  export type $paper_bm25_indexPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "paper_bm25_index"
    objects: {
      papers: Prisma.$papersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      index_id: number
      paper_id: number
      token_frequencies: Prisma.JsonValue
      document_length: number
    }, ExtArgs["result"]["paper_bm25_index"]>
    composites: {}
  }

  type paper_bm25_indexGetPayload<S extends boolean | null | undefined | paper_bm25_indexDefaultArgs> = $Result.GetResult<Prisma.$paper_bm25_indexPayload, S>

  type paper_bm25_indexCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<paper_bm25_indexFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Paper_bm25_indexCountAggregateInputType | true
    }

  export interface paper_bm25_indexDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['paper_bm25_index'], meta: { name: 'paper_bm25_index' } }
    /**
     * Find zero or one Paper_bm25_index that matches the filter.
     * @param {paper_bm25_indexFindUniqueArgs} args - Arguments to find a Paper_bm25_index
     * @example
     * // Get one Paper_bm25_index
     * const paper_bm25_index = await prisma.paper_bm25_index.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends paper_bm25_indexFindUniqueArgs>(args: SelectSubset<T, paper_bm25_indexFindUniqueArgs<ExtArgs>>): Prisma__paper_bm25_indexClient<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Paper_bm25_index that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {paper_bm25_indexFindUniqueOrThrowArgs} args - Arguments to find a Paper_bm25_index
     * @example
     * // Get one Paper_bm25_index
     * const paper_bm25_index = await prisma.paper_bm25_index.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends paper_bm25_indexFindUniqueOrThrowArgs>(args: SelectSubset<T, paper_bm25_indexFindUniqueOrThrowArgs<ExtArgs>>): Prisma__paper_bm25_indexClient<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paper_bm25_index that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_bm25_indexFindFirstArgs} args - Arguments to find a Paper_bm25_index
     * @example
     * // Get one Paper_bm25_index
     * const paper_bm25_index = await prisma.paper_bm25_index.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends paper_bm25_indexFindFirstArgs>(args?: SelectSubset<T, paper_bm25_indexFindFirstArgs<ExtArgs>>): Prisma__paper_bm25_indexClient<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paper_bm25_index that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_bm25_indexFindFirstOrThrowArgs} args - Arguments to find a Paper_bm25_index
     * @example
     * // Get one Paper_bm25_index
     * const paper_bm25_index = await prisma.paper_bm25_index.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends paper_bm25_indexFindFirstOrThrowArgs>(args?: SelectSubset<T, paper_bm25_indexFindFirstOrThrowArgs<ExtArgs>>): Prisma__paper_bm25_indexClient<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Paper_bm25_indices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_bm25_indexFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Paper_bm25_indices
     * const paper_bm25_indices = await prisma.paper_bm25_index.findMany()
     * 
     * // Get first 10 Paper_bm25_indices
     * const paper_bm25_indices = await prisma.paper_bm25_index.findMany({ take: 10 })
     * 
     * // Only select the `index_id`
     * const paper_bm25_indexWithIndex_idOnly = await prisma.paper_bm25_index.findMany({ select: { index_id: true } })
     * 
     */
    findMany<T extends paper_bm25_indexFindManyArgs>(args?: SelectSubset<T, paper_bm25_indexFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Paper_bm25_index.
     * @param {paper_bm25_indexCreateArgs} args - Arguments to create a Paper_bm25_index.
     * @example
     * // Create one Paper_bm25_index
     * const Paper_bm25_index = await prisma.paper_bm25_index.create({
     *   data: {
     *     // ... data to create a Paper_bm25_index
     *   }
     * })
     * 
     */
    create<T extends paper_bm25_indexCreateArgs>(args: SelectSubset<T, paper_bm25_indexCreateArgs<ExtArgs>>): Prisma__paper_bm25_indexClient<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Paper_bm25_indices.
     * @param {paper_bm25_indexCreateManyArgs} args - Arguments to create many Paper_bm25_indices.
     * @example
     * // Create many Paper_bm25_indices
     * const paper_bm25_index = await prisma.paper_bm25_index.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends paper_bm25_indexCreateManyArgs>(args?: SelectSubset<T, paper_bm25_indexCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Paper_bm25_indices and returns the data saved in the database.
     * @param {paper_bm25_indexCreateManyAndReturnArgs} args - Arguments to create many Paper_bm25_indices.
     * @example
     * // Create many Paper_bm25_indices
     * const paper_bm25_index = await prisma.paper_bm25_index.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Paper_bm25_indices and only return the `index_id`
     * const paper_bm25_indexWithIndex_idOnly = await prisma.paper_bm25_index.createManyAndReturn({
     *   select: { index_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends paper_bm25_indexCreateManyAndReturnArgs>(args?: SelectSubset<T, paper_bm25_indexCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Paper_bm25_index.
     * @param {paper_bm25_indexDeleteArgs} args - Arguments to delete one Paper_bm25_index.
     * @example
     * // Delete one Paper_bm25_index
     * const Paper_bm25_index = await prisma.paper_bm25_index.delete({
     *   where: {
     *     // ... filter to delete one Paper_bm25_index
     *   }
     * })
     * 
     */
    delete<T extends paper_bm25_indexDeleteArgs>(args: SelectSubset<T, paper_bm25_indexDeleteArgs<ExtArgs>>): Prisma__paper_bm25_indexClient<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Paper_bm25_index.
     * @param {paper_bm25_indexUpdateArgs} args - Arguments to update one Paper_bm25_index.
     * @example
     * // Update one Paper_bm25_index
     * const paper_bm25_index = await prisma.paper_bm25_index.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends paper_bm25_indexUpdateArgs>(args: SelectSubset<T, paper_bm25_indexUpdateArgs<ExtArgs>>): Prisma__paper_bm25_indexClient<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Paper_bm25_indices.
     * @param {paper_bm25_indexDeleteManyArgs} args - Arguments to filter Paper_bm25_indices to delete.
     * @example
     * // Delete a few Paper_bm25_indices
     * const { count } = await prisma.paper_bm25_index.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends paper_bm25_indexDeleteManyArgs>(args?: SelectSubset<T, paper_bm25_indexDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Paper_bm25_indices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_bm25_indexUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Paper_bm25_indices
     * const paper_bm25_index = await prisma.paper_bm25_index.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends paper_bm25_indexUpdateManyArgs>(args: SelectSubset<T, paper_bm25_indexUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Paper_bm25_indices and returns the data updated in the database.
     * @param {paper_bm25_indexUpdateManyAndReturnArgs} args - Arguments to update many Paper_bm25_indices.
     * @example
     * // Update many Paper_bm25_indices
     * const paper_bm25_index = await prisma.paper_bm25_index.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Paper_bm25_indices and only return the `index_id`
     * const paper_bm25_indexWithIndex_idOnly = await prisma.paper_bm25_index.updateManyAndReturn({
     *   select: { index_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends paper_bm25_indexUpdateManyAndReturnArgs>(args: SelectSubset<T, paper_bm25_indexUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Paper_bm25_index.
     * @param {paper_bm25_indexUpsertArgs} args - Arguments to update or create a Paper_bm25_index.
     * @example
     * // Update or create a Paper_bm25_index
     * const paper_bm25_index = await prisma.paper_bm25_index.upsert({
     *   create: {
     *     // ... data to create a Paper_bm25_index
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Paper_bm25_index we want to update
     *   }
     * })
     */
    upsert<T extends paper_bm25_indexUpsertArgs>(args: SelectSubset<T, paper_bm25_indexUpsertArgs<ExtArgs>>): Prisma__paper_bm25_indexClient<$Result.GetResult<Prisma.$paper_bm25_indexPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Paper_bm25_indices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_bm25_indexCountArgs} args - Arguments to filter Paper_bm25_indices to count.
     * @example
     * // Count the number of Paper_bm25_indices
     * const count = await prisma.paper_bm25_index.count({
     *   where: {
     *     // ... the filter for the Paper_bm25_indices we want to count
     *   }
     * })
    **/
    count<T extends paper_bm25_indexCountArgs>(
      args?: Subset<T, paper_bm25_indexCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Paper_bm25_indexCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Paper_bm25_index.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Paper_bm25_indexAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Paper_bm25_indexAggregateArgs>(args: Subset<T, Paper_bm25_indexAggregateArgs>): Prisma.PrismaPromise<GetPaper_bm25_indexAggregateType<T>>

    /**
     * Group by Paper_bm25_index.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {paper_bm25_indexGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends paper_bm25_indexGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: paper_bm25_indexGroupByArgs['orderBy'] }
        : { orderBy?: paper_bm25_indexGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, paper_bm25_indexGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaper_bm25_indexGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the paper_bm25_index model
   */
  readonly fields: paper_bm25_indexFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for paper_bm25_index.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__paper_bm25_indexClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    papers<T extends papersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, papersDefaultArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the paper_bm25_index model
   */
  interface paper_bm25_indexFieldRefs {
    readonly index_id: FieldRef<"paper_bm25_index", 'Int'>
    readonly paper_id: FieldRef<"paper_bm25_index", 'Int'>
    readonly token_frequencies: FieldRef<"paper_bm25_index", 'Json'>
    readonly document_length: FieldRef<"paper_bm25_index", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * paper_bm25_index findUnique
   */
  export type paper_bm25_indexFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    /**
     * Filter, which paper_bm25_index to fetch.
     */
    where: paper_bm25_indexWhereUniqueInput
  }

  /**
   * paper_bm25_index findUniqueOrThrow
   */
  export type paper_bm25_indexFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    /**
     * Filter, which paper_bm25_index to fetch.
     */
    where: paper_bm25_indexWhereUniqueInput
  }

  /**
   * paper_bm25_index findFirst
   */
  export type paper_bm25_indexFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    /**
     * Filter, which paper_bm25_index to fetch.
     */
    where?: paper_bm25_indexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of paper_bm25_indices to fetch.
     */
    orderBy?: paper_bm25_indexOrderByWithRelationInput | paper_bm25_indexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for paper_bm25_indices.
     */
    cursor?: paper_bm25_indexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` paper_bm25_indices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` paper_bm25_indices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of paper_bm25_indices.
     */
    distinct?: Paper_bm25_indexScalarFieldEnum | Paper_bm25_indexScalarFieldEnum[]
  }

  /**
   * paper_bm25_index findFirstOrThrow
   */
  export type paper_bm25_indexFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    /**
     * Filter, which paper_bm25_index to fetch.
     */
    where?: paper_bm25_indexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of paper_bm25_indices to fetch.
     */
    orderBy?: paper_bm25_indexOrderByWithRelationInput | paper_bm25_indexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for paper_bm25_indices.
     */
    cursor?: paper_bm25_indexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` paper_bm25_indices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` paper_bm25_indices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of paper_bm25_indices.
     */
    distinct?: Paper_bm25_indexScalarFieldEnum | Paper_bm25_indexScalarFieldEnum[]
  }

  /**
   * paper_bm25_index findMany
   */
  export type paper_bm25_indexFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    /**
     * Filter, which paper_bm25_indices to fetch.
     */
    where?: paper_bm25_indexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of paper_bm25_indices to fetch.
     */
    orderBy?: paper_bm25_indexOrderByWithRelationInput | paper_bm25_indexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing paper_bm25_indices.
     */
    cursor?: paper_bm25_indexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` paper_bm25_indices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` paper_bm25_indices.
     */
    skip?: number
    distinct?: Paper_bm25_indexScalarFieldEnum | Paper_bm25_indexScalarFieldEnum[]
  }

  /**
   * paper_bm25_index create
   */
  export type paper_bm25_indexCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    /**
     * The data needed to create a paper_bm25_index.
     */
    data: XOR<paper_bm25_indexCreateInput, paper_bm25_indexUncheckedCreateInput>
  }

  /**
   * paper_bm25_index createMany
   */
  export type paper_bm25_indexCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many paper_bm25_indices.
     */
    data: paper_bm25_indexCreateManyInput | paper_bm25_indexCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * paper_bm25_index createManyAndReturn
   */
  export type paper_bm25_indexCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * The data used to create many paper_bm25_indices.
     */
    data: paper_bm25_indexCreateManyInput | paper_bm25_indexCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * paper_bm25_index update
   */
  export type paper_bm25_indexUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    /**
     * The data needed to update a paper_bm25_index.
     */
    data: XOR<paper_bm25_indexUpdateInput, paper_bm25_indexUncheckedUpdateInput>
    /**
     * Choose, which paper_bm25_index to update.
     */
    where: paper_bm25_indexWhereUniqueInput
  }

  /**
   * paper_bm25_index updateMany
   */
  export type paper_bm25_indexUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update paper_bm25_indices.
     */
    data: XOR<paper_bm25_indexUpdateManyMutationInput, paper_bm25_indexUncheckedUpdateManyInput>
    /**
     * Filter which paper_bm25_indices to update
     */
    where?: paper_bm25_indexWhereInput
    /**
     * Limit how many paper_bm25_indices to update.
     */
    limit?: number
  }

  /**
   * paper_bm25_index updateManyAndReturn
   */
  export type paper_bm25_indexUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * The data used to update paper_bm25_indices.
     */
    data: XOR<paper_bm25_indexUpdateManyMutationInput, paper_bm25_indexUncheckedUpdateManyInput>
    /**
     * Filter which paper_bm25_indices to update
     */
    where?: paper_bm25_indexWhereInput
    /**
     * Limit how many paper_bm25_indices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * paper_bm25_index upsert
   */
  export type paper_bm25_indexUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    /**
     * The filter to search for the paper_bm25_index to update in case it exists.
     */
    where: paper_bm25_indexWhereUniqueInput
    /**
     * In case the paper_bm25_index found by the `where` argument doesn't exist, create a new paper_bm25_index with this data.
     */
    create: XOR<paper_bm25_indexCreateInput, paper_bm25_indexUncheckedCreateInput>
    /**
     * In case the paper_bm25_index was found with the provided `where` argument, update it with this data.
     */
    update: XOR<paper_bm25_indexUpdateInput, paper_bm25_indexUncheckedUpdateInput>
  }

  /**
   * paper_bm25_index delete
   */
  export type paper_bm25_indexDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
    /**
     * Filter which paper_bm25_index to delete.
     */
    where: paper_bm25_indexWhereUniqueInput
  }

  /**
   * paper_bm25_index deleteMany
   */
  export type paper_bm25_indexDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which paper_bm25_indices to delete
     */
    where?: paper_bm25_indexWhereInput
    /**
     * Limit how many paper_bm25_indices to delete.
     */
    limit?: number
  }

  /**
   * paper_bm25_index without action
   */
  export type paper_bm25_indexDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paper_bm25_index
     */
    select?: paper_bm25_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paper_bm25_index
     */
    omit?: paper_bm25_indexOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: paper_bm25_indexInclude<ExtArgs> | null
  }


  /**
   * Model term_score
   */

  export type AggregateTerm_score = {
    _count: Term_scoreCountAggregateOutputType | null
    _avg: Term_scoreAvgAggregateOutputType | null
    _sum: Term_scoreSumAggregateOutputType | null
    _min: Term_scoreMinAggregateOutputType | null
    _max: Term_scoreMaxAggregateOutputType | null
  }

  export type Term_scoreAvgAggregateOutputType = {
    id: number | null
    tf: number | null
    tfidf: number | null
    bm25: number | null
    paper_id: number | null
  }

  export type Term_scoreSumAggregateOutputType = {
    id: number | null
    tf: number | null
    tfidf: number | null
    bm25: number | null
    paper_id: number | null
  }

  export type Term_scoreMinAggregateOutputType = {
    id: number | null
    term: string | null
    tf: number | null
    tfidf: number | null
    bm25: number | null
    paper_id: number | null
  }

  export type Term_scoreMaxAggregateOutputType = {
    id: number | null
    term: string | null
    tf: number | null
    tfidf: number | null
    bm25: number | null
    paper_id: number | null
  }

  export type Term_scoreCountAggregateOutputType = {
    id: number
    term: number
    tf: number
    tfidf: number
    bm25: number
    paper_id: number
    _all: number
  }


  export type Term_scoreAvgAggregateInputType = {
    id?: true
    tf?: true
    tfidf?: true
    bm25?: true
    paper_id?: true
  }

  export type Term_scoreSumAggregateInputType = {
    id?: true
    tf?: true
    tfidf?: true
    bm25?: true
    paper_id?: true
  }

  export type Term_scoreMinAggregateInputType = {
    id?: true
    term?: true
    tf?: true
    tfidf?: true
    bm25?: true
    paper_id?: true
  }

  export type Term_scoreMaxAggregateInputType = {
    id?: true
    term?: true
    tf?: true
    tfidf?: true
    bm25?: true
    paper_id?: true
  }

  export type Term_scoreCountAggregateInputType = {
    id?: true
    term?: true
    tf?: true
    tfidf?: true
    bm25?: true
    paper_id?: true
    _all?: true
  }

  export type Term_scoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which term_score to aggregate.
     */
    where?: term_scoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of term_scores to fetch.
     */
    orderBy?: term_scoreOrderByWithRelationInput | term_scoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: term_scoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` term_scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` term_scores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned term_scores
    **/
    _count?: true | Term_scoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Term_scoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Term_scoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Term_scoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Term_scoreMaxAggregateInputType
  }

  export type GetTerm_scoreAggregateType<T extends Term_scoreAggregateArgs> = {
        [P in keyof T & keyof AggregateTerm_score]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTerm_score[P]>
      : GetScalarType<T[P], AggregateTerm_score[P]>
  }




  export type term_scoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: term_scoreWhereInput
    orderBy?: term_scoreOrderByWithAggregationInput | term_scoreOrderByWithAggregationInput[]
    by: Term_scoreScalarFieldEnum[] | Term_scoreScalarFieldEnum
    having?: term_scoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Term_scoreCountAggregateInputType | true
    _avg?: Term_scoreAvgAggregateInputType
    _sum?: Term_scoreSumAggregateInputType
    _min?: Term_scoreMinAggregateInputType
    _max?: Term_scoreMaxAggregateInputType
  }

  export type Term_scoreGroupByOutputType = {
    id: number
    term: string
    tf: number
    tfidf: number
    bm25: number
    paper_id: number
    _count: Term_scoreCountAggregateOutputType | null
    _avg: Term_scoreAvgAggregateOutputType | null
    _sum: Term_scoreSumAggregateOutputType | null
    _min: Term_scoreMinAggregateOutputType | null
    _max: Term_scoreMaxAggregateOutputType | null
  }

  type GetTerm_scoreGroupByPayload<T extends term_scoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Term_scoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Term_scoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Term_scoreGroupByOutputType[P]>
            : GetScalarType<T[P], Term_scoreGroupByOutputType[P]>
        }
      >
    >


  export type term_scoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term?: boolean
    tf?: boolean
    tfidf?: boolean
    bm25?: boolean
    paper_id?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["term_score"]>

  export type term_scoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term?: boolean
    tf?: boolean
    tfidf?: boolean
    bm25?: boolean
    paper_id?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["term_score"]>

  export type term_scoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term?: boolean
    tf?: boolean
    tfidf?: boolean
    bm25?: boolean
    paper_id?: boolean
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["term_score"]>

  export type term_scoreSelectScalar = {
    id?: boolean
    term?: boolean
    tf?: boolean
    tfidf?: boolean
    bm25?: boolean
    paper_id?: boolean
  }

  export type term_scoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "term" | "tf" | "tfidf" | "bm25" | "paper_id", ExtArgs["result"]["term_score"]>
  export type term_scoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }
  export type term_scoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }
  export type term_scoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }

  export type $term_scorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "term_score"
    objects: {
      papers: Prisma.$papersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      term: string
      tf: number
      tfidf: number
      bm25: number
      paper_id: number
    }, ExtArgs["result"]["term_score"]>
    composites: {}
  }

  type term_scoreGetPayload<S extends boolean | null | undefined | term_scoreDefaultArgs> = $Result.GetResult<Prisma.$term_scorePayload, S>

  type term_scoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<term_scoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Term_scoreCountAggregateInputType | true
    }

  export interface term_scoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['term_score'], meta: { name: 'term_score' } }
    /**
     * Find zero or one Term_score that matches the filter.
     * @param {term_scoreFindUniqueArgs} args - Arguments to find a Term_score
     * @example
     * // Get one Term_score
     * const term_score = await prisma.term_score.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends term_scoreFindUniqueArgs>(args: SelectSubset<T, term_scoreFindUniqueArgs<ExtArgs>>): Prisma__term_scoreClient<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Term_score that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {term_scoreFindUniqueOrThrowArgs} args - Arguments to find a Term_score
     * @example
     * // Get one Term_score
     * const term_score = await prisma.term_score.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends term_scoreFindUniqueOrThrowArgs>(args: SelectSubset<T, term_scoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__term_scoreClient<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Term_score that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {term_scoreFindFirstArgs} args - Arguments to find a Term_score
     * @example
     * // Get one Term_score
     * const term_score = await prisma.term_score.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends term_scoreFindFirstArgs>(args?: SelectSubset<T, term_scoreFindFirstArgs<ExtArgs>>): Prisma__term_scoreClient<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Term_score that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {term_scoreFindFirstOrThrowArgs} args - Arguments to find a Term_score
     * @example
     * // Get one Term_score
     * const term_score = await prisma.term_score.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends term_scoreFindFirstOrThrowArgs>(args?: SelectSubset<T, term_scoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__term_scoreClient<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Term_scores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {term_scoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Term_scores
     * const term_scores = await prisma.term_score.findMany()
     * 
     * // Get first 10 Term_scores
     * const term_scores = await prisma.term_score.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const term_scoreWithIdOnly = await prisma.term_score.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends term_scoreFindManyArgs>(args?: SelectSubset<T, term_scoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Term_score.
     * @param {term_scoreCreateArgs} args - Arguments to create a Term_score.
     * @example
     * // Create one Term_score
     * const Term_score = await prisma.term_score.create({
     *   data: {
     *     // ... data to create a Term_score
     *   }
     * })
     * 
     */
    create<T extends term_scoreCreateArgs>(args: SelectSubset<T, term_scoreCreateArgs<ExtArgs>>): Prisma__term_scoreClient<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Term_scores.
     * @param {term_scoreCreateManyArgs} args - Arguments to create many Term_scores.
     * @example
     * // Create many Term_scores
     * const term_score = await prisma.term_score.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends term_scoreCreateManyArgs>(args?: SelectSubset<T, term_scoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Term_scores and returns the data saved in the database.
     * @param {term_scoreCreateManyAndReturnArgs} args - Arguments to create many Term_scores.
     * @example
     * // Create many Term_scores
     * const term_score = await prisma.term_score.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Term_scores and only return the `id`
     * const term_scoreWithIdOnly = await prisma.term_score.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends term_scoreCreateManyAndReturnArgs>(args?: SelectSubset<T, term_scoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Term_score.
     * @param {term_scoreDeleteArgs} args - Arguments to delete one Term_score.
     * @example
     * // Delete one Term_score
     * const Term_score = await prisma.term_score.delete({
     *   where: {
     *     // ... filter to delete one Term_score
     *   }
     * })
     * 
     */
    delete<T extends term_scoreDeleteArgs>(args: SelectSubset<T, term_scoreDeleteArgs<ExtArgs>>): Prisma__term_scoreClient<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Term_score.
     * @param {term_scoreUpdateArgs} args - Arguments to update one Term_score.
     * @example
     * // Update one Term_score
     * const term_score = await prisma.term_score.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends term_scoreUpdateArgs>(args: SelectSubset<T, term_scoreUpdateArgs<ExtArgs>>): Prisma__term_scoreClient<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Term_scores.
     * @param {term_scoreDeleteManyArgs} args - Arguments to filter Term_scores to delete.
     * @example
     * // Delete a few Term_scores
     * const { count } = await prisma.term_score.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends term_scoreDeleteManyArgs>(args?: SelectSubset<T, term_scoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Term_scores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {term_scoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Term_scores
     * const term_score = await prisma.term_score.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends term_scoreUpdateManyArgs>(args: SelectSubset<T, term_scoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Term_scores and returns the data updated in the database.
     * @param {term_scoreUpdateManyAndReturnArgs} args - Arguments to update many Term_scores.
     * @example
     * // Update many Term_scores
     * const term_score = await prisma.term_score.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Term_scores and only return the `id`
     * const term_scoreWithIdOnly = await prisma.term_score.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends term_scoreUpdateManyAndReturnArgs>(args: SelectSubset<T, term_scoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Term_score.
     * @param {term_scoreUpsertArgs} args - Arguments to update or create a Term_score.
     * @example
     * // Update or create a Term_score
     * const term_score = await prisma.term_score.upsert({
     *   create: {
     *     // ... data to create a Term_score
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Term_score we want to update
     *   }
     * })
     */
    upsert<T extends term_scoreUpsertArgs>(args: SelectSubset<T, term_scoreUpsertArgs<ExtArgs>>): Prisma__term_scoreClient<$Result.GetResult<Prisma.$term_scorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Term_scores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {term_scoreCountArgs} args - Arguments to filter Term_scores to count.
     * @example
     * // Count the number of Term_scores
     * const count = await prisma.term_score.count({
     *   where: {
     *     // ... the filter for the Term_scores we want to count
     *   }
     * })
    **/
    count<T extends term_scoreCountArgs>(
      args?: Subset<T, term_scoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Term_scoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Term_score.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Term_scoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Term_scoreAggregateArgs>(args: Subset<T, Term_scoreAggregateArgs>): Prisma.PrismaPromise<GetTerm_scoreAggregateType<T>>

    /**
     * Group by Term_score.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {term_scoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends term_scoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: term_scoreGroupByArgs['orderBy'] }
        : { orderBy?: term_scoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, term_scoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTerm_scoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the term_score model
   */
  readonly fields: term_scoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for term_score.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__term_scoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    papers<T extends papersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, papersDefaultArgs<ExtArgs>>): Prisma__papersClient<$Result.GetResult<Prisma.$papersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the term_score model
   */
  interface term_scoreFieldRefs {
    readonly id: FieldRef<"term_score", 'Int'>
    readonly term: FieldRef<"term_score", 'String'>
    readonly tf: FieldRef<"term_score", 'Float'>
    readonly tfidf: FieldRef<"term_score", 'Float'>
    readonly bm25: FieldRef<"term_score", 'Float'>
    readonly paper_id: FieldRef<"term_score", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * term_score findUnique
   */
  export type term_scoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    /**
     * Filter, which term_score to fetch.
     */
    where: term_scoreWhereUniqueInput
  }

  /**
   * term_score findUniqueOrThrow
   */
  export type term_scoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    /**
     * Filter, which term_score to fetch.
     */
    where: term_scoreWhereUniqueInput
  }

  /**
   * term_score findFirst
   */
  export type term_scoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    /**
     * Filter, which term_score to fetch.
     */
    where?: term_scoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of term_scores to fetch.
     */
    orderBy?: term_scoreOrderByWithRelationInput | term_scoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for term_scores.
     */
    cursor?: term_scoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` term_scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` term_scores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of term_scores.
     */
    distinct?: Term_scoreScalarFieldEnum | Term_scoreScalarFieldEnum[]
  }

  /**
   * term_score findFirstOrThrow
   */
  export type term_scoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    /**
     * Filter, which term_score to fetch.
     */
    where?: term_scoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of term_scores to fetch.
     */
    orderBy?: term_scoreOrderByWithRelationInput | term_scoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for term_scores.
     */
    cursor?: term_scoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` term_scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` term_scores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of term_scores.
     */
    distinct?: Term_scoreScalarFieldEnum | Term_scoreScalarFieldEnum[]
  }

  /**
   * term_score findMany
   */
  export type term_scoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    /**
     * Filter, which term_scores to fetch.
     */
    where?: term_scoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of term_scores to fetch.
     */
    orderBy?: term_scoreOrderByWithRelationInput | term_scoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing term_scores.
     */
    cursor?: term_scoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` term_scores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` term_scores.
     */
    skip?: number
    distinct?: Term_scoreScalarFieldEnum | Term_scoreScalarFieldEnum[]
  }

  /**
   * term_score create
   */
  export type term_scoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    /**
     * The data needed to create a term_score.
     */
    data: XOR<term_scoreCreateInput, term_scoreUncheckedCreateInput>
  }

  /**
   * term_score createMany
   */
  export type term_scoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many term_scores.
     */
    data: term_scoreCreateManyInput | term_scoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * term_score createManyAndReturn
   */
  export type term_scoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * The data used to create many term_scores.
     */
    data: term_scoreCreateManyInput | term_scoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * term_score update
   */
  export type term_scoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    /**
     * The data needed to update a term_score.
     */
    data: XOR<term_scoreUpdateInput, term_scoreUncheckedUpdateInput>
    /**
     * Choose, which term_score to update.
     */
    where: term_scoreWhereUniqueInput
  }

  /**
   * term_score updateMany
   */
  export type term_scoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update term_scores.
     */
    data: XOR<term_scoreUpdateManyMutationInput, term_scoreUncheckedUpdateManyInput>
    /**
     * Filter which term_scores to update
     */
    where?: term_scoreWhereInput
    /**
     * Limit how many term_scores to update.
     */
    limit?: number
  }

  /**
   * term_score updateManyAndReturn
   */
  export type term_scoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * The data used to update term_scores.
     */
    data: XOR<term_scoreUpdateManyMutationInput, term_scoreUncheckedUpdateManyInput>
    /**
     * Filter which term_scores to update
     */
    where?: term_scoreWhereInput
    /**
     * Limit how many term_scores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * term_score upsert
   */
  export type term_scoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    /**
     * The filter to search for the term_score to update in case it exists.
     */
    where: term_scoreWhereUniqueInput
    /**
     * In case the term_score found by the `where` argument doesn't exist, create a new term_score with this data.
     */
    create: XOR<term_scoreCreateInput, term_scoreUncheckedCreateInput>
    /**
     * In case the term_score was found with the provided `where` argument, update it with this data.
     */
    update: XOR<term_scoreUpdateInput, term_scoreUncheckedUpdateInput>
  }

  /**
   * term_score delete
   */
  export type term_scoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
    /**
     * Filter which term_score to delete.
     */
    where: term_scoreWhereUniqueInput
  }

  /**
   * term_score deleteMany
   */
  export type term_scoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which term_scores to delete
     */
    where?: term_scoreWhereInput
    /**
     * Limit how many term_scores to delete.
     */
    limit?: number
  }

  /**
   * term_score without action
   */
  export type term_scoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the term_score
     */
    select?: term_scoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the term_score
     */
    omit?: term_scoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: term_scoreInclude<ExtArgs> | null
  }


  /**
   * Model activity_logs
   */

  export type AggregateActivity_logs = {
    _count: Activity_logsCountAggregateOutputType | null
    _avg: Activity_logsAvgAggregateOutputType | null
    _sum: Activity_logsSumAggregateOutputType | null
    _min: Activity_logsMinAggregateOutputType | null
    _max: Activity_logsMaxAggregateOutputType | null
  }

  export type Activity_logsAvgAggregateOutputType = {
    act_id: number | null
    employee_id: number | null
    user_id: number | null
  }

  export type Activity_logsSumAggregateOutputType = {
    act_id: number | null
    employee_id: number | null
    user_id: number | null
  }

  export type Activity_logsMinAggregateOutputType = {
    act_id: number | null
    employee_id: number | null
    user_id: number | null
    name: string | null
    activity: string | null
    created_at: Date | null
    activity_type: $Enums.activity_type | null
    user_agent: string | null
    ip_address: string | null
    status: string | null
  }

  export type Activity_logsMaxAggregateOutputType = {
    act_id: number | null
    employee_id: number | null
    user_id: number | null
    name: string | null
    activity: string | null
    created_at: Date | null
    activity_type: $Enums.activity_type | null
    user_agent: string | null
    ip_address: string | null
    status: string | null
  }

  export type Activity_logsCountAggregateOutputType = {
    act_id: number
    employee_id: number
    user_id: number
    name: number
    activity: number
    created_at: number
    activity_type: number
    user_agent: number
    ip_address: number
    status: number
    _all: number
  }


  export type Activity_logsAvgAggregateInputType = {
    act_id?: true
    employee_id?: true
    user_id?: true
  }

  export type Activity_logsSumAggregateInputType = {
    act_id?: true
    employee_id?: true
    user_id?: true
  }

  export type Activity_logsMinAggregateInputType = {
    act_id?: true
    employee_id?: true
    user_id?: true
    name?: true
    activity?: true
    created_at?: true
    activity_type?: true
    user_agent?: true
    ip_address?: true
    status?: true
  }

  export type Activity_logsMaxAggregateInputType = {
    act_id?: true
    employee_id?: true
    user_id?: true
    name?: true
    activity?: true
    created_at?: true
    activity_type?: true
    user_agent?: true
    ip_address?: true
    status?: true
  }

  export type Activity_logsCountAggregateInputType = {
    act_id?: true
    employee_id?: true
    user_id?: true
    name?: true
    activity?: true
    created_at?: true
    activity_type?: true
    user_agent?: true
    ip_address?: true
    status?: true
    _all?: true
  }

  export type Activity_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which activity_logs to aggregate.
     */
    where?: activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activity_logs to fetch.
     */
    orderBy?: activity_logsOrderByWithRelationInput | activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned activity_logs
    **/
    _count?: true | Activity_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Activity_logsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Activity_logsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Activity_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Activity_logsMaxAggregateInputType
  }

  export type GetActivity_logsAggregateType<T extends Activity_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity_logs[P]>
      : GetScalarType<T[P], AggregateActivity_logs[P]>
  }




  export type activity_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: activity_logsWhereInput
    orderBy?: activity_logsOrderByWithAggregationInput | activity_logsOrderByWithAggregationInput[]
    by: Activity_logsScalarFieldEnum[] | Activity_logsScalarFieldEnum
    having?: activity_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Activity_logsCountAggregateInputType | true
    _avg?: Activity_logsAvgAggregateInputType
    _sum?: Activity_logsSumAggregateInputType
    _min?: Activity_logsMinAggregateInputType
    _max?: Activity_logsMaxAggregateInputType
  }

  export type Activity_logsGroupByOutputType = {
    act_id: number
    employee_id: number
    user_id: number
    name: string
    activity: string
    created_at: Date
    activity_type: $Enums.activity_type | null
    user_agent: string | null
    ip_address: string | null
    status: string | null
    _count: Activity_logsCountAggregateOutputType | null
    _avg: Activity_logsAvgAggregateOutputType | null
    _sum: Activity_logsSumAggregateOutputType | null
    _min: Activity_logsMinAggregateOutputType | null
    _max: Activity_logsMaxAggregateOutputType | null
  }

  type GetActivity_logsGroupByPayload<T extends activity_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Activity_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Activity_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Activity_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Activity_logsGroupByOutputType[P]>
        }
      >
    >


  export type activity_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    act_id?: boolean
    employee_id?: boolean
    user_id?: boolean
    name?: boolean
    activity?: boolean
    created_at?: boolean
    activity_type?: boolean
    user_agent?: boolean
    ip_address?: boolean
    status?: boolean
    librarian?: boolean | librarianDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity_logs"]>

  export type activity_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    act_id?: boolean
    employee_id?: boolean
    user_id?: boolean
    name?: boolean
    activity?: boolean
    created_at?: boolean
    activity_type?: boolean
    user_agent?: boolean
    ip_address?: boolean
    status?: boolean
    librarian?: boolean | librarianDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity_logs"]>

  export type activity_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    act_id?: boolean
    employee_id?: boolean
    user_id?: boolean
    name?: boolean
    activity?: boolean
    created_at?: boolean
    activity_type?: boolean
    user_agent?: boolean
    ip_address?: boolean
    status?: boolean
    librarian?: boolean | librarianDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity_logs"]>

  export type activity_logsSelectScalar = {
    act_id?: boolean
    employee_id?: boolean
    user_id?: boolean
    name?: boolean
    activity?: boolean
    created_at?: boolean
    activity_type?: boolean
    user_agent?: boolean
    ip_address?: boolean
    status?: boolean
  }

  export type activity_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"act_id" | "employee_id" | "user_id" | "name" | "activity" | "created_at" | "activity_type" | "user_agent" | "ip_address" | "status", ExtArgs["result"]["activity_logs"]>
  export type activity_logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    librarian?: boolean | librarianDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type activity_logsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    librarian?: boolean | librarianDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type activity_logsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    librarian?: boolean | librarianDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $activity_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "activity_logs"
    objects: {
      librarian: Prisma.$librarianPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      act_id: number
      employee_id: number
      user_id: number
      name: string
      activity: string
      created_at: Date
      activity_type: $Enums.activity_type | null
      user_agent: string | null
      ip_address: string | null
      status: string | null
    }, ExtArgs["result"]["activity_logs"]>
    composites: {}
  }

  type activity_logsGetPayload<S extends boolean | null | undefined | activity_logsDefaultArgs> = $Result.GetResult<Prisma.$activity_logsPayload, S>

  type activity_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<activity_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Activity_logsCountAggregateInputType | true
    }

  export interface activity_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['activity_logs'], meta: { name: 'activity_logs' } }
    /**
     * Find zero or one Activity_logs that matches the filter.
     * @param {activity_logsFindUniqueArgs} args - Arguments to find a Activity_logs
     * @example
     * // Get one Activity_logs
     * const activity_logs = await prisma.activity_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends activity_logsFindUniqueArgs>(args: SelectSubset<T, activity_logsFindUniqueArgs<ExtArgs>>): Prisma__activity_logsClient<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {activity_logsFindUniqueOrThrowArgs} args - Arguments to find a Activity_logs
     * @example
     * // Get one Activity_logs
     * const activity_logs = await prisma.activity_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends activity_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, activity_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__activity_logsClient<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logsFindFirstArgs} args - Arguments to find a Activity_logs
     * @example
     * // Get one Activity_logs
     * const activity_logs = await prisma.activity_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends activity_logsFindFirstArgs>(args?: SelectSubset<T, activity_logsFindFirstArgs<ExtArgs>>): Prisma__activity_logsClient<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logsFindFirstOrThrowArgs} args - Arguments to find a Activity_logs
     * @example
     * // Get one Activity_logs
     * const activity_logs = await prisma.activity_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends activity_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, activity_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__activity_logsClient<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activity_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activity_logs
     * const activity_logs = await prisma.activity_logs.findMany()
     * 
     * // Get first 10 Activity_logs
     * const activity_logs = await prisma.activity_logs.findMany({ take: 10 })
     * 
     * // Only select the `act_id`
     * const activity_logsWithAct_idOnly = await prisma.activity_logs.findMany({ select: { act_id: true } })
     * 
     */
    findMany<T extends activity_logsFindManyArgs>(args?: SelectSubset<T, activity_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity_logs.
     * @param {activity_logsCreateArgs} args - Arguments to create a Activity_logs.
     * @example
     * // Create one Activity_logs
     * const Activity_logs = await prisma.activity_logs.create({
     *   data: {
     *     // ... data to create a Activity_logs
     *   }
     * })
     * 
     */
    create<T extends activity_logsCreateArgs>(args: SelectSubset<T, activity_logsCreateArgs<ExtArgs>>): Prisma__activity_logsClient<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activity_logs.
     * @param {activity_logsCreateManyArgs} args - Arguments to create many Activity_logs.
     * @example
     * // Create many Activity_logs
     * const activity_logs = await prisma.activity_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends activity_logsCreateManyArgs>(args?: SelectSubset<T, activity_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activity_logs and returns the data saved in the database.
     * @param {activity_logsCreateManyAndReturnArgs} args - Arguments to create many Activity_logs.
     * @example
     * // Create many Activity_logs
     * const activity_logs = await prisma.activity_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activity_logs and only return the `act_id`
     * const activity_logsWithAct_idOnly = await prisma.activity_logs.createManyAndReturn({
     *   select: { act_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends activity_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, activity_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity_logs.
     * @param {activity_logsDeleteArgs} args - Arguments to delete one Activity_logs.
     * @example
     * // Delete one Activity_logs
     * const Activity_logs = await prisma.activity_logs.delete({
     *   where: {
     *     // ... filter to delete one Activity_logs
     *   }
     * })
     * 
     */
    delete<T extends activity_logsDeleteArgs>(args: SelectSubset<T, activity_logsDeleteArgs<ExtArgs>>): Prisma__activity_logsClient<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity_logs.
     * @param {activity_logsUpdateArgs} args - Arguments to update one Activity_logs.
     * @example
     * // Update one Activity_logs
     * const activity_logs = await prisma.activity_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends activity_logsUpdateArgs>(args: SelectSubset<T, activity_logsUpdateArgs<ExtArgs>>): Prisma__activity_logsClient<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activity_logs.
     * @param {activity_logsDeleteManyArgs} args - Arguments to filter Activity_logs to delete.
     * @example
     * // Delete a few Activity_logs
     * const { count } = await prisma.activity_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends activity_logsDeleteManyArgs>(args?: SelectSubset<T, activity_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activity_logs
     * const activity_logs = await prisma.activity_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends activity_logsUpdateManyArgs>(args: SelectSubset<T, activity_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activity_logs and returns the data updated in the database.
     * @param {activity_logsUpdateManyAndReturnArgs} args - Arguments to update many Activity_logs.
     * @example
     * // Update many Activity_logs
     * const activity_logs = await prisma.activity_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activity_logs and only return the `act_id`
     * const activity_logsWithAct_idOnly = await prisma.activity_logs.updateManyAndReturn({
     *   select: { act_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends activity_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, activity_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity_logs.
     * @param {activity_logsUpsertArgs} args - Arguments to update or create a Activity_logs.
     * @example
     * // Update or create a Activity_logs
     * const activity_logs = await prisma.activity_logs.upsert({
     *   create: {
     *     // ... data to create a Activity_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity_logs we want to update
     *   }
     * })
     */
    upsert<T extends activity_logsUpsertArgs>(args: SelectSubset<T, activity_logsUpsertArgs<ExtArgs>>): Prisma__activity_logsClient<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logsCountArgs} args - Arguments to filter Activity_logs to count.
     * @example
     * // Count the number of Activity_logs
     * const count = await prisma.activity_logs.count({
     *   where: {
     *     // ... the filter for the Activity_logs we want to count
     *   }
     * })
    **/
    count<T extends activity_logsCountArgs>(
      args?: Subset<T, activity_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Activity_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Activity_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Activity_logsAggregateArgs>(args: Subset<T, Activity_logsAggregateArgs>): Prisma.PrismaPromise<GetActivity_logsAggregateType<T>>

    /**
     * Group by Activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activity_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends activity_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: activity_logsGroupByArgs['orderBy'] }
        : { orderBy?: activity_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, activity_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivity_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the activity_logs model
   */
  readonly fields: activity_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for activity_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__activity_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    librarian<T extends librarianDefaultArgs<ExtArgs> = {}>(args?: Subset<T, librarianDefaultArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the activity_logs model
   */
  interface activity_logsFieldRefs {
    readonly act_id: FieldRef<"activity_logs", 'Int'>
    readonly employee_id: FieldRef<"activity_logs", 'Int'>
    readonly user_id: FieldRef<"activity_logs", 'Int'>
    readonly name: FieldRef<"activity_logs", 'String'>
    readonly activity: FieldRef<"activity_logs", 'String'>
    readonly created_at: FieldRef<"activity_logs", 'DateTime'>
    readonly activity_type: FieldRef<"activity_logs", 'activity_type'>
    readonly user_agent: FieldRef<"activity_logs", 'String'>
    readonly ip_address: FieldRef<"activity_logs", 'String'>
    readonly status: FieldRef<"activity_logs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * activity_logs findUnique
   */
  export type activity_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which activity_logs to fetch.
     */
    where: activity_logsWhereUniqueInput
  }

  /**
   * activity_logs findUniqueOrThrow
   */
  export type activity_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which activity_logs to fetch.
     */
    where: activity_logsWhereUniqueInput
  }

  /**
   * activity_logs findFirst
   */
  export type activity_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which activity_logs to fetch.
     */
    where?: activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activity_logs to fetch.
     */
    orderBy?: activity_logsOrderByWithRelationInput | activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for activity_logs.
     */
    cursor?: activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of activity_logs.
     */
    distinct?: Activity_logsScalarFieldEnum | Activity_logsScalarFieldEnum[]
  }

  /**
   * activity_logs findFirstOrThrow
   */
  export type activity_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which activity_logs to fetch.
     */
    where?: activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activity_logs to fetch.
     */
    orderBy?: activity_logsOrderByWithRelationInput | activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for activity_logs.
     */
    cursor?: activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of activity_logs.
     */
    distinct?: Activity_logsScalarFieldEnum | Activity_logsScalarFieldEnum[]
  }

  /**
   * activity_logs findMany
   */
  export type activity_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which activity_logs to fetch.
     */
    where?: activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activity_logs to fetch.
     */
    orderBy?: activity_logsOrderByWithRelationInput | activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing activity_logs.
     */
    cursor?: activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activity_logs.
     */
    skip?: number
    distinct?: Activity_logsScalarFieldEnum | Activity_logsScalarFieldEnum[]
  }

  /**
   * activity_logs create
   */
  export type activity_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    /**
     * The data needed to create a activity_logs.
     */
    data: XOR<activity_logsCreateInput, activity_logsUncheckedCreateInput>
  }

  /**
   * activity_logs createMany
   */
  export type activity_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many activity_logs.
     */
    data: activity_logsCreateManyInput | activity_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * activity_logs createManyAndReturn
   */
  export type activity_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * The data used to create many activity_logs.
     */
    data: activity_logsCreateManyInput | activity_logsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * activity_logs update
   */
  export type activity_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    /**
     * The data needed to update a activity_logs.
     */
    data: XOR<activity_logsUpdateInput, activity_logsUncheckedUpdateInput>
    /**
     * Choose, which activity_logs to update.
     */
    where: activity_logsWhereUniqueInput
  }

  /**
   * activity_logs updateMany
   */
  export type activity_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update activity_logs.
     */
    data: XOR<activity_logsUpdateManyMutationInput, activity_logsUncheckedUpdateManyInput>
    /**
     * Filter which activity_logs to update
     */
    where?: activity_logsWhereInput
    /**
     * Limit how many activity_logs to update.
     */
    limit?: number
  }

  /**
   * activity_logs updateManyAndReturn
   */
  export type activity_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * The data used to update activity_logs.
     */
    data: XOR<activity_logsUpdateManyMutationInput, activity_logsUncheckedUpdateManyInput>
    /**
     * Filter which activity_logs to update
     */
    where?: activity_logsWhereInput
    /**
     * Limit how many activity_logs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * activity_logs upsert
   */
  export type activity_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    /**
     * The filter to search for the activity_logs to update in case it exists.
     */
    where: activity_logsWhereUniqueInput
    /**
     * In case the activity_logs found by the `where` argument doesn't exist, create a new activity_logs with this data.
     */
    create: XOR<activity_logsCreateInput, activity_logsUncheckedCreateInput>
    /**
     * In case the activity_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<activity_logsUpdateInput, activity_logsUncheckedUpdateInput>
  }

  /**
   * activity_logs delete
   */
  export type activity_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
    /**
     * Filter which activity_logs to delete.
     */
    where: activity_logsWhereUniqueInput
  }

  /**
   * activity_logs deleteMany
   */
  export type activity_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which activity_logs to delete
     */
    where?: activity_logsWhereInput
    /**
     * Limit how many activity_logs to delete.
     */
    limit?: number
  }

  /**
   * activity_logs without action
   */
  export type activity_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity_logs
     */
    select?: activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the activity_logs
     */
    omit?: activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: activity_logsInclude<ExtArgs> | null
  }


  /**
   * Model global_stats
   */

  export type AggregateGlobal_stats = {
    _count: Global_statsCountAggregateOutputType | null
    _avg: Global_statsAvgAggregateOutputType | null
    _sum: Global_statsSumAggregateOutputType | null
    _min: Global_statsMinAggregateOutputType | null
    _max: Global_statsMaxAggregateOutputType | null
  }

  export type Global_statsAvgAggregateOutputType = {
    id: number | null
    total_docs: number | null
    avg_doc_length: number | null
  }

  export type Global_statsSumAggregateOutputType = {
    id: number | null
    total_docs: number | null
    avg_doc_length: number | null
  }

  export type Global_statsMinAggregateOutputType = {
    id: number | null
    total_docs: number | null
    avg_doc_length: number | null
    updated_at: Date | null
  }

  export type Global_statsMaxAggregateOutputType = {
    id: number | null
    total_docs: number | null
    avg_doc_length: number | null
    updated_at: Date | null
  }

  export type Global_statsCountAggregateOutputType = {
    id: number
    total_docs: number
    avg_doc_length: number
    updated_at: number
    _all: number
  }


  export type Global_statsAvgAggregateInputType = {
    id?: true
    total_docs?: true
    avg_doc_length?: true
  }

  export type Global_statsSumAggregateInputType = {
    id?: true
    total_docs?: true
    avg_doc_length?: true
  }

  export type Global_statsMinAggregateInputType = {
    id?: true
    total_docs?: true
    avg_doc_length?: true
    updated_at?: true
  }

  export type Global_statsMaxAggregateInputType = {
    id?: true
    total_docs?: true
    avg_doc_length?: true
    updated_at?: true
  }

  export type Global_statsCountAggregateInputType = {
    id?: true
    total_docs?: true
    avg_doc_length?: true
    updated_at?: true
    _all?: true
  }

  export type Global_statsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which global_stats to aggregate.
     */
    where?: global_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of global_stats to fetch.
     */
    orderBy?: global_statsOrderByWithRelationInput | global_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: global_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` global_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` global_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned global_stats
    **/
    _count?: true | Global_statsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Global_statsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Global_statsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Global_statsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Global_statsMaxAggregateInputType
  }

  export type GetGlobal_statsAggregateType<T extends Global_statsAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobal_stats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobal_stats[P]>
      : GetScalarType<T[P], AggregateGlobal_stats[P]>
  }




  export type global_statsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: global_statsWhereInput
    orderBy?: global_statsOrderByWithAggregationInput | global_statsOrderByWithAggregationInput[]
    by: Global_statsScalarFieldEnum[] | Global_statsScalarFieldEnum
    having?: global_statsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Global_statsCountAggregateInputType | true
    _avg?: Global_statsAvgAggregateInputType
    _sum?: Global_statsSumAggregateInputType
    _min?: Global_statsMinAggregateInputType
    _max?: Global_statsMaxAggregateInputType
  }

  export type Global_statsGroupByOutputType = {
    id: number
    total_docs: number
    avg_doc_length: number
    updated_at: Date
    _count: Global_statsCountAggregateOutputType | null
    _avg: Global_statsAvgAggregateOutputType | null
    _sum: Global_statsSumAggregateOutputType | null
    _min: Global_statsMinAggregateOutputType | null
    _max: Global_statsMaxAggregateOutputType | null
  }

  type GetGlobal_statsGroupByPayload<T extends global_statsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Global_statsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Global_statsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Global_statsGroupByOutputType[P]>
            : GetScalarType<T[P], Global_statsGroupByOutputType[P]>
        }
      >
    >


  export type global_statsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    total_docs?: boolean
    avg_doc_length?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["global_stats"]>

  export type global_statsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    total_docs?: boolean
    avg_doc_length?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["global_stats"]>

  export type global_statsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    total_docs?: boolean
    avg_doc_length?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["global_stats"]>

  export type global_statsSelectScalar = {
    id?: boolean
    total_docs?: boolean
    avg_doc_length?: boolean
    updated_at?: boolean
  }

  export type global_statsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "total_docs" | "avg_doc_length" | "updated_at", ExtArgs["result"]["global_stats"]>

  export type $global_statsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "global_stats"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      total_docs: number
      avg_doc_length: number
      updated_at: Date
    }, ExtArgs["result"]["global_stats"]>
    composites: {}
  }

  type global_statsGetPayload<S extends boolean | null | undefined | global_statsDefaultArgs> = $Result.GetResult<Prisma.$global_statsPayload, S>

  type global_statsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<global_statsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Global_statsCountAggregateInputType | true
    }

  export interface global_statsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['global_stats'], meta: { name: 'global_stats' } }
    /**
     * Find zero or one Global_stats that matches the filter.
     * @param {global_statsFindUniqueArgs} args - Arguments to find a Global_stats
     * @example
     * // Get one Global_stats
     * const global_stats = await prisma.global_stats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends global_statsFindUniqueArgs>(args: SelectSubset<T, global_statsFindUniqueArgs<ExtArgs>>): Prisma__global_statsClient<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Global_stats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {global_statsFindUniqueOrThrowArgs} args - Arguments to find a Global_stats
     * @example
     * // Get one Global_stats
     * const global_stats = await prisma.global_stats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends global_statsFindUniqueOrThrowArgs>(args: SelectSubset<T, global_statsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__global_statsClient<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Global_stats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {global_statsFindFirstArgs} args - Arguments to find a Global_stats
     * @example
     * // Get one Global_stats
     * const global_stats = await prisma.global_stats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends global_statsFindFirstArgs>(args?: SelectSubset<T, global_statsFindFirstArgs<ExtArgs>>): Prisma__global_statsClient<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Global_stats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {global_statsFindFirstOrThrowArgs} args - Arguments to find a Global_stats
     * @example
     * // Get one Global_stats
     * const global_stats = await prisma.global_stats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends global_statsFindFirstOrThrowArgs>(args?: SelectSubset<T, global_statsFindFirstOrThrowArgs<ExtArgs>>): Prisma__global_statsClient<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Global_stats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {global_statsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Global_stats
     * const global_stats = await prisma.global_stats.findMany()
     * 
     * // Get first 10 Global_stats
     * const global_stats = await prisma.global_stats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const global_statsWithIdOnly = await prisma.global_stats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends global_statsFindManyArgs>(args?: SelectSubset<T, global_statsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Global_stats.
     * @param {global_statsCreateArgs} args - Arguments to create a Global_stats.
     * @example
     * // Create one Global_stats
     * const Global_stats = await prisma.global_stats.create({
     *   data: {
     *     // ... data to create a Global_stats
     *   }
     * })
     * 
     */
    create<T extends global_statsCreateArgs>(args: SelectSubset<T, global_statsCreateArgs<ExtArgs>>): Prisma__global_statsClient<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Global_stats.
     * @param {global_statsCreateManyArgs} args - Arguments to create many Global_stats.
     * @example
     * // Create many Global_stats
     * const global_stats = await prisma.global_stats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends global_statsCreateManyArgs>(args?: SelectSubset<T, global_statsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Global_stats and returns the data saved in the database.
     * @param {global_statsCreateManyAndReturnArgs} args - Arguments to create many Global_stats.
     * @example
     * // Create many Global_stats
     * const global_stats = await prisma.global_stats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Global_stats and only return the `id`
     * const global_statsWithIdOnly = await prisma.global_stats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends global_statsCreateManyAndReturnArgs>(args?: SelectSubset<T, global_statsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Global_stats.
     * @param {global_statsDeleteArgs} args - Arguments to delete one Global_stats.
     * @example
     * // Delete one Global_stats
     * const Global_stats = await prisma.global_stats.delete({
     *   where: {
     *     // ... filter to delete one Global_stats
     *   }
     * })
     * 
     */
    delete<T extends global_statsDeleteArgs>(args: SelectSubset<T, global_statsDeleteArgs<ExtArgs>>): Prisma__global_statsClient<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Global_stats.
     * @param {global_statsUpdateArgs} args - Arguments to update one Global_stats.
     * @example
     * // Update one Global_stats
     * const global_stats = await prisma.global_stats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends global_statsUpdateArgs>(args: SelectSubset<T, global_statsUpdateArgs<ExtArgs>>): Prisma__global_statsClient<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Global_stats.
     * @param {global_statsDeleteManyArgs} args - Arguments to filter Global_stats to delete.
     * @example
     * // Delete a few Global_stats
     * const { count } = await prisma.global_stats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends global_statsDeleteManyArgs>(args?: SelectSubset<T, global_statsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Global_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {global_statsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Global_stats
     * const global_stats = await prisma.global_stats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends global_statsUpdateManyArgs>(args: SelectSubset<T, global_statsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Global_stats and returns the data updated in the database.
     * @param {global_statsUpdateManyAndReturnArgs} args - Arguments to update many Global_stats.
     * @example
     * // Update many Global_stats
     * const global_stats = await prisma.global_stats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Global_stats and only return the `id`
     * const global_statsWithIdOnly = await prisma.global_stats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends global_statsUpdateManyAndReturnArgs>(args: SelectSubset<T, global_statsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Global_stats.
     * @param {global_statsUpsertArgs} args - Arguments to update or create a Global_stats.
     * @example
     * // Update or create a Global_stats
     * const global_stats = await prisma.global_stats.upsert({
     *   create: {
     *     // ... data to create a Global_stats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Global_stats we want to update
     *   }
     * })
     */
    upsert<T extends global_statsUpsertArgs>(args: SelectSubset<T, global_statsUpsertArgs<ExtArgs>>): Prisma__global_statsClient<$Result.GetResult<Prisma.$global_statsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Global_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {global_statsCountArgs} args - Arguments to filter Global_stats to count.
     * @example
     * // Count the number of Global_stats
     * const count = await prisma.global_stats.count({
     *   where: {
     *     // ... the filter for the Global_stats we want to count
     *   }
     * })
    **/
    count<T extends global_statsCountArgs>(
      args?: Subset<T, global_statsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Global_statsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Global_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Global_statsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Global_statsAggregateArgs>(args: Subset<T, Global_statsAggregateArgs>): Prisma.PrismaPromise<GetGlobal_statsAggregateType<T>>

    /**
     * Group by Global_stats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {global_statsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends global_statsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: global_statsGroupByArgs['orderBy'] }
        : { orderBy?: global_statsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, global_statsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobal_statsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the global_stats model
   */
  readonly fields: global_statsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for global_stats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__global_statsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the global_stats model
   */
  interface global_statsFieldRefs {
    readonly id: FieldRef<"global_stats", 'Int'>
    readonly total_docs: FieldRef<"global_stats", 'Int'>
    readonly avg_doc_length: FieldRef<"global_stats", 'Float'>
    readonly updated_at: FieldRef<"global_stats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * global_stats findUnique
   */
  export type global_statsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * Filter, which global_stats to fetch.
     */
    where: global_statsWhereUniqueInput
  }

  /**
   * global_stats findUniqueOrThrow
   */
  export type global_statsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * Filter, which global_stats to fetch.
     */
    where: global_statsWhereUniqueInput
  }

  /**
   * global_stats findFirst
   */
  export type global_statsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * Filter, which global_stats to fetch.
     */
    where?: global_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of global_stats to fetch.
     */
    orderBy?: global_statsOrderByWithRelationInput | global_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for global_stats.
     */
    cursor?: global_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` global_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` global_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of global_stats.
     */
    distinct?: Global_statsScalarFieldEnum | Global_statsScalarFieldEnum[]
  }

  /**
   * global_stats findFirstOrThrow
   */
  export type global_statsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * Filter, which global_stats to fetch.
     */
    where?: global_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of global_stats to fetch.
     */
    orderBy?: global_statsOrderByWithRelationInput | global_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for global_stats.
     */
    cursor?: global_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` global_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` global_stats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of global_stats.
     */
    distinct?: Global_statsScalarFieldEnum | Global_statsScalarFieldEnum[]
  }

  /**
   * global_stats findMany
   */
  export type global_statsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * Filter, which global_stats to fetch.
     */
    where?: global_statsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of global_stats to fetch.
     */
    orderBy?: global_statsOrderByWithRelationInput | global_statsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing global_stats.
     */
    cursor?: global_statsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` global_stats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` global_stats.
     */
    skip?: number
    distinct?: Global_statsScalarFieldEnum | Global_statsScalarFieldEnum[]
  }

  /**
   * global_stats create
   */
  export type global_statsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * The data needed to create a global_stats.
     */
    data: XOR<global_statsCreateInput, global_statsUncheckedCreateInput>
  }

  /**
   * global_stats createMany
   */
  export type global_statsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many global_stats.
     */
    data: global_statsCreateManyInput | global_statsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * global_stats createManyAndReturn
   */
  export type global_statsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * The data used to create many global_stats.
     */
    data: global_statsCreateManyInput | global_statsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * global_stats update
   */
  export type global_statsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * The data needed to update a global_stats.
     */
    data: XOR<global_statsUpdateInput, global_statsUncheckedUpdateInput>
    /**
     * Choose, which global_stats to update.
     */
    where: global_statsWhereUniqueInput
  }

  /**
   * global_stats updateMany
   */
  export type global_statsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update global_stats.
     */
    data: XOR<global_statsUpdateManyMutationInput, global_statsUncheckedUpdateManyInput>
    /**
     * Filter which global_stats to update
     */
    where?: global_statsWhereInput
    /**
     * Limit how many global_stats to update.
     */
    limit?: number
  }

  /**
   * global_stats updateManyAndReturn
   */
  export type global_statsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * The data used to update global_stats.
     */
    data: XOR<global_statsUpdateManyMutationInput, global_statsUncheckedUpdateManyInput>
    /**
     * Filter which global_stats to update
     */
    where?: global_statsWhereInput
    /**
     * Limit how many global_stats to update.
     */
    limit?: number
  }

  /**
   * global_stats upsert
   */
  export type global_statsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * The filter to search for the global_stats to update in case it exists.
     */
    where: global_statsWhereUniqueInput
    /**
     * In case the global_stats found by the `where` argument doesn't exist, create a new global_stats with this data.
     */
    create: XOR<global_statsCreateInput, global_statsUncheckedCreateInput>
    /**
     * In case the global_stats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<global_statsUpdateInput, global_statsUncheckedUpdateInput>
  }

  /**
   * global_stats delete
   */
  export type global_statsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
    /**
     * Filter which global_stats to delete.
     */
    where: global_statsWhereUniqueInput
  }

  /**
   * global_stats deleteMany
   */
  export type global_statsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which global_stats to delete
     */
    where?: global_statsWhereInput
    /**
     * Limit how many global_stats to delete.
     */
    limit?: number
  }

  /**
   * global_stats without action
   */
  export type global_statsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the global_stats
     */
    select?: global_statsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the global_stats
     */
    omit?: global_statsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    user_id: 'user_id',
    first_name: 'first_name',
    mid_name: 'mid_name',
    last_name: 'last_name',
    ext_name: 'ext_name',
    email: 'email',
    profile_picture: 'profile_picture',
    role: 'role',
    password: 'password',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const FacultyScalarFieldEnum: {
    employee_id: 'employee_id',
    position: 'position',
    department: 'department',
    user_id: 'user_id'
  };

  export type FacultyScalarFieldEnum = (typeof FacultyScalarFieldEnum)[keyof typeof FacultyScalarFieldEnum]


  export const StudentsScalarFieldEnum: {
    student_num: 'student_num',
    program: 'program',
    college: 'college',
    year_level: 'year_level',
    user_id: 'user_id'
  };

  export type StudentsScalarFieldEnum = (typeof StudentsScalarFieldEnum)[keyof typeof StudentsScalarFieldEnum]


  export const LibrarianScalarFieldEnum: {
    employee_id: 'employee_id',
    position: 'position',
    contact_num: 'contact_num',
    user_id: 'user_id'
  };

  export type LibrarianScalarFieldEnum = (typeof LibrarianScalarFieldEnum)[keyof typeof LibrarianScalarFieldEnum]


  export const PapersScalarFieldEnum: {
    paper_id: 'paper_id',
    title: 'title',
    author: 'author',
    year: 'year',
    department: 'department',
    keywords: 'keywords',
    course: 'course',
    abstract: 'abstract',
    created_at: 'created_at',
    updated_at: 'updated_at',
    paper_url: 'paper_url'
  };

  export type PapersScalarFieldEnum = (typeof PapersScalarFieldEnum)[keyof typeof PapersScalarFieldEnum]


  export const Paper_metadataScalarFieldEnum: {
    metadata_id: 'metadata_id',
    paper_id: 'paper_id',
    type: 'type',
    format: 'format',
    language: 'language',
    source: 'source',
    rights: 'rights'
  };

  export type Paper_metadataScalarFieldEnum = (typeof Paper_metadataScalarFieldEnum)[keyof typeof Paper_metadataScalarFieldEnum]


  export const User_bookmarksScalarFieldEnum: {
    bookmark_id: 'bookmark_id',
    user_id: 'user_id',
    paper_id: 'paper_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type User_bookmarksScalarFieldEnum = (typeof User_bookmarksScalarFieldEnum)[keyof typeof User_bookmarksScalarFieldEnum]


  export const OtpScalarFieldEnum: {
    id: 'id',
    email: 'email',
    code: 'code',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type OtpScalarFieldEnum = (typeof OtpScalarFieldEnum)[keyof typeof OtpScalarFieldEnum]


  export const Paper_bm25_indexScalarFieldEnum: {
    index_id: 'index_id',
    paper_id: 'paper_id',
    token_frequencies: 'token_frequencies',
    document_length: 'document_length'
  };

  export type Paper_bm25_indexScalarFieldEnum = (typeof Paper_bm25_indexScalarFieldEnum)[keyof typeof Paper_bm25_indexScalarFieldEnum]


  export const Term_scoreScalarFieldEnum: {
    id: 'id',
    term: 'term',
    tf: 'tf',
    tfidf: 'tfidf',
    bm25: 'bm25',
    paper_id: 'paper_id'
  };

  export type Term_scoreScalarFieldEnum = (typeof Term_scoreScalarFieldEnum)[keyof typeof Term_scoreScalarFieldEnum]


  export const Activity_logsScalarFieldEnum: {
    act_id: 'act_id',
    employee_id: 'employee_id',
    user_id: 'user_id',
    name: 'name',
    activity: 'activity',
    created_at: 'created_at',
    activity_type: 'activity_type',
    user_agent: 'user_agent',
    ip_address: 'ip_address',
    status: 'status'
  };

  export type Activity_logsScalarFieldEnum = (typeof Activity_logsScalarFieldEnum)[keyof typeof Activity_logsScalarFieldEnum]


  export const Global_statsScalarFieldEnum: {
    id: 'id',
    total_docs: 'total_docs',
    avg_doc_length: 'avg_doc_length',
    updated_at: 'updated_at'
  };

  export type Global_statsScalarFieldEnum = (typeof Global_statsScalarFieldEnum)[keyof typeof Global_statsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'activity_type'
   */
  export type Enumactivity_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'activity_type'>
    


  /**
   * Reference to a field of type 'activity_type[]'
   */
  export type ListEnumactivity_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'activity_type[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    user_id?: IntFilter<"users"> | number
    first_name?: StringNullableFilter<"users"> | string | null
    mid_name?: StringNullableFilter<"users"> | string | null
    last_name?: StringNullableFilter<"users"> | string | null
    ext_name?: StringNullableFilter<"users"> | string | null
    email?: StringFilter<"users"> | string
    profile_picture?: StringNullableFilter<"users"> | string | null
    role?: StringNullableFilter<"users"> | string | null
    password?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    faculty?: XOR<FacultyNullableScalarRelationFilter, facultyWhereInput> | null
    students?: XOR<StudentsNullableScalarRelationFilter, studentsWhereInput> | null
    librarian?: XOR<LibrarianNullableScalarRelationFilter, librarianWhereInput> | null
    user_bookmarks?: User_bookmarksListRelationFilter
    activity_logs?: Activity_logsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    user_id?: SortOrder
    first_name?: SortOrderInput | SortOrder
    mid_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    ext_name?: SortOrderInput | SortOrder
    email?: SortOrder
    profile_picture?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    password?: SortOrder
    created_at?: SortOrderInput | SortOrder
    faculty?: facultyOrderByWithRelationInput
    students?: studentsOrderByWithRelationInput
    librarian?: librarianOrderByWithRelationInput
    user_bookmarks?: user_bookmarksOrderByRelationAggregateInput
    activity_logs?: activity_logsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    first_name?: StringNullableFilter<"users"> | string | null
    mid_name?: StringNullableFilter<"users"> | string | null
    last_name?: StringNullableFilter<"users"> | string | null
    ext_name?: StringNullableFilter<"users"> | string | null
    profile_picture?: StringNullableFilter<"users"> | string | null
    role?: StringNullableFilter<"users"> | string | null
    password?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    faculty?: XOR<FacultyNullableScalarRelationFilter, facultyWhereInput> | null
    students?: XOR<StudentsNullableScalarRelationFilter, studentsWhereInput> | null
    librarian?: XOR<LibrarianNullableScalarRelationFilter, librarianWhereInput> | null
    user_bookmarks?: User_bookmarksListRelationFilter
    activity_logs?: Activity_logsListRelationFilter
  }, "user_id" | "email">

  export type usersOrderByWithAggregationInput = {
    user_id?: SortOrder
    first_name?: SortOrderInput | SortOrder
    mid_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    ext_name?: SortOrderInput | SortOrder
    email?: SortOrder
    profile_picture?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    password?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"users"> | number
    first_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    mid_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    ext_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    email?: StringWithAggregatesFilter<"users"> | string
    profile_picture?: StringNullableWithAggregatesFilter<"users"> | string | null
    role?: StringNullableWithAggregatesFilter<"users"> | string | null
    password?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type facultyWhereInput = {
    AND?: facultyWhereInput | facultyWhereInput[]
    OR?: facultyWhereInput[]
    NOT?: facultyWhereInput | facultyWhereInput[]
    employee_id?: IntFilter<"faculty"> | number
    position?: StringNullableFilter<"faculty"> | string | null
    department?: StringNullableFilter<"faculty"> | string | null
    user_id?: IntFilter<"faculty"> | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type facultyOrderByWithRelationInput = {
    employee_id?: SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    user_id?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type facultyWhereUniqueInput = Prisma.AtLeast<{
    employee_id?: number
    user_id?: number
    AND?: facultyWhereInput | facultyWhereInput[]
    OR?: facultyWhereInput[]
    NOT?: facultyWhereInput | facultyWhereInput[]
    position?: StringNullableFilter<"faculty"> | string | null
    department?: StringNullableFilter<"faculty"> | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "employee_id" | "employee_id" | "user_id">

  export type facultyOrderByWithAggregationInput = {
    employee_id?: SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    user_id?: SortOrder
    _count?: facultyCountOrderByAggregateInput
    _avg?: facultyAvgOrderByAggregateInput
    _max?: facultyMaxOrderByAggregateInput
    _min?: facultyMinOrderByAggregateInput
    _sum?: facultySumOrderByAggregateInput
  }

  export type facultyScalarWhereWithAggregatesInput = {
    AND?: facultyScalarWhereWithAggregatesInput | facultyScalarWhereWithAggregatesInput[]
    OR?: facultyScalarWhereWithAggregatesInput[]
    NOT?: facultyScalarWhereWithAggregatesInput | facultyScalarWhereWithAggregatesInput[]
    employee_id?: IntWithAggregatesFilter<"faculty"> | number
    position?: StringNullableWithAggregatesFilter<"faculty"> | string | null
    department?: StringNullableWithAggregatesFilter<"faculty"> | string | null
    user_id?: IntWithAggregatesFilter<"faculty"> | number
  }

  export type studentsWhereInput = {
    AND?: studentsWhereInput | studentsWhereInput[]
    OR?: studentsWhereInput[]
    NOT?: studentsWhereInput | studentsWhereInput[]
    student_num?: BigIntFilter<"students"> | bigint | number
    program?: StringNullableFilter<"students"> | string | null
    college?: StringNullableFilter<"students"> | string | null
    year_level?: IntNullableFilter<"students"> | number | null
    user_id?: IntFilter<"students"> | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type studentsOrderByWithRelationInput = {
    student_num?: SortOrder
    program?: SortOrderInput | SortOrder
    college?: SortOrderInput | SortOrder
    year_level?: SortOrderInput | SortOrder
    user_id?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type studentsWhereUniqueInput = Prisma.AtLeast<{
    student_num?: bigint | number
    user_id?: number
    AND?: studentsWhereInput | studentsWhereInput[]
    OR?: studentsWhereInput[]
    NOT?: studentsWhereInput | studentsWhereInput[]
    program?: StringNullableFilter<"students"> | string | null
    college?: StringNullableFilter<"students"> | string | null
    year_level?: IntNullableFilter<"students"> | number | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "student_num" | "student_num" | "user_id">

  export type studentsOrderByWithAggregationInput = {
    student_num?: SortOrder
    program?: SortOrderInput | SortOrder
    college?: SortOrderInput | SortOrder
    year_level?: SortOrderInput | SortOrder
    user_id?: SortOrder
    _count?: studentsCountOrderByAggregateInput
    _avg?: studentsAvgOrderByAggregateInput
    _max?: studentsMaxOrderByAggregateInput
    _min?: studentsMinOrderByAggregateInput
    _sum?: studentsSumOrderByAggregateInput
  }

  export type studentsScalarWhereWithAggregatesInput = {
    AND?: studentsScalarWhereWithAggregatesInput | studentsScalarWhereWithAggregatesInput[]
    OR?: studentsScalarWhereWithAggregatesInput[]
    NOT?: studentsScalarWhereWithAggregatesInput | studentsScalarWhereWithAggregatesInput[]
    student_num?: BigIntWithAggregatesFilter<"students"> | bigint | number
    program?: StringNullableWithAggregatesFilter<"students"> | string | null
    college?: StringNullableWithAggregatesFilter<"students"> | string | null
    year_level?: IntNullableWithAggregatesFilter<"students"> | number | null
    user_id?: IntWithAggregatesFilter<"students"> | number
  }

  export type librarianWhereInput = {
    AND?: librarianWhereInput | librarianWhereInput[]
    OR?: librarianWhereInput[]
    NOT?: librarianWhereInput | librarianWhereInput[]
    employee_id?: IntFilter<"librarian"> | number
    position?: StringNullableFilter<"librarian"> | string | null
    contact_num?: IntFilter<"librarian"> | number
    user_id?: IntFilter<"librarian"> | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    activity_logs?: Activity_logsListRelationFilter
  }

  export type librarianOrderByWithRelationInput = {
    employee_id?: SortOrder
    position?: SortOrderInput | SortOrder
    contact_num?: SortOrder
    user_id?: SortOrder
    users?: usersOrderByWithRelationInput
    activity_logs?: activity_logsOrderByRelationAggregateInput
  }

  export type librarianWhereUniqueInput = Prisma.AtLeast<{
    employee_id?: number
    user_id?: number
    AND?: librarianWhereInput | librarianWhereInput[]
    OR?: librarianWhereInput[]
    NOT?: librarianWhereInput | librarianWhereInput[]
    position?: StringNullableFilter<"librarian"> | string | null
    contact_num?: IntFilter<"librarian"> | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    activity_logs?: Activity_logsListRelationFilter
  }, "employee_id" | "employee_id" | "user_id">

  export type librarianOrderByWithAggregationInput = {
    employee_id?: SortOrder
    position?: SortOrderInput | SortOrder
    contact_num?: SortOrder
    user_id?: SortOrder
    _count?: librarianCountOrderByAggregateInput
    _avg?: librarianAvgOrderByAggregateInput
    _max?: librarianMaxOrderByAggregateInput
    _min?: librarianMinOrderByAggregateInput
    _sum?: librarianSumOrderByAggregateInput
  }

  export type librarianScalarWhereWithAggregatesInput = {
    AND?: librarianScalarWhereWithAggregatesInput | librarianScalarWhereWithAggregatesInput[]
    OR?: librarianScalarWhereWithAggregatesInput[]
    NOT?: librarianScalarWhereWithAggregatesInput | librarianScalarWhereWithAggregatesInput[]
    employee_id?: IntWithAggregatesFilter<"librarian"> | number
    position?: StringNullableWithAggregatesFilter<"librarian"> | string | null
    contact_num?: IntWithAggregatesFilter<"librarian"> | number
    user_id?: IntWithAggregatesFilter<"librarian"> | number
  }

  export type papersWhereInput = {
    AND?: papersWhereInput | papersWhereInput[]
    OR?: papersWhereInput[]
    NOT?: papersWhereInput | papersWhereInput[]
    paper_id?: IntFilter<"papers"> | number
    title?: StringNullableFilter<"papers"> | string | null
    author?: StringNullableFilter<"papers"> | string | null
    year?: IntNullableFilter<"papers"> | number | null
    department?: StringNullableFilter<"papers"> | string | null
    keywords?: StringNullableListFilter<"papers">
    course?: StringNullableFilter<"papers"> | string | null
    abstract?: StringNullableFilter<"papers"> | string | null
    created_at?: DateTimeNullableFilter<"papers"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"papers"> | Date | string | null
    paper_url?: StringNullableFilter<"papers"> | string | null
    paper_metadata?: Paper_metadataListRelationFilter
    user_bookmarks?: User_bookmarksListRelationFilter
    paper_bm25_index?: Paper_bm25_indexListRelationFilter
    term_score?: Term_scoreListRelationFilter
  }

  export type papersOrderByWithRelationInput = {
    paper_id?: SortOrder
    title?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    keywords?: SortOrder
    course?: SortOrderInput | SortOrder
    abstract?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    paper_url?: SortOrderInput | SortOrder
    paper_metadata?: paper_metadataOrderByRelationAggregateInput
    user_bookmarks?: user_bookmarksOrderByRelationAggregateInput
    paper_bm25_index?: paper_bm25_indexOrderByRelationAggregateInput
    term_score?: term_scoreOrderByRelationAggregateInput
  }

  export type papersWhereUniqueInput = Prisma.AtLeast<{
    paper_id?: number
    title?: string
    AND?: papersWhereInput | papersWhereInput[]
    OR?: papersWhereInput[]
    NOT?: papersWhereInput | papersWhereInput[]
    author?: StringNullableFilter<"papers"> | string | null
    year?: IntNullableFilter<"papers"> | number | null
    department?: StringNullableFilter<"papers"> | string | null
    keywords?: StringNullableListFilter<"papers">
    course?: StringNullableFilter<"papers"> | string | null
    abstract?: StringNullableFilter<"papers"> | string | null
    created_at?: DateTimeNullableFilter<"papers"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"papers"> | Date | string | null
    paper_url?: StringNullableFilter<"papers"> | string | null
    paper_metadata?: Paper_metadataListRelationFilter
    user_bookmarks?: User_bookmarksListRelationFilter
    paper_bm25_index?: Paper_bm25_indexListRelationFilter
    term_score?: Term_scoreListRelationFilter
  }, "paper_id" | "title">

  export type papersOrderByWithAggregationInput = {
    paper_id?: SortOrder
    title?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    keywords?: SortOrder
    course?: SortOrderInput | SortOrder
    abstract?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    paper_url?: SortOrderInput | SortOrder
    _count?: papersCountOrderByAggregateInput
    _avg?: papersAvgOrderByAggregateInput
    _max?: papersMaxOrderByAggregateInput
    _min?: papersMinOrderByAggregateInput
    _sum?: papersSumOrderByAggregateInput
  }

  export type papersScalarWhereWithAggregatesInput = {
    AND?: papersScalarWhereWithAggregatesInput | papersScalarWhereWithAggregatesInput[]
    OR?: papersScalarWhereWithAggregatesInput[]
    NOT?: papersScalarWhereWithAggregatesInput | papersScalarWhereWithAggregatesInput[]
    paper_id?: IntWithAggregatesFilter<"papers"> | number
    title?: StringNullableWithAggregatesFilter<"papers"> | string | null
    author?: StringNullableWithAggregatesFilter<"papers"> | string | null
    year?: IntNullableWithAggregatesFilter<"papers"> | number | null
    department?: StringNullableWithAggregatesFilter<"papers"> | string | null
    keywords?: StringNullableListFilter<"papers">
    course?: StringNullableWithAggregatesFilter<"papers"> | string | null
    abstract?: StringNullableWithAggregatesFilter<"papers"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"papers"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"papers"> | Date | string | null
    paper_url?: StringNullableWithAggregatesFilter<"papers"> | string | null
  }

  export type paper_metadataWhereInput = {
    AND?: paper_metadataWhereInput | paper_metadataWhereInput[]
    OR?: paper_metadataWhereInput[]
    NOT?: paper_metadataWhereInput | paper_metadataWhereInput[]
    metadata_id?: IntFilter<"paper_metadata"> | number
    paper_id?: IntFilter<"paper_metadata"> | number
    type?: StringNullableFilter<"paper_metadata"> | string | null
    format?: StringNullableFilter<"paper_metadata"> | string | null
    language?: StringNullableFilter<"paper_metadata"> | string | null
    source?: StringNullableFilter<"paper_metadata"> | string | null
    rights?: StringNullableFilter<"paper_metadata"> | string | null
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
  }

  export type paper_metadataOrderByWithRelationInput = {
    metadata_id?: SortOrder
    paper_id?: SortOrder
    type?: SortOrderInput | SortOrder
    format?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    rights?: SortOrderInput | SortOrder
    papers?: papersOrderByWithRelationInput
  }

  export type paper_metadataWhereUniqueInput = Prisma.AtLeast<{
    metadata_id?: number
    AND?: paper_metadataWhereInput | paper_metadataWhereInput[]
    OR?: paper_metadataWhereInput[]
    NOT?: paper_metadataWhereInput | paper_metadataWhereInput[]
    paper_id?: IntFilter<"paper_metadata"> | number
    type?: StringNullableFilter<"paper_metadata"> | string | null
    format?: StringNullableFilter<"paper_metadata"> | string | null
    language?: StringNullableFilter<"paper_metadata"> | string | null
    source?: StringNullableFilter<"paper_metadata"> | string | null
    rights?: StringNullableFilter<"paper_metadata"> | string | null
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
  }, "metadata_id">

  export type paper_metadataOrderByWithAggregationInput = {
    metadata_id?: SortOrder
    paper_id?: SortOrder
    type?: SortOrderInput | SortOrder
    format?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    rights?: SortOrderInput | SortOrder
    _count?: paper_metadataCountOrderByAggregateInput
    _avg?: paper_metadataAvgOrderByAggregateInput
    _max?: paper_metadataMaxOrderByAggregateInput
    _min?: paper_metadataMinOrderByAggregateInput
    _sum?: paper_metadataSumOrderByAggregateInput
  }

  export type paper_metadataScalarWhereWithAggregatesInput = {
    AND?: paper_metadataScalarWhereWithAggregatesInput | paper_metadataScalarWhereWithAggregatesInput[]
    OR?: paper_metadataScalarWhereWithAggregatesInput[]
    NOT?: paper_metadataScalarWhereWithAggregatesInput | paper_metadataScalarWhereWithAggregatesInput[]
    metadata_id?: IntWithAggregatesFilter<"paper_metadata"> | number
    paper_id?: IntWithAggregatesFilter<"paper_metadata"> | number
    type?: StringNullableWithAggregatesFilter<"paper_metadata"> | string | null
    format?: StringNullableWithAggregatesFilter<"paper_metadata"> | string | null
    language?: StringNullableWithAggregatesFilter<"paper_metadata"> | string | null
    source?: StringNullableWithAggregatesFilter<"paper_metadata"> | string | null
    rights?: StringNullableWithAggregatesFilter<"paper_metadata"> | string | null
  }

  export type user_bookmarksWhereInput = {
    AND?: user_bookmarksWhereInput | user_bookmarksWhereInput[]
    OR?: user_bookmarksWhereInput[]
    NOT?: user_bookmarksWhereInput | user_bookmarksWhereInput[]
    bookmark_id?: IntFilter<"user_bookmarks"> | number
    user_id?: IntFilter<"user_bookmarks"> | number
    paper_id?: IntFilter<"user_bookmarks"> | number
    created_at?: DateTimeNullableFilter<"user_bookmarks"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"user_bookmarks"> | Date | string | null
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type user_bookmarksOrderByWithRelationInput = {
    bookmark_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    papers?: papersOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type user_bookmarksWhereUniqueInput = Prisma.AtLeast<{
    bookmark_id?: number
    user_id_paper_id?: user_bookmarksUser_idPaper_idCompoundUniqueInput
    AND?: user_bookmarksWhereInput | user_bookmarksWhereInput[]
    OR?: user_bookmarksWhereInput[]
    NOT?: user_bookmarksWhereInput | user_bookmarksWhereInput[]
    user_id?: IntFilter<"user_bookmarks"> | number
    paper_id?: IntFilter<"user_bookmarks"> | number
    created_at?: DateTimeNullableFilter<"user_bookmarks"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"user_bookmarks"> | Date | string | null
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "bookmark_id" | "user_id_paper_id">

  export type user_bookmarksOrderByWithAggregationInput = {
    bookmark_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: user_bookmarksCountOrderByAggregateInput
    _avg?: user_bookmarksAvgOrderByAggregateInput
    _max?: user_bookmarksMaxOrderByAggregateInput
    _min?: user_bookmarksMinOrderByAggregateInput
    _sum?: user_bookmarksSumOrderByAggregateInput
  }

  export type user_bookmarksScalarWhereWithAggregatesInput = {
    AND?: user_bookmarksScalarWhereWithAggregatesInput | user_bookmarksScalarWhereWithAggregatesInput[]
    OR?: user_bookmarksScalarWhereWithAggregatesInput[]
    NOT?: user_bookmarksScalarWhereWithAggregatesInput | user_bookmarksScalarWhereWithAggregatesInput[]
    bookmark_id?: IntWithAggregatesFilter<"user_bookmarks"> | number
    user_id?: IntWithAggregatesFilter<"user_bookmarks"> | number
    paper_id?: IntWithAggregatesFilter<"user_bookmarks"> | number
    created_at?: DateTimeNullableWithAggregatesFilter<"user_bookmarks"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"user_bookmarks"> | Date | string | null
  }

  export type OtpWhereInput = {
    AND?: OtpWhereInput | OtpWhereInput[]
    OR?: OtpWhereInput[]
    NOT?: OtpWhereInput | OtpWhereInput[]
    id?: StringFilter<"Otp"> | string
    email?: StringFilter<"Otp"> | string
    code?: StringFilter<"Otp"> | string
    createdAt?: DateTimeFilter<"Otp"> | Date | string
    expiresAt?: DateTimeFilter<"Otp"> | Date | string
  }

  export type OtpOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type OtpWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: OtpWhereInput | OtpWhereInput[]
    OR?: OtpWhereInput[]
    NOT?: OtpWhereInput | OtpWhereInput[]
    code?: StringFilter<"Otp"> | string
    createdAt?: DateTimeFilter<"Otp"> | Date | string
    expiresAt?: DateTimeFilter<"Otp"> | Date | string
  }, "id" | "email">

  export type OtpOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: OtpCountOrderByAggregateInput
    _max?: OtpMaxOrderByAggregateInput
    _min?: OtpMinOrderByAggregateInput
  }

  export type OtpScalarWhereWithAggregatesInput = {
    AND?: OtpScalarWhereWithAggregatesInput | OtpScalarWhereWithAggregatesInput[]
    OR?: OtpScalarWhereWithAggregatesInput[]
    NOT?: OtpScalarWhereWithAggregatesInput | OtpScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Otp"> | string
    email?: StringWithAggregatesFilter<"Otp"> | string
    code?: StringWithAggregatesFilter<"Otp"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Otp"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Otp"> | Date | string
  }

  export type paper_bm25_indexWhereInput = {
    AND?: paper_bm25_indexWhereInput | paper_bm25_indexWhereInput[]
    OR?: paper_bm25_indexWhereInput[]
    NOT?: paper_bm25_indexWhereInput | paper_bm25_indexWhereInput[]
    index_id?: IntFilter<"paper_bm25_index"> | number
    paper_id?: IntFilter<"paper_bm25_index"> | number
    token_frequencies?: JsonFilter<"paper_bm25_index">
    document_length?: IntFilter<"paper_bm25_index"> | number
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
  }

  export type paper_bm25_indexOrderByWithRelationInput = {
    index_id?: SortOrder
    paper_id?: SortOrder
    token_frequencies?: SortOrder
    document_length?: SortOrder
    papers?: papersOrderByWithRelationInput
  }

  export type paper_bm25_indexWhereUniqueInput = Prisma.AtLeast<{
    index_id?: number
    AND?: paper_bm25_indexWhereInput | paper_bm25_indexWhereInput[]
    OR?: paper_bm25_indexWhereInput[]
    NOT?: paper_bm25_indexWhereInput | paper_bm25_indexWhereInput[]
    paper_id?: IntFilter<"paper_bm25_index"> | number
    token_frequencies?: JsonFilter<"paper_bm25_index">
    document_length?: IntFilter<"paper_bm25_index"> | number
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
  }, "index_id">

  export type paper_bm25_indexOrderByWithAggregationInput = {
    index_id?: SortOrder
    paper_id?: SortOrder
    token_frequencies?: SortOrder
    document_length?: SortOrder
    _count?: paper_bm25_indexCountOrderByAggregateInput
    _avg?: paper_bm25_indexAvgOrderByAggregateInput
    _max?: paper_bm25_indexMaxOrderByAggregateInput
    _min?: paper_bm25_indexMinOrderByAggregateInput
    _sum?: paper_bm25_indexSumOrderByAggregateInput
  }

  export type paper_bm25_indexScalarWhereWithAggregatesInput = {
    AND?: paper_bm25_indexScalarWhereWithAggregatesInput | paper_bm25_indexScalarWhereWithAggregatesInput[]
    OR?: paper_bm25_indexScalarWhereWithAggregatesInput[]
    NOT?: paper_bm25_indexScalarWhereWithAggregatesInput | paper_bm25_indexScalarWhereWithAggregatesInput[]
    index_id?: IntWithAggregatesFilter<"paper_bm25_index"> | number
    paper_id?: IntWithAggregatesFilter<"paper_bm25_index"> | number
    token_frequencies?: JsonWithAggregatesFilter<"paper_bm25_index">
    document_length?: IntWithAggregatesFilter<"paper_bm25_index"> | number
  }

  export type term_scoreWhereInput = {
    AND?: term_scoreWhereInput | term_scoreWhereInput[]
    OR?: term_scoreWhereInput[]
    NOT?: term_scoreWhereInput | term_scoreWhereInput[]
    id?: IntFilter<"term_score"> | number
    term?: StringFilter<"term_score"> | string
    tf?: FloatFilter<"term_score"> | number
    tfidf?: FloatFilter<"term_score"> | number
    bm25?: FloatFilter<"term_score"> | number
    paper_id?: IntFilter<"term_score"> | number
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
  }

  export type term_scoreOrderByWithRelationInput = {
    id?: SortOrder
    term?: SortOrder
    tf?: SortOrder
    tfidf?: SortOrder
    bm25?: SortOrder
    paper_id?: SortOrder
    papers?: papersOrderByWithRelationInput
  }

  export type term_scoreWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: term_scoreWhereInput | term_scoreWhereInput[]
    OR?: term_scoreWhereInput[]
    NOT?: term_scoreWhereInput | term_scoreWhereInput[]
    term?: StringFilter<"term_score"> | string
    tf?: FloatFilter<"term_score"> | number
    tfidf?: FloatFilter<"term_score"> | number
    bm25?: FloatFilter<"term_score"> | number
    paper_id?: IntFilter<"term_score"> | number
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
  }, "id">

  export type term_scoreOrderByWithAggregationInput = {
    id?: SortOrder
    term?: SortOrder
    tf?: SortOrder
    tfidf?: SortOrder
    bm25?: SortOrder
    paper_id?: SortOrder
    _count?: term_scoreCountOrderByAggregateInput
    _avg?: term_scoreAvgOrderByAggregateInput
    _max?: term_scoreMaxOrderByAggregateInput
    _min?: term_scoreMinOrderByAggregateInput
    _sum?: term_scoreSumOrderByAggregateInput
  }

  export type term_scoreScalarWhereWithAggregatesInput = {
    AND?: term_scoreScalarWhereWithAggregatesInput | term_scoreScalarWhereWithAggregatesInput[]
    OR?: term_scoreScalarWhereWithAggregatesInput[]
    NOT?: term_scoreScalarWhereWithAggregatesInput | term_scoreScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"term_score"> | number
    term?: StringWithAggregatesFilter<"term_score"> | string
    tf?: FloatWithAggregatesFilter<"term_score"> | number
    tfidf?: FloatWithAggregatesFilter<"term_score"> | number
    bm25?: FloatWithAggregatesFilter<"term_score"> | number
    paper_id?: IntWithAggregatesFilter<"term_score"> | number
  }

  export type activity_logsWhereInput = {
    AND?: activity_logsWhereInput | activity_logsWhereInput[]
    OR?: activity_logsWhereInput[]
    NOT?: activity_logsWhereInput | activity_logsWhereInput[]
    act_id?: IntFilter<"activity_logs"> | number
    employee_id?: IntFilter<"activity_logs"> | number
    user_id?: IntFilter<"activity_logs"> | number
    name?: StringFilter<"activity_logs"> | string
    activity?: StringFilter<"activity_logs"> | string
    created_at?: DateTimeFilter<"activity_logs"> | Date | string
    activity_type?: Enumactivity_typeNullableFilter<"activity_logs"> | $Enums.activity_type | null
    user_agent?: StringNullableFilter<"activity_logs"> | string | null
    ip_address?: StringNullableFilter<"activity_logs"> | string | null
    status?: StringNullableFilter<"activity_logs"> | string | null
    librarian?: XOR<LibrarianScalarRelationFilter, librarianWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type activity_logsOrderByWithRelationInput = {
    act_id?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    activity_type?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    librarian?: librarianOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type activity_logsWhereUniqueInput = Prisma.AtLeast<{
    act_id?: number
    AND?: activity_logsWhereInput | activity_logsWhereInput[]
    OR?: activity_logsWhereInput[]
    NOT?: activity_logsWhereInput | activity_logsWhereInput[]
    employee_id?: IntFilter<"activity_logs"> | number
    user_id?: IntFilter<"activity_logs"> | number
    name?: StringFilter<"activity_logs"> | string
    activity?: StringFilter<"activity_logs"> | string
    created_at?: DateTimeFilter<"activity_logs"> | Date | string
    activity_type?: Enumactivity_typeNullableFilter<"activity_logs"> | $Enums.activity_type | null
    user_agent?: StringNullableFilter<"activity_logs"> | string | null
    ip_address?: StringNullableFilter<"activity_logs"> | string | null
    status?: StringNullableFilter<"activity_logs"> | string | null
    librarian?: XOR<LibrarianScalarRelationFilter, librarianWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "act_id">

  export type activity_logsOrderByWithAggregationInput = {
    act_id?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    activity_type?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: activity_logsCountOrderByAggregateInput
    _avg?: activity_logsAvgOrderByAggregateInput
    _max?: activity_logsMaxOrderByAggregateInput
    _min?: activity_logsMinOrderByAggregateInput
    _sum?: activity_logsSumOrderByAggregateInput
  }

  export type activity_logsScalarWhereWithAggregatesInput = {
    AND?: activity_logsScalarWhereWithAggregatesInput | activity_logsScalarWhereWithAggregatesInput[]
    OR?: activity_logsScalarWhereWithAggregatesInput[]
    NOT?: activity_logsScalarWhereWithAggregatesInput | activity_logsScalarWhereWithAggregatesInput[]
    act_id?: IntWithAggregatesFilter<"activity_logs"> | number
    employee_id?: IntWithAggregatesFilter<"activity_logs"> | number
    user_id?: IntWithAggregatesFilter<"activity_logs"> | number
    name?: StringWithAggregatesFilter<"activity_logs"> | string
    activity?: StringWithAggregatesFilter<"activity_logs"> | string
    created_at?: DateTimeWithAggregatesFilter<"activity_logs"> | Date | string
    activity_type?: Enumactivity_typeNullableWithAggregatesFilter<"activity_logs"> | $Enums.activity_type | null
    user_agent?: StringNullableWithAggregatesFilter<"activity_logs"> | string | null
    ip_address?: StringNullableWithAggregatesFilter<"activity_logs"> | string | null
    status?: StringNullableWithAggregatesFilter<"activity_logs"> | string | null
  }

  export type global_statsWhereInput = {
    AND?: global_statsWhereInput | global_statsWhereInput[]
    OR?: global_statsWhereInput[]
    NOT?: global_statsWhereInput | global_statsWhereInput[]
    id?: IntFilter<"global_stats"> | number
    total_docs?: IntFilter<"global_stats"> | number
    avg_doc_length?: FloatFilter<"global_stats"> | number
    updated_at?: DateTimeFilter<"global_stats"> | Date | string
  }

  export type global_statsOrderByWithRelationInput = {
    id?: SortOrder
    total_docs?: SortOrder
    avg_doc_length?: SortOrder
    updated_at?: SortOrder
  }

  export type global_statsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: global_statsWhereInput | global_statsWhereInput[]
    OR?: global_statsWhereInput[]
    NOT?: global_statsWhereInput | global_statsWhereInput[]
    total_docs?: IntFilter<"global_stats"> | number
    avg_doc_length?: FloatFilter<"global_stats"> | number
    updated_at?: DateTimeFilter<"global_stats"> | Date | string
  }, "id">

  export type global_statsOrderByWithAggregationInput = {
    id?: SortOrder
    total_docs?: SortOrder
    avg_doc_length?: SortOrder
    updated_at?: SortOrder
    _count?: global_statsCountOrderByAggregateInput
    _avg?: global_statsAvgOrderByAggregateInput
    _max?: global_statsMaxOrderByAggregateInput
    _min?: global_statsMinOrderByAggregateInput
    _sum?: global_statsSumOrderByAggregateInput
  }

  export type global_statsScalarWhereWithAggregatesInput = {
    AND?: global_statsScalarWhereWithAggregatesInput | global_statsScalarWhereWithAggregatesInput[]
    OR?: global_statsScalarWhereWithAggregatesInput[]
    NOT?: global_statsScalarWhereWithAggregatesInput | global_statsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"global_stats"> | number
    total_docs?: IntWithAggregatesFilter<"global_stats"> | number
    avg_doc_length?: FloatWithAggregatesFilter<"global_stats"> | number
    updated_at?: DateTimeWithAggregatesFilter<"global_stats"> | Date | string
  }

  export type usersCreateInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type facultyCreateInput = {
    employee_id: number
    position?: string | null
    department?: string | null
    users: usersCreateNestedOneWithoutFacultyInput
  }

  export type facultyUncheckedCreateInput = {
    employee_id: number
    position?: string | null
    department?: string | null
    user_id: number
  }

  export type facultyUpdateInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneRequiredWithoutFacultyNestedInput
  }

  export type facultyUncheckedUpdateInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type facultyCreateManyInput = {
    employee_id: number
    position?: string | null
    department?: string | null
    user_id: number
  }

  export type facultyUpdateManyMutationInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type facultyUncheckedUpdateManyInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type studentsCreateInput = {
    student_num: bigint | number
    program?: string | null
    college?: string | null
    year_level?: number | null
    users: usersCreateNestedOneWithoutStudentsInput
  }

  export type studentsUncheckedCreateInput = {
    student_num: bigint | number
    program?: string | null
    college?: string | null
    year_level?: number | null
    user_id: number
  }

  export type studentsUpdateInput = {
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
    program?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    year_level?: NullableIntFieldUpdateOperationsInput | number | null
    users?: usersUpdateOneRequiredWithoutStudentsNestedInput
  }

  export type studentsUncheckedUpdateInput = {
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
    program?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    year_level?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type studentsCreateManyInput = {
    student_num: bigint | number
    program?: string | null
    college?: string | null
    year_level?: number | null
    user_id: number
  }

  export type studentsUpdateManyMutationInput = {
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
    program?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    year_level?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type studentsUncheckedUpdateManyInput = {
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
    program?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    year_level?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type librarianCreateInput = {
    employee_id: number
    position?: string | null
    contact_num: number
    users: usersCreateNestedOneWithoutLibrarianInput
    activity_logs?: activity_logsCreateNestedManyWithoutLibrarianInput
  }

  export type librarianUncheckedCreateInput = {
    employee_id: number
    position?: string | null
    contact_num: number
    user_id: number
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutLibrarianInput
  }

  export type librarianUpdateInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    users?: usersUpdateOneRequiredWithoutLibrarianNestedInput
    activity_logs?: activity_logsUpdateManyWithoutLibrarianNestedInput
  }

  export type librarianUncheckedUpdateInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    activity_logs?: activity_logsUncheckedUpdateManyWithoutLibrarianNestedInput
  }

  export type librarianCreateManyInput = {
    employee_id: number
    position?: string | null
    contact_num: number
    user_id: number
  }

  export type librarianUpdateManyMutationInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
  }

  export type librarianUncheckedUpdateManyInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type papersCreateInput = {
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    paper_metadata?: paper_metadataCreateNestedManyWithoutPapersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutPapersInput
    paper_bm25_index?: paper_bm25_indexCreateNestedManyWithoutPapersInput
    term_score?: term_scoreCreateNestedManyWithoutPapersInput
  }

  export type papersUncheckedCreateInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    paper_metadata?: paper_metadataUncheckedCreateNestedManyWithoutPapersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutPapersInput
    paper_bm25_index?: paper_bm25_indexUncheckedCreateNestedManyWithoutPapersInput
    term_score?: term_scoreUncheckedCreateNestedManyWithoutPapersInput
  }

  export type papersUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    paper_metadata?: paper_metadataUpdateManyWithoutPapersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutPapersNestedInput
    paper_bm25_index?: paper_bm25_indexUpdateManyWithoutPapersNestedInput
    term_score?: term_scoreUpdateManyWithoutPapersNestedInput
  }

  export type papersUncheckedUpdateInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    paper_metadata?: paper_metadataUncheckedUpdateManyWithoutPapersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutPapersNestedInput
    paper_bm25_index?: paper_bm25_indexUncheckedUpdateManyWithoutPapersNestedInput
    term_score?: term_scoreUncheckedUpdateManyWithoutPapersNestedInput
  }

  export type papersCreateManyInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
  }

  export type papersUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type papersUncheckedUpdateManyInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type paper_metadataCreateInput = {
    type?: string | null
    format?: string | null
    language?: string | null
    source?: string | null
    rights?: string | null
    papers: papersCreateNestedOneWithoutPaper_metadataInput
  }

  export type paper_metadataUncheckedCreateInput = {
    metadata_id?: number
    paper_id: number
    type?: string | null
    format?: string | null
    language?: string | null
    source?: string | null
    rights?: string | null
  }

  export type paper_metadataUpdateInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    rights?: NullableStringFieldUpdateOperationsInput | string | null
    papers?: papersUpdateOneRequiredWithoutPaper_metadataNestedInput
  }

  export type paper_metadataUncheckedUpdateInput = {
    metadata_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    rights?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type paper_metadataCreateManyInput = {
    metadata_id?: number
    paper_id: number
    type?: string | null
    format?: string | null
    language?: string | null
    source?: string | null
    rights?: string | null
  }

  export type paper_metadataUpdateManyMutationInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    rights?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type paper_metadataUncheckedUpdateManyInput = {
    metadata_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    rights?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_bookmarksCreateInput = {
    created_at?: Date | string | null
    updated_at?: Date | string | null
    papers: papersCreateNestedOneWithoutUser_bookmarksInput
    users: usersCreateNestedOneWithoutUser_bookmarksInput
  }

  export type user_bookmarksUncheckedCreateInput = {
    bookmark_id?: number
    user_id: number
    paper_id: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type user_bookmarksUpdateInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    papers?: papersUpdateOneRequiredWithoutUser_bookmarksNestedInput
    users?: usersUpdateOneRequiredWithoutUser_bookmarksNestedInput
  }

  export type user_bookmarksUncheckedUpdateInput = {
    bookmark_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_bookmarksCreateManyInput = {
    bookmark_id?: number
    user_id: number
    paper_id: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type user_bookmarksUpdateManyMutationInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_bookmarksUncheckedUpdateManyInput = {
    bookmark_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OtpCreateInput = {
    id?: string
    email: string
    code: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type OtpUncheckedCreateInput = {
    id?: string
    email: string
    code: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type OtpUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCreateManyInput = {
    id?: string
    email: string
    code: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type OtpUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type paper_bm25_indexCreateInput = {
    token_frequencies: JsonNullValueInput | InputJsonValue
    document_length: number
    papers: papersCreateNestedOneWithoutPaper_bm25_indexInput
  }

  export type paper_bm25_indexUncheckedCreateInput = {
    index_id?: number
    paper_id: number
    token_frequencies: JsonNullValueInput | InputJsonValue
    document_length: number
  }

  export type paper_bm25_indexUpdateInput = {
    token_frequencies?: JsonNullValueInput | InputJsonValue
    document_length?: IntFieldUpdateOperationsInput | number
    papers?: papersUpdateOneRequiredWithoutPaper_bm25_indexNestedInput
  }

  export type paper_bm25_indexUncheckedUpdateInput = {
    index_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    token_frequencies?: JsonNullValueInput | InputJsonValue
    document_length?: IntFieldUpdateOperationsInput | number
  }

  export type paper_bm25_indexCreateManyInput = {
    index_id?: number
    paper_id: number
    token_frequencies: JsonNullValueInput | InputJsonValue
    document_length: number
  }

  export type paper_bm25_indexUpdateManyMutationInput = {
    token_frequencies?: JsonNullValueInput | InputJsonValue
    document_length?: IntFieldUpdateOperationsInput | number
  }

  export type paper_bm25_indexUncheckedUpdateManyInput = {
    index_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    token_frequencies?: JsonNullValueInput | InputJsonValue
    document_length?: IntFieldUpdateOperationsInput | number
  }

  export type term_scoreCreateInput = {
    term: string
    tf: number
    tfidf: number
    bm25: number
    papers: papersCreateNestedOneWithoutTerm_scoreInput
  }

  export type term_scoreUncheckedCreateInput = {
    id?: number
    term: string
    tf: number
    tfidf: number
    bm25: number
    paper_id: number
  }

  export type term_scoreUpdateInput = {
    term?: StringFieldUpdateOperationsInput | string
    tf?: FloatFieldUpdateOperationsInput | number
    tfidf?: FloatFieldUpdateOperationsInput | number
    bm25?: FloatFieldUpdateOperationsInput | number
    papers?: papersUpdateOneRequiredWithoutTerm_scoreNestedInput
  }

  export type term_scoreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    tf?: FloatFieldUpdateOperationsInput | number
    tfidf?: FloatFieldUpdateOperationsInput | number
    bm25?: FloatFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
  }

  export type term_scoreCreateManyInput = {
    id?: number
    term: string
    tf: number
    tfidf: number
    bm25: number
    paper_id: number
  }

  export type term_scoreUpdateManyMutationInput = {
    term?: StringFieldUpdateOperationsInput | string
    tf?: FloatFieldUpdateOperationsInput | number
    tfidf?: FloatFieldUpdateOperationsInput | number
    bm25?: FloatFieldUpdateOperationsInput | number
  }

  export type term_scoreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    tf?: FloatFieldUpdateOperationsInput | number
    tfidf?: FloatFieldUpdateOperationsInput | number
    bm25?: FloatFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
  }

  export type activity_logsCreateInput = {
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    user_agent?: string | null
    ip_address?: string | null
    status?: string | null
    librarian: librarianCreateNestedOneWithoutActivity_logsInput
    users: usersCreateNestedOneWithoutActivity_logsInput
  }

  export type activity_logsUncheckedCreateInput = {
    act_id?: number
    employee_id: number
    user_id: number
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    user_agent?: string | null
    ip_address?: string | null
    status?: string | null
  }

  export type activity_logsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    librarian?: librarianUpdateOneRequiredWithoutActivity_logsNestedInput
    users?: usersUpdateOneRequiredWithoutActivity_logsNestedInput
  }

  export type activity_logsUncheckedUpdateInput = {
    act_id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activity_logsCreateManyInput = {
    act_id?: number
    employee_id: number
    user_id: number
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    user_agent?: string | null
    ip_address?: string | null
    status?: string | null
  }

  export type activity_logsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activity_logsUncheckedUpdateManyInput = {
    act_id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type global_statsCreateInput = {
    total_docs: number
    avg_doc_length: number
    updated_at?: Date | string
  }

  export type global_statsUncheckedCreateInput = {
    id?: number
    total_docs: number
    avg_doc_length: number
    updated_at?: Date | string
  }

  export type global_statsUpdateInput = {
    total_docs?: IntFieldUpdateOperationsInput | number
    avg_doc_length?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type global_statsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    total_docs?: IntFieldUpdateOperationsInput | number
    avg_doc_length?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type global_statsCreateManyInput = {
    id?: number
    total_docs: number
    avg_doc_length: number
    updated_at?: Date | string
  }

  export type global_statsUpdateManyMutationInput = {
    total_docs?: IntFieldUpdateOperationsInput | number
    avg_doc_length?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type global_statsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    total_docs?: IntFieldUpdateOperationsInput | number
    avg_doc_length?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FacultyNullableScalarRelationFilter = {
    is?: facultyWhereInput | null
    isNot?: facultyWhereInput | null
  }

  export type StudentsNullableScalarRelationFilter = {
    is?: studentsWhereInput | null
    isNot?: studentsWhereInput | null
  }

  export type LibrarianNullableScalarRelationFilter = {
    is?: librarianWhereInput | null
    isNot?: librarianWhereInput | null
  }

  export type User_bookmarksListRelationFilter = {
    every?: user_bookmarksWhereInput
    some?: user_bookmarksWhereInput
    none?: user_bookmarksWhereInput
  }

  export type Activity_logsListRelationFilter = {
    every?: activity_logsWhereInput
    some?: activity_logsWhereInput
    none?: activity_logsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type user_bookmarksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type activity_logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    user_id?: SortOrder
    first_name?: SortOrder
    mid_name?: SortOrder
    last_name?: SortOrder
    ext_name?: SortOrder
    email?: SortOrder
    profile_picture?: SortOrder
    role?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    user_id?: SortOrder
    first_name?: SortOrder
    mid_name?: SortOrder
    last_name?: SortOrder
    ext_name?: SortOrder
    email?: SortOrder
    profile_picture?: SortOrder
    role?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    user_id?: SortOrder
    first_name?: SortOrder
    mid_name?: SortOrder
    last_name?: SortOrder
    ext_name?: SortOrder
    email?: SortOrder
    profile_picture?: SortOrder
    role?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type facultyCountOrderByAggregateInput = {
    employee_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    user_id?: SortOrder
  }

  export type facultyAvgOrderByAggregateInput = {
    employee_id?: SortOrder
    user_id?: SortOrder
  }

  export type facultyMaxOrderByAggregateInput = {
    employee_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    user_id?: SortOrder
  }

  export type facultyMinOrderByAggregateInput = {
    employee_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    user_id?: SortOrder
  }

  export type facultySumOrderByAggregateInput = {
    employee_id?: SortOrder
    user_id?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type studentsCountOrderByAggregateInput = {
    student_num?: SortOrder
    program?: SortOrder
    college?: SortOrder
    year_level?: SortOrder
    user_id?: SortOrder
  }

  export type studentsAvgOrderByAggregateInput = {
    student_num?: SortOrder
    year_level?: SortOrder
    user_id?: SortOrder
  }

  export type studentsMaxOrderByAggregateInput = {
    student_num?: SortOrder
    program?: SortOrder
    college?: SortOrder
    year_level?: SortOrder
    user_id?: SortOrder
  }

  export type studentsMinOrderByAggregateInput = {
    student_num?: SortOrder
    program?: SortOrder
    college?: SortOrder
    year_level?: SortOrder
    user_id?: SortOrder
  }

  export type studentsSumOrderByAggregateInput = {
    student_num?: SortOrder
    year_level?: SortOrder
    user_id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type librarianCountOrderByAggregateInput = {
    employee_id?: SortOrder
    position?: SortOrder
    contact_num?: SortOrder
    user_id?: SortOrder
  }

  export type librarianAvgOrderByAggregateInput = {
    employee_id?: SortOrder
    contact_num?: SortOrder
    user_id?: SortOrder
  }

  export type librarianMaxOrderByAggregateInput = {
    employee_id?: SortOrder
    position?: SortOrder
    contact_num?: SortOrder
    user_id?: SortOrder
  }

  export type librarianMinOrderByAggregateInput = {
    employee_id?: SortOrder
    position?: SortOrder
    contact_num?: SortOrder
    user_id?: SortOrder
  }

  export type librarianSumOrderByAggregateInput = {
    employee_id?: SortOrder
    contact_num?: SortOrder
    user_id?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type Paper_metadataListRelationFilter = {
    every?: paper_metadataWhereInput
    some?: paper_metadataWhereInput
    none?: paper_metadataWhereInput
  }

  export type Paper_bm25_indexListRelationFilter = {
    every?: paper_bm25_indexWhereInput
    some?: paper_bm25_indexWhereInput
    none?: paper_bm25_indexWhereInput
  }

  export type Term_scoreListRelationFilter = {
    every?: term_scoreWhereInput
    some?: term_scoreWhereInput
    none?: term_scoreWhereInput
  }

  export type paper_metadataOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type paper_bm25_indexOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type term_scoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type papersCountOrderByAggregateInput = {
    paper_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    year?: SortOrder
    department?: SortOrder
    keywords?: SortOrder
    course?: SortOrder
    abstract?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    paper_url?: SortOrder
  }

  export type papersAvgOrderByAggregateInput = {
    paper_id?: SortOrder
    year?: SortOrder
  }

  export type papersMaxOrderByAggregateInput = {
    paper_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    year?: SortOrder
    department?: SortOrder
    course?: SortOrder
    abstract?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    paper_url?: SortOrder
  }

  export type papersMinOrderByAggregateInput = {
    paper_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    year?: SortOrder
    department?: SortOrder
    course?: SortOrder
    abstract?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    paper_url?: SortOrder
  }

  export type papersSumOrderByAggregateInput = {
    paper_id?: SortOrder
    year?: SortOrder
  }

  export type PapersScalarRelationFilter = {
    is?: papersWhereInput
    isNot?: papersWhereInput
  }

  export type paper_metadataCountOrderByAggregateInput = {
    metadata_id?: SortOrder
    paper_id?: SortOrder
    type?: SortOrder
    format?: SortOrder
    language?: SortOrder
    source?: SortOrder
    rights?: SortOrder
  }

  export type paper_metadataAvgOrderByAggregateInput = {
    metadata_id?: SortOrder
    paper_id?: SortOrder
  }

  export type paper_metadataMaxOrderByAggregateInput = {
    metadata_id?: SortOrder
    paper_id?: SortOrder
    type?: SortOrder
    format?: SortOrder
    language?: SortOrder
    source?: SortOrder
    rights?: SortOrder
  }

  export type paper_metadataMinOrderByAggregateInput = {
    metadata_id?: SortOrder
    paper_id?: SortOrder
    type?: SortOrder
    format?: SortOrder
    language?: SortOrder
    source?: SortOrder
    rights?: SortOrder
  }

  export type paper_metadataSumOrderByAggregateInput = {
    metadata_id?: SortOrder
    paper_id?: SortOrder
  }

  export type user_bookmarksUser_idPaper_idCompoundUniqueInput = {
    user_id: number
    paper_id: number
  }

  export type user_bookmarksCountOrderByAggregateInput = {
    bookmark_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_bookmarksAvgOrderByAggregateInput = {
    bookmark_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
  }

  export type user_bookmarksMaxOrderByAggregateInput = {
    bookmark_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_bookmarksMinOrderByAggregateInput = {
    bookmark_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_bookmarksSumOrderByAggregateInput = {
    bookmark_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OtpCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type OtpMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type OtpMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type paper_bm25_indexCountOrderByAggregateInput = {
    index_id?: SortOrder
    paper_id?: SortOrder
    token_frequencies?: SortOrder
    document_length?: SortOrder
  }

  export type paper_bm25_indexAvgOrderByAggregateInput = {
    index_id?: SortOrder
    paper_id?: SortOrder
    document_length?: SortOrder
  }

  export type paper_bm25_indexMaxOrderByAggregateInput = {
    index_id?: SortOrder
    paper_id?: SortOrder
    document_length?: SortOrder
  }

  export type paper_bm25_indexMinOrderByAggregateInput = {
    index_id?: SortOrder
    paper_id?: SortOrder
    document_length?: SortOrder
  }

  export type paper_bm25_indexSumOrderByAggregateInput = {
    index_id?: SortOrder
    paper_id?: SortOrder
    document_length?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type term_scoreCountOrderByAggregateInput = {
    id?: SortOrder
    term?: SortOrder
    tf?: SortOrder
    tfidf?: SortOrder
    bm25?: SortOrder
    paper_id?: SortOrder
  }

  export type term_scoreAvgOrderByAggregateInput = {
    id?: SortOrder
    tf?: SortOrder
    tfidf?: SortOrder
    bm25?: SortOrder
    paper_id?: SortOrder
  }

  export type term_scoreMaxOrderByAggregateInput = {
    id?: SortOrder
    term?: SortOrder
    tf?: SortOrder
    tfidf?: SortOrder
    bm25?: SortOrder
    paper_id?: SortOrder
  }

  export type term_scoreMinOrderByAggregateInput = {
    id?: SortOrder
    term?: SortOrder
    tf?: SortOrder
    tfidf?: SortOrder
    bm25?: SortOrder
    paper_id?: SortOrder
  }

  export type term_scoreSumOrderByAggregateInput = {
    id?: SortOrder
    tf?: SortOrder
    tfidf?: SortOrder
    bm25?: SortOrder
    paper_id?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type Enumactivity_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.activity_type | Enumactivity_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.activity_type[] | ListEnumactivity_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.activity_type[] | ListEnumactivity_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumactivity_typeNullableFilter<$PrismaModel> | $Enums.activity_type | null
  }

  export type LibrarianScalarRelationFilter = {
    is?: librarianWhereInput
    isNot?: librarianWhereInput
  }

  export type activity_logsCountOrderByAggregateInput = {
    act_id?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    activity_type?: SortOrder
    user_agent?: SortOrder
    ip_address?: SortOrder
    status?: SortOrder
  }

  export type activity_logsAvgOrderByAggregateInput = {
    act_id?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
  }

  export type activity_logsMaxOrderByAggregateInput = {
    act_id?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    activity_type?: SortOrder
    user_agent?: SortOrder
    ip_address?: SortOrder
    status?: SortOrder
  }

  export type activity_logsMinOrderByAggregateInput = {
    act_id?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    activity_type?: SortOrder
    user_agent?: SortOrder
    ip_address?: SortOrder
    status?: SortOrder
  }

  export type activity_logsSumOrderByAggregateInput = {
    act_id?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
  }

  export type Enumactivity_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.activity_type | Enumactivity_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.activity_type[] | ListEnumactivity_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.activity_type[] | ListEnumactivity_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumactivity_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.activity_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumactivity_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumactivity_typeNullableFilter<$PrismaModel>
  }

  export type global_statsCountOrderByAggregateInput = {
    id?: SortOrder
    total_docs?: SortOrder
    avg_doc_length?: SortOrder
    updated_at?: SortOrder
  }

  export type global_statsAvgOrderByAggregateInput = {
    id?: SortOrder
    total_docs?: SortOrder
    avg_doc_length?: SortOrder
  }

  export type global_statsMaxOrderByAggregateInput = {
    id?: SortOrder
    total_docs?: SortOrder
    avg_doc_length?: SortOrder
    updated_at?: SortOrder
  }

  export type global_statsMinOrderByAggregateInput = {
    id?: SortOrder
    total_docs?: SortOrder
    avg_doc_length?: SortOrder
    updated_at?: SortOrder
  }

  export type global_statsSumOrderByAggregateInput = {
    id?: SortOrder
    total_docs?: SortOrder
    avg_doc_length?: SortOrder
  }

  export type facultyCreateNestedOneWithoutUsersInput = {
    create?: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: facultyCreateOrConnectWithoutUsersInput
    connect?: facultyWhereUniqueInput
  }

  export type studentsCreateNestedOneWithoutUsersInput = {
    create?: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: studentsCreateOrConnectWithoutUsersInput
    connect?: studentsWhereUniqueInput
  }

  export type librarianCreateNestedOneWithoutUsersInput = {
    create?: XOR<librarianCreateWithoutUsersInput, librarianUncheckedCreateWithoutUsersInput>
    connectOrCreate?: librarianCreateOrConnectWithoutUsersInput
    connect?: librarianWhereUniqueInput
  }

  export type user_bookmarksCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput> | user_bookmarksCreateWithoutUsersInput[] | user_bookmarksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutUsersInput | user_bookmarksCreateOrConnectWithoutUsersInput[]
    createMany?: user_bookmarksCreateManyUsersInputEnvelope
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
  }

  export type activity_logsCreateNestedManyWithoutUsersInput = {
    create?: XOR<activity_logsCreateWithoutUsersInput, activity_logsUncheckedCreateWithoutUsersInput> | activity_logsCreateWithoutUsersInput[] | activity_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutUsersInput | activity_logsCreateOrConnectWithoutUsersInput[]
    createMany?: activity_logsCreateManyUsersInputEnvelope
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
  }

  export type facultyUncheckedCreateNestedOneWithoutUsersInput = {
    create?: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: facultyCreateOrConnectWithoutUsersInput
    connect?: facultyWhereUniqueInput
  }

  export type studentsUncheckedCreateNestedOneWithoutUsersInput = {
    create?: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: studentsCreateOrConnectWithoutUsersInput
    connect?: studentsWhereUniqueInput
  }

  export type librarianUncheckedCreateNestedOneWithoutUsersInput = {
    create?: XOR<librarianCreateWithoutUsersInput, librarianUncheckedCreateWithoutUsersInput>
    connectOrCreate?: librarianCreateOrConnectWithoutUsersInput
    connect?: librarianWhereUniqueInput
  }

  export type user_bookmarksUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput> | user_bookmarksCreateWithoutUsersInput[] | user_bookmarksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutUsersInput | user_bookmarksCreateOrConnectWithoutUsersInput[]
    createMany?: user_bookmarksCreateManyUsersInputEnvelope
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
  }

  export type activity_logsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<activity_logsCreateWithoutUsersInput, activity_logsUncheckedCreateWithoutUsersInput> | activity_logsCreateWithoutUsersInput[] | activity_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutUsersInput | activity_logsCreateOrConnectWithoutUsersInput[]
    createMany?: activity_logsCreateManyUsersInputEnvelope
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type facultyUpdateOneWithoutUsersNestedInput = {
    create?: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: facultyCreateOrConnectWithoutUsersInput
    upsert?: facultyUpsertWithoutUsersInput
    disconnect?: facultyWhereInput | boolean
    delete?: facultyWhereInput | boolean
    connect?: facultyWhereUniqueInput
    update?: XOR<XOR<facultyUpdateToOneWithWhereWithoutUsersInput, facultyUpdateWithoutUsersInput>, facultyUncheckedUpdateWithoutUsersInput>
  }

  export type studentsUpdateOneWithoutUsersNestedInput = {
    create?: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: studentsCreateOrConnectWithoutUsersInput
    upsert?: studentsUpsertWithoutUsersInput
    disconnect?: studentsWhereInput | boolean
    delete?: studentsWhereInput | boolean
    connect?: studentsWhereUniqueInput
    update?: XOR<XOR<studentsUpdateToOneWithWhereWithoutUsersInput, studentsUpdateWithoutUsersInput>, studentsUncheckedUpdateWithoutUsersInput>
  }

  export type librarianUpdateOneWithoutUsersNestedInput = {
    create?: XOR<librarianCreateWithoutUsersInput, librarianUncheckedCreateWithoutUsersInput>
    connectOrCreate?: librarianCreateOrConnectWithoutUsersInput
    upsert?: librarianUpsertWithoutUsersInput
    disconnect?: librarianWhereInput | boolean
    delete?: librarianWhereInput | boolean
    connect?: librarianWhereUniqueInput
    update?: XOR<XOR<librarianUpdateToOneWithWhereWithoutUsersInput, librarianUpdateWithoutUsersInput>, librarianUncheckedUpdateWithoutUsersInput>
  }

  export type user_bookmarksUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput> | user_bookmarksCreateWithoutUsersInput[] | user_bookmarksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutUsersInput | user_bookmarksCreateOrConnectWithoutUsersInput[]
    upsert?: user_bookmarksUpsertWithWhereUniqueWithoutUsersInput | user_bookmarksUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_bookmarksCreateManyUsersInputEnvelope
    set?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    disconnect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    delete?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    update?: user_bookmarksUpdateWithWhereUniqueWithoutUsersInput | user_bookmarksUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_bookmarksUpdateManyWithWhereWithoutUsersInput | user_bookmarksUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_bookmarksScalarWhereInput | user_bookmarksScalarWhereInput[]
  }

  export type activity_logsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<activity_logsCreateWithoutUsersInput, activity_logsUncheckedCreateWithoutUsersInput> | activity_logsCreateWithoutUsersInput[] | activity_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutUsersInput | activity_logsCreateOrConnectWithoutUsersInput[]
    upsert?: activity_logsUpsertWithWhereUniqueWithoutUsersInput | activity_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: activity_logsCreateManyUsersInputEnvelope
    set?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    disconnect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    delete?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    update?: activity_logsUpdateWithWhereUniqueWithoutUsersInput | activity_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: activity_logsUpdateManyWithWhereWithoutUsersInput | activity_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: activity_logsScalarWhereInput | activity_logsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type facultyUncheckedUpdateOneWithoutUsersNestedInput = {
    create?: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: facultyCreateOrConnectWithoutUsersInput
    upsert?: facultyUpsertWithoutUsersInput
    disconnect?: facultyWhereInput | boolean
    delete?: facultyWhereInput | boolean
    connect?: facultyWhereUniqueInput
    update?: XOR<XOR<facultyUpdateToOneWithWhereWithoutUsersInput, facultyUpdateWithoutUsersInput>, facultyUncheckedUpdateWithoutUsersInput>
  }

  export type studentsUncheckedUpdateOneWithoutUsersNestedInput = {
    create?: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: studentsCreateOrConnectWithoutUsersInput
    upsert?: studentsUpsertWithoutUsersInput
    disconnect?: studentsWhereInput | boolean
    delete?: studentsWhereInput | boolean
    connect?: studentsWhereUniqueInput
    update?: XOR<XOR<studentsUpdateToOneWithWhereWithoutUsersInput, studentsUpdateWithoutUsersInput>, studentsUncheckedUpdateWithoutUsersInput>
  }

  export type librarianUncheckedUpdateOneWithoutUsersNestedInput = {
    create?: XOR<librarianCreateWithoutUsersInput, librarianUncheckedCreateWithoutUsersInput>
    connectOrCreate?: librarianCreateOrConnectWithoutUsersInput
    upsert?: librarianUpsertWithoutUsersInput
    disconnect?: librarianWhereInput | boolean
    delete?: librarianWhereInput | boolean
    connect?: librarianWhereUniqueInput
    update?: XOR<XOR<librarianUpdateToOneWithWhereWithoutUsersInput, librarianUpdateWithoutUsersInput>, librarianUncheckedUpdateWithoutUsersInput>
  }

  export type user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput> | user_bookmarksCreateWithoutUsersInput[] | user_bookmarksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutUsersInput | user_bookmarksCreateOrConnectWithoutUsersInput[]
    upsert?: user_bookmarksUpsertWithWhereUniqueWithoutUsersInput | user_bookmarksUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_bookmarksCreateManyUsersInputEnvelope
    set?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    disconnect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    delete?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    update?: user_bookmarksUpdateWithWhereUniqueWithoutUsersInput | user_bookmarksUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_bookmarksUpdateManyWithWhereWithoutUsersInput | user_bookmarksUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_bookmarksScalarWhereInput | user_bookmarksScalarWhereInput[]
  }

  export type activity_logsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<activity_logsCreateWithoutUsersInput, activity_logsUncheckedCreateWithoutUsersInput> | activity_logsCreateWithoutUsersInput[] | activity_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutUsersInput | activity_logsCreateOrConnectWithoutUsersInput[]
    upsert?: activity_logsUpsertWithWhereUniqueWithoutUsersInput | activity_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: activity_logsCreateManyUsersInputEnvelope
    set?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    disconnect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    delete?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    update?: activity_logsUpdateWithWhereUniqueWithoutUsersInput | activity_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: activity_logsUpdateManyWithWhereWithoutUsersInput | activity_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: activity_logsScalarWhereInput | activity_logsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutFacultyInput = {
    create?: XOR<usersCreateWithoutFacultyInput, usersUncheckedCreateWithoutFacultyInput>
    connectOrCreate?: usersCreateOrConnectWithoutFacultyInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutFacultyNestedInput = {
    create?: XOR<usersCreateWithoutFacultyInput, usersUncheckedCreateWithoutFacultyInput>
    connectOrCreate?: usersCreateOrConnectWithoutFacultyInput
    upsert?: usersUpsertWithoutFacultyInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutFacultyInput, usersUpdateWithoutFacultyInput>, usersUncheckedUpdateWithoutFacultyInput>
  }

  export type usersCreateNestedOneWithoutStudentsInput = {
    create?: XOR<usersCreateWithoutStudentsInput, usersUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutStudentsInput
    connect?: usersWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<usersCreateWithoutStudentsInput, usersUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutStudentsInput
    upsert?: usersUpsertWithoutStudentsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutStudentsInput, usersUpdateWithoutStudentsInput>, usersUncheckedUpdateWithoutStudentsInput>
  }

  export type usersCreateNestedOneWithoutLibrarianInput = {
    create?: XOR<usersCreateWithoutLibrarianInput, usersUncheckedCreateWithoutLibrarianInput>
    connectOrCreate?: usersCreateOrConnectWithoutLibrarianInput
    connect?: usersWhereUniqueInput
  }

  export type activity_logsCreateNestedManyWithoutLibrarianInput = {
    create?: XOR<activity_logsCreateWithoutLibrarianInput, activity_logsUncheckedCreateWithoutLibrarianInput> | activity_logsCreateWithoutLibrarianInput[] | activity_logsUncheckedCreateWithoutLibrarianInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutLibrarianInput | activity_logsCreateOrConnectWithoutLibrarianInput[]
    createMany?: activity_logsCreateManyLibrarianInputEnvelope
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
  }

  export type activity_logsUncheckedCreateNestedManyWithoutLibrarianInput = {
    create?: XOR<activity_logsCreateWithoutLibrarianInput, activity_logsUncheckedCreateWithoutLibrarianInput> | activity_logsCreateWithoutLibrarianInput[] | activity_logsUncheckedCreateWithoutLibrarianInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutLibrarianInput | activity_logsCreateOrConnectWithoutLibrarianInput[]
    createMany?: activity_logsCreateManyLibrarianInputEnvelope
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
  }

  export type usersUpdateOneRequiredWithoutLibrarianNestedInput = {
    create?: XOR<usersCreateWithoutLibrarianInput, usersUncheckedCreateWithoutLibrarianInput>
    connectOrCreate?: usersCreateOrConnectWithoutLibrarianInput
    upsert?: usersUpsertWithoutLibrarianInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLibrarianInput, usersUpdateWithoutLibrarianInput>, usersUncheckedUpdateWithoutLibrarianInput>
  }

  export type activity_logsUpdateManyWithoutLibrarianNestedInput = {
    create?: XOR<activity_logsCreateWithoutLibrarianInput, activity_logsUncheckedCreateWithoutLibrarianInput> | activity_logsCreateWithoutLibrarianInput[] | activity_logsUncheckedCreateWithoutLibrarianInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutLibrarianInput | activity_logsCreateOrConnectWithoutLibrarianInput[]
    upsert?: activity_logsUpsertWithWhereUniqueWithoutLibrarianInput | activity_logsUpsertWithWhereUniqueWithoutLibrarianInput[]
    createMany?: activity_logsCreateManyLibrarianInputEnvelope
    set?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    disconnect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    delete?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    update?: activity_logsUpdateWithWhereUniqueWithoutLibrarianInput | activity_logsUpdateWithWhereUniqueWithoutLibrarianInput[]
    updateMany?: activity_logsUpdateManyWithWhereWithoutLibrarianInput | activity_logsUpdateManyWithWhereWithoutLibrarianInput[]
    deleteMany?: activity_logsScalarWhereInput | activity_logsScalarWhereInput[]
  }

  export type activity_logsUncheckedUpdateManyWithoutLibrarianNestedInput = {
    create?: XOR<activity_logsCreateWithoutLibrarianInput, activity_logsUncheckedCreateWithoutLibrarianInput> | activity_logsCreateWithoutLibrarianInput[] | activity_logsUncheckedCreateWithoutLibrarianInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutLibrarianInput | activity_logsCreateOrConnectWithoutLibrarianInput[]
    upsert?: activity_logsUpsertWithWhereUniqueWithoutLibrarianInput | activity_logsUpsertWithWhereUniqueWithoutLibrarianInput[]
    createMany?: activity_logsCreateManyLibrarianInputEnvelope
    set?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    disconnect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    delete?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
    update?: activity_logsUpdateWithWhereUniqueWithoutLibrarianInput | activity_logsUpdateWithWhereUniqueWithoutLibrarianInput[]
    updateMany?: activity_logsUpdateManyWithWhereWithoutLibrarianInput | activity_logsUpdateManyWithWhereWithoutLibrarianInput[]
    deleteMany?: activity_logsScalarWhereInput | activity_logsScalarWhereInput[]
  }

  export type papersCreatekeywordsInput = {
    set: string[]
  }

  export type paper_metadataCreateNestedManyWithoutPapersInput = {
    create?: XOR<paper_metadataCreateWithoutPapersInput, paper_metadataUncheckedCreateWithoutPapersInput> | paper_metadataCreateWithoutPapersInput[] | paper_metadataUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: paper_metadataCreateOrConnectWithoutPapersInput | paper_metadataCreateOrConnectWithoutPapersInput[]
    createMany?: paper_metadataCreateManyPapersInputEnvelope
    connect?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
  }

  export type user_bookmarksCreateNestedManyWithoutPapersInput = {
    create?: XOR<user_bookmarksCreateWithoutPapersInput, user_bookmarksUncheckedCreateWithoutPapersInput> | user_bookmarksCreateWithoutPapersInput[] | user_bookmarksUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutPapersInput | user_bookmarksCreateOrConnectWithoutPapersInput[]
    createMany?: user_bookmarksCreateManyPapersInputEnvelope
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
  }

  export type paper_bm25_indexCreateNestedManyWithoutPapersInput = {
    create?: XOR<paper_bm25_indexCreateWithoutPapersInput, paper_bm25_indexUncheckedCreateWithoutPapersInput> | paper_bm25_indexCreateWithoutPapersInput[] | paper_bm25_indexUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: paper_bm25_indexCreateOrConnectWithoutPapersInput | paper_bm25_indexCreateOrConnectWithoutPapersInput[]
    createMany?: paper_bm25_indexCreateManyPapersInputEnvelope
    connect?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
  }

  export type term_scoreCreateNestedManyWithoutPapersInput = {
    create?: XOR<term_scoreCreateWithoutPapersInput, term_scoreUncheckedCreateWithoutPapersInput> | term_scoreCreateWithoutPapersInput[] | term_scoreUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: term_scoreCreateOrConnectWithoutPapersInput | term_scoreCreateOrConnectWithoutPapersInput[]
    createMany?: term_scoreCreateManyPapersInputEnvelope
    connect?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
  }

  export type paper_metadataUncheckedCreateNestedManyWithoutPapersInput = {
    create?: XOR<paper_metadataCreateWithoutPapersInput, paper_metadataUncheckedCreateWithoutPapersInput> | paper_metadataCreateWithoutPapersInput[] | paper_metadataUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: paper_metadataCreateOrConnectWithoutPapersInput | paper_metadataCreateOrConnectWithoutPapersInput[]
    createMany?: paper_metadataCreateManyPapersInputEnvelope
    connect?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
  }

  export type user_bookmarksUncheckedCreateNestedManyWithoutPapersInput = {
    create?: XOR<user_bookmarksCreateWithoutPapersInput, user_bookmarksUncheckedCreateWithoutPapersInput> | user_bookmarksCreateWithoutPapersInput[] | user_bookmarksUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutPapersInput | user_bookmarksCreateOrConnectWithoutPapersInput[]
    createMany?: user_bookmarksCreateManyPapersInputEnvelope
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
  }

  export type paper_bm25_indexUncheckedCreateNestedManyWithoutPapersInput = {
    create?: XOR<paper_bm25_indexCreateWithoutPapersInput, paper_bm25_indexUncheckedCreateWithoutPapersInput> | paper_bm25_indexCreateWithoutPapersInput[] | paper_bm25_indexUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: paper_bm25_indexCreateOrConnectWithoutPapersInput | paper_bm25_indexCreateOrConnectWithoutPapersInput[]
    createMany?: paper_bm25_indexCreateManyPapersInputEnvelope
    connect?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
  }

  export type term_scoreUncheckedCreateNestedManyWithoutPapersInput = {
    create?: XOR<term_scoreCreateWithoutPapersInput, term_scoreUncheckedCreateWithoutPapersInput> | term_scoreCreateWithoutPapersInput[] | term_scoreUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: term_scoreCreateOrConnectWithoutPapersInput | term_scoreCreateOrConnectWithoutPapersInput[]
    createMany?: term_scoreCreateManyPapersInputEnvelope
    connect?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
  }

  export type papersUpdatekeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type paper_metadataUpdateManyWithoutPapersNestedInput = {
    create?: XOR<paper_metadataCreateWithoutPapersInput, paper_metadataUncheckedCreateWithoutPapersInput> | paper_metadataCreateWithoutPapersInput[] | paper_metadataUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: paper_metadataCreateOrConnectWithoutPapersInput | paper_metadataCreateOrConnectWithoutPapersInput[]
    upsert?: paper_metadataUpsertWithWhereUniqueWithoutPapersInput | paper_metadataUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: paper_metadataCreateManyPapersInputEnvelope
    set?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
    disconnect?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
    delete?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
    connect?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
    update?: paper_metadataUpdateWithWhereUniqueWithoutPapersInput | paper_metadataUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: paper_metadataUpdateManyWithWhereWithoutPapersInput | paper_metadataUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: paper_metadataScalarWhereInput | paper_metadataScalarWhereInput[]
  }

  export type user_bookmarksUpdateManyWithoutPapersNestedInput = {
    create?: XOR<user_bookmarksCreateWithoutPapersInput, user_bookmarksUncheckedCreateWithoutPapersInput> | user_bookmarksCreateWithoutPapersInput[] | user_bookmarksUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutPapersInput | user_bookmarksCreateOrConnectWithoutPapersInput[]
    upsert?: user_bookmarksUpsertWithWhereUniqueWithoutPapersInput | user_bookmarksUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: user_bookmarksCreateManyPapersInputEnvelope
    set?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    disconnect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    delete?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    update?: user_bookmarksUpdateWithWhereUniqueWithoutPapersInput | user_bookmarksUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: user_bookmarksUpdateManyWithWhereWithoutPapersInput | user_bookmarksUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: user_bookmarksScalarWhereInput | user_bookmarksScalarWhereInput[]
  }

  export type paper_bm25_indexUpdateManyWithoutPapersNestedInput = {
    create?: XOR<paper_bm25_indexCreateWithoutPapersInput, paper_bm25_indexUncheckedCreateWithoutPapersInput> | paper_bm25_indexCreateWithoutPapersInput[] | paper_bm25_indexUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: paper_bm25_indexCreateOrConnectWithoutPapersInput | paper_bm25_indexCreateOrConnectWithoutPapersInput[]
    upsert?: paper_bm25_indexUpsertWithWhereUniqueWithoutPapersInput | paper_bm25_indexUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: paper_bm25_indexCreateManyPapersInputEnvelope
    set?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
    disconnect?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
    delete?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
    connect?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
    update?: paper_bm25_indexUpdateWithWhereUniqueWithoutPapersInput | paper_bm25_indexUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: paper_bm25_indexUpdateManyWithWhereWithoutPapersInput | paper_bm25_indexUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: paper_bm25_indexScalarWhereInput | paper_bm25_indexScalarWhereInput[]
  }

  export type term_scoreUpdateManyWithoutPapersNestedInput = {
    create?: XOR<term_scoreCreateWithoutPapersInput, term_scoreUncheckedCreateWithoutPapersInput> | term_scoreCreateWithoutPapersInput[] | term_scoreUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: term_scoreCreateOrConnectWithoutPapersInput | term_scoreCreateOrConnectWithoutPapersInput[]
    upsert?: term_scoreUpsertWithWhereUniqueWithoutPapersInput | term_scoreUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: term_scoreCreateManyPapersInputEnvelope
    set?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
    disconnect?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
    delete?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
    connect?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
    update?: term_scoreUpdateWithWhereUniqueWithoutPapersInput | term_scoreUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: term_scoreUpdateManyWithWhereWithoutPapersInput | term_scoreUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: term_scoreScalarWhereInput | term_scoreScalarWhereInput[]
  }

  export type paper_metadataUncheckedUpdateManyWithoutPapersNestedInput = {
    create?: XOR<paper_metadataCreateWithoutPapersInput, paper_metadataUncheckedCreateWithoutPapersInput> | paper_metadataCreateWithoutPapersInput[] | paper_metadataUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: paper_metadataCreateOrConnectWithoutPapersInput | paper_metadataCreateOrConnectWithoutPapersInput[]
    upsert?: paper_metadataUpsertWithWhereUniqueWithoutPapersInput | paper_metadataUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: paper_metadataCreateManyPapersInputEnvelope
    set?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
    disconnect?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
    delete?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
    connect?: paper_metadataWhereUniqueInput | paper_metadataWhereUniqueInput[]
    update?: paper_metadataUpdateWithWhereUniqueWithoutPapersInput | paper_metadataUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: paper_metadataUpdateManyWithWhereWithoutPapersInput | paper_metadataUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: paper_metadataScalarWhereInput | paper_metadataScalarWhereInput[]
  }

  export type user_bookmarksUncheckedUpdateManyWithoutPapersNestedInput = {
    create?: XOR<user_bookmarksCreateWithoutPapersInput, user_bookmarksUncheckedCreateWithoutPapersInput> | user_bookmarksCreateWithoutPapersInput[] | user_bookmarksUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutPapersInput | user_bookmarksCreateOrConnectWithoutPapersInput[]
    upsert?: user_bookmarksUpsertWithWhereUniqueWithoutPapersInput | user_bookmarksUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: user_bookmarksCreateManyPapersInputEnvelope
    set?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    disconnect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    delete?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
    update?: user_bookmarksUpdateWithWhereUniqueWithoutPapersInput | user_bookmarksUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: user_bookmarksUpdateManyWithWhereWithoutPapersInput | user_bookmarksUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: user_bookmarksScalarWhereInput | user_bookmarksScalarWhereInput[]
  }

  export type paper_bm25_indexUncheckedUpdateManyWithoutPapersNestedInput = {
    create?: XOR<paper_bm25_indexCreateWithoutPapersInput, paper_bm25_indexUncheckedCreateWithoutPapersInput> | paper_bm25_indexCreateWithoutPapersInput[] | paper_bm25_indexUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: paper_bm25_indexCreateOrConnectWithoutPapersInput | paper_bm25_indexCreateOrConnectWithoutPapersInput[]
    upsert?: paper_bm25_indexUpsertWithWhereUniqueWithoutPapersInput | paper_bm25_indexUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: paper_bm25_indexCreateManyPapersInputEnvelope
    set?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
    disconnect?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
    delete?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
    connect?: paper_bm25_indexWhereUniqueInput | paper_bm25_indexWhereUniqueInput[]
    update?: paper_bm25_indexUpdateWithWhereUniqueWithoutPapersInput | paper_bm25_indexUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: paper_bm25_indexUpdateManyWithWhereWithoutPapersInput | paper_bm25_indexUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: paper_bm25_indexScalarWhereInput | paper_bm25_indexScalarWhereInput[]
  }

  export type term_scoreUncheckedUpdateManyWithoutPapersNestedInput = {
    create?: XOR<term_scoreCreateWithoutPapersInput, term_scoreUncheckedCreateWithoutPapersInput> | term_scoreCreateWithoutPapersInput[] | term_scoreUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: term_scoreCreateOrConnectWithoutPapersInput | term_scoreCreateOrConnectWithoutPapersInput[]
    upsert?: term_scoreUpsertWithWhereUniqueWithoutPapersInput | term_scoreUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: term_scoreCreateManyPapersInputEnvelope
    set?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
    disconnect?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
    delete?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
    connect?: term_scoreWhereUniqueInput | term_scoreWhereUniqueInput[]
    update?: term_scoreUpdateWithWhereUniqueWithoutPapersInput | term_scoreUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: term_scoreUpdateManyWithWhereWithoutPapersInput | term_scoreUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: term_scoreScalarWhereInput | term_scoreScalarWhereInput[]
  }

  export type papersCreateNestedOneWithoutPaper_metadataInput = {
    create?: XOR<papersCreateWithoutPaper_metadataInput, papersUncheckedCreateWithoutPaper_metadataInput>
    connectOrCreate?: papersCreateOrConnectWithoutPaper_metadataInput
    connect?: papersWhereUniqueInput
  }

  export type papersUpdateOneRequiredWithoutPaper_metadataNestedInput = {
    create?: XOR<papersCreateWithoutPaper_metadataInput, papersUncheckedCreateWithoutPaper_metadataInput>
    connectOrCreate?: papersCreateOrConnectWithoutPaper_metadataInput
    upsert?: papersUpsertWithoutPaper_metadataInput
    connect?: papersWhereUniqueInput
    update?: XOR<XOR<papersUpdateToOneWithWhereWithoutPaper_metadataInput, papersUpdateWithoutPaper_metadataInput>, papersUncheckedUpdateWithoutPaper_metadataInput>
  }

  export type papersCreateNestedOneWithoutUser_bookmarksInput = {
    create?: XOR<papersCreateWithoutUser_bookmarksInput, papersUncheckedCreateWithoutUser_bookmarksInput>
    connectOrCreate?: papersCreateOrConnectWithoutUser_bookmarksInput
    connect?: papersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutUser_bookmarksInput = {
    create?: XOR<usersCreateWithoutUser_bookmarksInput, usersUncheckedCreateWithoutUser_bookmarksInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_bookmarksInput
    connect?: usersWhereUniqueInput
  }

  export type papersUpdateOneRequiredWithoutUser_bookmarksNestedInput = {
    create?: XOR<papersCreateWithoutUser_bookmarksInput, papersUncheckedCreateWithoutUser_bookmarksInput>
    connectOrCreate?: papersCreateOrConnectWithoutUser_bookmarksInput
    upsert?: papersUpsertWithoutUser_bookmarksInput
    connect?: papersWhereUniqueInput
    update?: XOR<XOR<papersUpdateToOneWithWhereWithoutUser_bookmarksInput, papersUpdateWithoutUser_bookmarksInput>, papersUncheckedUpdateWithoutUser_bookmarksInput>
  }

  export type usersUpdateOneRequiredWithoutUser_bookmarksNestedInput = {
    create?: XOR<usersCreateWithoutUser_bookmarksInput, usersUncheckedCreateWithoutUser_bookmarksInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_bookmarksInput
    upsert?: usersUpsertWithoutUser_bookmarksInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutUser_bookmarksInput, usersUpdateWithoutUser_bookmarksInput>, usersUncheckedUpdateWithoutUser_bookmarksInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type papersCreateNestedOneWithoutPaper_bm25_indexInput = {
    create?: XOR<papersCreateWithoutPaper_bm25_indexInput, papersUncheckedCreateWithoutPaper_bm25_indexInput>
    connectOrCreate?: papersCreateOrConnectWithoutPaper_bm25_indexInput
    connect?: papersWhereUniqueInput
  }

  export type papersUpdateOneRequiredWithoutPaper_bm25_indexNestedInput = {
    create?: XOR<papersCreateWithoutPaper_bm25_indexInput, papersUncheckedCreateWithoutPaper_bm25_indexInput>
    connectOrCreate?: papersCreateOrConnectWithoutPaper_bm25_indexInput
    upsert?: papersUpsertWithoutPaper_bm25_indexInput
    connect?: papersWhereUniqueInput
    update?: XOR<XOR<papersUpdateToOneWithWhereWithoutPaper_bm25_indexInput, papersUpdateWithoutPaper_bm25_indexInput>, papersUncheckedUpdateWithoutPaper_bm25_indexInput>
  }

  export type papersCreateNestedOneWithoutTerm_scoreInput = {
    create?: XOR<papersCreateWithoutTerm_scoreInput, papersUncheckedCreateWithoutTerm_scoreInput>
    connectOrCreate?: papersCreateOrConnectWithoutTerm_scoreInput
    connect?: papersWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type papersUpdateOneRequiredWithoutTerm_scoreNestedInput = {
    create?: XOR<papersCreateWithoutTerm_scoreInput, papersUncheckedCreateWithoutTerm_scoreInput>
    connectOrCreate?: papersCreateOrConnectWithoutTerm_scoreInput
    upsert?: papersUpsertWithoutTerm_scoreInput
    connect?: papersWhereUniqueInput
    update?: XOR<XOR<papersUpdateToOneWithWhereWithoutTerm_scoreInput, papersUpdateWithoutTerm_scoreInput>, papersUncheckedUpdateWithoutTerm_scoreInput>
  }

  export type librarianCreateNestedOneWithoutActivity_logsInput = {
    create?: XOR<librarianCreateWithoutActivity_logsInput, librarianUncheckedCreateWithoutActivity_logsInput>
    connectOrCreate?: librarianCreateOrConnectWithoutActivity_logsInput
    connect?: librarianWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutActivity_logsInput = {
    create?: XOR<usersCreateWithoutActivity_logsInput, usersUncheckedCreateWithoutActivity_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutActivity_logsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableEnumactivity_typeFieldUpdateOperationsInput = {
    set?: $Enums.activity_type | null
  }

  export type librarianUpdateOneRequiredWithoutActivity_logsNestedInput = {
    create?: XOR<librarianCreateWithoutActivity_logsInput, librarianUncheckedCreateWithoutActivity_logsInput>
    connectOrCreate?: librarianCreateOrConnectWithoutActivity_logsInput
    upsert?: librarianUpsertWithoutActivity_logsInput
    connect?: librarianWhereUniqueInput
    update?: XOR<XOR<librarianUpdateToOneWithWhereWithoutActivity_logsInput, librarianUpdateWithoutActivity_logsInput>, librarianUncheckedUpdateWithoutActivity_logsInput>
  }

  export type usersUpdateOneRequiredWithoutActivity_logsNestedInput = {
    create?: XOR<usersCreateWithoutActivity_logsInput, usersUncheckedCreateWithoutActivity_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutActivity_logsInput
    upsert?: usersUpsertWithoutActivity_logsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutActivity_logsInput, usersUpdateWithoutActivity_logsInput>, usersUncheckedUpdateWithoutActivity_logsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumactivity_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.activity_type | Enumactivity_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.activity_type[] | ListEnumactivity_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.activity_type[] | ListEnumactivity_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumactivity_typeNullableFilter<$PrismaModel> | $Enums.activity_type | null
  }

  export type NestedEnumactivity_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.activity_type | Enumactivity_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.activity_type[] | ListEnumactivity_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.activity_type[] | ListEnumactivity_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumactivity_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.activity_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumactivity_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumactivity_typeNullableFilter<$PrismaModel>
  }

  export type facultyCreateWithoutUsersInput = {
    employee_id: number
    position?: string | null
    department?: string | null
  }

  export type facultyUncheckedCreateWithoutUsersInput = {
    employee_id: number
    position?: string | null
    department?: string | null
  }

  export type facultyCreateOrConnectWithoutUsersInput = {
    where: facultyWhereUniqueInput
    create: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
  }

  export type studentsCreateWithoutUsersInput = {
    student_num: bigint | number
    program?: string | null
    college?: string | null
    year_level?: number | null
  }

  export type studentsUncheckedCreateWithoutUsersInput = {
    student_num: bigint | number
    program?: string | null
    college?: string | null
    year_level?: number | null
  }

  export type studentsCreateOrConnectWithoutUsersInput = {
    where: studentsWhereUniqueInput
    create: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
  }

  export type librarianCreateWithoutUsersInput = {
    employee_id: number
    position?: string | null
    contact_num: number
    activity_logs?: activity_logsCreateNestedManyWithoutLibrarianInput
  }

  export type librarianUncheckedCreateWithoutUsersInput = {
    employee_id: number
    position?: string | null
    contact_num: number
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutLibrarianInput
  }

  export type librarianCreateOrConnectWithoutUsersInput = {
    where: librarianWhereUniqueInput
    create: XOR<librarianCreateWithoutUsersInput, librarianUncheckedCreateWithoutUsersInput>
  }

  export type user_bookmarksCreateWithoutUsersInput = {
    created_at?: Date | string | null
    updated_at?: Date | string | null
    papers: papersCreateNestedOneWithoutUser_bookmarksInput
  }

  export type user_bookmarksUncheckedCreateWithoutUsersInput = {
    bookmark_id?: number
    paper_id: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type user_bookmarksCreateOrConnectWithoutUsersInput = {
    where: user_bookmarksWhereUniqueInput
    create: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput>
  }

  export type user_bookmarksCreateManyUsersInputEnvelope = {
    data: user_bookmarksCreateManyUsersInput | user_bookmarksCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type activity_logsCreateWithoutUsersInput = {
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    user_agent?: string | null
    ip_address?: string | null
    status?: string | null
    librarian: librarianCreateNestedOneWithoutActivity_logsInput
  }

  export type activity_logsUncheckedCreateWithoutUsersInput = {
    act_id?: number
    employee_id: number
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    user_agent?: string | null
    ip_address?: string | null
    status?: string | null
  }

  export type activity_logsCreateOrConnectWithoutUsersInput = {
    where: activity_logsWhereUniqueInput
    create: XOR<activity_logsCreateWithoutUsersInput, activity_logsUncheckedCreateWithoutUsersInput>
  }

  export type activity_logsCreateManyUsersInputEnvelope = {
    data: activity_logsCreateManyUsersInput | activity_logsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type facultyUpsertWithoutUsersInput = {
    update: XOR<facultyUpdateWithoutUsersInput, facultyUncheckedUpdateWithoutUsersInput>
    create: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
    where?: facultyWhereInput
  }

  export type facultyUpdateToOneWithWhereWithoutUsersInput = {
    where?: facultyWhereInput
    data: XOR<facultyUpdateWithoutUsersInput, facultyUncheckedUpdateWithoutUsersInput>
  }

  export type facultyUpdateWithoutUsersInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type facultyUncheckedUpdateWithoutUsersInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type studentsUpsertWithoutUsersInput = {
    update: XOR<studentsUpdateWithoutUsersInput, studentsUncheckedUpdateWithoutUsersInput>
    create: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
    where?: studentsWhereInput
  }

  export type studentsUpdateToOneWithWhereWithoutUsersInput = {
    where?: studentsWhereInput
    data: XOR<studentsUpdateWithoutUsersInput, studentsUncheckedUpdateWithoutUsersInput>
  }

  export type studentsUpdateWithoutUsersInput = {
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
    program?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    year_level?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type studentsUncheckedUpdateWithoutUsersInput = {
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
    program?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    year_level?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type librarianUpsertWithoutUsersInput = {
    update: XOR<librarianUpdateWithoutUsersInput, librarianUncheckedUpdateWithoutUsersInput>
    create: XOR<librarianCreateWithoutUsersInput, librarianUncheckedCreateWithoutUsersInput>
    where?: librarianWhereInput
  }

  export type librarianUpdateToOneWithWhereWithoutUsersInput = {
    where?: librarianWhereInput
    data: XOR<librarianUpdateWithoutUsersInput, librarianUncheckedUpdateWithoutUsersInput>
  }

  export type librarianUpdateWithoutUsersInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    activity_logs?: activity_logsUpdateManyWithoutLibrarianNestedInput
  }

  export type librarianUncheckedUpdateWithoutUsersInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    activity_logs?: activity_logsUncheckedUpdateManyWithoutLibrarianNestedInput
  }

  export type user_bookmarksUpsertWithWhereUniqueWithoutUsersInput = {
    where: user_bookmarksWhereUniqueInput
    update: XOR<user_bookmarksUpdateWithoutUsersInput, user_bookmarksUncheckedUpdateWithoutUsersInput>
    create: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput>
  }

  export type user_bookmarksUpdateWithWhereUniqueWithoutUsersInput = {
    where: user_bookmarksWhereUniqueInput
    data: XOR<user_bookmarksUpdateWithoutUsersInput, user_bookmarksUncheckedUpdateWithoutUsersInput>
  }

  export type user_bookmarksUpdateManyWithWhereWithoutUsersInput = {
    where: user_bookmarksScalarWhereInput
    data: XOR<user_bookmarksUpdateManyMutationInput, user_bookmarksUncheckedUpdateManyWithoutUsersInput>
  }

  export type user_bookmarksScalarWhereInput = {
    AND?: user_bookmarksScalarWhereInput | user_bookmarksScalarWhereInput[]
    OR?: user_bookmarksScalarWhereInput[]
    NOT?: user_bookmarksScalarWhereInput | user_bookmarksScalarWhereInput[]
    bookmark_id?: IntFilter<"user_bookmarks"> | number
    user_id?: IntFilter<"user_bookmarks"> | number
    paper_id?: IntFilter<"user_bookmarks"> | number
    created_at?: DateTimeNullableFilter<"user_bookmarks"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"user_bookmarks"> | Date | string | null
  }

  export type activity_logsUpsertWithWhereUniqueWithoutUsersInput = {
    where: activity_logsWhereUniqueInput
    update: XOR<activity_logsUpdateWithoutUsersInput, activity_logsUncheckedUpdateWithoutUsersInput>
    create: XOR<activity_logsCreateWithoutUsersInput, activity_logsUncheckedCreateWithoutUsersInput>
  }

  export type activity_logsUpdateWithWhereUniqueWithoutUsersInput = {
    where: activity_logsWhereUniqueInput
    data: XOR<activity_logsUpdateWithoutUsersInput, activity_logsUncheckedUpdateWithoutUsersInput>
  }

  export type activity_logsUpdateManyWithWhereWithoutUsersInput = {
    where: activity_logsScalarWhereInput
    data: XOR<activity_logsUpdateManyMutationInput, activity_logsUncheckedUpdateManyWithoutUsersInput>
  }

  export type activity_logsScalarWhereInput = {
    AND?: activity_logsScalarWhereInput | activity_logsScalarWhereInput[]
    OR?: activity_logsScalarWhereInput[]
    NOT?: activity_logsScalarWhereInput | activity_logsScalarWhereInput[]
    act_id?: IntFilter<"activity_logs"> | number
    employee_id?: IntFilter<"activity_logs"> | number
    user_id?: IntFilter<"activity_logs"> | number
    name?: StringFilter<"activity_logs"> | string
    activity?: StringFilter<"activity_logs"> | string
    created_at?: DateTimeFilter<"activity_logs"> | Date | string
    activity_type?: Enumactivity_typeNullableFilter<"activity_logs"> | $Enums.activity_type | null
    user_agent?: StringNullableFilter<"activity_logs"> | string | null
    ip_address?: StringNullableFilter<"activity_logs"> | string | null
    status?: StringNullableFilter<"activity_logs"> | string | null
  }

  export type usersCreateWithoutFacultyInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    students?: studentsCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutFacultyInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutFacultyInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutFacultyInput, usersUncheckedCreateWithoutFacultyInput>
  }

  export type usersUpsertWithoutFacultyInput = {
    update: XOR<usersUpdateWithoutFacultyInput, usersUncheckedUpdateWithoutFacultyInput>
    create: XOR<usersCreateWithoutFacultyInput, usersUncheckedCreateWithoutFacultyInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutFacultyInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutFacultyInput, usersUncheckedUpdateWithoutFacultyInput>
  }

  export type usersUpdateWithoutFacultyInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    students?: studentsUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutFacultyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateWithoutStudentsInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutStudentsInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutStudentsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutStudentsInput, usersUncheckedCreateWithoutStudentsInput>
  }

  export type usersUpsertWithoutStudentsInput = {
    update: XOR<usersUpdateWithoutStudentsInput, usersUncheckedUpdateWithoutStudentsInput>
    create: XOR<usersCreateWithoutStudentsInput, usersUncheckedCreateWithoutStudentsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutStudentsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutStudentsInput, usersUncheckedUpdateWithoutStudentsInput>
  }

  export type usersUpdateWithoutStudentsInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutStudentsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateWithoutLibrarianInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutLibrarianInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutLibrarianInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLibrarianInput, usersUncheckedCreateWithoutLibrarianInput>
  }

  export type activity_logsCreateWithoutLibrarianInput = {
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    user_agent?: string | null
    ip_address?: string | null
    status?: string | null
    users: usersCreateNestedOneWithoutActivity_logsInput
  }

  export type activity_logsUncheckedCreateWithoutLibrarianInput = {
    act_id?: number
    user_id: number
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    user_agent?: string | null
    ip_address?: string | null
    status?: string | null
  }

  export type activity_logsCreateOrConnectWithoutLibrarianInput = {
    where: activity_logsWhereUniqueInput
    create: XOR<activity_logsCreateWithoutLibrarianInput, activity_logsUncheckedCreateWithoutLibrarianInput>
  }

  export type activity_logsCreateManyLibrarianInputEnvelope = {
    data: activity_logsCreateManyLibrarianInput | activity_logsCreateManyLibrarianInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutLibrarianInput = {
    update: XOR<usersUpdateWithoutLibrarianInput, usersUncheckedUpdateWithoutLibrarianInput>
    create: XOR<usersCreateWithoutLibrarianInput, usersUncheckedCreateWithoutLibrarianInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLibrarianInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLibrarianInput, usersUncheckedUpdateWithoutLibrarianInput>
  }

  export type usersUpdateWithoutLibrarianInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutLibrarianInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type activity_logsUpsertWithWhereUniqueWithoutLibrarianInput = {
    where: activity_logsWhereUniqueInput
    update: XOR<activity_logsUpdateWithoutLibrarianInput, activity_logsUncheckedUpdateWithoutLibrarianInput>
    create: XOR<activity_logsCreateWithoutLibrarianInput, activity_logsUncheckedCreateWithoutLibrarianInput>
  }

  export type activity_logsUpdateWithWhereUniqueWithoutLibrarianInput = {
    where: activity_logsWhereUniqueInput
    data: XOR<activity_logsUpdateWithoutLibrarianInput, activity_logsUncheckedUpdateWithoutLibrarianInput>
  }

  export type activity_logsUpdateManyWithWhereWithoutLibrarianInput = {
    where: activity_logsScalarWhereInput
    data: XOR<activity_logsUpdateManyMutationInput, activity_logsUncheckedUpdateManyWithoutLibrarianInput>
  }

  export type paper_metadataCreateWithoutPapersInput = {
    type?: string | null
    format?: string | null
    language?: string | null
    source?: string | null
    rights?: string | null
  }

  export type paper_metadataUncheckedCreateWithoutPapersInput = {
    metadata_id?: number
    type?: string | null
    format?: string | null
    language?: string | null
    source?: string | null
    rights?: string | null
  }

  export type paper_metadataCreateOrConnectWithoutPapersInput = {
    where: paper_metadataWhereUniqueInput
    create: XOR<paper_metadataCreateWithoutPapersInput, paper_metadataUncheckedCreateWithoutPapersInput>
  }

  export type paper_metadataCreateManyPapersInputEnvelope = {
    data: paper_metadataCreateManyPapersInput | paper_metadataCreateManyPapersInput[]
    skipDuplicates?: boolean
  }

  export type user_bookmarksCreateWithoutPapersInput = {
    created_at?: Date | string | null
    updated_at?: Date | string | null
    users: usersCreateNestedOneWithoutUser_bookmarksInput
  }

  export type user_bookmarksUncheckedCreateWithoutPapersInput = {
    bookmark_id?: number
    user_id: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type user_bookmarksCreateOrConnectWithoutPapersInput = {
    where: user_bookmarksWhereUniqueInput
    create: XOR<user_bookmarksCreateWithoutPapersInput, user_bookmarksUncheckedCreateWithoutPapersInput>
  }

  export type user_bookmarksCreateManyPapersInputEnvelope = {
    data: user_bookmarksCreateManyPapersInput | user_bookmarksCreateManyPapersInput[]
    skipDuplicates?: boolean
  }

  export type paper_bm25_indexCreateWithoutPapersInput = {
    token_frequencies: JsonNullValueInput | InputJsonValue
    document_length: number
  }

  export type paper_bm25_indexUncheckedCreateWithoutPapersInput = {
    index_id?: number
    token_frequencies: JsonNullValueInput | InputJsonValue
    document_length: number
  }

  export type paper_bm25_indexCreateOrConnectWithoutPapersInput = {
    where: paper_bm25_indexWhereUniqueInput
    create: XOR<paper_bm25_indexCreateWithoutPapersInput, paper_bm25_indexUncheckedCreateWithoutPapersInput>
  }

  export type paper_bm25_indexCreateManyPapersInputEnvelope = {
    data: paper_bm25_indexCreateManyPapersInput | paper_bm25_indexCreateManyPapersInput[]
    skipDuplicates?: boolean
  }

  export type term_scoreCreateWithoutPapersInput = {
    term: string
    tf: number
    tfidf: number
    bm25: number
  }

  export type term_scoreUncheckedCreateWithoutPapersInput = {
    id?: number
    term: string
    tf: number
    tfidf: number
    bm25: number
  }

  export type term_scoreCreateOrConnectWithoutPapersInput = {
    where: term_scoreWhereUniqueInput
    create: XOR<term_scoreCreateWithoutPapersInput, term_scoreUncheckedCreateWithoutPapersInput>
  }

  export type term_scoreCreateManyPapersInputEnvelope = {
    data: term_scoreCreateManyPapersInput | term_scoreCreateManyPapersInput[]
    skipDuplicates?: boolean
  }

  export type paper_metadataUpsertWithWhereUniqueWithoutPapersInput = {
    where: paper_metadataWhereUniqueInput
    update: XOR<paper_metadataUpdateWithoutPapersInput, paper_metadataUncheckedUpdateWithoutPapersInput>
    create: XOR<paper_metadataCreateWithoutPapersInput, paper_metadataUncheckedCreateWithoutPapersInput>
  }

  export type paper_metadataUpdateWithWhereUniqueWithoutPapersInput = {
    where: paper_metadataWhereUniqueInput
    data: XOR<paper_metadataUpdateWithoutPapersInput, paper_metadataUncheckedUpdateWithoutPapersInput>
  }

  export type paper_metadataUpdateManyWithWhereWithoutPapersInput = {
    where: paper_metadataScalarWhereInput
    data: XOR<paper_metadataUpdateManyMutationInput, paper_metadataUncheckedUpdateManyWithoutPapersInput>
  }

  export type paper_metadataScalarWhereInput = {
    AND?: paper_metadataScalarWhereInput | paper_metadataScalarWhereInput[]
    OR?: paper_metadataScalarWhereInput[]
    NOT?: paper_metadataScalarWhereInput | paper_metadataScalarWhereInput[]
    metadata_id?: IntFilter<"paper_metadata"> | number
    paper_id?: IntFilter<"paper_metadata"> | number
    type?: StringNullableFilter<"paper_metadata"> | string | null
    format?: StringNullableFilter<"paper_metadata"> | string | null
    language?: StringNullableFilter<"paper_metadata"> | string | null
    source?: StringNullableFilter<"paper_metadata"> | string | null
    rights?: StringNullableFilter<"paper_metadata"> | string | null
  }

  export type user_bookmarksUpsertWithWhereUniqueWithoutPapersInput = {
    where: user_bookmarksWhereUniqueInput
    update: XOR<user_bookmarksUpdateWithoutPapersInput, user_bookmarksUncheckedUpdateWithoutPapersInput>
    create: XOR<user_bookmarksCreateWithoutPapersInput, user_bookmarksUncheckedCreateWithoutPapersInput>
  }

  export type user_bookmarksUpdateWithWhereUniqueWithoutPapersInput = {
    where: user_bookmarksWhereUniqueInput
    data: XOR<user_bookmarksUpdateWithoutPapersInput, user_bookmarksUncheckedUpdateWithoutPapersInput>
  }

  export type user_bookmarksUpdateManyWithWhereWithoutPapersInput = {
    where: user_bookmarksScalarWhereInput
    data: XOR<user_bookmarksUpdateManyMutationInput, user_bookmarksUncheckedUpdateManyWithoutPapersInput>
  }

  export type paper_bm25_indexUpsertWithWhereUniqueWithoutPapersInput = {
    where: paper_bm25_indexWhereUniqueInput
    update: XOR<paper_bm25_indexUpdateWithoutPapersInput, paper_bm25_indexUncheckedUpdateWithoutPapersInput>
    create: XOR<paper_bm25_indexCreateWithoutPapersInput, paper_bm25_indexUncheckedCreateWithoutPapersInput>
  }

  export type paper_bm25_indexUpdateWithWhereUniqueWithoutPapersInput = {
    where: paper_bm25_indexWhereUniqueInput
    data: XOR<paper_bm25_indexUpdateWithoutPapersInput, paper_bm25_indexUncheckedUpdateWithoutPapersInput>
  }

  export type paper_bm25_indexUpdateManyWithWhereWithoutPapersInput = {
    where: paper_bm25_indexScalarWhereInput
    data: XOR<paper_bm25_indexUpdateManyMutationInput, paper_bm25_indexUncheckedUpdateManyWithoutPapersInput>
  }

  export type paper_bm25_indexScalarWhereInput = {
    AND?: paper_bm25_indexScalarWhereInput | paper_bm25_indexScalarWhereInput[]
    OR?: paper_bm25_indexScalarWhereInput[]
    NOT?: paper_bm25_indexScalarWhereInput | paper_bm25_indexScalarWhereInput[]
    index_id?: IntFilter<"paper_bm25_index"> | number
    paper_id?: IntFilter<"paper_bm25_index"> | number
    token_frequencies?: JsonFilter<"paper_bm25_index">
    document_length?: IntFilter<"paper_bm25_index"> | number
  }

  export type term_scoreUpsertWithWhereUniqueWithoutPapersInput = {
    where: term_scoreWhereUniqueInput
    update: XOR<term_scoreUpdateWithoutPapersInput, term_scoreUncheckedUpdateWithoutPapersInput>
    create: XOR<term_scoreCreateWithoutPapersInput, term_scoreUncheckedCreateWithoutPapersInput>
  }

  export type term_scoreUpdateWithWhereUniqueWithoutPapersInput = {
    where: term_scoreWhereUniqueInput
    data: XOR<term_scoreUpdateWithoutPapersInput, term_scoreUncheckedUpdateWithoutPapersInput>
  }

  export type term_scoreUpdateManyWithWhereWithoutPapersInput = {
    where: term_scoreScalarWhereInput
    data: XOR<term_scoreUpdateManyMutationInput, term_scoreUncheckedUpdateManyWithoutPapersInput>
  }

  export type term_scoreScalarWhereInput = {
    AND?: term_scoreScalarWhereInput | term_scoreScalarWhereInput[]
    OR?: term_scoreScalarWhereInput[]
    NOT?: term_scoreScalarWhereInput | term_scoreScalarWhereInput[]
    id?: IntFilter<"term_score"> | number
    term?: StringFilter<"term_score"> | string
    tf?: FloatFilter<"term_score"> | number
    tfidf?: FloatFilter<"term_score"> | number
    bm25?: FloatFilter<"term_score"> | number
    paper_id?: IntFilter<"term_score"> | number
  }

  export type papersCreateWithoutPaper_metadataInput = {
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutPapersInput
    paper_bm25_index?: paper_bm25_indexCreateNestedManyWithoutPapersInput
    term_score?: term_scoreCreateNestedManyWithoutPapersInput
  }

  export type papersUncheckedCreateWithoutPaper_metadataInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutPapersInput
    paper_bm25_index?: paper_bm25_indexUncheckedCreateNestedManyWithoutPapersInput
    term_score?: term_scoreUncheckedCreateNestedManyWithoutPapersInput
  }

  export type papersCreateOrConnectWithoutPaper_metadataInput = {
    where: papersWhereUniqueInput
    create: XOR<papersCreateWithoutPaper_metadataInput, papersUncheckedCreateWithoutPaper_metadataInput>
  }

  export type papersUpsertWithoutPaper_metadataInput = {
    update: XOR<papersUpdateWithoutPaper_metadataInput, papersUncheckedUpdateWithoutPaper_metadataInput>
    create: XOR<papersCreateWithoutPaper_metadataInput, papersUncheckedCreateWithoutPaper_metadataInput>
    where?: papersWhereInput
  }

  export type papersUpdateToOneWithWhereWithoutPaper_metadataInput = {
    where?: papersWhereInput
    data: XOR<papersUpdateWithoutPaper_metadataInput, papersUncheckedUpdateWithoutPaper_metadataInput>
  }

  export type papersUpdateWithoutPaper_metadataInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    user_bookmarks?: user_bookmarksUpdateManyWithoutPapersNestedInput
    paper_bm25_index?: paper_bm25_indexUpdateManyWithoutPapersNestedInput
    term_score?: term_scoreUpdateManyWithoutPapersNestedInput
  }

  export type papersUncheckedUpdateWithoutPaper_metadataInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutPapersNestedInput
    paper_bm25_index?: paper_bm25_indexUncheckedUpdateManyWithoutPapersNestedInput
    term_score?: term_scoreUncheckedUpdateManyWithoutPapersNestedInput
  }

  export type papersCreateWithoutUser_bookmarksInput = {
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    paper_metadata?: paper_metadataCreateNestedManyWithoutPapersInput
    paper_bm25_index?: paper_bm25_indexCreateNestedManyWithoutPapersInput
    term_score?: term_scoreCreateNestedManyWithoutPapersInput
  }

  export type papersUncheckedCreateWithoutUser_bookmarksInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    paper_metadata?: paper_metadataUncheckedCreateNestedManyWithoutPapersInput
    paper_bm25_index?: paper_bm25_indexUncheckedCreateNestedManyWithoutPapersInput
    term_score?: term_scoreUncheckedCreateNestedManyWithoutPapersInput
  }

  export type papersCreateOrConnectWithoutUser_bookmarksInput = {
    where: papersWhereUniqueInput
    create: XOR<papersCreateWithoutUser_bookmarksInput, papersUncheckedCreateWithoutUser_bookmarksInput>
  }

  export type usersCreateWithoutUser_bookmarksInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutUser_bookmarksInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutUser_bookmarksInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUser_bookmarksInput, usersUncheckedCreateWithoutUser_bookmarksInput>
  }

  export type papersUpsertWithoutUser_bookmarksInput = {
    update: XOR<papersUpdateWithoutUser_bookmarksInput, papersUncheckedUpdateWithoutUser_bookmarksInput>
    create: XOR<papersCreateWithoutUser_bookmarksInput, papersUncheckedCreateWithoutUser_bookmarksInput>
    where?: papersWhereInput
  }

  export type papersUpdateToOneWithWhereWithoutUser_bookmarksInput = {
    where?: papersWhereInput
    data: XOR<papersUpdateWithoutUser_bookmarksInput, papersUncheckedUpdateWithoutUser_bookmarksInput>
  }

  export type papersUpdateWithoutUser_bookmarksInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    paper_metadata?: paper_metadataUpdateManyWithoutPapersNestedInput
    paper_bm25_index?: paper_bm25_indexUpdateManyWithoutPapersNestedInput
    term_score?: term_scoreUpdateManyWithoutPapersNestedInput
  }

  export type papersUncheckedUpdateWithoutUser_bookmarksInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    paper_metadata?: paper_metadataUncheckedUpdateManyWithoutPapersNestedInput
    paper_bm25_index?: paper_bm25_indexUncheckedUpdateManyWithoutPapersNestedInput
    term_score?: term_scoreUncheckedUpdateManyWithoutPapersNestedInput
  }

  export type usersUpsertWithoutUser_bookmarksInput = {
    update: XOR<usersUpdateWithoutUser_bookmarksInput, usersUncheckedUpdateWithoutUser_bookmarksInput>
    create: XOR<usersCreateWithoutUser_bookmarksInput, usersUncheckedCreateWithoutUser_bookmarksInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutUser_bookmarksInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutUser_bookmarksInput, usersUncheckedUpdateWithoutUser_bookmarksInput>
  }

  export type usersUpdateWithoutUser_bookmarksInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutUser_bookmarksInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type papersCreateWithoutPaper_bm25_indexInput = {
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    paper_metadata?: paper_metadataCreateNestedManyWithoutPapersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutPapersInput
    term_score?: term_scoreCreateNestedManyWithoutPapersInput
  }

  export type papersUncheckedCreateWithoutPaper_bm25_indexInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    paper_metadata?: paper_metadataUncheckedCreateNestedManyWithoutPapersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutPapersInput
    term_score?: term_scoreUncheckedCreateNestedManyWithoutPapersInput
  }

  export type papersCreateOrConnectWithoutPaper_bm25_indexInput = {
    where: papersWhereUniqueInput
    create: XOR<papersCreateWithoutPaper_bm25_indexInput, papersUncheckedCreateWithoutPaper_bm25_indexInput>
  }

  export type papersUpsertWithoutPaper_bm25_indexInput = {
    update: XOR<papersUpdateWithoutPaper_bm25_indexInput, papersUncheckedUpdateWithoutPaper_bm25_indexInput>
    create: XOR<papersCreateWithoutPaper_bm25_indexInput, papersUncheckedCreateWithoutPaper_bm25_indexInput>
    where?: papersWhereInput
  }

  export type papersUpdateToOneWithWhereWithoutPaper_bm25_indexInput = {
    where?: papersWhereInput
    data: XOR<papersUpdateWithoutPaper_bm25_indexInput, papersUncheckedUpdateWithoutPaper_bm25_indexInput>
  }

  export type papersUpdateWithoutPaper_bm25_indexInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    paper_metadata?: paper_metadataUpdateManyWithoutPapersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutPapersNestedInput
    term_score?: term_scoreUpdateManyWithoutPapersNestedInput
  }

  export type papersUncheckedUpdateWithoutPaper_bm25_indexInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    paper_metadata?: paper_metadataUncheckedUpdateManyWithoutPapersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutPapersNestedInput
    term_score?: term_scoreUncheckedUpdateManyWithoutPapersNestedInput
  }

  export type papersCreateWithoutTerm_scoreInput = {
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    paper_metadata?: paper_metadataCreateNestedManyWithoutPapersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutPapersInput
    paper_bm25_index?: paper_bm25_indexCreateNestedManyWithoutPapersInput
  }

  export type papersUncheckedCreateWithoutTerm_scoreInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    department?: string | null
    keywords?: papersCreatekeywordsInput | string[]
    course?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_url?: string | null
    paper_metadata?: paper_metadataUncheckedCreateNestedManyWithoutPapersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutPapersInput
    paper_bm25_index?: paper_bm25_indexUncheckedCreateNestedManyWithoutPapersInput
  }

  export type papersCreateOrConnectWithoutTerm_scoreInput = {
    where: papersWhereUniqueInput
    create: XOR<papersCreateWithoutTerm_scoreInput, papersUncheckedCreateWithoutTerm_scoreInput>
  }

  export type papersUpsertWithoutTerm_scoreInput = {
    update: XOR<papersUpdateWithoutTerm_scoreInput, papersUncheckedUpdateWithoutTerm_scoreInput>
    create: XOR<papersCreateWithoutTerm_scoreInput, papersUncheckedCreateWithoutTerm_scoreInput>
    where?: papersWhereInput
  }

  export type papersUpdateToOneWithWhereWithoutTerm_scoreInput = {
    where?: papersWhereInput
    data: XOR<papersUpdateWithoutTerm_scoreInput, papersUncheckedUpdateWithoutTerm_scoreInput>
  }

  export type papersUpdateWithoutTerm_scoreInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    paper_metadata?: paper_metadataUpdateManyWithoutPapersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutPapersNestedInput
    paper_bm25_index?: paper_bm25_indexUpdateManyWithoutPapersNestedInput
  }

  export type papersUncheckedUpdateWithoutTerm_scoreInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: papersUpdatekeywordsInput | string[]
    course?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_url?: NullableStringFieldUpdateOperationsInput | string | null
    paper_metadata?: paper_metadataUncheckedUpdateManyWithoutPapersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutPapersNestedInput
    paper_bm25_index?: paper_bm25_indexUncheckedUpdateManyWithoutPapersNestedInput
  }

  export type librarianCreateWithoutActivity_logsInput = {
    employee_id: number
    position?: string | null
    contact_num: number
    users: usersCreateNestedOneWithoutLibrarianInput
  }

  export type librarianUncheckedCreateWithoutActivity_logsInput = {
    employee_id: number
    position?: string | null
    contact_num: number
    user_id: number
  }

  export type librarianCreateOrConnectWithoutActivity_logsInput = {
    where: librarianWhereUniqueInput
    create: XOR<librarianCreateWithoutActivity_logsInput, librarianUncheckedCreateWithoutActivity_logsInput>
  }

  export type usersCreateWithoutActivity_logsInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutActivity_logsInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutActivity_logsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutActivity_logsInput, usersUncheckedCreateWithoutActivity_logsInput>
  }

  export type librarianUpsertWithoutActivity_logsInput = {
    update: XOR<librarianUpdateWithoutActivity_logsInput, librarianUncheckedUpdateWithoutActivity_logsInput>
    create: XOR<librarianCreateWithoutActivity_logsInput, librarianUncheckedCreateWithoutActivity_logsInput>
    where?: librarianWhereInput
  }

  export type librarianUpdateToOneWithWhereWithoutActivity_logsInput = {
    where?: librarianWhereInput
    data: XOR<librarianUpdateWithoutActivity_logsInput, librarianUncheckedUpdateWithoutActivity_logsInput>
  }

  export type librarianUpdateWithoutActivity_logsInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    users?: usersUpdateOneRequiredWithoutLibrarianNestedInput
  }

  export type librarianUncheckedUpdateWithoutActivity_logsInput = {
    employee_id?: IntFieldUpdateOperationsInput | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type usersUpsertWithoutActivity_logsInput = {
    update: XOR<usersUpdateWithoutActivity_logsInput, usersUncheckedUpdateWithoutActivity_logsInput>
    create: XOR<usersCreateWithoutActivity_logsInput, usersUncheckedCreateWithoutActivity_logsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutActivity_logsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutActivity_logsInput, usersUncheckedUpdateWithoutActivity_logsInput>
  }

  export type usersUpdateWithoutActivity_logsInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutActivity_logsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type user_bookmarksCreateManyUsersInput = {
    bookmark_id?: number
    paper_id: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type activity_logsCreateManyUsersInput = {
    act_id?: number
    employee_id: number
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    user_agent?: string | null
    ip_address?: string | null
    status?: string | null
  }

  export type user_bookmarksUpdateWithoutUsersInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    papers?: papersUpdateOneRequiredWithoutUser_bookmarksNestedInput
  }

  export type user_bookmarksUncheckedUpdateWithoutUsersInput = {
    bookmark_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_bookmarksUncheckedUpdateManyWithoutUsersInput = {
    bookmark_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type activity_logsUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    librarian?: librarianUpdateOneRequiredWithoutActivity_logsNestedInput
  }

  export type activity_logsUncheckedUpdateWithoutUsersInput = {
    act_id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activity_logsUncheckedUpdateManyWithoutUsersInput = {
    act_id?: IntFieldUpdateOperationsInput | number
    employee_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activity_logsCreateManyLibrarianInput = {
    act_id?: number
    user_id: number
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    user_agent?: string | null
    ip_address?: string | null
    status?: string | null
  }

  export type activity_logsUpdateWithoutLibrarianInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneRequiredWithoutActivity_logsNestedInput
  }

  export type activity_logsUncheckedUpdateWithoutLibrarianInput = {
    act_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activity_logsUncheckedUpdateManyWithoutLibrarianInput = {
    act_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type paper_metadataCreateManyPapersInput = {
    metadata_id?: number
    type?: string | null
    format?: string | null
    language?: string | null
    source?: string | null
    rights?: string | null
  }

  export type user_bookmarksCreateManyPapersInput = {
    bookmark_id?: number
    user_id: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type paper_bm25_indexCreateManyPapersInput = {
    index_id?: number
    token_frequencies: JsonNullValueInput | InputJsonValue
    document_length: number
  }

  export type term_scoreCreateManyPapersInput = {
    id?: number
    term: string
    tf: number
    tfidf: number
    bm25: number
  }

  export type paper_metadataUpdateWithoutPapersInput = {
    type?: NullableStringFieldUpdateOperationsInput | string | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    rights?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type paper_metadataUncheckedUpdateWithoutPapersInput = {
    metadata_id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    rights?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type paper_metadataUncheckedUpdateManyWithoutPapersInput = {
    metadata_id?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    rights?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_bookmarksUpdateWithoutPapersInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutUser_bookmarksNestedInput
  }

  export type user_bookmarksUncheckedUpdateWithoutPapersInput = {
    bookmark_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_bookmarksUncheckedUpdateManyWithoutPapersInput = {
    bookmark_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type paper_bm25_indexUpdateWithoutPapersInput = {
    token_frequencies?: JsonNullValueInput | InputJsonValue
    document_length?: IntFieldUpdateOperationsInput | number
  }

  export type paper_bm25_indexUncheckedUpdateWithoutPapersInput = {
    index_id?: IntFieldUpdateOperationsInput | number
    token_frequencies?: JsonNullValueInput | InputJsonValue
    document_length?: IntFieldUpdateOperationsInput | number
  }

  export type paper_bm25_indexUncheckedUpdateManyWithoutPapersInput = {
    index_id?: IntFieldUpdateOperationsInput | number
    token_frequencies?: JsonNullValueInput | InputJsonValue
    document_length?: IntFieldUpdateOperationsInput | number
  }

  export type term_scoreUpdateWithoutPapersInput = {
    term?: StringFieldUpdateOperationsInput | string
    tf?: FloatFieldUpdateOperationsInput | number
    tfidf?: FloatFieldUpdateOperationsInput | number
    bm25?: FloatFieldUpdateOperationsInput | number
  }

  export type term_scoreUncheckedUpdateWithoutPapersInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    tf?: FloatFieldUpdateOperationsInput | number
    tfidf?: FloatFieldUpdateOperationsInput | number
    bm25?: FloatFieldUpdateOperationsInput | number
  }

  export type term_scoreUncheckedUpdateManyWithoutPapersInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    tf?: FloatFieldUpdateOperationsInput | number
    tfidf?: FloatFieldUpdateOperationsInput | number
    bm25?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}