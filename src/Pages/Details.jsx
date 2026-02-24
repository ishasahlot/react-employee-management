import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const employee = location.state?.employee;

  // Redirect if no data (prevents blank page on refresh)
  useEffect(() => {
    if (!employee) {
      navigate("/list");
    }
  }, [employee, navigate]);

  if (!employee) return null;

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    navigate("/photo-result", {
      state: { image: imageData }
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Employee Details</h2>

        <div style={styles.grid}>
          <Info label="Name" value={employee[0]} />
          <Info label="Position" value={employee[1]} />
          <Info label="Office" value={employee[2]} />
          <Info label="Extension" value={employee[3]} />
          <Info label="Start Date" value={employee[4]} />
          <Info label="Salary" value={employee[5]} />
        </div>

        <div style={{ textAlign: "center" }}>
          <video
            ref={videoRef}
            autoPlay
            style={styles.video}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />

          <div style={styles.buttonRow}>
            <button style={styles.primaryBtn} onClick={openCamera}>
              Open Camera
            </button>

            <button style={styles.successBtn} onClick={capturePhoto}>
              Capture Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.infoBox}>
      <span style={styles.label}>{label}</span>
      <span style={styles.value}>{value}</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "40px"
  },

  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px",
    width: "100%",
    maxWidth: "900px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.2)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#1f2937"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },

  infoBox: {
    background: "#f3f4f6",
    padding: "18px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column"
  },

  label: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  value: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#111827"
  },

  video: {
    width: "100%",
    maxWidth: "450px",
    borderRadius: "16px",
    marginBottom: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    fontWeight: "500"
  },

  successBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#16a34a",
    color: "white",
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default Details;