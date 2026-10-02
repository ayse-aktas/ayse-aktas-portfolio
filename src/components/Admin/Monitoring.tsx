"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./Monitoring.module.css";

interface Log {
    timestamp: string;
    method: string;
    path: string;
    ip: string;
    deviceId: string;
    userAgent: string;
    city?: string;
    country?: string;
    isp?: string;
}

export default function Monitoring() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLive, setIsLive] = useState(false); // Manual by default
    const [isWindowFocused, setIsWindowFocused] = useState(true);
    const [reqCount, setReqCount] = useState(0);
    const pollInterval = useRef<NodeJS.Timeout | null>(null);

    const fetchLogs = async () => {
        try {
            setReqCount(prev => prev + 1);
            const res = await fetch("/api/logs");
            if (res.ok) {
                const data = await res.json();
                setLogs(data);
            }
        } catch (err) {
            console.error("Logs could not be fetched", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const onFocus = () => setIsWindowFocused(true);
        const onBlur = () => setIsWindowFocused(false);
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
    }, []);

    useEffect(() => {
        // Increased to 30s and only if live + focused
        if (isLive && isWindowFocused) {
            pollInterval.current = setInterval(fetchLogs, 30000); // 30 seconds
        } else {
            if (pollInterval.current) clearInterval(pollInterval.current);
        }
        return () => {
            if (pollInterval.current) clearInterval(pollInterval.current);
        };
    }, [isLive, isWindowFocused]);

    if (loading) return <div className={styles.loading}>Yükleniyor...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.titleInfo}>
                        <h2 className={styles.title}>Trafik İzleme Paneli</h2>
                        <span className={styles.reqBadge}>Oturumdaki İstek: {reqCount}</span>
                    </div>
                    <div className={styles.controls}>
                        <div className={`${styles.statusIndicator} ${isLive && isWindowFocused ? styles.active : ""}`}>
                            {isLive && isWindowFocused ? "Otomatik (30sn)" : "Manuel Mod"}
                        </div>
                        <button onClick={fetchLogs} className={styles.refreshBtn}>
                            Şimdi Yenile
                        </button>
                        <button
                            onClick={() => setIsLive(!isLive)}
                            className={`${styles.liveBtn} ${isLive ? styles.btnActive : ""}`}
                        >
                            {isLive ? "Canlıyı Durdur" : "Canlı Modu Aç"}
                        </button>
                    </div>
                </div>

                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <span className={styles.statTitle}>Toplam İstek</span>
                        <span className={styles.statValue}>{logs.length}</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statTitle}>Benzersiz IP</span>
                        <span className={styles.statValue}>{new Set(logs.map(l => l.ip)).size}</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statTitle}>Cihaz Sayısı</span>
                        <span className={styles.statValue}>{new Set(logs.map(l => l.deviceId)).size}</span>
                    </div>
                </div>
            </header>

            <div className={styles.logTableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Zaman</th>
                            <th>Cihaz ID</th>
                            <th>Yol (Path)</th>
                            <th>Konum (Ülke/Şehir)</th>
                            <th>ISS / Sağlayıcı</th>
                            <th>IP Adresi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={styles.empty}>Henüz veri yok.</td>
                            </tr>
                        ) : (
                            logs.map((log, i) => (
                                <tr key={i} className={styles.row}>
                                    <td className={styles.time}>{new Date(log.timestamp).toLocaleTimeString()}</td>
                                    <td className={styles.deviceId} title={log.userAgent}>{log.deviceId}</td>
                                    <td className={styles.path} title={log.path}>{log.path}</td>
                                    <td className={styles.location}>
                                        {log.country && log.city ? `${log.country} / ${log.city}` : "Bilinmiyor"}
                                    </td>
                                    <td className={styles.isp} title={log.isp}>{log.isp || "-"}</td>
                                    <td className={styles.ip}>{log.ip}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
