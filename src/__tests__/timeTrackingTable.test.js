import React from "react";
import { shallow, mount } from "enzyme";
import { TimeTrackingTable } from "../components/timeTrackingTable";
const kimaiSaveTimeData = require("../modules/kimaiSaveTimeData");

describe("<TimeTrackingTable />", () => {
	it("saveTimeData gives positive response with correct values set", async () => {
		const expected_call = {
			begin: "2019-03-03 13:00",
			end: "2019-03-03 14:00",
			customer: 1,
			project: 1,
			activity: 1,
			description: "description",
			fixedRate: "",
			hourlyRate: 100
		};

		const component = shallow(<TimeTrackingTable />);
		component.setState({
			begin: "2019-03-03 13:00",
			end: "2019-03-03 14:00",
			customer: 1,
			project: 1,
			activity: 1,
			hourlyRate: 100
		});
		let spy = jest.spyOn(kimaiSaveTimeData, "saveData");
		spy.mockResolvedValue({ message: "Entry saved" });

		let spy2 = jest.spyOn(component.instance(), "entryHandler");

		await component.instance().saveTimeData();

		expect(spy).toHaveBeenCalledWith(expected_call);
		expect(spy2).toHaveBeenCalled();
	});

	it("saveTimeData gives negative response with incorrect values set", async () => {
		const expected_call = {
			begin: "start time",
			end: "2019-03-03 14:00",
			customer: 1,
			project: 1,
			activity: 1,
			description: "description",
			fixedRate: "",
			hourlyRate: 100
		};

		const component = shallow(<TimeTrackingTable />);
		component.setState({
			begin: "start time",
			end: "2019-03-03 14:00",
			customer: 1,
			project: 1,
			activity: 1,
			hourlyRate: 100
		});
		let spy = jest.spyOn(kimaiSaveTimeData, "saveData");
		jest.spyOn(window, 'alert').mockImplementation(() => {});
		spy.mockResolvedValue({ message: "Couldn't save. Did you fill in the details with the correct formatting?" });

		let spy2 = jest.spyOn(component.instance(), "entryHandler");

		await component.instance().saveTimeData();

		expect(spy).toHaveBeenCalledWith(expected_call);
		expect(spy2).not.toHaveBeenCalled();
		expect(window.alert).toBeCalledWith("Couldn't save. Did you fill in the details with the correct formatting?");
	});
});