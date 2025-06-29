"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Loader2 } from "lucide-react"
import type { LandParcel } from "@/lib/types"

interface LeafletMapProps {
  properties: LandParcel[]
  selectedProperty?: LandParcel | null
  onPropertySelect?: (property: LandParcel) => void
  height?: string
}

export default function LeafletMap({
  properties,
  selectedProperty,
  onPropertySelect,
  height = "400px",
}: LeafletMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const markersRef = useRef<any[]>([])
  const polygonsRef = useRef<any[]>([])

  // Check if Leaflet is loaded
  useEffect(() => {
    const checkLeaflet = () => {
      if (typeof window !== "undefined" && (window as any).L) {
        setLeafletLoaded(true)
      } else {
        setTimeout(checkLeaflet, 100)
      }
    }
    checkLeaflet()
  }, [])

  useEffect(() => {
    if (!leafletLoaded || !mapContainer.current) return

    const L = (window as any).L

    // Initialize map
    map.current = L.map(mapContainer.current, {
      center: [6.5244, 3.3792], // Lagos coordinates
      zoom: 10,
      zoomControl: true,
    })

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map.current)

    setIsLoading(false)

    // Add properties to map
    properties.forEach((property) => {
      try {
        const coordinates = JSON.parse(property.coordinates)

        // Create polygon
        const polygon = L.polygon(
          coordinates.map((coord: number[]) => [coord[1], coord[0]]),
          {
            color: getStatusColor(property.status),
            fillColor: getStatusColor(property.status),
            fillOpacity: 0.3,
            weight: 2,
          },
        ).addTo(map.current)

        // Add click handler to polygon
        polygon.on("click", () => {
          if (onPropertySelect) {
            onPropertySelect(property)
          }
        })

        polygonsRef.current.push({ id: property.id, polygon })

        // Create marker at center of polygon
        const center = getCenterPoint(coordinates)
        const marker = L.marker([center[1], center[0]], {
          icon: L.divIcon({
            className: "custom-marker",
            html: `<div style="
              width: 30px;
              height: 30px;
              background-color: ${getStatusColor(property.status)};
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">🏠</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
        }).addTo(map.current)

        // Add popup to marker
        marker.bindPopup(`
          <div style="color: #1e293b; padding: 8px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
              ${property.landIdInternal}
            </h3>
            <p style="margin: 0 0 4px 0; font-size: 12px;">
              ${property.address}
            </p>
            <p style="margin: 0 0 4px 0; font-size: 12px;">
              <strong>Status:</strong> ${property.status}
            </p>
            <p style="margin: 0; font-size: 12px;">
              <strong>Value:</strong> ₦${property.estimatedValue.toLocaleString()}
            </p>
          </div>
        `)

        markersRef.current.push({ id: property.id, marker, polygon })
      } catch (error) {
        console.error(`Error adding property ${property.id} to map:`, error)
      }
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [leafletLoaded, properties, onPropertySelect])

  // Highlight selected property
  useEffect(() => {
    if (!map.current || !selectedProperty) return

    const L = (window as any).L

    // Reset all polygons
    polygonsRef.current.forEach(({ polygon }) => {
      polygon.setStyle({
        fillOpacity: 0.3,
        weight: 2,
      })
    })

    // Highlight selected property
    const selectedPolygon = polygonsRef.current.find(({ id }) => id === selectedProperty.id)
    if (selectedPolygon) {
      selectedPolygon.polygon.setStyle({
        fillOpacity: 0.6,
        weight: 4,
      })

      // Fly to selected property
      const coordinates = JSON.parse(selectedProperty.coordinates)
      const center = getCenterPoint(coordinates)
      map.current.flyTo([center[1], center[0]], 15, {
        duration: 1,
      })
    }
  }, [selectedProperty])

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Verified":
        return "#10b981" // emerald-500
      case "Fractionalized":
        return "#3b82f6" // blue-500
      case "Under Verification":
        return "#f59e0b" // amber-500
      case "Under Dispute":
        return "#ef4444" // red-500
      case "Mortgaged":
        return "#f97316" // orange-500
      case "Government Acquired":
        return "#8b5cf6" // violet-500
      default:
        return "#6b7280" // gray-500
    }
  }

  const getCenterPoint = (coordinates: number[][]): [number, number] => {
    const lngs = coordinates.map((coord) => coord[0])
    const lats = coordinates.map((coord) => coord[1])
    const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2
    const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2
    return [centerLng, centerLat]
  }

  if (!leafletLoaded) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            {/* <span>Interactive Property Map</span> */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-700 rounded-lg flex items-center justify-center" style={{ height }}>
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-emerald-400 mx-auto mb-4 animate-spin" />
              <p className="text-slate-300 mb-2">Loading OpenStreetMap...</p>
              <p className="text-sm text-slate-400">Setting up free interactive property map</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span>Interactive Property Map</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">{properties.length} Properties</Badge>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">OpenStreetMap</Badge>
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapContainer} className="w-full rounded-lg overflow-hidden" style={{ height }} />

        {/* Map Legend */}
        <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { status: "Verified", color: "#10b981" },
            { status: "Fractionalized", color: "#3b82f6" },
            { status: "Under Verification", color: "#f59e0b" },
            { status: "Under Dispute", color: "#ef4444" },
            { status: "Mortgaged", color: "#f97316" },
            { status: "Government Acquired", color: "#8b5cf6" },
          ].map((item) => (
            <div key={item.status} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-400">{item.status}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-slate-500">
          <p>• Click on property polygons to view details</p>
          <p>• Click on markers for quick property information</p>
          <p>• Use mouse wheel to zoom, drag to pan</p>
          <p>• Powered by OpenStreetMap (Free & Open Source)</p>
        </div>
      </CardContent>
    </Card>
  )
}
