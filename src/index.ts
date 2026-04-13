/**
 * pipe-kit — builder fluente de pipeline assíncrono type-safe.
 */

type Step<I, O> = (input: I) => Promise<O> | O;

export class Pipeline<I, O> {
  private constructor(private readonly run: (input: I) => Promise<O>) {}

  static create<T>(): Pipeline<T, T> {
    return new Pipeline<T, T>(async (x) => x);
  }

  pipe<N>(step: Step<O, N>): Pipeline<I, N> {
    const prev = this.run;
    return new Pipeline<I, N>(async (input: I) => {
      const mid = await prev(input);
      return await step(mid);
    });
  }

  tap(side: (value: O) => void | Promise<void>): Pipeline<I, O> {
    return this.pipe(async (v) => {
      await side(v);
      return v;
    });
  }

  filter(pred: (value: O) => boolean, fallback: O): Pipeline<I, O> {
    return this.pipe((v) => (pred(v) ? v : fallback));
  }

  catch<F>(handler: (err: unknown, input: I) => Promise<F> | F): Pipeline<I, O | F> {
    const prev = this.run;
    return new Pipeline<I, O | F>(async (input: I) => {
      try {
        return await prev(input);
      } catch (err) {
        return await handler(err, input);
      }
    });
  }

  build(): (input: I) => Promise<O> {
    return this.run;
  }

  async execute(input: I): Promise<O> {
    return this.run(input);
  }
}

export function pipeline<T>(): Pipeline<T, T> {
  return Pipeline.create<T>();
}
