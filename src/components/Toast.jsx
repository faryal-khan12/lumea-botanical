import React from "react";
import { useStore } from "../context/StoreContext";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";

function Toast() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <aside className="toast-container" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClass = "toast-success";
        if (toast.type === "info") {
          Icon = Info;
          colorClass = "toast-info";
        } else if (toast.type === "warning") {
          Icon = AlertCircle;
          colorClass = "toast-warning";
        }

        return (
          <div key={toast.id} className={`toast-card ${colorClass}`}>
            <Icon className="toast-icon" size={20} />
            <div className="toast-content">
              <h4 className="toast-title">{toast.title}</h4>
              {toast.message && <p className="toast-message">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </aside>
  );
}

export default Toast;
