const express = require('express');

exports.expressConfig = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
};