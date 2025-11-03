import React from "react";

const Loader = () => {


  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "8px solid #f3f3f3",
          borderTop: "8px solid #91ae98",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
