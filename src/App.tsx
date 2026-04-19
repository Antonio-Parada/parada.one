import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Database, Activity, Terminal, Lock } from 'lucide-react'
import './App.css'

const DEFENSE_VECTOR_LOGS = [
  "INTRUSION_PREVENTED: CVE-2021-44228 (Log4j) JNDI lookup blocked",
  "SYSCALL_INTERCEPT: Non-privileged guest attempting 'p_ptrace' - REJECTED",
  "PROTOCOL_SHIELD: Malformed HTTP/2 frame from 185.220.101.44 (TOR_EXIT)",
  "TRAVERSAL_MITIGATED: Attempted access to /../../etc/shadow - VIRTUAL_VOID_REDIRECT",
  "HANDSHAKE_DROPPED: SSH brute-force signature detected [User: root]",
  "KERNEL_PROTECT: Stack smashing protection triggered in signal_handler.c",
  "SIGNAL_ANALYSIS: Heuristic noise-to-signal ratio exceeds safety threshold",
  "RESILIENCE_SYNC: ZFS RAID-Z2 pool scrubbing for immutable integrity",
  "SOVEREIGN_GATE: IP 91.241.19.84 blacklisted via reputation_filter",
  "EQUILIBRIUM: System state stabilized. The Quiet remains."
]

function App() {
  const [logs, setLogs] = useState<string[]>([])
  const [uptime, setUptime] = useState(0)
  const [load, setLoad] = useState([0.05, 0.08, 0.04])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const logInterval = setInterval(() => {
      const newLog = `[${new Date().toLocaleTimeString('en-GB')}] ${DEFENSE_VECTOR_LOGS[Math.floor(Math.random() * DEFENSE_VECTOR_LOGS.length)]}`
      setLogs(prev => [...prev.slice(-20), newLog])
    }, 2500)

    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1)
      setLoad([
        0.04 + Math.random() * 0.04,
        0.06 + Math.random() * 0.03,
        0.03 + Math.random() * 0.02
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
          BUNKER_HEARTBEAT // IDENTITY: GUEST@PARADA.ONE
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="dashboard-item telemetry">
          <div className="item-header">
            <Activity size={14} /> <span>INFRASTRUCTURE_TELEMETRY</span>
          </div>
          <div className="telemetry-stats">
            <div className="stat">
              <label>UPTIME</label>
              <div className="value">{Math.floor(uptime / 3600)}h {Math.floor((uptime % 3600) / 60)}m {uptime % 60}s</div>
            </div>
            <div className="stat">
              <label>LOAD_AVERAGE (K_V1)</label>
              <div className="value">{load[0].toFixed(2)}, {load[1].toFixed(2)}, {load[2].toFixed(2)}</div>
            </div>
            <div className="stat">
              <label>THREAT_MITIGATION</label>
              <div className="value" style={{color: 'var(--pixels-pink)'}}>ACTIVE_SHIELD</div>
            </div>
          </div>
        </section>

        <section className="dashboard-item logs">
          <div className="item-header">
            <Shield size={14} /> <span>KERNEL_DEFENSE_READOUT</span>
          </div>
          <div className="log-scroll" ref={scrollRef}>
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="log-line"
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section className="dashboard-item zfs">
          <div className="item-header">
            <Database size={14} /> <span>IMMUTABLE_STORAGE [ZFS_POOL]</span>
          </div>
          <div className="zfs-pool">
            {['S_0', 'S_1', 'S_2', 'S_3', 'S_4'].map(disk => (
              <div key={disk} className="disk">
                <div className="disk-icon active"></div>
                <div className="disk-label">{disk}</div>
              </div>
            ))}
          </div>
          <div className="pool-meta">INTEGRITY_CHECK: PASS [RAID-Z2]</div>
        </section>

        <section className="dashboard-item protocols">
          <div className="item-header">
             <Lock size={14} /> <span>SOVEREIGN_POLICY</span>
          </div>
          <div className="protocol-list">
             <div className="protocol active"><span>NO_GUEST_SYSCALLS</span> <div className="status">ON</div></div>
             <div className="protocol active"><span>TRAFFIC_SCRUBBER</span> <div className="status">ON</div></div>
             <div className="protocol active"><span>RESILIENCE_DOJO_LOCK</span> <div className="status">ON</div></div>
             <div className="protocol active"><span>THE_QUIET_PROTOCOL</span> <div className="status">ON</div></div>
          </div>
        </section>
      </main>

      <footer className="one-footer">
        <div className="footer-left">
           <Terminal size={12} /> <span>GUEST@PARADA.ONE // SESSION_READ_ONLY</span>
        </div>
        <div className="footer-right">
           KERNEL_VERSION: PARADA_OS_0.1.4_STABLE
        </div>
      </footer>

      <div className="crt-overlay"></div>
    </div>
  )
}

export default App
