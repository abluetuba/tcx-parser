# txc-parser

[TCX](https://en.wikipedia.org/wiki/Training_Center_XML) files parser that calculates basic activity statistics (like duration, distance and average pace).

## Example Usage

```js
import { parse } from "./parser.js";
//Read tcx file with fs
import { readFile } from "fs/promises";

(async function () {
  const tcxFile = await readFile("./run.tcx", "utf8");
  const activity = await parse(tcxFile);

  const distance = activity.distance();
  const duration = activity.duration();
  const pace = activity.pace();

  console.log({ distance, duration, pace });
})();
```

This returns the distance in meters, the duration in seconds and the pace in min/km

```js
{ distance: 12108, duration: 3930, pace: '5:25 min/km' }
```

`parse` is a promise that is resolved with all the data of the .tcx file.

```js
//console.log(activity)

Activity {
  sport: 'Running',
  id: '2021-11-07T09:43:12Z',
  laps: [
    {
      '$': [Object],
      totaltimeseconds: 340,
      distancemeters: 998.9901776313782,
      calories: 0,
      intensity: 'Active',
      triggermethod: 'Manual',
      track: [Object]
    },
    ...
    {
      '$': [Object],
      totaltimeseconds: 35,
      distancemeters: 110,
      calories: 0,
      intensity: 'Active',
      triggermethod: 'Manual',
      track: [Object]
    }
  ]
}
```
