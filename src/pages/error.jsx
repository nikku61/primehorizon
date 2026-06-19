    import React from "react";

    export default function ErrorMessage({ domain }) {
    return (
        <div style={styles.container}>
        <div className="icon icon-generic" style={styles.iconWrapper}>
            <svg
            viewBox="0 0 64 64"
            style={{ width: "100%", height: "100%" }}
            xmlns="http://www.w3.org/2000/svg"
            >
            <circle cx="32" cy="32" r="30" fill="none" stroke="#9aa0a6" strokeWidth="3" />
            <line x1="20" y1="20" x2="44" y2="44" stroke="#9aa0a6" strokeWidth="3" strokeLinecap="round" />
            <line x1="44" y1="20" x2="20" y2="44" stroke="#9aa0a6" strokeWidth="3" strokeLinecap="round" />
            </svg>
        </div>

        <h1 style={styles.title}>This site can’t be reached</h1>
        <p style={styles.text}>
            Check if there is a typo in <strong>{domain || "the website"}</strong>.
        </p>
        <p style={styles.text}>
            If spelling is correct, <a href="#" style={styles.link}>try running Windows Network Diagnostics</a>.
        </p>
        <p style={styles.errorCode}>DNS_PROBE_FINISHED_NXDOMAIN</p>
        <button style={styles.button} onClick={() => window.location.reload()}>
            Reload
        </button>
        </div>
    );
    }

    const styles = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "20%",
        fontFamily: '"Segoe UI", Tahoma, sans-serif',
        backgroundColor: "#202124",
        color: "#e8eaed",
    },
    iconWrapper: {
        marginBottom: "20px",
        width: "64px",
        height: "64px",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "500",
        marginBottom: "20px",
    },
    text: {
        fontSize: "0.9rem",
        marginBottom: "15px",
        color: "#bdc1c6",
    },
    link: {
        color: "#8ab4f8",
        textDecoration: "none",
    },
    errorCode: {
        fontSize: "0.8rem",
        color: "#9aa0a6",
        marginBottom: "20px",
    },
    button: {
        padding: "8px 24px",
        borderRadius: "20px",
        border: "none",
        backgroundColor: "#8ab4f8",
        color: "#202124",
        fontWeight: "bold",
        cursor: "pointer",
    },
    };