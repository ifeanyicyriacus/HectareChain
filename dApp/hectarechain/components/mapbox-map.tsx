"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Loader2, AlertTriangle } from "lucide-react"
import type { LandParcel } from "@/lib/types"

interface MapboxMapProps {
  properties: LandParcel[]
  selectedProperty?: LandParcel | null
  onPropertySelect?: (property: LandParcel) => void
  height?: string
}

export default function MapboxMap({
  properties,
  selectedProperty,
  onPropertySelect,
  height = "400px",
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapboxLoaded, setMapboxLoaded] = useState(false)
  const [hasValidToken, setHasValidToken] = useState(false)

  // Replace this with your actual Mapbox token
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_TOKEN_HERE"

  // Check if Mapbox GL JS is loaded
  useEffect(() => {
    const checkMapbox = () => {
      if (typeof window !== "undefined" && (window as any).mapboxgl) {
        setMapboxLoaded(true)
        // Check if we have a valid token
        if (MAPBOX_TOKEN && MAPBOX_TOKEN !== "YOUR_MAPBOX_TOKEN_HERE") {
          setHasValidToken(true)
        }
      } else {
        setTimeout(checkMapbox, 100)
      }
    }
    checkMapbox()
  }, [MAPBOX_TOKEN])

  useEffect(() => {
    if (!mapboxLoaded || !mapContainer.current || !hasValidToken) return

    const mapboxgl = (window as any).mapboxgl

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11", // Dark theme to match our design
      center: [3.3792, 6.5244], // Lagos coordinates
      zoom: 10,
      accessToken: MAPBOX_TOKEN,
    })

    map.current.on("load", () => {
      setIsLoading(false)

      // Add property polygons
      properties.forEach((property, index) => {
        try {
          const coordinates = JSON.parse(property.coordinates)

          // Add polygon source
          map.current.addSource(`property-${property.id}`, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [coordinates],
              },
              properties: {
                id: property.id,
                landId: property.landIdInternal,
                address: property.address,
                status: property.status,
                value: property.estimatedValue,
              },
            },
          })

          // Add polygon layer
          map.current.addLayer({
            id: `property-fill-${property.id}`,
            type: "fill",
            source: `property-${property.id}`,
            paint: {
              "fill-color": getStatusColor(property.status),
              "fill-opacity": 0.3,
            },
          })

          // Add polygon outline
          map.current.addLayer({
            id: `property-outline-${property.id}`,
            type: "line",
            source: `property-${property.id}`,
            paint: {
              "line-color": getStatusColor(property.status),
              "line-width": 2,
            },
          })

          // Add click handler
          map.current.on("click", `property-fill-${property.id}`, () => {
            if (onPropertySelect) {
              onPropertySelect(property)
            }
          })

          // Add hover effect
          map.current.on("mouseenter", `property-fill-${property.id}`, () => {
            map.current.getCanvas().style.cursor = "pointer"
          })

          map.current.on("mouseleave", `property-fill-${property.id}`, () => {
            map.current.getCanvas().style.cursor = ""
          })
        } catch (error) {
          console.error(`Error parsing coordinates for property ${property.id}:`, error)
        }
      })

      // Add property markers
      properties.forEach((property) => {
        try {
          const coordinates = JSON.parse(property.coordinates)
          const center = getCenterPoint(coordinates)

          // Create marker element
          const markerEl = document.createElement("div")
          markerEl.className = "property-marker"
          markerEl.style.cssText = `
            width: 30px;
            height: 30px;
            background-color: ${getStatusColor(property.status)};
            border: 2px solid white;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          `
          markerEl.textContent = "🏠"

          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="color: #1e293b; padding: 8px;">
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

          // Add marker to map
          new mapboxgl.Marker(markerEl).setLngLat(center).setPopup(popup).addTo(map.current)
        } catch (error) {
          console.error(`Error creating marker for property ${property.id}:`, error)
        }
      })
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [mapboxLoaded, properties, onPropertySelect, hasValidToken, MAPBOX_TOKEN])

  // Highlight selected property
  useEffect(() => {
    if (!map.current || !selectedProperty) return

    // Reset all property highlights
    properties.forEach((property) => {
      try {
        map.current.setPaintProperty(`property-fill-${property.id}`, "fill-opacity", 0.3)
        map.current.setPaintProperty(`property-outline-${property.id}`, "line-width", 2)
      } catch (error) {
        // Layer might not exist yet
      }
    })

    // Highlight selected property
    try {
      map.current.setPaintProperty(`property-fill-${selectedProperty.id}`, "fill-opacity", 0.6)
      map.current.setPaintProperty(`property-outline-${selectedProperty.id}`, "line-width", 4)

      // Fly to selected property
      const coordinates = JSON.parse(selectedProperty.coordinates)
      const center = getCenterPoint(coordinates)
      map.current.flyTo({
        center: center,
        zoom: 15,
        duration: 1000,
      })
    } catch (error) {
      console.error("Error highlighting selected property:", error)
    }
  }, [selectedProperty, properties])

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

  if (!mapboxLoaded) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span>Interactive Map</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-700 rounded-lg flex items-center justify-center" style={{ height }}>
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-emerald-400 mx-auto mb-4 animate-spin" />
              <p className="text-slate-300 mb-2">Loading Mapbox GL JS...</p>
              <p className="text-sm text-slate-400">Setting up interactive property map</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!hasValidToken) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span>Interactive Map</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-700 rounded-lg flex items-center justify-center" style={{ height }}>
            <div className="text-center max-w-md">
              <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Mapbox Token Required</h3>
              <p className="text-slate-300 mb-4 text-sm">
                To display the interactive map, please add your Mapbox access token to the environment variables.
              </p>
              <div className="bg-slate-600 rounded-lg p-4 text-left">
                <p className="text-slate-300 text-xs mb-2">Steps to get your token:</p>
                <ol className="text-slate-400 text-xs space-y-1">
                  <li>1. Sign up at mapbox.com</li>
                  <li>2. Go to Account → Access tokens</li>
                  <li>3. Create a new token</li>
                  <li>4. Add to .env.local as NEXT_PUBLIC_MAPBOX_TOKEN</li>
                </ol>
              </div>
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
          <p>• Hover over markers for quick property information</p>
          <p>• Use mouse wheel to zoom, drag to pan</p>
        </div>
      </CardContent>
    </Card>
  )
}
