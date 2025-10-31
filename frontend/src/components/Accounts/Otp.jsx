import React, { useState, useRef, useEffect } from "react";

const Otp = React.memo(({ length,  onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    onChange && onChange(newOtp.join(""));

    // focus next input
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

 



  return (
    <div style={{ display: "flex", gap: "1.5rem" }}>
      {Array.from({ length }, (_, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          value={otp[idx]}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          ref={(el) => (inputsRef.current[idx] = el)}
          style={{
            width: "2.5rem",
            height: "3rem",
            textAlign: "center",
            border: "1px solid #e5e7eb",
            borderRadius: "0.25rem",
          }}
        />
      ))}
    </div>
  );
});

export default Otp;
