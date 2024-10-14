import { DatePicker, MultiViewCalendar, MultiViewCalendarChangeEvent, SelectionRange, TimePicker, ToggleButton, ToggleButtonProps } from "@progress/kendo-react-dateinputs";
import Label from "./Label";
import Switch from "./Switch";
import { displayDateFormat, displayTimeFormat, formatDateTime, localISODateFormat, parseDateTime } from "../utils/date-methods";
import { Popup, PopupProps } from "@progress/kendo-react-popup";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { z } from "zod";

export const RequestedArrivalDepartureTypeSchema = z.object({
    rangeQualifier: z.string().nullable().default(null).optional(), // Restricting values to "exact" or "plusMinusOneDay"
    timeQualifier: z.enum(["TD", "TA"]).default("TD").optional(), // Restricting values to "departBy" or "arriveBy"
    date: z.string().nullable().optional(), // Nullable date (ISO string format)
    time: z.string().nullable().optional(), // Nullable time (ISO time format, e.g., "hh:mm")
});

export type RequestedArrivalDepartureType = z.infer<typeof RequestedArrivalDepartureTypeSchema>;

interface FlightDateTimeRangePickerProps {
    value?: FlightDateTimePickerValue;
    onChange?: (value: FlightDateTimePickerValue) => void;
    disabled?: boolean;
}

type FlightDateTimePickerValue = {
    start?: RequestedArrivalDepartureType | null;
    end?: RequestedArrivalDepartureType | null;
}

type FlightDateTimeRangePickerPopupProps = PopupProps & {
    value?: FlightDateTimePickerValue;
    onChange?: (value: FlightDateTimePickerValue) => void;
    onCancel?: () => void;
    disabled?: boolean;
}


function FlightDateTimeRangePickerPopup({ value, onChange, onCancel, disabled, ...others }: Readonly<FlightDateTimeRangePickerPopupProps>) {

    const parsedSelection: SelectionRange = {
        start: parseDateTime(localISODateFormat, value?.start?.date) ?? null,
        end: parseDateTime(localISODateFormat, value?.end?.date) ?? null
    }

    const handleChange = (e: MultiViewCalendarChangeEvent) => {
        const value = e.value as SelectionRange;

        onChange?.({
            ...value,
            start: { ...value?.start, date: formatDateTime(localISODateFormat, value?.start) },
            end: { ...value?.end, date: formatDateTime(localISODateFormat, value?.end) }
        });
    }

    const popupRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(popupRef, () => onCancel?.());

    return (
        <Popup {...others}>
            <div ref={popupRef} className="tw-flex tw-flex-row tw-gap-3">
                <MultiViewCalendar
                    mode="range"
                    value={parsedSelection}
                    onChange={handleChange}
                    disabled={disabled}
                />
            </div>
        </Popup>
    );
}

function FlightDateTimeRangePickerToggleButton(props: ToggleButtonProps) {
    return (
        <ToggleButton {...props} />
    );
}


