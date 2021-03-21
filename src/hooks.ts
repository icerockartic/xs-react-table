import isArray from "lodash/isArray";
import { useEffect, useRef } from "react";
import { UseTable } from "./types";

export const useTable = ({
  head,
  body,
  foot,
  events,
  attributes,
  theadElement,
  tbodyElement,
  tfootElement,
  tableElement,
}: UseTable): void => {
  // Add attribute
  useEffect(() => {
    if (!isArray(attributes)) {
      if (tableElement && attributes) {
        tableElement.current?.setAttribute(
          attributes.name,
          attributes.value ?? ""
        );
      }

      if (theadElement && head?.attributes && !isArray(head?.attributes)) {
        theadElement.current?.setAttribute(
          head.attributes.name,
          head.attributes.value ?? ""
        );
      }

      if (tbodyElement && body?.attributes && !isArray(body?.attributes)) {
        tbodyElement.current?.setAttribute(
          body.attributes.name,
          body.attributes.value ?? ""
        );
      }

      if (tfootElement && foot?.attributes && !isArray(foot?.attributes)) {
        tfootElement.current?.setAttribute(
          foot.attributes.name,
          foot.attributes.value ?? ""
        );
      }
    }

    if (isArray(attributes)) {
      if (tableElement && attributes && attributes.length) {
        attributes.forEach((item) => {
          tableElement.current?.setAttribute(item.name, item.value ?? "");
        });
      }

      if (
        theadElement &&
        head?.attributes &&
        isArray(head?.attributes) &&
        head.attributes.length
      ) {
        head.attributes.forEach((item) => {
          theadElement.current?.setAttribute(item.name, item.value ?? "");
        });
      }

      if (
        tbodyElement &&
        body?.attributes &&
        isArray(body?.attributes) &&
        body.attributes.length
      ) {
        body.attributes.forEach((item) => {
          tbodyElement.current?.setAttribute(item.name, item.value ?? "");
        });
      }

      if (
        tfootElement &&
        foot?.attributes &&
        isArray(foot?.attributes) &&
        foot.attributes.length
      ) {
        foot.attributes.forEach((item) => {
          tfootElement.current?.setAttribute(item.name, item.value ?? "");
        });
      }
    }
  }, [
    head,
    body,
    foot,
    attributes,
    tbodyElement,
    tfootElement,
    theadElement,
    tableElement,
  ]);

  // Add eventlistener
  useEffect(() => {
    if (tableElement && !isArray(events)) {
      tableElement.current?.addEventListener(
        events?.listener ?? "",
        events?.function
      );
    }

    if (tableElement && isArray(events)) {
      events.forEach((e) => {
        tableElement.current?.addEventListener(e.listener ?? "", e.function);
      });
    }
  }, [events, tableElement]);

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
};

export const usePrevious = <T>(value: T | undefined): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
