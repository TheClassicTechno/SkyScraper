
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
 * Model Flight
 * 
 */
export type Flight = $Result.DefaultSelection<Prisma.$FlightPayload>
/**
 * Model Airline
 * 
 */
export type Airline = $Result.DefaultSelection<Prisma.$AirlinePayload>
/**
 * Model AirlineHub
 * 
 */
export type AirlineHub = $Result.DefaultSelection<Prisma.$AirlineHubPayload>
/**
 * Model Airport
 * 
 */
export type Airport = $Result.DefaultSelection<Prisma.$AirportPayload>
/**
 * Model Aircraft
 * 
 */
export type Aircraft = $Result.DefaultSelection<Prisma.$AircraftPayload>
/**
 * Model FlightRoute
 * 
 */
export type FlightRoute = $Result.DefaultSelection<Prisma.$FlightRoutePayload>
/**
 * Model WeatherAlert
 * 
 */
export type WeatherAlert = $Result.DefaultSelection<Prisma.$WeatherAlertPayload>
/**
 * Model RiskAssessment
 * 
 */
export type RiskAssessment = $Result.DefaultSelection<Prisma.$RiskAssessmentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Flights
 * const flights = await prisma.flight.findMany()
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
   * // Fetch zero or more Flights
   * const flights = await prisma.flight.findMany()
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
   * `prisma.flight`: Exposes CRUD operations for the **Flight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Flights
    * const flights = await prisma.flight.findMany()
    * ```
    */
  get flight(): Prisma.FlightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.airline`: Exposes CRUD operations for the **Airline** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Airlines
    * const airlines = await prisma.airline.findMany()
    * ```
    */
  get airline(): Prisma.AirlineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.airlineHub`: Exposes CRUD operations for the **AirlineHub** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AirlineHubs
    * const airlineHubs = await prisma.airlineHub.findMany()
    * ```
    */
  get airlineHub(): Prisma.AirlineHubDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.airport`: Exposes CRUD operations for the **Airport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Airports
    * const airports = await prisma.airport.findMany()
    * ```
    */
  get airport(): Prisma.AirportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aircraft`: Exposes CRUD operations for the **Aircraft** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Aircraft
    * const aircraft = await prisma.aircraft.findMany()
    * ```
    */
  get aircraft(): Prisma.AircraftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.flightRoute`: Exposes CRUD operations for the **FlightRoute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FlightRoutes
    * const flightRoutes = await prisma.flightRoute.findMany()
    * ```
    */
  get flightRoute(): Prisma.FlightRouteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weatherAlert`: Exposes CRUD operations for the **WeatherAlert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeatherAlerts
    * const weatherAlerts = await prisma.weatherAlert.findMany()
    * ```
    */
  get weatherAlert(): Prisma.WeatherAlertDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.riskAssessment`: Exposes CRUD operations for the **RiskAssessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiskAssessments
    * const riskAssessments = await prisma.riskAssessment.findMany()
    * ```
    */
  get riskAssessment(): Prisma.RiskAssessmentDelegate<ExtArgs, ClientOptions>;
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
    Flight: 'Flight',
    Airline: 'Airline',
    AirlineHub: 'AirlineHub',
    Airport: 'Airport',
    Aircraft: 'Aircraft',
    FlightRoute: 'FlightRoute',
    WeatherAlert: 'WeatherAlert',
    RiskAssessment: 'RiskAssessment'
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
      modelProps: "flight" | "airline" | "airlineHub" | "airport" | "aircraft" | "flightRoute" | "weatherAlert" | "riskAssessment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Flight: {
        payload: Prisma.$FlightPayload<ExtArgs>
        fields: Prisma.FlightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FlightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FlightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          findFirst: {
            args: Prisma.FlightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FlightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          findMany: {
            args: Prisma.FlightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>[]
          }
          create: {
            args: Prisma.FlightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          createMany: {
            args: Prisma.FlightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FlightCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>[]
          }
          delete: {
            args: Prisma.FlightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          update: {
            args: Prisma.FlightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          deleteMany: {
            args: Prisma.FlightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FlightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FlightUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>[]
          }
          upsert: {
            args: Prisma.FlightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          aggregate: {
            args: Prisma.FlightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFlight>
          }
          groupBy: {
            args: Prisma.FlightGroupByArgs<ExtArgs>
            result: $Utils.Optional<FlightGroupByOutputType>[]
          }
          count: {
            args: Prisma.FlightCountArgs<ExtArgs>
            result: $Utils.Optional<FlightCountAggregateOutputType> | number
          }
        }
      }
      Airline: {
        payload: Prisma.$AirlinePayload<ExtArgs>
        fields: Prisma.AirlineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AirlineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AirlineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          findFirst: {
            args: Prisma.AirlineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AirlineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          findMany: {
            args: Prisma.AirlineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>[]
          }
          create: {
            args: Prisma.AirlineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          createMany: {
            args: Prisma.AirlineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AirlineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>[]
          }
          delete: {
            args: Prisma.AirlineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          update: {
            args: Prisma.AirlineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          deleteMany: {
            args: Prisma.AirlineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AirlineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AirlineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>[]
          }
          upsert: {
            args: Prisma.AirlineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlinePayload>
          }
          aggregate: {
            args: Prisma.AirlineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAirline>
          }
          groupBy: {
            args: Prisma.AirlineGroupByArgs<ExtArgs>
            result: $Utils.Optional<AirlineGroupByOutputType>[]
          }
          count: {
            args: Prisma.AirlineCountArgs<ExtArgs>
            result: $Utils.Optional<AirlineCountAggregateOutputType> | number
          }
        }
      }
      AirlineHub: {
        payload: Prisma.$AirlineHubPayload<ExtArgs>
        fields: Prisma.AirlineHubFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AirlineHubFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AirlineHubFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload>
          }
          findFirst: {
            args: Prisma.AirlineHubFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AirlineHubFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload>
          }
          findMany: {
            args: Prisma.AirlineHubFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload>[]
          }
          create: {
            args: Prisma.AirlineHubCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload>
          }
          createMany: {
            args: Prisma.AirlineHubCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AirlineHubCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload>[]
          }
          delete: {
            args: Prisma.AirlineHubDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload>
          }
          update: {
            args: Prisma.AirlineHubUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload>
          }
          deleteMany: {
            args: Prisma.AirlineHubDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AirlineHubUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AirlineHubUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload>[]
          }
          upsert: {
            args: Prisma.AirlineHubUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirlineHubPayload>
          }
          aggregate: {
            args: Prisma.AirlineHubAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAirlineHub>
          }
          groupBy: {
            args: Prisma.AirlineHubGroupByArgs<ExtArgs>
            result: $Utils.Optional<AirlineHubGroupByOutputType>[]
          }
          count: {
            args: Prisma.AirlineHubCountArgs<ExtArgs>
            result: $Utils.Optional<AirlineHubCountAggregateOutputType> | number
          }
        }
      }
      Airport: {
        payload: Prisma.$AirportPayload<ExtArgs>
        fields: Prisma.AirportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AirportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AirportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          findFirst: {
            args: Prisma.AirportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AirportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          findMany: {
            args: Prisma.AirportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>[]
          }
          create: {
            args: Prisma.AirportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          createMany: {
            args: Prisma.AirportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AirportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>[]
          }
          delete: {
            args: Prisma.AirportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          update: {
            args: Prisma.AirportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          deleteMany: {
            args: Prisma.AirportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AirportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AirportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>[]
          }
          upsert: {
            args: Prisma.AirportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          aggregate: {
            args: Prisma.AirportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAirport>
          }
          groupBy: {
            args: Prisma.AirportGroupByArgs<ExtArgs>
            result: $Utils.Optional<AirportGroupByOutputType>[]
          }
          count: {
            args: Prisma.AirportCountArgs<ExtArgs>
            result: $Utils.Optional<AirportCountAggregateOutputType> | number
          }
        }
      }
      Aircraft: {
        payload: Prisma.$AircraftPayload<ExtArgs>
        fields: Prisma.AircraftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AircraftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AircraftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          findFirst: {
            args: Prisma.AircraftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AircraftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          findMany: {
            args: Prisma.AircraftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>[]
          }
          create: {
            args: Prisma.AircraftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          createMany: {
            args: Prisma.AircraftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AircraftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>[]
          }
          delete: {
            args: Prisma.AircraftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          update: {
            args: Prisma.AircraftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          deleteMany: {
            args: Prisma.AircraftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AircraftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AircraftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>[]
          }
          upsert: {
            args: Prisma.AircraftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          aggregate: {
            args: Prisma.AircraftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAircraft>
          }
          groupBy: {
            args: Prisma.AircraftGroupByArgs<ExtArgs>
            result: $Utils.Optional<AircraftGroupByOutputType>[]
          }
          count: {
            args: Prisma.AircraftCountArgs<ExtArgs>
            result: $Utils.Optional<AircraftCountAggregateOutputType> | number
          }
        }
      }
      FlightRoute: {
        payload: Prisma.$FlightRoutePayload<ExtArgs>
        fields: Prisma.FlightRouteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FlightRouteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FlightRouteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload>
          }
          findFirst: {
            args: Prisma.FlightRouteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FlightRouteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload>
          }
          findMany: {
            args: Prisma.FlightRouteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload>[]
          }
          create: {
            args: Prisma.FlightRouteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload>
          }
          createMany: {
            args: Prisma.FlightRouteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FlightRouteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload>[]
          }
          delete: {
            args: Prisma.FlightRouteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload>
          }
          update: {
            args: Prisma.FlightRouteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload>
          }
          deleteMany: {
            args: Prisma.FlightRouteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FlightRouteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FlightRouteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload>[]
          }
          upsert: {
            args: Prisma.FlightRouteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightRoutePayload>
          }
          aggregate: {
            args: Prisma.FlightRouteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFlightRoute>
          }
          groupBy: {
            args: Prisma.FlightRouteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FlightRouteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FlightRouteCountArgs<ExtArgs>
            result: $Utils.Optional<FlightRouteCountAggregateOutputType> | number
          }
        }
      }
      WeatherAlert: {
        payload: Prisma.$WeatherAlertPayload<ExtArgs>
        fields: Prisma.WeatherAlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeatherAlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeatherAlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload>
          }
          findFirst: {
            args: Prisma.WeatherAlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeatherAlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload>
          }
          findMany: {
            args: Prisma.WeatherAlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload>[]
          }
          create: {
            args: Prisma.WeatherAlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload>
          }
          createMany: {
            args: Prisma.WeatherAlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeatherAlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload>[]
          }
          delete: {
            args: Prisma.WeatherAlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload>
          }
          update: {
            args: Prisma.WeatherAlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload>
          }
          deleteMany: {
            args: Prisma.WeatherAlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeatherAlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeatherAlertUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload>[]
          }
          upsert: {
            args: Prisma.WeatherAlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherAlertPayload>
          }
          aggregate: {
            args: Prisma.WeatherAlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeatherAlert>
          }
          groupBy: {
            args: Prisma.WeatherAlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeatherAlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeatherAlertCountArgs<ExtArgs>
            result: $Utils.Optional<WeatherAlertCountAggregateOutputType> | number
          }
        }
      }
      RiskAssessment: {
        payload: Prisma.$RiskAssessmentPayload<ExtArgs>
        fields: Prisma.RiskAssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiskAssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiskAssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          findFirst: {
            args: Prisma.RiskAssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiskAssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          findMany: {
            args: Prisma.RiskAssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>[]
          }
          create: {
            args: Prisma.RiskAssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          createMany: {
            args: Prisma.RiskAssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiskAssessmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>[]
          }
          delete: {
            args: Prisma.RiskAssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          update: {
            args: Prisma.RiskAssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          deleteMany: {
            args: Prisma.RiskAssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiskAssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RiskAssessmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>[]
          }
          upsert: {
            args: Prisma.RiskAssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          aggregate: {
            args: Prisma.RiskAssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiskAssessment>
          }
          groupBy: {
            args: Prisma.RiskAssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiskAssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiskAssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<RiskAssessmentCountAggregateOutputType> | number
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
    flight?: FlightOmit
    airline?: AirlineOmit
    airlineHub?: AirlineHubOmit
    airport?: AirportOmit
    aircraft?: AircraftOmit
    flightRoute?: FlightRouteOmit
    weatherAlert?: WeatherAlertOmit
    riskAssessment?: RiskAssessmentOmit
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
   * Count Type AirlineCountOutputType
   */

  export type AirlineCountOutputType = {
    flights: number
    hubs: number
    routes: number
  }

  export type AirlineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flights?: boolean | AirlineCountOutputTypeCountFlightsArgs
    hubs?: boolean | AirlineCountOutputTypeCountHubsArgs
    routes?: boolean | AirlineCountOutputTypeCountRoutesArgs
  }

  // Custom InputTypes
  /**
   * AirlineCountOutputType without action
   */
  export type AirlineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineCountOutputType
     */
    select?: AirlineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AirlineCountOutputType without action
   */
  export type AirlineCountOutputTypeCountFlightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightWhereInput
  }

  /**
   * AirlineCountOutputType without action
   */
  export type AirlineCountOutputTypeCountHubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirlineHubWhereInput
  }

  /**
   * AirlineCountOutputType without action
   */
  export type AirlineCountOutputTypeCountRoutesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightRouteWhereInput
  }


  /**
   * Count Type AirportCountOutputType
   */

  export type AirportCountOutputType = {
    departureFlights: number
    arrivalFlights: number
    hubs: number
    routeOrigins: number
    routeDestinations: number
  }

  export type AirportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departureFlights?: boolean | AirportCountOutputTypeCountDepartureFlightsArgs
    arrivalFlights?: boolean | AirportCountOutputTypeCountArrivalFlightsArgs
    hubs?: boolean | AirportCountOutputTypeCountHubsArgs
    routeOrigins?: boolean | AirportCountOutputTypeCountRouteOriginsArgs
    routeDestinations?: boolean | AirportCountOutputTypeCountRouteDestinationsArgs
  }

  // Custom InputTypes
  /**
   * AirportCountOutputType without action
   */
  export type AirportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportCountOutputType
     */
    select?: AirportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AirportCountOutputType without action
   */
  export type AirportCountOutputTypeCountDepartureFlightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightWhereInput
  }

  /**
   * AirportCountOutputType without action
   */
  export type AirportCountOutputTypeCountArrivalFlightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightWhereInput
  }

  /**
   * AirportCountOutputType without action
   */
  export type AirportCountOutputTypeCountHubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirlineHubWhereInput
  }

  /**
   * AirportCountOutputType without action
   */
  export type AirportCountOutputTypeCountRouteOriginsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightRouteWhereInput
  }

  /**
   * AirportCountOutputType without action
   */
  export type AirportCountOutputTypeCountRouteDestinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightRouteWhereInput
  }


  /**
   * Count Type AircraftCountOutputType
   */

  export type AircraftCountOutputType = {
    flights: number
  }

  export type AircraftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flights?: boolean | AircraftCountOutputTypeCountFlightsArgs
  }

  // Custom InputTypes
  /**
   * AircraftCountOutputType without action
   */
  export type AircraftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftCountOutputType
     */
    select?: AircraftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AircraftCountOutputType without action
   */
  export type AircraftCountOutputTypeCountFlightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Flight
   */

  export type AggregateFlight = {
    _count: FlightCountAggregateOutputType | null
    _avg: FlightAvgAggregateOutputType | null
    _sum: FlightSumAggregateOutputType | null
    _min: FlightMinAggregateOutputType | null
    _max: FlightMaxAggregateOutputType | null
  }

  export type FlightAvgAggregateOutputType = {
    departureDelay: number | null
    arrivalDelay: number | null
    latitude: number | null
    longitude: number | null
    altitude: number | null
    speed: number | null
    heading: number | null
    verticalRate: number | null
    riskScore: number | null
  }

  export type FlightSumAggregateOutputType = {
    departureDelay: number | null
    arrivalDelay: number | null
    latitude: number | null
    longitude: number | null
    altitude: number | null
    speed: number | null
    heading: number | null
    verticalRate: number | null
    riskScore: number | null
  }

  export type FlightMinAggregateOutputType = {
    id: string | null
    flightNumber: string | null
    iataCode: string | null
    icaoCode: string | null
    status: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    airlineId: string | null
    departureId: string | null
    arrivalId: string | null
    aircraftId: string | null
    departureTime: Date | null
    arrivalTime: Date | null
    departureDelay: number | null
    arrivalDelay: number | null
    departureTerminal: string | null
    arrivalTerminal: string | null
    departureGate: string | null
    arrivalGate: string | null
    departureRunway: string | null
    arrivalRunway: string | null
    baggageClaim: string | null
    latitude: number | null
    longitude: number | null
    altitude: number | null
    speed: number | null
    heading: number | null
    verticalRate: number | null
    onGround: boolean | null
    lastUpdate: Date | null
    riskScore: number | null
    weather: string | null
    atcLoad: string | null
  }

  export type FlightMaxAggregateOutputType = {
    id: string | null
    flightNumber: string | null
    iataCode: string | null
    icaoCode: string | null
    status: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    airlineId: string | null
    departureId: string | null
    arrivalId: string | null
    aircraftId: string | null
    departureTime: Date | null
    arrivalTime: Date | null
    departureDelay: number | null
    arrivalDelay: number | null
    departureTerminal: string | null
    arrivalTerminal: string | null
    departureGate: string | null
    arrivalGate: string | null
    departureRunway: string | null
    arrivalRunway: string | null
    baggageClaim: string | null
    latitude: number | null
    longitude: number | null
    altitude: number | null
    speed: number | null
    heading: number | null
    verticalRate: number | null
    onGround: boolean | null
    lastUpdate: Date | null
    riskScore: number | null
    weather: string | null
    atcLoad: string | null
  }

  export type FlightCountAggregateOutputType = {
    id: number
    flightNumber: number
    iataCode: number
    icaoCode: number
    status: number
    date: number
    createdAt: number
    updatedAt: number
    airlineId: number
    departureId: number
    arrivalId: number
    aircraftId: number
    departureTime: number
    arrivalTime: number
    departureDelay: number
    arrivalDelay: number
    departureTerminal: number
    arrivalTerminal: number
    departureGate: number
    arrivalGate: number
    departureRunway: number
    arrivalRunway: number
    baggageClaim: number
    latitude: number
    longitude: number
    altitude: number
    speed: number
    heading: number
    verticalRate: number
    onGround: number
    lastUpdate: number
    riskScore: number
    weather: number
    atcLoad: number
    _all: number
  }


  export type FlightAvgAggregateInputType = {
    departureDelay?: true
    arrivalDelay?: true
    latitude?: true
    longitude?: true
    altitude?: true
    speed?: true
    heading?: true
    verticalRate?: true
    riskScore?: true
  }

  export type FlightSumAggregateInputType = {
    departureDelay?: true
    arrivalDelay?: true
    latitude?: true
    longitude?: true
    altitude?: true
    speed?: true
    heading?: true
    verticalRate?: true
    riskScore?: true
  }

  export type FlightMinAggregateInputType = {
    id?: true
    flightNumber?: true
    iataCode?: true
    icaoCode?: true
    status?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    airlineId?: true
    departureId?: true
    arrivalId?: true
    aircraftId?: true
    departureTime?: true
    arrivalTime?: true
    departureDelay?: true
    arrivalDelay?: true
    departureTerminal?: true
    arrivalTerminal?: true
    departureGate?: true
    arrivalGate?: true
    departureRunway?: true
    arrivalRunway?: true
    baggageClaim?: true
    latitude?: true
    longitude?: true
    altitude?: true
    speed?: true
    heading?: true
    verticalRate?: true
    onGround?: true
    lastUpdate?: true
    riskScore?: true
    weather?: true
    atcLoad?: true
  }

  export type FlightMaxAggregateInputType = {
    id?: true
    flightNumber?: true
    iataCode?: true
    icaoCode?: true
    status?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    airlineId?: true
    departureId?: true
    arrivalId?: true
    aircraftId?: true
    departureTime?: true
    arrivalTime?: true
    departureDelay?: true
    arrivalDelay?: true
    departureTerminal?: true
    arrivalTerminal?: true
    departureGate?: true
    arrivalGate?: true
    departureRunway?: true
    arrivalRunway?: true
    baggageClaim?: true
    latitude?: true
    longitude?: true
    altitude?: true
    speed?: true
    heading?: true
    verticalRate?: true
    onGround?: true
    lastUpdate?: true
    riskScore?: true
    weather?: true
    atcLoad?: true
  }

  export type FlightCountAggregateInputType = {
    id?: true
    flightNumber?: true
    iataCode?: true
    icaoCode?: true
    status?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    airlineId?: true
    departureId?: true
    arrivalId?: true
    aircraftId?: true
    departureTime?: true
    arrivalTime?: true
    departureDelay?: true
    arrivalDelay?: true
    departureTerminal?: true
    arrivalTerminal?: true
    departureGate?: true
    arrivalGate?: true
    departureRunway?: true
    arrivalRunway?: true
    baggageClaim?: true
    latitude?: true
    longitude?: true
    altitude?: true
    speed?: true
    heading?: true
    verticalRate?: true
    onGround?: true
    lastUpdate?: true
    riskScore?: true
    weather?: true
    atcLoad?: true
    _all?: true
  }

  export type FlightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flight to aggregate.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Flights
    **/
    _count?: true | FlightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FlightAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FlightSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FlightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FlightMaxAggregateInputType
  }

  export type GetFlightAggregateType<T extends FlightAggregateArgs> = {
        [P in keyof T & keyof AggregateFlight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFlight[P]>
      : GetScalarType<T[P], AggregateFlight[P]>
  }




  export type FlightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightWhereInput
    orderBy?: FlightOrderByWithAggregationInput | FlightOrderByWithAggregationInput[]
    by: FlightScalarFieldEnum[] | FlightScalarFieldEnum
    having?: FlightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FlightCountAggregateInputType | true
    _avg?: FlightAvgAggregateInputType
    _sum?: FlightSumAggregateInputType
    _min?: FlightMinAggregateInputType
    _max?: FlightMaxAggregateInputType
  }

  export type FlightGroupByOutputType = {
    id: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status: string
    date: Date
    createdAt: Date
    updatedAt: Date
    airlineId: string
    departureId: string
    arrivalId: string
    aircraftId: string | null
    departureTime: Date
    arrivalTime: Date
    departureDelay: number
    arrivalDelay: number
    departureTerminal: string | null
    arrivalTerminal: string | null
    departureGate: string | null
    arrivalGate: string | null
    departureRunway: string | null
    arrivalRunway: string | null
    baggageClaim: string | null
    latitude: number | null
    longitude: number | null
    altitude: number | null
    speed: number | null
    heading: number | null
    verticalRate: number | null
    onGround: boolean
    lastUpdate: Date | null
    riskScore: number
    weather: string
    atcLoad: string
    _count: FlightCountAggregateOutputType | null
    _avg: FlightAvgAggregateOutputType | null
    _sum: FlightSumAggregateOutputType | null
    _min: FlightMinAggregateOutputType | null
    _max: FlightMaxAggregateOutputType | null
  }

  type GetFlightGroupByPayload<T extends FlightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FlightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FlightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FlightGroupByOutputType[P]>
            : GetScalarType<T[P], FlightGroupByOutputType[P]>
        }
      >
    >


  export type FlightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    flightNumber?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    status?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airlineId?: boolean
    departureId?: boolean
    arrivalId?: boolean
    aircraftId?: boolean
    departureTime?: boolean
    arrivalTime?: boolean
    departureDelay?: boolean
    arrivalDelay?: boolean
    departureTerminal?: boolean
    arrivalTerminal?: boolean
    departureGate?: boolean
    arrivalGate?: boolean
    departureRunway?: boolean
    arrivalRunway?: boolean
    baggageClaim?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    speed?: boolean
    heading?: boolean
    verticalRate?: boolean
    onGround?: boolean
    lastUpdate?: boolean
    riskScore?: boolean
    weather?: boolean
    atcLoad?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    departure?: boolean | AirportDefaultArgs<ExtArgs>
    arrival?: boolean | AirportDefaultArgs<ExtArgs>
    aircraft?: boolean | Flight$aircraftArgs<ExtArgs>
    riskAssessment?: boolean | Flight$riskAssessmentArgs<ExtArgs>
  }, ExtArgs["result"]["flight"]>

  export type FlightSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    flightNumber?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    status?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airlineId?: boolean
    departureId?: boolean
    arrivalId?: boolean
    aircraftId?: boolean
    departureTime?: boolean
    arrivalTime?: boolean
    departureDelay?: boolean
    arrivalDelay?: boolean
    departureTerminal?: boolean
    arrivalTerminal?: boolean
    departureGate?: boolean
    arrivalGate?: boolean
    departureRunway?: boolean
    arrivalRunway?: boolean
    baggageClaim?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    speed?: boolean
    heading?: boolean
    verticalRate?: boolean
    onGround?: boolean
    lastUpdate?: boolean
    riskScore?: boolean
    weather?: boolean
    atcLoad?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    departure?: boolean | AirportDefaultArgs<ExtArgs>
    arrival?: boolean | AirportDefaultArgs<ExtArgs>
    aircraft?: boolean | Flight$aircraftArgs<ExtArgs>
  }, ExtArgs["result"]["flight"]>

  export type FlightSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    flightNumber?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    status?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airlineId?: boolean
    departureId?: boolean
    arrivalId?: boolean
    aircraftId?: boolean
    departureTime?: boolean
    arrivalTime?: boolean
    departureDelay?: boolean
    arrivalDelay?: boolean
    departureTerminal?: boolean
    arrivalTerminal?: boolean
    departureGate?: boolean
    arrivalGate?: boolean
    departureRunway?: boolean
    arrivalRunway?: boolean
    baggageClaim?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    speed?: boolean
    heading?: boolean
    verticalRate?: boolean
    onGround?: boolean
    lastUpdate?: boolean
    riskScore?: boolean
    weather?: boolean
    atcLoad?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    departure?: boolean | AirportDefaultArgs<ExtArgs>
    arrival?: boolean | AirportDefaultArgs<ExtArgs>
    aircraft?: boolean | Flight$aircraftArgs<ExtArgs>
  }, ExtArgs["result"]["flight"]>

  export type FlightSelectScalar = {
    id?: boolean
    flightNumber?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    status?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airlineId?: boolean
    departureId?: boolean
    arrivalId?: boolean
    aircraftId?: boolean
    departureTime?: boolean
    arrivalTime?: boolean
    departureDelay?: boolean
    arrivalDelay?: boolean
    departureTerminal?: boolean
    arrivalTerminal?: boolean
    departureGate?: boolean
    arrivalGate?: boolean
    departureRunway?: boolean
    arrivalRunway?: boolean
    baggageClaim?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    speed?: boolean
    heading?: boolean
    verticalRate?: boolean
    onGround?: boolean
    lastUpdate?: boolean
    riskScore?: boolean
    weather?: boolean
    atcLoad?: boolean
  }

  export type FlightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "flightNumber" | "iataCode" | "icaoCode" | "status" | "date" | "createdAt" | "updatedAt" | "airlineId" | "departureId" | "arrivalId" | "aircraftId" | "departureTime" | "arrivalTime" | "departureDelay" | "arrivalDelay" | "departureTerminal" | "arrivalTerminal" | "departureGate" | "arrivalGate" | "departureRunway" | "arrivalRunway" | "baggageClaim" | "latitude" | "longitude" | "altitude" | "speed" | "heading" | "verticalRate" | "onGround" | "lastUpdate" | "riskScore" | "weather" | "atcLoad", ExtArgs["result"]["flight"]>
  export type FlightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    departure?: boolean | AirportDefaultArgs<ExtArgs>
    arrival?: boolean | AirportDefaultArgs<ExtArgs>
    aircraft?: boolean | Flight$aircraftArgs<ExtArgs>
    riskAssessment?: boolean | Flight$riskAssessmentArgs<ExtArgs>
  }
  export type FlightIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    departure?: boolean | AirportDefaultArgs<ExtArgs>
    arrival?: boolean | AirportDefaultArgs<ExtArgs>
    aircraft?: boolean | Flight$aircraftArgs<ExtArgs>
  }
  export type FlightIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    departure?: boolean | AirportDefaultArgs<ExtArgs>
    arrival?: boolean | AirportDefaultArgs<ExtArgs>
    aircraft?: boolean | Flight$aircraftArgs<ExtArgs>
  }

  export type $FlightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Flight"
    objects: {
      airline: Prisma.$AirlinePayload<ExtArgs>
      departure: Prisma.$AirportPayload<ExtArgs>
      arrival: Prisma.$AirportPayload<ExtArgs>
      aircraft: Prisma.$AircraftPayload<ExtArgs> | null
      riskAssessment: Prisma.$RiskAssessmentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      flightNumber: string
      iataCode: string
      icaoCode: string
      status: string
      date: Date
      createdAt: Date
      updatedAt: Date
      airlineId: string
      departureId: string
      arrivalId: string
      aircraftId: string | null
      departureTime: Date
      arrivalTime: Date
      departureDelay: number
      arrivalDelay: number
      departureTerminal: string | null
      arrivalTerminal: string | null
      departureGate: string | null
      arrivalGate: string | null
      departureRunway: string | null
      arrivalRunway: string | null
      baggageClaim: string | null
      latitude: number | null
      longitude: number | null
      altitude: number | null
      speed: number | null
      heading: number | null
      verticalRate: number | null
      onGround: boolean
      lastUpdate: Date | null
      riskScore: number
      weather: string
      atcLoad: string
    }, ExtArgs["result"]["flight"]>
    composites: {}
  }

  type FlightGetPayload<S extends boolean | null | undefined | FlightDefaultArgs> = $Result.GetResult<Prisma.$FlightPayload, S>

  type FlightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FlightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FlightCountAggregateInputType | true
    }

  export interface FlightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Flight'], meta: { name: 'Flight' } }
    /**
     * Find zero or one Flight that matches the filter.
     * @param {FlightFindUniqueArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlightFindUniqueArgs>(args: SelectSubset<T, FlightFindUniqueArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Flight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlightFindUniqueOrThrowArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlightFindUniqueOrThrowArgs>(args: SelectSubset<T, FlightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightFindFirstArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlightFindFirstArgs>(args?: SelectSubset<T, FlightFindFirstArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightFindFirstOrThrowArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlightFindFirstOrThrowArgs>(args?: SelectSubset<T, FlightFindFirstOrThrowArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Flights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Flights
     * const flights = await prisma.flight.findMany()
     * 
     * // Get first 10 Flights
     * const flights = await prisma.flight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const flightWithIdOnly = await prisma.flight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FlightFindManyArgs>(args?: SelectSubset<T, FlightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Flight.
     * @param {FlightCreateArgs} args - Arguments to create a Flight.
     * @example
     * // Create one Flight
     * const Flight = await prisma.flight.create({
     *   data: {
     *     // ... data to create a Flight
     *   }
     * })
     * 
     */
    create<T extends FlightCreateArgs>(args: SelectSubset<T, FlightCreateArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Flights.
     * @param {FlightCreateManyArgs} args - Arguments to create many Flights.
     * @example
     * // Create many Flights
     * const flight = await prisma.flight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FlightCreateManyArgs>(args?: SelectSubset<T, FlightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Flights and returns the data saved in the database.
     * @param {FlightCreateManyAndReturnArgs} args - Arguments to create many Flights.
     * @example
     * // Create many Flights
     * const flight = await prisma.flight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Flights and only return the `id`
     * const flightWithIdOnly = await prisma.flight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FlightCreateManyAndReturnArgs>(args?: SelectSubset<T, FlightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Flight.
     * @param {FlightDeleteArgs} args - Arguments to delete one Flight.
     * @example
     * // Delete one Flight
     * const Flight = await prisma.flight.delete({
     *   where: {
     *     // ... filter to delete one Flight
     *   }
     * })
     * 
     */
    delete<T extends FlightDeleteArgs>(args: SelectSubset<T, FlightDeleteArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Flight.
     * @param {FlightUpdateArgs} args - Arguments to update one Flight.
     * @example
     * // Update one Flight
     * const flight = await prisma.flight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FlightUpdateArgs>(args: SelectSubset<T, FlightUpdateArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Flights.
     * @param {FlightDeleteManyArgs} args - Arguments to filter Flights to delete.
     * @example
     * // Delete a few Flights
     * const { count } = await prisma.flight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FlightDeleteManyArgs>(args?: SelectSubset<T, FlightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Flights
     * const flight = await prisma.flight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FlightUpdateManyArgs>(args: SelectSubset<T, FlightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flights and returns the data updated in the database.
     * @param {FlightUpdateManyAndReturnArgs} args - Arguments to update many Flights.
     * @example
     * // Update many Flights
     * const flight = await prisma.flight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Flights and only return the `id`
     * const flightWithIdOnly = await prisma.flight.updateManyAndReturn({
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
    updateManyAndReturn<T extends FlightUpdateManyAndReturnArgs>(args: SelectSubset<T, FlightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Flight.
     * @param {FlightUpsertArgs} args - Arguments to update or create a Flight.
     * @example
     * // Update or create a Flight
     * const flight = await prisma.flight.upsert({
     *   create: {
     *     // ... data to create a Flight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Flight we want to update
     *   }
     * })
     */
    upsert<T extends FlightUpsertArgs>(args: SelectSubset<T, FlightUpsertArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Flights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightCountArgs} args - Arguments to filter Flights to count.
     * @example
     * // Count the number of Flights
     * const count = await prisma.flight.count({
     *   where: {
     *     // ... the filter for the Flights we want to count
     *   }
     * })
    **/
    count<T extends FlightCountArgs>(
      args?: Subset<T, FlightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FlightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Flight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FlightAggregateArgs>(args: Subset<T, FlightAggregateArgs>): Prisma.PrismaPromise<GetFlightAggregateType<T>>

    /**
     * Group by Flight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightGroupByArgs} args - Group by arguments.
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
      T extends FlightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FlightGroupByArgs['orderBy'] }
        : { orderBy?: FlightGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FlightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Flight model
   */
  readonly fields: FlightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Flight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FlightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    airline<T extends AirlineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirlineDefaultArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    departure<T extends AirportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirportDefaultArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    arrival<T extends AirportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirportDefaultArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    aircraft<T extends Flight$aircraftArgs<ExtArgs> = {}>(args?: Subset<T, Flight$aircraftArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    riskAssessment<T extends Flight$riskAssessmentArgs<ExtArgs> = {}>(args?: Subset<T, Flight$riskAssessmentArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Flight model
   */
  interface FlightFieldRefs {
    readonly id: FieldRef<"Flight", 'String'>
    readonly flightNumber: FieldRef<"Flight", 'String'>
    readonly iataCode: FieldRef<"Flight", 'String'>
    readonly icaoCode: FieldRef<"Flight", 'String'>
    readonly status: FieldRef<"Flight", 'String'>
    readonly date: FieldRef<"Flight", 'DateTime'>
    readonly createdAt: FieldRef<"Flight", 'DateTime'>
    readonly updatedAt: FieldRef<"Flight", 'DateTime'>
    readonly airlineId: FieldRef<"Flight", 'String'>
    readonly departureId: FieldRef<"Flight", 'String'>
    readonly arrivalId: FieldRef<"Flight", 'String'>
    readonly aircraftId: FieldRef<"Flight", 'String'>
    readonly departureTime: FieldRef<"Flight", 'DateTime'>
    readonly arrivalTime: FieldRef<"Flight", 'DateTime'>
    readonly departureDelay: FieldRef<"Flight", 'Int'>
    readonly arrivalDelay: FieldRef<"Flight", 'Int'>
    readonly departureTerminal: FieldRef<"Flight", 'String'>
    readonly arrivalTerminal: FieldRef<"Flight", 'String'>
    readonly departureGate: FieldRef<"Flight", 'String'>
    readonly arrivalGate: FieldRef<"Flight", 'String'>
    readonly departureRunway: FieldRef<"Flight", 'String'>
    readonly arrivalRunway: FieldRef<"Flight", 'String'>
    readonly baggageClaim: FieldRef<"Flight", 'String'>
    readonly latitude: FieldRef<"Flight", 'Float'>
    readonly longitude: FieldRef<"Flight", 'Float'>
    readonly altitude: FieldRef<"Flight", 'Float'>
    readonly speed: FieldRef<"Flight", 'Float'>
    readonly heading: FieldRef<"Flight", 'Float'>
    readonly verticalRate: FieldRef<"Flight", 'Float'>
    readonly onGround: FieldRef<"Flight", 'Boolean'>
    readonly lastUpdate: FieldRef<"Flight", 'DateTime'>
    readonly riskScore: FieldRef<"Flight", 'Int'>
    readonly weather: FieldRef<"Flight", 'String'>
    readonly atcLoad: FieldRef<"Flight", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Flight findUnique
   */
  export type FlightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight findUniqueOrThrow
   */
  export type FlightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight findFirst
   */
  export type FlightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flights.
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flights.
     */
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Flight findFirstOrThrow
   */
  export type FlightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flights.
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flights.
     */
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Flight findMany
   */
  export type FlightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flights to fetch.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Flights.
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Flight create
   */
  export type FlightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * The data needed to create a Flight.
     */
    data: XOR<FlightCreateInput, FlightUncheckedCreateInput>
  }

  /**
   * Flight createMany
   */
  export type FlightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Flights.
     */
    data: FlightCreateManyInput | FlightCreateManyInput[]
  }

  /**
   * Flight createManyAndReturn
   */
  export type FlightCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * The data used to create many Flights.
     */
    data: FlightCreateManyInput | FlightCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Flight update
   */
  export type FlightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * The data needed to update a Flight.
     */
    data: XOR<FlightUpdateInput, FlightUncheckedUpdateInput>
    /**
     * Choose, which Flight to update.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight updateMany
   */
  export type FlightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Flights.
     */
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyInput>
    /**
     * Filter which Flights to update
     */
    where?: FlightWhereInput
    /**
     * Limit how many Flights to update.
     */
    limit?: number
  }

  /**
   * Flight updateManyAndReturn
   */
  export type FlightUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * The data used to update Flights.
     */
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyInput>
    /**
     * Filter which Flights to update
     */
    where?: FlightWhereInput
    /**
     * Limit how many Flights to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Flight upsert
   */
  export type FlightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * The filter to search for the Flight to update in case it exists.
     */
    where: FlightWhereUniqueInput
    /**
     * In case the Flight found by the `where` argument doesn't exist, create a new Flight with this data.
     */
    create: XOR<FlightCreateInput, FlightUncheckedCreateInput>
    /**
     * In case the Flight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FlightUpdateInput, FlightUncheckedUpdateInput>
  }

  /**
   * Flight delete
   */
  export type FlightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter which Flight to delete.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight deleteMany
   */
  export type FlightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flights to delete
     */
    where?: FlightWhereInput
    /**
     * Limit how many Flights to delete.
     */
    limit?: number
  }

  /**
   * Flight.aircraft
   */
  export type Flight$aircraftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    where?: AircraftWhereInput
  }

  /**
   * Flight.riskAssessment
   */
  export type Flight$riskAssessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    where?: RiskAssessmentWhereInput
  }

  /**
   * Flight without action
   */
  export type FlightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
  }


  /**
   * Model Airline
   */

  export type AggregateAirline = {
    _count: AirlineCountAggregateOutputType | null
    _min: AirlineMinAggregateOutputType | null
    _max: AirlineMaxAggregateOutputType | null
  }

  export type AirlineMinAggregateOutputType = {
    id: string | null
    name: string | null
    iataCode: string | null
    icaoCode: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AirlineMaxAggregateOutputType = {
    id: string | null
    name: string | null
    iataCode: string | null
    icaoCode: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AirlineCountAggregateOutputType = {
    id: number
    name: number
    iataCode: number
    icaoCode: number
    country: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AirlineMinAggregateInputType = {
    id?: true
    name?: true
    iataCode?: true
    icaoCode?: true
    country?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AirlineMaxAggregateInputType = {
    id?: true
    name?: true
    iataCode?: true
    icaoCode?: true
    country?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AirlineCountAggregateInputType = {
    id?: true
    name?: true
    iataCode?: true
    icaoCode?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AirlineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airline to aggregate.
     */
    where?: AirlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airlines to fetch.
     */
    orderBy?: AirlineOrderByWithRelationInput | AirlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AirlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Airlines
    **/
    _count?: true | AirlineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AirlineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AirlineMaxAggregateInputType
  }

  export type GetAirlineAggregateType<T extends AirlineAggregateArgs> = {
        [P in keyof T & keyof AggregateAirline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAirline[P]>
      : GetScalarType<T[P], AggregateAirline[P]>
  }




  export type AirlineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirlineWhereInput
    orderBy?: AirlineOrderByWithAggregationInput | AirlineOrderByWithAggregationInput[]
    by: AirlineScalarFieldEnum[] | AirlineScalarFieldEnum
    having?: AirlineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AirlineCountAggregateInputType | true
    _min?: AirlineMinAggregateInputType
    _max?: AirlineMaxAggregateInputType
  }

  export type AirlineGroupByOutputType = {
    id: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt: Date
    updatedAt: Date
    _count: AirlineCountAggregateOutputType | null
    _min: AirlineMinAggregateOutputType | null
    _max: AirlineMaxAggregateOutputType | null
  }

  type GetAirlineGroupByPayload<T extends AirlineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AirlineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AirlineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AirlineGroupByOutputType[P]>
            : GetScalarType<T[P], AirlineGroupByOutputType[P]>
        }
      >
    >


  export type AirlineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flights?: boolean | Airline$flightsArgs<ExtArgs>
    hubs?: boolean | Airline$hubsArgs<ExtArgs>
    routes?: boolean | Airline$routesArgs<ExtArgs>
    _count?: boolean | AirlineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airline"]>

  export type AirlineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["airline"]>

  export type AirlineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["airline"]>

  export type AirlineSelectScalar = {
    id?: boolean
    name?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AirlineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "iataCode" | "icaoCode" | "country" | "createdAt" | "updatedAt", ExtArgs["result"]["airline"]>
  export type AirlineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flights?: boolean | Airline$flightsArgs<ExtArgs>
    hubs?: boolean | Airline$hubsArgs<ExtArgs>
    routes?: boolean | Airline$routesArgs<ExtArgs>
    _count?: boolean | AirlineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AirlineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AirlineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AirlinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Airline"
    objects: {
      flights: Prisma.$FlightPayload<ExtArgs>[]
      hubs: Prisma.$AirlineHubPayload<ExtArgs>[]
      routes: Prisma.$FlightRoutePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      iataCode: string
      icaoCode: string
      country: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["airline"]>
    composites: {}
  }

  type AirlineGetPayload<S extends boolean | null | undefined | AirlineDefaultArgs> = $Result.GetResult<Prisma.$AirlinePayload, S>

  type AirlineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AirlineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AirlineCountAggregateInputType | true
    }

  export interface AirlineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Airline'], meta: { name: 'Airline' } }
    /**
     * Find zero or one Airline that matches the filter.
     * @param {AirlineFindUniqueArgs} args - Arguments to find a Airline
     * @example
     * // Get one Airline
     * const airline = await prisma.airline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AirlineFindUniqueArgs>(args: SelectSubset<T, AirlineFindUniqueArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Airline that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AirlineFindUniqueOrThrowArgs} args - Arguments to find a Airline
     * @example
     * // Get one Airline
     * const airline = await prisma.airline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AirlineFindUniqueOrThrowArgs>(args: SelectSubset<T, AirlineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineFindFirstArgs} args - Arguments to find a Airline
     * @example
     * // Get one Airline
     * const airline = await prisma.airline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AirlineFindFirstArgs>(args?: SelectSubset<T, AirlineFindFirstArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineFindFirstOrThrowArgs} args - Arguments to find a Airline
     * @example
     * // Get one Airline
     * const airline = await prisma.airline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AirlineFindFirstOrThrowArgs>(args?: SelectSubset<T, AirlineFindFirstOrThrowArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Airlines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Airlines
     * const airlines = await prisma.airline.findMany()
     * 
     * // Get first 10 Airlines
     * const airlines = await prisma.airline.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const airlineWithIdOnly = await prisma.airline.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AirlineFindManyArgs>(args?: SelectSubset<T, AirlineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Airline.
     * @param {AirlineCreateArgs} args - Arguments to create a Airline.
     * @example
     * // Create one Airline
     * const Airline = await prisma.airline.create({
     *   data: {
     *     // ... data to create a Airline
     *   }
     * })
     * 
     */
    create<T extends AirlineCreateArgs>(args: SelectSubset<T, AirlineCreateArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Airlines.
     * @param {AirlineCreateManyArgs} args - Arguments to create many Airlines.
     * @example
     * // Create many Airlines
     * const airline = await prisma.airline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AirlineCreateManyArgs>(args?: SelectSubset<T, AirlineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Airlines and returns the data saved in the database.
     * @param {AirlineCreateManyAndReturnArgs} args - Arguments to create many Airlines.
     * @example
     * // Create many Airlines
     * const airline = await prisma.airline.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Airlines and only return the `id`
     * const airlineWithIdOnly = await prisma.airline.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AirlineCreateManyAndReturnArgs>(args?: SelectSubset<T, AirlineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Airline.
     * @param {AirlineDeleteArgs} args - Arguments to delete one Airline.
     * @example
     * // Delete one Airline
     * const Airline = await prisma.airline.delete({
     *   where: {
     *     // ... filter to delete one Airline
     *   }
     * })
     * 
     */
    delete<T extends AirlineDeleteArgs>(args: SelectSubset<T, AirlineDeleteArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Airline.
     * @param {AirlineUpdateArgs} args - Arguments to update one Airline.
     * @example
     * // Update one Airline
     * const airline = await prisma.airline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AirlineUpdateArgs>(args: SelectSubset<T, AirlineUpdateArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Airlines.
     * @param {AirlineDeleteManyArgs} args - Arguments to filter Airlines to delete.
     * @example
     * // Delete a few Airlines
     * const { count } = await prisma.airline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AirlineDeleteManyArgs>(args?: SelectSubset<T, AirlineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Airlines
     * const airline = await prisma.airline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AirlineUpdateManyArgs>(args: SelectSubset<T, AirlineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airlines and returns the data updated in the database.
     * @param {AirlineUpdateManyAndReturnArgs} args - Arguments to update many Airlines.
     * @example
     * // Update many Airlines
     * const airline = await prisma.airline.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Airlines and only return the `id`
     * const airlineWithIdOnly = await prisma.airline.updateManyAndReturn({
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
    updateManyAndReturn<T extends AirlineUpdateManyAndReturnArgs>(args: SelectSubset<T, AirlineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Airline.
     * @param {AirlineUpsertArgs} args - Arguments to update or create a Airline.
     * @example
     * // Update or create a Airline
     * const airline = await prisma.airline.upsert({
     *   create: {
     *     // ... data to create a Airline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Airline we want to update
     *   }
     * })
     */
    upsert<T extends AirlineUpsertArgs>(args: SelectSubset<T, AirlineUpsertArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Airlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineCountArgs} args - Arguments to filter Airlines to count.
     * @example
     * // Count the number of Airlines
     * const count = await prisma.airline.count({
     *   where: {
     *     // ... the filter for the Airlines we want to count
     *   }
     * })
    **/
    count<T extends AirlineCountArgs>(
      args?: Subset<T, AirlineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AirlineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Airline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AirlineAggregateArgs>(args: Subset<T, AirlineAggregateArgs>): Prisma.PrismaPromise<GetAirlineAggregateType<T>>

    /**
     * Group by Airline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineGroupByArgs} args - Group by arguments.
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
      T extends AirlineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AirlineGroupByArgs['orderBy'] }
        : { orderBy?: AirlineGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AirlineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAirlineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Airline model
   */
  readonly fields: AirlineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Airline.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AirlineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    flights<T extends Airline$flightsArgs<ExtArgs> = {}>(args?: Subset<T, Airline$flightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    hubs<T extends Airline$hubsArgs<ExtArgs> = {}>(args?: Subset<T, Airline$hubsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    routes<T extends Airline$routesArgs<ExtArgs> = {}>(args?: Subset<T, Airline$routesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Airline model
   */
  interface AirlineFieldRefs {
    readonly id: FieldRef<"Airline", 'String'>
    readonly name: FieldRef<"Airline", 'String'>
    readonly iataCode: FieldRef<"Airline", 'String'>
    readonly icaoCode: FieldRef<"Airline", 'String'>
    readonly country: FieldRef<"Airline", 'String'>
    readonly createdAt: FieldRef<"Airline", 'DateTime'>
    readonly updatedAt: FieldRef<"Airline", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Airline findUnique
   */
  export type AirlineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airline to fetch.
     */
    where: AirlineWhereUniqueInput
  }

  /**
   * Airline findUniqueOrThrow
   */
  export type AirlineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airline to fetch.
     */
    where: AirlineWhereUniqueInput
  }

  /**
   * Airline findFirst
   */
  export type AirlineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airline to fetch.
     */
    where?: AirlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airlines to fetch.
     */
    orderBy?: AirlineOrderByWithRelationInput | AirlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airlines.
     */
    cursor?: AirlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airlines.
     */
    distinct?: AirlineScalarFieldEnum | AirlineScalarFieldEnum[]
  }

  /**
   * Airline findFirstOrThrow
   */
  export type AirlineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airline to fetch.
     */
    where?: AirlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airlines to fetch.
     */
    orderBy?: AirlineOrderByWithRelationInput | AirlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airlines.
     */
    cursor?: AirlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airlines.
     */
    distinct?: AirlineScalarFieldEnum | AirlineScalarFieldEnum[]
  }

  /**
   * Airline findMany
   */
  export type AirlineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter, which Airlines to fetch.
     */
    where?: AirlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airlines to fetch.
     */
    orderBy?: AirlineOrderByWithRelationInput | AirlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Airlines.
     */
    cursor?: AirlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airlines.
     */
    skip?: number
    distinct?: AirlineScalarFieldEnum | AirlineScalarFieldEnum[]
  }

  /**
   * Airline create
   */
  export type AirlineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * The data needed to create a Airline.
     */
    data: XOR<AirlineCreateInput, AirlineUncheckedCreateInput>
  }

  /**
   * Airline createMany
   */
  export type AirlineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Airlines.
     */
    data: AirlineCreateManyInput | AirlineCreateManyInput[]
  }

  /**
   * Airline createManyAndReturn
   */
  export type AirlineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * The data used to create many Airlines.
     */
    data: AirlineCreateManyInput | AirlineCreateManyInput[]
  }

  /**
   * Airline update
   */
  export type AirlineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * The data needed to update a Airline.
     */
    data: XOR<AirlineUpdateInput, AirlineUncheckedUpdateInput>
    /**
     * Choose, which Airline to update.
     */
    where: AirlineWhereUniqueInput
  }

  /**
   * Airline updateMany
   */
  export type AirlineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Airlines.
     */
    data: XOR<AirlineUpdateManyMutationInput, AirlineUncheckedUpdateManyInput>
    /**
     * Filter which Airlines to update
     */
    where?: AirlineWhereInput
    /**
     * Limit how many Airlines to update.
     */
    limit?: number
  }

  /**
   * Airline updateManyAndReturn
   */
  export type AirlineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * The data used to update Airlines.
     */
    data: XOR<AirlineUpdateManyMutationInput, AirlineUncheckedUpdateManyInput>
    /**
     * Filter which Airlines to update
     */
    where?: AirlineWhereInput
    /**
     * Limit how many Airlines to update.
     */
    limit?: number
  }

  /**
   * Airline upsert
   */
  export type AirlineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * The filter to search for the Airline to update in case it exists.
     */
    where: AirlineWhereUniqueInput
    /**
     * In case the Airline found by the `where` argument doesn't exist, create a new Airline with this data.
     */
    create: XOR<AirlineCreateInput, AirlineUncheckedCreateInput>
    /**
     * In case the Airline was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AirlineUpdateInput, AirlineUncheckedUpdateInput>
  }

  /**
   * Airline delete
   */
  export type AirlineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
    /**
     * Filter which Airline to delete.
     */
    where: AirlineWhereUniqueInput
  }

  /**
   * Airline deleteMany
   */
  export type AirlineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airlines to delete
     */
    where?: AirlineWhereInput
    /**
     * Limit how many Airlines to delete.
     */
    limit?: number
  }

  /**
   * Airline.flights
   */
  export type Airline$flightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    where?: FlightWhereInput
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    cursor?: FlightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Airline.hubs
   */
  export type Airline$hubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    where?: AirlineHubWhereInput
    orderBy?: AirlineHubOrderByWithRelationInput | AirlineHubOrderByWithRelationInput[]
    cursor?: AirlineHubWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AirlineHubScalarFieldEnum | AirlineHubScalarFieldEnum[]
  }

  /**
   * Airline.routes
   */
  export type Airline$routesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    where?: FlightRouteWhereInput
    orderBy?: FlightRouteOrderByWithRelationInput | FlightRouteOrderByWithRelationInput[]
    cursor?: FlightRouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlightRouteScalarFieldEnum | FlightRouteScalarFieldEnum[]
  }

  /**
   * Airline without action
   */
  export type AirlineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airline
     */
    select?: AirlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airline
     */
    omit?: AirlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineInclude<ExtArgs> | null
  }


  /**
   * Model AirlineHub
   */

  export type AggregateAirlineHub = {
    _count: AirlineHubCountAggregateOutputType | null
    _min: AirlineHubMinAggregateOutputType | null
    _max: AirlineHubMaxAggregateOutputType | null
  }

  export type AirlineHubMinAggregateOutputType = {
    id: string | null
    airlineId: string | null
    airportId: string | null
    createdAt: Date | null
  }

  export type AirlineHubMaxAggregateOutputType = {
    id: string | null
    airlineId: string | null
    airportId: string | null
    createdAt: Date | null
  }

  export type AirlineHubCountAggregateOutputType = {
    id: number
    airlineId: number
    airportId: number
    createdAt: number
    _all: number
  }


  export type AirlineHubMinAggregateInputType = {
    id?: true
    airlineId?: true
    airportId?: true
    createdAt?: true
  }

  export type AirlineHubMaxAggregateInputType = {
    id?: true
    airlineId?: true
    airportId?: true
    createdAt?: true
  }

  export type AirlineHubCountAggregateInputType = {
    id?: true
    airlineId?: true
    airportId?: true
    createdAt?: true
    _all?: true
  }

  export type AirlineHubAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AirlineHub to aggregate.
     */
    where?: AirlineHubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirlineHubs to fetch.
     */
    orderBy?: AirlineHubOrderByWithRelationInput | AirlineHubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AirlineHubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirlineHubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirlineHubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AirlineHubs
    **/
    _count?: true | AirlineHubCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AirlineHubMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AirlineHubMaxAggregateInputType
  }

  export type GetAirlineHubAggregateType<T extends AirlineHubAggregateArgs> = {
        [P in keyof T & keyof AggregateAirlineHub]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAirlineHub[P]>
      : GetScalarType<T[P], AggregateAirlineHub[P]>
  }




  export type AirlineHubGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirlineHubWhereInput
    orderBy?: AirlineHubOrderByWithAggregationInput | AirlineHubOrderByWithAggregationInput[]
    by: AirlineHubScalarFieldEnum[] | AirlineHubScalarFieldEnum
    having?: AirlineHubScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AirlineHubCountAggregateInputType | true
    _min?: AirlineHubMinAggregateInputType
    _max?: AirlineHubMaxAggregateInputType
  }

  export type AirlineHubGroupByOutputType = {
    id: string
    airlineId: string
    airportId: string
    createdAt: Date
    _count: AirlineHubCountAggregateOutputType | null
    _min: AirlineHubMinAggregateOutputType | null
    _max: AirlineHubMaxAggregateOutputType | null
  }

  type GetAirlineHubGroupByPayload<T extends AirlineHubGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AirlineHubGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AirlineHubGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AirlineHubGroupByOutputType[P]>
            : GetScalarType<T[P], AirlineHubGroupByOutputType[P]>
        }
      >
    >


  export type AirlineHubSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airlineId?: boolean
    airportId?: boolean
    createdAt?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    airport?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airlineHub"]>

  export type AirlineHubSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airlineId?: boolean
    airportId?: boolean
    createdAt?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    airport?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airlineHub"]>

  export type AirlineHubSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airlineId?: boolean
    airportId?: boolean
    createdAt?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    airport?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airlineHub"]>

  export type AirlineHubSelectScalar = {
    id?: boolean
    airlineId?: boolean
    airportId?: boolean
    createdAt?: boolean
  }

  export type AirlineHubOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "airlineId" | "airportId" | "createdAt", ExtArgs["result"]["airlineHub"]>
  export type AirlineHubInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    airport?: boolean | AirportDefaultArgs<ExtArgs>
  }
  export type AirlineHubIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    airport?: boolean | AirportDefaultArgs<ExtArgs>
  }
  export type AirlineHubIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    airport?: boolean | AirportDefaultArgs<ExtArgs>
  }

  export type $AirlineHubPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AirlineHub"
    objects: {
      airline: Prisma.$AirlinePayload<ExtArgs>
      airport: Prisma.$AirportPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      airlineId: string
      airportId: string
      createdAt: Date
    }, ExtArgs["result"]["airlineHub"]>
    composites: {}
  }

  type AirlineHubGetPayload<S extends boolean | null | undefined | AirlineHubDefaultArgs> = $Result.GetResult<Prisma.$AirlineHubPayload, S>

  type AirlineHubCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AirlineHubFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AirlineHubCountAggregateInputType | true
    }

  export interface AirlineHubDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AirlineHub'], meta: { name: 'AirlineHub' } }
    /**
     * Find zero or one AirlineHub that matches the filter.
     * @param {AirlineHubFindUniqueArgs} args - Arguments to find a AirlineHub
     * @example
     * // Get one AirlineHub
     * const airlineHub = await prisma.airlineHub.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AirlineHubFindUniqueArgs>(args: SelectSubset<T, AirlineHubFindUniqueArgs<ExtArgs>>): Prisma__AirlineHubClient<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AirlineHub that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AirlineHubFindUniqueOrThrowArgs} args - Arguments to find a AirlineHub
     * @example
     * // Get one AirlineHub
     * const airlineHub = await prisma.airlineHub.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AirlineHubFindUniqueOrThrowArgs>(args: SelectSubset<T, AirlineHubFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AirlineHubClient<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AirlineHub that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineHubFindFirstArgs} args - Arguments to find a AirlineHub
     * @example
     * // Get one AirlineHub
     * const airlineHub = await prisma.airlineHub.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AirlineHubFindFirstArgs>(args?: SelectSubset<T, AirlineHubFindFirstArgs<ExtArgs>>): Prisma__AirlineHubClient<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AirlineHub that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineHubFindFirstOrThrowArgs} args - Arguments to find a AirlineHub
     * @example
     * // Get one AirlineHub
     * const airlineHub = await prisma.airlineHub.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AirlineHubFindFirstOrThrowArgs>(args?: SelectSubset<T, AirlineHubFindFirstOrThrowArgs<ExtArgs>>): Prisma__AirlineHubClient<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AirlineHubs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineHubFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AirlineHubs
     * const airlineHubs = await prisma.airlineHub.findMany()
     * 
     * // Get first 10 AirlineHubs
     * const airlineHubs = await prisma.airlineHub.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const airlineHubWithIdOnly = await prisma.airlineHub.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AirlineHubFindManyArgs>(args?: SelectSubset<T, AirlineHubFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AirlineHub.
     * @param {AirlineHubCreateArgs} args - Arguments to create a AirlineHub.
     * @example
     * // Create one AirlineHub
     * const AirlineHub = await prisma.airlineHub.create({
     *   data: {
     *     // ... data to create a AirlineHub
     *   }
     * })
     * 
     */
    create<T extends AirlineHubCreateArgs>(args: SelectSubset<T, AirlineHubCreateArgs<ExtArgs>>): Prisma__AirlineHubClient<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AirlineHubs.
     * @param {AirlineHubCreateManyArgs} args - Arguments to create many AirlineHubs.
     * @example
     * // Create many AirlineHubs
     * const airlineHub = await prisma.airlineHub.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AirlineHubCreateManyArgs>(args?: SelectSubset<T, AirlineHubCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AirlineHubs and returns the data saved in the database.
     * @param {AirlineHubCreateManyAndReturnArgs} args - Arguments to create many AirlineHubs.
     * @example
     * // Create many AirlineHubs
     * const airlineHub = await prisma.airlineHub.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AirlineHubs and only return the `id`
     * const airlineHubWithIdOnly = await prisma.airlineHub.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AirlineHubCreateManyAndReturnArgs>(args?: SelectSubset<T, AirlineHubCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AirlineHub.
     * @param {AirlineHubDeleteArgs} args - Arguments to delete one AirlineHub.
     * @example
     * // Delete one AirlineHub
     * const AirlineHub = await prisma.airlineHub.delete({
     *   where: {
     *     // ... filter to delete one AirlineHub
     *   }
     * })
     * 
     */
    delete<T extends AirlineHubDeleteArgs>(args: SelectSubset<T, AirlineHubDeleteArgs<ExtArgs>>): Prisma__AirlineHubClient<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AirlineHub.
     * @param {AirlineHubUpdateArgs} args - Arguments to update one AirlineHub.
     * @example
     * // Update one AirlineHub
     * const airlineHub = await prisma.airlineHub.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AirlineHubUpdateArgs>(args: SelectSubset<T, AirlineHubUpdateArgs<ExtArgs>>): Prisma__AirlineHubClient<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AirlineHubs.
     * @param {AirlineHubDeleteManyArgs} args - Arguments to filter AirlineHubs to delete.
     * @example
     * // Delete a few AirlineHubs
     * const { count } = await prisma.airlineHub.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AirlineHubDeleteManyArgs>(args?: SelectSubset<T, AirlineHubDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AirlineHubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineHubUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AirlineHubs
     * const airlineHub = await prisma.airlineHub.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AirlineHubUpdateManyArgs>(args: SelectSubset<T, AirlineHubUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AirlineHubs and returns the data updated in the database.
     * @param {AirlineHubUpdateManyAndReturnArgs} args - Arguments to update many AirlineHubs.
     * @example
     * // Update many AirlineHubs
     * const airlineHub = await prisma.airlineHub.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AirlineHubs and only return the `id`
     * const airlineHubWithIdOnly = await prisma.airlineHub.updateManyAndReturn({
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
    updateManyAndReturn<T extends AirlineHubUpdateManyAndReturnArgs>(args: SelectSubset<T, AirlineHubUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AirlineHub.
     * @param {AirlineHubUpsertArgs} args - Arguments to update or create a AirlineHub.
     * @example
     * // Update or create a AirlineHub
     * const airlineHub = await prisma.airlineHub.upsert({
     *   create: {
     *     // ... data to create a AirlineHub
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AirlineHub we want to update
     *   }
     * })
     */
    upsert<T extends AirlineHubUpsertArgs>(args: SelectSubset<T, AirlineHubUpsertArgs<ExtArgs>>): Prisma__AirlineHubClient<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AirlineHubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineHubCountArgs} args - Arguments to filter AirlineHubs to count.
     * @example
     * // Count the number of AirlineHubs
     * const count = await prisma.airlineHub.count({
     *   where: {
     *     // ... the filter for the AirlineHubs we want to count
     *   }
     * })
    **/
    count<T extends AirlineHubCountArgs>(
      args?: Subset<T, AirlineHubCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AirlineHubCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AirlineHub.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineHubAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AirlineHubAggregateArgs>(args: Subset<T, AirlineHubAggregateArgs>): Prisma.PrismaPromise<GetAirlineHubAggregateType<T>>

    /**
     * Group by AirlineHub.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirlineHubGroupByArgs} args - Group by arguments.
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
      T extends AirlineHubGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AirlineHubGroupByArgs['orderBy'] }
        : { orderBy?: AirlineHubGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AirlineHubGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAirlineHubGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AirlineHub model
   */
  readonly fields: AirlineHubFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AirlineHub.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AirlineHubClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    airline<T extends AirlineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirlineDefaultArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    airport<T extends AirportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirportDefaultArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AirlineHub model
   */
  interface AirlineHubFieldRefs {
    readonly id: FieldRef<"AirlineHub", 'String'>
    readonly airlineId: FieldRef<"AirlineHub", 'String'>
    readonly airportId: FieldRef<"AirlineHub", 'String'>
    readonly createdAt: FieldRef<"AirlineHub", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AirlineHub findUnique
   */
  export type AirlineHubFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    /**
     * Filter, which AirlineHub to fetch.
     */
    where: AirlineHubWhereUniqueInput
  }

  /**
   * AirlineHub findUniqueOrThrow
   */
  export type AirlineHubFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    /**
     * Filter, which AirlineHub to fetch.
     */
    where: AirlineHubWhereUniqueInput
  }

  /**
   * AirlineHub findFirst
   */
  export type AirlineHubFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    /**
     * Filter, which AirlineHub to fetch.
     */
    where?: AirlineHubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirlineHubs to fetch.
     */
    orderBy?: AirlineHubOrderByWithRelationInput | AirlineHubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AirlineHubs.
     */
    cursor?: AirlineHubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirlineHubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirlineHubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AirlineHubs.
     */
    distinct?: AirlineHubScalarFieldEnum | AirlineHubScalarFieldEnum[]
  }

  /**
   * AirlineHub findFirstOrThrow
   */
  export type AirlineHubFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    /**
     * Filter, which AirlineHub to fetch.
     */
    where?: AirlineHubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirlineHubs to fetch.
     */
    orderBy?: AirlineHubOrderByWithRelationInput | AirlineHubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AirlineHubs.
     */
    cursor?: AirlineHubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirlineHubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirlineHubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AirlineHubs.
     */
    distinct?: AirlineHubScalarFieldEnum | AirlineHubScalarFieldEnum[]
  }

  /**
   * AirlineHub findMany
   */
  export type AirlineHubFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    /**
     * Filter, which AirlineHubs to fetch.
     */
    where?: AirlineHubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirlineHubs to fetch.
     */
    orderBy?: AirlineHubOrderByWithRelationInput | AirlineHubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AirlineHubs.
     */
    cursor?: AirlineHubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirlineHubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirlineHubs.
     */
    skip?: number
    distinct?: AirlineHubScalarFieldEnum | AirlineHubScalarFieldEnum[]
  }

  /**
   * AirlineHub create
   */
  export type AirlineHubCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    /**
     * The data needed to create a AirlineHub.
     */
    data: XOR<AirlineHubCreateInput, AirlineHubUncheckedCreateInput>
  }

  /**
   * AirlineHub createMany
   */
  export type AirlineHubCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AirlineHubs.
     */
    data: AirlineHubCreateManyInput | AirlineHubCreateManyInput[]
  }

  /**
   * AirlineHub createManyAndReturn
   */
  export type AirlineHubCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * The data used to create many AirlineHubs.
     */
    data: AirlineHubCreateManyInput | AirlineHubCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AirlineHub update
   */
  export type AirlineHubUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    /**
     * The data needed to update a AirlineHub.
     */
    data: XOR<AirlineHubUpdateInput, AirlineHubUncheckedUpdateInput>
    /**
     * Choose, which AirlineHub to update.
     */
    where: AirlineHubWhereUniqueInput
  }

  /**
   * AirlineHub updateMany
   */
  export type AirlineHubUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AirlineHubs.
     */
    data: XOR<AirlineHubUpdateManyMutationInput, AirlineHubUncheckedUpdateManyInput>
    /**
     * Filter which AirlineHubs to update
     */
    where?: AirlineHubWhereInput
    /**
     * Limit how many AirlineHubs to update.
     */
    limit?: number
  }

  /**
   * AirlineHub updateManyAndReturn
   */
  export type AirlineHubUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * The data used to update AirlineHubs.
     */
    data: XOR<AirlineHubUpdateManyMutationInput, AirlineHubUncheckedUpdateManyInput>
    /**
     * Filter which AirlineHubs to update
     */
    where?: AirlineHubWhereInput
    /**
     * Limit how many AirlineHubs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AirlineHub upsert
   */
  export type AirlineHubUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    /**
     * The filter to search for the AirlineHub to update in case it exists.
     */
    where: AirlineHubWhereUniqueInput
    /**
     * In case the AirlineHub found by the `where` argument doesn't exist, create a new AirlineHub with this data.
     */
    create: XOR<AirlineHubCreateInput, AirlineHubUncheckedCreateInput>
    /**
     * In case the AirlineHub was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AirlineHubUpdateInput, AirlineHubUncheckedUpdateInput>
  }

  /**
   * AirlineHub delete
   */
  export type AirlineHubDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    /**
     * Filter which AirlineHub to delete.
     */
    where: AirlineHubWhereUniqueInput
  }

  /**
   * AirlineHub deleteMany
   */
  export type AirlineHubDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AirlineHubs to delete
     */
    where?: AirlineHubWhereInput
    /**
     * Limit how many AirlineHubs to delete.
     */
    limit?: number
  }

  /**
   * AirlineHub without action
   */
  export type AirlineHubDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
  }


  /**
   * Model Airport
   */

  export type AggregateAirport = {
    _count: AirportCountAggregateOutputType | null
    _avg: AirportAvgAggregateOutputType | null
    _sum: AirportSumAggregateOutputType | null
    _min: AirportMinAggregateOutputType | null
    _max: AirportMaxAggregateOutputType | null
  }

  export type AirportAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    altitude: number | null
  }

  export type AirportSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    altitude: number | null
  }

  export type AirportMinAggregateOutputType = {
    id: string | null
    name: string | null
    iataCode: string | null
    icaoCode: string | null
    city: string | null
    country: string | null
    timezone: string | null
    latitude: number | null
    longitude: number | null
    altitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AirportMaxAggregateOutputType = {
    id: string | null
    name: string | null
    iataCode: string | null
    icaoCode: string | null
    city: string | null
    country: string | null
    timezone: string | null
    latitude: number | null
    longitude: number | null
    altitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AirportCountAggregateOutputType = {
    id: number
    name: number
    iataCode: number
    icaoCode: number
    city: number
    country: number
    timezone: number
    latitude: number
    longitude: number
    altitude: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AirportAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    altitude?: true
  }

  export type AirportSumAggregateInputType = {
    latitude?: true
    longitude?: true
    altitude?: true
  }

  export type AirportMinAggregateInputType = {
    id?: true
    name?: true
    iataCode?: true
    icaoCode?: true
    city?: true
    country?: true
    timezone?: true
    latitude?: true
    longitude?: true
    altitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AirportMaxAggregateInputType = {
    id?: true
    name?: true
    iataCode?: true
    icaoCode?: true
    city?: true
    country?: true
    timezone?: true
    latitude?: true
    longitude?: true
    altitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AirportCountAggregateInputType = {
    id?: true
    name?: true
    iataCode?: true
    icaoCode?: true
    city?: true
    country?: true
    timezone?: true
    latitude?: true
    longitude?: true
    altitude?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AirportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airport to aggregate.
     */
    where?: AirportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportOrderByWithRelationInput | AirportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AirportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Airports
    **/
    _count?: true | AirportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AirportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AirportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AirportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AirportMaxAggregateInputType
  }

  export type GetAirportAggregateType<T extends AirportAggregateArgs> = {
        [P in keyof T & keyof AggregateAirport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAirport[P]>
      : GetScalarType<T[P], AggregateAirport[P]>
  }




  export type AirportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirportWhereInput
    orderBy?: AirportOrderByWithAggregationInput | AirportOrderByWithAggregationInput[]
    by: AirportScalarFieldEnum[] | AirportScalarFieldEnum
    having?: AirportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AirportCountAggregateInputType | true
    _avg?: AirportAvgAggregateInputType
    _sum?: AirportSumAggregateInputType
    _min?: AirportMinAggregateInputType
    _max?: AirportMaxAggregateInputType
  }

  export type AirportGroupByOutputType = {
    id: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude: number | null
    createdAt: Date
    updatedAt: Date
    _count: AirportCountAggregateOutputType | null
    _avg: AirportAvgAggregateOutputType | null
    _sum: AirportSumAggregateOutputType | null
    _min: AirportMinAggregateOutputType | null
    _max: AirportMaxAggregateOutputType | null
  }

  type GetAirportGroupByPayload<T extends AirportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AirportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AirportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AirportGroupByOutputType[P]>
            : GetScalarType<T[P], AirportGroupByOutputType[P]>
        }
      >
    >


  export type AirportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    city?: boolean
    country?: boolean
    timezone?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    departureFlights?: boolean | Airport$departureFlightsArgs<ExtArgs>
    arrivalFlights?: boolean | Airport$arrivalFlightsArgs<ExtArgs>
    hubs?: boolean | Airport$hubsArgs<ExtArgs>
    routeOrigins?: boolean | Airport$routeOriginsArgs<ExtArgs>
    routeDestinations?: boolean | Airport$routeDestinationsArgs<ExtArgs>
    _count?: boolean | AirportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airport"]>

  export type AirportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    city?: boolean
    country?: boolean
    timezone?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["airport"]>

  export type AirportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    city?: boolean
    country?: boolean
    timezone?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["airport"]>

  export type AirportSelectScalar = {
    id?: boolean
    name?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    city?: boolean
    country?: boolean
    timezone?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AirportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "iataCode" | "icaoCode" | "city" | "country" | "timezone" | "latitude" | "longitude" | "altitude" | "createdAt" | "updatedAt", ExtArgs["result"]["airport"]>
  export type AirportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departureFlights?: boolean | Airport$departureFlightsArgs<ExtArgs>
    arrivalFlights?: boolean | Airport$arrivalFlightsArgs<ExtArgs>
    hubs?: boolean | Airport$hubsArgs<ExtArgs>
    routeOrigins?: boolean | Airport$routeOriginsArgs<ExtArgs>
    routeDestinations?: boolean | Airport$routeDestinationsArgs<ExtArgs>
    _count?: boolean | AirportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AirportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AirportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AirportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Airport"
    objects: {
      departureFlights: Prisma.$FlightPayload<ExtArgs>[]
      arrivalFlights: Prisma.$FlightPayload<ExtArgs>[]
      hubs: Prisma.$AirlineHubPayload<ExtArgs>[]
      routeOrigins: Prisma.$FlightRoutePayload<ExtArgs>[]
      routeDestinations: Prisma.$FlightRoutePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      iataCode: string
      icaoCode: string
      city: string
      country: string
      timezone: string
      latitude: number
      longitude: number
      altitude: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["airport"]>
    composites: {}
  }

  type AirportGetPayload<S extends boolean | null | undefined | AirportDefaultArgs> = $Result.GetResult<Prisma.$AirportPayload, S>

  type AirportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AirportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AirportCountAggregateInputType | true
    }

  export interface AirportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Airport'], meta: { name: 'Airport' } }
    /**
     * Find zero or one Airport that matches the filter.
     * @param {AirportFindUniqueArgs} args - Arguments to find a Airport
     * @example
     * // Get one Airport
     * const airport = await prisma.airport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AirportFindUniqueArgs>(args: SelectSubset<T, AirportFindUniqueArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Airport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AirportFindUniqueOrThrowArgs} args - Arguments to find a Airport
     * @example
     * // Get one Airport
     * const airport = await prisma.airport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AirportFindUniqueOrThrowArgs>(args: SelectSubset<T, AirportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportFindFirstArgs} args - Arguments to find a Airport
     * @example
     * // Get one Airport
     * const airport = await prisma.airport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AirportFindFirstArgs>(args?: SelectSubset<T, AirportFindFirstArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportFindFirstOrThrowArgs} args - Arguments to find a Airport
     * @example
     * // Get one Airport
     * const airport = await prisma.airport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AirportFindFirstOrThrowArgs>(args?: SelectSubset<T, AirportFindFirstOrThrowArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Airports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Airports
     * const airports = await prisma.airport.findMany()
     * 
     * // Get first 10 Airports
     * const airports = await prisma.airport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const airportWithIdOnly = await prisma.airport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AirportFindManyArgs>(args?: SelectSubset<T, AirportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Airport.
     * @param {AirportCreateArgs} args - Arguments to create a Airport.
     * @example
     * // Create one Airport
     * const Airport = await prisma.airport.create({
     *   data: {
     *     // ... data to create a Airport
     *   }
     * })
     * 
     */
    create<T extends AirportCreateArgs>(args: SelectSubset<T, AirportCreateArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Airports.
     * @param {AirportCreateManyArgs} args - Arguments to create many Airports.
     * @example
     * // Create many Airports
     * const airport = await prisma.airport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AirportCreateManyArgs>(args?: SelectSubset<T, AirportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Airports and returns the data saved in the database.
     * @param {AirportCreateManyAndReturnArgs} args - Arguments to create many Airports.
     * @example
     * // Create many Airports
     * const airport = await prisma.airport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Airports and only return the `id`
     * const airportWithIdOnly = await prisma.airport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AirportCreateManyAndReturnArgs>(args?: SelectSubset<T, AirportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Airport.
     * @param {AirportDeleteArgs} args - Arguments to delete one Airport.
     * @example
     * // Delete one Airport
     * const Airport = await prisma.airport.delete({
     *   where: {
     *     // ... filter to delete one Airport
     *   }
     * })
     * 
     */
    delete<T extends AirportDeleteArgs>(args: SelectSubset<T, AirportDeleteArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Airport.
     * @param {AirportUpdateArgs} args - Arguments to update one Airport.
     * @example
     * // Update one Airport
     * const airport = await prisma.airport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AirportUpdateArgs>(args: SelectSubset<T, AirportUpdateArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Airports.
     * @param {AirportDeleteManyArgs} args - Arguments to filter Airports to delete.
     * @example
     * // Delete a few Airports
     * const { count } = await prisma.airport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AirportDeleteManyArgs>(args?: SelectSubset<T, AirportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Airports
     * const airport = await prisma.airport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AirportUpdateManyArgs>(args: SelectSubset<T, AirportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airports and returns the data updated in the database.
     * @param {AirportUpdateManyAndReturnArgs} args - Arguments to update many Airports.
     * @example
     * // Update many Airports
     * const airport = await prisma.airport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Airports and only return the `id`
     * const airportWithIdOnly = await prisma.airport.updateManyAndReturn({
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
    updateManyAndReturn<T extends AirportUpdateManyAndReturnArgs>(args: SelectSubset<T, AirportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Airport.
     * @param {AirportUpsertArgs} args - Arguments to update or create a Airport.
     * @example
     * // Update or create a Airport
     * const airport = await prisma.airport.upsert({
     *   create: {
     *     // ... data to create a Airport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Airport we want to update
     *   }
     * })
     */
    upsert<T extends AirportUpsertArgs>(args: SelectSubset<T, AirportUpsertArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Airports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportCountArgs} args - Arguments to filter Airports to count.
     * @example
     * // Count the number of Airports
     * const count = await prisma.airport.count({
     *   where: {
     *     // ... the filter for the Airports we want to count
     *   }
     * })
    **/
    count<T extends AirportCountArgs>(
      args?: Subset<T, AirportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AirportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Airport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AirportAggregateArgs>(args: Subset<T, AirportAggregateArgs>): Prisma.PrismaPromise<GetAirportAggregateType<T>>

    /**
     * Group by Airport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportGroupByArgs} args - Group by arguments.
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
      T extends AirportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AirportGroupByArgs['orderBy'] }
        : { orderBy?: AirportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AirportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAirportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Airport model
   */
  readonly fields: AirportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Airport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AirportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    departureFlights<T extends Airport$departureFlightsArgs<ExtArgs> = {}>(args?: Subset<T, Airport$departureFlightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    arrivalFlights<T extends Airport$arrivalFlightsArgs<ExtArgs> = {}>(args?: Subset<T, Airport$arrivalFlightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    hubs<T extends Airport$hubsArgs<ExtArgs> = {}>(args?: Subset<T, Airport$hubsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirlineHubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    routeOrigins<T extends Airport$routeOriginsArgs<ExtArgs> = {}>(args?: Subset<T, Airport$routeOriginsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    routeDestinations<T extends Airport$routeDestinationsArgs<ExtArgs> = {}>(args?: Subset<T, Airport$routeDestinationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Airport model
   */
  interface AirportFieldRefs {
    readonly id: FieldRef<"Airport", 'String'>
    readonly name: FieldRef<"Airport", 'String'>
    readonly iataCode: FieldRef<"Airport", 'String'>
    readonly icaoCode: FieldRef<"Airport", 'String'>
    readonly city: FieldRef<"Airport", 'String'>
    readonly country: FieldRef<"Airport", 'String'>
    readonly timezone: FieldRef<"Airport", 'String'>
    readonly latitude: FieldRef<"Airport", 'Float'>
    readonly longitude: FieldRef<"Airport", 'Float'>
    readonly altitude: FieldRef<"Airport", 'Float'>
    readonly createdAt: FieldRef<"Airport", 'DateTime'>
    readonly updatedAt: FieldRef<"Airport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Airport findUnique
   */
  export type AirportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airport to fetch.
     */
    where: AirportWhereUniqueInput
  }

  /**
   * Airport findUniqueOrThrow
   */
  export type AirportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airport to fetch.
     */
    where: AirportWhereUniqueInput
  }

  /**
   * Airport findFirst
   */
  export type AirportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airport to fetch.
     */
    where?: AirportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportOrderByWithRelationInput | AirportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airports.
     */
    cursor?: AirportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airports.
     */
    distinct?: AirportScalarFieldEnum | AirportScalarFieldEnum[]
  }

  /**
   * Airport findFirstOrThrow
   */
  export type AirportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airport to fetch.
     */
    where?: AirportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportOrderByWithRelationInput | AirportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airports.
     */
    cursor?: AirportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airports.
     */
    distinct?: AirportScalarFieldEnum | AirportScalarFieldEnum[]
  }

  /**
   * Airport findMany
   */
  export type AirportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airports to fetch.
     */
    where?: AirportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportOrderByWithRelationInput | AirportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Airports.
     */
    cursor?: AirportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    distinct?: AirportScalarFieldEnum | AirportScalarFieldEnum[]
  }

  /**
   * Airport create
   */
  export type AirportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * The data needed to create a Airport.
     */
    data: XOR<AirportCreateInput, AirportUncheckedCreateInput>
  }

  /**
   * Airport createMany
   */
  export type AirportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Airports.
     */
    data: AirportCreateManyInput | AirportCreateManyInput[]
  }

  /**
   * Airport createManyAndReturn
   */
  export type AirportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * The data used to create many Airports.
     */
    data: AirportCreateManyInput | AirportCreateManyInput[]
  }

  /**
   * Airport update
   */
  export type AirportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * The data needed to update a Airport.
     */
    data: XOR<AirportUpdateInput, AirportUncheckedUpdateInput>
    /**
     * Choose, which Airport to update.
     */
    where: AirportWhereUniqueInput
  }

  /**
   * Airport updateMany
   */
  export type AirportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Airports.
     */
    data: XOR<AirportUpdateManyMutationInput, AirportUncheckedUpdateManyInput>
    /**
     * Filter which Airports to update
     */
    where?: AirportWhereInput
    /**
     * Limit how many Airports to update.
     */
    limit?: number
  }

  /**
   * Airport updateManyAndReturn
   */
  export type AirportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * The data used to update Airports.
     */
    data: XOR<AirportUpdateManyMutationInput, AirportUncheckedUpdateManyInput>
    /**
     * Filter which Airports to update
     */
    where?: AirportWhereInput
    /**
     * Limit how many Airports to update.
     */
    limit?: number
  }

  /**
   * Airport upsert
   */
  export type AirportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * The filter to search for the Airport to update in case it exists.
     */
    where: AirportWhereUniqueInput
    /**
     * In case the Airport found by the `where` argument doesn't exist, create a new Airport with this data.
     */
    create: XOR<AirportCreateInput, AirportUncheckedCreateInput>
    /**
     * In case the Airport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AirportUpdateInput, AirportUncheckedUpdateInput>
  }

  /**
   * Airport delete
   */
  export type AirportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter which Airport to delete.
     */
    where: AirportWhereUniqueInput
  }

  /**
   * Airport deleteMany
   */
  export type AirportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airports to delete
     */
    where?: AirportWhereInput
    /**
     * Limit how many Airports to delete.
     */
    limit?: number
  }

  /**
   * Airport.departureFlights
   */
  export type Airport$departureFlightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    where?: FlightWhereInput
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    cursor?: FlightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Airport.arrivalFlights
   */
  export type Airport$arrivalFlightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    where?: FlightWhereInput
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    cursor?: FlightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Airport.hubs
   */
  export type Airport$hubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirlineHub
     */
    select?: AirlineHubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirlineHub
     */
    omit?: AirlineHubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirlineHubInclude<ExtArgs> | null
    where?: AirlineHubWhereInput
    orderBy?: AirlineHubOrderByWithRelationInput | AirlineHubOrderByWithRelationInput[]
    cursor?: AirlineHubWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AirlineHubScalarFieldEnum | AirlineHubScalarFieldEnum[]
  }

  /**
   * Airport.routeOrigins
   */
  export type Airport$routeOriginsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    where?: FlightRouteWhereInput
    orderBy?: FlightRouteOrderByWithRelationInput | FlightRouteOrderByWithRelationInput[]
    cursor?: FlightRouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlightRouteScalarFieldEnum | FlightRouteScalarFieldEnum[]
  }

  /**
   * Airport.routeDestinations
   */
  export type Airport$routeDestinationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    where?: FlightRouteWhereInput
    orderBy?: FlightRouteOrderByWithRelationInput | FlightRouteOrderByWithRelationInput[]
    cursor?: FlightRouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlightRouteScalarFieldEnum | FlightRouteScalarFieldEnum[]
  }

  /**
   * Airport without action
   */
  export type AirportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
  }


  /**
   * Model Aircraft
   */

  export type AggregateAircraft = {
    _count: AircraftCountAggregateOutputType | null
    _avg: AircraftAvgAggregateOutputType | null
    _sum: AircraftSumAggregateOutputType | null
    _min: AircraftMinAggregateOutputType | null
    _max: AircraftMaxAggregateOutputType | null
  }

  export type AircraftAvgAggregateOutputType = {
    maxPassengers: number | null
    maxRange: number | null
  }

  export type AircraftSumAggregateOutputType = {
    maxPassengers: number | null
    maxRange: number | null
  }

  export type AircraftMinAggregateOutputType = {
    id: string | null
    registration: string | null
    iataCode: string | null
    icaoCode: string | null
    model: string | null
    manufacturer: string | null
    type: string | null
    maxPassengers: number | null
    maxRange: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AircraftMaxAggregateOutputType = {
    id: string | null
    registration: string | null
    iataCode: string | null
    icaoCode: string | null
    model: string | null
    manufacturer: string | null
    type: string | null
    maxPassengers: number | null
    maxRange: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AircraftCountAggregateOutputType = {
    id: number
    registration: number
    iataCode: number
    icaoCode: number
    model: number
    manufacturer: number
    type: number
    maxPassengers: number
    maxRange: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AircraftAvgAggregateInputType = {
    maxPassengers?: true
    maxRange?: true
  }

  export type AircraftSumAggregateInputType = {
    maxPassengers?: true
    maxRange?: true
  }

  export type AircraftMinAggregateInputType = {
    id?: true
    registration?: true
    iataCode?: true
    icaoCode?: true
    model?: true
    manufacturer?: true
    type?: true
    maxPassengers?: true
    maxRange?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AircraftMaxAggregateInputType = {
    id?: true
    registration?: true
    iataCode?: true
    icaoCode?: true
    model?: true
    manufacturer?: true
    type?: true
    maxPassengers?: true
    maxRange?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AircraftCountAggregateInputType = {
    id?: true
    registration?: true
    iataCode?: true
    icaoCode?: true
    model?: true
    manufacturer?: true
    type?: true
    maxPassengers?: true
    maxRange?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AircraftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aircraft to aggregate.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Aircraft
    **/
    _count?: true | AircraftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AircraftAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AircraftSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AircraftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AircraftMaxAggregateInputType
  }

  export type GetAircraftAggregateType<T extends AircraftAggregateArgs> = {
        [P in keyof T & keyof AggregateAircraft]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAircraft[P]>
      : GetScalarType<T[P], AggregateAircraft[P]>
  }




  export type AircraftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AircraftWhereInput
    orderBy?: AircraftOrderByWithAggregationInput | AircraftOrderByWithAggregationInput[]
    by: AircraftScalarFieldEnum[] | AircraftScalarFieldEnum
    having?: AircraftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AircraftCountAggregateInputType | true
    _avg?: AircraftAvgAggregateInputType
    _sum?: AircraftSumAggregateInputType
    _min?: AircraftMinAggregateInputType
    _max?: AircraftMaxAggregateInputType
  }

  export type AircraftGroupByOutputType = {
    id: string
    registration: string
    iataCode: string
    icaoCode: string
    model: string
    manufacturer: string
    type: string
    maxPassengers: number
    maxRange: number | null
    createdAt: Date
    updatedAt: Date
    _count: AircraftCountAggregateOutputType | null
    _avg: AircraftAvgAggregateOutputType | null
    _sum: AircraftSumAggregateOutputType | null
    _min: AircraftMinAggregateOutputType | null
    _max: AircraftMaxAggregateOutputType | null
  }

  type GetAircraftGroupByPayload<T extends AircraftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AircraftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AircraftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AircraftGroupByOutputType[P]>
            : GetScalarType<T[P], AircraftGroupByOutputType[P]>
        }
      >
    >


  export type AircraftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    registration?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    model?: boolean
    manufacturer?: boolean
    type?: boolean
    maxPassengers?: boolean
    maxRange?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flights?: boolean | Aircraft$flightsArgs<ExtArgs>
    _count?: boolean | AircraftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aircraft"]>

  export type AircraftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    registration?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    model?: boolean
    manufacturer?: boolean
    type?: boolean
    maxPassengers?: boolean
    maxRange?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aircraft"]>

  export type AircraftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    registration?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    model?: boolean
    manufacturer?: boolean
    type?: boolean
    maxPassengers?: boolean
    maxRange?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aircraft"]>

  export type AircraftSelectScalar = {
    id?: boolean
    registration?: boolean
    iataCode?: boolean
    icaoCode?: boolean
    model?: boolean
    manufacturer?: boolean
    type?: boolean
    maxPassengers?: boolean
    maxRange?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AircraftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "registration" | "iataCode" | "icaoCode" | "model" | "manufacturer" | "type" | "maxPassengers" | "maxRange" | "createdAt" | "updatedAt", ExtArgs["result"]["aircraft"]>
  export type AircraftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flights?: boolean | Aircraft$flightsArgs<ExtArgs>
    _count?: boolean | AircraftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AircraftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AircraftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AircraftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Aircraft"
    objects: {
      flights: Prisma.$FlightPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      registration: string
      iataCode: string
      icaoCode: string
      model: string
      manufacturer: string
      type: string
      maxPassengers: number
      maxRange: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aircraft"]>
    composites: {}
  }

  type AircraftGetPayload<S extends boolean | null | undefined | AircraftDefaultArgs> = $Result.GetResult<Prisma.$AircraftPayload, S>

  type AircraftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AircraftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AircraftCountAggregateInputType | true
    }

  export interface AircraftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Aircraft'], meta: { name: 'Aircraft' } }
    /**
     * Find zero or one Aircraft that matches the filter.
     * @param {AircraftFindUniqueArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AircraftFindUniqueArgs>(args: SelectSubset<T, AircraftFindUniqueArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Aircraft that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AircraftFindUniqueOrThrowArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AircraftFindUniqueOrThrowArgs>(args: SelectSubset<T, AircraftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aircraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftFindFirstArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AircraftFindFirstArgs>(args?: SelectSubset<T, AircraftFindFirstArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aircraft that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftFindFirstOrThrowArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AircraftFindFirstOrThrowArgs>(args?: SelectSubset<T, AircraftFindFirstOrThrowArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Aircraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Aircraft
     * const aircraft = await prisma.aircraft.findMany()
     * 
     * // Get first 10 Aircraft
     * const aircraft = await prisma.aircraft.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aircraftWithIdOnly = await prisma.aircraft.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AircraftFindManyArgs>(args?: SelectSubset<T, AircraftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Aircraft.
     * @param {AircraftCreateArgs} args - Arguments to create a Aircraft.
     * @example
     * // Create one Aircraft
     * const Aircraft = await prisma.aircraft.create({
     *   data: {
     *     // ... data to create a Aircraft
     *   }
     * })
     * 
     */
    create<T extends AircraftCreateArgs>(args: SelectSubset<T, AircraftCreateArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Aircraft.
     * @param {AircraftCreateManyArgs} args - Arguments to create many Aircraft.
     * @example
     * // Create many Aircraft
     * const aircraft = await prisma.aircraft.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AircraftCreateManyArgs>(args?: SelectSubset<T, AircraftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Aircraft and returns the data saved in the database.
     * @param {AircraftCreateManyAndReturnArgs} args - Arguments to create many Aircraft.
     * @example
     * // Create many Aircraft
     * const aircraft = await prisma.aircraft.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Aircraft and only return the `id`
     * const aircraftWithIdOnly = await prisma.aircraft.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AircraftCreateManyAndReturnArgs>(args?: SelectSubset<T, AircraftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Aircraft.
     * @param {AircraftDeleteArgs} args - Arguments to delete one Aircraft.
     * @example
     * // Delete one Aircraft
     * const Aircraft = await prisma.aircraft.delete({
     *   where: {
     *     // ... filter to delete one Aircraft
     *   }
     * })
     * 
     */
    delete<T extends AircraftDeleteArgs>(args: SelectSubset<T, AircraftDeleteArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Aircraft.
     * @param {AircraftUpdateArgs} args - Arguments to update one Aircraft.
     * @example
     * // Update one Aircraft
     * const aircraft = await prisma.aircraft.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AircraftUpdateArgs>(args: SelectSubset<T, AircraftUpdateArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Aircraft.
     * @param {AircraftDeleteManyArgs} args - Arguments to filter Aircraft to delete.
     * @example
     * // Delete a few Aircraft
     * const { count } = await prisma.aircraft.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AircraftDeleteManyArgs>(args?: SelectSubset<T, AircraftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Aircraft
     * const aircraft = await prisma.aircraft.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AircraftUpdateManyArgs>(args: SelectSubset<T, AircraftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aircraft and returns the data updated in the database.
     * @param {AircraftUpdateManyAndReturnArgs} args - Arguments to update many Aircraft.
     * @example
     * // Update many Aircraft
     * const aircraft = await prisma.aircraft.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Aircraft and only return the `id`
     * const aircraftWithIdOnly = await prisma.aircraft.updateManyAndReturn({
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
    updateManyAndReturn<T extends AircraftUpdateManyAndReturnArgs>(args: SelectSubset<T, AircraftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Aircraft.
     * @param {AircraftUpsertArgs} args - Arguments to update or create a Aircraft.
     * @example
     * // Update or create a Aircraft
     * const aircraft = await prisma.aircraft.upsert({
     *   create: {
     *     // ... data to create a Aircraft
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Aircraft we want to update
     *   }
     * })
     */
    upsert<T extends AircraftUpsertArgs>(args: SelectSubset<T, AircraftUpsertArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftCountArgs} args - Arguments to filter Aircraft to count.
     * @example
     * // Count the number of Aircraft
     * const count = await prisma.aircraft.count({
     *   where: {
     *     // ... the filter for the Aircraft we want to count
     *   }
     * })
    **/
    count<T extends AircraftCountArgs>(
      args?: Subset<T, AircraftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AircraftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AircraftAggregateArgs>(args: Subset<T, AircraftAggregateArgs>): Prisma.PrismaPromise<GetAircraftAggregateType<T>>

    /**
     * Group by Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftGroupByArgs} args - Group by arguments.
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
      T extends AircraftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AircraftGroupByArgs['orderBy'] }
        : { orderBy?: AircraftGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AircraftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAircraftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Aircraft model
   */
  readonly fields: AircraftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Aircraft.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AircraftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    flights<T extends Aircraft$flightsArgs<ExtArgs> = {}>(args?: Subset<T, Aircraft$flightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Aircraft model
   */
  interface AircraftFieldRefs {
    readonly id: FieldRef<"Aircraft", 'String'>
    readonly registration: FieldRef<"Aircraft", 'String'>
    readonly iataCode: FieldRef<"Aircraft", 'String'>
    readonly icaoCode: FieldRef<"Aircraft", 'String'>
    readonly model: FieldRef<"Aircraft", 'String'>
    readonly manufacturer: FieldRef<"Aircraft", 'String'>
    readonly type: FieldRef<"Aircraft", 'String'>
    readonly maxPassengers: FieldRef<"Aircraft", 'Int'>
    readonly maxRange: FieldRef<"Aircraft", 'Int'>
    readonly createdAt: FieldRef<"Aircraft", 'DateTime'>
    readonly updatedAt: FieldRef<"Aircraft", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Aircraft findUnique
   */
  export type AircraftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft findUniqueOrThrow
   */
  export type AircraftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft findFirst
   */
  export type AircraftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aircraft.
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aircraft.
     */
    distinct?: AircraftScalarFieldEnum | AircraftScalarFieldEnum[]
  }

  /**
   * Aircraft findFirstOrThrow
   */
  export type AircraftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aircraft.
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aircraft.
     */
    distinct?: AircraftScalarFieldEnum | AircraftScalarFieldEnum[]
  }

  /**
   * Aircraft findMany
   */
  export type AircraftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Aircraft.
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    distinct?: AircraftScalarFieldEnum | AircraftScalarFieldEnum[]
  }

  /**
   * Aircraft create
   */
  export type AircraftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * The data needed to create a Aircraft.
     */
    data: XOR<AircraftCreateInput, AircraftUncheckedCreateInput>
  }

  /**
   * Aircraft createMany
   */
  export type AircraftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Aircraft.
     */
    data: AircraftCreateManyInput | AircraftCreateManyInput[]
  }

  /**
   * Aircraft createManyAndReturn
   */
  export type AircraftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * The data used to create many Aircraft.
     */
    data: AircraftCreateManyInput | AircraftCreateManyInput[]
  }

  /**
   * Aircraft update
   */
  export type AircraftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * The data needed to update a Aircraft.
     */
    data: XOR<AircraftUpdateInput, AircraftUncheckedUpdateInput>
    /**
     * Choose, which Aircraft to update.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft updateMany
   */
  export type AircraftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Aircraft.
     */
    data: XOR<AircraftUpdateManyMutationInput, AircraftUncheckedUpdateManyInput>
    /**
     * Filter which Aircraft to update
     */
    where?: AircraftWhereInput
    /**
     * Limit how many Aircraft to update.
     */
    limit?: number
  }

  /**
   * Aircraft updateManyAndReturn
   */
  export type AircraftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * The data used to update Aircraft.
     */
    data: XOR<AircraftUpdateManyMutationInput, AircraftUncheckedUpdateManyInput>
    /**
     * Filter which Aircraft to update
     */
    where?: AircraftWhereInput
    /**
     * Limit how many Aircraft to update.
     */
    limit?: number
  }

  /**
   * Aircraft upsert
   */
  export type AircraftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * The filter to search for the Aircraft to update in case it exists.
     */
    where: AircraftWhereUniqueInput
    /**
     * In case the Aircraft found by the `where` argument doesn't exist, create a new Aircraft with this data.
     */
    create: XOR<AircraftCreateInput, AircraftUncheckedCreateInput>
    /**
     * In case the Aircraft was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AircraftUpdateInput, AircraftUncheckedUpdateInput>
  }

  /**
   * Aircraft delete
   */
  export type AircraftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter which Aircraft to delete.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft deleteMany
   */
  export type AircraftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aircraft to delete
     */
    where?: AircraftWhereInput
    /**
     * Limit how many Aircraft to delete.
     */
    limit?: number
  }

  /**
   * Aircraft.flights
   */
  export type Aircraft$flightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    where?: FlightWhereInput
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    cursor?: FlightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Aircraft without action
   */
  export type AircraftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
  }


  /**
   * Model FlightRoute
   */

  export type AggregateFlightRoute = {
    _count: FlightRouteCountAggregateOutputType | null
    _avg: FlightRouteAvgAggregateOutputType | null
    _sum: FlightRouteSumAggregateOutputType | null
    _min: FlightRouteMinAggregateOutputType | null
    _max: FlightRouteMaxAggregateOutputType | null
  }

  export type FlightRouteAvgAggregateOutputType = {
    distance: number | null
    duration: number | null
  }

  export type FlightRouteSumAggregateOutputType = {
    distance: number | null
    duration: number | null
  }

  export type FlightRouteMinAggregateOutputType = {
    id: string | null
    airlineId: string | null
    originId: string | null
    destinationId: string | null
    distance: number | null
    duration: number | null
    frequency: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FlightRouteMaxAggregateOutputType = {
    id: string | null
    airlineId: string | null
    originId: string | null
    destinationId: string | null
    distance: number | null
    duration: number | null
    frequency: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FlightRouteCountAggregateOutputType = {
    id: number
    airlineId: number
    originId: number
    destinationId: number
    distance: number
    duration: number
    frequency: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FlightRouteAvgAggregateInputType = {
    distance?: true
    duration?: true
  }

  export type FlightRouteSumAggregateInputType = {
    distance?: true
    duration?: true
  }

  export type FlightRouteMinAggregateInputType = {
    id?: true
    airlineId?: true
    originId?: true
    destinationId?: true
    distance?: true
    duration?: true
    frequency?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FlightRouteMaxAggregateInputType = {
    id?: true
    airlineId?: true
    originId?: true
    destinationId?: true
    distance?: true
    duration?: true
    frequency?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FlightRouteCountAggregateInputType = {
    id?: true
    airlineId?: true
    originId?: true
    destinationId?: true
    distance?: true
    duration?: true
    frequency?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FlightRouteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FlightRoute to aggregate.
     */
    where?: FlightRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FlightRoutes to fetch.
     */
    orderBy?: FlightRouteOrderByWithRelationInput | FlightRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FlightRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FlightRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FlightRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FlightRoutes
    **/
    _count?: true | FlightRouteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FlightRouteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FlightRouteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FlightRouteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FlightRouteMaxAggregateInputType
  }

  export type GetFlightRouteAggregateType<T extends FlightRouteAggregateArgs> = {
        [P in keyof T & keyof AggregateFlightRoute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFlightRoute[P]>
      : GetScalarType<T[P], AggregateFlightRoute[P]>
  }




  export type FlightRouteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightRouteWhereInput
    orderBy?: FlightRouteOrderByWithAggregationInput | FlightRouteOrderByWithAggregationInput[]
    by: FlightRouteScalarFieldEnum[] | FlightRouteScalarFieldEnum
    having?: FlightRouteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FlightRouteCountAggregateInputType | true
    _avg?: FlightRouteAvgAggregateInputType
    _sum?: FlightRouteSumAggregateInputType
    _min?: FlightRouteMinAggregateInputType
    _max?: FlightRouteMaxAggregateInputType
  }

  export type FlightRouteGroupByOutputType = {
    id: string
    airlineId: string
    originId: string
    destinationId: string
    distance: number
    duration: number
    frequency: string
    createdAt: Date
    updatedAt: Date
    _count: FlightRouteCountAggregateOutputType | null
    _avg: FlightRouteAvgAggregateOutputType | null
    _sum: FlightRouteSumAggregateOutputType | null
    _min: FlightRouteMinAggregateOutputType | null
    _max: FlightRouteMaxAggregateOutputType | null
  }

  type GetFlightRouteGroupByPayload<T extends FlightRouteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FlightRouteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FlightRouteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FlightRouteGroupByOutputType[P]>
            : GetScalarType<T[P], FlightRouteGroupByOutputType[P]>
        }
      >
    >


  export type FlightRouteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airlineId?: boolean
    originId?: boolean
    destinationId?: boolean
    distance?: boolean
    duration?: boolean
    frequency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    origin?: boolean | AirportDefaultArgs<ExtArgs>
    destination?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["flightRoute"]>

  export type FlightRouteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airlineId?: boolean
    originId?: boolean
    destinationId?: boolean
    distance?: boolean
    duration?: boolean
    frequency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    origin?: boolean | AirportDefaultArgs<ExtArgs>
    destination?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["flightRoute"]>

  export type FlightRouteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airlineId?: boolean
    originId?: boolean
    destinationId?: boolean
    distance?: boolean
    duration?: boolean
    frequency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    origin?: boolean | AirportDefaultArgs<ExtArgs>
    destination?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["flightRoute"]>

  export type FlightRouteSelectScalar = {
    id?: boolean
    airlineId?: boolean
    originId?: boolean
    destinationId?: boolean
    distance?: boolean
    duration?: boolean
    frequency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FlightRouteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "airlineId" | "originId" | "destinationId" | "distance" | "duration" | "frequency" | "createdAt" | "updatedAt", ExtArgs["result"]["flightRoute"]>
  export type FlightRouteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    origin?: boolean | AirportDefaultArgs<ExtArgs>
    destination?: boolean | AirportDefaultArgs<ExtArgs>
  }
  export type FlightRouteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    origin?: boolean | AirportDefaultArgs<ExtArgs>
    destination?: boolean | AirportDefaultArgs<ExtArgs>
  }
  export type FlightRouteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airline?: boolean | AirlineDefaultArgs<ExtArgs>
    origin?: boolean | AirportDefaultArgs<ExtArgs>
    destination?: boolean | AirportDefaultArgs<ExtArgs>
  }

  export type $FlightRoutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FlightRoute"
    objects: {
      airline: Prisma.$AirlinePayload<ExtArgs>
      origin: Prisma.$AirportPayload<ExtArgs>
      destination: Prisma.$AirportPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      airlineId: string
      originId: string
      destinationId: string
      distance: number
      duration: number
      frequency: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["flightRoute"]>
    composites: {}
  }

  type FlightRouteGetPayload<S extends boolean | null | undefined | FlightRouteDefaultArgs> = $Result.GetResult<Prisma.$FlightRoutePayload, S>

  type FlightRouteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FlightRouteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FlightRouteCountAggregateInputType | true
    }

  export interface FlightRouteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FlightRoute'], meta: { name: 'FlightRoute' } }
    /**
     * Find zero or one FlightRoute that matches the filter.
     * @param {FlightRouteFindUniqueArgs} args - Arguments to find a FlightRoute
     * @example
     * // Get one FlightRoute
     * const flightRoute = await prisma.flightRoute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlightRouteFindUniqueArgs>(args: SelectSubset<T, FlightRouteFindUniqueArgs<ExtArgs>>): Prisma__FlightRouteClient<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FlightRoute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlightRouteFindUniqueOrThrowArgs} args - Arguments to find a FlightRoute
     * @example
     * // Get one FlightRoute
     * const flightRoute = await prisma.flightRoute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlightRouteFindUniqueOrThrowArgs>(args: SelectSubset<T, FlightRouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FlightRouteClient<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FlightRoute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightRouteFindFirstArgs} args - Arguments to find a FlightRoute
     * @example
     * // Get one FlightRoute
     * const flightRoute = await prisma.flightRoute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlightRouteFindFirstArgs>(args?: SelectSubset<T, FlightRouteFindFirstArgs<ExtArgs>>): Prisma__FlightRouteClient<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FlightRoute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightRouteFindFirstOrThrowArgs} args - Arguments to find a FlightRoute
     * @example
     * // Get one FlightRoute
     * const flightRoute = await prisma.flightRoute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlightRouteFindFirstOrThrowArgs>(args?: SelectSubset<T, FlightRouteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FlightRouteClient<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FlightRoutes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightRouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FlightRoutes
     * const flightRoutes = await prisma.flightRoute.findMany()
     * 
     * // Get first 10 FlightRoutes
     * const flightRoutes = await prisma.flightRoute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const flightRouteWithIdOnly = await prisma.flightRoute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FlightRouteFindManyArgs>(args?: SelectSubset<T, FlightRouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FlightRoute.
     * @param {FlightRouteCreateArgs} args - Arguments to create a FlightRoute.
     * @example
     * // Create one FlightRoute
     * const FlightRoute = await prisma.flightRoute.create({
     *   data: {
     *     // ... data to create a FlightRoute
     *   }
     * })
     * 
     */
    create<T extends FlightRouteCreateArgs>(args: SelectSubset<T, FlightRouteCreateArgs<ExtArgs>>): Prisma__FlightRouteClient<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FlightRoutes.
     * @param {FlightRouteCreateManyArgs} args - Arguments to create many FlightRoutes.
     * @example
     * // Create many FlightRoutes
     * const flightRoute = await prisma.flightRoute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FlightRouteCreateManyArgs>(args?: SelectSubset<T, FlightRouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FlightRoutes and returns the data saved in the database.
     * @param {FlightRouteCreateManyAndReturnArgs} args - Arguments to create many FlightRoutes.
     * @example
     * // Create many FlightRoutes
     * const flightRoute = await prisma.flightRoute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FlightRoutes and only return the `id`
     * const flightRouteWithIdOnly = await prisma.flightRoute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FlightRouteCreateManyAndReturnArgs>(args?: SelectSubset<T, FlightRouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FlightRoute.
     * @param {FlightRouteDeleteArgs} args - Arguments to delete one FlightRoute.
     * @example
     * // Delete one FlightRoute
     * const FlightRoute = await prisma.flightRoute.delete({
     *   where: {
     *     // ... filter to delete one FlightRoute
     *   }
     * })
     * 
     */
    delete<T extends FlightRouteDeleteArgs>(args: SelectSubset<T, FlightRouteDeleteArgs<ExtArgs>>): Prisma__FlightRouteClient<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FlightRoute.
     * @param {FlightRouteUpdateArgs} args - Arguments to update one FlightRoute.
     * @example
     * // Update one FlightRoute
     * const flightRoute = await prisma.flightRoute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FlightRouteUpdateArgs>(args: SelectSubset<T, FlightRouteUpdateArgs<ExtArgs>>): Prisma__FlightRouteClient<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FlightRoutes.
     * @param {FlightRouteDeleteManyArgs} args - Arguments to filter FlightRoutes to delete.
     * @example
     * // Delete a few FlightRoutes
     * const { count } = await prisma.flightRoute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FlightRouteDeleteManyArgs>(args?: SelectSubset<T, FlightRouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FlightRoutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightRouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FlightRoutes
     * const flightRoute = await prisma.flightRoute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FlightRouteUpdateManyArgs>(args: SelectSubset<T, FlightRouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FlightRoutes and returns the data updated in the database.
     * @param {FlightRouteUpdateManyAndReturnArgs} args - Arguments to update many FlightRoutes.
     * @example
     * // Update many FlightRoutes
     * const flightRoute = await prisma.flightRoute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FlightRoutes and only return the `id`
     * const flightRouteWithIdOnly = await prisma.flightRoute.updateManyAndReturn({
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
    updateManyAndReturn<T extends FlightRouteUpdateManyAndReturnArgs>(args: SelectSubset<T, FlightRouteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FlightRoute.
     * @param {FlightRouteUpsertArgs} args - Arguments to update or create a FlightRoute.
     * @example
     * // Update or create a FlightRoute
     * const flightRoute = await prisma.flightRoute.upsert({
     *   create: {
     *     // ... data to create a FlightRoute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FlightRoute we want to update
     *   }
     * })
     */
    upsert<T extends FlightRouteUpsertArgs>(args: SelectSubset<T, FlightRouteUpsertArgs<ExtArgs>>): Prisma__FlightRouteClient<$Result.GetResult<Prisma.$FlightRoutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FlightRoutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightRouteCountArgs} args - Arguments to filter FlightRoutes to count.
     * @example
     * // Count the number of FlightRoutes
     * const count = await prisma.flightRoute.count({
     *   where: {
     *     // ... the filter for the FlightRoutes we want to count
     *   }
     * })
    **/
    count<T extends FlightRouteCountArgs>(
      args?: Subset<T, FlightRouteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FlightRouteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FlightRoute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightRouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FlightRouteAggregateArgs>(args: Subset<T, FlightRouteAggregateArgs>): Prisma.PrismaPromise<GetFlightRouteAggregateType<T>>

    /**
     * Group by FlightRoute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightRouteGroupByArgs} args - Group by arguments.
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
      T extends FlightRouteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FlightRouteGroupByArgs['orderBy'] }
        : { orderBy?: FlightRouteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FlightRouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlightRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FlightRoute model
   */
  readonly fields: FlightRouteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FlightRoute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FlightRouteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    airline<T extends AirlineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirlineDefaultArgs<ExtArgs>>): Prisma__AirlineClient<$Result.GetResult<Prisma.$AirlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    origin<T extends AirportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirportDefaultArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    destination<T extends AirportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirportDefaultArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FlightRoute model
   */
  interface FlightRouteFieldRefs {
    readonly id: FieldRef<"FlightRoute", 'String'>
    readonly airlineId: FieldRef<"FlightRoute", 'String'>
    readonly originId: FieldRef<"FlightRoute", 'String'>
    readonly destinationId: FieldRef<"FlightRoute", 'String'>
    readonly distance: FieldRef<"FlightRoute", 'Int'>
    readonly duration: FieldRef<"FlightRoute", 'Float'>
    readonly frequency: FieldRef<"FlightRoute", 'String'>
    readonly createdAt: FieldRef<"FlightRoute", 'DateTime'>
    readonly updatedAt: FieldRef<"FlightRoute", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FlightRoute findUnique
   */
  export type FlightRouteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    /**
     * Filter, which FlightRoute to fetch.
     */
    where: FlightRouteWhereUniqueInput
  }

  /**
   * FlightRoute findUniqueOrThrow
   */
  export type FlightRouteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    /**
     * Filter, which FlightRoute to fetch.
     */
    where: FlightRouteWhereUniqueInput
  }

  /**
   * FlightRoute findFirst
   */
  export type FlightRouteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    /**
     * Filter, which FlightRoute to fetch.
     */
    where?: FlightRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FlightRoutes to fetch.
     */
    orderBy?: FlightRouteOrderByWithRelationInput | FlightRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FlightRoutes.
     */
    cursor?: FlightRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FlightRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FlightRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FlightRoutes.
     */
    distinct?: FlightRouteScalarFieldEnum | FlightRouteScalarFieldEnum[]
  }

  /**
   * FlightRoute findFirstOrThrow
   */
  export type FlightRouteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    /**
     * Filter, which FlightRoute to fetch.
     */
    where?: FlightRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FlightRoutes to fetch.
     */
    orderBy?: FlightRouteOrderByWithRelationInput | FlightRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FlightRoutes.
     */
    cursor?: FlightRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FlightRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FlightRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FlightRoutes.
     */
    distinct?: FlightRouteScalarFieldEnum | FlightRouteScalarFieldEnum[]
  }

  /**
   * FlightRoute findMany
   */
  export type FlightRouteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    /**
     * Filter, which FlightRoutes to fetch.
     */
    where?: FlightRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FlightRoutes to fetch.
     */
    orderBy?: FlightRouteOrderByWithRelationInput | FlightRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FlightRoutes.
     */
    cursor?: FlightRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FlightRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FlightRoutes.
     */
    skip?: number
    distinct?: FlightRouteScalarFieldEnum | FlightRouteScalarFieldEnum[]
  }

  /**
   * FlightRoute create
   */
  export type FlightRouteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    /**
     * The data needed to create a FlightRoute.
     */
    data: XOR<FlightRouteCreateInput, FlightRouteUncheckedCreateInput>
  }

  /**
   * FlightRoute createMany
   */
  export type FlightRouteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FlightRoutes.
     */
    data: FlightRouteCreateManyInput | FlightRouteCreateManyInput[]
  }

  /**
   * FlightRoute createManyAndReturn
   */
  export type FlightRouteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * The data used to create many FlightRoutes.
     */
    data: FlightRouteCreateManyInput | FlightRouteCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FlightRoute update
   */
  export type FlightRouteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    /**
     * The data needed to update a FlightRoute.
     */
    data: XOR<FlightRouteUpdateInput, FlightRouteUncheckedUpdateInput>
    /**
     * Choose, which FlightRoute to update.
     */
    where: FlightRouteWhereUniqueInput
  }

  /**
   * FlightRoute updateMany
   */
  export type FlightRouteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FlightRoutes.
     */
    data: XOR<FlightRouteUpdateManyMutationInput, FlightRouteUncheckedUpdateManyInput>
    /**
     * Filter which FlightRoutes to update
     */
    where?: FlightRouteWhereInput
    /**
     * Limit how many FlightRoutes to update.
     */
    limit?: number
  }

  /**
   * FlightRoute updateManyAndReturn
   */
  export type FlightRouteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * The data used to update FlightRoutes.
     */
    data: XOR<FlightRouteUpdateManyMutationInput, FlightRouteUncheckedUpdateManyInput>
    /**
     * Filter which FlightRoutes to update
     */
    where?: FlightRouteWhereInput
    /**
     * Limit how many FlightRoutes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FlightRoute upsert
   */
  export type FlightRouteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    /**
     * The filter to search for the FlightRoute to update in case it exists.
     */
    where: FlightRouteWhereUniqueInput
    /**
     * In case the FlightRoute found by the `where` argument doesn't exist, create a new FlightRoute with this data.
     */
    create: XOR<FlightRouteCreateInput, FlightRouteUncheckedCreateInput>
    /**
     * In case the FlightRoute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FlightRouteUpdateInput, FlightRouteUncheckedUpdateInput>
  }

  /**
   * FlightRoute delete
   */
  export type FlightRouteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
    /**
     * Filter which FlightRoute to delete.
     */
    where: FlightRouteWhereUniqueInput
  }

  /**
   * FlightRoute deleteMany
   */
  export type FlightRouteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FlightRoutes to delete
     */
    where?: FlightRouteWhereInput
    /**
     * Limit how many FlightRoutes to delete.
     */
    limit?: number
  }

  /**
   * FlightRoute without action
   */
  export type FlightRouteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightRoute
     */
    select?: FlightRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FlightRoute
     */
    omit?: FlightRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightRouteInclude<ExtArgs> | null
  }


  /**
   * Model WeatherAlert
   */

  export type AggregateWeatherAlert = {
    _count: WeatherAlertCountAggregateOutputType | null
    _avg: WeatherAlertAvgAggregateOutputType | null
    _sum: WeatherAlertSumAggregateOutputType | null
    _min: WeatherAlertMinAggregateOutputType | null
    _max: WeatherAlertMaxAggregateOutputType | null
  }

  export type WeatherAlertAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    altitude: number | null
    radius: number | null
  }

  export type WeatherAlertSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    altitude: number | null
    radius: number | null
  }

  export type WeatherAlertMinAggregateOutputType = {
    id: string | null
    type: string | null
    severity: string | null
    description: string | null
    latitude: number | null
    longitude: number | null
    altitude: number | null
    radius: number | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeatherAlertMaxAggregateOutputType = {
    id: string | null
    type: string | null
    severity: string | null
    description: string | null
    latitude: number | null
    longitude: number | null
    altitude: number | null
    radius: number | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeatherAlertCountAggregateOutputType = {
    id: number
    type: number
    severity: number
    description: number
    latitude: number
    longitude: number
    altitude: number
    radius: number
    startTime: number
    endTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WeatherAlertAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    altitude?: true
    radius?: true
  }

  export type WeatherAlertSumAggregateInputType = {
    latitude?: true
    longitude?: true
    altitude?: true
    radius?: true
  }

  export type WeatherAlertMinAggregateInputType = {
    id?: true
    type?: true
    severity?: true
    description?: true
    latitude?: true
    longitude?: true
    altitude?: true
    radius?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeatherAlertMaxAggregateInputType = {
    id?: true
    type?: true
    severity?: true
    description?: true
    latitude?: true
    longitude?: true
    altitude?: true
    radius?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeatherAlertCountAggregateInputType = {
    id?: true
    type?: true
    severity?: true
    description?: true
    latitude?: true
    longitude?: true
    altitude?: true
    radius?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WeatherAlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeatherAlert to aggregate.
     */
    where?: WeatherAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeatherAlerts to fetch.
     */
    orderBy?: WeatherAlertOrderByWithRelationInput | WeatherAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeatherAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeatherAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeatherAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeatherAlerts
    **/
    _count?: true | WeatherAlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeatherAlertAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeatherAlertSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeatherAlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeatherAlertMaxAggregateInputType
  }

  export type GetWeatherAlertAggregateType<T extends WeatherAlertAggregateArgs> = {
        [P in keyof T & keyof AggregateWeatherAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeatherAlert[P]>
      : GetScalarType<T[P], AggregateWeatherAlert[P]>
  }




  export type WeatherAlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeatherAlertWhereInput
    orderBy?: WeatherAlertOrderByWithAggregationInput | WeatherAlertOrderByWithAggregationInput[]
    by: WeatherAlertScalarFieldEnum[] | WeatherAlertScalarFieldEnum
    having?: WeatherAlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeatherAlertCountAggregateInputType | true
    _avg?: WeatherAlertAvgAggregateInputType
    _sum?: WeatherAlertSumAggregateInputType
    _min?: WeatherAlertMinAggregateInputType
    _max?: WeatherAlertMaxAggregateInputType
  }

  export type WeatherAlertGroupByOutputType = {
    id: string
    type: string
    severity: string
    description: string
    latitude: number
    longitude: number
    altitude: number
    radius: number
    startTime: Date
    endTime: Date
    createdAt: Date
    updatedAt: Date
    _count: WeatherAlertCountAggregateOutputType | null
    _avg: WeatherAlertAvgAggregateOutputType | null
    _sum: WeatherAlertSumAggregateOutputType | null
    _min: WeatherAlertMinAggregateOutputType | null
    _max: WeatherAlertMaxAggregateOutputType | null
  }

  type GetWeatherAlertGroupByPayload<T extends WeatherAlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeatherAlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeatherAlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeatherAlertGroupByOutputType[P]>
            : GetScalarType<T[P], WeatherAlertGroupByOutputType[P]>
        }
      >
    >


  export type WeatherAlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    severity?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    radius?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["weatherAlert"]>

  export type WeatherAlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    severity?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    radius?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["weatherAlert"]>

  export type WeatherAlertSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    severity?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    radius?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["weatherAlert"]>

  export type WeatherAlertSelectScalar = {
    id?: boolean
    type?: boolean
    severity?: boolean
    description?: boolean
    latitude?: boolean
    longitude?: boolean
    altitude?: boolean
    radius?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WeatherAlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "severity" | "description" | "latitude" | "longitude" | "altitude" | "radius" | "startTime" | "endTime" | "createdAt" | "updatedAt", ExtArgs["result"]["weatherAlert"]>

  export type $WeatherAlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeatherAlert"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      severity: string
      description: string
      latitude: number
      longitude: number
      altitude: number
      radius: number
      startTime: Date
      endTime: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["weatherAlert"]>
    composites: {}
  }

  type WeatherAlertGetPayload<S extends boolean | null | undefined | WeatherAlertDefaultArgs> = $Result.GetResult<Prisma.$WeatherAlertPayload, S>

  type WeatherAlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeatherAlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeatherAlertCountAggregateInputType | true
    }

  export interface WeatherAlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeatherAlert'], meta: { name: 'WeatherAlert' } }
    /**
     * Find zero or one WeatherAlert that matches the filter.
     * @param {WeatherAlertFindUniqueArgs} args - Arguments to find a WeatherAlert
     * @example
     * // Get one WeatherAlert
     * const weatherAlert = await prisma.weatherAlert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeatherAlertFindUniqueArgs>(args: SelectSubset<T, WeatherAlertFindUniqueArgs<ExtArgs>>): Prisma__WeatherAlertClient<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeatherAlert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeatherAlertFindUniqueOrThrowArgs} args - Arguments to find a WeatherAlert
     * @example
     * // Get one WeatherAlert
     * const weatherAlert = await prisma.weatherAlert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeatherAlertFindUniqueOrThrowArgs>(args: SelectSubset<T, WeatherAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeatherAlertClient<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeatherAlert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherAlertFindFirstArgs} args - Arguments to find a WeatherAlert
     * @example
     * // Get one WeatherAlert
     * const weatherAlert = await prisma.weatherAlert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeatherAlertFindFirstArgs>(args?: SelectSubset<T, WeatherAlertFindFirstArgs<ExtArgs>>): Prisma__WeatherAlertClient<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeatherAlert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherAlertFindFirstOrThrowArgs} args - Arguments to find a WeatherAlert
     * @example
     * // Get one WeatherAlert
     * const weatherAlert = await prisma.weatherAlert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeatherAlertFindFirstOrThrowArgs>(args?: SelectSubset<T, WeatherAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeatherAlertClient<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeatherAlerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherAlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeatherAlerts
     * const weatherAlerts = await prisma.weatherAlert.findMany()
     * 
     * // Get first 10 WeatherAlerts
     * const weatherAlerts = await prisma.weatherAlert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weatherAlertWithIdOnly = await prisma.weatherAlert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeatherAlertFindManyArgs>(args?: SelectSubset<T, WeatherAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeatherAlert.
     * @param {WeatherAlertCreateArgs} args - Arguments to create a WeatherAlert.
     * @example
     * // Create one WeatherAlert
     * const WeatherAlert = await prisma.weatherAlert.create({
     *   data: {
     *     // ... data to create a WeatherAlert
     *   }
     * })
     * 
     */
    create<T extends WeatherAlertCreateArgs>(args: SelectSubset<T, WeatherAlertCreateArgs<ExtArgs>>): Prisma__WeatherAlertClient<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeatherAlerts.
     * @param {WeatherAlertCreateManyArgs} args - Arguments to create many WeatherAlerts.
     * @example
     * // Create many WeatherAlerts
     * const weatherAlert = await prisma.weatherAlert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeatherAlertCreateManyArgs>(args?: SelectSubset<T, WeatherAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeatherAlerts and returns the data saved in the database.
     * @param {WeatherAlertCreateManyAndReturnArgs} args - Arguments to create many WeatherAlerts.
     * @example
     * // Create many WeatherAlerts
     * const weatherAlert = await prisma.weatherAlert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeatherAlerts and only return the `id`
     * const weatherAlertWithIdOnly = await prisma.weatherAlert.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeatherAlertCreateManyAndReturnArgs>(args?: SelectSubset<T, WeatherAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeatherAlert.
     * @param {WeatherAlertDeleteArgs} args - Arguments to delete one WeatherAlert.
     * @example
     * // Delete one WeatherAlert
     * const WeatherAlert = await prisma.weatherAlert.delete({
     *   where: {
     *     // ... filter to delete one WeatherAlert
     *   }
     * })
     * 
     */
    delete<T extends WeatherAlertDeleteArgs>(args: SelectSubset<T, WeatherAlertDeleteArgs<ExtArgs>>): Prisma__WeatherAlertClient<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeatherAlert.
     * @param {WeatherAlertUpdateArgs} args - Arguments to update one WeatherAlert.
     * @example
     * // Update one WeatherAlert
     * const weatherAlert = await prisma.weatherAlert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeatherAlertUpdateArgs>(args: SelectSubset<T, WeatherAlertUpdateArgs<ExtArgs>>): Prisma__WeatherAlertClient<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeatherAlerts.
     * @param {WeatherAlertDeleteManyArgs} args - Arguments to filter WeatherAlerts to delete.
     * @example
     * // Delete a few WeatherAlerts
     * const { count } = await prisma.weatherAlert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeatherAlertDeleteManyArgs>(args?: SelectSubset<T, WeatherAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeatherAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherAlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeatherAlerts
     * const weatherAlert = await prisma.weatherAlert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeatherAlertUpdateManyArgs>(args: SelectSubset<T, WeatherAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeatherAlerts and returns the data updated in the database.
     * @param {WeatherAlertUpdateManyAndReturnArgs} args - Arguments to update many WeatherAlerts.
     * @example
     * // Update many WeatherAlerts
     * const weatherAlert = await prisma.weatherAlert.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeatherAlerts and only return the `id`
     * const weatherAlertWithIdOnly = await prisma.weatherAlert.updateManyAndReturn({
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
    updateManyAndReturn<T extends WeatherAlertUpdateManyAndReturnArgs>(args: SelectSubset<T, WeatherAlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeatherAlert.
     * @param {WeatherAlertUpsertArgs} args - Arguments to update or create a WeatherAlert.
     * @example
     * // Update or create a WeatherAlert
     * const weatherAlert = await prisma.weatherAlert.upsert({
     *   create: {
     *     // ... data to create a WeatherAlert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeatherAlert we want to update
     *   }
     * })
     */
    upsert<T extends WeatherAlertUpsertArgs>(args: SelectSubset<T, WeatherAlertUpsertArgs<ExtArgs>>): Prisma__WeatherAlertClient<$Result.GetResult<Prisma.$WeatherAlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeatherAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherAlertCountArgs} args - Arguments to filter WeatherAlerts to count.
     * @example
     * // Count the number of WeatherAlerts
     * const count = await prisma.weatherAlert.count({
     *   where: {
     *     // ... the filter for the WeatherAlerts we want to count
     *   }
     * })
    **/
    count<T extends WeatherAlertCountArgs>(
      args?: Subset<T, WeatherAlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeatherAlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeatherAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherAlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WeatherAlertAggregateArgs>(args: Subset<T, WeatherAlertAggregateArgs>): Prisma.PrismaPromise<GetWeatherAlertAggregateType<T>>

    /**
     * Group by WeatherAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherAlertGroupByArgs} args - Group by arguments.
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
      T extends WeatherAlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeatherAlertGroupByArgs['orderBy'] }
        : { orderBy?: WeatherAlertGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WeatherAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeatherAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeatherAlert model
   */
  readonly fields: WeatherAlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeatherAlert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeatherAlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the WeatherAlert model
   */
  interface WeatherAlertFieldRefs {
    readonly id: FieldRef<"WeatherAlert", 'String'>
    readonly type: FieldRef<"WeatherAlert", 'String'>
    readonly severity: FieldRef<"WeatherAlert", 'String'>
    readonly description: FieldRef<"WeatherAlert", 'String'>
    readonly latitude: FieldRef<"WeatherAlert", 'Float'>
    readonly longitude: FieldRef<"WeatherAlert", 'Float'>
    readonly altitude: FieldRef<"WeatherAlert", 'Int'>
    readonly radius: FieldRef<"WeatherAlert", 'Int'>
    readonly startTime: FieldRef<"WeatherAlert", 'DateTime'>
    readonly endTime: FieldRef<"WeatherAlert", 'DateTime'>
    readonly createdAt: FieldRef<"WeatherAlert", 'DateTime'>
    readonly updatedAt: FieldRef<"WeatherAlert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeatherAlert findUnique
   */
  export type WeatherAlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * Filter, which WeatherAlert to fetch.
     */
    where: WeatherAlertWhereUniqueInput
  }

  /**
   * WeatherAlert findUniqueOrThrow
   */
  export type WeatherAlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * Filter, which WeatherAlert to fetch.
     */
    where: WeatherAlertWhereUniqueInput
  }

  /**
   * WeatherAlert findFirst
   */
  export type WeatherAlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * Filter, which WeatherAlert to fetch.
     */
    where?: WeatherAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeatherAlerts to fetch.
     */
    orderBy?: WeatherAlertOrderByWithRelationInput | WeatherAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeatherAlerts.
     */
    cursor?: WeatherAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeatherAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeatherAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeatherAlerts.
     */
    distinct?: WeatherAlertScalarFieldEnum | WeatherAlertScalarFieldEnum[]
  }

  /**
   * WeatherAlert findFirstOrThrow
   */
  export type WeatherAlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * Filter, which WeatherAlert to fetch.
     */
    where?: WeatherAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeatherAlerts to fetch.
     */
    orderBy?: WeatherAlertOrderByWithRelationInput | WeatherAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeatherAlerts.
     */
    cursor?: WeatherAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeatherAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeatherAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeatherAlerts.
     */
    distinct?: WeatherAlertScalarFieldEnum | WeatherAlertScalarFieldEnum[]
  }

  /**
   * WeatherAlert findMany
   */
  export type WeatherAlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * Filter, which WeatherAlerts to fetch.
     */
    where?: WeatherAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeatherAlerts to fetch.
     */
    orderBy?: WeatherAlertOrderByWithRelationInput | WeatherAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeatherAlerts.
     */
    cursor?: WeatherAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeatherAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeatherAlerts.
     */
    skip?: number
    distinct?: WeatherAlertScalarFieldEnum | WeatherAlertScalarFieldEnum[]
  }

  /**
   * WeatherAlert create
   */
  export type WeatherAlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * The data needed to create a WeatherAlert.
     */
    data: XOR<WeatherAlertCreateInput, WeatherAlertUncheckedCreateInput>
  }

  /**
   * WeatherAlert createMany
   */
  export type WeatherAlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeatherAlerts.
     */
    data: WeatherAlertCreateManyInput | WeatherAlertCreateManyInput[]
  }

  /**
   * WeatherAlert createManyAndReturn
   */
  export type WeatherAlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * The data used to create many WeatherAlerts.
     */
    data: WeatherAlertCreateManyInput | WeatherAlertCreateManyInput[]
  }

  /**
   * WeatherAlert update
   */
  export type WeatherAlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * The data needed to update a WeatherAlert.
     */
    data: XOR<WeatherAlertUpdateInput, WeatherAlertUncheckedUpdateInput>
    /**
     * Choose, which WeatherAlert to update.
     */
    where: WeatherAlertWhereUniqueInput
  }

  /**
   * WeatherAlert updateMany
   */
  export type WeatherAlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeatherAlerts.
     */
    data: XOR<WeatherAlertUpdateManyMutationInput, WeatherAlertUncheckedUpdateManyInput>
    /**
     * Filter which WeatherAlerts to update
     */
    where?: WeatherAlertWhereInput
    /**
     * Limit how many WeatherAlerts to update.
     */
    limit?: number
  }

  /**
   * WeatherAlert updateManyAndReturn
   */
  export type WeatherAlertUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * The data used to update WeatherAlerts.
     */
    data: XOR<WeatherAlertUpdateManyMutationInput, WeatherAlertUncheckedUpdateManyInput>
    /**
     * Filter which WeatherAlerts to update
     */
    where?: WeatherAlertWhereInput
    /**
     * Limit how many WeatherAlerts to update.
     */
    limit?: number
  }

  /**
   * WeatherAlert upsert
   */
  export type WeatherAlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * The filter to search for the WeatherAlert to update in case it exists.
     */
    where: WeatherAlertWhereUniqueInput
    /**
     * In case the WeatherAlert found by the `where` argument doesn't exist, create a new WeatherAlert with this data.
     */
    create: XOR<WeatherAlertCreateInput, WeatherAlertUncheckedCreateInput>
    /**
     * In case the WeatherAlert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeatherAlertUpdateInput, WeatherAlertUncheckedUpdateInput>
  }

  /**
   * WeatherAlert delete
   */
  export type WeatherAlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
    /**
     * Filter which WeatherAlert to delete.
     */
    where: WeatherAlertWhereUniqueInput
  }

  /**
   * WeatherAlert deleteMany
   */
  export type WeatherAlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeatherAlerts to delete
     */
    where?: WeatherAlertWhereInput
    /**
     * Limit how many WeatherAlerts to delete.
     */
    limit?: number
  }

  /**
   * WeatherAlert without action
   */
  export type WeatherAlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherAlert
     */
    select?: WeatherAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherAlert
     */
    omit?: WeatherAlertOmit<ExtArgs> | null
  }


  /**
   * Model RiskAssessment
   */

  export type AggregateRiskAssessment = {
    _count: RiskAssessmentCountAggregateOutputType | null
    _avg: RiskAssessmentAvgAggregateOutputType | null
    _sum: RiskAssessmentSumAggregateOutputType | null
    _min: RiskAssessmentMinAggregateOutputType | null
    _max: RiskAssessmentMaxAggregateOutputType | null
  }

  export type RiskAssessmentAvgAggregateOutputType = {
    overallRisk: number | null
    weatherRisk: number | null
    aircraftRisk: number | null
    routeRisk: number | null
    crewRisk: number | null
  }

  export type RiskAssessmentSumAggregateOutputType = {
    overallRisk: number | null
    weatherRisk: number | null
    aircraftRisk: number | null
    routeRisk: number | null
    crewRisk: number | null
  }

  export type RiskAssessmentMinAggregateOutputType = {
    id: string | null
    flightId: string | null
    overallRisk: number | null
    weatherRisk: number | null
    aircraftRisk: number | null
    routeRisk: number | null
    crewRisk: number | null
    factors: string | null
    recommendations: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RiskAssessmentMaxAggregateOutputType = {
    id: string | null
    flightId: string | null
    overallRisk: number | null
    weatherRisk: number | null
    aircraftRisk: number | null
    routeRisk: number | null
    crewRisk: number | null
    factors: string | null
    recommendations: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RiskAssessmentCountAggregateOutputType = {
    id: number
    flightId: number
    overallRisk: number
    weatherRisk: number
    aircraftRisk: number
    routeRisk: number
    crewRisk: number
    factors: number
    recommendations: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RiskAssessmentAvgAggregateInputType = {
    overallRisk?: true
    weatherRisk?: true
    aircraftRisk?: true
    routeRisk?: true
    crewRisk?: true
  }

  export type RiskAssessmentSumAggregateInputType = {
    overallRisk?: true
    weatherRisk?: true
    aircraftRisk?: true
    routeRisk?: true
    crewRisk?: true
  }

  export type RiskAssessmentMinAggregateInputType = {
    id?: true
    flightId?: true
    overallRisk?: true
    weatherRisk?: true
    aircraftRisk?: true
    routeRisk?: true
    crewRisk?: true
    factors?: true
    recommendations?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RiskAssessmentMaxAggregateInputType = {
    id?: true
    flightId?: true
    overallRisk?: true
    weatherRisk?: true
    aircraftRisk?: true
    routeRisk?: true
    crewRisk?: true
    factors?: true
    recommendations?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RiskAssessmentCountAggregateInputType = {
    id?: true
    flightId?: true
    overallRisk?: true
    weatherRisk?: true
    aircraftRisk?: true
    routeRisk?: true
    crewRisk?: true
    factors?: true
    recommendations?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RiskAssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskAssessment to aggregate.
     */
    where?: RiskAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskAssessments to fetch.
     */
    orderBy?: RiskAssessmentOrderByWithRelationInput | RiskAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiskAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiskAssessments
    **/
    _count?: true | RiskAssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RiskAssessmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RiskAssessmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiskAssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiskAssessmentMaxAggregateInputType
  }

  export type GetRiskAssessmentAggregateType<T extends RiskAssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateRiskAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiskAssessment[P]>
      : GetScalarType<T[P], AggregateRiskAssessment[P]>
  }




  export type RiskAssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiskAssessmentWhereInput
    orderBy?: RiskAssessmentOrderByWithAggregationInput | RiskAssessmentOrderByWithAggregationInput[]
    by: RiskAssessmentScalarFieldEnum[] | RiskAssessmentScalarFieldEnum
    having?: RiskAssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiskAssessmentCountAggregateInputType | true
    _avg?: RiskAssessmentAvgAggregateInputType
    _sum?: RiskAssessmentSumAggregateInputType
    _min?: RiskAssessmentMinAggregateInputType
    _max?: RiskAssessmentMaxAggregateInputType
  }

  export type RiskAssessmentGroupByOutputType = {
    id: string
    flightId: string
    overallRisk: number
    weatherRisk: number
    aircraftRisk: number
    routeRisk: number
    crewRisk: number
    factors: string
    recommendations: string | null
    createdAt: Date
    updatedAt: Date
    _count: RiskAssessmentCountAggregateOutputType | null
    _avg: RiskAssessmentAvgAggregateOutputType | null
    _sum: RiskAssessmentSumAggregateOutputType | null
    _min: RiskAssessmentMinAggregateOutputType | null
    _max: RiskAssessmentMaxAggregateOutputType | null
  }

  type GetRiskAssessmentGroupByPayload<T extends RiskAssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiskAssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiskAssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiskAssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], RiskAssessmentGroupByOutputType[P]>
        }
      >
    >


  export type RiskAssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    flightId?: boolean
    overallRisk?: boolean
    weatherRisk?: boolean
    aircraftRisk?: boolean
    routeRisk?: boolean
    crewRisk?: boolean
    factors?: boolean
    recommendations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskAssessment"]>

  export type RiskAssessmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    flightId?: boolean
    overallRisk?: boolean
    weatherRisk?: boolean
    aircraftRisk?: boolean
    routeRisk?: boolean
    crewRisk?: boolean
    factors?: boolean
    recommendations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskAssessment"]>

  export type RiskAssessmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    flightId?: boolean
    overallRisk?: boolean
    weatherRisk?: boolean
    aircraftRisk?: boolean
    routeRisk?: boolean
    crewRisk?: boolean
    factors?: boolean
    recommendations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskAssessment"]>

  export type RiskAssessmentSelectScalar = {
    id?: boolean
    flightId?: boolean
    overallRisk?: boolean
    weatherRisk?: boolean
    aircraftRisk?: boolean
    routeRisk?: boolean
    crewRisk?: boolean
    factors?: boolean
    recommendations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RiskAssessmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "flightId" | "overallRisk" | "weatherRisk" | "aircraftRisk" | "routeRisk" | "crewRisk" | "factors" | "recommendations" | "createdAt" | "updatedAt", ExtArgs["result"]["riskAssessment"]>
  export type RiskAssessmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }
  export type RiskAssessmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }
  export type RiskAssessmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }

  export type $RiskAssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiskAssessment"
    objects: {
      flight: Prisma.$FlightPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      flightId: string
      overallRisk: number
      weatherRisk: number
      aircraftRisk: number
      routeRisk: number
      crewRisk: number
      factors: string
      recommendations: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["riskAssessment"]>
    composites: {}
  }

  type RiskAssessmentGetPayload<S extends boolean | null | undefined | RiskAssessmentDefaultArgs> = $Result.GetResult<Prisma.$RiskAssessmentPayload, S>

  type RiskAssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RiskAssessmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RiskAssessmentCountAggregateInputType | true
    }

  export interface RiskAssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiskAssessment'], meta: { name: 'RiskAssessment' } }
    /**
     * Find zero or one RiskAssessment that matches the filter.
     * @param {RiskAssessmentFindUniqueArgs} args - Arguments to find a RiskAssessment
     * @example
     * // Get one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiskAssessmentFindUniqueArgs>(args: SelectSubset<T, RiskAssessmentFindUniqueArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RiskAssessment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RiskAssessmentFindUniqueOrThrowArgs} args - Arguments to find a RiskAssessment
     * @example
     * // Get one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiskAssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, RiskAssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiskAssessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentFindFirstArgs} args - Arguments to find a RiskAssessment
     * @example
     * // Get one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiskAssessmentFindFirstArgs>(args?: SelectSubset<T, RiskAssessmentFindFirstArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiskAssessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentFindFirstOrThrowArgs} args - Arguments to find a RiskAssessment
     * @example
     * // Get one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiskAssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, RiskAssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RiskAssessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiskAssessments
     * const riskAssessments = await prisma.riskAssessment.findMany()
     * 
     * // Get first 10 RiskAssessments
     * const riskAssessments = await prisma.riskAssessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riskAssessmentWithIdOnly = await prisma.riskAssessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiskAssessmentFindManyArgs>(args?: SelectSubset<T, RiskAssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RiskAssessment.
     * @param {RiskAssessmentCreateArgs} args - Arguments to create a RiskAssessment.
     * @example
     * // Create one RiskAssessment
     * const RiskAssessment = await prisma.riskAssessment.create({
     *   data: {
     *     // ... data to create a RiskAssessment
     *   }
     * })
     * 
     */
    create<T extends RiskAssessmentCreateArgs>(args: SelectSubset<T, RiskAssessmentCreateArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RiskAssessments.
     * @param {RiskAssessmentCreateManyArgs} args - Arguments to create many RiskAssessments.
     * @example
     * // Create many RiskAssessments
     * const riskAssessment = await prisma.riskAssessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiskAssessmentCreateManyArgs>(args?: SelectSubset<T, RiskAssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiskAssessments and returns the data saved in the database.
     * @param {RiskAssessmentCreateManyAndReturnArgs} args - Arguments to create many RiskAssessments.
     * @example
     * // Create many RiskAssessments
     * const riskAssessment = await prisma.riskAssessment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiskAssessments and only return the `id`
     * const riskAssessmentWithIdOnly = await prisma.riskAssessment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiskAssessmentCreateManyAndReturnArgs>(args?: SelectSubset<T, RiskAssessmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RiskAssessment.
     * @param {RiskAssessmentDeleteArgs} args - Arguments to delete one RiskAssessment.
     * @example
     * // Delete one RiskAssessment
     * const RiskAssessment = await prisma.riskAssessment.delete({
     *   where: {
     *     // ... filter to delete one RiskAssessment
     *   }
     * })
     * 
     */
    delete<T extends RiskAssessmentDeleteArgs>(args: SelectSubset<T, RiskAssessmentDeleteArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RiskAssessment.
     * @param {RiskAssessmentUpdateArgs} args - Arguments to update one RiskAssessment.
     * @example
     * // Update one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiskAssessmentUpdateArgs>(args: SelectSubset<T, RiskAssessmentUpdateArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RiskAssessments.
     * @param {RiskAssessmentDeleteManyArgs} args - Arguments to filter RiskAssessments to delete.
     * @example
     * // Delete a few RiskAssessments
     * const { count } = await prisma.riskAssessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiskAssessmentDeleteManyArgs>(args?: SelectSubset<T, RiskAssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskAssessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiskAssessments
     * const riskAssessment = await prisma.riskAssessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiskAssessmentUpdateManyArgs>(args: SelectSubset<T, RiskAssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskAssessments and returns the data updated in the database.
     * @param {RiskAssessmentUpdateManyAndReturnArgs} args - Arguments to update many RiskAssessments.
     * @example
     * // Update many RiskAssessments
     * const riskAssessment = await prisma.riskAssessment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RiskAssessments and only return the `id`
     * const riskAssessmentWithIdOnly = await prisma.riskAssessment.updateManyAndReturn({
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
    updateManyAndReturn<T extends RiskAssessmentUpdateManyAndReturnArgs>(args: SelectSubset<T, RiskAssessmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RiskAssessment.
     * @param {RiskAssessmentUpsertArgs} args - Arguments to update or create a RiskAssessment.
     * @example
     * // Update or create a RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.upsert({
     *   create: {
     *     // ... data to create a RiskAssessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiskAssessment we want to update
     *   }
     * })
     */
    upsert<T extends RiskAssessmentUpsertArgs>(args: SelectSubset<T, RiskAssessmentUpsertArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RiskAssessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentCountArgs} args - Arguments to filter RiskAssessments to count.
     * @example
     * // Count the number of RiskAssessments
     * const count = await prisma.riskAssessment.count({
     *   where: {
     *     // ... the filter for the RiskAssessments we want to count
     *   }
     * })
    **/
    count<T extends RiskAssessmentCountArgs>(
      args?: Subset<T, RiskAssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiskAssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiskAssessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RiskAssessmentAggregateArgs>(args: Subset<T, RiskAssessmentAggregateArgs>): Prisma.PrismaPromise<GetRiskAssessmentAggregateType<T>>

    /**
     * Group by RiskAssessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentGroupByArgs} args - Group by arguments.
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
      T extends RiskAssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiskAssessmentGroupByArgs['orderBy'] }
        : { orderBy?: RiskAssessmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RiskAssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiskAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiskAssessment model
   */
  readonly fields: RiskAssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiskAssessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiskAssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    flight<T extends FlightDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FlightDefaultArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RiskAssessment model
   */
  interface RiskAssessmentFieldRefs {
    readonly id: FieldRef<"RiskAssessment", 'String'>
    readonly flightId: FieldRef<"RiskAssessment", 'String'>
    readonly overallRisk: FieldRef<"RiskAssessment", 'Int'>
    readonly weatherRisk: FieldRef<"RiskAssessment", 'Int'>
    readonly aircraftRisk: FieldRef<"RiskAssessment", 'Int'>
    readonly routeRisk: FieldRef<"RiskAssessment", 'Int'>
    readonly crewRisk: FieldRef<"RiskAssessment", 'Int'>
    readonly factors: FieldRef<"RiskAssessment", 'String'>
    readonly recommendations: FieldRef<"RiskAssessment", 'String'>
    readonly createdAt: FieldRef<"RiskAssessment", 'DateTime'>
    readonly updatedAt: FieldRef<"RiskAssessment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RiskAssessment findUnique
   */
  export type RiskAssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which RiskAssessment to fetch.
     */
    where: RiskAssessmentWhereUniqueInput
  }

  /**
   * RiskAssessment findUniqueOrThrow
   */
  export type RiskAssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which RiskAssessment to fetch.
     */
    where: RiskAssessmentWhereUniqueInput
  }

  /**
   * RiskAssessment findFirst
   */
  export type RiskAssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which RiskAssessment to fetch.
     */
    where?: RiskAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskAssessments to fetch.
     */
    orderBy?: RiskAssessmentOrderByWithRelationInput | RiskAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskAssessments.
     */
    cursor?: RiskAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskAssessments.
     */
    distinct?: RiskAssessmentScalarFieldEnum | RiskAssessmentScalarFieldEnum[]
  }

  /**
   * RiskAssessment findFirstOrThrow
   */
  export type RiskAssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which RiskAssessment to fetch.
     */
    where?: RiskAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskAssessments to fetch.
     */
    orderBy?: RiskAssessmentOrderByWithRelationInput | RiskAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskAssessments.
     */
    cursor?: RiskAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskAssessments.
     */
    distinct?: RiskAssessmentScalarFieldEnum | RiskAssessmentScalarFieldEnum[]
  }

  /**
   * RiskAssessment findMany
   */
  export type RiskAssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    /**
     * Filter, which RiskAssessments to fetch.
     */
    where?: RiskAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskAssessments to fetch.
     */
    orderBy?: RiskAssessmentOrderByWithRelationInput | RiskAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiskAssessments.
     */
    cursor?: RiskAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskAssessments.
     */
    skip?: number
    distinct?: RiskAssessmentScalarFieldEnum | RiskAssessmentScalarFieldEnum[]
  }

  /**
   * RiskAssessment create
   */
  export type RiskAssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    /**
     * The data needed to create a RiskAssessment.
     */
    data: XOR<RiskAssessmentCreateInput, RiskAssessmentUncheckedCreateInput>
  }

  /**
   * RiskAssessment createMany
   */
  export type RiskAssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiskAssessments.
     */
    data: RiskAssessmentCreateManyInput | RiskAssessmentCreateManyInput[]
  }

  /**
   * RiskAssessment createManyAndReturn
   */
  export type RiskAssessmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * The data used to create many RiskAssessments.
     */
    data: RiskAssessmentCreateManyInput | RiskAssessmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RiskAssessment update
   */
  export type RiskAssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    /**
     * The data needed to update a RiskAssessment.
     */
    data: XOR<RiskAssessmentUpdateInput, RiskAssessmentUncheckedUpdateInput>
    /**
     * Choose, which RiskAssessment to update.
     */
    where: RiskAssessmentWhereUniqueInput
  }

  /**
   * RiskAssessment updateMany
   */
  export type RiskAssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiskAssessments.
     */
    data: XOR<RiskAssessmentUpdateManyMutationInput, RiskAssessmentUncheckedUpdateManyInput>
    /**
     * Filter which RiskAssessments to update
     */
    where?: RiskAssessmentWhereInput
    /**
     * Limit how many RiskAssessments to update.
     */
    limit?: number
  }

  /**
   * RiskAssessment updateManyAndReturn
   */
  export type RiskAssessmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * The data used to update RiskAssessments.
     */
    data: XOR<RiskAssessmentUpdateManyMutationInput, RiskAssessmentUncheckedUpdateManyInput>
    /**
     * Filter which RiskAssessments to update
     */
    where?: RiskAssessmentWhereInput
    /**
     * Limit how many RiskAssessments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RiskAssessment upsert
   */
  export type RiskAssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    /**
     * The filter to search for the RiskAssessment to update in case it exists.
     */
    where: RiskAssessmentWhereUniqueInput
    /**
     * In case the RiskAssessment found by the `where` argument doesn't exist, create a new RiskAssessment with this data.
     */
    create: XOR<RiskAssessmentCreateInput, RiskAssessmentUncheckedCreateInput>
    /**
     * In case the RiskAssessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiskAssessmentUpdateInput, RiskAssessmentUncheckedUpdateInput>
  }

  /**
   * RiskAssessment delete
   */
  export type RiskAssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
    /**
     * Filter which RiskAssessment to delete.
     */
    where: RiskAssessmentWhereUniqueInput
  }

  /**
   * RiskAssessment deleteMany
   */
  export type RiskAssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskAssessments to delete
     */
    where?: RiskAssessmentWhereInput
    /**
     * Limit how many RiskAssessments to delete.
     */
    limit?: number
  }

  /**
   * RiskAssessment without action
   */
  export type RiskAssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskAssessment
     */
    omit?: RiskAssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskAssessmentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FlightScalarFieldEnum: {
    id: 'id',
    flightNumber: 'flightNumber',
    iataCode: 'iataCode',
    icaoCode: 'icaoCode',
    status: 'status',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    airlineId: 'airlineId',
    departureId: 'departureId',
    arrivalId: 'arrivalId',
    aircraftId: 'aircraftId',
    departureTime: 'departureTime',
    arrivalTime: 'arrivalTime',
    departureDelay: 'departureDelay',
    arrivalDelay: 'arrivalDelay',
    departureTerminal: 'departureTerminal',
    arrivalTerminal: 'arrivalTerminal',
    departureGate: 'departureGate',
    arrivalGate: 'arrivalGate',
    departureRunway: 'departureRunway',
    arrivalRunway: 'arrivalRunway',
    baggageClaim: 'baggageClaim',
    latitude: 'latitude',
    longitude: 'longitude',
    altitude: 'altitude',
    speed: 'speed',
    heading: 'heading',
    verticalRate: 'verticalRate',
    onGround: 'onGround',
    lastUpdate: 'lastUpdate',
    riskScore: 'riskScore',
    weather: 'weather',
    atcLoad: 'atcLoad'
  };

  export type FlightScalarFieldEnum = (typeof FlightScalarFieldEnum)[keyof typeof FlightScalarFieldEnum]


  export const AirlineScalarFieldEnum: {
    id: 'id',
    name: 'name',
    iataCode: 'iataCode',
    icaoCode: 'icaoCode',
    country: 'country',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AirlineScalarFieldEnum = (typeof AirlineScalarFieldEnum)[keyof typeof AirlineScalarFieldEnum]


  export const AirlineHubScalarFieldEnum: {
    id: 'id',
    airlineId: 'airlineId',
    airportId: 'airportId',
    createdAt: 'createdAt'
  };

  export type AirlineHubScalarFieldEnum = (typeof AirlineHubScalarFieldEnum)[keyof typeof AirlineHubScalarFieldEnum]


  export const AirportScalarFieldEnum: {
    id: 'id',
    name: 'name',
    iataCode: 'iataCode',
    icaoCode: 'icaoCode',
    city: 'city',
    country: 'country',
    timezone: 'timezone',
    latitude: 'latitude',
    longitude: 'longitude',
    altitude: 'altitude',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AirportScalarFieldEnum = (typeof AirportScalarFieldEnum)[keyof typeof AirportScalarFieldEnum]


  export const AircraftScalarFieldEnum: {
    id: 'id',
    registration: 'registration',
    iataCode: 'iataCode',
    icaoCode: 'icaoCode',
    model: 'model',
    manufacturer: 'manufacturer',
    type: 'type',
    maxPassengers: 'maxPassengers',
    maxRange: 'maxRange',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AircraftScalarFieldEnum = (typeof AircraftScalarFieldEnum)[keyof typeof AircraftScalarFieldEnum]


  export const FlightRouteScalarFieldEnum: {
    id: 'id',
    airlineId: 'airlineId',
    originId: 'originId',
    destinationId: 'destinationId',
    distance: 'distance',
    duration: 'duration',
    frequency: 'frequency',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FlightRouteScalarFieldEnum = (typeof FlightRouteScalarFieldEnum)[keyof typeof FlightRouteScalarFieldEnum]


  export const WeatherAlertScalarFieldEnum: {
    id: 'id',
    type: 'type',
    severity: 'severity',
    description: 'description',
    latitude: 'latitude',
    longitude: 'longitude',
    altitude: 'altitude',
    radius: 'radius',
    startTime: 'startTime',
    endTime: 'endTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WeatherAlertScalarFieldEnum = (typeof WeatherAlertScalarFieldEnum)[keyof typeof WeatherAlertScalarFieldEnum]


  export const RiskAssessmentScalarFieldEnum: {
    id: 'id',
    flightId: 'flightId',
    overallRisk: 'overallRisk',
    weatherRisk: 'weatherRisk',
    aircraftRisk: 'aircraftRisk',
    routeRisk: 'routeRisk',
    crewRisk: 'crewRisk',
    factors: 'factors',
    recommendations: 'recommendations',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RiskAssessmentScalarFieldEnum = (typeof RiskAssessmentScalarFieldEnum)[keyof typeof RiskAssessmentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type FlightWhereInput = {
    AND?: FlightWhereInput | FlightWhereInput[]
    OR?: FlightWhereInput[]
    NOT?: FlightWhereInput | FlightWhereInput[]
    id?: StringFilter<"Flight"> | string
    flightNumber?: StringFilter<"Flight"> | string
    iataCode?: StringFilter<"Flight"> | string
    icaoCode?: StringFilter<"Flight"> | string
    status?: StringFilter<"Flight"> | string
    date?: DateTimeFilter<"Flight"> | Date | string
    createdAt?: DateTimeFilter<"Flight"> | Date | string
    updatedAt?: DateTimeFilter<"Flight"> | Date | string
    airlineId?: StringFilter<"Flight"> | string
    departureId?: StringFilter<"Flight"> | string
    arrivalId?: StringFilter<"Flight"> | string
    aircraftId?: StringNullableFilter<"Flight"> | string | null
    departureTime?: DateTimeFilter<"Flight"> | Date | string
    arrivalTime?: DateTimeFilter<"Flight"> | Date | string
    departureDelay?: IntFilter<"Flight"> | number
    arrivalDelay?: IntFilter<"Flight"> | number
    departureTerminal?: StringNullableFilter<"Flight"> | string | null
    arrivalTerminal?: StringNullableFilter<"Flight"> | string | null
    departureGate?: StringNullableFilter<"Flight"> | string | null
    arrivalGate?: StringNullableFilter<"Flight"> | string | null
    departureRunway?: StringNullableFilter<"Flight"> | string | null
    arrivalRunway?: StringNullableFilter<"Flight"> | string | null
    baggageClaim?: StringNullableFilter<"Flight"> | string | null
    latitude?: FloatNullableFilter<"Flight"> | number | null
    longitude?: FloatNullableFilter<"Flight"> | number | null
    altitude?: FloatNullableFilter<"Flight"> | number | null
    speed?: FloatNullableFilter<"Flight"> | number | null
    heading?: FloatNullableFilter<"Flight"> | number | null
    verticalRate?: FloatNullableFilter<"Flight"> | number | null
    onGround?: BoolFilter<"Flight"> | boolean
    lastUpdate?: DateTimeNullableFilter<"Flight"> | Date | string | null
    riskScore?: IntFilter<"Flight"> | number
    weather?: StringFilter<"Flight"> | string
    atcLoad?: StringFilter<"Flight"> | string
    airline?: XOR<AirlineScalarRelationFilter, AirlineWhereInput>
    departure?: XOR<AirportScalarRelationFilter, AirportWhereInput>
    arrival?: XOR<AirportScalarRelationFilter, AirportWhereInput>
    aircraft?: XOR<AircraftNullableScalarRelationFilter, AircraftWhereInput> | null
    riskAssessment?: XOR<RiskAssessmentNullableScalarRelationFilter, RiskAssessmentWhereInput> | null
  }

  export type FlightOrderByWithRelationInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    airlineId?: SortOrder
    departureId?: SortOrder
    arrivalId?: SortOrder
    aircraftId?: SortOrderInput | SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    departureDelay?: SortOrder
    arrivalDelay?: SortOrder
    departureTerminal?: SortOrderInput | SortOrder
    arrivalTerminal?: SortOrderInput | SortOrder
    departureGate?: SortOrderInput | SortOrder
    arrivalGate?: SortOrderInput | SortOrder
    departureRunway?: SortOrderInput | SortOrder
    arrivalRunway?: SortOrderInput | SortOrder
    baggageClaim?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    speed?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    verticalRate?: SortOrderInput | SortOrder
    onGround?: SortOrder
    lastUpdate?: SortOrderInput | SortOrder
    riskScore?: SortOrder
    weather?: SortOrder
    atcLoad?: SortOrder
    airline?: AirlineOrderByWithRelationInput
    departure?: AirportOrderByWithRelationInput
    arrival?: AirportOrderByWithRelationInput
    aircraft?: AircraftOrderByWithRelationInput
    riskAssessment?: RiskAssessmentOrderByWithRelationInput
  }

  export type FlightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    flightNumber?: string
    AND?: FlightWhereInput | FlightWhereInput[]
    OR?: FlightWhereInput[]
    NOT?: FlightWhereInput | FlightWhereInput[]
    iataCode?: StringFilter<"Flight"> | string
    icaoCode?: StringFilter<"Flight"> | string
    status?: StringFilter<"Flight"> | string
    date?: DateTimeFilter<"Flight"> | Date | string
    createdAt?: DateTimeFilter<"Flight"> | Date | string
    updatedAt?: DateTimeFilter<"Flight"> | Date | string
    airlineId?: StringFilter<"Flight"> | string
    departureId?: StringFilter<"Flight"> | string
    arrivalId?: StringFilter<"Flight"> | string
    aircraftId?: StringNullableFilter<"Flight"> | string | null
    departureTime?: DateTimeFilter<"Flight"> | Date | string
    arrivalTime?: DateTimeFilter<"Flight"> | Date | string
    departureDelay?: IntFilter<"Flight"> | number
    arrivalDelay?: IntFilter<"Flight"> | number
    departureTerminal?: StringNullableFilter<"Flight"> | string | null
    arrivalTerminal?: StringNullableFilter<"Flight"> | string | null
    departureGate?: StringNullableFilter<"Flight"> | string | null
    arrivalGate?: StringNullableFilter<"Flight"> | string | null
    departureRunway?: StringNullableFilter<"Flight"> | string | null
    arrivalRunway?: StringNullableFilter<"Flight"> | string | null
    baggageClaim?: StringNullableFilter<"Flight"> | string | null
    latitude?: FloatNullableFilter<"Flight"> | number | null
    longitude?: FloatNullableFilter<"Flight"> | number | null
    altitude?: FloatNullableFilter<"Flight"> | number | null
    speed?: FloatNullableFilter<"Flight"> | number | null
    heading?: FloatNullableFilter<"Flight"> | number | null
    verticalRate?: FloatNullableFilter<"Flight"> | number | null
    onGround?: BoolFilter<"Flight"> | boolean
    lastUpdate?: DateTimeNullableFilter<"Flight"> | Date | string | null
    riskScore?: IntFilter<"Flight"> | number
    weather?: StringFilter<"Flight"> | string
    atcLoad?: StringFilter<"Flight"> | string
    airline?: XOR<AirlineScalarRelationFilter, AirlineWhereInput>
    departure?: XOR<AirportScalarRelationFilter, AirportWhereInput>
    arrival?: XOR<AirportScalarRelationFilter, AirportWhereInput>
    aircraft?: XOR<AircraftNullableScalarRelationFilter, AircraftWhereInput> | null
    riskAssessment?: XOR<RiskAssessmentNullableScalarRelationFilter, RiskAssessmentWhereInput> | null
  }, "id" | "flightNumber">

  export type FlightOrderByWithAggregationInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    airlineId?: SortOrder
    departureId?: SortOrder
    arrivalId?: SortOrder
    aircraftId?: SortOrderInput | SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    departureDelay?: SortOrder
    arrivalDelay?: SortOrder
    departureTerminal?: SortOrderInput | SortOrder
    arrivalTerminal?: SortOrderInput | SortOrder
    departureGate?: SortOrderInput | SortOrder
    arrivalGate?: SortOrderInput | SortOrder
    departureRunway?: SortOrderInput | SortOrder
    arrivalRunway?: SortOrderInput | SortOrder
    baggageClaim?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    speed?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    verticalRate?: SortOrderInput | SortOrder
    onGround?: SortOrder
    lastUpdate?: SortOrderInput | SortOrder
    riskScore?: SortOrder
    weather?: SortOrder
    atcLoad?: SortOrder
    _count?: FlightCountOrderByAggregateInput
    _avg?: FlightAvgOrderByAggregateInput
    _max?: FlightMaxOrderByAggregateInput
    _min?: FlightMinOrderByAggregateInput
    _sum?: FlightSumOrderByAggregateInput
  }

  export type FlightScalarWhereWithAggregatesInput = {
    AND?: FlightScalarWhereWithAggregatesInput | FlightScalarWhereWithAggregatesInput[]
    OR?: FlightScalarWhereWithAggregatesInput[]
    NOT?: FlightScalarWhereWithAggregatesInput | FlightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Flight"> | string
    flightNumber?: StringWithAggregatesFilter<"Flight"> | string
    iataCode?: StringWithAggregatesFilter<"Flight"> | string
    icaoCode?: StringWithAggregatesFilter<"Flight"> | string
    status?: StringWithAggregatesFilter<"Flight"> | string
    date?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    airlineId?: StringWithAggregatesFilter<"Flight"> | string
    departureId?: StringWithAggregatesFilter<"Flight"> | string
    arrivalId?: StringWithAggregatesFilter<"Flight"> | string
    aircraftId?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    departureTime?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    arrivalTime?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    departureDelay?: IntWithAggregatesFilter<"Flight"> | number
    arrivalDelay?: IntWithAggregatesFilter<"Flight"> | number
    departureTerminal?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    arrivalTerminal?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    departureGate?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    arrivalGate?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    departureRunway?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    arrivalRunway?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    baggageClaim?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Flight"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Flight"> | number | null
    altitude?: FloatNullableWithAggregatesFilter<"Flight"> | number | null
    speed?: FloatNullableWithAggregatesFilter<"Flight"> | number | null
    heading?: FloatNullableWithAggregatesFilter<"Flight"> | number | null
    verticalRate?: FloatNullableWithAggregatesFilter<"Flight"> | number | null
    onGround?: BoolWithAggregatesFilter<"Flight"> | boolean
    lastUpdate?: DateTimeNullableWithAggregatesFilter<"Flight"> | Date | string | null
    riskScore?: IntWithAggregatesFilter<"Flight"> | number
    weather?: StringWithAggregatesFilter<"Flight"> | string
    atcLoad?: StringWithAggregatesFilter<"Flight"> | string
  }

  export type AirlineWhereInput = {
    AND?: AirlineWhereInput | AirlineWhereInput[]
    OR?: AirlineWhereInput[]
    NOT?: AirlineWhereInput | AirlineWhereInput[]
    id?: StringFilter<"Airline"> | string
    name?: StringFilter<"Airline"> | string
    iataCode?: StringFilter<"Airline"> | string
    icaoCode?: StringFilter<"Airline"> | string
    country?: StringFilter<"Airline"> | string
    createdAt?: DateTimeFilter<"Airline"> | Date | string
    updatedAt?: DateTimeFilter<"Airline"> | Date | string
    flights?: FlightListRelationFilter
    hubs?: AirlineHubListRelationFilter
    routes?: FlightRouteListRelationFilter
  }

  export type AirlineOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flights?: FlightOrderByRelationAggregateInput
    hubs?: AirlineHubOrderByRelationAggregateInput
    routes?: FlightRouteOrderByRelationAggregateInput
  }

  export type AirlineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    iataCode?: string
    icaoCode?: string
    AND?: AirlineWhereInput | AirlineWhereInput[]
    OR?: AirlineWhereInput[]
    NOT?: AirlineWhereInput | AirlineWhereInput[]
    name?: StringFilter<"Airline"> | string
    country?: StringFilter<"Airline"> | string
    createdAt?: DateTimeFilter<"Airline"> | Date | string
    updatedAt?: DateTimeFilter<"Airline"> | Date | string
    flights?: FlightListRelationFilter
    hubs?: AirlineHubListRelationFilter
    routes?: FlightRouteListRelationFilter
  }, "id" | "iataCode" | "icaoCode">

  export type AirlineOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AirlineCountOrderByAggregateInput
    _max?: AirlineMaxOrderByAggregateInput
    _min?: AirlineMinOrderByAggregateInput
  }

  export type AirlineScalarWhereWithAggregatesInput = {
    AND?: AirlineScalarWhereWithAggregatesInput | AirlineScalarWhereWithAggregatesInput[]
    OR?: AirlineScalarWhereWithAggregatesInput[]
    NOT?: AirlineScalarWhereWithAggregatesInput | AirlineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Airline"> | string
    name?: StringWithAggregatesFilter<"Airline"> | string
    iataCode?: StringWithAggregatesFilter<"Airline"> | string
    icaoCode?: StringWithAggregatesFilter<"Airline"> | string
    country?: StringWithAggregatesFilter<"Airline"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Airline"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Airline"> | Date | string
  }

  export type AirlineHubWhereInput = {
    AND?: AirlineHubWhereInput | AirlineHubWhereInput[]
    OR?: AirlineHubWhereInput[]
    NOT?: AirlineHubWhereInput | AirlineHubWhereInput[]
    id?: StringFilter<"AirlineHub"> | string
    airlineId?: StringFilter<"AirlineHub"> | string
    airportId?: StringFilter<"AirlineHub"> | string
    createdAt?: DateTimeFilter<"AirlineHub"> | Date | string
    airline?: XOR<AirlineScalarRelationFilter, AirlineWhereInput>
    airport?: XOR<AirportScalarRelationFilter, AirportWhereInput>
  }

  export type AirlineHubOrderByWithRelationInput = {
    id?: SortOrder
    airlineId?: SortOrder
    airportId?: SortOrder
    createdAt?: SortOrder
    airline?: AirlineOrderByWithRelationInput
    airport?: AirportOrderByWithRelationInput
  }

  export type AirlineHubWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    airlineId_airportId?: AirlineHubAirlineIdAirportIdCompoundUniqueInput
    AND?: AirlineHubWhereInput | AirlineHubWhereInput[]
    OR?: AirlineHubWhereInput[]
    NOT?: AirlineHubWhereInput | AirlineHubWhereInput[]
    airlineId?: StringFilter<"AirlineHub"> | string
    airportId?: StringFilter<"AirlineHub"> | string
    createdAt?: DateTimeFilter<"AirlineHub"> | Date | string
    airline?: XOR<AirlineScalarRelationFilter, AirlineWhereInput>
    airport?: XOR<AirportScalarRelationFilter, AirportWhereInput>
  }, "id" | "airlineId_airportId">

  export type AirlineHubOrderByWithAggregationInput = {
    id?: SortOrder
    airlineId?: SortOrder
    airportId?: SortOrder
    createdAt?: SortOrder
    _count?: AirlineHubCountOrderByAggregateInput
    _max?: AirlineHubMaxOrderByAggregateInput
    _min?: AirlineHubMinOrderByAggregateInput
  }

  export type AirlineHubScalarWhereWithAggregatesInput = {
    AND?: AirlineHubScalarWhereWithAggregatesInput | AirlineHubScalarWhereWithAggregatesInput[]
    OR?: AirlineHubScalarWhereWithAggregatesInput[]
    NOT?: AirlineHubScalarWhereWithAggregatesInput | AirlineHubScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AirlineHub"> | string
    airlineId?: StringWithAggregatesFilter<"AirlineHub"> | string
    airportId?: StringWithAggregatesFilter<"AirlineHub"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AirlineHub"> | Date | string
  }

  export type AirportWhereInput = {
    AND?: AirportWhereInput | AirportWhereInput[]
    OR?: AirportWhereInput[]
    NOT?: AirportWhereInput | AirportWhereInput[]
    id?: StringFilter<"Airport"> | string
    name?: StringFilter<"Airport"> | string
    iataCode?: StringFilter<"Airport"> | string
    icaoCode?: StringFilter<"Airport"> | string
    city?: StringFilter<"Airport"> | string
    country?: StringFilter<"Airport"> | string
    timezone?: StringFilter<"Airport"> | string
    latitude?: FloatFilter<"Airport"> | number
    longitude?: FloatFilter<"Airport"> | number
    altitude?: FloatNullableFilter<"Airport"> | number | null
    createdAt?: DateTimeFilter<"Airport"> | Date | string
    updatedAt?: DateTimeFilter<"Airport"> | Date | string
    departureFlights?: FlightListRelationFilter
    arrivalFlights?: FlightListRelationFilter
    hubs?: AirlineHubListRelationFilter
    routeOrigins?: FlightRouteListRelationFilter
    routeDestinations?: FlightRouteListRelationFilter
  }

  export type AirportOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    city?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    departureFlights?: FlightOrderByRelationAggregateInput
    arrivalFlights?: FlightOrderByRelationAggregateInput
    hubs?: AirlineHubOrderByRelationAggregateInput
    routeOrigins?: FlightRouteOrderByRelationAggregateInput
    routeDestinations?: FlightRouteOrderByRelationAggregateInput
  }

  export type AirportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    iataCode?: string
    icaoCode?: string
    AND?: AirportWhereInput | AirportWhereInput[]
    OR?: AirportWhereInput[]
    NOT?: AirportWhereInput | AirportWhereInput[]
    name?: StringFilter<"Airport"> | string
    city?: StringFilter<"Airport"> | string
    country?: StringFilter<"Airport"> | string
    timezone?: StringFilter<"Airport"> | string
    latitude?: FloatFilter<"Airport"> | number
    longitude?: FloatFilter<"Airport"> | number
    altitude?: FloatNullableFilter<"Airport"> | number | null
    createdAt?: DateTimeFilter<"Airport"> | Date | string
    updatedAt?: DateTimeFilter<"Airport"> | Date | string
    departureFlights?: FlightListRelationFilter
    arrivalFlights?: FlightListRelationFilter
    hubs?: AirlineHubListRelationFilter
    routeOrigins?: FlightRouteListRelationFilter
    routeDestinations?: FlightRouteListRelationFilter
  }, "id" | "iataCode" | "icaoCode">

  export type AirportOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    city?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AirportCountOrderByAggregateInput
    _avg?: AirportAvgOrderByAggregateInput
    _max?: AirportMaxOrderByAggregateInput
    _min?: AirportMinOrderByAggregateInput
    _sum?: AirportSumOrderByAggregateInput
  }

  export type AirportScalarWhereWithAggregatesInput = {
    AND?: AirportScalarWhereWithAggregatesInput | AirportScalarWhereWithAggregatesInput[]
    OR?: AirportScalarWhereWithAggregatesInput[]
    NOT?: AirportScalarWhereWithAggregatesInput | AirportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Airport"> | string
    name?: StringWithAggregatesFilter<"Airport"> | string
    iataCode?: StringWithAggregatesFilter<"Airport"> | string
    icaoCode?: StringWithAggregatesFilter<"Airport"> | string
    city?: StringWithAggregatesFilter<"Airport"> | string
    country?: StringWithAggregatesFilter<"Airport"> | string
    timezone?: StringWithAggregatesFilter<"Airport"> | string
    latitude?: FloatWithAggregatesFilter<"Airport"> | number
    longitude?: FloatWithAggregatesFilter<"Airport"> | number
    altitude?: FloatNullableWithAggregatesFilter<"Airport"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Airport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Airport"> | Date | string
  }

  export type AircraftWhereInput = {
    AND?: AircraftWhereInput | AircraftWhereInput[]
    OR?: AircraftWhereInput[]
    NOT?: AircraftWhereInput | AircraftWhereInput[]
    id?: StringFilter<"Aircraft"> | string
    registration?: StringFilter<"Aircraft"> | string
    iataCode?: StringFilter<"Aircraft"> | string
    icaoCode?: StringFilter<"Aircraft"> | string
    model?: StringFilter<"Aircraft"> | string
    manufacturer?: StringFilter<"Aircraft"> | string
    type?: StringFilter<"Aircraft"> | string
    maxPassengers?: IntFilter<"Aircraft"> | number
    maxRange?: IntNullableFilter<"Aircraft"> | number | null
    createdAt?: DateTimeFilter<"Aircraft"> | Date | string
    updatedAt?: DateTimeFilter<"Aircraft"> | Date | string
    flights?: FlightListRelationFilter
  }

  export type AircraftOrderByWithRelationInput = {
    id?: SortOrder
    registration?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    model?: SortOrder
    manufacturer?: SortOrder
    type?: SortOrder
    maxPassengers?: SortOrder
    maxRange?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flights?: FlightOrderByRelationAggregateInput
  }

  export type AircraftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    registration?: string
    AND?: AircraftWhereInput | AircraftWhereInput[]
    OR?: AircraftWhereInput[]
    NOT?: AircraftWhereInput | AircraftWhereInput[]
    iataCode?: StringFilter<"Aircraft"> | string
    icaoCode?: StringFilter<"Aircraft"> | string
    model?: StringFilter<"Aircraft"> | string
    manufacturer?: StringFilter<"Aircraft"> | string
    type?: StringFilter<"Aircraft"> | string
    maxPassengers?: IntFilter<"Aircraft"> | number
    maxRange?: IntNullableFilter<"Aircraft"> | number | null
    createdAt?: DateTimeFilter<"Aircraft"> | Date | string
    updatedAt?: DateTimeFilter<"Aircraft"> | Date | string
    flights?: FlightListRelationFilter
  }, "id" | "registration">

  export type AircraftOrderByWithAggregationInput = {
    id?: SortOrder
    registration?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    model?: SortOrder
    manufacturer?: SortOrder
    type?: SortOrder
    maxPassengers?: SortOrder
    maxRange?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AircraftCountOrderByAggregateInput
    _avg?: AircraftAvgOrderByAggregateInput
    _max?: AircraftMaxOrderByAggregateInput
    _min?: AircraftMinOrderByAggregateInput
    _sum?: AircraftSumOrderByAggregateInput
  }

  export type AircraftScalarWhereWithAggregatesInput = {
    AND?: AircraftScalarWhereWithAggregatesInput | AircraftScalarWhereWithAggregatesInput[]
    OR?: AircraftScalarWhereWithAggregatesInput[]
    NOT?: AircraftScalarWhereWithAggregatesInput | AircraftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Aircraft"> | string
    registration?: StringWithAggregatesFilter<"Aircraft"> | string
    iataCode?: StringWithAggregatesFilter<"Aircraft"> | string
    icaoCode?: StringWithAggregatesFilter<"Aircraft"> | string
    model?: StringWithAggregatesFilter<"Aircraft"> | string
    manufacturer?: StringWithAggregatesFilter<"Aircraft"> | string
    type?: StringWithAggregatesFilter<"Aircraft"> | string
    maxPassengers?: IntWithAggregatesFilter<"Aircraft"> | number
    maxRange?: IntNullableWithAggregatesFilter<"Aircraft"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Aircraft"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Aircraft"> | Date | string
  }

  export type FlightRouteWhereInput = {
    AND?: FlightRouteWhereInput | FlightRouteWhereInput[]
    OR?: FlightRouteWhereInput[]
    NOT?: FlightRouteWhereInput | FlightRouteWhereInput[]
    id?: StringFilter<"FlightRoute"> | string
    airlineId?: StringFilter<"FlightRoute"> | string
    originId?: StringFilter<"FlightRoute"> | string
    destinationId?: StringFilter<"FlightRoute"> | string
    distance?: IntFilter<"FlightRoute"> | number
    duration?: FloatFilter<"FlightRoute"> | number
    frequency?: StringFilter<"FlightRoute"> | string
    createdAt?: DateTimeFilter<"FlightRoute"> | Date | string
    updatedAt?: DateTimeFilter<"FlightRoute"> | Date | string
    airline?: XOR<AirlineScalarRelationFilter, AirlineWhereInput>
    origin?: XOR<AirportScalarRelationFilter, AirportWhereInput>
    destination?: XOR<AirportScalarRelationFilter, AirportWhereInput>
  }

  export type FlightRouteOrderByWithRelationInput = {
    id?: SortOrder
    airlineId?: SortOrder
    originId?: SortOrder
    destinationId?: SortOrder
    distance?: SortOrder
    duration?: SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    airline?: AirlineOrderByWithRelationInput
    origin?: AirportOrderByWithRelationInput
    destination?: AirportOrderByWithRelationInput
  }

  export type FlightRouteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    airlineId_originId_destinationId?: FlightRouteAirlineIdOriginIdDestinationIdCompoundUniqueInput
    AND?: FlightRouteWhereInput | FlightRouteWhereInput[]
    OR?: FlightRouteWhereInput[]
    NOT?: FlightRouteWhereInput | FlightRouteWhereInput[]
    airlineId?: StringFilter<"FlightRoute"> | string
    originId?: StringFilter<"FlightRoute"> | string
    destinationId?: StringFilter<"FlightRoute"> | string
    distance?: IntFilter<"FlightRoute"> | number
    duration?: FloatFilter<"FlightRoute"> | number
    frequency?: StringFilter<"FlightRoute"> | string
    createdAt?: DateTimeFilter<"FlightRoute"> | Date | string
    updatedAt?: DateTimeFilter<"FlightRoute"> | Date | string
    airline?: XOR<AirlineScalarRelationFilter, AirlineWhereInput>
    origin?: XOR<AirportScalarRelationFilter, AirportWhereInput>
    destination?: XOR<AirportScalarRelationFilter, AirportWhereInput>
  }, "id" | "airlineId_originId_destinationId">

  export type FlightRouteOrderByWithAggregationInput = {
    id?: SortOrder
    airlineId?: SortOrder
    originId?: SortOrder
    destinationId?: SortOrder
    distance?: SortOrder
    duration?: SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FlightRouteCountOrderByAggregateInput
    _avg?: FlightRouteAvgOrderByAggregateInput
    _max?: FlightRouteMaxOrderByAggregateInput
    _min?: FlightRouteMinOrderByAggregateInput
    _sum?: FlightRouteSumOrderByAggregateInput
  }

  export type FlightRouteScalarWhereWithAggregatesInput = {
    AND?: FlightRouteScalarWhereWithAggregatesInput | FlightRouteScalarWhereWithAggregatesInput[]
    OR?: FlightRouteScalarWhereWithAggregatesInput[]
    NOT?: FlightRouteScalarWhereWithAggregatesInput | FlightRouteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FlightRoute"> | string
    airlineId?: StringWithAggregatesFilter<"FlightRoute"> | string
    originId?: StringWithAggregatesFilter<"FlightRoute"> | string
    destinationId?: StringWithAggregatesFilter<"FlightRoute"> | string
    distance?: IntWithAggregatesFilter<"FlightRoute"> | number
    duration?: FloatWithAggregatesFilter<"FlightRoute"> | number
    frequency?: StringWithAggregatesFilter<"FlightRoute"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FlightRoute"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FlightRoute"> | Date | string
  }

  export type WeatherAlertWhereInput = {
    AND?: WeatherAlertWhereInput | WeatherAlertWhereInput[]
    OR?: WeatherAlertWhereInput[]
    NOT?: WeatherAlertWhereInput | WeatherAlertWhereInput[]
    id?: StringFilter<"WeatherAlert"> | string
    type?: StringFilter<"WeatherAlert"> | string
    severity?: StringFilter<"WeatherAlert"> | string
    description?: StringFilter<"WeatherAlert"> | string
    latitude?: FloatFilter<"WeatherAlert"> | number
    longitude?: FloatFilter<"WeatherAlert"> | number
    altitude?: IntFilter<"WeatherAlert"> | number
    radius?: IntFilter<"WeatherAlert"> | number
    startTime?: DateTimeFilter<"WeatherAlert"> | Date | string
    endTime?: DateTimeFilter<"WeatherAlert"> | Date | string
    createdAt?: DateTimeFilter<"WeatherAlert"> | Date | string
    updatedAt?: DateTimeFilter<"WeatherAlert"> | Date | string
  }

  export type WeatherAlertOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    radius?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeatherAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeatherAlertWhereInput | WeatherAlertWhereInput[]
    OR?: WeatherAlertWhereInput[]
    NOT?: WeatherAlertWhereInput | WeatherAlertWhereInput[]
    type?: StringFilter<"WeatherAlert"> | string
    severity?: StringFilter<"WeatherAlert"> | string
    description?: StringFilter<"WeatherAlert"> | string
    latitude?: FloatFilter<"WeatherAlert"> | number
    longitude?: FloatFilter<"WeatherAlert"> | number
    altitude?: IntFilter<"WeatherAlert"> | number
    radius?: IntFilter<"WeatherAlert"> | number
    startTime?: DateTimeFilter<"WeatherAlert"> | Date | string
    endTime?: DateTimeFilter<"WeatherAlert"> | Date | string
    createdAt?: DateTimeFilter<"WeatherAlert"> | Date | string
    updatedAt?: DateTimeFilter<"WeatherAlert"> | Date | string
  }, "id">

  export type WeatherAlertOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    radius?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WeatherAlertCountOrderByAggregateInput
    _avg?: WeatherAlertAvgOrderByAggregateInput
    _max?: WeatherAlertMaxOrderByAggregateInput
    _min?: WeatherAlertMinOrderByAggregateInput
    _sum?: WeatherAlertSumOrderByAggregateInput
  }

  export type WeatherAlertScalarWhereWithAggregatesInput = {
    AND?: WeatherAlertScalarWhereWithAggregatesInput | WeatherAlertScalarWhereWithAggregatesInput[]
    OR?: WeatherAlertScalarWhereWithAggregatesInput[]
    NOT?: WeatherAlertScalarWhereWithAggregatesInput | WeatherAlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeatherAlert"> | string
    type?: StringWithAggregatesFilter<"WeatherAlert"> | string
    severity?: StringWithAggregatesFilter<"WeatherAlert"> | string
    description?: StringWithAggregatesFilter<"WeatherAlert"> | string
    latitude?: FloatWithAggregatesFilter<"WeatherAlert"> | number
    longitude?: FloatWithAggregatesFilter<"WeatherAlert"> | number
    altitude?: IntWithAggregatesFilter<"WeatherAlert"> | number
    radius?: IntWithAggregatesFilter<"WeatherAlert"> | number
    startTime?: DateTimeWithAggregatesFilter<"WeatherAlert"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"WeatherAlert"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"WeatherAlert"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeatherAlert"> | Date | string
  }

  export type RiskAssessmentWhereInput = {
    AND?: RiskAssessmentWhereInput | RiskAssessmentWhereInput[]
    OR?: RiskAssessmentWhereInput[]
    NOT?: RiskAssessmentWhereInput | RiskAssessmentWhereInput[]
    id?: StringFilter<"RiskAssessment"> | string
    flightId?: StringFilter<"RiskAssessment"> | string
    overallRisk?: IntFilter<"RiskAssessment"> | number
    weatherRisk?: IntFilter<"RiskAssessment"> | number
    aircraftRisk?: IntFilter<"RiskAssessment"> | number
    routeRisk?: IntFilter<"RiskAssessment"> | number
    crewRisk?: IntFilter<"RiskAssessment"> | number
    factors?: StringFilter<"RiskAssessment"> | string
    recommendations?: StringNullableFilter<"RiskAssessment"> | string | null
    createdAt?: DateTimeFilter<"RiskAssessment"> | Date | string
    updatedAt?: DateTimeFilter<"RiskAssessment"> | Date | string
    flight?: XOR<FlightScalarRelationFilter, FlightWhereInput>
  }

  export type RiskAssessmentOrderByWithRelationInput = {
    id?: SortOrder
    flightId?: SortOrder
    overallRisk?: SortOrder
    weatherRisk?: SortOrder
    aircraftRisk?: SortOrder
    routeRisk?: SortOrder
    crewRisk?: SortOrder
    factors?: SortOrder
    recommendations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flight?: FlightOrderByWithRelationInput
  }

  export type RiskAssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    flightId?: string
    AND?: RiskAssessmentWhereInput | RiskAssessmentWhereInput[]
    OR?: RiskAssessmentWhereInput[]
    NOT?: RiskAssessmentWhereInput | RiskAssessmentWhereInput[]
    overallRisk?: IntFilter<"RiskAssessment"> | number
    weatherRisk?: IntFilter<"RiskAssessment"> | number
    aircraftRisk?: IntFilter<"RiskAssessment"> | number
    routeRisk?: IntFilter<"RiskAssessment"> | number
    crewRisk?: IntFilter<"RiskAssessment"> | number
    factors?: StringFilter<"RiskAssessment"> | string
    recommendations?: StringNullableFilter<"RiskAssessment"> | string | null
    createdAt?: DateTimeFilter<"RiskAssessment"> | Date | string
    updatedAt?: DateTimeFilter<"RiskAssessment"> | Date | string
    flight?: XOR<FlightScalarRelationFilter, FlightWhereInput>
  }, "id" | "flightId">

  export type RiskAssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    flightId?: SortOrder
    overallRisk?: SortOrder
    weatherRisk?: SortOrder
    aircraftRisk?: SortOrder
    routeRisk?: SortOrder
    crewRisk?: SortOrder
    factors?: SortOrder
    recommendations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RiskAssessmentCountOrderByAggregateInput
    _avg?: RiskAssessmentAvgOrderByAggregateInput
    _max?: RiskAssessmentMaxOrderByAggregateInput
    _min?: RiskAssessmentMinOrderByAggregateInput
    _sum?: RiskAssessmentSumOrderByAggregateInput
  }

  export type RiskAssessmentScalarWhereWithAggregatesInput = {
    AND?: RiskAssessmentScalarWhereWithAggregatesInput | RiskAssessmentScalarWhereWithAggregatesInput[]
    OR?: RiskAssessmentScalarWhereWithAggregatesInput[]
    NOT?: RiskAssessmentScalarWhereWithAggregatesInput | RiskAssessmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiskAssessment"> | string
    flightId?: StringWithAggregatesFilter<"RiskAssessment"> | string
    overallRisk?: IntWithAggregatesFilter<"RiskAssessment"> | number
    weatherRisk?: IntWithAggregatesFilter<"RiskAssessment"> | number
    aircraftRisk?: IntWithAggregatesFilter<"RiskAssessment"> | number
    routeRisk?: IntWithAggregatesFilter<"RiskAssessment"> | number
    crewRisk?: IntWithAggregatesFilter<"RiskAssessment"> | number
    factors?: StringWithAggregatesFilter<"RiskAssessment"> | string
    recommendations?: StringNullableWithAggregatesFilter<"RiskAssessment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RiskAssessment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RiskAssessment"> | Date | string
  }

  export type FlightCreateInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    airline: AirlineCreateNestedOneWithoutFlightsInput
    departure: AirportCreateNestedOneWithoutDepartureFlightsInput
    arrival: AirportCreateNestedOneWithoutArrivalFlightsInput
    aircraft?: AircraftCreateNestedOneWithoutFlightsInput
    riskAssessment?: RiskAssessmentCreateNestedOneWithoutFlightInput
  }

  export type FlightUncheckedCreateInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    airlineId: string
    departureId: string
    arrivalId: string
    aircraftId?: string | null
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    riskAssessment?: RiskAssessmentUncheckedCreateNestedOneWithoutFlightInput
  }

  export type FlightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    airline?: AirlineUpdateOneRequiredWithoutFlightsNestedInput
    departure?: AirportUpdateOneRequiredWithoutDepartureFlightsNestedInput
    arrival?: AirportUpdateOneRequiredWithoutArrivalFlightsNestedInput
    aircraft?: AircraftUpdateOneWithoutFlightsNestedInput
    riskAssessment?: RiskAssessmentUpdateOneWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airlineId?: StringFieldUpdateOperationsInput | string
    departureId?: StringFieldUpdateOperationsInput | string
    arrivalId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    riskAssessment?: RiskAssessmentUncheckedUpdateOneWithoutFlightNestedInput
  }

  export type FlightCreateManyInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    airlineId: string
    departureId: string
    arrivalId: string
    aircraftId?: string | null
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
  }

  export type FlightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
  }

  export type FlightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airlineId?: StringFieldUpdateOperationsInput | string
    departureId?: StringFieldUpdateOperationsInput | string
    arrivalId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
  }

  export type AirlineCreateInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightCreateNestedManyWithoutAirlineInput
    hubs?: AirlineHubCreateNestedManyWithoutAirlineInput
    routes?: FlightRouteCreateNestedManyWithoutAirlineInput
  }

  export type AirlineUncheckedCreateInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightUncheckedCreateNestedManyWithoutAirlineInput
    hubs?: AirlineHubUncheckedCreateNestedManyWithoutAirlineInput
    routes?: FlightRouteUncheckedCreateNestedManyWithoutAirlineInput
  }

  export type AirlineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUpdateManyWithoutAirlineNestedInput
    hubs?: AirlineHubUpdateManyWithoutAirlineNestedInput
    routes?: FlightRouteUpdateManyWithoutAirlineNestedInput
  }

  export type AirlineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUncheckedUpdateManyWithoutAirlineNestedInput
    hubs?: AirlineHubUncheckedUpdateManyWithoutAirlineNestedInput
    routes?: FlightRouteUncheckedUpdateManyWithoutAirlineNestedInput
  }

  export type AirlineCreateManyInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AirlineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirlineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirlineHubCreateInput = {
    id?: string
    createdAt?: Date | string
    airline: AirlineCreateNestedOneWithoutHubsInput
    airport: AirportCreateNestedOneWithoutHubsInput
  }

  export type AirlineHubUncheckedCreateInput = {
    id?: string
    airlineId: string
    airportId: string
    createdAt?: Date | string
  }

  export type AirlineHubUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airline?: AirlineUpdateOneRequiredWithoutHubsNestedInput
    airport?: AirportUpdateOneRequiredWithoutHubsNestedInput
  }

  export type AirlineHubUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    airportId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirlineHubCreateManyInput = {
    id?: string
    airlineId: string
    airportId: string
    createdAt?: Date | string
  }

  export type AirlineHubUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirlineHubUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    airportId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirportCreateInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightCreateNestedManyWithoutDepartureInput
    arrivalFlights?: FlightCreateNestedManyWithoutArrivalInput
    hubs?: AirlineHubCreateNestedManyWithoutAirportInput
    routeOrigins?: FlightRouteCreateNestedManyWithoutOriginInput
    routeDestinations?: FlightRouteCreateNestedManyWithoutDestinationInput
  }

  export type AirportUncheckedCreateInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightUncheckedCreateNestedManyWithoutDepartureInput
    arrivalFlights?: FlightUncheckedCreateNestedManyWithoutArrivalInput
    hubs?: AirlineHubUncheckedCreateNestedManyWithoutAirportInput
    routeOrigins?: FlightRouteUncheckedCreateNestedManyWithoutOriginInput
    routeDestinations?: FlightRouteUncheckedCreateNestedManyWithoutDestinationInput
  }

  export type AirportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUpdateManyWithoutDepartureNestedInput
    arrivalFlights?: FlightUpdateManyWithoutArrivalNestedInput
    hubs?: AirlineHubUpdateManyWithoutAirportNestedInput
    routeOrigins?: FlightRouteUpdateManyWithoutOriginNestedInput
    routeDestinations?: FlightRouteUpdateManyWithoutDestinationNestedInput
  }

  export type AirportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUncheckedUpdateManyWithoutDepartureNestedInput
    arrivalFlights?: FlightUncheckedUpdateManyWithoutArrivalNestedInput
    hubs?: AirlineHubUncheckedUpdateManyWithoutAirportNestedInput
    routeOrigins?: FlightRouteUncheckedUpdateManyWithoutOriginNestedInput
    routeDestinations?: FlightRouteUncheckedUpdateManyWithoutDestinationNestedInput
  }

  export type AirportCreateManyInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AirportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AircraftCreateInput = {
    id?: string
    registration: string
    iataCode: string
    icaoCode: string
    model: string
    manufacturer: string
    type: string
    maxPassengers: number
    maxRange?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightCreateNestedManyWithoutAircraftInput
  }

  export type AircraftUncheckedCreateInput = {
    id?: string
    registration: string
    iataCode: string
    icaoCode: string
    model: string
    manufacturer: string
    type: string
    maxPassengers: number
    maxRange?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightUncheckedCreateNestedManyWithoutAircraftInput
  }

  export type AircraftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    registration?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    maxPassengers?: IntFieldUpdateOperationsInput | number
    maxRange?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUpdateManyWithoutAircraftNestedInput
  }

  export type AircraftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    registration?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    maxPassengers?: IntFieldUpdateOperationsInput | number
    maxRange?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUncheckedUpdateManyWithoutAircraftNestedInput
  }

  export type AircraftCreateManyInput = {
    id?: string
    registration: string
    iataCode: string
    icaoCode: string
    model: string
    manufacturer: string
    type: string
    maxPassengers: number
    maxRange?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AircraftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    registration?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    maxPassengers?: IntFieldUpdateOperationsInput | number
    maxRange?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AircraftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    registration?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    maxPassengers?: IntFieldUpdateOperationsInput | number
    maxRange?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightRouteCreateInput = {
    id?: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    airline: AirlineCreateNestedOneWithoutRoutesInput
    origin: AirportCreateNestedOneWithoutRouteOriginsInput
    destination: AirportCreateNestedOneWithoutRouteDestinationsInput
  }

  export type FlightRouteUncheckedCreateInput = {
    id?: string
    airlineId: string
    originId: string
    destinationId: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightRouteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airline?: AirlineUpdateOneRequiredWithoutRoutesNestedInput
    origin?: AirportUpdateOneRequiredWithoutRouteOriginsNestedInput
    destination?: AirportUpdateOneRequiredWithoutRouteDestinationsNestedInput
  }

  export type FlightRouteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightRouteCreateManyInput = {
    id?: string
    airlineId: string
    originId: string
    destinationId: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightRouteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightRouteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeatherAlertCreateInput = {
    id?: string
    type: string
    severity: string
    description: string
    latitude: number
    longitude: number
    altitude: number
    radius: number
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeatherAlertUncheckedCreateInput = {
    id?: string
    type: string
    severity: string
    description: string
    latitude: number
    longitude: number
    altitude: number
    radius: number
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeatherAlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: IntFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeatherAlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: IntFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeatherAlertCreateManyInput = {
    id?: string
    type: string
    severity: string
    description: string
    latitude: number
    longitude: number
    altitude: number
    radius: number
    startTime: Date | string
    endTime: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeatherAlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: IntFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeatherAlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: IntFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskAssessmentCreateInput = {
    id?: string
    overallRisk: number
    weatherRisk: number
    aircraftRisk: number
    routeRisk: number
    crewRisk: number
    factors: string
    recommendations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flight: FlightCreateNestedOneWithoutRiskAssessmentInput
  }

  export type RiskAssessmentUncheckedCreateInput = {
    id?: string
    flightId: string
    overallRisk: number
    weatherRisk: number
    aircraftRisk: number
    routeRisk: number
    crewRisk: number
    factors: string
    recommendations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RiskAssessmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallRisk?: IntFieldUpdateOperationsInput | number
    weatherRisk?: IntFieldUpdateOperationsInput | number
    aircraftRisk?: IntFieldUpdateOperationsInput | number
    routeRisk?: IntFieldUpdateOperationsInput | number
    crewRisk?: IntFieldUpdateOperationsInput | number
    factors?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flight?: FlightUpdateOneRequiredWithoutRiskAssessmentNestedInput
  }

  export type RiskAssessmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightId?: StringFieldUpdateOperationsInput | string
    overallRisk?: IntFieldUpdateOperationsInput | number
    weatherRisk?: IntFieldUpdateOperationsInput | number
    aircraftRisk?: IntFieldUpdateOperationsInput | number
    routeRisk?: IntFieldUpdateOperationsInput | number
    crewRisk?: IntFieldUpdateOperationsInput | number
    factors?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskAssessmentCreateManyInput = {
    id?: string
    flightId: string
    overallRisk: number
    weatherRisk: number
    aircraftRisk: number
    routeRisk: number
    crewRisk: number
    factors: string
    recommendations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RiskAssessmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallRisk?: IntFieldUpdateOperationsInput | number
    weatherRisk?: IntFieldUpdateOperationsInput | number
    aircraftRisk?: IntFieldUpdateOperationsInput | number
    routeRisk?: IntFieldUpdateOperationsInput | number
    crewRisk?: IntFieldUpdateOperationsInput | number
    factors?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskAssessmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightId?: StringFieldUpdateOperationsInput | string
    overallRisk?: IntFieldUpdateOperationsInput | number
    weatherRisk?: IntFieldUpdateOperationsInput | number
    aircraftRisk?: IntFieldUpdateOperationsInput | number
    routeRisk?: IntFieldUpdateOperationsInput | number
    crewRisk?: IntFieldUpdateOperationsInput | number
    factors?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AirlineScalarRelationFilter = {
    is?: AirlineWhereInput
    isNot?: AirlineWhereInput
  }

  export type AirportScalarRelationFilter = {
    is?: AirportWhereInput
    isNot?: AirportWhereInput
  }

  export type AircraftNullableScalarRelationFilter = {
    is?: AircraftWhereInput | null
    isNot?: AircraftWhereInput | null
  }

  export type RiskAssessmentNullableScalarRelationFilter = {
    is?: RiskAssessmentWhereInput | null
    isNot?: RiskAssessmentWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FlightCountOrderByAggregateInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    airlineId?: SortOrder
    departureId?: SortOrder
    arrivalId?: SortOrder
    aircraftId?: SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    departureDelay?: SortOrder
    arrivalDelay?: SortOrder
    departureTerminal?: SortOrder
    arrivalTerminal?: SortOrder
    departureGate?: SortOrder
    arrivalGate?: SortOrder
    departureRunway?: SortOrder
    arrivalRunway?: SortOrder
    baggageClaim?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    verticalRate?: SortOrder
    onGround?: SortOrder
    lastUpdate?: SortOrder
    riskScore?: SortOrder
    weather?: SortOrder
    atcLoad?: SortOrder
  }

  export type FlightAvgOrderByAggregateInput = {
    departureDelay?: SortOrder
    arrivalDelay?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    verticalRate?: SortOrder
    riskScore?: SortOrder
  }

  export type FlightMaxOrderByAggregateInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    airlineId?: SortOrder
    departureId?: SortOrder
    arrivalId?: SortOrder
    aircraftId?: SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    departureDelay?: SortOrder
    arrivalDelay?: SortOrder
    departureTerminal?: SortOrder
    arrivalTerminal?: SortOrder
    departureGate?: SortOrder
    arrivalGate?: SortOrder
    departureRunway?: SortOrder
    arrivalRunway?: SortOrder
    baggageClaim?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    verticalRate?: SortOrder
    onGround?: SortOrder
    lastUpdate?: SortOrder
    riskScore?: SortOrder
    weather?: SortOrder
    atcLoad?: SortOrder
  }

  export type FlightMinOrderByAggregateInput = {
    id?: SortOrder
    flightNumber?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    airlineId?: SortOrder
    departureId?: SortOrder
    arrivalId?: SortOrder
    aircraftId?: SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    departureDelay?: SortOrder
    arrivalDelay?: SortOrder
    departureTerminal?: SortOrder
    arrivalTerminal?: SortOrder
    departureGate?: SortOrder
    arrivalGate?: SortOrder
    departureRunway?: SortOrder
    arrivalRunway?: SortOrder
    baggageClaim?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    verticalRate?: SortOrder
    onGround?: SortOrder
    lastUpdate?: SortOrder
    riskScore?: SortOrder
    weather?: SortOrder
    atcLoad?: SortOrder
  }

  export type FlightSumOrderByAggregateInput = {
    departureDelay?: SortOrder
    arrivalDelay?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    verticalRate?: SortOrder
    riskScore?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FlightListRelationFilter = {
    every?: FlightWhereInput
    some?: FlightWhereInput
    none?: FlightWhereInput
  }

  export type AirlineHubListRelationFilter = {
    every?: AirlineHubWhereInput
    some?: AirlineHubWhereInput
    none?: AirlineHubWhereInput
  }

  export type FlightRouteListRelationFilter = {
    every?: FlightRouteWhereInput
    some?: FlightRouteWhereInput
    none?: FlightRouteWhereInput
  }

  export type FlightOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AirlineHubOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FlightRouteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AirlineCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AirlineMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AirlineMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AirlineHubAirlineIdAirportIdCompoundUniqueInput = {
    airlineId: string
    airportId: string
  }

  export type AirlineHubCountOrderByAggregateInput = {
    id?: SortOrder
    airlineId?: SortOrder
    airportId?: SortOrder
    createdAt?: SortOrder
  }

  export type AirlineHubMaxOrderByAggregateInput = {
    id?: SortOrder
    airlineId?: SortOrder
    airportId?: SortOrder
    createdAt?: SortOrder
  }

  export type AirlineHubMinOrderByAggregateInput = {
    id?: SortOrder
    airlineId?: SortOrder
    airportId?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AirportCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    city?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AirportAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
  }

  export type AirportMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    city?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AirportMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    city?: SortOrder
    country?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AirportSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AircraftCountOrderByAggregateInput = {
    id?: SortOrder
    registration?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    model?: SortOrder
    manufacturer?: SortOrder
    type?: SortOrder
    maxPassengers?: SortOrder
    maxRange?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AircraftAvgOrderByAggregateInput = {
    maxPassengers?: SortOrder
    maxRange?: SortOrder
  }

  export type AircraftMaxOrderByAggregateInput = {
    id?: SortOrder
    registration?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    model?: SortOrder
    manufacturer?: SortOrder
    type?: SortOrder
    maxPassengers?: SortOrder
    maxRange?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AircraftMinOrderByAggregateInput = {
    id?: SortOrder
    registration?: SortOrder
    iataCode?: SortOrder
    icaoCode?: SortOrder
    model?: SortOrder
    manufacturer?: SortOrder
    type?: SortOrder
    maxPassengers?: SortOrder
    maxRange?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AircraftSumOrderByAggregateInput = {
    maxPassengers?: SortOrder
    maxRange?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type FlightRouteAirlineIdOriginIdDestinationIdCompoundUniqueInput = {
    airlineId: string
    originId: string
    destinationId: string
  }

  export type FlightRouteCountOrderByAggregateInput = {
    id?: SortOrder
    airlineId?: SortOrder
    originId?: SortOrder
    destinationId?: SortOrder
    distance?: SortOrder
    duration?: SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlightRouteAvgOrderByAggregateInput = {
    distance?: SortOrder
    duration?: SortOrder
  }

  export type FlightRouteMaxOrderByAggregateInput = {
    id?: SortOrder
    airlineId?: SortOrder
    originId?: SortOrder
    destinationId?: SortOrder
    distance?: SortOrder
    duration?: SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlightRouteMinOrderByAggregateInput = {
    id?: SortOrder
    airlineId?: SortOrder
    originId?: SortOrder
    destinationId?: SortOrder
    distance?: SortOrder
    duration?: SortOrder
    frequency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlightRouteSumOrderByAggregateInput = {
    distance?: SortOrder
    duration?: SortOrder
  }

  export type WeatherAlertCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    radius?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeatherAlertAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    radius?: SortOrder
  }

  export type WeatherAlertMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    radius?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeatherAlertMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    radius?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeatherAlertSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    altitude?: SortOrder
    radius?: SortOrder
  }

  export type FlightScalarRelationFilter = {
    is?: FlightWhereInput
    isNot?: FlightWhereInput
  }

  export type RiskAssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    flightId?: SortOrder
    overallRisk?: SortOrder
    weatherRisk?: SortOrder
    aircraftRisk?: SortOrder
    routeRisk?: SortOrder
    crewRisk?: SortOrder
    factors?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskAssessmentAvgOrderByAggregateInput = {
    overallRisk?: SortOrder
    weatherRisk?: SortOrder
    aircraftRisk?: SortOrder
    routeRisk?: SortOrder
    crewRisk?: SortOrder
  }

  export type RiskAssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    flightId?: SortOrder
    overallRisk?: SortOrder
    weatherRisk?: SortOrder
    aircraftRisk?: SortOrder
    routeRisk?: SortOrder
    crewRisk?: SortOrder
    factors?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskAssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    flightId?: SortOrder
    overallRisk?: SortOrder
    weatherRisk?: SortOrder
    aircraftRisk?: SortOrder
    routeRisk?: SortOrder
    crewRisk?: SortOrder
    factors?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskAssessmentSumOrderByAggregateInput = {
    overallRisk?: SortOrder
    weatherRisk?: SortOrder
    aircraftRisk?: SortOrder
    routeRisk?: SortOrder
    crewRisk?: SortOrder
  }

  export type AirlineCreateNestedOneWithoutFlightsInput = {
    create?: XOR<AirlineCreateWithoutFlightsInput, AirlineUncheckedCreateWithoutFlightsInput>
    connectOrCreate?: AirlineCreateOrConnectWithoutFlightsInput
    connect?: AirlineWhereUniqueInput
  }

  export type AirportCreateNestedOneWithoutDepartureFlightsInput = {
    create?: XOR<AirportCreateWithoutDepartureFlightsInput, AirportUncheckedCreateWithoutDepartureFlightsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutDepartureFlightsInput
    connect?: AirportWhereUniqueInput
  }

  export type AirportCreateNestedOneWithoutArrivalFlightsInput = {
    create?: XOR<AirportCreateWithoutArrivalFlightsInput, AirportUncheckedCreateWithoutArrivalFlightsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutArrivalFlightsInput
    connect?: AirportWhereUniqueInput
  }

  export type AircraftCreateNestedOneWithoutFlightsInput = {
    create?: XOR<AircraftCreateWithoutFlightsInput, AircraftUncheckedCreateWithoutFlightsInput>
    connectOrCreate?: AircraftCreateOrConnectWithoutFlightsInput
    connect?: AircraftWhereUniqueInput
  }

  export type RiskAssessmentCreateNestedOneWithoutFlightInput = {
    create?: XOR<RiskAssessmentCreateWithoutFlightInput, RiskAssessmentUncheckedCreateWithoutFlightInput>
    connectOrCreate?: RiskAssessmentCreateOrConnectWithoutFlightInput
    connect?: RiskAssessmentWhereUniqueInput
  }

  export type RiskAssessmentUncheckedCreateNestedOneWithoutFlightInput = {
    create?: XOR<RiskAssessmentCreateWithoutFlightInput, RiskAssessmentUncheckedCreateWithoutFlightInput>
    connectOrCreate?: RiskAssessmentCreateOrConnectWithoutFlightInput
    connect?: RiskAssessmentWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AirlineUpdateOneRequiredWithoutFlightsNestedInput = {
    create?: XOR<AirlineCreateWithoutFlightsInput, AirlineUncheckedCreateWithoutFlightsInput>
    connectOrCreate?: AirlineCreateOrConnectWithoutFlightsInput
    upsert?: AirlineUpsertWithoutFlightsInput
    connect?: AirlineWhereUniqueInput
    update?: XOR<XOR<AirlineUpdateToOneWithWhereWithoutFlightsInput, AirlineUpdateWithoutFlightsInput>, AirlineUncheckedUpdateWithoutFlightsInput>
  }

  export type AirportUpdateOneRequiredWithoutDepartureFlightsNestedInput = {
    create?: XOR<AirportCreateWithoutDepartureFlightsInput, AirportUncheckedCreateWithoutDepartureFlightsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutDepartureFlightsInput
    upsert?: AirportUpsertWithoutDepartureFlightsInput
    connect?: AirportWhereUniqueInput
    update?: XOR<XOR<AirportUpdateToOneWithWhereWithoutDepartureFlightsInput, AirportUpdateWithoutDepartureFlightsInput>, AirportUncheckedUpdateWithoutDepartureFlightsInput>
  }

  export type AirportUpdateOneRequiredWithoutArrivalFlightsNestedInput = {
    create?: XOR<AirportCreateWithoutArrivalFlightsInput, AirportUncheckedCreateWithoutArrivalFlightsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutArrivalFlightsInput
    upsert?: AirportUpsertWithoutArrivalFlightsInput
    connect?: AirportWhereUniqueInput
    update?: XOR<XOR<AirportUpdateToOneWithWhereWithoutArrivalFlightsInput, AirportUpdateWithoutArrivalFlightsInput>, AirportUncheckedUpdateWithoutArrivalFlightsInput>
  }

  export type AircraftUpdateOneWithoutFlightsNestedInput = {
    create?: XOR<AircraftCreateWithoutFlightsInput, AircraftUncheckedCreateWithoutFlightsInput>
    connectOrCreate?: AircraftCreateOrConnectWithoutFlightsInput
    upsert?: AircraftUpsertWithoutFlightsInput
    disconnect?: AircraftWhereInput | boolean
    delete?: AircraftWhereInput | boolean
    connect?: AircraftWhereUniqueInput
    update?: XOR<XOR<AircraftUpdateToOneWithWhereWithoutFlightsInput, AircraftUpdateWithoutFlightsInput>, AircraftUncheckedUpdateWithoutFlightsInput>
  }

  export type RiskAssessmentUpdateOneWithoutFlightNestedInput = {
    create?: XOR<RiskAssessmentCreateWithoutFlightInput, RiskAssessmentUncheckedCreateWithoutFlightInput>
    connectOrCreate?: RiskAssessmentCreateOrConnectWithoutFlightInput
    upsert?: RiskAssessmentUpsertWithoutFlightInput
    disconnect?: RiskAssessmentWhereInput | boolean
    delete?: RiskAssessmentWhereInput | boolean
    connect?: RiskAssessmentWhereUniqueInput
    update?: XOR<XOR<RiskAssessmentUpdateToOneWithWhereWithoutFlightInput, RiskAssessmentUpdateWithoutFlightInput>, RiskAssessmentUncheckedUpdateWithoutFlightInput>
  }

  export type RiskAssessmentUncheckedUpdateOneWithoutFlightNestedInput = {
    create?: XOR<RiskAssessmentCreateWithoutFlightInput, RiskAssessmentUncheckedCreateWithoutFlightInput>
    connectOrCreate?: RiskAssessmentCreateOrConnectWithoutFlightInput
    upsert?: RiskAssessmentUpsertWithoutFlightInput
    disconnect?: RiskAssessmentWhereInput | boolean
    delete?: RiskAssessmentWhereInput | boolean
    connect?: RiskAssessmentWhereUniqueInput
    update?: XOR<XOR<RiskAssessmentUpdateToOneWithWhereWithoutFlightInput, RiskAssessmentUpdateWithoutFlightInput>, RiskAssessmentUncheckedUpdateWithoutFlightInput>
  }

  export type FlightCreateNestedManyWithoutAirlineInput = {
    create?: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput> | FlightCreateWithoutAirlineInput[] | FlightUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAirlineInput | FlightCreateOrConnectWithoutAirlineInput[]
    createMany?: FlightCreateManyAirlineInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type AirlineHubCreateNestedManyWithoutAirlineInput = {
    create?: XOR<AirlineHubCreateWithoutAirlineInput, AirlineHubUncheckedCreateWithoutAirlineInput> | AirlineHubCreateWithoutAirlineInput[] | AirlineHubUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: AirlineHubCreateOrConnectWithoutAirlineInput | AirlineHubCreateOrConnectWithoutAirlineInput[]
    createMany?: AirlineHubCreateManyAirlineInputEnvelope
    connect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
  }

  export type FlightRouteCreateNestedManyWithoutAirlineInput = {
    create?: XOR<FlightRouteCreateWithoutAirlineInput, FlightRouteUncheckedCreateWithoutAirlineInput> | FlightRouteCreateWithoutAirlineInput[] | FlightRouteUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutAirlineInput | FlightRouteCreateOrConnectWithoutAirlineInput[]
    createMany?: FlightRouteCreateManyAirlineInputEnvelope
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
  }

  export type FlightUncheckedCreateNestedManyWithoutAirlineInput = {
    create?: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput> | FlightCreateWithoutAirlineInput[] | FlightUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAirlineInput | FlightCreateOrConnectWithoutAirlineInput[]
    createMany?: FlightCreateManyAirlineInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type AirlineHubUncheckedCreateNestedManyWithoutAirlineInput = {
    create?: XOR<AirlineHubCreateWithoutAirlineInput, AirlineHubUncheckedCreateWithoutAirlineInput> | AirlineHubCreateWithoutAirlineInput[] | AirlineHubUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: AirlineHubCreateOrConnectWithoutAirlineInput | AirlineHubCreateOrConnectWithoutAirlineInput[]
    createMany?: AirlineHubCreateManyAirlineInputEnvelope
    connect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
  }

  export type FlightRouteUncheckedCreateNestedManyWithoutAirlineInput = {
    create?: XOR<FlightRouteCreateWithoutAirlineInput, FlightRouteUncheckedCreateWithoutAirlineInput> | FlightRouteCreateWithoutAirlineInput[] | FlightRouteUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutAirlineInput | FlightRouteCreateOrConnectWithoutAirlineInput[]
    createMany?: FlightRouteCreateManyAirlineInputEnvelope
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
  }

  export type FlightUpdateManyWithoutAirlineNestedInput = {
    create?: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput> | FlightCreateWithoutAirlineInput[] | FlightUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAirlineInput | FlightCreateOrConnectWithoutAirlineInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutAirlineInput | FlightUpsertWithWhereUniqueWithoutAirlineInput[]
    createMany?: FlightCreateManyAirlineInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutAirlineInput | FlightUpdateWithWhereUniqueWithoutAirlineInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutAirlineInput | FlightUpdateManyWithWhereWithoutAirlineInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type AirlineHubUpdateManyWithoutAirlineNestedInput = {
    create?: XOR<AirlineHubCreateWithoutAirlineInput, AirlineHubUncheckedCreateWithoutAirlineInput> | AirlineHubCreateWithoutAirlineInput[] | AirlineHubUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: AirlineHubCreateOrConnectWithoutAirlineInput | AirlineHubCreateOrConnectWithoutAirlineInput[]
    upsert?: AirlineHubUpsertWithWhereUniqueWithoutAirlineInput | AirlineHubUpsertWithWhereUniqueWithoutAirlineInput[]
    createMany?: AirlineHubCreateManyAirlineInputEnvelope
    set?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    disconnect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    delete?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    connect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    update?: AirlineHubUpdateWithWhereUniqueWithoutAirlineInput | AirlineHubUpdateWithWhereUniqueWithoutAirlineInput[]
    updateMany?: AirlineHubUpdateManyWithWhereWithoutAirlineInput | AirlineHubUpdateManyWithWhereWithoutAirlineInput[]
    deleteMany?: AirlineHubScalarWhereInput | AirlineHubScalarWhereInput[]
  }

  export type FlightRouteUpdateManyWithoutAirlineNestedInput = {
    create?: XOR<FlightRouteCreateWithoutAirlineInput, FlightRouteUncheckedCreateWithoutAirlineInput> | FlightRouteCreateWithoutAirlineInput[] | FlightRouteUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutAirlineInput | FlightRouteCreateOrConnectWithoutAirlineInput[]
    upsert?: FlightRouteUpsertWithWhereUniqueWithoutAirlineInput | FlightRouteUpsertWithWhereUniqueWithoutAirlineInput[]
    createMany?: FlightRouteCreateManyAirlineInputEnvelope
    set?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    disconnect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    delete?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    update?: FlightRouteUpdateWithWhereUniqueWithoutAirlineInput | FlightRouteUpdateWithWhereUniqueWithoutAirlineInput[]
    updateMany?: FlightRouteUpdateManyWithWhereWithoutAirlineInput | FlightRouteUpdateManyWithWhereWithoutAirlineInput[]
    deleteMany?: FlightRouteScalarWhereInput | FlightRouteScalarWhereInput[]
  }

  export type FlightUncheckedUpdateManyWithoutAirlineNestedInput = {
    create?: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput> | FlightCreateWithoutAirlineInput[] | FlightUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAirlineInput | FlightCreateOrConnectWithoutAirlineInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutAirlineInput | FlightUpsertWithWhereUniqueWithoutAirlineInput[]
    createMany?: FlightCreateManyAirlineInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutAirlineInput | FlightUpdateWithWhereUniqueWithoutAirlineInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutAirlineInput | FlightUpdateManyWithWhereWithoutAirlineInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type AirlineHubUncheckedUpdateManyWithoutAirlineNestedInput = {
    create?: XOR<AirlineHubCreateWithoutAirlineInput, AirlineHubUncheckedCreateWithoutAirlineInput> | AirlineHubCreateWithoutAirlineInput[] | AirlineHubUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: AirlineHubCreateOrConnectWithoutAirlineInput | AirlineHubCreateOrConnectWithoutAirlineInput[]
    upsert?: AirlineHubUpsertWithWhereUniqueWithoutAirlineInput | AirlineHubUpsertWithWhereUniqueWithoutAirlineInput[]
    createMany?: AirlineHubCreateManyAirlineInputEnvelope
    set?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    disconnect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    delete?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    connect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    update?: AirlineHubUpdateWithWhereUniqueWithoutAirlineInput | AirlineHubUpdateWithWhereUniqueWithoutAirlineInput[]
    updateMany?: AirlineHubUpdateManyWithWhereWithoutAirlineInput | AirlineHubUpdateManyWithWhereWithoutAirlineInput[]
    deleteMany?: AirlineHubScalarWhereInput | AirlineHubScalarWhereInput[]
  }

  export type FlightRouteUncheckedUpdateManyWithoutAirlineNestedInput = {
    create?: XOR<FlightRouteCreateWithoutAirlineInput, FlightRouteUncheckedCreateWithoutAirlineInput> | FlightRouteCreateWithoutAirlineInput[] | FlightRouteUncheckedCreateWithoutAirlineInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutAirlineInput | FlightRouteCreateOrConnectWithoutAirlineInput[]
    upsert?: FlightRouteUpsertWithWhereUniqueWithoutAirlineInput | FlightRouteUpsertWithWhereUniqueWithoutAirlineInput[]
    createMany?: FlightRouteCreateManyAirlineInputEnvelope
    set?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    disconnect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    delete?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    update?: FlightRouteUpdateWithWhereUniqueWithoutAirlineInput | FlightRouteUpdateWithWhereUniqueWithoutAirlineInput[]
    updateMany?: FlightRouteUpdateManyWithWhereWithoutAirlineInput | FlightRouteUpdateManyWithWhereWithoutAirlineInput[]
    deleteMany?: FlightRouteScalarWhereInput | FlightRouteScalarWhereInput[]
  }

  export type AirlineCreateNestedOneWithoutHubsInput = {
    create?: XOR<AirlineCreateWithoutHubsInput, AirlineUncheckedCreateWithoutHubsInput>
    connectOrCreate?: AirlineCreateOrConnectWithoutHubsInput
    connect?: AirlineWhereUniqueInput
  }

  export type AirportCreateNestedOneWithoutHubsInput = {
    create?: XOR<AirportCreateWithoutHubsInput, AirportUncheckedCreateWithoutHubsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutHubsInput
    connect?: AirportWhereUniqueInput
  }

  export type AirlineUpdateOneRequiredWithoutHubsNestedInput = {
    create?: XOR<AirlineCreateWithoutHubsInput, AirlineUncheckedCreateWithoutHubsInput>
    connectOrCreate?: AirlineCreateOrConnectWithoutHubsInput
    upsert?: AirlineUpsertWithoutHubsInput
    connect?: AirlineWhereUniqueInput
    update?: XOR<XOR<AirlineUpdateToOneWithWhereWithoutHubsInput, AirlineUpdateWithoutHubsInput>, AirlineUncheckedUpdateWithoutHubsInput>
  }

  export type AirportUpdateOneRequiredWithoutHubsNestedInput = {
    create?: XOR<AirportCreateWithoutHubsInput, AirportUncheckedCreateWithoutHubsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutHubsInput
    upsert?: AirportUpsertWithoutHubsInput
    connect?: AirportWhereUniqueInput
    update?: XOR<XOR<AirportUpdateToOneWithWhereWithoutHubsInput, AirportUpdateWithoutHubsInput>, AirportUncheckedUpdateWithoutHubsInput>
  }

  export type FlightCreateNestedManyWithoutDepartureInput = {
    create?: XOR<FlightCreateWithoutDepartureInput, FlightUncheckedCreateWithoutDepartureInput> | FlightCreateWithoutDepartureInput[] | FlightUncheckedCreateWithoutDepartureInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutDepartureInput | FlightCreateOrConnectWithoutDepartureInput[]
    createMany?: FlightCreateManyDepartureInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type FlightCreateNestedManyWithoutArrivalInput = {
    create?: XOR<FlightCreateWithoutArrivalInput, FlightUncheckedCreateWithoutArrivalInput> | FlightCreateWithoutArrivalInput[] | FlightUncheckedCreateWithoutArrivalInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutArrivalInput | FlightCreateOrConnectWithoutArrivalInput[]
    createMany?: FlightCreateManyArrivalInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type AirlineHubCreateNestedManyWithoutAirportInput = {
    create?: XOR<AirlineHubCreateWithoutAirportInput, AirlineHubUncheckedCreateWithoutAirportInput> | AirlineHubCreateWithoutAirportInput[] | AirlineHubUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: AirlineHubCreateOrConnectWithoutAirportInput | AirlineHubCreateOrConnectWithoutAirportInput[]
    createMany?: AirlineHubCreateManyAirportInputEnvelope
    connect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
  }

  export type FlightRouteCreateNestedManyWithoutOriginInput = {
    create?: XOR<FlightRouteCreateWithoutOriginInput, FlightRouteUncheckedCreateWithoutOriginInput> | FlightRouteCreateWithoutOriginInput[] | FlightRouteUncheckedCreateWithoutOriginInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutOriginInput | FlightRouteCreateOrConnectWithoutOriginInput[]
    createMany?: FlightRouteCreateManyOriginInputEnvelope
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
  }

  export type FlightRouteCreateNestedManyWithoutDestinationInput = {
    create?: XOR<FlightRouteCreateWithoutDestinationInput, FlightRouteUncheckedCreateWithoutDestinationInput> | FlightRouteCreateWithoutDestinationInput[] | FlightRouteUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutDestinationInput | FlightRouteCreateOrConnectWithoutDestinationInput[]
    createMany?: FlightRouteCreateManyDestinationInputEnvelope
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
  }

  export type FlightUncheckedCreateNestedManyWithoutDepartureInput = {
    create?: XOR<FlightCreateWithoutDepartureInput, FlightUncheckedCreateWithoutDepartureInput> | FlightCreateWithoutDepartureInput[] | FlightUncheckedCreateWithoutDepartureInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutDepartureInput | FlightCreateOrConnectWithoutDepartureInput[]
    createMany?: FlightCreateManyDepartureInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type FlightUncheckedCreateNestedManyWithoutArrivalInput = {
    create?: XOR<FlightCreateWithoutArrivalInput, FlightUncheckedCreateWithoutArrivalInput> | FlightCreateWithoutArrivalInput[] | FlightUncheckedCreateWithoutArrivalInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutArrivalInput | FlightCreateOrConnectWithoutArrivalInput[]
    createMany?: FlightCreateManyArrivalInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type AirlineHubUncheckedCreateNestedManyWithoutAirportInput = {
    create?: XOR<AirlineHubCreateWithoutAirportInput, AirlineHubUncheckedCreateWithoutAirportInput> | AirlineHubCreateWithoutAirportInput[] | AirlineHubUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: AirlineHubCreateOrConnectWithoutAirportInput | AirlineHubCreateOrConnectWithoutAirportInput[]
    createMany?: AirlineHubCreateManyAirportInputEnvelope
    connect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
  }

  export type FlightRouteUncheckedCreateNestedManyWithoutOriginInput = {
    create?: XOR<FlightRouteCreateWithoutOriginInput, FlightRouteUncheckedCreateWithoutOriginInput> | FlightRouteCreateWithoutOriginInput[] | FlightRouteUncheckedCreateWithoutOriginInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutOriginInput | FlightRouteCreateOrConnectWithoutOriginInput[]
    createMany?: FlightRouteCreateManyOriginInputEnvelope
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
  }

  export type FlightRouteUncheckedCreateNestedManyWithoutDestinationInput = {
    create?: XOR<FlightRouteCreateWithoutDestinationInput, FlightRouteUncheckedCreateWithoutDestinationInput> | FlightRouteCreateWithoutDestinationInput[] | FlightRouteUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutDestinationInput | FlightRouteCreateOrConnectWithoutDestinationInput[]
    createMany?: FlightRouteCreateManyDestinationInputEnvelope
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FlightUpdateManyWithoutDepartureNestedInput = {
    create?: XOR<FlightCreateWithoutDepartureInput, FlightUncheckedCreateWithoutDepartureInput> | FlightCreateWithoutDepartureInput[] | FlightUncheckedCreateWithoutDepartureInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutDepartureInput | FlightCreateOrConnectWithoutDepartureInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutDepartureInput | FlightUpsertWithWhereUniqueWithoutDepartureInput[]
    createMany?: FlightCreateManyDepartureInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutDepartureInput | FlightUpdateWithWhereUniqueWithoutDepartureInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutDepartureInput | FlightUpdateManyWithWhereWithoutDepartureInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type FlightUpdateManyWithoutArrivalNestedInput = {
    create?: XOR<FlightCreateWithoutArrivalInput, FlightUncheckedCreateWithoutArrivalInput> | FlightCreateWithoutArrivalInput[] | FlightUncheckedCreateWithoutArrivalInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutArrivalInput | FlightCreateOrConnectWithoutArrivalInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutArrivalInput | FlightUpsertWithWhereUniqueWithoutArrivalInput[]
    createMany?: FlightCreateManyArrivalInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutArrivalInput | FlightUpdateWithWhereUniqueWithoutArrivalInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutArrivalInput | FlightUpdateManyWithWhereWithoutArrivalInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type AirlineHubUpdateManyWithoutAirportNestedInput = {
    create?: XOR<AirlineHubCreateWithoutAirportInput, AirlineHubUncheckedCreateWithoutAirportInput> | AirlineHubCreateWithoutAirportInput[] | AirlineHubUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: AirlineHubCreateOrConnectWithoutAirportInput | AirlineHubCreateOrConnectWithoutAirportInput[]
    upsert?: AirlineHubUpsertWithWhereUniqueWithoutAirportInput | AirlineHubUpsertWithWhereUniqueWithoutAirportInput[]
    createMany?: AirlineHubCreateManyAirportInputEnvelope
    set?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    disconnect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    delete?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    connect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    update?: AirlineHubUpdateWithWhereUniqueWithoutAirportInput | AirlineHubUpdateWithWhereUniqueWithoutAirportInput[]
    updateMany?: AirlineHubUpdateManyWithWhereWithoutAirportInput | AirlineHubUpdateManyWithWhereWithoutAirportInput[]
    deleteMany?: AirlineHubScalarWhereInput | AirlineHubScalarWhereInput[]
  }

  export type FlightRouteUpdateManyWithoutOriginNestedInput = {
    create?: XOR<FlightRouteCreateWithoutOriginInput, FlightRouteUncheckedCreateWithoutOriginInput> | FlightRouteCreateWithoutOriginInput[] | FlightRouteUncheckedCreateWithoutOriginInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutOriginInput | FlightRouteCreateOrConnectWithoutOriginInput[]
    upsert?: FlightRouteUpsertWithWhereUniqueWithoutOriginInput | FlightRouteUpsertWithWhereUniqueWithoutOriginInput[]
    createMany?: FlightRouteCreateManyOriginInputEnvelope
    set?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    disconnect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    delete?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    update?: FlightRouteUpdateWithWhereUniqueWithoutOriginInput | FlightRouteUpdateWithWhereUniqueWithoutOriginInput[]
    updateMany?: FlightRouteUpdateManyWithWhereWithoutOriginInput | FlightRouteUpdateManyWithWhereWithoutOriginInput[]
    deleteMany?: FlightRouteScalarWhereInput | FlightRouteScalarWhereInput[]
  }

  export type FlightRouteUpdateManyWithoutDestinationNestedInput = {
    create?: XOR<FlightRouteCreateWithoutDestinationInput, FlightRouteUncheckedCreateWithoutDestinationInput> | FlightRouteCreateWithoutDestinationInput[] | FlightRouteUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutDestinationInput | FlightRouteCreateOrConnectWithoutDestinationInput[]
    upsert?: FlightRouteUpsertWithWhereUniqueWithoutDestinationInput | FlightRouteUpsertWithWhereUniqueWithoutDestinationInput[]
    createMany?: FlightRouteCreateManyDestinationInputEnvelope
    set?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    disconnect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    delete?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    update?: FlightRouteUpdateWithWhereUniqueWithoutDestinationInput | FlightRouteUpdateWithWhereUniqueWithoutDestinationInput[]
    updateMany?: FlightRouteUpdateManyWithWhereWithoutDestinationInput | FlightRouteUpdateManyWithWhereWithoutDestinationInput[]
    deleteMany?: FlightRouteScalarWhereInput | FlightRouteScalarWhereInput[]
  }

  export type FlightUncheckedUpdateManyWithoutDepartureNestedInput = {
    create?: XOR<FlightCreateWithoutDepartureInput, FlightUncheckedCreateWithoutDepartureInput> | FlightCreateWithoutDepartureInput[] | FlightUncheckedCreateWithoutDepartureInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutDepartureInput | FlightCreateOrConnectWithoutDepartureInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutDepartureInput | FlightUpsertWithWhereUniqueWithoutDepartureInput[]
    createMany?: FlightCreateManyDepartureInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutDepartureInput | FlightUpdateWithWhereUniqueWithoutDepartureInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutDepartureInput | FlightUpdateManyWithWhereWithoutDepartureInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type FlightUncheckedUpdateManyWithoutArrivalNestedInput = {
    create?: XOR<FlightCreateWithoutArrivalInput, FlightUncheckedCreateWithoutArrivalInput> | FlightCreateWithoutArrivalInput[] | FlightUncheckedCreateWithoutArrivalInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutArrivalInput | FlightCreateOrConnectWithoutArrivalInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutArrivalInput | FlightUpsertWithWhereUniqueWithoutArrivalInput[]
    createMany?: FlightCreateManyArrivalInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutArrivalInput | FlightUpdateWithWhereUniqueWithoutArrivalInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutArrivalInput | FlightUpdateManyWithWhereWithoutArrivalInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type AirlineHubUncheckedUpdateManyWithoutAirportNestedInput = {
    create?: XOR<AirlineHubCreateWithoutAirportInput, AirlineHubUncheckedCreateWithoutAirportInput> | AirlineHubCreateWithoutAirportInput[] | AirlineHubUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: AirlineHubCreateOrConnectWithoutAirportInput | AirlineHubCreateOrConnectWithoutAirportInput[]
    upsert?: AirlineHubUpsertWithWhereUniqueWithoutAirportInput | AirlineHubUpsertWithWhereUniqueWithoutAirportInput[]
    createMany?: AirlineHubCreateManyAirportInputEnvelope
    set?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    disconnect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    delete?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    connect?: AirlineHubWhereUniqueInput | AirlineHubWhereUniqueInput[]
    update?: AirlineHubUpdateWithWhereUniqueWithoutAirportInput | AirlineHubUpdateWithWhereUniqueWithoutAirportInput[]
    updateMany?: AirlineHubUpdateManyWithWhereWithoutAirportInput | AirlineHubUpdateManyWithWhereWithoutAirportInput[]
    deleteMany?: AirlineHubScalarWhereInput | AirlineHubScalarWhereInput[]
  }

  export type FlightRouteUncheckedUpdateManyWithoutOriginNestedInput = {
    create?: XOR<FlightRouteCreateWithoutOriginInput, FlightRouteUncheckedCreateWithoutOriginInput> | FlightRouteCreateWithoutOriginInput[] | FlightRouteUncheckedCreateWithoutOriginInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutOriginInput | FlightRouteCreateOrConnectWithoutOriginInput[]
    upsert?: FlightRouteUpsertWithWhereUniqueWithoutOriginInput | FlightRouteUpsertWithWhereUniqueWithoutOriginInput[]
    createMany?: FlightRouteCreateManyOriginInputEnvelope
    set?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    disconnect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    delete?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    update?: FlightRouteUpdateWithWhereUniqueWithoutOriginInput | FlightRouteUpdateWithWhereUniqueWithoutOriginInput[]
    updateMany?: FlightRouteUpdateManyWithWhereWithoutOriginInput | FlightRouteUpdateManyWithWhereWithoutOriginInput[]
    deleteMany?: FlightRouteScalarWhereInput | FlightRouteScalarWhereInput[]
  }

  export type FlightRouteUncheckedUpdateManyWithoutDestinationNestedInput = {
    create?: XOR<FlightRouteCreateWithoutDestinationInput, FlightRouteUncheckedCreateWithoutDestinationInput> | FlightRouteCreateWithoutDestinationInput[] | FlightRouteUncheckedCreateWithoutDestinationInput[]
    connectOrCreate?: FlightRouteCreateOrConnectWithoutDestinationInput | FlightRouteCreateOrConnectWithoutDestinationInput[]
    upsert?: FlightRouteUpsertWithWhereUniqueWithoutDestinationInput | FlightRouteUpsertWithWhereUniqueWithoutDestinationInput[]
    createMany?: FlightRouteCreateManyDestinationInputEnvelope
    set?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    disconnect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    delete?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    connect?: FlightRouteWhereUniqueInput | FlightRouteWhereUniqueInput[]
    update?: FlightRouteUpdateWithWhereUniqueWithoutDestinationInput | FlightRouteUpdateWithWhereUniqueWithoutDestinationInput[]
    updateMany?: FlightRouteUpdateManyWithWhereWithoutDestinationInput | FlightRouteUpdateManyWithWhereWithoutDestinationInput[]
    deleteMany?: FlightRouteScalarWhereInput | FlightRouteScalarWhereInput[]
  }

  export type FlightCreateNestedManyWithoutAircraftInput = {
    create?: XOR<FlightCreateWithoutAircraftInput, FlightUncheckedCreateWithoutAircraftInput> | FlightCreateWithoutAircraftInput[] | FlightUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAircraftInput | FlightCreateOrConnectWithoutAircraftInput[]
    createMany?: FlightCreateManyAircraftInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type FlightUncheckedCreateNestedManyWithoutAircraftInput = {
    create?: XOR<FlightCreateWithoutAircraftInput, FlightUncheckedCreateWithoutAircraftInput> | FlightCreateWithoutAircraftInput[] | FlightUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAircraftInput | FlightCreateOrConnectWithoutAircraftInput[]
    createMany?: FlightCreateManyAircraftInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FlightUpdateManyWithoutAircraftNestedInput = {
    create?: XOR<FlightCreateWithoutAircraftInput, FlightUncheckedCreateWithoutAircraftInput> | FlightCreateWithoutAircraftInput[] | FlightUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAircraftInput | FlightCreateOrConnectWithoutAircraftInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutAircraftInput | FlightUpsertWithWhereUniqueWithoutAircraftInput[]
    createMany?: FlightCreateManyAircraftInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutAircraftInput | FlightUpdateWithWhereUniqueWithoutAircraftInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutAircraftInput | FlightUpdateManyWithWhereWithoutAircraftInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type FlightUncheckedUpdateManyWithoutAircraftNestedInput = {
    create?: XOR<FlightCreateWithoutAircraftInput, FlightUncheckedCreateWithoutAircraftInput> | FlightCreateWithoutAircraftInput[] | FlightUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutAircraftInput | FlightCreateOrConnectWithoutAircraftInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutAircraftInput | FlightUpsertWithWhereUniqueWithoutAircraftInput[]
    createMany?: FlightCreateManyAircraftInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutAircraftInput | FlightUpdateWithWhereUniqueWithoutAircraftInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutAircraftInput | FlightUpdateManyWithWhereWithoutAircraftInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type AirlineCreateNestedOneWithoutRoutesInput = {
    create?: XOR<AirlineCreateWithoutRoutesInput, AirlineUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: AirlineCreateOrConnectWithoutRoutesInput
    connect?: AirlineWhereUniqueInput
  }

  export type AirportCreateNestedOneWithoutRouteOriginsInput = {
    create?: XOR<AirportCreateWithoutRouteOriginsInput, AirportUncheckedCreateWithoutRouteOriginsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutRouteOriginsInput
    connect?: AirportWhereUniqueInput
  }

  export type AirportCreateNestedOneWithoutRouteDestinationsInput = {
    create?: XOR<AirportCreateWithoutRouteDestinationsInput, AirportUncheckedCreateWithoutRouteDestinationsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutRouteDestinationsInput
    connect?: AirportWhereUniqueInput
  }

  export type AirlineUpdateOneRequiredWithoutRoutesNestedInput = {
    create?: XOR<AirlineCreateWithoutRoutesInput, AirlineUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: AirlineCreateOrConnectWithoutRoutesInput
    upsert?: AirlineUpsertWithoutRoutesInput
    connect?: AirlineWhereUniqueInput
    update?: XOR<XOR<AirlineUpdateToOneWithWhereWithoutRoutesInput, AirlineUpdateWithoutRoutesInput>, AirlineUncheckedUpdateWithoutRoutesInput>
  }

  export type AirportUpdateOneRequiredWithoutRouteOriginsNestedInput = {
    create?: XOR<AirportCreateWithoutRouteOriginsInput, AirportUncheckedCreateWithoutRouteOriginsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutRouteOriginsInput
    upsert?: AirportUpsertWithoutRouteOriginsInput
    connect?: AirportWhereUniqueInput
    update?: XOR<XOR<AirportUpdateToOneWithWhereWithoutRouteOriginsInput, AirportUpdateWithoutRouteOriginsInput>, AirportUncheckedUpdateWithoutRouteOriginsInput>
  }

  export type AirportUpdateOneRequiredWithoutRouteDestinationsNestedInput = {
    create?: XOR<AirportCreateWithoutRouteDestinationsInput, AirportUncheckedCreateWithoutRouteDestinationsInput>
    connectOrCreate?: AirportCreateOrConnectWithoutRouteDestinationsInput
    upsert?: AirportUpsertWithoutRouteDestinationsInput
    connect?: AirportWhereUniqueInput
    update?: XOR<XOR<AirportUpdateToOneWithWhereWithoutRouteDestinationsInput, AirportUpdateWithoutRouteDestinationsInput>, AirportUncheckedUpdateWithoutRouteDestinationsInput>
  }

  export type FlightCreateNestedOneWithoutRiskAssessmentInput = {
    create?: XOR<FlightCreateWithoutRiskAssessmentInput, FlightUncheckedCreateWithoutRiskAssessmentInput>
    connectOrCreate?: FlightCreateOrConnectWithoutRiskAssessmentInput
    connect?: FlightWhereUniqueInput
  }

  export type FlightUpdateOneRequiredWithoutRiskAssessmentNestedInput = {
    create?: XOR<FlightCreateWithoutRiskAssessmentInput, FlightUncheckedCreateWithoutRiskAssessmentInput>
    connectOrCreate?: FlightCreateOrConnectWithoutRiskAssessmentInput
    upsert?: FlightUpsertWithoutRiskAssessmentInput
    connect?: FlightWhereUniqueInput
    update?: XOR<XOR<FlightUpdateToOneWithWhereWithoutRiskAssessmentInput, FlightUpdateWithoutRiskAssessmentInput>, FlightUncheckedUpdateWithoutRiskAssessmentInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type AirlineCreateWithoutFlightsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hubs?: AirlineHubCreateNestedManyWithoutAirlineInput
    routes?: FlightRouteCreateNestedManyWithoutAirlineInput
  }

  export type AirlineUncheckedCreateWithoutFlightsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hubs?: AirlineHubUncheckedCreateNestedManyWithoutAirlineInput
    routes?: FlightRouteUncheckedCreateNestedManyWithoutAirlineInput
  }

  export type AirlineCreateOrConnectWithoutFlightsInput = {
    where: AirlineWhereUniqueInput
    create: XOR<AirlineCreateWithoutFlightsInput, AirlineUncheckedCreateWithoutFlightsInput>
  }

  export type AirportCreateWithoutDepartureFlightsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arrivalFlights?: FlightCreateNestedManyWithoutArrivalInput
    hubs?: AirlineHubCreateNestedManyWithoutAirportInput
    routeOrigins?: FlightRouteCreateNestedManyWithoutOriginInput
    routeDestinations?: FlightRouteCreateNestedManyWithoutDestinationInput
  }

  export type AirportUncheckedCreateWithoutDepartureFlightsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arrivalFlights?: FlightUncheckedCreateNestedManyWithoutArrivalInput
    hubs?: AirlineHubUncheckedCreateNestedManyWithoutAirportInput
    routeOrigins?: FlightRouteUncheckedCreateNestedManyWithoutOriginInput
    routeDestinations?: FlightRouteUncheckedCreateNestedManyWithoutDestinationInput
  }

  export type AirportCreateOrConnectWithoutDepartureFlightsInput = {
    where: AirportWhereUniqueInput
    create: XOR<AirportCreateWithoutDepartureFlightsInput, AirportUncheckedCreateWithoutDepartureFlightsInput>
  }

  export type AirportCreateWithoutArrivalFlightsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightCreateNestedManyWithoutDepartureInput
    hubs?: AirlineHubCreateNestedManyWithoutAirportInput
    routeOrigins?: FlightRouteCreateNestedManyWithoutOriginInput
    routeDestinations?: FlightRouteCreateNestedManyWithoutDestinationInput
  }

  export type AirportUncheckedCreateWithoutArrivalFlightsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightUncheckedCreateNestedManyWithoutDepartureInput
    hubs?: AirlineHubUncheckedCreateNestedManyWithoutAirportInput
    routeOrigins?: FlightRouteUncheckedCreateNestedManyWithoutOriginInput
    routeDestinations?: FlightRouteUncheckedCreateNestedManyWithoutDestinationInput
  }

  export type AirportCreateOrConnectWithoutArrivalFlightsInput = {
    where: AirportWhereUniqueInput
    create: XOR<AirportCreateWithoutArrivalFlightsInput, AirportUncheckedCreateWithoutArrivalFlightsInput>
  }

  export type AircraftCreateWithoutFlightsInput = {
    id?: string
    registration: string
    iataCode: string
    icaoCode: string
    model: string
    manufacturer: string
    type: string
    maxPassengers: number
    maxRange?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AircraftUncheckedCreateWithoutFlightsInput = {
    id?: string
    registration: string
    iataCode: string
    icaoCode: string
    model: string
    manufacturer: string
    type: string
    maxPassengers: number
    maxRange?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AircraftCreateOrConnectWithoutFlightsInput = {
    where: AircraftWhereUniqueInput
    create: XOR<AircraftCreateWithoutFlightsInput, AircraftUncheckedCreateWithoutFlightsInput>
  }

  export type RiskAssessmentCreateWithoutFlightInput = {
    id?: string
    overallRisk: number
    weatherRisk: number
    aircraftRisk: number
    routeRisk: number
    crewRisk: number
    factors: string
    recommendations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RiskAssessmentUncheckedCreateWithoutFlightInput = {
    id?: string
    overallRisk: number
    weatherRisk: number
    aircraftRisk: number
    routeRisk: number
    crewRisk: number
    factors: string
    recommendations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RiskAssessmentCreateOrConnectWithoutFlightInput = {
    where: RiskAssessmentWhereUniqueInput
    create: XOR<RiskAssessmentCreateWithoutFlightInput, RiskAssessmentUncheckedCreateWithoutFlightInput>
  }

  export type AirlineUpsertWithoutFlightsInput = {
    update: XOR<AirlineUpdateWithoutFlightsInput, AirlineUncheckedUpdateWithoutFlightsInput>
    create: XOR<AirlineCreateWithoutFlightsInput, AirlineUncheckedCreateWithoutFlightsInput>
    where?: AirlineWhereInput
  }

  export type AirlineUpdateToOneWithWhereWithoutFlightsInput = {
    where?: AirlineWhereInput
    data: XOR<AirlineUpdateWithoutFlightsInput, AirlineUncheckedUpdateWithoutFlightsInput>
  }

  export type AirlineUpdateWithoutFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hubs?: AirlineHubUpdateManyWithoutAirlineNestedInput
    routes?: FlightRouteUpdateManyWithoutAirlineNestedInput
  }

  export type AirlineUncheckedUpdateWithoutFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hubs?: AirlineHubUncheckedUpdateManyWithoutAirlineNestedInput
    routes?: FlightRouteUncheckedUpdateManyWithoutAirlineNestedInput
  }

  export type AirportUpsertWithoutDepartureFlightsInput = {
    update: XOR<AirportUpdateWithoutDepartureFlightsInput, AirportUncheckedUpdateWithoutDepartureFlightsInput>
    create: XOR<AirportCreateWithoutDepartureFlightsInput, AirportUncheckedCreateWithoutDepartureFlightsInput>
    where?: AirportWhereInput
  }

  export type AirportUpdateToOneWithWhereWithoutDepartureFlightsInput = {
    where?: AirportWhereInput
    data: XOR<AirportUpdateWithoutDepartureFlightsInput, AirportUncheckedUpdateWithoutDepartureFlightsInput>
  }

  export type AirportUpdateWithoutDepartureFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalFlights?: FlightUpdateManyWithoutArrivalNestedInput
    hubs?: AirlineHubUpdateManyWithoutAirportNestedInput
    routeOrigins?: FlightRouteUpdateManyWithoutOriginNestedInput
    routeDestinations?: FlightRouteUpdateManyWithoutDestinationNestedInput
  }

  export type AirportUncheckedUpdateWithoutDepartureFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalFlights?: FlightUncheckedUpdateManyWithoutArrivalNestedInput
    hubs?: AirlineHubUncheckedUpdateManyWithoutAirportNestedInput
    routeOrigins?: FlightRouteUncheckedUpdateManyWithoutOriginNestedInput
    routeDestinations?: FlightRouteUncheckedUpdateManyWithoutDestinationNestedInput
  }

  export type AirportUpsertWithoutArrivalFlightsInput = {
    update: XOR<AirportUpdateWithoutArrivalFlightsInput, AirportUncheckedUpdateWithoutArrivalFlightsInput>
    create: XOR<AirportCreateWithoutArrivalFlightsInput, AirportUncheckedCreateWithoutArrivalFlightsInput>
    where?: AirportWhereInput
  }

  export type AirportUpdateToOneWithWhereWithoutArrivalFlightsInput = {
    where?: AirportWhereInput
    data: XOR<AirportUpdateWithoutArrivalFlightsInput, AirportUncheckedUpdateWithoutArrivalFlightsInput>
  }

  export type AirportUpdateWithoutArrivalFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUpdateManyWithoutDepartureNestedInput
    hubs?: AirlineHubUpdateManyWithoutAirportNestedInput
    routeOrigins?: FlightRouteUpdateManyWithoutOriginNestedInput
    routeDestinations?: FlightRouteUpdateManyWithoutDestinationNestedInput
  }

  export type AirportUncheckedUpdateWithoutArrivalFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUncheckedUpdateManyWithoutDepartureNestedInput
    hubs?: AirlineHubUncheckedUpdateManyWithoutAirportNestedInput
    routeOrigins?: FlightRouteUncheckedUpdateManyWithoutOriginNestedInput
    routeDestinations?: FlightRouteUncheckedUpdateManyWithoutDestinationNestedInput
  }

  export type AircraftUpsertWithoutFlightsInput = {
    update: XOR<AircraftUpdateWithoutFlightsInput, AircraftUncheckedUpdateWithoutFlightsInput>
    create: XOR<AircraftCreateWithoutFlightsInput, AircraftUncheckedCreateWithoutFlightsInput>
    where?: AircraftWhereInput
  }

  export type AircraftUpdateToOneWithWhereWithoutFlightsInput = {
    where?: AircraftWhereInput
    data: XOR<AircraftUpdateWithoutFlightsInput, AircraftUncheckedUpdateWithoutFlightsInput>
  }

  export type AircraftUpdateWithoutFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registration?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    maxPassengers?: IntFieldUpdateOperationsInput | number
    maxRange?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AircraftUncheckedUpdateWithoutFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    registration?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    maxPassengers?: IntFieldUpdateOperationsInput | number
    maxRange?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskAssessmentUpsertWithoutFlightInput = {
    update: XOR<RiskAssessmentUpdateWithoutFlightInput, RiskAssessmentUncheckedUpdateWithoutFlightInput>
    create: XOR<RiskAssessmentCreateWithoutFlightInput, RiskAssessmentUncheckedCreateWithoutFlightInput>
    where?: RiskAssessmentWhereInput
  }

  export type RiskAssessmentUpdateToOneWithWhereWithoutFlightInput = {
    where?: RiskAssessmentWhereInput
    data: XOR<RiskAssessmentUpdateWithoutFlightInput, RiskAssessmentUncheckedUpdateWithoutFlightInput>
  }

  export type RiskAssessmentUpdateWithoutFlightInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallRisk?: IntFieldUpdateOperationsInput | number
    weatherRisk?: IntFieldUpdateOperationsInput | number
    aircraftRisk?: IntFieldUpdateOperationsInput | number
    routeRisk?: IntFieldUpdateOperationsInput | number
    crewRisk?: IntFieldUpdateOperationsInput | number
    factors?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskAssessmentUncheckedUpdateWithoutFlightInput = {
    id?: StringFieldUpdateOperationsInput | string
    overallRisk?: IntFieldUpdateOperationsInput | number
    weatherRisk?: IntFieldUpdateOperationsInput | number
    aircraftRisk?: IntFieldUpdateOperationsInput | number
    routeRisk?: IntFieldUpdateOperationsInput | number
    crewRisk?: IntFieldUpdateOperationsInput | number
    factors?: StringFieldUpdateOperationsInput | string
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightCreateWithoutAirlineInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    departure: AirportCreateNestedOneWithoutDepartureFlightsInput
    arrival: AirportCreateNestedOneWithoutArrivalFlightsInput
    aircraft?: AircraftCreateNestedOneWithoutFlightsInput
    riskAssessment?: RiskAssessmentCreateNestedOneWithoutFlightInput
  }

  export type FlightUncheckedCreateWithoutAirlineInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    departureId: string
    arrivalId: string
    aircraftId?: string | null
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    riskAssessment?: RiskAssessmentUncheckedCreateNestedOneWithoutFlightInput
  }

  export type FlightCreateOrConnectWithoutAirlineInput = {
    where: FlightWhereUniqueInput
    create: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput>
  }

  export type FlightCreateManyAirlineInputEnvelope = {
    data: FlightCreateManyAirlineInput | FlightCreateManyAirlineInput[]
  }

  export type AirlineHubCreateWithoutAirlineInput = {
    id?: string
    createdAt?: Date | string
    airport: AirportCreateNestedOneWithoutHubsInput
  }

  export type AirlineHubUncheckedCreateWithoutAirlineInput = {
    id?: string
    airportId: string
    createdAt?: Date | string
  }

  export type AirlineHubCreateOrConnectWithoutAirlineInput = {
    where: AirlineHubWhereUniqueInput
    create: XOR<AirlineHubCreateWithoutAirlineInput, AirlineHubUncheckedCreateWithoutAirlineInput>
  }

  export type AirlineHubCreateManyAirlineInputEnvelope = {
    data: AirlineHubCreateManyAirlineInput | AirlineHubCreateManyAirlineInput[]
  }

  export type FlightRouteCreateWithoutAirlineInput = {
    id?: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    origin: AirportCreateNestedOneWithoutRouteOriginsInput
    destination: AirportCreateNestedOneWithoutRouteDestinationsInput
  }

  export type FlightRouteUncheckedCreateWithoutAirlineInput = {
    id?: string
    originId: string
    destinationId: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightRouteCreateOrConnectWithoutAirlineInput = {
    where: FlightRouteWhereUniqueInput
    create: XOR<FlightRouteCreateWithoutAirlineInput, FlightRouteUncheckedCreateWithoutAirlineInput>
  }

  export type FlightRouteCreateManyAirlineInputEnvelope = {
    data: FlightRouteCreateManyAirlineInput | FlightRouteCreateManyAirlineInput[]
  }

  export type FlightUpsertWithWhereUniqueWithoutAirlineInput = {
    where: FlightWhereUniqueInput
    update: XOR<FlightUpdateWithoutAirlineInput, FlightUncheckedUpdateWithoutAirlineInput>
    create: XOR<FlightCreateWithoutAirlineInput, FlightUncheckedCreateWithoutAirlineInput>
  }

  export type FlightUpdateWithWhereUniqueWithoutAirlineInput = {
    where: FlightWhereUniqueInput
    data: XOR<FlightUpdateWithoutAirlineInput, FlightUncheckedUpdateWithoutAirlineInput>
  }

  export type FlightUpdateManyWithWhereWithoutAirlineInput = {
    where: FlightScalarWhereInput
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyWithoutAirlineInput>
  }

  export type FlightScalarWhereInput = {
    AND?: FlightScalarWhereInput | FlightScalarWhereInput[]
    OR?: FlightScalarWhereInput[]
    NOT?: FlightScalarWhereInput | FlightScalarWhereInput[]
    id?: StringFilter<"Flight"> | string
    flightNumber?: StringFilter<"Flight"> | string
    iataCode?: StringFilter<"Flight"> | string
    icaoCode?: StringFilter<"Flight"> | string
    status?: StringFilter<"Flight"> | string
    date?: DateTimeFilter<"Flight"> | Date | string
    createdAt?: DateTimeFilter<"Flight"> | Date | string
    updatedAt?: DateTimeFilter<"Flight"> | Date | string
    airlineId?: StringFilter<"Flight"> | string
    departureId?: StringFilter<"Flight"> | string
    arrivalId?: StringFilter<"Flight"> | string
    aircraftId?: StringNullableFilter<"Flight"> | string | null
    departureTime?: DateTimeFilter<"Flight"> | Date | string
    arrivalTime?: DateTimeFilter<"Flight"> | Date | string
    departureDelay?: IntFilter<"Flight"> | number
    arrivalDelay?: IntFilter<"Flight"> | number
    departureTerminal?: StringNullableFilter<"Flight"> | string | null
    arrivalTerminal?: StringNullableFilter<"Flight"> | string | null
    departureGate?: StringNullableFilter<"Flight"> | string | null
    arrivalGate?: StringNullableFilter<"Flight"> | string | null
    departureRunway?: StringNullableFilter<"Flight"> | string | null
    arrivalRunway?: StringNullableFilter<"Flight"> | string | null
    baggageClaim?: StringNullableFilter<"Flight"> | string | null
    latitude?: FloatNullableFilter<"Flight"> | number | null
    longitude?: FloatNullableFilter<"Flight"> | number | null
    altitude?: FloatNullableFilter<"Flight"> | number | null
    speed?: FloatNullableFilter<"Flight"> | number | null
    heading?: FloatNullableFilter<"Flight"> | number | null
    verticalRate?: FloatNullableFilter<"Flight"> | number | null
    onGround?: BoolFilter<"Flight"> | boolean
    lastUpdate?: DateTimeNullableFilter<"Flight"> | Date | string | null
    riskScore?: IntFilter<"Flight"> | number
    weather?: StringFilter<"Flight"> | string
    atcLoad?: StringFilter<"Flight"> | string
  }

  export type AirlineHubUpsertWithWhereUniqueWithoutAirlineInput = {
    where: AirlineHubWhereUniqueInput
    update: XOR<AirlineHubUpdateWithoutAirlineInput, AirlineHubUncheckedUpdateWithoutAirlineInput>
    create: XOR<AirlineHubCreateWithoutAirlineInput, AirlineHubUncheckedCreateWithoutAirlineInput>
  }

  export type AirlineHubUpdateWithWhereUniqueWithoutAirlineInput = {
    where: AirlineHubWhereUniqueInput
    data: XOR<AirlineHubUpdateWithoutAirlineInput, AirlineHubUncheckedUpdateWithoutAirlineInput>
  }

  export type AirlineHubUpdateManyWithWhereWithoutAirlineInput = {
    where: AirlineHubScalarWhereInput
    data: XOR<AirlineHubUpdateManyMutationInput, AirlineHubUncheckedUpdateManyWithoutAirlineInput>
  }

  export type AirlineHubScalarWhereInput = {
    AND?: AirlineHubScalarWhereInput | AirlineHubScalarWhereInput[]
    OR?: AirlineHubScalarWhereInput[]
    NOT?: AirlineHubScalarWhereInput | AirlineHubScalarWhereInput[]
    id?: StringFilter<"AirlineHub"> | string
    airlineId?: StringFilter<"AirlineHub"> | string
    airportId?: StringFilter<"AirlineHub"> | string
    createdAt?: DateTimeFilter<"AirlineHub"> | Date | string
  }

  export type FlightRouteUpsertWithWhereUniqueWithoutAirlineInput = {
    where: FlightRouteWhereUniqueInput
    update: XOR<FlightRouteUpdateWithoutAirlineInput, FlightRouteUncheckedUpdateWithoutAirlineInput>
    create: XOR<FlightRouteCreateWithoutAirlineInput, FlightRouteUncheckedCreateWithoutAirlineInput>
  }

  export type FlightRouteUpdateWithWhereUniqueWithoutAirlineInput = {
    where: FlightRouteWhereUniqueInput
    data: XOR<FlightRouteUpdateWithoutAirlineInput, FlightRouteUncheckedUpdateWithoutAirlineInput>
  }

  export type FlightRouteUpdateManyWithWhereWithoutAirlineInput = {
    where: FlightRouteScalarWhereInput
    data: XOR<FlightRouteUpdateManyMutationInput, FlightRouteUncheckedUpdateManyWithoutAirlineInput>
  }

  export type FlightRouteScalarWhereInput = {
    AND?: FlightRouteScalarWhereInput | FlightRouteScalarWhereInput[]
    OR?: FlightRouteScalarWhereInput[]
    NOT?: FlightRouteScalarWhereInput | FlightRouteScalarWhereInput[]
    id?: StringFilter<"FlightRoute"> | string
    airlineId?: StringFilter<"FlightRoute"> | string
    originId?: StringFilter<"FlightRoute"> | string
    destinationId?: StringFilter<"FlightRoute"> | string
    distance?: IntFilter<"FlightRoute"> | number
    duration?: FloatFilter<"FlightRoute"> | number
    frequency?: StringFilter<"FlightRoute"> | string
    createdAt?: DateTimeFilter<"FlightRoute"> | Date | string
    updatedAt?: DateTimeFilter<"FlightRoute"> | Date | string
  }

  export type AirlineCreateWithoutHubsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightCreateNestedManyWithoutAirlineInput
    routes?: FlightRouteCreateNestedManyWithoutAirlineInput
  }

  export type AirlineUncheckedCreateWithoutHubsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightUncheckedCreateNestedManyWithoutAirlineInput
    routes?: FlightRouteUncheckedCreateNestedManyWithoutAirlineInput
  }

  export type AirlineCreateOrConnectWithoutHubsInput = {
    where: AirlineWhereUniqueInput
    create: XOR<AirlineCreateWithoutHubsInput, AirlineUncheckedCreateWithoutHubsInput>
  }

  export type AirportCreateWithoutHubsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightCreateNestedManyWithoutDepartureInput
    arrivalFlights?: FlightCreateNestedManyWithoutArrivalInput
    routeOrigins?: FlightRouteCreateNestedManyWithoutOriginInput
    routeDestinations?: FlightRouteCreateNestedManyWithoutDestinationInput
  }

  export type AirportUncheckedCreateWithoutHubsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightUncheckedCreateNestedManyWithoutDepartureInput
    arrivalFlights?: FlightUncheckedCreateNestedManyWithoutArrivalInput
    routeOrigins?: FlightRouteUncheckedCreateNestedManyWithoutOriginInput
    routeDestinations?: FlightRouteUncheckedCreateNestedManyWithoutDestinationInput
  }

  export type AirportCreateOrConnectWithoutHubsInput = {
    where: AirportWhereUniqueInput
    create: XOR<AirportCreateWithoutHubsInput, AirportUncheckedCreateWithoutHubsInput>
  }

  export type AirlineUpsertWithoutHubsInput = {
    update: XOR<AirlineUpdateWithoutHubsInput, AirlineUncheckedUpdateWithoutHubsInput>
    create: XOR<AirlineCreateWithoutHubsInput, AirlineUncheckedCreateWithoutHubsInput>
    where?: AirlineWhereInput
  }

  export type AirlineUpdateToOneWithWhereWithoutHubsInput = {
    where?: AirlineWhereInput
    data: XOR<AirlineUpdateWithoutHubsInput, AirlineUncheckedUpdateWithoutHubsInput>
  }

  export type AirlineUpdateWithoutHubsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUpdateManyWithoutAirlineNestedInput
    routes?: FlightRouteUpdateManyWithoutAirlineNestedInput
  }

  export type AirlineUncheckedUpdateWithoutHubsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUncheckedUpdateManyWithoutAirlineNestedInput
    routes?: FlightRouteUncheckedUpdateManyWithoutAirlineNestedInput
  }

  export type AirportUpsertWithoutHubsInput = {
    update: XOR<AirportUpdateWithoutHubsInput, AirportUncheckedUpdateWithoutHubsInput>
    create: XOR<AirportCreateWithoutHubsInput, AirportUncheckedCreateWithoutHubsInput>
    where?: AirportWhereInput
  }

  export type AirportUpdateToOneWithWhereWithoutHubsInput = {
    where?: AirportWhereInput
    data: XOR<AirportUpdateWithoutHubsInput, AirportUncheckedUpdateWithoutHubsInput>
  }

  export type AirportUpdateWithoutHubsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUpdateManyWithoutDepartureNestedInput
    arrivalFlights?: FlightUpdateManyWithoutArrivalNestedInput
    routeOrigins?: FlightRouteUpdateManyWithoutOriginNestedInput
    routeDestinations?: FlightRouteUpdateManyWithoutDestinationNestedInput
  }

  export type AirportUncheckedUpdateWithoutHubsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUncheckedUpdateManyWithoutDepartureNestedInput
    arrivalFlights?: FlightUncheckedUpdateManyWithoutArrivalNestedInput
    routeOrigins?: FlightRouteUncheckedUpdateManyWithoutOriginNestedInput
    routeDestinations?: FlightRouteUncheckedUpdateManyWithoutDestinationNestedInput
  }

  export type FlightCreateWithoutDepartureInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    airline: AirlineCreateNestedOneWithoutFlightsInput
    arrival: AirportCreateNestedOneWithoutArrivalFlightsInput
    aircraft?: AircraftCreateNestedOneWithoutFlightsInput
    riskAssessment?: RiskAssessmentCreateNestedOneWithoutFlightInput
  }

  export type FlightUncheckedCreateWithoutDepartureInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    airlineId: string
    arrivalId: string
    aircraftId?: string | null
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    riskAssessment?: RiskAssessmentUncheckedCreateNestedOneWithoutFlightInput
  }

  export type FlightCreateOrConnectWithoutDepartureInput = {
    where: FlightWhereUniqueInput
    create: XOR<FlightCreateWithoutDepartureInput, FlightUncheckedCreateWithoutDepartureInput>
  }

  export type FlightCreateManyDepartureInputEnvelope = {
    data: FlightCreateManyDepartureInput | FlightCreateManyDepartureInput[]
  }

  export type FlightCreateWithoutArrivalInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    airline: AirlineCreateNestedOneWithoutFlightsInput
    departure: AirportCreateNestedOneWithoutDepartureFlightsInput
    aircraft?: AircraftCreateNestedOneWithoutFlightsInput
    riskAssessment?: RiskAssessmentCreateNestedOneWithoutFlightInput
  }

  export type FlightUncheckedCreateWithoutArrivalInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    airlineId: string
    departureId: string
    aircraftId?: string | null
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    riskAssessment?: RiskAssessmentUncheckedCreateNestedOneWithoutFlightInput
  }

  export type FlightCreateOrConnectWithoutArrivalInput = {
    where: FlightWhereUniqueInput
    create: XOR<FlightCreateWithoutArrivalInput, FlightUncheckedCreateWithoutArrivalInput>
  }

  export type FlightCreateManyArrivalInputEnvelope = {
    data: FlightCreateManyArrivalInput | FlightCreateManyArrivalInput[]
  }

  export type AirlineHubCreateWithoutAirportInput = {
    id?: string
    createdAt?: Date | string
    airline: AirlineCreateNestedOneWithoutHubsInput
  }

  export type AirlineHubUncheckedCreateWithoutAirportInput = {
    id?: string
    airlineId: string
    createdAt?: Date | string
  }

  export type AirlineHubCreateOrConnectWithoutAirportInput = {
    where: AirlineHubWhereUniqueInput
    create: XOR<AirlineHubCreateWithoutAirportInput, AirlineHubUncheckedCreateWithoutAirportInput>
  }

  export type AirlineHubCreateManyAirportInputEnvelope = {
    data: AirlineHubCreateManyAirportInput | AirlineHubCreateManyAirportInput[]
  }

  export type FlightRouteCreateWithoutOriginInput = {
    id?: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    airline: AirlineCreateNestedOneWithoutRoutesInput
    destination: AirportCreateNestedOneWithoutRouteDestinationsInput
  }

  export type FlightRouteUncheckedCreateWithoutOriginInput = {
    id?: string
    airlineId: string
    destinationId: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightRouteCreateOrConnectWithoutOriginInput = {
    where: FlightRouteWhereUniqueInput
    create: XOR<FlightRouteCreateWithoutOriginInput, FlightRouteUncheckedCreateWithoutOriginInput>
  }

  export type FlightRouteCreateManyOriginInputEnvelope = {
    data: FlightRouteCreateManyOriginInput | FlightRouteCreateManyOriginInput[]
  }

  export type FlightRouteCreateWithoutDestinationInput = {
    id?: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    airline: AirlineCreateNestedOneWithoutRoutesInput
    origin: AirportCreateNestedOneWithoutRouteOriginsInput
  }

  export type FlightRouteUncheckedCreateWithoutDestinationInput = {
    id?: string
    airlineId: string
    originId: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightRouteCreateOrConnectWithoutDestinationInput = {
    where: FlightRouteWhereUniqueInput
    create: XOR<FlightRouteCreateWithoutDestinationInput, FlightRouteUncheckedCreateWithoutDestinationInput>
  }

  export type FlightRouteCreateManyDestinationInputEnvelope = {
    data: FlightRouteCreateManyDestinationInput | FlightRouteCreateManyDestinationInput[]
  }

  export type FlightUpsertWithWhereUniqueWithoutDepartureInput = {
    where: FlightWhereUniqueInput
    update: XOR<FlightUpdateWithoutDepartureInput, FlightUncheckedUpdateWithoutDepartureInput>
    create: XOR<FlightCreateWithoutDepartureInput, FlightUncheckedCreateWithoutDepartureInput>
  }

  export type FlightUpdateWithWhereUniqueWithoutDepartureInput = {
    where: FlightWhereUniqueInput
    data: XOR<FlightUpdateWithoutDepartureInput, FlightUncheckedUpdateWithoutDepartureInput>
  }

  export type FlightUpdateManyWithWhereWithoutDepartureInput = {
    where: FlightScalarWhereInput
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyWithoutDepartureInput>
  }

  export type FlightUpsertWithWhereUniqueWithoutArrivalInput = {
    where: FlightWhereUniqueInput
    update: XOR<FlightUpdateWithoutArrivalInput, FlightUncheckedUpdateWithoutArrivalInput>
    create: XOR<FlightCreateWithoutArrivalInput, FlightUncheckedCreateWithoutArrivalInput>
  }

  export type FlightUpdateWithWhereUniqueWithoutArrivalInput = {
    where: FlightWhereUniqueInput
    data: XOR<FlightUpdateWithoutArrivalInput, FlightUncheckedUpdateWithoutArrivalInput>
  }

  export type FlightUpdateManyWithWhereWithoutArrivalInput = {
    where: FlightScalarWhereInput
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyWithoutArrivalInput>
  }

  export type AirlineHubUpsertWithWhereUniqueWithoutAirportInput = {
    where: AirlineHubWhereUniqueInput
    update: XOR<AirlineHubUpdateWithoutAirportInput, AirlineHubUncheckedUpdateWithoutAirportInput>
    create: XOR<AirlineHubCreateWithoutAirportInput, AirlineHubUncheckedCreateWithoutAirportInput>
  }

  export type AirlineHubUpdateWithWhereUniqueWithoutAirportInput = {
    where: AirlineHubWhereUniqueInput
    data: XOR<AirlineHubUpdateWithoutAirportInput, AirlineHubUncheckedUpdateWithoutAirportInput>
  }

  export type AirlineHubUpdateManyWithWhereWithoutAirportInput = {
    where: AirlineHubScalarWhereInput
    data: XOR<AirlineHubUpdateManyMutationInput, AirlineHubUncheckedUpdateManyWithoutAirportInput>
  }

  export type FlightRouteUpsertWithWhereUniqueWithoutOriginInput = {
    where: FlightRouteWhereUniqueInput
    update: XOR<FlightRouteUpdateWithoutOriginInput, FlightRouteUncheckedUpdateWithoutOriginInput>
    create: XOR<FlightRouteCreateWithoutOriginInput, FlightRouteUncheckedCreateWithoutOriginInput>
  }

  export type FlightRouteUpdateWithWhereUniqueWithoutOriginInput = {
    where: FlightRouteWhereUniqueInput
    data: XOR<FlightRouteUpdateWithoutOriginInput, FlightRouteUncheckedUpdateWithoutOriginInput>
  }

  export type FlightRouteUpdateManyWithWhereWithoutOriginInput = {
    where: FlightRouteScalarWhereInput
    data: XOR<FlightRouteUpdateManyMutationInput, FlightRouteUncheckedUpdateManyWithoutOriginInput>
  }

  export type FlightRouteUpsertWithWhereUniqueWithoutDestinationInput = {
    where: FlightRouteWhereUniqueInput
    update: XOR<FlightRouteUpdateWithoutDestinationInput, FlightRouteUncheckedUpdateWithoutDestinationInput>
    create: XOR<FlightRouteCreateWithoutDestinationInput, FlightRouteUncheckedCreateWithoutDestinationInput>
  }

  export type FlightRouteUpdateWithWhereUniqueWithoutDestinationInput = {
    where: FlightRouteWhereUniqueInput
    data: XOR<FlightRouteUpdateWithoutDestinationInput, FlightRouteUncheckedUpdateWithoutDestinationInput>
  }

  export type FlightRouteUpdateManyWithWhereWithoutDestinationInput = {
    where: FlightRouteScalarWhereInput
    data: XOR<FlightRouteUpdateManyMutationInput, FlightRouteUncheckedUpdateManyWithoutDestinationInput>
  }

  export type FlightCreateWithoutAircraftInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    airline: AirlineCreateNestedOneWithoutFlightsInput
    departure: AirportCreateNestedOneWithoutDepartureFlightsInput
    arrival: AirportCreateNestedOneWithoutArrivalFlightsInput
    riskAssessment?: RiskAssessmentCreateNestedOneWithoutFlightInput
  }

  export type FlightUncheckedCreateWithoutAircraftInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    airlineId: string
    departureId: string
    arrivalId: string
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    riskAssessment?: RiskAssessmentUncheckedCreateNestedOneWithoutFlightInput
  }

  export type FlightCreateOrConnectWithoutAircraftInput = {
    where: FlightWhereUniqueInput
    create: XOR<FlightCreateWithoutAircraftInput, FlightUncheckedCreateWithoutAircraftInput>
  }

  export type FlightCreateManyAircraftInputEnvelope = {
    data: FlightCreateManyAircraftInput | FlightCreateManyAircraftInput[]
  }

  export type FlightUpsertWithWhereUniqueWithoutAircraftInput = {
    where: FlightWhereUniqueInput
    update: XOR<FlightUpdateWithoutAircraftInput, FlightUncheckedUpdateWithoutAircraftInput>
    create: XOR<FlightCreateWithoutAircraftInput, FlightUncheckedCreateWithoutAircraftInput>
  }

  export type FlightUpdateWithWhereUniqueWithoutAircraftInput = {
    where: FlightWhereUniqueInput
    data: XOR<FlightUpdateWithoutAircraftInput, FlightUncheckedUpdateWithoutAircraftInput>
  }

  export type FlightUpdateManyWithWhereWithoutAircraftInput = {
    where: FlightScalarWhereInput
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyWithoutAircraftInput>
  }

  export type AirlineCreateWithoutRoutesInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightCreateNestedManyWithoutAirlineInput
    hubs?: AirlineHubCreateNestedManyWithoutAirlineInput
  }

  export type AirlineUncheckedCreateWithoutRoutesInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    country: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightUncheckedCreateNestedManyWithoutAirlineInput
    hubs?: AirlineHubUncheckedCreateNestedManyWithoutAirlineInput
  }

  export type AirlineCreateOrConnectWithoutRoutesInput = {
    where: AirlineWhereUniqueInput
    create: XOR<AirlineCreateWithoutRoutesInput, AirlineUncheckedCreateWithoutRoutesInput>
  }

  export type AirportCreateWithoutRouteOriginsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightCreateNestedManyWithoutDepartureInput
    arrivalFlights?: FlightCreateNestedManyWithoutArrivalInput
    hubs?: AirlineHubCreateNestedManyWithoutAirportInput
    routeDestinations?: FlightRouteCreateNestedManyWithoutDestinationInput
  }

  export type AirportUncheckedCreateWithoutRouteOriginsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightUncheckedCreateNestedManyWithoutDepartureInput
    arrivalFlights?: FlightUncheckedCreateNestedManyWithoutArrivalInput
    hubs?: AirlineHubUncheckedCreateNestedManyWithoutAirportInput
    routeDestinations?: FlightRouteUncheckedCreateNestedManyWithoutDestinationInput
  }

  export type AirportCreateOrConnectWithoutRouteOriginsInput = {
    where: AirportWhereUniqueInput
    create: XOR<AirportCreateWithoutRouteOriginsInput, AirportUncheckedCreateWithoutRouteOriginsInput>
  }

  export type AirportCreateWithoutRouteDestinationsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightCreateNestedManyWithoutDepartureInput
    arrivalFlights?: FlightCreateNestedManyWithoutArrivalInput
    hubs?: AirlineHubCreateNestedManyWithoutAirportInput
    routeOrigins?: FlightRouteCreateNestedManyWithoutOriginInput
  }

  export type AirportUncheckedCreateWithoutRouteDestinationsInput = {
    id?: string
    name: string
    iataCode: string
    icaoCode: string
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
    altitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    departureFlights?: FlightUncheckedCreateNestedManyWithoutDepartureInput
    arrivalFlights?: FlightUncheckedCreateNestedManyWithoutArrivalInput
    hubs?: AirlineHubUncheckedCreateNestedManyWithoutAirportInput
    routeOrigins?: FlightRouteUncheckedCreateNestedManyWithoutOriginInput
  }

  export type AirportCreateOrConnectWithoutRouteDestinationsInput = {
    where: AirportWhereUniqueInput
    create: XOR<AirportCreateWithoutRouteDestinationsInput, AirportUncheckedCreateWithoutRouteDestinationsInput>
  }

  export type AirlineUpsertWithoutRoutesInput = {
    update: XOR<AirlineUpdateWithoutRoutesInput, AirlineUncheckedUpdateWithoutRoutesInput>
    create: XOR<AirlineCreateWithoutRoutesInput, AirlineUncheckedCreateWithoutRoutesInput>
    where?: AirlineWhereInput
  }

  export type AirlineUpdateToOneWithWhereWithoutRoutesInput = {
    where?: AirlineWhereInput
    data: XOR<AirlineUpdateWithoutRoutesInput, AirlineUncheckedUpdateWithoutRoutesInput>
  }

  export type AirlineUpdateWithoutRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUpdateManyWithoutAirlineNestedInput
    hubs?: AirlineHubUpdateManyWithoutAirlineNestedInput
  }

  export type AirlineUncheckedUpdateWithoutRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUncheckedUpdateManyWithoutAirlineNestedInput
    hubs?: AirlineHubUncheckedUpdateManyWithoutAirlineNestedInput
  }

  export type AirportUpsertWithoutRouteOriginsInput = {
    update: XOR<AirportUpdateWithoutRouteOriginsInput, AirportUncheckedUpdateWithoutRouteOriginsInput>
    create: XOR<AirportCreateWithoutRouteOriginsInput, AirportUncheckedCreateWithoutRouteOriginsInput>
    where?: AirportWhereInput
  }

  export type AirportUpdateToOneWithWhereWithoutRouteOriginsInput = {
    where?: AirportWhereInput
    data: XOR<AirportUpdateWithoutRouteOriginsInput, AirportUncheckedUpdateWithoutRouteOriginsInput>
  }

  export type AirportUpdateWithoutRouteOriginsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUpdateManyWithoutDepartureNestedInput
    arrivalFlights?: FlightUpdateManyWithoutArrivalNestedInput
    hubs?: AirlineHubUpdateManyWithoutAirportNestedInput
    routeDestinations?: FlightRouteUpdateManyWithoutDestinationNestedInput
  }

  export type AirportUncheckedUpdateWithoutRouteOriginsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUncheckedUpdateManyWithoutDepartureNestedInput
    arrivalFlights?: FlightUncheckedUpdateManyWithoutArrivalNestedInput
    hubs?: AirlineHubUncheckedUpdateManyWithoutAirportNestedInput
    routeDestinations?: FlightRouteUncheckedUpdateManyWithoutDestinationNestedInput
  }

  export type AirportUpsertWithoutRouteDestinationsInput = {
    update: XOR<AirportUpdateWithoutRouteDestinationsInput, AirportUncheckedUpdateWithoutRouteDestinationsInput>
    create: XOR<AirportCreateWithoutRouteDestinationsInput, AirportUncheckedCreateWithoutRouteDestinationsInput>
    where?: AirportWhereInput
  }

  export type AirportUpdateToOneWithWhereWithoutRouteDestinationsInput = {
    where?: AirportWhereInput
    data: XOR<AirportUpdateWithoutRouteDestinationsInput, AirportUncheckedUpdateWithoutRouteDestinationsInput>
  }

  export type AirportUpdateWithoutRouteDestinationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUpdateManyWithoutDepartureNestedInput
    arrivalFlights?: FlightUpdateManyWithoutArrivalNestedInput
    hubs?: AirlineHubUpdateManyWithoutAirportNestedInput
    routeOrigins?: FlightRouteUpdateManyWithoutOriginNestedInput
  }

  export type AirportUncheckedUpdateWithoutRouteDestinationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureFlights?: FlightUncheckedUpdateManyWithoutDepartureNestedInput
    arrivalFlights?: FlightUncheckedUpdateManyWithoutArrivalNestedInput
    hubs?: AirlineHubUncheckedUpdateManyWithoutAirportNestedInput
    routeOrigins?: FlightRouteUncheckedUpdateManyWithoutOriginNestedInput
  }

  export type FlightCreateWithoutRiskAssessmentInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
    airline: AirlineCreateNestedOneWithoutFlightsInput
    departure: AirportCreateNestedOneWithoutDepartureFlightsInput
    arrival: AirportCreateNestedOneWithoutArrivalFlightsInput
    aircraft?: AircraftCreateNestedOneWithoutFlightsInput
  }

  export type FlightUncheckedCreateWithoutRiskAssessmentInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    airlineId: string
    departureId: string
    arrivalId: string
    aircraftId?: string | null
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
  }

  export type FlightCreateOrConnectWithoutRiskAssessmentInput = {
    where: FlightWhereUniqueInput
    create: XOR<FlightCreateWithoutRiskAssessmentInput, FlightUncheckedCreateWithoutRiskAssessmentInput>
  }

  export type FlightUpsertWithoutRiskAssessmentInput = {
    update: XOR<FlightUpdateWithoutRiskAssessmentInput, FlightUncheckedUpdateWithoutRiskAssessmentInput>
    create: XOR<FlightCreateWithoutRiskAssessmentInput, FlightUncheckedCreateWithoutRiskAssessmentInput>
    where?: FlightWhereInput
  }

  export type FlightUpdateToOneWithWhereWithoutRiskAssessmentInput = {
    where?: FlightWhereInput
    data: XOR<FlightUpdateWithoutRiskAssessmentInput, FlightUncheckedUpdateWithoutRiskAssessmentInput>
  }

  export type FlightUpdateWithoutRiskAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    airline?: AirlineUpdateOneRequiredWithoutFlightsNestedInput
    departure?: AirportUpdateOneRequiredWithoutDepartureFlightsNestedInput
    arrival?: AirportUpdateOneRequiredWithoutArrivalFlightsNestedInput
    aircraft?: AircraftUpdateOneWithoutFlightsNestedInput
  }

  export type FlightUncheckedUpdateWithoutRiskAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airlineId?: StringFieldUpdateOperationsInput | string
    departureId?: StringFieldUpdateOperationsInput | string
    arrivalId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
  }

  export type FlightCreateManyAirlineInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    departureId: string
    arrivalId: string
    aircraftId?: string | null
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
  }

  export type AirlineHubCreateManyAirlineInput = {
    id?: string
    airportId: string
    createdAt?: Date | string
  }

  export type FlightRouteCreateManyAirlineInput = {
    id?: string
    originId: string
    destinationId: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightUpdateWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    departure?: AirportUpdateOneRequiredWithoutDepartureFlightsNestedInput
    arrival?: AirportUpdateOneRequiredWithoutArrivalFlightsNestedInput
    aircraft?: AircraftUpdateOneWithoutFlightsNestedInput
    riskAssessment?: RiskAssessmentUpdateOneWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureId?: StringFieldUpdateOperationsInput | string
    arrivalId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    riskAssessment?: RiskAssessmentUncheckedUpdateOneWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateManyWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureId?: StringFieldUpdateOperationsInput | string
    arrivalId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
  }

  export type AirlineHubUpdateWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airport?: AirportUpdateOneRequiredWithoutHubsNestedInput
  }

  export type AirlineHubUncheckedUpdateWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    airportId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirlineHubUncheckedUpdateManyWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    airportId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightRouteUpdateWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    origin?: AirportUpdateOneRequiredWithoutRouteOriginsNestedInput
    destination?: AirportUpdateOneRequiredWithoutRouteDestinationsNestedInput
  }

  export type FlightRouteUncheckedUpdateWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightRouteUncheckedUpdateManyWithoutAirlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightCreateManyDepartureInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    airlineId: string
    arrivalId: string
    aircraftId?: string | null
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
  }

  export type FlightCreateManyArrivalInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    airlineId: string
    departureId: string
    aircraftId?: string | null
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
  }

  export type AirlineHubCreateManyAirportInput = {
    id?: string
    airlineId: string
    createdAt?: Date | string
  }

  export type FlightRouteCreateManyOriginInput = {
    id?: string
    airlineId: string
    destinationId: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightRouteCreateManyDestinationInput = {
    id?: string
    airlineId: string
    originId: string
    distance: number
    duration: number
    frequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightUpdateWithoutDepartureInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    airline?: AirlineUpdateOneRequiredWithoutFlightsNestedInput
    arrival?: AirportUpdateOneRequiredWithoutArrivalFlightsNestedInput
    aircraft?: AircraftUpdateOneWithoutFlightsNestedInput
    riskAssessment?: RiskAssessmentUpdateOneWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateWithoutDepartureInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airlineId?: StringFieldUpdateOperationsInput | string
    arrivalId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    riskAssessment?: RiskAssessmentUncheckedUpdateOneWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateManyWithoutDepartureInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airlineId?: StringFieldUpdateOperationsInput | string
    arrivalId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
  }

  export type FlightUpdateWithoutArrivalInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    airline?: AirlineUpdateOneRequiredWithoutFlightsNestedInput
    departure?: AirportUpdateOneRequiredWithoutDepartureFlightsNestedInput
    aircraft?: AircraftUpdateOneWithoutFlightsNestedInput
    riskAssessment?: RiskAssessmentUpdateOneWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateWithoutArrivalInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airlineId?: StringFieldUpdateOperationsInput | string
    departureId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    riskAssessment?: RiskAssessmentUncheckedUpdateOneWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateManyWithoutArrivalInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airlineId?: StringFieldUpdateOperationsInput | string
    departureId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
  }

  export type AirlineHubUpdateWithoutAirportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airline?: AirlineUpdateOneRequiredWithoutHubsNestedInput
  }

  export type AirlineHubUncheckedUpdateWithoutAirportInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirlineHubUncheckedUpdateManyWithoutAirportInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightRouteUpdateWithoutOriginInput = {
    id?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airline?: AirlineUpdateOneRequiredWithoutRoutesNestedInput
    destination?: AirportUpdateOneRequiredWithoutRouteDestinationsNestedInput
  }

  export type FlightRouteUncheckedUpdateWithoutOriginInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightRouteUncheckedUpdateManyWithoutOriginInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightRouteUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airline?: AirlineUpdateOneRequiredWithoutRoutesNestedInput
    origin?: AirportUpdateOneRequiredWithoutRouteOriginsNestedInput
  }

  export type FlightRouteUncheckedUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightRouteUncheckedUpdateManyWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    airlineId?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    distance?: IntFieldUpdateOperationsInput | number
    duration?: FloatFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightCreateManyAircraftInput = {
    id?: string
    flightNumber: string
    iataCode: string
    icaoCode: string
    status?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    airlineId: string
    departureId: string
    arrivalId: string
    departureTime: Date | string
    arrivalTime: Date | string
    departureDelay?: number
    arrivalDelay?: number
    departureTerminal?: string | null
    arrivalTerminal?: string | null
    departureGate?: string | null
    arrivalGate?: string | null
    departureRunway?: string | null
    arrivalRunway?: string | null
    baggageClaim?: string | null
    latitude?: number | null
    longitude?: number | null
    altitude?: number | null
    speed?: number | null
    heading?: number | null
    verticalRate?: number | null
    onGround?: boolean
    lastUpdate?: Date | string | null
    riskScore?: number
    weather?: string
    atcLoad?: string
  }

  export type FlightUpdateWithoutAircraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    airline?: AirlineUpdateOneRequiredWithoutFlightsNestedInput
    departure?: AirportUpdateOneRequiredWithoutDepartureFlightsNestedInput
    arrival?: AirportUpdateOneRequiredWithoutArrivalFlightsNestedInput
    riskAssessment?: RiskAssessmentUpdateOneWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateWithoutAircraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airlineId?: StringFieldUpdateOperationsInput | string
    departureId?: StringFieldUpdateOperationsInput | string
    arrivalId?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
    riskAssessment?: RiskAssessmentUncheckedUpdateOneWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateManyWithoutAircraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    flightNumber?: StringFieldUpdateOperationsInput | string
    iataCode?: StringFieldUpdateOperationsInput | string
    icaoCode?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    airlineId?: StringFieldUpdateOperationsInput | string
    departureId?: StringFieldUpdateOperationsInput | string
    arrivalId?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    departureDelay?: IntFieldUpdateOperationsInput | number
    arrivalDelay?: IntFieldUpdateOperationsInput | number
    departureTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalTerminal?: NullableStringFieldUpdateOperationsInput | string | null
    departureGate?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalGate?: NullableStringFieldUpdateOperationsInput | string | null
    departureRunway?: NullableStringFieldUpdateOperationsInput | string | null
    arrivalRunway?: NullableStringFieldUpdateOperationsInput | string | null
    baggageClaim?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    verticalRate?: NullableFloatFieldUpdateOperationsInput | number | null
    onGround?: BoolFieldUpdateOperationsInput | boolean
    lastUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    riskScore?: IntFieldUpdateOperationsInput | number
    weather?: StringFieldUpdateOperationsInput | string
    atcLoad?: StringFieldUpdateOperationsInput | string
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