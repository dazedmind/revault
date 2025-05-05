
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
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
    papers: 'papers',
    paper_metadata: 'paper_metadata',
    user_bookmarks: 'user_bookmarks',
    Otp: 'Otp'
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
      modelProps: "users" | "faculty" | "students" | "papers" | "paper_metadata" | "user_bookmarks" | "otp"
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
    papers?: papersOmit
    paper_metadata?: paper_metadataOmit
    user_bookmarks?: user_bookmarksOmit
    otp?: OtpOmit
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
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_bookmarks?: boolean | UsersCountOutputTypeCountUser_bookmarksArgs
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
   * Count Type PapersCountOutputType
   */

  export type PapersCountOutputType = {
    paper_metadata: number
    user_bookmarks: number
  }

  export type PapersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper_metadata?: boolean | PapersCountOutputTypeCountPaper_metadataArgs
    user_bookmarks?: boolean | PapersCountOutputTypeCountUser_bookmarksArgs
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
    role?: boolean
    password?: boolean
    created_at?: boolean
    faculty?: boolean | users$facultyArgs<ExtArgs>
    students?: boolean | users$studentsArgs<ExtArgs>
    user_bookmarks?: boolean | users$user_bookmarksArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    first_name?: boolean
    mid_name?: boolean
    last_name?: boolean
    ext_name?: boolean
    email?: boolean
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
    role?: boolean
    password?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "first_name" | "mid_name" | "last_name" | "ext_name" | "email" | "role" | "password" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    faculty?: boolean | users$facultyArgs<ExtArgs>
    students?: boolean | users$studentsArgs<ExtArgs>
    user_bookmarks?: boolean | users$user_bookmarksArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      faculty: Prisma.$facultyPayload<ExtArgs> | null
      students: Prisma.$studentsPayload<ExtArgs> | null
      user_bookmarks: Prisma.$user_bookmarksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      first_name: string | null
      mid_name: string | null
      last_name: string | null
      ext_name: string | null
      email: string
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
    user_bookmarks<T extends users$user_bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, users$user_bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_bookmarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    date: Date | null
    keywords: string | null
    tags: string | null
    abstract: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PapersMaxAggregateOutputType = {
    paper_id: number | null
    title: string | null
    author: string | null
    year: number | null
    date: Date | null
    keywords: string | null
    tags: string | null
    abstract: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PapersCountAggregateOutputType = {
    paper_id: number
    title: number
    author: number
    year: number
    date: number
    keywords: number
    tags: number
    abstract: number
    created_at: number
    updated_at: number
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
    date?: true
    keywords?: true
    tags?: true
    abstract?: true
    created_at?: true
    updated_at?: true
  }

  export type PapersMaxAggregateInputType = {
    paper_id?: true
    title?: true
    author?: true
    year?: true
    date?: true
    keywords?: true
    tags?: true
    abstract?: true
    created_at?: true
    updated_at?: true
  }

  export type PapersCountAggregateInputType = {
    paper_id?: true
    title?: true
    author?: true
    year?: true
    date?: true
    keywords?: true
    tags?: true
    abstract?: true
    created_at?: true
    updated_at?: true
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
    date: Date | null
    keywords: string | null
    tags: string | null
    abstract: string | null
    created_at: Date | null
    updated_at: Date | null
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
    date?: boolean
    keywords?: boolean
    tags?: boolean
    abstract?: boolean
    created_at?: boolean
    updated_at?: boolean
    paper_metadata?: boolean | papers$paper_metadataArgs<ExtArgs>
    user_bookmarks?: boolean | papers$user_bookmarksArgs<ExtArgs>
    _count?: boolean | PapersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["papers"]>

  export type papersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paper_id?: boolean
    title?: boolean
    author?: boolean
    year?: boolean
    date?: boolean
    keywords?: boolean
    tags?: boolean
    abstract?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["papers"]>

  export type papersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paper_id?: boolean
    title?: boolean
    author?: boolean
    year?: boolean
    date?: boolean
    keywords?: boolean
    tags?: boolean
    abstract?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["papers"]>

  export type papersSelectScalar = {
    paper_id?: boolean
    title?: boolean
    author?: boolean
    year?: boolean
    date?: boolean
    keywords?: boolean
    tags?: boolean
    abstract?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type papersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"paper_id" | "title" | "author" | "year" | "date" | "keywords" | "tags" | "abstract" | "created_at" | "updated_at", ExtArgs["result"]["papers"]>
  export type papersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper_metadata?: boolean | papers$paper_metadataArgs<ExtArgs>
    user_bookmarks?: boolean | papers$user_bookmarksArgs<ExtArgs>
    _count?: boolean | PapersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type papersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type papersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $papersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "papers"
    objects: {
      paper_metadata: Prisma.$paper_metadataPayload<ExtArgs>[]
      user_bookmarks: Prisma.$user_bookmarksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      paper_id: number
      title: string | null
      author: string | null
      year: number | null
      date: Date | null
      keywords: string | null
      tags: string | null
      abstract: string | null
      created_at: Date | null
      updated_at: Date | null
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
    readonly date: FieldRef<"papers", 'DateTime'>
    readonly keywords: FieldRef<"papers", 'String'>
    readonly tags: FieldRef<"papers", 'String'>
    readonly abstract: FieldRef<"papers", 'String'>
    readonly created_at: FieldRef<"papers", 'DateTime'>
    readonly updated_at: FieldRef<"papers", 'DateTime'>
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


  export const PapersScalarFieldEnum: {
    paper_id: 'paper_id',
    title: 'title',
    author: 'author',
    year: 'year',
    date: 'date',
    keywords: 'keywords',
    tags: 'tags',
    abstract: 'abstract',
    created_at: 'created_at',
    updated_at: 'updated_at'
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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


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
    role?: StringNullableFilter<"users"> | string | null
    password?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    faculty?: XOR<FacultyNullableScalarRelationFilter, facultyWhereInput> | null
    students?: XOR<StudentsNullableScalarRelationFilter, studentsWhereInput> | null
    user_bookmarks?: User_bookmarksListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    user_id?: SortOrder
    first_name?: SortOrderInput | SortOrder
    mid_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    ext_name?: SortOrderInput | SortOrder
    email?: SortOrder
    role?: SortOrderInput | SortOrder
    password?: SortOrder
    created_at?: SortOrderInput | SortOrder
    faculty?: facultyOrderByWithRelationInput
    students?: studentsOrderByWithRelationInput
    user_bookmarks?: user_bookmarksOrderByRelationAggregateInput
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
    role?: StringNullableFilter<"users"> | string | null
    password?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    faculty?: XOR<FacultyNullableScalarRelationFilter, facultyWhereInput> | null
    students?: XOR<StudentsNullableScalarRelationFilter, studentsWhereInput> | null
    user_bookmarks?: User_bookmarksListRelationFilter
  }, "user_id" | "email">

  export type usersOrderByWithAggregationInput = {
    user_id?: SortOrder
    first_name?: SortOrderInput | SortOrder
    mid_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    ext_name?: SortOrderInput | SortOrder
    email?: SortOrder
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
  }, "employee_id" | "user_id">

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

  export type papersWhereInput = {
    AND?: papersWhereInput | papersWhereInput[]
    OR?: papersWhereInput[]
    NOT?: papersWhereInput | papersWhereInput[]
    paper_id?: IntFilter<"papers"> | number
    title?: StringNullableFilter<"papers"> | string | null
    author?: StringNullableFilter<"papers"> | string | null
    year?: IntNullableFilter<"papers"> | number | null
    date?: DateTimeNullableFilter<"papers"> | Date | string | null
    keywords?: StringNullableFilter<"papers"> | string | null
    tags?: StringNullableFilter<"papers"> | string | null
    abstract?: StringNullableFilter<"papers"> | string | null
    created_at?: DateTimeNullableFilter<"papers"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"papers"> | Date | string | null
    paper_metadata?: Paper_metadataListRelationFilter
    user_bookmarks?: User_bookmarksListRelationFilter
  }

  export type papersOrderByWithRelationInput = {
    paper_id?: SortOrder
    title?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    abstract?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    paper_metadata?: paper_metadataOrderByRelationAggregateInput
    user_bookmarks?: user_bookmarksOrderByRelationAggregateInput
  }

  export type papersWhereUniqueInput = Prisma.AtLeast<{
    paper_id?: number
    AND?: papersWhereInput | papersWhereInput[]
    OR?: papersWhereInput[]
    NOT?: papersWhereInput | papersWhereInput[]
    title?: StringNullableFilter<"papers"> | string | null
    author?: StringNullableFilter<"papers"> | string | null
    year?: IntNullableFilter<"papers"> | number | null
    date?: DateTimeNullableFilter<"papers"> | Date | string | null
    keywords?: StringNullableFilter<"papers"> | string | null
    tags?: StringNullableFilter<"papers"> | string | null
    abstract?: StringNullableFilter<"papers"> | string | null
    created_at?: DateTimeNullableFilter<"papers"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"papers"> | Date | string | null
    paper_metadata?: Paper_metadataListRelationFilter
    user_bookmarks?: User_bookmarksListRelationFilter
  }, "paper_id">

  export type papersOrderByWithAggregationInput = {
    paper_id?: SortOrder
    title?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    abstract?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
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
    date?: DateTimeNullableWithAggregatesFilter<"papers"> | Date | string | null
    keywords?: StringNullableWithAggregatesFilter<"papers"> | string | null
    tags?: StringNullableWithAggregatesFilter<"papers"> | string | null
    abstract?: StringNullableWithAggregatesFilter<"papers"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"papers"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"papers"> | Date | string | null
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

  export type usersCreateInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
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
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type facultyCreateInput = {
    position?: string | null
    department?: string | null
    users: usersCreateNestedOneWithoutFacultyInput
  }

  export type facultyUncheckedCreateInput = {
    employee_id?: number
    position?: string | null
    department?: string | null
    user_id: number
  }

  export type facultyUpdateInput = {
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
    employee_id?: number
    position?: string | null
    department?: string | null
    user_id: number
  }

  export type facultyUpdateManyMutationInput = {
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

  export type papersCreateInput = {
    title?: string | null
    author?: string | null
    year?: number | null
    date?: Date | string | null
    keywords?: string | null
    tags?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_metadata?: paper_metadataCreateNestedManyWithoutPapersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutPapersInput
  }

  export type papersUncheckedCreateInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    date?: Date | string | null
    keywords?: string | null
    tags?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_metadata?: paper_metadataUncheckedCreateNestedManyWithoutPapersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutPapersInput
  }

  export type papersUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_metadata?: paper_metadataUpdateManyWithoutPapersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutPapersNestedInput
  }

  export type papersUncheckedUpdateInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_metadata?: paper_metadataUncheckedUpdateManyWithoutPapersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutPapersNestedInput
  }

  export type papersCreateManyInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    date?: Date | string | null
    keywords?: string | null
    tags?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type papersUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type papersUncheckedUpdateManyInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type User_bookmarksListRelationFilter = {
    every?: user_bookmarksWhereInput
    some?: user_bookmarksWhereInput
    none?: user_bookmarksWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type user_bookmarksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    user_id?: SortOrder
    first_name?: SortOrder
    mid_name?: SortOrder
    last_name?: SortOrder
    ext_name?: SortOrder
    email?: SortOrder
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
    date?: SortOrder
    keywords?: SortOrder
    tags?: SortOrder
    abstract?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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
    date?: SortOrder
    keywords?: SortOrder
    tags?: SortOrder
    abstract?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type papersMinOrderByAggregateInput = {
    paper_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    year?: SortOrder
    date?: SortOrder
    keywords?: SortOrder
    tags?: SortOrder
    abstract?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type user_bookmarksCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput> | user_bookmarksCreateWithoutUsersInput[] | user_bookmarksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutUsersInput | user_bookmarksCreateOrConnectWithoutUsersInput[]
    createMany?: user_bookmarksCreateManyUsersInputEnvelope
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
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

  export type user_bookmarksUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_bookmarksCreateWithoutUsersInput, user_bookmarksUncheckedCreateWithoutUsersInput> | user_bookmarksCreateWithoutUsersInput[] | user_bookmarksUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_bookmarksCreateOrConnectWithoutUsersInput | user_bookmarksCreateOrConnectWithoutUsersInput[]
    createMany?: user_bookmarksCreateManyUsersInputEnvelope
    connect?: user_bookmarksWhereUniqueInput | user_bookmarksWhereUniqueInput[]
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

  export type facultyCreateWithoutUsersInput = {
    position?: string | null
    department?: string | null
  }

  export type facultyUncheckedCreateWithoutUsersInput = {
    employee_id?: number
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

  export type usersCreateWithoutFacultyInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    role?: string | null
    password: string
    created_at?: Date | string | null
    students?: studentsCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutFacultyInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    role?: string | null
    password: string
    created_at?: Date | string | null
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
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
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    students?: studentsUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutFacultyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateWithoutStudentsInput = {
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutStudentsInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutUsersInput
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
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutStudentsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutUsersNestedInput
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

  export type papersCreateWithoutPaper_metadataInput = {
    title?: string | null
    author?: string | null
    year?: number | null
    date?: Date | string | null
    keywords?: string | null
    tags?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    user_bookmarks?: user_bookmarksCreateNestedManyWithoutPapersInput
  }

  export type papersUncheckedCreateWithoutPaper_metadataInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    date?: Date | string | null
    keywords?: string | null
    tags?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    user_bookmarks?: user_bookmarksUncheckedCreateNestedManyWithoutPapersInput
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
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_bookmarks?: user_bookmarksUpdateManyWithoutPapersNestedInput
  }

  export type papersUncheckedUpdateWithoutPaper_metadataInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_bookmarks?: user_bookmarksUncheckedUpdateManyWithoutPapersNestedInput
  }

  export type papersCreateWithoutUser_bookmarksInput = {
    title?: string | null
    author?: string | null
    year?: number | null
    date?: Date | string | null
    keywords?: string | null
    tags?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_metadata?: paper_metadataCreateNestedManyWithoutPapersInput
  }

  export type papersUncheckedCreateWithoutUser_bookmarksInput = {
    paper_id?: number
    title?: string | null
    author?: string | null
    year?: number | null
    date?: Date | string | null
    keywords?: string | null
    tags?: string | null
    abstract?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    paper_metadata?: paper_metadataUncheckedCreateNestedManyWithoutPapersInput
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
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyCreateNestedOneWithoutUsersInput
    students?: studentsCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutUser_bookmarksInput = {
    user_id?: number
    first_name?: string | null
    mid_name?: string | null
    last_name?: string | null
    ext_name?: string | null
    email: string
    role?: string | null
    password: string
    created_at?: Date | string | null
    faculty?: facultyUncheckedCreateNestedOneWithoutUsersInput
    students?: studentsUncheckedCreateNestedOneWithoutUsersInput
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
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_metadata?: paper_metadataUpdateManyWithoutPapersNestedInput
  }

  export type papersUncheckedUpdateWithoutUser_bookmarksInput = {
    paper_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    abstract?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper_metadata?: paper_metadataUncheckedUpdateManyWithoutPapersNestedInput
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
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUpdateOneWithoutUsersNestedInput
    students?: studentsUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutUser_bookmarksInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    mid_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    ext_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    faculty?: facultyUncheckedUpdateOneWithoutUsersNestedInput
    students?: studentsUncheckedUpdateOneWithoutUsersNestedInput
  }

  export type user_bookmarksCreateManyUsersInput = {
    bookmark_id?: number
    paper_id: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
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