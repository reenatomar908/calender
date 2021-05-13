import { h, FunctionComponent } from 'preact';

import GridEvent from '@src/components/events/gridEvent';

import { EVENT_HEIGHT } from '@src/event/panelEvent';
import TZDate from '@src/time/date';
import { isWithinHeight } from '@src/util/event';
import { cls } from '@src/util/cssHelper';
import ScheduleViewModel from '@src/model/scheduleViewModel';

interface Props {
  name: string;
  cells: TZDate[];
  height: number;
  eventHeight?: number;
  events: ScheduleViewModel[];
  narrowWeekend: boolean;
  className: string;
}

const GridEvents: FunctionComponent<Props> = ({
  height = 100,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
}) => {
  const filteredViewModels = events.filter(isWithinHeight(height, eventHeight));
  const cellTopHeight = 31; // @TODO: 테마에서 값 가져와서 설정

  const dayEvents = filteredViewModels.map((viewModel) => (
    <GridEvent
      viewModel={viewModel}
      key={`${name}-DayEvent-${viewModel.cid()}`}
      eventHeight={eventHeight}
      cellTopHeight={cellTopHeight}
    />
  ));

  return <div className={className}>{dayEvents}</div>;
};

export default GridEvents;
