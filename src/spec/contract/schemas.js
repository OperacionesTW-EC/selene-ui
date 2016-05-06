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
                        "device_type": {
                            "type": "object",
                            "properties": {
                                "url": {
                                    "type": "string"
                                },
                                "name": {
                                    "type": "string"
                                },
                                "code": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "url",
                                "name",
                                "code"
                            ]
                        },
                        "device_brand": {
                            "type": "object",
                            "properties": {
                                "url": {
                                    "type": "string"
                                },
                                "name": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "url",
                                "name"
                            ]
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