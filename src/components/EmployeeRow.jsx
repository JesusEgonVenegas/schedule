const EmployeeRow = ({ employee, daysOfTheWeek }) => {
  const totalHours = employee["shifts:"].reduce(
    (total, shift) => total + shift.duration,
    0,
  );

  const dayData = daysOfTheWeek.map((_, idx) =>
    employee["shifts:"].find((shift) => shift.day === idx),
  );

  return (
    <tr>
      <th>
        {employee.name} ({totalHours} hrs)
      </th>
      {dayData.map((shift, idx) => (
        <td
          key={idx}
          style={{
            backgroundColor: shift ? shift.color : "transparent",
          }}
        >
          {shift ? `${shift.start_at} - ${shift.end_at} ${shift.role}` : ""}
        </td>
      ))}
    </tr>
  );
};

export default EmployeeRow;
