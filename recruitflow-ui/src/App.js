import "react-datepicker/dist/react-datepicker.css";
import CandidateList from "./Components/CandidateList";
import InterviewScheduler from "./Components/InterviewScheduler";
import InterviewList from "./Components/InterviewList";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Recruiter Copilot</h1>

      {/* Candidate Management */}
      <CandidateList />

      <hr style={{ margin: "2rem 0" }} />

      {/* Interview Scheduling */}
      <InterviewScheduler />

      <hr style={{ margin: "2rem 0" }} />

      {/* Scheduled Interviews */}
      <InterviewList />
    </div>
  );
}

export default App;
