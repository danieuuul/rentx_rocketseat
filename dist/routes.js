"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourse = void 0;
const CreateCourse_1 = __importDefault(require("./CreateCourse"));
function CreateCourse(request, response) {
    CreateCourse_1.default.execute({ name: "Nodejs", educator: 'Daniel' });
    CreateCourse_1.default.execute({ name: "Nodejs", duration: 15, educator: 'Diego' });
    return response.send();
}
exports.CreateCourse = CreateCourse;
