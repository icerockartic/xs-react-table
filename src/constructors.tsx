import reactParse from "html-react-parser";
import isArray from "lodash/isArray";
import { CSSProperties } from "react";
import sanitizeHtml from "sanitize-html";
import { Col, ColChildren, Rows, ThreadProps } from "./types";

const sanitizingOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "button",
    "input",
    "img",
    // =========== SVG ===========
    "svg",
    "path",
    "a",
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "g",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "pattern",
    "polygon",
    "polygon",
    "radialGradient",
    "rect",
    "stop",
    "text",
    "tref",
    "tspan",
    "tspan",
    "use",
  ]),
  allowedAttributes: false, // allow all
};

export const createThreadRows = ({
  rows,
  styles,
  caption,
  useThTag,
  threadType,
  inlineStyles,
}: ThreadProps & {
  threadType: "head" | "body" | "foot";
  useThTag?: boolean;
}): JSX.Element =>
  useThTag ? (
    <>
      {rows?.map((row, rowIndex) => (
        <tr
          tb-identifier={row.identifier ? row.identifier : ""}
          key={`Table_${threadType}_tr_${caption?.content ?? ""}_${rowIndex}`}
          style={inlineStyles}
          className={
            row.styles
              ? typeof row.styles === "string"
                ? row.styles
                : row.styles.module[row.styles.className]
              : typeof styles === "string"
              ? styles
              : styles?.module[styles.className]
          }
        >
          {row.td.cols
            .filter((col) => !col.hidden)
            .map((col, colIndex) => (
              <th
                tb-identifier={col.identifier ? col.identifier : ""}
                key={`Table_${threadType}_td_${
                  caption?.content ?? ""
                }_${colIndex}`}
                style={col.inlineStyles}
                className={
                  col.styles
                    ? typeof col.styles === "string"
                      ? col.styles
                      : col.styles.module[col.styles.className]
                    : typeof styles === "string"
                    ? styles
                    : styles?.module[styles.className]
                }
                colSpan={col.colSpan}
              >
                {col.content}
                {reactParse(
                  col.children ? createHTMLString(col.children) : "",
                  {
                    htmlparser2: {
                      lowerCaseTags: false,
                    },
                  }
                )}
              </th>
            ))}
        </tr>
      ))}
    </>
  ) : (
    <>
      {rows?.map((row, rowIndex) => (
        <tr
          tb-identifier={row.identifier ? row.identifier : ""}
          key={`Table_${threadType}_tr_${caption?.content ?? ""}_${rowIndex}`}
          style={inlineStyles}
          className={
            row.styles
              ? typeof row.styles === "string"
                ? row.styles
                : row.styles.module[row.styles.className]
              : typeof styles === "string"
              ? styles
              : styles?.module[styles.className]
          }
        >
          {row.td.cols
            .filter((col) => !col.hidden)
            .map((col, colIndex) => (
              <td
                tb-identifier={col.identifier ? col.identifier : ""}
                key={`Table_${threadType}_td_${
                  caption?.content ?? ""
                }_${colIndex}`}
                style={col.inlineStyles}
                className={
                  col.styles
                    ? typeof col.styles === "string"
                      ? col.styles
                      : col.styles.module[col.styles.className]
                    : typeof styles === "string"
                    ? styles
                    : styles?.module[styles.className]
                }
                colSpan={col.colSpan}
              >
                {col.content}
                {reactParse(
                  col.children ? createHTMLString(col.children) : "",
                  {
                    htmlparser2: {
                      lowerCaseTags: false,
                    },
                  }
                )}
              </td>
            ))}
        </tr>
      ))}
    </>
  );

