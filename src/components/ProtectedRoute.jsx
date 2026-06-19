    import { Navigate } from "react-router-dom";

    export default function ProtectedRoute({ children }) {
    const user = localStorage.getItem("user");

    console.log("USER FROM LOCALSTORAGE:", user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
    }