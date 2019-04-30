"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incident_1 = require("incident");
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
function checkedUcs2Decode(string, check = true) {
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
                throw new incident_1.Incident("InvalidUcs2String", `Unmatched high surrogate half at index ${counter - 2}`);
            }
            else {
                // It's an unmatched surrogate; only append this code unit, in case the
                // next code unit is the high surrogate of a surrogate pair.
                output.push(value);
                counter--;
            }
        }
        else if (value >= 0xD800 && value <= 0xDBFF && counter === length) {
            throw new incident_1.Incident("InvalidUcs2String", `Unmatched high surrogate half at index ${counter - 1}`);
        }
        else if ((value & 0xFC00) === 0xDC00) {
            // Low surrogate that wasn't matched by a preceding high surrogate.
            throw new incident_1.Incident("InvalidUcs2String", `Unmatched low surrogate half at index ${counter - 1}`);
        }
        else {
            output.push(value);
        }
    }
    return output;
}
exports.checkedUcs2Decode = checkedUcs2Decode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvX2hlbHBlcnMvY2hlY2tlZC11Y3MyLWRlY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvQztBQUVwQzs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsUUFBaUIsSUFBSTtJQUNyRSxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDNUIsSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDckMsT0FBTyxPQUFPLEdBQUcsTUFBTSxFQUFFO1FBQ3ZCLE1BQU0sS0FBSyxHQUFXLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNuRCxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFO1lBQzFELHdEQUF3RDtZQUN4RCxNQUFNLEtBQUssR0FBVyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxNQUFNLEVBQUUsRUFBRSxpQkFBaUI7Z0JBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQzthQUNsRTtpQkFBTSxJQUFJLEtBQUssRUFBRTtnQkFDaEIsTUFBTSxJQUFJLG1CQUFRLENBQUMsbUJBQW1CLEVBQUUsMENBQTBDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xHO2lCQUFNO2dCQUNMLHVFQUF1RTtnQkFDdkUsNERBQTREO2dCQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7YUFBTSxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ25FLE1BQU0sSUFBSSxtQkFBUSxDQUFDLG1CQUFtQixFQUFFLDBDQUEwQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsRzthQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFO1lBQ3RDLG1FQUFtRTtZQUNuRSxNQUFNLElBQUksbUJBQVEsQ0FBQyxtQkFBbUIsRUFBRSx5Q0FBeUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakc7YUFBTTtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUE3QkQsOENBNkJDIiwiZmlsZSI6ImxpYi9faGVscGVycy9jaGVja2VkLXVjczItZGVjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5jaWRlbnQgfSBmcm9tIFwiaW5jaWRlbnRcIjtcblxuLyoqXG4gKiBDaGVja2VkIHZlcnNpb24gb2YgYHB1bnljb2RlLnVjczIuZGVjb2RlYCwgdGhyb3dzIGFuIGVycm9yIGlmXG4gKiB0aGVyZSBpcyBhbiB1bm1hdGNoZWQgc3Vycm9nYXRlIGhhbGYuXG4gKlxuICogQHNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL3B1bnljb2RlLmpzL2lzc3Vlcy82Nz5cbiAqIEBuYW1lIGRlY29kZVxuICogQHBhcmFtIHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cbiAqIEBwYXJhbSBjaGVjayBUaHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiB1bm1hdGNoZWQgc3Vycm9nYXRlIGhhbGYuXG4gKiBAcmV0dXJucyBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tlZFVjczJEZWNvZGUoc3RyaW5nOiBzdHJpbmcsIGNoZWNrOiBib29sZWFuID0gdHJ1ZSk6IG51bWJlcltdIHtcbiAgY29uc3Qgb3V0cHV0OiBudW1iZXJbXSA9IFtdO1xuICBsZXQgY291bnRlcjogbnVtYmVyID0gMDtcbiAgY29uc3QgbGVuZ3RoOiBudW1iZXIgPSBzdHJpbmcubGVuZ3RoO1xuICB3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuICAgIGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcbiAgICAgIC8vIEl0J3MgYSBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXIuXG4gICAgICBjb25zdCBleHRyYTogbnVtYmVyID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcbiAgICAgIGlmICgoZXh0cmEgJiAweEZDMDApID09PSAweERDMDApIHsgLy8gTG93IHN1cnJvZ2F0ZS5cbiAgICAgICAgb3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEluY2lkZW50KFwiSW52YWxpZFVjczJTdHJpbmdcIiwgYFVubWF0Y2hlZCBoaWdoIHN1cnJvZ2F0ZSBoYWxmIGF0IGluZGV4ICR7Y291bnRlciAtIDJ9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJdCdzIGFuIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZVxuICAgICAgICAvLyBuZXh0IGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpci5cbiAgICAgICAgb3V0cHV0LnB1c2godmFsdWUpO1xuICAgICAgICBjb3VudGVyLS07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPT09IGxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEluY2lkZW50KFwiSW52YWxpZFVjczJTdHJpbmdcIiwgYFVubWF0Y2hlZCBoaWdoIHN1cnJvZ2F0ZSBoYWxmIGF0IGluZGV4ICR7Y291bnRlciAtIDF9YCk7XG4gICAgfSBlbHNlIGlmICgodmFsdWUgJiAweEZDMDApID09PSAweERDMDApIHtcbiAgICAgIC8vIExvdyBzdXJyb2dhdGUgdGhhdCB3YXNuJ3QgbWF0Y2hlZCBieSBhIHByZWNlZGluZyBoaWdoIHN1cnJvZ2F0ZS5cbiAgICAgIHRocm93IG5ldyBJbmNpZGVudChcIkludmFsaWRVY3MyU3RyaW5nXCIsIGBVbm1hdGNoZWQgbG93IHN1cnJvZ2F0ZSBoYWxmIGF0IGluZGV4ICR7Y291bnRlciAtIDF9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
