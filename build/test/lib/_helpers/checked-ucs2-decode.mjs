import { Incident } from "incident";
/**
 * Checked version of `punycode.ucs2.decode`, throws an error if
 * there is an unmatched surrogate half.
 *
 * @see <https://github.com/bestiejs/punycode.js/issues/67>
 * @name decode
 * @param string The Unicode input string (UCS-2).
 * @param check Throw an error if there is an unmatched surrogate half.
 * @returns The new array of code points.
 */
export function checkedUcs2Decode(string, check = true) {
    const output = [];
    let counter = 0;
    const length = string.length;
    while (counter < length) {
        const value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            // It's a high surrogate, and there is a next character.
            const extra = string.charCodeAt(counter++);
            if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            }
            else if (check) {
                throw new Incident("InvalidUcs2String", `Unmatched high surrogate half at index ${counter - 2}`);
            }
            else {
                // It's an unmatched surrogate; only append this code unit, in case the
                // next code unit is the high surrogate of a surrogate pair.
                output.push(value);
                counter--;
            }
        }
        else if (value >= 0xD800 && value <= 0xDBFF && counter === length) {
            throw new Incident("InvalidUcs2String", `Unmatched high surrogate half at index ${counter - 1}`);
        }
        else if ((value & 0xFC00) === 0xDC00) {
            // Low surrogate that wasn't matched by a preceding high surrogate.
            throw new Incident("InvalidUcs2String", `Unmatched low surrogate half at index ${counter - 1}`);
        }
        else {
            output.push(value);
        }
    }
    return output;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvX2hlbHBlcnMvY2hlY2tlZC11Y3MyLWRlY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXBDOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsUUFBaUIsSUFBSTtJQUNyRSxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDNUIsSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDckMsT0FBTyxPQUFPLEdBQUcsTUFBTSxFQUFFO1FBQ3ZCLE1BQU0sS0FBSyxHQUFXLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNuRCxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFO1lBQzFELHdEQUF3RDtZQUN4RCxNQUFNLEtBQUssR0FBVyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxNQUFNLEVBQUUsRUFBRSxpQkFBaUI7Z0JBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQzthQUNsRTtpQkFBTSxJQUFJLEtBQUssRUFBRTtnQkFDaEIsTUFBTSxJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSwwQ0FBMEMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbEc7aUJBQU07Z0JBQ0wsdUVBQXVFO2dCQUN2RSw0REFBNEQ7Z0JBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxDQUFDO2FBQ1g7U0FDRjthQUFNLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDbkUsTUFBTSxJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSwwQ0FBMEMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbEc7YUFBTSxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLE1BQU0sRUFBRTtZQUN0QyxtRUFBbUU7WUFDbkUsTUFBTSxJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSx5Q0FBeUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakc7YUFBTTtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJmaWxlIjoibGliL19oZWxwZXJzL2NoZWNrZWQtdWNzMi1kZWNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmNpZGVudCB9IGZyb20gXCJpbmNpZGVudFwiO1xuXG4vKipcbiAqIENoZWNrZWQgdmVyc2lvbiBvZiBgcHVueWNvZGUudWNzMi5kZWNvZGVgLCB0aHJvd3MgYW4gZXJyb3IgaWZcbiAqIHRoZXJlIGlzIGFuIHVubWF0Y2hlZCBzdXJyb2dhdGUgaGFsZi5cbiAqXG4gKiBAc2VlIDxodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvcHVueWNvZGUuanMvaXNzdWVzLzY3PlxuICogQG5hbWUgZGVjb2RlXG4gKiBAcGFyYW0gc3RyaW5nIFRoZSBVbmljb2RlIGlucHV0IHN0cmluZyAoVUNTLTIpLlxuICogQHBhcmFtIGNoZWNrIFRocm93IGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIHVubWF0Y2hlZCBzdXJyb2dhdGUgaGFsZi5cbiAqIEByZXR1cm5zIFRoZSBuZXcgYXJyYXkgb2YgY29kZSBwb2ludHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja2VkVWNzMkRlY29kZShzdHJpbmc6IHN0cmluZywgY2hlY2s6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyW10ge1xuICBjb25zdCBvdXRwdXQ6IG51bWJlcltdID0gW107XG4gIGxldCBjb3VudGVyOiBudW1iZXIgPSAwO1xuICBjb25zdCBsZW5ndGg6IG51bWJlciA9IHN0cmluZy5sZW5ndGg7XG4gIHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG4gICAgY29uc3QgdmFsdWU6IG51bWJlciA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG4gICAgaWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuICAgICAgLy8gSXQncyBhIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3Rlci5cbiAgICAgIGNvbnN0IGV4dHJhOiBudW1iZXIgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuICAgICAgaWYgKChleHRyYSAmIDB4RkMwMCkgPT09IDB4REMwMCkgeyAvLyBMb3cgc3Vycm9nYXRlLlxuICAgICAgICBvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuICAgICAgfSBlbHNlIGlmIChjaGVjaykge1xuICAgICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoXCJJbnZhbGlkVWNzMlN0cmluZ1wiLCBgVW5tYXRjaGVkIGhpZ2ggc3Vycm9nYXRlIGhhbGYgYXQgaW5kZXggJHtjb3VudGVyIC0gMn1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0J3MgYW4gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlXG4gICAgICAgIC8vIG5leHQgY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyLlxuICAgICAgICBvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgICAgIGNvdW50ZXItLTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA9PT0gbGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoXCJJbnZhbGlkVWNzMlN0cmluZ1wiLCBgVW5tYXRjaGVkIGhpZ2ggc3Vycm9nYXRlIGhhbGYgYXQgaW5kZXggJHtjb3VudGVyIC0gMX1gKTtcbiAgICB9IGVsc2UgaWYgKCh2YWx1ZSAmIDB4RkMwMCkgPT09IDB4REMwMCkge1xuICAgICAgLy8gTG93IHN1cnJvZ2F0ZSB0aGF0IHdhc24ndCBtYXRjaGVkIGJ5IGEgcHJlY2VkaW5nIGhpZ2ggc3Vycm9nYXRlLlxuICAgICAgdGhyb3cgbmV3IEluY2lkZW50KFwiSW52YWxpZFVjczJTdHJpbmdcIiwgYFVubWF0Y2hlZCBsb3cgc3Vycm9nYXRlIGhhbGYgYXQgaW5kZXggJHtjb3VudGVyIC0gMX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
