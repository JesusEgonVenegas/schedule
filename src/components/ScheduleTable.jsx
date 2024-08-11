import EmployeeRow from "./EmployeeRow";

const ScheduleTable = ({ scheduleData }) => {
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hoursPerDay = (data) => {
    // Calculate hours per day
    const hash = {};
    data.forEach((employee) => {
      employee["shifts:"].forEach((shift) => {
        hash[shift.day] = (hash[shift.day] || 0) + shift.duration;
      });
    });
    return hash;
  };

  return (
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          {daysOfTheWeek.map((day, idx) => (
            <th scope="col" key={idx}>
              {day} ({hoursPerDay(scheduleData)[idx] || 0} hrs)
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
