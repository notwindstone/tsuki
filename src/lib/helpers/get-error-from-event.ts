import type { AppErrorType } from "@/types/misc/app-error.type";

export function getErrorFromEvent(event: unknown): AppErrorType {
  const foundData: AppErrorType = {};

  // 'null' is an object in js
  if (typeof event !== "object" || event === null) {
    return foundData;
  }

  if ("message" in event) {
    foundData["message"] = event.message;
  }

  // for 'unhandledrejection' event
  if ("reason" in event) {
    foundData["message"] = event.reason;
  }

  if ("lineno" in event) {
    foundData["lineno"] = event.lineno;
  }

  if ("colno" in event) {
    foundData["colno"] = event.colno;
  }

  if (
    "filename" in event &&
    // check if event.filename has 'split()' method
    typeof event.filename === "string"
  ) {
    // still use safe chaining
    const filenamePaths = event.filename?.split?.("/");

    /*
     * event.filename by default looks like 'http://localhost:4173/tsuki/assets/polyfills-DmLhBDoD.js'
     * we only want the filename: 'polyfills-DmLhBDoD.js'
     */
    foundData["filename"] = filenamePaths?.[filenamePaths.length - 1];
  }

  return foundData;
}
