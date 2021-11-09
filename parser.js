import { parseStringPromise } from "xml2js";
import { parseNumbers } from "xml2js/lib/processors.js";

export async function parse(tcxString) {
  const tcx = await parseStringPromise(tcxString, {
    normalizeTags: true,
    explicitArray: false,
    valueProcessors: [parseNumbers],
  });
  const { activity } = tcx.trainingcenterdatabase.activities;

  return new Activity(activity);
}

class Activity {
  constructor(activity) {
    this.sport = activity.$.Sport;
    this.id = activity.id;
    this.laps = activity.lap;
  }

  duration() {
    return this.laps.reduce((a, b) => a + b.totaltimeseconds, 0);
  }

  distance() {
    const distance = this.laps.reduce((a, b) => a + b.distancemeters, 0);

    return Math.round(distance);
  }

  pace() {
    const distance = this.distance();
    const duration = this.duration();
    const pace = Math.round(duration / (distance / 1000));
    const date = new Date(pace * 1000);

    return `${date.getMinutes()}:${date.getSeconds()} min/km`;
  }
}
