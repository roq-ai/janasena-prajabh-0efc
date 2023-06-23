const mapping: Record<string, string> = {
  events: 'event',
  janasenas: 'janasena',
  suggestions: 'suggestion',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
