import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PhotoResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const image = location.state?.image;

  // Redirect safely if refreshed
  useEffect(() => {
    if (!image) {
      navigate("/list");
    }
  }, [image, navigate]);

  if (!image) return null;

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "captured-photo.png";
    link.click();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Captured Photo</h2>

        <div style={styles.imageWrapper}>
          <img src={image} alt="Captured" style={styles.image} />
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.primaryBtn} onClick={downloadImage}>
            Download
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/list")}
          >
            Back to List
          </button>
        </div>
      </div>
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
    background: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    width: "100%",
    maxWidth: "900px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
    textAlign: "center"
  },

  heading: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "30px",
    color: "#1f2937"
  },

  imageWrapper: {
    marginBottom: "30px"
  },

  image: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
  },

  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px"
  },

  secondaryBtn: {
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    background: "#374151",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px"
  }
};

export default PhotoResult;