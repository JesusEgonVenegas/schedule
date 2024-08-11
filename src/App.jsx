import { useEffect, useState } from "react";
import "./App.css";
import SortBySelect from "./assets/components/SortBySelect";
import ScheduleTable from "./assets/components/ScheduleTable";

function App() {
  const [sortBy, setSortBy] = useState("first_name");
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4567/shifts?sort_by=${sortBy}`,
        );
        const data = await response.json();
        setScheduleData(data);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, [sortBy]);

  return (
    <div>
      <SortBySelect sortBy={sortBy} setSortBy={setSortBy} />
      <ScheduleTable scheduleData={scheduleData} />
    </div>
  );
}

export default App;
