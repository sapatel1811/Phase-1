import React from "react";

function ActivityLogs() {
  const logs = [
    {
      id: 1,
      action: "User Login",
      user: "Sapna Patel",
      date: "08-06-2026 10:15 AM",
      status: "Success",
    },
    {
      id: 2,
      action: "Profile Updated",
      user: "Rahul Sharma",
      date: "08-06-2026 11:20 AM",
      status: "Success",
    },
    {
      id: 3,
      action: "Password Changed",
      user: "Priya Verma",
      date: "08-06-2026 12:05 PM",
      status: "Success",
    },
    {
      id: 4,
      action: "User Deleted",
      user: "Admin",
      date: "08-06-2026 02:30 PM",
      status: "Warning",
    },
  ];

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">
          Activity Logs
        </h2>

        <p className="text-muted mb-0">
          Monitor user activities and system actions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderLeft: "5px solid #ff6600",
            }}
          >
            <div className="card-body">
              <h6 className="text-muted">
                Total Activities
              </h6>

              <h2 className="fw-bold">
                {logs.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderLeft: "5px solid #28a745",
            }}
          >
            <div className="card-body">
              <h6 className="text-muted">
                Successful Activities
              </h6>

              <h2 className="fw-bold text-success">
                {logs.filter(
                  (log) => log.status === "Success"
                ).length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderLeft: "5px solid #dc3545",
            }}
          >
            <div className="card-body">
              <h6 className="text-muted">
                Warnings
              </h6>

              <h2 className="fw-bold text-danger">
                {logs.filter(
                  (log) => log.status === "Warning"
                ).length}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Activity Table */}
      <div className="card border-0 shadow-sm">

        <div
          className="card-header text-white fw-bold"
          style={{
            background:
              "linear-gradient(90deg,#ff6600,#ff8533)",
          }}
        >
          Activity History
        </div>

        <div className="card-body table-responsive">

          <table className="table table-hover align-middle">

            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Activity</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr key={log.id}>

                  <td>{index + 1}</td>

                  <td>
                    <strong>{log.user}</strong>
                  </td>

                  <td>{log.action}</td>

                  <td>{log.date}</td>

                  <td>
                    <span
                      className={`badge ${
                        log.status === "Success"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default ActivityLogs;