export const createHTMLString = (
  children: ColChildren | Array<ColChildren>
): string => {
  let result = "";

  if (!isArray(children)) {
    const htmlString = `<${children.tag} ${
      children.identifier
        ? `tb-identifier=${children.identifier ? children.identifier : ""}`
        : ``
    } ${_createAttributesString(children)} style="${
      children.inlineStyles ? _stringifyCSSProps(children.inlineStyles) : ""
    }" class="${
      typeof children.styles === "string"
        ? children.styles
        : children.styles?.module[children.styles.className]
    }">${children.content}${(() => {
      const nestedElements: string[] = [];
      if (children.children && !isArray(children.children)) {
        nestedElements.push(createHTMLString(children.children));
      }
      if (children.children && isArray(children.children)) {
        children.children.forEach((child) => {
          nestedElements.push(createHTMLString(child));
        });
      }
      return nestedElements.join("");
    })()}</${children.tag}>`;

    const filteredHtmlString = htmlString.replace(/undefined/g, "");

    result = sanitizeHtml(filteredHtmlString, sanitizingOptions);
  }

  if (isArray(children)) {
    const htmlStrings: string[] = [];

    children.forEach((child: ColChildren) => {
      htmlStrings.push(
        `<${child.tag} ${
          child.identifier
            ? `tb-identifier=${child.identifier ? child.identifier : ""}`
            : ``
        } ${_createAttributesString(child)} style="${
          child.inlineStyles ? _stringifyCSSProps(child.inlineStyles) : ""
        }" class="${
          typeof child.styles === "string"
            ? child.styles
            : child.styles?.module[child.styles.className]
        }">${child.content}${(() => {
          const nestedElements: string[] = [];
          if (child.children) {
            if (!isArray(child.children)) {
              nestedElements.push(createHTMLString(child.children));
            } else {
              child.children.forEach((grandChild) => {
                nestedElements.push(createHTMLString(grandChild));
              });
            }
          }
          return nestedElements.join("");
        })()}</${child.tag}>`
      );
    });

    const joinedHtmlStrings = htmlStrings.join("");
    const filteredHtmlString = joinedHtmlStrings.replace(/undefined/g, "");

    result = sanitizeHtml(filteredHtmlString, sanitizingOptions);
  }

  return result;
};

export const attachEventListeners = ({
  rows,
  previousRows,
}: {
  rows?: Rows;
  previousRows?: Rows;
}): void => {
  rows?.forEach((row) => {
    _attachEventListeners_topLevel({
      event: row.events,
      identifier: row.identifier,
      previousRows,
    });

    row.td.cols.forEach((col) => {
      _attachEventListeners_topLevel({
        event: col.events,
        identifier: col.identifier,
        previousRows,
      });

      _attachEventListeners_children({
        colChildren: col.children,
        previousRows,
      });
    });
  });
};

const _attachEventListeners_topLevel = ({
  event,
  identifier,
  previousRows,
}: {
  identifier?: Col["identifier"];
  event?: Col["events"];
  previousRows?: Rows;
}): void => {
  const targetElement = document.querySelector(
    `[tb-identifier$="${identifier}"]`
  );

  previousRows?.forEach((row) => {
    if (!isArray(row.events)) {
      targetElement?.removeEventListener(
        row.events?.listener ?? "",
        row.events?.function,
        true
      );
      targetElement?.removeEventListener(
        row.events?.listener ?? "",
        row.events?.function
      );
    }

    if (isArray(row.events)) {
      row.events.forEach((e) => {
        targetElement?.removeEventListener(e.listener ?? "", e.function, true);
        targetElement?.removeEventListener(e.listener ?? "", e.function);
      });
    }

    row.td.cols.forEach((col) => {
      if (!isArray(col.events)) {
        targetElement?.removeEventListener(
          col.events?.listener ?? "",
          col.events?.function,
          true
        );
        targetElement?.removeEventListener(
          col.events?.listener ?? "",
          col.events?.function
        );
      }

      if (isArray(col.events)) {
        col.events.forEach((e) => {
          targetElement?.removeEventListener(
            e.listener ?? "",
            e.function,
            true
          );
          targetElement?.removeEventListener(e.listener ?? "", e.function);
        });
      }
    });
  });

  if (identifier && event && !isArray(event)) {
    if (event.capturing) {
      targetElement?.addEventListener(event.listener, event.function, true);
    } else {
      targetElement?.addEventListener(event.listener, event.function);
    }
  }

  if (identifier && event && isArray(event)) {
    event.forEach((e) => {
      if (e.capturing) {
        targetElement?.addEventListener(e.listener, e.function, true);
      } else {
        targetElement?.addEventListener(e.listener, e.function);
      }
    });
  }
};

