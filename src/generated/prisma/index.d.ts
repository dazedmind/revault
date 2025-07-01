
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
 * Model activity_logs
 * 
 */
export type activity_logs = $Result.DefaultSelection<Prisma.$activity_logsPayload>
/**
 * Model user_activity_logs
 * 
 */
export type user_activity_logs = $Result.DefaultSelection<Prisma.$user_activity_logsPayload>
/**
 * Model backup_jobs
 * 
 */
export type backup_jobs = $Result.DefaultSelection<Prisma.$backup_jobsPayload>
/**
 * Model backup_settings
 * 
 */
export type backup_settings = $Result.DefaultSelection<Prisma.$backup_settingsPayload>

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
  UPLOAD_DOCUMENT: 'UPLOAD_DOCUMENT',
  SECURITY_VIOLATION: 'SECURITY_VIOLATION',
  PRINT_DOCUMENT: 'PRINT_DOCUMENT'
};

export type activity_type = (typeof activity_type)[keyof typeof activity_type]


export const user_role: {
  ADMIN: 'ADMIN',
  ASSISTANT: 'ASSISTANT',
  LIBRARIAN: 'LIBRARIAN',
  STUDENT: 'STUDENT',
  FACULTY: 'FACULTY'
};

export type user_role = (typeof user_role)[keyof typeof user_role]

}

export type activity_type = $Enums.activity_type

export const activity_type: typeof $Enums.activity_type

export type user_role = $Enums.user_role

