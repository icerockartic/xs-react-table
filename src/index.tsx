import React, { useEffect, useRef } from "react";
import { attachEventListeners, createThreadRows } from "./constructors";
import { usePrevious, useTable } from "./hooks";
import { TableProps, Thread, ThreadProps } from "./types";

const Head = ({
  rows,
  styles,
  caption,
  threadTag,
  inlineStyles,
}: ThreadProps): JSX.Element => {
  useEffect(() => attachEventListeners({ rows }), []);

  if (!threadTag) {
    return createThreadRows({
      rows,
      styles,
      caption,
      threadType: "head",
      inlineStyles,
    });
  }

  return createThreadRows({
    rows,
    styles,
    caption,
    useThTag: true,
    threadType: "head",
    inlineStyles,
  });
};

const Body = ({
  rows,
  styles,
  caption,
  inlineStyles,
}: ThreadProps): JSX.Element => {
  const previousRows = usePrevious(rows);

  useEffect(() => {
    attachEventListeners({ rows, previousRows });
  }, [rows, previousRows]);

  return createThreadRows({
    rows,
    styles,
    caption,
    threadType: "body",
    inlineStyles,
  });
};

const Foot = ({
  rows,
  styles,
  caption,
  inlineStyles,
}: ThreadProps): JSX.Element => {
  const previousRows = usePrevious(rows);

  useEffect(() => {
    attachEventListeners({ rows, previousRows });
  }, [rows, previousRows]);

  return createThreadRows({
    rows,
    styles,
    caption,
    threadType: "foot",
    inlineStyles,
  });
};

export const Table = ({
  id,
  head,
  body,
  foot,
  events,
  styles,
  caption,
  colGroup,
  threadTag,
  attributes,
  inlineStyles,
}: TableProps): JSX.Element => {
  const theadElement = useRef<HTMLTableSectionElement>(null);
  const tbodyElement = useRef<HTMLTableSectionElement>(null);
  const tfootElement = useRef<HTMLTableSectionElement>(null);
  const tableElement = useRef<HTMLTableElement>(null);

  // Add attributes, eventlisteners
  // Remove [tb-identifier=""]
  useTable({
    head,
    body,
    foot,
    events,
    attributes,
    theadElement,
    tbodyElement,
    tfootElement,
    tableElement,
  });

  return (
    <table
      ref={tableElement}
      id={id}
      style={inlineStyles}
      className={
        typeof styles === "string" ? styles : styles?.module[styles.className]
      }
    >
      {caption && (
        <caption
          style={inlineStyles}
          className={
            typeof caption.styles === "string"
              ? caption.styles
              : caption.styles?.module[caption.styles.className]
          }
        >
          {caption.content}
        </caption>
      )}

      {colGroup?.length && (
        <colgroup>
          {colGroup.map((col, colIndex) => (
            <col
              key={"Table_colgroup_col_" + colIndex}
              span={col.span}
              style={col.inlineStyles}
              className={
                typeof col.styles === "string"
                  ? col.styles
                  : col.styles?.module[col.styles.className]
              }
            />
          ))}
        </colgroup>
      )}

      {threadTag && head ? (
        <thead
          ref={theadElement}
          style={head?.inlineStyles}
          className={
            typeof head?.styles === "string"
              ? head.styles
              : head.styles?.module[head.styles.className]
          }
        >
          <Head
            rows={head?.tr.rows}
            styles={head?.tr.styles}
            threadTag={threadTag}
            inlineStyles={head?.tr.inlineStyles}
          />
        </thead>
      ) : (
        <Head
          rows={head?.tr.rows}
          styles={head?.tr.styles}
          threadTag={threadTag}
          inlineStyles={head?.tr.inlineStyles}
        />
      )}

      {threadTag && body ? (
        <tbody
          ref={tbodyElement}
          // tb-identifier={"Table_tbody_" + id}
          style={body?.inlineStyles}
          className={
            typeof body?.styles === "string"
              ? body.styles
              : body.styles?.module[body.styles.className]
          }
        >
          <Body
            id={id}
            rows={body.tr.rows}
            styles={body.tr.styles}
            inlineStyles={body.tr.inlineStyles}
          />
        </tbody>
      ) : (
        <Body
          id={id}
          rows={body?.tr.rows}
          styles={body?.tr.styles}
          inlineStyles={body?.tr.inlineStyles}
        />
      )}

      {threadTag && foot ? (
        <tfoot
          ref={tbodyElement}
          // tb-identifier={"Table_tfoot_" + id}
          style={foot?.inlineStyles}
          className={
            typeof foot?.styles === "string"
              ? foot.styles
              : foot.styles?.module[foot.styles.className]
          }
        >
          <Foot
            rows={foot?.tr.rows}
            styles={foot?.tr.styles}
            inlineStyles={foot?.tr.inlineStyles}
          />
        </tfoot>
      ) : (
        <Foot
          id={id}
          rows={foot?.tr.rows}
          styles={foot?.tr.styles}
          inlineStyles={foot?.tr.inlineStyles}
        />
      )}
    </table>
  );
};

export type { Thread };
