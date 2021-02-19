import faker from "faker";
import reactParse from "html-react-parser";
import { isArray } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  applyCSSModule,
  attachEventListener,
  createHTMLString,
} from "./constructors";
import { usePrevious } from "./hooks";
import defaultStyles from "./index.module.css";
import { TableProps, ThreadProps } from "./types";

const Head = ({
  threadTag,
  caption,
  rows,
  inlineStyles,
  styles,
}: ThreadProps): JSX.Element => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => attachEventListener({ rows }), []);

  if (!threadTag) {
    return (
      <>
        {rows?.map((row, rowIndex) => (
          <tr
            tb-identifier={row.identifier ?? ""}
            key={`Table_head_tr_${caption?.content ?? ""}_${rowIndex}`}
            style={inlineStyles}
            className={
              row.styles
                ? typeof row.styles === "string"
                  ? row.styles
                  : applyCSSModule({
                      className: row.styles?.className ?? "",
                      defaultStyles,
                      styles: row.styles?.module,
                    })
                : typeof styles === "string"
                ? styles
                : applyCSSModule({
                    className: styles?.className ?? "",
                    defaultStyles,
                    styles: styles?.module,
                  })
            }
          >
            {row.td.cols
              .filter((col) => !col.hidden)
              .map((col, colIndex) => (
                <td
                  tb-identifier={col.identifier ?? ""}
                  key={`Table_head_td_${caption?.content ?? ""}_${colIndex}`}
                  style={col.inlineStyles}
                  className={
                    col.styles
                      ? typeof col.styles === "string"
                        ? col.styles
                        : applyCSSModule({
                            className: col.styles?.className ?? "",
                            defaultStyles,
                            styles: col.styles?.module,
                          })
                      : typeof row.td.styles === "string"
                      ? row.td.styles
                      : applyCSSModule({
                          className: row.td.styles?.className ?? "",
                          defaultStyles,
                          styles: row.td.styles?.module,
                        })
                  }
                  colSpan={col.colSpan}
                >
                  {col.content}
                  {reactParse(
                    col.children
                      ? createHTMLString(col.children, defaultStyles)
                      : ""
                  )}
                </td>
              ))}
          </tr>
        ))}
      </>
    );
  }

  return (
    <>
      {rows?.map((row, rowIndex) => (
        <tr
          tb-identifier={row.identifier ?? ""}
          key={`Table_head_tr_${caption?.content ?? ""}_${rowIndex}`}
          style={inlineStyles}
          className={
            row.styles
              ? typeof row.styles === "string"
                ? row.styles
                : applyCSSModule({
                    className: row.styles?.className ?? "",
                    defaultStyles,
                    styles: row.styles?.module,
                  })
              : typeof styles === "string"
              ? styles
              : applyCSSModule({
                  className: styles?.className ?? "",
                  defaultStyles,
                  styles: styles?.module,
                })
          }
        >
          {row.td.cols
            .filter((col) => !col.hidden)
            .map((col, colIndex) => (
              <th
                tb-identifier={col.identifier ?? ""}
                key={`Table_head_th_${caption?.content ?? ""}_${colIndex}`}
                style={col.inlineStyles}
                className={
                  col.styles
                    ? typeof col.styles === "string"
                      ? col.styles
                      : applyCSSModule({
                          className: col.styles?.className ?? "",
                          defaultStyles,
                          styles: col.styles?.module,
                        })
                    : typeof row.td.styles === "string"
                    ? row.td.styles
                    : applyCSSModule({
                        className: row.td.styles?.className ?? "",
                        defaultStyles,
                        styles: row.td.styles?.module,
                      })
                }
                colSpan={col.colSpan}
              >
                {col.content}
                {reactParse(
                  col.children
                    ? createHTMLString(col.children, defaultStyles)
                    : ""
                )}
              </th>
            ))}
        </tr>
      ))}
    </>
  );
};

