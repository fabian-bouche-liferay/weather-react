# Sample Weather React client extension

This sample client extension illustrates how it is possible
to offload configuration and contents of a custom element
to the fragment configuration and Liferay Web Contents.

The objective is to illustrate how existing react portlet
(with a portlet configuration) could be migrated to client
extensions.

Note: I'm not using the **customElement** client extension but
the **globalJS** because I don't want to leverage the built-in
widget but rather manually define a fragment able to hold
the configuration and the data mapping.

## Get an API Key

https://openweathermap.org/api

## Custom fragment

Create this fragment.
This custom fragment leverages the configuration capabilities.

### HTML

```html
<div 
		 class="d-none"
		 data-lfr-editable-id="01-city"
		 id="${fragmentEntryLinkNamespace}-01-city"
		 data-lfr-editable-type="text"></div>
<div 
		 class="d-none"
		 data-lfr-editable-id="02-country-code" 
		 id="${fragmentEntryLinkNamespace}-02-country-code" 
		 data-lfr-editable-type="text"></div>
<div 
		 class="d-none"
		 data-lfr-editable-id="03-city-data" 
		 id="${fragmentEntryLinkNamespace}-03-city-data" 
		 data-lfr-editable-type="text"></div>

[#if layoutMode != "edit"]
	<my-app 
        city=""
        country=""
        cityData=""
        apiKey="${configuration.weatherApiKey}">
	</my-app>
[/#if]
```

Notes:
 - There's no way to directly map editable values to custom element attributes,
 that's why I've written the following JS code.
 - For that reason, the React web component must be able to handle attribute
 changes.

### Javascript

```javascript
let city = fragmentElement.querySelector("#" + fragmentEntryLinkNamespace + "-01-city").innerHTML.trim();
let countryCode = fragmentElement.querySelector("#" + fragmentEntryLinkNamespace + "-02-country-code").innerHTML.trim();
let cityData = fragmentElement.querySelector("#" + fragmentEntryLinkNamespace + "-03-city-data").innerHTML.trim();
let myAppElement = fragmentElement.querySelector("my-app");
myAppElement.setAttribute("city", city);
myAppElement.setAttribute("country", countryCode);
myAppElement.setAttribute("citydata", cityData);
```

### Configuration

```json
{
	"fieldSets": [
		{
			"fields": [
				{
					"defaultValue": "6ab07c467c5099837f258405761e5e59",
					"label": "Weather API key",
					"name": "weatherApiKey",
					"type": "text"
				}			
			],
			"label": "Weather API configuration"
		}
	]
}
```

## Try it out

The **My App Custom element JS** globalJS client extension must be enabled on the page or the site.

Create a web content structure.

The structure defines 2 fields containing a simple text (City and Country Code) and
a third one, multiline text, to contain the json configuration looking like this:

```
{
    "population": 1000000,
    "language": "french"
}
```

