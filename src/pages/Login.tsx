import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck } from "lucide-react";
import logiwinLogo from "@/assets/logiwin-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Demo banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 rounded-lg bg-primary/10 border border-primary/20 px-4 py-2.5 text-center"
        >
          <p className="text-sm text-primary-foreground/80">
            📍 You're viewing a live interactive demo — no signup required.
          </p>
        </motion.div>

        {/* Login card */}
        <div className="rounded-2xl bg-card p-8 shadow-2xl shadow-primary/5">
          <div className="flex flex-col items-center mb-8">
            <img src={logiwinLogo} alt="Logiwin" className="w-16 h-16 mb-4" />
            <h1 className="text-2xl font-bold text-foreground">Logiwin</h1>
            <p className="text-muted-foreground text-sm mt-1">
              AI & IoT Fleet Intelligence Platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@logiwin.io"
                className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              Enter Demo
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Demo data powered by Logiwin Fleet Intelligence Engine
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
