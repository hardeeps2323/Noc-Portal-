import { useState } from "react";

const SEED_USERS = [
  { id: "u1", name: "Admin", email: "admin@digitalnoc.gov", password: "password123", role: "admin", status: "active" },
  { id: "u2", name: "Dr. C.M. Officer", email: "cmo@cityhospital.com", password: "password123", role: "hospital", status: "active" },
  { id: "u3", name: "Inspector Vijay", email: "vijay@police.gov", password: "password123", role: "police", status: "active" },
  { id: "u4", name: "Amit Verma", email: "amit@verma.com", password: "password123", role: "user", status: "active" },
  { id: "u5", name: "Dr. Rina Kapoor", email: "rina@lakeview.com", password: "password123", role: "hospital", status: "suspended" },
];

const SEED_REQUESTS = [
  { id: "NOC-2091", family: "Verma Family", deceased: "Ramesh Verma", hospital: "City Hospital", station: "Sector 12 PS", status: "approved", submitted: "2 Jul 2026", hospitalNote: "Death certificate verified", policeNote: "No objection recorded", ownerEmail: "amit@verma.com" },
  { id: "NOC-2092", family: "Sharma Family", deceased: "Kavita Sharma", hospital: "City Hospital", station: "Sector 12 PS", status: "pending_hospital", submitted: "4 Jul 2026", hospitalNote: null, policeNote: null, ownerEmail: "sharma@example.com" },
  { id: "NOC-2093", family: "Iqbal Family", deceased: "Naseem Iqbal", hospital: "Lakeview Medical", station: "Model Town PS", status: "pending_police", submitted: "3 Jul 2026", hospitalNote: "Cleared by attending physician", policeNote: null, ownerEmail: "iqbal@example.com" },
  { id: "NOC-2094", family: "Rao Family", deceased: "Suresh Rao", hospital: "Lakeview Medical", station: "Model Town PS", status: "rejected", submitted: "1 Jul 2026", hospitalNote: "Cleared by attending physician", policeNote: "Pending post-mortem clearance", ownerEmail: "rao@example.com" },
  { id: "NOC-2095", family: "Kaur Family", deceased: "Gurpreet Kaur", hospital: "City Hospital", station: "Sector 12 PS", status: "approved", submitted: "29 Jun 2026", hospitalNote: "Death certificate verified", policeNote: "No objection recorded", ownerEmail: "kaur@example.com" },
];

const ROLE_LABEL = { admin: "Admin", hospital: "Hospital", police: "Police", user: "Family / User" };
const STATUS_OPTIONS = ["pending_hospital", "pending_police", "approved", "rejected"];

const SEAL = {
  approved: { label: "Approved", ring: "#2E7D6B" },
  pending_hospital: { label: "Awaiting hospital", ring: "#C08A2E" },
  pending_police: { label: "Awaiting police", ring: "#C08A2E" },
  rejected: { label: "Rejected", ring: "#8C3A2E" },
};

