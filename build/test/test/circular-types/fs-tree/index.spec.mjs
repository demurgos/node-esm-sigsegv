import { runTests } from "../../helpers/test";
import { $File } from "./file";
import { $FsNode } from "./fs-node";
import { FsNodeType } from "./fs-node-type";
/**
 * Modelizes a simple file system with two kinds of nodes: files and directories.
 */
describe("FS Tree", function () {
    describe("File", function () {
        const items = [
            {
                value: { tag: FsNodeType.File, name: "a", size: 1 },
                valid: true,
                output: {
                    json: "{\"tag\":\"Node/File\",\"name\":\"a\",\"size\":1}",
                },
            },
            { value: { tag: FsNodeType.File, name: 2, size: 1 }, valid: false },
        ];
        runTests($File, items);
    });
    describe("FsNode", function () {
        const items = [
            { value: { tag: FsNodeType.File, name: "a", size: 1 }, valid: true },
            { value: { tag: FsNodeType.File, name: 2, size: 1 }, valid: false },
        ];
        runTests($FsNode, items);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2NpcmN1bGFyLXR5cGVzL2ZzLXRyZWUvaW5kZXguc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1Qzs7R0FFRztBQUNILFFBQVEsQ0FBQyxTQUFTLEVBQUU7SUFDbEIsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNmLE1BQU0sS0FBSyxHQUFpQjtZQUMxQjtnQkFDRSxLQUFLLEVBQUUsRUFBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUM7Z0JBQ2pELEtBQUssRUFBRSxJQUFJO2dCQUNYLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsbURBQW1EO2lCQUMxRDthQUNGO1lBQ0QsRUFBQyxLQUFLLEVBQUUsRUFBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1NBQ2hFLENBQUM7UUFDRixRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNqQixNQUFNLEtBQUssR0FBaUI7WUFDMUIsRUFBQyxLQUFLLEVBQUUsRUFBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1lBQ2hFLEVBQUMsS0FBSyxFQUFFLEVBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztTQUNoRSxDQUFDO1FBQ0YsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvY2lyY3VsYXItdHlwZXMvZnMtdHJlZS9pbmRleC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcnVuVGVzdHMsIFR5cGVkVmFsdWUgfSBmcm9tIFwiLi4vLi4vaGVscGVycy90ZXN0XCI7XG5pbXBvcnQgeyAkRmlsZSB9IGZyb20gXCIuL2ZpbGVcIjtcbmltcG9ydCB7ICRGc05vZGUgfSBmcm9tIFwiLi9mcy1ub2RlXCI7XG5pbXBvcnQgeyBGc05vZGVUeXBlIH0gZnJvbSBcIi4vZnMtbm9kZS10eXBlXCI7XG5cbi8qKlxuICogTW9kZWxpemVzIGEgc2ltcGxlIGZpbGUgc3lzdGVtIHdpdGggdHdvIGtpbmRzIG9mIG5vZGVzOiBmaWxlcyBhbmQgZGlyZWN0b3JpZXMuXG4gKi9cbmRlc2NyaWJlKFwiRlMgVHJlZVwiLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKFwiRmlsZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaXRlbXM6IFR5cGVkVmFsdWVbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IHt0YWc6IEZzTm9kZVR5cGUuRmlsZSwgbmFtZTogXCJhXCIsIHNpemU6IDF9LFxuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAganNvbjogXCJ7XFxcInRhZ1xcXCI6XFxcIk5vZGUvRmlsZVxcXCIsXFxcIm5hbWVcXFwiOlxcXCJhXFxcIixcXFwic2l6ZVxcXCI6MX1cIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7dmFsdWU6IHt0YWc6IEZzTm9kZVR5cGUuRmlsZSwgbmFtZTogMiwgc2l6ZTogMX0sIHZhbGlkOiBmYWxzZX0sXG4gICAgXTtcbiAgICBydW5UZXN0cygkRmlsZSwgaXRlbXMpO1xuICB9KTtcblxuICBkZXNjcmliZShcIkZzTm9kZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaXRlbXM6IFR5cGVkVmFsdWVbXSA9IFtcbiAgICAgIHt2YWx1ZToge3RhZzogRnNOb2RlVHlwZS5GaWxlLCBuYW1lOiBcImFcIiwgc2l6ZTogMX0sIHZhbGlkOiB0cnVlfSxcbiAgICAgIHt2YWx1ZToge3RhZzogRnNOb2RlVHlwZS5GaWxlLCBuYW1lOiAyLCBzaXplOiAxfSwgdmFsaWQ6IGZhbHNlfSxcbiAgICBdO1xuICAgIHJ1blRlc3RzKCRGc05vZGUsIGl0ZW1zKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