export const user_role: typeof $Enums.user_role

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
   * `prisma.activity_logs`: Exposes CRUD operations for the **activity_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activity_logs
    * const activity_logs = await prisma.activity_logs.findMany()
    * ```
    */
  get activity_logs(): Prisma.activity_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_activity_logs`: Exposes CRUD operations for the **user_activity_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_activity_logs
    * const user_activity_logs = await prisma.user_activity_logs.findMany()
    * ```
    */
  get user_activity_logs(): Prisma.user_activity_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.backup_jobs`: Exposes CRUD operations for the **backup_jobs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Backup_jobs
    * const backup_jobs = await prisma.backup_jobs.findMany()
    * ```
    */
  get backup_jobs(): Prisma.backup_jobsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.backup_settings`: Exposes CRUD operations for the **backup_settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Backup_settings
    * const backup_settings = await prisma.backup_settings.findMany()
    * ```
    */
  get backup_settings(): Prisma.backup_settingsDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
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
    activity_logs: 'activity_logs',
    user_activity_logs: 'user_activity_logs',
    backup_jobs: 'backup_jobs',
    backup_settings: 'backup_settings'
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
      modelProps: "users" | "faculty" | "students" | "librarian" | "papers" | "paper_metadata" | "user_bookmarks" | "otp" | "activity_logs" | "user_activity_logs" | "backup_jobs" | "backup_settings"
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
      user_activity_logs: {
        payload: Prisma.$user_activity_logsPayload<ExtArgs>
        fields: Prisma.user_activity_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_activity_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_activity_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload>
          }
          findFirst: {
            args: Prisma.user_activity_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_activity_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload>
          }
          findMany: {
            args: Prisma.user_activity_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload>[]
          }
          create: {
            args: Prisma.user_activity_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload>
          }
          createMany: {
            args: Prisma.user_activity_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_activity_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload>[]
          }
          delete: {
            args: Prisma.user_activity_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload>
          }
          update: {
            args: Prisma.user_activity_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload>
          }
          deleteMany: {
            args: Prisma.user_activity_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_activity_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_activity_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload>[]
          }
          upsert: {
            args: Prisma.user_activity_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_activity_logsPayload>
          }
          aggregate: {
            args: Prisma.User_activity_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_activity_logs>
          }
          groupBy: {
            args: Prisma.user_activity_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_activity_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_activity_logsCountArgs<ExtArgs>
            result: $Utils.Optional<User_activity_logsCountAggregateOutputType> | number
          }
        }
      }
      backup_jobs: {
        payload: Prisma.$backup_jobsPayload<ExtArgs>
        fields: Prisma.backup_jobsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.backup_jobsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.backup_jobsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload>
          }
          findFirst: {
            args: Prisma.backup_jobsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.backup_jobsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload>
          }
          findMany: {
            args: Prisma.backup_jobsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload>[]
          }
          create: {
            args: Prisma.backup_jobsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload>
          }
          createMany: {
            args: Prisma.backup_jobsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.backup_jobsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload>[]
          }
          delete: {
            args: Prisma.backup_jobsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload>
          }
          update: {
            args: Prisma.backup_jobsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload>
          }
          deleteMany: {
            args: Prisma.backup_jobsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.backup_jobsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.backup_jobsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload>[]
          }
          upsert: {
            args: Prisma.backup_jobsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_jobsPayload>
          }
          aggregate: {
            args: Prisma.Backup_jobsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackup_jobs>
          }
          groupBy: {
            args: Prisma.backup_jobsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Backup_jobsGroupByOutputType>[]
          }
          count: {
            args: Prisma.backup_jobsCountArgs<ExtArgs>
            result: $Utils.Optional<Backup_jobsCountAggregateOutputType> | number
          }
        }
      }
      backup_settings: {
        payload: Prisma.$backup_settingsPayload<ExtArgs>
        fields: Prisma.backup_settingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.backup_settingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.backup_settingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload>
          }
          findFirst: {
            args: Prisma.backup_settingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.backup_settingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload>
          }
          findMany: {
            args: Prisma.backup_settingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload>[]
          }
          create: {
            args: Prisma.backup_settingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload>
          }
          createMany: {
            args: Prisma.backup_settingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.backup_settingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload>[]
          }
          delete: {
            args: Prisma.backup_settingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload>
          }
          update: {
            args: Prisma.backup_settingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload>
          }
          deleteMany: {
            args: Prisma.backup_settingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.backup_settingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.backup_settingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload>[]
          }
          upsert: {
            args: Prisma.backup_settingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$backup_settingsPayload>
          }
          aggregate: {
            args: Prisma.Backup_settingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackup_settings>
          }
          groupBy: {
            args: Prisma.backup_settingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Backup_settingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.backup_settingsCountArgs<ExtArgs>
            result: $Utils.Optional<Backup_settingsCountAggregateOutputType> | number
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
    activity_logs?: activity_logsOmit
    user_activity_logs?: user_activity_logsOmit
    backup_jobs?: backup_jobsOmit
    backup_settings?: backup_settingsOmit
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
    user_activity_logs: number
    activity_logs: number
    user_bookmarks: number
    backup_jobs: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_activity_logs?: boolean | UsersCountOutputTypeCountUser_activity_logsArgs
    activity_logs?: boolean | UsersCountOutputTypeCountActivity_logsArgs
    user_bookmarks?: boolean | UsersCountOutputTypeCountUser_bookmarksArgs
    backup_jobs?: boolean | UsersCountOutputTypeCountBackup_jobsArgs
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
  export type UsersCountOutputTypeCountUser_activity_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_activity_logsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountActivity_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: activity_logsWhereInput
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
  export type UsersCountOutputTypeCountBackup_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: backup_jobsWhereInput
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
    user_activity_logs: number
  }

  export type PapersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper_metadata?: boolean | PapersCountOutputTypeCountPaper_metadataArgs
    user_bookmarks?: boolean | PapersCountOutputTypeCountUser_bookmarksArgs
    user_activity_logs?: boolean | PapersCountOutputTypeCountUser_activity_logsArgs
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
  export type PapersCountOutputTypeCountUser_activity_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_activity_logsWhereInput
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
    password: string | null
    created_at: Date | null
    role: $Enums.user_role | null
  }

  export type UsersMaxAggregateOutputType = {
    user_id: number | null
    first_name: string | null
    mid_name: string | null
    last_name: string | null
    ext_name: string | null
    email: string | null
    profile_picture: string | null
    password: string | null
    created_at: Date | null
    role: $Enums.user_role | null
  }

  export type UsersCountAggregateOutputType = {
    user_id: number
    first_name: number
    mid_name: number
    last_name: number
    ext_name: number
    email: number
    profile_picture: number
    password: number
    created_at: number
    role: number
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
    password?: true
    created_at?: true
    role?: true
  }

  export type UsersMaxAggregateInputType = {
    user_id?: true
    first_name?: true
    mid_name?: true
    last_name?: true
    ext_name?: true
    email?: true
    profile_picture?: true
    password?: true
    created_at?: true
    role?: true
  }

  export type UsersCountAggregateInputType = {
    user_id?: true
    first_name?: true
    mid_name?: true
    last_name?: true
    ext_name?: true
    email?: true
    profile_picture?: true
    password?: true
    created_at?: true
    role?: true
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
    password: string
    created_at: Date | null
    role: $Enums.user_role | null
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
    password?: boolean
    created_at?: boolean
    role?: boolean
    user_activity_logs?: boolean | users$user_activity_logsArgs<ExtArgs>
    activity_logs?: boolean | users$activity_logsArgs<ExtArgs>
    faculty?: boolean | users$facultyArgs<ExtArgs>
    librarian?: boolean | users$librarianArgs<ExtArgs>
    students?: boolean | users$studentsArgs<ExtArgs>
    user_bookmarks?: boolean | users$user_bookmarksArgs<ExtArgs>
    backup_jobs?: boolean | users$backup_jobsArgs<ExtArgs>
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
    password?: boolean
    created_at?: boolean
    role?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    first_name?: boolean
    mid_name?: boolean
    last_name?: boolean
    ext_name?: boolean
    email?: boolean
    profile_picture?: boolean
    password?: boolean
    created_at?: boolean
    role?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    user_id?: boolean
    first_name?: boolean
    mid_name?: boolean
    last_name?: boolean
    ext_name?: boolean
    email?: boolean
    profile_picture?: boolean
    password?: boolean
    created_at?: boolean
    role?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "first_name" | "mid_name" | "last_name" | "ext_name" | "email" | "profile_picture" | "password" | "created_at" | "role", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_activity_logs?: boolean | users$user_activity_logsArgs<ExtArgs>
    activity_logs?: boolean | users$activity_logsArgs<ExtArgs>
    faculty?: boolean | users$facultyArgs<ExtArgs>
    librarian?: boolean | users$librarianArgs<ExtArgs>
    students?: boolean | users$studentsArgs<ExtArgs>
    user_bookmarks?: boolean | users$user_bookmarksArgs<ExtArgs>
    backup_jobs?: boolean | users$backup_jobsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      user_activity_logs: Prisma.$user_activity_logsPayload<ExtArgs>[]
      activity_logs: Prisma.$activity_logsPayload<ExtArgs>[]
      faculty: Prisma.$facultyPayload<ExtArgs> | null
      librarian: Prisma.$librarianPayload<ExtArgs> | null
      students: Prisma.$studentsPayload<ExtArgs> | null
      user_bookmarks: Prisma.$user_bookmarksPayload<ExtArgs>[]
      backup_jobs: Prisma.$backup_jobsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      first_name: string | null
      mid_name: string | null
      last_name: string | null
      ext_name: string | null
      email: string
      profile_picture: string | null
      password: string
      created_at: Date | null
      role: $Enums.user_role | null
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
    user_activity_logs<T extends users$user_activity_logsArgs<ExtArgs> = {}>(args?: Subset<T, users$user_activity_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activity_logs<T extends users$activity_logsArgs<ExtArgs> = {}>(args?: Subset<T, users$activity_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    faculty<T extends users$facultyArgs<ExtArgs> = {}>(args?: Subset<T, users$facultyArgs<ExtArgs>>): Prisma__facultyClient<$Result.GetResult<Prisma.$facultyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    librarian<T extends users$librarianArgs<ExtArgs> = {}>(args?: Subset<T, users$librarianArgs<ExtArgs>>): Prisma__librarianClient<$Result.GetResult<Prisma.$librarianPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    students<T extends users$studentsArgs<ExtArgs> = {}>(args?: Subset<T, users$studentsArgs<ExtArgs>>): Prisma__studentsClient<$Result.GetResult<Prisma.$studentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user_bookmarks<T extends users$user_bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, users$user_bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    backup_jobs<T extends users$backup_jobsArgs<ExtArgs> = {}>(args?: Subset<T, users$backup_jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly password: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly role: FieldRef<"users", 'user_role'>
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
   * users.user_activity_logs
   */
  export type users$user_activity_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    where?: user_activity_logsWhereInput
    orderBy?: user_activity_logsOrderByWithRelationInput | user_activity_logsOrderByWithRelationInput[]
    cursor?: user_activity_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_activity_logsScalarFieldEnum | User_activity_logsScalarFieldEnum[]
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
   * users.backup_jobs
   */
  export type users$backup_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    where?: backup_jobsWhereInput
    orderBy?: backup_jobsOrderByWithRelationInput | backup_jobsOrderByWithRelationInput[]
    cursor?: backup_jobsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Backup_jobsScalarFieldEnum | Backup_jobsScalarFieldEnum[]
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
    employee_id: bigint | null
    user_id: number | null
  }

  export type FacultyMinAggregateOutputType = {
    employee_id: bigint | null
    position: string | null
    department: string | null
    user_id: number | null
  }

  export type FacultyMaxAggregateOutputType = {
    employee_id: bigint | null
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
    employee_id: bigint
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
      employee_id: bigint
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
    readonly employee_id: FieldRef<"faculty", 'BigInt'>
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
    employee_id: bigint | null
    contact_num: number | null
    user_id: number | null
  }

  export type LibrarianMinAggregateOutputType = {
    employee_id: bigint | null
    position: string | null
    contact_num: number | null
    user_id: number | null
  }

  export type LibrarianMaxAggregateOutputType = {
    employee_id: bigint | null
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
    employee_id: bigint
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
    activity_logs?: boolean | librarian$activity_logsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
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
    activity_logs?: boolean | librarian$activity_logsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
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
      activity_logs: Prisma.$activity_logsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      employee_id: bigint
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
    activity_logs<T extends librarian$activity_logsArgs<ExtArgs> = {}>(args?: Subset<T, librarian$activity_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the librarian model
   */
  interface librarianFieldRefs {
    readonly employee_id: FieldRef<"librarian", 'BigInt'>
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
    user_activity_logs?: boolean | papers$user_activity_logsArgs<ExtArgs>
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
    user_activity_logs?: boolean | papers$user_activity_logsArgs<ExtArgs>
    _count?: boolean | PapersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type papersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type papersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $papersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "papers"
    objects: {
      paper_metadata: Prisma.$paper_metadataPayload<ExtArgs>[]
      user_bookmarks: Prisma.$user_bookmarksPayload<ExtArgs>[]
      user_activity_logs: Prisma.$user_activity_logsPayload<ExtArgs>[]
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
    user_activity_logs<T extends papers$user_activity_logsArgs<ExtArgs> = {}>(args?: Subset<T, papers$user_activity_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * papers.user_activity_logs
   */
  export type papers$user_activity_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    where?: user_activity_logsWhereInput
    orderBy?: user_activity_logsOrderByWithRelationInput | user_activity_logsOrderByWithRelationInput[]
    cursor?: user_activity_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_activity_logsScalarFieldEnum | User_activity_logsScalarFieldEnum[]
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
    employee_id: bigint | null
    user_id: number | null
  }

  export type Activity_logsMinAggregateOutputType = {
    name: string | null
    activity: string | null
    created_at: Date | null
    act_id: number | null
    activity_type: $Enums.activity_type | null
    ip_address: string | null
    status: string | null
    user_agent: string | null
    employee_id: bigint | null
    user_id: number | null
  }

  export type Activity_logsMaxAggregateOutputType = {
    name: string | null
    activity: string | null
    created_at: Date | null
    act_id: number | null
    activity_type: $Enums.activity_type | null
    ip_address: string | null
    status: string | null
    user_agent: string | null
    employee_id: bigint | null
    user_id: number | null
  }

  export type Activity_logsCountAggregateOutputType = {
    name: number
    activity: number
    created_at: number
    act_id: number
    activity_type: number
    ip_address: number
    status: number
    user_agent: number
    employee_id: number
    user_id: number
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
    name?: true
    activity?: true
    created_at?: true
    act_id?: true
    activity_type?: true
    ip_address?: true
    status?: true
    user_agent?: true
    employee_id?: true
    user_id?: true
  }

  export type Activity_logsMaxAggregateInputType = {
    name?: true
    activity?: true
    created_at?: true
    act_id?: true
    activity_type?: true
    ip_address?: true
    status?: true
    user_agent?: true
    employee_id?: true
    user_id?: true
  }

  export type Activity_logsCountAggregateInputType = {
    name?: true
    activity?: true
    created_at?: true
    act_id?: true
    activity_type?: true
    ip_address?: true
    status?: true
    user_agent?: true
    employee_id?: true
    user_id?: true
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
    name: string
    activity: string
    created_at: Date
    act_id: number
    activity_type: $Enums.activity_type | null
    ip_address: string | null
    status: string | null
    user_agent: string | null
    employee_id: bigint
    user_id: number
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
    name?: boolean
    activity?: boolean
    created_at?: boolean
    act_id?: boolean
    activity_type?: boolean
    ip_address?: boolean
    status?: boolean
    user_agent?: boolean
    employee_id?: boolean
    user_id?: boolean
    librarian?: boolean | librarianDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity_logs"]>

  export type activity_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    activity?: boolean
    created_at?: boolean
    act_id?: boolean
    activity_type?: boolean
    ip_address?: boolean
    status?: boolean
    user_agent?: boolean
    employee_id?: boolean
    user_id?: boolean
    librarian?: boolean | librarianDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity_logs"]>

  export type activity_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    activity?: boolean
    created_at?: boolean
    act_id?: boolean
    activity_type?: boolean
    ip_address?: boolean
    status?: boolean
    user_agent?: boolean
    employee_id?: boolean
    user_id?: boolean
    librarian?: boolean | librarianDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity_logs"]>

  export type activity_logsSelectScalar = {
    name?: boolean
    activity?: boolean
    created_at?: boolean
    act_id?: boolean
    activity_type?: boolean
    ip_address?: boolean
    status?: boolean
    user_agent?: boolean
    employee_id?: boolean
    user_id?: boolean
  }

  export type activity_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"name" | "activity" | "created_at" | "act_id" | "activity_type" | "ip_address" | "status" | "user_agent" | "employee_id" | "user_id", ExtArgs["result"]["activity_logs"]>
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
      name: string
      activity: string
      created_at: Date
      act_id: number
      activity_type: $Enums.activity_type | null
      ip_address: string | null
      status: string | null
      user_agent: string | null
      employee_id: bigint
      user_id: number
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
     * // Only select the `name`
     * const activity_logsWithNameOnly = await prisma.activity_logs.findMany({ select: { name: true } })
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
     * // Create many Activity_logs and only return the `name`
     * const activity_logsWithNameOnly = await prisma.activity_logs.createManyAndReturn({
     *   select: { name: true },
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
     * // Update zero or more Activity_logs and only return the `name`
     * const activity_logsWithNameOnly = await prisma.activity_logs.updateManyAndReturn({
     *   select: { name: true },
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
    readonly name: FieldRef<"activity_logs", 'String'>
    readonly activity: FieldRef<"activity_logs", 'String'>
    readonly created_at: FieldRef<"activity_logs", 'DateTime'>
    readonly act_id: FieldRef<"activity_logs", 'Int'>
    readonly activity_type: FieldRef<"activity_logs", 'activity_type'>
    readonly ip_address: FieldRef<"activity_logs", 'String'>
    readonly status: FieldRef<"activity_logs", 'String'>
    readonly user_agent: FieldRef<"activity_logs", 'String'>
    readonly employee_id: FieldRef<"activity_logs", 'BigInt'>
    readonly user_id: FieldRef<"activity_logs", 'Int'>
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
   * Model user_activity_logs
   */

  export type AggregateUser_activity_logs = {
    _count: User_activity_logsCountAggregateOutputType | null
    _avg: User_activity_logsAvgAggregateOutputType | null
    _sum: User_activity_logsSumAggregateOutputType | null
    _min: User_activity_logsMinAggregateOutputType | null
    _max: User_activity_logsMaxAggregateOutputType | null
  }

  export type User_activity_logsAvgAggregateOutputType = {
    activity_id: number | null
    user_id: number | null
    paper_id: number | null
    employee_id: number | null
    student_num: number | null
  }

  export type User_activity_logsSumAggregateOutputType = {
    activity_id: number | null
    user_id: number | null
    paper_id: number | null
    employee_id: bigint | null
    student_num: bigint | null
  }

  export type User_activity_logsMinAggregateOutputType = {
    activity_id: number | null
    user_id: number | null
    paper_id: number | null
    name: string | null
    activity: string | null
    created_at: Date | null
    activity_type: $Enums.activity_type | null
    status: string | null
    user_agent: string | null
    employee_id: bigint | null
    student_num: bigint | null
  }

  export type User_activity_logsMaxAggregateOutputType = {
    activity_id: number | null
    user_id: number | null
    paper_id: number | null
    name: string | null
    activity: string | null
    created_at: Date | null
    activity_type: $Enums.activity_type | null
    status: string | null
    user_agent: string | null
    employee_id: bigint | null
    student_num: bigint | null
  }

  export type User_activity_logsCountAggregateOutputType = {
    activity_id: number
    user_id: number
    paper_id: number
    name: number
    activity: number
    created_at: number
    activity_type: number
    status: number
    user_agent: number
    employee_id: number
    student_num: number
    _all: number
  }


  export type User_activity_logsAvgAggregateInputType = {
    activity_id?: true
    user_id?: true
    paper_id?: true
    employee_id?: true
    student_num?: true
  }

  export type User_activity_logsSumAggregateInputType = {
    activity_id?: true
    user_id?: true
    paper_id?: true
    employee_id?: true
    student_num?: true
  }

  export type User_activity_logsMinAggregateInputType = {
    activity_id?: true
    user_id?: true
    paper_id?: true
    name?: true
    activity?: true
    created_at?: true
    activity_type?: true
    status?: true
    user_agent?: true
    employee_id?: true
    student_num?: true
  }

  export type User_activity_logsMaxAggregateInputType = {
    activity_id?: true
    user_id?: true
    paper_id?: true
    name?: true
    activity?: true
    created_at?: true
    activity_type?: true
    status?: true
    user_agent?: true
    employee_id?: true
    student_num?: true
  }

  export type User_activity_logsCountAggregateInputType = {
    activity_id?: true
    user_id?: true
    paper_id?: true
    name?: true
    activity?: true
    created_at?: true
    activity_type?: true
    status?: true
    user_agent?: true
    employee_id?: true
    student_num?: true
    _all?: true
  }

  export type User_activity_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_activity_logs to aggregate.
     */
    where?: user_activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_activity_logs to fetch.
     */
    orderBy?: user_activity_logsOrderByWithRelationInput | user_activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_activity_logs
    **/
    _count?: true | User_activity_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_activity_logsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_activity_logsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_activity_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_activity_logsMaxAggregateInputType
  }

  export type GetUser_activity_logsAggregateType<T extends User_activity_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_activity_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_activity_logs[P]>
      : GetScalarType<T[P], AggregateUser_activity_logs[P]>
  }




  export type user_activity_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_activity_logsWhereInput
    orderBy?: user_activity_logsOrderByWithAggregationInput | user_activity_logsOrderByWithAggregationInput[]
    by: User_activity_logsScalarFieldEnum[] | User_activity_logsScalarFieldEnum
    having?: user_activity_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_activity_logsCountAggregateInputType | true
    _avg?: User_activity_logsAvgAggregateInputType
    _sum?: User_activity_logsSumAggregateInputType
    _min?: User_activity_logsMinAggregateInputType
    _max?: User_activity_logsMaxAggregateInputType
  }

  export type User_activity_logsGroupByOutputType = {
    activity_id: number
    user_id: number
    paper_id: number
    name: string
    activity: string
    created_at: Date | null
    activity_type: $Enums.activity_type | null
    status: string | null
    user_agent: string | null
    employee_id: bigint
    student_num: bigint
    _count: User_activity_logsCountAggregateOutputType | null
    _avg: User_activity_logsAvgAggregateOutputType | null
    _sum: User_activity_logsSumAggregateOutputType | null
    _min: User_activity_logsMinAggregateOutputType | null
    _max: User_activity_logsMaxAggregateOutputType | null
  }

  type GetUser_activity_logsGroupByPayload<T extends user_activity_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_activity_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_activity_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_activity_logsGroupByOutputType[P]>
            : GetScalarType<T[P], User_activity_logsGroupByOutputType[P]>
        }
      >
    >


  export type user_activity_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    activity_id?: boolean
    user_id?: boolean
    paper_id?: boolean
    name?: boolean
    activity?: boolean
    created_at?: boolean
    activity_type?: boolean
    status?: boolean
    user_agent?: boolean
    employee_id?: boolean
    student_num?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_activity_logs"]>

  export type user_activity_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    activity_id?: boolean
    user_id?: boolean
    paper_id?: boolean
    name?: boolean
    activity?: boolean
    created_at?: boolean
    activity_type?: boolean
    status?: boolean
    user_agent?: boolean
    employee_id?: boolean
    student_num?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_activity_logs"]>

  export type user_activity_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    activity_id?: boolean
    user_id?: boolean
    paper_id?: boolean
    name?: boolean
    activity?: boolean
    created_at?: boolean
    activity_type?: boolean
    status?: boolean
    user_agent?: boolean
    employee_id?: boolean
    student_num?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_activity_logs"]>

  export type user_activity_logsSelectScalar = {
    activity_id?: boolean
    user_id?: boolean
    paper_id?: boolean
    name?: boolean
    activity?: boolean
    created_at?: boolean
    activity_type?: boolean
    status?: boolean
    user_agent?: boolean
    employee_id?: boolean
    student_num?: boolean
  }

  export type user_activity_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"activity_id" | "user_id" | "paper_id" | "name" | "activity" | "created_at" | "activity_type" | "status" | "user_agent" | "employee_id" | "student_num", ExtArgs["result"]["user_activity_logs"]>
  export type user_activity_logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }
  export type user_activity_logsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }
  export type user_activity_logsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    papers?: boolean | papersDefaultArgs<ExtArgs>
  }

  export type $user_activity_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_activity_logs"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      papers: Prisma.$papersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      activity_id: number
      user_id: number
      paper_id: number
      name: string
      activity: string
      created_at: Date | null
      activity_type: $Enums.activity_type | null
      status: string | null
      user_agent: string | null
      employee_id: bigint
      student_num: bigint
    }, ExtArgs["result"]["user_activity_logs"]>
    composites: {}
  }

  type user_activity_logsGetPayload<S extends boolean | null | undefined | user_activity_logsDefaultArgs> = $Result.GetResult<Prisma.$user_activity_logsPayload, S>

  type user_activity_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_activity_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_activity_logsCountAggregateInputType | true
    }

  export interface user_activity_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_activity_logs'], meta: { name: 'user_activity_logs' } }
    /**
     * Find zero or one User_activity_logs that matches the filter.
     * @param {user_activity_logsFindUniqueArgs} args - Arguments to find a User_activity_logs
     * @example
     * // Get one User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_activity_logsFindUniqueArgs>(args: SelectSubset<T, user_activity_logsFindUniqueArgs<ExtArgs>>): Prisma__user_activity_logsClient<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_activity_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_activity_logsFindUniqueOrThrowArgs} args - Arguments to find a User_activity_logs
     * @example
     * // Get one User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_activity_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, user_activity_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_activity_logsClient<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_activity_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_activity_logsFindFirstArgs} args - Arguments to find a User_activity_logs
     * @example
     * // Get one User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_activity_logsFindFirstArgs>(args?: SelectSubset<T, user_activity_logsFindFirstArgs<ExtArgs>>): Prisma__user_activity_logsClient<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_activity_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_activity_logsFindFirstOrThrowArgs} args - Arguments to find a User_activity_logs
     * @example
     * // Get one User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_activity_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, user_activity_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_activity_logsClient<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_activity_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_activity_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.findMany()
     * 
     * // Get first 10 User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.findMany({ take: 10 })
     * 
     * // Only select the `activity_id`
     * const user_activity_logsWithActivity_idOnly = await prisma.user_activity_logs.findMany({ select: { activity_id: true } })
     * 
     */
    findMany<T extends user_activity_logsFindManyArgs>(args?: SelectSubset<T, user_activity_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_activity_logs.
     * @param {user_activity_logsCreateArgs} args - Arguments to create a User_activity_logs.
     * @example
     * // Create one User_activity_logs
     * const User_activity_logs = await prisma.user_activity_logs.create({
     *   data: {
     *     // ... data to create a User_activity_logs
     *   }
     * })
     * 
     */
    create<T extends user_activity_logsCreateArgs>(args: SelectSubset<T, user_activity_logsCreateArgs<ExtArgs>>): Prisma__user_activity_logsClient<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_activity_logs.
     * @param {user_activity_logsCreateManyArgs} args - Arguments to create many User_activity_logs.
     * @example
     * // Create many User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_activity_logsCreateManyArgs>(args?: SelectSubset<T, user_activity_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_activity_logs and returns the data saved in the database.
     * @param {user_activity_logsCreateManyAndReturnArgs} args - Arguments to create many User_activity_logs.
     * @example
     * // Create many User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_activity_logs and only return the `activity_id`
     * const user_activity_logsWithActivity_idOnly = await prisma.user_activity_logs.createManyAndReturn({
     *   select: { activity_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_activity_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, user_activity_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_activity_logs.
     * @param {user_activity_logsDeleteArgs} args - Arguments to delete one User_activity_logs.
     * @example
     * // Delete one User_activity_logs
     * const User_activity_logs = await prisma.user_activity_logs.delete({
     *   where: {
     *     // ... filter to delete one User_activity_logs
     *   }
     * })
     * 
     */
    delete<T extends user_activity_logsDeleteArgs>(args: SelectSubset<T, user_activity_logsDeleteArgs<ExtArgs>>): Prisma__user_activity_logsClient<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_activity_logs.
     * @param {user_activity_logsUpdateArgs} args - Arguments to update one User_activity_logs.
     * @example
     * // Update one User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_activity_logsUpdateArgs>(args: SelectSubset<T, user_activity_logsUpdateArgs<ExtArgs>>): Prisma__user_activity_logsClient<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_activity_logs.
     * @param {user_activity_logsDeleteManyArgs} args - Arguments to filter User_activity_logs to delete.
     * @example
     * // Delete a few User_activity_logs
     * const { count } = await prisma.user_activity_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_activity_logsDeleteManyArgs>(args?: SelectSubset<T, user_activity_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_activity_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_activity_logsUpdateManyArgs>(args: SelectSubset<T, user_activity_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_activity_logs and returns the data updated in the database.
     * @param {user_activity_logsUpdateManyAndReturnArgs} args - Arguments to update many User_activity_logs.
     * @example
     * // Update many User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_activity_logs and only return the `activity_id`
     * const user_activity_logsWithActivity_idOnly = await prisma.user_activity_logs.updateManyAndReturn({
     *   select: { activity_id: true },
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
    updateManyAndReturn<T extends user_activity_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, user_activity_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_activity_logs.
     * @param {user_activity_logsUpsertArgs} args - Arguments to update or create a User_activity_logs.
     * @example
     * // Update or create a User_activity_logs
     * const user_activity_logs = await prisma.user_activity_logs.upsert({
     *   create: {
     *     // ... data to create a User_activity_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_activity_logs we want to update
     *   }
     * })
     */
    upsert<T extends user_activity_logsUpsertArgs>(args: SelectSubset<T, user_activity_logsUpsertArgs<ExtArgs>>): Prisma__user_activity_logsClient<$Result.GetResult<Prisma.$user_activity_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_activity_logsCountArgs} args - Arguments to filter User_activity_logs to count.
     * @example
     * // Count the number of User_activity_logs
     * const count = await prisma.user_activity_logs.count({
     *   where: {
     *     // ... the filter for the User_activity_logs we want to count
     *   }
     * })
    **/
    count<T extends user_activity_logsCountArgs>(
      args?: Subset<T, user_activity_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_activity_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_activity_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends User_activity_logsAggregateArgs>(args: Subset<T, User_activity_logsAggregateArgs>): Prisma.PrismaPromise<GetUser_activity_logsAggregateType<T>>

    /**
     * Group by User_activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_activity_logsGroupByArgs} args - Group by arguments.
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
      T extends user_activity_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_activity_logsGroupByArgs['orderBy'] }
        : { orderBy?: user_activity_logsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, user_activity_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_activity_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_activity_logs model
   */
  readonly fields: user_activity_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_activity_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_activity_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the user_activity_logs model
   */
  interface user_activity_logsFieldRefs {
    readonly activity_id: FieldRef<"user_activity_logs", 'Int'>
    readonly user_id: FieldRef<"user_activity_logs", 'Int'>
    readonly paper_id: FieldRef<"user_activity_logs", 'Int'>
    readonly name: FieldRef<"user_activity_logs", 'String'>
    readonly activity: FieldRef<"user_activity_logs", 'String'>
    readonly created_at: FieldRef<"user_activity_logs", 'DateTime'>
    readonly activity_type: FieldRef<"user_activity_logs", 'activity_type'>
    readonly status: FieldRef<"user_activity_logs", 'String'>
    readonly user_agent: FieldRef<"user_activity_logs", 'String'>
    readonly employee_id: FieldRef<"user_activity_logs", 'BigInt'>
    readonly student_num: FieldRef<"user_activity_logs", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * user_activity_logs findUnique
   */
  export type user_activity_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which user_activity_logs to fetch.
     */
    where: user_activity_logsWhereUniqueInput
  }

  /**
   * user_activity_logs findUniqueOrThrow
   */
  export type user_activity_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which user_activity_logs to fetch.
     */
    where: user_activity_logsWhereUniqueInput
  }

  /**
   * user_activity_logs findFirst
   */
  export type user_activity_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which user_activity_logs to fetch.
     */
    where?: user_activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_activity_logs to fetch.
     */
    orderBy?: user_activity_logsOrderByWithRelationInput | user_activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_activity_logs.
     */
    cursor?: user_activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_activity_logs.
     */
    distinct?: User_activity_logsScalarFieldEnum | User_activity_logsScalarFieldEnum[]
  }

  /**
   * user_activity_logs findFirstOrThrow
   */
  export type user_activity_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which user_activity_logs to fetch.
     */
    where?: user_activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_activity_logs to fetch.
     */
    orderBy?: user_activity_logsOrderByWithRelationInput | user_activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_activity_logs.
     */
    cursor?: user_activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_activity_logs.
     */
    distinct?: User_activity_logsScalarFieldEnum | User_activity_logsScalarFieldEnum[]
  }

  /**
   * user_activity_logs findMany
   */
  export type user_activity_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which user_activity_logs to fetch.
     */
    where?: user_activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_activity_logs to fetch.
     */
    orderBy?: user_activity_logsOrderByWithRelationInput | user_activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_activity_logs.
     */
    cursor?: user_activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_activity_logs.
     */
    skip?: number
    distinct?: User_activity_logsScalarFieldEnum | User_activity_logsScalarFieldEnum[]
  }

  /**
   * user_activity_logs create
   */
  export type user_activity_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    /**
     * The data needed to create a user_activity_logs.
     */
    data: XOR<user_activity_logsCreateInput, user_activity_logsUncheckedCreateInput>
  }

  /**
   * user_activity_logs createMany
   */
  export type user_activity_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_activity_logs.
     */
    data: user_activity_logsCreateManyInput | user_activity_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_activity_logs createManyAndReturn
   */
  export type user_activity_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * The data used to create many user_activity_logs.
     */
    data: user_activity_logsCreateManyInput | user_activity_logsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_activity_logs update
   */
  export type user_activity_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    /**
     * The data needed to update a user_activity_logs.
     */
    data: XOR<user_activity_logsUpdateInput, user_activity_logsUncheckedUpdateInput>
    /**
     * Choose, which user_activity_logs to update.
     */
    where: user_activity_logsWhereUniqueInput
  }

  /**
   * user_activity_logs updateMany
   */
  export type user_activity_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_activity_logs.
     */
    data: XOR<user_activity_logsUpdateManyMutationInput, user_activity_logsUncheckedUpdateManyInput>
    /**
     * Filter which user_activity_logs to update
     */
    where?: user_activity_logsWhereInput
    /**
     * Limit how many user_activity_logs to update.
     */
    limit?: number
  }

  /**
   * user_activity_logs updateManyAndReturn
   */
  export type user_activity_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * The data used to update user_activity_logs.
     */
    data: XOR<user_activity_logsUpdateManyMutationInput, user_activity_logsUncheckedUpdateManyInput>
    /**
     * Filter which user_activity_logs to update
     */
    where?: user_activity_logsWhereInput
    /**
     * Limit how many user_activity_logs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_activity_logs upsert
   */
  export type user_activity_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    /**
     * The filter to search for the user_activity_logs to update in case it exists.
     */
    where: user_activity_logsWhereUniqueInput
    /**
     * In case the user_activity_logs found by the `where` argument doesn't exist, create a new user_activity_logs with this data.
     */
    create: XOR<user_activity_logsCreateInput, user_activity_logsUncheckedCreateInput>
    /**
     * In case the user_activity_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_activity_logsUpdateInput, user_activity_logsUncheckedUpdateInput>
  }

  /**
   * user_activity_logs delete
   */
  export type user_activity_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
    /**
     * Filter which user_activity_logs to delete.
     */
    where: user_activity_logsWhereUniqueInput
  }

  /**
   * user_activity_logs deleteMany
   */
  export type user_activity_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_activity_logs to delete
     */
    where?: user_activity_logsWhereInput
    /**
     * Limit how many user_activity_logs to delete.
     */
    limit?: number
  }

  /**
   * user_activity_logs without action
   */
  export type user_activity_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_activity_logs
     */
    select?: user_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_activity_logs
     */
    omit?: user_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_activity_logsInclude<ExtArgs> | null
  }


  /**
   * Model backup_jobs
   */

  export type AggregateBackup_jobs = {
    _count: Backup_jobsCountAggregateOutputType | null
    _avg: Backup_jobsAvgAggregateOutputType | null
    _sum: Backup_jobsSumAggregateOutputType | null
    _min: Backup_jobsMinAggregateOutputType | null
    _max: Backup_jobsMaxAggregateOutputType | null
  }

  export type Backup_jobsAvgAggregateOutputType = {
    created_by: number | null
    file_count: number | null
  }

  export type Backup_jobsSumAggregateOutputType = {
    created_by: number | null
    file_count: number | null
  }

  export type Backup_jobsMinAggregateOutputType = {
    id: string | null
    type: string | null
    status: string | null
    created_by: number | null
    created_at: Date | null
    completed_at: Date | null
    file_count: number | null
    total_size: string | null
    download_url: string | null
    error_message: string | null
  }

  export type Backup_jobsMaxAggregateOutputType = {
    id: string | null
    type: string | null
    status: string | null
    created_by: number | null
    created_at: Date | null
    completed_at: Date | null
    file_count: number | null
    total_size: string | null
    download_url: string | null
    error_message: string | null
  }

  export type Backup_jobsCountAggregateOutputType = {
    id: number
    type: number
    status: number
    created_by: number
    created_at: number
    completed_at: number
    file_count: number
    total_size: number
    download_url: number
    error_message: number
    _all: number
  }


  export type Backup_jobsAvgAggregateInputType = {
    created_by?: true
    file_count?: true
  }

  export type Backup_jobsSumAggregateInputType = {
    created_by?: true
    file_count?: true
  }

  export type Backup_jobsMinAggregateInputType = {
    id?: true
    type?: true
    status?: true
    created_by?: true
    created_at?: true
    completed_at?: true
    file_count?: true
    total_size?: true
    download_url?: true
    error_message?: true
  }

  export type Backup_jobsMaxAggregateInputType = {
    id?: true
    type?: true
    status?: true
    created_by?: true
    created_at?: true
    completed_at?: true
    file_count?: true
    total_size?: true
    download_url?: true
    error_message?: true
  }

  export type Backup_jobsCountAggregateInputType = {
    id?: true
    type?: true
    status?: true
    created_by?: true
    created_at?: true
    completed_at?: true
    file_count?: true
    total_size?: true
    download_url?: true
    error_message?: true
    _all?: true
  }

  export type Backup_jobsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which backup_jobs to aggregate.
     */
    where?: backup_jobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backup_jobs to fetch.
     */
    orderBy?: backup_jobsOrderByWithRelationInput | backup_jobsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: backup_jobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backup_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backup_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned backup_jobs
    **/
    _count?: true | Backup_jobsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Backup_jobsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Backup_jobsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Backup_jobsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Backup_jobsMaxAggregateInputType
  }

  export type GetBackup_jobsAggregateType<T extends Backup_jobsAggregateArgs> = {
        [P in keyof T & keyof AggregateBackup_jobs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackup_jobs[P]>
      : GetScalarType<T[P], AggregateBackup_jobs[P]>
  }




  export type backup_jobsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: backup_jobsWhereInput
    orderBy?: backup_jobsOrderByWithAggregationInput | backup_jobsOrderByWithAggregationInput[]
    by: Backup_jobsScalarFieldEnum[] | Backup_jobsScalarFieldEnum
    having?: backup_jobsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Backup_jobsCountAggregateInputType | true
    _avg?: Backup_jobsAvgAggregateInputType
    _sum?: Backup_jobsSumAggregateInputType
    _min?: Backup_jobsMinAggregateInputType
    _max?: Backup_jobsMaxAggregateInputType
  }

  export type Backup_jobsGroupByOutputType = {
    id: string
    type: string
    status: string
    created_by: number
    created_at: Date
    completed_at: Date | null
    file_count: number
    total_size: string
    download_url: string | null
    error_message: string | null
    _count: Backup_jobsCountAggregateOutputType | null
    _avg: Backup_jobsAvgAggregateOutputType | null
    _sum: Backup_jobsSumAggregateOutputType | null
    _min: Backup_jobsMinAggregateOutputType | null
    _max: Backup_jobsMaxAggregateOutputType | null
  }

  type GetBackup_jobsGroupByPayload<T extends backup_jobsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Backup_jobsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Backup_jobsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Backup_jobsGroupByOutputType[P]>
            : GetScalarType<T[P], Backup_jobsGroupByOutputType[P]>
        }
      >
    >


  export type backup_jobsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    completed_at?: boolean
    file_count?: boolean
    total_size?: boolean
    download_url?: boolean
    error_message?: boolean
    creator?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backup_jobs"]>

  export type backup_jobsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    completed_at?: boolean
    file_count?: boolean
    total_size?: boolean
    download_url?: boolean
    error_message?: boolean
    creator?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backup_jobs"]>

  export type backup_jobsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    completed_at?: boolean
    file_count?: boolean
    total_size?: boolean
    download_url?: boolean
    error_message?: boolean
    creator?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backup_jobs"]>

  export type backup_jobsSelectScalar = {
    id?: boolean
    type?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    completed_at?: boolean
    file_count?: boolean
    total_size?: boolean
    download_url?: boolean
    error_message?: boolean
  }

  export type backup_jobsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "status" | "created_by" | "created_at" | "completed_at" | "file_count" | "total_size" | "download_url" | "error_message", ExtArgs["result"]["backup_jobs"]>
  export type backup_jobsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type backup_jobsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type backup_jobsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $backup_jobsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "backup_jobs"
    objects: {
      creator: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      status: string
      created_by: number
      created_at: Date
      completed_at: Date | null
      file_count: number
      total_size: string
      download_url: string | null
      error_message: string | null
    }, ExtArgs["result"]["backup_jobs"]>
    composites: {}
  }

  type backup_jobsGetPayload<S extends boolean | null | undefined | backup_jobsDefaultArgs> = $Result.GetResult<Prisma.$backup_jobsPayload, S>

  type backup_jobsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<backup_jobsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Backup_jobsCountAggregateInputType | true
    }

  export interface backup_jobsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['backup_jobs'], meta: { name: 'backup_jobs' } }
    /**
     * Find zero or one Backup_jobs that matches the filter.
     * @param {backup_jobsFindUniqueArgs} args - Arguments to find a Backup_jobs
     * @example
     * // Get one Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends backup_jobsFindUniqueArgs>(args: SelectSubset<T, backup_jobsFindUniqueArgs<ExtArgs>>): Prisma__backup_jobsClient<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Backup_jobs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {backup_jobsFindUniqueOrThrowArgs} args - Arguments to find a Backup_jobs
     * @example
     * // Get one Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends backup_jobsFindUniqueOrThrowArgs>(args: SelectSubset<T, backup_jobsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__backup_jobsClient<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Backup_jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_jobsFindFirstArgs} args - Arguments to find a Backup_jobs
     * @example
     * // Get one Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends backup_jobsFindFirstArgs>(args?: SelectSubset<T, backup_jobsFindFirstArgs<ExtArgs>>): Prisma__backup_jobsClient<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Backup_jobs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_jobsFindFirstOrThrowArgs} args - Arguments to find a Backup_jobs
     * @example
     * // Get one Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends backup_jobsFindFirstOrThrowArgs>(args?: SelectSubset<T, backup_jobsFindFirstOrThrowArgs<ExtArgs>>): Prisma__backup_jobsClient<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Backup_jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_jobsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.findMany()
     * 
     * // Get first 10 Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backup_jobsWithIdOnly = await prisma.backup_jobs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends backup_jobsFindManyArgs>(args?: SelectSubset<T, backup_jobsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Backup_jobs.
     * @param {backup_jobsCreateArgs} args - Arguments to create a Backup_jobs.
     * @example
     * // Create one Backup_jobs
     * const Backup_jobs = await prisma.backup_jobs.create({
     *   data: {
     *     // ... data to create a Backup_jobs
     *   }
     * })
     * 
     */
    create<T extends backup_jobsCreateArgs>(args: SelectSubset<T, backup_jobsCreateArgs<ExtArgs>>): Prisma__backup_jobsClient<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Backup_jobs.
     * @param {backup_jobsCreateManyArgs} args - Arguments to create many Backup_jobs.
     * @example
     * // Create many Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends backup_jobsCreateManyArgs>(args?: SelectSubset<T, backup_jobsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Backup_jobs and returns the data saved in the database.
     * @param {backup_jobsCreateManyAndReturnArgs} args - Arguments to create many Backup_jobs.
     * @example
     * // Create many Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Backup_jobs and only return the `id`
     * const backup_jobsWithIdOnly = await prisma.backup_jobs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends backup_jobsCreateManyAndReturnArgs>(args?: SelectSubset<T, backup_jobsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Backup_jobs.
     * @param {backup_jobsDeleteArgs} args - Arguments to delete one Backup_jobs.
     * @example
     * // Delete one Backup_jobs
     * const Backup_jobs = await prisma.backup_jobs.delete({
     *   where: {
     *     // ... filter to delete one Backup_jobs
     *   }
     * })
     * 
     */
    delete<T extends backup_jobsDeleteArgs>(args: SelectSubset<T, backup_jobsDeleteArgs<ExtArgs>>): Prisma__backup_jobsClient<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Backup_jobs.
     * @param {backup_jobsUpdateArgs} args - Arguments to update one Backup_jobs.
     * @example
     * // Update one Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends backup_jobsUpdateArgs>(args: SelectSubset<T, backup_jobsUpdateArgs<ExtArgs>>): Prisma__backup_jobsClient<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Backup_jobs.
     * @param {backup_jobsDeleteManyArgs} args - Arguments to filter Backup_jobs to delete.
     * @example
     * // Delete a few Backup_jobs
     * const { count } = await prisma.backup_jobs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends backup_jobsDeleteManyArgs>(args?: SelectSubset<T, backup_jobsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Backup_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_jobsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends backup_jobsUpdateManyArgs>(args: SelectSubset<T, backup_jobsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Backup_jobs and returns the data updated in the database.
     * @param {backup_jobsUpdateManyAndReturnArgs} args - Arguments to update many Backup_jobs.
     * @example
     * // Update many Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Backup_jobs and only return the `id`
     * const backup_jobsWithIdOnly = await prisma.backup_jobs.updateManyAndReturn({
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
    updateManyAndReturn<T extends backup_jobsUpdateManyAndReturnArgs>(args: SelectSubset<T, backup_jobsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Backup_jobs.
     * @param {backup_jobsUpsertArgs} args - Arguments to update or create a Backup_jobs.
     * @example
     * // Update or create a Backup_jobs
     * const backup_jobs = await prisma.backup_jobs.upsert({
     *   create: {
     *     // ... data to create a Backup_jobs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Backup_jobs we want to update
     *   }
     * })
     */
    upsert<T extends backup_jobsUpsertArgs>(args: SelectSubset<T, backup_jobsUpsertArgs<ExtArgs>>): Prisma__backup_jobsClient<$Result.GetResult<Prisma.$backup_jobsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Backup_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_jobsCountArgs} args - Arguments to filter Backup_jobs to count.
     * @example
     * // Count the number of Backup_jobs
     * const count = await prisma.backup_jobs.count({
     *   where: {
     *     // ... the filter for the Backup_jobs we want to count
     *   }
     * })
    **/
    count<T extends backup_jobsCountArgs>(
      args?: Subset<T, backup_jobsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Backup_jobsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Backup_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Backup_jobsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Backup_jobsAggregateArgs>(args: Subset<T, Backup_jobsAggregateArgs>): Prisma.PrismaPromise<GetBackup_jobsAggregateType<T>>

    /**
     * Group by Backup_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_jobsGroupByArgs} args - Group by arguments.
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
      T extends backup_jobsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: backup_jobsGroupByArgs['orderBy'] }
        : { orderBy?: backup_jobsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, backup_jobsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackup_jobsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the backup_jobs model
   */
  readonly fields: backup_jobsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for backup_jobs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__backup_jobsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the backup_jobs model
   */
  interface backup_jobsFieldRefs {
    readonly id: FieldRef<"backup_jobs", 'String'>
    readonly type: FieldRef<"backup_jobs", 'String'>
    readonly status: FieldRef<"backup_jobs", 'String'>
    readonly created_by: FieldRef<"backup_jobs", 'Int'>
    readonly created_at: FieldRef<"backup_jobs", 'DateTime'>
    readonly completed_at: FieldRef<"backup_jobs", 'DateTime'>
    readonly file_count: FieldRef<"backup_jobs", 'Int'>
    readonly total_size: FieldRef<"backup_jobs", 'String'>
    readonly download_url: FieldRef<"backup_jobs", 'String'>
    readonly error_message: FieldRef<"backup_jobs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * backup_jobs findUnique
   */
  export type backup_jobsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    /**
     * Filter, which backup_jobs to fetch.
     */
    where: backup_jobsWhereUniqueInput
  }

  /**
   * backup_jobs findUniqueOrThrow
   */
  export type backup_jobsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    /**
     * Filter, which backup_jobs to fetch.
     */
    where: backup_jobsWhereUniqueInput
  }

  /**
   * backup_jobs findFirst
   */
  export type backup_jobsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    /**
     * Filter, which backup_jobs to fetch.
     */
    where?: backup_jobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backup_jobs to fetch.
     */
    orderBy?: backup_jobsOrderByWithRelationInput | backup_jobsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for backup_jobs.
     */
    cursor?: backup_jobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backup_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backup_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of backup_jobs.
     */
    distinct?: Backup_jobsScalarFieldEnum | Backup_jobsScalarFieldEnum[]
  }

  /**
   * backup_jobs findFirstOrThrow
   */
  export type backup_jobsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    /**
     * Filter, which backup_jobs to fetch.
     */
    where?: backup_jobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backup_jobs to fetch.
     */
    orderBy?: backup_jobsOrderByWithRelationInput | backup_jobsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for backup_jobs.
     */
    cursor?: backup_jobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backup_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backup_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of backup_jobs.
     */
    distinct?: Backup_jobsScalarFieldEnum | Backup_jobsScalarFieldEnum[]
  }

  /**
   * backup_jobs findMany
   */
  export type backup_jobsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    /**
     * Filter, which backup_jobs to fetch.
     */
    where?: backup_jobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backup_jobs to fetch.
     */
    orderBy?: backup_jobsOrderByWithRelationInput | backup_jobsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing backup_jobs.
     */
    cursor?: backup_jobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backup_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backup_jobs.
     */
    skip?: number
    distinct?: Backup_jobsScalarFieldEnum | Backup_jobsScalarFieldEnum[]
  }

  /**
   * backup_jobs create
   */
  export type backup_jobsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    /**
     * The data needed to create a backup_jobs.
     */
    data: XOR<backup_jobsCreateInput, backup_jobsUncheckedCreateInput>
  }

  /**
   * backup_jobs createMany
   */
  export type backup_jobsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many backup_jobs.
     */
    data: backup_jobsCreateManyInput | backup_jobsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * backup_jobs createManyAndReturn
   */
  export type backup_jobsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * The data used to create many backup_jobs.
     */
    data: backup_jobsCreateManyInput | backup_jobsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * backup_jobs update
   */
  export type backup_jobsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    /**
     * The data needed to update a backup_jobs.
     */
    data: XOR<backup_jobsUpdateInput, backup_jobsUncheckedUpdateInput>
    /**
     * Choose, which backup_jobs to update.
     */
    where: backup_jobsWhereUniqueInput
  }

  /**
   * backup_jobs updateMany
   */
  export type backup_jobsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update backup_jobs.
     */
    data: XOR<backup_jobsUpdateManyMutationInput, backup_jobsUncheckedUpdateManyInput>
    /**
     * Filter which backup_jobs to update
     */
    where?: backup_jobsWhereInput
    /**
     * Limit how many backup_jobs to update.
     */
    limit?: number
  }

  /**
   * backup_jobs updateManyAndReturn
   */
  export type backup_jobsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * The data used to update backup_jobs.
     */
    data: XOR<backup_jobsUpdateManyMutationInput, backup_jobsUncheckedUpdateManyInput>
    /**
     * Filter which backup_jobs to update
     */
    where?: backup_jobsWhereInput
    /**
     * Limit how many backup_jobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * backup_jobs upsert
   */
  export type backup_jobsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    /**
     * The filter to search for the backup_jobs to update in case it exists.
     */
    where: backup_jobsWhereUniqueInput
    /**
     * In case the backup_jobs found by the `where` argument doesn't exist, create a new backup_jobs with this data.
     */
    create: XOR<backup_jobsCreateInput, backup_jobsUncheckedCreateInput>
    /**
     * In case the backup_jobs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<backup_jobsUpdateInput, backup_jobsUncheckedUpdateInput>
  }

  /**
   * backup_jobs delete
   */
  export type backup_jobsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
    /**
     * Filter which backup_jobs to delete.
     */
    where: backup_jobsWhereUniqueInput
  }

  /**
   * backup_jobs deleteMany
   */
  export type backup_jobsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which backup_jobs to delete
     */
    where?: backup_jobsWhereInput
    /**
     * Limit how many backup_jobs to delete.
     */
    limit?: number
  }

  /**
   * backup_jobs without action
   */
  export type backup_jobsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_jobs
     */
    select?: backup_jobsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_jobs
     */
    omit?: backup_jobsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: backup_jobsInclude<ExtArgs> | null
  }


  /**
   * Model backup_settings
   */

  export type AggregateBackup_settings = {
    _count: Backup_settingsCountAggregateOutputType | null
    _avg: Backup_settingsAvgAggregateOutputType | null
    _sum: Backup_settingsSumAggregateOutputType | null
    _min: Backup_settingsMinAggregateOutputType | null
    _max: Backup_settingsMaxAggregateOutputType | null
  }

  export type Backup_settingsAvgAggregateOutputType = {
    retention_days: number | null
  }

  export type Backup_settingsSumAggregateOutputType = {
    retention_days: number | null
  }

  export type Backup_settingsMinAggregateOutputType = {
    id: string | null
    frequency: string | null
    backup_time: string | null
    retention_days: number | null
    auto_delete: boolean | null
    compress_backups: boolean | null
    email_notifications: boolean | null
    notification_email: string | null
    last_cleanup: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Backup_settingsMaxAggregateOutputType = {
    id: string | null
    frequency: string | null
    backup_time: string | null
    retention_days: number | null
    auto_delete: boolean | null
    compress_backups: boolean | null
    email_notifications: boolean | null
    notification_email: string | null
    last_cleanup: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Backup_settingsCountAggregateOutputType = {
    id: number
    frequency: number
    backup_time: number
    retention_days: number
    auto_delete: number
    compress_backups: number
    email_notifications: number
    notification_email: number
    last_cleanup: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Backup_settingsAvgAggregateInputType = {
    retention_days?: true
  }

  export type Backup_settingsSumAggregateInputType = {
    retention_days?: true
  }

  export type Backup_settingsMinAggregateInputType = {
    id?: true
    frequency?: true
    backup_time?: true
    retention_days?: true
    auto_delete?: true
    compress_backups?: true
    email_notifications?: true
    notification_email?: true
    last_cleanup?: true
    created_at?: true
    updated_at?: true
  }

  export type Backup_settingsMaxAggregateInputType = {
    id?: true
    frequency?: true
    backup_time?: true
    retention_days?: true
    auto_delete?: true
    compress_backups?: true
    email_notifications?: true
    notification_email?: true
    last_cleanup?: true
    created_at?: true
    updated_at?: true
  }

  export type Backup_settingsCountAggregateInputType = {
    id?: true
    frequency?: true
    backup_time?: true
    retention_days?: true
    auto_delete?: true
    compress_backups?: true
    email_notifications?: true
    notification_email?: true
    last_cleanup?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Backup_settingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which backup_settings to aggregate.
     */
    where?: backup_settingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backup_settings to fetch.
     */
    orderBy?: backup_settingsOrderByWithRelationInput | backup_settingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: backup_settingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backup_settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backup_settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned backup_settings
    **/
    _count?: true | Backup_settingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Backup_settingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Backup_settingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Backup_settingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Backup_settingsMaxAggregateInputType
  }

  export type GetBackup_settingsAggregateType<T extends Backup_settingsAggregateArgs> = {
        [P in keyof T & keyof AggregateBackup_settings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackup_settings[P]>
      : GetScalarType<T[P], AggregateBackup_settings[P]>
  }




  export type backup_settingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: backup_settingsWhereInput
    orderBy?: backup_settingsOrderByWithAggregationInput | backup_settingsOrderByWithAggregationInput[]
    by: Backup_settingsScalarFieldEnum[] | Backup_settingsScalarFieldEnum
    having?: backup_settingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Backup_settingsCountAggregateInputType | true
    _avg?: Backup_settingsAvgAggregateInputType
    _sum?: Backup_settingsSumAggregateInputType
    _min?: Backup_settingsMinAggregateInputType
    _max?: Backup_settingsMaxAggregateInputType
  }

  export type Backup_settingsGroupByOutputType = {
    id: string
    frequency: string
    backup_time: string
    retention_days: number
    auto_delete: boolean
    compress_backups: boolean
    email_notifications: boolean
    notification_email: string | null
    last_cleanup: Date | null
    created_at: Date
    updated_at: Date
    _count: Backup_settingsCountAggregateOutputType | null
    _avg: Backup_settingsAvgAggregateOutputType | null
    _sum: Backup_settingsSumAggregateOutputType | null
    _min: Backup_settingsMinAggregateOutputType | null
    _max: Backup_settingsMaxAggregateOutputType | null
  }

  type GetBackup_settingsGroupByPayload<T extends backup_settingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Backup_settingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Backup_settingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Backup_settingsGroupByOutputType[P]>
            : GetScalarType<T[P], Backup_settingsGroupByOutputType[P]>
        }
      >
    >


  export type backup_settingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    frequency?: boolean
    backup_time?: boolean
    retention_days?: boolean
    auto_delete?: boolean
    compress_backups?: boolean
    email_notifications?: boolean
    notification_email?: boolean
    last_cleanup?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["backup_settings"]>

  export type backup_settingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    frequency?: boolean
    backup_time?: boolean
    retention_days?: boolean
    auto_delete?: boolean
    compress_backups?: boolean
    email_notifications?: boolean
    notification_email?: boolean
    last_cleanup?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["backup_settings"]>

  export type backup_settingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    frequency?: boolean
    backup_time?: boolean
    retention_days?: boolean
    auto_delete?: boolean
    compress_backups?: boolean
    email_notifications?: boolean
    notification_email?: boolean
    last_cleanup?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["backup_settings"]>

  export type backup_settingsSelectScalar = {
    id?: boolean
    frequency?: boolean
    backup_time?: boolean
    retention_days?: boolean
    auto_delete?: boolean
    compress_backups?: boolean
    email_notifications?: boolean
    notification_email?: boolean
    last_cleanup?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type backup_settingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "frequency" | "backup_time" | "retention_days" | "auto_delete" | "compress_backups" | "email_notifications" | "notification_email" | "last_cleanup" | "created_at" | "updated_at", ExtArgs["result"]["backup_settings"]>

  export type $backup_settingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "backup_settings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      frequency: string
      backup_time: string
      retention_days: number
      auto_delete: boolean
      compress_backups: boolean
      email_notifications: boolean
      notification_email: string | null
      last_cleanup: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["backup_settings"]>
    composites: {}
  }

  type backup_settingsGetPayload<S extends boolean | null | undefined | backup_settingsDefaultArgs> = $Result.GetResult<Prisma.$backup_settingsPayload, S>

  type backup_settingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<backup_settingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Backup_settingsCountAggregateInputType | true
    }

  export interface backup_settingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['backup_settings'], meta: { name: 'backup_settings' } }
    /**
     * Find zero or one Backup_settings that matches the filter.
     * @param {backup_settingsFindUniqueArgs} args - Arguments to find a Backup_settings
     * @example
     * // Get one Backup_settings
     * const backup_settings = await prisma.backup_settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends backup_settingsFindUniqueArgs>(args: SelectSubset<T, backup_settingsFindUniqueArgs<ExtArgs>>): Prisma__backup_settingsClient<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Backup_settings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {backup_settingsFindUniqueOrThrowArgs} args - Arguments to find a Backup_settings
     * @example
     * // Get one Backup_settings
     * const backup_settings = await prisma.backup_settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends backup_settingsFindUniqueOrThrowArgs>(args: SelectSubset<T, backup_settingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__backup_settingsClient<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Backup_settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_settingsFindFirstArgs} args - Arguments to find a Backup_settings
     * @example
     * // Get one Backup_settings
     * const backup_settings = await prisma.backup_settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends backup_settingsFindFirstArgs>(args?: SelectSubset<T, backup_settingsFindFirstArgs<ExtArgs>>): Prisma__backup_settingsClient<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Backup_settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_settingsFindFirstOrThrowArgs} args - Arguments to find a Backup_settings
     * @example
     * // Get one Backup_settings
     * const backup_settings = await prisma.backup_settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends backup_settingsFindFirstOrThrowArgs>(args?: SelectSubset<T, backup_settingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__backup_settingsClient<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Backup_settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_settingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Backup_settings
     * const backup_settings = await prisma.backup_settings.findMany()
     * 
     * // Get first 10 Backup_settings
     * const backup_settings = await prisma.backup_settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backup_settingsWithIdOnly = await prisma.backup_settings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends backup_settingsFindManyArgs>(args?: SelectSubset<T, backup_settingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Backup_settings.
     * @param {backup_settingsCreateArgs} args - Arguments to create a Backup_settings.
     * @example
     * // Create one Backup_settings
     * const Backup_settings = await prisma.backup_settings.create({
     *   data: {
     *     // ... data to create a Backup_settings
     *   }
     * })
     * 
     */
    create<T extends backup_settingsCreateArgs>(args: SelectSubset<T, backup_settingsCreateArgs<ExtArgs>>): Prisma__backup_settingsClient<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Backup_settings.
     * @param {backup_settingsCreateManyArgs} args - Arguments to create many Backup_settings.
     * @example
     * // Create many Backup_settings
     * const backup_settings = await prisma.backup_settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends backup_settingsCreateManyArgs>(args?: SelectSubset<T, backup_settingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Backup_settings and returns the data saved in the database.
     * @param {backup_settingsCreateManyAndReturnArgs} args - Arguments to create many Backup_settings.
     * @example
     * // Create many Backup_settings
     * const backup_settings = await prisma.backup_settings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Backup_settings and only return the `id`
     * const backup_settingsWithIdOnly = await prisma.backup_settings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends backup_settingsCreateManyAndReturnArgs>(args?: SelectSubset<T, backup_settingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Backup_settings.
     * @param {backup_settingsDeleteArgs} args - Arguments to delete one Backup_settings.
     * @example
     * // Delete one Backup_settings
     * const Backup_settings = await prisma.backup_settings.delete({
     *   where: {
     *     // ... filter to delete one Backup_settings
     *   }
     * })
     * 
     */
    delete<T extends backup_settingsDeleteArgs>(args: SelectSubset<T, backup_settingsDeleteArgs<ExtArgs>>): Prisma__backup_settingsClient<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Backup_settings.
     * @param {backup_settingsUpdateArgs} args - Arguments to update one Backup_settings.
     * @example
     * // Update one Backup_settings
     * const backup_settings = await prisma.backup_settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends backup_settingsUpdateArgs>(args: SelectSubset<T, backup_settingsUpdateArgs<ExtArgs>>): Prisma__backup_settingsClient<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Backup_settings.
     * @param {backup_settingsDeleteManyArgs} args - Arguments to filter Backup_settings to delete.
     * @example
     * // Delete a few Backup_settings
     * const { count } = await prisma.backup_settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends backup_settingsDeleteManyArgs>(args?: SelectSubset<T, backup_settingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Backup_settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_settingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Backup_settings
     * const backup_settings = await prisma.backup_settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends backup_settingsUpdateManyArgs>(args: SelectSubset<T, backup_settingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Backup_settings and returns the data updated in the database.
     * @param {backup_settingsUpdateManyAndReturnArgs} args - Arguments to update many Backup_settings.
     * @example
     * // Update many Backup_settings
     * const backup_settings = await prisma.backup_settings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Backup_settings and only return the `id`
     * const backup_settingsWithIdOnly = await prisma.backup_settings.updateManyAndReturn({
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
    updateManyAndReturn<T extends backup_settingsUpdateManyAndReturnArgs>(args: SelectSubset<T, backup_settingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Backup_settings.
     * @param {backup_settingsUpsertArgs} args - Arguments to update or create a Backup_settings.
     * @example
     * // Update or create a Backup_settings
     * const backup_settings = await prisma.backup_settings.upsert({
     *   create: {
     *     // ... data to create a Backup_settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Backup_settings we want to update
     *   }
     * })
     */
    upsert<T extends backup_settingsUpsertArgs>(args: SelectSubset<T, backup_settingsUpsertArgs<ExtArgs>>): Prisma__backup_settingsClient<$Result.GetResult<Prisma.$backup_settingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Backup_settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_settingsCountArgs} args - Arguments to filter Backup_settings to count.
     * @example
     * // Count the number of Backup_settings
     * const count = await prisma.backup_settings.count({
     *   where: {
     *     // ... the filter for the Backup_settings we want to count
     *   }
     * })
    **/
    count<T extends backup_settingsCountArgs>(
      args?: Subset<T, backup_settingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Backup_settingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Backup_settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Backup_settingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Backup_settingsAggregateArgs>(args: Subset<T, Backup_settingsAggregateArgs>): Prisma.PrismaPromise<GetBackup_settingsAggregateType<T>>

    /**
     * Group by Backup_settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {backup_settingsGroupByArgs} args - Group by arguments.
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
      T extends backup_settingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: backup_settingsGroupByArgs['orderBy'] }
        : { orderBy?: backup_settingsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, backup_settingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackup_settingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the backup_settings model
   */
  readonly fields: backup_settingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for backup_settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__backup_settingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the backup_settings model
   */
  interface backup_settingsFieldRefs {
    readonly id: FieldRef<"backup_settings", 'String'>
    readonly frequency: FieldRef<"backup_settings", 'String'>
    readonly backup_time: FieldRef<"backup_settings", 'String'>
    readonly retention_days: FieldRef<"backup_settings", 'Int'>
    readonly auto_delete: FieldRef<"backup_settings", 'Boolean'>
    readonly compress_backups: FieldRef<"backup_settings", 'Boolean'>
    readonly email_notifications: FieldRef<"backup_settings", 'Boolean'>
    readonly notification_email: FieldRef<"backup_settings", 'String'>
    readonly last_cleanup: FieldRef<"backup_settings", 'DateTime'>
    readonly created_at: FieldRef<"backup_settings", 'DateTime'>
    readonly updated_at: FieldRef<"backup_settings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * backup_settings findUnique
   */
  export type backup_settingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * Filter, which backup_settings to fetch.
     */
    where: backup_settingsWhereUniqueInput
  }

  /**
   * backup_settings findUniqueOrThrow
   */
  export type backup_settingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * Filter, which backup_settings to fetch.
     */
    where: backup_settingsWhereUniqueInput
  }

  /**
   * backup_settings findFirst
   */
  export type backup_settingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * Filter, which backup_settings to fetch.
     */
    where?: backup_settingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backup_settings to fetch.
     */
    orderBy?: backup_settingsOrderByWithRelationInput | backup_settingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for backup_settings.
     */
    cursor?: backup_settingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backup_settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backup_settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of backup_settings.
     */
    distinct?: Backup_settingsScalarFieldEnum | Backup_settingsScalarFieldEnum[]
  }

  /**
   * backup_settings findFirstOrThrow
   */
  export type backup_settingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * Filter, which backup_settings to fetch.
     */
    where?: backup_settingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backup_settings to fetch.
     */
    orderBy?: backup_settingsOrderByWithRelationInput | backup_settingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for backup_settings.
     */
    cursor?: backup_settingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backup_settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backup_settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of backup_settings.
     */
    distinct?: Backup_settingsScalarFieldEnum | Backup_settingsScalarFieldEnum[]
  }

  /**
   * backup_settings findMany
   */
  export type backup_settingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * Filter, which backup_settings to fetch.
     */
    where?: backup_settingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of backup_settings to fetch.
     */
    orderBy?: backup_settingsOrderByWithRelationInput | backup_settingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing backup_settings.
     */
    cursor?: backup_settingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` backup_settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` backup_settings.
     */
    skip?: number
    distinct?: Backup_settingsScalarFieldEnum | Backup_settingsScalarFieldEnum[]
  }

  /**
   * backup_settings create
   */
  export type backup_settingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * The data needed to create a backup_settings.
     */
    data: XOR<backup_settingsCreateInput, backup_settingsUncheckedCreateInput>
  }

  /**
   * backup_settings createMany
   */
  export type backup_settingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many backup_settings.
     */
    data: backup_settingsCreateManyInput | backup_settingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * backup_settings createManyAndReturn
   */
  export type backup_settingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * The data used to create many backup_settings.
     */
    data: backup_settingsCreateManyInput | backup_settingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * backup_settings update
   */
  export type backup_settingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * The data needed to update a backup_settings.
     */
    data: XOR<backup_settingsUpdateInput, backup_settingsUncheckedUpdateInput>
    /**
     * Choose, which backup_settings to update.
     */
    where: backup_settingsWhereUniqueInput
  }

  /**
   * backup_settings updateMany
   */
  export type backup_settingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update backup_settings.
     */
    data: XOR<backup_settingsUpdateManyMutationInput, backup_settingsUncheckedUpdateManyInput>
    /**
     * Filter which backup_settings to update
     */
    where?: backup_settingsWhereInput
    /**
     * Limit how many backup_settings to update.
     */
    limit?: number
  }

  /**
   * backup_settings updateManyAndReturn
   */
  export type backup_settingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * The data used to update backup_settings.
     */
    data: XOR<backup_settingsUpdateManyMutationInput, backup_settingsUncheckedUpdateManyInput>
    /**
     * Filter which backup_settings to update
     */
    where?: backup_settingsWhereInput
    /**
     * Limit how many backup_settings to update.
     */
    limit?: number
  }

  /**
   * backup_settings upsert
   */
  export type backup_settingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * The filter to search for the backup_settings to update in case it exists.
     */
    where: backup_settingsWhereUniqueInput
    /**
     * In case the backup_settings found by the `where` argument doesn't exist, create a new backup_settings with this data.
     */
    create: XOR<backup_settingsCreateInput, backup_settingsUncheckedCreateInput>
    /**
     * In case the backup_settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<backup_settingsUpdateInput, backup_settingsUncheckedUpdateInput>
  }

  /**
   * backup_settings delete
   */
  export type backup_settingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
    /**
     * Filter which backup_settings to delete.
     */
    where: backup_settingsWhereUniqueInput
  }

  /**
   * backup_settings deleteMany
   */
  export type backup_settingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which backup_settings to delete
     */
    where?: backup_settingsWhereInput
    /**
     * Limit how many backup_settings to delete.
     */
    limit?: number
  }

  /**
   * backup_settings without action
   */
  export type backup_settingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the backup_settings
     */
    select?: backup_settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the backup_settings
     */
    omit?: backup_settingsOmit<ExtArgs> | null
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
    password: 'password',
    created_at: 'created_at',
    role: 'role'
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


  export const Activity_logsScalarFieldEnum: {
    name: 'name',
    activity: 'activity',
    created_at: 'created_at',
    act_id: 'act_id',
    activity_type: 'activity_type',
    ip_address: 'ip_address',
    status: 'status',
    user_agent: 'user_agent',
    employee_id: 'employee_id',
    user_id: 'user_id'
  };

  export type Activity_logsScalarFieldEnum = (typeof Activity_logsScalarFieldEnum)[keyof typeof Activity_logsScalarFieldEnum]


  export const User_activity_logsScalarFieldEnum: {
    activity_id: 'activity_id',
    user_id: 'user_id',
    paper_id: 'paper_id',
    name: 'name',
    activity: 'activity',
    created_at: 'created_at',
    activity_type: 'activity_type',
    status: 'status',
    user_agent: 'user_agent',
    employee_id: 'employee_id',
    student_num: 'student_num'
  };

  export type User_activity_logsScalarFieldEnum = (typeof User_activity_logsScalarFieldEnum)[keyof typeof User_activity_logsScalarFieldEnum]


  export const Backup_jobsScalarFieldEnum: {
    id: 'id',
    type: 'type',
    status: 'status',
    created_by: 'created_by',
    created_at: 'created_at',
    completed_at: 'completed_at',
    file_count: 'file_count',
    total_size: 'total_size',
    download_url: 'download_url',
    error_message: 'error_message'
  };

  export type Backup_jobsScalarFieldEnum = (typeof Backup_jobsScalarFieldEnum)[keyof typeof Backup_jobsScalarFieldEnum]


  export const Backup_settingsScalarFieldEnum: {
    id: 'id',
    frequency: 'frequency',
    backup_time: 'backup_time',
    retention_days: 'retention_days',
    auto_delete: 'auto_delete',
    compress_backups: 'compress_backups',
    email_notifications: 'email_notifications',
    notification_email: 'notification_email',
    last_cleanup: 'last_cleanup',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Backup_settingsScalarFieldEnum = (typeof Backup_settingsScalarFieldEnum)[keyof typeof Backup_settingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'user_role'
   */
  export type Enumuser_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'user_role'>
    


  /**
   * Reference to a field of type 'user_role[]'
   */
  export type ListEnumuser_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'user_role[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'activity_type'
   */
  export type Enumactivity_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'activity_type'>
    


  /**
   * Reference to a field of type 'activity_type[]'
   */
  export type ListEnumactivity_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'activity_type[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
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
    password?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    role?: Enumuser_roleNullableFilter<"users"> | $Enums.user_role | null
    user_activity_logs?: User_activity_logsListRelationFilter
    activity_logs?: Activity_logsListRelationFilter
    faculty?: XOR<FacultyNullableScalarRelationFilter, facultyWhereInput> | null
    librarian?: XOR<LibrarianNullableScalarRelationFilter, librarianWhereInput> | null
    students?: XOR<StudentsNullableScalarRelationFilter, studentsWhereInput> | null
    user_bookmarks?: User_bookmarksListRelationFilter
    backup_jobs?: Backup_jobsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    user_id?: SortOrder
    first_name?: SortOrderInput | SortOrder
    mid_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    ext_name?: SortOrderInput | SortOrder
    email?: SortOrder
    profile_picture?: SortOrderInput | SortOrder
    password?: SortOrder
    created_at?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    user_activity_logs?: user_activity_logsOrderByRelationAggregateInput
    activity_logs?: activity_logsOrderByRelationAggregateInput
    faculty?: facultyOrderByWithRelationInput
    librarian?: librarianOrderByWithRelationInput
    students?: studentsOrderByWithRelationInput
    user_bookmarks?: user_bookmarksOrderByRelationAggregateInput
    backup_jobs?: backup_jobsOrderByRelationAggregateInput
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
    password?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    role?: Enumuser_roleNullableFilter<"users"> | $Enums.user_role | null
    user_activity_logs?: User_activity_logsListRelationFilter
    activity_logs?: Activity_logsListRelationFilter
    faculty?: XOR<FacultyNullableScalarRelationFilter, facultyWhereInput> | null
    librarian?: XOR<LibrarianNullableScalarRelationFilter, librarianWhereInput> | null
    students?: XOR<StudentsNullableScalarRelationFilter, studentsWhereInput> | null
    user_bookmarks?: User_bookmarksListRelationFilter
    backup_jobs?: Backup_jobsListRelationFilter
  }, "user_id" | "email">

  export type usersOrderByWithAggregationInput = {
    user_id?: SortOrder
    first_name?: SortOrderInput | SortOrder
    mid_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    ext_name?: SortOrderInput | SortOrder
    email?: SortOrder
    profile_picture?: SortOrderInput | SortOrder
    password?: SortOrder
    created_at?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
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
    password?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    role?: Enumuser_roleNullableWithAggregatesFilter<"users"> | $Enums.user_role | null
  }

  export type facultyWhereInput = {
    AND?: facultyWhereInput | facultyWhereInput[]
    OR?: facultyWhereInput[]
    NOT?: facultyWhereInput | facultyWhereInput[]
    employee_id?: BigIntFilter<"faculty"> | bigint | number
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
    employee_id?: bigint | number
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
    employee_id?: BigIntWithAggregatesFilter<"faculty"> | bigint | number
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
    employee_id?: BigIntFilter<"librarian"> | bigint | number
    position?: StringNullableFilter<"librarian"> | string | null
    contact_num?: IntFilter<"librarian"> | number
    user_id?: IntFilter<"librarian"> | number
    activity_logs?: Activity_logsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type librarianOrderByWithRelationInput = {
    employee_id?: SortOrder
    position?: SortOrderInput | SortOrder
    contact_num?: SortOrder
    user_id?: SortOrder
    activity_logs?: activity_logsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
  }

  export type librarianWhereUniqueInput = Prisma.AtLeast<{
    employee_id?: bigint | number
    user_id?: number
    AND?: librarianWhereInput | librarianWhereInput[]
    OR?: librarianWhereInput[]
    NOT?: librarianWhereInput | librarianWhereInput[]
    position?: StringNullableFilter<"librarian"> | string | null
    contact_num?: IntFilter<"librarian"> | number
    activity_logs?: Activity_logsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
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
    employee_id?: BigIntWithAggregatesFilter<"librarian"> | bigint | number
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
    user_activity_logs?: User_activity_logsListRelationFilter
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
    user_activity_logs?: user_activity_logsOrderByRelationAggregateInput
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
    user_activity_logs?: User_activity_logsListRelationFilter
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

  export type activity_logsWhereInput = {
    AND?: activity_logsWhereInput | activity_logsWhereInput[]
    OR?: activity_logsWhereInput[]
    NOT?: activity_logsWhereInput | activity_logsWhereInput[]
    name?: StringFilter<"activity_logs"> | string
    activity?: StringFilter<"activity_logs"> | string
    created_at?: DateTimeFilter<"activity_logs"> | Date | string
    act_id?: IntFilter<"activity_logs"> | number
    activity_type?: Enumactivity_typeNullableFilter<"activity_logs"> | $Enums.activity_type | null
    ip_address?: StringNullableFilter<"activity_logs"> | string | null
    status?: StringNullableFilter<"activity_logs"> | string | null
    user_agent?: StringNullableFilter<"activity_logs"> | string | null
    employee_id?: BigIntFilter<"activity_logs"> | bigint | number
    user_id?: IntFilter<"activity_logs"> | number
    librarian?: XOR<LibrarianScalarRelationFilter, librarianWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type activity_logsOrderByWithRelationInput = {
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    act_id?: SortOrder
    activity_type?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
    librarian?: librarianOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type activity_logsWhereUniqueInput = Prisma.AtLeast<{
    act_id?: number
    AND?: activity_logsWhereInput | activity_logsWhereInput[]
    OR?: activity_logsWhereInput[]
    NOT?: activity_logsWhereInput | activity_logsWhereInput[]
    name?: StringFilter<"activity_logs"> | string
    activity?: StringFilter<"activity_logs"> | string
    created_at?: DateTimeFilter<"activity_logs"> | Date | string
    activity_type?: Enumactivity_typeNullableFilter<"activity_logs"> | $Enums.activity_type | null
    ip_address?: StringNullableFilter<"activity_logs"> | string | null
    status?: StringNullableFilter<"activity_logs"> | string | null
    user_agent?: StringNullableFilter<"activity_logs"> | string | null
    employee_id?: BigIntFilter<"activity_logs"> | bigint | number
    user_id?: IntFilter<"activity_logs"> | number
    librarian?: XOR<LibrarianScalarRelationFilter, librarianWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "act_id">

  export type activity_logsOrderByWithAggregationInput = {
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    act_id?: SortOrder
    activity_type?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
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
    name?: StringWithAggregatesFilter<"activity_logs"> | string
    activity?: StringWithAggregatesFilter<"activity_logs"> | string
    created_at?: DateTimeWithAggregatesFilter<"activity_logs"> | Date | string
    act_id?: IntWithAggregatesFilter<"activity_logs"> | number
    activity_type?: Enumactivity_typeNullableWithAggregatesFilter<"activity_logs"> | $Enums.activity_type | null
    ip_address?: StringNullableWithAggregatesFilter<"activity_logs"> | string | null
    status?: StringNullableWithAggregatesFilter<"activity_logs"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"activity_logs"> | string | null
    employee_id?: BigIntWithAggregatesFilter<"activity_logs"> | bigint | number
    user_id?: IntWithAggregatesFilter<"activity_logs"> | number
  }

  export type user_activity_logsWhereInput = {
    AND?: user_activity_logsWhereInput | user_activity_logsWhereInput[]
    OR?: user_activity_logsWhereInput[]
    NOT?: user_activity_logsWhereInput | user_activity_logsWhereInput[]
    activity_id?: IntFilter<"user_activity_logs"> | number
    user_id?: IntFilter<"user_activity_logs"> | number
    paper_id?: IntFilter<"user_activity_logs"> | number
    name?: StringFilter<"user_activity_logs"> | string
    activity?: StringFilter<"user_activity_logs"> | string
    created_at?: DateTimeNullableFilter<"user_activity_logs"> | Date | string | null
    activity_type?: Enumactivity_typeNullableFilter<"user_activity_logs"> | $Enums.activity_type | null
    status?: StringNullableFilter<"user_activity_logs"> | string | null
    user_agent?: StringNullableFilter<"user_activity_logs"> | string | null
    employee_id?: BigIntFilter<"user_activity_logs"> | bigint | number
    student_num?: BigIntFilter<"user_activity_logs"> | bigint | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
  }

  export type user_activity_logsOrderByWithRelationInput = {
    activity_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrderInput | SortOrder
    activity_type?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    employee_id?: SortOrder
    student_num?: SortOrder
    users?: usersOrderByWithRelationInput
    papers?: papersOrderByWithRelationInput
  }

  export type user_activity_logsWhereUniqueInput = Prisma.AtLeast<{
    activity_id?: number
    AND?: user_activity_logsWhereInput | user_activity_logsWhereInput[]
    OR?: user_activity_logsWhereInput[]
    NOT?: user_activity_logsWhereInput | user_activity_logsWhereInput[]
    user_id?: IntFilter<"user_activity_logs"> | number
    paper_id?: IntFilter<"user_activity_logs"> | number
    name?: StringFilter<"user_activity_logs"> | string
    activity?: StringFilter<"user_activity_logs"> | string
    created_at?: DateTimeNullableFilter<"user_activity_logs"> | Date | string | null
    activity_type?: Enumactivity_typeNullableFilter<"user_activity_logs"> | $Enums.activity_type | null
    status?: StringNullableFilter<"user_activity_logs"> | string | null
    user_agent?: StringNullableFilter<"user_activity_logs"> | string | null
    employee_id?: BigIntFilter<"user_activity_logs"> | bigint | number
    student_num?: BigIntFilter<"user_activity_logs"> | bigint | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    papers?: XOR<PapersScalarRelationFilter, papersWhereInput>
  }, "activity_id">

  export type user_activity_logsOrderByWithAggregationInput = {
    activity_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrderInput | SortOrder
    activity_type?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    employee_id?: SortOrder
    student_num?: SortOrder
    _count?: user_activity_logsCountOrderByAggregateInput
    _avg?: user_activity_logsAvgOrderByAggregateInput
    _max?: user_activity_logsMaxOrderByAggregateInput
    _min?: user_activity_logsMinOrderByAggregateInput
    _sum?: user_activity_logsSumOrderByAggregateInput
  }

  export type user_activity_logsScalarWhereWithAggregatesInput = {
    AND?: user_activity_logsScalarWhereWithAggregatesInput | user_activity_logsScalarWhereWithAggregatesInput[]
    OR?: user_activity_logsScalarWhereWithAggregatesInput[]
    NOT?: user_activity_logsScalarWhereWithAggregatesInput | user_activity_logsScalarWhereWithAggregatesInput[]
    activity_id?: IntWithAggregatesFilter<"user_activity_logs"> | number
    user_id?: IntWithAggregatesFilter<"user_activity_logs"> | number
    paper_id?: IntWithAggregatesFilter<"user_activity_logs"> | number
    name?: StringWithAggregatesFilter<"user_activity_logs"> | string
    activity?: StringWithAggregatesFilter<"user_activity_logs"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"user_activity_logs"> | Date | string | null
    activity_type?: Enumactivity_typeNullableWithAggregatesFilter<"user_activity_logs"> | $Enums.activity_type | null
    status?: StringNullableWithAggregatesFilter<"user_activity_logs"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"user_activity_logs"> | string | null
    employee_id?: BigIntWithAggregatesFilter<"user_activity_logs"> | bigint | number
    student_num?: BigIntWithAggregatesFilter<"user_activity_logs"> | bigint | number
  }

  export type backup_jobsWhereInput = {
    AND?: backup_jobsWhereInput | backup_jobsWhereInput[]
    OR?: backup_jobsWhereInput[]
    NOT?: backup_jobsWhereInput | backup_jobsWhereInput[]
    id?: StringFilter<"backup_jobs"> | string
    type?: StringFilter<"backup_jobs"> | string
    status?: StringFilter<"backup_jobs"> | string
    created_by?: IntFilter<"backup_jobs"> | number
    created_at?: DateTimeFilter<"backup_jobs"> | Date | string
    completed_at?: DateTimeNullableFilter<"backup_jobs"> | Date | string | null
    file_count?: IntFilter<"backup_jobs"> | number
    total_size?: StringFilter<"backup_jobs"> | string
    download_url?: StringNullableFilter<"backup_jobs"> | string | null
    error_message?: StringNullableFilter<"backup_jobs"> | string | null
    creator?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type backup_jobsOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    file_count?: SortOrder
    total_size?: SortOrder
    download_url?: SortOrderInput | SortOrder
    error_message?: SortOrderInput | SortOrder
    creator?: usersOrderByWithRelationInput
  }

  export type backup_jobsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: backup_jobsWhereInput | backup_jobsWhereInput[]
    OR?: backup_jobsWhereInput[]
    NOT?: backup_jobsWhereInput | backup_jobsWhereInput[]
    type?: StringFilter<"backup_jobs"> | string
    status?: StringFilter<"backup_jobs"> | string
    created_by?: IntFilter<"backup_jobs"> | number
    created_at?: DateTimeFilter<"backup_jobs"> | Date | string
    completed_at?: DateTimeNullableFilter<"backup_jobs"> | Date | string | null
    file_count?: IntFilter<"backup_jobs"> | number
    total_size?: StringFilter<"backup_jobs"> | string
    download_url?: StringNullableFilter<"backup_jobs"> | string | null
    error_message?: StringNullableFilter<"backup_jobs"> | string | null
    creator?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type backup_jobsOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    file_count?: SortOrder
    total_size?: SortOrder
    download_url?: SortOrderInput | SortOrder
    error_message?: SortOrderInput | SortOrder
    _count?: backup_jobsCountOrderByAggregateInput
    _avg?: backup_jobsAvgOrderByAggregateInput
    _max?: backup_jobsMaxOrderByAggregateInput
    _min?: backup_jobsMinOrderByAggregateInput
    _sum?: backup_jobsSumOrderByAggregateInput
  }

  export type backup_jobsScalarWhereWithAggregatesInput = {
    AND?: backup_jobsScalarWhereWithAggregatesInput | backup_jobsScalarWhereWithAggregatesInput[]
    OR?: backup_jobsScalarWhereWithAggregatesInput[]
    NOT?: backup_jobsScalarWhereWithAggregatesInput | backup_jobsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"backup_jobs"> | string
    type?: StringWithAggregatesFilter<"backup_jobs"> | string
    status?: StringWithAggregatesFilter<"backup_jobs"> | string
    created_by?: IntWithAggregatesFilter<"backup_jobs"> | number
    created_at?: DateTimeWithAggregatesFilter<"backup_jobs"> | Date | string
    completed_at?: DateTimeNullableWithAggregatesFilter<"backup_jobs"> | Date | string | null
    file_count?: IntWithAggregatesFilter<"backup_jobs"> | number
    total_size?: StringWithAggregatesFilter<"backup_jobs"> | string
    download_url?: StringNullableWithAggregatesFilter<"backup_jobs"> | string | null
    error_message?: StringNullableWithAggregatesFilter<"backup_jobs"> | string | null
  }

  export type backup_settingsWhereInput = {
    AND?: backup_settingsWhereInput | backup_settingsWhereInput[]
    OR?: backup_settingsWhereInput[]
    NOT?: backup_settingsWhereInput | backup_settingsWhereInput[]
    id?: StringFilter<"backup_settings"> | string
    frequency?: StringFilter<"backup_settings"> | string
    backup_time?: StringFilter<"backup_settings"> | string
    retention_days?: IntFilter<"backup_settings"> | number
    auto_delete?: BoolFilter<"backup_settings"> | boolean
    compress_backups?: BoolFilter<"backup_settings"> | boolean
    email_notifications?: BoolFilter<"backup_settings"> | boolean
    notification_email?: StringNullableFilter<"backup_settings"> | string | null
    last_cleanup?: DateTimeNullableFilter<"backup_settings"> | Date | string | null
    created_at?: DateTimeFilter<"backup_settings"> | Date | string
    updated_at?: DateTimeFilter<"backup_settings"> | Date | string
  }

  export type backup_settingsOrderByWithRelationInput = {
    id?: SortOrder
    frequency?: SortOrder
    backup_time?: SortOrder
    retention_days?: SortOrder
    auto_delete?: SortOrder
    compress_backups?: SortOrder
    email_notifications?: SortOrder
    notification_email?: SortOrderInput | SortOrder
    last_cleanup?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type backup_settingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: backup_settingsWhereInput | backup_settingsWhereInput[]
    OR?: backup_settingsWhereInput[]
    NOT?: backup_settingsWhereInput | backup_settingsWhereInput[]
    frequency?: StringFilter<"backup_settings"> | string
    backup_time?: StringFilter<"backup_settings"> | string
    retention_days?: IntFilter<"backup_settings"> | number
    auto_delete?: BoolFilter<"backup_settings"> | boolean
    compress_backups?: BoolFilter<"backup_settings"> | boolean
    email_notifications?: BoolFilter<"backup_settings"> | boolean
    notification_email?: StringNullableFilter<"backup_settings"> | string | null
    last_cleanup?: DateTimeNullableFilter<"backup_settings"> | Date | string | null
    created_at?: DateTimeFilter<"backup_settings"> | Date | string
    updated_at?: DateTimeFilter<"backup_settings"> | Date | string
  }, "id">

  export type backup_settingsOrderByWithAggregationInput = {
    id?: SortOrder
    frequency?: SortOrder
    backup_time?: SortOrder
    retention_days?: SortOrder
    auto_delete?: SortOrder
    compress_backups?: SortOrder
    email_notifications?: SortOrder
    notification_email?: SortOrderInput | SortOrder
    last_cleanup?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: backup_settingsCountOrderByAggregateInput
    _avg?: backup_settingsAvgOrderByAggregateInput
    _max?: backup_settingsMaxOrderByAggregateInput
    _min?: backup_settingsMinOrderByAggregateInput
    _sum?: backup_settingsSumOrderByAggregateInput
  }

  export type backup_settingsScalarWhereWithAggregatesInput = {
    AND?: backup_settingsScalarWhereWithAggregatesInput | backup_settingsScalarWhereWithAggregatesInput[]
    OR?: backup_settingsScalarWhereWithAggregatesInput[]
    NOT?: backup_settingsScalarWhereWithAggregatesInput | backup_settingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"backup_settings"> | string
    frequency?: StringWithAggregatesFilter<"backup_settings"> | string
    backup_time?: StringWithAggregatesFilter<"backup_settings"> | string
    retention_days?: IntWithAggregatesFilter<"backup_settings"> | number
    auto_delete?: BoolWithAggregatesFilter<"backup_settings"> | boolean
    compress_backups?: BoolWithAggregatesFilter<"backup_settings"> | boolean
    email_notifications?: BoolWithAggregatesFilter<"backup_settings"> | boolean
    notification_email?: StringNullableWithAggregatesFilter<"backup_settings"> | string | null
    last_cleanup?: DateTimeNullableWithAggregatesFilter<"backup_settings"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"backup_settings"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"backup_settings"> | Date | string
  }

  export type usersCreateInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
    faculty?: facultyCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsCreateNestedManyWithoutCreatorInput
  }

  export type usersUncheckedCreateInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type usersUpdateInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUpdateManyWithoutCreatorNestedInput
  }

  export type usersUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type usersCreateManyInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
  }

  export type usersUpdateManyMutationInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
  }

  export type usersUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
  }

  export type facultyCreateInput = {
    employee_id: bigint | number
    position?: string | null
    department?: string | null
    users: usersCreateNestedOneWithoutFacultyInput
  }

  export type facultyUncheckedCreateInput = {
    employee_id: bigint | number
    position?: string | null
    department?: string | null
    user_id: number
  }

  export type facultyUpdateInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneRequiredWithoutFacultyNestedInput
  }

  export type facultyUncheckedUpdateInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type facultyCreateManyInput = {
    employee_id: bigint | number
    position?: string | null
    department?: string | null
    user_id: number
  }

  export type facultyUpdateManyMutationInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type facultyUncheckedUpdateManyInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
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
    employee_id: bigint | number
    position?: string | null
    contact_num: number
    activity_logs?: activity_logsCreateNestedManyWithoutLibrarianInput
    users: usersCreateNestedOneWithoutLibrarianInput
  }

  export type librarianUncheckedCreateInput = {
    employee_id: bigint | number
    position?: string | null
    contact_num: number
    user_id: number
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutLibrarianInput
  }

  export type librarianUpdateInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    activity_logs?: activity_logsUpdateManyWithoutLibrarianNestedInput
    users?: usersUpdateOneRequiredWithoutLibrarianNestedInput
  }

  export type librarianUncheckedUpdateInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    activity_logs?: activity_logsUncheckedUpdateManyWithoutLibrarianNestedInput
  }

  export type librarianCreateManyInput = {
    employee_id: bigint | number
    position?: string | null
    contact_num: number
    user_id: number
  }

  export type librarianUpdateManyMutationInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
  }

  export type librarianUncheckedUpdateManyInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
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
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutPapersInput
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
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutPapersInput
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
    user_activity_logs?: user_activity_logsUpdateManyWithoutPapersNestedInput
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
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutPapersNestedInput
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

  export type activity_logsCreateInput = {
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    ip_address?: string | null
    status?: string | null
    user_agent?: string | null
    librarian: librarianCreateNestedOneWithoutActivity_logsInput
    users: usersCreateNestedOneWithoutActivity_logsInput
  }

  export type activity_logsUncheckedCreateInput = {
    name: string
    activity: string
    created_at?: Date | string
    act_id?: number
    activity_type?: $Enums.activity_type | null
    ip_address?: string | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    user_id: number
  }

  export type activity_logsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    librarian?: librarianUpdateOneRequiredWithoutActivity_logsNestedInput
    users?: usersUpdateOneRequiredWithoutActivity_logsNestedInput
  }

  export type activity_logsUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    act_id?: IntFieldUpdateOperationsInput | number
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type activity_logsCreateManyInput = {
    name: string
    activity: string
    created_at?: Date | string
    act_id?: number
    activity_type?: $Enums.activity_type | null
    ip_address?: string | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    user_id: number
  }

  export type activity_logsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activity_logsUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    act_id?: IntFieldUpdateOperationsInput | number
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type user_activity_logsCreateInput = {
    name: string
    activity: string
    created_at?: Date | string | null
    activity_type?: $Enums.activity_type | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    student_num: bigint | number
    users: usersCreateNestedOneWithoutUser_activity_logsInput
    papers: papersCreateNestedOneWithoutUser_activity_logsInput
  }

  export type user_activity_logsUncheckedCreateInput = {
    activity_id?: number
    user_id: number
    paper_id: number
    name: string
    activity: string
    created_at?: Date | string | null
    activity_type?: $Enums.activity_type | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    student_num: bigint | number
  }

  export type user_activity_logsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
    users?: usersUpdateOneRequiredWithoutUser_activity_logsNestedInput
    papers?: papersUpdateOneRequiredWithoutUser_activity_logsNestedInput
  }

  export type user_activity_logsUncheckedUpdateInput = {
    activity_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type user_activity_logsCreateManyInput = {
    activity_id?: number
    user_id: number
    paper_id: number
    name: string
    activity: string
    created_at?: Date | string | null
    activity_type?: $Enums.activity_type | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    student_num: bigint | number
  }

  export type user_activity_logsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type user_activity_logsUncheckedUpdateManyInput = {
    activity_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type backup_jobsCreateInput = {
    id?: string
    type: string
    status?: string
    created_at?: Date | string
    completed_at?: Date | string | null
    file_count?: number
    total_size?: string
    download_url?: string | null
    error_message?: string | null
    creator: usersCreateNestedOneWithoutBackup_jobsInput
  }

  export type backup_jobsUncheckedCreateInput = {
    id?: string
    type: string
    status?: string
    created_by: number
    created_at?: Date | string
    completed_at?: Date | string | null
    file_count?: number
    total_size?: string
    download_url?: string | null
    error_message?: string | null
  }

  export type backup_jobsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    file_count?: IntFieldUpdateOperationsInput | number
    total_size?: StringFieldUpdateOperationsInput | string
    download_url?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    creator?: usersUpdateOneRequiredWithoutBackup_jobsNestedInput
  }

  export type backup_jobsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    file_count?: IntFieldUpdateOperationsInput | number
    total_size?: StringFieldUpdateOperationsInput | string
    download_url?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type backup_jobsCreateManyInput = {
    id?: string
    type: string
    status?: string
    created_by: number
    created_at?: Date | string
    completed_at?: Date | string | null
    file_count?: number
    total_size?: string
    download_url?: string | null
    error_message?: string | null
  }

  export type backup_jobsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    file_count?: IntFieldUpdateOperationsInput | number
    total_size?: StringFieldUpdateOperationsInput | string
    download_url?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type backup_jobsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    file_count?: IntFieldUpdateOperationsInput | number
    total_size?: StringFieldUpdateOperationsInput | string
    download_url?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type backup_settingsCreateInput = {
    id?: string
    frequency?: string
    backup_time?: string
    retention_days?: number
    auto_delete?: boolean
    compress_backups?: boolean
    email_notifications?: boolean
    notification_email?: string | null
    last_cleanup?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type backup_settingsUncheckedCreateInput = {
    id?: string
    frequency?: string
    backup_time?: string
    retention_days?: number
    auto_delete?: boolean
    compress_backups?: boolean
    email_notifications?: boolean
    notification_email?: string | null
    last_cleanup?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type backup_settingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    backup_time?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    auto_delete?: BoolFieldUpdateOperationsInput | boolean
    compress_backups?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    notification_email?: NullableStringFieldUpdateOperationsInput | string | null
    last_cleanup?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type backup_settingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    backup_time?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    auto_delete?: BoolFieldUpdateOperationsInput | boolean
    compress_backups?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    notification_email?: NullableStringFieldUpdateOperationsInput | string | null
    last_cleanup?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type backup_settingsCreateManyInput = {
    id?: string
    frequency?: string
    backup_time?: string
    retention_days?: number
    auto_delete?: boolean
    compress_backups?: boolean
    email_notifications?: boolean
    notification_email?: string | null
    last_cleanup?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type backup_settingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    backup_time?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    auto_delete?: BoolFieldUpdateOperationsInput | boolean
    compress_backups?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    notification_email?: NullableStringFieldUpdateOperationsInput | string | null
    last_cleanup?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type backup_settingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    backup_time?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    auto_delete?: BoolFieldUpdateOperationsInput | boolean
    compress_backups?: BoolFieldUpdateOperationsInput | boolean
    email_notifications?: BoolFieldUpdateOperationsInput | boolean
    notification_email?: NullableStringFieldUpdateOperationsInput | string | null
    last_cleanup?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type Enumuser_roleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role | Enumuser_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumuser_roleNullableFilter<$PrismaModel> | $Enums.user_role | null
  }

  export type User_activity_logsListRelationFilter = {
    every?: user_activity_logsWhereInput
    some?: user_activity_logsWhereInput
    none?: user_activity_logsWhereInput
  }

  export type Activity_logsListRelationFilter = {
    every?: activity_logsWhereInput
    some?: activity_logsWhereInput
    none?: activity_logsWhereInput
  }

  export type FacultyNullableScalarRelationFilter = {
    is?: facultyWhereInput | null
    isNot?: facultyWhereInput | null
  }

  export type LibrarianNullableScalarRelationFilter = {
    is?: librarianWhereInput | null
    isNot?: librarianWhereInput | null
  }

  export type StudentsNullableScalarRelationFilter = {
    is?: studentsWhereInput | null
    isNot?: studentsWhereInput | null
  }

  export type User_bookmarksListRelationFilter = {
    every?: user_bookmarksWhereInput
    some?: user_bookmarksWhereInput
    none?: user_bookmarksWhereInput
  }

  export type Backup_jobsListRelationFilter = {
    every?: backup_jobsWhereInput
    some?: backup_jobsWhereInput
    none?: backup_jobsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type user_activity_logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type activity_logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type user_bookmarksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type backup_jobsOrderByRelationAggregateInput = {
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
    password?: SortOrder
    created_at?: SortOrder
    role?: SortOrder
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
    password?: SortOrder
    created_at?: SortOrder
    role?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    user_id?: SortOrder
    first_name?: SortOrder
    mid_name?: SortOrder
    last_name?: SortOrder
    ext_name?: SortOrder
    email?: SortOrder
    profile_picture?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    role?: SortOrder
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

  export type Enumuser_roleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role | Enumuser_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumuser_roleNullableWithAggregatesFilter<$PrismaModel> | $Enums.user_role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumuser_roleNullableFilter<$PrismaModel>
    _max?: NestedEnumuser_roleNullableFilter<$PrismaModel>
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

  export type paper_metadataOrderByRelationAggregateInput = {
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
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    act_id?: SortOrder
    activity_type?: SortOrder
    ip_address?: SortOrder
    status?: SortOrder
    user_agent?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
  }

  export type activity_logsAvgOrderByAggregateInput = {
    act_id?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
  }

  export type activity_logsMaxOrderByAggregateInput = {
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    act_id?: SortOrder
    activity_type?: SortOrder
    ip_address?: SortOrder
    status?: SortOrder
    user_agent?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
  }

  export type activity_logsMinOrderByAggregateInput = {
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    act_id?: SortOrder
    activity_type?: SortOrder
    ip_address?: SortOrder
    status?: SortOrder
    user_agent?: SortOrder
    employee_id?: SortOrder
    user_id?: SortOrder
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

  export type user_activity_logsCountOrderByAggregateInput = {
    activity_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    activity_type?: SortOrder
    status?: SortOrder
    user_agent?: SortOrder
    employee_id?: SortOrder
    student_num?: SortOrder
  }

  export type user_activity_logsAvgOrderByAggregateInput = {
    activity_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    employee_id?: SortOrder
    student_num?: SortOrder
  }

  export type user_activity_logsMaxOrderByAggregateInput = {
    activity_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    activity_type?: SortOrder
    status?: SortOrder
    user_agent?: SortOrder
    employee_id?: SortOrder
    student_num?: SortOrder
  }

  export type user_activity_logsMinOrderByAggregateInput = {
    activity_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    name?: SortOrder
    activity?: SortOrder
    created_at?: SortOrder
    activity_type?: SortOrder
    status?: SortOrder
    user_agent?: SortOrder
    employee_id?: SortOrder
    student_num?: SortOrder
  }

  export type user_activity_logsSumOrderByAggregateInput = {
    activity_id?: SortOrder
    user_id?: SortOrder
    paper_id?: SortOrder
    employee_id?: SortOrder
    student_num?: SortOrder
  }

  export type backup_jobsCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrder
    file_count?: SortOrder
    total_size?: SortOrder
    download_url?: SortOrder
    error_message?: SortOrder
  }

  export type backup_jobsAvgOrderByAggregateInput = {
    created_by?: SortOrder
    file_count?: SortOrder
  }

  export type backup_jobsMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrder
    file_count?: SortOrder
    total_size?: SortOrder
    download_url?: SortOrder
    error_message?: SortOrder
  }

  export type backup_jobsMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrder
    file_count?: SortOrder
    total_size?: SortOrder
    download_url?: SortOrder
    error_message?: SortOrder
  }

  export type backup_jobsSumOrderByAggregateInput = {
    created_by?: SortOrder
    file_count?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type backup_settingsCountOrderByAggregateInput = {
    id?: SortOrder
    frequency?: SortOrder
    backup_time?: SortOrder
    retention_days?: SortOrder
    auto_delete?: SortOrder
    compress_backups?: SortOrder
    email_notifications?: SortOrder
    notification_email?: SortOrder
    last_cleanup?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type backup_settingsAvgOrderByAggregateInput = {
    retention_days?: SortOrder
  }

  export type backup_settingsMaxOrderByAggregateInput = {
    id?: SortOrder
    frequency?: SortOrder
    backup_time?: SortOrder
    retention_days?: SortOrder
    auto_delete?: SortOrder
    compress_backups?: SortOrder
    email_notifications?: SortOrder
    notification_email?: SortOrder
    last_cleanup?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type backup_settingsMinOrderByAggregateInput = {
    id?: SortOrder
    frequency?: SortOrder
    backup_time?: SortOrder
    retention_days?: SortOrder
    auto_delete?: SortOrder
    compress_backups?: SortOrder
    email_notifications?: SortOrder
    notification_email?: SortOrder
    last_cleanup?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type backup_settingsSumOrderByAggregateInput = {
    retention_days?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type user_activity_logsCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_activity_logsCreateWithoutUsersInput, user_activity_logsUncheckedCreateWithoutUsersInput> | user_activity_logsCreateWithoutUsersInput[] | user_activity_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_activity_logsCreateOrConnectWithoutUsersInput | user_activity_logsCreateOrConnectWithoutUsersInput[]
    createMany?: user_activity_logsCreateManyUsersInputEnvelope
    connect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
  }

  export type activity_logsCreateNestedManyWithoutUsersInput = {
    create?: XOR<activity_logsCreateWithoutUsersInput, activity_logsUncheckedCreateWithoutUsersInput> | activity_logsCreateWithoutUsersInput[] | activity_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutUsersInput | activity_logsCreateOrConnectWithoutUsersInput[]
    createMany?: activity_logsCreateManyUsersInputEnvelope
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
  }

  export type facultyCreateNestedOneWithoutUsersInput = {
    create?: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: facultyCreateOrConnectWithoutUsersInput
    connect?: facultyWhereUniqueInput
  }

  export type librarianCreateNestedOneWithoutUsersInput = {
    create?: XOR<librarianCreateWithoutUsersInput, librarianUncheckedCreateWithoutUsersInput>
    connectOrCreate?: librarianCreateOrConnectWithoutUsersInput
    connect?: librarianWhereUniqueInput
  }

  export type studentsCreateNestedOneWithoutUsersInput = {
    create?: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: studentsCreateOrConnectWithoutUsersInput
    connect?: studentsWhereUniqueInput
  }

  export type user_bookmarksCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput> | user_bookmarksCreateWithoutUsersInput[] | user_bookmarksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutUsersInput | user_bookmarksCreateOrConnectWithoutUsersInput[]
    createMany?: user_bookmarksCreateManyUsersInputEnvelope
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
  }

  export type backup_jobsCreateNestedManyWithoutCreatorInput = {
    create?: XOR<backup_jobsCreateWithoutCreatorInput, backup_jobsUncheckedCreateWithoutCreatorInput> | backup_jobsCreateWithoutCreatorInput[] | backup_jobsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: backup_jobsCreateOrConnectWithoutCreatorInput | backup_jobsCreateOrConnectWithoutCreatorInput[]
    createMany?: backup_jobsCreateManyCreatorInputEnvelope
    connect?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
  }

  export type user_activity_logsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_activity_logsCreateWithoutUsersInput, user_activity_logsUncheckedCreateWithoutUsersInput> | user_activity_logsCreateWithoutUsersInput[] | user_activity_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_activity_logsCreateOrConnectWithoutUsersInput | user_activity_logsCreateOrConnectWithoutUsersInput[]
    createMany?: user_activity_logsCreateManyUsersInputEnvelope
    connect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
  }

  export type activity_logsUncheckedCreateNestedManyWithoutUsersInput = {
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

  export type librarianUncheckedCreateNestedOneWithoutUsersInput = {
    create?: XOR<librarianCreateWithoutUsersInput, librarianUncheckedCreateWithoutUsersInput>
    connectOrCreate?: librarianCreateOrConnectWithoutUsersInput
    connect?: librarianWhereUniqueInput
  }

  export type studentsUncheckedCreateNestedOneWithoutUsersInput = {
    create?: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: studentsCreateOrConnectWithoutUsersInput
    connect?: studentsWhereUniqueInput
  }

  export type user_bookmarksUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput> | user_bookmarksCreateWithoutUsersInput[] | user_bookmarksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutUsersInput | user_bookmarksCreateOrConnectWithoutUsersInput[]
    createMany?: user_bookmarksCreateManyUsersInputEnvelope
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
  }

  export type backup_jobsUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<backup_jobsCreateWithoutCreatorInput, backup_jobsUncheckedCreateWithoutCreatorInput> | backup_jobsCreateWithoutCreatorInput[] | backup_jobsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: backup_jobsCreateOrConnectWithoutCreatorInput | backup_jobsCreateOrConnectWithoutCreatorInput[]
    createMany?: backup_jobsCreateManyCreatorInputEnvelope
    connect?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
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

  export type NullableEnumuser_roleFieldUpdateOperationsInput = {
    set?: $Enums.user_role | null
  }

  export type user_activity_logsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_activity_logsCreateWithoutUsersInput, user_activity_logsUncheckedCreateWithoutUsersInput> | user_activity_logsCreateWithoutUsersInput[] | user_activity_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_activity_logsCreateOrConnectWithoutUsersInput | user_activity_logsCreateOrConnectWithoutUsersInput[]
    upsert?: user_activity_logsUpsertWithWhereUniqueWithoutUsersInput | user_activity_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_activity_logsCreateManyUsersInputEnvelope
    set?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    disconnect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    delete?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    connect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    update?: user_activity_logsUpdateWithWhereUniqueWithoutUsersInput | user_activity_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_activity_logsUpdateManyWithWhereWithoutUsersInput | user_activity_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_activity_logsScalarWhereInput | user_activity_logsScalarWhereInput[]
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

  export type facultyUpdateOneWithoutUsersNestedInput = {
    create?: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: facultyCreateOrConnectWithoutUsersInput
    upsert?: facultyUpsertWithoutUsersInput
    disconnect?: facultyWhereInput | boolean
    delete?: facultyWhereInput | boolean
    connect?: facultyWhereUniqueInput
    update?: XOR<XOR<facultyUpdateToOneWithWhereWithoutUsersInput, facultyUpdateWithoutUsersInput>, facultyUncheckedUpdateWithoutUsersInput>
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

  export type studentsUpdateOneWithoutUsersNestedInput = {
    create?: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: studentsCreateOrConnectWithoutUsersInput
    upsert?: studentsUpsertWithoutUsersInput
    disconnect?: studentsWhereInput | boolean
    delete?: studentsWhereInput | boolean
    connect?: studentsWhereUniqueInput
    update?: XOR<XOR<studentsUpdateToOneWithWhereWithoutUsersInput, studentsUpdateWithoutUsersInput>, studentsUncheckedUpdateWithoutUsersInput>
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

  export type backup_jobsUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<backup_jobsCreateWithoutCreatorInput, backup_jobsUncheckedCreateWithoutCreatorInput> | backup_jobsCreateWithoutCreatorInput[] | backup_jobsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: backup_jobsCreateOrConnectWithoutCreatorInput | backup_jobsCreateOrConnectWithoutCreatorInput[]
    upsert?: backup_jobsUpsertWithWhereUniqueWithoutCreatorInput | backup_jobsUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: backup_jobsCreateManyCreatorInputEnvelope
    set?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
    disconnect?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
    delete?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
    connect?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
    update?: backup_jobsUpdateWithWhereUniqueWithoutCreatorInput | backup_jobsUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: backup_jobsUpdateManyWithWhereWithoutCreatorInput | backup_jobsUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: backup_jobsScalarWhereInput | backup_jobsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type user_activity_logsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_activity_logsCreateWithoutUsersInput, user_activity_logsUncheckedCreateWithoutUsersInput> | user_activity_logsCreateWithoutUsersInput[] | user_activity_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_activity_logsCreateOrConnectWithoutUsersInput | user_activity_logsCreateOrConnectWithoutUsersInput[]
    upsert?: user_activity_logsUpsertWithWhereUniqueWithoutUsersInput | user_activity_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_activity_logsCreateManyUsersInputEnvelope
    set?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    disconnect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    delete?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    connect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    update?: user_activity_logsUpdateWithWhereUniqueWithoutUsersInput | user_activity_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_activity_logsUpdateManyWithWhereWithoutUsersInput | user_activity_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_activity_logsScalarWhereInput | user_activity_logsScalarWhereInput[]
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

  export type facultyUncheckedUpdateOneWithoutUsersNestedInput = {
    create?: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: facultyCreateOrConnectWithoutUsersInput
    upsert?: facultyUpsertWithoutUsersInput
    disconnect?: facultyWhereInput | boolean
    delete?: facultyWhereInput | boolean
    connect?: facultyWhereUniqueInput
    update?: XOR<XOR<facultyUpdateToOneWithWhereWithoutUsersInput, facultyUpdateWithoutUsersInput>, facultyUncheckedUpdateWithoutUsersInput>
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

  export type studentsUncheckedUpdateOneWithoutUsersNestedInput = {
    create?: XOR<studentsCreateWithoutUsersInput, studentsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: studentsCreateOrConnectWithoutUsersInput
    upsert?: studentsUpsertWithoutUsersInput
    disconnect?: studentsWhereInput | boolean
    delete?: studentsWhereInput | boolean
    connect?: studentsWhereUniqueInput
    update?: XOR<XOR<studentsUpdateToOneWithWhereWithoutUsersInput, studentsUpdateWithoutUsersInput>, studentsUncheckedUpdateWithoutUsersInput>
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

  export type backup_jobsUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<backup_jobsCreateWithoutCreatorInput, backup_jobsUncheckedCreateWithoutCreatorInput> | backup_jobsCreateWithoutCreatorInput[] | backup_jobsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: backup_jobsCreateOrConnectWithoutCreatorInput | backup_jobsCreateOrConnectWithoutCreatorInput[]
    upsert?: backup_jobsUpsertWithWhereUniqueWithoutCreatorInput | backup_jobsUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: backup_jobsCreateManyCreatorInputEnvelope
    set?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
    disconnect?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
    delete?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
    connect?: backup_jobsWhereUniqueInput | backup_jobsWhereUniqueInput[]
    update?: backup_jobsUpdateWithWhereUniqueWithoutCreatorInput | backup_jobsUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: backup_jobsUpdateManyWithWhereWithoutCreatorInput | backup_jobsUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: backup_jobsScalarWhereInput | backup_jobsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutFacultyInput = {
    create?: XOR<usersCreateWithoutFacultyInput, usersUncheckedCreateWithoutFacultyInput>
    connectOrCreate?: usersCreateOrConnectWithoutFacultyInput
    connect?: usersWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
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

  export type activity_logsCreateNestedManyWithoutLibrarianInput = {
    create?: XOR<activity_logsCreateWithoutLibrarianInput, activity_logsUncheckedCreateWithoutLibrarianInput> | activity_logsCreateWithoutLibrarianInput[] | activity_logsUncheckedCreateWithoutLibrarianInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutLibrarianInput | activity_logsCreateOrConnectWithoutLibrarianInput[]
    createMany?: activity_logsCreateManyLibrarianInputEnvelope
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutLibrarianInput = {
    create?: XOR<usersCreateWithoutLibrarianInput, usersUncheckedCreateWithoutLibrarianInput>
    connectOrCreate?: usersCreateOrConnectWithoutLibrarianInput
    connect?: usersWhereUniqueInput
  }

  export type activity_logsUncheckedCreateNestedManyWithoutLibrarianInput = {
    create?: XOR<activity_logsCreateWithoutLibrarianInput, activity_logsUncheckedCreateWithoutLibrarianInput> | activity_logsCreateWithoutLibrarianInput[] | activity_logsUncheckedCreateWithoutLibrarianInput[]
    connectOrCreate?: activity_logsCreateOrConnectWithoutLibrarianInput | activity_logsCreateOrConnectWithoutLibrarianInput[]
    createMany?: activity_logsCreateManyLibrarianInputEnvelope
    connect?: activity_logsWhereUniqueInput | activity_logsWhereUniqueInput[]
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

  export type usersUpdateOneRequiredWithoutLibrarianNestedInput = {
    create?: XOR<usersCreateWithoutLibrarianInput, usersUncheckedCreateWithoutLibrarianInput>
    connectOrCreate?: usersCreateOrConnectWithoutLibrarianInput
    upsert?: usersUpsertWithoutLibrarianInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLibrarianInput, usersUpdateWithoutLibrarianInput>, usersUncheckedUpdateWithoutLibrarianInput>
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

  export type user_activity_logsCreateNestedManyWithoutPapersInput = {
    create?: XOR<user_activity_logsCreateWithoutPapersInput, user_activity_logsUncheckedCreateWithoutPapersInput> | user_activity_logsCreateWithoutPapersInput[] | user_activity_logsUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: user_activity_logsCreateOrConnectWithoutPapersInput | user_activity_logsCreateOrConnectWithoutPapersInput[]
    createMany?: user_activity_logsCreateManyPapersInputEnvelope
    connect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
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

  export type user_activity_logsUncheckedCreateNestedManyWithoutPapersInput = {
    create?: XOR<user_activity_logsCreateWithoutPapersInput, user_activity_logsUncheckedCreateWithoutPapersInput> | user_activity_logsCreateWithoutPapersInput[] | user_activity_logsUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: user_activity_logsCreateOrConnectWithoutPapersInput | user_activity_logsCreateOrConnectWithoutPapersInput[]
    createMany?: user_activity_logsCreateManyPapersInputEnvelope
    connect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
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

  export type user_activity_logsUpdateManyWithoutPapersNestedInput = {
    create?: XOR<user_activity_logsCreateWithoutPapersInput, user_activity_logsUncheckedCreateWithoutPapersInput> | user_activity_logsCreateWithoutPapersInput[] | user_activity_logsUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: user_activity_logsCreateOrConnectWithoutPapersInput | user_activity_logsCreateOrConnectWithoutPapersInput[]
    upsert?: user_activity_logsUpsertWithWhereUniqueWithoutPapersInput | user_activity_logsUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: user_activity_logsCreateManyPapersInputEnvelope
    set?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    disconnect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    delete?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    connect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    update?: user_activity_logsUpdateWithWhereUniqueWithoutPapersInput | user_activity_logsUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: user_activity_logsUpdateManyWithWhereWithoutPapersInput | user_activity_logsUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: user_activity_logsScalarWhereInput | user_activity_logsScalarWhereInput[]
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

  export type user_activity_logsUncheckedUpdateManyWithoutPapersNestedInput = {
    create?: XOR<user_activity_logsCreateWithoutPapersInput, user_activity_logsUncheckedCreateWithoutPapersInput> | user_activity_logsCreateWithoutPapersInput[] | user_activity_logsUncheckedCreateWithoutPapersInput[]
    connectOrCreate?: user_activity_logsCreateOrConnectWithoutPapersInput | user_activity_logsCreateOrConnectWithoutPapersInput[]
    upsert?: user_activity_logsUpsertWithWhereUniqueWithoutPapersInput | user_activity_logsUpsertWithWhereUniqueWithoutPapersInput[]
    createMany?: user_activity_logsCreateManyPapersInputEnvelope
    set?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    disconnect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    delete?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    connect?: user_activity_logsWhereUniqueInput | user_activity_logsWhereUniqueInput[]
    update?: user_activity_logsUpdateWithWhereUniqueWithoutPapersInput | user_activity_logsUpdateWithWhereUniqueWithoutPapersInput[]
    updateMany?: user_activity_logsUpdateManyWithWhereWithoutPapersInput | user_activity_logsUpdateManyWithWhereWithoutPapersInput[]
    deleteMany?: user_activity_logsScalarWhereInput | user_activity_logsScalarWhereInput[]
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

  export type usersCreateNestedOneWithoutUser_activity_logsInput = {
    create?: XOR<usersCreateWithoutUser_activity_logsInput, usersUncheckedCreateWithoutUser_activity_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_activity_logsInput
    connect?: usersWhereUniqueInput
  }

  export type papersCreateNestedOneWithoutUser_activity_logsInput = {
    create?: XOR<papersCreateWithoutUser_activity_logsInput, papersUncheckedCreateWithoutUser_activity_logsInput>
    connectOrCreate?: papersCreateOrConnectWithoutUser_activity_logsInput
    connect?: papersWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutUser_activity_logsNestedInput = {
    create?: XOR<usersCreateWithoutUser_activity_logsInput, usersUncheckedCreateWithoutUser_activity_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_activity_logsInput
    upsert?: usersUpsertWithoutUser_activity_logsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutUser_activity_logsInput, usersUpdateWithoutUser_activity_logsInput>, usersUncheckedUpdateWithoutUser_activity_logsInput>
  }

  export type papersUpdateOneRequiredWithoutUser_activity_logsNestedInput = {
    create?: XOR<papersCreateWithoutUser_activity_logsInput, papersUncheckedCreateWithoutUser_activity_logsInput>
    connectOrCreate?: papersCreateOrConnectWithoutUser_activity_logsInput
    upsert?: papersUpsertWithoutUser_activity_logsInput
    connect?: papersWhereUniqueInput
    update?: XOR<XOR<papersUpdateToOneWithWhereWithoutUser_activity_logsInput, papersUpdateWithoutUser_activity_logsInput>, papersUncheckedUpdateWithoutUser_activity_logsInput>
  }

  export type usersCreateNestedOneWithoutBackup_jobsInput = {
    create?: XOR<usersCreateWithoutBackup_jobsInput, usersUncheckedCreateWithoutBackup_jobsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBackup_jobsInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutBackup_jobsNestedInput = {
    create?: XOR<usersCreateWithoutBackup_jobsInput, usersUncheckedCreateWithoutBackup_jobsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBackup_jobsInput
    upsert?: usersUpsertWithoutBackup_jobsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBackup_jobsInput, usersUpdateWithoutBackup_jobsInput>, usersUncheckedUpdateWithoutBackup_jobsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type NestedEnumuser_roleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role | Enumuser_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumuser_roleNullableFilter<$PrismaModel> | $Enums.user_role | null
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

  export type NestedEnumuser_roleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role | Enumuser_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumuser_roleNullableWithAggregatesFilter<$PrismaModel> | $Enums.user_role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumuser_roleNullableFilter<$PrismaModel>
    _max?: NestedEnumuser_roleNullableFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type user_activity_logsCreateWithoutUsersInput = {
    name: string
    activity: string
    created_at?: Date | string | null
    activity_type?: $Enums.activity_type | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    student_num: bigint | number
    papers: papersCreateNestedOneWithoutUser_activity_logsInput
  }

  export type user_activity_logsUncheckedCreateWithoutUsersInput = {
    activity_id?: number
    paper_id: number
    name: string
    activity: string
    created_at?: Date | string | null
    activity_type?: $Enums.activity_type | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    student_num: bigint | number
  }

  export type user_activity_logsCreateOrConnectWithoutUsersInput = {
    where: user_activity_logsWhereUniqueInput
    create: XOR<user_activity_logsCreateWithoutUsersInput, user_activity_logsUncheckedCreateWithoutUsersInput>
  }

  export type user_activity_logsCreateManyUsersInputEnvelope = {
    data: user_activity_logsCreateManyUsersInput | user_activity_logsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type activity_logsCreateWithoutUsersInput = {
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    ip_address?: string | null
    status?: string | null
    user_agent?: string | null
    librarian: librarianCreateNestedOneWithoutActivity_logsInput
  }

  export type activity_logsUncheckedCreateWithoutUsersInput = {
    name: string
    activity: string
    created_at?: Date | string
    act_id?: number
    activity_type?: $Enums.activity_type | null
    ip_address?: string | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
  }

  export type activity_logsCreateOrConnectWithoutUsersInput = {
    where: activity_logsWhereUniqueInput
    create: XOR<activity_logsCreateWithoutUsersInput, activity_logsUncheckedCreateWithoutUsersInput>
  }

  export type activity_logsCreateManyUsersInputEnvelope = {
    data: activity_logsCreateManyUsersInput | activity_logsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type facultyCreateWithoutUsersInput = {
    employee_id: bigint | number
    position?: string | null
    department?: string | null
  }

  export type facultyUncheckedCreateWithoutUsersInput = {
    employee_id: bigint | number
    position?: string | null
    department?: string | null
  }

  export type facultyCreateOrConnectWithoutUsersInput = {
    where: facultyWhereUniqueInput
    create: XOR<facultyCreateWithoutUsersInput, facultyUncheckedCreateWithoutUsersInput>
  }

  export type librarianCreateWithoutUsersInput = {
    employee_id: bigint | number
    position?: string | null
    contact_num: number
    activity_logs?: activity_logsCreateNestedManyWithoutLibrarianInput
  }

  export type librarianUncheckedCreateWithoutUsersInput = {
    employee_id: bigint | number
    position?: string | null
    contact_num: number
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutLibrarianInput
  }

  export type librarianCreateOrConnectWithoutUsersInput = {
    where: librarianWhereUniqueInput
    create: XOR<librarianCreateWithoutUsersInput, librarianUncheckedCreateWithoutUsersInput>
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

  export type backup_jobsCreateWithoutCreatorInput = {
    id?: string
    type: string
    status?: string
    created_at?: Date | string
    completed_at?: Date | string | null
    file_count?: number
    total_size?: string
    download_url?: string | null
    error_message?: string | null
  }

  export type backup_jobsUncheckedCreateWithoutCreatorInput = {
    id?: string
    type: string
    status?: string
    created_at?: Date | string
    completed_at?: Date | string | null
    file_count?: number
    total_size?: string
    download_url?: string | null
    error_message?: string | null
  }

  export type backup_jobsCreateOrConnectWithoutCreatorInput = {
    where: backup_jobsWhereUniqueInput
    create: XOR<backup_jobsCreateWithoutCreatorInput, backup_jobsUncheckedCreateWithoutCreatorInput>
  }

  export type backup_jobsCreateManyCreatorInputEnvelope = {
    data: backup_jobsCreateManyCreatorInput | backup_jobsCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type user_activity_logsUpsertWithWhereUniqueWithoutUsersInput = {
    where: user_activity_logsWhereUniqueInput
    update: XOR<user_activity_logsUpdateWithoutUsersInput, user_activity_logsUncheckedUpdateWithoutUsersInput>
    create: XOR<user_activity_logsCreateWithoutUsersInput, user_activity_logsUncheckedCreateWithoutUsersInput>
  }

  export type user_activity_logsUpdateWithWhereUniqueWithoutUsersInput = {
    where: user_activity_logsWhereUniqueInput
    data: XOR<user_activity_logsUpdateWithoutUsersInput, user_activity_logsUncheckedUpdateWithoutUsersInput>
  }

  export type user_activity_logsUpdateManyWithWhereWithoutUsersInput = {
    where: user_activity_logsScalarWhereInput
    data: XOR<user_activity_logsUpdateManyMutationInput, user_activity_logsUncheckedUpdateManyWithoutUsersInput>
  }

  export type user_activity_logsScalarWhereInput = {
    AND?: user_activity_logsScalarWhereInput | user_activity_logsScalarWhereInput[]
    OR?: user_activity_logsScalarWhereInput[]
    NOT?: user_activity_logsScalarWhereInput | user_activity_logsScalarWhereInput[]
    activity_id?: IntFilter<"user_activity_logs"> | number
    user_id?: IntFilter<"user_activity_logs"> | number
    paper_id?: IntFilter<"user_activity_logs"> | number
    name?: StringFilter<"user_activity_logs"> | string
    activity?: StringFilter<"user_activity_logs"> | string
    created_at?: DateTimeNullableFilter<"user_activity_logs"> | Date | string | null
    activity_type?: Enumactivity_typeNullableFilter<"user_activity_logs"> | $Enums.activity_type | null
    status?: StringNullableFilter<"user_activity_logs"> | string | null
    user_agent?: StringNullableFilter<"user_activity_logs"> | string | null
    employee_id?: BigIntFilter<"user_activity_logs"> | bigint | number
    student_num?: BigIntFilter<"user_activity_logs"> | bigint | number
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
    name?: StringFilter<"activity_logs"> | string
    activity?: StringFilter<"activity_logs"> | string
    created_at?: DateTimeFilter<"activity_logs"> | Date | string
    act_id?: IntFilter<"activity_logs"> | number
    activity_type?: Enumactivity_typeNullableFilter<"activity_logs"> | $Enums.activity_type | null
    ip_address?: StringNullableFilter<"activity_logs"> | string | null
    status?: StringNullableFilter<"activity_logs"> | string | null
    user_agent?: StringNullableFilter<"activity_logs"> | string | null
    employee_id?: BigIntFilter<"activity_logs"> | bigint | number
    user_id?: IntFilter<"activity_logs"> | number
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
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type facultyUncheckedUpdateWithoutUsersInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
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
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    activity_logs?: activity_logsUpdateManyWithoutLibrarianNestedInput
  }

  export type librarianUncheckedUpdateWithoutUsersInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    activity_logs?: activity_logsUncheckedUpdateManyWithoutLibrarianNestedInput
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

  export type backup_jobsUpsertWithWhereUniqueWithoutCreatorInput = {
    where: backup_jobsWhereUniqueInput
    update: XOR<backup_jobsUpdateWithoutCreatorInput, backup_jobsUncheckedUpdateWithoutCreatorInput>
    create: XOR<backup_jobsCreateWithoutCreatorInput, backup_jobsUncheckedCreateWithoutCreatorInput>
  }

  export type backup_jobsUpdateWithWhereUniqueWithoutCreatorInput = {
    where: backup_jobsWhereUniqueInput
    data: XOR<backup_jobsUpdateWithoutCreatorInput, backup_jobsUncheckedUpdateWithoutCreatorInput>
  }

  export type backup_jobsUpdateManyWithWhereWithoutCreatorInput = {
    where: backup_jobsScalarWhereInput
    data: XOR<backup_jobsUpdateManyMutationInput, backup_jobsUncheckedUpdateManyWithoutCreatorInput>
  }

  export type backup_jobsScalarWhereInput = {
    AND?: backup_jobsScalarWhereInput | backup_jobsScalarWhereInput[]
    OR?: backup_jobsScalarWhereInput[]
    NOT?: backup_jobsScalarWhereInput | backup_jobsScalarWhereInput[]
    id?: StringFilter<"backup_jobs"> | string
    type?: StringFilter<"backup_jobs"> | string
    status?: StringFilter<"backup_jobs"> | string
    created_by?: IntFilter<"backup_jobs"> | number
    created_at?: DateTimeFilter<"backup_jobs"> | Date | string
    completed_at?: DateTimeNullableFilter<"backup_jobs"> | Date | string | null
    file_count?: IntFilter<"backup_jobs"> | number
    total_size?: StringFilter<"backup_jobs"> | string
    download_url?: StringNullableFilter<"backup_jobs"> | string | null
    error_message?: StringNullableFilter<"backup_jobs"> | string | null
  }

  export type usersCreateWithoutFacultyInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsCreateNestedManyWithoutCreatorInput
  }

  export type usersUncheckedCreateWithoutFacultyInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsUncheckedCreateNestedManyWithoutCreatorInput
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
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUpdateManyWithoutCreatorNestedInput
  }

  export type usersUncheckedUpdateWithoutFacultyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type usersCreateWithoutStudentsInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
    faculty?: facultyCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsCreateNestedManyWithoutCreatorInput
  }

  export type usersUncheckedCreateWithoutStudentsInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsUncheckedCreateNestedManyWithoutCreatorInput
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
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUpdateManyWithoutCreatorNestedInput
  }

  export type usersUncheckedUpdateWithoutStudentsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type activity_logsCreateWithoutLibrarianInput = {
    name: string
    activity: string
    created_at?: Date | string
    activity_type?: $Enums.activity_type | null
    ip_address?: string | null
    status?: string | null
    user_agent?: string | null
    users: usersCreateNestedOneWithoutActivity_logsInput
  }

  export type activity_logsUncheckedCreateWithoutLibrarianInput = {
    name: string
    activity: string
    created_at?: Date | string
    act_id?: number
    activity_type?: $Enums.activity_type | null
    ip_address?: string | null
    status?: string | null
    user_agent?: string | null
    user_id: number
  }

  export type activity_logsCreateOrConnectWithoutLibrarianInput = {
    where: activity_logsWhereUniqueInput
    create: XOR<activity_logsCreateWithoutLibrarianInput, activity_logsUncheckedCreateWithoutLibrarianInput>
  }

  export type activity_logsCreateManyLibrarianInputEnvelope = {
    data: activity_logsCreateManyLibrarianInput | activity_logsCreateManyLibrarianInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutLibrarianInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
    faculty?: facultyCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsCreateNestedManyWithoutCreatorInput
  }

  export type usersUncheckedCreateWithoutLibrarianInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type usersCreateOrConnectWithoutLibrarianInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLibrarianInput, usersUncheckedCreateWithoutLibrarianInput>
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
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUpdateManyWithoutCreatorNestedInput
  }

  export type usersUncheckedUpdateWithoutLibrarianInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUncheckedUpdateManyWithoutCreatorNestedInput
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

  export type user_activity_logsCreateWithoutPapersInput = {
    name: string
    activity: string
    created_at?: Date | string | null
    activity_type?: $Enums.activity_type | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    student_num: bigint | number
    users: usersCreateNestedOneWithoutUser_activity_logsInput
  }

  export type user_activity_logsUncheckedCreateWithoutPapersInput = {
    activity_id?: number
    user_id: number
    name: string
    activity: string
    created_at?: Date | string | null
    activity_type?: $Enums.activity_type | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    student_num: bigint | number
  }

  export type user_activity_logsCreateOrConnectWithoutPapersInput = {
    where: user_activity_logsWhereUniqueInput
    create: XOR<user_activity_logsCreateWithoutPapersInput, user_activity_logsUncheckedCreateWithoutPapersInput>
  }

  export type user_activity_logsCreateManyPapersInputEnvelope = {
    data: user_activity_logsCreateManyPapersInput | user_activity_logsCreateManyPapersInput[]
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

  export type user_activity_logsUpsertWithWhereUniqueWithoutPapersInput = {
    where: user_activity_logsWhereUniqueInput
    update: XOR<user_activity_logsUpdateWithoutPapersInput, user_activity_logsUncheckedUpdateWithoutPapersInput>
    create: XOR<user_activity_logsCreateWithoutPapersInput, user_activity_logsUncheckedCreateWithoutPapersInput>
  }

  export type user_activity_logsUpdateWithWhereUniqueWithoutPapersInput = {
    where: user_activity_logsWhereUniqueInput
    data: XOR<user_activity_logsUpdateWithoutPapersInput, user_activity_logsUncheckedUpdateWithoutPapersInput>
  }

  export type user_activity_logsUpdateManyWithWhereWithoutPapersInput = {
    where: user_activity_logsScalarWhereInput
    data: XOR<user_activity_logsUpdateManyMutationInput, user_activity_logsUncheckedUpdateManyWithoutPapersInput>
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
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutPapersInput
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
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutPapersInput
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
    user_activity_logs?: user_activity_logsUpdateManyWithoutPapersNestedInput
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
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutPapersNestedInput
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
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutPapersInput
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
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutPapersInput
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
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
    faculty?: facultyCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    backup_jobs?: backup_jobsCreateNestedManyWithoutCreatorInput
  }

  export type usersUncheckedCreateWithoutUser_bookmarksInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    backup_jobs?: backup_jobsUncheckedCreateNestedManyWithoutCreatorInput
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
    user_activity_logs?: user_activity_logsUpdateManyWithoutPapersNestedInput
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
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutPapersNestedInput
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
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    backup_jobs?: backup_jobsUpdateManyWithoutCreatorNestedInput
  }

  export type usersUncheckedUpdateWithoutUser_bookmarksInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    backup_jobs?: backup_jobsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type librarianCreateWithoutActivity_logsInput = {
    employee_id: bigint | number
    position?: string | null
    contact_num: number
    users: usersCreateNestedOneWithoutLibrarianInput
  }

  export type librarianUncheckedCreateWithoutActivity_logsInput = {
    employee_id: bigint | number
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
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutUsersInput
    faculty?: facultyCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsCreateNestedManyWithoutCreatorInput
  }

  export type usersUncheckedCreateWithoutActivity_logsInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutUsersInput
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsUncheckedCreateNestedManyWithoutCreatorInput
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
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    position?: NullableStringFieldUpdateOperationsInput | string | null
    contact_num?: IntFieldUpdateOperationsInput | number
    users?: usersUpdateOneRequiredWithoutLibrarianNestedInput
  }

  export type librarianUncheckedUpdateWithoutActivity_logsInput = {
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
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
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUpdateManyWithoutUsersNestedInput
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUpdateManyWithoutCreatorNestedInput
  }

  export type usersUncheckedUpdateWithoutActivity_logsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type usersCreateWithoutUser_activity_logsInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
    faculty?: facultyCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsCreateNestedManyWithoutCreatorInput
  }

  export type usersUncheckedCreateWithoutUser_activity_logsInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
    backup_jobs?: backup_jobsUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type usersCreateOrConnectWithoutUser_activity_logsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUser_activity_logsInput, usersUncheckedCreateWithoutUser_activity_logsInput>
  }

  export type papersCreateWithoutUser_activity_logsInput = {
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
  }

  export type papersUncheckedCreateWithoutUser_activity_logsInput = {
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
  }

  export type papersCreateOrConnectWithoutUser_activity_logsInput = {
    where: papersWhereUniqueInput
    create: XOR<papersCreateWithoutUser_activity_logsInput, papersUncheckedCreateWithoutUser_activity_logsInput>
  }

  export type usersUpsertWithoutUser_activity_logsInput = {
    update: XOR<usersUpdateWithoutUser_activity_logsInput, usersUncheckedUpdateWithoutUser_activity_logsInput>
    create: XOR<usersCreateWithoutUser_activity_logsInput, usersUncheckedCreateWithoutUser_activity_logsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutUser_activity_logsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutUser_activity_logsInput, usersUncheckedUpdateWithoutUser_activity_logsInput>
  }

  export type usersUpdateWithoutUser_activity_logsInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUpdateManyWithoutCreatorNestedInput
  }

  export type usersUncheckedUpdateWithoutUser_activity_logsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
    backup_jobs?: backup_jobsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type papersUpsertWithoutUser_activity_logsInput = {
    update: XOR<papersUpdateWithoutUser_activity_logsInput, papersUncheckedUpdateWithoutUser_activity_logsInput>
    create: XOR<papersCreateWithoutUser_activity_logsInput, papersUncheckedCreateWithoutUser_activity_logsInput>
    where?: papersWhereInput
  }

  export type papersUpdateToOneWithWhereWithoutUser_activity_logsInput = {
    where?: papersWhereInput
    data: XOR<papersUpdateWithoutUser_activity_logsInput, papersUncheckedUpdateWithoutUser_activity_logsInput>
  }

  export type papersUpdateWithoutUser_activity_logsInput = {
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
  }

  export type papersUncheckedUpdateWithoutUser_activity_logsInput = {
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
  }

  export type usersCreateWithoutBackup_jobsInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsCreateNestedManyWithoutUsersInput
    faculty?: facultyCreateNestedOneWithoutUsersInput
    librarian?: librarianCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutBackup_jobsInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    profile_picture?: string | null
    password: string
    created_at?: Date | string | null
    role?: $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedCreateNestedManyWithoutUsersInput
    activity_logs?: activity_logsUncheckedCreateNestedManyWithoutUsersInput
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    librarian?: librarianUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutBackup_jobsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBackup_jobsInput, usersUncheckedCreateWithoutBackup_jobsInput>
  }

  export type usersUpsertWithoutBackup_jobsInput = {
    update: XOR<usersUpdateWithoutBackup_jobsInput, usersUncheckedUpdateWithoutBackup_jobsInput>
    create: XOR<usersCreateWithoutBackup_jobsInput, usersUncheckedCreateWithoutBackup_jobsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBackup_jobsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBackup_jobsInput, usersUncheckedUpdateWithoutBackup_jobsInput>
  }

  export type usersUpdateWithoutBackup_jobsInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUpdateManyWithoutUsersNestedInput
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    librarian?: librarianUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutBackup_jobsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: NullableEnumuser_roleFieldUpdateOperationsInput | $Enums.user_role | null
    user_activity_logs?: user_activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    activity_logs?: activity_logsUncheckedUpdateManyWithoutUsersNestedInput
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    librarian?: librarianUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type user_activity_logsCreateManyUsersInput = {
    activity_id?: number
    paper_id: number
    name: string
    activity: string
    created_at?: Date | string | null
    activity_type?: $Enums.activity_type | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    student_num: bigint | number
  }

  export type activity_logsCreateManyUsersInput = {
    name: string
    activity: string
    created_at?: Date | string
    act_id?: number
    activity_type?: $Enums.activity_type | null
    ip_address?: string | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
  }

  export type user_bookmarksCreateManyUsersInput = {
    bookmark_id?: number
    paper_id: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type backup_jobsCreateManyCreatorInput = {
    id?: string
    type: string
    status?: string
    created_at?: Date | string
    completed_at?: Date | string | null
    file_count?: number
    total_size?: string
    download_url?: string | null
    error_message?: string | null
  }

  export type user_activity_logsUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
    papers?: papersUpdateOneRequiredWithoutUser_activity_logsNestedInput
  }

  export type user_activity_logsUncheckedUpdateWithoutUsersInput = {
    activity_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type user_activity_logsUncheckedUpdateManyWithoutUsersInput = {
    activity_id?: IntFieldUpdateOperationsInput | number
    paper_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type activity_logsUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    librarian?: librarianUpdateOneRequiredWithoutActivity_logsNestedInput
  }

  export type activity_logsUncheckedUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    act_id?: IntFieldUpdateOperationsInput | number
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type activity_logsUncheckedUpdateManyWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    act_id?: IntFieldUpdateOperationsInput | number
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
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

  export type backup_jobsUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    file_count?: IntFieldUpdateOperationsInput | number
    total_size?: StringFieldUpdateOperationsInput | string
    download_url?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type backup_jobsUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    file_count?: IntFieldUpdateOperationsInput | number
    total_size?: StringFieldUpdateOperationsInput | string
    download_url?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type backup_jobsUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    file_count?: IntFieldUpdateOperationsInput | number
    total_size?: StringFieldUpdateOperationsInput | string
    download_url?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type activity_logsCreateManyLibrarianInput = {
    name: string
    activity: string
    created_at?: Date | string
    act_id?: number
    activity_type?: $Enums.activity_type | null
    ip_address?: string | null
    status?: string | null
    user_agent?: string | null
    user_id: number
  }

  export type activity_logsUpdateWithoutLibrarianInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneRequiredWithoutActivity_logsNestedInput
  }

  export type activity_logsUncheckedUpdateWithoutLibrarianInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    act_id?: IntFieldUpdateOperationsInput | number
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type activity_logsUncheckedUpdateManyWithoutLibrarianInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    act_id?: IntFieldUpdateOperationsInput | number
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
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

  export type user_activity_logsCreateManyPapersInput = {
    activity_id?: number
    user_id: number
    name: string
    activity: string
    created_at?: Date | string | null
    activity_type?: $Enums.activity_type | null
    status?: string | null
    user_agent?: string | null
    employee_id: bigint | number
    student_num: bigint | number
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

  export type user_activity_logsUpdateWithoutPapersInput = {
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
    users?: usersUpdateOneRequiredWithoutUser_activity_logsNestedInput
  }

  export type user_activity_logsUncheckedUpdateWithoutPapersInput = {
    activity_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type user_activity_logsUncheckedUpdateManyWithoutPapersInput = {
    activity_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activity_type?: NullableEnumactivity_typeFieldUpdateOperationsInput | $Enums.activity_type | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    employee_id?: BigIntFieldUpdateOperationsInput | bigint | number
    student_num?: BigIntFieldUpdateOperationsInput | bigint | number
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