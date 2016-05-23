const schemas = {
    devices : {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "count": {
                "type": "integer"
            },
            "next": {
                "type": ["string","null"]
            },
            "previous": {
                "type": ["string","null"]
            },
            "results": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "device_type": {
                            "type": "integer"
                        },
                        "full_code": {
                            "type": "string"
                        },
                        "device_brand": {
                            "type": "integer"
                        },
                        "device_status": {
                            "type": "integer"
                        },
                        "device_type_name": {
                            "type": "string"
                        },
                        "device_brand_name": {
                            "type": "string"
                        },
                        "device_status_name": {
                            "type": "string"
                        },
                        "asset": {
                            "type": "integer"
                        },
                        "ownership": {
                            "type": "string"
                        },
                        "serial_number": {
                            "type": "string"
                        },
                        "model": {
                            "type": "string"
                        },
                        "purchase_date": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "id",
                        "device_type",
                        "device_brand",
                        "asset",
                        "ownership",
                        "serial_number",
                        "model",
                        "purchase_date"
                    ]
                }
            }
        },
        "required": [
            "count",
            "next",
            "previous",
            "results"
        ]
    }
};

module.exports = schemas;
