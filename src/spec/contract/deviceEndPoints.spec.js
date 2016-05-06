import expect from 'expect';
import $ from 'jquery';
import Schemas from './schemas';

var Validator = require('jsonschema').Validator;

describe('GET index', () => {
    it('should have a valid schema', () => {
        var v = new Validator();
        var schema = Schemas.devices;
        let result;
        let url = process.env.CONTRACT_URL || 'http://localhost:8000';
        $.ajax({
            type: 'GET',
            datatype: 'json',
            async: false,
            url: url+'/devices/',
            success: function (data) {
                result = v.validate(data, schema).errors.length
            }
        });
        expect(result).toBe(0);
    });
});