```json
{
    "availableLanguageIds": [
        "en_US"
    ],
    "contentType": "journal",
    "dataDefinitionFields": [
        {
            "customProperties": {
                "labelAtStructureLevel": true,
                "hideField": false,
                "confirmationErrorMessage": {
                    "en_US": ""
                },
                "autocomplete": false,
                "ddmDataProviderInstanceId": [],
                "dataType": "string",
                "tooltip": {
                    "en_US": ""
                },
                "requireConfirmation": false,
                "displayStyle": "singleline",
                "visibilityExpression": "",
                "fieldNamespace": "",
                "ddmDataProviderInstanceOutput": [],
                "options": {},
                "nativeField": false,
                "confirmationLabel": {
                    "en_US": ""
                },
                "fieldReference": "Text40526757",
                "placeholder": {
                    "en_US": "Paris"
                },
                "dataSourceType": "",
                "direction": [
                    "vertical"
                ]
            },
            "defaultValue": {},
            "fieldType": "text",
            "indexType": "keyword",
            "indexable": true,
            "label": {
                "en_US": "City"
            },
            "localizable": true,
            "name": "Text40526757",
            "nestedDataDefinitionFields": [],
            "readOnly": false,
            "repeatable": false,
            "required": false,
            "showLabel": true,
            "tip": {
                "en_US": ""
            }
        },
        {
            "customProperties": {
                "labelAtStructureLevel": true,
                "hideField": false,
                "confirmationErrorMessage": {
                    "en_US": ""
                },
                "autocomplete": false,
                "ddmDataProviderInstanceId": [],
                "dataType": "string",
                "tooltip": {
                    "en_US": ""
                },
                "requireConfirmation": false,
                "displayStyle": "singleline",
                "visibilityExpression": "",
                "fieldNamespace": "",
                "ddmDataProviderInstanceOutput": [],
                "options": {},
                "nativeField": false,
                "confirmationLabel": {
                    "en_US": ""
                },
                "fieldReference": "Text83685428",
                "placeholder": {
                    "en_US": "FR"
                },
                "dataSourceType": "",
                "direction": [
                    "vertical"
                ]
            },
            "defaultValue": {},
            "fieldType": "text",
            "indexType": "keyword",
            "indexable": true,
            "label": {
                "en_US": "Country code"
            },
            "localizable": true,
            "name": "Text83685428",
            "nestedDataDefinitionFields": [],
            "readOnly": false,
            "repeatable": false,
            "required": false,
            "showLabel": true,
            "tip": {
                "en_US": ""
            }
        },
        {
            "customProperties": {
                "labelAtStructureLevel": true,
                "hideField": false,
                "confirmationErrorMessage": {
                    "en_US": ""
                },
                "dataType": "string",
                "tooltip": {
                    "en_US": ""
                },
                "requireConfirmation": false,
                "displayStyle": "multiline",
                "visibilityExpression": "",
                "requiredErrorMessage": {
                    "en_US": ""
                },
                "fieldNamespace": "",
                "objectFieldName": "",
                "options": {},
                "nativeField": false,
                "confirmationLabel": {
                    "en_US": ""
                },
                "fieldReference": "Text95561726",
                "placeholder": {
                    "en_US": ""
                },
                "direction": [
                    "vertical"
                ]
            },
            "defaultValue": {
                "en_US": ""
            },
            "fieldType": "text",
            "indexType": "keyword",
            "indexable": true,
            "label": {
                "en_US": "City Data"
            },
            "localizable": true,
            "name": "Text95561726",
            "nestedDataDefinitionFields": [],
            "readOnly": false,
            "repeatable": false,
            "required": false,
            "showLabel": true,
            "tip": {
                "en_US": ""
            }
        }
    ],
    "defaultDataLayout": {
        "dataLayoutFields": {},
        "dataLayoutPages": [
            {
                "dataLayoutRows": [
                    {
                        "dataLayoutColumns": [
                            {
                                "columnSize": 12,
                                "fieldNames": [
                                    "Text40526757"
                                ]
                            }
                        ]
                    },
                    {
                        "dataLayoutColumns": [
                            {
                                "columnSize": 12,
                                "fieldNames": [
                                    "Text83685428"
                                ]
                            }
                        ]
                    },
                    {
                        "dataLayoutColumns": [
                            {
                                "columnSize": 12,
                                "fieldNames": [
                                    "Text95561726"
                                ]
                            }
                        ]
                    }
                ],
                "description": {
                    "en_US": ""
                },
                "title": {
                    "en_US": ""
                }
            }
        ],
        "dataRules": [],
        "description": {},
        "name": {
            "en_US": "Cities"
        },
        "paginationMode": "single-page"
    },
    "defaultLanguageId": "en_US",
    "description": {},
    "name": {
        "en_US": "Cities"
    },
    "storageType": "default"
}
```

Create a few web contents with that structure.

Create a Collection of web contents with that structure.

Create a page and put a **Collection Display** fragment, bound
to that collection.

Put the custom fragment in the **Collection Item**, set the 
OpenWeather API Key and map the city, country code and
city data.