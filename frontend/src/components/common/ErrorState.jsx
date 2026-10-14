import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  AlertCircle,
  ServerCrash,
  WifiOff,
  SearchX,
  FileQuestion,
  ShieldAlert,
  RotateCw,
  ArrowLeft,
  Home,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from "lucide-react";

/**
 * Common Error Component for Admin, Restaurant Owner, and Public Store pages.
 * Displays when an API request fails, network is lost, or data is missing/not found.
 *
 * @param {Object} props
 * @param {string|Error|Object} [props.error] - Raw error object, Axios error, or error string
 * @param {string} [props.title] - Custom title heading
 * @param {string|React.ReactNode} [props.message] - Descriptive explanation or body text
 * @param {string|React.ReactNode} [props.description] - Alias for message
 * @param {number} [props.statusCode] - HTTP status code (e.g. 404, 500, 403)
 * @param {"auto"|"error"|"not-found"|"warning"|"network"|"forbidden"|"empty"} [props.type="auto"] - Error visual theme
 * @param {"page"|"card"|"inline"} [props.variant="page"] - Layout variant
 * @param {React.ReactNode} [props.icon] - Custom icon override
 * @param {Function} [props.onRetry] - Callback function for "Try Again" / "Retry" action
 * @param {boolean} [props.isRetrying] - External loading/retrying state
 * @param {string} [props.retryLabel="Try Again"] - Label for the retry button
 * @param {string|boolean} [props.backTo] - Target path for "Back" button, or true for navigate(-1)
 * @param {string} [props.backLabel="Go Back"] - Label for the back button
 * @param {string} [props.homeTo] - Custom dashboard/home link (auto-detects admin/owner panel)
 * @param {boolean} [props.showHome=true] - Whether to render a Home/Dashboard button
 * @param {boolean} [props.showBack=true] - Whether to render a Back button
 * @param {boolean} [props.showDetails=false] - Whether to show the expandable technical details section
 * @param {string} [props.className=""] - Additional container classes
 * @param {React.ReactNode} [props.children] - Custom action buttons or content
 */
