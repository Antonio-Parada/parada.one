import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Database, Activity, AlertTriangle, Terminal } from 'lucide-react'
import './App.css'

const ATTACK_LOGS = [
  "FAILED_HANDSHAKE: SSH-2.0-libssh_0.9.5 from 45.12.189.1",
  "PROTOCOL_VIOLATION: Attempted access to /.env",
  "NOISE_FILTERED: Bruteforce attempt detected from 192.168.1.1",
  "SIGNAL_REJECTED: Malformed packet on port 443",
  "ANOMALY_DETECTED: Unexpected latency peak in Node_04",
  "SHIELD_ACTIVE: Layer 7 mitigation triggered",
  "REPARENTING: Redirecting stray signal to void",
  "EQUILIBRIUM: Maintaining the quiet."
]

function App() {
  const [logs, setLogs] = useState<string[]>([])
  const [uptime, setUptime] = useState(0)
  const [load, setLoad] = useState([0.15, 0.12, 0.08])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Simulation of real-time telemetry
  useEffect(() => {
    const logInterval = setInterval(() => {
      const newLog = `[${new Date().toLocaleTimeString()}] ${ATTACK_LOGS[Math.floor(Math.random() * ATTACK_LOGS.length)]}`
      setLogs(prev => [...prev.slice(-15), newLog])
    }, 2000)

    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1)
      setLoad([
        0.10 + Math.random() * 0.1,
        0.08 + Math.random() * 0.05,
        0.05 + Math.random() * 0.03
      ])
    }, 1000)

    return () => {
      clearInterval(logInterval)
      clearInterval(uptimeInterval)
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="one-container">
      <header className="one-header">
        <div className="status-dot"></div>
        <h1>PARADA<span>.ONE</span></h1>
        <div className="header-meta">
          BUNKER_HEARTBEAT // NODE: PVE_CORE_01
        </div>
      </header>

      <main className="dashboard-grid">
        {/* TELEMETRY BLOCK */}
        <section className="dashboard-item telemetry">
          <div className="item-header">
            <Activity size={16} /> <span>LIVE_TELEMETRY</span>
          </div>
          <div className="telemetry-stats">
            <div className="stat">
              <label>UPTIME</label>
              <div className="value">{Math.floor(uptime / 3600)}h {Math.floor((uptime % 3600) / 60)}m {uptime % 60}s</div>
            </div>
            <div className="stat">
              <label>SYSTEM_LOAD</label>
              <div className="value">{load[0].toFixed(2)}, {load[1].toFixed(2)}, {load[2].toFixed(2)}</div>
            </div>
            <div className="stat">
              <label>RESILIENCE_LEVEL</label>
              <div className="value" style={{color: 'var(--pixels-pink)'}}>OPTIMAL</div>
            </div>
          </div>
        </section>

        {/* ZFS STATUS BLOCK */}
        <section className="dashboard-item zfs">
          <div className="item-header">
            <Database size={16} /> <span>ZFS_POOL_STATUS [RAID-Z2]</span>
          </div>
          <div className="zfs-pool">
            {['DISK_0', 'DISK_1', 'DISK_2', 'DISK_3', 'DISK_4'].map(disk => (
              <div key={disk} className="disk">
                <div className="disk-icon active"></div>
                <div className="disk-label">{disk}</div>
                <div className="disk-status">ONLINE</div>
              </div>
            ))}
          </div>
          <div className="pool-meta">SCRUB_STATUS: FINISHED [0 ERRORS]</div>
        </section>

        {/* ATTACKER FEED (THE NOISE) */}
        <section className="dashboard-item logs">
          <div className="item-header">
            <Shield size={16} /> <span>FILTERED_NOISE_FEED</span>
          </div>
          <div className="log-scroll" ref={scrollRef}>
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="log-line"
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ACTIVE PROTOCOLS */}
        <section className="dashboard-item protocols">
          <div className="item-header">
             <Zap size={16} /> <span>SOVEREIGN_PROTOCOLS</span>
          </div>
          <div className="protocol-list">
             <div className="protocol active"><span>AUTO_MITIGATE</span> <div className="status">ON</div></div>
             <div className="protocol active"><span>ENCLAVE_SHIELD</span> <div className="status">ON</div></div>
             <div className="protocol active"><span>THE_QUIET_LOCK</span> <div className="status">ON</div></div>
             <div className="protocol inactive"><span>EXTERNAL_SYNC</span> <div className="status">OFF</div></div>
          </div>
        </section>
      </main>

      <footer className="one-footer">
        <div className="footer-left">
           <Terminal size={12} /> <span>ROOT@PVE.LOCAL // ACCESS_RESTRICTED</span>
        </div>
        <div className="footer-right">
           STABILITY_RESISTANCE: 100%
        </div>
      </footer>

      {/* CRT SCANLINES */}
      <div className="crt-overlay"></div>
    </div>
  )
}

export default App
