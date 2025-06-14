import { Navigate, Route, Routes } from "react-router-dom"
import { TrackerPage } from "../pages/TrackerPage"

export const TrackerRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <TrackerPage />} />
        <Route path="/*" element={ <Navigate to="/" />} />
    </Routes>
  )
}