function Seal({ status }) {
  const s = SEAL[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px solid ${s.ring}`, borderRadius: 20, padding: "3px 10px 3px 8px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 0.4, color: s.ring, whiteSpace: "nowrap" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.ring, display: "inline-block" }} />
      {s.label.toUpperCase()}
    </span>
  );
}

const inputStyle = { background: "#0B1220", border: "1px solid #1F2C44", borderRadius: 6, padding: "7px 10px", color: "#E7ECF5", fontSize: 13 };
const btn = (bg, color) => ({ background: bg, color, border: "none", borderRadius: 6, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" });
const btnGhost = (border, color) => ({ background: "transparent", color, border: `1px solid ${border}`, borderRadius: 6, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" });

function LoginScreen({ users, onLogin }) {
  const [tab, setTab] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    const match = users.find((u) => u.email === email && u.password === password && u.role === tab);
    if (!match) return setError("No account matches that email, password, and role.");
    if (match.status === "suspended") return setError("This account has been suspended by an admin.");
    setError("");
    onLogin(match);
  };

  const fillDemo = () => {
    const demo = users.find((u) => u.role === tab && u.status === "active");
    if (demo) { setEmail(demo.email); setPassword(demo.password); setError(""); }
  };

  return (
    <div style={{ maxWidth: 380, margin: "80px auto", background: "#121B2E", border: "1px solid #1F2C44", borderRadius: 12, padding: 28 }}>
      <p style={{ margin: "0 0 4px", fontSize: 12, letterSpacing: 3, color: "#7A8699", fontWeight: 600 }}>DIGITAL NOC</p>
      <h2 style={{ fontFamily: "'Fraunces', serif", margin: "0 0 20px", fontSize: 24 }}>Sign in</h2>
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {Object.entries(ROLE_LABEL).map(([id, label]) => (
          <button key={id} onClick={() => { setTab(id); setError(""); }} style={{ ...(tab === id ? btn("#C08A2E", "#0B1220") : btnGhost("#1F2C44", "#7A8699")), fontSize: 11, padding: "6px 10px" }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input style={inputStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ margin: 0, color: "#D97757", fontSize: 12 }}>{error}</p>}
        <button onClick={submit} style={{ ...btn("#C08A2E", "#0B1220"), padding: "10px 14px", fontSize: 13 }}>Log in</button>
        <button onClick={fillDemo} style={{ ...btnGhost("#1F2C44", "#7A8699"), padding: "8px 14px", fontSize: 12 }}>Fill demo {ROLE_LABEL[tab]} credentials</button>
      </div>
      <p style={{ marginTop: 16, fontSize: 11, color: "#5C6780", lineHeight: 1.5 }}>
        Preview only — accounts and passwords live in this browser tab and reset on refresh.
      </p>
    </div>
  );
}

function UserManagement({ users, setUsers }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [adding, setAdding] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user", password: "password123" });

  const startEdit = (u) => { setEditingId(u.id); setDraft({ ...u }); };
  const save = () => { setUsers((prev) => prev.map((u) => (u.id === editingId ? draft : u))); setEditingId(null); };
  const remove = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));
  const addUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    setUsers((prev) => [...prev, { ...newUser, id: `u${Date.now()}`, status: "active" }]);
    setNewUser({ name: "", email: "", role: "user", password: "password123" });
    setAdding(false);
  };

  return (
    <div style={{ background: "#121B2E", border: "1px solid #1F2C44", borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: "1px solid #1F2C44" }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: 1.5, color: "#7A8699", fontWeight: 600 }}>USER MANAGEMENT</p>
        <button onClick={() => setAdding((a) => !a)} style={btn("#2E7D6B", "#0B1220")}>{adding ? "Cancel" : "+ Add user"}</button>
      </div>
      {adding && (
        <div style={{ display: "flex", gap: 8, padding: 14, borderBottom: "1px solid #1F2C44", flexWrap: "wrap" }}>
          <input style={inputStyle} placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <input style={inputStyle} placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <select style={inputStyle} value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            {Object.keys(ROLE_LABEL).map((r) => <option key={r} value={r}>{ROLE_LABEL[r]}</option>)}
          </select>
          <button onClick={addUser} style={btn("#C08A2E", "#0B1220")}>Save user</button>
        </div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Name", "Email", "Role", "Status", ""].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, letterSpacing: 1, color: "#7A8699", borderBottom: "1px solid #1F2C44" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} style={{ borderBottom: "1px solid #161F33" }}>
              {editingId === u.id ? (
                <>
                  <td style={{ padding: "8px 16px" }}><input style={inputStyle} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></td>
                  <td style={{ padding: "8px 16px" }}><input style={inputStyle} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></td>
                  <td style={{ padding: "8px 16px" }}>
                    <select style={inputStyle} value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })}>
                      {Object.keys(ROLE_LABEL).map((r) => <option key={r} value={r}>{ROLE_LABEL[r]}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "8px 16px" }}>
                    <select style={inputStyle} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </td>
                  <td style={{ padding: "8px 16px", display: "flex", gap: 6 }}>
                    <button onClick={save} style={btn("#2E7D6B", "#0B1220")}>Save</button>
                    <button onClick={() => setEditingId(null)} style={btnGhost("#1F2C44", "#7A8699")}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: "10px 16px", fontSize: 13 }}>{u.name}</td>
                  <td style={{ padding: "10px 16px", fontSize: 13, color: "#9AA5B8" }}>{u.email}</td>
                  <td style={{ padding: "10px 16px", fontSize: 13 }}>{ROLE_LABEL[u.role]}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: u.status === "active" ? "#2E7D6B" : "#8C3A2E" }}>
                      {u.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: "10px 16px", display: "flex", gap: 6 }}>
                    <button onClick={() => startEdit(u)} style={btnGhost("#1F2C44", "#C08A2E")}>Edit</button>
                    <button onClick={() => remove(u.id)} style={btnGhost("#1F2C44", "#8C3A2E")}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CaseRegister({ requests, setRequests, editable }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const startEdit = (r) => { setEditingId(r.id); setDraft({ ...r }); };
  const save = () => { setRequests((prev) => prev.map((r) => (r.id === editingId ? draft : r))); setEditingId(null); };

  return (
    <div style={{ background: "#121B2E", border: "1px solid #1F2C44", borderRadius: 10, overflow: "hidden" }}>
      <p style={{ margin: 0, padding: "14px 16px", fontSize: 12, letterSpacing: 1.5, color: "#7A8699", fontWeight: 600, borderBottom: "1px solid #1F2C44" }}>CASE REGISTER</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Case ID", "Deceased", "Hospital", "Station", "Status", editable ? "" : null].filter(Boolean).map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, letterSpacing: 1, color: "#7A8699", borderBottom: "1px solid #1F2C44" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} style={{ borderBottom: "1px solid #161F33" }}>
              {editingId === r.id ? (
                <>
                  <td style={{ padding: "8px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#7A8699" }}>{r.id}</td>
                  <td style={{ padding: "8px 16px" }}><input style={inputStyle} value={draft.deceased} onChange={(e) => setDraft({ ...draft, deceased: e.target.value })} /></td>
                  <td style={{ padding: "8px 16px" }}><input style={inputStyle} value={draft.hospital} onChange={(e) => setDraft({ ...draft, hospital: e.target.value })} /></td>
                  <td style={{ padding: "8px 16px" }}><input style={inputStyle} value={draft.station} onChange={(e) => setDraft({ ...draft, station: e.target.value })} /></td>
                  <td style={{ padding: "8px 16px" }}>
                    <select style={inputStyle} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{SEAL[s].label}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "8px 16px", display: "flex", gap: 6 }}>
                    <button onClick={save} style={btn("#2E7D6B", "#0B1220")}>Save</button>
                    <button onClick={() => setEditingId(null)} style={btnGhost("#1F2C44", "#7A8699")}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: "10px 16px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#7A8699" }}>{r.id}</td>
                  <td style={{ padding: "10px 16px", fontSize: 13 }}>{r.deceased}</td>
                  <td style={{ padding: "10px 16px", fontSize: 13 }}>{r.hospital}</td>
                  <td style={{ padding: "10px 16px", fontSize: 13 }}>{r.station}</td>
                  <td style={{ padding: "10px 16px" }}><Seal status={r.status} /></td>
                  {editable && <td style={{ padding: "10px 16px" }}><button onClick={() => startEdit(r)} style={btnGhost("#1F2C44", "#C08A2E")}>Edit</button></td>}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState(SEED_USERS);
  const [requests, setRequests] = useState(SEED_REQUESTS);
  const [session, setSession] = useState(null);
  const [newForm, setNewForm] = useState({ deceased: "", hospital: "City Hospital", station: "Sector 12 PS" });

  const advance = (id, action) => {
    setRequests((prev) => prev.map((r) => {
      if (r.id !== id) return r;
      if (action === "hospital_clear") return { ...r, status: "pending_police", hospitalNote: "Cleared by attending physician" };
      if (action === "police_clear") return { ...r, status: "approved", policeNote: "No objection recorded" };
      if (action === "reject") return { ...r, status: "rejected", policeNote: r.policeNote || "Rejected on review" };
      return r;
    }));
  };

  const submitNew = () => {
    if (!newForm.deceased.trim()) return;
    const id = `NOC-${2096 + requests.length}`;
    setRequests((prev) => [{ id, family: session.name, deceased: newForm.deceased, hospital: newForm.hospital, station: newForm.station, status: "pending_hospital", submitted: "Today", hospitalNote: null, policeNote: null, ownerEmail: session.email }, ...prev]);
    setNewForm({ deceased: "", hospital: "City Hospital", station: "Sector 12 PS" });
  };

  const stats = {
    total: requests.length,
    approved: requests.filter((r) => r.status === "approved").length,
    pending: requests.filter((r) => r.status.startsWith("pending")).length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0B1220", minHeight: "100vh", color: "#E7ECF5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        button { font-family: 'Inter', sans-serif; }
      `}</style>

      <div style={{ background: "#0E1526", borderBottom: "1px solid #1F2C44", padding: "10px 24px", fontSize: 12, color: "#C08A2E", textAlign: "center" }}>
        Live preview with sample data, editable in this browser tab only — not connected to a real database.
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 24px" }}>
        {!session ? (
          <LoginScreen users={users} onLogin={setSession} />
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 12, letterSpacing: 3, color: "#7A8699", margin: "0 0 6px", fontWeight: 600 }}>DIGITAL NOC MANAGEMENT SYSTEM</p>
                <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, margin: 0, fontWeight: 600 }}>
                  {ROLE_LABEL[session.role]} Panel
                </h1>
                <p style={{ margin: "4px 0 0", color: "#7A8699", fontSize: 13 }}>Signed in as {session.name} ({session.email})</p>
              </div>
              <button onClick={() => setSession(null)} style={btnGhost("#1F2C44", "#7A8699")}>Log out</button>
            </div>

            {session.role === "admin" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
                  {[
                    { label: "Total cases", value: stats.total },
                    { label: "Approved", value: stats.approved, color: "#2E7D6B" },
                    { label: "Pending", value: stats.pending, color: "#C08A2E" },
                    { label: "Rejected", value: stats.rejected, color: "#8C3A2E" },
                  ].map((s) => (
                    <div key={s.label} style={{ background: "#121B2E", border: "1px solid #1F2C44", borderRadius: 10, padding: "16px 18px" }}>
                      <p style={{ margin: 0, fontSize: 11, color: "#7A8699", letterSpacing: 1 }}>{s.label.toUpperCase()}</p>
                      <p style={{ margin: "6px 0 0", fontSize: 26, fontFamily: "'IBM Plex Mono', monospace", color: s.color || "#E7ECF5" }}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <UserManagement users={users} setUsers={setUsers} />
                <CaseRegister requests={requests} setRequests={setRequests} editable />
              </div>
            )}

            {(session.role === "hospital" || session.role === "police") && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {requests.map((r) => (
                  <div key={r.id} style={{ background: "#121B2E", border: "1px solid #1F2C44", borderRadius: 10, padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div>
                      <p style={{ margin: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#7A8699" }}>{r.id} · {r.submitted}</p>
                      <p style={{ margin: "4px 0 2px", fontSize: 15, fontWeight: 600 }}>{r.deceased} — {r.family}</p>
                      <p style={{ margin: 0, fontSize: 13, color: "#9AA5B8" }}>
                        {session.role === "hospital" ? r.hospital : r.station}
                        {r.hospitalNote && session.role === "police" ? ` · Hospital note: ${r.hospitalNote}` : ""}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Seal status={r.status} />
                      {session.role === "hospital" && r.status === "pending_hospital" && (
                        <button onClick={() => advance(r.id, "hospital_clear")} style={btn("#2E7D6B", "#0B1220")}>Clear</button>
                      )}
                      {session.role === "police" && r.status === "pending_police" && (
                        <>
                          <button onClick={() => advance(r.id, "police_clear")} style={btn("#2E7D6B", "#0B1220")}>Approve</button>
                          <button onClick={() => advance(r.id, "reject")} style={btnGhost("#8C3A2E", "#8C3A2E")}>Reject</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {session.role === "user" && (
              <div>
                <div style={{ background: "#121B2E", border: "1px solid #1F2C44", borderRadius: 10, padding: 18, marginBottom: 24 }}>
                  <p style={{ margin: "0 0 12px", fontSize: 12, letterSpacing: 1.5, color: "#7A8699", fontWeight: 600 }}>SUBMIT NEW REQUEST</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input style={{ ...inputStyle, flex: 1, minWidth: 180 }} placeholder="Deceased's full name" value={newForm.deceased} onChange={(e) => setNewForm({ ...newForm, deceased: e.target.value })} />
                    <select style={inputStyle} value={newForm.hospital} onChange={(e) => setNewForm({ ...newForm, hospital: e.target.value })}>
                      <option>City Hospital</option>
                      <option>Lakeview Medical</option>
                    </select>
                    <button onClick={submitNew} style={btn("#C08A2E", "#0B1220")}>Submit</button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {requests.filter((r) => r.ownerEmail === session.email).map((r) => (
                    <div key={r.id} style={{ background: "#121B2E", border: "1px solid #1F2C44", borderRadius: 10, padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ margin: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#7A8699" }}>{r.id} · Submitted {r.submitted}</p>
                        <p style={{ margin: "4px 0 0", fontSize: 15, fontWeight: 600 }}>{r.deceased}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Seal status={r.status} />
                        {r.status === "approved" && <button style={btnGhost("#2E7D6B", "#2E7D6B")}>Download certificate</button>}
                      </div>
                    </div>
                  ))}
                  {requests.filter((r) => r.ownerEmail === session.email).length === 0 && (
                    <p style={{ color: "#7A8699", fontSize: 13 }}>No requests yet — submit one above.</p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
