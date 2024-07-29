export function isValidKSUID(id: string): boolean {
    const PatternKSUIDRegex = '^[0-9a-zA-Z]{27}$';
    return util.matches(PatternKSUIDRegex, id);
}
