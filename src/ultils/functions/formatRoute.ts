import slugify from "./customSlug";

export const formatRoute = (
  route: string,
  idValue: string | number = ":id"
): string => {
  const id = String(idValue);

  return route
    .replace(/:id/g, id);
};
