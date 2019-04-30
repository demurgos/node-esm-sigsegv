export function diffSets(reference, values) {
    const referenceSet = new Set(reference);
    const valuesSet = new Set(values);
    const all = new Set([...referenceSet, ...valuesSet]);
    const commonKeys = new Set();
    const missingKeys = new Set();
    const extraKeys = new Set();
    for (const key of all) {
        if (!valuesSet.has(key)) {
            missingKeys.add(key);
        }
        else if (!referenceSet.has(key)) {
            extraKeys.add(key);
        }
        else {
            commonKeys.add(key);
        }
    }
    return { commonKeys, missingKeys, extraKeys };
}
