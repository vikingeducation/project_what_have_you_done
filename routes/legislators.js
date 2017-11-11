'use strict';

const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const router = express.Router();
const dotenv = require('dotenv').config();
const env = require('../.env');
const Members = require('../members.js');
const localReps = require('../index.js');

router.get('/', (req, res, next) => {});

router.get('/:id', (req, res, next) => {});
