import EmployeeRow from "./EmployeeRow";

const ScheduleTable = ({ scheduleData, hoursPerDay }) => {
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          {daysOfTheWeek.map((day, idx) => (
            <th scope="col" key={idx}>
              {day} ({hoursPerDay[idx] || 0} hrs)
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {scheduleData.map((employee, i) => (
          <EmployeeRow
            key={i}
            employee={employee}
            daysOfTheWeek={daysOfTheWeek}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
