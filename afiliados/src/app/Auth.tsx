export function getAuthAccess () { return localStorage.getItem('afiliadosAccess') };
export function setAuthAccess (access: string) { localStorage.setItem('afiliadosAccess', access) };