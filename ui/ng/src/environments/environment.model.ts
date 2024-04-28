
type Path = `/${string}.php`;

export type Environment = {
  production: boolean;
  api: {
    baseUrl: string;
    path: {
      auth: Path;
      mail: Path;
      joke: Path;
      maintenance: Path;
      page: Path;
    }
  };
  app: {
    /** Title that can be seen on browser's title bar */
    title: string;
  }
  slideshow: {
    /** Minimum time per joke in seconds */
    minimumTimePerJoke: number,
    /**
     * Additional cost factor per character
     * @example The total time per joke is: minimumTimePerJoke * ( 1 + charCount * perCharCostFactor);
     */
    perCharCostFactor: number,
    /** Time precision in milliseconds */
    timerPrecision: number,
  },
  /** support email, used in the footer and in the contribute form */
  supportEmail: `${string}@${string}.${string}`;
};
