import * as React from "xaret";
import Rx from "rxjs/Rx";
import "rxjs/add/observable/dom/ajax";

export default ({ zipCode, apiKey }) => {
  if (zipCode.length !== 5) return <span>No Location Selected</span>;
  else {
    const weather$ = Rx.Observable.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`,
      crossDomain: true
    })
      .catch(e => console.log(e))
      .pluck("response");

    const Location = () =>
      React.fromObservable(
        weather$.pluck("name").map(location => (
          <div>
            <h1>Weather for {location}</h1>
          </div>
        ))
      );
    const temp = weather$
      .pluck("main", "temp")
      .map(kelvin => parseInt(kelvin - 273.15, 10));
    const icon = weather$
      .pluck("weather", "0", "icon")
      .map(icon => `http://openweathermap.org/img/w/${icon}.png`);
    const description = weather$.pluck("weather", "0", "description");
    return (
      <div className="weather-widget">
        <Location />
        <div>
          <span>
            <strong>{description}</strong>
          </span>
          <img src={icon} />
        </div>

        <span>
          <strong>{temp} &#8451;</strong>
        </span>
      </div>
    );
  }
};
