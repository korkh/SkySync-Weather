import Temperature from "../Temperature";
import { ForecastItemContainer } from "./styled";
import WeatherIcon from "../WeatherIcon";
import { useEffect, useState } from "react";
import { IUnits } from "../../../utils/unitsConverter";
import { observer } from "mobx-react-lite";
import { Icon } from "semantic-ui-react";

interface Props {
  day: string;
  date: string;
  time: string;
  high: IUnits;
  low: IUnits;
  description: string;
  icon: string;
  tempUnits: IUnits;
  pop: number;
  precMm: number | null;
  onClick: () => void;
  isExpanded: boolean;
}

const ForecastBoard = ({
  day,
  date,
  time,
  high,
  low,
  description,
  icon,
  tempUnits,
  pop,
  precMm,
  onClick,
  isExpanded
}: Props) => {
  const [metricUnits, setMetricUnits] = useState<IUnits | undefined>(undefined);
  useEffect(() => {
    if (tempUnits) {
      setMetricUnits(IUnits.FAHRENHEIT);
    } else {
      setMetricUnits(IUnits.CELSIUS);
    }
  }, [tempUnits]);

  return (
    <ForecastItemContainer onClick={onClick}>
      <span style={{ display: "block" }}>
        <h6>{date}</h6>
        <h6 style={{ color: "grey" }}>{day}</h6>
        <h6>{time}</h6>
      </span>
      <div>
        <span>
          <WeatherIcon iconCode={icon} />
        </span>
        <p>{description}</p>
        <span>
          <p>Precip: {pop > 90 ? ">90" : pop}%</p>
          <p>{precMm}</p>
        </span>
        <span>
          <Icon name="thermometer half" size="large" />
          <Temperature value={high} units={metricUnits} />
          <small>&#10247;</small>
          <Temperature value={low} units={metricUnits} />
        </span>
      </div>
    </ForecastItemContainer>
  );
};

export default observer(ForecastBoard);
