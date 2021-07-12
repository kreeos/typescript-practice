"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var API_PORT = 3000;
app.get("/", function (req, res, next) {
    res.send("Hello TS express!!");
});
app.listen(API_PORT, function () {
    console.log("API server runnning at ", API_PORT);
});
exports.default = app;
