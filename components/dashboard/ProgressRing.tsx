'use client'

import { useEffect, useState } from 'react'

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showText?: boolean
  label?: string
  className?: string
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#3B82F6',
  backgroundColor = '#E5E7EB',
  showText = true,
  label = '',
  className = ''
}: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference.toFixed(3)
  const strokeDashoffset = (circumference - (animatedProgress / 100) * circumference).toFixed(3)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            stroke={backgroundColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center text */}
        {showText && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(animatedProgress)}%
              </div>
              {label && (
                <div className="text-xs text-gray-500 mt-1">
                  {label}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
