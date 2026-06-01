export function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function fromSlug(value = "") {
  return value.replace(/-/g, " ");
}