const Body = ({
  caption,
  rows,
  inlineStyles,
  styles,
}: ThreadProps): JSX.Element => {
  const previousRows = usePrevious(rows);
  useEffect(() => attachEventListener({ rows, previousRows }), [
    previousRows,
    rows,
  ]);

  return (
    <>
      {rows?.map((row, rowIndex) => (
        <tr
          tb-identifier={row.identifier ? row.identifier : ""}
          key={`Table_body_tr_${caption?.content ?? ""}_${rowIndex}`}
          style={inlineStyles}
          className={
            row.styles
              ? typeof row.styles === "string"
                ? row.styles
                : applyCSSModule({
                    className: row.styles?.className ?? "",
                    defaultStyles,
                    styles: row.styles?.module,
                  })
              : typeof styles === "string"
              ? styles
              : applyCSSModule({
                  className: styles?.className ?? "",
                  defaultStyles,
                  styles: styles?.module,
                })
          }
        >
          {row.td.cols
            .filter((col) => !col.hidden)
            .map((col, colIndex) => (
              <td
                tb-identifier={col.identifier ? col.identifier : ""}
                key={`Table_body_td_${caption?.content ?? ""}_${colIndex}`}
                style={col.inlineStyles}
                className={
                  col.styles
                    ? typeof col.styles === "string"
                      ? col.styles
                      : applyCSSModule({
                          className: col.styles?.className ?? "",
                          defaultStyles,
                          styles: col.styles?.module,
                        })
                    : typeof styles === "string"
                    ? styles
                    : applyCSSModule({
                        className: styles?.className ?? "",
                        defaultStyles,
                        styles: styles?.module,
                      })
                }
                colSpan={col.colSpan}
              >
                {col.content}
                {reactParse(
                  col.children
                    ? createHTMLString(col.children, defaultStyles)
                    : ""
                )}
              </td>
            ))}
        </tr>
      ))}
    </>
  );
};

const Foot = ({
  caption,
  rows,
  inlineStyles,
  styles,
}: ThreadProps): JSX.Element => {
  useEffect(() => attachEventListener({ rows }), [rows]);

  return (
    <>
      {rows?.map((row, rowIndex) => (
        <tr
          tb-identifier={row.identifier ?? ""}
          key={`Table_foot_tr_${caption?.content ?? ""}_${rowIndex}`}
          style={inlineStyles}
          className={
            row.styles
              ? typeof row.styles === "string"
                ? row.styles
                : applyCSSModule({
                    className: row.styles?.className ?? "",
                    defaultStyles,
                    styles: row.styles?.module,
                  })
              : typeof styles === "string"
              ? styles
              : applyCSSModule({
                  className: styles?.className ?? "",
                  defaultStyles,
                  styles: styles?.module,
                })
          }
        >
          {row.td.cols
            .filter((col) => !col.hidden)
            .map((col, colIndex) => (
              <td
                tb-identifier={col.identifier ?? ""}
                key={`Table_foot_td_${caption?.content ?? ""}_${colIndex}`}
                style={col.inlineStyles}
                className={
                  col.styles
                    ? typeof col.styles === "string"
                      ? col.styles
                      : applyCSSModule({
                          className: col.styles?.className ?? "",
                          defaultStyles,
                          styles: col.styles?.module,
                        })
                    : typeof row.td.styles === "string"
                    ? row.td.styles
                    : applyCSSModule({
                        className: row.td.styles?.className ?? "",
                        defaultStyles,
                        styles: row.td.styles?.module,
                      })
                }
                colSpan={col.colSpan}
              >
                {col.content}
                {reactParse(
                  col.children
                    ? createHTMLString(col.children, defaultStyles)
                    : ""
                )}
              </td>
            ))}
        </tr>
      ))}
    </>
  );
};

