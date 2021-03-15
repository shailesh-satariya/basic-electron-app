import {RecordData, RecordStatistics} from "../../types";
import {getRecordId, getRecordValue, getStatistics} from "../index";
import recordsList from "../../test/data.json";

describe("getRecordValue ", () => {
    test("returns correct html tag when exists", () => {
        const record: RecordData = {
            "event": {
                "type": "focus"
            },
            "setup": {
                "altPath": "article/form/section[1]/div[1]/input[@id='signup_full_name'][@name='signup[full_name]'][@type='text']",
                "altSelector": "article #signup_full_name",
                "attributes": {
                    "autofocus": "autofocus",
                    "class": "input session-fields__signup floating-placeholder__input",
                    "id": "signup_full_name",
                    "name": "signup[full_name]",
                    "placeholder": "Your name",
                    "rcrdr-extra-style": {
                        "display": "block",
                        "visibility": "visible"
                    },
                    "required": "required",
                    "type": "text"
                },
                "computedRole": "textbox",
                "frame": "0",
                "frame_id": "0",
                "html": "<input class=\"input session-fields__signup floating-placeholder__input\" placeholder=\"Your name\" required=\"required\" autofocus=\"autofocus\" type=\"text\" name=\"signup[full_name]\" id=\"signup_full_name\">",
                "nodeName": "input",
                "nodeType": 1,
                "rootpath": "/html/body/main/div/section/article/form/section[1]/div[1]/input",
                "selector": "#signup_full_name",
                "xpath": "id(\"signup_full_name\")"
            },
            "time": 1612271489789
        };

        expect(getRecordValue(record)).toEqual("input");
    });

    test("returns url when html tag does not exists", () => {
        const record: RecordData = {
            "event": {
                "type": "navigate"
            },
            "setup": {
                "attributes": {
                    "title": "New Tab"
                },
                "description": "",
                "name": "",
                "type": null,
                "url": "chrome://newtab/"
            },
            "time": 1612271431271
        };

        expect(getRecordValue(record)).toEqual("chrome://newtab/");
    });
});

describe("getRecordId ", () => {
    test("returns correct id for the record", () => {
        const record: RecordData = {
            "event": {
                "type": "focus"
            },
            "setup": {
                "altPath": "article/form/section[1]/div[1]/input[@id='signup_full_name'][@name='signup[full_name]'][@type='text']",
                "altSelector": "article #signup_full_name",
                "attributes": {
                    "autofocus": "autofocus",
                    "class": "input session-fields__signup floating-placeholder__input",
                    "id": "signup_full_name",
                    "name": "signup[full_name]",
                    "placeholder": "Your name",
                    "rcrdr-extra-style": {
                        "display": "block",
                        "visibility": "visible"
                    },
                    "required": "required",
                    "type": "text"
                },
                "computedRole": "textbox",
                "frame": "0",
                "frame_id": "0",
                "html": "<input class=\"input session-fields__signup floating-placeholder__input\" placeholder=\"Your name\" required=\"required\" autofocus=\"autofocus\" type=\"text\" name=\"signup[full_name]\" id=\"signup_full_name\">",
                "nodeName": "input",
                "nodeType": 1,
                "rootpath": "/html/body/main/div/section/article/form/section[1]/div[1]/input",
                "selector": "#signup_full_name",
                "xpath": "id(\"signup_full_name\")"
            },
            "time": 1612271489789
        };

        expect(getRecordId(record)).toEqual("focus_1612271489789");
    });
});

describe("getStatistics ", async () => {
    const statistics: RecordStatistics = await getStatistics(recordsList);

    expect(Object.keys(statistics.events).length).toBeGreaterThan(0);
    expect(statistics.delays.length).toEqual(recordsList.length - 1);
    expect(statistics.minDelay).toBeGreaterThan(0);
    expect(statistics.maxDelay).toBeGreaterThan(0);
    expect(statistics.meanDelay).toBeGreaterThan(0);
    expect(statistics.longSeq.value).toBeGreaterThan(0);
    expect(statistics.longSeq.event?.length).toBeGreaterThan(0);
    expect(statistics.sumDelay).toBeGreaterThan(0);
});