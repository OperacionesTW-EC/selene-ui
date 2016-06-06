const schemas = {
    devices : {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "count": {
                "type": "integer"
            },
            "next": {
                "type": "null"
            },
            "previous": {
                "type": "null"
            },
            "results": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "device_type_name": {
                            "type": "string"
                        },
                        "full_code": {
                            "type": "string"
                        },
                        "device_brand_name": {
                            "type": "string"
                        },
                        "device_type": {
                            "type": "integer"
                        },
                        "device_brand": {
                            "type": "integer"
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
                            "type": ["string", "null"]
                        },
                        "device_status": {
                            "type": "integer"
                        },
                        "device_status_name": {
                            "type": "string"
                        },
                        "life_end_date": {
                            "type": ["string", "null"]
                        },
                        "life_start_date": {
                            "type": ["string", "null"]
                        }
                    },
                    "required": [
                        "id",
                        "device_type_name",
                        "full_code",
                        "device_brand_name",
                        "device_type",
                        "device_brand",
                        "asset",
                        "ownership",
                        "serial_number",
                        "model",
                        "purchase_date",
                        "device_status",
                        "device_status_name",
                        "life_end_date",
                        "life_start_date"
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
