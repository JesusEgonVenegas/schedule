const EmployeeRow = ({ employee, daysOfTheWeek }) => {
  const totalHours = employee["shifts:"].reduce(
    (total, shift) => total + shift.duration,
    0,
  );

  return (
    <tr>
      <th>
        {employee.name} ({totalHours} hrs)
      </th>
      {daysOfTheWeek.map((_, idx) => {
        const dayData = employee["shifts:"].find((shift) => shift.day === idx);

        return (
          <td
            key={idx}
            style={{
              backgroundColor: dayData ? dayData.color : "transparent",
            }}
          >
            {dayData
              ? `${dayData.start_at} - ${dayData.end_at} ${dayData.role}`
              : ""}
          </td>
        );
      })}
    </tr>
  );
};

export default EmployeeRow;
