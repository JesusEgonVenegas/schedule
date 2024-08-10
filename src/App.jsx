import { useCallback, useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [sortBy, setSortBy] = useState("first_name");
  const [scheduleData, setScheduleData] = useState();
  const [hoursPerDay, setHoursPerDay] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4567/shifts?sort_by=${sortBy}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setScheduleData(data);
      })
      .catch((error) => console.log(error));
  }, [sortBy]);

  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calcHoursPerDay = useCallback(() => {
    const hash = {};
    scheduleData.forEach((employee) => {
      for (let i = 0; i < employee["shifts:"].length; i++) {
        if (hash[employee["shifts:"][i].day]) {
          hash[employee["shifts:"][i].day] += employee["shifts:"][i].duration;
        } else {
          hash[employee["shifts:"][i].day] = employee["shifts:"][i].duration;
        }
      }
    });
    console.log(hash);
    return hash;
  }, [scheduleData]);

  useEffect(() => {
    if (scheduleData) {
      setHoursPerDay(calcHoursPerDay());
    }
  }, [scheduleData, calcHoursPerDay]);

  return (
    <div>
      <select
        name="sort_by"
        defaultValue={"fist_name"}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="first_name">First Name</option>
        <option value="last_name">Last Name</option>
      </select>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col"></th>
              {scheduleData &&
                daysOfTheWeek.map((day, idx) => {
                  return (
                    <th scope="col" key={idx}>
                      {day} ({hoursPerDay[idx]} hrs)
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {scheduleData &&
              scheduleData.map((employee, i) => {
                let employeeTotalHrs = 0;

                employee["shifts:"].forEach(
                  (shift) =>
                    (employeeTotalHrs = employeeTotalHrs + shift.duration),
                );

                return (
                  <tr key={i}>
                    <th>
                      {employee.name} ({employeeTotalHrs} hrs)
                    </th>

                    {daysOfTheWeek.map((day, idx) => {
                      let dayData = employee["shifts:"].find(
                        (a) => a.day == idx,
                      );

                      return (
                        <td
                          key={idx}
                          style={{
                            backgroundColor: dayData
                              ? dayData.color
                              : "transparent",
                          }}
                        >
                          {dayData
                            ? dayData.start_at +
                              " - " +
                              dayData.end_at +
                              " " +
                              dayData.role
                            : ""}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