function FlightDateTimeRangePicker({ value, onChange, disabled }: Readonly<FlightDateTimeRangePickerProps>) {

    const [isShowPopup, setIsShowPopup] = useState<{
        start?: boolean;
        end?: boolean;
    }>({
        start: false,
        end: false
    });

    return (
        <div className="tw-grid tw-grid-cols-2 tw-gap-3">
            <div className="tw-col-span-1">
                <div className="tw-flex tw-flex-col tw-gap-3">
                    <div className="tw-flex tw-flex-row tw-gap-3 tw-items-center">
                        <Label>Onwards</Label>
                        <Switch
                            size="small"
                            className="k-switch-custom"
                            onLabel="Depart By"
                            offLabel="Arrive By"
                            checked={value?.start?.timeQualifier === "TD"}
                            onChange={(updatedValue) => onChange?.({ ...value, start: { ...value?.start, timeQualifier: updatedValue ? "TD" : "TA" } })}
                            disabled={disabled}
                        />
                    </div>
                    <div className="tw-flex tw-flex-row tw-gap-3">
                        <DatePicker
                            toggleButton={(props) => <FlightDateTimeRangePickerToggleButton {...props} onClick={() => setIsShowPopup({ start: !isShowPopup.start })} />}
                            popup={
                                (props) => <FlightDateTimeRangePickerPopup
                                    {...props}
                                    show={isShowPopup.start}
                                    value={value}
                                    onChange={onChange}
                                    disabled={disabled}
                                    onCancel={() => setIsShowPopup({ start: false })}
                                />
                            }
                            format={displayDateFormat}
                            value={parseDateTime(localISODateFormat, value?.start?.date)}
                            onChange={(e) => onChange?.({ ...value, start: { ...value?.start, date: formatDateTime(localISODateFormat, e.target.value) } })}
                            placeholder=""
                            disabled={disabled}
                        />
                        <TimePicker
                            format={displayTimeFormat}
                            value={parseDateTime(localISODateFormat, value?.start?.time)}
                            onChange={(e) => onChange?.({ ...value, start: { ...value?.start, time: formatDateTime(localISODateFormat, e.target.value) } })}
                            placeholder=""
                            disabled={disabled}
                        />
                    </div>
                    <div className="tw-flex tw-flex-row tw-items-center tw-gap-3">
                        <input
                            type="checkbox"
                            value={"C"}
                            checked={value?.start?.rangeQualifier === "C"}
                            onChange={(e) => onChange?.({ ...value, start: { ...value?.start, rangeQualifier: e.target.checked ? "C" : null } })}
                        />
                        <Label>Flexible Dates</Label>
                    </div>
                </div>
            </div>

            <div className="tw-col-span-1">
                <div className="tw-flex tw-flex-col tw-gap-3">
                    <div className="tw-flex tw-flex-row tw-gap-3 tw-items-center">
                        <Label>Return</Label>
                        <Switch
                            size="small"
                            className="k-switch-custom"
                            onLabel="Depart By"
                            offLabel="Arrive By"
                            checked={value?.end?.timeQualifier === "TD"}
                            onChange={(updatedValue) => onChange?.({ ...value, end: { ...value?.end, timeQualifier: updatedValue ? "TD" : "TA" } })}
                            disabled={disabled}
                        />
                    </div>
                    <div className="tw-flex tw-flex-row tw-gap-3">
                        <DatePicker
                            toggleButton={(props) => <FlightDateTimeRangePickerToggleButton {...props} onClick={() => setIsShowPopup({ end: !isShowPopup.end })} />}
                            popup={
                                (props) => <FlightDateTimeRangePickerPopup
                                    {...props}
                                    show={isShowPopup.end}
                                    value={value}
                                    onChange={onChange}
                                    disabled={disabled}
                                    onCancel={() => setIsShowPopup({ start: false, end: false })}
                                />
                            }
                            format={displayDateFormat}
                            value={parseDateTime(localISODateFormat, value?.end?.date)}
                            onChange={(e) => onChange?.({ ...value, end: { ...value?.end, date: formatDateTime(localISODateFormat, e.target.value) } })}
                            placeholder=""
                            disabled={disabled}
                        />
                        <TimePicker
                            format={displayTimeFormat}
                            value={parseDateTime(localISODateFormat, value?.end?.time)}
                            onChange={(e) => onChange?.({ ...value, end: { ...value?.end, time: formatDateTime(localISODateFormat, e.target.value) } })}
                            placeholder=""
                            disabled={disabled}
                        />
                    </div>
                    <div className="tw-flex tw-flex-row tw-items-center tw-gap-3">
                        <input
                            type="checkbox"
                            value={"C"}
                            checked={value?.end?.rangeQualifier === "C"}
                            onChange={(e) => onChange?.({ ...value, end: { ...value?.end, rangeQualifier: e.target.checked ? "C" : null } })}
                        />
                        <Label>Flexible Dates</Label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlightDateTimeRangePicker;