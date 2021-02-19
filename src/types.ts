import { CSSProperties } from "react";

export type CSSModule = {
  readonly [key: string]: string;
};

export interface ApplyCSSModule {
  className: string;
  styles?: CSSModule;
  defaultStyles: CSSModule;
}

export interface ColChildren {
  tag: string;
  identifier?: string;
  content?: string;
  attribute?: Array<{
    name: string;
    value?: string;
  }>;
  inlineStyles?: CSSProperties;
  styles?:
    | string
    | {
        className: string;
        module?: CSSModule;
      };
  event?:
    | {
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }
    | Array<{
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }>;
  children?: ColChildren | Array<ColChildren>;
}

export interface Col {
  identifier?: string;
  hidden?: boolean;
  content?: string;
  colSpan?: number;
  attribute?: Array<{
    name: string;
    value?: string;
  }>;
  inlineStyles?: CSSProperties;
  styles?:
    | string
    | {
        className: string;
        module?: CSSModule;
      };
  event?:
    | {
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }
    | Array<{
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }>;
  children?: ColChildren | Array<ColChildren>;
}

export type Rows = Array<{
  identifier?: string;
  inlineStyles?: CSSProperties;
  styles?:
    | string
    | {
        className: string;
        module?: CSSModule;
      };
  td: {
    inlineStyles?: CSSProperties;
    styles?:
      | string
      | {
          className: string;
          module?: CSSModule;
        };
    cols: Array<Col>;
  };
  event?:
    | {
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }
    | Array<{
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }>;
}>;

export type Thread = {
  isLoading?: boolean;
  attribute?: Array<{
    name: string;
    value?: string;
  }>;
  inlineStyles?: CSSProperties;
  styles?:
    | string
    | {
        className: string;
        module?: CSSModule;
      };
  tr: {
    attribute?: Array<{
      name: string;
      value?: string;
    }>;
    inlineStyles?: CSSProperties;
    styles?:
      | string
      | {
          className: string;
          module?: CSSModule;
        };
    rows: Rows;
  };
};

export type ThreadProps = {
  id?: string;
  defaultTableId?: string;
  isLoading?: boolean;
  caption?: {
    content: string;
    inlineStyles: CSSProperties;
    styles:
      | string
      | {
          className: string;
          module?: CSSModule;
        };
  };
  threadTag?: boolean;
  identifier?: string;
  rows?: Rows;
  inlineStyles?: CSSProperties;
  styles?:
    | string
    | {
        className: string;
        module?: CSSModule;
      };
  event?:
    | {
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }
    | Array<{
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }>;
};

export type TableProps = {
  id?: string;
  caption?: {
    content: string;
    inlineStyles?: CSSProperties;
    styles?:
      | string
      | {
          className: string;
          module?: CSSModule;
        };
  };
  threadTag?: boolean;
  colGroup?: Array<{
    span?: number;
    inlineStyles?: CSSProperties;
    styles?:
      | string
      | {
          className: string;
          module?: CSSModule;
        };
  }>;
  head?: Thread;
  body?: Thread;
  foot?: Thread;
  attribute?: Array<{
    name: string;
    value?: string;
  }>;
  inlineStyles?: CSSProperties;
  styles?:
    | string
    | {
        className: string;
        module?: CSSModule;
      };
  event?:
    | {
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }
    | Array<{
        listener: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: any;
        capturing?: boolean;
      }>;
};
