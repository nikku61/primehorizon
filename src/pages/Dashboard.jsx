import { useCallback, useEffect, useRef, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import "../css/Dashboard.css";
    import WeatherExtended from "./Weatherextended";
    import "../css/Weatherextended.css";

    // ─── SVG Icon Library ─────────────────────────────────────────────────────────
    const Icon = ({ name, size = 16, color = "currentColor" }) => {
    const icons = {
        wind: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
        </svg>
        ),
        droplet: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
        ),
        eye: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
        ),
        gauge: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
        </svg>
        ),
        thermometer: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
        </svg>
        ),
        sun: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        ),
        sunrise: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/>
            <line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>
            <line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/>
        </svg>
        ),
        sunset: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/>
            <line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>
            <line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/>
        </svg>
        ),
        mapPin: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        ),
        search: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        ),
        logout: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        ),
        refresh: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
        ),
        uv: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            <path d="M9 12h6" strokeWidth="1.5"/><path d="M12 9v6" strokeWidth="1.5"/>
        </svg>
        ),
        alertTriangle: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        ),
    };
    return icons[name] ?? null;
    };

    // ─── Blue Palette Constants ───────────────────────────────────────────────────
    const BLUE = {
    50:  "#EAF2FB",
    100: "#C2D9F0",
    400: "#3A7CBD",
    600: "#1F5D96",
    800: "#0C3F6E",
    };

    // ─── WMO Weather Codes ────────────────────────────────────────────────────────
    const WMO = {
    0:  { label: "Clear Sky",       icon: "☀️", bg: ["#e3effa","#d1e2f3"] },
    1:  { label: "Mainly Clear",    icon: "🌤️", bg: ["#dde8f5","#cdddf0"] },
    2:  { label: "Partly Cloudy",   icon: "⛅",  bg: ["#d8e5f2","#c8d8ec"] },
    3:  { label: "Overcast",        icon: "☁️",  bg: ["#cdd9e8","#bccde0"] },
    45: { label: "Foggy",           icon: "🌫️", bg: ["#d0dce9","#c0cfe2"] },
    48: { label: "Icy Fog",         icon: "🌫️", bg: ["#cfdae8","#bfcee0"] },
    51: { label: "Light Drizzle",   icon: "🌦️", bg: ["#dae6f2","#cadae9"] },
    53: { label: "Drizzle",         icon: "🌦️", bg: ["#d5e2ef","#c5d6e8"] },
    55: { label: "Heavy Drizzle",   icon: "🌧️", bg: ["#cfdded","#bfd2e5"] },
    61: { label: "Light Rain",      icon: "🌧️", bg: ["#cad8eb","#bacde3"] },
    63: { label: "Rain",            icon: "🌧️", bg: ["#c4d3e8","#b4c8e0"] },
    65: { label: "Heavy Rain",      icon: "🌧️", bg: ["#bccde5","#acc2dd"] },
    71: { label: "Light Snow",      icon: "🌨️", bg: ["#daeaf5","#caddef"] },
    73: { label: "Snow",            icon: "❄️",  bg: ["#d2e4f2","#c2d8ec"] },
    75: { label: "Heavy Snow",      icon: "❄️",  bg: ["#c8dcf0","#b8d0ea"] },
    80: { label: "Rain Showers",    icon: "🌦️", bg: ["#c6d8ea","#b6cce3"] },
    81: { label: "Rain Showers",    icon: "🌧️", bg: ["#bfd2e7","#afc6e0"] },
    82: { label: "Violent Showers", icon: "🌧️", bg: ["#b8cce4","#a8c0dd"] },
    95: { label: "Thunderstorm",    icon: "⛈️",  bg: ["#b2c4de","#9fb8d6"] },
    96: { label: "Thunderstorm",    icon: "⛈️",  bg: ["#abbedd","#98b2d5"] },
    99: { label: "Thunderstorm",    icon: "⛈️",  bg: ["#a4b8db","#91abd3"] },
    };
    const getWmo = (code) => WMO[code] ?? { label: "Unknown", icon: "🌡️", bg: ["#d1e2f3","#c0d5ea"] };

    // ─── Helpers ──────────────────────────────────────────────────────────────────
    const toF         = (c)    => Math.round(c * 9 / 5 + 32);
    const displayTemp = (c, u) => u === "F" ? toF(c) : Math.round(c);
    const windVal     = (k, u) => u === "F" ? Math.round(k * 0.621) : Math.round(k);
    const windU       = (u)    => u === "F" ? "mph" : "km/h";
    const uvLabel     = (v)    => v <= 2 ? "Low" : v <= 5 ? "Moderate" : v <= 7 ? "High" : "Very High";
    const uvColor     = (v)    => v <= 2 ? BLUE[400] : v <= 5 ? BLUE[600] : BLUE[800];
    const fmt12       = (iso)  => iso ? new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "–";
    const pressureStr = (hPa, u) => hPa == null ? "–" : u === "F" ? `${(hPa * 0.02953).toFixed(2)} inHg` : `${Math.round(hPa)} hPa`;
    const visStr      = (m, u)   => m == null ? "–" : u === "F" ? `${(m / 1000 * 0.621).toFixed(1)} mi` : `${(m / 1000).toFixed(1)} km`;

    // ─── API ─────────────────────────────────────────────────────────────────────
    // Custom error so the UI can tell "API is down" apart from other failures
    class ApiDownError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ApiDownError";
        this.status = status;
    }
    }

    const geocode = async (q) => {
    let r;
    try {
        r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=en&format=json`);
    } catch {
        throw new ApiDownError("Weather API is unreachable.");
    }
    if (!r.ok) throw new ApiDownError(`Weather API returned an error (${r.status}).`, r.status);
    const d = await r.json();
    return d.results ?? [];
    };

    const fetchWeather = async (lat, lon) => {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", lon);
    url.searchParams.set("current",  ["temperature_2m","apparent_temperature","relative_humidity_2m","wind_speed_10m","weather_code","surface_pressure","uv_index","dew_point_2m","visibility","is_day"].join(","));
    url.searchParams.set("hourly",   ["temperature_2m","weather_code","wind_speed_10m","wind_speed_80m","relative_humidity_2m","soil_temperature_6cm","pressure_msl"].join(","));
    url.searchParams.set("daily",    ["temperature_2m_max","temperature_2m_min","weather_code","sunrise","sunset","uv_index_max","wind_speed_10m_max","rain_sum"].join(","));
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", "10");

    let r;
    try {
        r = await fetch(url);
    } catch {
        // fetch throws on network failure / DNS failure / CORS / server unreachable
        throw new ApiDownError("Weather API is unreachable. The service may be down.");
    }

    if (!r.ok) {
        // API responded, but with an error status — treat 5xx (and 429) as "API is down"
        if (r.status >= 500 || r.status === 429) {
        throw new ApiDownError(`Weather API is currently down (status ${r.status}).`, r.status);
        }
        throw new ApiDownError(`Weather API returned an error (status ${r.status}).`, r.status);
    }

    return r.json();
    };

    // ─── Sun Arc ──────────────────────────────────────────────────────────────────
    function SunArc({ progress }) {
    const angle = Math.PI * Math.max(0, Math.min(1, progress));
    const cx = 5 + 60 * Math.cos(Math.PI - angle);
    const cy = 34 - 30 * Math.sin(angle);
        return (
            <svg viewBox="0 0 70 40" fill="none" className="ph-sun-arc">
                <defs>
                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={BLUE[100]} />
                        <stop offset="100%" stopColor={BLUE[600]} />
                    </linearGradient>
                </defs>
                <path d="M5 36 Q35 4 65 36" stroke="#E2E8F0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M5 36 Q35 4 65 36" stroke="url(#arcGrad)" strokeWidth="2.5" fill="none"
                    strokeDasharray="92" strokeDashoffset={92 - 92 * progress} strokeLinecap="round" />
                <circle cx={cx} cy={cy - 2} r="5" fill={BLUE[600]} />
                <circle cx={cx} cy={cy - 2} r="8" fill={BLUE[600]} fillOpacity="0.2" />
            </svg>
        );
    }

    // ─── Skeleton ─────────────────────────────────────────────────────────────────
    function Skeleton({ h = 16, w = "100%", r = 8 }) {
    return (
        <div className="ph-skeleton" style={{ height: h, width: w, borderRadius: r }} />
    );
    }

    // ─── Search Box ───────────────────────────────────────────────────────────────
    function SearchBox({ onSelect, onApiError }) {
    const [query,   setQuery]   = useState("");
    const [results, setResults] = useState([]);
    const [open,    setOpen]    = useState(false);
    const [focused, setFocused] = useState(false);
    const debounce = useRef(null);
    const wrapRef  = useRef(null);

    useEffect(() => {
        const h = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    const search = (q) => {
        clearTimeout(debounce.current);
        if (q.length < 2) { setResults([]); setOpen(false); return; }
        debounce.current = setTimeout(async () => {
        try {
            const r = await geocode(q);
            setResults(r); setOpen(r.length > 0);
        } catch (err) {
            setResults([]); setOpen(false);
            onApiError?.(err?.name === "ApiDownError" ? err.message : "Search is unavailable. Check your connection.");
        }
        }, 350);
    };

    const pick = (r) => {
        onSelect({ lat: r.latitude, lon: r.longitude, name: r.name, country: r.country_code });
        setQuery(""); setOpen(false); setResults([]);
    };

    return (
        <div ref={wrapRef} className="ph-search-wrap">
        <div className={`ph-search-input-row${focused ? " focused" : ""}`}>
            <Icon name="search" size={14} color={BLUE[400]} />
            <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); search(e.target.value); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search city…"
            className="ph-search-input"
            />
        </div>
        {open && (
            <div className="ph-search-dropdown">
            {results.map((r, i) => (
                <div key={i} onClick={() => pick(r)} className="ph-search-result">
                <Icon name="mapPin" size={12} color={BLUE[600]} />
                <span>
                    <span className="ph-search-result-name">{r.name}</span>
                    {r.admin1 && <span className="ph-search-result-admin">, {r.admin1}</span>}
                    <span className="ph-search-result-country"> · {r.country}</span>
                </span>
                </div>
            ))}
            </div>
        )}
        </div>
    );
    }

    // ─── Stat Chip ────────────────────────────────────────────────────────────────
    function StatChip({ iconName, iconColor, iconBg, label, value, sub }) {
    return (
        <div className="ph-stat-chip">
        <div className="ph-stat-chip-icon" style={{ background: iconBg }}>
            <Icon name={iconName} size={16} color={iconColor} />
        </div>
        <div className="ph-stat-chip-body">
            <div className="ph-stat-chip-label">{label}</div>
            <div className="ph-stat-chip-value">{value}</div>
            {sub && <div className="ph-stat-chip-sub">{sub}</div>}
        </div>
        </div>
    );
    }

    // ─── Forecast Row ─────────────────────────────────────────────────────────────
    function ForecastRow({ label, sublabel, icon, temp, wind, humidity, unit, highlight }) {
    return (
        <div className={`ph-forecast-row${highlight ? " highlight" : ""}`}>
        <div className="ph-forecast-row-icon">{icon}</div>
        <div className="ph-forecast-row-body">
            <div className="ph-forecast-row-label">{label}</div>
            <div className="ph-forecast-row-sublabel">{sublabel}</div>
        </div>
        <div className="ph-forecast-row-right">
            <div className="ph-forecast-row-temp">
            {temp}<span className="ph-forecast-row-temp-unit">°{unit}</span>
            </div>
            <div className="ph-forecast-row-meta">
            {wind !== "–" ? `${wind} ${windU(unit)}` : ""}
            {wind !== "–" && humidity > 0 ? " · " : ""}
            {humidity > 0 ? `${humidity}%` : ""}
            </div>
        </div>
        </div>
    );
    }

    // ─── Main Dashboard ───────────────────────────────────────────────────────────
    export default function WeatherDashboard() {
    const navigate = useNavigate();

    const [location, setLocation] = useState({ lat: 13.6218, lon: 123.1948, name: "Naga City", country: "PH" });
    const [weather,  setWeather]  = useState(null);
    const [loading,  setLoading]  = useState(true);
    const [error,    setError]    = useState(null);
    const [unit,     setUnit]     = useState("C");
    const [tab,      setTab]      = useState("today");
    const [now,      setNow]      = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(t);
    }, []);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            setWeather(await fetchWeather(location.lat, location.lon));
        } catch (err) {
            setError(
                err?.name === "ApiDownError"
                    ? err.message
                    : "Could not load weather data. Check your connection."
            );
        } finally {
            setLoading(false);
        }
    }, [location]);

    useEffect(() => { load(); }, [load]);

    const handleLogout = () => { localStorage.removeItem("user"); navigate("/login"); };

    // ── Derived data ──────────────────────────────────────────────────────────
    const cur   = weather?.current;
    const daily = weather?.daily;
    const hrly  = weather?.hourly;

    const buildRows = (targetDate, filterFn) => {
        if (!hrly) return [];
        return hrly.time
        .map((t, i) => ({ d: new Date(t), i }))
        .filter(({ d }, idx) => d.toDateString() === targetDate.toDateString() && filterFn(d, idx))
        .slice(0, 9)
        .map(({ d, i }) => ({
            label:    d.toLocaleTimeString([], { hour: "numeric", hour12: true }),
            sublabel: getWmo(hrly.weather_code[i]).label,
            icon:     getWmo(hrly.weather_code[i]).icon,
            temp:     displayTemp(hrly.temperature_2m[i], unit),
            wind:     windVal(hrly.wind_speed_10m[i], unit),
            humidity: hrly.relative_humidity_2m[i],
        }));
    };

    const today    = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

    const todayRows    = buildRows(today,    (d) => d.getHours() >= now.getHours());
    const tomorrowRows = buildRows(tomorrow, (_, idx) => idx % 3 === 0);

    const tenDayRows = (() => {
        if (!daily) return [];
        const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        return daily.time.slice(0, 10).map((t, i) => {
        const d = new Date(t);
        return {
            label:    i === 0 ? "Today" : i === 1 ? "Tomorrow" : days[d.getDay()],
            sublabel: getWmo(daily.weather_code[i]).label,
            icon:     getWmo(daily.weather_code[i]).icon,
            temp:     displayTemp(daily.temperature_2m_max[i], unit),
            wind:     "–", humidity: 0,
        };
        });
    })();

    const forecastRows = tab === "today" ? todayRows : tab === "tomorrow" ? tomorrowRows : tenDayRows;

    const sunProgress = (() => {
        if (!daily?.sunrise?.[0]) return 0.5;
        const rise = new Date(daily.sunrise[0]).getTime();
        const set  = new Date(daily.sunset[0]).getTime();
        return Math.max(0, Math.min(1, (now.getTime() - rise) / (set - rise)));
    })();

    const wmo     = cur ? getWmo(cur.weather_code) : null;
    const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    const dateStr = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
    const uvVal   = cur?.uv_index ?? daily?.uv_index_max?.[0] ?? 0;

    // Dynamic backgrounds
    const heroBg = wmo && !loading
        ? `linear-gradient(145deg, ${wmo.bg[0]}, ${wmo.bg[1]})`
        : "rgba(255,255,255,0.9)";

    const uvTileBg     = "#F8FAFC";
    const uvTileBorder = "#E2E8F0";

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="ph-root">

        {/* ════ HEADER ════════════════════════════════════════════════════════ */}
        <header className="ph-header">
            <div className="ph-header-inner">

            {/* Brand */}
            <div className="ph-brand">
                <div className="ph-logo-wrap">
                <svg className="ph-logo-svg" viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(18, 5) scale(0.68)">
                    <path
                        d="M19.5 25C11 25 5 31 5 40C5 49 12 55 21 55H74C84 55 91 47 91 37C91 27 83 20 73 20C71 11 61 5 50 5C39 5 30 12 27 22C24.5 20.5 22 20 19.5 20"
                        stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <path d="M32 68V76" stroke="white" strokeWidth="9" strokeLinecap="round"/>
                    <path d="M50 71V79" stroke="white" strokeWidth="9" strokeLinecap="round"/>
                    <path d="M68 68V76" stroke="white" strokeWidth="9" strokeLinecap="round"/>
                    </g>
                </svg>
                </div>
                <div className="ph-brand-text">
                <span className="ph-brand-title">Prime<span className="ph-brand-title-light">Horizon</span></span>
                <span className="ph-brand-sub">Visualized Weather App</span>
                </div>
            </div>

            {/* Location pill */}
            <div className="ph-location-pill">
                <Icon name="mapPin" size={13} color={BLUE[600]} />
                {location.name}{location.country ? `, ${location.country}` : ""}
            </div>

            {/* Search */}
            <SearchBox onSelect={setLocation} onApiError={setError} />

            {/* Actions */}
            <div className="ph-header-actions">
                <div className="ph-unit-toggle">
                {["C","F"].map((u) => (
                    <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`ph-unit-btn${unit === u ? " active" : ""}`}
                    >
                    °{u}
                    </button>
                ))}
                </div>

                <button onClick={handleLogout} className="ph-logout-btn">
                <Icon name="logout" size={15} color="#fff" />
                Log out
                </button>
            </div>
            </div>
        </header>

        {/* ════ BODY ══════════════════════════════════════════════════════════ */}
        <main className="ph-body">

            {/* ── LEFT COLUMN (60%) ─────────────────────────────────────────── */}
            <div className="ph-left-col">

            {/* ── Hero Weather Card ──────────────────────────────────────── */}
            <div className="ph-hero-card" style={{ background: heroBg }}>
                <div className="ph-hero-inner">
                {error && (
                    <div className="ph-error-banner" role="alert">
                    <Icon name="alertTriangle" size={16} color="#c0392b" />
                    <span className="ph-error-text">{error}</span>
                    <button onClick={load} className="ph-error-retry">Retry</button>
                    </div>
                )}

                {/* Card header */}
                <div className="ph-card-header">
                    <div>
                    <div className="ph-card-header-label">Current Weather</div>
                    <div className="ph-card-header-time">{timeStr}</div>
                    <div className="ph-card-header-date">{dateStr}</div>
                    </div>
                    <button onClick={load} title="Refresh" className="ph-refresh-btn">
                    <Icon name="refresh" size={14} color={BLUE[600]} />
                    </button>
                </div>

                {loading ? (
                    <div className="ph-skeleton-grid">
                    <Skeleton h={70} r={14} />
                    <div className="ph-skeleton-stat-grid">
                        {[1,2,3,4,5,6].map(i => <Skeleton key={i} h={62} r={12} />)}
                    </div>
                    </div>
                ) : cur ? (
                    <>
                    {/* Temperature display */}
                    <div className="ph-temp-block">
                        <div className="ph-temp-icon">{wmo.icon}</div>
                        <div className="ph-temp-info">
                        <div className="ph-temp-value-row">
                            <span className="ph-temp-value">{displayTemp(cur.temperature_2m, unit)}</span>
                            <span className="ph-temp-unit">°{unit}</span>
                        </div>
                        <div className="ph-temp-label">{wmo.label}</div>
                        <div className="ph-temp-sub">
                            Feels like {displayTemp(cur.apparent_temperature, unit)}°{unit}
                            {daily && ` · H: ${displayTemp(daily.temperature_2m_max[0], unit)}° · L: ${displayTemp(daily.temperature_2m_min[0], unit)}°`}
                        </div>
                        </div>
                    </div>

                    {/* Stat chips */}
                    <div className="ph-stats-grid">
                        <StatChip
                        iconName="wind"
                        iconColor={BLUE[600]}
                        iconBg={BLUE[50]}
                        label="Wind"
                        value={`${windVal(cur.wind_speed_10m, unit)} ${windU(unit)}`}
                        />
                        <StatChip
                        iconName="droplet"
                        iconColor={BLUE[800]}
                        iconBg={BLUE[100]}
                        label="Humidity"
                        value={`${cur.relative_humidity_2m}%`}
                        />
                        <StatChip
                        iconName="eye"
                        iconColor={BLUE[400]}
                        iconBg={BLUE[50]}
                        label="Visibility"
                        value={visStr(cur.visibility, unit)}
                        />
                        <StatChip
                        iconName="gauge"
                        iconColor={BLUE[600]}
                        iconBg={BLUE[50]}
                        label="Pressure"
                        value={pressureStr(cur.surface_pressure, unit)}
                        />
                        <StatChip
                        iconName="thermometer"
                        iconColor={BLUE[800]}
                        iconBg={BLUE[100]}
                        label="Dew Point"
                        value={`${displayTemp(cur.dew_point_2m, unit)}°${unit}`}
                        />
                        <StatChip
                        iconName="uv"
                        iconColor={uvColor(uvVal)}
                        iconBg={BLUE[100]}
                        label="UV Index"
                        value={`${uvVal}`}
                        sub={uvLabel(uvVal)}
                        />
                    </div>
                    </>
                ) : null}
                </div>
            </div>

            {/* ── Sun Summary Card ───────────────────────────────────────── */}
            <div className="ph-sun-card">
                <div className="ph-sun-card-header">
                <div className="ph-sun-card-icon-wrap">
                    <Icon name="sun" size={14} color={BLUE[800]} />
                </div>
                <span className="ph-sun-card-title">Sun Summary</span>
                </div>

                {loading ? <Skeleton h={52} r={12} /> : daily ? (
                <div className="ph-sun-row">
                    {/* Sunrise */}
                    <div className="ph-sunrise-tile">
                    <div className="ph-sun-tile-icon"><Icon name="sunrise" size={20} color={BLUE[800]} /></div>
                    <div className="ph-sun-tile-label">Sunrise</div>
                    <div className="ph-sun-tile-value">{fmt12(daily.sunrise[0])}</div>
                    </div>

                    <SunArc progress={sunProgress} />

                    {/* Sunset */}
                    <div className="ph-sunset-tile">
                    <div className="ph-sun-tile-icon"><Icon name="sunset" size={20} color={BLUE[800]} /></div>
                    <div className="ph-sun-tile-label">Sunset</div>
                    <div className="ph-sun-tile-value">{fmt12(daily.sunset[0])}</div>
                    </div>

                    <div className="ph-sun-divider" />

                    {/* UV Index tile — all colors driven by uvColor(uvVal) */}
                    <div
                        className="ph-uv-tile"
                        style={{ background: uvTileBg, border: `1px solid ${uvTileBorder}` }}
                    >
                        <div className="ph-sun-tile-icon"><Icon name="uv" size={20} color={uvColor(uvVal)} /></div>
                        <div className="ph-sun-tile-label">UV Index</div>
                        <div className="ph-sun-tile-value" style={{ color: uvColor(uvVal) }}>
                            {uvVal}
                        </div>
                        <div className="ph-uv-tile-sub" style={{ color: uvColor(uvVal) }}>
                            {uvLabel(uvVal)}
                        </div>
                    </div>
                </div>
                ) : null}
            </div>
            </div>

            {/* ── RIGHT COLUMN (40%): Forecast ──────────────────────────────── */}
            <div className="ph-right-col">
            <div className="ph-forecast-header">
                <span className="ph-forecast-title">Forecast</span>
            </div>

            <div className="ph-tabs">
                {[["today","Today"],["tomorrow","Tomorrow"],["10days","10 Days"]].map(([key, lbl]) => (
                <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`ph-tab-btn${tab === key ? " active" : ""}`}
                >
                    {lbl}
                </button>
                ))}
            </div>

            <div className="ph-forecast-list">
                {loading ? (
                Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} h={60} r={12} />)
                ) : forecastRows.length === 0 ? (
                <div className="ph-forecast-empty">No forecast data for this period.</div>
                ) : (
                forecastRows.map((row, i) => (
                    <ForecastRow key={i} {...row} unit={unit} highlight={i === 0} />
                ))
                )}
            </div>
            </div>

        </main>

        {/* ════ EXTENDED WEATHER DATA ═════════════════════════════════════ */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 28px" }}>
            <WeatherExtended weather={weather} unit={unit} loading={loading} />
        </div>

        </div>
    );
    }