// body or foot props must not be mutated to undefined
// onced they are populated. If they must be mutated back
// to undefined, consider create another variable and keep the props as is
export const Table = ({
  id,
  caption,
  colGroup,
  head,
  body,
  foot,
  inlineStyles,
  styles,
  attribute,
  threadTag,
  event,
}: TableProps): JSX.Element => {
  const tableElement = useRef<HTMLTableElement>(null);
  const theadElement = useRef<HTMLTableSectionElement>(null);
  const tbodyElement = useRef<HTMLTableSectionElement>(null);
  const tfootElement = useRef<HTMLTableSectionElement>(null);

  const [defaultTableId, setDefaultTableId] = useState("");

  useEffect(() => {
    if (tableElement && attribute && attribute.length) {
      attribute.forEach((item) => {
        tableElement.current?.setAttribute(item.name, item.value ?? "");
      });
    }

    if (theadElement && head?.attribute && head.attribute.length) {
      head.attribute.forEach((item) => {
        theadElement.current?.setAttribute(item.name, item.value ?? "");
      });
    }

    if (tbodyElement && body?.attribute && body.attribute.length) {
      body.attribute.forEach((item) => {
        tbodyElement.current?.setAttribute(item.name, item.value ?? "");
      });
    }

    if (tfootElement && foot?.attribute && foot.attribute.length) {
      foot.attribute.forEach((item) => {
        tfootElement.current?.setAttribute(item.name, item.value ?? "");
      });
    }
  }, [attribute, body, foot, head, tableElement, theadElement]);

  useEffect(() => {
    if (tableElement && !isArray(event)) {
      tableElement.current?.addEventListener(
        event?.listener ?? "",
        event?.function
      );
    }

    if (tableElement && isArray(event)) {
      event.forEach((e) => {
        tableElement.current?.addEventListener(e.listener ?? "", e.function);
      });
    }
  }, [event]);

  // Remove [tb-identifier='']
  useEffect(() => {
    const emptyIdentifierAttributes = Array.from(
      document.querySelectorAll('[tb-identifier=""]')
    );
    if (emptyIdentifierAttributes.length) {
      emptyIdentifierAttributes.forEach((element) =>
        element.removeAttribute("tb-identifier")
      );
    }
  }, [head, body, foot]);

  // Set random id for <table>
  useEffect(() => {
    setDefaultTableId(faker.random.uuid());
  }, []);

  return (
    <>
      <table
        ref={tableElement}
        id={id ? "Table_" + id : defaultTableId}
        style={inlineStyles}
        className={
          typeof styles === "string"
            ? styles
            : applyCSSModule({
                className: styles?.className ?? "",
                defaultStyles,
                styles: styles?.module,
              })
        }
      >
        {caption ? (
          <caption
            style={inlineStyles}
            className={
              typeof caption.styles === "string"
                ? caption.styles
                : applyCSSModule({
                    className: caption.styles?.className ?? "",
                    defaultStyles,
                    styles: caption.styles?.module,
                  })
            }
          >
            {caption.content}
          </caption>
        ) : null}

        {colGroup?.length ? (
          <colgroup>
            {colGroup.map((col, colIndex) => (
              <col
                key={"Table_colgroup_col_" + colIndex}
                span={col.span ?? undefined}
                style={col.inlineStyles ?? undefined}
                className={
                  typeof col.styles === "string"
                    ? col.styles
                    : applyCSSModule({
                        className: col.styles?.className ?? "",
                        defaultStyles,
                        styles: col.styles?.module,
                      })
                }
              />
            ))}
          </colgroup>
        ) : null}

        {threadTag && head ? (
          <thead
            ref={theadElement}
            style={head?.inlineStyles}
            className={
              typeof head?.styles === "string"
                ? head.styles
                : applyCSSModule({
                    className: head?.styles?.className ?? "",
                    defaultStyles,
                    styles: head?.styles?.module,
                  })
            }
          >
            <Head
              defaultTableId={defaultTableId}
              threadTag={threadTag}
              rows={head?.tr.rows}
              inlineStyles={head?.tr.inlineStyles}
              styles={head?.tr.styles}
            />
          </thead>
        ) : (
          <Head
            defaultTableId={defaultTableId}
            threadTag={threadTag}
            rows={head?.tr.rows}
            inlineStyles={head?.tr.inlineStyles}
            styles={head?.tr.styles}
          />
        )}

        {threadTag && body ? (
          <tbody
            ref={tbodyElement}
            tb-identifier={
              "Table_tbody_" + id ?? "Table_tbody_" + defaultTableId
            }
            style={body?.inlineStyles}
            className={
              typeof body?.styles === "string"
                ? body.styles
                : applyCSSModule({
                    className: body?.styles?.className ?? "",
                    defaultStyles,
                    styles: body?.styles?.module,
                  })
            }
          >
            <Body
              id={id}
              isLoading={body.isLoading}
              defaultTableId={defaultTableId}
              rows={body.tr.rows}
              inlineStyles={body.tr.inlineStyles}
              styles={body.tr.styles}
            />
          </tbody>
        ) : (
          <Body
            id={id}
            isLoading={body?.isLoading}
            defaultTableId={defaultTableId}
            rows={body?.tr.rows}
            inlineStyles={body?.tr.inlineStyles}
            styles={body?.tr.styles}
          />
        )}

        {threadTag && foot ? (
          <tfoot
            ref={tbodyElement}
            tb-identifier={
              "Table_tfoot_" + id ?? "Table_tfoot_" + defaultTableId
            }
            style={foot?.inlineStyles}
            className={
              typeof foot?.styles === "string"
                ? foot.styles
                : applyCSSModule({
                    className: foot?.styles?.className ?? "",
                    defaultStyles,
                    styles: foot?.styles?.module,
                  })
            }
          >
            <Foot
              rows={foot?.tr.rows}
              isLoading={body?.isLoading}
              inlineStyles={foot?.tr.inlineStyles}
              styles={foot?.tr.styles}
            />
          </tfoot>
        ) : (
          <Foot
            rows={foot?.tr.rows}
            isLoading={body?.isLoading}
            inlineStyles={foot?.tr.inlineStyles}
            styles={foot?.tr.styles}
          />
        )}
      </table>
    </>
  );
};