// Starting from the first children of ['Col']
const _attachEventListeners_children = ({
  colChildren,
  previousRows,
}: {
  colChildren?: ColChildren | ColChildren[];
  previousRows?: Rows;
}): void => {
  if (!isArray(colChildren)) {
    const targetElement = document.querySelector(
      `[tb-identifier="${colChildren?.identifier}"]`
    );

    previousRows?.forEach((row) =>
      row.td.cols.forEach((col) => {
        const detachEventListeners_children = ({
          columnChildren,
        }: {
          columnChildren?: ColChildren | Array<ColChildren>;
        }): void => {
          if (!isArray(columnChildren)) {
            if (!isArray(columnChildren?.events)) {
              targetElement?.removeEventListener(
                columnChildren?.events?.listener ?? "",
                columnChildren?.events?.function,
                true
              );
              targetElement?.removeEventListener(
                columnChildren?.events?.listener ?? "",
                columnChildren?.events?.function
              );
            }

            if (isArray(columnChildren?.events)) {
              columnChildren?.events.forEach((e) => {
                targetElement?.removeEventListener(
                  e.listener ?? "",
                  e.function,
                  true
                );
                targetElement?.removeEventListener(
                  e.listener ?? "",
                  e.function
                );
              });
            }

            if (columnChildren?.children) {
              detachEventListeners_children({
                columnChildren: columnChildren.children,
              });
            }
          }

          if (isArray(columnChildren)) {
            columnChildren.forEach((child) =>
              detachEventListeners_children({ columnChildren: child })
            );
          }
        };

        detachEventListeners_children({ columnChildren: col.children });
      })
    );

    if (!isArray(colChildren?.events)) {
      if (colChildren?.events?.capturing) {
        targetElement?.addEventListener(
          colChildren?.events?.listener,
          colChildren?.events?.function,
          true
        );
      } else {
        targetElement?.addEventListener(
          colChildren?.events?.listener ?? "",
          colChildren?.events?.function
        );
      }
    }

    if (isArray(colChildren?.events)) {
      colChildren?.events.forEach((e) => {
        if (e.capturing) {
          targetElement?.addEventListener(e.listener, e.function, true);
        } else {
          targetElement?.addEventListener(e.listener, e.function);
        }
      });
    }

    if (colChildren?.children) {
      if (!isArray(colChildren?.children)) {
        _attachEventListeners_children({
          colChildren: colChildren?.children,
          previousRows,
        });
      }

      if (isArray(colChildren?.children)) {
        colChildren?.children.forEach((child) =>
          _attachEventListeners_children({ colChildren: child, previousRows })
        );
      }
    }
  }

  if (isArray(colChildren)) {
    colChildren.forEach((peer) => {
      _attachEventListeners_children({ colChildren: peer, previousRows });

      if (peer.children) {
        if (!isArray(peer.children)) {
          _attachEventListeners_children({
            colChildren: peer.children,
            previousRows,
          });
        }

        if (isArray(peer.children)) {
          peer.children.forEach((p) =>
            _attachEventListeners_children({
              colChildren: p.children,
              previousRows,
            })
          );
        }
      }
    });
  }
};

const _stringifyCSSProps = (styles: CSSProperties): string => {
  const keys = Object.keys(styles);
  const vals = Object.values(styles);
  const inlineCSS: string[] = [];

  keys.forEach((key, index) => {
    inlineCSS.push(
      key.replace(/[A-Z]/g, (s) => "-" + s.toLowerCase()) + ":" + vals[index]
    );
  });

  return inlineCSS.join(",");
};

const _createAttributesString = (arg: ColChildren): string => {
  const result: string[] = [];

  if (!isArray(arg.attributes)) {
    result.push(
      arg.attributes?.value
        ? `${arg.attributes?.name ?? ""}="${arg.attributes?.value}"`
        : arg.attributes?.name ?? ""
    );
  }

  if (isArray(arg.attributes)) {
    arg.attributes?.forEach((Col) => {
      result.push(Col.value ? `${Col.name}="${Col.value}"` : Col.name);
    });
  }

  return result.join(" ");
};