const ErrorState = ({
  error,
  title,
  message,
  description,
  statusCode: propStatusCode,
  type = "auto",
  variant = "page",
  icon: CustomIcon,
  onRetry,
  isRetrying: propIsRetrying,
  retryLabel = "Try Again",
  backTo,
  backLabel = "Go Back",
  homeTo,
  showHome = true,
  showBack = true,
  showDetails = false,
  className = "",
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [internalRetrying, setInternalRetrying] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isRetrying =
    propIsRetrying !== undefined ? propIsRetrying : internalRetrying;

  // ── Extract error details ───────────────────────────────────────────────────
  let rawMessage = "";
  let extractedStatusCode = propStatusCode || null;
  let technicalDetails = null;

  if (typeof error === "string") {
    rawMessage = error;
  } else if (error && typeof error === "object") {
    rawMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      (typeof error.response?.data === "string" ? error.response.data : "") ||
      error.message ||
      "An unexpected error occurred.";

    extractedStatusCode = error.response?.status || propStatusCode || null;

    try {
      technicalDetails = JSON.stringify(
        {
          name: error.name,
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          method: error.config?.method?.toUpperCase(),
          data: error.response?.data,
        },
        null,
        2,
      );
    } catch {
      technicalDetails = String(error);
    }
  }

  const finalMessage =
    message ||
    description ||
    rawMessage ||
    "We ran into a problem while retrieving the requested data. Please try again or check back later.";

  // ── Auto-detect error type ───────────────────────────────────────────────────
  let resolvedType = type;
  if (resolvedType === "auto") {
    if (
      extractedStatusCode === 404 ||
      /not found|doesn't exist|cannot find/i.test(finalMessage)
    ) {
      resolvedType = "not-found";
    } else if (
      extractedStatusCode === 401 ||
      extractedStatusCode === 403 ||
      /unauthorized|forbidden|permission|denied/i.test(finalMessage)
    ) {
      resolvedType = "forbidden";
    } else if (
      /network error|offline|failed to fetch|econnrefused|timeout/i.test(
        finalMessage,
      )
    ) {
      resolvedType = "network";
    } else if (extractedStatusCode && extractedStatusCode >= 500) {
      resolvedType = "error";
    } else {
      resolvedType = "error";
    }
  }

  // ── Auto-detect titles if not provided ──────────────────────────────────────
  let resolvedTitle = title;
  if (!resolvedTitle) {
    switch (resolvedType) {
      case "not-found":
        resolvedTitle = "Item or Page Not Found";
        break;
      case "forbidden":
        resolvedTitle = "Access Restricted";
        break;
      case "network":
        resolvedTitle = "Connection Problem";
        break;
      case "warning":
        resolvedTitle = "Notice";
        break;
      case "empty":
        resolvedTitle = "No Data Found";
        break;
      case "error":
      default:
        resolvedTitle = extractedStatusCode
          ? `Error (${extractedStatusCode})`
          : "Unable to Load Data";
        break;
    }
  }

  // ── Default dashboard route based on current path ────────────────────────────
  const currentPath = location?.pathname || "";
  const resolvedHomeTo =
    homeTo ||
    (currentPath.startsWith("/admin")
      ? "/admin"
      : currentPath.startsWith("/owner")
        ? "/owner"
        : "/");

  // ── Color and Icon Configuration ─────────────────────────────────────────────
  const typeConfigs = {
    error: {
      icon: ServerCrash,
      iconColor: "text-red-500",
      iconBg: "bg-red-50 border-red-100",
      bannerBg: "bg-red-50/70 border-red-200 text-red-900",
      badgeBg: "bg-red-100 text-red-700",
    },
    "not-found": {
      icon: SearchX,
      iconColor: "text-[#fc8019]",
      iconBg: "bg-orange-50 border-orange-100",
      bannerBg: "bg-orange-50/70 border-orange-200 text-orange-950",
      badgeBg: "bg-orange-100 text-orange-800",
    },
    forbidden: {
      icon: ShieldAlert,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-100",
      bannerBg: "bg-amber-50/70 border-amber-200 text-amber-900",
      badgeBg: "bg-amber-100 text-amber-800",
    },
    network: {
      icon: WifiOff,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50 border-blue-100",
      bannerBg: "bg-blue-50/70 border-blue-200 text-blue-900",
      badgeBg: "bg-blue-100 text-blue-700",
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 border-amber-100",
      bannerBg: "bg-amber-50/70 border-amber-200 text-amber-900",
      badgeBg: "bg-amber-100 text-amber-800",
    },
    empty: {
      icon: FileQuestion,
      iconColor: "text-gray-500",
      iconBg: "bg-gray-100 border-gray-200",
      bannerBg: "bg-gray-50 border-gray-200 text-gray-800",
      badgeBg: "bg-gray-100 text-gray-700",
    },
  };

  const currentConfig = typeConfigs[resolvedType] || typeConfigs.error;
  const ActiveIcon = CustomIcon || currentConfig.icon;

  // ── Handle Retry ─────────────────────────────────────────────────────────────
  const handleRetry = async () => {
    if (!onRetry || isRetrying) return;
    try {
      setInternalRetrying(true);
      const res = onRetry();
      if (res && typeof res.then === "function") {
        await res;
      }
    } catch (err) {
      console.error("Retry attempt failed:", err);
    } finally {
      setInternalRetrying(false);
    }
  };

  // ── Handle Back ──────────────────────────────────────────────────────────────
  const handleBack = () => {
    if (typeof backTo === "string") {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  // ── Copy Technical Details ───────────────────────────────────────────────────
  const handleCopyDetails = () => {
    if (!technicalDetails) return;
    navigator.clipboard.writeText(technicalDetails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // VARIANT 1: INLINE BANNER (Compact, for alerts inside tables, tabs or cards)
  // ─────────────────────────────────────────────────────────────────────────────
  if (variant === "inline") {
    return (
      <div
        className={`flex items-center justify-between gap-3 p-3.5 rounded-md border text-sm transition-all ${currentConfig.bannerBg} ${className}`}
        role="alert"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <ActiveIcon
            size={18}
            className={`shrink-0 ${currentConfig.iconColor}`}
          />
          <div className="truncate">
            <span className="font-semibold mr-1.5">{resolvedTitle}:</span>
            <span className="opacity-90">{finalMessage}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onRetry && (
            <button
              type="button"
              onClick={handleRetry}
              disabled={isRetrying}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-md shadow-sm transition-colors disabled:opacity-50"
            >
              <RotateCw
                size={12}
                className={`transition-transform duration-500 ${
                  isRetrying ? "animate-spin text-[#fc8019]" : ""
                }`}
              />
              {isRetrying ? "Retrying..." : retryLabel}
            </button>
          )}
          {children}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // VARIANT 2 & 3: CARD & FULL PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  const isPage = variant === "page";

  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center ${
        isPage
          ? "min-h-[500px] py-12 px-4"
          : "p-8 bg-white rounded-md border border-gray-200"
      } ${className}`}
    >
      <div
        className={`w-full max-w-lg ${
          isPage
            ? "bg-white rounded-md border border-gray-200 p-8 sm:p-10 shadow-sm"
            : ""
        }`}
      >
        {/* ── Status Code Pill (if available) ── */}
        {extractedStatusCode && (
          <div className="flex justify-center mb-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${currentConfig.badgeBg}`}
            >
              HTTP {extractedStatusCode}
            </span>
          </div>
        )}

        {/* ── Icon Illustration ── */}
        <div className="flex justify-center mb-5">
          <div
            className={`w-20 h-20 rounded-full border flex items-center justify-center transition-transform hover:scale-105 duration-200 ${currentConfig.iconBg} ${currentConfig.iconColor}`}
          >
            <ActiveIcon size={40} strokeWidth={1.75} />
          </div>
        </div>

        {/* ── Heading Title ── */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight mb-2">
          {resolvedTitle}
        </h2>

        {/* ── Description / Message ── */}
        <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto mb-6">
          {finalMessage}
        </p>

        {/* ── Action Buttons ── */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Try Again / Retry */}
          {onRetry && (
            <button
              type="button"
              onClick={handleRetry}
              disabled={isRetrying}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-bold shadow-md shadow-orange-500/20 transition-all disabled:opacity-60 cursor-pointer"
            >
              <RotateCw
                size={16}
                strokeWidth={2}
                className={`transition-transform duration-500 ${
                  isRetrying ? "animate-spin" : ""
                }`}
              />
              <span>{isRetrying ? "Retrying..." : retryLabel}</span>
            </button>
          )}

          {/* Go Back */}
          {showBack && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft size={16} strokeWidth={1.75} />
              <span>{backLabel}</span>
            </button>
          )}

          {/* Dashboard / Home */}
          {showHome && isPage && (
            <Link
              to={resolvedHomeTo}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-colors shadow-sm"
            >
              <Home size={16} strokeWidth={1.75} />
              <span>Dashboard</span>
            </Link>
          )}

          {/* Additional Custom Children Buttons */}
          {children}
        </div>

        {/* ── Expandable Technical Details (For Developer / Admin Debugging) ── */}
        {(showDetails || technicalDetails) && (
          <div className="mt-8 pt-5 border-t border-gray-100 text-left">
            <button
              type="button"
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors py-1 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <AlertCircle size={14} className="text-gray-400" />
                Technical Details
              </span>
              {detailsOpen ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>

            {detailsOpen && (
              <div className="mt-2.5 bg-gray-900 rounded-md p-3.5 text-gray-200 text-xs font-mono relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800 text-[11px] text-gray-400">
                  <span>Error Diagnostics</span>
                  <button
                    type="button"
                    onClick={handleCopyDetails}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all text-[11px] leading-relaxed text-gray-300">
                  {technicalDetails || finalMessage}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
