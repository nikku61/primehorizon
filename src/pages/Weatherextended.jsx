import { useState } from "react";

    // ─── Blue Palette (mirrors Dashboard) ────────────────────────────────────────
    const BLUE = {
    50:  "#EAF2FB",
    100: "#C2D9F0",
    400: "#3A7CBD",
    600: "#1F5D96",
    800: "#0C3F6E",
    header: "#2b5c8f",
    };

    // ─── Inline SVG Icons ─────────────────────────────────────────────────────────
    const Icon = ({ name, size = 16, color = "currentColor" }) => {
    const icons = {
        rain: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/>
            <line x1="12" y1="15" x2="12" y2="23"/>
            <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
        </svg>
        ),
        wind: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
        </svg>
        ),
        thermometer: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
        </svg>
        ),
        pressure: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/>
        </svg>
        ),
        droplet: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
        ),
        soil: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22V12"/><path d="M12 12C12 7 7 4 4 7"/><path d="M12 12C12 7 17 4 20 7"/>
            <path d="M3 22h18"/><path d="M5 22v-4"/><path d="M19 22v-4"/>
        </svg>
        ),
        uv: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>  
        ),
        chevronDown: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
        </svg>
        ),
        chevronUp: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
        </svg>
        ),
    };
    return icons[name] ?? null;
    };

    // ─── Skeleton ─────────────────────────────────────────────────────────────────
    function Skeleton({ h = 16, w = "100%", r = 8 }) {
    return <div className="ph-skeleton" style={{ height: h, width: w, borderRadius: r }} />;
    }

    // ─── Section Header ───────────────────────────────────────────────────────────
    function SectionHeader({ iconName, title, color }) {
    return (
        <div className="wx-section-header">
        <div className="wx-section-icon-wrap" style={{ background: BLUE[50], border: `1px solid ${BLUE[100]}` }}>
            <Icon name={iconName} size={14} color={color ?? BLUE[800]} />
        </div>
        <span className="wx-section-title" style={{ color: BLUE[600] }}>{title}</span>
        </div>
    );
    }

    // ─── Mini Sparkline (SVG) ─────────────────────────────────────────────────────
    function Sparkline({ data, color, height = 40 }) {
    if (!data || data.length < 2) return null;
    const mn = Math.min(...data);
    const mx = Math.max(...data);
    const range = mx - mn || 1;
    const pts = data.map((v, i) => {
        const x = (i / (data.length - 1)) * 200;
        const y = height - ((v - mn) / range) * (height - 6) - 3;
        return `${x},${y}`;
    });
    const poly = pts.join(" ");
    const fill = `${pts[0]} ${pts.join(" ")} 200,${height} 0,${height}`;
    const gradId = `spark-${color.replace(/[^a-z0-9]/gi, "")}`;
    return (
        <svg viewBox={`0 0 200 ${height}`} preserveAspectRatio="none"
        style={{ width: "100%", height, display: "block" }}>
        <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
        </defs>
        <polygon points={fill} fill={`url(#${gradId})`} />
        <polyline points={poly} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    }

    // ─── Shared WMO icon lookup ───────────────────────────────────────────────────
    const wmoIcon = (code) => {
    const map = {0:"☀️",1:"🌤️",2:"⛅",3:"☁️",45:"🌫️",48:"🌫️",51:"🌦️",53:"🌦️",55:"🌧️",61:"🌧️",63:"🌧️",65:"🌧️",71:"🌨️",73:"❄️",75:"❄️",80:"🌦️",81:"🌧️",82:"🌧️",95:"⛈️",96:"⛈️",99:"⛈️"};
    return map[code] ?? "🌡️";
    };

    // ─── Stat Chip — mirrors Dashboard's .ph-stat-chip exactly ───────────────────
    function StatChip({ icon, label, value, sub, color }) {
    return (
        <div className="wx-stat-chip">
        <div className="wx-stat-chip-icon" style={{ background: BLUE[50] }}>
            <Icon name={icon} size={15} color={color} />
        </div>
        <div className="wx-stat-chip-body">
            <div className="wx-stat-chip-label">{label}</div>
            <div className="wx-stat-chip-value">{value}</div>
            {sub && <div className="wx-stat-chip-sub">{sub}</div>}
        </div>
        </div>
    );
    }

    // Catmull-Rom → cubic-bezier smoothing so the line always reads as a continuous
    // curve no matter how sparse/flat the underlying data is.
    function smoothPath(pts) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i === 0 ? i : i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
        const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
    }

    // ─── Temperature Curve — fluid SVG chart, always fills the card ──────────────
    function TemperatureCurve({ hourly, unit }) {
    if (!hourly) return <Skeleton h={230} r={12} />;

    const now = new Date();
    const displayTemp = (c) => unit === "F" ? Math.round(c * 9 / 5 + 32) : Math.round(c);

    const nowIdx = hourly.time.reduce((best, t, i) => new Date(t) <= now ? i : best, 0);
    const startIdx = Math.max(0, nowIdx - 1);
    const slots = hourly.time.slice(startIdx, startIdx + 24).map((t, offset) => ({ t: new Date(t), i: startIdx + offset }));
    const nowSlotIdx = Math.max(0, slots.findIndex((s) => s.i === nowIdx));

    const temps = slots.map(({ i }) => hourly.temperature_2m[i] ?? 0);
    const mn = Math.min(...temps), mx = Math.max(...temps);
    const range = mx - mn || 1;
    const avgHum = Math.round(slots.reduce((s, { i }) => s + (hourly.relative_humidity_2m[i] ?? 0), 0) / slots.length);

    const W = 800, H = 168, padTop = 34, padBottom = 8;
    const xAt = (idx) => (idx / (slots.length - 1)) * W;
    const yAt = (t) => H - padBottom - ((t - mn) / range) * (H - padTop - padBottom);
    const points = temps.map((t, idx) => [xAt(idx), yAt(t)]);

    const linePath = smoothPath(points);
    const areaPath = `${linePath} L ${points[points.length - 1][0].toFixed(1)},${H} L ${points[0][0].toFixed(1)},${H} Z`;

    let maxIdx = 0, minIdx = 0;
    temps.forEach((t, idx) => { if (t > temps[maxIdx]) maxIdx = idx; if (t < temps[minIdx]) minIdx = idx; });
    const nowPoint = points[nowSlotIdx];

    return (
        <>
        <div className="wx-stat-row">
            <StatChip icon="thermometer" label="Right Now" value={`${displayTemp(temps[nowSlotIdx])}°`} sub={`${wmoIcon(hourly.weather_code[slots[nowSlotIdx].i])} Feels current`} color={BLUE[600]} />
            <StatChip icon="uv" label="24h High" value={`${displayTemp(mx)}°`} sub="Peak expected" color={BLUE[800]} />
            <StatChip icon="droplet" label="Avg Humidity" value={`${avgHum}%`} sub="Across 24h" color={BLUE[400]} />
        </div>

        <div className="wx-curve-wrap">
            <svg className="wx-curve-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <defs>
                <linearGradient id="wxCurveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BLUE[400]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={BLUE[400]} stopOpacity="0.02" />
                </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#wxCurveFill)" />
            <path d={linePath} fill="none" stroke={BLUE[600]} strokeWidth="2.5" strokeLinecap="round" />
            <line x1={nowPoint[0]} y1={padTop - 8} x2={nowPoint[0]} y2={H - padBottom} stroke={BLUE[400]} strokeWidth="1" strokeDasharray="3,5" opacity="0.5" />
            <circle cx={points[maxIdx][0]} cy={points[maxIdx][1]} r="4" fill={BLUE[800]} />
            <circle cx={points[minIdx][0]} cy={points[minIdx][1]} r="4" fill="#ffffff" stroke={BLUE[600]} strokeWidth="2" />
            <circle cx={nowPoint[0]} cy={nowPoint[1]} r="5.5" fill="#ffffff" stroke={BLUE[600]} strokeWidth="2.5" />
            </svg>

            <span className="wx-curve-tag wx-curve-tag-high" style={{ left: `${(points[maxIdx][0] / W) * 100}%`, top: `${(points[maxIdx][1] / H) * 100}%` }}>{displayTemp(temps[maxIdx])}°</span>
            <span className="wx-curve-tag wx-curve-tag-low" style={{ left: `${(points[minIdx][0] / W) * 100}%`, top: `${(points[minIdx][1] / H) * 100}%` }}>{displayTemp(temps[minIdx])}°</span>
            <span className="wx-curve-now-bubble" style={{ left: `${(nowPoint[0] / W) * 100}%` }}>
            {wmoIcon(hourly.weather_code[slots[nowSlotIdx].i])} {displayTemp(temps[nowSlotIdx])}°
            </span>
        </div>

        <div className="wx-curve-ticks">
            {slots.map(({ t, i }, idx) => {
            if (!(idx % 3 === 0 || idx === nowSlotIdx)) return null;
            const isNow = idx === nowSlotIdx;
            return (
                <div key={i} className={`wx-curve-tick${isNow ? " now" : ""}`} style={{ left: `${(xAt(idx) / W) * 100}%` }}>
                <span className="wx-curve-tick-icon">{wmoIcon(hourly.weather_code[i])}</span>
                <span className="wx-curve-tick-label">{isNow ? "Now" : t.toLocaleTimeString([], { hour: "numeric", hour12: true })}</span>
                </div>
            );
            })}
        </div>
        </>
    );
    }

    // ─── Daily 10-Day Table ───────────────────────────────────────────────────────
    function DailyTable({ daily, unit }) {
    if (!daily) return <Skeleton h={200} r={12} />;

    const displayTemp = (c) => unit === "F" ? Math.round(c * 9 / 5 + 32) : Math.round(c);
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const wmoIcon = (code) => {
        const map = {0:"☀️",1:"🌤️",2:"⛅",3:"☁️",45:"🌫️",48:"🌫️",51:"🌦️",53:"🌦️",55:"🌧️",61:"🌧️",63:"🌧️",65:"🌧️",71:"🌨️",73:"❄️",75:"❄️",80:"🌦️",81:"🌧️",82:"🌧️",95:"⛈️",96:"⛈️",99:"⛈️"};
        return map[code] ?? "🌡️";
    };

    const absMax = Math.max(...daily.temperature_2m_max);
    const absMin = Math.min(...daily.temperature_2m_min);
    const tempRange = absMax - absMin || 1;

    return (
        <div className="wx-daily-table">
        {daily.time.slice(0, 10).map((t, i) => {
            const d = new Date(t);
            const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : days[d.getDay()];
            const hi = daily.temperature_2m_max[i];
            const lo = daily.temperature_2m_min[i];
            const rain = daily.rain_sum?.[i] ?? 0;
            const uv = daily.uv_index_max?.[i] ?? 0;
            const wind = daily.wind_speed_10m_max?.[i] ?? 0;
            const barLeft = ((lo - absMin) / tempRange) * 100;
            const barWidth = ((hi - lo) / tempRange) * 100;

            return (
            <div key={i} className={`wx-daily-row${i === 0 ? " today" : ""}`}>
                <div className="wx-daily-day">
                <span className="wx-daily-day-name">{label}</span>
                <span className="wx-daily-day-sub">{d.toLocaleDateString([], { month: "short", day: "numeric" })}</span>
                </div>
                <span className="wx-daily-icon">{wmoIcon(daily.weather_code[i])}</span>
                <div className="wx-daily-rain">
                <Icon name="rain" size={10} color={BLUE[400]} />
                <span>{rain > 0 ? `${rain.toFixed(1)}mm` : "–"}</span>
                </div>
                <div className="wx-daily-uv">
                <span className="wx-daily-uv-dot" style={{ background: uv <= 2 ? BLUE[400] : uv <= 5 ? BLUE[600] : BLUE[800] }} />
                <span>UV {uv.toFixed(0)}</span>
                </div>
                <div className="wx-daily-wind">
                <Icon name="wind" size={10} color={BLUE[600]} />
                <span>{Math.round(wind)} km/h</span>
                </div>
                <div className="wx-daily-tempbar">
                <span className="wx-daily-lo">{displayTemp(lo)}°</span>
                <div className="wx-daily-bar-track">
                    <div className="wx-daily-bar-fill"
                    style={{ left: `${barLeft}%`, width: `${Math.max(barWidth, 4)}%`, background: `linear-gradient(90deg, ${BLUE[400]}, ${BLUE[800]})` }} />
                </div>
                <span className="wx-daily-hi">{displayTemp(hi)}°</span>
                </div>
            </div>
            );
        })}
        </div>
    );
    }

    // ─── Atmospheric Panel ────────────────────────────────────────────────────────
    function AtmosphericPanel({ hourly }) {
    if (!hourly) return (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[1,2,3,4].map(i => <Skeleton key={i} h={110} r={12} />)}
        </div>
    );

    const now = new Date();
    const past24 = hourly.time
        .map((t, i) => ({ t: new Date(t), i }))
        .filter(({ t }) => t <= now)
        .slice(-24);

    const pressures  = past24.map(({ i }) => hourly.pressure_msl?.[i]).filter(Boolean);
    const soilTemps  = past24.map(({ i }) => hourly.soil_temperature_6cm?.[i]).filter(Boolean);
    const windSpeeds = past24.map(({ i }) => hourly.wind_speed_80m?.[i]).filter(Boolean);
    const humidities = past24.map(({ i }) => hourly.relative_humidity_2m?.[i]).filter(v => v != null);

    const last = (arr) => arr[arr.length - 1] ?? 0;

    const pressureTrend = pressures.length > 2
        ? last(pressures) > pressures[0] ? "↑ Rising" : last(pressures) < pressures[0] ? "↓ Falling" : "→ Steady"
        : "–";

    return (
        <div className="wx-atmo-grid">
        <div className="wx-atmo-card">
            <SectionHeader iconName="pressure" title="Pressure · 24h" color={BLUE[600]} />
            <div className="wx-atmo-value">{Math.round(last(pressures))} <span className="wx-atmo-unit">hPa</span></div>
            <div className="wx-atmo-trend">{pressureTrend}</div>
            <Sparkline data={pressures} color={BLUE[600]} height={36} />
        </div>
        <div className="wx-atmo-card">
            <SectionHeader iconName="soil" title="Soil Temp · 6cm" color={BLUE[800]} />
            <div className="wx-atmo-value">{Math.round(last(soilTemps))}<span className="wx-atmo-unit">°C</span></div>
            <div className="wx-atmo-trend" style={{ color: BLUE[400] }}>At 6 cm depth</div>
            <Sparkline data={soilTemps} color={BLUE[800]} height={36} />
        </div>
        <div className="wx-atmo-card">
            <SectionHeader iconName="wind" title="Wind · 80m Alt." color={BLUE[400]} />
            <div className="wx-atmo-value">{Math.round(last(windSpeeds))} <span className="wx-atmo-unit">km/h</span></div>
            <div className="wx-atmo-trend" style={{ color: BLUE[400] }}>Upper wind layer</div>
            <Sparkline data={windSpeeds} color={BLUE[400]} height={36} />
        </div>
        <div className="wx-atmo-card">
            <SectionHeader iconName="droplet" title="Humidity · 24h" color={BLUE[600]} />
            <div className="wx-atmo-value">{last(humidities)}<span className="wx-atmo-unit">%</span></div>
            <div className="wx-atmo-trend" style={{ color: BLUE[600] }}>Relative humidity</div>
            <Sparkline data={humidities} color={BLUE[600]} height={36} />
        </div>
        </div>
    );
    }

    // ─── 10-Day Rain Outlook — ring-gauge grid, always fills the card ────────────
    function RainOutlook({ daily }) {
    if (!daily) return <Skeleton h={280} r={12} />;

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const data = daily.time.slice(0, 10).map((t, i) => ({
        d: new Date(t),
        rain: daily.rain_sum?.[i] ?? 0,
        code: daily.weather_code[i],
        i,
    }));

    const maxRain = Math.max(...data.map((r) => r.rain), 1);
    const totalRain = data.reduce((s, r) => s + r.rain, 0);
    const rainDays = data.filter((r) => r.rain > 0.1).length;
    const wettest = data.reduce((best, r) => (r.rain > best.rain ? r : best), data[0]);

    const R = 22, C = 2 * Math.PI * R;

    return (
        <>
        <div className="wx-stat-row">
            <StatChip icon="rain" label="Total · 10d" value={`${totalRain.toFixed(1)}mm`} sub="Accumulated" color={BLUE[600]} />
            <StatChip icon="droplet" label="Rain Days" value={`${rainDays}/10`} sub="Expecting rain" color={BLUE[400]} />
            <StatChip icon="uv" label="Wettest Day" value={days[wettest.d.getDay()]} sub={`${wettest.rain.toFixed(1)}mm`} color={BLUE[800]} />
        </div>

        <div className="wx-rain-grid">
            {data.map(({ d, rain, code, i }, idx) => {
            const pct = Math.min(rain / maxRain, 1);
            const offset = C * (1 - pct);
            const label = idx === 0 ? "Today" : idx === 1 ? "Tmrw" : days[d.getDay()];
            const ringColor = rain === 0 ? BLUE[100] : rain < maxRain * 0.34 ? BLUE[400] : rain < maxRain * 0.67 ? BLUE[600] : BLUE[800];
            return (
                <div key={i} className={`wx-rain-cell${idx === 0 ? " today" : ""}`}>
                <span className="wx-rain-cell-day">{label}</span>
                <div className="wx-rain-ring">
                    <svg viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r={R} fill="none" stroke={BLUE[50]} strokeWidth="5.5" />
                    <circle
                        cx="28" cy="28" r={R} fill="none" stroke={ringColor} strokeWidth="5.5"
                        strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"
                        transform="rotate(-90 28 28)"
                    />
                    </svg>
                    <span className="wx-rain-ring-icon">{wmoIcon(code)}</span>
                </div>
                <span className="wx-rain-cell-val">{rain > 0 ? rain.toFixed(1) : "0"}<span className="wx-rain-cell-unit">mm</span></span>
                </div>
            );
            })}
        </div>
        </>
    );
    }

    // ─── Main Extended Component ──────────────────────────────────────────────────
    export default function WeatherExtended({ weather, unit = "C", loading = false }) {
    const [expanded, setExpanded] = useState(true);

    const hourly = weather?.hourly;
    const daily  = weather?.daily;

    return (
        <div className="wx-root">
        <button className="wx-panel-toggle" onClick={() => setExpanded(e => !e)}>
            <div className="wx-panel-toggle-left">
            <div className="wx-panel-toggle-dot" />
            <span className="wx-panel-toggle-title">Extended Atmospheric Data</span>
            <span className="wx-panel-toggle-sub">Hourly · 10-Day · Upper Air · Soil</span>
            </div>
            <Icon name={expanded ? "chevronUp" : "chevronDown"} size={16} color={BLUE[600]} />
        </button>

        {expanded && (
            <div className="wx-panel-body">

            {/* ── Hourly Temperature ── */}
            <div className="wx-card">
                <SectionHeader iconName="thermometer" title="Hourly Temperature · Next 24h" color={BLUE[600]} />
                {loading ? <Skeleton h={230} r={12} /> : <TemperatureCurve hourly={hourly} unit={unit} />}
            </div>

            {/* ── 10-Day Forecast + Rain side by side ── */}
            <div className="wx-two-col">
                <div className="wx-card wx-card-stretch">
                <SectionHeader iconName="uv" title="10-Day Forecast" color={BLUE[800]} />
                {loading ? <Skeleton h={280} r={12} /> : <DailyTable daily={daily} unit={unit} />}
                </div>

                <div className="wx-card wx-card-stretch wx-rain-card">
                <SectionHeader iconName="rain" title="10-Day Rain (mm)" color={BLUE[400]} />
                {loading ? <Skeleton h={280} r={12} /> : <RainOutlook daily={daily} />}
                </div>
            </div>

            {/* ── Atmospheric Trends ── */}
            <div className="wx-card">
                <SectionHeader iconName="pressure" title="Atmospheric Trends · Past 24h" color={BLUE[600]} />
                {loading ? (
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {[1,2,3,4].map(i => <Skeleton key={i} h={110} r={12} />)}
                </div>
                ) : (
                <AtmosphericPanel hourly={hourly} />
                )}
            </div>

            </div>
        )}
        </div>
    );
    }