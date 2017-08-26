// import 3th party packages
import * as _ from "lodash/array";
import * as moment from "moment";

// import models
import { TaskStatus } from "./task-status";

export class Task {
	public name: string;
	public description: string;
	public status: TaskStatus;
	public log: any[];

	constructor(name: string, values: any) {
		this.name = name;
		this.description = values ? values.description : "";
		this.status = values ? values.status : TaskStatus.IN_PROGRESS;
		this.log = values ? values.log : [];
	}

	public setDescription(description: string): void {
		this.description = description ? description : this.description ? this.description : "";
	}

	public setStatus(status: TaskStatus): void {
		this.status = status;
	}

	public start(description: string): boolean {
		let lastTime = _.last(this.log);
		if (lastTime && lastTime.start && !lastTime.stop) {
			console.log("This tasks already started.");
			return false;
		}
		this.log.push({
			start: moment().format(),
		});
		this.setDescription(description);
		this.setStatus(TaskStatus.IN_PROGRESS);
		return true;
	}

	public pause(): void {
		this.log[this.log.length - 1].stop = moment().format();
		this.setStatus(TaskStatus.PAUSED);
	}
}
