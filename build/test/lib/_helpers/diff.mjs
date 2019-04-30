// Implementation of the Hirschberg algorithm
// Time: O(mn)
// Space: O(min(m, n))
// See: https://en.wikipedia.org/wiki/Hirschberg%27s_algorithm
/**
 * Represents a slice of a sequence of items. This allows to abstract the access to the items
 * and prevent extraneous copies of the sequence.
 */
class Slice {
    constructor(sequence, start, end, reversed) {
        this.sequence = sequence;
        this.start = start;
        this.end = end;
        this.length = end - start;
        this.reversed = reversed;
    }
    indexOf(item) {
        if (this.reversed) {
            for (let i = this.end - 1; i >= this.start; i--) {
                if (this.sequence[i] === item) {
                    return this.end - 1 - i;
                }
            }
        }
        else {
            for (let i = this.start; i < this.end; i++) {
                if (this.sequence[i] === item) {
                    return i - this.start;
                }
            }
        }
        return -1;
    }
    getItem(index) {
        return this.sequence[this.getAbsoluteIndex(index)];
    }
    getAbsoluteIndex(relativeIndex) {
        if (this.reversed) {
            return (this.end - 1) - relativeIndex;
        }
        else {
            return this.start + relativeIndex;
        }
    }
    split(index) {
        if (this.reversed) {
            throw Error("Cannot split reversed");
        }
        const left = new Slice(this.sequence, this.start, this.start + index, false);
        const right = new Slice(this.sequence, this.start + index, this.end, false);
        return [left, right];
    }
    reverse() {
        return new Slice(this.sequence, this.start, this.end, true);
    }
}
function nearestEnd(src, target) {
    const x1 = 0;
    const x2 = src.length;
    const y1 = 0;
    const y2 = target.length;
    const xLen = x2 - x1;
    const yLen = y2 - y1;
    // We do not need to store the whole matrix: we just need the current and
    // previous rows.
    let oldDist = Array(yLen + 1);
    let curDist = Array(yLen + 1);
    // Fill the first row
    for (let col = 0; col <= yLen; col++) {
        curDist[col] = col;
    }
    // Traverse xSeq
    for (let row = 1; row <= xLen; row++) {
        [curDist, oldDist] = [oldDist, curDist];
        const rowItem = src.getItem(row - 1);
        // Initialize first column
        curDist[0] = row;
        // Compute distances
        for (let col = 1; col <= yLen; col++) {
            // Nearest distance in case of ADD or DEL
            const addDelDist = Math.min(oldDist[col], curDist[col - 1]) + 1;
            // Nearest distance in case of MATCH
            const matchDist = oldDist[col - 1];
            // Nearest distance in case of MUT
            const mutDist = matchDist + 1;
            if (addDelDist <= matchDist) {
                // See the comment above about skipping the test `colItem === rowItem`
                curDist[col] = addDelDist;
            }
            else {
                const colItem = target.getItem(col - 1);
                curDist[col] = colItem === rowItem ? matchDist : mutDist;
            }
        }
    }
    // Search for minimum in the last line
    let minDistCol = 0;
    for (let col = 1; col <= yLen; col++) {
        // We use equality to get the rightmost minimal value.
        if (curDist[col] <= curDist[minDistCol]) {
            minDistCol = col;
        }
    }
    const minDistIndex = minDistCol - 1;
    const minDistValue = curDist[minDistCol];
    return [minDistIndex, minDistValue];
}
function hirschberg(source, target) {
    const srcLen = source.length;
    const tarLen = target.length;
    if (srcLen === 0 || tarLen === 0) {
        if (srcLen > 0) {
            return [{ type: "source", value: srcLen }];
        }
        else if (tarLen > 0) {
            return [{ type: "target", value: tarLen }];
        }
        else { // srcLen === 0 && tarLen === 0
            return [];
        }
    }
    else if (srcLen === 1 || tarLen === 1) {
        let idx = source.indexOf(target.getItem(0));
        if (srcLen > 1 && idx >= 0) {
            return [
                { type: "source", value: idx },
                { type: "match", value: 1 },
                { type: "source", value: srcLen - idx - 1 },
            ];
        }
        else {
            idx = target.indexOf(source.getItem(0));
            if (idx >= 0) {
                return [
                    { type: "target", value: idx },
                    { type: "match", value: 1 },
                    { type: "target", value: tarLen - idx - 1 },
                ];
            }
            else {
                return [
                    { type: "source", value: srcLen },
                    { type: "target", value: tarLen },
                ];
            }
        }
    }
    else {
        const srcMid = Math.floor(srcLen / 2);
        const [srcLeft, srcRight] = source.split(srcMid);
        const [leftMinDistIdx, leftMinVal] = nearestEnd(srcLeft, target);
        const [rightMinDistIdx, rightMinVal] = nearestEnd(srcRight.reverse(), target.reverse());
        let targetMid;
        if (leftMinVal <= rightMinVal) {
            // We add one because the right of the range is exclusive
            targetMid = leftMinDistIdx + 1;
        }
        else {
            // Convert the right index from the reversed tarRight to target
            targetMid = (target.length - 1) - rightMinDistIdx;
        }
        const [tarLeft, tarRight] = target.split(targetMid);
        const left = hirschberg(srcLeft, tarLeft);
        const right = hirschberg(srcRight, tarRight);
        return [...left, ...right];
    }
}
export function normalizeDiff(diff) {
    const result = [];
    if (diff.length === 0) {
        return result;
    }
    let curSource = 0;
    let curTarget = 0;
    let curBoth = 0;
    for (const action of diff) {
        if (action.value === 0) {
            continue;
        }
        if (action.type === "match") {
            if (curSource > 0) {
                result.push({ type: "source", value: curSource });
                curSource = 0;
            }
            if (curTarget > 0) {
                result.push({ type: "target", value: curTarget });
                curTarget = 0;
            }
            curBoth += action.value;
        }
        else {
            if (curBoth > 0) {
                result.push({ type: "match", value: curBoth });
                curBoth = 0;
            }
            if (action.type === "source") {
                curSource += action.value;
            }
            else { // action.type === "target"
                curTarget += action.value;
            }
        }
    }
    if (curSource > 0) {
        result.push({ type: "source", value: curSource });
    }
    if (curTarget > 0) {
        result.push({ type: "target", value: curTarget });
    }
    if (curBoth > 0) {
        result.push({ type: "match", value: curBoth });
    }
    return result;
}
export function diffSync(seq1, seq2) {
    return normalizeDiff(hirschberg(new Slice(seq1, 0, seq1.length, false), new Slice(seq2, 0, seq2.length, false)));
}
/*
 * Structure of the Levenshtein matrix
 *
 * Let's see which information about the grid we can get from the equation
 * of `r`.
 * By definition of `min`, we have:
 *
 * ```
 * ┼─┼─┼
 * │m│a│   r <= m + 1  (This is true independently of `isMatch`)        [eq. 03]
 * ┼─┼─┼   r <= a + 1                                                   [eq. 04]
 * │d│r│   r <= d + 1                                                   [eq. 05]
 * ┼─┼─┼
 * ```
 *
 * This means that growth of the distance when we go to the right or down is
 * bounded. You cannot increase of more than 1 when going to the right or down.
 *
 * It means that the following configurations are impossible:
 *
 * ```
 * ┼─┼─┼
 * │5│ │   IMPOSSIBLE, breaks: r <= m + 1
 * ┼─┼─┼
 * │ │7│
 * ┼─┼─┼
 *
 * ┼─┼─┼
 * │ │5│   IMPOSSIBLE, breaks: r <= a + 1
 * ┼─┼─┼
 * │ │7│
 * ┼─┼─┼
 *
 * ┼─┼─┼
 * │ │ │   IMPOSSIBLE, breaks: r <= d + 1
 * ┼─┼─┼
 * │5│7│
 * ┼─┼─┼
 * ```
 *
 * Since these inequalities are relative to a `r`, we can translate them:
 * ```
 * ┼─┼─┼
 * │m│a│   d <= m + 1   (from [eq. 4])                                  [eq. 06]
 * ┼─┼─┼   a <= m + 1   (from [eq. 5])                                  [eq. 07]
 * │d│r│
 * ┼─┼─┼
 * ```
 *
 * We can also add a lower bound to the growth when going to the right or down:
 * ```
 * a - 1 <= r                                                           [eq. 08]
 * d - 1 <= r                                                           [eq. 09]
 * ```
 * So `r` cannot grow faster than `1` per cell, but also cannot decrease faster.
 *
 * This means that the following configuration are impossible:
 *
 * ```
 * ┼─┼─┼
 * │ │7│   IMPOSSIBLE, breaks: a - 1 <= r
 * ┼─┼─┼
 * │ │5│
 * ┼─┼─┼
 *
 * ┼─┼─┼
 * │ │ │   IMPOSSIBLE, breaks: d - 1 <= r
 * ┼─┼─┼
 * │7│5│
 * ┼─┼─┼
 * ```
 *
 * We will only prove the first inequality `a - 1 <= r` since both inequalities
 * are in fact equivalent due to the symmetry of the problem.
 *
 * To demonstrate it, we'll use a proof by contradiction: we will show that it
 * simply cannot be otherwise.
 * The opposite of `a - 1 <= r` is:
 * ```
 * a - 1 > r                                                            [eq. 10]
 * ```
 * This inequality is incompatible with the value of `r` whether it comes from
 * a MATCH, MUT, ADD or DEL:
 *
 *
 * MATCH:
 * ```
 * r = m              (definition of MATCH)
 * a - 1 > r          (hypothesis)
 * a <= m + 1         (previous constraint [eq. 07])
 * ```
 * We can transform it:
 * ```
 * r = m
 * a > r + 1          (move `-1` to the right side)
 * a <= r + 1         (substitute `m` for `r`)
 * ```
 * This system does not have any solution.
 *
 * MUT:
 * ```
 * r = m + 1          (definition of MUT)
 * a - 1 > r          (hypothesis)
 * a <= m + 1         (previous constraint [eq. 07])
 * ```
 * We can transform it:
 * ```
 * r = m
 * a > r + 1          (move `-1` to the right side)
 * a <= r             (substitute `m + 1` for `r`)
 * ```
 * This system does not have any solution.
 *
 *
 * ADD:
 * ```
 * r = a + 1          (definition of ADD)
 * a - 1 > r          (hypothesis)
 * ```
 * This system does not have any solution.
 *
 *
 * DEL:
 * So far we've seen that the MATCH, MUT and ADD for `r` are incompatible
 * with `a - 1 > r`. Let's check the last case: DEL.
 *
 * ```
 * r = d + 1          (definition of DEL)
 * a - 1 > r          (hypothesis)
 * a <= m + 1         (previous constraint)
 * ```
 * We can transform it:
 * ```
 * r - 1 = d          (move `1` to the left)
 * a > r + 1          (move `-1` to the right)
 * m + 1 >= a         (swap)
 * ```
 * And again:
 * ```
 * d = r - 1          (swap)
 * a > r + 1
 * m + 1 >= a
 * m + 1 > r + 1      (transitivity with line 2 and 3: m + 1 >= a > r + 1)
 * ```
 * And again:
 * ```
 * d = r - 1          (swap)
 * a > r + 1
 * m + 1 >= a
 * m > r              (cancel `1`)
 * ```
 * And again:
 * ```
 * d = r - 1
 * a > r + 1
 * m + 1 >= a
 * m > d + 1          (Substitute `r` for `d+1`)
 * ```
 * We can place these equations on the grid to better visualize the situation.
 * ```
 * ┼─────┼─────┼
 * │> d+1│> r+1│
 * ┼─────┼─────┼
 * │  d  │  r  │
 * ┼─────┼─────┼
 *
 * ```
 *
 * If we recap what we know:
 *
 * The cell above `r` can have a value (strictly) greater than `r + 1`
 * IF
 * The cell above `d` has a value (strictly) greater than `d + 1`.
 *
 * So to have a decrease of 2 or more between one cell and the cell below, we
 * have to have a decrease of 2 or more on the column to the left.
 * Recursively, to have a decrease of 2 or more on the column `j-1`, we need
 * this decrease on `j-2` so also on `j-3` and also on `j-4` and so on until we
 * reach the leftmost column...
 *
 * > The top row is initialized with integers from 0 to `n`, the left column
 * > with integers from 0 to `m`.
 *
 * The leftmost column is strictly increasing so it does not contain any
 * decrease of two or more. This means that the pattern described above is
 * impossible and `a - 1 > r` is not possible with a DEL operation.
 *
 * `a - 1 > r` is not possible with any operation, it is always false.
 * So, its opposite `a - 1 <= r` is always true. Or we could just have said that
 * the problem is symmetric if we reverse both strings.
 */

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvX2hlbHBlcnMvZGlmZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2Q0FBNkM7QUFDN0MsY0FBYztBQUNkLHNCQUFzQjtBQUN0Qiw4REFBOEQ7QUF5QzlEOzs7R0FHRztBQUNILE1BQU0sS0FBSztJQTBCVCxZQUFZLFFBQXFCLEVBQUUsS0FBYSxFQUFFLEdBQVcsRUFBRSxRQUFpQjtRQUM5RSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQU87UUFDYixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsS0FBSyxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDN0IsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsS0FBSyxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUM3QixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUN2QjthQUNGO1NBQ0Y7UUFDRCxP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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4TEciLCJmaWxlIjoibGliL19oZWxwZXJzL2RpZmYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSGlyc2NoYmVyZyBhbGdvcml0aG1cbi8vIFRpbWU6IE8obW4pXG4vLyBTcGFjZTogTyhtaW4obSwgbikpXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hpcnNjaGJlcmclMjdzX2FsZ29yaXRobVxuXG4vKlxuICogTGV2ZW5zaHRlaW4gZGlzdGFuY2VcbiAqXG4gKiBUaGUgZGlzdGFuY2UgaXMgY2FsY3VsYXRlIHdpdGggYSBncmlkIG9mIG4rMSBjb2x1bW5zIGFuZCBtKzEgbGluZXMuXG4gKlxuICogVGhlIHRvcCByb3cgaXMgaW5pdGlhbGl6ZWQgd2l0aCBpbnRlZ2VycyBmcm9tIDAgdG8gYG5gLCB0aGUgbGVmdCBjb2x1bW4gd2l0aFxuICogaW50ZWdlcnMgZnJvbSAwIHRvIGBtYC5cbiAqXG4gKiBUaGVuLCB3ZSBmaWxsIHRoZSBncmlkIHdpdGggdGhlIGZvbGxvd2luZyBlcXVhdGlvbjpcbiAqXG4gKiBgYGBcbiAqIOKUvOKUgOKUvOKUgOKUvCAgIHIgPSBtaW4oYSArIDEsIGQgKyAxLCBpc01hdGNoID8gbSA6IG0gKyAxKSAgICAgICAgICAgICAgICAgICBbZXEuIDAxXVxuICog4pSCbeKUgmHilIIgICAgICAgICAgIOKUlOKUgOKUrOKUgOKUmCAg4pSU4pSA4pSs4pSA4pSYICAgICAgICAgICAg4pSCICAg4pSU4pSA4pSs4pSA4pSYXG4gKiDilLzilIDilLzilIDilLwgICAgICAgICAgICBBREQgICAgREVMICAgICAgICAgIE1BVENIICAgTVVUXG4gKiDilIJk4pSCcuKUglxuICog4pS84pSA4pS84pSA4pS8XG4gKiBgYGBcbiAqXG4gKiBUaGUgcmVzdWx0IGRpc3RhbmNlIGNhbiBiZSBvYnRhaW5lZCBmcm9tIHRoZSBkaXN0YW5jZXMgb2YgcHJlZml4ZXMuXG4gKiBUaGUgdmFsdWUgb2J0YWluZWQgZnJvbSB0aGUgZGlzdGFuY2UgYG1gIGRlcGVuZHMgb24gdGhlIGNvbXBhcmlzb24gb2YgdGhlXG4gKiBjdXJyZW50IGl0ZW1zIChpc01hdGNoIG1lYW5zIHRoYXQgdGhlIGl0ZW1zIGFyZSBlcXVhbCkuIFRoZSBlcXVhbGl0eSB0ZXN0IGNhblxuICogYmUgZXhwZW5zaXZlIHNvIHdlIHdhbnQgdG8gYXZvaWQgaXQgd2hlbiBwb3NzaWJsZS5cbiAqIFdlIGNhbiBhdm9pZCB0aGUgdGVzdCBpZiB0aGUgZm9sbG93aW5nIGVxdWFsaXR5IGlzIHRydWU6XG4gKiBgYGBcbiAqIG1pbihhICsgMSwgZCArIDEpIDw9IG0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlcS4gMDJdXG4gKiBgYGBcbiAqIChJbiB0aGlzIGNhc2UsIGV2ZW4gaWYgd2UgZ2V0IGEgbWF0Y2ggaXQgd2lsbCBub3QgY2hhbmdlIHRoZSB2YWx1ZSBvZiBgcmApXG4gKlxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNlcXVlbmNlIG9mIGl0ZW1zOiBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkuXG4gKi9cbmludGVyZmFjZSBTZXF1ZW5jZTxUPiB7XG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIFtpbmRleDogbnVtYmVyXTogVDtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2xpY2Ugb2YgYSBzZXF1ZW5jZSBvZiBpdGVtcy4gVGhpcyBhbGxvd3MgdG8gYWJzdHJhY3QgdGhlIGFjY2VzcyB0byB0aGUgaXRlbXNcbiAqIGFuZCBwcmV2ZW50IGV4dHJhbmVvdXMgY29waWVzIG9mIHRoZSBzZXF1ZW5jZS5cbiAqL1xuY2xhc3MgU2xpY2U8VD4ge1xuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIHNlcXVlbmNlLlxuICAgKi9cbiAgc2VxdWVuY2U6IFNlcXVlbmNlPFQ+O1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIHNsaWNlLCByZWxhdGl2ZSB0byB0aGUgb3JpZ2luYWwgc2VxdWVuY2UuXG4gICAqL1xuICBzdGFydDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggKiphZnRlcioqIHRoZSBsYXN0IGl0ZW0gaW4gdGhlIHNsaWNlLCByZWxhdGl2ZSB0byB0aGUgb3JpZ2luYWwgc2VxdWVuY2UuXG4gICAqL1xuICBlbmQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGxlbmd0aCBvZiB0aGUgc2xpY2UuXG4gICAqL1xuICBsZW5ndGg6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV2ZXJzZSB0aGUgYWNjZXNzIHRvIHRoZSBpdGVtczogc2xpY2UuZ2V0KDApIHdpbGwgcmV0dXJuIHRoZSBsYXN0IGl0ZW0gaW5zdGVhZCBvZiB0aGUgZmlyc3QuXG4gICAqL1xuICByZXZlcnNlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihzZXF1ZW5jZTogU2VxdWVuY2U8VD4sIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCByZXZlcnNlZDogYm9vbGVhbikge1xuICAgIHRoaXMuc2VxdWVuY2UgPSBzZXF1ZW5jZTtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgdGhpcy5sZW5ndGggPSBlbmQgLSBzdGFydDtcbiAgICB0aGlzLnJldmVyc2VkID0gcmV2ZXJzZWQ7XG4gIH1cblxuICBpbmRleE9mKGl0ZW06IFQpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnJldmVyc2VkKSB7XG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSB0aGlzLmVuZCAtIDE7IGkgPj0gdGhpcy5zdGFydDsgaS0tKSB7XG4gICAgICAgIGlmICh0aGlzLnNlcXVlbmNlW2ldID09PSBpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW5kIC0gMSAtIGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gdGhpcy5zdGFydDsgaSA8IHRoaXMuZW5kOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2VbaV0gPT09IGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gaSAtIHRoaXMuc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgZ2V0SXRlbShpbmRleDogbnVtYmVyKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuc2VxdWVuY2VbdGhpcy5nZXRBYnNvbHV0ZUluZGV4KGluZGV4KV07XG4gIH1cblxuICBnZXRBYnNvbHV0ZUluZGV4KHJlbGF0aXZlSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMucmV2ZXJzZWQpIHtcbiAgICAgIHJldHVybiAodGhpcy5lbmQgLSAxKSAtIHJlbGF0aXZlSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXJ0ICsgcmVsYXRpdmVJbmRleDtcbiAgICB9XG4gIH1cblxuICBzcGxpdChpbmRleDogbnVtYmVyKTogW1NsaWNlPFQ+LCBTbGljZTxUPl0ge1xuICAgIGlmICh0aGlzLnJldmVyc2VkKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIkNhbm5vdCBzcGxpdCByZXZlcnNlZFwiKTtcbiAgICB9XG4gICAgY29uc3QgbGVmdDogU2xpY2U8VD4gPSBuZXcgU2xpY2UodGhpcy5zZXF1ZW5jZSwgdGhpcy5zdGFydCwgdGhpcy5zdGFydCArIGluZGV4LCBmYWxzZSk7XG4gICAgY29uc3QgcmlnaHQ6IFNsaWNlPFQ+ID0gbmV3IFNsaWNlKHRoaXMuc2VxdWVuY2UsIHRoaXMuc3RhcnQgKyBpbmRleCwgdGhpcy5lbmQsIGZhbHNlKTtcbiAgICByZXR1cm4gW2xlZnQsIHJpZ2h0XTtcbiAgfVxuXG4gIHJldmVyc2UoKTogU2xpY2U8VD4ge1xuICAgIHJldHVybiBuZXcgU2xpY2UodGhpcy5zZXF1ZW5jZSwgdGhpcy5zdGFydCwgdGhpcy5lbmQsIHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlmZkFjdGlvbiB7XG4gIHR5cGU6IFwic291cmNlXCIgfCBcInRhcmdldFwiIHwgXCJtYXRjaFwiO1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG50eXBlIEluZGV4VmFsdWUgPSBbbnVtYmVyLCBudW1iZXJdO1xuXG5mdW5jdGlvbiBuZWFyZXN0RW5kPFQ+KHNyYzogU2xpY2U8VD4sIHRhcmdldDogU2xpY2U8VD4pOiBJbmRleFZhbHVlIHtcbiAgY29uc3QgeDE6IG51bWJlciA9IDA7XG4gIGNvbnN0IHgyOiBudW1iZXIgPSBzcmMubGVuZ3RoO1xuICBjb25zdCB5MTogbnVtYmVyID0gMDtcbiAgY29uc3QgeTI6IG51bWJlciA9IHRhcmdldC5sZW5ndGg7XG4gIGNvbnN0IHhMZW46IG51bWJlciA9IHgyIC0geDE7XG4gIGNvbnN0IHlMZW46IG51bWJlciA9IHkyIC0geTE7XG5cbiAgLy8gV2UgZG8gbm90IG5lZWQgdG8gc3RvcmUgdGhlIHdob2xlIG1hdHJpeDogd2UganVzdCBuZWVkIHRoZSBjdXJyZW50IGFuZFxuICAvLyBwcmV2aW91cyByb3dzLlxuICBsZXQgb2xkRGlzdDogbnVtYmVyW10gPSBBcnJheSh5TGVuICsgMSk7XG4gIGxldCBjdXJEaXN0OiBudW1iZXJbXSA9IEFycmF5KHlMZW4gKyAxKTtcblxuICAvLyBGaWxsIHRoZSBmaXJzdCByb3dcbiAgZm9yIChsZXQgY29sOiBudW1iZXIgPSAwOyBjb2wgPD0geUxlbjsgY29sKyspIHtcbiAgICBjdXJEaXN0W2NvbF0gPSBjb2w7XG4gIH1cblxuICAvLyBUcmF2ZXJzZSB4U2VxXG4gIGZvciAobGV0IHJvdzogbnVtYmVyID0gMTsgcm93IDw9IHhMZW47IHJvdysrKSB7XG4gICAgW2N1ckRpc3QsIG9sZERpc3RdID0gW29sZERpc3QsIGN1ckRpc3RdO1xuXG4gICAgY29uc3Qgcm93SXRlbTogVCA9IHNyYy5nZXRJdGVtKHJvdyAtIDEpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBmaXJzdCBjb2x1bW5cbiAgICBjdXJEaXN0WzBdID0gcm93O1xuXG4gICAgLy8gQ29tcHV0ZSBkaXN0YW5jZXNcbiAgICBmb3IgKGxldCBjb2w6IG51bWJlciA9IDE7IGNvbCA8PSB5TGVuOyBjb2wrKykge1xuICAgICAgLy8gTmVhcmVzdCBkaXN0YW5jZSBpbiBjYXNlIG9mIEFERCBvciBERUxcbiAgICAgIGNvbnN0IGFkZERlbERpc3Q6IG51bWJlciA9IE1hdGgubWluKG9sZERpc3RbY29sXSwgY3VyRGlzdFtjb2wgLSAxXSkgKyAxO1xuICAgICAgLy8gTmVhcmVzdCBkaXN0YW5jZSBpbiBjYXNlIG9mIE1BVENIXG4gICAgICBjb25zdCBtYXRjaERpc3Q6IG51bWJlciA9IG9sZERpc3RbY29sIC0gMV07XG4gICAgICAvLyBOZWFyZXN0IGRpc3RhbmNlIGluIGNhc2Ugb2YgTVVUXG4gICAgICBjb25zdCBtdXREaXN0OiBudW1iZXIgPSBtYXRjaERpc3QgKyAxO1xuXG4gICAgICBpZiAoYWRkRGVsRGlzdCA8PSBtYXRjaERpc3QpIHtcbiAgICAgICAgLy8gU2VlIHRoZSBjb21tZW50IGFib3ZlIGFib3V0IHNraXBwaW5nIHRoZSB0ZXN0IGBjb2xJdGVtID09PSByb3dJdGVtYFxuICAgICAgICBjdXJEaXN0W2NvbF0gPSBhZGREZWxEaXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29sSXRlbTogVCA9IHRhcmdldC5nZXRJdGVtKGNvbCAtIDEpO1xuICAgICAgICBjdXJEaXN0W2NvbF0gPSBjb2xJdGVtID09PSByb3dJdGVtID8gbWF0Y2hEaXN0IDogbXV0RGlzdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZWFyY2ggZm9yIG1pbmltdW0gaW4gdGhlIGxhc3QgbGluZVxuICBsZXQgbWluRGlzdENvbDogbnVtYmVyID0gMDtcbiAgZm9yIChsZXQgY29sOiBudW1iZXIgPSAxOyBjb2wgPD0geUxlbjsgY29sKyspIHtcbiAgICAvLyBXZSB1c2UgZXF1YWxpdHkgdG8gZ2V0IHRoZSByaWdodG1vc3QgbWluaW1hbCB2YWx1ZS5cbiAgICBpZiAoY3VyRGlzdFtjb2xdIDw9IGN1ckRpc3RbbWluRGlzdENvbF0pIHtcbiAgICAgIG1pbkRpc3RDb2wgPSBjb2w7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWluRGlzdEluZGV4OiBudW1iZXIgPSBtaW5EaXN0Q29sIC0gMTtcbiAgY29uc3QgbWluRGlzdFZhbHVlOiBudW1iZXIgPSBjdXJEaXN0W21pbkRpc3RDb2xdO1xuICByZXR1cm4gW21pbkRpc3RJbmRleCwgbWluRGlzdFZhbHVlXTtcbn1cblxuZnVuY3Rpb24gaGlyc2NoYmVyZyhzb3VyY2U6IFNsaWNlPGFueT4sIHRhcmdldDogU2xpY2U8YW55Pik6IERpZmZBY3Rpb25bXSB7XG4gIGNvbnN0IHNyY0xlbjogbnVtYmVyID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgdGFyTGVuOiBudW1iZXIgPSB0YXJnZXQubGVuZ3RoO1xuXG4gIGlmIChzcmNMZW4gPT09IDAgfHwgdGFyTGVuID09PSAwKSB7XG4gICAgaWYgKHNyY0xlbiA+IDApIHtcbiAgICAgIHJldHVybiBbe3R5cGU6IFwic291cmNlXCIsIHZhbHVlOiBzcmNMZW59XTtcbiAgICB9IGVsc2UgaWYgKHRhckxlbiA+IDApIHtcbiAgICAgIHJldHVybiBbe3R5cGU6IFwidGFyZ2V0XCIsIHZhbHVlOiB0YXJMZW59XTtcbiAgICB9IGVsc2UgeyAgLy8gc3JjTGVuID09PSAwICYmIHRhckxlbiA9PT0gMFxuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfSBlbHNlIGlmIChzcmNMZW4gPT09IDEgfHwgdGFyTGVuID09PSAxKSB7XG4gICAgbGV0IGlkeDogbnVtYmVyID0gc291cmNlLmluZGV4T2YodGFyZ2V0LmdldEl0ZW0oMCkpO1xuICAgIGlmIChzcmNMZW4gPiAxICYmIGlkeCA+PSAwKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB7dHlwZTogXCJzb3VyY2VcIiwgdmFsdWU6IGlkeH0sXG4gICAgICAgIHt0eXBlOiBcIm1hdGNoXCIsIHZhbHVlOiAxfSxcbiAgICAgICAge3R5cGU6IFwic291cmNlXCIsIHZhbHVlOiBzcmNMZW4gLSBpZHggLSAxfSxcbiAgICAgIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkeCA9IHRhcmdldC5pbmRleE9mKHNvdXJjZS5nZXRJdGVtKDApKTtcbiAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHt0eXBlOiBcInRhcmdldFwiLCB2YWx1ZTogaWR4fSxcbiAgICAgICAgICB7dHlwZTogXCJtYXRjaFwiLCB2YWx1ZTogMX0sXG4gICAgICAgICAge3R5cGU6IFwidGFyZ2V0XCIsIHZhbHVlOiB0YXJMZW4gLSBpZHggLSAxfSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAge3R5cGU6IFwic291cmNlXCIsIHZhbHVlOiBzcmNMZW59LFxuICAgICAgICAgIHt0eXBlOiBcInRhcmdldFwiLCB2YWx1ZTogdGFyTGVufSxcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc3JjTWlkOiBudW1iZXIgPSBNYXRoLmZsb29yKHNyY0xlbiAvIDIpO1xuICAgIGNvbnN0IFtzcmNMZWZ0LCBzcmNSaWdodF06IFtTbGljZTxhbnk+LCBTbGljZTxhbnk+XSA9IHNvdXJjZS5zcGxpdChzcmNNaWQpO1xuICAgIGNvbnN0IFtsZWZ0TWluRGlzdElkeCwgbGVmdE1pblZhbF06IFtudW1iZXIsIG51bWJlcl0gPSBuZWFyZXN0RW5kKHNyY0xlZnQsIHRhcmdldCk7XG4gICAgY29uc3QgW3JpZ2h0TWluRGlzdElkeCwgcmlnaHRNaW5WYWxdOiBbbnVtYmVyLCBudW1iZXJdID0gbmVhcmVzdEVuZChzcmNSaWdodC5yZXZlcnNlKCksIHRhcmdldC5yZXZlcnNlKCkpO1xuICAgIGxldCB0YXJnZXRNaWQ6IG51bWJlcjtcbiAgICBpZiAobGVmdE1pblZhbCA8PSByaWdodE1pblZhbCkge1xuICAgICAgLy8gV2UgYWRkIG9uZSBiZWNhdXNlIHRoZSByaWdodCBvZiB0aGUgcmFuZ2UgaXMgZXhjbHVzaXZlXG4gICAgICB0YXJnZXRNaWQgPSBsZWZ0TWluRGlzdElkeCArIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENvbnZlcnQgdGhlIHJpZ2h0IGluZGV4IGZyb20gdGhlIHJldmVyc2VkIHRhclJpZ2h0IHRvIHRhcmdldFxuICAgICAgdGFyZ2V0TWlkID0gKHRhcmdldC5sZW5ndGggLSAxKSAtIHJpZ2h0TWluRGlzdElkeDtcbiAgICB9XG4gICAgY29uc3QgW3RhckxlZnQsIHRhclJpZ2h0XTogW1NsaWNlPGFueT4sIFNsaWNlPGFueT5dID0gdGFyZ2V0LnNwbGl0KHRhcmdldE1pZCk7XG4gICAgY29uc3QgbGVmdDogRGlmZkFjdGlvbltdID0gaGlyc2NoYmVyZyhzcmNMZWZ0LCB0YXJMZWZ0KTtcbiAgICBjb25zdCByaWdodDogRGlmZkFjdGlvbltdID0gaGlyc2NoYmVyZyhzcmNSaWdodCwgdGFyUmlnaHQpO1xuICAgIHJldHVybiBbLi4ubGVmdCwgLi4ucmlnaHRdO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVEaWZmKGRpZmY6IERpZmZBY3Rpb25bXSk6IERpZmZBY3Rpb25bXSB7XG4gIGNvbnN0IHJlc3VsdDogRGlmZkFjdGlvbltdID0gW107XG4gIGlmIChkaWZmLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgbGV0IGN1clNvdXJjZTogbnVtYmVyID0gMDtcbiAgbGV0IGN1clRhcmdldDogbnVtYmVyID0gMDtcbiAgbGV0IGN1ckJvdGg6IG51bWJlciA9IDA7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIGRpZmYpIHtcbiAgICBpZiAoYWN0aW9uLnZhbHVlID09PSAwKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFwibWF0Y2hcIikge1xuICAgICAgaWYgKGN1clNvdXJjZSA+IDApIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe3R5cGU6IFwic291cmNlXCIsIHZhbHVlOiBjdXJTb3VyY2V9KTtcbiAgICAgICAgY3VyU291cmNlID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJUYXJnZXQgPiAwKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHt0eXBlOiBcInRhcmdldFwiLCB2YWx1ZTogY3VyVGFyZ2V0fSk7XG4gICAgICAgIGN1clRhcmdldCA9IDA7XG4gICAgICB9XG4gICAgICBjdXJCb3RoICs9IGFjdGlvbi52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGN1ckJvdGggPiAwKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHt0eXBlOiBcIm1hdGNoXCIsIHZhbHVlOiBjdXJCb3RofSk7XG4gICAgICAgIGN1ckJvdGggPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBcInNvdXJjZVwiKSB7XG4gICAgICAgIGN1clNvdXJjZSArPSBhY3Rpb24udmFsdWU7XG4gICAgICB9IGVsc2UgeyAvLyBhY3Rpb24udHlwZSA9PT0gXCJ0YXJnZXRcIlxuICAgICAgICBjdXJUYXJnZXQgKz0gYWN0aW9uLnZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoY3VyU291cmNlID4gMCkge1xuICAgIHJlc3VsdC5wdXNoKHt0eXBlOiBcInNvdXJjZVwiLCB2YWx1ZTogY3VyU291cmNlfSk7XG4gIH1cbiAgaWYgKGN1clRhcmdldCA+IDApIHtcbiAgICByZXN1bHQucHVzaCh7dHlwZTogXCJ0YXJnZXRcIiwgdmFsdWU6IGN1clRhcmdldH0pO1xuICB9XG4gIGlmIChjdXJCb3RoID4gMCkge1xuICAgIHJlc3VsdC5wdXNoKHt0eXBlOiBcIm1hdGNoXCIsIHZhbHVlOiBjdXJCb3RofSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZTeW5jKHNlcTE6IHN0cmluZyB8IGFueVtdLCBzZXEyOiBzdHJpbmcgfCBhbnlbXSk6IERpZmZBY3Rpb25bXSB7XG4gIHJldHVybiBub3JtYWxpemVEaWZmKGhpcnNjaGJlcmcobmV3IFNsaWNlKHNlcTEsIDAsIHNlcTEubGVuZ3RoLCBmYWxzZSksIG5ldyBTbGljZShzZXEyLCAwLCBzZXEyLmxlbmd0aCwgZmFsc2UpKSk7XG59XG5cbi8qXG4gKiBTdHJ1Y3R1cmUgb2YgdGhlIExldmVuc2h0ZWluIG1hdHJpeFxuICpcbiAqIExldCdzIHNlZSB3aGljaCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZ3JpZCB3ZSBjYW4gZ2V0IGZyb20gdGhlIGVxdWF0aW9uXG4gKiBvZiBgcmAuXG4gKiBCeSBkZWZpbml0aW9uIG9mIGBtaW5gLCB3ZSBoYXZlOlxuICpcbiAqIGBgYFxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilIJt4pSCYeKUgiAgIHIgPD0gbSArIDEgIChUaGlzIGlzIHRydWUgaW5kZXBlbmRlbnRseSBvZiBgaXNNYXRjaGApICAgICAgICBbZXEuIDAzXVxuICog4pS84pSA4pS84pSA4pS8ICAgciA8PSBhICsgMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlcS4gMDRdXG4gKiDilIJk4pSCcuKUgiAgIHIgPD0gZCArIDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXEuIDA1XVxuICog4pS84pSA4pS84pSA4pS8XG4gKiBgYGBcbiAqXG4gKiBUaGlzIG1lYW5zIHRoYXQgZ3Jvd3RoIG9mIHRoZSBkaXN0YW5jZSB3aGVuIHdlIGdvIHRvIHRoZSByaWdodCBvciBkb3duIGlzXG4gKiBib3VuZGVkLiBZb3UgY2Fubm90IGluY3JlYXNlIG9mIG1vcmUgdGhhbiAxIHdoZW4gZ29pbmcgdG8gdGhlIHJpZ2h0IG9yIGRvd24uXG4gKlxuICogSXQgbWVhbnMgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmZpZ3VyYXRpb25zIGFyZSBpbXBvc3NpYmxlOlxuICpcbiAqIGBgYFxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilII14pSCIOKUgiAgIElNUE9TU0lCTEUsIGJyZWFrczogciA8PSBtICsgMVxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilIIg4pSCN+KUglxuICog4pS84pSA4pS84pSA4pS8XG4gKlxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilIIg4pSCNeKUgiAgIElNUE9TU0lCTEUsIGJyZWFrczogciA8PSBhICsgMVxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilIIg4pSCN+KUglxuICog4pS84pSA4pS84pSA4pS8XG4gKlxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilIIg4pSCIOKUgiAgIElNUE9TU0lCTEUsIGJyZWFrczogciA8PSBkICsgMVxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilII14pSCN+KUglxuICog4pS84pSA4pS84pSA4pS8XG4gKiBgYGBcbiAqXG4gKiBTaW5jZSB0aGVzZSBpbmVxdWFsaXRpZXMgYXJlIHJlbGF0aXZlIHRvIGEgYHJgLCB3ZSBjYW4gdHJhbnNsYXRlIHRoZW06XG4gKiBgYGBcbiAqIOKUvOKUgOKUvOKUgOKUvFxuICog4pSCbeKUgmHilIIgICBkIDw9IG0gKyAxICAgKGZyb20gW2VxLiA0XSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VxLiAwNl1cbiAqIOKUvOKUgOKUvOKUgOKUvCAgIGEgPD0gbSArIDEgICAoZnJvbSBbZXEuIDVdKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXEuIDA3XVxuICog4pSCZOKUgnLilIJcbiAqIOKUvOKUgOKUvOKUgOKUvFxuICogYGBgXG4gKlxuICogV2UgY2FuIGFsc28gYWRkIGEgbG93ZXIgYm91bmQgdG8gdGhlIGdyb3d0aCB3aGVuIGdvaW5nIHRvIHRoZSByaWdodCBvciBkb3duOlxuICogYGBgXG4gKiBhIC0gMSA8PSByICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXEuIDA4XVxuICogZCAtIDEgPD0gciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VxLiAwOV1cbiAqIGBgYFxuICogU28gYHJgIGNhbm5vdCBncm93IGZhc3RlciB0aGFuIGAxYCBwZXIgY2VsbCwgYnV0IGFsc28gY2Fubm90IGRlY3JlYXNlIGZhc3Rlci5cbiAqXG4gKiBUaGlzIG1lYW5zIHRoYXQgdGhlIGZvbGxvd2luZyBjb25maWd1cmF0aW9uIGFyZSBpbXBvc3NpYmxlOlxuICpcbiAqIGBgYFxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilIIg4pSCN+KUgiAgIElNUE9TU0lCTEUsIGJyZWFrczogYSAtIDEgPD0gclxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilIIg4pSCNeKUglxuICog4pS84pSA4pS84pSA4pS8XG4gKlxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilIIg4pSCIOKUgiAgIElNUE9TU0lCTEUsIGJyZWFrczogZCAtIDEgPD0gclxuICog4pS84pSA4pS84pSA4pS8XG4gKiDilII34pSCNeKUglxuICog4pS84pSA4pS84pSA4pS8XG4gKiBgYGBcbiAqXG4gKiBXZSB3aWxsIG9ubHkgcHJvdmUgdGhlIGZpcnN0IGluZXF1YWxpdHkgYGEgLSAxIDw9IHJgIHNpbmNlIGJvdGggaW5lcXVhbGl0aWVzXG4gKiBhcmUgaW4gZmFjdCBlcXVpdmFsZW50IGR1ZSB0byB0aGUgc3ltbWV0cnkgb2YgdGhlIHByb2JsZW0uXG4gKlxuICogVG8gZGVtb25zdHJhdGUgaXQsIHdlJ2xsIHVzZSBhIHByb29mIGJ5IGNvbnRyYWRpY3Rpb246IHdlIHdpbGwgc2hvdyB0aGF0IGl0XG4gKiBzaW1wbHkgY2Fubm90IGJlIG90aGVyd2lzZS5cbiAqIFRoZSBvcHBvc2l0ZSBvZiBgYSAtIDEgPD0gcmAgaXM6XG4gKiBgYGBcbiAqIGEgLSAxID4gciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlcS4gMTBdXG4gKiBgYGBcbiAqIFRoaXMgaW5lcXVhbGl0eSBpcyBpbmNvbXBhdGlibGUgd2l0aCB0aGUgdmFsdWUgb2YgYHJgIHdoZXRoZXIgaXQgY29tZXMgZnJvbVxuICogYSBNQVRDSCwgTVVULCBBREQgb3IgREVMOlxuICpcbiAqXG4gKiBNQVRDSDpcbiAqIGBgYFxuICogciA9IG0gICAgICAgICAgICAgIChkZWZpbml0aW9uIG9mIE1BVENIKVxuICogYSAtIDEgPiByICAgICAgICAgIChoeXBvdGhlc2lzKVxuICogYSA8PSBtICsgMSAgICAgICAgIChwcmV2aW91cyBjb25zdHJhaW50IFtlcS4gMDddKVxuICogYGBgXG4gKiBXZSBjYW4gdHJhbnNmb3JtIGl0OlxuICogYGBgXG4gKiByID0gbVxuICogYSA+IHIgKyAxICAgICAgICAgIChtb3ZlIGAtMWAgdG8gdGhlIHJpZ2h0IHNpZGUpXG4gKiBhIDw9IHIgKyAxICAgICAgICAgKHN1YnN0aXR1dGUgYG1gIGZvciBgcmApXG4gKiBgYGBcbiAqIFRoaXMgc3lzdGVtIGRvZXMgbm90IGhhdmUgYW55IHNvbHV0aW9uLlxuICpcbiAqIE1VVDpcbiAqIGBgYFxuICogciA9IG0gKyAxICAgICAgICAgIChkZWZpbml0aW9uIG9mIE1VVClcbiAqIGEgLSAxID4gciAgICAgICAgICAoaHlwb3RoZXNpcylcbiAqIGEgPD0gbSArIDEgICAgICAgICAocHJldmlvdXMgY29uc3RyYWludCBbZXEuIDA3XSlcbiAqIGBgYFxuICogV2UgY2FuIHRyYW5zZm9ybSBpdDpcbiAqIGBgYFxuICogciA9IG1cbiAqIGEgPiByICsgMSAgICAgICAgICAobW92ZSBgLTFgIHRvIHRoZSByaWdodCBzaWRlKVxuICogYSA8PSByICAgICAgICAgICAgIChzdWJzdGl0dXRlIGBtICsgMWAgZm9yIGByYClcbiAqIGBgYFxuICogVGhpcyBzeXN0ZW0gZG9lcyBub3QgaGF2ZSBhbnkgc29sdXRpb24uXG4gKlxuICpcbiAqIEFERDpcbiAqIGBgYFxuICogciA9IGEgKyAxICAgICAgICAgIChkZWZpbml0aW9uIG9mIEFERClcbiAqIGEgLSAxID4gciAgICAgICAgICAoaHlwb3RoZXNpcylcbiAqIGBgYFxuICogVGhpcyBzeXN0ZW0gZG9lcyBub3QgaGF2ZSBhbnkgc29sdXRpb24uXG4gKlxuICpcbiAqIERFTDpcbiAqIFNvIGZhciB3ZSd2ZSBzZWVuIHRoYXQgdGhlIE1BVENILCBNVVQgYW5kIEFERCBmb3IgYHJgIGFyZSBpbmNvbXBhdGlibGVcbiAqIHdpdGggYGEgLSAxID4gcmAuIExldCdzIGNoZWNrIHRoZSBsYXN0IGNhc2U6IERFTC5cbiAqXG4gKiBgYGBcbiAqIHIgPSBkICsgMSAgICAgICAgICAoZGVmaW5pdGlvbiBvZiBERUwpXG4gKiBhIC0gMSA+IHIgICAgICAgICAgKGh5cG90aGVzaXMpXG4gKiBhIDw9IG0gKyAxICAgICAgICAgKHByZXZpb3VzIGNvbnN0cmFpbnQpXG4gKiBgYGBcbiAqIFdlIGNhbiB0cmFuc2Zvcm0gaXQ6XG4gKiBgYGBcbiAqIHIgLSAxID0gZCAgICAgICAgICAobW92ZSBgMWAgdG8gdGhlIGxlZnQpXG4gKiBhID4gciArIDEgICAgICAgICAgKG1vdmUgYC0xYCB0byB0aGUgcmlnaHQpXG4gKiBtICsgMSA+PSBhICAgICAgICAgKHN3YXApXG4gKiBgYGBcbiAqIEFuZCBhZ2FpbjpcbiAqIGBgYFxuICogZCA9IHIgLSAxICAgICAgICAgIChzd2FwKVxuICogYSA+IHIgKyAxXG4gKiBtICsgMSA+PSBhXG4gKiBtICsgMSA+IHIgKyAxICAgICAgKHRyYW5zaXRpdml0eSB3aXRoIGxpbmUgMiBhbmQgMzogbSArIDEgPj0gYSA+IHIgKyAxKVxuICogYGBgXG4gKiBBbmQgYWdhaW46XG4gKiBgYGBcbiAqIGQgPSByIC0gMSAgICAgICAgICAoc3dhcClcbiAqIGEgPiByICsgMVxuICogbSArIDEgPj0gYVxuICogbSA+IHIgICAgICAgICAgICAgIChjYW5jZWwgYDFgKVxuICogYGBgXG4gKiBBbmQgYWdhaW46XG4gKiBgYGBcbiAqIGQgPSByIC0gMVxuICogYSA+IHIgKyAxXG4gKiBtICsgMSA+PSBhXG4gKiBtID4gZCArIDEgICAgICAgICAgKFN1YnN0aXR1dGUgYHJgIGZvciBgZCsxYClcbiAqIGBgYFxuICogV2UgY2FuIHBsYWNlIHRoZXNlIGVxdWF0aW9ucyBvbiB0aGUgZ3JpZCB0byBiZXR0ZXIgdmlzdWFsaXplIHRoZSBzaXR1YXRpb24uXG4gKiBgYGBcbiAqIOKUvOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUvFxuICog4pSCPiBkKzHilII+IHIrMeKUglxuICog4pS84pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pS8XG4gKiDilIIgIGQgIOKUgiAgciAg4pSCXG4gKiDilLzilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilLxcbiAqXG4gKiBgYGBcbiAqXG4gKiBJZiB3ZSByZWNhcCB3aGF0IHdlIGtub3c6XG4gKlxuICogVGhlIGNlbGwgYWJvdmUgYHJgIGNhbiBoYXZlIGEgdmFsdWUgKHN0cmljdGx5KSBncmVhdGVyIHRoYW4gYHIgKyAxYFxuICogSUZcbiAqIFRoZSBjZWxsIGFib3ZlIGBkYCBoYXMgYSB2YWx1ZSAoc3RyaWN0bHkpIGdyZWF0ZXIgdGhhbiBgZCArIDFgLlxuICpcbiAqIFNvIHRvIGhhdmUgYSBkZWNyZWFzZSBvZiAyIG9yIG1vcmUgYmV0d2VlbiBvbmUgY2VsbCBhbmQgdGhlIGNlbGwgYmVsb3csIHdlXG4gKiBoYXZlIHRvIGhhdmUgYSBkZWNyZWFzZSBvZiAyIG9yIG1vcmUgb24gdGhlIGNvbHVtbiB0byB0aGUgbGVmdC5cbiAqIFJlY3Vyc2l2ZWx5LCB0byBoYXZlIGEgZGVjcmVhc2Ugb2YgMiBvciBtb3JlIG9uIHRoZSBjb2x1bW4gYGotMWAsIHdlIG5lZWRcbiAqIHRoaXMgZGVjcmVhc2Ugb24gYGotMmAgc28gYWxzbyBvbiBgai0zYCBhbmQgYWxzbyBvbiBgai00YCBhbmQgc28gb24gdW50aWwgd2VcbiAqIHJlYWNoIHRoZSBsZWZ0bW9zdCBjb2x1bW4uLi5cbiAqXG4gKiA+IFRoZSB0b3Agcm93IGlzIGluaXRpYWxpemVkIHdpdGggaW50ZWdlcnMgZnJvbSAwIHRvIGBuYCwgdGhlIGxlZnQgY29sdW1uXG4gKiA+IHdpdGggaW50ZWdlcnMgZnJvbSAwIHRvIGBtYC5cbiAqXG4gKiBUaGUgbGVmdG1vc3QgY29sdW1uIGlzIHN0cmljdGx5IGluY3JlYXNpbmcgc28gaXQgZG9lcyBub3QgY29udGFpbiBhbnlcbiAqIGRlY3JlYXNlIG9mIHR3byBvciBtb3JlLiBUaGlzIG1lYW5zIHRoYXQgdGhlIHBhdHRlcm4gZGVzY3JpYmVkIGFib3ZlIGlzXG4gKiBpbXBvc3NpYmxlIGFuZCBgYSAtIDEgPiByYCBpcyBub3QgcG9zc2libGUgd2l0aCBhIERFTCBvcGVyYXRpb24uXG4gKlxuICogYGEgLSAxID4gcmAgaXMgbm90IHBvc3NpYmxlIHdpdGggYW55IG9wZXJhdGlvbiwgaXQgaXMgYWx3YXlzIGZhbHNlLlxuICogU28sIGl0cyBvcHBvc2l0ZSBgYSAtIDEgPD0gcmAgaXMgYWx3YXlzIHRydWUuIE9yIHdlIGNvdWxkIGp1c3QgaGF2ZSBzYWlkIHRoYXRcbiAqIHRoZSBwcm9ibGVtIGlzIHN5bW1ldHJpYyBpZiB3ZSByZXZlcnNlIGJvdGggc3RyaW5ncy5cbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
