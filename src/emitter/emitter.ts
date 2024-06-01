import EventEmitter from "events";

type TEvents = {
  startAnimation: never[];
};

export const emitter = new EventEmitter<TEvents>();
