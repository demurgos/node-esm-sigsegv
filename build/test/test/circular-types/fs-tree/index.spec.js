"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../helpers/test");
const file_1 = require("./file");
const fs_node_1 = require("./fs-node");
const fs_node_type_1 = require("./fs-node-type");
/**
 * Modelizes a simple file system with two kinds of nodes: files and directories.
 */
describe("FS Tree", function () {
    describe("File", function () {
        const items = [
            {
                value: { tag: fs_node_type_1.FsNodeType.File, name: "a", size: 1 },
                valid: true,
                output: {
                    json: "{\"tag\":\"Node/File\",\"name\":\"a\",\"size\":1}",
                },
            },
            { value: { tag: fs_node_type_1.FsNodeType.File, name: 2, size: 1 }, valid: false },
        ];
        test_1.runTests(file_1.$File, items);
    });
    describe("FsNode", function () {
        const items = [
            { value: { tag: fs_node_type_1.FsNodeType.File, name: "a", size: 1 }, valid: true },
            { value: { tag: fs_node_type_1.FsNodeType.File, name: 2, size: 1 }, valid: false },
        ];
        test_1.runTests(fs_node_1.$FsNode, items);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2NpcmN1bGFyLXR5cGVzL2ZzLXRyZWUvaW5kZXguc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUEwRDtBQUMxRCxpQ0FBK0I7QUFDL0IsdUNBQW9DO0FBQ3BDLGlEQUE0QztBQUU1Qzs7R0FFRztBQUNILFFBQVEsQ0FBQyxTQUFTLEVBQUU7SUFDbEIsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNmLE1BQU0sS0FBSyxHQUFpQjtZQUMxQjtnQkFDRSxLQUFLLEVBQUUsRUFBQyxHQUFHLEVBQUUseUJBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDO2dCQUNqRCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLG1EQUFtRDtpQkFDMUQ7YUFDRjtZQUNELEVBQUMsS0FBSyxFQUFFLEVBQUMsR0FBRyxFQUFFLHlCQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7U0FDaEUsQ0FBQztRQUNGLGVBQVEsQ0FBQyxZQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2pCLE1BQU0sS0FBSyxHQUFpQjtZQUMxQixFQUFDLEtBQUssRUFBRSxFQUFDLEdBQUcsRUFBRSx5QkFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1lBQ2hFLEVBQUMsS0FBSyxFQUFFLEVBQUMsR0FBRyxFQUFFLHlCQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7U0FDaEUsQ0FBQztRQUNGLGVBQVEsQ0FBQyxpQkFBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9jaXJjdWxhci10eXBlcy9mcy10cmVlL2luZGV4LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBydW5UZXN0cywgVHlwZWRWYWx1ZSB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3Rlc3RcIjtcbmltcG9ydCB7ICRGaWxlIH0gZnJvbSBcIi4vZmlsZVwiO1xuaW1wb3J0IHsgJEZzTm9kZSB9IGZyb20gXCIuL2ZzLW5vZGVcIjtcbmltcG9ydCB7IEZzTm9kZVR5cGUgfSBmcm9tIFwiLi9mcy1ub2RlLXR5cGVcIjtcblxuLyoqXG4gKiBNb2RlbGl6ZXMgYSBzaW1wbGUgZmlsZSBzeXN0ZW0gd2l0aCB0d28ga2luZHMgb2Ygbm9kZXM6IGZpbGVzIGFuZCBkaXJlY3Rvcmllcy5cbiAqL1xuZGVzY3JpYmUoXCJGUyBUcmVlXCIsIGZ1bmN0aW9uICgpIHtcbiAgZGVzY3JpYmUoXCJGaWxlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBpdGVtczogVHlwZWRWYWx1ZVtdID0gW1xuICAgICAge1xuICAgICAgICB2YWx1ZToge3RhZzogRnNOb2RlVHlwZS5GaWxlLCBuYW1lOiBcImFcIiwgc2l6ZTogMX0sXG4gICAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBqc29uOiBcIntcXFwidGFnXFxcIjpcXFwiTm9kZS9GaWxlXFxcIixcXFwibmFtZVxcXCI6XFxcImFcXFwiLFxcXCJzaXplXFxcIjoxfVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHt2YWx1ZToge3RhZzogRnNOb2RlVHlwZS5GaWxlLCBuYW1lOiAyLCBzaXplOiAxfSwgdmFsaWQ6IGZhbHNlfSxcbiAgICBdO1xuICAgIHJ1blRlc3RzKCRGaWxlLCBpdGVtcyk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwiRnNOb2RlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBpdGVtczogVHlwZWRWYWx1ZVtdID0gW1xuICAgICAge3ZhbHVlOiB7dGFnOiBGc05vZGVUeXBlLkZpbGUsIG5hbWU6IFwiYVwiLCBzaXplOiAxfSwgdmFsaWQ6IHRydWV9LFxuICAgICAge3ZhbHVlOiB7dGFnOiBGc05vZGVUeXBlLkZpbGUsIG5hbWU6IDIsIHNpemU6IDF9LCB2YWxpZDogZmFsc2V9LFxuICAgIF07XG4gICAgcnVuVGVzdHMoJEZzTm9kZSwgaXRlbXMpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
