// ------------------------------
// 1. Job Application Tracker
// ------------------------------

// File: src/JobTrackerApp.tsx
import React, { useState, useEffect } from "react";

interface Job {
  id: string;
  company: string;
  role: string;
  status: "applied" | "interview" | "offer" | "rejected";
  date: string;
  notes: string;
}

const JobTrackerApp = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState<Job>({
    id: "",
    company: "",
    role: "",
    status: "applied",
    date: "",
    notes: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setJobs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
    if (!newJob.company || !newJob.role) return;
    const jobToAdd = { ...newJob, id: Date.now().toString() };
    setJobs([...jobs, jobToAdd]);
    setNewJob({
      id: "",
      company: "",
      role: "",
      status: "applied",
      date: "",
      notes: "",
    });
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Job Tracker</h1>
      <input
        placeholder="Company"
        className="border p-2 mb-2 w-full"
        value={newJob.company}
        onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
      />
      <input
        placeholder="Role"
        className="border p-2 mb-2 w-full"
        value={newJob.role}
        onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
      />
      <select
        className="border p-2 mb-2 w-full"
        value={newJob.status}
        onChange={(e) =>
          setNewJob({ ...newJob, status: e.target.value as Job["status"] })
        }
      >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <input
        type="date"
        className="border p-2 mb-2 w-full"
        value={newJob.date}
        onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
      />
      <textarea
        placeholder="Notes"
        className="border p-2 mb-2 w-full"
        value={newJob.notes}
        onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={addJob}
      >
        Add Job
      </button>

      <ul className="mt-6 space-y-2">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded shadow">
            <div className="font-semibold">
              {job.company} – {job.role}
            </div>
            <div>Status: {job.status}</div>
            <div>Date: {job.date}</div>
            <div>Notes: {job.notes}</div>
            <button
              className="mt-2 text-red-500"
              onClick={() => deleteJob(job.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobTrackerApp;

// ------------------------------
// Repeat structure for other projects next...
// ------------------------------
