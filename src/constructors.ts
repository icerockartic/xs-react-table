import { isArray } from "lodash";
import { CSSProperties } from "react";
import sanitizeHtml from "sanitize-html";
import { ApplyCSSModule, Col, ColChildren, CSSModule, Rows } from "./types";

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
    // ======================
  ]),
  allowedAttributes: false, // allow all
};

export const applyCSSModule = ({
  className,
  defaultStyles,
  styles,
}: ApplyCSSModule): string => {
  let result: string = defaultStyles[className];
  if (styles) {
    if (styles[className]) {
      result = styles[className];
    }
  }
  return result;
};

export const createHTMLString = (
  children: ColChildren | Array<ColChildren>,
  defaultStyles: CSSModule
): string => {
  let result = "";

  if (!isArray(children)) {
    const htmlString = `<${children.tag} ${
      children.identifier
        ? `tb-identifier=${children.identifier ? children.identifier : ""}`
        : ``
    } ${createAttributesString(children)} style="${
      children.inlineStyles ? stringifyCSSProps(children.inlineStyles) : ""
    }" class="${
      typeof children.styles === "string"
        ? children.styles
        : applyCSSModule({
            className: children.styles?.className
              ? children.styles.className
              : "",
            defaultStyles,
            styles: children.styles?.module,
          })
    }">${children.content}${(() => {
      const nestedElements: string[] = [];
      if (children.children && !isArray(children.children)) {
        nestedElements.push(createHTMLString(children.children, defaultStyles));
      }
      if (children.children && isArray(children.children)) {
        children.children.forEach((child) => {
          nestedElements.push(createHTMLString(child, defaultStyles));
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
        } ${createAttributesString(child)} style="${
          child.inlineStyles ? stringifyCSSProps(child.inlineStyles) : ""
        }" class="${
          typeof child.styles === "string"
            ? child.styles
            : applyCSSModule({
                className: child.styles?.className
                  ? child.styles.className
                  : "",
                defaultStyles,
                styles: child.styles?.module,
              })
        }">${child.content}${(() => {
          const nestedElements: string[] = [];
          if (child.children) {
            if (!isArray(child.children)) {
              nestedElements.push(
                createHTMLString(child.children, defaultStyles)
              );
            } else {
              child.children.forEach((grandChild) => {
                nestedElements.push(
                  createHTMLString(grandChild, defaultStyles)
                );
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

export const attachEventListener = ({
  rows,
  previousRows,
}: {
  rows?: Rows;
  previousRows?: Rows;
}): void => {
  rows?.forEach((row) => {
    attachEventListeners_topLevel({
      identifier: row.identifier,
      event: row.event,
      previousRows,
    });
    row.td.cols.forEach((col) => {
      attachEventListeners_topLevel({
        identifier: col.identifier,
        event: col.event,
        previousRows,
      });
      attachEventListeners_children({
        colChildren: col.children,
        previousRows,
      });
    });
  });
};

const attachEventListeners_topLevel = ({
  event,
  identifier,
  previousRows,
}: {
  identifier?: Col["identifier"];
  event?: Col["event"];
  previousRows?: Rows;
}): void => {
  const targetElement = document.querySelector(
    `[tb-identifier$="${identifier}"]`
  );

  previousRows?.forEach((row) => {
    if (!isArray(row.event)) {
      targetElement?.removeEventListener(
        row.event?.listener ?? "",
        row.event?.function,
        true
      );
      targetElement?.removeEventListener(
        row.event?.listener ?? "",
        row.event?.function
      );
    }

    if (isArray(row.event))
      row.event.forEach((e) => {
        targetElement?.removeEventListener(e.listener ?? "", e.function, true);
        targetElement?.removeEventListener(e.listener ?? "", e.function);
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

// Starting from the direct children of ['Col']
const attachEventListeners_children = ({
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
        if (!isArray(col.event)) {
          targetElement?.removeEventListener(
            col.event?.listener ?? "",
            col.event?.function,
            true
          );
          targetElement?.removeEventListener(
            col.event?.listener ?? "",
            col.event?.function
          );
        }

        if (isArray(col.event))
          col.event.forEach((e) => {
            targetElement?.removeEventListener(
              e.listener ?? "",
              e.function,
              true
            );
            targetElement?.removeEventListener(e.listener ?? "", e.function);
          });

        const detachEventListeners_children = ({
          columnChildren,
        }: {
          columnChildren?: ColChildren | Array<ColChildren>;
        }): void => {
          if (!isArray(columnChildren)) {
            if (!isArray(columnChildren?.event)) {
              targetElement?.removeEventListener(
                columnChildren?.event?.listener ?? "",
                columnChildren?.event?.function,
                true
              );
              targetElement?.removeEventListener(
                columnChildren?.event?.listener ?? "",
                columnChildren?.event?.function
              );
            }

            if (isArray(columnChildren?.event))
              columnChildren?.event.forEach((e) => {
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

            if (columnChildren?.children)
              detachEventListeners_children({
                columnChildren: columnChildren.children,
              });
          }

          if (isArray(columnChildren))
            columnChildren.forEach((child) =>
              detachEventListeners_children({ columnChildren: child })
            );
        };
        detachEventListeners_children({ columnChildren: col.children });
      })
    );

    if (!isArray(colChildren?.event)) {
      if (colChildren?.event?.capturing) {
        targetElement?.addEventListener(
          colChildren?.event?.listener,
          colChildren?.event?.function,
          true
        );
      } else {
        targetElement?.addEventListener(
          colChildren?.event?.listener ?? "",
          colChildren?.event?.function
        );
      }
    }

    if (isArray(colChildren?.event))
      colChildren?.event.forEach((e) => {
        if (e.capturing) {
          targetElement?.addEventListener(e.listener, e.function, true);
        } else {
          targetElement?.addEventListener(e.listener, e.function);
        }
      });

    if (colChildren?.children) {
      if (!isArray(colChildren?.children))
        attachEventListeners_children({
          colChildren: colChildren?.children,
          previousRows,
        });

      if (isArray(colChildren?.children))
        colChildren?.children.forEach((child) =>
          attachEventListeners_children({ colChildren: child, previousRows })
        );
    }
  }

  if (isArray(colChildren)) {
    colChildren.forEach((peer) => {
      attachEventListeners_children({ colChildren: peer, previousRows });

      if (peer.children) {
        if (!isArray(peer.children))
          attachEventListeners_children({
            colChildren: peer.children,
            previousRows,
          });

        if (isArray(peer.children))
          peer.children.forEach((p) =>
            attachEventListeners_children({
              colChildren: p.children,
              previousRows,
            })
          );
      }
    });
  }
};

const stringifyCSSProps = (styles: CSSProperties): string => {
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

const createAttributesString = (arg: ColChildren): string => {
  const result: string[] = [];
  arg.attribute?.forEach((Col) => {
    result.push(Col.value ? `${Col.name}="${Col.value}"` : Col.name);
  });
  return result.join(" ");
};
