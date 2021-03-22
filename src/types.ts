import { CSSProperties } from "react";

export interface UseTable extends Pick<TableProps, "events" | "attributes"> {
  head?: Thread;
  body?: Thread;
  foot?: Thread;
  tableElement: React.RefObject<HTMLTableElement>;
  theadElement: React.RefObject<HTMLTableSectionElement>;
  tbodyElement: React.RefObject<HTMLTableSectionElement>;
  tfootElement: React.RefObject<HTMLTableSectionElement>;
}

export interface ColChildren {
  tag: string;
  content?: string;
  children?: ColChildren | Array<ColChildren>;
  identifier?: string;
  inlineStyles?: CSSProperties;
  attributes?:
    | {
        name: string;
        value?: string;
      }
    | Array<{
        name: string;
        value?: string;
      }>;
  styles?:
    | string
    | {
        className: string;
        module: CSSModule;
      };
  events?:
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
}

export interface Col extends Omit<ColChildren, "tag"> {
  hidden?: boolean;
  colSpan?: number;
}

export type Rows = Array<
  Pick<ColChildren, "identifier" | "events" | "styles" | "inlineStyles"> & {
    td: Pick<ColChildren, "styles" | "inlineStyles"> & {
      cols: Array<Col>;
    };
  }
>;

export type Thread = Pick<
  ColChildren,
  "attributes" | "styles" | "inlineStyles"
> & {
  tr: Pick<ColChildren, "attributes" | "styles" | "inlineStyles"> & {
    rows: Rows;
  };
};

export type ThreadProps = Pick<
  ColChildren,
  "identifier" | "events" | "styles" | "inlineStyles"
> & {
  id?: string;
  rows?: Rows;
  caption?: Pick<ColChildren, "content" | "styles" | "inlineStyles">;
  threadTag?: boolean;
  defaultTableId?: string;
};

export type TableProps = Pick<
  ColChildren,
  "attributes" | "events" | "styles" | "inlineStyles"
> &
  Pick<ThreadProps, "id" | "caption" | "threadTag"> & {
    head?: Thread;
    body?: Thread;
    foot?: Thread;
    colGroup?: Array<
      Pick<ColChildren, "styles" | "inlineStyles"> & {
        span?: number;
      }
    >;
  };

export type CSSModule = {
  readonly [key: string]: string;
};
