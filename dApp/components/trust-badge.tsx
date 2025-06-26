import { Shield, AlertTriangle, Clock, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TrustBadgeProps {
  status: string
  className?: string
  showIcon?: boolean
}

export function TrustBadge({ status, className, showIcon = true }: TrustBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Verified":
        return {
          icon: CheckCircle,
          className: "trust-verified",
          text: "Blockchain Verified",
        }
      case "Registered":
        return {
          icon: Shield,
          className: "trust-verified",
          text: "Registered",
        }
      case "Under Dispute":
        return {
          icon: AlertTriangle,
          className: "trust-error",
          text: "Under Dispute",
        }
      case "Mortgaged":
        return {
          icon: Clock,
          className: "trust-warning",
          text: "Mortgaged",
        }
      case "Government Acquired":
        return {
          icon: Shield,
          className: "trust-warning",
          text: "Government Acquired",
        }
      case "Transferred":
        return {
          icon: CheckCircle,
          className: "trust-verified",
          text: "Transferred",
        }
      default:
        return {
          icon: Clock,
          className: "trust-warning",
          text: status,
        }
    }
  }

  const config = getStatusConfig(status)
  const Icon = config.icon

  return (
    <Badge className={cn("trust-badge", config.className, className)}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.text}
    </Badge>
  )
}
