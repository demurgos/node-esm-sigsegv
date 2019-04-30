export const name = "MissingDependency";
export function format({ name, role }) {
    return `Missing optional dependencies ${JSON.stringify(name)}: ${role}`;
}
export function createMissingDependencyError(depName, role) {
    return Error(name);
}
